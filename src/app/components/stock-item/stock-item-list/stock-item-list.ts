import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StockItemService } from '../../../core/services/stock-item';
import { StockItem } from '../../../core/models/stock-item.model';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-stock-item-list',
  standalone: false,
  templateUrl: './stock-item-list.html',
  styleUrls: ['./stock-item-list.css']
})
export class StockItemListComponent implements OnInit {
  stockItems: StockItem[] = [];
  totalStockValue: number = 0;

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

  constructor(
    private stockItemService: StockItemService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPaginated();
    this.loadTotalValue();
    this.loadExpired();
    this.loadNearExpiry();
  }

  loadPaginated(): void {
    this.stockItemService.getPaginated(
      this.currentPage, this.pageSize, this.sortBy, this.direction
    ).subscribe({
      next: (data) => {
        this.stockItems = data.content;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.currentPage = data.number;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  loadTotalValue(): void {
    this.stockItemService.getTotalValue().subscribe({
      next: (data) => { this.totalStockValue = data.totalValue; this.cdr.detectChanges(); },
      error: (err) => console.error(err)
    });
  }

  loadExpired(): void {
    this.stockItemService.getExpired().subscribe({
      next: (data) => { this.expiredItems = data; this.cdr.detectChanges(); },
      error: (err) => console.error(err)
    });
  }

  loadNearExpiry(): void {
    this.stockItemService.getNearExpiry(30).subscribe({
      next: (data) => { this.nearExpiryItems = data; this.cdr.detectChanges(); },
      error: (err) => console.error(err)
    });
  }

  search(): void {
    if (!this.searchStatus && !this.searchLocation && !this.searchProductName) {
      this.loadPaginated();
      return;
    }
    this.stockItemService.search(
      this.searchStatus, this.searchLocation, this.searchProductName
    ).subscribe({
      next: (data) => { this.stockItems = [...data]; this.cdr.detectChanges(); },
      error: (err) => console.error(err)
    });
  }

  resetSearch(): void {
    this.searchStatus = '';
    this.searchLocation = '';
    this.searchProductName = '';
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
  if (this.sortBy !== column) {
    return '↕️'; // Non trié
  }
  return this.direction === 'asc' ? '↑' : '↓'; // Tri ascendant ou descendant
}

  addStockItem(): void { this.router.navigate(['/admin/stockitems/add']); }
  detailStockItem(id: number): void { this.router.navigate(['/admin/stockitems/detail', id]); }
  editStockItem(id: number): void { this.router.navigate(['/admin/stockitems/edit', id]); }

  deleteStockItem(id: number | undefined): void {
    if (id === undefined || id === null) {
      console.warn('Cannot delete: idStock is undefined');
      return;
    }
    if (confirm('Delete this stock item?')) {
      this.stockItemService.delete(id).subscribe(() => {
        this.loadPaginated();
        this.loadTotalValue();
        this.loadExpired();
        this.loadNearExpiry();
      });
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  isExpired(date: string): boolean {
    if (!date) return false;
    return new Date(date) < new Date();
  }

  isNearExpiry(date: string): boolean {
    if (!date) return false;
    const d = new Date(date);
    const now = new Date();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + 30);
    return d >= now && d <= cutoff;
  }

  exportToExcel(): void {
    const hasFilters = this.searchStatus || this.searchLocation || this.searchProductName;
    if (hasFilters) {
      this.generateExcel(this.stockItems);
    } else {
      this.stockItemService.getAll().subscribe({
        next: (data) => this.generateExcel(data),
        error: (err) => console.error(err)
      });
    }
  }

  private generateExcel(items: StockItem[]): void {
    const exportData = items.map(s => ({
      'ID': s.idStock,
      'Product': s.product?.name ?? '',
      'Quantity': s.quantity,
      'Unit Price (DT)': s.unitPrice,
      'Total (DT)': s.quantity * s.unitPrice,
      'Unit': s.unit,
      'Status': s.status,
      'Location': s.location,
      'Condition': s.condition,
      'Expiration Date': s.expirationDate,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Items');

    const cols = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, 15)
    }));
    worksheet['!cols'] = cols;

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
    input.accept = '.xlsx';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) this.handleImport(file);
    };
    input.click();
  }

  handleImport(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      if (rows.length === 0) {
        alert('The file is empty!');
        return;
      }

      if (!confirm(`Import ${rows.length} rows into the database?`)) return;

      this.stockItemService.importFromExcel(rows).subscribe({
        next: (res) => {
          alert(`✅ Imported ${res.saved} items successfully.${res.errors.length > 0 ? '\n⚠️ Errors:\n' + res.errors.join('\n') : ''}`);
          this.loadPaginated();
          this.loadTotalValue();
          this.loadExpired();
          this.loadNearExpiry();
        },
        error: (err) => alert('❌ Import failed: ' + err.message)
      });
    };
    reader.readAsArrayBuffer(file);
  }

  manageProducts(): void {
    this.router.navigate(['/admin/products']);
  }
}