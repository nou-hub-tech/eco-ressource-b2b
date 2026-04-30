import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationCenterAiService } from '../../../features/reservation-center/services/reservation-center-ai.service';
import { ReservationCenterService } from '../../../features/reservation-center/services/reservation-center.service';
import { ReservationCenterState } from '../../../features/reservation-center/state/reservation-center.state';
import {
  AiInsight,
  EnterpriseContext,
} from '../../../features/reservation-center/models/reservation-center.models';
import { BackendReservation } from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import { BackendReservationSlot } from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';
import { BackendEcoOrder } from '../../../pages/moduleReservation/shared/api/eco-order-api.service';

type AdminKpiKey = 'reservations' | 'slots' | 'orders' | 'co2';

interface AdminKpiCard {
  key: AdminKpiKey;
  label: string;
  value: number;
  tone: 'eco' | 'info' | 'warn' | 'danger';
  trendLabel: string;
  trendUp: boolean;
}

interface ConflictRow {
  id: string;
  type: 'reservation' | 'slot' | 'activity';
  title: string;
  detail: string;
  severity: 'danger' | 'warn' | 'info';
  target: '/admin/reservations' | '/admin/slots' | '/admin/orders';
}

interface TimelineRow {
  label: string;
  count: number;
  detail: string;
  tone: 'eco' | 'info' | 'warn';
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  loading = true;
  error = '';

  reservations: BackendReservation[] = [];
  slots: BackendReservationSlot[] = [];
  orders: BackendEcoOrder[] = [];

  reservationInsights: AiInsight[] = [];
  slotInsights: AiInsight[] = [];
  orderInsights: AiInsight[] = [];

  displayedStats: Record<AdminKpiKey, number> = {
    reservations: 0,
    slots: 0,
    orders: 0,
    co2: 0,
  };

  private readonly adminContext: EnterpriseContext = {
    enterpriseId: null,
    companyName: 'Admin',
    role: 'admin',
    isAdmin: true,
  };

  constructor(
    private readonly state: ReservationCenterState,
    private readonly ai: ReservationCenterAiService,
    private readonly router: Router,
    public readonly workspace: ReservationCenterService,
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  get kpis(): AdminKpiCard[] {
    return [
      {
        key: 'reservations',
        label: 'Total Reservations',
        value: this.displayedStats.reservations,
        tone: 'eco',
        trendLabel: this.trendLabel(this.reservations, item => item.createdAt ?? item.date),
        trendUp: this.trendUp(this.reservations, item => item.createdAt ?? item.date),
      },
      {
        key: 'slots',
        label: 'Active Slots',
        value: this.displayedStats.slots,
        tone: 'info',
        trendLabel: this.trendLabel(this.activeSlots, item => item.createdAt ?? item.date),
        trendUp: this.trendUp(this.activeSlots, item => item.createdAt ?? item.date),
      },
      {
        key: 'orders',
        label: 'Orders In Progress',
        value: this.displayedStats.orders,
        tone: 'warn',
        trendLabel: this.trendLabel(this.inProgressOrders, item => item.createdAt ?? item.orderDate),
        trendUp: this.trendUp(this.inProgressOrders, item => item.createdAt ?? item.orderDate),
      },
      {
        key: 'co2',
        label: 'Total CO2 Saved',
        value: this.displayedStats.co2,
        tone: 'eco',
        trendLabel: this.co2TrendLabel,
        trendUp: this.co2TrendUp,
      },
    ];
  }

  get activeSlots(): BackendReservationSlot[] {
    return this.slots.filter(slot => slot.status !== 'blocked');
  }

  get inProgressOrders(): BackendEcoOrder[] {
    return this.orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled');
  }

  get totalCo2Saved(): number {
    return Math.round(this.orders.reduce((sum, order) => sum + (order.co2Saved ?? 0), 0));
  }

  get pendingRequestsCount(): number {
    return this.reservations.filter(item => item.status === 'PENDING').length;
  }

  get conflictRate(): number {
    if (!this.reservations.length) {
      return 0;
    }

    const conflicts = this.reservations.filter(item => this.workspace.detectReservationConflict(item, this.reservations, this.slots).hasConflict).length;
    return Math.round((conflicts / this.reservations.length) * 100);
  }

  get averageUtilization(): number {
    if (!this.slots.length) {
      return 0;
    }

    const activeUsage = this.slots.filter(item => item.status === 'booked').length;
    return Math.round((activeUsage / this.slots.length) * 100);
  }

  get failedOperations(): number {
    return (
      this.reservations.filter(item => item.status === 'CANCELLED').length +
      this.slots.filter(item => item.status === 'blocked').length +
      this.orders.filter(item => item.status === 'cancelled').length
    );
  }

  get healthRows() {
    return [
      {
        label: 'Pending requests',
        value: this.pendingRequestsCount,
        tone: 'warn',
        detail: 'Reservations waiting for provider or admin intervention.',
      },
      {
        label: 'Conflict rate',
        value: `${this.conflictRate}%`,
        tone: this.conflictRate >= 25 ? 'danger' : 'info',
        detail: 'Overlapping or overbooked reservations across the marketplace.',
      },
      {
        label: 'Average utilization',
        value: `${this.averageUtilization}%`,
        tone: 'eco',
        detail: 'Booked slot share across all enterprises.',
      },
      {
        label: 'Failed / blocked ops',
        value: this.failedOperations,
        tone: this.failedOperations ? 'danger' : 'eco',
        detail: 'Cancelled reservations, blocked slots, and cancelled orders.',
      },
    ];
  }

  get heatmapCells() {
    return this.workspace.buildHeatmap(this.slots, this.reservations);
  }

  get conflictRows(): ConflictRow[] {
    const rows: ConflictRow[] = [];

    for (const reservation of this.reservations) {
      const conflict = this.workspace.detectReservationConflict(reservation, this.reservations, this.slots);
      if (conflict.hasConflict) {
        rows.push({
          id: `reservation-${reservation.id}`,
          type: 'reservation',
          title: `${this.workspace.resourceName(reservation.machine)} on ${reservation.date}`,
          detail: `${conflict.blockingReservations.length} overlapping request(s) for ${reservation.company}.`,
          severity: 'danger',
          target: '/admin/reservations',
        });
      }
    }

    for (const slot of this.slots.filter(item => item.status === 'booked')) {
      const confirmedForSlot = this.reservations.filter(item => item.slotId === slot.id && item.status === 'CONFIRMED');
      if (confirmedForSlot.length > 1) {
        rows.push({
          id: `slot-${slot.id}`,
          type: 'slot',
          title: `${this.workspace.resourceName(slot.machine)} overbooked`,
          detail: `${confirmedForSlot.length} confirmed reservations target the same slot window.`,
          severity: 'warn',
          target: '/admin/slots',
        });
      }
    }

    const suspiciousCompanies = new Map<string, number>();
    for (const reservation of this.reservations) {
      if (reservation.status === 'CANCELLED') {
        suspiciousCompanies.set(reservation.company, (suspiciousCompanies.get(reservation.company) ?? 0) + 1);
      }
    }

    for (const [company, count] of suspiciousCompanies.entries()) {
      if (count >= 3) {
        rows.push({
          id: `activity-${company}`,
          type: 'activity',
          title: `${company} shows repeated failures`,
          detail: `${count} cancelled requests may indicate suspicious or low-quality activity.`,
          severity: 'info',
          target: '/admin/reservations',
        });
      }
    }

    return rows.slice(0, 8);
  }

  get timelineRows(): TimelineRow[] {
    const created = this.reservations.length;
    const confirmed = this.reservations.filter(item => item.status === 'CONFIRMED').length;
    const ordersCreated = this.orders.length;

    return [
      {
        label: 'Requests created',
        count: created,
        detail: `${this.pendingRequestsCount} are still waiting for resolution.`,
        tone: 'info',
      },
      {
        label: 'Requests confirmed',
        count: confirmed,
        detail: `${created ? Math.round((confirmed / created) * 100) : 0}% conversion from request to confirmation.`,
        tone: 'eco',
      },
      {
        label: 'Orders generated',
        count: ordersCreated,
        detail: `${confirmed ? Math.round((ordersCreated / confirmed) * 100) : 0}% of confirmed reservations reached the order stage.`,
        tone: 'warn',
      },
    ];
  }

  get co2TrendLabel(): string {
    const current = this.sumCo2(this.currentPeriod(this.orders, item => item.createdAt ?? item.orderDate));
    const previous = this.sumCo2(this.previousPeriod(this.orders, item => item.createdAt ?? item.orderDate));
    const delta = current - previous;
    return `${delta >= 0 ? '+' : ''}${delta} vs previous 7 days`;
  }

  get co2TrendUp(): boolean {
    const current = this.sumCo2(this.currentPeriod(this.orders, item => item.createdAt ?? item.orderDate));
    const previous = this.sumCo2(this.previousPeriod(this.orders, item => item.createdAt ?? item.orderDate));
    return current >= previous;
  }

  inspectConflict(row: ConflictRow): void {
    this.router.navigate([row.target]);
  }

  openAdminArea(target: '/admin/reservations' | '/admin/slots' | '/admin/orders'): void {
    this.router.navigate([target]);
  }

  heatmapClass(occupancy: number): string {
    if (occupancy >= 80) {
      return 'danger';
    }
    if (occupancy >= 45) {
      return 'warning';
    }
    if (occupancy > 0) {
      return 'info';
    }
    return 'success';
  }

  private refresh(): void {
    this.loading = true;
    this.state.loadAll().subscribe({
      next: snapshot => {
        this.reservations = snapshot.reservations;
        this.slots = snapshot.slots;
        this.orders = snapshot.orders;
        this.loading = false;
        this.animateStats({
          reservations: this.reservations.length,
          slots: this.activeSlots.length,
          orders: this.inProgressOrders.length,
          co2: this.totalCo2Saved,
        });
        this.loadInsights();
      },
      error: error => {
        this.loading = false;
        this.error = error?.error?.message ?? 'Failed to load admin control-center data.';
      },
    });
  }

  private loadInsights(): void {
    this.ai.getInsights('reservations', this.adminContext).subscribe({
      next: insights => {
        this.reservationInsights = insights;
      },
      error: () => {
        this.reservationInsights = [];
      },
    });

    this.ai.getInsights('slots', this.adminContext).subscribe({
      next: insights => {
        this.slotInsights = insights;
      },
      error: () => {
        this.slotInsights = [];
      },
    });

    this.ai.getInsights('orders', this.adminContext).subscribe({
      next: insights => {
        this.orderInsights = insights;
      },
      error: () => {
        this.orderInsights = [];
      },
    });
  }

  private animateStats(targets: Record<AdminKpiKey, number>): void {
    const startedAt = performance.now();
    const duration = 700;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayedStats = {
        reservations: Math.round(targets.reservations * eased),
        slots: Math.round(targets.slots * eased),
        orders: Math.round(targets.orders * eased),
        co2: Math.round(targets.co2 * eased),
      };

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }

  private trendLabel<T>(rows: T[], dateSelector: (row: T) => string | null | undefined): string {
    const current = this.currentPeriod(rows, dateSelector).length;
    const previous = this.previousPeriod(rows, dateSelector).length;
    const delta = current - previous;
    return `${delta >= 0 ? '+' : ''}${delta} vs previous 7 days`;
  }

  private trendUp<T>(rows: T[], dateSelector: (row: T) => string | null | undefined): boolean {
    return this.currentPeriod(rows, dateSelector).length >= this.previousPeriod(rows, dateSelector).length;
  }

  private currentPeriod<T>(rows: T[], dateSelector: (row: T) => string | null | undefined): T[] {
    const now = new Date();
    const currentStart = new Date(now);
    currentStart.setDate(now.getDate() - 7);

    return rows.filter(row => {
      const date = this.parseDate(dateSelector(row));
      return date != null && date >= currentStart && date <= now;
    });
  }

  private previousPeriod<T>(rows: T[], dateSelector: (row: T) => string | null | undefined): T[] {
    const now = new Date();
    const currentStart = new Date(now);
    currentStart.setDate(now.getDate() - 7);
    const previousStart = new Date(currentStart);
    previousStart.setDate(currentStart.getDate() - 7);

    return rows.filter(row => {
      const date = this.parseDate(dateSelector(row));
      return date != null && date >= previousStart && date < currentStart;
    });
  }

  private sumCo2(rows: BackendEcoOrder[]): number {
    return Math.round(rows.reduce((sum, order) => sum + (order.co2Saved ?? 0), 0));
  }

  private parseDate(value: string | null | undefined): Date | null {
    if (!value) {
      return null;
    }

    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
}
