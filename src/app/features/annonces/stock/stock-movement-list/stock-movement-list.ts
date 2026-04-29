import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockMovementService } from '../../services/stock-movement.service';
import { StockItemService } from '../../services/stock-item.service';
import { StockMovement, StockItem } from '../../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-stock-movement-list',
  standalone: false,
  templateUrl: './stock-movement-list.html',
  styleUrls: ['./stock-movement-list.css']
})
export class StockMovementList implements OnInit {
  movements: StockMovement[] = [];
  stockItems: StockItem[] = [];
  loading = true;
  loadError = '';

  filterStockItemId: number | '' = '';

  constructor(
    private readonly movementService: StockMovementService,
    private readonly stockItemService: StockItemService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.stockItemService.findAll().subscribe({
      next: (items) => (this.stockItems = items),
      error: () => {}
    });
    this.loadMovements();
  }

  loadMovements(): void {
    this.loading = true;
    this.loadError = '';
    const stockItemId =
      this.filterStockItemId === '' ? undefined : Number(this.filterStockItemId);
    this.movementService.findAll(stockItemId).subscribe({
      next: (data) => {
        this.movements = data;
        this.loading = false;
      },
      error: () => {
        this.loadError = 'Impossible de charger les mouvements de stock.';
        this.loading = false;
      }
    });
  }

  stockLabel(m: StockMovement): string {
    const s = m.stockItem;
    if (!s) return '—';
    const name = s.product?.name;
    return name ? `${name} (#${s.idStock})` : `Stock #${s.idStock}`;
  }

  goEdit(id: number): void {
    this.router.navigate(['/enterprise/annonces/stock/movements', id, 'edit']);
  }
}
