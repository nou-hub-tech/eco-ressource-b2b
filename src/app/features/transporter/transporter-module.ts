import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { Layout } from '../../shared/components/layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Trips } from './trips/trips';
import { Shipments } from './shipments/shipments';
import { Earnings } from './earnings/earnings';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'trips',     component: Trips },
      { path: 'shipments', component: Shipments },
      {
        path: 'delivery-orders',
        loadChildren: () => import('./delivery-order/delivery-order.module').then(m => m.DeliveryOrderModule)
      },
      { path: 'earnings',  component: Earnings },
    ]
  }
];

@NgModule({
  declarations: [Dashboard, Trips, Shipments, Earnings],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)]
})
export class TransporterModule {}