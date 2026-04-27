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

  getImageUrl(imagePath: any): string {
    // Handle null, undefined, empty values
    if (imagePath === null || imagePath === undefined || imagePath === '') {
      return '';
    }
    
    // Convert to string and trim
    const str = String(imagePath).trim();
    
    // Reject only known invalid values
    if (!str || 
        str === 'undefined' || 
        str === 'null' || 
        str === 'default.png' || 
        str === '[object Object]') {
      return '';
    }
    
    // If it's already a valid full URL, return as-is
    if (str.startsWith('http://') || str.startsWith('https://')) {
      // Reject URLs with invalid path segments
      if (str.includes('/files/undefined') || str.includes('/files/null')) {
        return '';
      }
      return str;
    }
    
    // If it contains 'files/', extract the filename
    if (str.includes('files/')) {
      const filename = str.split('files/')[1];
      return `/files/${filename}`;
    }
    
    // Otherwise, treat as filename and build the URL
    return `/files/${str}`;
  }

  edit(): void { this.router.navigate(['/admin/products/edit', this.product?.id_product]); }

  delete(): void {
    if (confirm('Supprimer ce produit ?')) {
      this.productService.delete(this.product!.id_product!).subscribe(() => {
        this.router.navigate(['/admin/products']);
      });
    }
  }

  back(): void { this.router.navigate(['/admin/products']); }

  handleImageError(event: any): void {
    event.target.src = 'https://placehold.co/300x300?text=No+Image';
    event.target.style.objectFit = 'contain';
    event.target.style.padding = '20px';
  }
}