import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis
} from 'ng-apexcharts';
import { ChartCardComponent } from '../../components/chart-card/chart-card.component';
import {
  CURRENT_ENTERPRISE_NAME,
  HEATMAP_DAYS,
  InsightCard,
  NotificationChannel,
  Reservation,
  ReservationConflict,
  ReservationDraft,
  ReservationNotificationEvent,
  ReservationRole,
  ReservationSlot,
  ReservationStatus
} from '../../reservation-workspace.models';
import { ReservationWorkspaceService } from '../../services/reservation-workspace.service';

@Component({
  selector: 'app-reservations-page',
  standalone: true,
  imports: [
    ChartCardComponent,
    CommonModule,
    FormsModule,
    FullCalendarModule,
    ReactiveFormsModule
  ],
  templateUrl: './reservations-page.component.html',
  styleUrl: './reservations-page.component.scss'
})
export class ReservationsPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly enterpriseName = CURRENT_ENTERPRISE_NAME;
  readonly editorForm = this.fb.group({
    title: ['', Validators.required],
    customer: ['', Validators.required],
    resource: ['', Validators.required],
    slotId: ['', Validators.required],
    role: ['provider' as ReservationRole, Validators.required],
    city: ['Tunis', Validators.required],
    category: ['Space' as Reservation['category'], Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
    headcount: [4, [Validators.required, Validators.min(1)]],
    amount: [1200, [Validators.required, Validators.min(100)]],
    status: ['pending' as ReservationStatus, Validators.required],
    notes: [''],
    tags: [''],
    contactName: ['', Validators.required],
    contactEmail: [''],
    contactPhone: [''],
    notificationChannel: ['email' as NotificationChannel, Validators.required]
  });

  reservations: Reservation[] = [];
  slots: ReservationSlot[] = [];
  conflicts: ReservationConflict[] = [];
  insights: InsightCard[] = [];
  notifications: ReservationNotificationEvent[] = [];

  search = '';
  filter: 'all' | ReservationStatus = 'all';
  roleFilter: 'all' | ReservationRole = 'all';
  bookingView: 'all' | ReservationRole = 'all';
  riskMetric: 'cancellation' | 'readiness' = 'cancellation';
  activeBookingDay: string | null = null;
  selectedReservationId = '';
  editorMode: 'create' | 'edit' | null = null;
  viewModalOpen = false;
  deleteArmedId = '';
  editorErrorMessage = '';
  toastMessage = '';
  toastVisible = false;
  private rankedReservations: Reservation[] = [];

  bookingSeries: ApexAxisChartSeries = [{ name: 'Bookings', data: [] }];
  bookingChart: ApexChart = {
    type: 'area',
    height: 250,
    toolbar: { show: false },
    zoom: { enabled: false }
  };
  bookingXAxis: ApexXAxis = { categories: HEATMAP_DAYS };

  riskSeries: ApexAxisChartSeries = [{ name: 'Watch level', data: [] }];
  riskChart: ApexChart = {
    type: 'bar',
    height: 250,
    toolbar: { show: false }
  };
  riskXAxis: ApexXAxis = { categories: [] };

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,dayGridMonth,listWeek'
    },
    selectable: true,
    nowIndicator: true,
    slotMinTime: '06:00:00',
    slotMaxTime: '21:00:00',
    height: 'auto',
    events: [],
    select: (selection) => this.handleSelection(selection),
    eventClick: (event) => this.handleEventClick(event)
  };

  constructor(private readonly workspaceService: ReservationWorkspaceService) {
    this.workspaceService.reservations$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((reservations) => {
        this.reservations = reservations;
        if (
          !this.selectedReservationId ||
          !reservations.some((item) => item.id === this.selectedReservationId)
        ) {
          this.selectedReservationId = reservations[0]?.id ?? '';
        }
        this.syncCalendarEvents();
        this.syncCharts();
      });

    this.workspaceService.slots$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((slots) => {
        this.slots = slots;
        if (!this.editorForm.get('slotId')?.value && slots.length) {
          this.editorForm.patchValue({
            slotId: slots[0].id,
            city: slots[0].city
          });
        }
      });

    this.workspaceService.conflicts$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((conflicts) => (this.conflicts = conflicts));

    this.workspaceService.reservationInsights$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((insights) => (this.insights = insights));

    this.workspaceService.reservationNotifications$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((notifications) => {
        const newest = notifications[0];
        const previous = this.notifications[0];
        this.notifications = notifications;
        if (newest && newest !== previous) {
          this.showToast(newest.summary);
        }
      });

    this.editorForm
      .get('slotId')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((slotId) => {
        const slot = this.slots.find((item) => item.id === slotId);
        if (!slot) {
          return;
        }
        this.editorForm.patchValue({ city: slot.city }, { emitEvent: false });
      });
  }

  get filteredReservations(): Reservation[] {
    const query = this.search.trim().toLowerCase();
    return this.reservations.filter((reservation) => {
      const statusMatches = this.filter === 'all' || reservation.status === this.filter;
      const roleMatches = this.roleFilter === 'all' || reservation.role === this.roleFilter;
      const dayMatches =
        !this.activeBookingDay || this.weekdayLabel(reservation.start) === this.activeBookingDay;
      const queryMatches =
        !query ||
        reservation.code.toLowerCase().includes(query) ||
        reservation.title.toLowerCase().includes(query) ||
        reservation.customer.toLowerCase().includes(query) ||
        reservation.slotName.toLowerCase().includes(query) ||
        reservation.city.toLowerCase().includes(query);
      return statusMatches && roleMatches && dayMatches && queryMatches;
    });
  }

  get selectedReservation(): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === this.selectedReservationId);
  }

  get hostedCount(): number {
    return this.reservations.filter((reservation) => reservation.role === 'provider').length;
  }

  get requestedCount(): number {
    return this.reservations.filter((reservation) => reservation.role === 'consumer').length;
  }

  get watchCount(): number {
    return this.reservations.filter((reservation) => reservation.cancellationRisk >= 60).length;
  }

  get recentNotifications(): ReservationNotificationEvent[] {
    return this.notifications.slice(0, 3);
  }

  get bookingChartBadge(): string {
    if (this.activeBookingDay) {
      return `${this.activeBookingDay} focus`;
    }

    if (this.bookingView === 'provider') {
      return 'Host view';
    }

    if (this.bookingView === 'consumer') {
      return 'Request view';
    }

    return 'Weekly view';
  }

  get riskChartBadge(): string {
    return this.riskMetric === 'cancellation' ? 'Priority review' : 'Readiness pulse';
  }

  get riskChartColor(): string[] {
    return this.riskMetric === 'cancellation' ? ['#d97706'] : ['#059669'];
  }

  get showReservationModal(): boolean {
    return this.viewModalOpen || this.editorMode !== null;
  }

  get showDeleteModal(): boolean {
    return Boolean(this.deleteArmedId && this.selectedReservation?.id === this.deleteArmedId);
  }

  selectReservation(id: string): void {
    this.selectedReservationId = id;
    this.editorMode = null;
    this.deleteArmedId = '';
  }

  startCreateReservation(preset?: { start: string; end: string }): void {
    this.editorMode = 'create';
    this.viewModalOpen = false;
    this.deleteArmedId = '';
    this.editorErrorMessage = '';
    const firstSlot = this.slots[0];
    this.editorForm.reset({
      title: '',
      customer: '',
      resource: '',
      slotId: firstSlot?.id ?? '',
      role: 'provider',
      city: firstSlot?.city ?? 'Tunis',
      category: 'Space',
      start: preset?.start ?? '',
      end: preset?.end ?? '',
      headcount: 4,
      amount: 1200,
      status: 'pending',
      notes: '',
      tags: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      notificationChannel: 'email'
    });
  }

  startEditReservation(reservation: Reservation): void {
    this.selectedReservationId = reservation.id;
    this.editorMode = 'edit';
    this.viewModalOpen = false;
    this.deleteArmedId = '';
    this.editorErrorMessage = '';
    this.editorForm.reset({
      title: reservation.title,
      customer: reservation.customer,
      resource: reservation.resource,
      slotId: reservation.slotId,
      role: reservation.role,
      city: reservation.city,
      category: reservation.category,
      start: reservation.start,
      end: reservation.end,
      headcount: reservation.headcount,
      amount: reservation.amount,
      status: reservation.status,
      notes: reservation.notes,
      tags: reservation.tags.join(', '),
      contactName: reservation.contactName,
      contactEmail: reservation.contactEmail,
      contactPhone: reservation.contactPhone,
      notificationChannel: reservation.notificationChannel
    });
  }

  saveReservation(): void {
    if (this.editorForm.invalid) {
      this.editorForm.markAllAsTouched();
      this.editorErrorMessage = 'Complete the required booking fields before saving.';
      return;
    }

    const draft = this.buildDraftFromForm();
    if (this.editorMode === 'edit' && this.selectedReservation) {
      this.workspaceService.updateReservation(this.selectedReservation.id, draft);
    } else {
      this.workspaceService.createReservation(draft);
    }

    this.editorErrorMessage = '';
    this.editorMode = null;
  }

  cancelEditor(): void {
    this.editorErrorMessage = '';
    this.editorMode = null;
    this.viewModalOpen = false;
  }

  confirmReservation(reservation: Reservation): void {
    if (reservation.status === 'confirmed') {
      return;
    }

    if (!this.hasConfirmationDestination(reservation)) {
      this.showToast('Add an email or phone number before confirming this service.');
      this.startEditReservation(reservation);
      return;
    }

    this.workspaceService.updateReservation(reservation.id, {
      ...this.toDraft(reservation),
      status: 'confirmed'
    });
  }

  requestDeleteReservation(reservation: Reservation): void {
    this.selectedReservationId = reservation.id;
    this.deleteArmedId = reservation.id;
    this.viewModalOpen = false;
  }

  closeDeleteModal(): void {
    this.deleteArmedId = '';
  }

  deleteReservation(reservationId: string): void {
    this.workspaceService.deleteReservation(reservationId);
    if (this.selectedReservationId === reservationId) {
      this.selectedReservationId = this.reservations.find((item) => item.id !== reservationId)?.id ?? '';
    }
    this.deleteArmedId = '';
    this.editorMode = null;
    this.viewModalOpen = false;
  }

  riskWidth(reservation: Reservation): string {
    return `${reservation.cancellationRisk}%`;
  }

  roleLabel(reservation: Reservation): string {
    return reservation.role === 'provider' ? 'Host side' : 'Request side';
  }

  roleTone(reservation: Reservation): string {
    return reservation.role === 'provider' ? 'primary' : 'success';
  }

  statusLabel(status: ReservationStatus): string {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'risk':
        return 'Watch';
      default:
        return 'Cancelled';
    }
  }

  companyLine(reservation: Reservation): string {
    return reservation.role === 'provider'
      ? `${reservation.consumerCompany} booked your asset`
      : `You booked from ${reservation.providerCompany}`;
  }

  contactLine(reservation: Reservation): string {
    const channel =
      reservation.notificationChannel === 'email'
        ? reservation.contactEmail
        : reservation.notificationChannel === 'sms'
          ? reservation.contactPhone
          : `${reservation.contactEmail} and ${reservation.contactPhone}`;

    return channel || 'No confirmation contact';
  }

  notificationLabel(reservation: Reservation): string {
    return reservation.confirmationNotice
      ? reservation.confirmationNotice.summary
      : this.hasConfirmationDestination(reservation)
        ? 'Confirmation will be sent after approval.'
        : 'Add an email or phone number to send the confirmation.';
  }

  trackSelected(): string {
    return this.selectedReservationId;
  }

  setBookingView(view: 'all' | ReservationRole): void {
    this.bookingView = view;
    this.syncCharts();
  }

  setRiskMetric(metric: 'cancellation' | 'readiness'): void {
    this.riskMetric = metric;
    this.syncCharts();
  }

  clearBookingDayFocus(): void {
    this.activeBookingDay = null;
  }

  onBookingChartSelect(event: {
    label: string;
  }): void {
    if (!event.label) {
      return;
    }

    this.activeBookingDay = this.activeBookingDay === event.label ? null : event.label;
    const focused = this.filteredReservations[0];
    if (focused) {
      this.selectedReservationId = focused.id;
    }
  }

  onRiskChartSelect(event: {
    dataPointIndex: number;
  }): void {
    const reservation = this.rankedReservations[event.dataPointIndex];
    if (reservation) {
      this.selectReservation(reservation.id);
    }
  }

  private handleSelection(selection: DateSelectArg): void {
    this.startCreateReservation({
      start: this.toLocalInputValue(selection.start),
      end: this.toLocalInputValue(selection.end)
    });
  }

  private handleEventClick(event: EventClickArg): void {
    this.selectReservation(event.event.id);
  }

  openReservationDetails(reservation: Reservation): void {
    this.selectedReservationId = reservation.id;
    this.editorMode = null;
    this.deleteArmedId = '';
    this.viewModalOpen = true;
  }

  closeReservationModal(): void {
    this.viewModalOpen = false;
    this.editorMode = null;
    this.deleteArmedId = '';
    this.editorErrorMessage = '';
  }

  private buildDraftFromForm(): ReservationDraft {
    const value = this.editorForm.getRawValue();
    return {
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
    };
  }

  private toDraft(reservation: Reservation): ReservationDraft {
    return {
      title: reservation.title,
      customer: reservation.customer,
      resource: reservation.resource,
      slotId: reservation.slotId,
      role: reservation.role,
      city: reservation.city,
      category: reservation.category,
      start: reservation.start,
      end: reservation.end,
      headcount: reservation.headcount,
      amount: reservation.amount,
      status: reservation.status,
      notes: reservation.notes,
      tags: reservation.tags,
      contactName: reservation.contactName,
      contactEmail: reservation.contactEmail,
      contactPhone: reservation.contactPhone,
      notificationChannel: reservation.notificationChannel
    };
  }

  private syncCalendarEvents(): void {
    const events: EventInput[] = this.reservations.map((reservation) => ({
      id: reservation.id,
      title: `${reservation.code} - ${reservation.customer}`,
      start: reservation.start,
      end: reservation.end,
      backgroundColor: reservation.color,
      borderColor: reservation.color
    }));

    this.calendarOptions = {
      ...this.calendarOptions,
      events
    };
  }

  private syncCharts(): void {
    const bookingSource =
      this.bookingView === 'all'
        ? this.reservations
        : this.reservations.filter((reservation) => reservation.role === this.bookingView);
    const bookingBuckets = HEATMAP_DAYS.map((day) => ({
      day,
      value: bookingSource.filter((reservation) => this.weekdayLabel(reservation.start) === day)
        .length
    }));

    this.bookingSeries = [{ name: 'Bookings', data: bookingBuckets.map((bucket) => bucket.value) }];
    this.bookingXAxis = { categories: bookingBuckets.map((bucket) => bucket.day) };

    const rankedReservations = this.reservations
      .slice()
      .sort((left, right) => {
        const leftValue =
          this.riskMetric === 'cancellation'
            ? left.cancellationRisk
            : (left.readinessScore ?? 0);
        const rightValue =
          this.riskMetric === 'cancellation'
            ? right.cancellationRisk
            : (right.readinessScore ?? 0);
        return rightValue - leftValue;
      })
      .slice(0, 5);
    this.rankedReservations = rankedReservations;

    this.riskSeries = [
      {
        name: this.riskMetric === 'cancellation' ? 'Watch level' : 'Readiness',
        data: rankedReservations.map((reservation) =>
          this.riskMetric === 'cancellation'
            ? reservation.cancellationRisk
            : (reservation.readinessScore ?? 0)
        )
      }
    ];
    this.riskXAxis = { categories: rankedReservations.map((reservation) => reservation.code) };
  }

  private weekdayLabel(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
  }

  private toLocalInputValue(date: Date): string {
    const adjusted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return adjusted.toISOString().slice(0, 16);
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 3200);
  }

  private hasConfirmationDestination(
    reservation: Pick<Reservation, 'contactEmail' | 'contactPhone' | 'notificationChannel'>
  ): boolean {
    if (reservation.notificationChannel === 'email') {
      return Boolean(reservation.contactEmail?.trim());
    }

    if (reservation.notificationChannel === 'sms') {
      return Boolean(reservation.contactPhone?.trim());
    }

    return Boolean(reservation.contactEmail?.trim() || reservation.contactPhone?.trim());
  }
}
