import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockItem } from '../models/stock-item.model';

@Injectable({ providedIn: 'root' })
export class StockItemService {
  private api = '/stockitem';

  constructor(private http: HttpClient) {}


  getAll(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(`${this.api}/retrieve-all-stockitems`);
  }
  getById(id: number): Observable<StockItem> {
    return this.http.get<StockItem>(`${this.api}/retrieve-stockitem/${id}`);
  }
  add(s: StockItem): Observable<StockItem> {
    return this.http.post<StockItem>(`${this.api}/add-stockitem`, s);
  }
  update(s: StockItem): Observable<StockItem> {
    return this.http.put<StockItem>(`${this.api}/update-stockitem`, s);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/remove-stockitem/${id}`);
  }
  getTotalValue(): Observable<{ totalValue: number }> {
    return this.http.get<{ totalValue: number }>(`${this.api}/total-value`);
  }
  getTotalValueByProduct(productId: number): Observable<{ totalValue: number }> {
    return this.http.get<{ totalValue: number }>(`${this.api}/total-value/${productId}`);
  }
  search(status: string, location: string, productName: string): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(
      `${this.api}/search?status=${status}&location=${location}&productName=${productName}`
    );
  }
  getStatsByCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/stats/category`);
  }
  getStatsByLocation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/stats/location`);
  }
  getExpired(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(`${this.api}/expired`);
  }
  getNearExpiry(days: number): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(`${this.api}/near-expiry/${days}`);
  }
  getPaginated(page: number, size: number, sortBy: string, direction: string): Observable<any> {
    return this.http.get<any>(
      `${this.api}/paginated?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`
    );
  }
  importFromExcel(rows: any[]): Observable<any> {
    return this.http.post(`${this.api}/import`, rows);
  }
  getAdvancedStats(): Observable<any> {
    return this.http.get<any>(`${this.api}/advanced-stats`);
  }
}