import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ListingService {
    http;
    apiUrl = API_URL;
    constructor(http) {
        this.http = http;
    }
    getAllListings() {
        return this.http.get(`${this.apiUrl}/listings`);
    }
    getListingById(id) {
        return this.http.get(`${this.apiUrl}/listings/${id}`);
    }
    getMyListings() {
        return this.http.get(`${this.apiUrl}/listings/my`);
    }
    createListing(body) {
        return this.http.post(`${this.apiUrl}/listings/create`, body);
    }
    updateListing(id, body) {
        return this.http.put(`${this.apiUrl}/listings/${id}`, body);
    }
    deleteListing(id) {
        return this.http.delete(`${this.apiUrl}/listings/${id}`);
    }
    moderateListing(id, status) {
        return this.http.patch(`${this.apiUrl}/listings/${id}/moderate`, { status });
    }
    getMyStock() {
        return this.http.get(`${this.apiUrl}/stock-items`);
    }
    getExchangeRequests() {
        return this.http.get(`${this.apiUrl}/exchange-requests`);
    }
    getExchangeRequestById(id) {
        return this.http.get(`${this.apiUrl}/exchange-requests/${id}`);
    }
    createExchangeRequest(body) {
        return this.http.post(`${this.apiUrl}/exchange-requests`, body);
    }
    updateExchangeRequestDetails(id, body) {
        return this.http.put(`${this.apiUrl}/exchange-requests/${id}`, body);
    }
    updateExchangeRequest(id, status) {
        return this.http.patch(`${this.apiUrl}/exchange-requests/${id}/status`, { status });
    }
    deleteExchangeRequest(id) {
        return this.http.delete(`${this.apiUrl}/exchange-requests/${id}`);
    }
    getMyReservations() {
        return this.http.get(`${this.apiUrl}/reservations`);
    }
    getWalletTransactions() {
        return this.http.get(`${this.apiUrl}/wallet-transactions`);
    }
    static ɵfac = function ListingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ListingService, factory: ListingService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
