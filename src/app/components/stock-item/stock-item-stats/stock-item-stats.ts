import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StockItemService } from '../../../core/services/stock-item';

@Component({
  selector: 'app-stock-item-stats',
  standalone: false,
  templateUrl: './Stock-item-stats.html',
  styleUrls: ['./stock-item-stats.css']
})
export class StockItemStatsComponent implements OnInit {
  statsByCategory: any[] = [];
  statsByLocation: any[] = [];
  totalQuantity: number = 0;
  totalCategories: number = 0;
  totalLocations: number = 0;
  maxCategoryQuantity: number = 0;
  maxLocationQuantity: number = 0;
  loading: boolean = true;

  constructor(
    private stockItemService: StockItemService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;

    this.stockItemService.getStatsByCategory().subscribe({
      next: (data) => {
        this.statsByCategory = data;
        this.calculateStats();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.stockItemService.getStatsByLocation().subscribe({
      next: (data) => {
        this.statsByLocation = data;
        this.calculateStats();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  calculateStats(): void {
    // Calculate total quantity
    this.totalQuantity = this.statsByCategory.reduce((sum, item) => sum + (item['total'] || 0), 0);
    this.totalCategories = this.statsByCategory.length;
    this.totalLocations = this.statsByLocation.length;

    // Find max quantities for percentage bars
    this.maxCategoryQuantity = Math.max(...this.statsByCategory.map(item => item['total'] || 0), 0);
    this.maxLocationQuantity = Math.max(...this.statsByLocation.map(item => item['total'] || 0), 0);

    this.loading = false;
  }

  getPercentage(quantity: number, max: number): number {
    if (max === 0) return 0;
    return (quantity / max) * 100;
  }

  back(): void {
    this.router.navigate(['/stock-items']);
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat().format(value);
  }
}