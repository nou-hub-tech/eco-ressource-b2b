import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivityCenterItem } from '../../reservation-workspace.models';

@Component({
  selector: 'app-activity-center',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activity-center.component.html',
  styleUrl: './activity-center.component.scss'
})
export class ActivityCenterComponent {
  @Input() title = 'Operations center';
  @Input() subtitle = '';
  @Input() items: ActivityCenterItem[] = [];
  @Input() maxItems = 6;
  @Input() showActions = true;
  @Input() emptyLabel = 'No active follow-up is waiting right now.';

  get visibleItems(): ActivityCenterItem[] {
    return this.items.slice(0, this.maxItems);
  }

  get urgentCount(): number {
    return this.items.filter((item) => item.tone === 'danger' || item.tone === 'warning').length;
  }

  get actionCount(): number {
    return this.items.filter((item) => Boolean(item.actionLabel)).length;
  }

  entityLabel(item: ActivityCenterItem): string {
    switch (item.entity) {
      case 'reservation':
        return 'Booking';
      case 'slot':
        return 'Space';
      case 'order':
        return 'Order';
      default:
        return 'Network';
    }
  }
}
