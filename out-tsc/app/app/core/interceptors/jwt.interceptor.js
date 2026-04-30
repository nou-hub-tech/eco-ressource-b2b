import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
const TOKEN_KEY = 'eco_token';
export class JwtInterceptor {
    intercept(req, next) {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return next.handle(req);
        }
        const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(authReq);
    }
    static ɵfac = function JwtInterceptor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || JwtInterceptor)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: JwtInterceptor, factory: JwtInterceptor.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(JwtInterceptor, [{
        type: Injectable
    }], null, null); })();
