import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
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

  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {}

  toggle(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    if (this.loading) return;
    this.loading = true;

    const wasFavorite = this.isFavorite;
    const finish = (nowFavorite: boolean): void => {
      this.loading = false;
      this.ngZone.run(() => {
        this.toggled.emit(nowFavorite);
        this.cdr.detectChanges();
      });
    };

    const onError = (): void => {
      this.loading = false;
      this.ngZone.run(() => this.cdr.detectChanges());
    };

    if (wasFavorite) {
      this.favoriteService.remove(this.listingId).subscribe({
        next: () => finish(false),
        error: onError
      });
    } else {
      this.favoriteService.add(this.listingId).subscribe({
        next: () => finish(true),
        error: onError
      });
    }
  }
}
