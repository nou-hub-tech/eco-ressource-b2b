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
  submitted = false;

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
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load products.';
        this.loading = false;
        this.cdr.detectChanges();
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

  // ── Validation getters ───────────────────────────────────────
  get nameError(): string {
    if (!this.submitted) return '';
    if (!this.form.name || this.form.name.trim() === '') return 'Product name is required.';
    if (this.form.name.trim().length < 2) return 'Name must be at least 2 characters.';
    if (this.form.name.trim().length > 100) return 'Name must not exceed 100 characters.';
    return '';
  }

  get categoryError(): string {
    if (!this.submitted) return '';
    if (!this.form.category || this.form.category === '') return 'Please select a category.';
    return '';
  }

  get materialTypeError(): string {
    if (!this.submitted) return '';
    if (!this.form.materialType || this.form.materialType === '') return 'Please select a material type.';
    return '';
  }

  get descriptionError(): string {
    if (!this.submitted) return '';
    if (!this.form.description || this.form.description.trim() === '') return 'Description is required.';
    if (this.form.description.trim().length < 10) return 'Description must be at least 10 characters.';
    if (this.form.description.trim().length > 500) return 'Description must not exceed 500 characters.';
    return '';
  }

  get isFormValid(): boolean {
    return (
      !!this.form.name && this.form.name.trim().length >= 2 && this.form.name.trim().length <= 100 &&
      !!this.form.category && this.form.category !== '' &&
      !!this.form.materialType && this.form.materialType !== '' &&
      !!this.form.description && this.form.description.trim().length >= 10
    );
  }
  // ─────────────────────────────────────────────────────────────

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.uploading = true;
    this.enterpriseService.uploadImage(file).subscribe({
      next: (res) => {
        // Extract only filename from URL to avoid hardcoded port issues
        const url = res.url;
        const filename = url.includes('/files/') ? url.split('/files/')[1] : url;
        this.form.image = filename;
        this.uploading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.uploading = false; this.cdr.detectChanges(); }
    });
  }

  openAdd(): void {
    this.form = this.emptyForm();
    this.editMode = false;
    this.submitted = false;
    this.showModal = true;
    this.cdr.detectChanges();
  }

  openEdit(p: Product): void {
    this.form = { ...p };
    this.editMode = true;
    this.submitted = false;
    this.showModal = true;
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.showModal = false;
    this.saving = false;
    this.submitted = false;
    this.cdr.detectChanges();
  }

  save(): void {
    this.submitted = true;
    this.cdr.detectChanges();
    if (!this.isFormValid) return;
    if (this.saving) return;
    this.saving = true;

    const payload = this.form as Product;
    if (!payload.image) payload.image = 'default.png';

    if (this.editMode && this.form.id_product) {
      this.enterpriseService.updateProduct(this.form.id_product, payload).subscribe({
        next: () => { this.showModal = false; this.saving = false; this.submitted = false; this.cdr.detectChanges(); this.loadProducts(); },
        error: () => { this.saving = false; this.cdr.detectChanges(); }
      });
    } else {
      this.enterpriseService.addProduct(payload).subscribe({
        next: () => { this.showModal = false; this.saving = false; this.submitted = false; this.cdr.detectChanges(); this.loadProducts(); },
        error: () => { this.saving = false; this.cdr.detectChanges(); }
      });
    }
  }

  confirmDelete(id: number): void { this.deleteConfirmId = id; }
  cancelDelete(): void { this.deleteConfirmId = null; }

  doDelete(): void {
    if (this.deleteConfirmId == null) return;
    this.enterpriseService.deleteProduct(this.deleteConfirmId).subscribe({
      next: () => { this.deleteConfirmId = null; this.loadProducts(); }
    });
  }

  private emptyForm(): Partial<Product> {
    return { name: '', category: '', materialType: 'Raw', recyclable: false, description: '', image: '' };
  }

  /** Normalise une URL d'image pour passer par le proxy Angular (évite le port 8080 hardcodé) */
  getImageUrl(imagePath: string | undefined | null): string {
    if (!imagePath || imagePath === 'default.png' || imagePath === 'undefined' || imagePath === 'null') {
      return '';
    }
    const str = String(imagePath).trim();
    // Si c'est une URL complète (http://localhost:9090/files/...), extraire seulement le nom de fichier
    if (str.startsWith('http://') || str.startsWith('https://')) {
      if (str.includes('/files/undefined') || str.includes('/files/null')) return '';
      if (str.includes('/files/')) {
        const filename = str.split('/files/')[1];
        return `/files/${filename}`;
      }
      return str;
    }
    // Si c'est déjà un chemin relatif /files/...
    if (str.includes('files/')) {
      const filename = str.split('files/')[1];
      return `/files/${filename}`;
    }
    // Sinon c'est juste le nom de fichier
    return `/files/${str}`;
  }
}