import { Component, ChangeDetectorRef } from '@angular/core';
import { BrokenProductService } from '../../core/services/broken-product';

@Component({
  selector: 'app-broken-product-detect',
  standalone: false,
  templateUrl: './broken-product-detect.html',
  styleUrls: ['./broken-product-detect.css']
})
export class BrokenProductDetectComponent {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  loading = false;
  result: any = null;
  error: string | null = null;

  constructor(
    private brokenProductService: BrokenProductService,
    private cdr: ChangeDetectorRef
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.previewUrl = URL.createObjectURL(this.selectedFile);
      this.result = null;
      this.error = null;
    }
  }

  detect() {
    if (!this.selectedFile) return;
    this.loading = true;
    this.error = null;
    this.result = null;

    this.brokenProductService.detect(this.selectedFile).subscribe({
      next: (data) => {
        this.result = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Detection failed. Check console for details.';
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  
}