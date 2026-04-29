import { Injectable, signal } from '@angular/core';
import { ReservationSlot, SlotStatus } from './../shared/models/slot.model';
import {
  ReservationSlotApiService,
  BackendReservationSlot,
  BackendSlotStatus,
  SlotRequest,
} from './../shared/api/reservation-slot-api.service';

/**
 * SlotStore
 * ---------
 * Single source of truth for ReservationSlot entities. Reads from the
 * backend at /api/reservation-slots and exposes a synchronous,
 * signal-based view that the slot-list, slot-form, and slot-calendar
 * pages consume directly.
 *
 * Mutation strategy: backend-first updates. The frontend does not mutate
 * local slot data directly for create/update/delete transitions; it waits
 * for API success and then refreshes from the server so backend state
 * remains the source of truth.
 */
@Injectable({ providedIn: 'root' })
export class SlotStore {

  private _slots = signal<ReservationSlot[]>([]);
  private _loading = signal(false);
  private _seeded = false;

  loading = this._loading.asReadonly();

  constructor(private api: ReservationSlotApiService) {}

  /** Read-all (used by all consumers). */
  all(): ReservationSlot[] { return this._slots(); }

  byId(id: number): ReservationSlot | undefined {
    return this._slots().find(s => s.id === id);
  }

  /**
   * Loads from backend on first call. Subsequent calls are no-ops unless
   * {@code force=true} is passed.
   */
  seedIfEmpty(force = false): void {
    if (this._seeded && !force) return;
    this._seeded = true;
    this.refresh();
  }

  /** Force a fresh fetch from the server. */
  refresh(): void {
    this._loading.set(true);
    this.api.list().subscribe({
      next: rows => {
        this._slots.set(rows.map(this.fromBackend));
        this._loading.set(false);
      },
      error: err => {
        console.error('[SlotStore] failed to load slots', err);
        this._loading.set(false);
      },
    });
  }

  // ====================================================================
  //  Mutations — backend first (API then refresh)
  // ====================================================================
  create(slot: Omit<ReservationSlot, 'id'>): ReservationSlot {
    this.api.create(this.toBackend(slot)).subscribe({
      next: () => this.refresh(),
      error: err => {
        console.error('[SlotStore] create failed', err);
      },
    });
    return { ...slot, id: 0 };
  }

  update(id: number, patch: Partial<ReservationSlot>): void {
    const current = this.byId(id);
    if (!current || id < 0) return;
    const merged = { ...current, ...patch };
    this.api.update(id, this.toBackend(merged)).subscribe({
      next: () => this.refresh(),
      error: err => {
        console.error('[SlotStore] update failed', err);
        this.refresh();
      },
    });
  }

  /** Soft delete with audit reason (the "delete" flow). */
  softDelete(id: number, reason: string): void {
    if (id < 0) return;
    this.api.cancel(id, reason).subscribe({
      next: () => this.refresh(),
      error: err => {
        console.error('[SlotStore] soft delete failed', err);
        this.refresh();
      },
    });
  }

  /** Drag & drop helper used by the heatmap. */
  bookSlot(id: number, byCompany: string): void {
    if (id < 0) return;
    this.api.book(id, byCompany).subscribe({
      next: () => this.refresh(),
      error: err => {
        console.error('[SlotStore] book failed', err);
        this.refresh();
      },
    });
  }

  // ====================================================================
  //  Mapping — backend ↔ frontend
  //  Backend uses lowercase enums (open/booked/blocked); frontend uses
  //  uppercase. Convert at the boundary.
  // ====================================================================
  private fromBackend = (s: BackendReservationSlot): ReservationSlot => ({
    id: s.id,
    machine: s.machine,
    date: s.date,
    startHour: s.startHour,
    endHour: s.endHour,
    status: s.status.toUpperCase() as SlotStatus,
    solar: s.solar,
    discountPct: s.discountPct ?? 0,
    owner: s.owner,
    reservedBy: s.reservedBy ?? undefined,
    deleted: s.deleted ?? false,
  });

  private toBackend(s: Omit<ReservationSlot, 'id'> | ReservationSlot): SlotRequest {
    return {
      machine: s.machine,
      date: s.date,
      startHour: s.startHour,
      endHour: s.endHour,
      status: (s.status?.toLowerCase() as BackendSlotStatus) ?? 'open',
      solar: !!s.solar,
      discountPct: s.discountPct ?? 0,
      owner: s.owner,
      reservedBy: s.reservedBy ?? null,
    };
  }
}
