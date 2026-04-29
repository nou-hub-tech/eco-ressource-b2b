import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../../core/services/auth';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout implements OnInit {
  user: User | null = null;
  pageTitle = 'Dashboard';
  sidebarCollapsed = false;

  private titleMap: Record<string, string> = {
    'dashboard':      'Dashboard',
    'users':          'User Management',
    'events':         'Events',
    'stock':          'Stock & Products',
    'deliveries':     'Deliveries',
    'listings':       'Listings',
    'reservations':   'Reservations',
    'treasury':       'Treasury & Finance',
    'solidarity':     'Solidarity',
    'marketplace':    'Marketplace',
    'my-stock':       'My Stock',
    'my-deliveries':  'My Deliveries',
    'my-listings':    'My Listings',
    'my-reservations':'My Reservations',
    'transactions':   'Transactions',
    'reports':        'Reports & KPIs',
    'trips':          'My Trips',
    'shipments':      'Shipments',
    'earnings':       'Earnings',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u: User | null) => this.user = u);
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      const parts = e.urlAfterRedirects.split('/');
      const last = parts[parts.length - 1];
      this.pageTitle = this.titleMap[last] || 'Dashboard';
    });
  }

  toggleSidebar(): void { this.sidebarCollapsed = !this.sidebarCollapsed; }
}