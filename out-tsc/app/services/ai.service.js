import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { API_URL } from '../app/core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class AiService {
    http;
    baseUrl = `${API_URL}/ai/recommendations`;
    constructor(http) {
        this.http = http;
    }
    getRecommendation(params) {
        let httpParams = new HttpParams();
        for (const [key, value] of Object.entries(params ?? {})) {
            if (value !== null && value !== undefined) {
                httpParams = httpParams.set(key, String(value));
            }
        }
        return this.http.get(this.baseUrl, { params: httpParams });
    }
    static ɵfac = function AiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AiService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AiService, factory: AiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
