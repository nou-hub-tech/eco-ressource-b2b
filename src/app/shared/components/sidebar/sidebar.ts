import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../core/services/auth';

interface NavItem {
  label?: string;
  icon?: string;
  route?: string;
  badge?: string;
  section?: string;
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

  /* SVG ICONS */
  private icons: Record<string, string> = {
    dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    marketplace: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
    listings: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 12h6M9 16h4',
    stock: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
    resources: 'M4 11l8-8 8 8M5 10v9h14v-9M9 19v-5h6v5',
    deliveries: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8z',
    reservations: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
    transactions: 'M1 4h22v16H1zM1 10h22',
    reports: 'M18 20V10M12 20V4M6 20v-6',
    users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8',
    events: 'M12 2L2 7l10 5 10-5-10-5z',
    requests: 'M22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12',
    trips: 'M1 6v16l7-4 8 4 7-4V2',
    shipments: 'M3 12l2-2 7-7 7 7',
    earnings: 'M12 2v20M17 5H9.5',
    home: 'M3 9l9-7 9 7v11',
  };

  /* 🔥 FIXED FUNCTION */
  getSvgPath(key: string): string {
    return this.icons[key] || this.icons['dashboard'];
  }

  /* ADMIN */
  adminNav: NavItem[] = [
    { section: 'Overview' },
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Users', icon: 'users', route: '/admin/users' },

    { section: 'Operations' },
    { label: 'Listings', icon: 'listings', route: '/admin/listings' },
    { label: 'Stock', icon: 'stock', route: '/admin/stock' },
    { label: 'Deliveries', icon: 'deliveries', route: '/admin/deliveries' },

    { section: 'Circular Economy' },
    { label: 'Reservations', icon: 'reservations', route: '/admin/reservations' },
    { label: 'Orders', icon: 'transactions', route: '/admin/orders' },
    { label: 'Slots Calendar', icon: 'reservations', route: '/admin/slots' },

    { section: 'Finance' },
    { label: 'Treasury', icon: 'earnings', route: '/admin/treasury' },
    { label: 'Events', icon: 'events', route: '/admin/events' }
  ];

  /* ENTERPRISE */
  enterpriseNav: NavItem[] = [
    { label: 'Home', icon: 'home', route: '/enterprise/dashboard' },

    { section: 'Marketplace' },
    { label: 'Marketplace', icon: 'marketplace', route: '/enterprise/marketplace' },
    { label: 'My Resources', icon: 'resources', route: '/enterprise/slots' },
    { label: 'My Reservations', icon: 'requests', route: '/enterprise/reservations' },
    { label: 'Incoming Requests', icon: 'requests', route: '/enterprise/incoming-requests' },
    { label: 'Orders', icon: 'transactions', route: '/enterprise/orders' },

    { section: 'Operations' },
    { label: 'My Listings', icon: 'listings', route: '/enterprise/my-listings' },
    { label: 'My Stock', icon: 'stock', route: '/enterprise/my-stock' },
    { label: 'My Deliveries', icon: 'deliveries', route: '/enterprise/my-deliveries' },

    { section: 'Finance' },
    { label: 'Transactions', icon: 'transactions', route: '/enterprise/transactions' },
    { label: 'Reports', icon: 'reports', route: '/enterprise/reports' }
  ];

  /* TRANSPORTER */
  transporterNav: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/transporter/dashboard' },
    { label: 'My Trips', icon: 'trips', route: '/transporter/trips' },
    { label: 'Shipments', icon: 'shipments', route: '/transporter/shipments' },
    { label: 'Earnings', icon: 'earnings', route: '/transporter/earnings' }
  ];

  get navItems(): NavItem[] {
    if (this.role === 'admin') return this.adminNav;
    if (this.role === 'transporter') return this.transporterNav;
    return this.enterpriseNav;
  }
  /**
   * Each entry in {@link navItems} is already an absolute path
   * (e.g. "/enterprise/my-reservations" or "/admin/dashboard"), so
   * we hand it to the router as-is. Returning {@code ['/enterprise', route]}
   * — as the original code did — produced a malformed two-segment URL that
   * the RouterLink directive resolved inconsistently and broke
   * routerLinkActive matching.
   */
  getRoute(route: string): string {
    return route;
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((u: User | null) => {
      this.user = u;
      this.role = u?.role || 'enterprise';
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
