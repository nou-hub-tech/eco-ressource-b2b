import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
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
import { MyInventory } from './my-inventory/my-inventory';
import { ProductFinder } from './product-finder/product-finder';
import { MarketChatbot } from './market-chatbot/market-chatbot';
import { MyReclamations } from './my-reclamations/my-reclamations';

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
      { path: 'my-inventory',    component: MyInventory },
      { path: 'product-finder',  component: ProductFinder },
      { path: 'market-chatbot',  component: MarketChatbot },
      { path: 'my-reclamations', component: MyReclamations },
    ]
  }
];

@NgModule({
  declarations: [Dashboard, Marketplace, MyStock, MyProducts, MyDeliveries, MyListings, MyReservations, Transactions, Reports, Requests, Events, MyInventory, ProductFinder, MarketChatbot, MyReclamations],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)],
  providers: [DatePipe, DecimalPipe]
})
export class EnterpriseModule {}