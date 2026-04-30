import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
export class AuthModule {
    static ɵfac = function AuthModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AuthModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthModule, [{
        type: NgModule,
        args: [{
                declarations: [Login, Register],
                imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AuthModule, { declarations: [Login, Register], imports: [CommonModule, ReactiveFormsModule, FormsModule, i1.RouterModule] }); })();
