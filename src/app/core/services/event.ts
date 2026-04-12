import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminApiService, EventDto } from './admin-api.service';

@Injectable({ providedIn: 'root' })
export class EventService {
  constructor(private readonly adminApi: AdminApiService) {}

  getEvents(): Observable<EventDto[]> {
    return this.adminApi.getEvents();
  }
}
