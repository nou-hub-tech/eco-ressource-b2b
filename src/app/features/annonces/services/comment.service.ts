import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../core/constants/api-url';
import { CreateCommentRequest, CommentResponse } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly apiUrl = API_URL;

  constructor(private readonly http: HttpClient) {}

  create(listingId: number, req: CreateCommentRequest): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      `${this.apiUrl}/resource-listings/${listingId}/comments`,
      req
    );
  }

  findByListing(listingId: number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(
      `${this.apiUrl}/resource-listings/${listingId}/comments`
    );
  }

  update(commentId: number, req: CreateCommentRequest): Observable<CommentResponse> {
    return this.http.put<CommentResponse>(
      `${this.apiUrl}/comments/${commentId}`,
      req
    );
  }

  delete(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${commentId}`);
  }
}
