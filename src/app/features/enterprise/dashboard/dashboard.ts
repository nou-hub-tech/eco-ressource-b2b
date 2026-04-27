import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListingService, ListingDto } from '../../../core/services/listing';
import { TransportService, DeliveryDto } from '../../../core/services/transport.service';
import { Subscription, interval } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, OnDestroy {

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
        { k: 'PURITY',    v: '>= 98.5%' },
        { k: 'FORM',      v: 'Compressed Bales' },
        { k: 'QUANTITY',  v: '40 Tonnes' },
        { k: 'CERT',      v: 'ISO 9001' }
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
        { k: 'GRADE',     v: 'A (Food-grade)' },
        { k: 'COLOUR',    v: 'Clear / Mixed' },
        { k: 'QUANTITY',  v: '12 Tonnes' },
        { k: 'MOISTURE',  v: '< 0.5%' }
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
        { k: 'TYPE',      v: 'OCC 11 / 12' },
        { k: 'BALE WT',   v: '500-600 kg' },
        { k: 'QUANTITY',  v: '120 Tonnes' },
        { k: 'DELIVERY',  v: 'FOB Sousse' }
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
    return (this.currentSlide + 1) + ' / ' + this.heroSlides.length;
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
    { name: 'All',      count: 148 },
    { name: 'Metals',   count: 42  },
    { name: 'Plastics', count: 35  },
    { name: 'Paper',    count: 28  },
    { name: 'Glass',    count: 19  },
    { name: 'Other',    count: 24  },
  ];

  quickStats = [
    { val: '148',   lbl: 'Active Listings' },
    { val: '23',    lbl: 'New Today'       },
    { val: '6',     lbl: 'My Watchlist'    },
    { val: '99.2%', lbl: 'Match Accuracy'  },
  ];

  // ── Listings (AI matched) ──
  allListings: ListingDto[] = [
    { id: 1, category: 'Metals',   title: 'Aluminium Scrap - Bales',  sub: 'Certified clean, post-industrial', initials: 'TM', company: 'TunMetal SARL',    verified: true,  rating: '4.9', match: 94, price: 1850, qty: '40 T',  time: '2h ago', enq: 3, trend: true,  status: 'ACTIVE' },
    { id: 2, category: 'Plastics', title: 'PET Pellets - Grade A',     sub: 'Food-grade, low moisture',         initials: 'RC', company: 'RecycloChem',       verified: true,  rating: '4.7', match: 88, price: 960,  qty: '12 T',  time: '5h ago', enq: 1, trend: true,  status: 'ACTIVE' },
    { id: 3, category: 'Paper',    title: 'Cardboard OCC - Baled',     sub: 'Export-ready, sorted',             initials: 'GC', company: 'GreenCycle Sousse', verified: false, rating: '4.5', match: 81, price: 310,  qty: '120 T', time: '1d ago', enq: 0, trend: false, status: 'ACTIVE' },
    { id: 4, category: 'Metals',   title: 'Copper Cable Scrap',         sub: 'Mixed insulated, 85% copper avg', initials: 'ME', company: 'MetalExpo Bizerte', verified: true,  rating: '4.8', match: 76, price: 7800, qty: '5 T',   time: '3h ago', enq: 5, trend: true,  status: 'ACTIVE' },
    { id: 5, category: 'Plastics', title: 'HDPE Regranules - Natural', sub: 'Injection moulding grade',        initials: 'PP', company: 'PolyPlast Nabeul',  verified: false, rating: '4.3', match: 73, price: 1400, qty: '8 T',   time: '2d ago', enq: 0, trend: false, status: 'ACTIVE' },
    { id: 6, category: 'Metals',   title: 'Steel HMS 1&2',              sub: 'Heavy melt scrap, no copper',     initials: 'SI', company: 'Sider Industrie',   verified: true,  rating: '4.6', match: 69, price: 1200, qty: '200 T', time: '6h ago', enq: 2, trend: true,  status: 'ACTIVE' },
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
  myListings = [
    { title: 'Aluminium Scrap - 40T', status: 'ACTIVE',  views: 312, enq: 8, price: '1,850 TND/T', trend: true  },
    { title: 'PET Flakes - Mixed',    status: 'ACTIVE',  views: 187, enq: 3, price: '820 TND/T',   trend: true  },
    { title: 'Cardboard OCC',         status: 'PENDING', views: 43,  enq: 0, price: '310 TND/T',   trend: false },
  ];

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
  }
}