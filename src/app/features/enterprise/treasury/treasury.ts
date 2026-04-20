import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import { FinanceService } from '../../../core/services/finance';
import { FinanceTransaction, EscrowEntry } from '../../../core/models/finance.model';

Chart.register(...registerables);

@Component({
  selector: 'app-treasury',
  templateUrl: './treasury.html',
  styleUrls: ['./treasury.css'],
  standalone: false
})
export class Treasury implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cashLineChart') cashChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('projectBarChart') projectChartRef!: ElementRef<HTMLCanvasElement>;

  transactions: FinanceTransaction[] = [];
  escrowEntries: EscrowEntry[] = [];

  transactionForm: FormGroup;
  escrowForm: FormGroup;
  showTransactionForm = false;
  showEscrowForm = false;
  editingTransaction: FinanceTransaction | null = null;
  editingEscrow: EscrowEntry | null = null;

  // 🔔 Toast
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  toastVisible = false;
  private toastTimer: any;

  //  Confirm
  showConfirm = false;
  confirmMessage = '';
  private confirmCallback: (() => void) | null = null;

  //  Search + Filter
  searchQuery = '';
  activeFilter = 'ALL';
  readonly filterOptions = ['ALL', 'COMPLETED', 'PENDING', 'LOCKED', 'FAILED'];

  //  Sort
  sortCol: string | null = null;
  sortDir: 'asc' | 'desc' = 'asc';

  //  Pagination
  currentPage = 1;
  readonly pageSize = 8;

  //  Cash Threshold Alert
  cashThreshold = 50000;

  // Onglets : 'data' (défaut) | 'stats'
  activeTab: 'data' | 'stats' = 'data';


  //  Chart instances
  private cashChartInstance: Chart | null = null;
  private projectChartInstance: Chart | null = null;
  private viewReady = false;
  private dataReady = false;

  constructor(
    private financeService: FinanceService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.transactionForm = this.fb.group({
      project: ['', Validators.required],
      type: ['', Validators.required],
      amount: [0, Validators.required],
      status: ['PENDING', Validators.required],
      date: ['']
    });
    this.escrowForm = this.fb.group({
      project: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      status: ['LOCKED', Validators.required],
      createdAt: [''],
      releaseDate: ['']
    });
  }

  ngOnInit(): void { this.loadData(); }

  ngAfterViewInit(): void {
    this.viewReady = true;
    // Charts sera initialisé via setTab('stats') — pas ici car *ngIf
  }

  /** Change d'onglet — réinitialise les graphiques si on va sur 'stats' */
  setTab(tab: 'data' | 'stats'): void {
    this.activeTab = tab;
    if (tab === 'stats') {
      setTimeout(() => this.initCharts(), 80);
    }
  }

  ngOnDestroy(): void {
    this.cashChartInstance?.destroy();
    this.projectChartInstance?.destroy();
  }

  // ==================== KPI COMPUTED ====================

  get computedCashOnHand(): number {
    return this.computedNetBalance - this.computedEscrowTotal;
  }
  get computedEscrowTotal(): number {
    return this.escrowEntries.filter(e => e.status === 'LOCKED').reduce((s, e) => s + e.amount, 0);
  }
  get computedReceivables(): number {
    return this.transactions.filter(t => t.status === 'PENDING' && t.amount > 0).reduce((s, t) => s + t.amount, 0);
  }
  get computedPayables(): number {
    return this.transactions.filter(t => t.status === 'PENDING' && t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  }
  get computedNetBalance(): number {
    return this.transactions.filter(t => t.status === 'COMPLETED').reduce((s, t) => s + t.amount, 0);
  }
  get cashAlert(): boolean {
    return this.transactions.length > 0 && this.computedCashOnHand < this.cashThreshold;
  }

  // ── Escrow counters for KPI strip ──
  get escrowLockedCount(): number { return this.escrowEntries.filter(e => e.status === 'LOCKED').length; }
  get escrowReleasedCount(): number { return this.escrowEntries.filter(e => e.status === 'RELEASED').length; }
  get escrowDisputedCount(): number { return this.escrowEntries.filter(e => e.status === 'DISPUTED').length; }

  // ── Release escrow directement depuis la table ──
  releaseEscrow(esc: EscrowEntry): void {
    if (esc.status === 'RELEASED') {
      this.showToast('Cet escrow est déjà libéré.', 'info');
      return;
    }
    this.confirm(
      `Libérer l'escrow "${esc.project}" (${esc.amount.toLocaleString('fr-FR')} TND) ?\nUn email de notification sera envoyé au responsable financier.`,
      () => {
        this.financeService.releaseEscrow(esc.id!).subscribe({
          next: (updated) => {
            const idx = this.escrowEntries.findIndex(e => e.id === esc.id);
            if (idx !== -1) {
              this.escrowEntries[idx] = {
                id: (updated as any).idescrow ?? updated.id,
                project: (updated as any).project,
                amount: (updated as any).amount,
                status: (updated as any).status,
                createdAt: (updated as any).createdAt,
                releaseDate: (updated as any).releaseDate,
              };
            }
            this.escrowEntries = [...this.escrowEntries];
            this.cd.detectChanges();
            this.showToast(
              `🔓 Escrow "${esc.project}" libéré — 📧 Email envoyé au financier`,
              'success'
            );
          },
          error: () => this.showToast('Erreur lors de la libération de l\'escrow', 'error')
        });
      }
    );
  }


  // ==================== SPARKLINE ====================

  getSparklinePoints(): string {
    const pts = [...this.transactions]
      .filter(t => t.status === 'COMPLETED')
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
      .slice(-8).map(t => t.amount);
    if (pts.length < 2) return '0,28 80,14';
    const max = Math.max(...pts), min = Math.min(...pts), range = max - min || 1;
    return pts.map((v, i) => {
      const x = (i / (pts.length - 1)) * 80;
      const y = 28 - ((v - min) / range) * 24;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }

  // ==================== TIMELINE ====================

  get recentTransactions(): FinanceTransaction[] {
    return [...this.transactions]
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 5);
  }

  // ==================== SEARCH + FILTER + SORT + PAGINATION ====================

  get processedTransactions(): FinanceTransaction[] {
    let list = this.activeFilter === 'ALL'
      ? [...this.transactions]
      : this.transactions.filter(t => t.status === this.activeFilter);

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(t =>
        t.project.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        String(t.amount).includes(q)
      );
    }

    if (this.sortCol) {
      list.sort((a: any, b: any) => {
        let aV = a[this.sortCol!], bV = b[this.sortCol!];
        if (this.sortCol === 'amount') { aV = Number(aV); bV = Number(bV); }
        const c = aV < bV ? -1 : aV > bV ? 1 : 0;
        return this.sortDir === 'asc' ? c : -c;
      });
    }
    return list;
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.processedTransactions.length / this.pageSize)); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  get paginatedTransactions(): FinanceTransaction[] {
    const s = (this.currentPage - 1) * this.pageSize;
    return this.processedTransactions.slice(s, s + this.pageSize);
  }

  setFilter(f: string): void { this.activeFilter = f; this.currentPage = 1; }
  setPage(p: number): void { if (p >= 1 && p <= this.totalPages) this.currentPage = p; }
  onSearch(): void { this.currentPage = 1; }

  sortBy(col: string): void {
    this.sortCol === col ? (this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc') : (this.sortCol = col, this.sortDir = 'asc');
    this.currentPage = 1;
  }
  getSortIcon(col: string): string {
    if (this.sortCol !== col) return '⇅';
    return this.sortDir === 'asc' ? '↑' : '↓';
  }
  countByStatus(status: string): number { return this.transactions.filter(t => t.status === status).length; }

  // ==================== EXCEL EXPORT ====================

  exportToExcel(): void {
    const data = this.processedTransactions.map(t => ({
      'ID': t.id, 'Projet': t.project, 'Type': t.type,
      'Montant (TND)': t.amount, 'Statut': t.status, 'Date': t.date
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = [{ wch: 6 }, { wch: 22 }, { wch: 14 }, { wch: 14 }, { wch: 12 }, { wch: 12 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
    XLSX.writeFile(wb, `transactions-${new Date().toISOString().split('T')[0]}.xlsx`);
    this.showToast('Export Excel téléchargé ✓', 'success');
  }

  // ==================== LOAD DATA ====================

  loadData(): void {
    let txOk = false, escOk = false;
    const check = () => { if (txOk && escOk) { this.dataReady = true; if (this.viewReady) setTimeout(() => this.initCharts(), 50); } };

    this.financeService.getTransactions().subscribe({
      next: d => { this.transactions = d; txOk = true; this.cd.detectChanges(); check(); },
      error: () => this.showToast('Erreur chargement transactions', 'error')
    });
    this.financeService.getEscrow().subscribe({
      next: d => { this.escrowEntries = d; escOk = true; this.cd.detectChanges(); check(); },
      error: () => this.showToast('Erreur chargement escrow', 'error')
    });
  }

  // ==================== CHARTS ====================

  private initCharts(): void {
    this.initCashLineChart();
    this.initProjectBarChart();
  }

  private getMonthlyData(): { labels: string[], values: number[] } {
    const now = new Date();
    const labels: string[] = [], raw: number[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      labels.push(d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }));
      raw.push(this.transactions
        .filter(t => t.status === 'COMPLETED' && (t.date || '').startsWith(key))
        .reduce((s, t) => s + t.amount, 0));
    }
    let cum = 0;
    return { labels, values: raw.map(v => { cum += v; return cum; }) };
  }

  private getProjectData(): { labels: string[], income: number[], expenses: number[] } {
    const projects = [...new Set(
      this.transactions.filter(t => t.status === 'COMPLETED').map(t => t.project)
    )].slice(0, 8);
    return {
      labels: projects,
      income: projects.map(p => this.transactions.filter(t => t.project === p && t.status === 'COMPLETED' && t.amount > 0).reduce((s, t) => s + t.amount, 0)),
      expenses: projects.map(p => Math.abs(this.transactions.filter(t => t.project === p && t.status === 'COMPLETED' && t.amount < 0).reduce((s, t) => s + t.amount, 0)))
    };
  }

  private initCashLineChart(): void {
    this.cashChartInstance?.destroy();
    const ctx = this.cashChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;
    const { labels, values } = this.getMonthlyData();
    this.cashChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{ label: 'Cash cumulé (TND)', data: values, borderColor: '#059669', backgroundColor: 'rgba(5,150,105,0.08)', fill: true, tension: 0.4, pointBackgroundColor: '#059669', pointRadius: 4, pointHoverRadius: 6 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: import('chart.js').TooltipItem<'line'>) => `${(c.parsed.y ?? 0).toLocaleString('fr-FR')} TND` } } },
        scales: {
          y: { ticks: { color: '#94a3b8', callback: (v: number | string) => `${Number(v).toLocaleString()}` }, grid: { color: 'rgba(148,163,184,0.1)' } },
          x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
        }
      }
    });
  }

  private initProjectBarChart(): void {
    this.projectChartInstance?.destroy();
    const ctx = this.projectChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;
    const { labels, income, expenses } = this.getProjectData();
    this.projectChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length ? labels : ['Aucun projet'],
        datasets: [
          { label: 'Recettes', data: income, backgroundColor: 'rgba(5,150,105,0.75)', borderRadius: 6 },
          { label: 'Dépenses', data: expenses, backgroundColor: 'rgba(220,38,38,0.70)', borderRadius: 6 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#94a3b8', font: { size: 11 } } }, tooltip: { callbacks: { label: (c: import('chart.js').TooltipItem<'bar'>) => `${c.dataset.label}: ${(c.parsed.y ?? 0).toLocaleString('fr-FR')} TND` } } },
        scales: {
          y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(148,163,184,0.1)' } },
          x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
        }
      }
    });
  }

  private refreshCharts(): void {
    if (this.viewReady) setTimeout(() => this.initCharts(), 50);
  }

  // ==================== TRANSACTION CRUD ====================

  openTransactionForm(tx?: FinanceTransaction): void {
    this.editingTransaction = tx ?? null;
    this.showTransactionForm = true;
    tx ? this.transactionForm.patchValue(tx) : this.transactionForm.reset({ status: 'PENDING' });
  }

  saveTransaction(): void {
    if (!this.transactionForm.valid) return;
    const v = this.transactionForm.value;
    const data: FinanceTransaction = {
      project: v.project, type: v.type.toUpperCase(),
      amount: Number(v.amount), status: v.status.toUpperCase(),
      date: v.date || new Date().toISOString().split('T')[0]
    };
    if (this.editingTransaction) {
      data.id = this.editingTransaction.id;
      this.financeService.updateTransaction(data).subscribe({
        next: () => {
          const i = this.transactions.findIndex(t => t.id === data.id);
          if (i !== -1) this.transactions[i] = { ...data };
          this.transactions = [...this.transactions];
          this.cd.detectChanges(); this.refreshCharts();
          this.showToast('Transaction mise à jour ✓', 'success'); this.closeForm();
        },
        error: () => this.showToast('Erreur mise à jour', 'error')
      });
    } else {
      this.financeService.addTransaction(data).subscribe({
        next: created => {
          this.transactions = [...this.transactions, { ...data, id: (created as any)?.id }];
          this.cd.detectChanges(); this.refreshCharts();
          this.showToast('Transaction ajoutée ✓', 'success'); this.closeForm();
        },
        error: () => this.showToast("Erreur ajout", 'error')
      });
    }
  }

  deleteTransaction(id: number): void {
    this.confirm('Supprimer définitivement cette transaction ?', () => {
      this.financeService.deleteTransaction(id).subscribe({
        next: () => {
          this.transactions = this.transactions.filter(t => t.id !== id);
          this.cd.detectChanges(); this.refreshCharts();
          this.showToast('Transaction supprimée', 'info');
        },
        error: () => this.showToast('Erreur suppression', 'error')
      });
    });
  }

  // ==================== ESCROW CRUD ====================

  openEscrowForm(entry?: EscrowEntry): void {
    this.editingEscrow = entry ?? null;
    this.showEscrowForm = true;
    entry ? this.escrowForm.patchValue(entry) : this.escrowForm.reset({ status: 'LOCKED' });
  }

  saveEscrow(): void {
    if (!this.escrowForm.valid) return;
    const v = this.escrowForm.value;
    const data: EscrowEntry = {
      project: v.project, amount: Number(v.amount),
      status: v.status.toUpperCase(),
      createdAt: v.createdAt || new Date().toISOString().split('T')[0],
      releaseDate: v.releaseDate || undefined
    };
    if (this.editingEscrow) {
      data.id = this.editingEscrow.id;
      this.financeService.updateEscrow(data).subscribe({
        next: () => {
          const i = this.escrowEntries.findIndex(e => e.id === data.id);
          if (i !== -1) this.escrowEntries[i] = { ...data };
          this.escrowEntries = [...this.escrowEntries];
          this.cd.detectChanges();
          this.showToast('Escrow mis à jour ✓', 'success'); this.closeForm();
        },
        error: () => this.showToast('Erreur escrow', 'error')
      });
    } else {
      this.financeService.addEscrow(data).subscribe({
        next: created => {
          this.escrowEntries = [...this.escrowEntries, { ...data, id: (created as any)?.id }];
          this.cd.detectChanges();
          this.showToast('Escrow ajouté ✓', 'success'); this.closeForm();
        },
        error: () => this.showToast("Erreur ajout escrow", 'error')
      });
    }
  }

  deleteEscrow(id: number): void {
    this.confirm('Supprimer définitivement cet escrow ?', () => {
      this.financeService.deleteEscrow(id).subscribe({
        next: () => {
          this.escrowEntries = this.escrowEntries.filter(e => e.id !== id);
          this.cd.detectChanges();
          this.showToast('Escrow supprimé', 'info');
        },
        error: () => this.showToast('Erreur suppression escrow', 'error')
      });
    });
  }

  // ==================== RISK ====================

  getRisk(amount: number): 'high' | 'medium' | 'low' {
    const a = Math.abs(amount);
    return a >= 50000 ? 'high' : a >= 10000 ? 'medium' : 'low';
  }
  getRiskLabel(amount: number): string {
    return { high: 'Élevé', medium: 'Moyen', low: 'Faible' }[this.getRisk(amount)];
  }

  // ==================== TOAST ====================

  showToast(message: string, type: 'success' | 'error' | 'info'): void {
    this.toastMessage = message; this.toastType = type; this.toastVisible = true;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { this.toastVisible = false; this.cd.detectChanges(); }, 3500);
    this.cd.detectChanges();
  }

  // ==================== CONFIRM ====================

  confirm(message: string, callback: () => void): void {
    this.confirmMessage = message; this.confirmCallback = callback; this.showConfirm = true;
  }
  onConfirmYes(): void { this.showConfirm = false; this.confirmCallback?.(); this.confirmCallback = null; }
  onConfirmNo(): void { this.showConfirm = false; this.confirmCallback = null; }

  closeForm(): void {
    this.showTransactionForm = false; this.showEscrowForm = false;
    this.editingTransaction = null; this.editingEscrow = null;
  }
}
