import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GroupPurchaseService } from '../../services/group-purchase.service';
import { GroupPurchaseResponse, ListingResponse } from '../../../../core/models/annonces.interfaces';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-group-purchase-panel',
  standalone: false,
  templateUrl: './group-purchase-panel.html',
  styleUrls: ['./group-purchase-panel.css']
})
export class GroupPurchasePanel implements OnInit, OnDestroy {
  @Input() listing!: ListingResponse;
  @Input() group!: GroupPurchaseResponse;

  quantityCtrl = new FormControl<number | null>(null, [Validators.required, Validators.min(1)]);
  showJoinForm = false;
  loading = false;
  leaveLoading = false;
  error = '';
  currentCompanyId: number | null = null;

  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  isExpired = false;
  private countdownInterval: any;

  constructor(
    private readonly groupService: GroupPurchaseService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.currentCompanyId = parseInt(user.id, 10);
    }
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) clearInterval(this.countdownInterval);
  }

  get progress(): number {
    if (!this.group || this.group.targetQuantity === 0) return 0;
    return Math.round((this.group.currentQuantity / this.group.targetQuantity) * 100);
  }

  get progressColor(): string {
    const p = this.progress;
    if (p >= 75) return '#059669';
    if (p >= 25) return '#d97706';
    return '#dc2626';
  }

  get statusClass(): string {
    switch (this.group.status) {
      case 'OPEN': return 'gp-status-open';
      case 'FULL': return 'gp-status-full';
      case 'SUCCESS': return 'gp-status-success';
      case 'FAILED': return 'gp-status-failed';
      case 'CLOSED': return 'gp-status-closed';
      default: return '';
    }
  }

  get statusLabel(): string {
    switch (this.group.status) {
      case 'OPEN': return 'Ouvert';
      case 'FULL': return 'Complet';
      case 'SUCCESS': return 'Réussi';
      case 'FAILED': return 'Échoué';
      case 'CLOSED': return 'Fermé';
      default: return this.group.status;
    }
  }

  get isSeller(): boolean {
    return this.currentCompanyId === this.listing.companyId;
  }

  get isParticipant(): boolean {
    if (!this.currentCompanyId || !this.group.participants) return false;
    return this.group.participants.some(p => p.companyId === this.currentCompanyId);
  }

  get canJoin(): boolean {
    return this.group.status === 'OPEN'
      && !this.isExpired
      && !this.isSeller
      && !this.isParticipant
      && this.group.remainingQuantity > 0;
  }

  get canLeave(): boolean {
    return this.isParticipant && this.group.status === 'OPEN' && !this.isExpired;
  }

  openJoinForm(): void {
    this.showJoinForm = true;
    this.error = '';
    this.quantityCtrl.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.group.remainingQuantity)
    ]);
    this.quantityCtrl.updateValueAndValidity();
  }

  closeJoinForm(): void {
    this.showJoinForm = false;
    this.quantityCtrl.reset();
    this.error = '';
  }

  joinGroup(): void {
    if (this.quantityCtrl.invalid || !this.currentCompanyId) return;
    this.loading = true;
    this.error = '';

    this.groupService.join(this.group.id, {
      quantity: this.quantityCtrl.value!,
      companyId: this.currentCompanyId
    }).subscribe({
      next: (updated) => {
        this.group = updated;
        this.loading = false;
        this.closeJoinForm();
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de la participation';
        this.loading = false;
      }
    });
  }

  leaveGroup(): void {
    if (!this.currentCompanyId) return;
    this.leaveLoading = true;

    this.groupService.leave(this.group.id, this.currentCompanyId).subscribe({
      next: (updated) => {
        this.group = updated;
        this.leaveLoading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors du retrait';
        this.leaveLoading = false;
      }
    });
  }

  private startCountdown(): void {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown(): void {
    const deadline = new Date(this.group.deadline).getTime();
    const now = Date.now();
    const diff = deadline - now;

    if (diff <= 0) {
      this.isExpired = true;
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (this.countdownInterval) clearInterval(this.countdownInterval);
      return;
    }

    this.countdown = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    };
  }
}
