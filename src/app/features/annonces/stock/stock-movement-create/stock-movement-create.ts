import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockMovementService } from '../../services/stock-movement.service';
import { StockItemService } from '../../services/stock-item.service';
import { StockItem } from '../../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-stock-movement-create',
  standalone: false,
  templateUrl: './stock-movement-create.html',
  styleUrls: ['./stock-movement-create.css']
})
export class StockMovementCreate implements OnInit {
  form!: FormGroup;
  stockItems: StockItem[] = [];
  loadingItems = true;
  submitting = false;
  error = '';

  movementTypes = [
    { value: 'IN', label: 'Entrée (IN)' },
    { value: 'OUT', label: 'Sortie (OUT)' },
    { value: 'UPDATE', label: 'Ajustement (UPDATE)' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly movementService: StockMovementService,
    private readonly stockItemService: StockItemService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      quantity: [null, [Validators.required, Validators.min(0.0001)]],
      movementType: ['IN', Validators.required],
      description: [''],
      movementDate: [''],
      idStock: [null, Validators.required]
    });

    this.stockItemService.findAll().subscribe({
      next: (data) => {
        this.stockItems = data;
        this.loadingItems = false;
      },
      error: () => {
        this.loadingItems = false;
        this.error = 'Impossible de charger les articles en stock.';
      }
    });
  }

  stockOptionLabel(s: StockItem): string {
    return s.product?.name ? `${s.product.name} — #${s.idStock}` : `Stock #${s.idStock}`;
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = '';
    const v = this.form.value;
    this.movementService
      .create({
        quantity: Number(v.quantity),
        movementType: v.movementType,
        description: v.description?.trim() || undefined,
        movementDate: v.movementDate?.trim() || undefined,
        idStock: v.idStock
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/enterprise/annonces/stock/movements']);
        },
        error: (err) => {
          this.submitting = false;
          this.error =
            err.error?.message || 'Erreur lors de la création du mouvement.';
        }
      });
  }
}
