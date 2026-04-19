import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { Layout } from '../../shared/components/layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Marketplace } from './marketplace/marketplace';
import { MyStock } from './my-stock/my-stock';
import { MyDeliveries } from './my-deliveries/my-deliveries';
import { MyListings } from './my-listings/my-listings';
import { MyReservations } from './my-reservations/my-reservations';
import { Transactions } from './transactions/transactions';
import { Reports } from './reports/reports';
import { Requests } from './requests/requests';
import { Events } from './events/events';
import { MyProducts } from './my-products/my-products';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '',                redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',       component: Dashboard },
      { path: 'marketplace',     component: Marketplace },
      { path: 'my-products', component: MyProducts },
      { path: 'my-stock',    component: MyStock },      { path: 'my-deliveries',   component: MyDeliveries },
      { path: 'my-listings',     component: MyListings },
      { path: 'my-reservations', component: MyReservations },
      { path: 'transactions',    component: Transactions },
      { path: 'reports',         component: Reports },
      { path: 'requests',        component: Requests },
      { path: 'events',          component: Events },
    ]
  }
];

@NgModule({
  declarations: [Dashboard, Marketplace, MyStock,MyProducts, MyDeliveries, MyListings, MyReservations, Transactions, Reports, Requests, Events],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)]
})
export class EnterpriseModule {}