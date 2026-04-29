import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockItemService } from '../../services/stock-item.service';
import { ProductAnnoncesService } from '../../services/product-annonces.service';
import { Product } from '../../../../core/models/annonces.interfaces';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-stock-item-create',
  standalone: false,
  templateUrl: './stock-item-create.html',
  styleUrls: ['./stock-item-create.css']
})
export class StockItemCreate implements OnInit {
  form!: FormGroup;
  products: Product[] = [];
  loadingProducts = true;
  submitting = false;
  error = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly stockItemService: StockItemService,
    private readonly productService: ProductAnnoncesService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    const defaultCompany = user ? parseInt(user.id, 10) : null;

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

    this.productService.findAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loadingProducts = false;
      },
      error: () => {
        this.loadingProducts = false;
        this.error = 'Impossible de charger la liste des produits.';
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = '';
    const v = this.form.value;
    const companyId =
      v.companyId !== null && v.companyId !== undefined && v.companyId !== ''
        ? Number(v.companyId)
        : undefined;

    this.stockItemService
      .create({
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
        next: (res) => {
          this.submitting = false;
          this.router.navigate(['/enterprise/annonces/stock', res.idStock]);
        },
        error: (err) => {
          this.submitting = false;
          this.error =
            err.error?.message || 'Erreur lors de la création de l’article en stock.';
        }
      });
  }
}
