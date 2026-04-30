import { Injectable } from '@angular/core';
import { API_URL } from '../constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class TransportService {
    http;
    apiUrl = API_URL;
    constructor(http) {
        this.http = http;
    }
    getEnterpriseDeliveries() {
        return this.http.get(`${this.apiUrl}/deliveries`);
    }
    getTransporterDeliveries() {
        return this.http.get(`${this.apiUrl}/deliveries`);
    }
    createOffer(body) {
        return this.http.post(`${this.apiUrl}/transport-offers`, body);
    }
    static ɵfac = function TransportService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransportService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TransportService, factory: TransportService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransportService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
