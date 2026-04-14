import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventParticipationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  list(userId?: string): Observable<unknown[]> {
    const options =
      userId != null && userId !== ''
        ? { params: { userId } as Record<string, string> }
        : {};
    return this.http.get<unknown[]>(
      `${this.apiUrl}/event-participations`,
      options
    );
  }

  getById(id: number): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/event-participations/${id}`);
  }

  create(body: { userId: number; platformEventId: number }): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/event-participations`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/event-participations/${id}`);
  }
}
