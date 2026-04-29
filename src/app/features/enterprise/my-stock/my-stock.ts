import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EnterpriseService, StockItem, Product } from '../../../core/services/enterprise.service';
import { ReclamationService } from '../../../core/services/reclamation.service';
import { catchError } from 'rxjs';
import { of } from 'rxjs';


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

  // Selection tracking
  selectedItems: Set<number> = new Set<number>();

  // Reclamation
  showReclamationModal = false;
  selectedStockItemsForReclamation: StockItem[] = [];
  reclamationDescription = '';
  reclamationImageFile: File | null = null;
  reclamationImagePreview: string | null = null;
  uploadingReclamationImage = false;
  submittingReclamation = false;
  aiAnalysisResult: any = null;

  constructor(
    private enterpriseService: EnterpriseService,
    private cdr: ChangeDetectorRef,
    private reclamationService: ReclamationService
  ) {}

  ngOnInit(): void {
    this.loadStock();
    this.loadProducts();
  }

  loadStock(): void {
    this.loading = true;
    this.cdr.detectChanges();
    this.enterpriseService.getMyStock().subscribe({
      next: (data) => { 
        this.items = data; 
        this.loading = false; 
        this.cdr.detectChanges();
      },
      error: () => { 
        this.loading = false; 
        this.cdr.detectChanges();
      }
    });
  }

  loadProducts(): void {
    this.enterpriseService.getMyProducts().subscribe({
      next: (data) => { 
        this.myProducts = data; 
        this.cdr.detectChanges();
      },
      error: (err) => { 
        console.error('Error loading products:', err);
        this.cdr.detectChanges();
      }
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

  // ========== SELECTION METHODS ==========
  isSelected(id: number): boolean {
    return this.selectedItems.has(id);
  }

  toggleSelection(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedItems.add(id);
    } else {
      this.selectedItems.delete(id);
    }
    this.cdr.detectChanges();
  }

  isAllSelected(): boolean {
    return this.filtered.length > 0 && this.filtered.every(item => this.selectedItems.has(item.idStock!));
  }

  isSomeSelected(): boolean {
    const selectedCount = this.filtered.filter(item => this.selectedItems.has(item.idStock!)).length;
    return selectedCount > 0 && selectedCount < this.filtered.length;
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.filtered.forEach(item => {
        if (item.idStock) {
          this.selectedItems.add(item.idStock);
        }
      });
    } else {
      this.filtered.forEach(item => {
        if (item.idStock) {
          this.selectedItems.delete(item.idStock);
        }
      });
    }
    this.cdr.detectChanges();
  }

  clearSelection(): void {
    this.selectedItems.clear();
    this.cdr.detectChanges();
  }

  // ========== RECLAMATION METHODS ==========
  openBulkReclamation(): void {
    this.selectedStockItemsForReclamation = this.items.filter(item => 
      item.idStock && this.selectedItems.has(item.idStock)
    );
    
    if (this.selectedStockItemsForReclamation.length === 0) {
      alert('Please select at least one stock item to report an issue.');
      return;
    }

    this.reclamationDescription = '';
    this.reclamationImageFile = null;
    this.reclamationImagePreview = null;
    this.aiAnalysisResult = null;
    this.showReclamationModal = true;
    this.cdr.detectChanges();
  }

  closeReclamationModal(): void {
    this.showReclamationModal = false;
    this.selectedStockItemsForReclamation = [];
    this.reclamationDescription = '';
    this.reclamationImageFile = null;
    this.reclamationImagePreview = null;
    this.aiAnalysisResult = null;
    this.cdr.detectChanges();
  }

  onReclamationImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    this.reclamationImageFile = file;
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.reclamationImagePreview = e.target.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  removeReclamationImage(): void {
    this.reclamationImageFile = null;
    this.reclamationImagePreview = null;
    this.aiAnalysisResult = null;
    this.cdr.detectChanges();
  }

  setQuickIssue(issue: string): void {
    this.reclamationDescription = issue;
    this.cdr.detectChanges();
  }

  submitBulkReclamation(): void {
    if (!this.reclamationDescription) {
      alert('Please describe the issue.');
      return;
    }

    if (this.selectedStockItemsForReclamation.length === 0) {
      alert('No items selected.');
      return;
    }

    this.submittingReclamation = true;
    this.cdr.detectChanges();

    // Chaque requête gère son propre échec → catchError retourne { success: false }
    const promises = this.selectedStockItemsForReclamation.map(item =>
      this.reclamationService.analyzeAndCreate(
        item.idStock ?? null,
        item.product?.id_product ?? null,
        this.reclamationDescription,
        1,
        item.unit || 'unit',
        this.reclamationImageFile
      ).pipe(
        catchError(err => {
          console.error('Reclamation failed for', item.product?.name, err?.error || err);
          return of({ success: false, error: err?.error?.error || 'Server error' });
        })
      ).toPromise()
    );

    Promise.all(promises)
      .then((results: any[]) => {
        const successCount = results.filter(r => r && r.success).length;
        const failCount    = results.length - successCount;

        if (successCount > 0) {
          const msg = failCount > 0
            ? `✅ ${successCount} réclamation(s) soumise(s) avec succès. (${failCount} échec(s))`
            : `✅ ${successCount} réclamation(s) soumise(s) avec succès !`;
          alert(msg);
          this.closeReclamationModal();
          this.clearSelection();
          this.loadStock();
        } else {
          // Tous ont échoué – on affiche la première erreur connue
          const firstErr = results.find(r => r?.error)?.error || 'Erreur inconnue';
          alert(`❌ Échec : ${firstErr}\n\nVérifiez que les articles sont bien liés à un produit.`);
        }
      })
      .catch(err => {
        console.error('Unexpected error:', err);
        alert('❌ Une erreur inattendue est survenue.');
      })
      .finally(() => {
        this.submittingReclamation = false;
        this.cdr.detectChanges();
      });
  }


  // ========== MODAL METHODS ==========
  openAdd(): void {
    // Reset form
    this.form = this.emptyForm();
    this.selectedProductId = undefined;
    this.editMode = false;
    this.submitted = false;
    
    // Refresh products before showing modal
    this.enterpriseService.getMyProducts().subscribe({
      next: (data) => {
        this.myProducts = data;
        
        if (this.myProducts.length === 0) {
          alert('⚠️ You have no products in your catalog.\n\nPlease go to "My Products" and add products first.');
          return;
        }
        
        this.showModal = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading products:', err);
        alert('Could not load products. Please refresh the page.');
      }
    });
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

  openDetails(item: StockItem): void { 
    this.selectedItem = item; 
    this.cdr.detectChanges();
  }
  
  closeDetails(): void { 
    this.selectedItem = null; 
    this.cdr.detectChanges();
  }

  openModal(): void { this.openAdd(); }

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
        next: () => { 
          this.showModal = false; 
          this.saving = false; 
          this.submitted = false; 
          this.cdr.detectChanges(); 
          this.loadStock();
        },
        error: (e) => { 
          console.error(e); 
          this.saving = false; 
          this.cdr.detectChanges();
          alert('Error updating stock item: ' + (e.error?.message || e.message));
        }
      });
    } else {
      this.enterpriseService.addStockItem(payload).subscribe({
        next: () => { 
          this.showModal = false; 
          this.saving = false; 
          this.submitted = false; 
          this.cdr.detectChanges(); 
          this.loadStock();
        },
        error: (e) => { 
          console.error(e); 
          this.saving = false; 
          this.cdr.detectChanges();
          alert('Error adding stock item: ' + (e.error?.message || e.message));
        }
      });
    }
  }

  confirmDelete(id: number): void { 
    this.deleteConfirmId = id; 
    this.cdr.detectChanges();
  }
  
  cancelDelete(): void { 
    this.deleteConfirmId = null; 
    this.cdr.detectChanges();
  }

  doDelete(): void {
    if (this.deleteConfirmId == null) return;
    this.enterpriseService.deleteStockItem(this.deleteConfirmId).subscribe({
      next: () => { 
        this.deleteConfirmId = null; 
        this.cdr.detectChanges(); 
        this.loadStock();
        this.clearSelection();
      }
    });
  }

  // ========== VALIDATION GETTERS ==========
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

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    this.uploading = true;
    this.cdr.detectChanges();
    this.enterpriseService.uploadImage(file).subscribe({
      next: (res) => { 
        this.form.image = res.url; 
        this.uploading = false; 
        this.cdr.detectChanges();
      },
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

  private emptyForm(): Partial<StockItem> {
    return { 
      quantity: undefined as any, 
      unitPrice: undefined as any, 
      status: 'available', 
      unit: 'kg', 
      condition: 'Good', 
      location: '', 
      image: '', 
      expirationDate: '' 
    };
  }
}
