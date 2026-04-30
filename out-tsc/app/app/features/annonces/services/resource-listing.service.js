import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { API_URL } from '../../../core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ResourceListingService {
    http;
    baseUrl = `${API_URL}/resource-listings`;
    constructor(http) {
        this.http = http;
    }
    create(req) {
        return this.http.post(this.baseUrl, req);
    }
    findAll() {
        return this.http.get(this.baseUrl);
    }
    getById(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    search(params) {
        let httpParams = new HttpParams();
        if (params.type)
            httpParams = httpParams.set('type', params.type);
        if (params.category)
            httpParams = httpParams.set('category', params.category);
        if (params.location)
            httpParams = httpParams.set('location', params.location);
        if (params.maxPrice !== undefined && params.maxPrice !== null) {
            httpParams = httpParams.set('maxPrice', params.maxPrice.toString());
        }
        return this.http.get(`${this.baseUrl}/search`, { params: httpParams });
    }
    update(id, companyId, req) {
        const httpParams = new HttpParams().set('companyId', companyId.toString());
        return this.http.put(`${this.baseUrl}/${id}`, req, { params: httpParams });
    }
    duplicate(id) {
        return this.http.post(`${this.baseUrl}/${id}/duplicate`, {});
    }
    cancel(id, companyId) {
        const httpParams = new HttpParams().set('companyId', companyId.toString());
        return this.http.put(`${this.baseUrl}/${id}/cancel`, {}, { params: httpParams });
    }
    static ɵfac = function ResourceListingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ResourceListingService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ResourceListingService, factory: ResourceListingService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResourceListingService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
