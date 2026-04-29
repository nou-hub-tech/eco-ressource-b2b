import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AiService {

  constructor(private http: HttpClient) {}

  getRecommendation() {
    return this.http.get<any>('/api/ai/recommendations');
  }
}