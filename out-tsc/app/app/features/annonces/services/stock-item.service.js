import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { API_URL } from '../../../core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class StockItemService {
    http;
    baseUrl = `${API_URL}/stock-items`;
    constructor(http) {
        this.http = http;
    }
    findAll(productId, companyId) {
        let params = new HttpParams();
        if (productId !== undefined)
            params = params.set('productId', productId.toString());
        if (companyId !== undefined)
            params = params.set('companyId', companyId.toString());
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
    static ɵfac = function StockItemService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StockItemService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: StockItemService, factory: StockItemService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StockItemService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
