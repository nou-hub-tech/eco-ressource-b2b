import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockItemService } from '../../services/stock-item.service';
import { StockItem } from '../../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-stock-item-detail',
  standalone: false,
  templateUrl: './stock-item-detail.html',
  styleUrls: ['./stock-item-detail.css']
})
export class StockItemDetail implements OnInit {
  item: StockItem | null = null;
  loading = true;
  error = '';

  showDeleteConfirm = false;
  deleteError = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly stockItemService: StockItemService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) {
      this.error = 'Identifiant invalide.';
      this.loading = false;
      return;
    }
    this.stockItemService.getById(id).subscribe({
      next: (data) => {
        this.item = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Article en stock introuvable.';
        this.loading = false;
      }
    });
  }

  openDelete(): void {
    this.deleteError = '';
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
  }

  confirmDelete(): void {
    if (!this.item) return;
    this.stockItemService.delete(this.item.idStock).subscribe({
      next: () => {
        this.showDeleteConfirm = false;
        this.router.navigate(['/enterprise/annonces/stock']);
      },
      error: (err) => {
        this.deleteError =
          err.error?.message || 'La suppression a échoué. Réessayez plus tard.';
        this.showDeleteConfirm = false;
      }
    });
  }
}
