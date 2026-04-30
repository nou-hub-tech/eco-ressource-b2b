import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ListingResponse } from '../../../core/models/annonces.interfaces';
import { ResourceListingService } from '../../annonces/services/resource-listing.service';
import { httpErrorMessage } from '../../annonces/services/api-normalize';
import { RealtimeService } from '../../annonces/services/realtime.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-listings',
  standalone: false,
  templateUrl: './listings.html',
  styleUrls: ['./listings.css']
})
export class Listings implements OnInit {
  listings: ListingResponse[] = [];
  search = '';
  filterStatus = 'all';
  filterType = 'all';
  loading = true;
  error: string | null = null;
  deletingId: number | null = null;
  realtimeNotices: string[] = [];
  private realtimeReady = false;
  private loadingRequest = false;
  private lastNoticeKey: string | null = null;
  private adminRefreshTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly listingService: ResourceListingService,
    private readonly realtimeService: RealtimeService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.verifyAdminSessionAndLoad();
  }

  private verifyAdminSessionAndLoad(): void {
    this.loading = true;
    this.error = null;
    this.authService.refreshProfileFromApi()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          if (user?.role !== 'admin') {
            this.loading = false;
            this.error = 'Session admin invalide ou remplacee par un compte entreprise. Reconnectez-vous avec le compte administrateur.';
            this.router.navigate(['/auth/login']);
            return;
          }
          this.loadListings();
          this.connectRealtimeOnce();
        },
        error: (err: unknown) => {
          this.loading = false;
          this.error = httpErrorMessage(err);
        }
      });
  }

  private connectRealtimeOnce(): void {
    if (this.realtimeReady) return;
    this.realtimeReady = true;
    this.realtimeService.listingEvents()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.pushNotice(this.messageForEvent(event.type), `${event.type}:${event.listingId ?? ''}:${event.occurredAt ?? ''}`);
        this.scheduleAdminSilentRefresh();
      });
    this.realtimeService.adminNotifications()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) =>
        this.pushNotice(
          event.message || 'Notification moderation',
          `${event.type}:${event.userId ?? ''}:${event.occurredAt ?? event.message ?? ''}`
        )
      );
  }

  loadListings(): void {
    this.fetchListings(true);
  }

  private scheduleAdminSilentRefresh(): void {
    if (this.adminRefreshTimer) {
      clearTimeout(this.adminRefreshTimer);
    }
    this.adminRefreshTimer = setTimeout(() => {
      this.adminRefreshTimer = null;
      this.fetchListings(false);
    }, 1200);
  }

  private fetchListings(showLoader: boolean): void {
    if (this.loadingRequest) return;
    this.loadingRequest = true;
    if (showLoader || this.listings.length === 0) {
      this.loading = true;
    }
    this.error = null;
    this.listingService.findAllForAdmin().subscribe({
      next: (items) => {
        this.listings = items;
        this.loading = false;
        this.loadingRequest = false;
      },
      error: (err: unknown) => {
        this.error = httpErrorMessage(err);
        this.loading = false;
        this.loadingRequest = false;
      }
    });
  }

  get filtered(): ListingResponse[] {
    const q = this.search.trim().toLowerCase();
    return this.listings.filter((l) => {
      const matchSearch = !q ||
        l.title.toLowerCase().includes(q) ||
        (l.companyName ?? '').toLowerCase().includes(q) ||
        (l.productCategory ?? '').toLowerCase().includes(q) ||
        (l.location ?? '').toLowerCase().includes(q);
      const matchStatus = this.filterStatus === 'all' || l.status === this.filterStatus;
      const matchType = this.filterType === 'all' || l.type === this.filterType;
      return matchSearch && matchStatus && matchType;
    });
  }

  get totalActive(): number {
    return this.listings.filter((l) => l.status === 'ACTIVE').length;
  }

  get totalGroupBuying(): number {
    return this.listings.filter((l) => l.type === 'GROUP_BUYING').length;
  }

  get totalInteractions(): number {
    return this.listings.reduce((sum, l) => sum + l.favoriteCount + l.commentCount, 0);
  }

  detail(listing: ListingResponse): void {
    this.router.navigate(['/admin/annonces', listing.id]);
  }

  edit(listing: ListingResponse): void {
    this.router.navigate(['/admin/annonces', listing.id, 'edit']);
  }

  delete(listing: ListingResponse): void {
    const ok = window.confirm(`Supprimer definitivement l'annonce "${listing.title}" ?`);
    if (!ok) return;
    this.deletingId = listing.id;
    this.error = null;
    this.listingService.delete(listing.id).subscribe({
      next: () => {
        this.listings = this.listings.filter((item) => item.id !== listing.id);
        this.deletingId = null;
      },
      error: (err: unknown) => {
        this.error = httpErrorMessage(err);
        this.deletingId = null;
      }
    });
  }

  dismissNotice(index: number): void {
    this.realtimeNotices.splice(index, 1);
  }

  private pushNotice(message: string, key = message): void {
    if (!message) return;
    if (this.lastNoticeKey === key || this.realtimeNotices.includes(message)) return;
    this.lastNoticeKey = key;
    this.realtimeNotices = [message, ...this.realtimeNotices].slice(0, 4);
    setTimeout(() => {
      this.realtimeNotices = this.realtimeNotices.filter((m) => m !== message);
    }, 6500);
  }

  private messageForEvent(type: string): string {
    switch (type) {
      case 'LISTING_CREATED': return 'Nouvelle annonce publiee.';
      case 'LISTING_UPDATED': return 'Annonce mise a jour.';
      case 'LISTING_DELETED': return 'Annonce supprimee.';
      case 'LISTING_CANCELLED': return 'Annonce annulee.';
      case 'COMMENT_CREATED': return 'Nouveau commentaire.';
      case 'COMMENT_UPDATED': return 'Commentaire modifie.';
      case 'COMMENT_DELETED': return 'Commentaire supprime.';
      case 'FAVORITE_CHANGED': return 'Favori mis a jour.';
      case 'GROUP_CHANGED': return 'Achat groupe mis a jour.';
      default: return 'Mise a jour temps reel recue.';
    }
  }
}
