import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EnterpriseService, StockItem, Product } from '../../../core/services/enterprise.service';

@Component({
  selector: 'app-my-stock',
  standalone: false,
  templateUrl: './my-stock.html',
  styleUrls: ['./my-stock.css']
})
export class MyStock implements OnInit {

  items: StockItem[] = [];
  myProducts: Product[] = [];
  loading = false;
  search = '';
  filterStatus = '';

  showModal = false;
  editMode = false;
  saving = false;
  uploading = false;
  deleteConfirmId: number | null = null;
  selectedProductId: number | undefined = undefined;
  selectedItem: StockItem | null = null;
  submitted = false;

  form: Partial<StockItem> = this.emptyForm();

  constructor(
    private enterpriseService: EnterpriseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStock();
    this.loadProducts();
  }

  loadStock(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.enterpriseService.getMyStock().subscribe({
      next: (data) => { this.items = data; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  loadProducts(): void {
    this.enterpriseService.getMyProducts().subscribe({
      next: (data) => { this.myProducts = data; this.cdr.detectChanges(); }
    });
  }

  get filtered(): StockItem[] {
    return this.items.filter(i => {
      const matchSearch = !this.search ||
        i.product?.name?.toLowerCase().includes(this.search.toLowerCase()) ||
        i.location?.toLowerCase().includes(this.search.toLowerCase());
      const matchStatus = !this.filterStatus || i.status === this.filterStatus;
      return matchSearch && matchStatus;
    });
  }

  // ── Validation getters ───────────────────────────────────────
  get productError(): string {
    if (!this.submitted) return '';
    if (!this.selectedProductId) return 'Please select a product.';
    return '';
  }

  get quantityError(): string {
    if (!this.submitted) return '';
    const q = this.form.quantity;
    if (q === undefined || q === null || (q as any) === '') return 'Quantity is required.';
    if (q < 0) return 'Quantity cannot be negative.';
    if (!Number.isInteger(q)) return 'Quantity must be a whole number.';
    if (q > 1000000) return 'Quantity seems too large (max 1,000,000).';
    return '';
  }

  get unitPriceError(): string {
    if (!this.submitted) return '';
    const p = this.form.unitPrice;
    if (p === undefined || p === null || (p as any) === '') return 'Unit price is required.';
    if (p < 0) return 'Price cannot be negative.';
    if (p > 10000000) return 'Price seems too large.';
    return '';
  }

  get locationError(): string {
    if (!this.submitted) return '';
    if (!this.form.location || this.form.location.trim() === '') return 'Location is required.';
    if (this.form.location.trim().length < 2) return 'Location must be at least 2 characters.';
    if (this.form.location.trim().length > 100) return 'Location must not exceed 100 characters.';
    return '';
  }

  get expirationDateError(): string {
    if (!this.submitted) return '';
    if (!this.form.expirationDate || this.form.expirationDate === '') return 'Expiration date is required.';
    const today = new Date(); today.setHours(0,0,0,0);
    const selected = new Date(this.form.expirationDate);
    if (isNaN(selected.getTime())) return 'Please enter a valid date.';
    if (selected <= today) return 'Expiration date must be in the future.';
    return '';
  }

  get isFormValid(): boolean {
    const q = this.form.quantity;
    const p = this.form.unitPrice;
    return (
      !!this.selectedProductId &&
      q !== undefined && q !== null && q >= 0 && Number.isInteger(q) &&
      p !== undefined && p !== null && p >= 0 &&
      !!this.form.location && this.form.location.trim().length >= 2 &&
      !!this.form.expirationDate && this.expirationDateError === ''
    );
  }
  // ─────────────────────────────────────────────────────────────

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.uploading = true;
    this.cdr.detectChanges();
    this.enterpriseService.uploadImage(file).subscribe({
      next: (res) => { this.form.image = res.url; this.uploading = false; this.cdr.detectChanges(); },
      error: (e) => {
        console.error('Upload error:', e);
        this.uploading = false;
        this.cdr.detectChanges();
        alert('Upload failed: ' + (e.error?.message || e.message || 'Unknown error'));
      }
    });
  }

  removeImage(): void {
    this.form.image = '';
    this.cdr.detectChanges();
  }

  openAdd(): void {
    this.form = this.emptyForm();
    this.selectedProductId = undefined;
    this.editMode = false;
    this.submitted = false;
    this.showModal = true;
    this.cdr.detectChanges();
  }

  openEdit(item: StockItem): void {
    this.form = { ...item };
    this.selectedProductId = item.product?.id_product;
    this.editMode = true;
    this.submitted = false;
    this.showModal = true;
    this.selectedItem = null;
    this.cdr.detectChanges();
  }

  openDetails(item: StockItem): void { this.selectedItem = item; this.cdr.detectChanges(); }
  closeDetails(): void { this.selectedItem = null; this.cdr.detectChanges(); }

  closeModal(): void {
    this.showModal = false;
    this.saving = false;
    this.uploading = false;
    this.submitted = false;
    this.cdr.detectChanges();
  }

  save(): void {
    this.submitted = true;
    this.cdr.detectChanges();
    if (!this.isFormValid) return;
    if (this.saving) return;
    this.saving = true;
    this.cdr.detectChanges();

    const payload: StockItem = {
      ...this.form as StockItem,
      product: this.selectedProductId ? { id_product: this.selectedProductId } : undefined
    };

    if (this.editMode && this.form.idStock) {
      this.enterpriseService.updateStockItem(this.form.idStock, payload).subscribe({
        next: () => { this.showModal = false; this.saving = false; this.submitted = false; this.cdr.detectChanges(); this.loadStock(); },
        error: (e) => { console.error(e); this.saving = false; this.cdr.detectChanges(); }
      });
    } else {
      this.enterpriseService.addStockItem(payload).subscribe({
        next: () => { this.showModal = false; this.saving = false; this.submitted = false; this.cdr.detectChanges(); this.loadStock(); },
        error: (e) => { console.error(e); this.saving = false; this.cdr.detectChanges(); }
      });
    }
  }

  confirmDelete(id: number): void { this.deleteConfirmId = id; this.cdr.detectChanges(); }
  cancelDelete(): void { this.deleteConfirmId = null; this.cdr.detectChanges(); }

  doDelete(): void {
    if (this.deleteConfirmId == null) return;
    this.enterpriseService.deleteStockItem(this.deleteConfirmId).subscribe({
      next: () => { this.deleteConfirmId = null; this.cdr.detectChanges(); this.loadStock(); }
    });
  }

  private emptyForm(): Partial<StockItem> {
    return { quantity: undefined as any, unitPrice: undefined as any, status: 'available', unit: 'kg', condition: 'Good', location: '', image: '', expirationDate: '' };
  }
}