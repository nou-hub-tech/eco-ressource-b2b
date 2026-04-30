import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AiService } from '../../../../services/ai.service';
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
  enterpriseId: number | null;
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
  templateUrl: './enterprise-reservations.html',
  styleUrls: ['./enterprise-reservations.css'],
})
export class EnterpriseReservations implements OnInit {
  loading = true;
  savingForm = false;
  showForm = false;
  editMode = false;
  error = '';
  success = '';

  query = '';
  statusFilter: '' | BackendReservationStatus = '';
  dateFrom = '';
  dateTo = '';
  marketplaceDateFrom = '';
  marketplaceDateTo = '';
  machineFilter = '';
  aiRecommendations: string[] = [];

  reservations: BackendReservation[] = [];
  slots: BackendReservationSlot[] = [];
  currentEnterpriseId: number | null = null;
  form: ReservationFormModel = this.createEmptyForm();

  readonly statuses: BackendReservationStatus[] = ['PENDING', 'CONFIRMED', 'CANCELLED'];

  constructor(
    private readonly aiService: AiService,
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute,
    private readonly reservationApi: ReservationApiService,
    private readonly slotApi: ReservationSlotApiService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get isAdminView(): boolean {
    return this.auth.currentUser?.role === 'admin';
  }

  get mySlots(): BackendReservationSlot[] {
    if (this.isAdminView) {
      return this.slots.filter(slot => !slot.deleted);
    }
    return this.slots.filter(slot => !slot.deleted && this.enterpriseIdForSlot(slot) === this.currentEnterpriseId);
  }

  get marketplaceSlots(): BackendReservationSlot[] {
    if (this.isAdminView) {
      return [];
    }
    return this.slots
      .filter(slot => !slot.deleted && this.enterpriseIdForSlot(slot) !== this.currentEnterpriseId)
      .filter(slot => slot.status === 'open')
      .filter(slot => !this.marketplaceDateFrom || slot.date >= this.marketplaceDateFrom)
      .filter(slot => !this.marketplaceDateTo || slot.date <= this.marketplaceDateTo)
      .sort((a, b) => a.date.localeCompare(b.date) || a.startHour - b.startHour);
  }

  get incomingReservations(): BackendReservation[] {
    const query = this.query.trim().toLowerCase();
    const ownedSlotIds = new Set(this.mySlots.map(slot => slot.id));
    const scopedReservations = this.isAdminView
      ? this.reservations.filter(reservation => !reservation.deleted)
      : this.reservations
          .filter(reservation => !reservation.deleted)
          .filter(reservation => reservation.slotId != null && ownedSlotIds.has(reservation.slotId));

    return scopedReservations
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
      })
      .sort((a, b) => a.date.localeCompare(b.date) || a.startHour - b.startHour);
  }

  get myReservationCount(): number {
    return this.incomingReservations.length;
  }

  get myReservationHours(): number {
    return this.incomingReservations.reduce((sum, reservation) => sum + this.durationHours(reservation), 0);
  }

  get machineOptions(): string[] {
    return [...new Set(
      this.incomingReservations
        .map(reservation => reservation.machine)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    )];
  }

  get intelligenceSummary(): { high: number; medium: number; low: number; recommendation: string } {
    const counts = { high: 0, medium: 0, low: 0 };

    for (const reservation of this.incomingReservations) {
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

  openCreateForMySlot(): void {
    this.editMode = false;
    this.showForm = true;
    this.error = '';
    this.success = '';
    this.form = this.createEmptyForm();
    if (this.mySlots.length) {
      this.form.slotId = this.mySlots[0].id;
      this.syncFormFromSlot();
    }
  }

  reserveMarketplaceSlot(slot: BackendReservationSlot): void {
    this.editMode = false;
    this.showForm = true;
    this.error = '';
    this.success = '';
    this.form = this.createEmptyForm();
    this.form.slotId = slot.id;
    this.syncFormFromSlot();
  }

  openEdit(reservation: BackendReservation): void {
    this.editMode = true;
    this.showForm = true;
    this.error = '';
    this.success = '';
    this.form = {
      id: reservation.id,
      enterpriseId: this.enterpriseIdForReservation(reservation),
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
    const slot = this.slots.find(item => item.id === this.form.slotId);
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
    if (!this.editMode && this.currentEnterpriseId == null && !this.isAdminView) {
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
    this.success = '';

    const payload: ReservationCreateRequest = {
      company: this.form.company.trim(),
      machine: this.form.machine.trim(),
      date: this.form.date,
      hours: this.form.hours,
      startHour: this.form.startHour,
      status: this.editMode ? this.form.status : 'PENDING',
      solar: this.form.solar,
      slotId: this.form.slotId,
      enterpriseId: this.form.enterpriseId ?? this.currentEnterpriseId,
    };

    const request$ = this.editMode && this.form.id
      ? this.reservationApi.update(this.form.id, payload)
      : this.form.slotId != null
        ? this.reservationApi.createWithSlot(this.form.slotId, {
            company: payload.company,
            machine: payload.machine,
            date: payload.date,
            hours: payload.hours,
            startHour: payload.startHour,
            status: payload.status,
            solar: payload.solar,
            enterpriseId: payload.enterpriseId,
          })
        : this.reservationApi.create(payload);

    request$.subscribe({
      next: () => {
        this.success = this.editMode ? 'Reservation updated.' : 'Reservation created.';
        this.closeForm();
        this.loadData();
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to save reservation.';
        this.savingForm = false;
      },
    });
  }

  cancel(reservation: BackendReservation): void {
    const reason = window.prompt('Cancellation reason (optional):', reservation.cancelReason ?? '') ?? '';

    this.reservationApi.cancel(reservation.id, reason).subscribe({
      next: () => {
        this.success = 'Reservation cancelled.';
        this.loadData();
      },
      error: err => {
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

  async exportPdf(): Promise<void> {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const companyName = this.form.company || this.auth.currentUser?.enterprise?.companyName || this.auth.currentUser?.company || this.auth.currentUser?.name || 'Enterprise';
    const rows = this.incomingReservations;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Incoming Reservation Summary', 40, 50);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Company: ${companyName}`, 40, 78);
    doc.text(`Reservations: ${rows.length}`, 40, 96);
    doc.text(`Hours reserved: ${this.myReservationHours}`, 40, 114);

    let y = 150;
    doc.setFont('helvetica', 'bold');
    doc.text('Company', 40, y);
    doc.text('Machine', 170, y);
    doc.text('Date', 300, y);
    doc.text('Status', 390, y);
    doc.text('Priority', 470, y);

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

    doc.save(`incoming-reservations-${new Date().toISOString().slice(0, 10)}.pdf`);
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
        this.slots = slots.filter(slot => !slot.deleted);
        this.reservations = reservations.filter(reservation => !reservation.deleted);
        this.loadAiRecommendations();
        this.hydrateFormFromQuery();
        this.loading = false;
        this.savingForm = false;
      },
      error: err => {
        this.error = err?.error?.message ?? 'Failed to load reservations.';
        this.loading = false;
        this.savingForm = false;
      },
    });
  }

  private createEmptyForm(): ReservationFormModel {
    return {
      id: null,
      enterpriseId: this.currentEnterpriseId,
      company: this.auth.currentUser?.enterprise?.companyName ?? this.auth.currentUser?.company ?? this.auth.currentUser?.name ?? '',
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

  private daysUntil(date: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    return Math.round((target.getTime() - today.getTime()) / 86400000);
  }

  private hydrateFormFromQuery(): void {
    const slotId = Number(this.route.snapshot.queryParamMap.get('slotId'));
    if (!Number.isFinite(slotId) || slotId <= 0 || this.showForm) {
      return;
    }

    this.showForm = true;
    this.editMode = false;
    this.form = this.createEmptyForm();
    this.form.slotId = slotId;
    this.form.enterpriseId = this.currentEnterpriseId;
    this.form.company = this.route.snapshot.queryParamMap.get('company') ?? this.form.company;
    this.form.machine = this.route.snapshot.queryParamMap.get('machine') ?? this.form.machine;
    this.form.date = this.route.snapshot.queryParamMap.get('date') ?? this.form.date;

    const startHour = Number(this.route.snapshot.queryParamMap.get('startHour'));
    const hours = Number(this.route.snapshot.queryParamMap.get('hours'));
    if (Number.isFinite(startHour)) {
      this.form.startHour = startHour;
    }
    if (Number.isFinite(hours) && hours > 0) {
      this.form.hours = hours;
    }

    const solar = this.route.snapshot.queryParamMap.get('solar');
    if (solar != null) {
      this.form.solar = solar === 'true';
    }

    this.syncFormFromSlot();
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
