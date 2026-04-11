import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  searchName = '';
  searchCategory = '';
  searchMaterialType = '';
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;
  sortBy = 'name';
  direction: 'asc' | 'desc' = 'asc';

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef   // ← ADD THIS
  ) {}

  ngOnInit(): void {
    this.loadPaginated();
  }

  loadPaginated(): void {
    this.productService.getPaginated(
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.direction
    ).subscribe(data => {
      this.products = data?.content ?? [];
      this.totalPages = data?.totalPages ?? 0;
      this.totalElements = data?.totalElements ?? 0;
      this.currentPage = data?.currentPage ?? 0;
      this.cdr.detectChanges();   // ← ADD THIS
    });
  }

  search(): void {
    if (!this.searchName && !this.searchCategory && !this.searchMaterialType) {
      this.loadPaginated();
      return;
    }
    this.productService.search(
      this.searchName,
      this.searchCategory,
      this.searchMaterialType
    ).subscribe(data => {
      this.products = data ?? [];
      this.cdr.detectChanges();   // ← ADD THIS
    });
  }

  resetSearch(): void {
    this.searchName = '';
    this.searchCategory = '';
    this.searchMaterialType = '';
    this.loadPaginated();
  }

  goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.loadPaginated();
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
    if (this.sortBy !== column) return '↕️';
    return this.direction === 'asc' ? '⬆️' : '⬇️';
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  addProduct(): void { this.router.navigate(['/admin/products/add']); }
  detailProduct(id: number): void { this.router.navigate(['/admin/products/detail', id]); }
  editProduct(id: number): void { this.router.navigate(['/admin/products/edit', id]); }
  deleteProduct(id: number): void {
    if (confirm('Supprimer ce produit ?')) {
      this.productService.delete(id).subscribe(() => this.loadPaginated());
    }
  }
  // Add these methods
openChatbot(): void {
  this.router.navigate(['/admin/chatbot']);
}

openBrokenProduct(): void {
  this.router.navigate(['/admin/broken-product']);
}
openInventoryScanner(): void {
    this.router.navigate(['/admin/inventory']);

}
}