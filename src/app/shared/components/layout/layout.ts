import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService, User } from '../../../core/services/auth';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from '../../../core/services/theme';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout implements OnInit {
  user: User | null = null;
  pageTitle = '';

  /** Collapsed by default — hamburger expands it */
  sidebarCollapsed = true;

  private titleMap: Record<string, string> = {
    'dashboard':       'Home',
    'users':           'User Management',
    'events':          'Events & Campaigns',
    'stock':           'Stock & Products',
    'deliveries':      'Deliveries',
    'listings':        'Listings & Posts',
    'reservations':    'Reservations & Orders',
    'treasury':        'Treasury & Finance',
    'solidarity':      'Solidarity & Associations',
    'marketplace':     'Marketplace',
    'my-stock':        'My Stock',
    'my-deliveries':   'My Deliveries',
    'my-listings':     'My Posts & Surplus',
    'my-reservations': 'My Reservations',
    'requests':        'Incoming Requests',
    'transactions':    'Transactions',
    'reports':         'Reports & KPIs',
    'trips':           'My Trips',
    'shipments':       'Shipments',
    'earnings':        'Earnings',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.init();
    this.authService.user$.subscribe((u: User | null) => {
      this.user = u;
      this.applyTheme(u?.role || 'enterprise');
    });
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const parts = e.urlAfterRedirects.split('/');
        const last = parts[parts.length - 1];
        this.pageTitle = this.titleMap[last] || '';
        /* Auto-collapse sidebar on navigation (mobile-friendly) */
        this.sidebarCollapsed = true;
      });
  }

  applyTheme(role: string): void {
    const body = document.body;
    body.classList.remove('theme-admin', 'theme-enterprise', 'theme-transporter', 'theme-auth');
    body.classList.add('theme-' + role);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}