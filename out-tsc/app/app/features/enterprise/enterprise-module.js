import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';
import { EnterpriseRoutingModule } from './enterprise-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { Marketplace } from './marketplace/marketplace';
import { MyStock } from './my-stock/my-stock';
import { MyDeliveries } from './my-deliveries/my-deliveries';
import { MyListings } from './my-listings/my-listings';
import { Transactions } from './transactions/transactions';
import { Reports } from './reports/reports';
import { Requests } from './requests/requests';
import { Events } from './events/events';
import { MarketplaceInsightsComponent } from '../reservation-center/components/marketplace-insights/marketplace-insights.component';
import * as i0 from "@angular/core";
export class EnterpriseModule {
    static ɵfac = function EnterpriseModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnterpriseModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: EnterpriseModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
            FormsModule,
            ReactiveFormsModule,
            SharedModule,
            MarketplaceInsightsComponent,
            EnterpriseRoutingModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnterpriseModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    Dashboard,
                    Marketplace,
                    MyStock,
                    MyDeliveries,
                    MyListings,
                    Transactions,
                    Reports,
                    Requests,
                    Events
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    SharedModule,
                    MarketplaceInsightsComponent,
                    EnterpriseRoutingModule
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(EnterpriseModule, { declarations: [Dashboard,
        Marketplace,
        MyStock,
        MyDeliveries,
        MyListings,
        Transactions,
        Reports,
        Requests,
        Events], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MarketplaceInsightsComponent,
        EnterpriseRoutingModule] }); })();
