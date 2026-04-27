import { Injectable } from '@angular/core';
import { CommentResponse } from '../../../core/models/annonces.interfaces';

@Injectable({ providedIn: 'root' })
export class EmailJsBrowserService {
  private readonly endpoint = 'https://api.emailjs.com/api/v1.0/email/send';
  private readonly serviceId = 'service_9pm8fpl';
  private readonly templateId = 'template_wjt6qf1';
  private readonly publicKey = '67IwyEQFxPKuQ8aSs';
  private readonly adminEmail = 'admin@marketplace.com';

  async sendModerationNotice(comment: CommentResponse, authorEmail: string | null): Promise<void> {
    if (!comment.moderationStatus || comment.moderationStatus === 'VISIBLE') return;

    const label = comment.moderationStatus === 'MASKED' ? 'masque' : 'modere automatiquement';
    const reason = comment.moderationReason ? ` Motif: ${comment.moderationReason}` : '';

    await Promise.allSettled([
      authorEmail
        ? this.sendEmail(
            authorEmail,
            'Moderation commentaire Eco-Ressource',
            `Votre commentaire a ete ${label}.${reason}`
          )
        : Promise.resolve(),
      this.sendEmail(
        this.adminEmail,
        'Alerte moderation commentaire Eco-Ressource',
        `Un commentaire a ete ${label} sur une annonce.${reason}`
      )
    ]);
  }

  private async sendEmail(toEmail: string, subject: string, message: string): Promise<void> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: this.serviceId,
        template_id: this.templateId,
        user_id: this.publicKey,
        template_params: {
          to_email: toEmail,
          subject,
          message,
          reply_to: 'noreply@eco-ressource.local'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`EmailJS HTTP ${response.status}`);
    }
  }
}
