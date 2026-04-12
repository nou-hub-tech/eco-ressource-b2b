import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/finance.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {

  private API = '/api/invoices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.API}/all`);
  }

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.API}/${id}`);
  }

  add(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.API}/add`, invoice);
  }

  update(invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.API}/update`, invoice);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }

  /** Marque la facture comme PAID (appelé à la confirmation de livraison) */
  markPaid(id: number): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.API}/mark-paid/${id}`, {});
  }
}

