import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AdminApiService,
  EventDto,
  PlatformEventDto,
  PlatformEventRequestPayload
} from './admin-api.service';

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

  getNearbyEvents(
    latitude: number,
    longitude: number,
    radius: number = 50.0
  ): Observable<PlatformEventDto[]> {
    return this.adminApi.getNearbyEvents(latitude, longitude, radius);
  }
}
