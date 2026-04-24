import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/finance.model';

// ══════════════════════════════════════════════════════════════
//  MODÈLES — Analyse IA Risque (legacy)
// ══════════════════════════════════════════════════════════════
export interface InvoiceRisk {
  invoiceId:         number;
  invoiceNumber:     string;
  clientName:        string;
  project:           string;
  amount:            number;
  issueDate:         string;
  daysOverdue:       number;
  riskScore:         number;
  riskLevel:         string;
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
  riskLevel:       string;
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
  globalRiskLevel: string;
}
export interface RiskReport {
  invoiceRisks:    InvoiceRisk[];
  clientRisks:     ClientRisk[];
  summary:         RiskSummary;
  recommendations: string[];
}

// ══════════════════════════════════════════════════════════════
//  MODÈLES — Analyse IA Solvabilité Avancée (nouveau)
// ══════════════════════════════════════════════════════════════

/** Profil complet de solvabilité d'un client — Credit Rating bancaire */
export interface ClientSolvabilityProfile {
  clientName:           string;
  totalInvoices:        number;
  paidInvoices:         number;
  unpaidInvoices:       number;
  overdueInvoices:      number;
  totalAmount:          number;
  unpaidAmount:         number;
  recoveryRate:         number;  // % factures payées
  avgDso:               number;  // jours moyens pour payer
  debtRatio:            number;  // % endettement
  regularityScore:      number;  // 0-100
  trendScore:           number;  // 0-100
  solvabilityScore:     number;  // 0-100
  creditRating:         string;  // AAA / AA / A / BBB / BB / B / CCC
  ratingDescription:    string;
  paymentProbability:   number;  // % probabilité prochain paiement
  maxDaysOverdue:       number;
}

/** Prédiction de paiement par facture impayée */
export interface InvoicePaymentPrediction {
  invoiceId:               number;
  invoiceNumber:           string;
  clientName:              string;
  project:                 string;
  amount:                  number;
  issueDate:               string;
  daysOverdue:             number;
  paymentProbability:      number;  // % probabilité d'être payée
  prediction:              string;  // texte descriptif
  urgency:                 string;  // CRITIQUE / HAUTE / MOYENNE / FAIBLE
  estimatedPaymentDate:    string;
  clientRating:            string;  // credit rating du client
  clientSolvabilityScore:  number;
}

/** Santé globale du portefeuille */
export interface PortfolioHealth {
  totalInvoices:       number;
  paidInvoices:        number;
  unpaidInvoices:      number;
  totalRevenue:        number;
  collectedRevenue:    number;
  atRiskAmount:        number;      // montant à risque fort (prob < 40%)
  expectedInflow:      number;      // encaissements prévisionnels
  avgSolvabilityScore: number;
  portfolioRating:     string;      // rating global du portefeuille
  criticalClients:     number;
  excellentClients:    number;
  totalClients:        number;
  ratingDistribution:  Record<string, number>;
}

/** Conseil stratégique généré par l'IA */
export interface StrategicAdvice {
  severity:    string;  // CRITIQUE / HAUTE / MOYENNE / INFO
  title:       string;
  description: string;
  action:      string;
}

/** Rapport complet de solvabilité */
export interface SolvabilityReport {
  clientProfiles:     ClientSolvabilityProfile[];
  paymentPredictions: InvoicePaymentPrediction[];
  portfolioHealth:    PortfolioHealth;
  strategicAdvices:   StrategicAdvice[];
}

// ══════════════════════════════════════════════════════════════
//  SERVICE
// ══════════════════════════════════════════════════════════════
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

  markPaid(id: number): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.API}/mark-paid/${id}`, {});
  }

  /** 🤖 Analyse IA risque simple (backward compat) */
  getRiskReport(): Observable<RiskReport> {
    return this.http.get<RiskReport>(`${this.API}/ai-risk`);
  }

  /** 🏦 Analyse IA avancée — Solvabilité & Prédiction de paiement */
  getSolvabilityReport(): Observable<SolvabilityReport> {
    return this.http.get<SolvabilityReport>(`${this.API}/ai-solvability`);
  }
}
