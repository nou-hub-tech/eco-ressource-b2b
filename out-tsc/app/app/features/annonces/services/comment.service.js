import { Injectable } from '@angular/core';
import { API_URL } from '../../../core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class CommentService {
    http;
    apiUrl = API_URL;
    constructor(http) {
        this.http = http;
    }
    create(listingId, req) {
        return this.http.post(`${this.apiUrl}/resource-listings/${listingId}/comments`, req);
    }
    findByListing(listingId) {
        return this.http.get(`${this.apiUrl}/resource-listings/${listingId}/comments`);
    }
    update(commentId, req) {
        return this.http.put(`${this.apiUrl}/comments/${commentId}`, req);
    }
    delete(commentId) {
        return this.http.delete(`${this.apiUrl}/comments/${commentId}`);
    }
    static ɵfac = function CommentService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommentService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CommentService, factory: CommentService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommentService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
