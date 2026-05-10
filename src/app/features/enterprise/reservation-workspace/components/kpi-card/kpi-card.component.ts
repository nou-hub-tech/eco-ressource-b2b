import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() delta = '';
  @Input() subtext = '';
  @Input() tone: 'primary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() iconPath =
    'M3 12h4l3 8 4-16 3 8h4';
}
