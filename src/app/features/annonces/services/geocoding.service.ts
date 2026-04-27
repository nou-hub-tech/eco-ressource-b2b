import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GeocodingResponse } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class GeocodingService {
  private readonly baseUrl = `${environment.apiUrl}/geocoding`;

  constructor(private readonly http: HttpClient) {}

  geocode(query: string): Observable<GeocodingResponse> {
    const params = new HttpParams().set('q', query);
    return this.http.get<GeocodingResponse>(this.baseUrl, { params });
  }
}
