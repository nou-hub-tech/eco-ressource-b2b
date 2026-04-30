import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AdminApiService {
    http;
    apiUrl = API_URL;
    constructor(http) {
        this.http = http;
    }
    getUsers() {
        return this.http.get(`${this.apiUrl}/users`);
    }
    updateUserStatus(id, status) {
        return this.http.patch(`${this.apiUrl}/users/${id}/status`, { status });
    }
    deleteUser(id) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
    getEvents() {
        return this.http.get(`${this.apiUrl}/platform-events`);
    }
    getReservations() {
        return this.http.get(`${this.apiUrl}/reservations`);
    }
    getSolidarity() {
        return this.http.get(`${this.apiUrl}/solidarity-associations`);
    }
    getTreasuryTransactions() {
        return this.http.get(`${this.apiUrl}/wallet-transactions`);
    }
    getStockItems() {
        return this.http.get(`${this.apiUrl}/stock-items`);
    }
    static ɵfac = function AdminApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminApiService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AdminApiService, factory: AdminApiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
