import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { InvoiceService } from '../../../core/services/invoice';
import { FinanceService } from '../../../core/services/finance';
import { Invoice } from '../../../core/models/finance.model';

Chart.register(...registerables);

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.html',
  styleUrls: ['./invoices.css'],
  standalone: false
})
export class Invoices implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef<HTMLCanvasElement>;

  invoices: Invoice[] = [];
  form: FormGroup;

  showForm = false;
  editing: Invoice | null = null;
  previewInvoice: Invoice | null = null;

  // 🔔 Toast
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' = 'success';
  toastVisible = false;
  private toastTimer: any;

  // 🗑️ Confirm
  showConfirm = false;
  confirmMessage = '';
  private confirmCallback: (() => void) | null = null;

  // 🔍 Search + Filter
  searchQuery = '';
  activeFilter = 'ALL';
  readonly filterOptions = ['ALL', 'PAID', 'UNPAID'];

  // 📊 Sort
  sortCol: string | null = null;
  sortDir: 'asc' | 'desc' = 'asc';

  // 📄 Pagination
  currentPage = 1;
  readonly pageSize = 8;

  // 🗂️ Onglets : 'list' (défaut) | 'stats'
  activeInvTab: 'list' | 'stats' = 'list';


  // 📈 Chart
  private doughnutInstance: Chart | null = null;
  private viewReady = false;
  private dataReady = false;

  constructor(
    private invoiceService: InvoiceService,
    private financeService: FinanceService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      invoiceNumber:    ['', Validators.required],
      clientName:       ['', Validators.required],
      project:          ['', Validators.required],
      amountHT:         [0,  [Validators.required, Validators.min(0.001)]],
      tva:              [19, [Validators.required, Validators.min(0), Validators.max(100)]],
      status:           ['UNPAID', Validators.required],
      issueDate:        ['', Validators.required],
      // 🔗 Champs liaison livraison (optionnels)
      deliveryOrderId:  [null],
      linkedEscrowId:   [null],
    });
    this.form.get('amountHT')!.valueChanges.subscribe(() => this.cd.detectChanges());
    this.form.get('tva')!.valueChanges.subscribe(() => this.cd.detectChanges());
  }

  ngOnInit(): void { this.loadInvoices(); }

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.dataReady) setTimeout(() => this.initDoughnutChart(), 50);
  }

  ngOnDestroy(): void { this.doughnutInstance?.destroy(); }

  // ==================== KPIs ====================

  get totalPaid(): number    { return this.invoices.filter(i => i.status==='PAID').reduce((s,i)=>s+i.amountTTC,0); }
  get totalUnpaid(): number  { return this.invoices.filter(i => i.status==='UNPAID').reduce((s,i)=>s+i.amountTTC,0); }
  get totalTTC(): number     { return this.invoices.reduce((s,i)=>s+i.amountTTC,0); }
  get recoveryRate(): number { return this.totalTTC > 0 ? +(this.totalPaid / this.totalTTC * 100).toFixed(1) : 0; }

  // ==================== OVERDUE ====================

  isOverdue(invoice: Invoice): boolean {
    if (invoice.status === 'PAID' || !invoice.issueDate) return false;
    const days = Math.floor((Date.now() - new Date(invoice.issueDate).getTime()) / 86400000);
    return days > 30;
  }

  get overdueInvoices(): Invoice[] { return this.invoices.filter(i => this.isOverdue(i)); }
  get overdueAmount(): number      { return this.overdueInvoices.reduce((s,i)=>s+i.amountTTC,0); }

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
    const idx = this.invoices.findIndex(i => i.id === original.id);
    if (idx !== -1) this.invoices[idx] = { ...original, ...final, status: 'PAID', deliveredAt: fallback.deliveredAt };
    this.invoices = [...this.invoices];
    this.cd.detectChanges();
    setTimeout(() => this.initDoughnutChart(), 50);
    this.showToast(`✅ Facture ${original.invoiceNumber} marquée PAYÉE`, 'success');

    // Si un escrow est lié, le libérer aussi
    if (original.linkedEscrowId) {
      this.financeService.releaseEscrow(original.linkedEscrowId).subscribe({
        next: () => this.showToast(`🔓 Escrow #${original.linkedEscrowId} libéré (RELEASED)`, 'success'),
        error: () => this.showToast(`⚠️ Escrow #${original.linkedEscrowId} : échec libération`, 'error')
      });
    }
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
        if (['amountHT','tva','amountTTC'].includes(this.sortCol!)) { aV = Number(aV); bV = Number(bV); }
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
  setPage(p: number): void   { if (p >= 1 && p <= this.totalPages) this.currentPage = p; }
  onSearch(): void           { this.currentPage = 1; }

  sortBy(col: string): void {
    this.sortCol === col ? (this.sortDir = this.sortDir==='asc'?'desc':'asc') : (this.sortCol = col, this.sortDir = 'asc');
    this.currentPage = 1;
  }
  getSortIcon(col: string): string {
    if (this.sortCol !== col) return '⇅';
    return this.sortDir === 'asc' ? '↑' : '↓';
  }

  // ==================== LOAD ====================

  loadInvoices(): void {
    this.invoiceService.getAll().subscribe({
      next: data => {
        this.invoices = data;
        this.dataReady = true;
        this.cd.detectChanges();
        if (this.viewReady) setTimeout(() => this.initDoughnutChart(), 50);
      },
      error: () => this.showToast('Erreur chargement factures', 'error')
    });
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

    // Header green bar
    doc.setFillColor(5, 150, 105);
    doc.rect(0, 0, W, 42, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20); doc.setFont('helvetica', 'bold');
    doc.text('EcoRessource B2B', 14, 18);
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.text('Plateforme de ressources durables — Gestion B2B', 14, 28);

    // Invoice title right
    doc.setFontSize(18); doc.setFont('helvetica', 'bold');
    doc.text('FACTURE', W - 14, 18, { align: 'right' });
    doc.setFontSize(11); doc.setFont('helvetica', 'normal');
    doc.text(invoice.invoiceNumber, W - 14, 28, { align: 'right' });

    // Client / project / date info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9); doc.setTextColor(100, 116, 139);
    doc.text('FACTURÉ À', 14, 54); doc.text('PROJET', 90, 54); doc.text('DATE', 160, 54);
    doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42);
    doc.text(invoice.clientName, 14, 63);
    doc.text(invoice.project, 90, 63);
    doc.text(invoice.issueDate, 160, 63);

    // Divider
    doc.setDrawColor(226, 232, 240); doc.setLineWidth(0.5);
    doc.line(14, 72, W - 14, 72);

    // Table header
    doc.setFillColor(248, 250, 252);
    doc.rect(14, 78, W - 28, 10, 'F');
    doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139);
    doc.text('DESCRIPTION', 18, 85);
    doc.text('MONTANT HT', 115, 85, { align: 'right' });
    doc.text(`TVA (${invoice.tva}%)`, 152, 85, { align: 'right' });
    doc.text('MONTANT TTC', W - 16, 85, { align: 'right' });

    // Table row
    const tvaAmt = +(invoice.amountTTC - invoice.amountHT).toFixed(3);
    doc.setFontSize(11); doc.setFont('helvetica', 'normal'); doc.setTextColor(15, 23, 42);
    doc.text(invoice.project, 18, 98);
    doc.text(`${invoice.amountHT.toFixed(3)} TND`, 115, 98, { align: 'right' });
    doc.text(`${tvaAmt.toFixed(3)} TND`, 152, 98, { align: 'right' });
    doc.text(`${invoice.amountTTC.toFixed(3)} TND`, W - 16, 98, { align: 'right' });

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 107, W - 14, 107);

    // Total box
    doc.setFillColor(5, 150, 105);
    doc.roundedRect(120, 113, W - 134, 16, 2, 2, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.text('TOTAL À PAYER', 128, 121);
    doc.text(`${invoice.amountTTC.toFixed(3)} TND`, W - 16, 121, { align: 'right' });

    // Status badge
    const isP = invoice.status === 'PAID';
    doc.setFillColor(isP ? 5 : 220, isP ? 150 : 38, isP ? 105 : 38);
    doc.roundedRect(14, 113, 38, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(9);
    doc.text(isP ? '✓ PAYÉE' : '⏳ IMPAYÉE', 33, 119.5, { align: 'center' });

    // Footer
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
    ws['!cols'] = [{ wch:14 },{ wch:22 },{ wch:20 },{ wch:14 },{ wch:8 },{ wch:16 },{ wch:10 },{ wch:12 },{ wch:10 }];
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
      this.form.reset({ status: 'UNPAID', tva: 19, amountHT: 0, issueDate: today, invoiceNumber: 'INV-' + Date.now().toString().slice(-6) });
    }
  }

  save(): void {
    if (!this.form.valid) return;
    const v = this.form.value;
    const data: Invoice = {
      invoiceNumber: v.invoiceNumber, clientName: v.clientName, project: v.project,
      amountHT: Number(v.amountHT), tva: Number(v.tva), amountTTC: this.previewTTC,
      status: v.status, issueDate: v.issueDate,
      // 🔗 Champs livraison
      deliveryOrderId: v.deliveryOrderId ? Number(v.deliveryOrderId) : undefined,
      linkedEscrowId:  v.linkedEscrowId  ? Number(v.linkedEscrowId)  : undefined,
    };
    if (this.editing) {
      data.id = this.editing.id;
      this.invoiceService.update(data).subscribe({
        next: () => {
          const idx = this.invoices.findIndex(i => i.id === data.id);
          if (idx !== -1) this.invoices[idx] = { ...data };
          this.invoices = [...this.invoices];
          this.cd.detectChanges(); setTimeout(() => this.initDoughnutChart(), 50);
          this.showToast('Facture mise à jour ✓', 'success'); this.closeForm();
        },
        error: () => this.showToast('Erreur mise à jour', 'error')
      });
    } else {
      this.invoiceService.add(data).subscribe({
        next: created => {
          this.invoices = [...this.invoices, { ...data, id: (created as any)?.id }];
          this.cd.detectChanges(); setTimeout(() => this.initDoughnutChart(), 50);
          this.showToast('Facture créée ✓', 'success'); this.closeForm();
        },
        error: () => this.showToast('Erreur création', 'error')
      });
    }
  }

  delete(id: number): void {
    this.confirm('Supprimer définitivement cette facture ?', () => {
      this.invoiceService.delete(id).subscribe({
        next: () => {
          this.invoices = this.invoices.filter(i => i.id !== id);
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
  onConfirmNo(): void  { this.showConfirm = false; this.confirmCallback = null; }

  closeForm(): void { this.showForm = false; this.editing = null; }
}
