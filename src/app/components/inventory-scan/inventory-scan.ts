import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import JsBarcode from 'jsbarcode';
import { InventoryService } from '../../core/services/inventory';
import Quagga from '@ericblade/quagga2';
import { PdfGeneratorService } from '../../core/services/pdf-generator.service';

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
  generatingPDF = false;
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
  searchTerm: string = '';
  statusFilter: string = '';
  filteredProducts: any[] = [];

  constructor(
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef,
    private pdfGenerator: PdfGeneratorService,
    private router: Router
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
        const code = p.product?.barcode;
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
      setTimeout(() => this.renderBarcodes(), 100);
    }
  }

  loadProducts() {
    this.inventoryService.getAllWithStock().subscribe({
      next: data => {
        this.products = data;
        this.filteredProducts = [...data];
        this.cdr.detectChanges();
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

  async exportInventoryToPDF() {
    this.generatingPDF = true;
    try {
      await this.pdfGenerator.generateInventoryReport(this.products);
    } catch (error) {
      console.error('PDF generation failed', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      this.generatingPDF = false;
    }
  }
  
  async exportComparisonToPDF() {
    if (!this.scanResult) {
      alert('Please perform a scan first');
      return;
    }
    this.generatingPDF = true;
    try {
      await this.pdfGenerator.generateComparisonReport(this.scanResult);
    } catch (error) {
      console.error('PDF generation failed', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      this.generatingPDF = false;
    }
  }
  
  async exportFullReport() {
    this.generatingPDF = true;
    try {
      await this.pdfGenerator.generateFullReport(this.products, this.scanResult);
    } catch (error) {
      console.error('PDF generation failed', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      this.generatingPDF = false;
    }
  }

  // Navigation Methods
  goBackToProducts(): void {
    this.router.navigate(['/admin/products']);
  }

  // Filter Methods
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      // Search filter
      const matchesSearch = !this.searchTerm || 
        product.product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (product.product.barcode && product.product.barcode.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      // Status filter
      let matchesStatus = true;
      if (this.statusFilter === 'expiring') {
        matchesStatus = this.dlcStatus(product.expirationDate) === 'warning';
      } else if (this.statusFilter === 'expired') {
        matchesStatus = this.dlcStatus(product.expirationDate) === 'expired';
      } else if (this.statusFilter === 'healthy') {
        matchesStatus = this.dlcStatus(product.expirationDate) === 'ok';
      }
      
      return matchesSearch && matchesStatus;
    });
    this.cdr.detectChanges();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filterProducts();
  }

  quickScanProduct(barcode: string): void {
    if (barcode) {
      this.barcode = barcode;
      this.activeTab = 'scan';
      this.cdr.detectChanges();
      setTimeout(() => this.doScan(), 100);
    }
  }

  getRandomGradient(id: number): string {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    ];
    return gradients[id % gradients.length];
  }
}