import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import {
  BackendReservation,
  BackendReservationStatus,
  ReservationApiService,
  ReservationCreateRequest,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import {
  BackendReservationSlot,
  ReservationSlotApiService,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';

type ReservationUrgency = 'high' | 'medium' | 'low';

type ReservationFormModel = {
  id: number | null;
  company: string;
  slotId: number | null;
  machine: string;
  date: string;
  startHour: number;
  hours: number;
  solar: boolean;
  status: BackendReservationStatus;
};

@Component({
  selector: 'app-enterprise-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-wrapper">
      <div class="page-header">
        <h1>Enterprise Reservations</h1>
        <p>Reservations booked on the slots owned by your enterprise.</p>
      </div>

      <div class="card">
        <div class="form-row" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px">
          <div class="form-group">
            <label>Search</label>
            <input
              type="text"
              name="query"
              [(ngModel)]="query"
              placeholder="Search by company, machine, or status"
            />
          </div>

          <div class="form-group">
            <label>Status</label>
            <select name="statusFilter" [(ngModel)]="statusFilter">
              <option value="">All</option>
              <option *ngFor="let status of statuses" [ngValue]="status">{{ status }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Machine</label>
            <select name="machineFilter" [(ngModel)]="machineFilter">
              <option value="">All</option>
              <option *ngFor="let machine of machineOptions" [ngValue]="machine">{{ machine }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>From</label>
            <input type="date" name="dateFrom" [(ngModel)]="dateFrom" />
          </div>

          <div class="form-group">
            <label>To</label>
            <input type="date" name="dateTo" [(ngModel)]="dateTo" />
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:16px">
          <button class="btn btn-primary" type="button" (click)="openCreate()" [disabled]="!ownedSlots.length">
            Create Reservation
          </button>
          <button class="btn btn-outline" type="button" (click)="exportPdf()">Export PDF</button>
        </div>
      </div>

      <div class="card" *ngIf="showForm">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap">
          <div>
            <h2 style="margin:0 0 6px">{{ editMode ? 'Update Reservation' : 'Create Reservation' }}</h2>
            <p style="margin:0;color:var(--text2)">Pick one of your backend slots and save the reservation from this page.</p>
          </div>
          <button class="btn btn-outline btn-sm" type="button" (click)="closeForm()" [disabled]="savingForm">
            Close
          </button>
        </div>

        <div class="form-row" style="margin-top:16px">
          <div class="form-group">
            <label>Company</label>
            <input type="text" name="formCompany" [(ngModel)]="form.company" />
          </div>

          <div class="form-group">
            <label>Slot</label>
            <select name="formSlotId" [(ngModel)]="form.slotId" (ngModelChange)="syncFormFromSlot()">
              <option [ngValue]="null">Select a slot</option>
              <option *ngFor="let slot of ownedSlots" [ngValue]="slot.id">
                {{ slot.machine }} | {{ slot.date }} | {{ slot.startHour }}:00-{{ slot.endHour }}:00
              </option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Machine</label>
            <input type="text" name="formMachine" [(ngModel)]="form.machine" />
          </div>

          <div class="form-group">
            <label>Date</label>
            <input type="date" name="formDate" [(ngModel)]="form.date" />
          </div>

          <div class="form-group">
            <label>Start Hour</label>
            <input type="number" min="0" max="23" name="formStartHour" [(ngModel)]="form.startHour" />
          </div>

          <div class="form-group">
            <label>Hours</label>
            <input type="number" min="1" max="24" name="formHours" [(ngModel)]="form.hours" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Status</label>
            <select name="formStatus" [(ngModel)]="form.status">
              <option *ngFor="let status of statuses" [ngValue]="status">{{ status }}</option>
            </select>
          </div>

          <div class="form-group checkbox-group">
            <label>Solar</label>
            <label class="toggle-row">
              <input type="checkbox" name="formSolar" [(ngModel)]="form.solar" />
              <span>Solar-supported reservation</span>
            </label>
          </div>
        </div>

        <div class="message error" *ngIf="error">{{ error }}</div>

        <div class="actions-row">
          <button class="btn btn-primary" type="button" (click)="saveReservation()" [disabled]="savingForm">
            {{ savingForm ? 'Saving...' : (editMode ? 'Update Reservation' : 'Create Reservation') }}
          </button>
          <button class="btn btn-outline" type="button" (click)="closeForm()" [disabled]="savingForm">
            Cancel
          </button>
        </div>
      </div>

      <div class="card">
        <div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap">
          <div>
            <h2 style="margin:0 0 8px">Booking Intelligence Panel</h2>
            <p style="margin:0;color:var(--text2)">Urgency and recommendation computed from reservation date proximity and booking duration.</p>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <span class="badge badge-neutral">High: {{ intelligenceSummary.high }}</span>
            <span class="badge badge-neutral">Medium: {{ intelligenceSummary.medium }}</span>
            <span class="badge badge-neutral">Low: {{ intelligenceSummary.low }}</span>
          </div>
        </div>

        <div style="margin-top:16px;padding:14px;border-radius:12px;background:#f8fafc;border:1px solid #e5e7eb">
          <strong style="display:block;margin-bottom:6px">Recommendation</strong>
          <span class="badge badge-neutral">{{ intelligenceSummary.recommendation }}</span>
        </div>
      </div>

      <div class="card" style="padding:0">
        <div class="table-header">
          <h2>My Slot Reservations</h2>
          <span>{{ visibleReservations.length }} reservation(s)</span>
        </div>

        <div class="table-state error" *ngIf="error">{{ error }}</div>
        <div class="table-state" *ngIf="loading">Loading reservations...</div>

        <table class="data-table" *ngIf="!loading && visibleReservations.length">
          <thead>
            <tr>
              <th>Company</th>
              <th>Machine</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Status</th>
              <th>Urgency</th>
              <th>Recommendation</th>
              <th>Solar</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let reservation of visibleReservations">
              <td>{{ reservation.company }}</td>
              <td>{{ reservation.machine }}</td>
              <td>{{ reservation.date }}</td>
              <td>
                {{ reservation.startHour ?? 0 }}:00 -
                {{ (reservation.startHour ?? 0) + durationHours(reservation) }}:00
              </td>
              <td><span class="badge badge-neutral">{{ reservation.status }}</span></td>
              <td>
                <span
                  class="badge"
                  [ngStyle]="{ 'background-color': urgencyColor(reservation) + '22', color: urgencyColor(reservation) }"
                >
                  {{ urgencyFor(reservation) }}
                </span>
              </td>
              <td>{{ recommendationFor(reservation) }}</td>
              <td>{{ reservation.solar ? 'Yes' : 'No' }}</td>
              <td>
                <div class="row-actions">
                  <button class="btn btn-outline btn-sm" type="button" (click)="openEdit(reservation)">
                    Edit
                  </button>
                  <button
                    class="btn btn-outline btn-sm"
                    type="button"
                    (click)="cancel(reservation)"
                    [disabled]="reservation.status === 'CANCELLED'"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="table-state" *ngIf="!loading && !visibleReservations.length">
          No reservations found on your slots.
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./enterprise-reservations.css'],
})
export class EnterpriseReservations implements OnInit {
  loading = true;
  savingForm = false;
  showForm = false;
  editMode = false;
  error = '';
  query = '';
  statusFilter: '' | BackendReservationStatus = '';
  dateFrom = '';
  dateTo = '';
  machineFilter = '';

  reservations: BackendReservation[] = [];
  ownedSlots: BackendReservationSlot[] = [];
  currentEnterpriseId: number | null = null;
  form: ReservationFormModel = this.createEmptyForm();

  readonly statuses: BackendReservationStatus[] = ['PENDING', 'CONFIRMED', 'CANCELLED'];

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
    const ownedSlotIds = new Set(this.ownedSlots.map(slot => slot.id));

    return this.reservations
      .filter(reservation => reservation.slotId != null && ownedSlotIds.has(reservation.slotId))
      .filter(reservation => !reservation.deleted)
      .filter(reservation => !this.statusFilter || reservation.status === this.statusFilter)
      .filter(reservation => !this.machineFilter || reservation.machine === this.machineFilter)
      .filter(reservation => !this.dateFrom || reservation.date >= this.dateFrom)
      .filter(reservation => !this.dateTo || reservation.date <= this.dateTo)
      .filter(reservation => {
        if (!query) return true;
        return (
          reservation.company.toLowerCase().includes(query) ||
          reservation.machine.toLowerCase().includes(query) ||
          reservation.status.toLowerCase().includes(query)
        );
      });
  }

  get machineOptions(): string[] {
    return [...new Set(
      this.visibleReservations
        .map(reservation => reservation.machine)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    )];
  }

  get intelligenceSummary(): {
    high: number;
    medium: number;
    low: number;
    recommendation: string;
  } {
    const counts = { high: 0, medium: 0, low: 0 };

    for (const reservation of this.visibleReservations) {
      counts[this.urgencyFor(reservation)] += 1;
    }

    let recommendation = 'Can wait';
    if (counts.high > 0) {
      recommendation = 'Confirm soon';
    } else if (counts.medium > 0) {
      recommendation = 'Review this week';
    }

    return { ...counts, recommendation };
  }

  async exportPdf(): Promise<void> {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const companyName = this.form.company || this.auth.currentUser?.name || 'Enterprise';
    const dateLabel = this.summaryDateRange();
    const rows = this.visibleReservations;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Reservation Summary', 40, 50);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Company: ${companyName}`, 40, 78);
    doc.text(`Total reservations: ${rows.length}`, 40, 96);
    doc.text(`Date range: ${dateLabel}`, 40, 114);

    let y = 150;
    doc.setFont('helvetica', 'bold');
    doc.text('Company', 40, y);
    doc.text('Machine', 170, y);
    doc.text('Date', 300, y);
    doc.text('Status', 390, y);
    doc.text('Urgency', 470, y);

    doc.setFont('helvetica', 'normal');
    for (const reservation of rows) {
      y += 22;
      if (y > 780) {
        doc.addPage();
        y = 50;
      }

      doc.text((reservation.company || '-').slice(0, 22), 40, y);
      doc.text(reservation.machine.slice(0, 22), 170, y);
      doc.text(reservation.date || '-', 300, y);
      doc.text(reservation.status || '-', 390, y);
      doc.text(this.urgencyFor(reservation), 470, y);
    }

    doc.save(`reservation-summary-${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  openCreate(): void {
    this.editMode = false;
    this.showForm = true;
    this.error = '';
    this.form = this.createEmptyForm();
    if (this.ownedSlots.length) {
      this.form.slotId = this.ownedSlots[0].id;
      this.syncFormFromSlot();
    }
  }

  openEdit(reservation: BackendReservation): void {
    this.editMode = true;
    this.showForm = true;
    this.error = '';
    this.form = {
      id: reservation.id,
      company: reservation.company,
      slotId: reservation.slotId ?? null,
      machine: reservation.machine,
      date: reservation.date,
      startHour: reservation.startHour ?? 9,
      hours: reservation.hours ?? 1,
      solar: reservation.solar ?? false,
      status: reservation.status,
    };
  }

  closeForm(): void {
    this.showForm = false;
    this.editMode = false;
    this.savingForm = false;
    this.form = this.createEmptyForm();
  }

  syncFormFromSlot(): void {
    const slot = this.ownedSlots.find(item => item.id === this.form.slotId);
    if (!slot) {
      return;
    }

    this.form.machine = slot.machine;
    this.form.date = slot.date;
    this.form.startHour = slot.startHour;
    this.form.hours = Math.max(1, slot.endHour - slot.startHour);
    this.form.solar = slot.solar;
  }

  saveReservation(): void {
    if (this.savingForm) {
      return;
    }
    if (this.currentEnterpriseId == null) {
      this.error = 'Unable to resolve the current enterprise identity.';
      return;
    }
    if (!this.form.company.trim() || !this.form.machine.trim() || !this.form.date || this.form.slotId == null) {
      this.error = 'Company, slot, machine, and date are required.';
      return;
    }
    if (this.form.hours <= 0) {
      this.error = 'Reservation hours must be greater than zero.';
      return;
    }

    this.savingForm = true;
    this.error = '';

    const payload: ReservationCreateRequest = {
      company: this.form.company.trim(),
      machine: this.form.machine.trim(),
      date: this.form.date,
      hours: this.form.hours,
      startHour: this.form.startHour,
      status: this.form.status,
      solar: this.form.solar,
      slotId: this.form.slotId,
      enterpriseId: this.currentEnterpriseId,
      co2Saved: this.estimatedCo2Saved(this.form.hours, this.form.solar),
    };

    const request$ = this.editMode && this.form.id
      ? this.reservationApi.update(this.form.id, payload)
      : this.reservationApi.create(payload);

    request$.subscribe({
      next: () => {
        this.closeForm();
        this.loadData();
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to save reservation.';
        this.savingForm = false;
      },
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

  durationHours(reservation: BackendReservation): number {
    return Math.max(1, reservation.hours ?? 1);
  }

  urgencyFor(reservation: BackendReservation): ReservationUrgency {
    const days = this.daysUntil(reservation.date);
    const duration = this.durationHours(reservation);

    if (days <= 2 || duration >= 6) return 'high';
    if (days <= 7 || duration >= 3) return 'medium';
    return 'low';
  }

  recommendationFor(reservation: BackendReservation): string {
    return this.urgencyFor(reservation) === 'high' ? 'Confirm soon' : 'Can wait';
  }

  urgencyColor(reservation: BackendReservation): string {
    const urgency = this.urgencyFor(reservation);
    if (urgency === 'high') return '#b42318';
    if (urgency === 'medium') return '#b54708';
    return '#027a48';
  }

  private loadData(): void {
    this.loading = true;
    this.error = '';
    this.currentEnterpriseId = this.readCurrentEnterpriseId();

    forkJoin({
      slots: this.slotApi.list(false),
      reservations: this.reservationApi.list(false),
    }).subscribe({
      next: ({ slots, reservations }) => {
        this.ownedSlots = slots.filter(slot =>
          !slot.deleted && this.enterpriseIdForSlot(slot) === this.currentEnterpriseId,
        );
        this.reservations = reservations.filter(reservation => !reservation.deleted);
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to load reservations.';
        this.loading = false;
      },
    });
  }

  private createEmptyForm(): ReservationFormModel {
    return {
      id: null,
      company: this.auth.currentUser?.company ?? this.auth.currentUser?.name ?? '',
      slotId: null,
      machine: '',
      date: new Date().toISOString().slice(0, 10),
      startHour: 9,
      hours: 1,
      solar: false,
      status: 'PENDING',
    };
  }

  private readCurrentEnterpriseId(): number | null {
    const raw = (this.auth.currentUser as { enterprise?: { id?: number | string } } | null)?.enterprise?.id
      ?? this.auth.currentUser?.id;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private enterpriseIdForSlot(slot: BackendReservationSlot): number | null {
    return slot.enterprise?.id ?? slot.enterpriseId ?? null;
  }

  private estimatedCo2Saved(hours: number, solar: boolean): number {
    const base = hours * 12;
    return solar ? Math.round(base * 0.6) : Math.round(base * 0.25);
  }

  private summaryDateRange(): string {
    const dates = this.visibleReservations.map(reservation => reservation.date).filter(Boolean).sort();
    if (!dates.length) {
      return this.dateFrom || this.dateTo ? `${this.dateFrom || 'Any'} to ${this.dateTo || 'Any'}` : 'No reservations';
    }
    return `${dates[0]} to ${dates[dates.length - 1]}`;
  }

  private daysUntil(date: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    return Math.round((target.getTime() - today.getTime()) / 86400000);
  }
}
