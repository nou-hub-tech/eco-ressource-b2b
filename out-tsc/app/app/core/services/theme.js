import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class ThemeService {
    darkMode = new BehaviorSubject(this.loadDark());
    isDark$ = this.darkMode.asObservable();
    get isDark() { return this.darkMode.value; }
    loadDark() {
        return localStorage.getItem('eco_dark') === 'true';
    }
    toggle() {
        const next = !this.darkMode.value;
        this.darkMode.next(next);
        localStorage.setItem('eco_dark', String(next));
        this.apply(next);
    }
    apply(dark) {
        document.body.classList.toggle('dark-mode', dark);
    }
    init() {
        this.apply(this.isDark);
    }
    static ɵfac = function ThemeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ThemeService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ThemeService, factory: ThemeService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
