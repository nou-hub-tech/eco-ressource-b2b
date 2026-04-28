import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReclamationService {
  private apiUrl = `${environment.apiUrl}/enterprise/reclamations`;
  private marketUrl = `${environment.apiUrl}/enterprise/market-products`;

  constructor(private http: HttpClient) {}

  analyzeAndCreate(
    stockItemId: number | null,
    productId: number | null,
    description: string,
    damagedQuantity: number,
    damagedUnit: string,
    image: File | null
  ): Observable<any> {
    const formData = new FormData();
    if (stockItemId) formData.append('stockItemId', stockItemId.toString());
    if (productId)   formData.append('productId',   productId.toString());
    formData.append('description',     description);
    formData.append('damagedQuantity', damagedQuantity.toString());
    formData.append('damagedUnit',     damagedUnit);
    if (image) formData.append('image', image);
    return this.http.post(`${this.apiUrl}/analyze-and-create`, formData);
  }

  getMyReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my`);
  }

  getReceivedReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/received`);
  }

  treatReclamation(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/treat`, {});
  }

  getMarketProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.marketUrl);
  }
}