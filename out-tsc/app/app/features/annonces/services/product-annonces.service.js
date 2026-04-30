import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { API_URL } from '../../../core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ProductAnnoncesService {
    http;
    baseUrl = `${API_URL}/products`;
    constructor(http) {
        this.http = http;
    }
    findAll(category) {
        let params = new HttpParams();
        if (category)
            params = params.set('category', category);
        return this.http.get(this.baseUrl, { params });
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
    delete(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    static ɵfac = function ProductAnnoncesService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductAnnoncesService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ProductAnnoncesService, factory: ProductAnnoncesService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductAnnoncesService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
