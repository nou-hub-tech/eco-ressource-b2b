import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BrokenProductService {
  private api = 'http://localhost:8080/broken-product';

  constructor(private http: HttpClient) {}

  detect(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post<any>(`${this.api}/detect`, formData);
  }
}