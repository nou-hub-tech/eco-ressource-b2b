import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

// IMPORT YOUR COMPONENTS
import { ProductListComponent } from './components/product/product-list/product-list';
import { ProductFormComponent } from './components/product/product-form/product-form';
import { ProductDetailComponent } from './components/product/product-detail/product-detail';
import { StockItemListComponent } from './components/stock-item/stock-item-list/stock-item-list';
import { StockItemFormComponent } from './components/stock-item/stock-item-form/stock-item-form';
import { StockItemDetailComponent } from './components/stock-item/stock-item-detail/stock-item-detail';
import { StockItemStatsComponent } from './components/stock-item/stock-item-stats/stock-item-stats';
import { StockAllHistoryComponent } from './components/stock-item/stock-all-history/stock-all-history';
import { StockItemHistoryComponent } from './components/stock-item/stock-item-history/stock-item-history';
import { Chatbot } from './components/chatbot/chatbot';
import { BrokenProductDetectComponent } from './components/broken-product-detect/broken-product-detect';
import { InventoryScanComponent } from './components/inventory-scan/inventory-scan';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  {
    path: 'enterprise',
    loadChildren: () => import('./features/enterprise/enterprise-module').then(m => m.EnterpriseModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'enterprise' }
  },
  {
    path: 'transporter',
    loadChildren: () => import('./features/transporter/transporter-module').then(m => m.TransporterModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'transporter' }
  },
  
  // ADD YOUR ROUTES HERE (outside admin for direct access)
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'products/add', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'products/detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'stockitems', component: StockItemListComponent, canActivate: [AuthGuard] },
  { path: 'stockitems/add', component: StockItemFormComponent, canActivate: [AuthGuard] },
  { path: 'stockitems/edit/:id', component: StockItemFormComponent, canActivate: [AuthGuard] },
  { path: 'stockitems/detail/:id', component: StockItemDetailComponent, canActivate: [AuthGuard] },
  { path: 'stockitems/stats', component: StockItemStatsComponent, canActivate: [AuthGuard] },
  { path: 'stockitems/history', component: StockAllHistoryComponent, canActivate: [AuthGuard] },
  { path: 'stockitems/history/:id', component: StockItemHistoryComponent, canActivate: [AuthGuard] },
  { path: 'chatbot', component: Chatbot, canActivate: [AuthGuard] },
  { path: 'broken-product', component: BrokenProductDetectComponent, canActivate: [AuthGuard] },
  { path: 'inventory', component: InventoryScanComponent, canActivate: [AuthGuard] },
  
  { path: '**', redirectTo: '/auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}