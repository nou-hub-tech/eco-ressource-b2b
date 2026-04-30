import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./listing.service";
import * as i2 from "./admin-api.service";
export class ProductService {
    listing;
    adminApi;
    constructor(listing, adminApi) {
        this.listing = listing;
        this.adminApi = adminApi;
    }
    getMyStock() {
        return this.listing.getMyStock();
    }
    getAdminStock() {
        return this.adminApi.getStockItems();
    }
    static ɵfac = function ProductService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductService)(i0.ɵɵinject(i1.ListingService), i0.ɵɵinject(i2.AdminApiService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ProductService, factory: ProductService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.ListingService }, { type: i2.AdminApiService }], null); })();
