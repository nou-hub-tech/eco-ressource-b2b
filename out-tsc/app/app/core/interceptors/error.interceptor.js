import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const TOKEN_KEY = 'eco_token';
const USER_KEY = 'eco_user';
export class ErrorInterceptor {
    router;
    constructor(router) {
        this.router = router;
    }
    intercept(req, next) {
        return next.handle(req).pipe(catchError((error) => {
            if (error.status === 401) {
                localStorage.removeItem(TOKEN_KEY);
                localStorage.removeItem(USER_KEY);
                this.router.navigate(['/auth/login']);
            }
            return throwError(() => error);
        }));
    }
    static ɵfac = function ErrorInterceptor_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ErrorInterceptor)(i0.ɵɵinject(i1.Router)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ErrorInterceptor, factory: ErrorInterceptor.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorInterceptor, [{
        type: Injectable
    }], () => [{ type: i1.Router }], null); })();
