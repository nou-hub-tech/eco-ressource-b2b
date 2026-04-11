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
        if (this.product.image) {
          this.imagePreviewUrl = this.fileUploadService.getImageUrl(this.product.image);
        }
        this.cdr.detectChanges();
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Show preview immediately
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
      // Upload image first, then save product
      this.fileUploadService.upload(this.selectedFile).subscribe({
        next: (res) => {
          this.product.image = res.filename;
          this.saveProduct();
        },
        error: (err) => {
          this.serverErrors = 'Image upload failed.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.saveProduct();
    }
  }

  saveProduct(): void {
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
}