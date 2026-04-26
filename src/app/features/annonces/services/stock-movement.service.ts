import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StockMovement, StockMovementRequest } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class StockMovementService {
  private readonly baseUrl = `${environment.apiUrl}/stock-movements`;

  constructor(private readonly http: HttpClient) {}

  findAll(stockItemId?: number): Observable<StockMovement[]> {
    let params = new HttpParams();
    if (stockItemId !== undefined) params = params.set('stockItemId', stockItemId.toString());
    return this.http.get<StockMovement[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<StockMovement> {
    return this.http.get<StockMovement>(`${this.baseUrl}/${id}`);
  }

  create(req: StockMovementRequest): Observable<StockMovement> {
    return this.http.post<StockMovement>(this.baseUrl, req);
  }

  update(id: number, req: StockMovementRequest): Observable<StockMovement> {
    return this.http.put<StockMovement>(`${this.baseUrl}/${id}`, req);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
