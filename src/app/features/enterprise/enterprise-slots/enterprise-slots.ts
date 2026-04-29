import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BackendReservationSlot,
  ReservationSlotApiService,
  SlotRequest,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';
import { AuthService, User } from '../../../core/services/auth.service';

type SlotFormModel = {
  machine: string;
  date: string;
  startHour: number;
  endHour: number;
  solar: boolean;
  discountPct: number;
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
  error = '';
  success = '';

  editingId: number | null = null;
  slots: BackendReservationSlot[] = [];

  form: SlotFormModel = this.createEmptyForm();

  constructor(
    private readonly slotApi: ReservationSlotApiService,
    private readonly auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadSlots();
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  get currentOwner(): string {
    return this.currentUser?.company?.trim() || this.currentUser?.name?.trim() || '';
  }

  get durationHours(): number {
    return Math.max(0, this.form.endHour - this.form.startHour);
  }

  get mine(): BackendReservationSlot[] {
    return this.slots.filter(slot => this.isMine(slot));
  }

  save(): void {
    this.error = '';
    this.success = '';

    if (!this.currentOwner) {
      this.error = 'Unable to identify the current enterprise account.';
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
      owner: this.currentOwner,
      enterpriseId: this.currentEnterpriseId(),
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
        this.loadSlots();
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to save slot.';
        this.saving = false;
      },
    });
  }

  edit(slot: BackendReservationSlot): void {
    this.editingId = slot.id;
    this.form = {
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
        this.loadSlots();
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to delete slot.';
      },
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form = this.createEmptyForm();
  }

  private loadSlots(): void {
    this.loading = true;
    this.slotApi.list(false).subscribe({
      next: (rows) => {
        this.slots = rows.filter(slot => !slot.deleted);
        this.loading = false;
        this.saving = false;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to load slots.';
        this.loading = false;
        this.saving = false;
      },
    });
  }

  private createEmptyForm(): SlotFormModel {
    return {
      machine: '',
      date: new Date().toISOString().slice(0, 10),
      startHour: 8,
      endHour: 12,
      solar: false,
      discountPct: 0,
    };
  }

  private currentEnterpriseId(): number | null {
    const raw = this.currentUser?.id;
    const parsed = raw ? Number(raw) : NaN;
    return Number.isFinite(parsed) ? parsed : null;
  }

  private isMine(slot: BackendReservationSlot): boolean {
    const currentOwner = this.currentOwner.toLowerCase();
    const currentName = this.currentUser?.name?.trim().toLowerCase() || '';
    const currentEmail = this.currentUser?.email?.trim().toLowerCase() || '';
    const currentEnterpriseId = this.currentEnterpriseId();
    const slotOwner = (slot.owner ?? '').trim().toLowerCase();

    return (
      (!!currentEnterpriseId && slot.enterprise?.id === currentEnterpriseId) ||
      (!!currentOwner && slotOwner === currentOwner) ||
      (!!currentName && slotOwner === currentName) ||
      (!!currentEmail && slotOwner === currentEmail)
    );
  }
}
