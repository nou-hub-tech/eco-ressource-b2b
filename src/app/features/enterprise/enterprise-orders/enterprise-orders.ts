import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService, User } from '../../../core/services/auth.service';
import {
  BackendEcoOrder,
  BackendOrderStatus,
  EcoOrderApiService,
  EcoOrderRequest,
} from '../../../pages/moduleReservation/shared/api/eco-order-api.service';
import {
  BackendReservation,
  ReservationApiService,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import {
  BackendReservationSlot,
  ReservationSlotApiService,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';

@Component({
  selector: 'app-enterprise-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enterprise-orders.html',
  styleUrls: ['./enterprise-orders.css'],
})
export class EnterpriseOrders implements OnInit {
  loading = true;
  savingId: number | null = null;
  error = '';

  orders: BackendEcoOrder[] = [];
  relatedCompanyNames = new Set<string>();
  statusDrafts: Record<number, BackendOrderStatus> = {};

  readonly statuses: BackendOrderStatus[] = ['draft', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  constructor(
    private readonly auth: AuthService,
    private readonly slotApi: ReservationSlotApiService,
    private readonly reservationApi: ReservationApiService,
    private readonly orderApi: EcoOrderApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get visibleOrders(): BackendEcoOrder[] {
    return this.orders.filter(order => !order.deleted && this.isRelatedOrder(order));
  }

  get totalCo2Saved(): number {
    return this.visibleOrders.reduce((sum, order) => sum + this.co2Value(order), 0);
  }

  get averageCo2Saved(): number {
    return this.visibleOrders.length ? Math.round(this.totalCo2Saved / this.visibleOrders.length) : 0;
  }

  get lifecycleSummary(): { created: number; processing: number; completed: number } {
    return this.visibleOrders.reduce(
      (summary, order) => {
        const stage = this.lifecycleStage(order);
        summary[stage] += 1;
        return summary;
      },
      { created: 0, processing: 0, completed: 0 },
    );
  }

  get ecoImpactScore(): { grade: 'A' | 'B' | 'C'; averageCo2: number; message: string } {
    if (!this.visibleOrders.length) {
      return { grade: 'A', averageCo2: 0, message: 'No order impact to analyze yet.' };
    }

    const avgCo2 = this.averageCo2Saved;
    const avgGradeScore =
      this.visibleOrders.reduce((sum, order) => sum + this.gradeScore(order.grade), 0) / this.visibleOrders.length;

    let grade: 'A' | 'B' | 'C' = 'C';
    if (avgGradeScore >= 4) {
      grade = 'A';
    } else if (avgGradeScore >= 3) {
      grade = 'B';
    }

    let message = 'Moderate impact';
    if (avgCo2 >= 200 || grade === 'C') {
      message = 'High environmental impact';
    } else if (avgCo2 < 100 && grade === 'A') {
      message = 'Low environmental impact';
    }

    return { grade, averageCo2: avgCo2, message };
  }

  saveStatus(order: BackendEcoOrder): void {
    const nextStatus = this.statusDrafts[order.id];
    if (!nextStatus || nextStatus === order.status) {
      return;
    }

    const payload: EcoOrderRequest = {
      ref: order.ref,
      companyName: order.companyName,
      material: order.material,
      qtyKg: order.qtyKg,
      supplier: order.supplier,
      distanceKm: order.distanceKm,
      orderDate: order.orderDate,
      status: nextStatus,
      grade: order.grade,
      co2Saved: order.co2Saved ?? null,
      waterSaved: order.waterSaved ?? null,
      wasteAvoided: order.wasteAvoided ?? null,
      enterpriseId: this.currentEnterpriseId(this.auth.currentUser),
    };

    this.savingId = order.id;
    this.error = '';

    this.orderApi.update(order.id, payload).subscribe({
      next: () => this.loadData(),
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to update order status.';
        this.savingId = null;
      },
    });
  }

  lifecycleStage(order: BackendEcoOrder): 'created' | 'processing' | 'completed' {
    if (order.status === 'shipped') {
      return 'processing';
    }
    if (order.status === 'delivered') {
      return 'completed';
    }
    return 'created';
  }

  lifecycleProgress(order: BackendEcoOrder): number {
    const stage = this.lifecycleStage(order);
    if (stage === 'completed') {
      return 100;
    }
    if (stage === 'processing') {
      return 66;
    }
    return 33;
  }

  impactMessage(order: BackendEcoOrder): string {
    const co2 = this.co2Value(order);
    const grade = this.gradeScore(order.grade);

    if (co2 >= 200 || grade <= 2) {
      return 'High environmental impact';
    }
    if (co2 >= 100 || grade <= 3) {
      return 'Moderate impact';
    }
    return 'Low environmental impact';
  }

  estimatedCo2(order: BackendEcoOrder): number {
    return this.co2Value(order);
  }

  private loadData(): void {
    this.loading = true;
    this.error = '';

    forkJoin({
      slots: this.slotApi.list(false),
      reservations: this.reservationApi.list(false),
      orders: this.orderApi.list(false),
    }).subscribe({
      next: ({ slots, reservations, orders }) => {
        const ownedSlots = slots.filter(slot => !slot.deleted && this.isMySlot(slot));
        const relatedReservations = reservations.filter(
          reservation => !reservation.deleted && this.belongsToOwnedSlots(reservation, ownedSlots),
        );

        this.relatedCompanyNames = new Set(
          relatedReservations
            .map(reservation => (reservation.companyName ?? '').trim().toLowerCase())
            .filter(Boolean),
        );

        this.orders = orders;
        this.statusDrafts = {};
        for (const order of this.visibleOrders) {
          this.statusDrafts[order.id] = order.status;
        }

        this.loading = false;
        this.savingId = null;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to load orders.';
        this.loading = false;
        this.savingId = null;
      },
    });
  }

  private co2Value(order: BackendEcoOrder): number {
    if (order.co2Saved != null) {
      return Math.round(Number(order.co2Saved));
    }
    return Math.max(0, Math.round(order.qtyKg * 0.4 - order.distanceKm * 0.08));
  }

  private gradeScore(grade: string): number {
    if (grade === 'A') return 5;
    if (grade === 'B') return 4;
    if (grade === 'C') return 3;
    if (grade === 'D') return 2;
    return 1;
  }

  private isRelatedOrder(order: BackendEcoOrder): boolean {
    const company = (order.companyName ?? '').trim().toLowerCase();
    const currentCompany = this.auth.currentUser?.company?.trim().toLowerCase() || '';
    const enterpriseId = this.currentEnterpriseId(this.auth.currentUser);

    return (
      (!!enterpriseId && order.enterprise?.id === enterpriseId) ||
      (!!company && this.relatedCompanyNames.has(company)) ||
      (!!currentCompany && company === currentCompany)
    );
  }

  private belongsToOwnedSlots(
    reservation: BackendReservation,
    ownedSlots: BackendReservationSlot[],
  ): boolean {
    const reservationMachine = (reservation.machine ?? reservation.item ?? '').trim().toLowerCase();
    const reservationDate = reservation.fromDate;
    const reservationStart = reservation.startHour ?? null;
    const reservationHours = reservation.hours ?? 1;

    return ownedSlots.some(slot => {
      const sameMachine = slot.machine.trim().toLowerCase() === reservationMachine;
      const sameDate = slot.date === reservationDate;

      if (!sameMachine || !sameDate) {
        return false;
      }

      if (reservationStart === null) {
        return true;
      }

      const reservationEnd = reservationStart + reservationHours;
      return reservationStart < slot.endHour && reservationEnd > slot.startHour;
    });
  }

  private isMySlot(slot: BackendReservationSlot): boolean {
    const user = this.auth.currentUser;
    const owner = (slot.owner ?? '').trim().toLowerCase();
    const company = user?.company?.trim().toLowerCase() || '';
    const name = user?.name?.trim().toLowerCase() || '';
    const email = user?.email?.trim().toLowerCase() || '';
    const enterpriseId = this.currentEnterpriseId(user);

    return (
      (!!enterpriseId && slot.enterprise?.id === enterpriseId) ||
      (!!company && owner === company) ||
      (!!name && owner === name) ||
      (!!email && owner === email)
    );
  }

  private currentEnterpriseId(user: User | null): number | null {
    const parsed = user?.id ? Number(user.id) : NaN;
    return Number.isFinite(parsed) ? parsed : null;
  }
}
