import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';
import { Layout } from '../../shared/components/layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { Users } from './users/users';
import { AdminEvents } from './events/events';
import { Stock } from './stock/stock';
import { Deliveries } from './deliveries/deliveries';
import { Listings } from './listings/listings';
import { Reservations } from './reservations/reservations';
import { Treasury } from './treasury/treasury';
import { TreasuryAdmin } from './treasury/treasuryadmin';
import { Solidarity } from './solidarity/solidarity';

import { StockItemService } from '../../core/services/stock-item';
import { ProductService } from '../../core/services/product';
import { ProductListComponent } from '../../components/product/product-list/product-list';
import { ProductFormComponent } from '../../components/product/product-form/product-form';
import { ProductDetailComponent } from '../../components/product/product-detail/product-detail';
import { StockItemListComponent } from '../../components/stock-item/stock-item-list/stock-item-list';
import { StockItemFormComponent } from '../../components/stock-item/stock-item-form/stock-item-form';
import { StockItemDetailComponent } from '../../components/stock-item/stock-item-detail/stock-item-detail';
import { StockItemStatsComponent } from '../../components/stock-item/stock-item-stats/stock-item-stats';
import { StockItemHistoryComponent } from '../../components/stock-item/stock-item-history/stock-item-history';
import { StockAllHistoryComponent } from '../../components/stock-item/stock-all-history/stock-all-history';
import { Chatbot } from '../../components/chatbot/chatbot';
import { BrokenProductDetectComponent } from '../../components/broken-product-detect/broken-product-detect';
import { InventoryScanComponent } from '../../components/inventory-scan/inventory-scan';
import { StockItemStatsAdvancedComponent } from '../../components/stock-item-stats-advanced/stock-item-stats-advanced';

const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'events', component: AdminEvents },
      { path: 'stock', component: Stock },
      { path: 'deliveries', component: Deliveries },
      { path: 'listings', component: Listings },
      { path: 'reservations', component: Reservations },
      { path: 'treasury', component: Treasury },
      { path: 'treasury-finance', component: TreasuryAdmin },
      { path: 'solidarity', component: Solidarity },
      { path: 'products', component: ProductListComponent },
      { path: 'products/add', component: ProductFormComponent },
      { path: 'products/edit/:id', component: ProductFormComponent },
      { path: 'products/detail/:id', component: ProductDetailComponent },
      { path: 'stockitems', component: StockItemListComponent },
      { path: 'stockitems/add', component: StockItemFormComponent },
      { path: 'stockitems/edit/:id', component: StockItemFormComponent },
      { path: 'stockitems/detail/:id', component: StockItemDetailComponent },
      { path: 'stockitems/stats', component: StockItemStatsComponent },
      { path: 'stockitems/history', component: StockAllHistoryComponent },
      { path: 'stockitems/history/:id', component: StockItemHistoryComponent },
      { path: 'chatbot', component: Chatbot },
      { path: 'broken-product', component: BrokenProductDetectComponent },
      { path: 'inventory', component: InventoryScanComponent }
    ]
  }
];

@NgModule({
  declarations: [
    Dashboard,
    Users,
    AdminEvents,
    Stock,
    TreasuryAdmin,
    Deliveries,
    Listings,
    Reservations,
    Treasury,
    Solidarity,
    ProductListComponent,
    ProductFormComponent,
    ProductDetailComponent,
    StockItemListComponent,
    StockItemFormComponent,
    StockItemDetailComponent,
    StockItemStatsComponent,
    StockItemHistoryComponent,
    StockAllHistoryComponent,
    Chatbot,
    StockItemStatsAdvancedComponent,
    BrokenProductDetectComponent,
    InventoryScanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [StockItemService, ProductService]
})
export class AdminModule {}
