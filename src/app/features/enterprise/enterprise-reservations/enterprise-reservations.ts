import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import {
  BackendReservation,
  BackendReservationStatus,
  ReservationApiService,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import {
  BackendReservationSlot,
  ReservationSlotApiService,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';

type ReservationUrgency = 'high' | 'medium' | 'low';

@Component({
  selector: 'app-enterprise-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enterprise-reservations.html',
  styleUrls: ['./enterprise-reservations.css'],
})
export class EnterpriseReservations implements OnInit {
  loading = true;
  error = '';
  query = '';
  statusFilter: '' | BackendReservationStatus = '';
  dateFrom = '';
  dateTo = '';
  machineFilter = '';

  reservations: BackendReservation[] = [];
  ownedSlots: BackendReservationSlot[] = [];
  currentEnterpriseId: number | null = null;

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
    const companyName = this.auth.currentUser?.company || this.auth.currentUser?.name || 'Enterprise';
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

    forkJoin({
      slots: this.slotApi.list(false),
      reservations: this.reservationApi.list(false),
    }).subscribe({
      next: ({ slots, reservations }) => {
        this.currentEnterpriseId = this.resolveEnterpriseId(slots);
        this.ownedSlots = slots.filter(slot => !slot.deleted && slot.enterprise?.id === this.currentEnterpriseId);
        this.reservations = reservations.filter(reservation => !reservation.deleted);
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to load reservations.';
        this.loading = false;
      },
    });
  }

  private resolveEnterpriseId(slots: BackendReservationSlot[]): number | null {
    const company = this.auth.currentUser?.company?.trim().toLowerCase() || '';
    const match = slots.find(slot => (slot.enterprise?.companyName ?? '').trim().toLowerCase() === company);
    return match?.enterprise?.id ?? null;
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
