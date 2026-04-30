import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AiInsightsPanel } from '../../../features/reservation-center/components/ai-insights-panel/ai-insights-panel';
import { StatusChip } from '../../../features/reservation-center/components/status-chip/status-chip';
import {
  AiInsight,
  EnterpriseContext,
  ReservationConflict,
  ReservationFormModel,
  UiReservationStatus,
} from '../../../features/reservation-center/models/reservation-center.models';
import { ReservationCenterAiService } from '../../../features/reservation-center/services/reservation-center-ai.service';
import { ReservationCenterService } from '../../../features/reservation-center/services/reservation-center.service';
import { ReservationCenterState } from '../../../features/reservation-center/state/reservation-center.state';
import {
  BackendReservation,
  ReservationCreateRequest,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import { BackendReservationSlot } from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';

type ReservationScope = 'all' | UiReservationStatus;

@Component({
  selector: 'app-enterprise-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AiInsightsPanel, StatusChip],
  templateUrl: './enterprise-reservations.html',
  styleUrls: ['./enterprise-reservations.css'],
})
export class EnterpriseReservations implements OnInit {
  loading = true;
  saving = false;
  deleting = false;
  error = '';
  success = '';

  search = '';
  statusFilter: ReservationScope = 'all';
  showForm = false;
  showAdminDelete = false;
  selectedReservationId: number | null = null;
  selectedSlotId: number | null = null;
  pendingDelete: BackendReservation | null = null;

  reservations: BackendReservation[] = [];
  slots: BackendReservationSlot[] = [];
  aiInsights: AiInsight[] = [];
  context: EnterpriseContext = {
    enterpriseId: null,
    companyName: '',
    role: 'enterprise',
    isAdmin: false,
  };

  form: ReservationFormModel = this.createForm();

  constructor(
    private readonly auth: AuthService,
    private readonly state: ReservationCenterState,
    private readonly ai: ReservationCenterAiService,
    private readonly workspace: ReservationCenterService,
  ) {}

  ngOnInit(): void {
    this.context = this.readContext();
    this.refresh();
  }

  get dashboardTitle(): string {
    return this.context.isAdmin ? 'Reservation Control Center' : 'Reservation Requests';
  }

  get providerReservations(): BackendReservation[] {
    const scoped = this.context.isAdmin
      ? this.reservations
      : this.reservations.filter(reservation => this.providerEnterpriseId(reservation) === this.context.enterpriseId);
    return this.applyReservationFilters(scoped);
  }

  get myReservations(): BackendReservation[] {
    const scoped = this.context.isAdmin
      ? this.reservations
      : this.reservations.filter(reservation => this.consumerEnterpriseId(reservation) === this.context.enterpriseId);
    return this.applyReservationFilters(scoped);
  }

  get marketplaceSlots(): BackendReservationSlot[] {
    if (this.context.isAdmin) {
      return [];
    }

    return this.slots
      .filter(slot => slot.status === 'open')
      .filter(slot => this.slotEnterpriseId(slot) !== this.context.enterpriseId)
      .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
  }

  get selectedReservation(): BackendReservation | null {
    return this.reservations.find(reservation => reservation.id === this.selectedReservationId) ?? null;
  }

  get selectedReservationTimeline() {
    return this.selectedReservation
      ? this.workspace.buildReservationTimeline(this.selectedReservation.status)
      : [];
  }

  get pendingCount(): number {
    return this.providerReservations.filter(item => item.status === 'PENDING').length;
  }

  get confirmedCount(): number {
    return this.providerReservations.filter(item => item.status === 'CONFIRMED').length;
  }

  get rejectedCount(): number {
    return this.providerReservations.filter(item => item.status === 'CANCELLED').length;
  }

  get conflictCount(): number {
    return this.providerReservations.filter(item => this.conflictFor(item).hasConflict).length;
  }

  openCreate(slot?: BackendReservationSlot): void {
    this.form = this.createForm();
    this.showForm = true;
    this.error = '';
    this.success = '';

    if (slot) {
      this.selectedSlotId = slot.id;
      this.form.slotId = slot.id;
      this.form.machine = slot.machine;
      this.form.date = slot.date;
      this.form.startHour = slot.startHour;
      this.form.hours = Math.max(1, slot.endHour - slot.startHour);
      this.form.solar = slot.solar;
    }
  }

  openEdit(reservation: BackendReservation): void {
    this.selectedReservationId = reservation.id;
    this.showForm = true;
    this.form = {
      id: reservation.id,
      slotId: reservation.slotId ?? null,
      company: reservation.company,
      machine: reservation.machine,
      date: reservation.date,
      startHour: reservation.startHour,
      hours: reservation.hours,
      solar: reservation.solar,
      enterpriseId: this.consumerEnterpriseId(reservation),
      status: reservation.status,
    };
  }

  closeForm(): void {
    this.showForm = false;
    this.saving = false;
    this.selectedSlotId = null;
    this.form = this.createForm();
  }

  saveReservation(): void {
    if (this.saving) {
      return;
    }

    if (!this.form.company.trim() || !this.form.machine.trim() || !this.form.date || this.form.slotId == null) {
      this.error = 'Company, slot, machine, and date are required.';
      return;
    }

    const payload: ReservationCreateRequest = {
      company: this.form.company.trim(),
      machine: this.form.machine.trim(),
      date: this.form.date,
      hours: this.form.hours,
      startHour: this.form.startHour,
      solar: this.form.solar,
      slotId: this.form.slotId,
      enterpriseId: this.form.enterpriseId ?? this.context.enterpriseId,
      status: this.form.id ? this.form.status : 'PENDING',
    };

    this.error = '';
    this.success = '';
    this.saving = true;

    const request$ = this.form.id
      ? this.state.updateReservation(this.form.id, payload)
      : this.state.createReservationWithSlot(this.form.slotId, {
          company: payload.company,
          machine: payload.machine,
          date: payload.date,
          hours: payload.hours,
          startHour: payload.startHour,
          solar: payload.solar,
          enterpriseId: payload.enterpriseId,
          status: 'PENDING',
        });

    request$.subscribe({
      next: () => {
        this.success = this.form.id ? 'Reservation updated.' : 'Reservation request sent.';
        this.closeForm();
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to save reservation.';
        this.saving = false;
      },
    });
  }

  decide(reservation: BackendReservation, nextStatus: UiReservationStatus): void {
    if (nextStatus === 'REJECTED') {
      const reason = window.prompt('Reason for rejection:', reservation.cancelReason ?? '') ?? '';
      this.state.cancelReservation(reservation.id, reason).subscribe({
        next: () => {
          this.success = 'Reservation rejected.';
          this.refresh();
        },
        error: error => {
          this.error = error?.error?.message ?? 'Failed to reject reservation.';
        },
      });
      return;
    }

    const payload: ReservationCreateRequest = {
      company: reservation.company,
      machine: reservation.machine,
      date: reservation.date,
      hours: reservation.hours,
      startHour: reservation.startHour,
      solar: reservation.solar,
      slotId: reservation.slotId ?? null,
      enterpriseId: this.consumerEnterpriseId(reservation),
      status: this.workspace.fromUiReservationStatus(nextStatus),
    };

    this.state.updateReservation(reservation.id, payload).subscribe({
      next: () => {
        this.success = 'Reservation confirmed.';
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to confirm reservation.';
      },
    });
  }

  requestDelete(reservation: BackendReservation): void {
    this.pendingDelete = reservation;
    this.showAdminDelete = true;
  }

  deleteReservation(): void {
    if (!this.pendingDelete) {
      return;
    }

    this.deleting = true;
    this.state.deleteReservation(this.pendingDelete.id).subscribe({
      next: () => {
        this.success = 'Reservation deleted.';
        this.deleting = false;
        this.showAdminDelete = false;
        this.pendingDelete = null;
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to delete reservation.';
        this.deleting = false;
      },
    });
  }

  selectReservation(reservation: BackendReservation): void {
    this.selectedReservationId = reservation.id;
  }

  conflictFor(reservation: BackendReservation): ReservationConflict {
    return this.workspace.detectReservationConflict(reservation, this.reservations, this.slots);
  }

  toUiStatus(reservation: BackendReservation): UiReservationStatus {
    return this.workspace.toUiReservationStatus(reservation.status);
  }

  statusVariant(status: UiReservationStatus) {
    return this.workspace.statusVariant(status);
  }

  handleInsightAction(_insight: AiInsight): void {
    if (!this.marketplaceSlots.length) {
      return;
    }

    this.openCreate(this.marketplaceSlots[0]);
  }

  private refresh(): void {
    this.loading = true;
    this.context = this.readContext();

    this.state.loadAll().subscribe({
      next: snapshot => {
        this.reservations = snapshot.reservations;
        this.slots = snapshot.slots;
        this.loading = false;
        this.loadInsights();
      },
      error: error => {
        this.loading = false;
        this.error = error?.error?.message ?? 'Failed to load reservations.';
      },
    });
  }

  private loadInsights(): void {
    this.ai.getInsights('reservations', this.context).subscribe({
      next: insights => {
        this.aiInsights = insights;
      },
      error: () => {
        this.aiInsights = [];
      },
    });
  }

  private readContext(): EnterpriseContext {
    const currentUser = this.auth.currentUser;
    return {
      enterpriseId: currentUser?.enterprise?.id ?? currentUser?.enterpriseId ?? null,
      companyName:
        currentUser?.enterprise?.companyName ??
        currentUser?.company ??
        currentUser?.name ??
        'Enterprise',
      role: currentUser?.role ?? 'enterprise',
      isAdmin: currentUser?.role === 'admin',
    };
  }

  private createForm(): ReservationFormModel {
    return {
      id: null,
      slotId: null,
      company: this.context.companyName,
      machine: '',
      date: new Date().toISOString().slice(0, 10),
      startHour: 8,
      hours: 2,
      solar: false,
      enterpriseId: this.context.enterpriseId,
      status: 'PENDING',
    };
  }

  private applyReservationFilters(rows: BackendReservation[]): BackendReservation[] {
    const query = this.search.trim().toLowerCase();

    return rows
      .filter(row => this.statusFilter === 'all' || this.toUiStatus(row) === this.statusFilter)
      .filter(row => {
        if (!query) {
          return true;
        }

        return [
          row.company,
          row.machine,
          row.date,
          this.toUiStatus(row),
        ].some(value => value.toLowerCase().includes(query));
      })
      .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
  }

  private consumerEnterpriseId(reservation: BackendReservation): number | null {
    return this.workspace.getReservationRelations(reservation, this.slots).consumerEnterpriseId;
  }

  private providerEnterpriseId(reservation: BackendReservation): number | null {
    return this.workspace.getReservationRelations(reservation, this.slots).providerEnterpriseId;
  }

  private slotEnterpriseId(slot: BackendReservationSlot): number | null {
    return slot.enterprise?.id ?? slot.enterpriseId ?? null;
  }
}
