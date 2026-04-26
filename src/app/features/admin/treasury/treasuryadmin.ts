import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FinanceService } from '../../../core/services/finance';
import { InvoiceService } from '../../../core/services/invoice';
import {
  FinanceTransaction, EscrowEntry, EscrowStatus,
  Invoice, TransactionType
} from '../../../core/models/finance.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-treasuryadmin',
  standalone: false,
  templateUrl: './treasuryadmin.html',
  styleUrls: ['./treasuryadmin.css'],
  encapsulation: ViewEncapsulation.None
})
export class TreasuryAdmin implements OnInit {

  /* ── State ─────────────────────────────────────── */
  transactions: FinanceTransaction[] = [];
  escrowEntries: EscrowEntry[]       = [];
  invoices: Invoice[]                = [];
  loading = true;
  erreur  = '';
  /* ── Entreprises ── */
  compSearch = '';
  compSort: 'revenue' | 'expenses' | 'net' | 'name' = 'revenue';
  selectedCompany: string | null = null;

  /* ── Toast ──────────────────────────────────────── */
  toastMsg     = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  toastVisible = false;
  private _timer: any;

  constructor(
    private financeService: FinanceService,
    private invoiceService: InvoiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.loadData(); }

  /* ════════════ LOAD ════════════ */
  loadData(): void {
    this.loading = true;
    this.erreur   = '';
    forkJoin({
      tx:  this.financeService.getTransactions().pipe(catchError(() => of([] as FinanceTransaction[]))),
      esc: this.financeService.getEscrow().pipe(catchError(()         => of([] as EscrowEntry[]))),
      inv: this.invoiceService.getAll().pipe(catchError(()            => of([] as Invoice[]))),
    }).subscribe({
      next: ({ tx, esc, inv }) => {
        this.transactions  = tx;
        this.escrowEntries = esc;
        this.invoices      = inv;
        this.loading       = false;
        if (!tx.length && !esc.length && !inv.length) {
          this.erreur = 'Accès refusé ou aucune donnée disponible (403)';
        }
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.erreur  = 'Erreur serveur — vérifiez vos droits d\'accès';
        this.cdr.detectChanges();
      }
    });
  }

  /* ════════════ KPI ════════════ */
  private INCOMING = [
    TransactionType.PAYMENT,
    TransactionType.REFUND,
    TransactionType.LOAN
  ] as string[];

  isIn(type: string | TransactionType): boolean {
    return this.INCOMING.includes(type as string);
  }

  get totalTxIn():  number { return this.transactions.filter(t => this.isIn(t.type)).reduce((s, t) => s + (t.amount || 0), 0); }
  get totalTxOut(): number { return this.transactions.filter(t => !this.isIn(t.type)).reduce((s, t) => s + (t.amount || 0), 0); }
  get netBalance(): number { return this.totalTxIn - this.totalTxOut; }
  get countTxIn():  number { return this.transactions.filter(t => this.isIn(t.type)).length; }
  get countTxOut(): number { return this.transactions.filter(t => !this.isIn(t.type)).length; }

  get totalEscrowLocked():   number { return this.escrowEntries.filter(e => e.status === EscrowStatus.LOCKED).reduce((s, e) => s + (e.amount || 0), 0); }
  get totalEscrowReleased(): number { return this.escrowEntries.filter(e => e.status === EscrowStatus.RELEASED).reduce((s, e) => s + (e.amount || 0), 0); }
  get escrowLockedCount():   number { return this.escrowEntries.filter(e => e.status === EscrowStatus.LOCKED).length; }
  get escrowReleasedCount(): number { return this.escrowEntries.filter(e => e.status === EscrowStatus.RELEASED).length; }
  get escrowDisputedCount(): number { return this.escrowEntries.filter(e => e.status === EscrowStatus.DISPUTED).length; }

  get salesInvoices():    Invoice[] { return this.invoices.filter(i => i.invoiceType === 'VENTE'); }
  get purchaseInvoices(): Invoice[] { return this.invoices.filter(i => i.invoiceType === 'ACHAT'); }
  get totalRevenue():  number { return this.salesInvoices.filter(i => i.status === 'PAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }
  get totalExpenses(): number { return this.purchaseInvoices.filter(i => i.status === 'PAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }
  get totalUnpaid():   number { return this.invoices.filter(i => i.status === 'UNPAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }
  get globalMargin():  number { return this.totalRevenue - this.totalExpenses; }
  get globalMarginRate(): number { return this.totalRevenue > 0 ? (this.globalMargin / this.totalRevenue) * 100 : 0; }

  get topClients(): { name: string; amount: number; count: number }[] {
    const map = new Map<string, { amount: number; count: number }>();
    this.salesInvoices.forEach(i => {
      const k = i.clientName || 'Inconnu';
      const v = map.get(k) || { amount: 0, count: 0 };
      v.amount += (i.amountTTC || 0); v.count++;
      map.set(k, v);
    });
    return [...map.entries()].map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.amount - a.amount).slice(0, 7);
  }

  get topSellers(): { name: string; amount: number; count: number }[] {
    const map = new Map<string, { amount: number; count: number }>();
    this.salesInvoices.forEach(i => {
      const k = i.sellerName || 'Inconnu';
      const v = map.get(k) || { amount: 0, count: 0 };
      v.amount += (i.amountTTC || 0); v.count++;
      map.set(k, v);
    });
    return [...map.entries()].map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.amount - a.amount).slice(0, 7);
  }

  /* ════════════ ENTREPRISES ════════════ */
  get companySummary(): {
    name: string;
    sales: number; revenue: number; paidSales: number;
    purchases: number; expenses: number;
    unpaid: number; net: number;
    escrow: number; escrowAmt: number;
  }[] {
    // Collect all unique company names (seller + buyer)
    const names = new Set<string>();
    this.invoices.forEach(i => {
      if (i.sellerName) names.add(i.sellerName);
      if (i.clientName) names.add(i.clientName);
    });

    const result = [...names].map(name => {
      // As SELLER (VENTE)
      const ventes = this.invoices.filter(i => i.invoiceType === 'VENTE' && i.sellerName === name);
      const revenue  = ventes.filter(i => i.status === 'PAID').reduce((s, i) => s + (i.amountTTC || 0), 0);
      const unpaidV  = ventes.filter(i => i.status === 'UNPAID').reduce((s, i) => s + (i.amountTTC || 0), 0);

      // As BUYER (ACHAT)
      const achats  = this.invoices.filter(i => i.invoiceType === 'ACHAT' && i.clientName === name);
      const expenses = achats.filter(i => i.status === 'PAID').reduce((s, i) => s + (i.amountTTC || 0), 0);
      const unpaidA  = achats.filter(i => i.status === 'UNPAID').reduce((s, i) => s + (i.amountTTC || 0), 0);

      // Escrow
      const escrowItems = this.escrowEntries.filter(e => e.project?.includes(name));
      const escrowAmt   = escrowItems.filter(e => e.status === EscrowStatus.LOCKED).reduce((s, e) => s + (e.amount || 0), 0);

      return {
        name,
        sales: ventes.length, revenue, paidSales: ventes.filter(i => i.status === 'PAID').length,
        purchases: achats.length, expenses,
        unpaid: unpaidV + unpaidA,
        net: revenue - expenses,
        escrow: escrowItems.length, escrowAmt
      };
    });

    // Filter + sort
    const q = this.compSearch.toLowerCase();
    const filtered = q ? result.filter(c => c.name.toLowerCase().includes(q)) : result;

    return filtered.sort((a, b) => {
      if (this.compSort === 'name')     return a.name.localeCompare(b.name);
      if (this.compSort === 'expenses') return b.expenses - a.expenses;
      if (this.compSort === 'net')      return b.net - a.net;
      return b.revenue - a.revenue; // default: revenue
    });
  }

  get totalCompanies(): number {
    const names = new Set<string>();
    this.invoices.forEach(i => {
      if (i.sellerName) names.add(i.sellerName);
      if (i.clientName) names.add(i.clientName);
    });
    return names.size;
  }

  /* ════════════ COMPANY DETAILS ════════════ */
  get selectedCompanyInvoices(): Invoice[] {
    if (!this.selectedCompany) return [];
    return this.invoices.filter(i => i.sellerName === this.selectedCompany || i.clientName === this.selectedCompany);
  }

  get selectedCompanyEscrow(): EscrowEntry[] {
    if (!this.selectedCompany) return [];
    return this.escrowEntries.filter(e => e.project?.includes(this.selectedCompany!));
  }

  get selectedCompanyTx(): FinanceTransaction[] {
    if (!this.selectedCompany) return [];
    return this.transactions.filter(t => t.project?.includes(this.selectedCompany!));
  }

  selectCompany(name: string): void {
    this.selectedCompany = name;
  }

  closeCompanyDetails(): void {
    this.selectedCompany = null;
  }

  /* ════════════ HELPERS ════════════ */
  typeLabel(type: string | TransactionType): string {
    const m: Record<string, string> = {
      PAYMENT: '💳 Paiement', REFUND: '↩️ Remboursement', LOAN: '🏦 Prêt',
      DISBURSEMENT: '📤 Décaissement', FEE: '🏷️ Frais', ESCROW: '🔒 Escrow'
    };
    return m[(type as string)?.toUpperCase()] ?? (type as string);
  }

  fmt(n: number | undefined | null): string {
    return (n ?? 0).toLocaleString('fr-TN', { maximumFractionDigits: 0 });
  }
  fmtRate(n: number): string { return n.toFixed(1); }



  /* ════════════ ACTIONS ════════════ */
  releaseEscrow(esc: EscrowEntry): void {
    if (!confirm(`Libérer l'escrow "${esc.project}" (${esc.amount} TND) ?`)) return;
    this.financeService.releaseEscrow(esc.id!).subscribe({
      next: () => {
        esc.status = EscrowStatus.RELEASED;
        this.showToast('Escrow libéré ✓', 'success');
      },
      error: () => this.showToast('Erreur libération', 'error')
    });
  }

  markPaid(inv: Invoice): void {
    if (!confirm(`Marquer ${inv.invoiceNumber} comme PAYÉE ?`)) return;
    this.invoiceService.markPaid(inv.id!).subscribe({
      next: u  => { inv.status = u.status; this.showToast('Facture payée ✓', 'success'); },
      error: () => this.showToast('Erreur', 'error')
    });
  }


  /* ════════════ TOAST ════════════ */
  showToast(msg: string, type: 'success' | 'error' | 'info'): void {
    this.toastMsg = msg; this.toastType = type; this.toastVisible = true;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => this.toastVisible = false, 3500);
  }
}
