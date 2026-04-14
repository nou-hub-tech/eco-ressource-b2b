import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StockItemService } from '../../../core/services/stock-item';
import { ProductService } from '../../../core/services/product';
import { FileUploadService } from '../../../core/services/file-upload.service';
import { StockItem } from '../../../core/models/stock-item.model';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-stock-item-form',
  standalone: false,
  templateUrl: './stock-item-form.html',
  styleUrls: ['./stock-item-form.css']
})
export class StockItemFormComponent implements OnInit {
  stockItem: StockItem = {} as StockItem;
  products: Product[] = [];
  isEditMode = false;
  serverErrors: string = '';
  submitted = false;
  minDate: string = '';
  imagePreviewUrl: string = '';
  selectedFile: File | null = null;

  constructor(
    private stockItemService: StockItemService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];

    this.productService.getAll().subscribe(data => {
      this.products = [...data];
      this.cdr.detectChanges();
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.stockItemService.getById(+id).subscribe(data => {
        this.stockItem = { ...data };
        if (this.stockItem.image) {
          this.imagePreviewUrl = this.fileUploadService.getImageUrl(this.stockItem.image);
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

  compareProducts(p1: Product, p2: Product): boolean {
    return p1 && p2 ? p1.id_product === p2.id_product : p1 === p2;
  }

  save(form: NgForm): void {
    this.submitted = true;
    if (form.invalid) return;
    this.serverErrors = '';

    if (this.selectedFile) {
      this.fileUploadService.upload(this.selectedFile).subscribe({
        next: (res) => {
          this.stockItem.image = res.filename;
          this.saveStockItem();
        },
        error: () => {
          this.serverErrors = 'Image upload failed.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.saveStockItem();
    }
  }

  saveStockItem(): void {
    if (this.isEditMode) {
      this.stockItemService.update(this.stockItem).subscribe({
        next: () => { this.router.navigate(['/admin/stockitems']);
 },
        error: (err) => {
          if (err.status === 400) {
            this.serverErrors = Object.values(err.error).join(' | ');
            this.cdr.detectChanges();
          }
        }
      });
    } else {
      this.stockItemService.add(this.stockItem).subscribe({
        next: () => { this.router.navigate(['/admin/stockitems']); },
        error: (err) => {
          if (err.status === 400) {
            this.serverErrors = Object.values(err.error).join(' | ');
            this.cdr.detectChanges();
          }
        }
      });
    }
  }



  

  cancel(): void { this.router.navigate(['/admin/stockitems']); }
}