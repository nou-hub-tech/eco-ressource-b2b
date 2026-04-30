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

@NgModule({
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
})
export class EnterpriseModule {}
