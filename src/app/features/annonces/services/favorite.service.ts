import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../core/constants/api-url';
import { FavoriteResponse } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly apiUrl = API_URL;

  constructor(private readonly http: HttpClient) {}

  add(listingId: number): Observable<FavoriteResponse> {
    return this.http.post<FavoriteResponse>(
      `${this.apiUrl}/resource-listings/${listingId}/favorite`,
      {}
    );
  }

  remove(listingId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/resource-listings/${listingId}/favorite`
    );
  }

  myFavorites(): Observable<FavoriteResponse[]> {
    return this.http.get<FavoriteResponse[]>(`${this.apiUrl}/favorites/me`);
  }
}
