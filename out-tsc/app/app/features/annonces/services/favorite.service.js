import { Injectable } from '@angular/core';
import { API_URL } from '../../../core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class FavoriteService {
    http;
    apiUrl = API_URL;
    constructor(http) {
        this.http = http;
    }
    add(listingId) {
        return this.http.post(`${this.apiUrl}/resource-listings/${listingId}/favorite`, {});
    }
    remove(listingId) {
        return this.http.delete(`${this.apiUrl}/resource-listings/${listingId}/favorite`);
    }
    myFavorites() {
        return this.http.get(`${this.apiUrl}/favorites/me`);
    }
    static ɵfac = function FavoriteService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FavoriteService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: FavoriteService, factory: FavoriteService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FavoriteService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
