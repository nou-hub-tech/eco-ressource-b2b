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
  date: string;
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

/** Matches Spring `EventStatus` enum names (STRING persistence). */
export type PlatformEventStatus = string;

export interface PlatformEventDto {
  id: number;
  title: string;
  eventDate: string;
  location: string;
  latitude?: number;
  longitude?: number;
  participants: number;
  status: PlatformEventStatus;
  typeLabel: string;
  description?: string;
  createdAt: string;
  distance?: number;
}

export interface EventDocumentDto {
  id: number;
  platformEventId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface PlatformEventRequestPayload {
  title: string;
  eventDate: string;
  location: string;
  latitude?: number;
  longitude?: number;
  participants: number;
  status: string;
  typeLabel: string;
  description?: string;
}

export interface EventSearchRequest {
  searchTerm?: string;
  statuses?: string[];
  dateFrom?: string;
  dateTo?: string;
  minParticipants?: number;
  maxParticipants?: number;
  sortBy: string;
  sortDirection: string;
  page: number;
  size: number;
}

export interface EventSearchResponse {
  content: PlatformEventDto[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
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
  userId?: number;
}

export interface SolidarityAssociationRequest {
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

const REQUEST_TIMEOUT_MS = 10_000;
export interface GenerateDescriptionRequest {
  title: string;
  typeLabel: string;
  location: string;
  eventDate: string;
  currentDescription: string;
}

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

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

  static parseUserNumericId(displayId: string): number {
    const n = displayId.replace(/^USR-/, '');
    return parseInt(n, 10);
  }


  getEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(`${this.apiUrl}/admin/events`);
  }

  getPlatformEvents(): Observable<PlatformEventDto[]> {
    return this.http.get<PlatformEventDto[]>(`${this.apiUrl}/platform-events`);
  }

  getPlatformEvent(id: number): Observable<PlatformEventDto> {
    return this.http.get<PlatformEventDto>(
      `${this.apiUrl}/platform-events/${id}`
    );
  }

  createPlatformEvent(
    body: PlatformEventRequestPayload
  ): Observable<PlatformEventDto> {
    return this.http.post<PlatformEventDto>(
      `${this.apiUrl}/platform-events`,
      body
    );
  }

  updatePlatformEvent(
    id: number,
    body: PlatformEventRequestPayload
  ): Observable<PlatformEventDto> {
    return this.http.put<PlatformEventDto>(
      `${this.apiUrl}/platform-events/${id}`,
      body
    );
  }

  deletePlatformEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/platform-events/${id}`);
  }

  uploadEventDocument(eventId: number, file: File): Observable<EventDocumentDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<EventDocumentDto>(
      `${this.apiUrl}/platform-events/${eventId}/documents`,
      formData
    );
  }

  getEventDocuments(eventId: number): Observable<EventDocumentDto[]> {
    return this.http.get<EventDocumentDto[]>(
      `${this.apiUrl}/platform-events/${eventId}/documents`
    );
  }

  deleteEventDocument(documentId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/platform-events/documents/${documentId}`
    );
  }

  getNearbyEvents(
    latitude: number,
    longitude: number,
    radius: number = 50.0
  ): Observable<PlatformEventDto[]> {
    return this.http.get<PlatformEventDto[]>(
      `${this.apiUrl}/platform-events/nearby`,
      {
        params: {
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          radius: radius.toString()
        }
      }
    );
  }

  searchEvents(searchRequest: EventSearchRequest): Observable<EventSearchResponse> {
    return this.http.post<EventSearchResponse>(
      `${this.apiUrl}/platform-events/search`,
      searchRequest
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

  createAssociation(data: SolidarityAssociationRequest): Observable<SolidarityDto> {
    return this.withTimeout(
      this.http.post<SolidarityDto>(`${this.apiUrl}/solidarity-associations`, data),
      'POST /solidarity-associations'
    );
  }

  updateAssociation(id: number, data: SolidarityAssociationRequest): Observable<SolidarityDto> {
    return this.withTimeout(
      this.http.put<SolidarityDto>(`${this.apiUrl}/solidarity-associations/${id}`, data),
      `PUT /solidarity-associations/${id}`
    );
  }

  deleteAssociation(id: number): Observable<void> {
    return this.withTimeout(
      this.http.delete<void>(`${this.apiUrl}/solidarity-associations/${id}`),
      `DELETE /solidarity-associations/${id}`
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

  deleteDonation(id: number): Observable<void> {
    return this.withTimeout(
      this.http.delete<void>(`${this.apiUrl}/donations/${id}`),
      `DELETE /donations/${id}`
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

  generateDescription(req: GenerateDescriptionRequest): Observable<{ description: string }> {
    return this.http.post<{ description: string }>(
      `${this.apiUrl}/ai/generate-description`,
      req
    );
  }

  publishToFacebook(eventId: number, imageBlob: Blob): Observable<string> {
    const formData = new FormData();
    formData.append('image', imageBlob, 'poster.png');
    return this.http.post(`${this.apiUrl}/platform-events/${eventId}/publish-facebook`, formData,
      { responseType: 'text' });
  }

}
