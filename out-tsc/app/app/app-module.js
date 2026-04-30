import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import * as i0 from "@angular/core";
import * as i1 from "angular-calendar";
export class AppModule {
    static ɵfac = function AppModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AppModule, bootstrap: [App] });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
            { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
        ], imports: [BrowserModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            AppRoutingModule,
            CalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory
            })] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppModule, [{
        type: NgModule,
        args: [{
                declarations: [App],
                imports: [
                    BrowserModule,
                    HttpClientModule,
                    FormsModule,
                    ReactiveFormsModule,
                    AppRoutingModule,
                    CalendarModule.forRoot({
                        provide: DateAdapter,
                        useFactory: adapterFactory
                    })
                ],
                providers: [
                    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
                ],
                bootstrap: [App]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AppModule, { declarations: [App], imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule, i1.CalendarModule] }); })();
