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
import { TreasuryAdmin } from './treasury/treasuryadmin';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '',                  redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',         component: Dashboard },
      { path: 'users',             component: Users },
      { path: 'events',            component: Events },
      { path: 'stock',             component: Stock },
      { path: 'deliveries',        component: Deliveries },
      { path: 'listings',          component: Listings },
      { path: 'reservations',      component: Reservations },
      { path: 'treasury',          component: Treasury },
      { path: 'treasury-finance',  component: TreasuryAdmin },
      { path: 'solidarity',        component: Solidarity },
    ]
  }
];

@NgModule({
  declarations: [
    Dashboard, Users, Events, Stock, Deliveries,
    Listings, Reservations, Treasury, Solidarity,
    TreasuryAdmin
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class AdminModule {}