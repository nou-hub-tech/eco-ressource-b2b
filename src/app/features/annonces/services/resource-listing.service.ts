import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { CreateListingRequest, ListingResponse } from '../../../core/models/annonces.interfaces';
import { normalizeListing, unwrapApiArray } from './api-normalize';

@Injectable({ providedIn: 'root' })
export class ResourceListingService {
  private readonly baseUrl = `${environment.apiUrl}/listings`;

  constructor(private readonly http: HttpClient) {}

  create(req: CreateListingRequest): Observable<ListingResponse> {
    return this.http.post<ListingResponse>(this.baseUrl, req);
  }

  findAll(): Observable<ListingResponse[]> {
    return this.http.get<unknown>(this.baseUrl).pipe(
      map((body) => unwrapApiArray(body).map(normalizeListing))
    );
  }

  getById(id: number): Observable<ListingResponse> {
    return this.http.get<unknown>(`${this.baseUrl}/${id}`).pipe(
      map((body) => normalizeListing(body as Record<string, unknown>))
    );
  }

  search(params: {
    type?: string;
    category?: string;
    location?: string;
    maxPrice?: number;
  }): Observable<ListingResponse[]> {
    let httpParams = new HttpParams();
    if (params.type) httpParams = httpParams.set('type', params.type);
    if (params.category) httpParams = httpParams.set('category', params.category);
    if (params.location) httpParams = httpParams.set('location', params.location);
    if (params.maxPrice !== undefined && params.maxPrice !== null) {
      httpParams = httpParams.set('maxPrice', params.maxPrice.toString());
    }
    return this.http.get<unknown>(`${this.baseUrl}/search`, { params: httpParams }).pipe(
      map((body) => unwrapApiArray(body).map(normalizeListing))
    );
  }

  update(id: number, companyId: number, req: CreateListingRequest): Observable<ListingResponse> {
    const httpParams = new HttpParams().set('companyId', companyId.toString());
    return this.http.put<ListingResponse>(`${this.baseUrl}/${id}`, req, { params: httpParams });
  }

  duplicate(id: number): Observable<ListingResponse> {
    return this.http.post<ListingResponse>(`${this.baseUrl}/${id}/duplicate`, {});
  }

  cancel(id: number, companyId: number): Observable<void> {
    const httpParams = new HttpParams().set('companyId', companyId.toString());
    return this.http.put<void>(`${this.baseUrl}/${id}/cancel`, {}, { params: httpParams });
  }
}
