import {
  Component, OnInit, AfterViewChecked,
  ChangeDetectorRef, ElementRef, ViewChildren, QueryList
} from '@angular/core';
import { EnterpriseService, Product, StockItem } from '../../../core/services/enterprise.service';
import jsPDF from 'jspdf';
import Quagga from '@ericblade/quagga2';
declare const JsBarcode: any;

export interface InventoryRow {
  product: Product;
  stockItems: StockItem[];
  totalQty: number;
  totalValue: number;
  expiringCount: number;
  expiredCount: number;
  expanded: boolean;
}

export interface AuditLine {
  stockItem: StockItem;
  realQty: number | null;
  realCondition: string;
  realExpiration: string;
  qtyDiff: number | null;
  conditionMatch: boolean;
  expirationMatch: boolean;
  status: 'ok' | 'discrepancy' | 'expired';
}

type ScanStep = 'input' | 'found' | 'audit' | 'report';
type RGB = [number, number, number];

const BRAND   = 'EcoRessource B2B';
const TAGLINE = 'Circular Economy Marketplace — Tunisia';
const PRIMARY: RGB = [99, 102, 241];
const DARK:    RGB = [17, 24, 39];
const MUTED:   RGB = [107, 114, 128];
const GREEN:   RGB = [22, 163, 74];
const RED:     RGB = [220, 38, 38];
const ORANGE:  RGB = [234, 88, 12];
const WHITE:   RGB = [255, 255, 255];

@Component({
  selector: 'app-my-inventory',
  standalone: false,
  templateUrl: './my-inventory.html',
  styleUrls: ['./my-inventory.css']
})
export class MyInventory implements OnInit, AfterViewChecked {

  rows: InventoryRow[] = [];
  loading = false;
  search = '';
  filterCategory = '';

  barcodeProduct: Product | null = null;
  barcodeRendered = false;

  showScanModal = false;
  scanStep: ScanStep = 'input';
  scanInput = '';
  scanImagePreview: string | null = null;
  scanImageReading = false;
  scanError = '';
  scanResult: InventoryRow | null = null;
  auditLines: AuditLine[] = [];
  reportLines: AuditLine[] = [];
  reportProduct: Product | null = null;

  readonly conditions  = ['New', 'Good', 'Fair', 'Poor'];
  readonly categories  = ['Metal','Plastic','Paper','Glass','Textile','Electronics','Wood','Chemical','Other'];

  @ViewChildren('barcodeCanvas') barcodeCanvases!: QueryList<ElementRef>;

  constructor(private enterpriseService: EnterpriseService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }
  ngAfterViewChecked(): void { if (this.barcodeProduct && !this.barcodeRendered) this.renderBarcode(); }

  // ── Load ──────────────────────────────────────────────────
  load(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.enterpriseService.getMyProducts().subscribe({
      next: (products) => {
        this.enterpriseService.getMyStock().subscribe({
          next: (stockItems) => {
            this.rows = products.map(p => {
              const linked     = stockItems.filter(s => s.product?.id_product === p.id_product);
              const totalQty   = linked.reduce((a, s) => a + (s.quantity   || 0), 0);
              const totalValue = linked.reduce((a, s) => a + ((s.quantity  || 0) * (s.unitPrice || 0)), 0);
              const now  = new Date(); now.setHours(0, 0, 0, 0);
              const soon = new Date(now); soon.setDate(soon.getDate() + 60);
              const expiringCount = linked.filter(s => { if (!s.expirationDate) return false; const d = new Date(s.expirationDate); return d > now && d <= soon; }).length;
              const expiredCount  = linked.filter(s => { if (!s.expirationDate) return false; return new Date(s.expirationDate) <= now; }).length;
              return { product: p, stockItems: linked, totalQty, totalValue, expiringCount, expiredCount, expanded: false };
            });
            this.loading = false;
            this.cdr.detectChanges();
          },
          error: () => { this.loading = false; this.cdr.detectChanges(); }
        });
      },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  get filtered(): InventoryRow[] {
    const q = this.search.trim().toLowerCase();
    return this.rows.filter(r =>
      (!q || r.product.name.toLowerCase().includes(q) || (r.product.barcode||'').toLowerCase().includes(q) || r.product.category.toLowerCase().includes(q)) &&
      (!this.filterCategory || r.product.category === this.filterCategory)
    );
  }

  get totalProducts()       { return this.rows.length; }
  get totalStockItems()     { return this.rows.reduce((a, r) => a + r.stockItems.length, 0); }
  get totalInventoryValue() { return this.rows.reduce((a, r) => a + r.totalValue, 0); }
  get productsWithBarcode() { return this.rows.filter(r => !!r.product.barcode).length; }
  get expiringAlert()       { return this.rows.reduce((a, r) => a + r.expiringCount, 0); }
  get expiredAlert()        { return this.rows.reduce((a, r) => a + r.expiredCount, 0); }

  // ── Barcode modal ──────────────────────────────────────────
  openBarcode(product: Product): void { this.barcodeProduct = product; this.barcodeRendered = false; this.cdr.detectChanges(); }
  closeBarcode(): void { this.barcodeProduct = null; this.barcodeRendered = false; this.cdr.detectChanges(); }

  private renderBarcode(): void {
    if (!this.barcodeProduct?.barcode) return;
    const ref = this.barcodeCanvases.first;
    if (!ref) return;
    try {
      JsBarcode(ref.nativeElement, this.barcodeProduct.barcode, {
        format: 'CODE128', width: 2, height: 80,
        displayValue: true, fontSize: 14, margin: 10,
        background: '#ffffff', lineColor: '#111827'
      });
      this.barcodeRendered = true;
      this.cdr.detectChanges();
    } catch (e) { console.error(e); }
  }

  printBarcode(): void {
    const ref = this.barcodeCanvases.first;
    if (!ref || !this.barcodeProduct) return;
    const dataUrl = (ref.nativeElement as HTMLCanvasElement).toDataURL('image/png');
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`<html><head><title>Barcode</title><style>body{font-family:sans-serif;text-align:center;padding:40px}img{max-width:320px;border:1px solid #e5e7eb;border-radius:8px;padding:16px}</style></head><body><h2>${this.barcodeProduct.name}</h2><p>${this.barcodeProduct.category} | ${this.barcodeProduct.barcode}</p><img src="${dataUrl}"><script>window.onload=function(){window.print();window.close()}<\/script></body></html>`);
    win.document.close();
  }

  // ── Scan modal ─────────────────────────────────────────────
  openScan(): void {
    this.showScanModal = true;
    this.scanStep = 'input';
    this.scanInput = '';
    this.scanImagePreview = null;
    this.scanImageReading = false;
    this.scanError = '';
    this.scanResult = null;
    this.auditLines = [];
    this.reportLines = [];
    this.reportProduct = null;
    this.cdr.detectChanges();
  }

  closeScan(): void { this.showScanModal = false; this.cdr.detectChanges(); }

  onBarcodeImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.scanImagePreview = e.target?.result as string;
      this.scanImageReading = true;
      this.scanError = '';
      this.cdr.detectChanges();
      this.decodeWithQuagga(this.scanImagePreview).then(code => {
        this.scanImageReading = false;
        if (code) {
          this.scanInput = code;
          this.scanError = '';
          this.doScan();
        } else {
          this.scanError = 'Could not read the barcode from this image. Try a clearer photo or enter the code manually below.';
          this.cdr.detectChanges();
        }
      });
    };
    reader.readAsDataURL(input.files[0]);
  }

  private decodeWithQuagga(imageSrc: string): Promise<string | null> {
    return new Promise((resolve) => {
      (Quagga as any).decodeSingle(
        {
          src: imageSrc,
          numOfWorkers: 0,
          inputStream: { size: 800 },
          decoder: { readers: ['code_128_reader','ean_reader','ean_8_reader','code_39_reader','upc_reader','upc_e_reader'] },
          locate: true
        },
        (result: any) => resolve(result?.codeResult?.code ?? null)
      );
    });
  }

  doScan(): void {
    const q = this.scanInput.trim();
    if (!q) return;
    const found = this.rows.find(r =>
      r.product.barcode === q ||
      r.product.name.toLowerCase().includes(q.toLowerCase()) ||
      String(r.product.id_product) === q
    );
    if (found) { this.scanResult = found; this.scanError = ''; this.scanStep = 'found'; }
    else { this.scanResult = null; this.scanError = `No product found for "${q}"`; }
    this.cdr.detectChanges();
  }

  startAudit(): void {
    if (!this.scanResult) return;
    this.auditLines = this.scanResult.stockItems.map(s => ({
      stockItem: s, realQty: null,
      realCondition: s.condition || 'Good',
      realExpiration: s.expirationDate || '',
      qtyDiff: null, conditionMatch: true, expirationMatch: true, status: 'ok' as const
    }));
    this.scanStep = 'audit';
    this.cdr.detectChanges();
  }

  generateReport(): void {
    this.reportProduct = this.scanResult?.product ?? null;
    this.reportLines = this.auditLines.map(line => {
      const qtyDiff        = line.realQty !== null ? line.realQty - (line.stockItem.quantity || 0) : null;
      const conditionMatch  = line.realCondition === (line.stockItem.condition || '');
      const expirationMatch = (line.realExpiration || '') === (line.stockItem.expirationDate || '');
      const now = new Date(); now.setHours(0, 0, 0, 0);
      let status: 'ok' | 'discrepancy' | 'expired' = 'ok';
      if (line.realExpiration && new Date(line.realExpiration) <= now) status = 'expired';
      else if (qtyDiff !== 0 || !conditionMatch || !expirationMatch)   status = 'discrepancy';
      return { ...line, qtyDiff, conditionMatch, expirationMatch, status };
    });
    this.scanStep = 'report';
    this.cdr.detectChanges();
  }

  get reportHasDiscrepancy() { return this.reportLines.some(l => l.status !== 'ok'); }
  get reportOkCount()        { return this.reportLines.filter(l => l.status === 'ok').length; }
  get reportDiscCount()      { return this.reportLines.filter(l => l.status === 'discrepancy').length; }
  get reportExpiredCount()   { return this.reportLines.filter(l => l.status === 'expired').length; }

  backToInput(): void { this.scanStep = 'input'; this.cdr.detectChanges(); }
  backToFound(): void { this.scanStep = 'found'; this.cdr.detectChanges(); }
  backToAudit(): void { this.scanStep = 'audit'; this.cdr.detectChanges(); }

  // ── PDF helpers ───────────────────────────────────────────
  private setColor(pdf: jsPDF, rgb: RGB): void { pdf.setTextColor(rgb[0], rgb[1], rgb[2]); }
  private setFill(pdf: jsPDF, rgb: RGB): void  { pdf.setFillColor(rgb[0], rgb[1], rgb[2]); }

  private pdfHeader(pdf: jsPDF, subtitle: string): number {
    const W = 210;
    this.setFill(pdf, PRIMARY); pdf.rect(0, 0, W, 28, 'F');
    pdf.setFontSize(16); pdf.setFont('helvetica', 'bold'); this.setColor(pdf, WHITE);
    pdf.text(BRAND, 14, 12);
    pdf.setFontSize(8); pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(199, 210, 254);
    pdf.text(TAGLINE, 14, 19);
    pdf.setFontSize(9); this.setColor(pdf, WHITE);
    pdf.text(subtitle, W - 14, 12, { align: 'right' });
    pdf.setFontSize(8); pdf.setTextColor(199, 210, 254);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, W - 14, 19, { align: 'right' });
    pdf.setFillColor(165, 180, 252); pdf.rect(0, 28, W, 1.5, 'F');
    return 38;
  }

  private pdfFooter(pdf: jsPDF, pageNum: number, totalPages: number): void {
    const W = 210; const H = 297;
    pdf.setFillColor(243, 244, 246); pdf.rect(0, H - 14, W, 14, 'F');
    pdf.setFontSize(7.5); pdf.setFont('helvetica', 'normal'); this.setColor(pdf, MUTED);
    pdf.text(`${BRAND}  ·  ${TAGLINE}`, 14, H - 5);
    pdf.text(`Page ${pageNum} / ${totalPages}`, W - 14, H - 5, { align: 'right' });
  }

  private pdfKpiRow(pdf: jsPDF, kpis: { label: string; value: string; color?: RGB }[], y: number): number {
    const W = 210; const cols = kpis.length;
    const colW = (W - 28) / cols;
    kpis.forEach((k, i) => {
      const x = 14 + i * colW;
      pdf.setFillColor(249, 250, 251);
      pdf.roundedRect(x, y, colW - 3, 18, 2, 2, 'F');
      pdf.setFontSize(13); pdf.setFont('helvetica', 'bold');
      const c = k.color ?? DARK;
      pdf.setTextColor(c[0], c[1], c[2]);
      pdf.text(k.value, x + (colW - 3) / 2, y + 10, { align: 'center' });
      pdf.setFontSize(7); pdf.setFont('helvetica', 'normal'); this.setColor(pdf, MUTED);
      pdf.text(k.label.toUpperCase(), x + (colW - 3) / 2, y + 16, { align: 'center' });
    });
    return y + 24;
  }

  private pdfTableHeader(pdf: jsPDF, cols: { label: string; x: number; w: number; align?: 'left' | 'right' | 'center' }[], y: number): number {
    this.setFill(pdf, DARK); pdf.rect(14, y, 182, 8, 'F');
    pdf.setFontSize(7.5); pdf.setFont('helvetica', 'bold'); this.setColor(pdf, WHITE);
    cols.forEach(c => {
      const tx = c.align === 'right' ? c.x + c.w : c.align === 'center' ? c.x + c.w / 2 : c.x + 2;
      pdf.text(c.label, tx, y + 5.5, { align: c.align ?? 'left' });
    });
    return y + 10;
  }

  private pill(pdf: jsPDF, text: string, color: RGB, x: number, y: number, w = 16, h = 5.5): void {
    this.setFill(pdf, color);
    pdf.roundedRect(x, y - 0.5, w, h, 1.5, 1.5, 'F');
    pdf.setFontSize(6); pdf.setFont('helvetica', 'bold'); this.setColor(pdf, WHITE);
    pdf.text(text, x + w / 2, y + 3.5, { align: 'center' });
  }

  // ── Export full inventory PDF ─────────────────────────────
  exportPDF(): void {
    const pdf = new jsPDF('p', 'mm', 'a4');
    let y = this.pdfHeader(pdf, 'INVENTORY REPORT');

    pdf.setFontSize(11); pdf.setFont('helvetica', 'bold'); this.setColor(pdf, DARK);
    pdf.text('Stock Overview', 14, y); y += 6;
    this.setFill(pdf, PRIMARY); pdf.rect(14, y, 30, 0.8, 'F'); y += 6;

    y = this.pdfKpiRow(pdf, [
      { label: 'Total Products',   value: String(this.totalProducts) },
      { label: 'Stock Lines',      value: String(this.totalStockItems) },
      { label: 'Total Value (DT)', value: this.totalInventoryValue.toFixed(2) },
      { label: 'With Barcode',     value: `${this.productsWithBarcode}/${this.totalProducts}` },
      { label: 'Expiring (<60d)',  value: String(this.expiringAlert),  color: this.expiringAlert > 0 ? ORANGE : GREEN },
      { label: 'Expired',          value: String(this.expiredAlert),   color: this.expiredAlert  > 0 ? RED    : GREEN }
    ], y);

    const cols = [
      { label: 'PRODUCT',     x: 14,  w: 44, align: 'left'   as const },
      { label: 'BARCODE',     x: 58,  w: 36, align: 'left'   as const },
      { label: 'CATEGORY',    x: 94,  w: 26, align: 'left'   as const },
      { label: 'QTY',         x: 120, w: 16, align: 'right'  as const },
      { label: 'VALUE (DT)',  x: 136, w: 26, align: 'right'  as const },
      { label: 'EXPIRING',    x: 162, w: 16, align: 'center' as const },
      { label: 'STATUS',      x: 178, w: 18, align: 'center' as const }
    ];
    y = this.pdfTableHeader(pdf, cols, y);

    let alt = false;
    for (const row of this.filtered) {
      if (y > 272) {
        this.pdfFooter(pdf, pdf.getNumberOfPages(), 1);
        pdf.addPage();
        y = this.pdfHeader(pdf, 'INVENTORY REPORT');
        y = this.pdfTableHeader(pdf, cols, y);
      }
      if (alt) { pdf.setFillColor(249, 250, 251); pdf.rect(14, y - 2, 182, 8, 'F'); }
      alt = !alt;

      pdf.setFontSize(8); pdf.setFont('helvetica', 'normal'); this.setColor(pdf, DARK);
      pdf.text(row.product.name.substring(0, 20), 16, y + 3);
      pdf.text(row.product.barcode || '—', 60, y + 3);
      pdf.text(row.product.category, 96, y + 3);
      pdf.text(String(row.totalQty), 136, y + 3, { align: 'right' });
      pdf.text(row.totalValue.toFixed(2), 162, y + 3, { align: 'right' });
      pdf.text(String(row.expiringCount), 170, y + 3, { align: 'center' });

      const statusColor = row.expiredCount > 0 ? RED : row.expiringCount > 0 ? ORANGE : GREEN;
      const statusText  = row.expiredCount > 0 ? 'EXPIRED' : row.expiringCount > 0 ? 'EXPIRING' : 'OK';
      this.pill(pdf, statusText, statusColor, 178, y - 1);
      y += 8;
    }

    this.pdfFooter(pdf, 1, 1);
    pdf.save(`EcoRessource-Inventory-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  // ── Export audit report PDF ───────────────────────────────
  exportReportPDF(): void {
    if (!this.reportProduct) return;
    const pdf = new jsPDF('p', 'mm', 'a4');
    let y = this.pdfHeader(pdf, 'AUDIT REPORT');

    // Product info block
    pdf.setFillColor(238, 242, 255);
    pdf.roundedRect(14, y, 182, 22, 3, 3, 'F');
    pdf.setFontSize(13); pdf.setFont('helvetica', 'bold'); this.setColor(pdf, PRIMARY);
    pdf.text(this.reportProduct.name, 20, y + 9);
    pdf.setFontSize(8); pdf.setFont('helvetica', 'normal'); this.setColor(pdf, MUTED);
    pdf.text(
      `Category: ${this.reportProduct.category}  ·  Material: ${this.reportProduct.materialType}  ·  Barcode: ${this.reportProduct.barcode || '—'}`,
      20, y + 16
    );
    y += 28;

    y = this.pdfKpiRow(pdf, [
      { label: 'Lines Audited',  value: String(this.reportLines.length) },
      { label: 'All OK',         value: String(this.reportOkCount),        color: this.reportOkCount === this.reportLines.length ? GREEN : DARK },
      { label: 'Discrepancies',  value: String(this.reportDiscCount),      color: this.reportDiscCount > 0 ? ORANGE : GREEN },
      { label: 'Expired',        value: String(this.reportExpiredCount),   color: this.reportExpiredCount > 0 ? RED : GREEN }
    ], y);

    pdf.setFontSize(10); pdf.setFont('helvetica', 'bold'); this.setColor(pdf, DARK);
    pdf.text('Stock Line Comparison', 14, y); y += 4;
    this.setFill(pdf, PRIMARY); pdf.rect(14, y, 30, 0.8, 'F'); y += 6;

    const cols = [
      { label: 'LOCATION',    x: 14,  w: 30, align: 'left'  as const },
      { label: 'SYS QTY',    x: 44,  w: 18, align: 'right' as const },
      { label: 'REAL QTY',   x: 62,  w: 18, align: 'right' as const },
      { label: 'DIFF',       x: 80,  w: 14, align: 'right' as const },
      { label: 'SYS COND.',  x: 94,  w: 22, align: 'left'  as const },
      { label: 'REAL COND.', x: 116, w: 22, align: 'left'  as const },
      { label: 'SYS EXPIRY', x: 138, w: 24, align: 'left'  as const },
      { label: 'REAL EXPIRY',x: 162, w: 24, align: 'left'  as const }
    ];
    y = this.pdfTableHeader(pdf, cols, y);

    for (const line of this.reportLines) {
      if (y > 265) {
        this.pdfFooter(pdf, pdf.getNumberOfPages(), 1);
        pdf.addPage();
        y = this.pdfHeader(pdf, 'AUDIT REPORT');
        y = this.pdfTableHeader(pdf, cols, y);
      }

      // Row background
      if (line.status === 'expired')      { pdf.setFillColor(254, 242, 242); pdf.rect(14, y - 2, 182, 10, 'F'); }
      else if (line.status === 'discrepancy') { pdf.setFillColor(255, 247, 237); pdf.rect(14, y - 2, 182, 10, 'F'); }
      else                                { pdf.setFillColor(240, 253, 244); pdf.rect(14, y - 2, 182, 10, 'F'); }

      pdf.setFontSize(8); pdf.setFont('helvetica', 'normal'); this.setColor(pdf, DARK);
      pdf.text((line.stockItem.location || '—').substring(0, 14), 16, y + 3);
      pdf.text(String(line.stockItem.quantity), 62, y + 3, { align: 'right' });
      pdf.text(line.realQty !== null ? String(line.realQty) : '—', 80, y + 3, { align: 'right' });

      // Diff — colored but NO spread in ternary
      if (line.qtyDiff !== null) {
        const diffColor: RGB = line.qtyDiff < 0 ? RED : line.qtyDiff > 0 ? GREEN : MUTED;
        this.setColor(pdf, diffColor);
        pdf.setFont('helvetica', 'bold');
        pdf.text((line.qtyDiff > 0 ? '+' : '') + line.qtyDiff, 94, y + 3, { align: 'right' });
        pdf.setFont('helvetica', 'normal');
      }

      this.setColor(pdf, DARK);
      pdf.text(line.stockItem.condition || '—', 96, y + 3);

      // Real condition — colored separately, no ternary spread
      const condColor: RGB = line.conditionMatch ? DARK : ORANGE;
      this.setColor(pdf, condColor);
      pdf.text(line.realCondition, 118, y + 3);

      this.setColor(pdf, DARK);
      const sysExp  = line.stockItem.expirationDate ? new Date(line.stockItem.expirationDate).toLocaleDateString('fr-TN') : '—';
      const realExp = line.realExpiration ? new Date(line.realExpiration).toLocaleDateString('fr-TN') : '—';
      pdf.text(sysExp, 140, y + 3);

      // Real expiry — colored separately
      const expColor: RGB = line.status === 'expired' ? RED : line.expirationMatch ? DARK : ORANGE;
      this.setColor(pdf, expColor);
      pdf.text(realExp, 164, y + 3);

      // Status pill
      this.setColor(pdf, DARK);
      const pillColor: RGB = line.status === 'ok' ? GREEN : line.status === 'expired' ? RED : ORANGE;
      const pillText  = line.status === 'ok' ? 'OK' : line.status === 'expired' ? 'EXPIRED' : 'DISC.';
      this.pill(pdf, pillText, pillColor, 190, y, 14);

      y += 10;
    }

    // Summary note
    y += 4;
    if (this.reportHasDiscrepancy) {
      pdf.setFillColor(255, 247, 237);
      pdf.roundedRect(14, y, 182, 14, 3, 3, 'F');
      pdf.setFontSize(8); pdf.setFont('helvetica', 'bold'); this.setColor(pdf, ORANGE);
      pdf.text('Action Required', 20, y + 6);
      pdf.setFont('helvetica', 'normal'); this.setColor(pdf, DARK);
      pdf.text(
        `${this.reportDiscCount} discrepanc${this.reportDiscCount > 1 ? 'ies' : 'y'} and ${this.reportExpiredCount} expired item(s) detected. Please update your stock to reflect physical reality.`,
        20, y + 11
      );
    } else {
      pdf.setFillColor(240, 253, 244);
      pdf.roundedRect(14, y, 182, 10, 3, 3, 'F');
      pdf.setFontSize(8); pdf.setFont('helvetica', 'bold'); this.setColor(pdf, GREEN);
      pdf.text('All stock lines match the physical audit. No action required.', 20, y + 6.5);
    }

    this.pdfFooter(pdf, 1, 1);
    pdf.save(`EcoRessource-Audit-${this.reportProduct.name.replace(/\s+/g, '_')}-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  // ── Helpers ───────────────────────────────────────────────
  getDaysUntilExpiry(dateStr: string): number { return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000); }
  getExpiryClass(dateStr: string): string {
    if (!dateStr) return 'ok';
    const d = this.getDaysUntilExpiry(dateStr);
    if (d < 0) return 'expired'; if (d <= 30) return 'danger'; if (d <= 60) return 'warning'; return 'ok';
  }
  getImageUrl(img: string | undefined): string {
    if (!img || img === 'default.png' || img === 'undefined' || img === 'null') return '';
    if (img.startsWith('http')) return img;
    return `http://localhost:8080/files/${img}`;
 
 
 
 
 
 
 
  }
}