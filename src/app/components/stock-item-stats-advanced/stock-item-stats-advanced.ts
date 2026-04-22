import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StockItemService } from '../../core/services/stock-item';

@Component({
  selector: 'app-stock-item-stats-advanced',
  standalone: false,
  templateUrl: './stock-item-stats-advanced.html',
  styleUrls: ['./stock-item-stats-advanced.css']
})
export class StockItemStatsAdvancedComponent implements OnInit {
  stats: any = {
    totalQuantity: 0,
    totalCategories: 0,
    totalLocations: 0,
    totalValue: 0,
    averageUnitPrice: 0,
    expiredItems: 0,
    expiringIn7Days: 0,
    expiringIn30Days: 0,
    healthyItems: 0,
    stockHealthScore: 0,
    turnoverRate: 0,
    statusDistribution: {},
    conditionDistribution: {},
    locationDistribution: {},
    valueByCategory: {},
    valueByLocation: {},
    top5MostValuable: [],
    top5HighestQuantity: []
  };
  
  loading = true;
  showAdvancedStats = false;

  constructor(
    private stockItemService: StockItemService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAdvancedStats();
  }

  loadAdvancedStats(): void {
    this.loading = true;
    this.stockItemService.getAdvancedStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading advanced stats:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleAdvancedStats(): void {
    this.showAdvancedStats = !this.showAdvancedStats;
  }

  getHealthColor(score: number): string {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  }

  getHealthStatus(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Critical';
  }

  getPercentage(value: number, total: number): number {
    if (total === 0) return 0;
    return (value / total) * 100;
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat().format(value);
  }
}