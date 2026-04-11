import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceListingService } from '../services/resource-listing.service';
import { ProductAnnoncesService } from '../services/product-annonces.service';
import { Product, ListingResponse } from '../../../core/models/annonces.interfaces';
import { AuthService } from '../../../core/services/auth.service';

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
  companyId!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly listingService: ResourceListingService,
    private readonly productService: ProductAnnoncesService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    this.companyId = user ? parseInt(user.id, 10) : 0;

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
    this.productService.findAll().subscribe({ next: (p) => this.products = p });
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
          attachmentUrls: data.attachmentUrls || []
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Annonce introuvable';
        this.loading = false;
      }
    });
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
    if (this.form.invalid || !this.listing) return;
    this.submitting = true;
    this.error = '';

    const val = this.form.value;
    const body = {
      ...val,
      type: this.listing.type,
      companyId: this.companyId,
      price: val.price ?? undefined,
      location: val.location || undefined
    };

    this.listingService.update(this.listing.id, this.companyId, body).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/enterprise/annonces', this.listing.id]);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la modification';
        this.submitting = false;
      }
    });
  }
}
