import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../core/constants/api-url';
import { BackendEnterprise } from './reservation-api.service';

export type BackendSlotStatus = 'open' | 'booked' | 'blocked';

export interface BackendReservationSlot {
  id: number;
  machine: string;
  date: string;            // ISO YYYY-MM-DD
  startHour: number;       // 0..23
  endHour: number;         // 1..24
  status: BackendSlotStatus;
  solar: boolean;
  discountPct: number;
  owner: string;
  reservedBy?: string | null;

  enterprise?: BackendEnterprise | null;
  createdAt: string;

  deleted?: boolean | null;
  cancelReason?: string | null;
}

export interface SlotRequest {
  machine: string;
  date: string;
  startHour: number;
  endHour: number;
  status?: BackendSlotStatus;     // defaults to 'open'
  solar: boolean;
  discountPct?: number;
  owner: string;
  reservedBy?: string | null;
  enterpriseId?: number | null;
}

@Injectable({ providedIn: 'root' })
export class ReservationSlotApiService {
  private readonly baseUrl = `${API_URL}/reservation-slots`;

  constructor(private readonly http: HttpClient) {}

  list(includeDeleted = false): Observable<BackendReservationSlot[]> {
    const params = new HttpParams().set('includeDeleted', String(includeDeleted));
    return this.http.get<BackendReservationSlot[]>(this.baseUrl, { params });
  }

  /** Heatmap range query (any enterprise, server-filtered by date). */
  range(from: string, to: string): Observable<BackendReservationSlot[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<BackendReservationSlot[]>(`${this.baseUrl}/range`, { params });
  }

  getById(id: number): Observable<BackendReservationSlot> {
    return this.http.get<BackendReservationSlot>(`${this.baseUrl}/${id}`);
  }

  create(req: SlotRequest): Observable<BackendReservationSlot> {
    return this.http.post<BackendReservationSlot>(this.baseUrl, req);
  }

  update(id: number, req: SlotRequest): Observable<BackendReservationSlot> {
    return this.http.put<BackendReservationSlot>(`${this.baseUrl}/${id}`, req);
  }

  /** Drag-&-drop assignment from the heatmap. */
  book(id: number, reservedBy: string): Observable<BackendReservationSlot> {
    return this.http.post<BackendReservationSlot>(
      `${this.baseUrl}/${id}/book`,
      { reservedBy },
    );
  }

  /** Toggle open ↔ blocked. */
  toggle(id: number): Observable<BackendReservationSlot> {
    return this.http.post<BackendReservationSlot>(`${this.baseUrl}/${id}/toggle`, {});
  }

  cancel(id: number, reason: string): Observable<BackendReservationSlot> {
    return this.http.post<BackendReservationSlot>(
      `${this.baseUrl}/${id}/cancel`,
      { reason },
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
