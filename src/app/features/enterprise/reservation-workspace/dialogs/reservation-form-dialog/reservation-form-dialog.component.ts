import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  NotificationChannel,
  Reservation,
  ReservationDraft,
  ReservationSlot
} from '../../reservation-workspace.models';

export interface ReservationFormDialogData {
  reservation?: Reservation;
  slots: ReservationSlot[];
  presetStart?: string;
  presetEnd?: string;
}

@Component({
  selector: 'app-reservation-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './reservation-form-dialog.component.html',
  styleUrl: './reservation-form-dialog.component.scss'
})
export class ReservationFormDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject<MatDialogRef<ReservationFormDialogComponent, ReservationDraft>>(MatDialogRef);
  readonly data = inject<ReservationFormDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.group({
    title: [this.data.reservation?.title ?? '', Validators.required],
    customer: [this.data.reservation?.customer ?? '', Validators.required],
    resource: [this.data.reservation?.resource ?? '', Validators.required],
    slotId: [this.data.reservation?.slotId ?? this.data.slots[0]?.id ?? '', Validators.required],
    role: [this.data.reservation?.role ?? 'provider', Validators.required],
    city: [this.data.reservation?.city ?? this.data.slots[0]?.city ?? 'Tunis', Validators.required],
    category: [this.data.reservation?.category ?? 'Space', Validators.required],
    start: [this.data.reservation?.start ?? this.data.presetStart ?? '', Validators.required],
    end: [this.data.reservation?.end ?? this.data.presetEnd ?? '', Validators.required],
    headcount: [this.data.reservation?.headcount ?? 4, [Validators.required, Validators.min(1)]],
    amount: [this.data.reservation?.amount ?? 1200, [Validators.required, Validators.min(100)]],
    status: [this.data.reservation?.status ?? 'pending', Validators.required],
    notes: [this.data.reservation?.notes ?? ''],
    tags: [this.data.reservation?.tags.join(', ') ?? ''],
    contactName: [this.data.reservation?.contactName ?? '', Validators.required],
    contactEmail: [this.data.reservation?.contactEmail ?? ''],
    contactPhone: [this.data.reservation?.contactPhone ?? ''],
    notificationChannel: [this.data.reservation?.notificationChannel ?? 'email', Validators.required]
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.dialogRef.close({
      title: value.title ?? '',
      customer: value.customer ?? '',
      resource: value.resource ?? '',
      slotId: value.slotId ?? '',
      role: value.role as ReservationDraft['role'],
      city: value.city ?? '',
      category: value.category as ReservationDraft['category'],
      start: value.start ?? '',
      end: value.end ?? '',
      headcount: Number(value.headcount ?? 0),
      amount: Number(value.amount ?? 0),
      status: value.status as ReservationDraft['status'],
      notes: value.notes ?? '',
      tags: (value.tags ?? '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      contactName: value.contactName ?? '',
      contactEmail: value.contactEmail ?? '',
      contactPhone: value.contactPhone ?? '',
      notificationChannel: value.notificationChannel as NotificationChannel
    });
  }
}
