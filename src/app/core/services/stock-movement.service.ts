// services/stock-movement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMovement } from '../models/stock-movement.model';

@Injectable({ providedIn: 'root' })
export class StockMovementService {
  private api = 'http://localhost:8080/stock-movement';

  constructor(private http: HttpClient) {}

  getHistoryByStock(idStock: number): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.api}/history/${idStock}`);
  }

  getAllHistory(): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(`${this.api}/history`);
  }
}