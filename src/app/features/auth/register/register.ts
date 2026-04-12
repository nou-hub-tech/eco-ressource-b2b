import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {
  form!: FormGroup;
  loading = false;
  step = 1;
  sectors = ['Agri-food Industry','Chemical Industry','Textile','Metallurgy','Construction','Electronics','Transport & Logistics','Other'];
  roles = [
    { value: 'enterprise', label: 'Enterprise / Industry', icon: '🏭' },
    { value: 'transporter', label: 'Transporter', icon: '🚚' }
  ];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      role: ['enterprise', Validators.required],
      companyName: ['', Validators.required],
      sector: ['', Validators.required],
      taxId: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  nextStep(): void { if (this.step < 2) this.step++; }
  prevStep(): void { if (this.step > 1) this.step--; }

  isStep1Valid(): boolean {
    return !!(this.form.get('role')?.valid && this.form.get('companyName')?.valid && this.form.get('sector')?.valid && this.form.get('taxId')?.valid);
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.authService.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/' + this.form.value.role]),
      error: () => { this.loading = false; }
    });
  }
}