import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { Layout } from '../../shared/components/layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Users } from './users/users';
import { Events } from './events/events';
import { Stock } from './stock/stock';
import { Deliveries } from './deliveries/deliveries';
import { Listings } from './listings/listings';
import { Treasury } from './treasury/treasury';
import { Solidarity } from './solidarity/solidarity';
import { EcoLeaderboardComponent } from '../reservation-center/components/eco-leaderboard/eco-leaderboard.component';
import { AiInsightsPanel } from '../reservation-center/components/ai-insights-panel/ai-insights-panel';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'users', component: Users },
            { path: 'events', component: Events },
            { path: 'stock', component: Stock },
            { path: 'deliveries', component: Deliveries },
            { path: 'listings', component: Listings },
            {
                path: 'reservations',
                loadComponent: () => import('../enterprise/enterprise-reservations/enterprise-reservations').then(m => m.EnterpriseReservations),
            },
            {
                path: 'slots',
                loadComponent: () => import('../enterprise/enterprise-slots/enterprise-slots').then(m => m.EnterpriseSlots),
            },
            {
                path: 'orders',
                loadComponent: () => import('../enterprise/enterprise-orders/enterprise-orders').then(m => m.EnterpriseOrders),
            },
            { path: 'treasury', component: Treasury },
            { path: 'solidarity', component: Solidarity },
        ]
    }
];
export class AdminModule {
    static ɵfac = function AdminModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AdminModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, EcoLeaderboardComponent, AiInsightsPanel, RouterModule.forChild(routes)] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminModule, [{
        type: NgModule,
        args: [{
                declarations: [Dashboard, Users, Events, Stock, Deliveries, Listings, Treasury, Solidarity],
                imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, EcoLeaderboardComponent, AiInsightsPanel, RouterModule.forChild(routes)]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AdminModule, { declarations: [Dashboard, Users, Events, Stock, Deliveries, Listings, Treasury, Solidarity], imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, EcoLeaderboardComponent, AiInsightsPanel, i1.RouterModule] }); })();
