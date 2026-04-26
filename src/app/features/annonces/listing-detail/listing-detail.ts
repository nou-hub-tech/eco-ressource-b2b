import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  NgZone,
  OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceListingService } from '../services/resource-listing.service';
import { FavoriteService } from '../services/favorite.service';
import {
  ListingResponse,
  FavoriteResponse,
  GroupPurchaseResponse
} from '../../../core/models/annonces.interfaces';
import { AuthService } from '../../../core/services/auth.service';
import { DEFAULT_LISTING_IMAGE_URL, MAX_LISTING_PHOTOS } from '../constants/listing-images';

@Component({
  selector: 'app-listing-detail',
  standalone: false,
  templateUrl: './listing-detail.html',
  styleUrls: ['./listing-detail.css']
})
export class ListingDetail implements OnInit {
  listing: ListingResponse | null = null;
  /** Compteurs affichés dans la grille + bouton cœur (mutés + re-sync API). */
  displayFavs = 0;
  displayComments = 0;
  loading = true;
  error = '';
  isFavorite = false;
  currentCompanyId: number | null = null;
  currentImageIndex = 0;
  showCancelConfirm = false;
  cancelLoading = false;
  /** Incrémenté après un toggle favori ; ignore les réponses HTTP myFavorites arrivées trop tard. */
  private favoriteSyncGen = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly listingService: ResourceListingService,
    private readonly favoriteService: FavoriteService,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone,
    private readonly destroyRef: DestroyRef,
    private readonly appRef: ApplicationRef
  ) {}

  private refreshView(): void {
    this.ngZone.run(() => this.cdr.detectChanges());
  }

  /** Met à jour les bindings numériques sans pipe async (plus fiable ici). */
  private pulseCounters(): void {
    this.ngZone.run(() => {
      this.cdr.markForCheck();
      this.cdr.detectChanges();
      this.appRef.tick();
    });
  }

  /**
   * Re-sync avec le GET annonce. Le backend peut renvoyer commentCount à 0 alors que les
   * commentaires existent — on fusionne avec le total déjà affiché ou le total issu du fil.
   */
  private refreshListingCountersFromApi(
    listingId: number,
    opts?: { commentFloor?: number }
  ): void {
    this.listingService.getById(listingId).subscribe({
      next: (data) => {
        if (!this.listing || this.listing.id !== listingId) return;
        const fc = data.favoriteCount ?? 0;
        const apiCc = data.commentCount ?? 0;
        const floor =
          opts?.commentFloor !== undefined ? opts.commentFloor : this.displayComments;
        const mergedCc = Math.max(floor, apiCc);
        this.listing = {
          ...this.listing,
          favoriteCount: fc,
          commentCount: mergedCc,
          groupPurchase: data.groupPurchase ?? this.listing.groupPurchase
        };
        this.displayFavs = fc;
        this.displayComments = mergedCc;
        this.pulseCounters();
      }
    });
  }

  ngOnInit(): void {
    this.currentCompanyId = this.authService.getCompanyProfileId();
    this.authService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.currentCompanyId = this.authService.getCompanyProfileId();
      });

    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((pm) => {
      const id = Number(pm.get('id'));
      if (!Number.isFinite(id) || id <= 0) return;
      this.loadListing(id);
    });
  }

  loadListing(id: number): void {
    const switchingListing = !this.listing || this.listing.id !== id;
    if (switchingListing) {
      this.loading = true;
      this.error = '';
      if (this.listing !== null && this.listing.id !== id) {
        this.listing = null;
      }
    }

    this.listingService.getById(id).subscribe({
      next: (data) => {
        const apiCc = data.commentCount ?? 0;
        const mergedCc = switchingListing ? apiCc : Math.max(this.displayComments, apiCc);
        this.displayFavs = data.favoriteCount ?? 0;
        this.displayComments = mergedCc;
        this.listing = { ...data, commentCount: mergedCc };
        if (switchingListing) {
          this.currentImageIndex = 0;
        }
        this.loading = false;
        this.refreshView();
        this.loadFavoriteStatus(id);
      },
      error: (err) => {
        this.error = err.error?.message || 'Annonce introuvable';
        this.loading = false;
        this.refreshView();
      }
    });
  }

  loadFavoriteStatus(listingId: number): void {
    const gen = this.favoriteSyncGen;
    this.favoriteService.myFavorites().subscribe({
      next: (favs: FavoriteResponse[]) => {
        if (gen !== this.favoriteSyncGen) return;
        if (this.listing?.id !== listingId) return;
        this.isFavorite = favs.some((f) => f.listingId === listingId);
        this.refreshView();
      },
      error: () => this.refreshView()
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

  /** Toujours au moins une URL pour la galerie (placeholder si l’API ne renvoie rien). */
  get displayGalleryUrls(): string[] {
    const raw = (this.listing?.attachmentUrls?.map((u) => u?.trim()).filter(Boolean) ?? []).slice(
      0,
      MAX_LISTING_PHOTOS
    );
    if (raw.length === 0) {
      return [DEFAULT_LISTING_IMAGE_URL];
    }
    return raw;
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

  get ownerDisplayName(): string {
    const n = this.listing?.companyName?.trim();
    return n || 'Entreprise';
  }

  get ownerInitial(): string {
    return this.ownerDisplayName.charAt(0).toUpperCase();
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
    const urls = this.displayGalleryUrls;
    if (urls.length <= 1) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + urls.length) % urls.length;
    this.refreshView();
  }

  nextImage(): void {
    const urls = this.displayGalleryUrls;
    if (urls.length <= 1) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % urls.length;
    this.refreshView();
  }

  selectGalleryImage(i: number): void {
    const urls = this.displayGalleryUrls;
    if (i >= 0 && i < urls.length) {
      this.currentImageIndex = i;
      this.refreshView();
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

  onCommentCountUpdated(total: number): void {
    const listing = this.listing;
    if (!listing) return;
    // Référence nouvelle pour forcer la détection ; pas de GET ici (évite courses + écrasement).
    this.listing = { ...listing, commentCount: total };
    this.displayComments = total;
    this.pulseCounters();
    queueMicrotask(() =>
      this.ngZone.run(() => {
        if (this.listing?.id === listing.id) {
          this.displayComments = total;
          this.pulseCounters();
        }
      })
    );
  }

  onGroupPurchaseUpdated(group: GroupPurchaseResponse): void {
    const listing = this.listing;
    if (!listing || listing.groupPurchase?.id !== group.id) return;
    this.listing = { ...listing, groupPurchase: group };
    this.pulseCounters();
  }

  onFavoriteToggled(nowFavorite: boolean): void {
    const listing = this.listing;
    if (!listing) return;
    this.favoriteSyncGen++;
    if (this.isFavorite === nowFavorite) return;

    const delta = nowFavorite ? 1 : -1;
    this.isFavorite = nowFavorite;
    const next = Math.max(0, this.displayFavs + delta);
    this.displayFavs = next;
    this.listing = { ...listing, favoriteCount: next };
    this.pulseCounters();
    this.refreshListingCountersFromApi(listing.id);
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
