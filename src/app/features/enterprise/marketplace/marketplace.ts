import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationCenterState } from '../../../features/reservation-center/state/reservation-center.state';
import { BackendReservationSlot } from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';

@Component({
  selector: 'app-marketplace',
  standalone: false,
  templateUrl: './marketplace.html',
  styleUrls: ['./marketplace.css'],
})
export class Marketplace implements OnInit {
  loading = true;
  error = '';
  search = '';
  solarOnly = false;

  slots: BackendReservationSlot[] = [];
  currentEnterpriseId: number | null = null;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly state: ReservationCenterState,
  ) {}

  ngOnInit(): void {
    this.currentEnterpriseId = this.auth.currentUser?.enterprise?.id ?? this.auth.currentUser?.enterpriseId ?? null;
    this.state.loadAll().subscribe({
      next: snapshot => {
        this.loading = false;
        this.slots = snapshot.slots;
      },
      error: error => {
        this.loading = false;
        this.error = error?.error?.message ?? 'Failed to load marketplace slots.';
      },
    });
  }

  get marketplaceSlots(): BackendReservationSlot[] {
    const query = this.search.trim().toLowerCase();

    return this.slots
      .filter(slot => slot.status === 'open')
      .filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) !== this.currentEnterpriseId)
      .filter(slot => !this.solarOnly || slot.solar)
      .filter(slot => {
        if (!query) {
          return true;
        }

        const provider = slot.enterprise?.companyName ?? `enterprise ${slot.enterprise?.id ?? slot.enterpriseId ?? ''}`;
        return [slot.machine, slot.date, provider].some(value => value.toLowerCase().includes(query));
      })
      .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
  }

  reserve(slot: BackendReservationSlot): void {
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
}
