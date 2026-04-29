import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService, User } from '../../../core/services/auth.service';
import {
  BackendReservation,
  ReservationApiService,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import {
  BackendReservationSlot,
  ReservationSlotApiService,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';

@Component({
  selector: 'app-enterprise-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enterprise-reservations.html',
  styleUrls: ['./enterprise-reservations.css'],
})
export class EnterpriseReservations implements OnInit {
  loading = true;
  error = '';
  query = '';

  reservations: BackendReservation[] = [];
  ownedSlots: BackendReservationSlot[] = [];

  constructor(
    private readonly auth: AuthService,
    private readonly reservationApi: ReservationApiService,
    private readonly slotApi: ReservationSlotApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get visibleReservations(): BackendReservation[] {
    const query = this.query.trim().toLowerCase();

    return this.reservations
      .filter(reservation => this.belongsToOwnedSlot(reservation))
      .filter(reservation => !reservation.deleted)
      .filter(reservation => {
        if (!query) {
          return true;
        }

        return (
          (reservation.companyName ?? '').toLowerCase().includes(query) ||
          (reservation.machine ?? reservation.item ?? '').toLowerCase().includes(query) ||
          (reservation.status ?? '').toLowerCase().includes(query)
        );
      });
  }

  cancel(reservation: BackendReservation): void {
    const reason = window.prompt('Cancellation reason (optional):', reservation.cancelReason ?? '') ?? '';

    this.reservationApi.cancel(reservation.id, reason).subscribe({
      next: () => this.loadData(),
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to cancel reservation.';
      },
    });
  }

  private loadData(): void {
    this.loading = true;
    this.error = '';

    forkJoin({
      slots: this.slotApi.list(false),
      reservations: this.reservationApi.list(false),
    }).subscribe({
      next: ({ slots, reservations }) => {
        this.ownedSlots = slots.filter(slot => !slot.deleted && this.isMySlot(slot));
        this.reservations = reservations.filter(reservation => !reservation.deleted);
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to load reservations.';
        this.loading = false;
      },
    });
  }

  private belongsToOwnedSlot(reservation: BackendReservation): boolean {
    const reservationMachine = (reservation.machine ?? reservation.item ?? '').trim().toLowerCase();
    const reservationDate = reservation.fromDate;
    const reservationStart = reservation.startHour ?? null;
    const reservationHours = reservation.hours ?? 1;

    return this.ownedSlots.some(slot => {
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
