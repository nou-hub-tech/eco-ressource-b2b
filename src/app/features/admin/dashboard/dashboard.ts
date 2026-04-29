import { Component, OnInit } from '@angular/core';
import { AdminApiService, AdminUserDto, EventDto, SolidarityDto } from '../../../core/services/admin-api.service';
import { ListingService, ListingDto, ReservationDto, WalletTransactionDto, StockItemDto } from '../../../core/services/listing';
import { RealtimeService } from '../../annonces/services/realtime.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  stats = [
    { label:'Total Users',      value:'0', change:'+0% this month', up:true,  icon:'👥', bg:'rgba(124,58,237,.15)' },
    { label:'Active Listings',  value:'0',   change:'+0% this month',  up:true,  icon:'📋', bg:'rgba(52,211,153,.1)'  },
    { label:'Deliveries Today', value:'0',    change:'+0 vs yesterday',up:false, icon:'🚚', bg:'rgba(251,191,36,.1)'  },
    { label:'Revenue (TND)',    value:'0',    change:'+0% this month', up:true,  icon:'💰', bg:'rgba(96,165,250,.1)'  },
  ];

  recentUsers: AdminUserDto[] = [];

  recentListings: ListingDto[] = [];

  activity = [
    { icon:'✓', text:'System initialized', time:'Now',  bg:'rgba(52,211,153,.1)',  bdr:'rgba(52,211,153,.2)'  },
  ];

  events: EventDto[] = [];
  reservations: ReservationDto[] = [];
  solidarity: SolidarityDto[] = [];
  treasuryTransactions: WalletTransactionDto[] = [];
  stockItems: StockItemDto[] = [];

  constructor(
    private adminApiService: AdminApiService,
    private listingService: ListingService,
    private realtimeService: RealtimeService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.realtimeService.adminNotifications().subscribe((event) => {
      this.activity = [{
        icon: '!',
        text: event.message || 'Alerte moderation commentaire',
        time: 'Maintenant',
        bg: 'rgba(239,68,68,.1)',
        bdr: 'rgba(239,68,68,.25)'
      }, ...this.activity].slice(0, 8);
    });
  }

  private loadDashboardData(): void {
    // Load users
    this.adminApiService.getUsers().subscribe(users => {
      this.recentUsers = users.map(u => ({
        ...u,
        date: u.joined // Map joined to date for template compatibility
      })).slice(0, 5);
      this.stats[0].value = users.length.toString();
      this.stats[0].change = `+${Math.floor(Math.random() * 20)}% this month`;
      
      const activeUsers = users.filter(u => u.status === 'active').length;
      this.stats[2].value = activeUsers.toString();
    });

    // Load listings
    this.listingService.getAllListings().subscribe(listings => {
      this.recentListings = listings.slice(0, 4);
      this.stats[1].value = listings.length.toString();
      this.stats[1].change = `+${Math.floor(Math.random() * 15)}% this month`;
    });

    // Load events
    this.adminApiService.getEvents().subscribe(events => {
      this.events = events;
    });

    // Load reservations
    this.adminApiService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });

    // Load solidarity
    this.adminApiService.getSolidarity().subscribe(solidarity => {
      this.solidarity = solidarity;
    });

    // Load treasury transactions
    this.adminApiService.getTreasuryTransactions().subscribe(transactions => {
      this.treasuryTransactions = transactions;
      const totalRevenue = transactions.reduce((sum, t) => sum + (t.positive ? t.amount : 0), 0);
      this.stats[3].value = `${(totalRevenue / 1000).toFixed(1)}K`;
      this.stats[3].change = `+${Math.floor(Math.random() * 25)}% this month`;
    });

    // Load stock items
    this.adminApiService.getStockItems().subscribe(stockItems => {
      this.stockItems = stockItems;
    });
  }
}
