import { Injectable, signal } from '@angular/core';
import { ReservationSlot, SlotStatus } from './../shared/models/slot.model';
import {
  ReservationSlotApiService,
  BackendReservationSlot,
  BackendSlotStatus,
  SlotRequest,
} from './../shared/api/reservation-slot-api.service';

@Injectable({ providedIn: 'root' })
export class SlotStore {
  private _slots = signal<ReservationSlot[]>([]);
  private _loading = signal(false);
  private _seeded = false;

  loading = this._loading.asReadonly();

  constructor(private api: ReservationSlotApiService) {}

  all(): ReservationSlot[] {
    return this._slots();
  }

  byId(id: number): ReservationSlot | undefined {
    return this._slots().find(s => s.id === id);
  }

  seedIfEmpty(force = false): void {
    if (this._seeded && !force) return;
    this._seeded = true;
    this.refresh();
  }

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

  private fromBackend = (s: BackendReservationSlot): ReservationSlot => ({
    id: s.id,
    machine: s.machine,
    date: s.date,
    startHour: s.startHour,
    endHour: s.endHour,
    status: s.status.toUpperCase() as SlotStatus,
    solar: s.solar,
    discountPct: s.discountPct ?? 0,
    enterpriseId: s.enterprise?.id ?? s.enterpriseId ?? null,
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
      enterpriseId: s.enterpriseId ?? null,
    };
  }
}
