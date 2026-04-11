import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceListingService } from '../services/resource-listing.service';
import { FavoriteService } from '../services/favorite.service';
import { ListingResponse, FavoriteResponse } from '../../../core/models/annonces.interfaces';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-listing-detail',
  standalone: false,
  templateUrl: './listing-detail.html',
  styleUrls: ['./listing-detail.css']
})
export class ListingDetail implements OnInit {
  listing: ListingResponse | null = null;
  loading = true;
  error = '';
  isFavorite = false;
  currentCompanyId: number | null = null;
  currentImageIndex = 0;
  showCancelConfirm = false;
  cancelLoading = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly listingService: ResourceListingService,
    private readonly favoriteService: FavoriteService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    this.currentCompanyId = user ? parseInt(user.id, 10) : null;

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadListing(id);
    this.loadFavoriteStatus(id);
  }

  loadListing(id: number): void {
    this.loading = true;
    this.listingService.getById(id).subscribe({
      next: (data) => { this.listing = data; this.loading = false; },
      error: (err) => { this.error = err.error?.message || 'Annonce introuvable'; this.loading = false; }
    });
  }

  loadFavoriteStatus(listingId: number): void {
    this.favoriteService.myFavorites().subscribe({
      next: (favs: FavoriteResponse[]) => {
        this.isFavorite = favs.some(f => f.listingId === listingId);
      }
    });
  }

  get isOwner(): boolean {
    return !!this.listing && this.currentCompanyId === this.listing.companyId;
  }

  get canEdit(): boolean {
    return this.isOwner && this.listing?.status === 'ACTIVE';
  }

  get canCancel(): boolean {
    return this.isOwner && this.listing?.status === 'ACTIVE';
  }

  get typeClass(): string {
    if (!this.listing) return '';
    switch (this.listing.type) {
      case 'SURPLUS': return 'type-surplus';
      case 'DEMANDE': return 'type-demande';
      case 'GROUP_BUYING': return 'type-group';
      default: return '';
    }
  }

  get typeLabel(): string {
    if (!this.listing) return '';
    switch (this.listing.type) {
      case 'SURPLUS': return 'Surplus';
      case 'DEMANDE': return 'Demande';
      case 'GROUP_BUYING': return 'Achat Groupé';
      default: return '';
    }
  }

  get statusBadge(): string {
    if (!this.listing) return '';
    switch (this.listing.status) {
      case 'ACTIVE': return 'badge-success';
      case 'CLOSED': return 'badge-neutral';
      case 'EXPIRED': return 'badge-warning';
      case 'CANCELLED': return 'badge-danger';
      default: return 'badge-neutral';
    }
  }

  prevImage(): void {
    if (this.listing && this.listing.attachmentUrls.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.listing.attachmentUrls.length) % this.listing.attachmentUrls.length;
    }
  }

  nextImage(): void {
    if (this.listing && this.listing.attachmentUrls.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.listing.attachmentUrls.length;
    }
  }

  duplicate(): void {
    if (!this.listing) return;
    this.listingService.duplicate(this.listing.id).subscribe({
      next: (copy) => this.router.navigate(['/enterprise/annonces', copy.id]),
      error: (err) => this.error = err.error?.message || 'Erreur lors de la duplication'
    });
  }

  confirmCancel(): void {
    this.showCancelConfirm = true;
  }

  cancelListing(): void {
    if (!this.listing || !this.currentCompanyId) return;
    this.cancelLoading = true;
    this.listingService.cancel(this.listing.id, this.currentCompanyId).subscribe({
      next: () => {
        this.showCancelConfirm = false;
        this.cancelLoading = false;
        this.loadListing(this.listing!.id);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de l\'annulation';
        this.cancelLoading = false;
        this.showCancelConfirm = false;
      }
    });
  }

  timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'À l\'instant';
    if (mins < 60) return `Il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    return `Il y a ${days}j`;
  }
}
