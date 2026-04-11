import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  status: string;
  ai: string;
}

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<AdminUserDto[]> {
    return this.http.get<AdminUserDto[]>(`${this.apiUrl}/users`);
  }

  updateUserStatus(id: number, status: string): Observable<AdminUserDto> {
    return this.http.patch<AdminUserDto>(
      `${this.apiUrl}/users/${id}/status`,
      { status }
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  /** Parse USR-001 -> 1 */
  static parseUserNumericId(displayId: string): number {
    const n = displayId.replace(/^USR-/, '');
    return parseInt(n, 10);
  }

  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(`${this.apiUrl}/admin/events`);
  }

  getReservations(): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(
      `${this.apiUrl}/admin/reservations`
    );
  }

  getSolidarity(): Observable<SolidarityDto[]> {
    return this.http.get<SolidarityDto[]>(`${this.apiUrl}/admin/solidarity`);
  }

  getTreasuryTransactions(): Observable<WalletTransactionDto[]> {
    return this.http.get<WalletTransactionDto[]>(
      `${this.apiUrl}/admin/treasury/transactions`
    );
  }

  getStockItems(): Observable<StockItemDto[]> {
    return this.http.get<StockItemDto[]>(`${this.apiUrl}/admin/stock/items`);
  }
}
