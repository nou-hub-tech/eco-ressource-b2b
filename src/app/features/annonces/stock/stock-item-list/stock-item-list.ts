import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockItemService } from '../../services/stock-item.service';
import { ProductAnnoncesService } from '../../services/product-annonces.service';
import { StockItem, Product } from '../../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-stock-item-list',
  standalone: false,
  templateUrl: './stock-item-list.html',
  styleUrls: ['./stock-item-list.css']
})
export class StockItemList implements OnInit {
  items: StockItem[] = [];
  products: Product[] = [];
  loading = true;
  loadError = '';

  filterProductId: number | '' = '';
  filterCompanyId: number | null = null;

  showDeleteConfirm = false;
  pendingDelete: StockItem | null = null;
  deleteError = '';

  constructor(
    private readonly stockItemService: StockItemService,
    private readonly productService: ProductAnnoncesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.productService.findAll().subscribe({
      next: (p) => (this.products = p),
      error: () => {}
    });
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.loadError = '';
    const productId =
      this.filterProductId === '' ? undefined : Number(this.filterProductId);
    const companyId =
      this.filterCompanyId !== null && this.filterCompanyId !== undefined && !Number.isNaN(this.filterCompanyId)
        ? this.filterCompanyId
        : undefined;

    this.stockItemService.findAll(productId, companyId).subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: () => {
        this.loadError = 'Impossible de charger les articles en stock.';
        this.loading = false;
      }
    });
  }

  onFiltersChange(): void {
    this.loadItems();
  }

  clearCompanyFilter(): void {
    this.filterCompanyId = null;
    this.loadItems();
  }

  openDelete(item: StockItem): void {
    this.pendingDelete = item;
    this.deleteError = '';
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.pendingDelete = null;
  }

  confirmDelete(): void {
    if (!this.pendingDelete) return;
    this.deleteError = '';
    this.stockItemService.delete(this.pendingDelete.idStock).subscribe({
      next: () => {
        this.showDeleteConfirm = false;
        this.pendingDelete = null;
        this.loadItems();
      },
      error: (err) => {
        this.deleteError =
          err.error?.message || 'La suppression a échoué. Réessayez plus tard.';
      }
    });
  }

  productLabel(item: StockItem): string {
    return item.product?.name ?? '—';
  }

  goDetail(id: number): void {
    this.router.navigate(['/enterprise/annonces/stock', id]);
  }
}
