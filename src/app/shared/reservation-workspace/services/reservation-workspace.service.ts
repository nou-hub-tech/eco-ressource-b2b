import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, combineLatest, map } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import {
  ActivityCenterItem,
  CURRENT_ENTERPRISE_NAME,
  HEATMAP_DAYS,
  HEATMAP_HOURS,
  InsightCard,
  SLOT_IMAGE_LIMIT,
  ReservationConfirmationNotice,
  ReservationNotificationEvent,
  Order,
  OrderDraft,
  OrderLineItem,
  OrderStatus,
  Reservation,
  ReservationConflict,
  ReservationDraft,
  ReservationSlot,
  ReservationSlotDraft,
  TrackingStep,
  WorkspaceSummary
} from '../reservation-workspace.models';
import {
  MOCK_ORDERS,
  MOCK_RESERVATIONS,
  MOCK_SLOTS
} from '../reservation-workspace.mock';

@Injectable({ providedIn: 'root' })
export class ReservationWorkspaceService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly apiUrl = `${environment.apiUrl}/enterprise/reservation-workspace`;
  private readonly listingImagesUrl = `${environment.apiUrl}/listing-images`;
  private readonly demoTokenPrefix = 'eco-demo-token';
  private readonly reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  private readonly slotsSubject = new BehaviorSubject<ReservationSlot[]>([]);
  private readonly ordersSubject = new BehaviorSubject<Order[]>([]);
  private readonly reservationNotificationsSubject = new BehaviorSubject<ReservationNotificationEvent[]>([]);
  private lastSessionKey = '';
  private apiAvailable = false;

  readonly reservations$ = this.reservationsSubject.asObservable();
  readonly slots$ = this.slotsSubject.asObservable();
  readonly orders$ = this.ordersSubject.asObservable();
  readonly reservationNotifications$ = this.reservationNotificationsSubject.asObservable();

  readonly conflicts$ = combineLatest([this.reservations$, this.slots$]).pipe(
    map(([reservations, slots]) => this.buildConflicts(reservations, slots))
  );

  readonly summary$ = combineLatest([
    this.reservations$,
    this.slots$,
    this.orders$,
    this.conflicts$
  ]).pipe(
    map(([reservations, slots, orders, conflicts]) =>
      this.buildSummary(reservations, slots, orders, conflicts)
    )
  );

  readonly reservationInsights$ = combineLatest([
    this.reservations$,
    this.slots$,
    this.conflicts$
  ]).pipe(
    map(([reservations, slots, conflicts]) =>
      this.buildReservationInsights(reservations, slots, conflicts)
    )
  );

  readonly slotInsights$ = this.slots$.pipe(map((slots) => this.buildSlotInsights(slots)));

  readonly orderInsights$ = this.orders$.pipe(map((orders) => this.buildOrderInsights(orders)));

  readonly activityFeed$ = combineLatest([
    this.reservations$,
    this.slots$,
    this.orders$,
    this.conflicts$,
    this.reservationNotifications$
  ]).pipe(
    map(([reservations, slots, orders, conflicts, notifications]) =>
      this.buildActivityFeed(reservations, slots, orders, conflicts, notifications)
    )
  );

  readonly enterpriseActivity$ = this.activityFeed$.pipe(
    map((items) => items.filter((item) => item.audience !== 'admin'))
  );

  readonly adminActivity$ = this.activityFeed$.pipe(
    map((items) => items.filter((item) => item.audience !== 'enterprise'))
  );

  constructor() {
    this.hydrateFromMock();
    this.authService.user$.subscribe(() => this.syncWorkspaceSource());
    this.syncWorkspaceSource();
  }

  private syncWorkspaceSource(): void {
    const sessionKey = [
      this.authService.getToken() ?? '',
      this.authService.currentUser?.id ?? '',
      this.authService.currentUser?.role ?? '',
      this.authService.currentUser?.companyId ?? ''
    ].join('|');

    if (sessionKey === this.lastSessionKey) {
      return;
    }
    this.lastSessionKey = sessionKey;

    if (this.isRealWorkspaceSession()) {
      this.loadWorkspaceFromApi();
      return;
    }

    this.apiAvailable = false;
    this.hydrateFromMock();
  }

  private hydrateFromMock(): void {
    const slots = MOCK_SLOTS.map((slot) => this.decorateSlot(slot));
    const reservations = MOCK_RESERVATIONS.map((reservation) =>
      this.decorateReservation(reservation, slots)
    );
    const orders = MOCK_ORDERS.map((order) => this.decorateOrder(order, reservations));

    this.slotsSubject.next(slots);
    this.reservationsSubject.next(reservations);
    this.ordersSubject.next(orders);
    this.reservationNotificationsSubject.next([]);
  }

  private isRealWorkspaceSession(): boolean {
    const token = this.authService.getToken();
    const role = this.authService.currentUser?.role;
    return Boolean(
      token &&
      !token.startsWith(this.demoTokenPrefix) &&
      (role === 'enterprise' || role === 'admin')
    );
  }

  private canPersistViaApi(): boolean {
    return this.isRealWorkspaceSession() && this.apiAvailable;
  }

  private loadWorkspaceFromApi(): void {
    this.http.get<any>(`${this.apiUrl}/bootstrap`).subscribe({
      next: (bootstrap) => {
        this.apiAvailable = true;
        this.applyApiBootstrap(bootstrap);
      },
      error: () => {
        this.apiAvailable = false;
        this.hydrateFromMock();
      }
    });
  }

  private applyApiBootstrap(bootstrap: any): void {
    const slots = (bootstrap?.slots ?? []).map((slot: any) => this.mapApiSlot(slot));
    const reservations = (bootstrap?.reservations ?? []).map((reservation: any) =>
      this.mapApiReservation(reservation, slots)
    );
    const orders = (bootstrap?.orders ?? []).map((order: any) =>
      this.mapApiOrder(order, reservations)
    );
    const notifications = (bootstrap?.reservationNotifications ?? []).map((notification: any) =>
      this.mapApiNotification(notification)
    );

    this.slotsSubject.next(slots);
    this.reservationsSubject.next(reservations);
    this.ordersSubject.next(orders);
    this.reservationNotificationsSubject.next(notifications);
  }

  private mapApiNotification(notification: any): ReservationNotificationEvent {
    return {
      reservationId: String(notification?.reservationId ?? ''),
      reservationCode: String(notification?.reservationCode ?? ''),
      customer: String(notification?.customer ?? ''),
      channel: notification?.channel ?? 'email',
      destination: String(notification?.destination ?? ''),
      sentAt: String(notification?.sentAt ?? ''),
      summary: String(notification?.summary ?? '')
    };
  }

  private mapApiReservation(
    reservation: any,
    slots: ReservationSlot[]
  ): Reservation {
    return this.decorateReservation(
      {
        id: String(reservation?.id ?? ''),
        code: String(reservation?.code ?? ''),
        title: String(reservation?.title ?? ''),
        customer: String(reservation?.customer ?? ''),
        resource: String(reservation?.resource ?? ''),
        slotId: String(reservation?.slotId ?? ''),
        slotName: String(reservation?.slotName ?? ''),
        role: reservation?.role ?? 'consumer',
        city: String(reservation?.city ?? ''),
        category: reservation?.category ?? 'machine',
        providerCompany: String(reservation?.providerCompany ?? ''),
        consumerCompany: String(reservation?.consumerCompany ?? ''),
        start: String(reservation?.start ?? ''),
        end: String(reservation?.end ?? ''),
        headcount: Number(reservation?.headcount ?? 0),
        amount: this.toNumber(reservation?.amount),
        status: reservation?.status ?? 'pending',
        notes: String(reservation?.notes ?? ''),
        tags: Array.isArray(reservation?.tags) ? reservation.tags : [],
        contactName: String(reservation?.contactName ?? ''),
        contactEmail: String(reservation?.contactEmail ?? ''),
        contactPhone: String(reservation?.contactPhone ?? ''),
        notificationChannel: reservation?.notificationChannel ?? 'email',
        confirmationNotice: reservation?.confirmationNotice
          ? {
              channel: reservation.confirmationNotice.channel ?? 'email',
              destination: String(reservation.confirmationNotice.destination ?? ''),
              sentAt: String(reservation.confirmationNotice.sentAt ?? ''),
              summary: String(reservation.confirmationNotice.summary ?? '')
            }
          : null,
        color: String(reservation?.color ?? '#0284c7'),
        cancellationRisk: Number(reservation?.cancellationRisk ?? 0),
        recommendedTime: String(reservation?.recommendedTime ?? ''),
        bookingSuggestion: String(reservation?.bookingSuggestion ?? ''),
        readinessScore:
          reservation?.readinessScore == null ? undefined : Number(reservation.readinessScore),
        serviceBrief:
          reservation?.serviceBrief == null ? undefined : String(reservation.serviceBrief),
        coordinationChecklist: Array.isArray(reservation?.coordinationChecklist)
          ? reservation.coordinationChecklist
          : undefined,
        messageDraft:
          reservation?.messageDraft == null ? undefined : String(reservation.messageDraft),
        ecoNote: reservation?.ecoNote == null ? undefined : String(reservation.ecoNote)
      },
      slots
    );
  }

  private mapApiSlot(slot: any): ReservationSlot {
    return this.decorateSlot({
      id: String(slot?.id ?? ''),
      name: String(slot?.name ?? ''),
      zone: String(slot?.zone ?? ''),
      city: String(slot?.city ?? ''),
      ownerCompany: String(slot?.ownerCompany ?? ''),
      portfolio: slot?.portfolio ?? 'core',
      type: slot?.type ?? 'machine',
      coordinates: Array.isArray(slot?.coordinates) ? slot.coordinates : [36.8065, 10.1815],
      capacity: Number(slot?.capacity ?? 0),
      occupied: Number(slot?.occupied ?? 0),
      status: slot?.status ?? 'available',
      equipment: Array.isArray(slot?.equipment) ? slot.equipment : [],
      images: this.normalizeSlotImages(slot?.images ?? slot?.imageUrls),
      heatmap: Array.isArray(slot?.heatmap) ? slot.heatmap : this.createHeatmapFromStatus(slot?.status ?? 'available'),
      forecast: Array.isArray(slot?.forecast) ? slot.forecast : this.createForecastFromStatus(slot?.status ?? 'available'),
      utilizationRate: Number(slot?.utilizationRate ?? 0),
      predictedAvailability: Number(slot?.predictedAvailability ?? 0),
      underusedScore: Number(slot?.underusedScore ?? 0),
      recoveryAction: String(slot?.recoveryAction ?? ''),
      quietWindow: slot?.quietWindow == null ? undefined : String(slot.quietWindow),
      bestUseMode: slot?.bestUseMode == null ? undefined : String(slot.bestUseMode),
      spotlightMessage: slot?.spotlightMessage == null ? undefined : String(slot.spotlightMessage),
      activationChecklist: Array.isArray(slot?.activationChecklist)
        ? slot.activationChecklist
        : undefined,
      ecoFitNote: slot?.ecoFitNote == null ? undefined : String(slot.ecoFitNote)
    });
  }

  private mapApiOrder(
    order: any,
    reservations: Reservation[]
  ): Order {
    return this.decorateOrder(
      {
        id: String(order?.id ?? ''),
        code: String(order?.code ?? ''),
        invoiceNumber: String(order?.invoiceNumber ?? ''),
        customer: String(order?.customer ?? ''),
        reservationId: String(order?.reservationId ?? ''),
        slotId: String(order?.slotId ?? ''),
        role: order?.role ?? 'consumer',
        city: String(order?.city ?? ''),
        buyerCompany: String(order?.buyerCompany ?? ''),
        sellerCompany: String(order?.sellerCompany ?? ''),
        amount: this.toNumber(order?.amount),
        tax: this.toNumber(order?.tax),
        total: this.toNumber(order?.total),
        createdAt: String(order?.createdAt ?? ''),
        dueDate: String(order?.dueDate ?? ''),
        status: order?.status ?? 'draft',
        paymentStatus: order?.paymentStatus ?? 'pending',
        items: Array.isArray(order?.items)
          ? order.items.map((item: any) => ({
              label: String(item?.label ?? ''),
              quantity: Number(item?.quantity ?? 0),
              unitPrice: this.toNumber(item?.unitPrice)
            }))
          : [],
        qrValue: String(order?.qrValue ?? ''),
        tracking: Array.isArray(order?.tracking)
          ? order.tracking.map((step: any) => ({
              label: String(step?.label ?? ''),
              timestamp: String(step?.timestamp ?? ''),
              done: Boolean(step?.done)
            }))
          : [],
        fraudRisk: Number(order?.fraudRisk ?? 0),
        spendingCluster: String(order?.spendingCluster ?? ''),
        paymentInsight: String(order?.paymentInsight ?? ''),
        settlementPriority:
          order?.settlementPriority == null ? undefined : String(order.settlementPriority),
        nextBestAction: order?.nextBestAction == null ? undefined : String(order.nextBestAction),
        followUpDraft: order?.followUpDraft == null ? undefined : String(order.followUpDraft),
        financeChecklist: Array.isArray(order?.financeChecklist)
          ? order.financeChecklist
          : undefined,
        relationshipTone:
          order?.relationshipTone == null ? undefined : String(order.relationshipTone)
      },
      reservations
    );
  }

  private toNumber(value: unknown): number {
    if (typeof value === 'number') {
      return value;
    }
    const parsed = Number(value ?? 0);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private resolveEnterpriseId(): number | null {
    return this.authService.getCompanyProfileId();
  }

  private toApiReservationRequest(draft: ReservationDraft): Record<string, unknown> {
    return {
      title: draft.title,
      customer: draft.customer,
      resource: draft.resource,
      slotId: draft.slotId,
      role: draft.role,
      city: draft.city,
      category: draft.category,
      start: draft.start,
      end: draft.end,
      headcount: draft.headcount,
      amount: draft.amount,
      status: draft.status,
      notes: draft.notes,
      tags: draft.tags,
      contactName: draft.contactName,
      contactEmail: draft.contactEmail?.trim() || null,
      contactPhone: draft.contactPhone?.trim() || null,
      notificationChannel: draft.notificationChannel,
      enterpriseId: this.resolveEnterpriseId()
    };
  }

  private toApiSlotRequest(draft: ReservationSlotDraft): Record<string, unknown> {
    return {
      name: draft.name,
      zone: draft.zone,
      city: draft.city,
      ownerCompany: draft.ownerCompany,
      portfolio: draft.portfolio,
      type: draft.type,
      coordinates: draft.coordinates,
      capacity: draft.capacity,
      occupied: draft.occupied,
      status: draft.status,
      equipment: draft.equipment,
      images: draft.images,
      enterpriseId: this.resolveEnterpriseId()
    };
  }

  private toApiOrderRequest(draft: OrderDraft): Record<string, unknown> {
    return {
      customer: draft.customer,
      reservationId: draft.reservationId,
      slotId: draft.slotId,
      role: draft.role,
      city: draft.city,
      amount: draft.amount,
      tax: draft.tax,
      createdAt: draft.createdAt,
      dueDate: draft.dueDate,
      status: draft.status,
      paymentStatus: draft.paymentStatus,
      items: draft.items.map((item) => ({
        label: item.label,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      })),
      enterpriseId: this.resolveEnterpriseId()
    };
  }

  snapshotReservations(): Reservation[] {
    return this.reservationsSubject.value;
  }

  snapshotSlots(): ReservationSlot[] {
    return this.slotsSubject.value;
  }

  snapshotOrders(): Order[] {
    return this.ordersSubject.value;
  }

  resolveSlotGallery(
    slot: Pick<ReservationSlot, 'name' | 'zone' | 'city' | 'type' | 'images'>
  ): string[] {
    const images = this.normalizeSlotImages(slot.images);
    return images.length ? images : this.buildFallbackSlotGallery(slot);
  }

  uploadSlotImage(file: File): Observable<string> {
    if (this.canPersistViaApi()) {
      const formData = new FormData();
      formData.append('file', file);

      return this.http.post<unknown>(this.listingImagesUrl, formData).pipe(
        map((body) => {
          const resolved = this.extractUploadedImageUrl(body);
          if (!resolved) {
            throw new Error('The image upload response did not include a usable file URL.');
          }
          return resolved;
        }),
        catchError(() => this.readFileAsDataUrl(file))
      );
    }

    return this.readFileAsDataUrl(file);
  }

  createReservation(draft: ReservationDraft): void {
    if (this.canPersistViaApi()) {
      this.http.post(`${this.apiUrl}/reservations`, this.toApiReservationRequest(draft)).subscribe({
        next: () => this.loadWorkspaceFromApi(),
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            this.createReservationLocal(draft);
            return;
          }
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.createReservationLocal(draft);
  }

  updateReservation(id: string, draft: ReservationDraft): void {
    if (this.canPersistViaApi()) {
      this.http.put(`${this.apiUrl}/reservations/${id}`, this.toApiReservationRequest(draft)).subscribe({
        next: () => this.loadWorkspaceFromApi(),
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            this.updateReservationLocal(id, draft);
            return;
          }
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.updateReservationLocal(id, draft);
  }

  deleteReservation(id: string): void {
    if (this.canPersistViaApi()) {
      this.http.delete(`${this.apiUrl}/reservations/${id}`).subscribe({
        next: () => this.loadWorkspaceFromApi(),
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            this.deleteReservationLocal(id);
            return;
          }
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.deleteReservationLocal(id);
  }

  createSlot(draft: ReservationSlotDraft): void {
    if (this.canPersistViaApi()) {
      this.http.post(`${this.apiUrl}/slots`, this.toApiSlotRequest(draft)).subscribe({
        next: () => this.loadWorkspaceFromApi(),
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            this.createSlotLocal(draft);
            return;
          }
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.createSlotLocal(draft);
  }

  updateSlot(id: string, draft: ReservationSlotDraft): void {
    if (this.canPersistViaApi()) {
      this.http.put(`${this.apiUrl}/slots/${id}`, this.toApiSlotRequest(draft)).subscribe({
        next: () => this.loadWorkspaceFromApi(),
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            this.updateSlotLocal(id, draft);
            return;
          }
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.updateSlotLocal(id, draft);
  }

  deleteSlot(id: string): void {
    if (this.canPersistViaApi()) {
      this.http.delete(`${this.apiUrl}/slots/${id}`).subscribe({
        next: () => this.loadWorkspaceFromApi(),
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            this.deleteSlotLocal(id);
            return;
          }
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.deleteSlotLocal(id);
  }

  createOrder(draft: OrderDraft): void {
    if (this.canPersistViaApi()) {
      this.http.post(`${this.apiUrl}/orders`, this.toApiOrderRequest(draft)).subscribe({
        next: () => this.loadWorkspaceFromApi(),
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            this.createOrderLocal(draft);
            return;
          }
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.createOrderLocal(draft);
  }

  updateOrder(id: string, draft: OrderDraft): void {
    if (this.canPersistViaApi()) {
      this.http.put(`${this.apiUrl}/orders/${id}`, this.toApiOrderRequest(draft)).subscribe({
        next: () => this.loadWorkspaceFromApi(),
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            this.updateOrderLocal(id, draft);
            return;
          }
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.updateOrderLocal(id, draft);
  }

  deleteOrder(id: string): void {
    if (this.canPersistViaApi()) {
      this.http.delete(`${this.apiUrl}/orders/${id}`).subscribe({
        next: () => this.loadWorkspaceFromApi(),
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            this.deleteOrderLocal(id);
            return;
          }
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.deleteOrderLocal(id);
  }

  advanceOrderStatus(id: string): void {
    if (this.canPersistViaApi()) {
      const previous = this.ordersSubject.value;
      this.advanceOrderStatusLocal(id);
      this.http.patch(`${this.apiUrl}/orders/${id}/advance-status`, {}).subscribe({
        next: () => undefined,
        error: (error) => {
          if (this.shouldUseLocalMutationFallback(error)) {
            this.apiAvailable = false;
            return;
          }
          this.ordersSubject.next(previous);
          this.loadWorkspaceFromApi();
        }
      });
      return;
    }

    this.advanceOrderStatusLocal(id);
  }

  private createReservationLocal(draft: ReservationDraft): void {
    let next = this.decorateReservation(
      {
        id: this.nextId('RES', this.reservationsSubject.value.map((item) => item.id)),
        code: this.nextId('RSV', this.reservationsSubject.value.map((item) => item.code)),
        slotName: '',
        providerCompany: '',
        consumerCompany: '',
        color: '#0284c7',
        cancellationRisk: 0,
        recommendedTime: '',
        bookingSuggestion: '',
        confirmationNotice: null,
        ...draft
      },
      this.slotsSubject.value
    );

    if (next.status === 'confirmed' && this.hasNotificationDestination(next)) {
      const notice = this.buildConfirmationNotice(next);
      next = { ...next, confirmationNotice: notice };
      this.pushReservationNotification(next, notice);
    }

    this.reservationsSubject.next([next, ...this.reservationsSubject.value]);
    this.refreshOrders();
  }

  private updateReservationLocal(id: string, draft: ReservationDraft): void {
    const slots = this.slotsSubject.value;
    const updated = this.reservationsSubject.value.map((reservation) =>
      reservation.id === id
        ? this.decorateUpdatedReservation(reservation, draft, slots)
        : reservation
    );

    this.reservationsSubject.next(updated);
    this.refreshOrders();
  }

  private deleteReservationLocal(id: string): void {
    this.reservationsSubject.next(
      this.reservationsSubject.value.filter((reservation) => reservation.id !== id)
    );
    this.ordersSubject.next(this.ordersSubject.value.filter((order) => order.reservationId !== id));
  }

  private createSlotLocal(draft: ReservationSlotDraft): void {
    const next = this.decorateSlot({
      id: this.nextId('SLT', this.slotsSubject.value.map((item) => item.id)),
      heatmap: this.createHeatmapFromStatus(draft.status),
      forecast: this.createForecastFromStatus(draft.status),
      utilizationRate: 0,
      predictedAvailability: 0,
      underusedScore: 0,
      recoveryAction: '',
      ...draft
    });

    this.slotsSubject.next([...this.slotsSubject.value, next]);
    this.refreshReservations();
  }

  private updateSlotLocal(id: string, draft: ReservationSlotDraft): void {
    this.slotsSubject.next(
      this.slotsSubject.value.map((slot) =>
        slot.id === id
          ? this.decorateSlot({
              ...slot,
              ...draft,
              heatmap: this.createHeatmapFromStatus(draft.status, slot.heatmap),
              forecast: this.createForecastFromStatus(draft.status, slot.forecast)
            })
          : slot
      )
    );
    this.refreshReservations();
  }

  private deleteSlotLocal(id: string): void {
    this.slotsSubject.next(this.slotsSubject.value.filter((slot) => slot.id !== id));
    this.refreshReservations();
  }

  private createOrderLocal(draft: OrderDraft): void {
    const next = this.decorateOrder({
      id: this.nextId('ORD', this.ordersSubject.value.map((item) => item.id)),
      code: this.nextId('OR', this.ordersSubject.value.map((item) => item.code)),
      invoiceNumber: this.nextId('INV', this.ordersSubject.value.map((item) => item.invoiceNumber)),
      buyerCompany: '',
      sellerCompany: '',
      total: 0,
      qrValue: '',
      tracking: [],
      fraudRisk: 0,
      spendingCluster: '',
      paymentInsight: '',
      ...draft
    });

    this.ordersSubject.next([next, ...this.ordersSubject.value]);
  }

  private updateOrderLocal(id: string, draft: OrderDraft): void {
    this.ordersSubject.next(
      this.ordersSubject.value.map((order) =>
        order.id === id
          ? this.decorateOrder({
              ...order,
              ...draft
            })
          : order
      )
    );
  }

  private deleteOrderLocal(id: string): void {
    this.ordersSubject.next(this.ordersSubject.value.filter((order) => order.id !== id));
  }

  private advanceOrderStatusLocal(id: string): void {
    const flow: OrderStatus[] = ['draft', 'processing', 'invoiced', 'fulfilled'];
    this.ordersSubject.next(
      this.ordersSubject.value.map((order) => {
        if (order.id !== id || order.status === 'fulfilled') {
          return order;
        }

        const currentStatus = order.status === 'flagged' ? 'processing' : order.status;
        const currentIndex = flow.indexOf(currentStatus);
        const nextStatus = flow[Math.min(currentIndex + 1, flow.length - 1)];

        return this.decorateOrder({
          ...order,
          status: nextStatus,
          paymentStatus: nextStatus === 'fulfilled' ? 'paid' : order.paymentStatus
        });
      })
    );
  }

  private shouldUseLocalMutationFallback(error: unknown): boolean {
    const status = this.extractErrorStatus(error);
    if (status === 0) {
      return true;
    }

    if (status === 401 || status === 403 || status === 404 || status === 405) {
      return true;
    }

    return status >= 500 && status < 600;
  }

  private extractErrorStatus(error: unknown): number {
    if (typeof error === 'object' && error !== null && 'status' in error) {
      const parsed = Number((error as { status?: number }).status ?? 0);
      return Number.isFinite(parsed) ? parsed : 0;
    }

    return 0;
  }

  getBestWindowForSlot(
    slotId: string,
    slots = this.slotsSubject.value
  ): string {
    const slot = slots.find((item) => item.id === slotId);
    if (!slot) {
      return 'Check weekly availability';
    }

    return this.describeBestWindow(slot.heatmap, slot.name);
  }

  private describeBestWindow(heatmap: number[][], slotName: string): string {
    let bestValue = Number.POSITIVE_INFINITY;
    let bestDay = 0;
    let bestHour = 0;

    heatmap.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        if (value < bestValue) {
          bestValue = value;
          bestDay = rowIndex;
          bestHour = columnIndex;
        }
      });
    });

    return `${HEATMAP_DAYS[bestDay]} ${HEATMAP_HOURS[bestHour]} - ${slotName}`;
  }

  private refreshReservations(): void {
    const slots = this.slotsSubject.value;
    this.reservationsSubject.next(
      this.reservationsSubject.value.map((reservation) =>
        this.decorateReservation(reservation, slots)
      )
    );
    this.refreshOrders();
  }

  private refreshOrders(): void {
    this.ordersSubject.next(
      this.ordersSubject.value.map((order) => this.decorateOrder(order))
    );
  }

  private decorateReservation(
    reservation: Omit<
      Reservation,
      'slotName' | 'providerCompany' | 'consumerCompany' | 'cancellationRisk' | 'recommendedTime' | 'bookingSuggestion' | 'color'
    > &
      Partial<
        Pick<
          Reservation,
          'slotName' | 'providerCompany' | 'consumerCompany' | 'cancellationRisk' | 'recommendedTime' | 'bookingSuggestion' | 'color'
        >
      >,
    slots: ReservationSlot[]
  ): Reservation {
    const slot = slots.find((item) => item.id === reservation.slotId);
    const providerCompany =
      reservation.role === 'provider' ? CURRENT_ENTERPRISE_NAME : reservation.customer;
    const consumerCompany =
      reservation.role === 'consumer' ? CURRENT_ENTERPRISE_NAME : reservation.customer;
    const slotLoad = slot ? Math.round((slot.occupied / Math.max(slot.capacity, 1)) * 100) : 50;
    const durationHours = Math.max(
      1,
      Math.round(
        (new Date(reservation.end).getTime() - new Date(reservation.start).getTime()) / 36e5
      )
    );
    const leadHours = Math.max(
      0,
      Math.round((new Date(reservation.start).getTime() - Date.now()) / 36e5)
    );
    const notesPenalty = reservation.notes ? 0 : 10;
    const contactPenalty =
      reservation.contactEmail || reservation.contactPhone ? 0 : 10;
    const statusPenalty =
      reservation.status === 'pending' ? 10 : reservation.status === 'risk' ? 18 : 0;
    const capacityPenalty =
      slot && reservation.headcount / Math.max(slot.capacity, 1) > 0.8 ? 16 : 0;
    const timePenalty = leadHours < 72 ? 14 : 4;
    const durationPenalty = durationHours > 4 ? 8 : 3;
    const maintenancePenalty = slot?.status === 'maintenance' ? 12 : 0;
    const rolePenalty = reservation.role === 'consumer' ? 6 : 0;

    const cancellationRisk = Math.min(
      96,
      Math.max(
        12,
        Math.round(
          slotLoad * 0.25 +
            notesPenalty +
            contactPenalty +
            statusPenalty +
            capacityPenalty +
            timePenalty +
            durationPenalty +
            maintenancePenalty +
            rolePenalty
        )
      )
    );

    const colors: Record<string, string> = {
      confirmed: '#0284c7',
      pending: '#38bdf8',
      risk: '#f97316',
      cancelled: '#94a3b8'
    };

    const recommendedTime = this.getBestWindowForSlot(reservation.slotId, slots);
    const bookingSuggestion =
      cancellationRisk >= 65
        ? `Move this booking to ${recommendedTime} to reduce pressure on ${slot?.name ?? 'the site'}.`
        : reservation.role === 'provider'
          ? `This window is healthy. Keep the arrival coordinated and confirm the booking with ${reservation.customer}.`
          : 'This window stays comfortable. Confirm attendance and keep a light fallback window ready.';
    const readinessScore = Math.min(
      98,
      Math.max(
        34,
        Math.round(
          100 -
            cancellationRisk * 0.55 +
            (reservation.notes ? 6 : 0) +
            (reservation.contactName ? 4 : 0) +
            ((reservation.contactEmail || reservation.contactPhone) ? 6 : -6) +
            (reservation.status === 'confirmed' ? 8 : 0)
        )
      )
    );
    const serviceBrief =
      reservation.role === 'provider'
        ? `Host ${reservation.customer} at ${slot?.name ?? 'the site'} for a ${durationHours}-hour ${reservation.category.toLowerCase()} service window.`
        : `Use ${slot?.name ?? 'the selected site'} from ${providerCompany} for a ${durationHours}-hour ${reservation.category.toLowerCase()} mission.`;
    const coordinationChecklist = [
      reservation.status === 'confirmed'
        ? 'Share the confirmed service window with the operating team.'
        : 'Confirm the service window with the counterparty before the day starts.',
      reservation.category === 'Machine' || reservation.category === 'Production'
        ? 'Check technical readiness and handover conditions before arrival.'
        : reservation.category === 'Storage'
          ? 'Prepare intake labels and release flow for stored goods.'
          : 'Prepare reception flow, badges, and access guidance for the visit.',
      reservation.headcount >= 8
        ? 'Assign one arrival lead for the larger team and keep the contact person reachable.'
        : 'Keep the named contact reachable during the arrival window.',
      leadHours < 48
        ? 'Keep one fallback time window ready in case the schedule shifts.'
        : 'Send a reminder on the day before the service.'
    ].slice(0, 3);
    const messageDraft =
      `Hello ${reservation.contactName || reservation.customer}, your ${reservation.title.toLowerCase()} is planned for ${this.formatReservationWindow(reservation.start, reservation.end)} at ${slot?.name ?? reservation.city}. ` +
      `${reservation.role === 'provider' ? 'Our team will prepare the site and access flow.' : 'Our team will arrive with the agreed service needs.'} ` +
      'Please let us know if timing, headcount, or access conditions change.';
    const ecoNote =
      `Keeping this ${reservation.category.toLowerCase()} service in ${reservation.city} helps make better use of shared capacity and limits one-off movement across the network.`;

    return {
      ...reservation,
      city: reservation.city || slot?.city || 'Tunis',
      slotName: slot?.name ?? 'Unassigned site',
      providerCompany,
      consumerCompany,
      color: colors[reservation.status],
      cancellationRisk,
      recommendedTime,
      bookingSuggestion,
      readinessScore,
      serviceBrief,
      coordinationChecklist,
      messageDraft,
      ecoNote
    };
  }

  private decorateUpdatedReservation(
    reservation: Reservation,
    draft: ReservationDraft,
    slots: ReservationSlot[]
  ): Reservation {
    const becameConfirmed =
      reservation.status !== 'confirmed' && draft.status === 'confirmed';

    let updated = this.decorateReservation(
      {
        ...reservation,
        ...draft,
        confirmationNotice:
          draft.status === 'confirmed' ? reservation.confirmationNotice : null
      },
      slots
    );

    if (
      this.hasNotificationDestination(updated) &&
      (becameConfirmed || (updated.status === 'confirmed' && !updated.confirmationNotice))
    ) {
      const notice = this.buildConfirmationNotice(updated);
      updated = { ...updated, confirmationNotice: notice };
      if (becameConfirmed) {
        this.pushReservationNotification(updated, notice);
      }
    }

    if (updated.status !== 'confirmed') {
      updated = { ...updated, confirmationNotice: null };
    }

    return updated;
  }

  private buildConfirmationNotice(reservation: Reservation): ReservationConfirmationNotice {
    const hasEmail = Boolean(reservation.contactEmail?.trim());
    const hasPhone = Boolean(reservation.contactPhone?.trim());
    const requestedChannel = reservation.notificationChannel;
    const channel =
      requestedChannel === 'both' && (!hasEmail || !hasPhone)
        ? hasEmail
          ? 'email'
          : 'sms'
        : requestedChannel;

    const destination =
      channel === 'email'
        ? reservation.contactEmail
        : channel === 'sms'
          ? reservation.contactPhone
          : `${reservation.contactEmail} and ${reservation.contactPhone}`;

    return {
      channel,
      destination,
      sentAt: new Date().toISOString(),
      summary:
        channel === 'email'
          ? `Confirmation sent to ${reservation.contactEmail}.`
          : channel === 'sms'
            ? `Confirmation sent to ${reservation.contactPhone}.`
            : `Confirmation sent to ${reservation.contactEmail} and ${reservation.contactPhone}.`
    };
  }

  private hasNotificationDestination(reservation: Pick<
    Reservation,
    'contactEmail' | 'contactPhone' | 'notificationChannel'
  >): boolean {
    if (reservation.notificationChannel === 'email') {
      return Boolean(reservation.contactEmail?.trim());
    }

    if (reservation.notificationChannel === 'sms') {
      return Boolean(reservation.contactPhone?.trim());
    }

    return Boolean(reservation.contactEmail?.trim() || reservation.contactPhone?.trim());
  }

  private pushReservationNotification(
    reservation: Reservation,
    notice: ReservationConfirmationNotice
  ): void {
    const nextEvent: ReservationNotificationEvent = {
      reservationId: reservation.id,
      reservationCode: reservation.code,
      customer: reservation.customer,
      ...notice
    };

    this.reservationNotificationsSubject.next([
      nextEvent,
      ...this.reservationNotificationsSubject.value
    ].slice(0, 8));
  }

  private decorateSlot(slot: ReservationSlot): ReservationSlot {
    const utilizationRate = Math.round((slot.occupied / Math.max(slot.capacity, 1)) * 100);
    const forecastAverage =
      slot.forecast.reduce((sum, value) => sum + value, 0) / Math.max(slot.forecast.length, 1);
    const predictedAvailability = Math.max(6, 100 - Math.round(forecastAverage));
    const underusedScore = Math.max(
      5,
      100 - utilizationRate - Math.round(forecastAverage * 0.15)
    );

    let recoveryAction = `Keep the current pace and watch ${HEATMAP_DAYS[2]} around midday.`;
    if (slot.portfolio === 'owned' && utilizationRate < 50) {
      recoveryAction = `Highlight ${slot.name} in this week's suggestions before ${HEATMAP_DAYS[4]}.`;
    } else if (slot.portfolio === 'owned' && utilizationRate > 80) {
      recoveryAction = `Protect ${slot.name} with a support crew and a spillover window.`;
    } else if (slot.portfolio === 'partner') {
      recoveryAction = `Keep ${slot.name} as a reliable fallback for outgoing requests.`;
    }
    const quietWindow = this.describeBestWindow(slot.heatmap, slot.name);
    const bestUseMode =
      slot.type === 'Dock'
        ? 'Best for short loading windows, export dispatch, and overflow truck flow.'
        : slot.type === 'Storage'
          ? 'Best for buffer stock, transit pallets, and quick release inventory.'
          : slot.type === 'Meeting'
            ? 'Best for partner reviews, commercial alignment, and light coordination sessions.'
            : 'Best for overflow production runs, pilot batches, and urgent finishing work.';
    const spotlightMessage =
      underusedScore >= 60
        ? `Promote ${slot.name} as a fast fallback for ${slot.city} requests this week.`
        : utilizationRate >= 82
          ? `Position ${slot.name} as a premium urgent window only and protect it from low-value traffic.`
          : slot.portfolio === 'partner'
            ? `Keep ${slot.name} visible as a trusted outside option when your own network tightens.`
            : `Keep ${slot.name} in the regular offer with balanced visibility and updated equipment details.`;
    const activationChecklist = [
      utilizationRate < 50
        ? 'Publish a short availability highlight for the week.'
        : 'Reserve the strongest-fit hours for the highest-value requests.',
      slot.status === 'maintenance'
        ? 'Block low-priority demand until maintenance is cleared.'
        : `Check staffing around ${quietWindow}.`,
      slot.portfolio === 'partner'
        ? 'Refresh partner contact details and access instructions.'
        : 'Refresh site photos, equipment notes, and gate guidance.'
    ];
    const ecoFitNote =
      `Filling this site closer to ${slot.city} demand can reduce empty transfers and make better use of existing shared capacity.`;

    return {
      ...slot,
      utilizationRate,
      predictedAvailability,
      underusedScore,
      recoveryAction,
      quietWindow,
      bestUseMode,
      spotlightMessage,
      activationChecklist,
      ecoFitNote
    };
  }

  private decorateOrder(
    order: Order,
    reservations = this.reservationsSubject.value
  ): Order {
    const linkedReservation = reservations.find(
      (reservation) => reservation.id === order.reservationId
    );
    const buyerCompany =
      order.role === 'consumer' ? CURRENT_ENTERPRISE_NAME : order.customer;
    const sellerCompany =
      order.role === 'provider' ? CURRENT_ENTERPRISE_NAME : order.customer;
    const total = this.computeOrderTotal(order.items, order.tax, order.amount);
    const baseRisk = total > 5500 ? 34 : total > 4000 ? 22 : 12;
    const reviewRisk =
      order.paymentStatus === 'review' ? 24 : order.paymentStatus === 'pending' ? 10 : 0;
    const draftRisk =
      order.status === 'draft' ? 12 : order.status === 'flagged' ? 30 : 4;
    const reservationRisk = linkedReservation
      ? Math.round(linkedReservation.cancellationRisk * 0.35)
      : 8;
    const fraudRisk = Math.min(97, baseRisk + reviewRisk + draftRisk + reservationRisk);
    const spendingCluster =
      total > 5200
        ? order.role === 'provider'
          ? 'Large account to collect'
          : 'Large purchase to manage'
        : total > 3600
          ? order.role === 'provider'
            ? 'Strong commercial flow'
            : 'Priority supplier mission'
          : total > 2400
            ? 'Standard operating rhythm'
            : 'Light recurring need';

    const paymentInsight =
      fraudRisk >= 70
        ? 'Keep manual validation before final release and confirm amounts with the counterparty.'
        : fraudRisk >= 45
          ? 'Watch the payment delay and keep a checkpoint before the next step.'
          : 'Regular profile. The file can move forward with a light review.';
    const settlementPriority =
      order.role === 'provider'
        ? fraudRisk >= 65 || order.paymentStatus === 'review'
          ? 'High priority'
          : order.paymentStatus === 'pending'
            ? 'Balanced follow-up'
            : 'Routine'
        : fraudRisk >= 65 || order.paymentStatus === 'review'
          ? 'High priority'
          : order.paymentStatus === 'pending'
            ? 'Balanced follow-up'
            : 'Routine';
    const nextBestAction =
      order.paymentStatus === 'review'
        ? 'Call the finance contact and confirm the supporting documents before moving the file.'
        : order.status === 'draft'
          ? 'Finalize the line items and release the invoice for validation.'
          : order.paymentStatus === 'pending' && order.role === 'provider'
            ? `Send a payment reminder for ${order.invoiceNumber} and attach the invoice copy.`
            : order.paymentStatus === 'pending'
              ? 'Prepare the payment release pack and confirm the due date with finance.'
              : 'Archive the closed file and keep it as a reference for repeat work.';
    const followUpDraft =
      order.role === 'provider'
        ? `Hello ${order.customer}, this is a follow-up on invoice ${order.invoiceNumber} for ${total.toFixed(2)} TND due on ${order.dueDate}. Please let us know if you need any supporting document to complete payment.`
        : `Hello ${order.customer}, we are preparing payment for invoice ${order.invoiceNumber} due on ${order.dueDate}. Please confirm that the final document set is complete so the release can move forward.`;
    const financeChecklist = [
      'Match the order total with the linked booking and service scope.',
      order.tax > 0
        ? 'Check the tax line and confirm the final total before release.'
        : 'Confirm that the file does not require an additional tax adjustment.',
      'Attach the QR code reference to the finance file.',
      order.paymentStatus === 'review'
        ? 'Keep written approval before moving the file.'
        : 'Check the due date and reminder plan.'
    ].slice(0, 3);
    const relationshipTone =
      fraudRisk >= 65
        ? 'Keep the tone careful, precise, and document-led.'
        : order.role === 'provider'
          ? 'Keep the tone warm and commercially steady.'
          : 'Keep the tone cooperative and timeline-focused.';

    return {
      ...order,
      city: order.city || linkedReservation?.city || 'Tunis',
      buyerCompany,
      sellerCompany,
      amount: this.computeItemsSubtotal(order.items) || order.amount,
      total,
      fraudRisk,
      qrValue: `eco://orders/${order.id}/invoice/${order.invoiceNumber}`,
      tracking: this.buildTracking(order.status, order.createdAt),
      spendingCluster,
      paymentInsight,
      settlementPriority,
      nextBestAction,
      followUpDraft,
      financeChecklist,
      relationshipTone
    };
  }

  private buildTracking(status: OrderStatus, createdAt: string): TrackingStep[] {
    const steps = [
      'Order created',
      'Internal review',
      'Invoice ready',
      'File closed'
    ];
    const completionMap: Record<OrderStatus, number> = {
      draft: 1,
      processing: 2,
      invoiced: 3,
      fulfilled: 4,
      flagged: 2
    };

    const completed = completionMap[status];

    return steps.map((label, index) => ({
      label,
      timestamp:
        index < completed
          ? `${createdAt} ${['08:30', '10:15', '13:40', '17:10'][index]}`
          : 'Waiting',
      done: index < completed
    }));
  }

  private buildConflicts(
    reservations: Reservation[],
    slots: ReservationSlot[]
  ): ReservationConflict[] {
    const conflicts: ReservationConflict[] = [];

    for (let index = 0; index < reservations.length; index += 1) {
      for (let compareIndex = index + 1; compareIndex < reservations.length; compareIndex += 1) {
        const left = reservations[index];
        const right = reservations[compareIndex];
        const overlaps =
          left.slotId === right.slotId &&
          left.status !== 'cancelled' &&
          right.status !== 'cancelled' &&
          new Date(left.start).getTime() < new Date(right.end).getTime() &&
          new Date(right.start).getTime() < new Date(left.end).getTime();

        if (!overlaps) {
          continue;
        }

        const slot = slots.find((item) => item.id === left.slotId);
        const overlapSeverity =
          Math.abs(new Date(left.start).getTime() - new Date(right.start).getTime()) < 72e5
            ? 'high'
            : 'medium';

        conflicts.push({
          reservationIds: [left.id, right.id],
          slotId: left.slotId,
          slotName: slot?.name ?? 'Shared site',
          overlapLabel: `${left.code} overlaps ${right.code}`,
          severity: overlapSeverity
        });
      }
    }

    return conflicts;
  }

  private buildSummary(
    reservations: Reservation[],
    slots: ReservationSlot[],
    orders: Order[],
    conflicts: ReservationConflict[]
  ): WorkspaceSummary {
    const hostedReservations = reservations.filter(
      (reservation) => reservation.role === 'provider' && reservation.status !== 'cancelled'
    ).length;
    const requestedReservations = reservations.filter(
      (reservation) => reservation.role === 'consumer' && reservation.status !== 'cancelled'
    ).length;
    const receivableTotal = orders
      .filter(
        (order) =>
          order.sellerCompany === CURRENT_ENTERPRISE_NAME && order.paymentStatus !== 'paid'
      )
      .reduce((sum, order) => sum + order.total, 0);
    const payableTotal = orders
      .filter(
        (order) =>
          order.buyerCompany === CURRENT_ENTERPRISE_NAME && order.paymentStatus !== 'paid'
      )
      .reduce((sum, order) => sum + order.total, 0);
    const occupancySignal = Math.round(
      slots.reduce((sum, slot) => sum + slot.utilizationRate, 0) / Math.max(slots.length, 1)
    );
    const flaggedOrders = orders.filter(
      (order) => order.fraudRisk >= 65 || order.paymentStatus === 'review'
    ).length;
    const bestWindow = slots
      .slice()
      .sort((left, right) => {
        if (left.portfolio !== right.portfolio) {
          return left.portfolio === 'owned' ? -1 : 1;
        }
        return right.underusedScore - left.underusedScore;
      })[0];

    return {
      hostedReservations,
      requestedReservations,
      receivableTotal,
      payableTotal,
      conflictCount: conflicts.length,
      occupancySignal,
      flaggedOrders,
      bestWindow: bestWindow ? this.getBestWindowForSlot(bestWindow.id) : 'No suggestion available'
    };
  }

  private buildActivityFeed(
    reservations: Reservation[],
    slots: ReservationSlot[],
    orders: Order[],
    conflicts: ReservationConflict[],
    notifications: ReservationNotificationEvent[]
  ): ActivityCenterItem[] {
    const items: ActivityCenterItem[] = [];

    notifications.slice(0, 3).forEach((notification) => {
      items.push({
        id: `notice-${notification.reservationId}`,
        audience: 'both',
        entity: 'reservation',
        tone: 'success',
        badge: 'Confirmation',
        title: `${notification.reservationCode} is confirmed`,
        description: notification.summary,
        occurredAt: notification.sentAt,
        route: '/enterprise/reservation-workspace',
        actionLabel: 'Open bookings'
      });
    });

    const pendingReservation = reservations
      .filter((reservation) => reservation.status === 'pending')
      .sort((left, right) => left.start.localeCompare(right.start))[0];
    if (pendingReservation) {
      items.push({
        id: `pending-${pendingReservation.id}`,
        audience: 'both',
        entity: 'reservation',
        tone: 'info',
        badge: pendingReservation.role === 'provider' ? 'Host side' : 'Request side',
        title: `${pendingReservation.code} is waiting for approval`,
        description:
          pendingReservation.serviceBrief ||
          `Review the service window for ${pendingReservation.customer} and decide whether to confirm it now.`,
        occurredAt: this.normalizeOccurredAt(pendingReservation.start),
        route: '/enterprise/reservation-workspace',
        actionLabel: 'Review booking'
      });
    }

    const highRiskReservation = reservations
      .filter((reservation) => reservation.cancellationRisk >= 60)
      .sort((left, right) => right.cancellationRisk - left.cancellationRisk)[0];
    if (highRiskReservation) {
      items.push({
        id: `risk-${highRiskReservation.id}`,
        audience: 'both',
        entity: 'reservation',
        tone: highRiskReservation.cancellationRisk >= 75 ? 'danger' : 'warning',
        badge: `${highRiskReservation.cancellationRisk}% watch`,
        title: `${highRiskReservation.code} needs coordination`,
        description:
          highRiskReservation.coordinationChecklist?.[0] ||
          highRiskReservation.bookingSuggestion,
        occurredAt: this.normalizeOccurredAt(highRiskReservation.start),
        route: '/enterprise/reservation-workspace',
        actionLabel: 'Open booking'
      });
    }

    conflicts.slice(0, 2).forEach((conflict, index) => {
      const relatedReservation = reservations.find(
        (reservation) => reservation.id === conflict.reservationIds[0]
      );
      items.push({
        id: `conflict-${index}-${conflict.slotId}`,
        audience: 'both',
        entity: 'system',
        tone: conflict.severity === 'high' ? 'danger' : 'warning',
        badge: 'Timing alert',
        title: conflict.overlapLabel,
        description: `${conflict.slotName} needs a timing shift or a fallback route before the service day starts.`,
        occurredAt: this.normalizeOccurredAt(relatedReservation?.start),
        route: '/enterprise/reservation-workspace',
        actionLabel: 'Check planning'
      });
    });

    const underusedSlot = slots
      .filter((slot) => slot.underusedScore >= 55)
      .sort((left, right) => right.underusedScore - left.underusedScore)[0];
    if (underusedSlot) {
      items.push({
        id: `slot-opportunity-${underusedSlot.id}`,
        audience: 'both',
        entity: 'slot',
        tone: 'success',
        badge: 'Opportunity',
        title: `${underusedSlot.name} can take more activity`,
        description:
          underusedSlot.spotlightMessage ||
          `${underusedSlot.name} is ready to absorb more requests this week.`,
        occurredAt: this.nowAtHour(9),
        route: '/enterprise/reservation-workspace/slots',
        actionLabel: 'Open spaces'
      });
    }

    const busySlot = slots
      .filter((slot) => slot.utilizationRate >= 75)
      .sort((left, right) => right.utilizationRate - left.utilizationRate)[0];
    if (busySlot) {
      items.push({
        id: `slot-protect-${busySlot.id}`,
        audience: 'both',
        entity: 'slot',
        tone: busySlot.utilizationRate >= 86 ? 'danger' : 'warning',
        badge: `${busySlot.utilizationRate}% occupied`,
        title: `${busySlot.name} should be protected`,
        description:
          busySlot.activationChecklist?.[0] ||
          `Keep the strongest-fit hours on ${busySlot.name} for the most valuable requests.`,
        occurredAt: this.nowAtHour(8),
        route: '/enterprise/reservation-workspace/slots',
        actionLabel: 'Review space'
      });
    }

    const flaggedOrder = orders
      .filter((order) => order.fraudRisk >= 65 || order.paymentStatus === 'review')
      .sort((left, right) => right.fraudRisk - left.fraudRisk)[0];
    if (flaggedOrder) {
      items.push({
        id: `order-review-${flaggedOrder.id}`,
        audience: 'both',
        entity: 'order',
        tone: flaggedOrder.fraudRisk >= 75 ? 'danger' : 'warning',
        badge: `${flaggedOrder.fraudRisk}% review`,
        title: `${flaggedOrder.invoiceNumber} needs a finance check`,
        description:
          flaggedOrder.nextBestAction ||
          'Confirm the supporting documents before the file moves to the next step.',
        occurredAt: this.normalizeOccurredAt(flaggedOrder.createdAt),
        route: '/enterprise/reservation-workspace/orders',
        actionLabel: 'Open orders'
      });
    }

    const receivableOrder = orders
      .filter((order) => order.role === 'provider' && order.paymentStatus === 'pending')
      .sort((left, right) => right.total - left.total)[0];
    if (receivableOrder) {
      items.push({
        id: `order-collect-${receivableOrder.id}`,
        audience: 'both',
        entity: 'order',
        tone: 'info',
        badge: 'Collection',
        title: `${receivableOrder.invoiceNumber} is ready for follow-up`,
        description:
          receivableOrder.followUpDraft ||
          `Follow up with ${receivableOrder.customer} on the pending receivable.`,
        occurredAt: this.normalizeOccurredAt(receivableOrder.dueDate),
        route: '/enterprise/reservation-workspace/orders',
        actionLabel: 'Collect payment'
      });
    }

    const payableOrder = orders
      .filter((order) => order.role === 'consumer' && order.paymentStatus === 'pending')
      .sort((left, right) => right.total - left.total)[0];
    if (payableOrder) {
      items.push({
        id: `order-pay-${payableOrder.id}`,
        audience: 'admin',
        entity: 'order',
        tone: 'info',
        badge: 'Payable',
        title: `${payableOrder.invoiceNumber} is nearing release`,
        description:
          payableOrder.financeChecklist?.[0] ||
          'Prepare the payment release pack and confirm the finance timeline.',
        occurredAt: this.normalizeOccurredAt(payableOrder.dueDate),
        route: '/enterprise/reservation-workspace/orders',
        actionLabel: 'Open orders'
      });
    }

    if (!items.length) {
      items.push({
        id: 'system-steady',
        audience: 'both',
        entity: 'system',
        tone: 'success',
        badge: 'Stable',
        title: 'The operational flow is calm',
        description: 'No urgent booking, space, or order issue is currently asking for intervention.',
        occurredAt: this.nowAtHour(10)
      });
    }

    return items.slice(0, 9);
  }

  private buildReservationInsights(
    reservations: Reservation[],
    slots: ReservationSlot[],
    conflicts: ReservationConflict[]
  ): InsightCard[] {
    const highRisk = reservations
      .filter((reservation) => reservation.cancellationRisk >= 60)
      .sort((left, right) => right.cancellationRisk - left.cancellationRisk)[0];
    const incoming = reservations.filter((reservation) => reservation.role === 'provider').length;
    const outgoing = reservations.filter((reservation) => reservation.role === 'consumer').length;
    const reliefSlot = slots
      .filter((slot) => slot.underusedScore >= 55)
      .sort((left, right) => right.underusedScore - left.underusedScore)[0];

    return [
      {
        title: highRisk
          ? `${highRisk.code} needs a quick callback`
          : 'The schedule stays under control',
        description: highRisk
          ? `${highRisk.customer} shows the highest watch level. ${highRisk.bookingSuggestion}`
          : 'No reservation crosses the main watch threshold.',
        badge: highRisk ? `${highRisk.cancellationRisk}% watch` : 'Stable',
        tone: highRisk ? 'danger' : 'success'
      },
      {
        title: `Your activity is split between ${incoming} hosted booking${incoming > 1 ? 's' : ''} and ${outgoing} requested booking${outgoing > 1 ? 's' : ''}`,
        description:
          incoming >= outgoing
            ? 'The host role leads this week. Keep the focus on welcome quality and billing.'
            : 'The buyer role is rising. Secure outside slots before the end of the week.',
        badge: incoming >= outgoing ? 'Host side' : 'Request side',
        tone: incoming >= outgoing ? 'info' : 'warning'
      },
      {
        title: reliefSlot
          ? `${reliefSlot.name} remains your best relief site`
          : 'Every site is already well balanced',
        description: reliefSlot
          ? `${reliefSlot.recoveryAction} Expected availability stays at ${reliefSlot.predictedAvailability}%.`
          : 'No site clearly stands out as a relief zone.',
        badge: reliefSlot ? reliefSlot.city : 'Balanced',
        tone: reliefSlot ? 'success' : 'info'
      },
      {
        title: conflicts.length
          ? `${conflicts.length} overlap${conflicts.length > 1 ? 's' : ''} to handle`
          : 'No overlaps to report',
        description: conflicts.length
          ? `Most urgent: ${conflicts[0].overlapLabel} on ${conflicts[0].slotName}.`
          : 'The calendar matches the published slots.',
        badge: conflicts.length ? 'Planning' : 'Net',
        tone: conflicts.length ? 'warning' : 'info'
      }
    ];
  }

  private buildSlotInsights(slots: ReservationSlot[]): InsightCard[] {
    const underused = slots
      .slice()
      .sort((left, right) => right.underusedScore - left.underusedScore)[0];
    const peak = slots.slice().sort((left, right) => right.utilizationRate - left.utilizationRate)[0];

    return [
      {
        title: underused ? `${underused.name} can absorb more volume` : 'Load is well distributed',
        description: underused
          ? `${underused.recoveryAction} Estimated free window remains ${underused.predictedAvailability}%.`
          : 'No site needs special action today.',
        badge: underused ? underused.portfolio === 'owned' ? 'Owned' : 'Partner' : 'Stable',
        tone: underused ? 'success' : 'info'
      },
      {
        title: peak ? `${peak.name} is nearing its limit` : 'No strong tension',
        description: peak
          ? `${peak.utilizationRate}% occupied now with ${peak.predictedAvailability}% estimated availability.`
          : 'All sites remain under the alert threshold.',
        badge: peak ? `${peak.utilizationRate}%` : 'Calm',
        tone: peak && peak.utilizationRate > 75 ? 'warning' : 'info'
      }
    ];
  }

  private buildOrderInsights(orders: Order[]): InsightCard[] {
    const flagged = orders
      .filter((order) => order.fraudRisk >= 65 || order.paymentStatus === 'review')
      .sort((left, right) => right.fraudRisk - left.fraudRisk)[0];
    const toCollect = orders
      .filter(
        (order) =>
          order.sellerCompany === CURRENT_ENTERPRISE_NAME && order.paymentStatus !== 'paid'
      )
      .reduce((sum, order) => sum + order.total, 0);
    const toPay = orders
      .filter(
        (order) =>
          order.buyerCompany === CURRENT_ENTERPRISE_NAME && order.paymentStatus !== 'paid'
      )
      .reduce((sum, order) => sum + order.total, 0);

    return [
      {
        title: flagged ? `${flagged.invoiceNumber} needs review` : 'Orders are moving at a healthy pace',
        description: flagged
          ? `${flagged.customer} remains the most sensitive case. ${flagged.paymentInsight}`
          : 'No order crosses the reinforced manual review threshold.',
        badge: flagged ? `${flagged.fraudRisk}% watch` : 'Smooth',
        tone: flagged ? 'danger' : 'success'
      },
      {
        title: 'The balance between collections and payments stays clear',
        description: `${toCollect.toLocaleString()} TND still need to be collected while ${toPay.toLocaleString()} TND still need to be paid on the buying side.`,
        badge: toCollect >= toPay ? 'Collections ahead' : 'Purchases ahead',
        tone: toCollect >= toPay ? 'success' : 'warning'
      }
    ];
  }

  private computeItemsSubtotal(items: OrderLineItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }

  private computeOrderTotal(items: OrderLineItem[], tax: number, fallbackAmount: number): number {
    const subtotal = this.computeItemsSubtotal(items) || fallbackAmount;
    return +(subtotal + tax).toFixed(2);
  }

  private formatReservationWindow(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startLabel = startDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const endLabel = endDate.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${startLabel} to ${endLabel}`;
  }

  private normalizeOccurredAt(value?: string): string {
    if (!value) {
      return this.nowAtHour(9);
    }

    if (value.includes('T')) {
      return value;
    }

    return `${value}T09:00:00`;
  }

  private nowAtHour(hour: number): string {
    const now = new Date();
    now.setHours(hour, 0, 0, 0);
    return now.toISOString();
  }

  private nextId(prefix: string, ids: string[]): string {
    const next = ids.reduce((max, value) => {
      const match = value.match(/(\d+)$/);
      return match ? Math.max(max, Number(match[1])) : max;
    }, 0);

    return `${prefix}-${next + 1}`;
  }

  private extractUploadedImageUrl(body: unknown): string | null {
    if (typeof body === 'string') {
      const trimmed = body.trim();
      return trimmed ? this.normalizeSlotImageUrl(trimmed) : null;
    }

    if (!body || typeof body !== 'object') {
      return null;
    }

    const payload = body as Record<string, unknown>;
    for (const key of ['url', 'path', 'fileUrl', 'filePath', 'location', 'href'] as const) {
      const value = payload[key];
      if (typeof value === 'string' && value.trim()) {
        return this.normalizeSlotImageUrl(value);
      }
    }

    const nested = payload['data'];
    if (nested && typeof nested === 'object') {
      return this.extractUploadedImageUrl(nested);
    }

    return null;
  }

  private readFileAsDataUrl(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string' && reader.result.trim()) {
          observer.next(reader.result);
          observer.complete();
          return;
        }

        observer.error(new Error('Unable to read the selected file.'));
      };
      reader.onerror = () =>
        observer.error(reader.error ?? new Error('Unable to read the selected file.'));
      reader.readAsDataURL(file);
    });
  }

  private normalizeSlotImages(images: unknown): string[] {
    if (!Array.isArray(images)) {
      return [];
    }

    return images
      .map((image) => (typeof image === 'string' ? this.normalizeSlotImageUrl(image) : ''))
      .filter(Boolean)
      .slice(0, SLOT_IMAGE_LIMIT);
  }

  private normalizeSlotImageUrl(url: string): string {
    const trimmed = url.trim();
    if (!trimmed) {
      return '';
    }

    if (/^(data:|blob:|https?:\/\/)/i.test(trimmed)) {
      return trimmed;
    }

    if (trimmed.startsWith('/files/')) {
      return `${this.backendOrigin()}${trimmed}`;
    }

    if (trimmed.startsWith('files/')) {
      return `${this.backendOrigin()}/${trimmed}`;
    }

    return trimmed;
  }

  private backendOrigin(): string {
    return environment.apiUrl.replace(/\/api\/?$/, '');
  }

  private buildFallbackSlotGallery(
    slot: Pick<ReservationSlot, 'name' | 'zone' | 'city' | 'type'>
  ): string[] {
    const libraries: Record<ReservationSlot['type'], string[]> = {
      Dock: [
        'https://images.unsplash.com/photo-1713859272775-2e1cf7d777a1?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600',
        'https://images.unsplash.com/photo-1758789667762-56175fe4601c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600',
        'https://images.unsplash.com/photo-1764046155497-ad7e50737ffa?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600'
      ],
      Storage: [
        'https://images.unsplash.com/photo-1756705406506-50500a12463c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600',
        'https://images.unsplash.com/photo-1772300704502-410f0fbd43bb?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600',
        'https://images.unsplash.com/photo-1767294274634-613a3545e36d?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600'
      ],
      Meeting: [
        'https://images.unsplash.com/photo-1744095407215-66e40734e23a?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600',
        'https://images.unsplash.com/photo-1740933084056-078fac872bff?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600',
        'https://images.unsplash.com/photo-1772112334844-2eed0111e690?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600'
      ],
      Production: [
        'https://images.unsplash.com/photo-1764835994645-3faa2c40f708?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600',
        'https://images.unsplash.com/photo-1776090188275-72957bae4ed7?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600',
        'https://images.unsplash.com/photo-1748002645678-7f9c04263315?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600'
      ]
    };

    return libraries[slot.type];
  }

  private buildFallbackSlotImage(
    slot: Pick<ReservationSlot, 'name' | 'zone' | 'city' | 'type'>,
    label: string,
    cue: string,
    variantIndex: number
  ): string {
    const palettes: Record<ReservationSlot['type'], [string, string, string]> = {
      Dock: ['#0f766e', '#14b8a6', '#99f6e4'],
      Storage: ['#1d4ed8', '#60a5fa', '#dbeafe'],
      Meeting: ['#7c3aed', '#c084fc', '#ede9fe'],
      Production: ['#b45309', '#f59e0b', '#fef3c7']
    };
    const [deep, accent, soft] = palettes[slot.type];
    const badgeX = variantIndex === 1 ? 720 : 788;
    const overlay = variantIndex === 2 ? '#0b1324' : '#111827';
    const horizon = variantIndex === 0 ? 250 : variantIndex === 1 ? 220 : 275;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760" fill="none">
        <defs>
          <linearGradient id="bg-${variantIndex}" x1="90" y1="70" x2="1100" y2="720" gradientUnits="userSpaceOnUse">
            <stop stop-color="${deep}"/>
            <stop offset="1" stop-color="${accent}"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="760" rx="42" fill="url(#bg-${variantIndex})"/>
        <circle cx="1020" cy="110" r="170" fill="${soft}" fill-opacity="0.22"/>
        <circle cx="180" cy="640" r="210" fill="${soft}" fill-opacity="0.18"/>
        <path d="M0 ${horizon}C146 ${horizon - 42} 264 ${horizon + 18} 406 ${horizon - 10}C552 ${horizon - 38} 676 ${horizon + 36} 826 ${horizon + 16}C980 ${horizon - 6} 1074 ${horizon + 48} 1200 ${horizon + 24}V760H0V${horizon}Z" fill="rgba(255,255,255,0.08)"/>
        <rect x="88" y="116" width="454" height="454" rx="30" fill="rgba(12,18,34,0.22)"/>
        <rect x="132" y="176" width="168" height="296" rx="22" fill="${overlay}" fill-opacity="0.56"/>
        <rect x="324" y="232" width="176" height="240" rx="22" fill="rgba(12,18,34,0.38)"/>
        <rect x="156" y="212" width="120" height="30" rx="12" fill="${soft}" fill-opacity="0.65"/>
        <rect x="156" y="262" width="34" height="138" rx="10" fill="rgba(255,255,255,0.74)"/>
        <rect x="206" y="262" width="34" height="138" rx="10" fill="rgba(255,255,255,0.58)"/>
        <rect x="256" y="262" width="20" height="138" rx="10" fill="rgba(255,255,255,0.36)"/>
        <rect x="352" y="268" width="118" height="24" rx="10" fill="${soft}" fill-opacity="0.5"/>
        <rect x="352" y="316" width="118" height="88" rx="18" fill="rgba(255,255,255,0.14)"/>
        <rect x="352" y="420" width="118" height="24" rx="10" fill="rgba(255,255,255,0.24)"/>
        <path d="M112 584H532" stroke="rgba(255,255,255,0.18)" stroke-width="18" stroke-linecap="round"/>
        <path d="M112 618H532" stroke="rgba(255,255,255,0.12)" stroke-width="10" stroke-linecap="round"/>
        <rect x="620" y="122" width="494" height="516" rx="34" fill="rgba(255,255,255,0.14)"/>
        <rect x="658" y="166" width="418" height="282" rx="28" fill="rgba(255,255,255,0.92)"/>
        <rect x="690" y="198" width="154" height="18" rx="9" fill="${soft}"/>
        <rect x="690" y="236" width="224" height="12" rx="6" fill="#D6E3EA"/>
        <rect x="690" y="272" width="352" height="118" rx="22" fill="${deep}" fill-opacity="0.16"/>
        <rect x="714" y="300" width="86" height="62" rx="18" fill="${deep}" fill-opacity="0.3"/>
        <rect x="822" y="300" width="196" height="18" rx="9" fill="rgba(17,24,39,0.15)"/>
        <rect x="822" y="334" width="154" height="14" rx="7" fill="rgba(17,24,39,0.12)"/>
        <rect x="822" y="360" width="132" height="14" rx="7" fill="rgba(17,24,39,0.1)"/>
        <rect x="658" y="474" width="418" height="128" rx="28" fill="rgba(255,255,255,0.76)"/>
        <rect x="${badgeX}" y="500" width="258" height="34" rx="17" fill="${deep}" fill-opacity="0.12"/>
        <text x="${badgeX + 18}" y="522" fill="${deep}" font-size="18" font-family="Arial, Helvetica, sans-serif" font-weight="700">${this.escapeSvgText(label)}</text>
        <text x="690" y="525" fill="#0F172A" font-size="34" font-family="Arial, Helvetica, sans-serif" font-weight="700">${this.escapeSvgText(slot.name)}</text>
        <text x="690" y="560" fill="#475569" font-size="20" font-family="Arial, Helvetica, sans-serif">${this.escapeSvgText(cue)}</text>
        <text x="690" y="592" fill="#64748B" font-size="18" font-family="Arial, Helvetica, sans-serif">${this.escapeSvgText(slot.city)} | ${this.escapeSvgText(slot.type)}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  private escapeSvgText(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  private createHeatmapFromStatus(status: ReservationSlot['status'], seed?: number[][]): number[][] {
    if (seed) {
      return seed;
    }

    const base =
      status === 'peak' ? 72 : status === 'maintenance' ? 78 : status === 'balanced' ? 48 : 22;

    return HEATMAP_DAYS.map((_, dayIndex) =>
      HEATMAP_HOURS.map((__, hourIndex) => {
        const modifier = dayIndex * 3 + hourIndex * 4;
        return Math.min(96, Math.max(12, base + modifier - (dayIndex > 4 ? 18 : 0)));
      })
    );
  }

  private createForecastFromStatus(status: ReservationSlot['status'], seed?: number[]): number[] {
    if (seed) {
      return seed;
    }

    const base =
      status === 'peak' ? 82 : status === 'maintenance' ? 88 : status === 'balanced' ? 58 : 38;
    return Array.from({ length: 7 }, (_, index) =>
      Math.min(96, base + (index % 3) * 4 - (index > 4 ? 6 : 0))
    );
  }
}
