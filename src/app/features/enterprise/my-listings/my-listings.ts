import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ListingService, ListingDto, CreateListingPayload } from '../../../core/services/listing';

@Component({
  selector: 'app-my-listings',
  standalone: false,
  templateUrl: './my-listings.html',
  styleUrls: ['./my-listings.css']
})
export class MyListings implements OnInit {

  listings: ListingDto[] = [];
  loading = true;
  error: string | null = null;

  showModal = false;
  modalMode: 'create' | 'edit' = 'create';
  editingId: number | null = null;
  saving = false;
  saveError: string | null = null;

  deleteConfirmId: number | null = null;
  deletingId: number | null = null;

  form: CreateListingPayload = {
    title: '', category: 'Metal', price: 0, quantityLabel: '', status: 'ACTIVE', aiInsight: ''
  };

  readonly categories = ['Metal', 'Plastic', 'Paper', 'Glass', 'Textile', 'Chemical'];
  readonly statuses   = ['ACTIVE', 'PENDING', 'DRAFT'];

  constructor(private listingService: ListingService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.error = null;
    this.listingService.getMyListings().subscribe({
      next: data => { this.listings = data; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.error = 'Failed to load listings.'; this.loading = false; this.cdr.detectChanges(); }
    });
  }

  openCreate(): void {
    this.modalMode = 'create'; this.editingId = null; this.saveError = null;
    this.form = { title: '', category: 'Metal', price: 0, quantityLabel: '', status: 'ACTIVE', aiInsight: '' };
    this.showModal = true;
  }

  openEdit(l: ListingDto): void {
    this.modalMode = 'edit'; this.editingId = l.id; this.saveError = null;
    this.form = { title: l.title, category: l.category, price: l.price,
      quantityLabel: l.qty || '', status: l.status?.toUpperCase() || 'ACTIVE', aiInsight: l.ai || '' };
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.saving = false; this.saveError = null; }

  save(): void {
    if (!this.form.title.trim()) { this.saveError = 'Title is required.'; return; }
    if (!this.form.quantityLabel.trim()) { this.saveError = 'Quantity is required.'; return; }
    if (this.form.price <= 0) { this.saveError = 'Price must be greater than 0.'; return; }
    this.saving = true; this.saveError = null;
    const obs = this.modalMode === 'create'
      ? this.listingService.createListing(this.form)
      : this.listingService.updateListing(this.editingId!, this.form);
    obs.subscribe({
      next: () => { this.saving = false; this.closeModal(); this.load(); },
      error: err => { this.saving = false; this.saveError = err?.error?.message || 'Failed to save.'; this.cdr.detectChanges(); }
    });
  }

  publish(l: ListingDto): void {
    this.listingService.updateListing(l.id, {
      title: l.title, category: l.category, price: l.price,
      quantityLabel: l.qty || '', status: 'ACTIVE', aiInsight: l.ai || ''
    }).subscribe({ next: () => this.load(), error: () => {} });
  }

  askDelete(id: number): void  { this.deleteConfirmId = id; }
  cancelDelete(): void         { this.deleteConfirmId = null; }
  confirmDelete(): void {
    if (!this.deleteConfirmId) return;
    this.deletingId = this.deleteConfirmId; this.deleteConfirmId = null;
    this.listingService.deleteListing(this.deletingId!).subscribe({
      next: () => { this.deletingId = null; this.load(); },
      error: () => { this.deletingId = null; this.cdr.detectChanges(); }
    });
  }

  statusClass(s: string): string {
    switch ((s || '').toUpperCase()) {
      case 'ACTIVE': return 'badge-success'; case 'PENDING': return 'badge-warning'; default: return 'badge-neutral';
    }
  }
  formatDate(dt: any): string {
    if (!dt) return '—';
    return new Date(dt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  get totalViews()     { return this.listings.reduce((s, l) => s + (l.views     || 0), 0); }
  get totalEnquiries() { return this.listings.reduce((s, l) => s + (l.enquiries || 0), 0); }
  get activeCount()    { return this.listings.filter(l => (l.status || '').toUpperCase() === 'ACTIVE').length; }
}