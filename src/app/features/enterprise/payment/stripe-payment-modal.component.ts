import { Component, Input, Output, EventEmitter, OnInit, OnDestroy,
         ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { StripePaymentService } from '../../../core/services/stripe-payment.service';
import { EscrowEntry } from '../../../core/models/finance.model';

declare const Stripe: any; // Stripe.js chargé via CDN

@Component({
  selector: 'app-stripe-payment-modal',
  standalone: false,
  template: `
    <!-- Overlay -->
    <div class="stripe-overlay" (click)="onClose()">
      <div class="stripe-modal" (click)="$event.stopPropagation()">

        <!-- Header -->
        <div class="stripe-modal-header">
          <div class="stripe-logo-row">
            <span class="stripe-logo">💳</span>
            <div>
              <h2 class="stripe-title">Paiement Sécurisé</h2>
              <p class="stripe-subtitle">Powered by Stripe</p>
            </div>
          </div>
          <button class="stripe-close" (click)="onClose()">✕</button>
        </div>

        <!-- Escrow Info -->
        <div class="stripe-escrow-info">
          <div class="stripe-escrow-row">
            <span class="stripe-escrow-label">Projet</span>
            <span class="stripe-escrow-val">{{ escrow.project }}</span>
          </div>
          <div class="stripe-escrow-row">
            <span class="stripe-escrow-label">Montant à bloquer</span>
            <span class="stripe-escrow-amount">{{ formatAmount(escrow.amount) }} TND</span>
          </div>
          <div class="stripe-escrow-note">
            🔒 Fonds sécurisés en escrow — libérés à la livraison<br>
            <small style="color:#94a3b8">(Traitement en EUR · Mode test Stripe)</small>
          </div>
        </div>

        <!-- Loading -->
        <div *ngIf="loading" class="stripe-loading">
          <div class="stripe-spinner"></div>
          <span>Initialisation du paiement Stripe...</span>
        </div>

        <!-- Erreur -->
        <div *ngIf="errorMsg" class="stripe-error">
          ❌ {{ errorMsg }}
        </div>

        <!-- Formulaire Stripe (injecté par Stripe.js) -->
        <div *ngIf="!loading && !errorMsg && !paymentSuccessFlag">
          <div id="stripe-payment-element" style="margin: 20px 0;"></div>
          <button class="stripe-pay-btn"
            [disabled]="paying"
            (click)="confirmStripePayment()">
            {{ paying ? '⏳ Traitement...' : '🔐 Confirmer le paiement — ' + formatAmount(escrow.amount) + ' TND' }}
          </button>
          <p class="stripe-test-hint">
            💡 Carte de test : <code>4242 4242 4242 4242</code> · Date : <code>12/29</code> · CVV : <code>123</code>
          </p>
        </div>

        <!-- Succès -->
        <div *ngIf="paymentSuccessFlag" class="stripe-success">
          <div class="stripe-success-icon">✓</div>
          <h3>Paiement confirmé !</h3>
          <p>Les fonds sont sécurisés en escrow.<br>Ils seront libérés automatiquement à la livraison.</p>
          <button class="stripe-pay-btn" (click)="onClose()">Fermer</button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .stripe-overlay {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0,0,0,.55); backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center;
      animation: fadeIn .2s ease;
    }
    .stripe-modal {
      background: #fff; border-radius: 20px; width: 100%; max-width: 480px;
      padding: 32px;
      max-height: 90vh; overflow-y: auto;
      box-shadow: 0 30px 80px rgba(0,0,0,.25);
      animation: slideUp .3s cubic-bezier(.34,1.56,.64,1);
    }
    .stripe-modal-header {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
    }
    .stripe-logo-row { display: flex; align-items: center; gap: 12px; }
    .stripe-logo { font-size: 32px; }
    .stripe-title { font-size: 18px; font-weight: 800; margin: 0; color: #1a1a2e; }
    .stripe-subtitle { font-size: 11px; color: #6b7280; margin: 0; }
    .stripe-close {
      background: none; border: none; font-size: 16px; color: #9ca3af;
      cursor: pointer; padding: 6px; border-radius: 8px; transition: all .15s;
    }
    .stripe-close:hover { background: #fee2e2; color: #dc2626; }

    .stripe-escrow-info {
      background: linear-gradient(135deg, #f0f9ff, #eff6ff);
      border: 1px solid rgba(99,102,241,.15); border-radius: 14px;
      padding: 18px 20px; margin-bottom: 20px;
    }
    .stripe-escrow-row {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 8px;
    }
    .stripe-escrow-label { font-size: 12px; color: #6b7280; font-weight: 600; }
    .stripe-escrow-val { font-size: 13px; font-weight: 700; color: #1a1a2e; }
    .stripe-escrow-amount {
      font-size: 22px; font-weight: 800;
      background: linear-gradient(135deg, #6366f1, #818cf8);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .stripe-escrow-note {
      font-size: 11px; color: #6b7280; margin-top: 8px;
      padding-top: 10px; border-top: 1px solid rgba(99,102,241,.12);
    }

    .stripe-loading {
      display: flex; align-items: center; gap: 12px; padding: 20px;
      color: #6b7280; font-size: 13px;
    }
    .stripe-spinner {
      width: 20px; height: 20px; border: 3px solid #e5e7eb;
      border-top-color: #6366f1; border-radius: 50%;
      animation: spin .7s linear infinite; flex-shrink: 0;
    }
    .stripe-error {
      background: #fef2f2; border: 1px solid #fecaca;
      border-radius: 10px; padding: 14px 16px; color: #dc2626;
      font-size: 13px; margin-bottom: 16px;
    }
    .stripe-pay-btn {
      width: 100%; padding: 16px; border: none; border-radius: 12px;
      background: linear-gradient(135deg, #6366f1, #818cf8); color: #fff;
      font-size: 14px; font-weight: 700; cursor: pointer;
      box-shadow: 0 8px 24px rgba(99,102,241,.35); transition: all .2s;
    }
    .stripe-pay-btn:hover:not(:disabled) {
      transform: translateY(-2px); box-shadow: 0 12px 32px rgba(99,102,241,.45);
    }
    .stripe-pay-btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }
    .stripe-test-hint {
      text-align: center; font-size: 11px; color: #9ca3af; margin-top: 12px;
    }
    .stripe-test-hint code {
      background: #f3f4f6; padding: 2px 6px; border-radius: 4px;
      font-family: monospace; color: #6366f1; font-weight: 700;
    }
    .stripe-success {
      text-align: center; padding: 20px 0;
    }
    .stripe-success-icon {
      width: 72px; height: 72px; border-radius: 50%;
      background: linear-gradient(135deg, #059669, #10b981);
      color: #fff; font-size: 36px; font-weight: 800;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 16px; box-shadow: 0 12px 30px rgba(5,150,105,.35);
      animation: popIn .4s cubic-bezier(.34,1.56,.64,1);
    }
    .stripe-success h3 { font-size: 20px; font-weight: 800; color: #059669; margin: 0 0 8px; }
    .stripe-success p { font-size: 13px; color: #6b7280; margin: 0 0 24px; line-height: 1.6; }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px) scale(.95); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes popIn {
      from { transform: scale(0); } to { transform: scale(1); }
    }
  `]
})
export class StripePaymentModalComponent implements OnInit, OnDestroy {

  @Input() escrow!: EscrowEntry;
  @Output() closed = new EventEmitter<void>();
  @Output() paymentDone = new EventEmitter<void>();

  loading = true;
  paying = false;
  errorMsg = '';
  paymentSuccessFlag = false;

  private stripeJs: any = null;
  private elements: any = null;
  private clientSecret = '';
  private paymentIntentId = '';

  constructor(
    private stripeService: StripePaymentService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.initStripe();
  }

  ngOnDestroy(): void {
    this.elements = null;
    this.stripeJs = null;
  }

  private async initStripe(): Promise<void> {
    try {
      // 1. Clé publique depuis le backend
      const keyRes = await this.stripeService.getPublicKey().toPromise();
      const publicKey = keyRes!.publicKey;

      // 2. Charger Stripe.js
      if (!(window as any).Stripe) {
        await this.loadStripeScript();
      }
      this.stripeJs = (window as any).Stripe(publicKey);

      // 3. Créer le PaymentIntent
      const initRes = await this.stripeService.initPayment(this.escrow.id!).toPromise();
      this.clientSecret = initRes!.clientSecret;
      this.paymentIntentId = initRes!.paymentIntentId;

      // 4. Afficher le formulaire — forcer la détection de changements
      this.ngZone.run(() => {
        this.loading = false;
        this.cd.detectChanges();
      });
      setTimeout(() => this.mountStripeElements(), 300);

    } catch (err: any) {
      this.ngZone.run(() => {
        this.loading = false;
        this.errorMsg = err?.error?.error ?? err?.message ?? 'Erreur initialisation Stripe';
        this.cd.detectChanges();
      });
      console.error('[STRIPE MODAL]', err);
    }
  }

  private mountStripeElements(attempt = 0): void {
    const el = document.getElementById('stripe-payment-element');

    if (!el) {
      // DOM pas encore rendu — réessayer jusqu'à 10 fois (1.5 secondes max)
      if (attempt < 10) {
        setTimeout(() => this.mountStripeElements(attempt + 1), 150);
      } else {
        this.ngZone.run(() => {
          this.errorMsg = 'Impossible d\'afficher le formulaire de paiement. Rechargez la page.';
          this.cd.detectChanges();
        });
      }
      return;
    }

    this.elements = this.stripeJs.elements({ clientSecret: this.clientSecret });
    const paymentElement = this.elements.create('payment');
    paymentElement.mount('#stripe-payment-element');
  }

  async confirmStripePayment(): Promise<void> {
    if (!this.stripeJs || !this.elements) return;
    this.paying = true;
    this.errorMsg = '';

    try {
      const { error, paymentIntent } = await this.stripeJs.confirmPayment({
        elements: this.elements,
        confirmParams: { return_url: window.location.origin + '/enterprise/payment/success' },
        redirect: 'if_required'
      });

      if (error) {
        this.errorMsg = error.message ?? 'Paiement refusé';
        this.paying = false;
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        // Confirmer côté backend
        await this.stripeService.confirmPayment(this.paymentIntentId, this.escrow.id!).toPromise();
        this.paymentSuccessFlag = true;
        this.paymentDone.emit();
      }

    } catch (err: any) {
      this.errorMsg = err?.message ?? 'Erreur lors du paiement';
    } finally {
      this.paying = false;
    }
  }

  private loadStripeScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Impossible de charger Stripe.js'));
      document.head.appendChild(script);
    });
  }

  onClose(): void {
    this.closed.emit();
  }

  formatAmount(amount: number): string {
    return Math.round(amount).toLocaleString('fr-FR');
  }

  get paymentSuccess_() { return this.paymentSuccessFlag; }
}
