import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product';
import { FileUploadService } from '../../../core/services/file-upload.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', category: '', materialType: '', recyclable: false, description: '', image: '' };
  isEditMode = false;
  serverErrors: string = '';
  submitted = false;
  imagePreviewUrl: string = '';
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getById(+id).subscribe(data => {
        this.product = { ...data };
        // Clean invalid image values
        if (this.product.image && 
            (this.product.image === 'undefined' || 
             this.product.image === 'null' || 
             this.product.image === 'default.png')) {
          this.product.image = '';
        }
        // Build preview URL from filename
        if (this.product.image && this.product.image.trim()) {
          // Extract filename if it's a full URL
          if (this.product.image.includes('files/')) {
            const filename = this.product.image.split('files/')[1];
            this.imagePreviewUrl = `http://localhost:8080/files/${filename}`;
            this.product.image = filename; // Store only filename
          } else {
            this.imagePreviewUrl = `http://localhost:8080/files/${this.product.image}`;
          }
        }
        this.cdr.detectChanges();
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  save(form: NgForm): void {
    this.submitted = true;
    if (form.invalid) return;
    this.serverErrors = '';

    if (this.selectedFile) {
      this.fileUploadService.upload(this.selectedFile).subscribe({
        next: (res) => {
          // Backend returns filename
          // Store just the filename (works with getImageUrl logic)
          this.product.image = res.filename;
          this.saveProduct();
        },
        error: () => {
          this.serverErrors = 'Image upload failed.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.saveProduct();
    }
  }

  saveProduct(): void {
    // Ensure recyclable is boolean
    this.product.recyclable = !!this.product.recyclable;
    
    // Remove default.png if present
    if (this.product.image === 'default.png') {
      this.product.image = '';
    }

    if (this.isEditMode) {
      this.productService.update(this.product).subscribe({
        next: () => { this.router.navigate(['/admin/products']); },
        error: (err) => {
          if (err.status === 400) {
            this.serverErrors = Object.values(err.error).join(' | ');
            this.cdr.detectChanges();
          }
        }
      });
    } else {
      this.productService.add(this.product).subscribe({
        next: () => { this.router.navigate(['/admin/products']); },
        error: (err) => {
          if (err.status === 400) {
            this.serverErrors = Object.values(err.error).join(' | ');
            this.cdr.detectChanges();
          }
        }
      });
    }
  }

  cancel(): void { this.router.navigate(['/admin/products']); }

  removeImage(event: Event): void {
    event.stopPropagation();
    this.imagePreviewUrl = '';
    this.selectedFile = null;
    this.product.image = '';
    this.cdr.detectChanges();
  }
}