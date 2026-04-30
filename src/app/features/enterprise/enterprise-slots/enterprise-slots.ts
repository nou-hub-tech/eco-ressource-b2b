import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AiService } from '../../../../services/ai.service';
import {
  BackendReservationSlot,
  ReservationSlotApiService,
  SlotRequest,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';
import {
  BackendReservation,
  ReservationApiService,
  ReservationCreateRequest,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import { AuthService } from '../../../core/services/auth.service';

type SlotFormModel = {
  enterpriseId: number | null;
  machine: string;
  date: string;
  startHour: number;
  endHour: number;
  solar: boolean;
  discountPct: number;
};

type SmartSlotSuggestion = {
  date: string;
  startHour: number;
  endHour: number;
  recommendedDiscountPct: number;
  solarLikely: boolean;
  reason: string;
};

type HeatmapBucket = {
  date: string;
  label: string;
  startHour: number;
  endHour: number;
  color: 'red' | 'green' | 'yellow' | 'blue';
  text: string;
  reservationCount: number;
};

@Component({
  selector: 'app-enterprise-slots',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enterprise-slots.html',
  styleUrls: ['./enterprise-slots.css'],
})
export class EnterpriseSlots implements OnInit {
  loading = true;
  saving = false;
  reserveSavingId: number | null = null;
  error = '';
  success = '';

  editingId: number | null = null;
  currentEnterpriseId: number | null = null;
  aiRecommendations: string[] = [];
  slots: BackendReservationSlot[] = [];
  reservations: BackendReservation[] = [];

  form: SlotFormModel = this.createEmptyForm();

  constructor(
    private readonly aiService: AiService,
    private readonly slotApi: ReservationSlotApiService,
    private readonly reservationApi: ReservationApiService,
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get isAdminView(): boolean {
    return this.auth.currentUser?.role === 'admin';
  }

  get durationHours(): number {
    return Math.max(0, this.form.endHour - this.form.startHour);
  }

  get mine(): BackendReservationSlot[] {
    if (this.isAdminView) {
      return this.slots;
    }
    return this.slots.filter(slot => this.enterpriseIdForSlot(slot) === this.currentEnterpriseId);
  }

  get marketplaceSlots(): BackendReservationSlot[] {
    if (this.isAdminView) {
      return [];
    }
    return this.slots
      .filter(slot => this.enterpriseIdForSlot(slot) !== this.currentEnterpriseId)
      .filter(slot => slot.status === 'open')
      .sort((a, b) => a.date.localeCompare(b.date) || a.startHour - b.startHour);
  }

  get bookedSlotsCount(): number {
    return this.mine.filter(slot => slot.status === 'booked').length;
  }

  get availableSlotsCount(): number {
    return this.mine.filter(slot => slot.status === 'open').length;
  }

  get usagePercent(): number {
    const total = this.bookedSlotsCount + this.availableSlotsCount;
    return total ? Math.round((this.bookedSlotsCount / total) * 100) : 0;
  }

  get smartSuggestion(): SmartSlotSuggestion | null {
    const candidate = this.mine
      .filter(slot => slot.status === 'open')
      .map(slot => ({ slot, density: this.slotDemandDensity(slot) }))
      .sort((a, b) => {
        if (a.density !== b.density) {
          return a.density - b.density;
        }
        if (a.slot.solar !== b.slot.solar) {
          return a.slot.solar ? -1 : 1;
        }
        return a.slot.date.localeCompare(b.slot.date) || a.slot.startHour - b.slot.startHour;
      })[0];

    if (!candidate) {
      return null;
    }

    const duration = Math.max(1, candidate.slot.endHour - candidate.slot.startHour);
    return {
      date: candidate.slot.date,
      startHour: candidate.slot.startHour,
      endHour: candidate.slot.endHour,
      recommendedDiscountPct: Math.min(30, Math.max(5, 10 + (candidate.slot.solar ? 8 : 0) - candidate.density * 2)),
      solarLikely: candidate.slot.solar,
      reason: candidate.density === 0
        ? 'This slot is open with no nearby reservation pressure.'
        : 'This slot stays the least congested among your available windows.',
    };
  }

  get bestMarketplaceSlot(): BackendReservationSlot | null {
    if (this.isAdminView) {
      return null;
    }
    const candidate = this.marketplaceSlots
      .map(slot => ({ slot, density: this.slotDemandDensity(slot) }))
      .sort((a, b) => {
        const scoreA = this.marketplaceScore(a.slot, a.density);
        const scoreB = this.marketplaceScore(b.slot, b.density);
        return scoreB - scoreA;
      })[0];

    return candidate?.slot ?? null;
  }

  get heatmapRows(): HeatmapBucket[][] {
    const sourceDates = [...new Set([
      ...this.slots.map(slot => slot.date),
      ...this.reservations.map(reservation => reservation.date),
    ])].sort().slice(0, 7);
    const buckets = [
      { startHour: 0, endHour: 6, label: '00-06' },
      { startHour: 6, endHour: 12, label: '06-12' },
      { startHour: 12, endHour: 18, label: '12-18' },
      { startHour: 18, endHour: 24, label: '18-24' },
    ];

    return sourceDates.map(date =>
      buckets.map(bucket => this.buildHeatmapBucket(date, bucket.label, bucket.startHour, bucket.endHour)),
    );
  }

  save(): void {
    this.error = '';
    this.success = '';

    if (this.form.enterpriseId == null && this.currentEnterpriseId == null) {
      this.error = 'Unable to resolve enterprise ID from backend data.';
      return;
    }
    if (!this.form.machine.trim() || !this.form.date) {
      this.error = 'Machine and date are required.';
      return;
    }
    if (this.form.endHour <= this.form.startHour) {
      this.error = 'End hour must be after start hour.';
      return;
    }

    const payload: SlotRequest = {
      machine: this.form.machine.trim(),
      date: this.form.date,
      startHour: this.form.startHour,
      endHour: this.form.endHour,
      solar: this.form.solar,
      discountPct: this.form.discountPct,
      enterpriseId: this.form.enterpriseId ?? this.currentEnterpriseId,
      status: 'open',
    };

    this.saving = true;
    const request$ = this.editingId
      ? this.slotApi.update(this.editingId, payload)
      : this.slotApi.create(payload);

    request$.subscribe({
      next: () => {
        this.success = this.editingId ? 'Slot updated.' : 'Slot created.';
        this.resetForm();
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to save slot.';
        this.saving = false;
      },
    });
  }

  reserve(slot: BackendReservationSlot): void {
    if (this.currentEnterpriseId == null) {
      this.error = 'Unable to resolve enterprise identity for the reservation.';
      return;
    }

    const payload: ReservationCreateRequest = {
      company: this.auth.currentUser?.enterprise?.companyName ?? this.auth.currentUser?.company ?? this.auth.currentUser?.name ?? 'Enterprise',
      machine: slot.machine,
      date: slot.date,
      hours: Math.max(1, slot.endHour - slot.startHour),
      startHour: slot.startHour,
      status: 'PENDING',
      solar: slot.solar,
      slotId: slot.id,
      enterpriseId: this.currentEnterpriseId,
    };

    this.error = '';
    this.success = '';
    this.reserveSavingId = slot.id;

    this.reservationApi.createWithSlot(slot.id, {
      company: payload.company,
      machine: payload.machine,
      date: payload.date,
      hours: payload.hours,
      startHour: payload.startHour,
      status: payload.status,
      solar: payload.solar,
      enterpriseId: payload.enterpriseId,
    }).subscribe({
      next: () => {
        this.success = `Reservation created for slot ${slot.machine} on ${slot.date}.`;
        this.reserveSavingId = null;
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to reserve marketplace slot.';
        this.reserveSavingId = null;
      },
    });
  }

  optimizeMySchedule(): void {
    if (!this.smartSuggestion) {
      this.error = 'No schedule suggestion available from your current slot history.';
      return;
    }

    this.form.date = this.smartSuggestion.date;
    this.form.startHour = this.smartSuggestion.startHour;
    this.form.endHour = this.smartSuggestion.endHour;
    this.form.discountPct = this.smartSuggestion.recommendedDiscountPct;
    this.form.solar = this.smartSuggestion.solarLikely;
    this.success = 'Schedule optimized from your current availability pattern.';
    this.error = '';
  }

  edit(slot: BackendReservationSlot): void {
    this.editingId = slot.id;
    this.form = {
      enterpriseId: this.enterpriseIdForSlot(slot),
      machine: slot.machine ?? '',
      date: slot.date ?? '',
      startHour: slot.startHour ?? 8,
      endHour: slot.endHour ?? 9,
      solar: !!slot.solar,
      discountPct: slot.discountPct ?? 0,
    };
    this.success = '';
    this.error = '';
  }

  remove(slot: BackendReservationSlot): void {
    if (!window.confirm(`Delete slot for ${slot.machine} on ${slot.date}?`)) {
      return;
    }

    this.error = '';
    this.success = '';
    this.slotApi.delete(slot.id).subscribe({
      next: () => {
        this.success = 'Slot deleted.';
        if (this.editingId === slot.id) {
          this.resetForm();
        }
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to delete slot.';
      },
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form = this.createEmptyForm();
  }

  heatmapBackground(bucket: HeatmapBucket): string {
    if (bucket.color === 'red') return '#ef4444';
    if (bucket.color === 'yellow') return '#facc15';
    if (bucket.color === 'blue') return '#3b82f6';
    return '#22c55e';
  }

  heatmapTextColor(bucket: HeatmapBucket): string {
    return bucket.color === 'yellow' ? '#111827' : '#ffffff';
  }

  private loadData(): void {
    this.loading = true;
    this.currentEnterpriseId = this.readCurrentEnterpriseId();

    forkJoin({
      slots: this.slotApi.list(false),
      reservations: this.reservationApi.list(false),
    }).subscribe({
      next: ({ slots, reservations }) => {
        this.slots = slots.filter(slot => !slot.deleted);
        this.reservations = reservations.filter(reservation => !reservation.deleted);
        this.loadAiRecommendations();
        this.hydrateEditorFromQuery();
        this.loading = false;
        this.saving = false;
        this.reserveSavingId = null;
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to load slots.';
        this.loading = false;
        this.saving = false;
        this.reserveSavingId = null;
      },
    });
  }

  private readCurrentEnterpriseId(): number | null {
    const raw = (
      this.auth.currentUser as {
        enterprise?: { id?: number | string };
        enterpriseId?: number | string;
      } | null
    )?.enterprise?.id ?? (
      this.auth.currentUser as {
        enterprise?: { id?: number | string };
        enterpriseId?: number | string;
      } | null
    )?.enterpriseId;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private enterpriseIdForSlot(slot: BackendReservationSlot): number | null {
    return slot.enterprise?.id ?? slot.enterpriseId ?? null;
  }

  private enterpriseIdForReservation(reservation: BackendReservation): number | null {
    return reservation.enterprise?.id ?? reservation.enterpriseId ?? null;
  }

  private slotDemandDensity(slot: BackendReservationSlot): number {
    return this.reservations.filter(reservation => {
      if (reservation.slotId != null) {
        return reservation.slotId === slot.id;
      }
      return (
        reservation.machine === slot.machine &&
        reservation.date === slot.date &&
        (reservation.startHour ?? 0) < slot.endHour &&
        ((reservation.startHour ?? 0) + (reservation.hours ?? 1)) > slot.startHour
      );
    }).length;
  }

  private buildHeatmapBucket(date: string, label: string, startHour: number, endHour: number): HeatmapBucket {
    const bucketSlots = this.slots.filter(slot =>
      slot.date === date &&
      slot.startHour < endHour &&
      slot.endHour > startHour,
    );
    const reservationCount = this.reservations.filter(reservation =>
      reservation.date === date &&
      (reservation.startHour ?? 0) < endHour &&
      ((reservation.startHour ?? 0) + (reservation.hours ?? 1)) > startHour,
    ).length;

    let color: HeatmapBucket['color'] = 'green';
    if (bucketSlots.some(slot => slot.status !== 'open')) {
      color = 'red';
    } else if (bucketSlots.some(slot => slot.solar) && reservationCount === 0) {
      color = 'blue';
    } else if (reservationCount > 0) {
      color = 'yellow';
    }

    return {
      date,
      label,
      startHour,
      endHour,
      color,
      text: bucketSlots.length ? `${bucketSlots.length} slot(s)` : 'No slots',
      reservationCount,
    };
  }

  private marketplaceScore(slot: BackendReservationSlot, density: number): number {
    let score = 0;
    if (slot.solar) score += 3;
    if (density === 0) score += 3;
    if (density === 1) score += 1;
    score += Math.max(0, 20 - (slot.discountPct ?? 0));
    return score;
  }

  private createEmptyForm(): SlotFormModel {
    return {
      enterpriseId: this.currentEnterpriseId,
      machine: '',
      date: new Date().toISOString().slice(0, 10),
      startHour: 8,
      endHour: 12,
      solar: false,
      discountPct: 0,
    };
  }

  private hydrateEditorFromQuery(): void {
    const editId = Number(this.route.snapshot.queryParamMap.get('editId'));
    if (!Number.isFinite(editId) || editId <= 0 || this.editingId === editId) {
      return;
    }

    const slot = this.slots.find(item => item.id === editId);
    if (slot) {
      this.edit(slot);
    }
  }

  private loadAiRecommendations(): void {
    this.aiService.getRecommendation().subscribe({
      next: response => {
        this.aiRecommendations = this.extractAiMessages(response);
      },
      error: () => {
        this.aiRecommendations = [];
      },
    });
  }

  private extractAiMessages(response: unknown): string[] {
    const source = Array.isArray(response)
      ? response
      : Array.isArray((response as { recommendations?: unknown[] } | null)?.recommendations)
        ? (response as { recommendations: unknown[] }).recommendations
        : Array.isArray((response as { items?: unknown[] } | null)?.items)
          ? (response as { items: unknown[] }).items
          : typeof (response as { message?: unknown } | null)?.message === 'string'
            ? [(response as { message: string }).message]
            : [];

    return source
      .map(item => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          const candidate = (item as { text?: unknown; message?: unknown; label?: unknown });
          if (typeof candidate.text === 'string') return candidate.text;
          if (typeof candidate.message === 'string') return candidate.message;
          if (typeof candidate.label === 'string') return candidate.label;
        }
        return '';
      })
      .filter(Boolean)
      .slice(0, 3);
  }
}
