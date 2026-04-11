import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockMovementService } from '../../services/stock-movement.service';
import { StockItemService } from '../../services/stock-item.service';
import { StockItem, StockMovement } from '../../../../core/models/annonces.interfaces';

@Component({
  selector: 'app-stock-movement-edit',
  standalone: false,
  templateUrl: './stock-movement-edit.html',
  styleUrls: ['./stock-movement-edit.css']
})
export class StockMovementEdit implements OnInit {
  form!: FormGroup;
  movement: StockMovement | null = null;
  stockItems: StockItem[] = [];
  loading = true;
  submitting = false;
  error = '';

  movementTypes = [
    { value: 'IN', label: 'Entrée (IN)' },
    { value: 'OUT', label: 'Sortie (OUT)' },
    { value: 'UPDATE', label: 'Ajustement (UPDATE)' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
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

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) {
      this.error = 'Identifiant invalide.';
      this.loading = false;
      return;
    }

    this.stockItemService.findAll().subscribe({ next: (items) => (this.stockItems = items) });

    this.movementService.getById(id).subscribe({
      next: (data) => {
        this.movement = data;
        const md = data.movementDate
          ? this.toDatetimeLocalValue(data.movementDate)
          : '';
        this.form.patchValue({
          quantity: data.quantity,
          movementType: data.movementType || 'IN',
          description: data.description ?? '',
          movementDate: md,
          idStock: data.stockItem?.idStock ?? null
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Mouvement introuvable.';
        this.loading = false;
      }
    });
  }

  /** Convert API date string to `datetime-local` value (local). */
  private toDatetimeLocalValue(isoOrDate: string): string {
    const d = new Date(isoOrDate);
    if (Number.isNaN(d.getTime())) return isoOrDate.slice(0, 16);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  stockOptionLabel(s: StockItem): string {
    return s.product?.name ? `${s.product.name} — #${s.idStock}` : `Stock #${s.idStock}`;
  }

  submit(): void {
    if (this.form.invalid || !this.movement) return;
    this.submitting = true;
    this.error = '';
    const v = this.form.value;
    this.movementService
      .update(this.movement.id, {
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
            err.error?.message || 'Erreur lors de la mise à jour du mouvement.';
        }
      });
  }
}
