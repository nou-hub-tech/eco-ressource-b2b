import { Component, ChangeDetectorRef } from '@angular/core';
import { InvoiceService } from '../../../core/services/invoice';
import { timeout, catchError } from 'rxjs/operators';
import { of, TimeoutError } from 'rxjs';

@Component({
  selector: 'app-invoice-chat',
  standalone: false,
  template: `
<div class="solv-section chat-section">

  <!-- Header -->
  <div class="chat-header">
    <div class="chat-title-row">
      <span class="chat-icon">&#x1F916;</span>
      <div>
        <div class="chat-title">Assistant IA Financier</div>
        <div class="chat-subtitle">Posez vos questions sur vos factures et clients</div>
      </div>
      <div class="chat-status" [class.online]="!loading">
        <span class="chat-dot"></span>
        <span>{{ loading ? 'Analyse... (' + elapsed + 's)' : 'En ligne' }}</span>
      </div>
      <button class="chat-clear-btn" *ngIf="messages.length > 0" (click)="clear()">Effacer</button>
    </div>
  </div>

  <!-- Body -->
  <div class="chat-body">

    <!-- Bienvenue -->
    <div class="chat-welcome" *ngIf="messages.length === 0">
      <div class="chat-welcome-icon">&#x1F3E6;</div>
      <h4>Bonjour ! Je suis votre assistant financier IA.</h4>
      <p>Je connais toutes vos factures en temps reel. Choisissez une question :</p>
      <div class="chat-suggestions">
        <button class="chat-chip" *ngFor="let s of suggestions" (click)="use(s)">{{ s }}</button>
      </div>
    </div>

    <!-- Messages -->
    <div class="chat-messages">
      <div *ngFor="let m of messages"
           class="chat-bubble-wrap"
           [class.user-wrap]="m.role === 'user'"
           [class.ai-wrap]="m.role === 'ai'">
        <div class="chat-bubble"
             [class.user-bubble]="m.role === 'user'"
             [class.ai-bubble]="m.role === 'ai'">
          <div class="chat-bubble-text">{{ m.text }}</div>
          <div class="chat-bubble-time">{{ m.time }}</div>
        </div>
      </div>
    </div>

    <!-- Typing -->
    <div class="chat-bubble-wrap ai-wrap" *ngIf="loading">
      <div class="chat-bubble ai-bubble typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>

    <div id="chat-bottom-anchor"></div>
  </div>

  <!-- Input -->
  <div class="chat-input-row">
    <input
      class="chat-input"
      type="text"
      id="chat-input-field"
      [ngModel]="input"
      (ngModelChange)="input = $event"
      (keydown.enter)="send()"
      placeholder="Ex: Qui est mon client le plus risque ?"
      [disabled]="loading"
    />
    <button class="chat-send-btn" (click)="send()" [disabled]="loading || !input.trim()">
      <span *ngIf="!loading">&#x27A4;</span>
      <span *ngIf="loading" class="chat-spin">&#x27F3;</span>
    </button>
  </div>

</div>
  `
})
export class InvoiceChatComponent {

  messages: Array<{ role: 'user' | 'ai'; text: string; time: string }> = [];
  input = '';
  loading = false;
  elapsed = 0;

  private timer: any = null;

  readonly suggestions: string[] = [
    'Qui est mon client le plus risque ?',
    'Quel est mon taux de recouvrement ?',
    'Combien de factures impayees ?',
    'Resume de ma situation financiere',
    'Factures en retard de plus de 30 jours ?',
  ];

  constructor(private svc: InvoiceService, private cd: ChangeDetectorRef) {}

  send(): void {
    const q = this.input.trim();
    if (!q || this.loading) return;

    this.addMsg('user', q);
    this.input = '';
    this.loading = true;
    this.elapsed = 0;
    this.startTimer();
    this.scrollBottom();

    this.svc.sendChatMessage(q).pipe(
      timeout(25000),   // 25 secondes max — puis erreur automatique
      catchError((err) => {
        const msg = err instanceof TimeoutError
          ? '⏱️ Le serveur met trop de temps a repondre (>25s). Verifiez que le backend est bien demarré et que la cle Groq est valide.'
          : '⚠️ Erreur de connexion. Verifiez que le backend tourne sur le port 9090.';
        return of({ message: msg, fromAi: false });
      })
    ).subscribe((res: { message: string; fromAi: boolean }) => {
      this.stopTimer();
      this.addMsg('ai', res.message);
      this.loading = false;
      this.cd.detectChanges();
      this.scrollBottom();
    });
  }

  use(s: string): void {
    this.input = s;
    this.send();
  }

  clear(): void {
    this.messages = [];
    this.input = '';
    this.stopTimer();
    this.loading = false;
  }

  private addMsg(role: 'user' | 'ai', text: string): void {
    this.messages = [...this.messages, { role, text, time: this.now() }];
    this.cd.detectChanges();
  }

  private startTimer(): void {
    this.stopTimer();
    this.timer = setInterval(() => {
      this.elapsed++;
      this.cd.detectChanges();
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    this.elapsed = 0;
  }

  private now(): string {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  private scrollBottom(): void {
    setTimeout(() => {
      const el = document.getElementById('chat-bottom-anchor');
      if (el) { el.scrollIntoView({ behavior: 'smooth' }); }
    }, 80);
  }
}
