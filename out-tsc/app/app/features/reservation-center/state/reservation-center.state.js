import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, tap } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../pages/moduleReservation/shared/api/reservation-api.service";
import * as i2 from "../../../pages/moduleReservation/shared/api/reservation-slot-api.service";
import * as i3 from "../../../pages/moduleReservation/shared/api/eco-order-api.service";
export class ReservationCenterState {
    reservationApi;
    slotApi;
    orderApi;
    reservationsSubject = new BehaviorSubject([]);
    slotsSubject = new BehaviorSubject([]);
    ordersSubject = new BehaviorSubject([]);
    loadingSubject = new BehaviorSubject(false);
    errorSubject = new BehaviorSubject('');
    reservations$ = this.reservationsSubject.asObservable();
    slots$ = this.slotsSubject.asObservable();
    orders$ = this.ordersSubject.asObservable();
    loading$ = this.loadingSubject.asObservable();
    error$ = this.errorSubject.asObservable();
    constructor(reservationApi, slotApi, orderApi) {
        this.reservationApi = reservationApi;
        this.slotApi = slotApi;
        this.orderApi = orderApi;
    }
    get reservations() {
        return this.reservationsSubject.value;
    }
    get slots() {
        return this.slotsSubject.value;
    }
    get orders() {
        return this.ordersSubject.value;
    }
    loadAll() {
        this.loadingSubject.next(true);
        this.errorSubject.next('');
        return forkJoin({
            reservations: this.reservationApi.list(false),
            slots: this.slotApi.list(false),
            orders: this.orderApi.list(false),
        }).pipe(tap({
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
        }));
    }
    createReservation(request) {
        return this.reservationApi.create(request);
    }
    createReservationWithSlot(slotId, request) {
        return this.reservationApi.createWithSlot(slotId, request);
    }
    updateReservation(id, request) {
        return this.reservationApi.update(id, request);
    }
    cancelReservation(id, reason) {
        return this.reservationApi.cancel(id, reason);
    }
    deleteReservation(id) {
        return this.reservationApi.delete(id);
    }
    createSlot(request) {
        return this.slotApi.create(request);
    }
    updateSlot(id, request) {
        return this.slotApi.update(id, request);
    }
    deleteSlot(id) {
        return this.slotApi.delete(id);
    }
    createOrder(request) {
        return this.orderApi.create(request);
    }
    updateOrder(id, request) {
        return this.orderApi.update(id, request);
    }
    cancelOrder(id, reason) {
        return this.orderApi.cancel(id, reason);
    }
    advanceOrder(id) {
        return this.orderApi.advance(id);
    }
    deleteOrder(id) {
        return this.orderApi.delete(id);
    }
    static ɵfac = function ReservationCenterState_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReservationCenterState)(i0.ɵɵinject(i1.ReservationApiService), i0.ɵɵinject(i2.ReservationSlotApiService), i0.ɵɵinject(i3.EcoOrderApiService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReservationCenterState, factory: ReservationCenterState.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReservationCenterState, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.ReservationApiService }, { type: i2.ReservationSlotApiService }, { type: i3.EcoOrderApiService }], null); })();
