import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../core/constants/api-url';
import { StockItem, StockItemRequest } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class StockItemService {
  private readonly baseUrl = `${API_URL}/stock-items`;

  constructor(private readonly http: HttpClient) {}

  findAll(productId?: number, companyId?: number): Observable<StockItem[]> {
    let params = new HttpParams();
    if (productId !== undefined) params = params.set('productId', productId.toString());
    if (companyId !== undefined) params = params.set('companyId', companyId.toString());
    return this.http.get<StockItem[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<StockItem> {
    return this.http.get<StockItem>(`${this.baseUrl}/${id}`);
  }

  create(req: StockItemRequest): Observable<StockItem> {
    return this.http.post<StockItem>(this.baseUrl, req);
  }

  update(id: number, req: StockItemRequest): Observable<StockItem> {
    return this.http.put<StockItem>(`${this.baseUrl}/${id}`, req);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
