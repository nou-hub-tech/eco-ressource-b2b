import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EnterpriseService, Product } from '../../../core/services/enterprise.service';

@Component({
  selector: 'app-my-products',
  standalone: false,
  templateUrl: './my-products.html',
  styleUrls: ['./my-products.css']
})
export class MyProducts implements OnInit {

  products: Product[] = [];
  loading = false;
  error = '';
  search = '';

  showModal = false;
  editMode = false;
  saving = false;
  uploading = false;
  deleteConfirmId: number | null = null;

  form: Partial<Product> = this.emptyForm();

  readonly categories = ['Metal','Plastic','Paper','Glass','Textile','Electronics','Wood','Chemical','Other'];
  readonly materialTypes = ['Raw','Recycled','Processed','Composite','Organic'];

  constructor(
    private enterpriseService: EnterpriseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void { this.loadProducts(); }

  loadProducts(): void {
    this.loading = true;
    this.enterpriseService.getMyProducts().subscribe({
      next: (data) => { 
        this.products = data; 
        this.loading = false;
        // REMOVED: this.cdr.detectChanges();
      },
      error: () => { 
        this.error = 'Failed to load products.'; 
        this.loading = false; 
      }
    });
  }

  get filtered(): Product[] {
    return this.products.filter(p =>
      !this.search ||
      p.name.toLowerCase().includes(this.search.toLowerCase()) ||
      p.category.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.uploading = true;
    this.enterpriseService.uploadImage(file).subscribe({
      next: (res) => {
        this.form.image = res.url;
        this.uploading = false;
        // ADDED: setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.cdr.detectChanges();
        });
      },
      error: (e) => {
        console.error('Upload error:', e);
        this.uploading = false;
      }
    });
  }

  openAdd(): void {
    this.form = this.emptyForm();
    this.editMode = false;
    this.showModal = true;
  }

  openEdit(p: Product): void {
    this.form = { ...p };
    this.editMode = true;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.saving = false;
    // REMOVED: this.cdr.detectChanges();
  }

  save(): void {
    if (!this.form.name || !this.form.category) return;
    if (this.saving) return;
    this.saving = true;
    const payload = this.form as Product;
    if (!payload.image) payload.image = 'default.png';

    if (this.editMode && this.form.id_product) {
      this.enterpriseService.updateProduct(this.form.id_product, payload).subscribe({
        next: () => { 
          this.showModal = false; 
          this.saving = false; 
          this.loadProducts(); 
        },
        error: () => { 
          this.saving = false; 
        }
      });
    } else {
      this.enterpriseService.addProduct(payload).subscribe({
        next: () => { 
          this.showModal = false; 
          this.saving = false; 
          this.loadProducts(); 
        },
        error: () => { 
          this.saving = false; 
        }
      });
    }
  }

  confirmDelete(id: number): void { this.deleteConfirmId = id; }
  cancelDelete(): void { this.deleteConfirmId = null; }

  doDelete(): void {
    if (this.deleteConfirmId == null) return;
    this.enterpriseService.deleteProduct(this.deleteConfirmId).subscribe({
      next: () => { 
        this.deleteConfirmId = null; 
        this.loadProducts(); 
      }
    });
  }

  private emptyForm(): Partial<Product> {
    return { name: '', category: '', materialType: 'Raw', recyclable: false, description: '', image: '' };
  }
}