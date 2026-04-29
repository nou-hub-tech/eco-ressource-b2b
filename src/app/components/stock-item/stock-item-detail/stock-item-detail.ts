import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockItem } from '../../../core/models/stock-item.model';
import { StockItemService } from '../../../core/services/stock-item';

@Component({
  selector: 'app-stock-item-detail',
  standalone: false,
  templateUrl: './stock-item-detail.html',
  styleUrl: './stock-item-detail.css'
})
export class StockItemDetailComponent implements OnInit {
  stockItem: StockItem | null = null;

  constructor(
    private stockItemService: StockItemService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.stockItemService.getById(+id).subscribe(data => {
        this.stockItem = { ...data };
        this.cdr.detectChanges();
      });
    }
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

  handleImageError(): void {
    if (this.stockItem) {
      this.stockItem.image = '';
      this.cdr.detectChanges();
    }
  }

  edit(): void { this.router.navigate(['/admin/stockitems/edit', this.stockItem?.idStock]); }
  delete(): void {
    if (confirm('Delete this stock item?')) {
      this.stockItemService.delete(this.stockItem!.idStock!).subscribe(() => {
        this.router.navigate(['/admin/stockitems']);
      });
    }
  }
  back(): void { this.router.navigate(['/admin/stockitems']); }

  getStatusClass(status: string): string {
    switch(status?.toLowerCase()) {
      case 'in stock': return 'active';
      case 'low stock': return 'warning';
      case 'out of stock': return 'danger';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch(status?.toLowerCase()) {
      case 'in stock': return 'fa-check-circle';
      case 'low stock': return 'fa-exclamation-triangle';
      case 'out of stock': return 'fa-times-circle';
      default: return 'fa-info-circle';
    }
  }

  isExpiringSoon(expirationDate: string): boolean {
    if (!expirationDate) return false;
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 90;
  }

  formatDate(date: string): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getExpiryIcon(expirationDate: string): string {
    if (!expirationDate) return 'fa-calendar';
    return this.isExpiringSoon(expirationDate) ? 'fa-clock' : 'fa-calendar-check';
  }

  getConditionClass(condition: string): string {
    switch(condition?.toLowerCase()) {
      case 'excellent': return 'excellent';
      case 'good': return 'good';
      case 'fair': return 'fair';
      case 'poor': return 'poor';
      default: return '';
    }
  }

  getLastUpdated(): string {
    return new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStockPercentage(quantity: number): number {
    const maxStock = 1000;
    return Math.min((quantity / maxStock) * 100, 100);
  }

  getStockLevelText(quantity: number): string {
    if (quantity <= 0) return 'Out of Stock';
    if (quantity < 100) return 'Low Stock - Reorder Soon';
    if (quantity < 500) return 'Normal Stock Level';
    return 'Healthy Stock Level';
  }

  getReorderStatus(quantity: number): string {
    if (quantity <= 0) return 'Urgent: Place order immediately';
    if (quantity < 100) return 'Warning: Reorder point reached';
    if (quantity < 500) return 'Adequate: Monitor regularly';
    return 'Optimal: No action needed';
  }
}