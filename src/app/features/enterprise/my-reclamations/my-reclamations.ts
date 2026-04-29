import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReclamationService } from '../../../core/services/reclamation.service';

@Component({
  selector: 'app-my-reclamations',
  standalone: false,
  templateUrl: './my-reclamations.html',
  styleUrls: ['./my-reclamations.css']
})
export class MyReclamations implements OnInit {

  // ── Tabs ──
  activeTab: 'sent' | 'received' = 'sent';

  // ── Sent reclamations (I filed) ──
  sent: any[] = [];
  sentLoading = true;

  // ── Received reclamations (about my stock) ──
  received: any[] = [];
  receivedLoading = true;

  // ── Market products for stock selection ──
  marketProducts: any[] = [];
  marketLoading = false;

  // ── Create modal ──
  showCreateModal = false;
  creating = false;
  createResult: any = null;
  createError: string | null = null;

  // ── Step inside modal: 1=select stock, 2=fill form ──
  step = 1;
  selectedProduct: any = null;

  form = {
    description: '',
    damagedQuantity: 1,
    damagedUnit: '',
    image: null as File | null
  };
  previewUrl: string | null = null;

  // ── Detail modal ──
  showDetail = false;
  detailRec: any = null;

  // ── Treat confirm ──
  treatingId: number | null = null;

  constructor(
    private reclamationService: ReclamationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSent();
    this.loadReceived();
  }

  // ── Load ──
  loadSent(): void {
    this.sentLoading = true;
    this.reclamationService.getMyReclamations().subscribe({
      next:  d => { this.sent = d; this.sentLoading = false; this.cdr.detectChanges(); },
      error: () => { this.sentLoading = false; this.cdr.detectChanges(); }
    });
  }

  loadReceived(): void {
    this.receivedLoading = true;
    this.reclamationService.getReceivedReclamations().subscribe({
      next:  d => { this.received = d; this.receivedLoading = false; this.cdr.detectChanges(); },
      error: () => { this.receivedLoading = false; this.cdr.detectChanges(); }
    });
  }

  // ── Open create modal ──
  openCreate(): void {
    this.showCreateModal = true;
    this.step = 1;
    this.selectedProduct = null;
    this.createResult = null;
    this.createError = null;
    this.form = { description: '', damagedQuantity: 1, damagedUnit: this.selectedProduct?.stockUnit || 'unit', image: null };
    this.previewUrl = null;

    if (this.marketProducts.length === 0) {
      this.marketLoading = true;
      this.reclamationService.getMarketProducts().subscribe({
        next:  d => { this.marketProducts = d; this.marketLoading = false; this.cdr.detectChanges(); },
        error: () => { this.marketLoading = false; this.cdr.detectChanges(); }
      });
    }
  }

  closeCreate(): void {
    this.showCreateModal = false;
  }

  selectProduct(p: any): void {
    this.selectedProduct = p;
    this.form.damagedUnit = p.stockUnit || 'kg';
    this.step = 2;
  }

  backToSelect(): void {
    this.step = 1;
    this.selectedProduct = null;
  }

  onFileSelected(e: Event): void {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) {
      this.form.image = f;
      this.previewUrl = URL.createObjectURL(f);
    }
  }

  submitReclamation(): void {
    if (!this.form.description.trim()) { this.createError = 'Please describe the damage.'; return; }
    if (!this.selectedProduct)         { this.createError = 'No product selected.'; return; }
    if (this.form.damagedQuantity < 1) { this.createError = 'Quantity must be at least 1.'; return; }

    this.creating = true;
    this.createError = null;

    this.reclamationService.analyzeAndCreate(
      this.selectedProduct.stockItemId ?? null,
      this.selectedProduct.id,
      this.form.description,
      this.form.damagedQuantity,
      this.form.damagedUnit || 'unit',
      this.form.image
    ).subscribe({
      next: res => {
        this.creating = false;
        this.createResult = res;
        this.cdr.detectChanges();
        this.loadSent();
      },
      error: err => {
        this.creating = false;
        this.createError = err?.error?.error || 'Submission failed.';
        this.cdr.detectChanges();
      }
    });
  }

  // ── Detail ──
  openDetail(r: any): void { this.detailRec = r; this.showDetail = true; }
  closeDetail(): void      { this.showDetail = false; this.detailRec = null; }

  // ── Treat (stock owner approves) ──
  treatReclamation(r: any): void {
    if (!confirm(`Approve this reclamation and decrease stock by ${r.damagedQuantity ?? 1}?`)) return;
    this.treatingId = r.id;
    this.reclamationService.treatReclamation(r.id).subscribe({
      next: res => {
        r.status = 'TREATED';
        r.stockQty = res.newStockQty;
        r.newTotalValue = res.newTotalValue;
        this.treatingId = null;
        this.cdr.detectChanges();
        this.loadReceived();
      },
      error: () => { this.treatingId = null; this.cdr.detectChanges(); }
    });
  }

  // ── Helpers ──
  statusClass(s: string): string {
    switch ((s||'').toUpperCase()) {
      case 'PENDING':  return 'badge-pending';
      case 'TREATED':  return 'badge-treated';
      case 'RESOLVED': return 'badge-treated';
      default:         return 'badge-muted';
    }
  }

  statusIcon(s: string): string {
    switch ((s||'').toUpperCase()) {
      case 'PENDING':  return '⏳';
      case 'TREATED':  return '✅';
      case 'RESOLVED': return '✅';
      default:         return '📋';
    }
  }

  fmt(dt: any): string {
    if (!dt) return '—';
    return new Date(dt).toLocaleString('en-GB', {
      day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'
    });
  }

  getImage(p: any): string | null {
    if (!p?.productImage || p.productImage.includes('undefined')) return null;
    return p.productImage;
  }
}