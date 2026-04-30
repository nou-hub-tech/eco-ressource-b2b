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
  ResourceKind,
  SlotCalendarMode,
  SlotFormModel,
} from '../../../features/reservation-center/models/reservation-center.models';
import { ReservationCenterAiService } from '../../../features/reservation-center/services/reservation-center-ai.service';
import { ReservationCenterService } from '../../../features/reservation-center/services/reservation-center.service';
import { ReservationCenterState } from '../../../features/reservation-center/state/reservation-center.state';
import { BackendReservation } from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import {
  BackendReservationSlot,
  SlotRequest,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';

@Component({
  selector: 'app-enterprise-slots',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, AiInsightsPanel, StatusChip],
  templateUrl: './enterprise-slots.html',
  styleUrls: ['./enterprise-slots.css'],
})
export class EnterpriseSlots implements OnInit {
  loading = true;
  saving = false;
  error = '';
  success = '';

  aiInsights: AiInsight[] = [];
  slots: BackendReservationSlot[] = [];
  reservations: BackendReservation[] = [];
  context: EnterpriseContext = {
    enterpriseId: null,
    companyName: '',
    role: 'enterprise',
    isAdmin: false,
  };

  calendarMode: SlotCalendarMode = 'week';
  calendarAnchor = new Date();
  form: SlotFormModel = this.createForm();
  selectedCalendarDate = '';
  readonly resourceKinds: ResourceKind[] = ['Machine', 'Space', 'Tool', 'Other'];

  constructor(
    private readonly auth: AuthService,
    private readonly state: ReservationCenterState,
    private readonly ai: ReservationCenterAiService,
    public readonly workspace: ReservationCenterService,
  ) {}

  ngOnInit(): void {
    this.context = this.readContext();
    this.refresh();
  }

  get calendarCells() {
    return this.workspace.buildSlotCalendar(this.ownedSlots, this.relatedReservations, this.calendarMode, this.calendarAnchor);
  }

  get heatmapCells() {
    return this.workspace.buildHeatmap(this.ownedSlots, this.relatedReservations);
  }

  get ownedSlots(): BackendReservationSlot[] {
    return this.context.isAdmin
      ? this.slots
      : this.slots.filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) === this.context.enterpriseId);
  }

  get relatedReservations(): BackendReservation[] {
    if (this.context.isAdmin) {
      return this.reservations;
    }

    const ownedIds = new Set(this.ownedSlots.map(slot => slot.id));
    return this.reservations.filter(reservation => reservation.slotId != null && ownedIds.has(reservation.slotId));
  }

  get openSlotsCount(): number {
    return this.ownedSlots.filter(slot => slot.status === 'open').length;
  }

  get bookedSlotsCount(): number {
    return this.ownedSlots.filter(slot => slot.status === 'booked').length;
  }

  get blockedSlotsCount(): number {
    return this.ownedSlots.filter(slot => slot.status === 'blocked').length;
  }

  get totalUtilization(): number {
    return this.ownedSlots.length ? Math.round((this.bookedSlotsCount / this.ownedSlots.length) * 100) : 0;
  }

  edit(slot: BackendReservationSlot): void {
    this.form = {
      id: slot.id,
      resourceName: this.workspace.resourceName(slot.machine),
      resourceType: this.workspace.resourceKind(slot.machine),
      date: slot.date,
      startHour: slot.startHour,
      endHour: slot.endHour,
      solar: slot.solar,
      discountPct: slot.discountPct ?? 0,
      enterpriseId: slot.enterprise?.id ?? slot.enterpriseId ?? this.context.enterpriseId,
      status: slot.status,
    };
  }

  resetForm(): void {
    this.form = this.createForm();
  }

  saveSlot(): void {
    if (this.saving) {
      return;
    }

    if (!this.form.resourceName.trim() || !this.form.date) {
      this.error = 'Resource name and date are required.';
      return;
    }
    if (this.form.endHour <= this.form.startHour) {
      this.error = 'End hour must be after the start hour.';
      return;
    }

    const payload: SlotRequest = {
      machine: this.workspace.resourceLabel(this.form.resourceType, this.form.resourceName),
      date: this.form.date,
      startHour: this.form.startHour,
      endHour: this.form.endHour,
      solar: this.form.solar,
      discountPct: this.form.discountPct,
      enterpriseId: this.form.enterpriseId ?? this.context.enterpriseId,
      status: this.form.status,
    };

    this.saving = true;
    this.error = '';

    const request$ = this.form.id
      ? this.state.updateSlot(this.form.id, payload)
      : this.state.createSlot(payload);

    request$.subscribe({
      next: () => {
        this.success = this.form.id ? 'Slot updated.' : 'Slot created.';
        this.saving = false;
        this.resetForm();
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to save slot.';
        this.saving = false;
      },
    });
  }

  deleteSlot(slot: BackendReservationSlot): void {
    if (!window.confirm(`Delete resource ${this.workspace.resourceName(slot.machine)} on ${slot.date}?`)) {
      return;
    }

    this.state.deleteSlot(slot.id).subscribe({
      next: () => {
        this.success = 'Slot deleted.';
        if (this.form.id === slot.id) {
          this.resetForm();
        }
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to delete slot.';
      },
    });
  }

  setCalendarMode(mode: SlotCalendarMode): void {
    this.calendarMode = mode;
  }

  moveCalendar(step: number): void {
    const next = new Date(this.calendarAnchor);
    next.setDate(this.calendarAnchor.getDate() + (this.calendarMode === 'week' ? step * 7 : step * 30));
    this.calendarAnchor = next;
  }

  statusVariant(status: string) {
    return this.workspace.statusVariant(status as 'open');
  }

  heatmapClass(occupancy: number): string {
    if (occupancy >= 80) {
      return 'danger';
    }
    if (occupancy >= 45) {
      return 'warning';
    }
    if (occupancy > 0) {
      return 'info';
    }
    return 'success';
  }

  applyInsight(insight: AiInsight): void {
    const date = insight.meta?.['date'];
    const startHour = insight.meta?.['startHour'];
    const endHour = insight.meta?.['endHour'];
    const discountPct = insight.meta?.['discountPct'];
    const solar = insight.meta?.['solar'];

    if (typeof date === 'string') {
      this.form.date = date;
    }
    if (typeof startHour === 'number') {
      this.form.startHour = startHour;
    }
    if (typeof endHour === 'number') {
      this.form.endHour = endHour;
    }
    if (typeof discountPct === 'number') {
      this.form.discountPct = discountPct;
    }
    if (typeof solar === 'boolean') {
      this.form.solar = solar;
    }

    this.success = 'Applied AI suggestion to the slot form.';
  }

  private refresh(): void {
    this.loading = true;
    this.context = this.readContext();

    this.state.loadAll().subscribe({
      next: snapshot => {
        this.slots = snapshot.slots;
        this.reservations = snapshot.reservations;
        this.loading = false;
        this.loadInsights();
      },
      error: error => {
        this.loading = false;
        this.error = error?.error?.message ?? 'Failed to load slots.';
      },
    });
  }

  private loadInsights(): void {
    this.ai.getInsights('slots', this.context).subscribe({
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

  private createForm(): SlotFormModel {
    return {
      id: null,
      resourceName: '',
      resourceType: 'Machine',
      date: new Date().toISOString().slice(0, 10),
      startHour: 8,
      endHour: 12,
      solar: false,
      discountPct: 0,
      enterpriseId: this.context.enterpriseId,
      status: 'open',
    };
  }

  resourceKind(value: string): ResourceKind {
    return this.workspace.resourceKind(value);
  }

  resourceName(value: string): string {
    return this.workspace.resourceName(value);
  }

  resourceToken(value: string | ResourceKind): string {
    return this.workspace.resourceToken(value);
  }

  resourceAccent(value: string | ResourceKind): string {
    const kind = this.resourceKinds.includes(value as ResourceKind)
      ? (value as ResourceKind)
      : this.workspace.resourceKind(String(value));
    return this.workspace.resourceAccent(kind);
  }

  windowLabel(slot: BackendReservationSlot): string {
    return this.workspace.formatWindow(slot.startHour, slot.endHour);
  }

  duplicate(slot: BackendReservationSlot): void {
    const payload: SlotRequest = {
      machine: slot.machine,
      date: slot.date,
      startHour: slot.startHour,
      endHour: slot.endHour,
      solar: slot.solar,
      discountPct: slot.discountPct,
      enterpriseId: slot.enterprise?.id ?? slot.enterpriseId ?? this.context.enterpriseId,
      status: slot.status,
    };

    this.state.createSlot(payload).subscribe({
      next: () => {
        this.success = 'Resource duplicated.';
        this.refresh();
      },
      error: error => {
        this.error = error?.error?.message ?? 'Failed to duplicate resource.';
      },
    });
  }

  openCalendarDate(date: string): void {
    this.selectedCalendarDate = date;
  }

  closeCalendarDate(): void {
    this.selectedCalendarDate = '';
  }

  get selectedCalendarSlots(): BackendReservationSlot[] {
    return this.ownedSlots
      .filter(slot => slot.date === this.selectedCalendarDate)
      .sort((left, right) => left.startHour - right.startHour);
  }

  heatmapTooltip(cell: { date: string; occupancy: number; reservationCount: number }): string {
    return `${cell.reservationCount} reservations · ${cell.occupancy}% utilization · peak ${this.peakHoursForDate(cell.date)}`;
  }

  peakHoursForDate(date: string): string {
    const scoped = this.relatedReservations.filter(reservation => reservation.date === date);
    if (!scoped.length) {
      return 'Open capacity';
    }

    const counts = new Map<number, number>();
    for (const reservation of scoped) {
      counts.set(reservation.startHour, (counts.get(reservation.startHour) ?? 0) + 1);
    }

    const [hour] = [...counts.entries()].sort((left, right) => right[1] - left[1])[0];
    return this.workspace.formatHour(hour);
  }
}
