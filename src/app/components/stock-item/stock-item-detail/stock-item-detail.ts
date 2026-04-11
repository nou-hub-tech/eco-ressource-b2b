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

  edit(): void { this.router.navigate(['/admin/stockitems/edit', this.stockItem?.id_stock]); }

  delete(): void {
    if (confirm('Delete this stock item?')) {
      this.stockItemService.delete(this.stockItem!.id_stock!).subscribe(() => {
        this.router.navigate(['/admin/stockitems']);
      });
    }
  }

  back(): void { this.router.navigate(['/admin/stockitems']); }
}