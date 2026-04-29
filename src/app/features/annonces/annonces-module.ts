import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog';
import { Pagination } from './components/pagination/pagination';
import { ListingCard } from './components/listing-card/listing-card';
import { FavoriteButton } from './components/favorite-button/favorite-button';
import { CommentThread } from './components/comment-thread/comment-thread';
import { GroupPurchasePanel } from './components/group-purchase-panel/group-purchase-panel';
import { ListingMap } from './components/listing-map/listing-map';

import { ListingList } from './listing-list/listing-list';
import { ListingDetail } from './listing-detail/listing-detail';
import { ListingCreate } from './listing-create/listing-create';
import { ListingEdit } from './listing-edit/listing-edit';
import { ListingSearch } from './listing-search/listing-search';
import { FavoriteList } from './favorite-list/favorite-list';

import { ProductList } from './products/product-list/product-list';
import { ProductCreate } from './products/product-create/product-create';
import { ProductEdit } from './products/product-edit/product-edit';
import { ProductDetail } from './products/product-detail/product-detail';

import { StockItemList } from './stock/stock-item-list/stock-item-list';
import { StockItemCreate } from './stock/stock-item-create/stock-item-create';
import { StockItemEdit } from './stock/stock-item-edit/stock-item-edit';
import { StockItemDetail } from './stock/stock-item-detail/stock-item-detail';
import { StockMovementList } from './stock/stock-movement-list/stock-movement-list';
import { StockMovementCreate } from './stock/stock-movement-create/stock-movement-create';
import { StockMovementEdit } from './stock/stock-movement-edit/stock-movement-edit';

const routes: Routes = [
  { path: 'products/create', component: ProductCreate },
  { path: 'products/:id/edit', component: ProductEdit },
  { path: 'products/:id', component: ProductDetail },
  { path: 'products', component: ProductList },

  { path: 'stock/movements/create', component: StockMovementCreate },
  { path: 'stock/movements/:id/edit', component: StockMovementEdit },
  { path: 'stock/movements', component: StockMovementList },
  { path: 'stock/create', component: StockItemCreate },
  { path: 'stock/:id/edit', component: StockItemEdit },
  { path: 'stock/:id', component: StockItemDetail },
  { path: 'stock', component: StockItemList },

  { path: 'create', component: ListingCreate },
  { path: 'search', component: ListingSearch },
  { path: 'mine', component: ListingList, data: { mode: 'mine' } },
  { path: 'favorites', component: FavoriteList },
  { path: ':id/edit', component: ListingEdit },
  { path: ':id', component: ListingDetail },
  { path: '', component: ListingList }
];

@NgModule({
  declarations: [
    ConfirmDialog,
    Pagination,
    ListingCard,
    FavoriteButton,
    CommentThread,
    GroupPurchasePanel,
    ListingMap,

    ListingList,
    ListingDetail,
    ListingCreate,
    ListingEdit,
    ListingSearch,
    FavoriteList,

    ProductList,
    ProductCreate,
    ProductEdit,
    ProductDetail,

    StockItemList,
    StockItemCreate,
    StockItemEdit,
    StockItemDetail,
    StockMovementList,
    StockMovementCreate,
    StockMovementEdit
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AnnoncesModule {}
