import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { API_URL } from '../../../core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class GroupPurchaseService {
    http;
    baseUrl = `${API_URL}/groups`;
    constructor(http) {
        this.http = http;
    }
    getById(groupId) {
        return this.http.get(`${this.baseUrl}/${groupId}`);
    }
    join(groupId, req) {
        return this.http.post(`${this.baseUrl}/${groupId}/join`, req);
    }
    leave(groupId, companyId) {
        const params = new HttpParams().set('companyId', companyId.toString());
        return this.http.delete(`${this.baseUrl}/${groupId}/leave`, { params });
    }
    getParticipants(groupId) {
        return this.http.get(`${this.baseUrl}/${groupId}/participants`);
    }
    static ɵfac = function GroupPurchaseService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GroupPurchaseService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: GroupPurchaseService, factory: GroupPurchaseService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GroupPurchaseService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
