import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { FavoriteResponse } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  add(listingId: number): Observable<FavoriteResponse> {
    return this.http.post<FavoriteResponse>(
      `${this.apiUrl}/listings/${listingId}/favorite`,
      {}
    ).pipe(catchError(() => of({} as FavoriteResponse)));
  }

  remove(listingId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/listings/${listingId}/favorite`
    ).pipe(catchError(() => of(undefined as unknown as void)));
  }

  myFavorites(): Observable<FavoriteResponse[]> {
    return this.http.get<FavoriteResponse[]>(`${this.apiUrl}/favorites/me`)
      .pipe(catchError(() => of([])));
  }
}
