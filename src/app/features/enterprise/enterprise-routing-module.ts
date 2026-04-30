import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpriseRoutingModule {}
