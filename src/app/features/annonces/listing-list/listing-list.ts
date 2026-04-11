import { Component, OnInit } from '@angular/core';
import { ResourceListingService } from '../services/resource-listing.service';
import { FavoriteService } from '../services/favorite.service';
import { ListingResponse, FavoriteResponse } from '../../../core/models/annonces.interfaces';

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
  filterType = '';
  filterCategory = '';
  filterLocation = '';
  filterMaxPrice: number | null = null;
  sortBy = 'date';

  currentPage = 1;
  pageSize = 12;

  categories: string[] = [];

  constructor(
    private readonly listingService: ResourceListingService,
    private readonly favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.listingService.findAll().subscribe({
      next: (data) => {
        this.listings = data;
        this.categories = [...new Set(data.map(l => l.productCategory).filter(Boolean))];
        this.applyFilters();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });

    this.favoriteService.myFavorites().subscribe({
      next: (favs: FavoriteResponse[]) => {
        this.favoriteIds = new Set(favs.map(f => f.listingId));
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
}
