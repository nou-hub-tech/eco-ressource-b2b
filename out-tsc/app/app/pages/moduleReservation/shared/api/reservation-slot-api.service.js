import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { API_URL } from '../../../../core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ReservationSlotApiService {
    http;
    baseUrl = `${API_URL}/reservation-slots`;
    constructor(http) {
        this.http = http;
    }
    list(includeDeleted = false) {
        const params = new HttpParams().set('includeDeleted', String(includeDeleted));
        return this.http.get(this.baseUrl, { params });
    }
    range(from, to) {
        const params = new HttpParams().set('from', from).set('to', to);
        return this.http.get(`${this.baseUrl}/range`, { params });
    }
    getById(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    create(req) {
        return this.http.post(this.baseUrl, req);
    }
    update(id, req) {
        return this.http.put(`${this.baseUrl}/${id}`, req);
    }
    toggle(id) {
        return this.http.post(`${this.baseUrl}/${id}/toggle`, {});
    }
    cancel(id, reason) {
        return this.http.post(`${this.baseUrl}/${id}/cancel`, { reason });
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    static ɵfac = function ReservationSlotApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReservationSlotApiService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReservationSlotApiService, factory: ReservationSlotApiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReservationSlotApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
