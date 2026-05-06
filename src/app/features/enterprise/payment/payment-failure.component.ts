import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-failure',
  standalone: false,
  template: `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;
                background:linear-gradient(135deg,#fef2f2,#fee2e2);font-family:'Inter',sans-serif;">
      <div style="background:white;border-radius:24px;padding:56px 48px;text-align:center;
                  max-width:480px;width:90%;box-shadow:0 20px 60px rgba(220,38,38,.15);
                  border:1px solid rgba(220,38,38,.15);">

        <div style="width:80px;height:80px;background:linear-gradient(135deg,#dc2626,#ef4444);
                    border-radius:50%;display:flex;align-items:center;justify-content:center;
                    margin:0 auto 24px;font-size:36px;box-shadow:0 12px 30px rgba(220,38,38,.35);
                    animation:shake .5s ease;">
          ✕
        </div>

        <h1 style="font-size:26px;font-weight:800;color:#dc2626;margin:0 0 12px;letter-spacing:-0.5px;">
          Paiement échoué
        </h1>
        <p style="font-size:14px;color:#64748b;margin:0 0 8px;line-height:1.7;">
          Le paiement n'a pas pu être traité.
        </p>
        <p style="font-size:13px;color:#94a3b8;margin:0 0 32px;line-height:1.6;">
          L'escrow reste <strong style="color:#d97706;">en attente</strong>.
          Vous pouvez réessayer depuis la page Trésorerie en cliquant à nouveau sur
          le bouton <strong>💳 Konnect</strong>.
        </p>

        <div *ngIf="escrowId" style="background:rgba(220,38,38,.05);border:1px solid rgba(220,38,38,.12);
             border-radius:12px;padding:16px 20px;margin-bottom:28px;">
          <div style="font-size:11px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px;">
            Escrow concerné
          </div>
          <div style="font-size:18px;font-weight:800;color:#dc2626;">ESC-{{ escrowId }}</div>
        </div>

        <div style="display:flex;gap:12px;flex-direction:column;">
          <button (click)="retryPayment()"
            style="background:linear-gradient(135deg,#dc2626,#ef4444);color:white;border:none;
                   padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;
                   cursor:pointer;width:100%;box-shadow:0 8px 24px rgba(220,38,38,.3);">
            Réessayer le paiement
          </button>
          <button (click)="goToTreasury()"
            style="background:transparent;color:#64748b;border:1px solid #e2e8f0;
                   padding:13px 32px;border-radius:12px;font-size:14px;font-weight:600;
                   cursor:pointer;width:100%;">
            Retour à la Trésorerie
          </button>
        </div>
      </div>
    </div>

    <style>
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%       { transform: translateX(-8px); }
        40%       { transform: translateX(8px); }
        60%       { transform: translateX(-5px); }
        80%       { transform: translateX(5px); }
      }
    </style>
  `
})
export class PaymentFailureComponent {
  escrowId: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.escrowId = Number(this.route.snapshot.queryParamMap.get('escrowId')) || null;
  }

  retryPayment(): void {
    // Retour à la trésorerie — l'utilisateur peut re-cliquer sur "💳 Konnect"
    this.router.navigate(['/enterprise/treasury']);
  }

  goToTreasury(): void {
    this.router.navigate(['/enterprise/treasury']);
  }
}
