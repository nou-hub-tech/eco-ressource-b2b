import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAnnoncesService } from '../../services/product-annonces.service';
import { ProductRequest } from '../../../../core/models/annonces.interfaces';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css']
})
export class ProductEdit implements OnInit {
  form!: FormGroup;
  loading = true;
  submitting = false;
  loadError = '';
  error = '';
  companyId!: number;
  productId!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productService: ProductAnnoncesService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.companyId = this.authService.getCompanyProfileId() ?? 0;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      category: [''],
      description: ['', [Validators.maxLength(1000)]],
      image: [''],
      materialType: [''],
      recyclable: [true]
    });

    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct(): void {
    this.loading = true;
    this.loadError = '';
    this.productService.getById(this.productId).subscribe({
      next: (p) => {
        this.form.patchValue({
          name: p.name,
          category: p.category ?? '',
          description: p.description ?? '',
          image: p.image ?? '',
          materialType: p.materialType ?? '',
          recyclable: p.recyclable
        });
        this.loading = false;
      },
      error: () => {
        this.loadError = 'Produit introuvable';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = '';

    const v = this.form.value;
    const req: ProductRequest = {
      name: (v.name as string).trim(),
      recyclable: !!v.recyclable,
      companyId: this.companyId
    };
    const cat = (v.category as string)?.trim();
    if (cat) req.category = cat;
    const desc = (v.description as string)?.trim();
    if (desc) req.description = desc;
    const img = (v.image as string)?.trim();
    if (img) req.image = img;
    const mat = (v.materialType as string)?.trim();
    if (mat) req.materialType = mat;

    this.productService.update(this.productId, req).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/enterprise/annonces/products']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la mise à jour du produit';
        this.submitting = false;
      }
    });
  }
}
