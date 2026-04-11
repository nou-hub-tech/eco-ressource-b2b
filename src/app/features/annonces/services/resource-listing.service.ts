import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateListingRequest, ListingResponse } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class ResourceListingService {
  private readonly baseUrl = `${environment.apiUrl}/resource-listings`;

  constructor(private readonly http: HttpClient) {}

  create(req: CreateListingRequest): Observable<ListingResponse> {
    return this.http.post<ListingResponse>(this.baseUrl, req);
  }

  findAll(): Observable<ListingResponse[]> {
    return this.http.get<ListingResponse[]>(this.baseUrl);
  }

  getById(id: number): Observable<ListingResponse> {
    return this.http.get<ListingResponse>(`${this.baseUrl}/${id}`);
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
    return this.http.get<ListingResponse[]>(`${this.baseUrl}/search`, { params: httpParams });
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
