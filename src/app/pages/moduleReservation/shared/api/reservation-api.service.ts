import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../core/constants/api-url';

export type BackendReservationStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export interface BackendEnterprise {
  id: number;
  companyName?: string;
}

export interface BackendReservation {
  id: number;
  company: string;
  machine: string;
  date: string;
  hours: number;
  startHour: number;
  status: BackendReservationStatus;
  solar: boolean;

  slotId?: number | null;
  enterpriseId?: number | null;
  enterprise?: BackendEnterprise | null;
  createdAt?: string | null;
  co2Saved?: number | null;
  deleted?: boolean | null;
  cancelReason?: string | null;
}

export interface ReservationCreateRequest {
  company: string;
  machine: string;
  date: string;
  hours: number;
  startHour: number;
  status: BackendReservationStatus;
  solar: boolean;

  slotId?: number | null;
  enterpriseId?: number | null;
  co2Saved?: number | null;
}

@Injectable({ providedIn: 'root' })
export class ReservationApiService {
  private readonly baseUrl = `${API_URL}/reservations`;

  constructor(private readonly http: HttpClient) {}

  list(includeDeleted = false): Observable<BackendReservation[]> {
    const params = new HttpParams().set('includeDeleted', String(includeDeleted));
    return this.http.get<BackendReservation[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<BackendReservation> {
    return this.http.get<BackendReservation>(`${this.baseUrl}/${id}`);
  }

  create(req: ReservationCreateRequest): Observable<BackendReservation> {
    return this.http.post<BackendReservation>(this.baseUrl, req);
  }

  update(id: number, req: ReservationCreateRequest): Observable<BackendReservation> {
    return this.http.put<BackendReservation>(`${this.baseUrl}/${id}`, req);
  }

  cancel(id: number, reason: string): Observable<BackendReservation> {
    return this.http.post<BackendReservation>(
      `${this.baseUrl}/${id}/cancel`,
      { reason },
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
