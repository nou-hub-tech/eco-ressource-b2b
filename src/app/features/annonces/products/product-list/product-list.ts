import { Component, OnInit } from '@angular/core';
import { ProductAnnoncesService } from '../../services/product-annonces.service';
import { Product } from '../../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  paged: Product[] = [];

  loading = true;
  filterCategory = '';
  searchQuery = '';
  viewMode: 'grid' | 'table' = 'grid';

  categories: string[] = [];

  currentPage = 1;
  pageSize = 12;

  showDeleteConfirm = false;
  productToDelete: Product | null = null;
  deleteError = '';

  constructor(private readonly productService: ProductAnnoncesService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    const cat = this.filterCategory || undefined;
    this.productService.findAll(cat).subscribe({
      next: (data) => {
        this.products = data;
        const fromResponse = [...new Set(data.map((p) => p.category).filter((c): c is string => !!c))].sort();
        if (!cat) {
          this.categories = fromResponse;
        }
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onCategoryChange(): void {
    this.loadData();
  }

  applyFilters(): void {
    const q = this.searchQuery.trim().toLowerCase();
    let result = [...this.products];
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase().includes(q) ?? false) ||
          (p.category?.toLowerCase().includes(q) ?? false) ||
          (p.materialType?.toLowerCase().includes(q) ?? false)
      );
    }
    this.filtered = result;
    this.currentPage = 1;
    this.updatePaged();
  }

  updatePaged(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paged = this.filtered.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaged();
  }

  setView(mode: 'grid' | 'table'): void {
    this.viewMode = mode;
  }

  requestDelete(p: Product): void {
    this.deleteError = '';
    this.productToDelete = p;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.productToDelete = null;
  }

  confirmDelete(): void {
    if (!this.productToDelete) return;
    const id = this.productToDelete.idProduct;
    this.productService.delete(id).subscribe({
      next: () => {
        this.cancelDelete();
        this.loadData();
      },
      error: (err) => {
        this.deleteError =
          err.error?.message || 'Impossible de supprimer ce produit. Réessayez plus tard.';
      }
    });
  }

  get hasActiveFilters(): boolean {
    return !!(this.filterCategory || this.searchQuery.trim());
  }

  clearFilters(): void {
    this.filterCategory = '';
    this.searchQuery = '';
    this.loadData();
  }

  descPreview(text: string | null | undefined, max = 120): string {
    if (!text) return '';
    return text.length > max ? text.slice(0, max) + '…' : text;
  }
}
