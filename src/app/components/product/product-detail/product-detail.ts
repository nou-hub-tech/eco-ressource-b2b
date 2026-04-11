import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(+id).subscribe(data => {
        this.product = { ...data };
        this.cdr.detectChanges();
      });
    }
  }

  edit(): void { this.router.navigate(['/products/edit', this.product?.id_product]); }

  delete(): void {
    if (confirm('Supprimer ce produit ?')) {
      this.productService.delete(this.product!.id_product!).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  back(): void { this.router.navigate(['/products']); }
}