import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { FavoriteResponse } from '../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-favorite-list',
  standalone: false,
  templateUrl: './favorite-list.html',
  styleUrls: ['./favorite-list.css']
})
export class FavoriteList implements OnInit {
  favorites: FavoriteResponse[] = [];
  loading = true;

  constructor(private readonly favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.loading = true;
    this.favoriteService.myFavorites().subscribe({
      next: (data) => { this.favorites = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  removeFavorite(listingId: number): void {
    this.favoriteService.remove(listingId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(f => f.listingId !== listingId);
      }
    });
  }
}
