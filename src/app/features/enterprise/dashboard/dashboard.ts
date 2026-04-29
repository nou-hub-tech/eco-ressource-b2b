import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListingService, ListingDto, ReservationDto, WalletTransactionDto } from '../../../core/services/listing';
import { TransportService, DeliveryDto } from '../../../core/services/transport.service';
import { Subscription, interval } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  encapsulation: ViewEncapsulation.None
})
export class Dashboard implements OnInit, OnDestroy, AfterViewInit {

  // ── Hero Slides ──
  heroSlides: ListingDto[] = [
    {
      id: 1, tag: 'FEATURED LISTING', tagColor: '#00e676',
      title: 'Aluminium', titleAccent: 'Scrap Bales',
      sub: 'High-grade post-industrial aluminium, certified clean, ready for immediate pickup.',
      initials: 'TM', company: 'TunMetal SARL', location: 'Sfax Industrial Zone',
      category: 'Metals', verified: true, price: 1850, match: 94, matchColor: '#00e676',
      coColor: '#1a3a2a', accentColor: '#00e676', btnColor: '#00e676',
      specs: [
        { k: 'PURITY', v: '>= 98.5%' },
        { k: 'FORM', v: 'Compressed Bales' },
        { k: 'QUANTITY', v: '40 Tonnes' },
        { k: 'CERT', v: 'ISO 9001' }
      ],
      enq: 0, time: '2h ago', status: 'ACTIVE'
    },
    {
      id: 2, tag: 'ECO MATCH', tagColor: '#3b82f6',
      title: 'PET Pellets', titleAccent: 'Grade A',
      sub: 'Recycled PET from post-consumer bottles. Consistent colour, low moisture content.',
      initials: 'RC', company: 'RecycloChem Tunis', location: 'Tunis North',
      category: 'Plastics', verified: true, price: 960, match: 88, matchColor: '#3b82f6',
      coColor: '#1a2340', accentColor: '#3b82f6', btnColor: '#3b82f6',
      specs: [
        { k: 'GRADE', v: 'A (Food-grade)' },
        { k: 'COLOUR', v: 'Clear / Mixed' },
        { k: 'QUANTITY', v: '12 Tonnes' },
        { k: 'MOISTURE', v: '< 0.5%' }
      ],
      enq: 0, time: '5h ago', status: 'ACTIVE'
    },
    {
      id: 3, tag: 'BULK OFFER', tagColor: '#f59e0b',
      title: 'Cardboard', titleAccent: 'OCC Bales',
      sub: 'Old corrugated containers, baled and sorted. Ideal for paper mills and export.',
      initials: 'GC', company: 'GreenCycle Sousse', location: 'Sousse Port Area',
      category: 'Paper', verified: false, price: 310, match: 81, matchColor: '#f59e0b',
      coColor: '#3a2800', accentColor: '#f59e0b', btnColor: '#f59e0b',
      specs: [
        { k: 'TYPE', v: 'OCC 11 / 12' },
        { k: 'BALE WT', v: '500-600 kg' },
        { k: 'QUANTITY', v: '120 Tonnes' },
        { k: 'DELIVERY', v: 'FOB Sousse' }
      ],
      enq: 0, time: '1d ago', status: 'ACTIVE'
    }
  ];

  currentSlide = 0;
  slideProgress = 0;

  get currentHero(): ListingDto | null {
    return this.heroSlides[this.currentSlide] ?? null;
  }

  get slideCounter(): string {
    if (this.heroSlides.length === 0) return '00 / 00';
    return `${String(this.currentSlide + 1).padStart(2, '0')} / ${String(this.heroSlides.length).padStart(2, '0')}`;
  }

  // ── Ticker ──
  doubleTicker = [
    { name: 'Aluminium Scrap', price: '1,850 TND/T', chg: '+2.3%', up: true  },
    { name: 'PET Pellets',     price: '960 TND/T',   chg: '-0.8%', up: false },
    { name: 'Cardboard OCC',   price: '310 TND/T',   chg: '+1.1%', up: true  },
    { name: 'Steel HMS',       price: '1,200 TND/T', chg: '+0.5%', up: true  },
    { name: 'Copper Wire',     price: '7,800 TND/T', chg: '-1.2%', up: false },
    { name: 'HDPE Regranules', price: '1,400 TND/T', chg: '+3.0%', up: true  },
    { name: 'Glass Cullet',    price: '85 TND/T',    chg: '0.0%',  up: true  },
    { name: 'Paper Pulp',      price: '540 TND/T',   chg: '+0.9%', up: true  },
    { name: 'Aluminium Scrap', price: '1,850 TND/T', chg: '+2.3%', up: true  },
    { name: 'PET Pellets',     price: '960 TND/T',   chg: '-0.8%', up: false },
    { name: 'Cardboard OCC',   price: '310 TND/T',   chg: '+1.1%', up: true  },
    { name: 'Steel HMS',       price: '1,200 TND/T', chg: '+0.5%', up: true  },
    { name: 'Copper Wire',     price: '7,800 TND/T', chg: '-1.2%', up: false },
    { name: 'HDPE Regranules', price: '1,400 TND/T', chg: '+3.0%', up: true  },
    { name: 'Glass Cullet',    price: '85 TND/T',    chg: '0.0%',  up: true  },
    { name: 'Paper Pulp',      price: '540 TND/T',   chg: '+0.9%', up: true  },
  ];

  // ── Search / categories ──
  searchQuery = '';
  activeCategory = 'All';

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
    { name: 'AL SCRAP',  price: '0', chg: '+0%', up: true  },
    { name: 'PET',       price: '0', chg: '+0%', up: true  },
    { name: 'STEEL',     price: '0', chg: '+0%', up: false },
    { name: 'CARDBOARD', price: '0', chg: '+0%', up: true  },
    { name: 'GLASS',     price: '0', chg: '+0%', up: false },
    { name: 'TEXTILE',   price: '0', chg: '+0%', up: true  },
    { name: 'COPPER',    price: '0', chg: '+0%', up: true  },
    { name: 'HDPE',      price: '0', chg: '+0%', up: false },
    { name: 'STAINLESS', price: '0', chg: '+0%', up: true  },
  ];

  quickStats = [
    { val: '0', lbl: 'Live Listings' },
    { val: '0', lbl: 'AI Matches'   },
    { val: '0', lbl: 'Enquiries'    },
    { val: '0', lbl: 'In Transit'   },
    { val: '0', lbl: 'TND Balance'  },
  ];

  // ── Listings (AI matched) ──
  listings: ListingDto[] = [];
  allListings: ListingDto[] = [
    { id: 1, category: 'Metals', title: 'Aluminium Scrap - Bales', sub: 'Certified clean, post-industrial', initials: 'TM', company: 'TunMetal SARL', verified: true, rating: '4.9', match: 94, price: 1850, qty: '40 T', time: '2h ago', enq: 3, trend: true, status: 'ACTIVE' },
    { id: 2, category: 'Plastics', title: 'PET Pellets - Grade A', sub: 'Food-grade, low moisture', initials: 'RC', company: 'RecycloChem', verified: true, rating: '4.7', match: 88, price: 960, qty: '12 T', time: '5h ago', enq: 1, trend: true, status: 'ACTIVE' },
    { id: 3, category: 'Paper', title: 'Cardboard OCC - Baled', sub: 'Export-ready, sorted', initials: 'GC', company: 'GreenCycle Sousse', verified: false, rating: '4.5', match: 81, price: 310, qty: '120 T', time: '1d ago', enq: 0, trend: false, status: 'ACTIVE' },
    { id: 4, category: 'Metals', title: 'Copper Cable Scrap', sub: 'Mixed insulated, 85% copper avg', initials: 'ME', company: 'MetalExpo Bizerte', verified: true, rating: '4.8', match: 76, price: 7800, qty: '5 T', time: '3h ago', enq: 5, trend: true, status: 'ACTIVE' },
    { id: 5, category: 'Plastics', title: 'HDPE Regranules - Natural', sub: 'Injection moulding grade', initials: 'PP', company: 'PolyPlast Nabeul', verified: false, rating: '4.3', match: 73, price: 1400, qty: '8 T', time: '2d ago', enq: 0, trend: false, status: 'ACTIVE' },
    { id: 6, category: 'Metals', title: 'Steel HMS 1&2', sub: 'Heavy melt scrap, no copper', initials: 'SI', company: 'Sider Industrie', verified: true, rating: '4.6', match: 69, price: 1200, qty: '200 T', time: '6h ago', enq: 2, trend: true, status: 'ACTIVE' },
  ];

  filteredListings: ListingDto[] = [];

  setCategory(name: string): void {
    this.activeCategory = name;
    this.filteredListings = [...this.allListings];
  }

  private applyFilter(): void {
    this.filteredListings = [...this.allListings];
  }

  // ── Alerts ──
  alerts = [
    { level: 'urgent', text: 'Delivery DEL-003 requires your signature by 18:00.',         label: 'Sign Now'    },
    { level: 'warn',   text: '2 listings expire in 3 days - renew to stay visible.',        label: 'Renew'       },
    { level: 'info',   text: '5 new AI-matched listings posted in the last 2 hours.',       label: 'View'        },
    { level: 'info',   text: 'Market report for Aluminium Scrap updated - price up 2.3%.', label: 'Read Report' },
  ];

  // ── My Listings (side panel) ──
  myListings: ListingDto[] = [];

  // ── Deliveries (side panel) ──
  deliveries: DeliveryDto[] = [];
  private deliverySub?: Subscription;

  // ── Market Stock ──
  marketStock: any[] = [];
  marketStockLoading = false;
  selectedMarketProduct: any = null;
  private marketSub?: Subscription;

  // ── Slide auto-advance ──
  private slideSub?: Subscription;
  private progressSub?: Subscription;
  private readonly SLIDE_DURATION = 6000;
  private readonly PROGRESS_TICK  = 60;
  private progressTimer: any;

  constructor(
    private listingService: ListingService,
    private transportService: TransportService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    document.body.className = 'theme-enterprise';
    this.applyFilter();
    this.startSlideTimer();
    this.loadMarketStock();
    this.loadDeliveries();
    this.loadDashboardData();
  }

  private loadDashboardData(): void {

    this.listingService.getAllListings().subscribe({
      next: (listings) => {
        this.listings = listings.map((l) => ({
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
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });

    this.listingService.getMyListings().subscribe({
      next: (myListings) => {
        this.myListings = myListings.map((l) => ({
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
        const activeCount = this.myListings.filter((l) => l.status === 'active').length;
        this.quickStats[2].val = activeCount.toString();
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });

    this.transportService.getEnterpriseDeliveries().subscribe({
      next: (deliveries) => {
        this.deliveries = deliveries;
        const inTransitCount = deliveries.filter((d) => d.status === 'in-transit').length;
        this.quickStats[3].val = inTransitCount.toString();
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }
    });

    this.listingService.getWalletTransactions().subscribe({
      next: (transactions) => {
        const balance = transactions.reduce(
          (sum, t) => sum + (t.positive ? t.amount : -t.amount),
          0
        );
        this.quickStats[4].val = balance.toString();
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
      }

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

  private resetProgress(): void {
    clearInterval(this.progressTimer);
    this.slideProgress = 0;
    if (this.heroSlides.length === 0) return;
    this.progressTimer = setInterval(() => {
      this.slideProgress += 100 / 120;
      if (this.slideProgress >= 100) {
        this.slideProgress = 100;
        clearInterval(this.progressTimer);
        setTimeout(() => this.next(), 200);
      }
    }, 50);
  }

  // ── Slide controls ──
  private startSlideTimer(): void {
    this.slideProgress = 0;
    this.progressSub?.unsubscribe();
    this.slideSub?.unsubscribe();
    this.progressSub = interval(this.PROGRESS_TICK).subscribe(() => {
      this.slideProgress += (this.PROGRESS_TICK / this.SLIDE_DURATION) * 100;
    });
    this.slideSub = interval(this.SLIDE_DURATION).subscribe(() => {
      this.next();
    });
  }

  next(): void {
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    this.slideProgress = 0;
    this.startSlideTimer();
  }

  prev(): void {
    this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
    this.slideProgress = 0;
    this.startSlideTimer();
  }

  goTo(i: number): void {
    this.currentSlide = i;
    this.slideProgress = 0;
    this.startSlideTimer();
  }



  // ── Data loading ──
  private loadMarketStock(): void {
    this.marketStockLoading = true;
    this.marketSub = this.http.get<any[]>(`${environment.apiUrl}/enterprise/market-products`).subscribe({
      next:  (data) => { this.marketStock = data; this.marketStockLoading = false; this.cdr.detectChanges(); },
      error: ()     => { this.marketStock = [];   this.marketStockLoading = false; this.cdr.detectChanges(); }
    });
  }

  openProductDetail(product: any): void {
    this.selectedMarketProduct = product;
    this.cdr.detectChanges();
  }

  closeProductDetail(): void {
    this.selectedMarketProduct = null;
    this.cdr.detectChanges();
  }

  private loadDeliveries(): void {
    this.deliverySub = this.transportService.getEnterpriseDeliveries().subscribe({
      next:  (data) => { this.deliveries = data.slice(0, 4); },
      error: ()     => { this.deliveries = []; }
    });
  }

  ngOnDestroy(): void {
    this.slideSub?.unsubscribe();
    this.progressSub?.unsubscribe();
    this.marketSub?.unsubscribe();
    this.deliverySub?.unsubscribe();
    clearInterval(this.progressTimer);
  }
}
