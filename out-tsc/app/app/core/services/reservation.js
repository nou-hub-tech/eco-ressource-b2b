import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./listing.service";
import * as i2 from "./admin-api.service";
export class ReservationService {
    listing;
    adminApi;
    constructor(listing, adminApi) {
        this.listing = listing;
        this.adminApi = adminApi;
    }
    getMyReservations() {
        return this.listing.getMyReservations();
    }
    getAllReservationsAdmin() {
        return this.adminApi.getReservations();
    }
    static ɵfac = function ReservationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReservationService)(i0.ɵɵinject(i1.ListingService), i0.ɵɵinject(i2.AdminApiService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReservationService, factory: ReservationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReservationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.ListingService }, { type: i2.AdminApiService }], null); })();
