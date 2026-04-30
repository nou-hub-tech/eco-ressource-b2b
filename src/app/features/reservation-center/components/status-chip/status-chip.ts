import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-chip.html',
  styleUrls: ['./status-chip.css'],
})
export class StatusChip {
  @Input({ required: true }) label = '';
  @Input() variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral' = 'neutral';
}
