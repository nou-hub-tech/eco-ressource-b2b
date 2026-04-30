import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { API_URL } from '../../../../core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ReservationApiService {
    http;
    baseUrl = `${API_URL}/reservations`;
    constructor(http) {
        this.http = http;
    }
    list(includeDeleted = false) {
        const params = new HttpParams().set('includeDeleted', String(includeDeleted));
        return this.http.get(this.baseUrl, { params });
    }
    getById(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    create(req) {
        return this.http.post(this.baseUrl, req);
    }
    createWithSlot(slotId, req) {
        return this.http.post(`${this.baseUrl}/with-slot/${slotId}`, req);
    }
    update(id, req) {
        return this.http.put(`${this.baseUrl}/${id}`, req);
    }
    cancel(id, reason) {
        return this.http.post(`${this.baseUrl}/${id}/cancel`, { reason });
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    static ɵfac = function ReservationApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReservationApiService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReservationApiService, factory: ReservationApiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReservationApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
