import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { Layout } from '../../shared/components/layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Trips } from './trips/trips';
import { Shipments } from './shipments/shipments';
import { Earnings } from './earnings/earnings';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'trips', component: Trips },
            { path: 'shipments', component: Shipments },
            { path: 'earnings', component: Earnings },
        ]
    }
];
export class TransporterModule {
    static ɵfac = function TransporterModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransporterModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TransporterModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransporterModule, [{
        type: NgModule,
        args: [{
                declarations: [Dashboard, Trips, Shipments, Earnings],
                imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TransporterModule, { declarations: [Dashboard, Trips, Shipments, Earnings], imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, i1.RouterModule] }); })();
