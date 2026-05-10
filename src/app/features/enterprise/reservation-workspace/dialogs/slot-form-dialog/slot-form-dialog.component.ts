import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  ReservationSlot,
  ReservationSlotDraft
} from '../../reservation-workspace.models';

export interface SlotFormDialogData {
  slot?: ReservationSlot;
}

@Component({
  selector: 'app-slot-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './slot-form-dialog.component.html',
  styleUrl: './slot-form-dialog.component.scss'
})
export class SlotFormDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject<MatDialogRef<SlotFormDialogComponent, ReservationSlotDraft>>(MatDialogRef);
  readonly data = inject<SlotFormDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.group({
    name: [this.data.slot?.name ?? '', Validators.required],
    zone: [this.data.slot?.zone ?? '', Validators.required],
    city: [this.data.slot?.city ?? 'Tunis', Validators.required],
    ownerCompany: [this.data.slot?.ownerCompany ?? 'Eco Ressource Tunisie', Validators.required],
    portfolio: [this.data.slot?.portfolio ?? 'owned', Validators.required],
    type: [this.data.slot?.type ?? 'Storage', Validators.required],
    latitude: [this.data.slot?.coordinates[0] ?? 36.8065, Validators.required],
    longitude: [this.data.slot?.coordinates[1] ?? 10.1815, Validators.required],
    capacity: [this.data.slot?.capacity ?? 10, [Validators.required, Validators.min(1)]],
    occupied: [this.data.slot?.occupied ?? 4, [Validators.required, Validators.min(0)]],
    status: [this.data.slot?.status ?? 'available', Validators.required],
    equipment: [this.data.slot?.equipment.join(', ') ?? '']
  });

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.dialogRef.close({
      name: value.name ?? '',
      zone: value.zone ?? '',
      city: value.city ?? '',
      ownerCompany: value.ownerCompany ?? '',
      portfolio: value.portfolio as ReservationSlotDraft['portfolio'],
      type: value.type as ReservationSlotDraft['type'],
      coordinates: [Number(value.latitude), Number(value.longitude)],
      capacity: Number(value.capacity),
      occupied: Number(value.occupied),
      status: value.status as ReservationSlotDraft['status'],
      equipment: (value.equipment ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      images: [...(this.data.slot?.images ?? [])]
    });
  }
}
