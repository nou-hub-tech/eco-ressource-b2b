import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  Order,
  OrderDraft,
  Reservation,
  ReservationSlot
} from '../../reservation-workspace.models';

export interface OrderFormDialogData {
  order?: Order;
  reservations: Reservation[];
  slots: ReservationSlot[];
}

@Component({
  selector: 'app-order-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './order-form-dialog.component.html',
  styleUrl: './order-form-dialog.component.scss'
})
export class OrderFormDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject<MatDialogRef<OrderFormDialogComponent, OrderDraft>>(MatDialogRef);
  readonly data = inject<OrderFormDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.group({
    customer: [this.data.order?.customer ?? '', Validators.required],
    reservationId: [this.data.order?.reservationId ?? this.data.reservations[0]?.id ?? '', Validators.required],
    slotId: [this.data.order?.slotId ?? this.data.slots[0]?.id ?? '', Validators.required],
    role: [this.data.order?.role ?? 'provider', Validators.required],
    city: [this.data.order?.city ?? this.data.reservations[0]?.city ?? 'Tunis', Validators.required],
    tax: [this.data.order?.tax ?? 180, [Validators.required, Validators.min(0)]],
    createdAt: [this.data.order?.createdAt ?? '2026-05-06', Validators.required],
    dueDate: [this.data.order?.dueDate ?? '2026-05-16', Validators.required],
    status: [this.data.order?.status ?? 'draft', Validators.required],
    paymentStatus: [this.data.order?.paymentStatus ?? 'pending', Validators.required],
    items: this.fb.array((this.data.order?.items ?? []).map((item) => this.createItemGroup(item)))
  });

  constructor() {
    if (!this.items.length) {
      this.addItem();
    }

    this.form.get('reservationId')?.valueChanges.subscribe((reservationId) => {
      const reservation = this.data.reservations.find((item) => item.id === reservationId);
      if (!reservation) {
        return;
      }

      this.form.patchValue(
        {
          customer: reservation.customer,
          slotId: reservation.slotId,
          role: reservation.role,
          city: reservation.city
        },
        { emitEvent: false }
      );

      if (!this.data.order) {
        this.items.clear();
        this.addItem(reservation.resource, 1, reservation.amount);
        this.form.patchValue({ tax: +(reservation.amount * 0.19).toFixed(2) }, { emitEvent: false });
      }
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  get subtotal(): number {
    return this.items.controls.reduce((sum, control) => {
      const quantity = Number(control.get('quantity')?.value ?? 0);
      const unitPrice = Number(control.get('unitPrice')?.value ?? 0);
      return sum + quantity * unitPrice;
    }, 0);
  }

  get grandTotal(): number {
    return +(this.subtotal + Number(this.form.get('tax')?.value ?? 0)).toFixed(2);
  }

  addItem(label = '', quantity = 1, unitPrice = 0): void {
    this.items.push(this.createItemGroup({ label, quantity, unitPrice }));
  }

  removeItem(index: number): void {
    if (this.items.length === 1) {
      return;
    }
    this.items.removeAt(index);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.dialogRef.close({
      customer: value.customer ?? '',
      reservationId: value.reservationId ?? '',
      slotId: value.slotId ?? '',
      role: value.role as OrderDraft['role'],
      city: value.city ?? '',
      amount: this.subtotal,
      tax: Number(value.tax ?? 0),
      createdAt: value.createdAt ?? '',
      dueDate: value.dueDate ?? '',
      status: value.status as OrderDraft['status'],
      paymentStatus: value.paymentStatus as OrderDraft['paymentStatus'],
      items: (value.items ?? []).map((item) => ({
        label: item.label ?? '',
        quantity: Number(item.quantity ?? 0),
        unitPrice: Number(item.unitPrice ?? 0)
      }))
    });
  }

  private createItemGroup(item?: { label?: string; quantity?: number; unitPrice?: number }) {
    return this.fb.group({
      label: [item?.label ?? '', Validators.required],
      quantity: [item?.quantity ?? 1, [Validators.required, Validators.min(1)]],
      unitPrice: [item?.unitPrice ?? 0, [Validators.required, Validators.min(0)]]
    });
  }
}
