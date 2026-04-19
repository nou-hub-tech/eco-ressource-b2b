import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'http://localhost:8080/product';

  constructor(private http: HttpClient) {}


  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}/retrieve-all-products`);
  }
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/retrieve-product/${id}`);
  }
  add(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.api}/add-product`, p);
  }
  update(p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/update-product`, p);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/remove-product/${id}`);
  }
  search(name: string, category: string, materialType: string) {
    return this.http.get<Product[]>(
      `${this.api}/search`,
      {
        params: {
          name,
          category,
          materialType
        }
      }
    );
  }

  getPaginated(page: number, size: number, sortBy: string, direction: string) {
    return this.http.get<any>(`${this.api}/paginated`, {
      params: {
        page,
        size,
        sortBy,
        direction
      }
    });
  }
}