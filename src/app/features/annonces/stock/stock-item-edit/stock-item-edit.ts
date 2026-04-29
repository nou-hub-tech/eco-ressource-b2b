import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockItemService } from '../../services/stock-item.service';
import { ProductAnnoncesService } from '../../services/product-annonces.service';
import { Product, StockItem } from '../../../../core/models/annonces.interfaces';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-stock-item-edit',
  standalone: false,
  templateUrl: './stock-item-edit.html',
  styleUrls: ['./stock-item-edit.css']
})
export class StockItemEdit implements OnInit {
  form!: FormGroup;
  item: StockItem | null = null;
  products: Product[] = [];
  loading = true;
  submitting = false;
  error = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly stockItemService: StockItemService,
    private readonly productService: ProductAnnoncesService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const defaultCompany = this.authService.getCompanyProfileId();

    this.form = this.fb.group({
      quantity: [null, [Validators.required, Validators.min(0.0001)]],
      unitPrice: [null, [Validators.required, Validators.min(0)]],
      idProduct: [null, Validators.required],
      companyId: [defaultCompany],
      itemCondition: [''],
      expirationDate: [''],
      image: [''],
      location: [''],
      status: [''],
      unit: ['']
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (Number.isNaN(id)) {
      this.error = 'Identifiant invalide.';
      this.loading = false;
      return;
    }

    this.productService.findAll().subscribe({ next: (p) => (this.products = p) });

    this.stockItemService.getById(id).subscribe({
      next: (data) => {
        this.item = data;
        const exp = data.expirationDate
          ? data.expirationDate.slice(0, 10)
          : '';
        this.form.patchValue({
          quantity: data.quantity,
          unitPrice: data.unitPrice,
          idProduct: data.product?.idProduct ?? null,
          companyId: data.companyId ?? defaultCompany,
          itemCondition: data.itemCondition ?? '',
          expirationDate: exp,
          image: data.image ?? '',
          location: data.location ?? '',
          status: data.status ?? '',
          unit: data.unit ?? ''
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Article en stock introuvable.';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid || !this.item) return;
    this.submitting = true;
    this.error = '';
    const v = this.form.value;
    const companyId =
      v.companyId !== null && v.companyId !== undefined && v.companyId !== ''
        ? Number(v.companyId)
        : undefined;

    this.stockItemService
      .update(this.item.idStock, {
        quantity: Number(v.quantity),
        unitPrice: Number(v.unitPrice),
        idProduct: v.idProduct,
        companyId,
        itemCondition: v.itemCondition?.trim() || undefined,
        expirationDate: v.expirationDate?.trim() || undefined,
        image: v.image?.trim() || undefined,
        location: v.location?.trim() || undefined,
        status: v.status?.trim() || undefined,
        unit: v.unit?.trim() || undefined
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.router.navigate(['/enterprise/annonces/stock', this.item!.idStock]);
        },
        error: (err) => {
          this.submitting = false;
          this.error =
            err.error?.message || 'Erreur lors de la mise à jour de l’article.';
        }
      });
  }
}
