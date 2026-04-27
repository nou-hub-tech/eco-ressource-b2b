import { ChangeDetectorRef, Component, DestroyRef, NgZone, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceListingService } from '../services/resource-listing.service';
import { FavoriteService } from '../services/favorite.service';
import { httpErrorMessage } from '../services/api-normalize';
import { ListingResponse, FavoriteResponse } from '../../../core/models/annonces.interfaces';
import { AuthService } from '../../../core/services/auth.service';
import { RealtimeService } from '../services/realtime.service';

@Component({
  selector: 'app-listing-list',
  standalone: false,
  templateUrl: './listing-list.html',
  styleUrls: ['./listing-list.css']
})
export class ListingList implements OnInit {
  listings: ListingResponse[] = [];
  filtered: ListingResponse[] = [];
  paged: ListingResponse[] = [];
  favoriteIds = new Set<number>();

  loading = true;
  /** Erreur API / réseau (distinct d’une liste vide réelle). */
  loadError: string | null = null;
  filterType = '';
  filterCategory = '';
  filterLocation = '';
  filterMaxPrice: number | null = null;
  sortBy = 'date';

  currentPage = 1;
  pageSize = 12;

  categories: string[] = [];
  mode: 'all' | 'mine' = 'all';
  deletingId: number | null = null;
  actionError: string | null = null;
  realtimeNotices: string[] = [];

  constructor(
    private readonly listingService: ResourceListingService,
    private readonly favoriteService: FavoriteService,
    private readonly authService: AuthService,
    private readonly realtimeService: RealtimeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {}

  /** HttpClient peut terminer hors cycle Angular selon l’environnement ; force l’affichage sans clic. */
  private refreshView(): void {
    this.ngZone.run(() => this.cdr.detectChanges());
  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'] === 'mine' ? 'mine' : 'all';
    this.loadData();
    this.realtimeService.listingEvents()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (!event.type) return;
        this.pushNotice(this.messageForEvent(event.type));
        this.loadData();
      });

    this.authService.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        const id = user?.id ? Number(user.id) : null;
        if (!id || !Number.isFinite(id)) return;
        this.realtimeService.userNotifications(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((event) => this.pushNotice(event.message || 'Nouvelle notification'));
      });
  }

  loadData(): void {
    this.loading = true;
    this.loadError = null;
    const source$ = this.mode === 'mine'
      ? this.listingService.findMine()
      : this.listingService.findAll();
    source$.subscribe({
      next: (data) => {
        this.listings = data;
        this.categories = [...new Set(data.map(l => l.productCategory).filter(Boolean))];
        this.applyFilters();
        this.loading = false;
        this.refreshView();
      },
      error: (err: unknown) => {
        this.loadError = httpErrorMessage(err);
        this.listings = [];
        this.filtered = [];
        this.paged = [];
        this.loading = false;
        this.refreshView();
      }
    });

    this.favoriteService.myFavorites().subscribe({
      next: (favs: FavoriteResponse[]) => {
        this.favoriteIds = new Set(favs.map(f => f.listingId));
        this.refreshView();
      },
      error: () => {
        this.favoriteIds = new Set();
        this.refreshView();
      }
    });
  }

  applyFilters(): void {
    let result = [...this.listings];

    if (this.filterType) {
      result = result.filter(l => l.type === this.filterType);
    }
    if (this.filterCategory) {
      result = result.filter(l => l.productCategory === this.filterCategory);
    }
    if (this.filterLocation) {
      result = result.filter(l =>
        l.location?.toLowerCase().includes(this.filterLocation.toLowerCase())
      );
    }
    if (this.filterMaxPrice !== null && this.filterMaxPrice > 0) {
      result = result.filter(l => l.price !== null && l.price <= this.filterMaxPrice!);
    }

    this.sortResults(result);
    this.filtered = result;
    this.currentPage = 1;
    this.updatePaged();
  }

  sortResults(arr: ListingResponse[]): void {
    switch (this.sortBy) {
      case 'date':
        arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price-desc':
        arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'popularity':
        arr.sort((a, b) => (b.favoriteCount + b.commentCount) - (a.favoriteCount + a.commentCount));
        break;
      case 'title':
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
  }

  onSortChange(): void {
    this.sortResults(this.filtered);
    this.currentPage = 1;
    this.updatePaged();
  }

  updatePaged(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paged = this.filtered.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaged();
  }

  clearFilters(): void {
    this.filterType = '';
    this.filterCategory = '';
    this.filterLocation = '';
    this.filterMaxPrice = null;
    this.applyFilters();
  }

  get hasActiveFilters(): boolean {
    return !!(this.filterType || this.filterCategory || this.filterLocation || this.filterMaxPrice);
  }

  get pageTitle(): string {
    return this.mode === 'mine' ? 'Mes annonces' : 'Annonces';
  }

  get pageSubtitle(): string {
    return this.mode === 'mine'
      ? 'Gerez vos publications, modifiez les informations et supprimez les annonces qui ne sont plus utiles'
      : 'Decouvrez les surplus, demandes et achats groupes';
  }

  get currentCompanyId(): number | null {
    return this.authService.getCompanyProfileId();
  }

  get mappedCount(): number {
    return this.filtered.filter(
      (listing) => typeof listing.latitude === 'number' && typeof listing.longitude === 'number'
    ).length;
  }

  openListing(id: number): void {
    if (!id) return;
    this.router.navigate(['/enterprise/annonces', id]);
  }

  canManage(listing: ListingResponse): boolean {
    const companyId = this.currentCompanyId;
    return companyId !== null && listing.companyId === companyId;
  }

  editListing(listing: ListingResponse): void {
    this.router.navigate(['/enterprise/annonces', listing.id, 'edit']);
  }

  deleteListing(listing: ListingResponse): void {
    const ok = window.confirm(`Supprimer l'annonce "${listing.title}" ?`);
    if (!ok) return;
    this.deletingId = listing.id;
    this.actionError = null;
    this.listingService.delete(listing.id).subscribe({
      next: () => {
        this.listings = this.listings.filter((item) => item.id !== listing.id);
        this.applyFilters();
        this.deletingId = null;
        this.refreshView();
      },
      error: (err: unknown) => {
        this.actionError = httpErrorMessage(err);
        this.deletingId = null;
        this.refreshView();
      }
    });
  }

  dismissNotice(index: number): void {
    this.realtimeNotices.splice(index, 1);
    this.refreshView();
  }

  private pushNotice(message: string): void {
    if (!message) return;
    this.realtimeNotices = [message, ...this.realtimeNotices].slice(0, 3);
    this.refreshView();
    setTimeout(() => {
      this.realtimeNotices = this.realtimeNotices.filter((m) => m !== message);
      this.refreshView();
    }, 5500);
  }

  private messageForEvent(type: string): string {
    switch (type) {
      case 'LISTING_CREATED': return 'Nouvelle annonce publiee.';
      case 'LISTING_UPDATED': return 'Une annonce a ete mise a jour.';
      case 'LISTING_DELETED': return 'Une annonce a ete supprimee.';
      case 'LISTING_CANCELLED': return 'Une annonce a ete annulee.';
      case 'COMMENT_CREATED': return 'Nouveau commentaire sur une annonce.';
      case 'COMMENT_UPDATED': return 'Un commentaire a ete modifie.';
      case 'COMMENT_DELETED': return 'Un commentaire a ete supprime.';
      case 'FAVORITE_CHANGED': return 'Les favoris ont ete mis a jour.';
      case 'GROUP_CHANGED': return 'Un achat groupe a ete mis a jour.';
      default: return 'Mise a jour temps reel recue.';
    }
  }
}
