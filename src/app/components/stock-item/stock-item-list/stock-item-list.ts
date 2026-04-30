import { Component, OnInit, ChangeDetectorRef, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { StockItemService } from '../../../core/services/stock-item';
import { StockItem } from '../../../core/models/stock-item.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-stock-item-list',
  standalone: false,
  templateUrl: './stock-item-list.html',
  styleUrls: ['./stock-item-list.css']
})
export class StockItemListComponent implements OnInit, OnDestroy {
  stockItems: StockItem[] = [];
  totalStockValue: number = 0;
  
  isLoading: boolean = true;
  
  searchStatus: string = '';
  searchLocation: string = '';
  searchProductName: string = '';
  
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  totalElements: number = 0;
  
  sortBy: string = 'quantity';
  direction: string = 'asc';
  
  expiredItems: StockItem[] = [];
  nearExpiryItems: StockItem[] = [];
  showExpired: boolean = false;
  showNearExpiry: boolean = false;
  activeTab: string = 'list';
  
  private destroy$ = new Subject<void>();

  constructor(
    private stockItemService: StockItemService,
    public router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  loadAllData(): void {
    this.isLoading = true;
    this.cdr.detectChanges();
    this.loadPaginated();
    this.loadTotalValue();
    this.loadExpired();
    this.loadNearExpiry();
  }

  loadPaginated(): void {
    this.loadPaginatedPage();
  }

  private loadPaginatedPage(): void {
    this.stockItemService.getPaginated(
      this.currentPage, this.pageSize, this.sortBy, this.direction
    ).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.ngZone.run(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      })
    ).subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.applyPageResponse(data);
          if (this.stockItems.length > 0 && this.totalElements === 0) {
            this.applyClientResult(this.stockItems);
          }
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error loading stock items:', err);
        this.loadAllAsFallback();
      }
    });
  }

  loadTotalValue(): void {
    this.stockItemService.getTotalValue().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => { 
        this.ngZone.run(() => {
          this.totalStockValue = data?.totalValue || 0;
          this.cdr.detectChanges();
          this.updateDOMElement('totalValueDisplay', this.totalStockValue.toFixed(2));
        });
      },
      error: (err) => { 
        console.error('Error loading total value:', err);
        this.totalStockValue = 0;
        this.cdr.detectChanges();
      }
    });
  }

  loadExpired(): void {
    this.stockItemService.getExpired().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => { 
        this.ngZone.run(() => {
          this.expiredItems = data || [];
          this.cdr.detectChanges();
          this.updateDOMElement('expiredCountDisplay', this.expiredItems.length.toString());
        });
      },
      error: (err) => { 
        console.error('Error loading expired items:', err);
        this.expiredItems = [];
        this.cdr.detectChanges();
      }
    });
  }

  loadNearExpiry(): void {
    this.stockItemService.getNearExpiry(30).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => { 
        this.ngZone.run(() => {
          this.nearExpiryItems = data || [];
          this.cdr.detectChanges();
          this.updateDOMElement('nearExpiryCountDisplay', this.nearExpiryItems.length.toString());
        });
      },
      error: (err) => { 
        console.error('Error loading near expiry items:', err);
        this.nearExpiryItems = [];
        this.cdr.detectChanges();
      }
    });
  }

  updateDOMElement(elementId: string, value: string): void {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) element.innerText = value;
    }, 10);
  }

  search(): void {
    if (!this.searchStatus && !this.searchLocation && !this.searchProductName) {
      this.loadPaginated();
      return;
    }
    this.isLoading = true;
    this.cdr.detectChanges();
    this.stockItemService.search(
      this.searchStatus, this.searchLocation, this.searchProductName
    ).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (data) => { 
        this.ngZone.run(() => {
          this.applyClientResult(data || []);
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Search error:', err);
        this.stockItems = [];
        this.cdr.detectChanges();
      }
    });
  }

  resetSearch(): void {
    this.searchStatus = '';
    this.searchLocation = '';
    this.searchProductName = '';
    this.currentPage = 0;
    this.loadPaginated();
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadPaginated();
    }
  }

  changePageSize(): void {
    this.currentPage = 0;
    this.loadPaginated();
  }

  sort(column: string): void {
    if (this.sortBy === column) {
      this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.direction = 'asc';
    }
    this.currentPage = 0;
    this.loadPaginated();
  }

  getSortIcon(column: string): string {
    if (this.sortBy !== column) return '↕️';
    return this.direction === 'asc' ? '↑' : '↓';
  }

  addStockItem(): void { this.router.navigate(['/admin/stockitems/add']); }
  detailStockItem(id: number): void { if (id) this.router.navigate(['/admin/stockitems/detail', id]); }
  editStockItem(id: number): void { if (id) this.router.navigate(['/admin/stockitems/edit', id]); }
  
  deleteStockItem(id: number | undefined): void {
    if (!id) return;
    if (confirm('Delete this stock item?')) {
      this.stockItemService.delete(id).subscribe({
        next: () => this.loadAllData(),
        error: (err) => console.error('Delete error:', err)
      });
    }
  }

  getPages(): number[] {
    return Array.from({ length: Math.max(this.totalPages, 0) }, (_, i) => i);
  }

  canGoPrevious(): boolean {
    return this.currentPage > 0;
  }

  canGoNext(): boolean {
    return this.totalPages > 0 && this.currentPage < this.totalPages - 1;
  }

  displayedCurrentPage(): number {
    return this.totalPages > 0 ? this.currentPage + 1 : 0;
  }

  private applyPageResponse(data: any): void {
    const content = Array.isArray(data)
      ? data
      : Array.isArray(data?.content)
        ? data.content
        : [];
    const pageMeta = Array.isArray(data) ? null : data?.page;
    const rawTotalElements = Array.isArray(data)
      ? content.length
      : data?.totalElements ?? pageMeta?.totalElements ?? data?.numberOfElements ?? content.length;
    const totalElements = Math.max(this.toSafeNumber(rawTotalElements, content.length), content.length);
    const rawTotalPages = Array.isArray(data)
      ? undefined
      : data?.totalPages ?? pageMeta?.totalPages;
    const computedPages = totalElements > 0 ? Math.ceil(totalElements / this.pageSize) : 0;
    const totalPages = this.toSafeNumber(rawTotalPages, computedPages);
    const rawPage = Array.isArray(data)
      ? this.currentPage
      : data?.number ?? pageMeta?.number ?? data?.pageable?.pageNumber ?? this.currentPage;

    this.stockItems = content;
    this.totalElements = totalElements;
    this.totalPages = totalPages > 0 ? totalPages : computedPages;
    this.currentPage = this.clampPage(this.toSafeNumber(rawPage, this.currentPage));
  }

  private applyClientResult(items: StockItem[]): void {
    this.stockItems = Array.isArray(items) ? items : [];
    this.totalElements = this.stockItems.length;
    this.totalPages = this.totalElements > 0 ? Math.ceil(this.totalElements / this.pageSize) : 0;
    this.currentPage = 0;
  }

  private toSafeNumber(value: unknown, fallback: number): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  private clampPage(page: number): number {
    if (this.totalPages <= 0) return 0;
    return Math.min(Math.max(page, 0), this.totalPages - 1);
  }

  private loadAllAsFallback(): void {
    this.stockItemService.getAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (items) => {
        this.ngZone.run(() => {
          this.applyClientResult(items || []);
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.stockItems = [];
          this.totalElements = 0;
          this.totalPages = 0;
          this.currentPage = 0;
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  isExpired(date: string | Date | null | undefined): boolean {
    if (!date) return false;
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return false;
      return dateObj < new Date();
    } catch { return false; }
  }

  isNearExpiry(date: string | Date | null | undefined): boolean {
    if (!date) return false;
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return false;
      const now = new Date();
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() + 30);
      return d >= now && d <= cutoff;
    } catch { return false; }
  }
  
  formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'N/A';
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return 'Invalid Date';
      return dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return 'Invalid Date'; }
  }

  exportToExcel(): void {
    const hasFilters = this.searchStatus || this.searchLocation || this.searchProductName;
    if (hasFilters) {
      this.generateExcel(this.stockItems);
    } else {
      this.isLoading = true;
      this.cdr.detectChanges();
      
      this.stockItemService.getAll().pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges();
        })
      ).subscribe({
        next: (data) => this.generateExcel(data || []),
        error: (err) => {
          console.error('Export error:', err);
          alert('Failed to export data. Please try again.');
        }
      });
    }
  }

  private generateExcel(items: StockItem[]): void {
    if (!items || items.length === 0) {
      alert('No data to export!');
      return;
    }
    
    const exportData = items.map(s => ({
      'ID': s.idStock || 'N/A',
      'Product': s.product?.name ?? 'N/A',
      'Quantity': s.quantity || 0,
      'Unit Price (DT)': s.unitPrice || 0,
      'Total (DT)': (s.quantity || 0) * (s.unitPrice || 0),
      'Unit': s.unit || 'N/A',
      'Status': s.status || 'N/A',
      'Location': s.location || 'N/A',
      'Condition': s.condition || 'N/A',
      'Expiration Date': this.formatDate(s.expirationDate),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Items');

    const maxWidth = 20;
    worksheet['!cols'] = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.min(Math.max(key.length, 15), maxWidth)
    }));

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const fileName = `stock-items-${new Date().toISOString().slice(0, 10)}.xlsx`;
    saveAs(blob, fileName);
  }

  triggerImport(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) this.handleImport(file);
    };
    input.click();
  }

  handleImport(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows: any[] = XLSX.utils.sheet_to_json(sheet);

        if (rows.length === 0) {
          alert('The file is empty!');
          return;
        }

        if (!confirm(`Import ${rows.length} rows into the database?`)) return;

        this.isLoading = true;
        this.cdr.detectChanges();
        
        this.stockItemService.importFromExcel(rows).pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
          })
        ).subscribe({
          next: (res) => {
            alert(`✅ Imported ${res.saved || 0} items successfully.${res.errors?.length ? '\n⚠️ Errors:\n' + res.errors.join('\n') : ''}`);
            this.loadAllData();
          },
          error: (err) => {
            console.error('Import error:', err);
            alert('❌ Import failed: ' + (err.message || 'Unknown error'));
          }
        });
      } catch (error) {
        console.error('File reading error:', error);
        alert('Failed to read the file. Please make sure it\'s a valid Excel file.');
      }
    };
    reader.onerror = () => {
      alert('Failed to read the file.');
    };
    reader.readAsArrayBuffer(file);
  }

  manageProducts(): void {
    this.router.navigate(['/admin/products']);
  }
  
  refreshData(): void {
    console.log('Manual refresh triggered');
    this.loadAllData();
  }
 getImageUrl(imagePath: any): string {
  // Handle null, undefined, empty values
  if (imagePath === null || imagePath === undefined || imagePath === '') {
    return '';
  }
  
  // Convert to string and trim
  const str = String(imagePath).trim();
  
  // Reject only known invalid values
  if (!str || 
      str === 'undefined' || 
      str === 'null' || 
      str === 'default.png' || 
      str === '[object Object]') {
    return '';
  }
  
  // If it's already a valid full URL, return as-is
  if (str.startsWith('http://') || str.startsWith('https://')) {
    // Reject URLs with invalid path segments
    if (str.includes('/files/undefined') || str.includes('/files/null')) {
      return '';
    }
    return str;
  }
  
  // If it contains 'files/', extract the filename
  if (str.includes('files/')) {
    const filename = str.split('files/')[1];
    return `/files/${filename}`;
  }
  
  // Otherwise, treat as filename and build the URL
  return `/files/${str}`;
}

handleImageError(item: StockItem): void {
  item.image = '';
  this.cdr.detectChanges();
}
}
