import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth';

interface NavItem {
  label?: string;
  icon?: string;   /* SVG path d= string */
  route?: string;
  badge?: string;
  section?: string;
  viewBox?: string;
  paths?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit {
  @Input() collapsed = true;
  role = 'enterprise';
  user: User | null = null;

  /* ── SVG icon paths ── */
  private icons: Record<string, string> = {
    /* grid/dashboard */
    dashboard:     'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    /* store/marketplace */
    marketplace:   'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
    /* list */
    listings:      'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4',
    /* package */
    stock:         'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
    /* truck */
    deliveries:    'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
    /* calendar */
    reservations:  'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
    /* credit-card */
    transactions:  'M1 4h22v16H1zM1 10h22',
    /* bar-chart */
    reports:       'M18 20V10M12 20V4M6 20v-6',
    /* users */
    users:         'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    /* layers */
    events:        'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    /* inbox */
    requests:      'M22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h9M22 13l-5 5M22 18l-5 0 0-5',
    /* map */
    trips:         'M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16',
    /* navigation */
    shipments:     'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    /* dollar */
    earnings:      'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
    /* home */
    home:          'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
    /* settings */
    settings:      'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  };

  getIcon(key: string): string {
    return this.icons[key] || this.icons['dashboard'];
  }

  getSvgPath(key: string): string {
    return this.icons[key] || this.icons['dashboard'];
  }

  adminNav: NavItem[] = [
    { section: 'Overview' },
    { label: 'Dashboard',    icon: 'dashboard',    route: '/admin/dashboard',    badge: 'Live' },
    { label: 'Users',        icon: 'users',         route: '/admin/users',        badge: '1,248' },
    { section: 'Operations' },
    { label: 'Listings',     icon: 'listings',      route: '/admin/listings' },
    { label: 'Stock',        icon: 'stock',         route: '/admin/stock' },
    { label: 'Deliveries',   icon: 'deliveries',    route: '/admin/deliveries' },
    { label: 'Reservations', icon: 'reservations',  route: '/admin/reservations' },
    { section: 'Finance' },
    { label: 'Treasury',     icon: 'earnings',      route: '/admin/treasury' },
    { label: 'Events',       icon: 'events',        route: '/admin/events' },
    { label: 'Solidarity',   icon: 'users',         route: '/admin/solidarity' },
    { label: 'My Products', icon: 'listings', route: '/enterprise/my-products' },
  ];

  enterpriseNav: NavItem[] = [
  { label: 'Home',          icon: 'home',          route: '/enterprise/dashboard' },
  { section: 'Marketplace' },
  { label: 'Browse Listings', icon: 'marketplace', route: '/enterprise/marketplace', badge: '247' },
  { label: 'My Listings',   icon: 'listings',      route: '/enterprise/my-listings' },
  { label: 'Requests',      icon: 'requests',      route: '/enterprise/requests' },
  { section: 'Operations' },
  { label: 'My Stock',      icon: 'stock',         route: '/enterprise/my-stock' },
  { label: 'My Deliveries', icon: 'deliveries',    route: '/enterprise/my-deliveries' },
  { label: 'Reservations',  icon: 'reservations',  route: '/enterprise/my-reservations' },
  { label: 'My Products',   icon: 'listings',      route: '/enterprise/my-products' },  // ✅ ADD THIS LINE
  { section: 'Finance' },
  { label: 'Transactions',  icon: 'transactions',  route: '/enterprise/transactions' },
  { label: 'Reports',       icon: 'reports',       route: '/enterprise/reports' },
];


  transporterNav: NavItem[] = [
    { label: 'Dashboard',  icon: 'dashboard',  route: '/transporter/dashboard' },
    { label: 'My Trips',   icon: 'trips',      route: '/transporter/trips' },
    { label: 'Shipments',  icon: 'shipments',  route: '/transporter/shipments' },
    { label: 'Earnings',   icon: 'earnings',   route: '/transporter/earnings' },
  ];

  get navItems(): NavItem[] {
    if (this.role === 'admin') return this.adminNav;
    if (this.role === 'transporter') return this.transporterNav;
    return this.enterpriseNav;
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u: User | null) => {
      this.user = u;
      this.role = u?.role || 'enterprise';
    });
  }

  logout(): void { this.authService.logout(); }
}