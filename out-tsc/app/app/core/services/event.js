import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./admin-api.service";
export class EventService {
    adminApi;
    constructor(adminApi) {
        this.adminApi = adminApi;
    }
    getEvents() {
        return this.adminApi.getEvents();
    }
    static ɵfac = function EventService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EventService)(i0.ɵɵinject(i1.AdminApiService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EventService, factory: EventService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.AdminApiService }], null); })();
