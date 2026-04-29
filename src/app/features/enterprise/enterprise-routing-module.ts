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
      {
        path: 'reservations',
        loadComponent: () =>
          import('./enterprise-reservations/enterprise-reservations').then(m => m.EnterpriseReservations),
      },
      {
        path: 'slots',
        loadComponent: () =>
          import('./enterprise-slots/enterprise-slots').then(m => m.EnterpriseSlots),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./enterprise-orders/enterprise-orders').then(m => m.EnterpriseOrders),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpriseRoutingModule {}
