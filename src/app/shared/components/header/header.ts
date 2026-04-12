import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService, User } from '../../../core/services/auth';
import { ThemeService } from '../../../core/services/theme';

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

  notifications = [
    { text: 'New surplus listing posted', time: '2 min ago',  icon: '📦' },
    { text: 'Delivery DEL-1042 confirmed', time: '15 min ago', icon: '🚚' },
    { text: 'Payment released from escrow', time: '1 hr ago',  icon: '💰' },
  ];

  constructor(private authService: AuthService, public themeService: ThemeService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u: User | null) => this.user = u);
    this.themeService.isDark$.subscribe(d => this.isDark = d);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}