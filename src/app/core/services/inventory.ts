import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private api = 'http://localhost:8080/inventory';

  constructor(private http: HttpClient) {}

  scan(payload: {
    barcode: string;
    realQty: number;
    realCondition: string;
    realLocation: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.api}/scan`, payload);
  }

  getAllWithStock(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/all-with-stock`);
  }

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/history`);
  }
}