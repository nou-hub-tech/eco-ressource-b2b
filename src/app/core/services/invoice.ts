import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/finance.model';

// ── Modèles pour l'analyse IA des risques ──────────────────────
export interface InvoiceRisk {
  invoiceId:         number;
  invoiceNumber:     string;
  clientName:        string;
  project:           string;
  amount:            number;
  issueDate:         string;
  daysOverdue:       number;
  riskScore:         number;
  riskLevel:         'CRITIQUE' | 'ÉLEVÉ' | 'MOYEN' | 'FAIBLE';
  recommendedAction: string;
}

export interface ClientRisk {
  clientName:      string;
  totalInvoices:   number;
  unpaidInvoices:  number;
  overdueInvoices: number;
  totalAmount:     number;
  unpaidAmount:    number;
  unpaidRate:      number;
  riskScore:       number;
  riskLevel:       'CRITIQUE' | 'ÉLEVÉ' | 'MOYEN' | 'FAIBLE';
}

export interface RiskSummary {
  totalInvoices:   number;
  paidInvoices:    number;
  unpaidInvoices:  number;
  overdueCount:    number;
  unpaidAmount:    number;
  criticalCount:   number;
  elevatedCount:   number;
  mediumCount:     number;
  lowCount:        number;
  globalRiskScore: number;
  globalRiskLevel: 'CRITIQUE' | 'ÉLEVÉ' | 'MOYEN' | 'FAIBLE';
}

export interface RiskReport {
  invoiceRisks:    InvoiceRisk[];
  clientRisks:     ClientRisk[];
  summary:         RiskSummary;
  recommendations: string[];
}
// ──────────────────────────────────────────────────────────────

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

  /** 🤖 Analyse IA — Détection des risques factures & clients */
  getRiskReport(): Observable<RiskReport> {
    return this.http.get<RiskReport>(`${this.API}/ai-risk`);
  }
}
