import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HEATMAP_DAYS, HEATMAP_HOURS } from '../../reservation-workspace.models';

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heatmap.component.html',
  styleUrl: './heatmap.component.scss'
})
export class HeatmapComponent {
  @Input() matrix: number[][] = [];
  @Input() days = HEATMAP_DAYS;
  @Input() hours = HEATMAP_HOURS;

  cellBackground(value: number): string {
    if (value >= 80) return 'linear-gradient(135deg, rgba(239,68,68,0.85), rgba(249,115,22,0.8))';
    if (value >= 60) return 'linear-gradient(135deg, rgba(217,119,6,0.78), rgba(245,158,11,0.7))';
    if (value >= 40) return 'linear-gradient(135deg, rgba(2,132,199,0.72), rgba(56,189,248,0.68))';
    return 'linear-gradient(135deg, rgba(16,185,129,0.68), rgba(52,211,153,0.6))';
  }

  textColor(value: number): string {
    return value >= 60 ? '#ffffff' : '#0c1a24';
  }
}
