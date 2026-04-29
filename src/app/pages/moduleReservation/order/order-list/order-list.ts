import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AiSuggestionsService, AiSuggestion, Material } from '../../shared/ai-suggestions.service';
import {
  EcoOrderApiService,
  BackendEcoOrder,
  BackendOrderStatus,
  EcoOrderRequest,
} from '../../shared/api/eco-order-api.service';
// jsPDF is loaded lazily on demand to keep the initial bundle slim
// (the user explicitly said no backend, so we generate locally)

interface Supplier {
  name: string;
  distanceKm: number;
  pricePerKg: number;
  local: boolean;
}

type OrderStatus = 'DRAFT' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface Order {
  id: number;
  ref: string;
  company: string;
  material: string;
  qtyKg: number;
  supplier: string;
  distanceKm: number;
  date: string;
  orderDate: string;
  status: OrderStatus;
  grade: 'A'|'B'|'C'|'D'|'E';
  enterpriseId?: number | null;
  deleted?: boolean;
  cancelReason?: string;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],
})
export class OrderPage implements OnInit {

  // ===== Draft order (decision engine input) =====
  draft = {
    material: 'Virgin ABS',
    qtyKg: 40,
    supplier: 'PolyDirect EU',
  };

  suppliers: Supplier[] = [
    { name: 'PolyDirect EU',       distanceKm: 640, pricePerKg: 2.4, local: false },
    { name: 'EcoPoly Lyon',        distanceKm:  85, pricePerKg: 2.7, local: true  },
    { name: 'CircuMat Marseille',  distanceKm: 120, pricePerKg: 2.5, local: true  },
    { name: 'GlobalResin AG',      distanceKm: 920, pricePerKg: 2.1, local: false },
  ];

  // Loaded from backend on init
  orders: Order[] = [];
  loadError = '';

  // Circular bundle suggestion (peer demand aggregation)
  bundleOpen = false;

  // AI suggestions for current draft
  suggestions: AiSuggestion[] = [];

  constructor(
    public ai: AiSuggestionsService,
    private api: EcoOrderApiService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.analyze();
  }

  // ====================================================================
  //  Backend integration
  // ====================================================================
  loadOrders(): void {
    this.api.list().subscribe({
      next: rows => { this.orders = rows.map(r => this.fromBackend(r)); },
      error: err => {
        console.error('[OrderList] failed to load', err);
        this.loadError =
          err?.status === 401
            ? 'Please log in to view your orders.'
            : 'Could not reach the server. Showing the cached view.';
      },
    });
  }

  private fromBackend(r: BackendEcoOrder): Order {
    return {
      id: r.id,
      ref: r.ref,
      company: r.companyName,
      material: r.material,
      qtyKg: Number(r.qtyKg),
      supplier: r.supplier,
      distanceKm: r.distanceKm,
      date: r.orderDate,
      orderDate: r.orderDate,
      status: r.status.toUpperCase() as Order['status'],
      grade: r.grade,
      enterpriseId: r.enterprise?.id ?? null,
      deleted: r.deleted ?? false,
      cancelReason: r.cancelReason ?? undefined,
    };
  }

  private toBackend(o: Order | typeof this.draft, status?: BackendOrderStatus): EcoOrderRequest {
    const supplier = this.suppliers.find(s => s.name === (o as any).supplier);
    return {
      ref: 'ref' in o ? o.ref : undefined,
      companyName: 'company' in o ? o.company : this.currentCompanyName(),
      material: o.material,
      qtyKg: o.qtyKg,
      supplier: o.supplier,
      distanceKm: 'distanceKm' in o ? o.distanceKm : (supplier?.distanceKm ?? 0),
      orderDate: 'orderDate' in o ? o.orderDate : new Date().toISOString().slice(0, 10),
      status: status ?? (('status' in o ? (o.status as string).toLowerCase() : 'confirmed') as BackendOrderStatus),
      grade: ('grade' in o ? o.grade : this.draftGrade) as any,
      enterpriseId: 'enterpriseId' in o ? o.enterpriseId ?? undefined : undefined,
    };
  }

  analyze(): void {
    this.suggestions = this.ai.analyzeMaterial(this.draft.material, this.draft.qtyKg);

    // Distance-based insight
    const sup = this.suppliers.find(s => s.name === this.draft.supplier);
    if (sup) {
      if (sup.local) {
        this.suggestions.push({
          label: 'Local supplier (<150 km)',
          detail: `Transport CO₂ ≈ ${Math.round(sup.distanceKm * 0.062)} kg — low logistics footprint`,
          score: 91, tone: 'eco', icon: '🚛',
        });
      } else if (sup.distanceKm > 500) {
        const local = this.suppliers.filter(s => s.local)[0];
        this.suggestions.push({
          label: 'Long-haul supplier detected',
          detail: `Switching to ${local.name} (${local.distanceKm} km) cuts ~${Math.round((sup.distanceKm - local.distanceKm) * 0.062 * this.draft.qtyKg / 10)} kg CO₂`,
          score: 86, tone: 'warn', icon: '🚛',
        });
      }
    }
  }

  // ===== Computed =====
  get material(): Material | undefined {
    return this.ai.materials.find(m => m.name === this.draft.material);
  }

  get supplier(): Supplier | undefined {
    return this.suppliers.find(s => s.name === this.draft.supplier);
  }

  get draftGrade(): 'A'|'B'|'C'|'D'|'E' {
    const s = this.supplier;
    return this.ai.ecoGrade(this.draft.material, s?.distanceKm ?? 500);
  }

  get draftCo2(): number {
    const m = this.material;
    if (!m) return 0;
    const transport = (this.supplier?.distanceKm ?? 0) * 0.062 * (this.draft.qtyKg / 1000);
    return Math.round((m.co2PerKg * this.draft.qtyKg + transport) * 10) / 10;
  }

  get draftWater(): number {
    const m = this.material;
    if (!m) return 0;
    return Math.round(m.waterPerKg * this.draft.qtyKg);
  }

  get draftWaste(): number {
    const m = this.material;
    if (!m) return 0;
    return m.recyclable ? 0 : Math.round(this.draft.qtyKg * 0.85);
  }

  get totalCost(): number {
    return Math.round((this.supplier?.pricePerKg ?? 0) * this.draft.qtyKg);
  }

  get alternative(): Material | null {
    const m = this.material;
    if (!m || m.recyclable) return null;
    return this.ai.materials.find(x => x.name === m.alternative) ?? null;
  }

  get altImpact(): { co2Diff: number; waterDiff: number } | null {
    const alt = this.alternative;
    const cur = this.material;
    if (!alt || !cur) return null;
    return {
      co2Diff: Math.round((cur.co2PerKg - alt.co2PerKg) * this.draft.qtyKg),
      waterDiff: Math.round((cur.waterPerKg - alt.waterPerKg) * this.draft.qtyKg),
    };
  }

  applyAlternative(): void {
    if (this.alternative) {
      this.draft.material = this.alternative.name;
      this.analyze();
    }
  }

  // ===== Bundle suggestion =====
  get bundleMatchers(): { company: string; qtyKg: number }[] {
    // Simulate peer demand
    return [
      { company: 'EcoPlast',   qtyKg: 18 },
      { company: 'CircuLab',   qtyKg: 12 },
    ];
  }

  get bundleTotalKg(): number {
    return this.draft.qtyKg + this.bundleMatchers.reduce((a, b) => a + b.qtyKg, 0);
  }

  get bundleSavings(): number {
    // Bulk savings ~15% + split logistics
    return Math.round(this.totalCost * 0.18);
  }

  toggleBundle(): void { this.bundleOpen = !this.bundleOpen; }

  // ===== KPI helpers =====
  totalCo2Saved(): number {
    return this.orders
      .filter(o => o.status !== 'DRAFT')
      .reduce((sum, o) => {
        const m = this.ai.materials.find(mm => mm.name === o.material);
        // "saved" = the gap between virgin equivalent and recycled equivalent
        if (!m) return sum;
        const virgin = this.ai.materials.find(x => !x.recyclable && x.co2PerKg > m.co2PerKg);
        if (!virgin) return sum + o.qtyKg * 0.5; // small default
        return sum + Math.round((virgin.co2PerKg - m.co2PerKg) * o.qtyKg);
      }, 0);
  }

  totalWasteAvoided(): number {
    return this.orders
      .filter(o => {
        const m = this.ai.materials.find(mm => mm.name === o.material);
        return m?.recyclable && o.status !== 'DRAFT';
      })
      .reduce((sum, o) => sum + o.qtyKg, 0);
  }

  avgGrade(): string {
    if (!this.orders.length) return '—';
    const map = { A: 5, B: 4, C: 3, D: 2, E: 1 };
    const avg = this.orders.reduce((s, o) => s + map[o.grade], 0) / this.orders.length;
    if (avg >= 4.5) return 'A';
    if (avg >= 3.5) return 'B';
    if (avg >= 2.5) return 'C';
    if (avg >= 1.5) return 'D';
    return 'E';
  }

  // ===== Actions =====
  placeOrder(): void {
    const sup = this.supplier;
    const payload: EcoOrderRequest = {
      companyName: this.currentCompanyName(),
      material: this.draft.material,
      qtyKg: this.draft.qtyKg,
      supplier: this.draft.supplier,
      distanceKm: sup?.distanceKm ?? 0,
      orderDate: new Date().toISOString().slice(0, 10),
      status: 'confirmed',
      grade: this.draftGrade,
      co2Saved: this.draftCo2,
      waterSaved: this.draftWater,
      wasteAvoided: this.draftWaste,
    };
    this.api.create(payload).subscribe({
      next: saved => {
        this.loadOrders();
        this.showToast(`Order placed · ${saved.ref}`);
      },
      error: err => {
        console.error('[OrderList] placeOrder failed', err);
        this.showToast(
          err?.status === 401
            ? 'Please log in to place orders'
            : 'Failed to place order',
        );
      },
    });
  }

  previewPdf = false;
  openPdfPreview(): void { this.previewPdf = true; }
  closePdf(): void { this.previewPdf = false; }

  // ===== Small helpers used in template =====
  today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  get localSupplierCount(): number {
    return this.suppliers.filter(s => s.local).length;
  }

  // ===========================================================
  //  Toast (replaces window.alert which breaks SaaS UX)
  // ===========================================================
  toastMsg = '';
  showToast(msg: string): void {
    this.toastMsg = msg;
    setTimeout(() => (this.toastMsg = ''), 2400);
  }

  // ===========================================================
  //  Status workflow (Order CRUD — status update flow)
  //  DRAFT -> CONFIRMED -> SHIPPED -> DELIVERED
  // ===========================================================
  workflowOrder: ('DRAFT' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED')[] =
    ['DRAFT', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];

  canAdvance(o: Order): boolean {
    if (o.status === 'CANCELLED' || o.deleted) return false;
    return o.status !== 'DELIVERED';
  }

  nextStatus(o: Order): OrderStatus | null {
    const idx = this.workflowOrder.indexOf(o.status as any);
    if (idx < 0 || idx >= this.workflowOrder.length - 1) return null;
    return this.workflowOrder[idx + 1];
  }

  advanceStatus(o: Order): void {
    const next = this.nextStatus(o);
    if (!next) return;
    if (o.id <= 0) return;
    this.api.advance(o.id).subscribe({
      next: () => {
        this.loadOrders();
        this.showToast(`${o.ref} → ${next}`);
      },
      error: err => {
        console.error('[OrderList] advance failed', err);
        this.showToast('Could not advance status');
      },
    });
  }

  workflowProgress(o: Order): number {
    if (o.status === 'CANCELLED') return 0;
    const idx = this.workflowOrder.indexOf(o.status as any);
    return idx < 0 ? 0 : Math.round(((idx + 1) / this.workflowOrder.length) * 100);
  }

  // ===========================================================
  //  Edit modal — full CRUD update
  // ===========================================================
  editModal = false;
  editing: Order | null = null;
  editDraft: Partial<Order> = {};

  openEdit(o: Order): void {
    this.editing = o;
    this.editDraft = {
      material: o.material,
      qtyKg: o.qtyKg,
      supplier: o.supplier,
      status: o.status,
    };
    this.editModal = true;
  }

  saveEdit(): void {
    if (!this.editing) return;
    const o = this.editing;
    const newMaterial = this.editDraft.material ?? o.material;
    const newSupplier = this.editDraft.supplier ?? o.supplier;
    const sup = this.suppliers.find(s => s.name === newSupplier);
    const newDistance = sup?.distanceKm ?? o.distanceKm;
    const newGrade = this.ai.ecoGrade(newMaterial, newDistance);

    if (o.id <= 0) return;
    const payload: EcoOrderRequest = {
      ref: o.ref,
      companyName: o.company,
      material: newMaterial,
      qtyKg: this.editDraft.qtyKg ?? o.qtyKg,
      supplier: newSupplier,
      distanceKm: newDistance,
      orderDate: o.orderDate,
      status: ((this.editDraft.status as OrderStatus) ?? o.status).toLowerCase() as BackendOrderStatus,
      grade: newGrade,
      enterpriseId: o.enterpriseId ?? undefined,
    };
    this.api.update(o.id, payload).subscribe({
      next: () => {
        this.loadOrders();
        this.editModal = false;
        this.editing = null;
        this.showToast(`${o.ref} updated`);
      },
      error: err => {
        console.error('[OrderList] update failed', err);
        this.loadOrders();
      },
    });
  }

  cancelEdit(): void {
    this.editModal = false;
    this.editing = null;
  }

  // ===========================================================
  //  Soft delete with reason
  // ===========================================================
  deleteModal = false;
  pendingDelete: Order | null = null;
  deleteReason = '';

  askDelete(o: Order): void {
    this.pendingDelete = o;
    this.deleteReason = '';
    this.deleteModal = true;
  }

  confirmDelete(): void {
    if (!this.pendingDelete) return;
    const o = this.pendingDelete;
    const reason = this.deleteReason || 'No reason provided';
    this.deleteModal = false;
    this.pendingDelete = null;
    if (o.id <= 0) return;
    this.api.cancel(o.id, reason).subscribe({
      next: () => {
        this.loadOrders();
        this.showToast(`${o.ref} cancelled`);
      },
      error: err => {
        console.error('[OrderList] cancel failed', err);
        this.loadOrders();
      },
    });
  }

  cancelDeleteModal(): void {
    this.deleteModal = false;
    this.pendingDelete = null;
  }

  // ===========================================================
  //  Real PDF generator (jsPDF) — Smart Eco Invoice
  //  Lazy-loaded so the initial chunk stays small.
  // ===========================================================
  async downloadInvoicePdf(): Promise<void> {
    try {
      // Dynamic import keeps jsPDF out of the initial bundle
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });

      const W = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = 56;

      // ===== Header =====
      doc.setFillColor(16, 185, 129);
      doc.rect(0, 0, W, 8, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(20, 30, 28);
      doc.text('ECO-RESSOURCE', margin, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(110, 120, 118);
      doc.text('Circular Economy Invoice', margin, y + 16);

      // Eco grade pill on the right
      const gradeColors: Record<string, [number, number, number]> = {
        A: [16, 185, 129], B: [132, 204, 22], C: [234, 179, 8],
        D: [249, 115, 22], E: [239, 68, 68],
      };
      const gc = gradeColors[this.draftGrade] || [110, 120, 118];
      doc.setFillColor(...gc);
      doc.roundedRect(W - margin - 60, y - 22, 60, 30, 6, 6, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.text(this.draftGrade, W - margin - 36, y);
      doc.setFontSize(8);
      doc.text('eco-grade', W - margin - 50, y + 12);

      y += 50;
      doc.setDrawColor(220, 230, 226);
      doc.line(margin, y, W - margin, y);

      // ===== Meta block =====
      y += 30;
      const col1 = margin, col2 = margin + 130, col3 = margin + 280, col4 = margin + 410;
      const metaLabel = (label: string, value: string, x: number) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(150, 160, 158);
        doc.text(label.toUpperCase(), x, y);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(20, 30, 28);
        doc.text(value, x, y + 14);
      };
      metaLabel('Date',     this.today(), col1);
      metaLabel('Buyer',    'Your company', col2);
      metaLabel('Supplier', this.draft.supplier.slice(0, 18), col3);
      metaLabel('Distance', `${this.supplier?.distanceKm ?? 0} km`, col4);

      // ===== Table =====
      y += 50;
      doc.setFillColor(245, 250, 248);
      doc.rect(margin, y - 6, W - margin * 2, 26, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(80, 90, 88);
      doc.text('ITEM',  col1 + 8, y + 12);
      doc.text('QTY',   col2 + 8, y + 12);
      doc.text('UNIT €', col3 + 8, y + 12);
      doc.text('TOTAL €', col4 + 8, y + 12);

      y += 36;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(20, 30, 28);
      doc.text(this.draft.material, col1 + 8, y);
      doc.text(`${this.draft.qtyKg} kg`, col2 + 8, y);
      doc.text(`€${this.supplier?.pricePerKg.toFixed(2) ?? '0.00'}`, col3 + 8, y);
      doc.setFont('helvetica', 'bold');
      doc.text(`€${this.totalCost}`, col4 + 8, y);

      // ===== Environmental Impact panel =====
      y += 50;
      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(16, 185, 129);
      doc.roundedRect(margin, y, W - margin * 2, 130, 8, 8, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(4, 78, 59);
      doc.text('Environmental impact', margin + 18, y + 22);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(80, 100, 95);
      doc.text('Computed from material chemistry, transport distance, and recyclability.',
               margin + 18, y + 38);

      // 4 impact tiles
      const tileY = y + 54;
      const tileH = 60;
      const tileW = (W - margin * 2 - 60) / 4;
      const tiles: Array<[string, string, string]> = [
        ['CO₂',          `${this.draftCo2} kg`,    'embodied carbon'],
        ['Water',        `${this.draftWater} L`,   'water footprint'],
        ['Waste',        `${this.draftWaste} kg`,  this.material?.recyclable ? 'fully recyclable' : 'non-recyclable'],
        ['Eco-grade',    this.draftGrade,          'circular score'],
      ];
      tiles.forEach((t, i) => {
        const tx = margin + 18 + i * (tileW + 16);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(tx, tileY, tileW, tileH, 6, 6, 'F');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(120, 140, 135);
        doc.text(t[0].toUpperCase(), tx + 10, tileY + 16);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.setTextColor(4, 78, 59);
        doc.text(t[1], tx + 10, tileY + 36);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(120, 140, 135);
        doc.text(t[2], tx + 10, tileY + 50);
      });

      // ===== Eco certification badge =====
      y += 160;
      doc.setFillColor(16, 185, 129);
      doc.circle(margin + 20, y + 20, 16, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text('✓', margin + 16, y + 26);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(20, 30, 28);
      doc.text('Eco-Ressource certified', margin + 50, y + 18);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(110, 120, 118);
      doc.text(`Grade ${this.draftGrade} · ${this.material?.recyclable ? 'recyclable material' : 'non-recyclable material'} · ${(this.supplier?.distanceKm ?? 0) < 150 ? 'local supplier' : 'long-haul supplier'}`,
               margin + 50, y + 34);

      // ===== Footer =====
      doc.setFontSize(8);
      doc.setTextColor(160, 170, 168);
      doc.text('Generated by Eco-Ressource — automated impact calculation, not a binding invoice.',
               margin, doc.internal.pageSize.getHeight() - 30);
      doc.text(`Reference: DRAFT-${Date.now()}`,
               W - margin - 100, doc.internal.pageSize.getHeight() - 30);

      const filename = `eco-invoice-${this.today()}.pdf`;
      doc.save(filename);
      this.showToast(`Invoice saved: ${filename}`);
    } catch (err) {
      console.error('PDF generation failed', err);
      this.showToast('PDF generation failed — check console');
    }
  }

  // For per-row PDF download from the orders table
  async downloadOrderPdf(o: Order): Promise<void> {
    // Temporarily swap draft into this order's data, generate, then restore
    const saved = { ...this.draft };
    this.draft.material = o.material;
    this.draft.qtyKg = o.qtyKg;
    this.draft.supplier = o.supplier;
    await this.downloadInvoicePdf();
    this.draft = saved;
  }

  private currentCompanyName(): string {
    return this.auth.currentUser?.company ?? this.auth.currentUser?.name ?? '';
  }
}
