import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../core/services/theme';
import { AuthService, User } from '../../../core/services/auth';
import { ListingService, ListingDto, ReservationDto, WalletTransactionDto } from '../../../core/services/listing';
import { TransportService, DeliveryDto } from '../../../core/services/transport.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  /* None = styles are global, so body.dark-mode .ed-hero selectors work */
  encapsulation: ViewEncapsulation.None
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {

  isDark = false;
  user: User | null = null;
  activeCategory = 'All';
  searchQuery = '';
  currentSlide = 0;
  slideProgress = 0;
  private subs = new Subscription();
  private progressTimer: any;

  categories = [
    { name: 'All',      count: 0 },
    { name: 'Metal',    count: 0 },
    { name: 'Plastic',  count: 0 },
    { name: 'Paper',    count: 0 },
    { name: 'Glass',    count: 0 },
    { name: 'Textile',  count: 0 },
    { name: 'Chemical', count: 0 },
  ];

  ticker = [
    { name: 'AL SCRAP',  price: '0', chg:'+0%', up: true  },
    { name: 'PET',       price: '0',   chg:'+0%', up: true  },
    { name: 'STEEL',     price: '0',   chg:'+0%', up: false },
    { name: 'CARDBOARD', price: '0',   chg:'+0%', up: true  },
    { name: 'GLASS',     price: '0',   chg:'+0%', up: false },
    { name: 'TEXTILE',   price: '0',   chg:'+0%', up: true  },
    { name: 'COPPER',    price: '0', chg:'+0%', up: true  },
    { name: 'HDPE',      price: '0',   chg:'+0%', up: false },
    { name: 'STAINLESS', price: '0', chg:'+0%', up: true  },
  ];
  get doubleTicker() { return [...this.ticker, ...this.ticker]; }

  heroSlides: ListingDto[] = [];

  get currentHero() { return this.heroSlides[this.currentSlide]; }
  get slideCounter() {
    return `${String(this.currentSlide + 1).padStart(2, '0')} / ${String(this.heroSlides.length).padStart(2, '0')}`;
  }

  quickStats = [
    { val: '0',   lbl: 'Live Listings' },
    { val: '0',    lbl: 'AI Matches'    },
    { val: '0',     lbl: 'Enquiries'     },
    { val: '0',     lbl: 'In Transit'    },
    { val: '0', lbl: 'TND Balance'   },
  ];

  listings: ListingDto[] = [];

  get filteredListings() {
    const q = this.searchQuery.trim().toLowerCase();
    let list = this.activeCategory === 'All'
      ? this.listings
      : this.listings.filter(l => l.category === this.activeCategory);
    if (q) list = list.filter(l =>
      l.title.toLowerCase().includes(q) ||
      (l.company && l.company.toLowerCase().includes(q)) ||
      (l.sub && l.sub.toLowerCase().includes(q))
    );
    return list;
  }

  alerts = [
    { level: 'urgent', label: 'Reply', text: '5 new enquiries on Aluminum Scrap listing'    },
    { level: 'warn',   label: 'Apply', text: 'AI recommends raising Aluminum price by +13%' },
    { level: 'info',   label: 'Track', text: 'Delivery DEL-1043 Sousse to Tunis in transit' },
  ];

  myListings: ListingDto[] = [];

  deliveries: DeliveryDto[] = [];

  goTo(i: number): void { this.currentSlide = i; this.resetProgress(); }
  prev(): void { this.goTo((this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length); }
  next(): void { this.goTo((this.currentSlide + 1) % this.heroSlides.length); }
  setCategory(name: string): void { this.activeCategory = name; }

  private resetProgress(): void {
    clearInterval(this.progressTimer);
    this.slideProgress = 0;
    this.progressTimer = setInterval(() => {
      this.slideProgress += 100 / 120;
      if (this.slideProgress >= 100) {
        this.slideProgress = 100;
        clearInterval(this.progressTimer);
        setTimeout(() => this.next(), 200);
      }
    }, 50);
  }

  constructor(public themeService: ThemeService, private authService: AuthService, private listingService: ListingService, private transportService: TransportService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subs.add(this.themeService.isDark$.subscribe(d => {
      this.isDark = d;
      this.cdr.detectChanges();
    }));
    this.subs.add(this.authService.user$.subscribe(u => {
      this.user = u;
      this.cdr.detectChanges();
    }));
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Load all listings for marketplace
    this.listingService.getAllListings().subscribe(listings => {
      // Map listings to include template-compatible properties
      this.listings = listings.map(l => ({
        ...l,
        match: l.match || Math.floor(Math.random() * 30) + 70,
        enq: l.enquiries || Math.floor(Math.random() * 10),
        trend: Math.random() > 0.5,
        time: l.posted || 'Recently',
        initials: l.initials || (l.company ? l.company.substring(0, 2).toUpperCase() : 'UN'),
        verified: l.verified || Math.random() > 0.3,
        rating: l.rating || (4 + Math.random()).toFixed(1),
        priceDisplay: l.price ? l.price.toString() : '0',
        sub: l.sub || `${l.category} · Available`,
        specs: [
          { k: 'QUANTITY', v: l.qty || 'Available' },
          { k: 'CATEGORY', v: l.category },
          { k: 'STATUS', v: l.status },
          { k: 'PRICE', v: l.price ? l.price.toString() : '0' },
          { k: 'DELIVERY', v: 'Available' }
        ],
        btnColor: this.getCategoryColor(l.category),
        tag: this.getCategoryTag(l.category),
        tagColor: this.getCategoryColor(l.category),
        titleAccent: this.getCategoryAccent(l.category),
        accentColor: this.getCategoryColor(l.category),
        coColor: this.getCategoryColor(l.category),
        location: 'Tunisia',
        matchColor: l.match >= 90 ? '#34d399' : l.match >= 75 ? '#f59e0b' : '#ef4444'
      }));
      
      this.heroSlides = this.listings.slice(0, 4);
      this.updateCategoriesCount(this.listings);
      this.quickStats[0].val = this.listings.length.toString();
      this.quickStats[1].val = Math.floor(this.listings.length * 0.05).toString();
      this.updateTicker(this.listings);
      this.cdr.detectChanges();
    });

    // Load my listings
    this.listingService.getMyListings().subscribe(myListings => {
      this.myListings = myListings.map(l => ({
        ...l,
        match: l.match || Math.floor(Math.random() * 30) + 70,
        enq: l.enquiries || Math.floor(Math.random() * 10),
        trend: Math.random() > 0.5,
        time: l.posted || 'Recently',
        initials: l.initials || (l.company ? l.company.substring(0, 2).toUpperCase() : 'UN'),
        verified: l.verified || Math.random() > 0.3,
        rating: l.rating || (4 + Math.random()).toFixed(1),
        priceDisplay: l.price ? l.price.toString() : '0',
        sub: l.sub || `${l.category} · Available`
      }));
      const activeCount = this.myListings.filter(l => l.status === 'active').length;
      this.quickStats[2].val = activeCount.toString();
      this.cdr.detectChanges();
    });

    // Load deliveries
    this.transportService.getEnterpriseDeliveries().subscribe(deliveries => {
      this.deliveries = deliveries;
      const inTransitCount = deliveries.filter(d => d.status === 'in-transit').length;
      this.quickStats[3].val = inTransitCount.toString();
      this.cdr.detectChanges();
    });

    // Load wallet transactions
    this.listingService.getWalletTransactions().subscribe(transactions => {
      const balance = transactions.reduce((sum, t) => sum + (t.positive ? t.amount : -t.amount), 0);
      this.quickStats[4].val = balance.toString();
      this.cdr.detectChanges();
    });
  }

  private updateCategoriesCount(listings: ListingDto[]): void {
    const categories = ['Metal', 'Plastic', 'Paper', 'Glass', 'Textile', 'Chemical'];
    this.categories[0].count = listings.length;
    categories.forEach((cat, index) => {
      const count = listings.filter(l => l.category === cat).length;
      this.categories[index + 1].count = count;
    });
  }

  private updateTicker(listings: ListingDto[]): void {
    const metalListings = listings.filter(l => l.category === 'Metal');
    const plasticListings = listings.filter(l => l.category === 'Plastic');
    
    if (metalListings.length > 0) {
      const avgPrice = metalListings.reduce((sum, l) => sum + l.price, 0) / metalListings.length;
      this.ticker[0].price = avgPrice.toFixed(0);
      this.ticker[2].price = (avgPrice * 0.65).toFixed(0);
    }
    
    if (plasticListings.length > 0) {
      const avgPrice = plasticListings.reduce((sum, l) => sum + l.price, 0) / plasticListings.length;
      this.ticker[1].price = avgPrice.toFixed(0);
      this.ticker[7].price = (avgPrice * 0.76).toFixed(0);
    }
    
    this.ticker.forEach(t => {
      const change = (Math.random() - 0.5) * 10;
      t.chg = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
      t.up = change >= 0;
    });
  }

  private getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'Metal': '#0056d2',
      'Plastic': '#0a7c4f',
      'Paper': '#92400e',
      'Glass': '#4c1d95',
      'Textile': '#a78bfa',
      'Chemical': '#dc2626'
    };
    return colors[category] || '#6b7280';
  }

  private getCategoryTag(category: string): string {
    const tags: { [key: string]: string } = {
      'Metal': 'PREMIUM · HIGH GRADE',
      'Plastic': 'RECYCLED · ECO-FRIENDLY',
      'Paper': 'COMPRESSED · READY TO SHIP',
      'Glass': 'CLEAN · FOOD GRADE',
      'Textile': 'SORTED · QUALITY ASSURED',
      'Chemical': 'LAB TESTED · CERTIFIED'
    };
    return tags[category] || 'AVAILABLE · QUALITY CHECKED';
  }

  private getCategoryAccent(category: string): string {
    const accents: { [key: string]: string } = {
      'Metal': 'Grade A',
      'Plastic': 'Pellets',
      'Paper': 'Bales',
      'Glass': 'Cullet',
      'Textile': 'Bales',
      'Chemical': 'Pure'
    };
    return accents[category] || 'Premium';
  }

  ngAfterViewInit(): void { this.resetProgress(); }
  ngOnDestroy(): void { this.subs.unsubscribe(); clearInterval(this.progressTimer); }
}