import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth.service";
import * as i2 from "@angular/router";
export class RoleGuard {
    authService;
    router;
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, _state) {
        const expected = route.data['role'];
        const user = this.authService.currentUser;
        if (!expected || !user) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        if (user.role !== expected) {
            this.router.navigate(['/' + user.role]);
            return false;
        }
        return true;
    }
    static ɵfac = function RoleGuard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RoleGuard)(i0.ɵɵinject(i1.AuthService), i0.ɵɵinject(i2.Router)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RoleGuard, factory: RoleGuard.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RoleGuard, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }], null); })();
