import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ListingDto {
  id: number;
  title: string;
  company?: string;
  category: string;
  price: number;
  qty?: string;
  status: string;
  ai?: string;
  views?: number;
  enquiries?: number;
  posted?: string;
  sub?: string;
  initials?: string;
  priceDisplay?: string;
  match: number; // Required for template comparisons
  verified?: boolean; // Changed from string to boolean
  rating?: string;
  time?: string;
  enq: number; // Alias for enquiries for template compatibility
  trend?: boolean; // For template trend indicator
  specs?: Array<{ k: string; v: string }>; // For hero slide specifications
  btnColor?: string; // For hero slide button color
  // Hero slide specific properties
  tag?: string;
  tagColor?: string;
  titleAccent?: string;
  accentColor?: string;
  coColor?: string;
  location?: string;
  matchColor?: string;
}

export interface CreateListingPayload {
  title: string;
  category: string;
  price: number;
  quantityLabel: string;
  status: string;
  aiInsight?: string;
}

export interface StockItemDto {
  id: number;
  name: string;
  category: string;
  qty: number;
  unit: string;
  condition: string;
  status: string;
  ai: string;
}

export interface ExchangeRequestDto {
  id: string;
  from: string;
  avatar: string;
  item: string;
  type: string;
  from_date: string;
  to_date: string;
  duration: string;
  price: number;
  message: string;
  status: string;
  received: string;
  urgent: boolean;
}

export interface ReservationDto {
  id: string;
  type: string;
  item: string;
  company?: string;
  from: string;
  to: string;
  price: number;
  status: string;
}

export interface WalletTransactionDto {
  id: string;
  label: string;
  type: string;
  amount: number;
  positive: boolean | null;
  status: string;
  date: string;
  from?: string;
  to?: string;
}

@Injectable({ providedIn: 'root' })
export class ListingService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getAllListings(): Observable<ListingDto[]> {
    return this.http.get<ListingDto[]>(`${this.apiUrl}/listings`);
  }

  getMyListings(): Observable<ListingDto[]> {
    return this.http.get<ListingDto[]>(`${this.apiUrl}/listings/my`);
  }

  createListing(body: CreateListingPayload): Observable<ListingDto> {
    return this.http.post<ListingDto>(`${this.apiUrl}/listings/create`, body);
  }

  updateListing(id: number, body: CreateListingPayload): Observable<ListingDto> {
    return this.http.put<ListingDto>(`${this.apiUrl}/listings/${id}`, body);
  }

  deleteListing(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/listings/${id}`);
  }

  moderateListing(id: number, status: string): Observable<ListingDto> {
    return this.http.patch<ListingDto>(
      `${this.apiUrl}/listings/${id}/moderate`,
      { status }
    );
  }

  getMyStock(): Observable<StockItemDto[]> {
    return this.http.get<StockItemDto[]>(`${this.apiUrl}/listings/stock/my`);
  }

  getExchangeRequests(): Observable<ExchangeRequestDto[]> {
    return this.http.get<ExchangeRequestDto[]>(
      `${this.apiUrl}/listings/exchange-requests`
    );
  }

  updateExchangeRequest(id: number, status: string): Observable<ExchangeRequestDto> {
    return this.http.patch<ExchangeRequestDto>(
      `${this.apiUrl}/listings/exchange-requests/${id}`,
      { status }
    );
  }

  getMyReservations(): Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>(
      `${this.apiUrl}/listings/reservations/my`
    );
  }

  getWalletTransactions(): Observable<WalletTransactionDto[]> {
    return this.http.get<WalletTransactionDto[]>(
      `${this.apiUrl}/listings/wallet/transactions`
    );
  }
}
