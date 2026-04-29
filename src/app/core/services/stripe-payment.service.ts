import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

export interface StripeInitResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: string;
  project: string;
}

export interface StripeConfirmResponse {
  success: boolean;
  message: string;
  stripeStatus: string;
  escrowId: number;
}

@Injectable({ providedIn: 'root' })
export class StripePaymentService {

  private API = '/api/stripe';

  constructor(private http: HttpClient) {}

  /** Récupère la clé publique Stripe depuis le backend */
  getPublicKey(): Observable<{ publicKey: string }> {
    return this.http.get<{ publicKey: string }>(`${this.API}/public-key`);
  }

  /**
   * Initie un PaymentIntent Stripe pour un escrow.
   * Retourne le client_secret nécessaire pour Stripe.js
   */
  initPayment(escrowId: number): Observable<StripeInitResponse> {
    return this.http.post<StripeInitResponse>(`${this.API}/init-payment`, { escrowId });
  }

  /**
   * Confirme côté backend qu'un paiement Stripe a réussi.
   * Appelé après la confirmation Stripe.js côté frontend.
   */
  confirmPayment(paymentIntentId: string, escrowId: number): Observable<StripeConfirmResponse> {
    return this.http.post<StripeConfirmResponse>(`${this.API}/confirm`, {
      paymentIntentId,
      escrowId
    });
  }
}
