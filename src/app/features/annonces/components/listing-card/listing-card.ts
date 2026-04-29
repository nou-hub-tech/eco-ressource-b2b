import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ListingResponse } from '../../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-listing-card',
  standalone: false,
  templateUrl: './listing-card.html',
  styleUrls: ['./listing-card.css']
})
export class ListingCard {
  @Input() listing!: ListingResponse;
  @Input() favoriteIds: Set<number> = new Set();

  constructor(private readonly router: Router) {}

  get typeClass(): string {
    switch (this.listing.type) {
      case 'SURPLUS': return 'type-surplus';
      case 'DEMANDE': return 'type-demande';
      case 'GROUP_BUYING': return 'type-group';
      default: return '';
    }
  }

  get typeLabel(): string {
    switch (this.listing.type) {
      case 'SURPLUS': return 'Surplus';
      case 'DEMANDE': return 'Demande';
      case 'GROUP_BUYING': return 'Achat Groupé';
      default: return '';
    }
  }

  get statusClass(): string {
    switch (this.listing.status) {
      case 'ACTIVE': return 'badge-success';
      case 'CLOSED': return 'badge-neutral';
      case 'EXPIRED': return 'badge-warning';
      case 'CANCELLED': return 'badge-danger';
      default: return 'badge-neutral';
    }
  }

  get groupProgress(): number {
    if (!this.listing.groupPurchase) return 0;
    const gp = this.listing.groupPurchase;
    return gp.targetQuantity > 0
      ? Math.round((gp.currentQuantity / gp.targetQuantity) * 100)
      : 0;
  }

  get progressColor(): string {
    const p = this.groupProgress;
    if (p >= 75) return '#059669';
    if (p >= 25) return '#d97706';
    return '#dc2626';
  }

  get isFav(): boolean {
    return this.favoriteIds.has(this.listing.id);
  }

  goToDetail(): void {
    this.router.navigate(['/enterprise/annonces', this.listing.id]);
  }

  timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'À l\'instant';
    if (mins < 60) return `Il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `Il y a ${days}j`;
    return new Date(dateStr).toLocaleDateString('fr-FR');
  }
}
