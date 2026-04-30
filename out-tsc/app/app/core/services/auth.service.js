import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { API_URL } from '../constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/router";
const TOKEN_KEY = 'eco_token';
const USER_KEY = 'eco_user';
export class AuthService {
    http;
    router;
    apiUrl = API_URL;
    userSubject = new BehaviorSubject(this.loadUser());
    user$ = this.userSubject.asObservable();
    constructor(http, router) {
        this.http = http;
        this.router = router;
    }
    get currentUser() {
        return this.userSubject.value;
    }
    login(email, password) {
        return this.http
            .post(`${this.apiUrl}/auth/login`, { email, password })
            .pipe(tap((res) => {
            localStorage.setItem(TOKEN_KEY, res.token);
            const u = this.normalizeUser(res.user, res.role);
            localStorage.setItem(USER_KEY, JSON.stringify(u));
            this.userSubject.next(u);
        }), map(() => ({ success: true, token: localStorage.getItem(TOKEN_KEY) ?? undefined })));
    }
    register(data) {
        return this.http
            .post(`${this.apiUrl}/auth/register`, data)
            .pipe(tap((res) => {
            localStorage.setItem(TOKEN_KEY, res.token);
            const u = this.normalizeUser(res.user, res.role);
            localStorage.setItem(USER_KEY, JSON.stringify(u));
            this.userSubject.next(u);
        }));
    }
    logout() {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
    }
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }
    getRole() {
        return this.currentUser?.role ?? null;
    }
    isLoggedIn() {
        return !!this.getToken() && !!this.currentUser;
    }
    loadUser() {
        try {
            const stored = localStorage.getItem(USER_KEY);
            if (!stored) {
                return null;
            }
            const user = JSON.parse(stored);
            if (!user.id || !user.role || !user.email) {
                localStorage.removeItem(USER_KEY);
                localStorage.removeItem(TOKEN_KEY);
                return null;
            }
            return user;
        }
        catch {
            localStorage.removeItem(USER_KEY);
            localStorage.removeItem(TOKEN_KEY);
            return null;
        }
    }
    normalizeUser(u, springRole) {
        const routeRole = this.mapSpringRoleToRoute(springRole);
        return {
            id: u.id,
            name: u.name,
            email: u.email,
            role: routeRole,
            company: u.company,
            enterpriseId: u.enterprise?.id ?? u.enterpriseId ?? null,
            enterprise: u.enterprise ?? null,
            avatar: u.avatar
        };
    }
    mapSpringRoleToRoute(r) {
        if (r === 'ROLE_ADMIN') {
            return 'admin';
        }
        if (r === 'ROLE_TRANSPORTER') {
            return 'transporter';
        }
        return 'enterprise';
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.Router)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }, { type: i2.Router }], null); })();
