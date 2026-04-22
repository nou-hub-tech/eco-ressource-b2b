import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceListingService } from '../services/resource-listing.service';
import { ProductAnnoncesService } from '../services/product-annonces.service';
import { Product, ListingType } from '../../../core/models/annonces.interfaces';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/product';
import { httpErrorMessage, normalizeProduct, unwrapApiArray } from '../services/api-normalize';

@Component({
  selector: 'app-listing-create',
  standalone: false,
  templateUrl: './listing-create.html',
  styleUrls: ['./listing-create.css']
})
export class ListingCreate implements OnInit {
  step = 1;
  totalSteps = 6;
  form!: FormGroup;
  products: Product[] = [];
  /** True si la liste provient de `productApiUrl` après refus d’accès à `/api/products`. */
  productsFromCatalogFallback = false;
  productsLoadError: string | null = null;
  loading = false;
  submitting = false;
  error = '';
  companyId!: number;

  selectedType: ListingType | null = null;

  types: { value: ListingType; label: string; desc: string; icon: string; color: string }[] = [
    { value: 'SURPLUS', label: 'Surplus', desc: 'Vous avez un excédent de matériaux à vendre', icon: '📦', color: '#059669' },
    { value: 'DEMANDE', label: 'Demande', desc: 'Vous recherchez des matériaux spécifiques', icon: '🔍', color: '#2563eb' },
    { value: 'GROUP_BUYING', label: 'Achat Groupé', desc: 'Créer un groupe d\'achat collectif', icon: '👥', color: '#d97706' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly listingService: ResourceListingService,
    private readonly productAnnoncesService: ProductAnnoncesService,
    private readonly catalogProductService: ProductService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    this.companyId = user ? parseInt(user.id, 10) : 0;

    this.form = this.fb.group({
      type: ['', Validators.required],
      productId: [null, Validators.required],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      price: [null, [Validators.min(0)]],
      location: [''],
      latitude: [null, [Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.min(-180), Validators.max(180)]],
      attachmentUrls: [[]],
      targetQuantity: [null],
      deadline: ['']
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productsLoadError = null;
    this.productsFromCatalogFallback = false;
    this.productAnnoncesService.findAll().subscribe({
      next: (data) => this.applyLoadedProducts(data, false),
      error: (err: unknown) => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          this.catalogProductService.getAll().subscribe({
            next: (catalog: unknown) => {
              const mapped = unwrapApiArray(catalog).map(normalizeProduct);
              this.applyLoadedProducts(mapped, true);
            },
            error: (catalogErr: unknown) => {
              this.productsLoadError =
                'Accès refusé au catalogue « produits annonces » (/api/products). ' +
                `Impossible non plus de charger le catalogue général : ${httpErrorMessage(catalogErr)}`;
              this.products = [];
              this.productsFromCatalogFallback = false;
              this.loading = false;
            }
          });
          return;
        }
        this.productsLoadError = httpErrorMessage(err);
        this.products = [];
        this.loading = false;
      }
    });
  }

  private applyLoadedProducts(data: Product[], fromCatalog: boolean): void {
    this.productsFromCatalogFallback = fromCatalog;
    this.products = data.filter((p) => p.idProduct > 0 && p.name);
    this.loading = false;
    if (this.products.length === 0) {
      this.productsLoadError = fromCatalog
        ? 'Aucun produit dans le catalogue général. Ajoutez-en via la gestion produit, ou demandez l’accès à l’API /api/products pour les produits du module annonces.'
        : 'Aucun produit retourné par l’API. Créez d’abord des produits (module Produits annonces ou backend), ou vérifiez que vous êtes bien connecté.';
    } else {
      this.productsLoadError = null;
    }
  }

  selectType(type: ListingType): void {
    this.selectedType = type;
    this.form.patchValue({ type });

    if (type === 'GROUP_BUYING') {
      this.form.get('targetQuantity')!.setValidators([Validators.required, Validators.min(1)]);
      this.form.get('deadline')!.setValidators([Validators.required]);
      this.totalSteps = 6;
    } else {
      this.form.get('targetQuantity')!.clearValidators();
      this.form.get('deadline')!.clearValidators();
      this.totalSteps = 5;
    }
    this.form.get('targetQuantity')!.updateValueAndValidity();
    this.form.get('deadline')!.updateValueAndValidity();
    this.nextStep();
  }

  get selectedProduct(): Product | undefined {
    return this.products.find(p => p.idProduct === this.form.value.productId);
  }

  get isGroupBuying(): boolean {
    return this.selectedType === 'GROUP_BUYING';
  }

  get canGoNext(): boolean {
    switch (this.step) {
      case 1: return !!this.selectedType;
      case 2: return this.form.get('productId')!.valid;
      case 3: return this.form.get('title')!.valid && this.form.get('description')!.valid
                   && this.form.get('quantity')!.valid && this.form.get('unit')!.valid;
      case 4:
        if (this.isGroupBuying) {
          return this.form.get('targetQuantity')!.valid && this.form.get('deadline')!.valid;
        }
        return true;
      default: return true;
    }
  }

  nextStep(): void {
    if (this.step < this.totalSteps) {
      if (!this.isGroupBuying && this.step === 3) {
        this.step = 5;
      } else {
        this.step++;
      }
    }
  }

  prevStep(): void {
    if (this.step > 1) {
      if (!this.isGroupBuying && this.step === 5) {
        this.step = 3;
      } else {
        this.step--;
      }
    }
  }

  goToStep(s: number): void {
    if (s <= this.step) this.step = s;
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = '';

    const val = this.form.value;
    const body = {
      ...val,
      companyId: this.companyId,
      attachmentUrls: val.attachmentUrls?.length ? val.attachmentUrls : undefined,
      targetQuantity: this.isGroupBuying ? val.targetQuantity : undefined,
      deadline: this.isGroupBuying ? val.deadline : undefined,
      price: val.price ?? undefined,
      location: val.location || undefined,
      latitude: val.latitude ?? undefined,
      longitude: val.longitude ?? undefined
    };

    this.listingService.create(body).subscribe({
      next: (res) => {
        this.submitting = false;
        this.router.navigate(['/enterprise/annonces', res.id]);
      },
      error: (err: unknown) => {
        this.error = httpErrorMessage(err);
        this.submitting = false;
      }
    });
  }
}
