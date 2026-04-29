import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../core/constants/api-url';

/* ============================================================
   API contract — mirrors the Spring Boot Reservation entity.
   Field names are kept identical to the backend so no mapping
   layer is needed: drop these objects straight into the
   existing components.
============================================================ */

export type BackendReservationStatus =
  | 'confirmed' | 'active' | 'pending' | 'completed' | 'cancelled';

export interface BackendEnterprise {
  id: number;
  companyName?: string;
}

export interface BackendReservation {
  id: number;

  // legacy/generic fields
  typeLabel: string;
  item: string;
  companyName: string;
  fromDate: string;       // ISO YYYY-MM-DD
  toDate: string;
  price: number;          // BigDecimal serialised as number
  status: BackendReservationStatus;
  enterprise?: BackendEnterprise | null;
  createdAt: string;

  // eco extensions
  machine?: string | null;
  hours?: number | null;
  startHour?: number | null;
  solar?: boolean | null;
  co2Saved?: number | null;

  // soft delete
  deleted?: boolean | null;
  cancelReason?: string | null;
}

export interface ReservationCreateRequest {
  typeLabel: string;
  item: string;
  companyName: string;
  fromDate: string;
  toDate: string;
  price: number;
  status: BackendReservationStatus;
  enterpriseId?: number | null;

  machine?: string | null;
  hours?: number | null;
  startHour?: number | null;
  solar?: boolean | null;
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

  /** Soft delete with audit reason (frontend "cancel" button). */
  cancel(id: number, reason: string): Observable<BackendReservation> {
    return this.http.post<BackendReservation>(
      `${this.baseUrl}/${id}/cancel`,
      { reason },
    );
  }

  /** Hard delete — kept for admin/cleanup. */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
