import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { StockMovementService } from '../../../core/services/stock-movement.service';
import { StockMovement } from '../../../core/models/stock-movement.model';

@Component({
  selector: 'app-stock-all-history',
  standalone: false,
  templateUrl: './stock-all-history.html',
  styleUrls: ['./stock-all-history.css']
})
export class StockAllHistoryComponent implements OnInit {
  history: StockMovement[] = [];
  filteredHistory: StockMovement[] = [];
  searchTerm: string = '';
  filterType: string = 'all';

  constructor(
    private movementService: StockMovementService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.movementService.getAllHistory().subscribe({
      next: (data) => { 
        this.history = data; 
        this.filteredHistory = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  filterHistory(): void {
    let filtered = [...this.history];
    
    // Filter by type
    if (this.filterType !== 'all') {
      filtered = filtered.filter(h => h.movementType === this.filterType);
    }
    
    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(h => 
        h.stockItem?.product?.name?.toLowerCase().includes(term) ||
        h.description?.toLowerCase().includes(term)
      );
    }
    
    this.filteredHistory = filtered;
  }

  getMovementCount(type: string): number {
    return this.history.filter(h => h.movementType === type).length;
  }

  getMovementIcon(type: string): string {
    switch(type) {
      case 'IN': return '📥';
      case 'OUT': return '📤';
      case 'UPDATE': return '✏️';
      default: return '📋';
    }
  }

  getBadgeClass(type: string): string {
    switch(type) {
      case 'IN': return 'badge-in';
      case 'OUT': return 'badge-out';
      case 'UPDATE': return 'badge-update';
      default: return 'badge-neutral';
    }
  }

  back(): void { 
    this.router.navigate(['/admin/stockitems']); 
  }
}