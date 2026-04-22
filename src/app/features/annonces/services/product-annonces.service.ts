import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Product, ProductRequest } from '../../../core/models/annonces.interfaces';
import { normalizeProduct, unwrapApiArray } from './api-normalize';

@Injectable({ providedIn: 'root' })
export class ProductAnnoncesService {
  private readonly baseUrl = `${environment.apiUrl}/products`;

  constructor(private readonly http: HttpClient) {}

  findAll(category?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    return this.http.get<unknown>(this.baseUrl, { params }).pipe(
      map((body) => unwrapApiArray(body).map(normalizeProduct))
    );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<unknown>(`${this.baseUrl}/${id}`).pipe(
      map((body) => normalizeProduct(body as Record<string, unknown>))
    );
  }

  create(req: ProductRequest): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, req);
  }

  update(id: number, req: ProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, req);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
