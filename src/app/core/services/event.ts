import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AdminApiService,
  EventDto,
  EventSearchRequest,
  EventSearchResponse,
  EventDocumentDto,
  PlatformEventDto,
  PlatformEventRequestPayload
} from './admin-api.service';
import { GenerateDescriptionRequest } from './admin-api.service';


@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private readonly adminApi: AdminApiService) {}

  getEvents(): Observable<EventDto[]> {
    return this.adminApi.getEvents();
  }

  getPlatformEvents(): Observable<PlatformEventDto[]> {
    return this.adminApi.getPlatformEvents();
  }

  getPlatformEvent(id: number): Observable<PlatformEventDto> {
    return this.adminApi.getPlatformEvent(id);
  }

  createPlatformEvent(
    body: PlatformEventRequestPayload
  ): Observable<PlatformEventDto> {
    return this.adminApi.createPlatformEvent(body);
  }

  updatePlatformEvent(
    id: number,
    body: PlatformEventRequestPayload
  ): Observable<PlatformEventDto> {
    return this.adminApi.updatePlatformEvent(id, body);
  }

  deletePlatformEvent(id: number): Observable<void> {
    return this.adminApi.deletePlatformEvent(id);
  }

  uploadEventDocument(eventId: number, file: File): Observable<EventDocumentDto> {
    return this.adminApi.uploadEventDocument(eventId, file);
  }

  getEventDocuments(eventId: number): Observable<EventDocumentDto[]> {
    return this.adminApi.getEventDocuments(eventId);
  }

  deleteEventDocument(documentId: number): Observable<void> {
    return this.adminApi.deleteEventDocument(documentId);
  }

  getNearbyEvents(
    latitude: number,
    longitude: number,
    radius: number = 50.0
  ): Observable<PlatformEventDto[]> {
    return this.adminApi.getNearbyEvents(latitude, longitude, radius);
  }

  searchEvents(searchRequest: EventSearchRequest): Observable<EventSearchResponse> {
    return this.adminApi.searchEvents(searchRequest);
  }

  generateDescription(req: GenerateDescriptionRequest): Observable<{ description: string }> {
  return this.adminApi.generateDescription(req);
}
}
