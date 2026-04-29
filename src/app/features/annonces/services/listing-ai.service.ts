import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ListingMarketingRequest,
  ListingMarketingSuggestion
} from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class ListingAiService {
  private readonly apiUrl = `${environment.apiUrl}/listing-ai`;

  constructor(private readonly http: HttpClient) {}

  suggestMarketing(req: ListingMarketingRequest): Observable<ListingMarketingSuggestion> {
    return this.http.post<ListingMarketingSuggestion>(
      `${this.apiUrl}/marketing-suggestions`,
      req
    );
  }
}
