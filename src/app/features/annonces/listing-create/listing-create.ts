import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceListingService } from '../services/resource-listing.service';
import { ProductAnnoncesService } from '../services/product-annonces.service';
import { Product, ListingType } from '../../../core/models/annonces.interfaces';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/product';
import { httpErrorMessage, normalizeProduct, unwrapApiArray } from '../services/api-normalize';
import {
  DEFAULT_LISTING_IMAGE_URL,
  MAX_LISTING_IMAGE_BYTES,
  MAX_LISTING_PHOTOS,
  isOnlyDefaultPlaceholder,
  resolveListingAttachmentUrls
} from '../constants/listing-images';
import { ListingImageUploadService } from '../services/listing-image-upload.service';
import { GeocodingService } from '../services/geocoding.service';
import { concatMap, finalize, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

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
  /** Erreur liée au fichier image (taille ou type). */
  imageError: string | null = null;
  /** Upload multipart vers {@code POST /api/listing-images} en cours. */
  uploadingImage = false;
  geocodingLocation = false;
  locationStatus: string | null = null;
  /** Index de la grande vignette à l’étape photos. */
  previewMainIndex = 0;
  readonly maxListingPhotos = MAX_LISTING_PHOTOS;
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
    private readonly authService: AuthService,
    private readonly listingImageUpload: ListingImageUploadService,
    private readonly geocodingService: GeocodingService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {}

  private refreshView(): void {
    this.ngZone.run(() => this.cdr.detectChanges());
  }

  ngOnInit(): void {
    this.companyId = this.authService.getCompanyProfileId() ?? 0;

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
              this.refreshView();
            }
          });
          return;
        }
        this.productsLoadError = httpErrorMessage(err);
        this.products = [];
        this.loading = false;
        this.refreshView();
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
    this.refreshView();
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

  get attachmentUrlsList(): string[] {
    return ((this.form.get('attachmentUrls')?.value as string[]) || [])
      .map((u) => u.trim())
      .filter(Boolean)
      .slice(0, MAX_LISTING_PHOTOS);
  }

  get listingImagePreview(): string {
    const arr = this.attachmentUrlsList;
    if (!arr.length) return DEFAULT_LISTING_IMAGE_URL;
    const i = Math.min(Math.max(this.previewMainIndex, 0), arr.length - 1);
    return arr[i];
  }

  get usesCustomListingPhoto(): boolean {
    const urls = this.form?.get('attachmentUrls')?.value as string[] | undefined;
    return !isOnlyDefaultPlaceholder(urls);
  }

  setPreviewIndex(i: number): void {
    const n = this.attachmentUrlsList.length;
    if (n === 0) return;
    this.previewMainIndex = Math.min(Math.max(i, 0), n - 1);
    this.refreshView();
  }

  onListingImageSelected(event: Event): void {
    this.imageError = null;
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files?.length) return;

    const current = ((this.form.get('attachmentUrls')?.value as string[]) || []).map((u) => u.trim()).filter(Boolean);
    const room = MAX_LISTING_PHOTOS - current.length;
    if (room <= 0) {
      this.imageError = `Maximum ${MAX_LISTING_PHOTOS} photos. Retirez-en une pour en ajouter.`;
      input.value = '';
      this.refreshView();
      return;
    }

    const raw = Array.from(files);
    const toProcess = raw.slice(0, room);
    if (raw.length > room) {
      this.imageError = `Seules ${room} photo(s) supplémentaire(s) ont été prises (limite ${MAX_LISTING_PHOTOS}).`;
    }

    const validFiles: File[] = [];
    for (const f of toProcess) {
      if (!f.type.startsWith('image/')) {
        this.imageError = 'Un ou plusieurs fichiers ne sont pas des images.';
        input.value = '';
        this.refreshView();
        return;
      }
      if (f.size > MAX_LISTING_IMAGE_BYTES) {
        this.imageError = "Chaque image ne doit pas dépasser 5 Mo.";
        input.value = '';
        this.refreshView();
        return;
      }
      validFiles.push(f);
    }
    if (validFiles.length === 0) return;

    this.uploadingImage = true;
    this.refreshView();

    from(validFiles)
      .pipe(
        concatMap((file) => this.listingImageUpload.upload(file)),
        toArray(),
        finalize(() => {
          this.ngZone.run(() => {
            this.uploadingImage = false;
            input.value = '';
            this.refreshView();
          });
        })
      )
      .subscribe({
        next: (urls) => {
          this.ngZone.run(() => {
            const merged = [...current, ...urls].slice(0, MAX_LISTING_PHOTOS);
            this.form.patchValue({ attachmentUrls: merged });
            this.previewMainIndex = Math.min(this.previewMainIndex, merged.length - 1);
            if (this.previewMainIndex < 0) this.previewMainIndex = 0;
            this.refreshView();
          });
        },
        error: (err: unknown) => {
          this.ngZone.run(() => {
            this.imageError = httpErrorMessage(err);
            this.refreshView();
          });
        }
      });
  }

  removeImageAt(index: number, fileInput: HTMLInputElement): void {
    const urls = [...((this.form.get('attachmentUrls')?.value as string[]) || [])]
      .map((u) => u.trim())
      .filter(Boolean);
    urls.splice(index, 1);
    this.form.patchValue({ attachmentUrls: urls });
    fileInput.value = '';
    if (this.previewMainIndex >= urls.length) {
      this.previewMainIndex = Math.max(0, urls.length - 1);
    }
    this.refreshView();
  }

  clearListingImage(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.imageError = null;
    this.previewMainIndex = 0;
    this.form.patchValue({ attachmentUrls: [] });
    this.refreshView();
  }

  geocodeLocation(): void {
    const location = String(this.form.get('location')?.value || '').trim();
    if (!location || this.geocodingLocation) return;
    this.geocodingLocation = true;
    this.locationStatus = 'Recherche des coordonnees...';
    this.refreshView();

    this.geocodingService.geocode(location).subscribe({
      next: (geo) => {
        this.form.patchValue({
          location: geo.label || location,
          latitude: geo.latitude,
          longitude: geo.longitude
        });
        this.locationStatus = `Coordonnees trouvees via ${geo.provider}.`;
        this.geocodingLocation = false;
        this.refreshView();
      },
      error: (err: unknown) => {
        this.locationStatus = httpErrorMessage(err);
        this.geocodingLocation = false;
        this.refreshView();
      }
    });
  }

  get canGoNext(): boolean {
    if (this.uploadingImage) return false;
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
    if (this.form.invalid || this.uploadingImage) return;
    this.submitting = true;
    this.error = '';

    const hasLocation = !!String(this.form.value.location || '').trim();
    const missingCoordinates = this.form.value.latitude == null || this.form.value.longitude == null;
    if (hasLocation && missingCoordinates) {
      this.geocodingLocation = true;
      this.locationStatus = 'Recherche des coordonnees avant publication...';
      this.geocodingService.geocode(this.form.value.location).subscribe({
        next: (geo) => {
          this.form.patchValue({
            location: geo.label || this.form.value.location,
            latitude: geo.latitude,
            longitude: geo.longitude
          });
          this.geocodingLocation = false;
          this.createListing();
        },
        error: () => {
          this.geocodingLocation = false;
          this.createListing();
        }
      });
      return;
    }

    this.createListing();
  }

  private createListing(): void {
    const val = this.form.value;
    const body = {
      ...val,
      companyId: this.companyId,
      attachmentUrls: resolveListingAttachmentUrls(val.attachmentUrls),
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
        this.refreshView();
      }
    });
  }
}
