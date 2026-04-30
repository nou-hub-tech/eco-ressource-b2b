import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ResourceKind } from '../../../features/reservation-center/models/reservation-center.models';
import { ReservationCenterService } from '../../../features/reservation-center/services/reservation-center.service';
import { ReservationCenterState } from '../../../features/reservation-center/state/reservation-center.state';
import { BackendReservationSlot } from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';

@Component({
  selector: 'app-marketplace',
  standalone: false,
  templateUrl: './marketplace.html',
  styleUrls: ['./marketplace.css'],
})
export class Marketplace implements OnInit, OnDestroy {
  loading = true;
  error = '';
  search = '';
  searchInput = '';
  solarOnly = false;
  selectedType: 'all' | ResourceKind = 'all';
  selectedDate = '';
  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  slots: BackendReservationSlot[] = [];
  currentEnterpriseId: number | null = null;
  readonly resourceTypes: Array<'all' | ResourceKind> = ['all', 'Machine', 'Space', 'Tool', 'Other'];

  constructor(
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public readonly workspace: ReservationCenterService,
    private readonly state: ReservationCenterState,
  ) {}

  ngOnInit(): void {
    this.currentEnterpriseId = this.auth.currentUser?.enterprise?.id ?? this.auth.currentUser?.enterpriseId ?? null;
    this.route.queryParamMap.subscribe(params => {
      const query = params.get('q') ?? '';
      this.searchInput = query;
      this.search = query.trim().toLowerCase();
    });
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

  ngOnDestroy(): void {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
  }

  get marketplaceSlots(): BackendReservationSlot[] {
    const query = this.search;

    return this.slots
      .filter(slot => slot.status === 'open')
      .filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) !== this.currentEnterpriseId)
      .filter(slot => this.selectedType === 'all' || this.resourceKind(slot.machine) === this.selectedType)
      .filter(slot => !this.solarOnly || slot.solar)
      .filter(slot => !this.selectedDate || slot.date === this.selectedDate)
      .filter(slot => {
        if (!query) {
          return true;
        }

        const provider = slot.enterprise?.companyName ?? `enterprise ${slot.enterprise?.id ?? slot.enterpriseId ?? ''}`;
        return [slot.machine, slot.date, provider, this.resourceName(slot.machine)].some(value => value.toLowerCase().includes(query));
      })
      .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
  }

  get openCount(): number {
    return this.marketplaceSlots.length;
  }

  get solarCount(): number {
    return this.marketplaceSlots.filter(slot => slot.solar).length;
  }

  get discountedCount(): number {
    return this.marketplaceSlots.filter(slot => (slot.discountPct ?? 0) > 0).length;
  }

  updateSearch(value: string): void {
    this.searchInput = value;
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.search = value.trim().toLowerCase();
    }, 180);
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

  windowLabel(slot: BackendReservationSlot): string {
    return this.workspace.formatWindow(slot.startHour, slot.endHour);
  }

  providerName(slot: BackendReservationSlot): string {
    return slot.enterprise?.companyName ?? `Enterprise #${slot.enterprise?.id ?? slot.enterpriseId ?? ''}`;
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
