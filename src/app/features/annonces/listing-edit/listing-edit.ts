import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceListingService } from '../services/resource-listing.service';
import { ProductAnnoncesService } from '../services/product-annonces.service';
import { Product, ListingResponse } from '../../../core/models/annonces.interfaces';
import { AuthService } from '../../../core/services/auth.service';
import {
  DEFAULT_LISTING_IMAGE_URL,
  MAX_LISTING_IMAGE_BYTES,
  MAX_LISTING_PHOTOS,
  isOnlyDefaultPlaceholder,
  resolveListingAttachmentUrls
} from '../constants/listing-images';
import { ListingImageUploadService } from '../services/listing-image-upload.service';
import { HttpErrorResponse } from '@angular/common/http';
import { httpErrorMessage } from '../services/api-normalize';
import { concatMap, finalize, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-listing-edit',
  standalone: false,
  templateUrl: './listing-edit.html',
  styleUrls: ['./listing-edit.css']
})
export class ListingEdit implements OnInit {
  form!: FormGroup;
  listing!: ListingResponse;
  products: Product[] = [];
  loading = true;
  submitting = false;
  error = '';
  imageError: string | null = null;
  uploadingImage = false;
  previewMainIndex = 0;
  readonly maxListingPhotos = MAX_LISTING_PHOTOS;
  companyId!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly listingService: ResourceListingService,
    private readonly productService: ProductAnnoncesService,
    private readonly authService: AuthService,
    private readonly listingImageUpload: ListingImageUploadService,
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone
  ) {}

  private refreshView(): void {
    this.ngZone.run(() => this.cdr.detectChanges());
  }

  ngOnInit(): void {
    this.companyId = this.authService.getCompanyProfileId() ?? 0;

    this.form = this.fb.group({
      productId: [null, Validators.required],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      price: [null, [Validators.min(0)]],
      location: [''],
      latitude: [null],
      longitude: [null],
      attachmentUrls: [[]]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData(id);
  }

  loadData(id: number): void {
    this.loading = true;
    this.productService.findAll().subscribe({
      next: (p) => {
        this.products = p;
        this.refreshView();
      },
      error: () => this.refreshView()
    });
    this.listingService.getById(id).subscribe({
      next: (data) => {
        this.listing = data;
        this.form.patchValue({
          productId: data.productId,
          title: data.title,
          description: data.description,
          quantity: data.quantity,
          unit: data.unit,
          price: data.price,
          location: data.location,
          latitude: data.latitude,
          longitude: data.longitude,
          attachmentUrls: (data.attachmentUrls || []).slice(0, MAX_LISTING_PHOTOS)
        });
        this.loading = false;
        this.refreshView();
      },
      error: () => {
        this.error = 'Annonce introuvable';
        this.loading = false;
        this.refreshView();
      }
    });
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

  get typeLabel(): string {
    if (!this.listing) return '';
    switch (this.listing.type) {
      case 'SURPLUS': return 'Surplus';
      case 'DEMANDE': return 'Demande';
      case 'GROUP_BUYING': return 'Achat Groupé';
      default: return '';
    }
  }

  submit(): void {
    if (this.form.invalid || !this.listing || this.uploadingImage) return;
    this.submitting = true;
    this.error = '';

    const val = this.form.value;
    const body = {
      ...val,
      type: this.listing.type,
      companyId: this.companyId,
      price: val.price ?? undefined,
      location: val.location || undefined,
      attachmentUrls: resolveListingAttachmentUrls(val.attachmentUrls)
    };

    this.listingService.update(this.listing.id, this.companyId, body).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/enterprise/annonces', this.listing.id]);
      },
      error: (err: unknown) => {
        this.error =
          err instanceof HttpErrorResponse
            ? err.error?.message || err.message || 'Erreur lors de la modification'
            : 'Erreur lors de la modification';
        this.submitting = false;
        this.refreshView();
      }
    });
  }
}
