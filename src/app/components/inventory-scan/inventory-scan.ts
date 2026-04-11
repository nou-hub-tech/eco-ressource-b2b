import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { InventoryService } from '../../core/services/inventory';
import Quagga from '@ericblade/quagga2';

@Component({
  selector: 'app-inventory-scan',
  standalone: false,
  templateUrl: './inventory-scan.html',
  styleUrls: ['./inventory-scan.css']
})
export class InventoryScanComponent implements OnInit, AfterViewInit {
  products: any[] = [];
  history: any[] = [];
  activeTab = 'products';

  barcode = '';
  realQty: number = 0;
  realCondition = '';
  realLocation = '';

  scanResult: any = null;
  scanError = '';
  loading = false;

  imageError = '';
  imageScanning = false;
  scannedImagePreview: string | null = null;

  constructor(
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadHistory();
  }

  ngAfterViewInit() {
    // nothing needed here anymore
  }

  renderBarcodes() {
    setTimeout(() => {
      this.products.forEach(p => {
        const code = p.product.barcode;
        if (!code) return;
        const el = document.getElementById('bc_' + p.product.id_product);
        if (el) {
          try {
            JsBarcode(el, code, {
              format: 'CODE128',
              width: 1.2,
              height: 35,
              displayValue: false,
              margin: 0,
              background: 'transparent',
              lineColor: '#000'
            });
          } catch (e) {}
        }
      });
    }, 100);
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.cdr.detectChanges();
    if (tab === 'products') {
      this.renderBarcodes();
    }
  }

  loadProducts() {
    this.inventoryService.getAllWithStock().subscribe({
      next: data => {
        this.products = data;
        this.cdr.detectChanges();
        // Render barcodes after data loads and DOM updates
        this.renderBarcodes();
      },
      error: err => console.error('Failed to load products', err)
    });
  }

  loadHistory() {
    this.inventoryService.getHistory().subscribe({
      next: data => {
        this.history = data;
        this.cdr.detectChanges();
      },
      error: err => console.error('Failed to load history', err)
    });
  }

  async onBarcodeImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    this.imageError = '';
    this.imageScanning = true;
    this.scannedImagePreview = URL.createObjectURL(file);
    this.cdr.detectChanges();

    try {
      const result = await this.decodeWithQuagga(this.scannedImagePreview);
      if (result) {
        this.barcode = result;
        this.imageError = '';
      } else {
        this.imageError = 'No barcode detected. Try a clearer image.';
        this.barcode = '';
      }
    } catch (e) {
      this.imageError = 'No barcode detected. Try a clearer image.';
      this.barcode = '';
    }

    this.imageScanning = false;
    this.cdr.detectChanges();
    input.value = '';
  }

  private decodeWithQuagga(imageSrc: string): Promise<string | null> {
    return new Promise((resolve) => {
      Quagga.decodeSingle(
        {
          src: imageSrc,
          numOfWorkers: 0,
          inputStream: { size: 800 },
          decoder: {
            readers: [
              'code_128_reader',
              'ean_reader',
              'ean_8_reader',
              'code_39_reader',
              'upc_reader',
              'upc_e_reader'
            ]
          },
          locate: true
        },
        (result: any) => {
          if (result && result.codeResult && result.codeResult.code) {
            resolve(result.codeResult.code);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  doScan() {
    if (!this.barcode) return;
    this.loading = true;
    this.scanResult = null;
    this.scanError = '';

    this.inventoryService.scan({
      barcode: this.barcode,
      realQty: this.realQty,
      realCondition: this.realCondition,
      realLocation: this.realLocation
    }).subscribe({
      next: data => {
        this.scanResult = data;
        this.loading = false;
        this.loadHistory();
        this.cdr.detectChanges();
      },
      error: err => {
        this.scanError = err.error?.error || 'Product not found for this barcode.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  get withBarcodeCount(): number {
    return this.products.filter(p => p.product?.barcode).length;
  }

  get expiringSoonCount(): number {
    return this.products.filter(p => {
      if (!p.expirationDate) return false;
      const days = Math.round((new Date(p.expirationDate).getTime() - Date.now()) / 86400000);
      return days >= 0 && days < 60;
    }).length;
  }

  dlcStatus(dlc: string): string {
    if (!dlc) return 'none';
    const days = Math.round((new Date(dlc).getTime() - Date.now()) / 86400000);
    if (days < 0) return 'expired';
    if (days < 60) return 'warning';
    return 'ok';
  }

  dlcLabel(dlc: string): string {
    if (!dlc) return 'No DLC';
    const days = Math.round((new Date(dlc).getTime() - Date.now()) / 86400000);
    if (days < 0) return 'Expired';
    if (days < 60) return days + 'd left';
    return new Date(dlc).toLocaleDateString();
  }
}