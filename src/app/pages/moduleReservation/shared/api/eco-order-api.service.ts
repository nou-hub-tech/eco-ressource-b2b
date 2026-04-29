import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../core/constants/api-url';
import { BackendEnterprise } from './reservation-api.service';

export type BackendOrderStatus =
  | 'draft' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export type BackendEcoGrade = 'A' | 'B' | 'C' | 'D' | 'E';

export interface BackendEcoOrder {
  id: number;
  ref: string;
  companyName: string;
  material: string;
  qtyKg: number;
  supplier: string;
  distanceKm: number;
  orderDate: string;             // ISO YYYY-MM-DD
  status: BackendOrderStatus;
  grade: BackendEcoGrade;

  co2Saved?: number | null;
  waterSaved?: number | null;
  wasteAvoided?: number | null;

  enterprise?: BackendEnterprise | null;
  createdAt: string;

  deleted?: boolean | null;
  cancelReason?: string | null;
}

export interface EcoOrderRequest {
  ref?: string;                  // auto-generated server-side if omitted
  companyName: string;
  material: string;
  qtyKg: number;
  supplier: string;
  distanceKm: number;
  orderDate?: string | null;
  status?: BackendOrderStatus;   // defaults to 'draft' if omitted
  grade?: BackendEcoGrade;       // inferred server-side if omitted

  co2Saved?: number | null;
  waterSaved?: number | null;
  wasteAvoided?: number | null;

  enterpriseId?: number | null;
}

@Injectable({ providedIn: 'root' })
export class EcoOrderApiService {
  private readonly baseUrl = `${API_URL}/eco-orders`;

  constructor(private readonly http: HttpClient) {}

  list(includeDeleted = false): Observable<BackendEcoOrder[]> {
    const params = new HttpParams().set('includeDeleted', String(includeDeleted));
    return this.http.get<BackendEcoOrder[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<BackendEcoOrder> {
    return this.http.get<BackendEcoOrder>(`${this.baseUrl}/${id}`);
  }

  create(req: EcoOrderRequest): Observable<BackendEcoOrder> {
    return this.http.post<BackendEcoOrder>(this.baseUrl, req);
  }

  update(id: number, req: EcoOrderRequest): Observable<BackendEcoOrder> {
    return this.http.put<BackendEcoOrder>(`${this.baseUrl}/${id}`, req);
  }

  /** Workflow: draft → confirmed → shipped → delivered. */
  advance(id: number): Observable<BackendEcoOrder> {
    return this.http.post<BackendEcoOrder>(`${this.baseUrl}/${id}/advance`, {});
  }

  cancel(id: number, reason: string): Observable<BackendEcoOrder> {
    return this.http.post<BackendEcoOrder>(
      `${this.baseUrl}/${id}/cancel`,
      { reason },
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
