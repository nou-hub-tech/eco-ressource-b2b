import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../core/services/theme';
import { AuthService, User } from '../../../core/services/auth';

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
    { name: 'All',      count: 247 },
    { name: 'Metal',    count: 142 },
    { name: 'Plastic',  count: 64  },
    { name: 'Paper',    count: 38  },
    { name: 'Glass',    count: 21  },
    { name: 'Textile',  count: 44  },
    { name: 'Chemical', count: 33  },
  ];

  ticker = [
    { name: 'AL SCRAP',  price: '1,200', chg: '+2.3%', up: true  },
    { name: 'PET',       price: '680',   chg: '+5.1%', up: true  },
    { name: 'STEEL',     price: '780',   chg: '-0.8%', up: false },
    { name: 'CARDBOARD', price: '180',   chg: '+0.4%', up: true  },
    { name: 'GLASS',     price: '300',   chg: '-1.2%', up: false },
    { name: 'TEXTILE',   price: '367',   chg: '+3.7%', up: true  },
    { name: 'COPPER',    price: '2,400', chg: '+1.8%', up: true  },
    { name: 'HDPE',      price: '520',   chg: '-2.1%', up: false },
    { name: 'STAINLESS', price: '1,850', chg: '+4.2%', up: true  },
  ];
  get doubleTicker() { return [...this.ticker, ...this.ticker]; }

  heroSlides = [
    {
      tag: 'AI MATCHED · 96% COMPATIBILITY',
      tagColor: '#3b9eff',
      title: 'Aluminum Scrap',
      titleAccent: 'Grade A',
      accentColor: '#60a5fa',
      sub: 'BIZERTE INDUSTRIAL ZONE · 3,000 KG AVAILABLE · ISO-9001 CERTIFIED',
      company: 'Fonderie du Nord',
      initials: 'FN',
      coColor: '#1a4fc4',
      location: 'BIZERTE, TN',
      verified: true,
      price: '1,180',
      match: 96,
      matchColor: '#34d399',
      btnColor: '#0056d2',
      specs: [
        { k: 'QUANTITY', v: '3,000 KG' },
        { k: 'GRADE',    v: 'GRADE A'  },
        { k: 'LOCATION', v: 'BIZERTE'  },
        { k: 'CERT.',    v: 'ISO-9001' },
        { k: 'DELIVERY', v: '5–7 DAYS' },
      ]
    },
    {
      tag: 'NEW LISTING · FOOD GRADE CERTIFIED',
      tagColor: '#34d399',
      title: 'Virgin PET',
      titleAccent: 'Pellets',
      accentColor: '#34d399',
      sub: 'SFAX · 500 KG · FOOD GRADE · ANGED CERTIFIED FACILITY',
      company: 'Chimie Anis SARL',
      initials: 'CA',
      coColor: '#0a7c4f',
      location: 'SFAX, TN',
      verified: true,
      price: '680',
      match: 89,
      matchColor: '#34d399',
      btnColor: '#0a7c4f',
      specs: [
        { k: 'QUANTITY', v: '500 KG'    },
        { k: 'GRADE',    v: 'FOOD GRADE'},
        { k: 'LOCATION', v: 'SFAX'      },
        { k: 'CERT.',    v: 'ANGED'     },
        { k: 'DELIVERY', v: '3–5 DAYS'  },
      ]
    },
    {
      tag: 'BULK AVAILABLE · BEST PRICE',
      tagColor: '#f59e0b',
      title: 'Cardboard',
      titleAccent: 'Bales 5T',
      accentColor: '#f59e0b',
      sub: 'SOUSSE · 5,000 KG · COMPRESSED · REGULAR SUPPLY AVAILABLE',
      company: 'Textile Mona SA',
      initials: 'TM',
      coColor: '#92400e',
      location: 'SOUSSE, TN',
      verified: true,
      price: '180',
      match: 82,
      matchColor: '#f59e0b',
      btnColor: '#92400e',
      specs: [
        { k: 'QUANTITY', v: '5,000 KG'  },
        { k: 'TYPE',     v: 'COMPRESSED'},
        { k: 'LOCATION', v: 'SOUSSE'    },
        { k: 'SUPPLY',   v: 'REGULAR'   },
        { k: 'DELIVERY', v: '2–4 DAYS'  },
      ]
    },
    {
      tag: 'PRECISION CNC OFFCUTS',
      tagColor: '#a78bfa',
      title: 'Steel',
      titleAccent: 'Offcuts',
      accentColor: '#a78bfa',
      sub: 'GABÈS · 800 KG · MIXED GRADE · POOLED LOGISTICS AVAILABLE',
      company: 'Métallurgie Sud',
      initials: 'MS',
      coColor: '#4c1d95',
      location: 'GABÈS, TN',
      verified: false,
      price: '780',
      match: 78,
      matchColor: '#a78bfa',
      btnColor: '#4c1d95',
      specs: [
        { k: 'QUANTITY', v: '800 KG'   },
        { k: 'GRADE',    v: 'MIXED'    },
        { k: 'LOCATION', v: 'GABÈS'    },
        { k: 'SOURCE',   v: 'CNC OPS'  },
        { k: 'DELIVERY', v: '7–10 DAYS'},
      ]
    },
  ];

  get currentHero() { return this.heroSlides[this.currentSlide]; }
  get slideCounter() {
    return `${String(this.currentSlide + 1).padStart(2, '0')} / ${String(this.heroSlides.length).padStart(2, '0')}`;
  }

  quickStats = [
    { val: '247',   lbl: 'Live Listings' },
    { val: '12',    lbl: 'AI Matches'    },
    { val: '8',     lbl: 'Enquiries'     },
    { val: '3',     lbl: 'In Transit'    },
    { val: '8,250', lbl: 'TND Balance'   },
  ];

  listings = [
    { id: 'LST-001', title: 'Aluminum Scrap',    category: 'Metal',   sub: 'Grade A · Bizerte',   company: 'Fonderie du Nord',  initials: 'FN', price: '1,180', qty: '3,000 kg', match: 96, verified: true,  rating: '4.9', time: '2h ago' },
    { id: 'LST-002', title: 'Virgin PET Pellets', category: 'Plastic', sub: 'Food Grade · Sfax',   company: 'Chimie Anis SARL', initials: 'CA', price: '680',   qty: '500 kg',   match: 89, verified: true,  rating: '4.7', time: '5h ago' },
    { id: 'LST-003', title: 'Cardboard Bales',    category: 'Paper',   sub: 'Compressed · Sousse', company: 'Textile Mona SA',  initials: 'TM', price: '180',   qty: '5,000 kg', match: 82, verified: true,  rating: '4.8', time: '1d ago' },
    { id: 'LST-004', title: 'Steel Offcuts',      category: 'Metal',   sub: 'Mixed Grade · Gabès', company: 'Métallurgie Sud',  initials: 'MS', price: '780',   qty: '800 kg',   match: 78, verified: false, rating: '4.5', time: '3h ago' },
    { id: 'LST-005', title: 'Glass Cullet',       category: 'Glass',   sub: 'Clear · Bizerte',     company: 'Vitro Indinya',    initials: 'VI', price: '300',   qty: '300 kg',   match: 71, verified: true,  rating: '4.6', time: '6h ago' },
    { id: 'LST-006', title: 'HDPE Regrind',       category: 'Plastic', sub: 'Washed · Tunis',      company: 'Plastex Sfax',     initials: 'PS', price: '520',   qty: '1,200 kg', match: 68, verified: true,  rating: '4.4', time: '8h ago' },
  ];

  get filteredListings() {
    const q = this.searchQuery.trim().toLowerCase();
    let list = this.activeCategory === 'All'
      ? this.listings
      : this.listings.filter(l => l.category === this.activeCategory);
    if (q) list = list.filter(l =>
      l.title.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q) ||
      l.sub.toLowerCase().includes(q)
    );
    return list;
  }

  alerts = [
    { level: 'urgent', label: 'Reply', text: '5 new enquiries on Aluminum Scrap listing'    },
    { level: 'warn',   label: 'Apply', text: 'AI recommends raising Aluminum price by +13%' },
    { level: 'info',   label: 'Track', text: 'Delivery DEL-1043 Sousse to Tunis in transit' },
  ];

  myListings = [
    { title: 'Aluminum Scrap 2T',   status: 'ACTIVE',  enq: 5, price: '1,200', views: 48, trend: true  },
    { title: 'Steel Offcuts 800kg', status: 'ACTIVE',  enq: 3, price: '620',   views: 31, trend: true  },
    { title: 'Cardboard Bales 1T',  status: 'PENDING', enq: 0, price: '180',   views: 12, trend: false },
  ];

  deliveries = [
    { id: 'DEL-1043', from: 'Sousse', to: 'Tunis',   status: 'TRANSIT',   eta: 'Mar 23' },
    { id: 'DEL-1047', from: 'Gabès',  to: 'Bizerte', status: 'SCHEDULED', eta: 'Mar 26' },
    { id: 'DEL-1039', from: 'Sfax',   to: 'Tunis',   status: 'DELIVERED', eta: 'Mar 18' },
  ];

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

  constructor(public themeService: ThemeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.subs.add(this.themeService.isDark$.subscribe(d => this.isDark = d));
    this.subs.add(this.authService.user$.subscribe(u => this.user = u));
  }

  ngAfterViewInit(): void { this.resetProgress(); }
  ngOnDestroy(): void { this.subs.unsubscribe(); clearInterval(this.progressTimer); }
}