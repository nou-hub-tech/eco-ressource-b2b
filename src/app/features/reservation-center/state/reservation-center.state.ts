import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, tap } from 'rxjs';
import {
  BackendReservation,
  ReservationApiService,
  ReservationCreateRequest,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import {
  BackendReservationSlot,
  ReservationSlotApiService,
  SlotRequest,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';
import {
  BackendEcoOrder,
  EcoOrderApiService,
  EcoOrderRequest,
} from '../../../pages/moduleReservation/shared/api/eco-order-api.service';
import { ReservationCenterSnapshot } from '../models/reservation-center.models';

@Injectable({ providedIn: 'root' })
export class ReservationCenterState {
  private readonly reservationsSubject = new BehaviorSubject<BackendReservation[]>([]);
  private readonly slotsSubject = new BehaviorSubject<BackendReservationSlot[]>([]);
  private readonly ordersSubject = new BehaviorSubject<BackendEcoOrder[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string>('');

  readonly reservations$ = this.reservationsSubject.asObservable();
  readonly slots$ = this.slotsSubject.asObservable();
  readonly orders$ = this.ordersSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  constructor(
    private readonly reservationApi: ReservationApiService,
    private readonly slotApi: ReservationSlotApiService,
    private readonly orderApi: EcoOrderApiService,
  ) {}

  get reservations(): BackendReservation[] {
    return this.reservationsSubject.value;
  }

  get slots(): BackendReservationSlot[] {
    return this.slotsSubject.value;
  }

  get orders(): BackendEcoOrder[] {
    return this.ordersSubject.value;
  }

  loadAll(): Observable<ReservationCenterSnapshot> {
    this.loadingSubject.next(true);
    this.errorSubject.next('');

    return forkJoin({
      reservations: this.reservationApi.list(false),
      slots: this.slotApi.list(false),
      orders: this.orderApi.list(false),
    }).pipe(
      tap({
        next: snapshot => {
          this.reservationsSubject.next(snapshot.reservations.filter(item => !item.deleted));
          this.slotsSubject.next(snapshot.slots.filter(item => !item.deleted));
          this.ordersSubject.next(snapshot.orders.filter(item => !item.deleted));
          this.loadingSubject.next(false);
        },
        error: error => {
          this.errorSubject.next(error?.error?.message ?? 'Failed to load reservation workspace data.');
          this.loadingSubject.next(false);
        },
      }),
    );
  }

  createReservation(request: ReservationCreateRequest): Observable<BackendReservation> {
    return this.reservationApi.create(request);
  }

  createReservationWithSlot(slotId: number, request: Omit<ReservationCreateRequest, 'slotId'>): Observable<BackendReservation> {
    return this.reservationApi.createWithSlot(slotId, request);
  }

  updateReservation(id: number, request: ReservationCreateRequest): Observable<BackendReservation> {
    return this.reservationApi.update(id, request);
  }

  cancelReservation(id: number, reason: string): Observable<BackendReservation> {
    return this.reservationApi.cancel(id, reason);
  }

  deleteReservation(id: number): Observable<void> {
    return this.reservationApi.delete(id);
  }

  createSlot(request: SlotRequest): Observable<BackendReservationSlot> {
    return this.slotApi.create(request);
  }

  updateSlot(id: number, request: SlotRequest): Observable<BackendReservationSlot> {
    return this.slotApi.update(id, request);
  }

  deleteSlot(id: number): Observable<void> {
    return this.slotApi.delete(id);
  }

  createOrder(request: EcoOrderRequest): Observable<BackendEcoOrder> {
    return this.orderApi.create(request);
  }

  updateOrder(id: number, request: EcoOrderRequest): Observable<BackendEcoOrder> {
    return this.orderApi.update(id, request);
  }

  cancelOrder(id: number, reason: string): Observable<BackendEcoOrder> {
    return this.orderApi.cancel(id, reason);
  }

  advanceOrder(id: number): Observable<BackendEcoOrder> {
    return this.orderApi.advance(id);
  }

  deleteOrder(id: number): Observable<void> {
    return this.orderApi.delete(id);
  }
}
