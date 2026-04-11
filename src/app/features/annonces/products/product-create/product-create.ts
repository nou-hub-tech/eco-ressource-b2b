import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductAnnoncesService } from '../../services/product-annonces.service';
import { ProductRequest } from '../../../../core/models/annonces.interfaces';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.html',
  styleUrls: ['./product-create.css']
})
export class ProductCreate implements OnInit {
  form!: FormGroup;
  submitting = false;
  error = '';
  companyId!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly productService: ProductAnnoncesService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    this.companyId = user ? parseInt(user.id, 10) : 0;

    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      category: [''],
      description: ['', [Validators.maxLength(1000)]],
      image: [''],
      materialType: [''],
      recyclable: [true]
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

    this.productService.create(req).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/enterprise/annonces/products']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la création du produit';
        this.submitting = false;
      }
    });
  }
}
