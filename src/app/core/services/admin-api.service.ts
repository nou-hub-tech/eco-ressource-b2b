import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/api-url';
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
  private readonly apiUrl = API_URL;

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

  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(`${this.apiUrl}/platform-events`);
  }

  getReservations(): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(
      `${this.apiUrl}/reservations`
    );
  }

  getSolidarity(): Observable<SolidarityDto[]> {
    return this.http.get<SolidarityDto[]>(`${this.apiUrl}/solidarity-associations`);
  }

  getTreasuryTransactions(): Observable<WalletTransactionDto[]> {
    return this.http.get<WalletTransactionDto[]>(
      `${this.apiUrl}/wallet-transactions`
    );
  }

  getStockItems(): Observable<StockItemDto[]> {
    return this.http.get<StockItemDto[]>(`${this.apiUrl}/stock-items`);
  }
}
