import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApiService } from './admin-api.service';
import { ListingService, StockItemDto } from './listing.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(
    private readonly listing: ListingService,
    private readonly adminApi: AdminApiService
  ) {}

  getMyStock(): Observable<StockItemDto[]> {
    return this.listing.getMyStock();
  }

  getAdminStock(): Observable<StockItemDto[]> {
    return this.adminApi.getStockItems();
  }
}
