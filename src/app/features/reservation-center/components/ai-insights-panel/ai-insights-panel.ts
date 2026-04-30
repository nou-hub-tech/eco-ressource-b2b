import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AiInsight } from '../../models/reservation-center.models';

@Component({
  selector: 'app-ai-insights-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-insights-panel.html',
  styleUrls: ['./ai-insights-panel.css'],
})
export class AiInsightsPanel {
  @Input() title = 'AI insights';
  @Input() subtitle = 'Live recommendations from backend AI services.';
  @Input() insights: AiInsight[] = [];
  @Output() action = new EventEmitter<AiInsight>();

  trackByInsight(index: number, insight: AiInsight): string {
    return insight.id || String(index);
  }
}
