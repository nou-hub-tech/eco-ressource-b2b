import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { FinanceTransaction, EscrowEntry, TreasurySummary } from '../models/finance.model';

export interface EnterpriseDto {
  id: number;
  companyName: string;
  taxId: string;
  sector: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private API = '/api';

  constructor(private http: HttpClient) {}

  // ================= ENTERPRISES =================
  getEnterprises(): Observable<EnterpriseDto[]> {
    return this.http.get<any[]>(`${this.API}/enterprise/list`).pipe(
      map(list => list.map(e => ({
        id:          e.id          ?? e.idEnterprise ?? e.identerprise ?? 0,
        companyName: e.companyName ?? e.company_name ?? e.name         ?? '',
        taxId:       e.taxId       ?? e.tax_id       ?? e.fiscalId     ?? e.articleFiscal ?? e.matricule ?? e.identifiantFiscal ?? '',
        sector:      e.sector      ?? '',
      })))
    );
  }


  // ================= TRANSACTIONS =================

  getTransactions(): Observable<FinanceTransaction[]> {
    return this.http.get<any[]>(`${this.API}/transactions/all`).pipe(
      map((items) => items.map((tx) => ({
        id: tx.id ?? tx.idtransaction,
        project: tx.project,
        type: tx.type,
        amount: tx.amount,
        status: tx.status,
        date: tx.date,
      })))
    );
  }

  /** 🏢 Transactions de l'entreprise connectee seulement */
  getMyTransactions(): Observable<FinanceTransaction[]> {
    return this.http.get<any[]>(`${this.API}/transactions/my`).pipe(
      map((items) => items.map((tx) => ({
        id: tx.id ?? tx.idtransaction,
        project: tx.project,
        type: tx.type,
        amount: tx.amount,
        status: tx.status,
        date: tx.date,
      })))
    );
  }

  private toTransactionPayload(tx: FinanceTransaction): any {
    return {
      idtransaction: tx.id,
      project: tx.project,
      type: tx.type?.toUpperCase?.() ?? tx.type,
      amount: tx.amount,
      status: tx.status?.toUpperCase?.() ?? tx.status,
      date: tx.date,
    };
  }

  addTransaction(tx: FinanceTransaction): Observable<FinanceTransaction> {
    const payload = this.toTransactionPayload(tx);
    return this.http.post<FinanceTransaction>(`${this.API}/transactions/add`, payload);
  }

  updateTransaction(tx: FinanceTransaction): Observable<FinanceTransaction> {
    const payload = this.toTransactionPayload(tx);
    return this.http.put<FinanceTransaction>(`${this.API}/transactions/update`, payload);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/transactions/delete/${id}`);
  }

  // ================= ESCROW =================

  getEscrow(): Observable<EscrowEntry[]> {
    return this.http.get<any[]>(`${this.API}/escrow/all`).pipe(
      map((items) => items.map((esc) => ({
        id: esc.id ?? esc.idescrow,
        project: esc.project,
        amount: esc.amount,
        status: esc.status,
        createdAt: esc.createdAt,
        releaseDate: esc.releaseDate,
      })))
    );
  }

  /** 🏢 Escrows de l'entreprise connectee seulement */
  getMyEscrow(): Observable<EscrowEntry[]> {
    return this.http.get<any[]>(`${this.API}/escrow/my`).pipe(
      map((items) => items.map((esc) => ({
        id: esc.id ?? esc.idescrow,
        project: esc.project,
        amount: esc.amount,
        status: esc.status,
        createdAt: esc.createdAt,
        releaseDate: esc.releaseDate,
      })))
    );
  }

  private toEscrowPayload(e: EscrowEntry): any {
    return {
      idescrow: e.id,
      project: e.project,
      amount: e.amount,
      status: e.status?.toUpperCase?.() ?? e.status,
      createdAt: e.createdAt,
      releaseDate: e.releaseDate,
    };
  }

  addEscrow(e: EscrowEntry): Observable<EscrowEntry> {
    const payload = this.toEscrowPayload(e);
    return this.http.post<EscrowEntry>(`${this.API}/escrow/add`, payload);
  }

  updateEscrow(e: EscrowEntry): Observable<EscrowEntry> {
    const payload = this.toEscrowPayload(e);
    return this.http.put<EscrowEntry>(`${this.API}/escrow/update`, payload);
  }

  deleteEscrow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/escrow/delete/${id}`);
  }

  /** Libère un escrow LOCKED → RELEASED (appelé à la confirmation de livraison) */
  releaseEscrow(id: number): Observable<EscrowEntry> {
    return this.http.post<EscrowEntry>(`${this.API}/escrow/release/${id}`, {});
  }


  // ================= DASHBOARD =================

  getSummary(): Observable<TreasurySummary> {
    return this.http.get<any>(`${this.API}/finance/treasury-summary`).pipe(
      map((data) => ({
        cashOnHand: data.cashOnHand ?? data.netCash ?? 0,
        escrowBalance: data.escrowBalance ?? data.totalEscrow ?? 0,
        receivables: data.receivables ?? 0,
        payables: data.payables ?? 0,
        netBalance: data.netBalance ?? data.totalTransactions ?? 0,
        daysCashOnHand: data.daysCashOnHand ?? 0,
      }))
    );
  }

}


