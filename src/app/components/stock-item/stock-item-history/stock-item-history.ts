import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockMovementService } from '../../../core/services/stock-movement.service';
import { StockMovement } from '../../../core/models/stock-movement.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-stock-item-history',
  standalone: false,
  templateUrl: './stock-item-history.html',
  styleUrls: ['./stock-item-history.css']
})
export class StockItemHistoryComponent implements OnInit, OnDestroy {
  history: StockMovement[] = [];
  filteredHistory: StockMovement[] = [];
  stockId: number = 0;
  loading: boolean = true;
  searchTerm: string = '';
  selectedType: string = 'all';
  dateRange: { start: Date | null; end: Date | null } = { start: null, end: null };
  private destroy$ = new Subject<void>();
  sortField: string = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';

  summary: {
    totalIn: number;
    totalOut: number;
    netChange: number;
    totalMovements: number;
    avgIn: number;
    avgOut: number;
    largestIn: number;
    largestOut: number;
  } = {
    totalIn: 0,
    totalOut: 0,
    netChange: 0,
    totalMovements: 0,
    avgIn: 0,
    avgOut: 0,
    largestIn: 0,
    largestOut: 0
  };

  chartData: {
    labels: string[];
    inValues: number[];
    outValues: number[];
  } = {
    labels: [],
    inValues: [],
    outValues: []
  };

  constructor(
    private movementService: StockMovementService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.stockId = +id;
      this.loadHistory();
    } else {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadHistory(): void {
    this.loading = true;
    this.movementService.getHistoryByStock(this.stockId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => { 
          this.history = data; 
          this.filteredHistory = [...data];
          this.calculateSummary();
          this.prepareChartData();
          this.sortData();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  calculateSummary(): void {
    const inMovements = this.filteredHistory.filter(m => m.movementType === 'IN');
    const outMovements = this.filteredHistory.filter(m => m.movementType === 'OUT');
    
    this.summary.totalIn = inMovements.reduce((sum, m) => sum + m.quantity, 0);
    this.summary.totalOut = outMovements.reduce((sum, m) => sum + m.quantity, 0);
    this.summary.netChange = this.summary.totalIn - this.summary.totalOut;
    this.summary.totalMovements = this.filteredHistory.length;
    this.summary.avgIn = inMovements.length ? Math.round(this.summary.totalIn / inMovements.length) : 0;
    this.summary.avgOut = outMovements.length ? Math.round(this.summary.totalOut / outMovements.length) : 0;
    this.summary.largestIn = Math.max(...inMovements.map(m => m.quantity), 0);
    this.summary.largestOut = Math.max(...outMovements.map(m => m.quantity), 0);
  }

  prepareChartData(): void {
    // Group by date (last 30 days or all data if less)
    const dateMap = new Map<string, { in: number; out: number }>();
    
    this.filteredHistory.forEach(m => {
      const date = new Date(m.movementDate).toLocaleDateString();
      if (!dateMap.has(date)) {
        dateMap.set(date, { in: 0, out: 0 });
      }
      const current = dateMap.get(date)!;
      if (m.movementType === 'IN') {
        current.in += m.quantity;
      } else {
        current.out += m.quantity;
      }
    });

    // Get last 30 days or all dates
    const sortedDates = Array.from(dateMap.keys()).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const recentDates = sortedDates.slice(-30);
    
    this.chartData.labels = recentDates;
    this.chartData.inValues = recentDates.map(d => dateMap.get(d)?.in || 0);
    this.chartData.outValues = recentDates.map(d => dateMap.get(d)?.out || 0);
  }

  applyFilters(): void {
    let filtered = [...this.history];
    
    // Filter by type
    if (this.selectedType !== 'all') {
      filtered = filtered.filter(m => m.movementType === this.selectedType);
    }
    
    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.description?.toLowerCase().includes(term) ||
        m.quantity.toString().includes(term)
      );
    }
    
    // Filter by date range
    if (this.dateRange.start) {
      filtered = filtered.filter(m => new Date(m.movementDate) >= this.dateRange.start!);
    }
    if (this.dateRange.end) {
      const endDate = new Date(this.dateRange.end);
      endDate.setHours(23, 59, 59);
      filtered = filtered.filter(m => new Date(m.movementDate) <= endDate);
    }
    
    this.filteredHistory = filtered;
    this.calculateSummary();
    this.prepareChartData();
    this.sortData();
    this.cdr.detectChanges();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedType = 'all';
    this.dateRange = { start: null, end: null };
    this.filteredHistory = [...this.history];
    this.calculateSummary();
    this.prepareChartData();
    this.sortData();
    this.cdr.detectChanges();
  }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'desc';
    }
    this.sortData();
    this.cdr.detectChanges();
  }

  sortData(): void {
    this.filteredHistory.sort((a, b) => {
      let aVal: any;
      let bVal: any;
      
      if (this.sortField === 'date') {
        aVal = new Date(a.movementDate).getTime();
        bVal = new Date(b.movementDate).getTime();
      } else if (this.sortField === 'quantity') {
        aVal = a.quantity;
        bVal = b.quantity;
      } else {
        return 0;
      }
      
      if (this.sortDirection === 'asc') {
        return aVal - bVal;
      } else {
        return bVal - aVal;
      }
    });
  }

  exportToCSV(): void {
    const headers = ['Date', 'Type', 'Quantity', 'Description', 'Reference'];
    const rows = this.filteredHistory.map(h => [
      new Date(h.movementDate).toLocaleString(),
      h.movementType,
      h.quantity,
      h.description || '',
      h.id
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `stock-item-${this.stockId}-history-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  back(): void { 
    this.router.navigate(['/stockitems']); 
  }

  getBadgeClass(type: string): string {
    if (type === 'IN') return 'badge-in';
    if (type === 'OUT') return 'badge-out';
    return 'badge-transfer';
  }

  getBadgeIcon(type: string): string {
    if (type === 'IN') return '⬇️';
    if (type === 'OUT') return '⬆️';
    return '🔄';
  }

  getMostActivePeriod(): string {
    if (this.filteredHistory.length === 0) return '';
    
    const months: { [key: string]: number } = {};
    this.filteredHistory.forEach(h => {
      const month = new Date(h.movementDate).toLocaleString('default', { month: 'long', year: 'numeric' });
      months[month] = (months[month] || 0) + 1;
    });
    
    const mostActive = Object.entries(months).sort((a, b) => b[1] - a[1])[0];
    return mostActive ? mostActive[0] : '';
  }

  getAverageMovementSize(): number {
    if (this.filteredHistory.length === 0) return 0;
    const total = this.filteredHistory.reduce((sum, h) => sum + h.quantity, 0);
    return Math.round(total / this.filteredHistory.length);
  }

  getLastMovementDate(): Date | null {
    if (this.filteredHistory.length === 0) return null;
    const dates = this.filteredHistory.map(h => new Date(h.movementDate));
    return new Date(Math.max(...dates.map(d => d.getTime())));
  }

  getLastMovementDateFormatted(): string {
    const lastDate = this.getLastMovementDate();
    if (!lastDate) return '';
    
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return lastDate.toLocaleString('default', options);
  }

  getTrendPercentage(): number {
    if (this.summary.totalMovements === 0) return 0;
    const recentCount = this.filteredHistory.slice(0, 10).length;
    const olderCount = this.filteredHistory.slice(10, 20).length;
    if (olderCount === 0) return recentCount > 0 ? 100 : 0;
    return Math.round(((recentCount - olderCount) / olderCount) * 100);
  }

  getMaxValueForChart(): number {
    const maxIn = Math.max(...this.chartData.inValues, 0);
    const maxOut = Math.max(...this.chartData.outValues, 0);
    return Math.max(maxIn, maxOut);
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}