import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  ResourceKind,
  UiReservationStatus,
} from '../../../features/reservation-center/models/reservation-center.models';
import { ReservationCenterService } from '../../../features/reservation-center/services/reservation-center.service';
import { ReservationCenterState } from '../../../features/reservation-center/state/reservation-center.state';
import { BackendEcoOrder } from '../../../pages/moduleReservation/shared/api/eco-order-api.service';
import { BackendReservation } from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import { BackendReservationSlot } from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';

type DashboardFilter = 'all' | ResourceKind;
type DashboardStatKey = 'available' | 'reserved' | 'blocked' | 'utilization';

interface DashboardActionCard {
  title: string;
  message: string;
  confidence: string;
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
  searchQuery = '';
  selectedType: DashboardFilter = 'all';

  currentEnterpriseId: number | null = null;
  companyName = 'Enterprise';

  slots: BackendReservationSlot[] = [];
  reservations: BackendReservation[] = [];
  orders: BackendEcoOrder[] = [];

  displayedStats: Record<DashboardStatKey, number> = {
    available: 0,
    reserved: 0,
    blocked: 0,
    utilization: 0,
  };

  readonly resourceTypes: DashboardFilter[] = ['all', 'Machine', 'Space', 'Tool', 'Other'];

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    public readonly workspace: ReservationCenterService,
    private readonly state: ReservationCenterState,
  ) {}

  ngOnInit(): void {
    const currentUser = this.auth.currentUser;
    this.currentEnterpriseId = currentUser?.enterprise?.id ?? currentUser?.enterpriseId ?? null;
    this.companyName =
      currentUser?.enterprise?.companyName ??
      currentUser?.company ??
      currentUser?.name ??
      'Enterprise';

    this.state.loadAll().subscribe({
      next: snapshot => {
        this.slots = snapshot.slots;
        this.reservations = snapshot.reservations;
        this.orders = snapshot.orders;
        this.loading = false;
        this.animateStats({
          available: this.availableCount,
          reserved: this.reservedCount,
          blocked: this.blockedCount,
          utilization: this.utilization,
        });
      },
      error: error => {
        this.loading = false;
        this.error = error?.error?.message ?? 'Failed to load the enterprise dashboard.';
      },
    });
  }

  get ownedResources(): BackendReservationSlot[] {
    return this.slots
      .filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) === this.currentEnterpriseId)
      .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
  }

  get marketplaceResources(): BackendReservationSlot[] {
    return this.slots
      .filter(slot => slot.status === 'open')
      .filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) !== this.currentEnterpriseId)
      .filter(slot => this.matchesSearch(slot.machine, slot.enterprise?.companyName ?? ''))
      .filter(slot => this.selectedType === 'all' || this.resourceKind(slot.machine) === this.selectedType)
      .slice(0, 6);
  }

  get filteredOwnedResources(): BackendReservationSlot[] {
    return this.ownedResources
      .filter(slot => this.matchesSearch(slot.machine, slot.date))
      .filter(slot => this.selectedType === 'all' || this.resourceKind(slot.machine) === this.selectedType)
      .slice(0, 4);
  }

  get availableCount(): number {
    return this.ownedResources.filter(slot => slot.status === 'open').length;
  }

  get reservedCount(): number {
    return this.ownedResources.filter(slot => slot.status === 'booked').length;
  }

  get blockedCount(): number {
    return this.ownedResources.filter(slot => slot.status === 'blocked').length;
  }

  get utilization(): number {
    return this.ownedResources.length ? Math.round((this.reservedCount / this.ownedResources.length) * 100) : 0;
  }

  get utilizationStrokeOffset(): number {
    const circumference = 2 * Math.PI * 34;
    return circumference - (circumference * this.displayedStats.utilization) / 100;
  }

  get pendingIncomingCount(): number {
    return this.providerReservations.filter(item => item.status === 'PENDING').length;
  }

  get pendingOutgoingCount(): number {
    return this.myReservations.filter(item => item.status === 'PENDING').length;
  }

  get confirmedOrdersCount(): number {
    return this.orders.filter(order => order.status === 'confirmed' || order.status === 'shipped' || order.status === 'delivered').length;
  }

  get totalCo2Saved(): number {
    return Math.round(this.orders.reduce((sum, order) => sum + (order.co2Saved ?? 0), 0));
  }

  get providerReservations(): BackendReservation[] {
    return this.reservations
      .filter(reservation => this.workspace.getReservationRelations(reservation, this.slots).providerEnterpriseId === this.currentEnterpriseId)
      .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour)
      .slice(0, 3);
  }

  get myReservations(): BackendReservation[] {
    return this.reservations
      .filter(reservation => this.workspace.getReservationRelations(reservation, this.slots).consumerEnterpriseId === this.currentEnterpriseId)
      .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour)
      .slice(0, 3);
  }

  get spotlightActions(): DashboardActionCard[] {
    const kinds = this.ownedResources.map(slot => this.resourceKind(slot.machine));
    const spaces = kinds.filter(kind => kind === 'Space').length;
    const tools = kinds.filter(kind => kind === 'Tool').length;
    const peakHour = this.peakReservationHour;

    return [
      {
        title: `Increase capacity around ${peakHour}`,
        message: 'Reservation traffic is clustering here, so a fresh open resource block is likely to convert quickly.',
        confidence: `${Math.max(72, this.utilization)}% confidence`,
        tone: 'eco',
      },
      {
        title: spaces ? 'Friday spaces are trending soft' : 'Review underused resource windows',
        message: spaces
          ? 'Your space inventory has lighter demand later in the week. A small discount can improve fill rate.'
          : 'Open resources with no requests yet are the best place to test a promo or wider availability window.',
        confidence: `${Math.min(96, 58 + this.availableCount * 8)}% confidence`,
        tone: 'info',
      },
      {
        title: tools ? 'Bundle underused tools with peak resources' : 'Watch blocked resources closely',
        message: tools
          ? 'Tool inventory is lagging behind machine demand. Bundle adjacent availability to improve cross-sell.'
          : 'Blocked resources are suppressing utilization. Reopen them where there is no confirmed conflict.',
        confidence: `${Math.min(97, 64 + this.blockedCount * 7)}% confidence`,
        tone: 'warn',
      },
    ];
  }

  get peakReservationHour(): string {
    const counts = new Map<number, number>();
    for (const reservation of [...this.myReservations, ...this.providerReservations]) {
      counts.set(reservation.startHour, (counts.get(reservation.startHour) ?? 0) + 1);
    }

    if (!counts.size) {
      return '10 AM';
    }

    const [hour] = [...counts.entries()].sort((left, right) => right[1] - left[1])[0];
    return this.workspace.formatHour(hour);
  }

  resourceKind(value: string): ResourceKind {
    return this.workspace.resourceKind(value);
  }

  resourceName(value: string): string {
    return this.workspace.resourceName(value);
  }

  resourceToken(value: string): string {
    return this.workspace.resourceToken(value);
  }

  resourceAccent(value: string): string {
    return this.workspace.resourceAccent(this.resourceKind(value));
  }

  reservationWindow(reservation: BackendReservation): string {
    return this.workspace.formatWindow(reservation.startHour, reservation.startHour + reservation.hours);
  }

  slotWindow(slot: BackendReservationSlot): string {
    return this.workspace.formatWindow(slot.startHour, slot.endHour);
  }

  providerName(slot: BackendReservationSlot): string {
    return slot.enterprise?.companyName ?? `Enterprise #${slot.enterprise?.id ?? slot.enterpriseId ?? ''}`;
  }

  uiStatus(reservation: BackendReservation): UiReservationStatus {
    return this.workspace.toUiReservationStatus(reservation.status);
  }

  requestReservation(slot: BackendReservationSlot): void {
    this.router.navigate(['/enterprise/reservations'], {
      queryParams: {
        slotId: slot.id,
        machine: slot.machine,
        date: slot.date,
        startHour: slot.startHour,
        hours: Math.max(1, slot.endHour - slot.startHour),
        solar: slot.solar,
      },
    });
  }

  private matchesSearch(...values: string[]): boolean {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return true;
    }

    return values.some(value => value.toLowerCase().includes(query));
  }

  private animateStats(targets: Record<DashboardStatKey, number>): void {
    const duration = 700;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      this.displayedStats = {
        available: Math.round(targets.available * eased),
        reserved: Math.round(targets.reserved * eased),
        blocked: Math.round(targets.blocked * eased),
        utilization: Math.round(targets.utilization * eased),
      };

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }
}
