import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResourceListingService } from '../services/resource-listing.service';
import { FavoriteService } from '../services/favorite.service';
import { ListingResponse } from '../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-listing-search',
  standalone: false,
  templateUrl: './listing-search.html',
  styleUrls: ['./listing-search.css']
})
export class ListingSearch implements OnInit {
  form!: FormGroup;
  results: ListingResponse[] = [];
  paged: ListingResponse[] = [];
  favoriteIds = new Set<number>();
  loading = false;
  searched = false;
  currentPage = 1;
  pageSize = 12;
  sortBy = 'date';

  constructor(
    private readonly fb: FormBuilder,
    private readonly listingService: ResourceListingService,
    private readonly favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: [''],
      category: [''],
      location: [''],
      maxPrice: [null]
    });

    this.favoriteService.myFavorites().subscribe({
      next: (favs) => this.favoriteIds = new Set(favs.map(f => f.listingId))
    });
  }

  search(): void {
    this.loading = true;
    this.searched = true;
    const val = this.form.value;

    this.listingService.search({
      type: val.type || undefined,
      category: val.category || undefined,
      location: val.location || undefined,
      maxPrice: val.maxPrice || undefined
    }).subscribe({
      next: (data) => {
        this.results = data;
        this.sortResults();
        this.currentPage = 1;
        this.updatePaged();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  sortResults(): void {
    switch (this.sortBy) {
      case 'date':
        this.results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        this.results.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case 'price-desc':
        this.results.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case 'popularity':
        this.results.sort((a, b) => (b.favoriteCount + b.commentCount) - (a.favoriteCount + a.commentCount));
        break;
    }
  }

  onSortChange(): void {
    this.sortResults();
    this.currentPage = 1;
    this.updatePaged();
  }

  updatePaged(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paged = this.results.slice(start, start + this.pageSize);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaged();
  }

  reset(): void {
    this.form.reset();
    this.results = [];
    this.paged = [];
    this.searched = false;
  }
}
