import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import Quagga from '@ericblade/quagga2';
declare const JsBarcode: any;

@Component({
  selector: 'app-product-finder',
  standalone: false,
  templateUrl: './product-finder.html',
  styleUrls: ['./product-finder.css']
})
export class ProductFinder implements OnInit {

  items: any[] = [];
  loading = false;

  // Filters
  search     = '';
  category   = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  // Barcode scan
  barcodeInput        = '';
  scanImagePreview: string | null = null;
  imageScanning       = false;
  imageError          = '';
  barcodeResult: any  = null;
  barcodeError        = '';
  showBarcodeModal    = false;

  // Detail modal
  selectedItem: any = null;

  readonly categories = ['Metal','Plastic','Paper','Glass','Textile','Electronics','Wood','Chemical','Other'];
  private readonly api = `${environment.apiUrl}/enterprise/finder`;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void { this.loadMarket(); }

  loadMarket(): void {
    this.loading = true;
    this.cdr.detectChanges();
    const params: any = {};
    if (this.search.trim())   params['search']   = this.search.trim();
    if (this.category)        params['category'] = this.category;
    if (this.minPrice != null) params['minPrice'] = this.minPrice;
    if (this.maxPrice != null) params['maxPrice'] = this.maxPrice;

    this.http.get<any[]>(`${this.api}/market`, { params }).subscribe({
      next: data => {
        this.items   = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  applyFilters(): void { this.loadMarket(); }

  clearFilters(): void {
    this.search   = '';
    this.category = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.loadMarket();
  }

  // ── Detail modal ──────────────────────────────────────────
  openDetail(item: any): void { this.selectedItem = item; this.cdr.detectChanges(); }
  closeDetail(): void { this.selectedItem = null; this.cdr.detectChanges(); }

  // ── Barcode modal ─────────────────────────────────────────
  openBarcodeModal(): void {
    this.showBarcodeModal = true;
    this.barcodeInput     = '';
    this.scanImagePreview = null;
    this.imageError       = '';
    this.barcodeResult    = null;
    this.barcodeError     = '';
    this.cdr.detectChanges();
  }

  closeBarcodeModal(): void { this.showBarcodeModal = false; this.cdr.detectChanges(); }

  async onBarcodeImageSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files?.[0]) return;
    this.imageError       = '';
    this.imageScanning    = true;
    this.scanImagePreview = URL.createObjectURL(input.files[0]);
    this.cdr.detectChanges();
    try {
      const code = await this.decodeWithQuagga(this.scanImagePreview);
      if (code) { this.barcodeInput = code; this.imageError = ''; }
      else { this.imageError = 'No barcode detected. Try a clearer image or enter manually.'; }
    } catch { this.imageError = 'No barcode detected.'; }
    this.imageScanning = false;
    this.cdr.detectChanges();
    input.value = '';
  }

  private decodeWithQuagga(src: string): Promise<string | null> {
    return new Promise(resolve => {
      (Quagga as any).decodeSingle(
        { src, numOfWorkers: 0, inputStream: { size: 800 }, decoder: { readers: ['code_128_reader','ean_reader','ean_8_reader','code_39_reader','upc_reader'] }, locate: true },
        (result: any) => resolve(result?.codeResult?.code ?? null)
      );
    });
  }

  searchByBarcode(): void {
    const bc = this.barcodeInput.trim();
    if (!bc) return;
    this.barcodeResult = null;
    this.barcodeError  = '';
    this.http.get<any>(`${this.api}/market/${bc}`).subscribe({
      next: data => { this.barcodeResult = data; this.cdr.detectChanges(); },
      error: err => { this.barcodeError = err.error?.error || 'No product found for this barcode.'; this.cdr.detectChanges(); }
    });
  }

  // ── Helpers ───────────────────────────────────────────────
  getExpiryClass(dateStr: string): string {
    if (!dateStr) return 'ok';
    const d = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
    if (d < 0) return 'expired'; if (d <= 30) return 'danger'; if (d <= 60) return 'warning'; return 'ok';
  }

  getExpiryLabel(dateStr: string): string {
    if (!dateStr) return 'No expiry';
    const d = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
    if (d < 0) return 'Expired'; if (d < 60) return d + 'd left'; return new Date(dateStr).toLocaleDateString('fr-TN');
  }

  getImageUrl(img: string | undefined): string {
    if (!img || img === 'default.png' || img === 'undefined') return '';
    if (img.startsWith('http')) return img;
    return `/files/${img}`;
  }

  getCategoryColor(cat: string): string {
    const map: Record<string, string> = { Metal:'#3b82f6', Plastic:'#10b981', Paper:'#f59e0b', Glass:'#8b5cf6', Textile:'#ec4899', Electronics:'#06b6d4', Wood:'#78350f', Chemical:'#ef4444' };
    return map[cat] || '#6b7280';
  }

  getInitials(name: string): string { return (name || '??').slice(0, 2).toUpperCase(); }

  goBack(): void { this.router.navigate(['/enterprise/my-stock']); }
}
