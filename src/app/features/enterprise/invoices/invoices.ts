import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { InvoiceService, RiskReport, SolvabilityReport, ClientSolvabilityProfile, InvoicePaymentPrediction } from '../../../core/services/invoice';
import { FinanceService, EnterpriseDto } from '../../../core/services/finance';
import { AuthService } from '../../../core/services/auth.service';
import { UserManagementService } from '../../../core/services/user';
import { Invoice, InvoiceType, EscrowStatus } from '../../../core/models/finance.model';

Chart.register(...registerables);

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.html',
  styleUrls: ['./invoices.css'],
  standalone: false,

  encapsulation: ViewEncapsulation.None
})
export class Invoices implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;

  invoices: Invoice[] = [];         // toutes (pour stats + onglet global)
  salesInvoices: Invoice[] = [];    // 📤 Ventes : on est vendeur → on va encaisser
  purchaseInvoices: Invoice[] = []; // 📥 Achats : on est acheteur → on doit payer
  form: FormGroup;

  showForm = false;
  editing: Invoice | null = null;
  previewInvoice: Invoice | null = null;

  //  Toast
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  toastVisible = false;
  private toastTimer: any;

  // Confirm
  showConfirm = false;
  confirmMessage = '';
  private confirmCallback: (() => void) | null = null;

  //  Search + Filter — onglet global
  searchQuery = '';
  activeFilter = 'ALL';
  readonly filterOptions = ['ALL', 'PAID', 'UNPAID'];

  // Search/filter pour les deux sections
  salesSearch = '';
  salesFilter = 'ALL';
  purchaseSearch = '';
  purchaseFilter = 'ALL';

  //  Sort
  sortCol: string | null = null;
  sortDir: 'asc' | 'desc' = 'asc';

  //  Pagination
  currentPage = 1;
  readonly pageSize = 8;
  salesPage = 1;
  purchasePage = 1;

  //  Onglets : 'list' | 'stats' | 'ai'
  // 'list' affiche maintenant les deux sections Ventes + Achats
  activeInvTab: 'list' | 'stats' | 'ai' | 'dashboard' = 'list';

  // Type de facture pour le formulaire
  formInvoiceType: 'VENTE' | 'ACHAT' = 'VENTE';

  // 🏦 IA — Solvabilité avancée
  solvabilityReport: SolvabilityReport | null = null;
  aiLoading = false;
  aiError = false;
  predictionFilter: string = 'ALL';

  // Legacy risk
  riskReport: RiskReport | null = null;
  riskLoading = false;
  riskError = false;
  riskFilter: string = 'ALL';

  // 💬 Chatbot IA
  chatMessages: { role: 'user' | 'ai'; text: string; fromAi: boolean; time: string }[] = [];
  chatInput = '';
  chatLoading = false;
  readonly chatSuggestions = [
    'Qui est mon client le plus risqué ?',
    'Quel est mon taux de recouvrement ?',
    'Combien j\'ai de factures impayées ?',
    'Donne-moi un résumé de ma situation financière',
    'Quelles factures sont en retard de plus de 30 jours ?',
  ];

  //  Chart
  private doughnutInstance: Chart | null = null;
  private viewReady = false;
  private dataReady = false;

  // 🏢 Nom de l'entreprise connectée (issu du JWT stocké)
  companyName: string = '';

  constructor(
    private invoiceService: InvoiceService,
    private financeService: FinanceService,
    private authService: AuthService,
    private userManagementService: UserManagementService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      invoiceType: ['VENTE', Validators.required],
      invoiceNumber: ['', Validators.required],
      // 🏢 Vendeur
      sellerName: [''],
      sellerArticleFiscal: [''],
      // 🛒 Acheteur
      clientName: [''],
      buyerArticleFiscal: [''],
      // Facture
      project: ['', Validators.required],
      amountHT: [0, [Validators.required, Validators.min(0.001)]],
      tva: [19, [Validators.required, Validators.min(0), Validators.max(100)]],
      status: ['UNPAID', Validators.required],
      issueDate: ['', Validators.required],
      // 🔗 Liaison livraison (optionnels)
      deliveryOrderId: [null],
      linkedEscrowId: [null],
    });
    this.form.get('amountHT')!.valueChanges.subscribe(() => this.cd.detectChanges());
    this.form.get('tva')!.valueChanges.subscribe(() => this.cd.detectChanges());
    
    // Auto-remplissage Article Fiscal
    this.form.get('clientName')!.valueChanges.subscribe(val => {
      if (this.formInvoiceType === 'VENTE' && val) {
        const ent = this.globalEnterprises.find(e => e.companyName === val);
        if (ent && ent.taxId) {
          this.form.get('buyerArticleFiscal')!.setValue(ent.taxId);
        }
      }
    });

    this.form.get('sellerName')!.valueChanges.subscribe(val => {
      if (this.formInvoiceType === 'ACHAT' && val) {
        const ent = this.globalEnterprises.find(e => e.companyName === val);
        if (ent && ent.taxId) {
          this.form.get('sellerArticleFiscal')!.setValue(ent.taxId);
        }
      }
    });

    // Quand le type change, adapter les validators
    this.form.get('invoiceType')!.valueChanges.subscribe(type => this.onInvoiceTypeChange(type));
  }

  /** Adapte le formulaire selon le type de facture choisi */
  onInvoiceTypeChange(type: string): void {
    this.formInvoiceType = type as 'VENTE' | 'ACHAT';
    if (type === 'VENTE') {
      // On est vendeur : sellerName = notre entreprise (auto), clientName = qui nous paye
      this.form.get('sellerName')!.setValue(this.companyName);
      this.form.get('sellerName')!.setValidators([]);
      this.form.get('clientName')!.setValidators([Validators.required, this.companyExistsValidator]);
    } else {
      // On est acheteur : clientName = notre entreprise (auto), sellerName = notre fournisseur
      this.form.get('clientName')!.setValue(this.companyName);
      this.form.get('sellerName')!.setValidators([Validators.required, this.companyExistsValidator]);
      this.form.get('clientName')!.setValidators([]);
    }
    this.form.get('sellerName')!.updateValueAndValidity();
    this.form.get('clientName')!.updateValueAndValidity();

    // 🔢 Auto-remplir le numéro de facture si mode création (pas d'édition)
    if (!this.editing && (type === 'VENTE' || type === 'ACHAT')) {
      this.invoiceService.getNextInvoiceNumber(type as 'VENTE' | 'ACHAT').subscribe({
        next: num => {
          this.form.get('invoiceNumber')!.setValue(num);
          this.cd.detectChanges();
        },
        error: () => { } // silencieux si backend non dispo
      });
    }
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    // Récupère le nom de l'entreprise connectée
    this.companyName = this.authService.currentUser?.company ?? '';
    this.loadGlobalCompanies();
    this.loadInvoices();
  }

  loadGlobalCompanies(): void {
    this.financeService.getEnterprises().subscribe({
      next: (enterprises) => {
        this.globalEnterprises = enterprises.filter(e => e.companyName && e.companyName !== this.companyName);
        setTimeout(() => this.cd.detectChanges(), 0);
      },
      error: (err) => {
        console.error("Could not load global enterprises", err);
        setTimeout(() => this.cd.detectChanges(), 0);
      }
    });
  }

  companyExistsValidator = (control: any) => {
    if (!control.value) return null;
    if (this.globalEnterprises.length === 0) return null; // allow if not loaded
    const names = this.globalEnterprises.map(e => e.companyName);
    if (!names.includes(control.value) && control.value !== this.companyName) {
      return { companyNotFound: true };
    }
    return null;
  };

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.dataReady) setTimeout(() => this.initDoughnutChart(), 50);
  }

  ngOnDestroy(): void { this.doughnutInstance?.destroy(); }

  // ==================== 🏦 IA SOLVABILITÉ AVANCÉE ====================

  loadSolvabilityReport(): void {
    this.aiLoading = true;
    this.aiError = false;
    this.invoiceService.getSolvabilityReport().subscribe({
      next: (report) => {
        this.solvabilityReport = report;
        this.aiLoading = false;
        setTimeout(() => this.cd.detectChanges(), 0);
      },
      error: () => {
        this.aiError = true;
        this.aiLoading = false;
        setTimeout(() => this.cd.detectChanges(), 0);
      }
    });
  }

  // Filtre les prédictions par urgence
  get filteredPredictions(): InvoicePaymentPrediction[] {
    if (!this.solvabilityReport) return [];
    const preds = this.solvabilityReport.paymentPredictions;
    if (this.predictionFilter === 'ALL') return preds;
    return preds.filter(p => p.urgency === this.predictionFilter);
  }

  // Credit Rating → couleur
  getRatingColor(rating: string): string {
    switch (rating) {
      case 'AAA': return '#059669';  // emerald
      case 'AA': return '#10b981';  // green
      case 'A': return '#3b82f6';  // blue
      case 'BBB': return '#eab308';  // yellow
      case 'BB': return '#f97316';  // orange
      case 'B': return '#ef4444';  // red
      case 'CCC': return '#7f1d1d';  // dark red
      default: return '#6b7280';
    }
  }

  // Credit Rating → background léger
  getRatingBg(rating: string): string {
    return this.getRatingColor(rating) + '18';
  }

  // Urgence → couleur
  getUrgencyColor(urgency: string): string {
    switch (urgency) {
      case 'CRITIQUE': return '#ef4444';
      case 'HAUTE': return '#f97316';
      case 'MOYENNE': return '#eab308';
      case 'FAIBLE': return '#22c55e';
      default: return '#6b7280';
    }
  }

  // Probabilité → couleur de la jauge
  getProbabilityColor(p: number): string {
    if (p >= 75) return '#22c55e';
    if (p >= 50) return '#eab308';
    if (p >= 25) return '#f97316';
    return '#ef4444';
  }

  // Severity conseil → couleur
  getAdviceColor(severity: string): string {
    switch (severity) {
      case 'CRITIQUE': return '#ef4444';
      case 'HAUTE': return '#f97316';
      case 'MOYENNE': return '#eab308';
      default: return '#3b82f6';
    }
  }

  // Legacy risk methods (backward compat)
  loadRiskReport(): void {
    this.riskLoading = true;
    this.riskError = false;
    this.invoiceService.getRiskReport().subscribe({
      next: (report) => {
        this.riskReport = report;
        this.riskLoading = false;
        setTimeout(() => this.cd.detectChanges(), 0);
      },
      error: () => {
        this.riskError = true;
        this.riskLoading = false;
        setTimeout(() => this.cd.detectChanges(), 0);
      }
    });
  }

  get filteredInvoiceRisks() {
    if (!this.riskReport) return [];
    if (this.riskFilter === 'ALL') return this.riskReport.invoiceRisks;
    const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return this.riskReport.invoiceRisks.filter(
      r => normalize(r.riskLevel).toUpperCase() === normalize(this.riskFilter).toUpperCase()
    );
  }

  getRiskColor(level: string): string {
    const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    switch (normalize(level)) {
      case 'CRITIQUE': return '#ef4444';
      case 'ELEVE': return '#f97316';
      case 'MOYEN': return '#eab308';
      case 'FAIBLE': return '#22c55e';
      default: return '#6b7280';
    }
  }

  getRiskIcon(level: string): string {
    const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    switch (normalize(level)) {
      case 'CRITIQUE': return '🆘';
      case 'ELEVE': return '🔴';
      case 'MOYEN': return '🟡';
      case 'FAIBLE': return '🟢';
      default: return '⚪';
    }
  }

  switchToAiTab(): void {
    this.activeInvTab = 'ai';
    if (!this.solvabilityReport && !this.aiLoading) {
      this.loadSolvabilityReport();
    }
  }

  // ==================== 💬 CHATBOT IA ====================

  sendChat(): void {
    const q = this.chatInput.trim();
    if (!q || this.chatLoading) return;

    // Ajouter le message utilisateur
    this.chatMessages.push({ role: 'user', text: q, fromAi: false, time: this.nowTime() });
    this.chatInput = '';
    this.chatLoading = true;
    setTimeout(() => this.cd.detectChanges(), 0);

    this.invoiceService.sendChatMessage(q).subscribe({
      next: (res) => {
        this.chatMessages.push({
          role: 'ai', text: res.message, fromAi: res.fromAi, time: this.nowTime()
        });
        this.chatLoading = false;
        setTimeout(() => {
          this.cd.detectChanges();
          const el = document.getElementById('chat-bottom');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      },
      error: () => {
        this.chatMessages.push({
          role: 'ai',
          text: '⚠️ Impossible de contacter le serveur. Vérifiez que le backend est démarré.',
          fromAi: false,
          time: this.nowTime()
        });
        this.chatLoading = false;
        setTimeout(() => this.cd.detectChanges(), 0);
      }
    });
  }

  useSuggestion(s: string): void {
    this.chatInput = s;
    this.sendChat();
  }

  onChatKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendChat();
    }
  }

  clearChat(): void {
    this.chatMessages = [];
    this.chatInput = '';
  }

  private nowTime(): string {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
  // ==================== AUTOCOMPLETION ====================

  globalEnterprises: EnterpriseDto[] = [];

  get uniqueCompanyNames(): string[] {
    return this.globalEnterprises.map(e => e.companyName).sort();
  }

  // ==================== KPIs ====================

  get totalPaid(): number { return this.invoices.filter(i => i.status === 'PAID').reduce((s, i) => s + i.amountTTC, 0); }
  get totalUnpaid(): number { return this.invoices.filter(i => i.status === 'UNPAID').reduce((s, i) => s + i.amountTTC, 0); }
  get totalTTC(): number { return this.invoices.reduce((s, i) => s + i.amountTTC, 0); }
  get recoveryRate(): number { return this.totalTTC > 0 ? +(this.totalPaid / this.totalTTC * 100).toFixed(1) : 0; }

  // ==================== OVERDUE ====================

  isOverdue(invoice: Invoice): boolean {
    if (invoice.status === 'PAID' || !invoice.issueDate) return false;
    const days = Math.floor((Date.now() - new Date(invoice.issueDate).getTime()) / 86400000);
    return days > 30;
  }

  get overdueInvoices(): Invoice[] { return this.invoices.filter(i => this.isOverdue(i)); }
  get overdueAmount(): number { return this.overdueInvoices.reduce((s, i) => s + i.amountTTC, 0); }

  // ==================== DELIVERY HELPERS ====================

  /** Vrai si la facture est liée à une livraison */
  hasLinkedDelivery(inv: Invoice): boolean {
    return !!inv.deliveryOrderId;
  }

  /** Nombre de factures liées à des livraisons */
  get linkedDeliveryCount(): number {
    return this.invoices.filter(i => !!i.deliveryOrderId).length;
  }

  /**
   * ⚡ CASCADE : Confirmer la livraison d'une facture
   * 1️⃣ Facture UNPAID → PAID  (via markPaid ou update local)
   * 2️⃣ Escrow lié LOCKED → RELEASED (si linkedEscrowId présent)
   *
   * NOTE : endpoint /mark-paid non encore implémenté côté backend ?
   * → fallback sur update() avec status=PAID
   */
  confirmDelivery(invoice: Invoice): void {
    this.confirm(
      `Confirmer la livraison de la commande #${invoice.deliveryOrderId ?? '?'} et marquer la facture ${invoice.invoiceNumber} comme PAYÉE ?`,
      () => {
        const updated: Invoice = {
          ...invoice,
          status: 'PAID',
          deliveredAt: new Date().toISOString().split('T')[0]
        };

        // Essaie d'abord markPaid, sinon fallback update
        this.invoiceService.markPaid(invoice.id!).subscribe({
          next: (res) => this.applyDeliverySuccess(invoice, res, updated),
          error: () => {
            // Fallback: update classique
            this.invoiceService.update(updated).subscribe({
              next: () => this.applyDeliverySuccess(invoice, updated, updated),
              error: () => this.showToast('Erreur confirmation livraison', 'error')
            });
          }
        });
      }
    );
  }

  /** Applique le résultat de la confirmation livraison en local */
  private applyDeliverySuccess(original: Invoice, serverResult: Invoice, fallback: Invoice): void {
    const final = serverResult || fallback;
    const mappedId = final.id ?? (final as any).idinvoice ?? (original.id ?? (original as any).idinvoice);

    // Update master list
    const idx = this.invoices.findIndex(i => (i.id ?? (i as any).idinvoice) === mappedId);
    if (idx !== -1) this.invoices[idx] = { ...original, ...final, status: 'PAID', deliveredAt: fallback.deliveredAt, id: mappedId };
    this.invoices = [...this.invoices];

    // Update Sales list
    const sIdx = this.salesInvoices.findIndex(i => (i.id ?? (i as any).idinvoice) === mappedId);
    if (sIdx !== -1) this.salesInvoices[sIdx] = { ...original, ...final, status: 'PAID', deliveredAt: fallback.deliveredAt, id: mappedId };
    this.salesInvoices = [...this.salesInvoices];

    // Update Purchases list
    const pIdx = this.purchaseInvoices.findIndex(i => (i.id ?? (i as any).idinvoice) === mappedId);
    if (pIdx !== -1) this.purchaseInvoices[pIdx] = { ...original, ...final, status: 'PAID', deliveredAt: fallback.deliveredAt, id: mappedId };
    this.purchaseInvoices = [...this.purchaseInvoices];

    // ✅ setTimeout évite NG0100 (ExpressionChangedAfterItHasBeenCheckedError)
    setTimeout(() => {
      this.cd.detectChanges();
      this.initDoughnutChart();
    }, 0);
    this.showToast(`✅ Facture ${original.invoiceNumber} marquée PAYÉE — 📧 Email envoyé`, 'success');

    // 🔒 Libération automatique de l'escrow associé (si présent)
    this.financeService.getMyEscrow().subscribe(escrows => {
      const linked = escrows.find(e =>
        e.project === original.project &&
        e.status === EscrowStatus.LOCKED &&
        Math.abs(e.amount - original.amountTTC) < 1 // Tolérance pour les arrondis
      );
      if (linked && linked.id) {
        this.financeService.releaseEscrow(linked.id).subscribe({
          next: () => console.log('Escrow libéré automatiquement'),
          error: (err) => console.error('Erreur libération escrow auto', err)
        });
      }
    });
  }

  // ==================== TTC PREVIEW ====================

  get previewTTC(): number {
    const ht = Number(this.form.get('amountHT')?.value) || 0;
    const tva = Number(this.form.get('tva')?.value) || 0;
    return +(ht * (1 + tva / 100)).toFixed(3);
  }

  // ==================== FILTER + SEARCH + SORT + PAGINATION ====================

  countByStatus(status: string): number { return this.invoices.filter(i => i.status === status).length; }

  get processedInvoices(): Invoice[] {
    let list = this.activeFilter === 'ALL' ? [...this.invoices] : this.invoices.filter(i => i.status === this.activeFilter);

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(i =>
        i.clientName.toLowerCase().includes(q) ||
        i.project.toLowerCase().includes(q) ||
        i.invoiceNumber.toLowerCase().includes(q)
      );
    }

    if (this.sortCol) {
      list.sort((a: any, b: any) => {
        let aV = a[this.sortCol!], bV = b[this.sortCol!];
        if (['amountHT', 'tva', 'amountTTC'].includes(this.sortCol!)) { aV = Number(aV); bV = Number(bV); }
        const c = aV < bV ? -1 : aV > bV ? 1 : 0;
        return this.sortDir === 'asc' ? c : -c;
      });
    }
    return list;
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.processedInvoices.length / this.pageSize)); }
  get pageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  get paginatedInvoices(): Invoice[] {
    const s = (this.currentPage - 1) * this.pageSize;
    return this.processedInvoices.slice(s, s + this.pageSize);
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

  // ==================== LOAD ====================

  loadInvoices(): void {
    // 🏢 Charge les 3 listes en parallele : toutes + ventes + achats
    forkJoin({
      all: this.invoiceService.getMyInvoices(),
      sales: this.invoiceService.getMySalesInvoices(),
      purchases: this.invoiceService.getMyPurchaseInvoices()
    }).subscribe({
      next: ({ all, sales, purchases }) => {
        this.invoices = all;
        this.salesInvoices = sales;
        this.purchaseInvoices = purchases;
        this.dataReady = true;
        this.cd.detectChanges();
        if (this.viewReady) setTimeout(() => this.initDoughnutChart(), 50);
      },
      error: () => this.showToast('Erreur chargement factures', 'error')
    });
  }

  // ── Filtered lists pour chaque section ──────────────────────

  get filteredSales(): Invoice[] {
    let list = this.salesFilter === 'ALL' ? [...this.salesInvoices]
      : this.salesInvoices.filter(i => i.status === this.salesFilter);
    if (this.salesSearch.trim()) {
      const q = this.salesSearch.toLowerCase();
      list = list.filter(i =>
        (i.clientName || '').toLowerCase().includes(q) ||
        (i.invoiceNumber || '').toLowerCase().includes(q) ||
        (i.project || '').toLowerCase().includes(q)
      );
    }
    return list;
  }

  get filteredPurchases(): Invoice[] {
    let list = this.purchaseFilter === 'ALL' ? [...this.purchaseInvoices]
      : this.purchaseInvoices.filter(i => i.status === this.purchaseFilter);
    if (this.purchaseSearch.trim()) {
      const q = this.purchaseSearch.toLowerCase();
      list = list.filter(i =>
        (i.sellerName || '').toLowerCase().includes(q) ||
        (i.invoiceNumber || '').toLowerCase().includes(q) ||
        (i.project || '').toLowerCase().includes(q)
      );
    }
    return list;
  }

  get paginatedSales(): Invoice[] {
    const s = (this.salesPage - 1) * this.pageSize;
    return this.filteredSales.slice(s, s + this.pageSize);
  }
  get totalSalesPages(): number { return Math.max(1, Math.ceil(this.filteredSales.length / this.pageSize)); }

  get paginatedPurchases(): Invoice[] {
    const s = (this.purchasePage - 1) * this.pageSize;
    return this.filteredPurchases.slice(s, s + this.pageSize);
  }
  get totalPurchasePages(): number { return Math.max(1, Math.ceil(this.filteredPurchases.length / this.pageSize)); }

  // KPIs ventes
  get salesTotalTTC(): number { return this.salesInvoices.reduce((s, i) => s + (i.amountTTC || 0), 0); }
  get salesPaidTTC(): number { return this.salesInvoices.filter(i => i.status === 'PAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }
  get salesUnpaidTTC(): number { return this.salesInvoices.filter(i => i.status === 'UNPAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }

  // KPIs achats
  get purchaseTotalTTC(): number { return this.purchaseInvoices.reduce((s, i) => s + (i.amountTTC || 0), 0); }
  get purchasePaidTTC(): number { return this.purchaseInvoices.filter(i => i.status === 'PAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }
  get purchaseUnpaidTTC(): number { return this.purchaseInvoices.filter(i => i.status === 'UNPAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }

  // Compteurs pour filtres (remplace le pipe)
  countSales(status: string): number { return this.salesInvoices.filter(i => i.status === status).length; }
  countPurchases(status: string): number { return this.purchaseInvoices.filter(i => i.status === status).length; }

  // ==================== DASHBOARD FINANCIER ====================

  /** 💰 Total encaisse (ventes PAID) */
  get dashRevenue(): number { return this.salesInvoices.filter(i => i.status === 'PAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }
  /** 💸 Total dépenses (achats PAID) */
  get dashExpenses(): number { return this.purchaseInvoices.filter(i => i.status === 'PAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }
  /** 📈 Marge nette */
  get dashMargin(): number { return this.dashRevenue - this.dashExpenses; }
  /** % Taux de marge */
  get dashMarginRate(): number { return this.dashRevenue > 0 ? (this.dashMargin / this.dashRevenue) * 100 : 0; }
  /** ⏳ Créances (ventes UNPAID = à encaisser) */
  get dashReceivables(): number { return this.salesInvoices.filter(i => i.status === 'UNPAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }
  /** ⏳ Dettes (achats UNPAID = à payer) */
  get dashPayables(): number { return this.purchaseInvoices.filter(i => i.status === 'UNPAID').reduce((s, i) => s + (i.amountTTC || 0), 0); }

  /** Top 5 clients (par montant encaissé) */
  get topClients(): { name: string; amount: number; count: number }[] {
    const map = new Map<string, { amount: number; count: number }>();
    this.salesInvoices.forEach(i => {
      const k = i.clientName || 'Inconnu';
      const v = map.get(k) || { amount: 0, count: 0 };
      map.set(k, { amount: v.amount + (i.amountTTC || 0), count: v.count + 1 });
    });
    return [...map.entries()]
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }

  /** Top 5 fournisseurs (par montant dépensé) */
  get topSuppliers(): { name: string; amount: number; count: number }[] {
    const map = new Map<string, { amount: number; count: number }>();
    this.purchaseInvoices.forEach(i => {
      const k = i.sellerName || 'Inconnu';
      const v = map.get(k) || { amount: 0, count: 0 };
      map.set(k, { amount: v.amount + (i.amountTTC || 0), count: v.count + 1 });
    });
    return [...map.entries()]
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }

  /** Top projets (ventes cumulées par projet) */
  get topProjects(): { name: string; revenue: number; expenses: number; margin: number }[] {
    const map = new Map<string, { revenue: number; expenses: number }>();
    this.salesInvoices.forEach(i => {
      const k = i.project || 'Sans projet';
      const v = map.get(k) || { revenue: 0, expenses: 0 };
      map.set(k, { ...v, revenue: v.revenue + (i.amountTTC || 0) });
    });
    this.purchaseInvoices.forEach(i => {
      const k = i.project || 'Sans projet';
      const v = map.get(k) || { revenue: 0, expenses: 0 };
      map.set(k, { ...v, expenses: v.expenses + (i.amountTTC || 0) });
    });
    return [...map.entries()]
      .map(([name, v]) => ({ name, ...v, margin: v.revenue - v.expenses }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6);
  }

  // ==================== DOUGHNUT CHART ====================

  private initDoughnutChart(): void {
    this.doughnutInstance?.destroy();
    const ctx = this.doughnutChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;
    const paid = this.countByStatus('PAID'), unpaid = this.countByStatus('UNPAID');
    this.doughnutInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Payées', 'Impayées'],
        datasets: [{
          data: [paid || 0, unpaid || 0],
          backgroundColor: ['rgba(5,150,105,0.85)', 'rgba(220,38,38,0.80)'],
          borderColor: ['#059669', '#dc2626'],
          borderWidth: 2, hoverOffset: 8
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 14, font: { size: 12 } } },
          tooltip: { callbacks: { label: c => `${c.label}: ${c.parsed} facture(s)` } }
        }
      }
    });
  }

  // ==================== PDF EXPORT ====================

  exportInvoicePDF(invoice: Invoice): void {
    const doc = new jsPDF();
    const W = 210;

    // ── Header bar (green) ──
    doc.setFillColor(5, 150, 105);
    doc.rect(0, 0, W, 44, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20); doc.setFont('helvetica', 'bold');
    doc.text(invoice.sellerName || 'EcoRessource B2B', 14, 18);
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.text('Plateforme de ressources durables — Gestion B2B', 14, 28);
    if (invoice.sellerArticleFiscal) {
      doc.setFontSize(8);
      doc.text(`Art. Fiscal : ${invoice.sellerArticleFiscal}`, 14, 38);
    }

    // ── Invoice number (right) ──
    doc.setFontSize(18); doc.setFont('helvetica', 'bold');
    doc.text('FACTURE', W - 14, 18, { align: 'right' });
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
    doc.text(invoice.invoiceNumber, W - 14, 28, { align: 'right' });

    const isP = invoice.status === 'PAID';
    doc.setFontSize(9);
    doc.text(isP ? '✓ PAYEE' : 'IMPAYEE', W - 14, 38, { align: 'right' });

    // ── Separator ──
    doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.5);
    doc.line(14, 50, W - 14, 50);

    // ── VENDEUR / ACHETEUR boxes ──
    const boxY = 54, boxH = 36;

    // Vendeur box (left)
    doc.setFillColor(248, 252, 255);
    doc.roundedRect(14, boxY, 85, boxH, 3, 3, 'F');
    doc.setDrawColor(2, 132, 199, 0.3); doc.setLineWidth(0.3);
    doc.roundedRect(14, boxY, 85, boxH, 3, 3, 'S');

    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139);
    doc.text('VENDEUR', 18, boxY + 7);
    doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42);
    doc.text(invoice.sellerName || 'EcoRessource B2B', 18, boxY + 16);
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139);
    doc.text('Article Fiscal :', 18, boxY + 25);
    doc.setTextColor(2, 132, 199); doc.setFont('helvetica', 'bold');
    doc.text(invoice.sellerArticleFiscal || '—', 46, boxY + 25);

    // Acheteur box (right)
    doc.setFillColor(248, 252, 255);
    doc.roundedRect(111, boxY, 85, boxH, 3, 3, 'F');
    doc.setDrawColor(2, 132, 199, 0.3); doc.setLineWidth(0.3);
    doc.roundedRect(111, boxY, 85, boxH, 3, 3, 'S');

    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139);
    doc.text('ACHETEUR', 115, boxY + 7);
    doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42);
    doc.text(invoice.clientName, 115, boxY + 16);
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139);
    doc.text('Article Fiscal :', 115, boxY + 25);
    doc.setTextColor(2, 132, 199); doc.setFont('helvetica', 'bold');
    doc.text(invoice.buyerArticleFiscal || '—', 143, boxY + 25);

    // ── Infos facture (Projet / Date / N°) ──
    const infoY = boxY + boxH + 8;
    doc.setFillColor(240, 249, 255);
    doc.rect(14, infoY, W - 28, 10, 'F');
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139);
    doc.text('PROJET', 18, infoY + 4); doc.text('DATE', 100, infoY + 4); doc.text('N° FACTURE', 160, infoY + 4);
    doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42);
    doc.text(invoice.project, 18, infoY + 9); doc.text(invoice.issueDate, 100, infoY + 9);
    doc.text(invoice.invoiceNumber, 160, infoY + 9);

    // ── Table ──
    const tableY = infoY + 16;
    doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.5);
    doc.line(14, tableY - 2, W - 14, tableY - 2);

    doc.setFillColor(248, 250, 252);
    doc.rect(14, tableY, W - 28, 10, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139);
    doc.text('DESCRIPTION', 18, tableY + 7);
    doc.text('MONTANT HT', 115, tableY + 7, { align: 'right' });
    doc.text(`TVA (${invoice.tva}%)`, 152, tableY + 7, { align: 'right' });
    doc.text('MONTANT TTC', W - 16, tableY + 7, { align: 'right' });

    const tvaAmt = +(invoice.amountTTC - invoice.amountHT).toFixed(3);
    doc.setFontSize(11); doc.setFont('helvetica', 'normal'); doc.setTextColor(15, 23, 42);
    doc.text(invoice.project, 18, tableY + 20);
    doc.text(`${invoice.amountHT.toFixed(3)} TND`, 115, tableY + 20, { align: 'right' });
    doc.text(`${tvaAmt.toFixed(3)} TND`, 152, tableY + 20, { align: 'right' });
    doc.text(`${invoice.amountTTC.toFixed(3)} TND`, W - 16, tableY + 20, { align: 'right' });

    doc.setDrawColor(226, 232, 240);
    doc.line(14, tableY + 25, W - 14, tableY + 25);

    // ── Total box ──
    const totY = tableY + 30;
    doc.setFillColor(5, 150, 105);
    doc.roundedRect(120, totY, W - 134, 16, 2, 2, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.text('TOTAL A PAYER', 128, totY + 7);
    doc.text(`${invoice.amountTTC.toFixed(3)} TND`, W - 16, totY + 7, { align: 'right' });

    // Status badge
    doc.setFillColor(isP ? 5 : 220, isP ? 150 : 38, isP ? 105 : 38);
    doc.roundedRect(14, totY, 38, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(9);
    doc.text(isP ? 'PAYEE' : 'IMPAYEE', 33, totY + 6.5, { align: 'center' });

    // ── Footer ──
    doc.setTextColor(148, 163, 184); doc.setFontSize(8); doc.setFont('helvetica', 'italic');
    doc.text('Merci de votre confiance — EcoRessource B2B', W / 2, 276, { align: 'center' });
    doc.setDrawColor(5, 150, 105); doc.setLineWidth(1);
    doc.line(14, 279, W - 14, 279);

    doc.save(`${invoice.invoiceNumber}.pdf`);
    this.showToast('PDF téléchargé ✓', 'success');
  }


  // ==================== EXCEL EXPORT ====================

  exportAllToExcel(): void {
    const data = this.processedInvoices.map(i => ({
      'N° Facture': i.invoiceNumber, 'Client': i.clientName, 'Projet': i.project,
      'Montant HT (TND)': i.amountHT, 'TVA (%)': i.tva, 'Montant TTC (TND)': i.amountTTC,
      'Statut': i.status, 'Date': i.issueDate,
      'En retard': this.isOverdue(i) ? 'OUI' : 'NON'
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = [{ wch: 14 }, { wch: 22 }, { wch: 20 }, { wch: 14 }, { wch: 8 }, { wch: 16 }, { wch: 10 }, { wch: 12 }, { wch: 10 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Factures');
    XLSX.writeFile(wb, `factures-${new Date().toISOString().split('T')[0]}.xlsx`);
    this.showToast('Export Excel téléchargé ✓', 'success');
  }

  // ==================== CRUD ====================

  openForm(invoice?: Invoice): void {
    this.editing = invoice ?? null;
    this.showForm = true;
    if (invoice) {
      this.form.patchValue(invoice);
    } else {
      const today = new Date().toISOString().split('T')[0];
      // 🟢 Pour une VENTE : on est le vendeur
      // 🔴 Pour un ACHAT : on est l'acheteur
      const currentType = this.form.get('invoiceType')?.value || 'VENTE';
      this.form.reset({
        status: 'UNPAID',
        tva: 19,
        amountHT: 0,
        issueDate: today,
        invoiceNumber: 'INV-' + Date.now().toString().slice(-6),
        // Auto-rempli selon le type
        sellerName: currentType === 'VENTE' ? this.companyName : '',
        clientName: currentType === 'ACHAT' ? this.companyName : '',
        sellerArticleFiscal: '',
        buyerArticleFiscal: '',
        invoiceType: currentType
      });
    }
  }

  save(): void {
    if (!this.form.valid) return;
    const v = this.form.value;
    const data: Invoice = {
      invoiceNumber: v.invoiceNumber,
      invoiceType: v.invoiceType,
      // 🏢 Vendeur
      sellerName: v.sellerName || 'EcoRessource B2B',
      sellerArticleFiscal: v.sellerArticleFiscal || undefined,
      // 🛒 Acheteur
      clientName: v.clientName,
      buyerArticleFiscal: v.buyerArticleFiscal || undefined,
      // Facture
      project: v.project,
      amountHT: Number(v.amountHT),
      tva: Number(v.tva),
      amountTTC: this.previewTTC,
      status: v.status,
      issueDate: v.issueDate,
      // 🔗 Liaison livraison
      deliveryOrderId: v.deliveryOrderId ? Number(v.deliveryOrderId) : undefined,
      linkedEscrowId: v.linkedEscrowId ? Number(v.linkedEscrowId) : undefined,
    };
    if (this.editing) {
      data.id = this.editing.id;
      this.invoiceService.update(data).subscribe({
        next: (res) => {
          const final = res || data;
          const mappedId = final.id ?? (final as any).idinvoice;

          // Update All
          const idx = this.invoices.findIndex(i => (i.id ?? (i as any).idinvoice) === mappedId);
          if (idx !== -1) this.invoices[idx] = { ...final, id: mappedId };
          this.invoices = [...this.invoices];

          // Update Sales
          const sIdx = this.salesInvoices.findIndex(i => (i.id ?? (i as any).idinvoice) === mappedId);
          if (sIdx !== -1) this.salesInvoices[sIdx] = { ...final, id: mappedId };
          this.salesInvoices = [...this.salesInvoices];

          // Update Purchases
          const pIdx = this.purchaseInvoices.findIndex(i => (i.id ?? (i as any).idinvoice) === mappedId);
          if (pIdx !== -1) this.purchaseInvoices[pIdx] = { ...final, id: mappedId };
          this.purchaseInvoices = [...this.purchaseInvoices];

          this.cd.detectChanges(); setTimeout(() => this.initDoughnutChart(), 50);
          this.showToast('Facture mise à jour ✓', 'success'); this.closeForm();
        },
        error: () => this.showToast('Erreur mise à jour', 'error')
      });
    } else {
      this.invoiceService.add(data).subscribe({
        next: created => {
          const mappedId = (created as any)?.id ?? (created as any)?.idinvoice;
          const saved: Invoice = { ...data, id: mappedId };

          this.invoices = [...this.invoices, saved];
          if (data.invoiceType === 'VENTE') {
            this.salesInvoices = [...this.salesInvoices, saved];
          } else {
            this.purchaseInvoices = [...this.purchaseInvoices, saved];
          }

          // 🏦 Ajout automatique dans la Trésorerie
          this.financeService.addTransaction({
            project: data.project,
            type: data.invoiceType === 'VENTE' ? 'PAYMENT' : 'DISBURSEMENT' as any,
            status: data.status === 'PAID' ? 'COMPLETED' : 'PENDING' as any,
            amount: data.amountTTC,
            date: data.issueDate
          }).subscribe({
            next: () => console.log('Transaction treasury synchronisée'),
            error: (err) => console.error('Erreur synchro treasury', err)
          });

          // 🔒 Ajout automatique dans l'Escrow si c'est une VENTE
          if (data.invoiceType === 'VENTE') {
            this.financeService.addEscrow({
              project: data.project,
              amount: data.amountTTC,
              status: EscrowStatus.LOCKED,
              createdAt: new Date().toISOString().split('T')[0]
            }).subscribe({
              next: () => console.log('Escrow synchronisé'),
              error: (err) => console.error('Erreur synchro escrow', err)
            });
          }

          this.cd.detectChanges(); setTimeout(() => this.initDoughnutChart(), 50);
          this.showToast('Facture créée ✓ (synchro trésorerie & escrow OK)', 'success'); this.closeForm();
        },
        error: () => this.showToast('Erreur création', 'error')
      });
    }
  }

  delete(id: number): void {
    this.confirm('Supprimer définitivement cette facture ?', () => {
      this.invoiceService.delete(id).subscribe({
        next: () => {
          this.invoices = this.invoices.filter(i => (i.id ?? (i as any).idinvoice) !== id);
          this.salesInvoices = this.salesInvoices.filter(i => (i.id ?? (i as any).idinvoice) !== id);
          this.purchaseInvoices = this.purchaseInvoices.filter(i => (i.id ?? (i as any).idinvoice) !== id);

          this.cd.detectChanges(); setTimeout(() => this.initDoughnutChart(), 50);
          this.showToast('Facture supprimée', 'info');
        },
        error: () => this.showToast('Erreur suppression', 'error')
      });
    });
  }

  openPreview(invoice: Invoice): void { this.previewInvoice = invoice; }
  closePreview(): void { this.previewInvoice = null; }

  // ==================== TOAST ====================

  showToast(message: string, type: 'success' | 'error' | 'info'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    if (this.toastTimer) clearTimeout(this.toastTimer);
    // ✅ setTimeout évite NG0100 — ne pas appeler detectChanges() pendant un cycle
    setTimeout(() => this.cd.detectChanges(), 0);
    this.toastTimer = setTimeout(() => {
      this.toastVisible = false;
      setTimeout(() => this.cd.detectChanges(), 0);
    }, 3500);
  }

  // ==================== CONFIRM ====================

  confirm(message: string, callback: () => void): void {
    this.confirmMessage = message; this.confirmCallback = callback; this.showConfirm = true;
  }
  onConfirmYes(): void { this.showConfirm = false; this.confirmCallback?.(); this.confirmCallback = null; }
  onConfirmNo(): void { this.showConfirm = false; this.confirmCallback = null; }

  closeForm(): void { this.showForm = false; this.editing = null; }
}
