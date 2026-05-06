import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface KonnectInitResponse {
  payUrl: string;
  escrowId: number;
}

export interface KonnectStatusResponse {
  escrowId: number;
  status: string;          // 'LOCKED' | 'RELEASED'
  konnectRef: string;
  konnectPayUrl: string;
  amount: number;
  project: string;
}

@Injectable({ providedIn: 'root' })
export class KonnectService {

  private API = '/api/konnect';

  constructor(private http: HttpClient) {}

  /**
   * Initie un paiement Konnect pour un escrow.
   * Retourne l'URL vers laquelle rediriger l'utilisateur.
   */
  initiatePayment(escrowId: number): Observable<KonnectInitResponse> {
    return this.http.post<KonnectInitResponse>(`${this.API}/init`, { escrowId });
  }

  /**
   * Vérifie le statut d'un paiement (polling après retour de Konnect)
   */
  getPaymentStatus(escrowId: number): Observable<KonnectStatusResponse> {
    return this.http.get<KonnectStatusResponse>(`${this.API}/status/${escrowId}`);
  }
}
