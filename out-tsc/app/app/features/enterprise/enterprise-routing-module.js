import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Layout } from '../../shared/components/layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Marketplace } from './marketplace/marketplace';
import { MyStock } from './my-stock/my-stock';
import { MyDeliveries } from './my-deliveries/my-deliveries';
import { MyListings } from './my-listings/my-listings';
import { Transactions } from './transactions/transactions';
import { Reports } from './reports/reports';
import { Requests } from './requests/requests';
import { Events } from './events/events';
import { EnterpriseReservations } from './enterprise-reservations/enterprise-reservations';
import { EnterpriseSlots } from './enterprise-slots/enterprise-slots';
import { EnterpriseOrders } from './enterprise-orders/enterprise-orders';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const routes = [
    {
        path: '',
        component: Layout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: Dashboard },
            { path: 'marketplace', component: Marketplace },
            { path: 'my-stock', component: MyStock },
            { path: 'my-deliveries', component: MyDeliveries },
            { path: 'my-listings', component: MyListings },
            { path: 'transactions', component: Transactions },
            { path: 'reports', component: Reports },
            { path: 'requests', component: Requests },
            { path: 'events', component: Events },
            { path: 'reservations', component: EnterpriseReservations },
            { path: 'incoming-requests', component: EnterpriseReservations },
            { path: 'slots', component: EnterpriseSlots },
            { path: 'orders', component: EnterpriseOrders },
        ],
    },
];
export class EnterpriseRoutingModule {
    static ɵfac = function EnterpriseRoutingModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnterpriseRoutingModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: EnterpriseRoutingModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnterpriseRoutingModule, [{
        type: NgModule,
        args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(EnterpriseRoutingModule, { imports: [i1.RouterModule], exports: [RouterModule] }); })();
