import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KonnectService } from '../../../core/services/konnect.service';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  template: `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;
                background:linear-gradient(135deg,#f0fdf4,#dcfce7);font-family:'Inter',sans-serif;">
      <div style="background:white;border-radius:24px;padding:56px 48px;text-align:center;
                  max-width:480px;width:90%;box-shadow:0 20px 60px rgba(5,150,105,.15);
                  border:1px solid rgba(5,150,105,.15);">

        <div style="width:80px;height:80px;background:linear-gradient(135deg,#059669,#10b981);
                    border-radius:50%;display:flex;align-items:center;justify-content:center;
                    margin:0 auto 24px;font-size:40px;box-shadow:0 12px 30px rgba(5,150,105,.35);
                    animation:popIn .5s cubic-bezier(.34,1.56,.64,1);">
          ✓
        </div>

        <h1 style="font-size:26px;font-weight:800;color:#059669;margin:0 0 12px;letter-spacing:-0.5px;">
          Paiement confirmé !
        </h1>
        <p style="font-size:14px;color:#64748b;margin:0 0 8px;line-height:1.7;">
          Votre paiement Konnect a été traité avec succès.
        </p>
        <p style="font-size:13px;color:#94a3b8;margin:0 0 32px;line-height:1.6;">
          L'escrow est maintenant <strong style="color:#059669;">actif</strong>.
          Les fonds seront libérés automatiquement après confirmation de la livraison.
        </p>

        <div *ngIf="escrowId" style="background:rgba(5,150,105,.06);border:1px solid rgba(5,150,105,.15);
             border-radius:12px;padding:16px 20px;margin-bottom:28px;text-align:left;">
          <div style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px;">
            Escrow concerné
          </div>
          <div style="font-size:18px;font-weight:800;color:#059669;">ESC-{{ escrowId }}</div>
          <div *ngIf="paymentStatus" style="font-size:11px;color:#64748b;margin-top:4px;">
            Statut : {{ paymentStatus }}
          </div>
        </div>

        <button (click)="goToTreasury()"
          style="background:linear-gradient(135deg,#059669,#10b981);color:white;border:none;
                 padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;
                 cursor:pointer;width:100%;box-shadow:0 8px 24px rgba(5,150,105,.3);
                 transition:all .2s ease;">
          Retour à la Trésorerie
        </button>
      </div>
    </div>

    <style>
      @keyframes popIn {
        from { transform: scale(0); opacity: 0; }
        to   { transform: scale(1); opacity: 1; }
      }
    </style>
  `
})
export class PaymentSuccessComponent implements OnInit {
  escrowId: number | null = null;
  paymentStatus: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private konnectService: KonnectService
  ) {}

  ngOnInit(): void {
    this.escrowId = Number(this.route.snapshot.queryParamMap.get('escrowId')) || null;
    if (this.escrowId) {
      // Vérifier le statut réel depuis le backend
      this.konnectService.getPaymentStatus(this.escrowId).subscribe({
        next: (res) => { this.paymentStatus = res.status; },
        error: () => {}
      });
    }
  }

  goToTreasury(): void {
    this.router.navigate(['/enterprise/treasury']);
  }
}
