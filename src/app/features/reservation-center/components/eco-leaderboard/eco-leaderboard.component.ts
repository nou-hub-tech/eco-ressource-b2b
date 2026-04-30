import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BackendEcoOrder } from '../../../../pages/moduleReservation/shared/api/eco-order-api.service';
import { BackendReservation } from '../../../../pages/moduleReservation/shared/api/reservation-api.service';
import { BackendReservationSlot } from '../../../../pages/moduleReservation/shared/api/reservation-slot-api.service';
import { ReservationCenterService } from '../../services/reservation-center.service';
import { ReservationCenterState } from '../../state/reservation-center.state';

interface LeaderboardRow {
  enterpriseId: number;
  enterpriseName: string;
  totalCo2Saved: number;
  ecoScore: number;
  usageRate: number;
  usedSlots: number;
  totalSlots: number;
}

interface AggregateRow {
  enterpriseId: number;
  enterpriseName: string;
  totalCo2Saved: number;
  reservationUsage: number;
  totalSlots: number;
  usedSlots: number;
}

@Component({
  selector: 'app-eco-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eco-leaderboard.component.html',
  styleUrls: ['./eco-leaderboard.component.css'],
})
export class EcoLeaderboardComponent implements OnInit {
  loading = true;
  error = '';

  reservations: BackendReservation[] = [];
  slots: BackendReservationSlot[] = [];
  orders: BackendEcoOrder[] = [];

  constructor(
    private readonly state: ReservationCenterState,
    private readonly workspace: ReservationCenterService,
  ) {}

  ngOnInit(): void {
    this.state.loadAll().subscribe({
      next: snapshot => {
        this.reservations = snapshot.reservations;
        this.slots = snapshot.slots;
        this.orders = snapshot.orders;
        this.loading = false;
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to load eco leaderboard.';
        this.loading = false;
      },
    });
  }

  get rows(): LeaderboardRow[] {
    const map = new Map<number, AggregateRow>();

    const ensure = (enterpriseId: number | null, enterpriseName: string | null | undefined): AggregateRow | null => {
      if (enterpriseId == null) {
        return null;
      }

      const existing = map.get(enterpriseId);
      if (existing) {
        if (!existing.enterpriseName && enterpriseName) {
          existing.enterpriseName = enterpriseName;
        }
        return existing;
      }

      const row: AggregateRow = {
        enterpriseId,
        enterpriseName: enterpriseName ?? `Enterprise #${enterpriseId}`,
        totalCo2Saved: 0,
        reservationUsage: 0,
        totalSlots: 0,
        usedSlots: 0,
      };
      map.set(enterpriseId, row);
      return row;
    };

    for (const slot of this.slots) {
      const enterpriseId = slot.enterprise?.id ?? slot.enterpriseId ?? null;
      const row = ensure(enterpriseId, slot.enterprise?.companyName);
      if (!row) {
        continue;
      }

      row.totalSlots += 1;
      if (slot.status === 'booked') {
        row.usedSlots += 1;
      }
    }

    for (const reservation of this.reservations) {
      const relations = this.workspace.getReservationRelations(reservation, this.slots);
      const row = ensure(relations.providerEnterpriseId, undefined);
      if (!row) {
        continue;
      }

      row.reservationUsage += 1;
      if (reservation.status === 'CONFIRMED' && reservation.slotId != null) {
        const slot = this.slots.find(item => item.id === reservation.slotId);
        if (slot && slot.status !== 'booked') {
          row.usedSlots += 1;
        }
      }
    }

    for (const order of this.orders) {
      const row = ensure(order.enterprise?.id ?? null, order.enterprise?.companyName);
      if (!row) {
        continue;
      }

      row.totalCo2Saved += Math.round(order.co2Saved ?? 0);
    }

    return [...map.values()]
      .map(row => {
        const usageRate = row.totalSlots ? Math.round((row.usedSlots / row.totalSlots) * 100) : 0;
        const ecoScore = Math.round(row.totalCo2Saved * 0.55 + row.reservationUsage * 10 + usageRate * 1.2);

        return {
          enterpriseId: row.enterpriseId,
          enterpriseName: row.enterpriseName || `Enterprise #${row.enterpriseId}`,
          totalCo2Saved: row.totalCo2Saved,
          ecoScore,
          usageRate,
          usedSlots: row.usedSlots,
          totalSlots: row.totalSlots,
        };
      })
      .sort((left, right) => right.ecoScore - left.ecoScore || right.totalCo2Saved - left.totalCo2Saved)
      .slice(0, 5);
  }
}
