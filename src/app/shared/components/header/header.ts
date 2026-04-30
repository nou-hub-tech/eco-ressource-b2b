import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService, User } from '../../../core/services/auth';
import { ThemeService } from '../../../core/services/theme';
import { ReservationCenterState } from '../../../features/reservation-center/state/reservation-center.state';

interface HeaderNotification {
  text: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  @Input() pageTitle = 'Dashboard';
  @Output() toggleSidebar = new EventEmitter<void>();

  user: User | null = null;
  showNotif = false;
  isDark = false;
  notifications: HeaderNotification[] = [];

  constructor(
    private authService: AuthService,
    public themeService: ThemeService,
    private reservationCenterState: ReservationCenterState,
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u: User | null) => this.user = u);
    this.themeService.isDark$.subscribe(d => this.isDark = d);
    this.reservationCenterState.loadAll().subscribe({
      next: snapshot => {
        const pendingReservations = snapshot.reservations.filter(item => item.status === 'PENDING').length;
        const openSlots = snapshot.slots.filter(item => item.status === 'open').length;
        const draftOrders = snapshot.orders.filter(item => item.status === 'draft').length;

        this.notifications = [
          { text: `${pendingReservations} reservation request(s) awaiting review`, time: 'Live', icon: 'REQ' },
          { text: `${openSlots} slot(s) currently open in the marketplace`, time: 'Live', icon: 'SLT' },
          { text: `${draftOrders} order(s) still in draft`, time: 'Live', icon: 'ORD' },
        ].filter(item => !item.text.startsWith('0 '));
      },
      error: () => {
        this.notifications = [];
      },
    });
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
