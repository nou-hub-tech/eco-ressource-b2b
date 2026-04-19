import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id_product?: number;
  name: string;
  category: string;
  materialType: string;
  recyclable: boolean;
  description: string;
  image: string;
  barcode?: string;
  enterpriseId?: number;
}

export interface StockItem {
  idStock?: number;
  quantity: number;
  unitPrice: number;
  status: string;
  location: string;
  unit: string;
  condition: string;
  image?: string;
  expirationDate?: string;
  product?: { id_product?: number; name?: string };
}

@Injectable({ providedIn: 'root' })
export class EnterpriseService {

  private base = 'http://localhost:8080/api/enterprise';

  constructor(private http: HttpClient) {}

  // ── Products ──
  getMyProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}/products`);
  }

  addProduct(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.base}/products`, p);
  }

  updateProduct(id: number, p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.base}/products/${id}`, p);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.base}/products/${id}`);
  }

  // ── Stock ──
  getMyStock(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(`${this.base}/stock`);
  }

  addStockItem(s: StockItem): Observable<StockItem> {
    return this.http.post<StockItem>(`${this.base}/stock`, s);
  }

  updateStockItem(id: number, s: StockItem): Observable<StockItem> {
    return this.http.put<StockItem>(`${this.base}/stock/${id}`, s);
  }

  deleteStockItem(id: number): Observable<any> {
    return this.http.delete(`${this.base}/stock/${id}`);
  }
  uploadImage(file: File): Observable<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post<{ url: string }>('http://localhost:8080/files/upload', formData);
}
}