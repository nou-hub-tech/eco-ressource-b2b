import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { Layout } from '../../shared/components/layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Users } from './users/users';
import { Events } from './events/events';
import { Stock } from './stock/stock';
import { Deliveries } from './deliveries/deliveries';
import { Listings } from './listings/listings';
import { Reservations } from './reservations/reservations';
import { Treasury } from './treasury/treasury';
import { Solidarity } from './solidarity/solidarity';

const routes: Routes = [
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
      { path: 'reservations', component: Reservations },
      { path: 'treasury', component: Treasury },
      { path: 'solidarity', component: Solidarity },
      
      // ✅ LAZY LOADING pour les commandes
      { 
        path: 'delivery-orders', 
        loadChildren: () => import('../transporter/delivery-order/delivery-order.module').then(m => m.DeliveryOrderModule)
      },
      
      // ✅ LAZY LOADING pour les expéditions
      { 
        path: 'shipments', 
        loadChildren: () => import('../transporter/shipment/shipment.module').then(m => m.ShipmentModule)
      },
    ]
  }
];

@NgModule({
  declarations: [Dashboard, Users, Events, Stock, Deliveries, Listings, Reservations, Treasury, Solidarity],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)]
})
export class AdminModule {}