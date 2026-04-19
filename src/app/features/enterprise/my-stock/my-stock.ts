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

  // ONLY ONE onImageSelected method - keep this version
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('File input triggered', input.files);
    
    if (!input.files || input.files.length === 0) {
      console.log('No files selected');
      return;
    }
    
    const file = input.files[0];
    console.log('File selected:', file.name, file.type, file.size);
    
    this.uploading = true;
    this.cdr.detectChanges();
    
    this.enterpriseService.uploadImage(file).subscribe({
      next: (res) => {
        console.log('Upload response:', res);
        console.log('Image URL:', res.url);
        this.form.image = res.url;
        this.uploading = false;
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.error('Upload error details:', e);
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
    this.showModal = true;
    this.cdr.detectChanges();
  }

  openEdit(item: StockItem): void {
    this.form = { ...item };
    this.selectedProductId = item.product?.id_product;
    this.editMode = true;
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

  closeModal(): void {
    this.showModal = false;
    this.saving = false;
    this.uploading = false;
    this.cdr.detectChanges();
  }

  save(): void {
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
          this.cdr.detectChanges();
          this.loadStock();
        },
        error: (e) => { 
          console.error(e); 
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.enterpriseService.addStockItem(payload).subscribe({
        next: () => {
          this.showModal = false;
          this.saving = false;
          this.cdr.detectChanges();
          this.loadStock();
        },
        error: (e) => { 
          console.error(e); 
          this.saving = false;
          this.cdr.detectChanges();
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
      }
    });
  }

  private emptyForm(): Partial<StockItem> {
    return {
      quantity: 0,
      unitPrice: 0,
      status: 'available',
      unit: 'kg',
      condition: 'Good',
      location: '',
      image: ''
    };
  }
}