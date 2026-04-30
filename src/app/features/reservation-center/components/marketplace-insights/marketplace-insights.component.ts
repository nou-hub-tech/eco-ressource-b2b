import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { BackendEcoOrder } from '../../../../pages/moduleReservation/shared/api/eco-order-api.service';
import { BackendReservation } from '../../../../pages/moduleReservation/shared/api/reservation-api.service';
import { BackendReservationSlot } from '../../../../pages/moduleReservation/shared/api/reservation-slot-api.service';
import { ReservationCenterService } from '../../services/reservation-center.service';
import { ReservationCenterState } from '../../state/reservation-center.state';

interface InsightMetric {
  label: string;
  value: string;
  detail: string;
}

interface SlotDemandRow {
  label: string;
  requests: number;
}

@Component({
  selector: 'app-marketplace-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketplace-insights.component.html',
  styleUrls: ['./marketplace-insights.component.css'],
})
export class MarketplaceInsightsComponent implements OnInit {
  loading = true;
  error = '';

  reservations: BackendReservation[] = [];
  slots: BackendReservationSlot[] = [];
  orders: BackendEcoOrder[] = [];
  currentEnterpriseId: number | null = null;

  constructor(
    private readonly auth: AuthService,
    private readonly state: ReservationCenterState,
    private readonly workspace: ReservationCenterService,
  ) {}

  ngOnInit(): void {
    this.currentEnterpriseId = this.auth.currentUser?.enterprise?.id ?? this.auth.currentUser?.enterpriseId ?? null;
    this.state.loadAll().subscribe({
      next: snapshot => {
        this.reservations = snapshot.reservations;
        this.slots = snapshot.slots;
        this.orders = snapshot.orders;
        this.loading = false;
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to load marketplace insights.';
        this.loading = false;
      },
    });
  }

  get metrics(): InsightMetric[] {
    const reservations = this.linkedReservations;
    const ownedSlots = this.ownedSlots;
    const peakHour = this.peakHourLabel(reservations);
    const confirmationRate = reservations.length
      ? Math.round((reservations.filter(item => item.status === 'CONFIRMED').length / reservations.length) * 100)
      : 0;
    const lowDemandCount = this.lowDemandRows.length;
    const ecoOrders = this.relatedOrders.length;

    return [
      {
        label: 'Peak reservation hour',
        value: peakHour,
        detail: `${reservations.length} linked request(s) analyzed`,
      },
      {
        label: 'Confirmation rate',
        value: `${confirmationRate}%`,
        detail: `${ecoOrders} eco order(s) linked to this enterprise`,
      },
      {
        label: 'Owned slot coverage',
        value: `${ownedSlots.length}`,
        detail: `${lowDemandCount} low-demand period(s) detected`,
      },
    ];
  }

  get requestedSlotRows(): SlotDemandRow[] {
    const demand = new Map<string, SlotDemandRow>();

    for (const reservation of this.providerReservations) {
      const slot = this.slots.find(item => item.id === reservation.slotId);
      const key = slot
        ? `${slot.id}`
        : `${reservation.machine}-${reservation.date}-${reservation.startHour}`;
      const label = slot
        ? `${slot.machine} · ${slot.date} · ${slot.startHour}:00-${slot.endHour}:00`
        : `${reservation.machine} · ${reservation.date} · ${reservation.startHour}:00`;

      const existing = demand.get(key);
      if (existing) {
        existing.requests += 1;
      } else {
        demand.set(key, { label, requests: 1 });
      }
    }

    return [...demand.values()]
      .sort((left, right) => right.requests - left.requests || left.label.localeCompare(right.label))
      .slice(0, 3);
  }

  get lowDemandRows(): string[] {
    return this.ownedSlots
      .filter(slot => !this.providerReservations.some(reservation => reservation.slotId === slot.id))
      .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour)
      .slice(0, 3)
      .map(slot => `${slot.date} · ${slot.startHour}:00-${slot.endHour}:00 · ${slot.machine}`);
  }

  get empty(): boolean {
    return !this.linkedReservations.length && !this.ownedSlots.length && !this.relatedOrders.length;
  }

  private get linkedReservations(): BackendReservation[] {
    return this.reservations.filter(reservation => {
      const relations = this.workspace.getReservationRelations(reservation, this.slots);
      return relations.consumerEnterpriseId === this.currentEnterpriseId || relations.providerEnterpriseId === this.currentEnterpriseId;
    });
  }

  private get providerReservations(): BackendReservation[] {
    return this.reservations.filter(reservation => {
      const relations = this.workspace.getReservationRelations(reservation, this.slots);
      return relations.providerEnterpriseId === this.currentEnterpriseId;
    });
  }

  private get ownedSlots(): BackendReservationSlot[] {
    return this.slots.filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) === this.currentEnterpriseId);
  }

  private get relatedOrders(): BackendEcoOrder[] {
    return this.orders.filter(order => (order.enterprise?.id ?? null) === this.currentEnterpriseId);
  }

  private peakHourLabel(reservations: BackendReservation[]): string {
    if (!reservations.length) {
      return 'No demand yet';
    }

    const grouped = new Map<number, number>();
    for (const reservation of reservations) {
      const count = grouped.get(reservation.startHour) ?? 0;
      grouped.set(reservation.startHour, count + 1);
    }

    const peak = [...grouped.entries()].sort((left, right) => right[1] - left[1] || left[0] - right[0])[0];
    return peak ? `${peak[0]}:00` : 'No demand yet';
  }
}
