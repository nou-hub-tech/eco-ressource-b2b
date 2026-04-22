import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AdminApiService } from './admin-api.service';
import { ListingService, StockItemDto } from './listing.service';
import { Product } from '../models/product.model';

/** Réponse paginée backend (gestion produit). */
export interface PaginatedProducts {
  content: Product[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}

/** Catalog / CRUD API (gestion produit) + stock listing bridge (annonces). */
@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly productApi = environment.productApiUrl;

  constructor(
    private readonly listing: ListingService,
    private readonly adminApi: AdminApiService,
    private readonly http: HttpClient
  ) {}

  getMyStock(): Observable<StockItemDto[]> {
    return this.listing.getMyStock();
  }

  getAdminStock(): Observable<StockItemDto[]> {
    return this.adminApi.getStockItems();
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productApi}/retrieve-all-products`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productApi}/retrieve-product/${id}`);
  }

  add(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.productApi}/add-product`, p);
  }

  update(p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productApi}/update-product`, p);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productApi}/remove-product/${id}`);
  }

  search(name: string, category: string, materialType: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productApi}/search`, {
      params: { name, category, materialType }
    });
  }

  getPaginated(
    page: number,
    size: number,
    sortBy: string,
    direction: string
  ): Observable<PaginatedProducts> {
    return this.http.get<PaginatedProducts>(`${this.productApi}/paginated`, {
      params: { page, size, sortBy, direction }
    });
  }
}
