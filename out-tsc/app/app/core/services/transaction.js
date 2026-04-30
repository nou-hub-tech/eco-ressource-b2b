import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./listing.service";
import * as i2 from "./admin-api.service";
export class TransactionService {
    listing;
    adminApi;
    constructor(listing, adminApi) {
        this.listing = listing;
        this.adminApi = adminApi;
    }
    getMyTransactions() {
        return this.listing.getWalletTransactions();
    }
    getTreasuryTransactions() {
        return this.adminApi.getTreasuryTransactions();
    }
    static ɵfac = function TransactionService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransactionService)(i0.ɵɵinject(i1.ListingService), i0.ɵɵinject(i2.AdminApiService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TransactionService, factory: TransactionService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransactionService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.ListingService }, { type: i2.AdminApiService }], null); })();
