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
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  enterpriseId?: number | null;
  deleted?: boolean;
  cancelReason?: string;
  co2Saved?: number | null;
  waterSaved?: number | null;
  wasteAvoided?: number | null;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css'],
})
export class OrderPage implements OnInit {
  draft = {
    material: 'Virgin ABS',
    qtyKg: 40,
    supplier: 'PolyDirect EU',
  };

  suppliers: Supplier[] = [
    { name: 'PolyDirect EU', distanceKm: 640, pricePerKg: 2.4, local: false },
    { name: 'EcoPoly Lyon', distanceKm: 85, pricePerKg: 2.7, local: true },
    { name: 'CircuMat Marseille', distanceKm: 120, pricePerKg: 2.5, local: true },
    { name: 'GlobalResin AG', distanceKm: 920, pricePerKg: 2.1, local: false },
  ];

  orders: Order[] = [];
  loadError = '';
  bundleOpen = false;
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

  loadOrders(): void {
    this.api.list().subscribe({
      next: rows => {
        this.orders = rows.map(r => this.fromBackend(r));
        this.analyze();
      },
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
      co2Saved: r.co2Saved ?? null,
      waterSaved: r.waterSaved ?? null,
      wasteAvoided: r.wasteAvoided ?? null,
    };
  }

  private toBackend(o: Order | typeof this.draft, status?: BackendOrderStatus): EcoOrderRequest {
    const supplier = this.suppliers.find(s => s.name === (o as { supplier: string }).supplier);
    return {
      ref: 'ref' in o ? o.ref : undefined,
      companyName: 'company' in o ? o.company : this.currentCompanyName(),
      material: o.material,
      qtyKg: o.qtyKg,
      supplier: o.supplier,
      distanceKm: 'distanceKm' in o ? o.distanceKm : (supplier?.distanceKm ?? 0),
      orderDate: 'orderDate' in o ? o.orderDate : new Date().toISOString().slice(0, 10),
      status: status ?? (('status' in o ? (o.status as string).toLowerCase() : 'confirmed') as BackendOrderStatus),
      grade: ('grade' in o ? o.grade : this.draftGrade),
      co2Saved: 'co2Saved' in o ? (o.co2Saved ?? this.estimatedDraftCo2Saved()) : this.estimatedDraftCo2Saved(),
      waterSaved: 'waterSaved' in o ? (o.waterSaved ?? this.draftWater) : this.draftWater,
      wasteAvoided: 'wasteAvoided' in o ? (o.wasteAvoided ?? this.draftWaste) : this.draftWaste,
      enterpriseId: 'enterpriseId' in o ? o.enterpriseId ?? undefined : undefined,
    };
  }

  analyze(): void {
    const sameMaterial = this.orders.filter(order => !order.deleted && order.material === this.draft.material);
    const sameSupplier = this.orders.filter(order => !order.deleted && order.supplier === this.draft.supplier);
    const avgSaved = sameMaterial.length
      ? Math.round(sameMaterial.reduce((sum, order) => sum + (order.co2Saved ?? 0), 0) / sameMaterial.length)
      : 0;
    const avgDistance = sameSupplier.length
      ? Math.round(sameSupplier.reduce((sum, order) => sum + order.distanceKm, 0) / sameSupplier.length)
      : (this.supplier?.distanceKm ?? 0);

    this.suggestions = [
      {
        label: `${this.priorityMessage(avgSaved)}`,
        detail: sameMaterial.length
          ? `Based on ${sameMaterial.length} backend order(s) for ${this.draft.material}.`
          : 'No backend order history exists yet for this material.',
        score: Math.min(96, 50 + avgSaved),
        tone: avgSaved >= 25 ? 'eco' : 'info',
        icon: 'Leaf',
      },
      {
        label: avgDistance <= 150 ? 'Short logistics corridor' : 'Long-haul logistics risk',
        detail: `Average distance for this supplier is ${avgDistance} km based on backend order history.`,
        score: avgDistance <= 150 ? 88 : 62,
        tone: avgDistance <= 150 ? 'eco' : 'warn',
        icon: 'Truck',
      },
      {
        label: `${this.bundleMatchers.length} peer order(s) align with this material`,
        detail: this.bundleMatchers.length
          ? `Bundle opportunity totals ${this.bundleTotalKg} kg across current backend orders.`
          : 'No matching backend bundle opportunity is active right now.',
        score: this.bundleMatchers.length ? 84 : 55,
        tone: this.bundleMatchers.length ? 'savings' : 'info',
        icon: 'Share',
      },
    ];
  }

  get material(): Material | undefined {
    return this.ai.materials.find(m => m.name === this.draft.material);
  }

  get supplier(): Supplier | undefined {
    return this.suppliers.find(s => s.name === this.draft.supplier);
  }

  get draftGrade(): 'A' | 'B' | 'C' | 'D' | 'E' {
    const saved = this.estimatedDraftCo2Saved();
    const distance = this.supplier?.distanceKm ?? 0;
    if (saved >= 180 && distance <= 150) return 'A';
    if (saved >= 120 && distance <= 300) return 'B';
    if (saved >= 70) return 'C';
    if (saved >= 30) return 'D';
    return 'E';
  }

  get draftCo2(): number {
    const qtyFactor = this.draft.qtyKg * 0.28;
    const distanceFactor = (this.supplier?.distanceKm ?? 0) * 0.05;
    return Math.max(0, Math.round(qtyFactor + distanceFactor));
  }

  get draftWater(): number {
    const history = this.orders.filter(order => !order.deleted && order.waterSaved != null && order.qtyKg > 0);
    if (!history.length) {
      return Math.round(this.draft.qtyKg * 2);
    }
    const avgPerKg = history.reduce((sum, order) => sum + ((order.waterSaved ?? 0) / order.qtyKg), 0) / history.length;
    return Math.max(0, Math.round(avgPerKg * this.draft.qtyKg));
  }

  get draftWaste(): number {
    const history = this.orders.filter(order => !order.deleted && order.wasteAvoided != null && order.qtyKg > 0);
    if (!history.length) {
      return Math.round(this.draft.qtyKg * 0.45);
    }
    const avgPerKg = history.reduce((sum, order) => sum + ((order.wasteAvoided ?? 0) / order.qtyKg), 0) / history.length;
    return Math.max(0, Math.round(avgPerKg * this.draft.qtyKg));
  }

  get totalCost(): number {
    return Math.round((this.supplier?.pricePerKg ?? 0) * this.draft.qtyKg);
  }

  get alternative(): Material | null {
    const candidates = this.orders
      .filter(order => !order.deleted && order.material !== this.draft.material && (order.co2Saved ?? 0) > this.estimatedDraftCo2Saved())
      .sort((a, b) => (b.co2Saved ?? 0) - (a.co2Saved ?? 0));
    if (!candidates.length) {
      return null;
    }
    return this.ai.materials.find(item => item.name === candidates[0].material) ?? null;
  }

  get altImpact(): { co2Diff: number; waterDiff: number } | null {
    const alt = this.orders
      .filter(order => !order.deleted && order.material === this.alternative?.name)
      .sort((a, b) => (b.co2Saved ?? 0) - (a.co2Saved ?? 0))[0];
    if (!alt) {
      return null;
    }
    return {
      co2Diff: Math.max(0, Math.round((alt.co2Saved ?? 0) - this.estimatedDraftCo2Saved())),
      waterDiff: Math.max(0, Math.round((alt.waterSaved ?? 0) - this.draftWater)),
    };
  }

  applyAlternative(): void {
    if (this.alternative) {
      this.draft.material = this.alternative.name;
      this.analyze();
    }
  }

  get bundleMatchers(): { company: string; qtyKg: number }[] {
    return this.orders
      .filter(order =>
        !order.deleted &&
        order.company !== this.currentCompanyName() &&
        order.material === this.draft.material &&
        order.status !== 'CANCELLED',
      )
      .slice(0, 3)
      .map(order => ({
        company: order.company,
        qtyKg: order.qtyKg,
      }));
  }

  get bundleTotalKg(): number {
    return this.draft.qtyKg + this.bundleMatchers.reduce((a, b) => a + b.qtyKg, 0);
  }

  get bundleSavings(): number {
    if (!this.bundleMatchers.length) {
      return 0;
    }
    return Math.round(this.totalCost * 0.12);
  }

  toggleBundle(): void {
    this.bundleOpen = !this.bundleOpen;
  }

  totalCo2Saved(): number {
    return this.orders
      .filter(o => !o.deleted && o.status !== 'DRAFT' && o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + Math.max(0, Math.round(o.co2Saved ?? 0)), 0);
  }

  totalWasteAvoided(): number {
    return this.orders
      .filter(o => !o.deleted && o.status !== 'DRAFT' && o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + Math.max(0, Math.round(o.wasteAvoided ?? 0)), 0);
  }

  avgGrade(): string {
    if (!this.orders.length) return '-';
    const map = { A: 5, B: 4, C: 3, D: 2, E: 1 };
    const avg = this.orders.reduce((s, o) => s + map[o.grade], 0) / this.orders.length;
    if (avg >= 4.5) return 'A';
    if (avg >= 3.5) return 'B';
    if (avg >= 2.5) return 'C';
    if (avg >= 1.5) return 'D';
    return 'E';
  }

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
      co2Saved: this.estimatedDraftCo2Saved(),
      waterSaved: this.draftWater,
      wasteAvoided: this.draftWaste,
    };
    this.api.create(payload).subscribe({
      next: saved => {
        this.loadOrders();
        this.showToast(`Order placed - ${saved.ref}`);
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

  today(): string {
    return new Date().toISOString().slice(0, 10);
  }

  get localSupplierCount(): number {
    return this.suppliers.filter(s => s.local).length;
  }

  toastMsg = '';
  showToast(msg: string): void {
    this.toastMsg = msg;
    setTimeout(() => (this.toastMsg = ''), 2400);
  }

  workflowOrder: ('DRAFT' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED')[] =
    ['DRAFT', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];

  canAdvance(o: Order): boolean {
    if (o.status === 'CANCELLED' || o.deleted) return false;
    return o.status !== 'DELIVERED';
  }

  nextStatus(o: Order): OrderStatus | null {
    const idx = this.workflowOrder.indexOf(o.status as never);
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
        this.showToast(`${o.ref} -> ${next}`);
      },
      error: err => {
        console.error('[OrderList] advance failed', err);
        this.showToast('Could not advance status');
      },
    });
  }

  workflowProgress(o: Order): number {
    if (o.status === 'CANCELLED') return 0;
    const idx = this.workflowOrder.indexOf(o.status as never);
    return idx < 0 ? 0 : Math.round(((idx + 1) / this.workflowOrder.length) * 100);
  }

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
    const newQty = this.editDraft.qtyKg ?? o.qtyKg;
    const newSaved = Math.max(0, Math.round(newQty * 0.35 - newDistance * 0.08));
    const newGrade = this.gradeFromMetrics(newSaved, newDistance);

    if (o.id <= 0) return;
    const payload: EcoOrderRequest = {
      ref: o.ref,
      companyName: o.company,
      material: newMaterial,
      qtyKg: newQty,
      supplier: newSupplier,
      distanceKm: newDistance,
      orderDate: o.orderDate,
      status: ((this.editDraft.status as OrderStatus) ?? o.status).toLowerCase() as BackendOrderStatus,
      grade: newGrade,
      co2Saved: newSaved,
      waterSaved: o.waterSaved ?? null,
      wasteAvoided: o.wasteAvoided ?? null,
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

  async downloadInvoicePdf(): Promise<void> {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });

      const W = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = 56;

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
      metaLabel('Date', this.today(), col1);
      metaLabel('Buyer', 'Your company', col2);
      metaLabel('Supplier', this.draft.supplier.slice(0, 18), col3);
      metaLabel('Distance', `${this.supplier?.distanceKm ?? 0} km`, col4);

      y += 50;
      doc.setFillColor(245, 250, 248);
      doc.rect(margin, y - 6, W - margin * 2, 26, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(80, 90, 88);
      doc.text('ITEM', col1 + 8, y + 12);
      doc.text('QTY', col2 + 8, y + 12);
      doc.text('UNIT EUR', col3 + 8, y + 12);
      doc.text('TOTAL EUR', col4 + 8, y + 12);

      y += 36;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(20, 30, 28);
      doc.text(this.draft.material, col1 + 8, y);
      doc.text(`${this.draft.qtyKg} kg`, col2 + 8, y);
      doc.text(`EUR ${this.supplier?.pricePerKg.toFixed(2) ?? '0.00'}`, col3 + 8, y);
      doc.setFont('helvetica', 'bold');
      doc.text(`EUR ${this.totalCost}`, col4 + 8, y);

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
      doc.text('Computed from backend eco-order metrics and current draft fields.',
               margin + 18, y + 38);

      const tileY = y + 54;
      const tileH = 60;
      const tileW = (W - margin * 2 - 60) / 4;
      const tiles: Array<[string, string, string]> = [
        ['CO2', `${this.draftCo2} kg`, 'projected footprint'],
        ['Water', `${this.draftWater} L`, 'historical avg by kg'],
        ['Waste', `${this.draftWaste} kg`, 'historical avoided waste'],
        ['Eco-grade', this.draftGrade, 'backend-based score'],
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

      y += 160;
      doc.setFillColor(16, 185, 129);
      doc.circle(margin + 20, y + 20, 16, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text('OK', margin + 13, y + 26);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(20, 30, 28);
      doc.text('Eco-Ressource certified', margin + 50, y + 18);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(110, 120, 118);
      doc.text(`Grade ${this.draftGrade} | ${this.estimatedDraftCo2Saved()} kg CO2 saved | ${(this.supplier?.distanceKm ?? 0) < 150 ? 'local supplier' : 'long-haul supplier'}`,
               margin + 50, y + 34);

      doc.setFontSize(8);
      doc.setTextColor(160, 170, 168);
      doc.text('Generated by Eco-Ressource - automated impact calculation, not a binding invoice.',
               margin, doc.internal.pageSize.getHeight() - 30);
      doc.text(`Reference: DRAFT-${Date.now()}`,
               W - margin - 100, doc.internal.pageSize.getHeight() - 30);

      const filename = `eco-invoice-${this.today()}.pdf`;
      doc.save(filename);
      this.showToast(`Invoice saved: ${filename}`);
    } catch (err) {
      console.error('PDF generation failed', err);
      this.showToast('PDF generation failed - check console');
    }
  }

  async downloadOrderPdf(o: Order): Promise<void> {
    const saved = { ...this.draft };
    this.draft.material = o.material;
    this.draft.qtyKg = o.qtyKg;
    this.draft.supplier = o.supplier;
    await this.downloadInvoicePdf();
    this.draft = saved;
  }

  private estimatedDraftCo2Saved(): number {
    return Math.max(0, Math.round(this.draft.qtyKg * 0.35 - (this.supplier?.distanceKm ?? 0) * 0.08));
  }

  private gradeFromMetrics(co2Saved: number, distanceKm: number): 'A' | 'B' | 'C' | 'D' | 'E' {
    if (co2Saved >= 180 && distanceKm <= 150) return 'A';
    if (co2Saved >= 120 && distanceKm <= 300) return 'B';
    if (co2Saved >= 70) return 'C';
    if (co2Saved >= 30) return 'D';
    return 'E';
  }

  private priorityMessage(avgSaved: number): string {
    if (avgSaved >= 25) return 'Strong historical eco return';
    if (avgSaved >= 10) return 'Moderate historical eco return';
    return 'Limited historical eco return';
  }

  private currentCompanyName(): string {
    return this.auth.currentUser?.company ?? this.auth.currentUser?.name ?? '';
  }
}
