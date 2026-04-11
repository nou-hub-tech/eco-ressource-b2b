import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorite-button',
  standalone: false,
  templateUrl: './favorite-button.html',
  styleUrls: ['./favorite-button.css']
})
export class FavoriteButton {
  @Input() listingId!: number;
  @Input() isFavorite = false;
  @Input() count = 0;
  @Input() showCount = true;
  @Output() toggled = new EventEmitter<boolean>();

  loading = false;

  constructor(private readonly favoriteService: FavoriteService) {}

  toggle(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.loading) return;
    this.loading = true;

    const onSuccess = (): void => {
      this.isFavorite = !this.isFavorite;
      this.count += this.isFavorite ? 1 : -1;
      this.toggled.emit(this.isFavorite);
      this.loading = false;
    };
    const onError = (): void => { this.loading = false; };

    if (this.isFavorite) {
      this.favoriteService.remove(this.listingId).subscribe({ next: onSuccess, error: onError });
    } else {
      this.favoriteService.add(this.listingId).subscribe({ next: onSuccess, error: onError });
    }
  }
}
