import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { API_URL } from '../app/core/constants/api-url';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiService {
  private readonly baseUrl = `${API_URL}/ai/recommendations`;

  constructor(private http: HttpClient) {}

  getRecommendation(params?: Record<string, string | number | boolean | null | undefined>): Observable<unknown> {
    let httpParams = new HttpParams();

    for (const [key, value] of Object.entries(params ?? {})) {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return this.http.get<unknown>(this.baseUrl, { params: httpParams });
  }
}
