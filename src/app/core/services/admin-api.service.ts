import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  ReservationDto,
  StockItemDto,
  WalletTransactionDto
} from './listing.service';

export interface AdminUserDto {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: string;
  phone: string;
  city: string;
  joined: string;
  date: string; // For template compatibility
  listings: number;
  orders: number;
  revenue: string;
  verified: boolean;
  avatar: string;
}

export interface EventDto {
  title: string;
  date: string;
  location: string;
  participants: number;
  status: string;
  type: string;
}

export interface SolidarityDto {
  id: number;
  name: string;
  mission: string;
  members: number;
  donations: number;
  statusLabel: string;
  aiInsight: string;
  goalAmount?: number;
}

export interface CreateAssociationRequest {
  name: string;
  mission: string;
  members: number;
  donations: number;
  statusLabel: string;
  aiInsight?: string;
  goalAmount?: number;
}

export interface DonationDto {
  id?: number;
  amount: number;
  message?: string;
  associationId: number;
  userId?: number;
  userName?: string;
  createdAt?: string;
}

const REQUEST_TIMEOUT_MS = 10_000; // 10 seconds — fail fast if backend is unreachable

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  /** Wraps any request with a 10s timeout and detailed console error logging. */
  private withTimeout<T>(obs: Observable<T>, label: string): Observable<T> {
    return obs.pipe(
      timeout({
        each: REQUEST_TIMEOUT_MS,
        with: () => throwError(() => ({
          status: 0,
          error: { message: `Request timed out after ${REQUEST_TIMEOUT_MS / 1000}s` }
        }))
      }),
      catchError((err: HttpErrorResponse | any) => {
        if (err?.status === 0) {
          console.error(`[AdminAPI] ${label} — Backend unreachable or request timed out.`, err);
        } else {
          console.error(`[AdminAPI] ${label} — HTTP ${err?.status}`, err?.error ?? err);
        }
        return throwError(() => err);
      })
    );
  }

  getUsers(): Observable<AdminUserDto[]> {
    return this.withTimeout(
      this.http.get<AdminUserDto[]>(`${this.apiUrl}/users`),
      'GET /users'
    );
  }

  updateUserStatus(id: number, status: string): Observable<AdminUserDto> {
    return this.withTimeout(
      this.http.patch<AdminUserDto>(`${this.apiUrl}/users/${id}/status`, { status }),
      `PATCH /users/${id}/status`
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.withTimeout(
      this.http.delete<void>(`${this.apiUrl}/users/${id}`),
      `DELETE /users/${id}`
    );
  }

  /** Parse USR-001 -> 1 */
  static parseUserNumericId(displayId: string): number {
    const n = displayId.replace(/^USR-/, '');
    return parseInt(n, 10);
  }

  getEvents(): Observable<EventDto[]> {
    return this.withTimeout(
      this.http.get<EventDto[]>(`${this.apiUrl}/platform-events`),
      'GET /platform-events'
    );
  }

  getReservations(): Observable<ReservationDto[]> {
    return this.withTimeout(
      this.http.get<ReservationDto[]>(`${this.apiUrl}/reservations`),
      'GET /reservations'
    );
  }

  getSolidarity(): Observable<SolidarityDto[]> {
    return this.withTimeout(
      this.http.get<SolidarityDto[]>(`${this.apiUrl}/solidarity-associations`),
      'GET /solidarity-associations'
    );
  }

  createSolidarity(data: CreateAssociationRequest): Observable<SolidarityDto> {
    return this.withTimeout(
      this.http.post<SolidarityDto>(`${this.apiUrl}/solidarity-associations`, data),
      'POST /solidarity-associations'
    );
  }

  createDonation(data: DonationDto): Observable<DonationDto> {
    return this.withTimeout(
      this.http.post<DonationDto>(`${this.apiUrl}/donations`, data),
      'POST /donations'
    );
  }

  getDonationsByAssociation(associationId: number): Observable<DonationDto[]> {
    return this.withTimeout(
      this.http.get<DonationDto[]>(`${this.apiUrl}/donations/association/${associationId}`),
      `GET /donations/association/${associationId}`
    );
  }

  getTreasuryTransactions(): Observable<WalletTransactionDto[]> {
    return this.withTimeout(
      this.http.get<WalletTransactionDto[]>(`${this.apiUrl}/wallet-transactions`),
      'GET /wallet-transactions'
    );
  }

  getStockItems(): Observable<StockItemDto[]> {
    return this.withTimeout(
      this.http.get<StockItemDto[]>(`${this.apiUrl}/stock-items`),
      'GET /stock-items'
    );
  }
}


