import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DeliveryOrderService } from '../../../core/services/delivery-order.service';
import { AuthService } from '../../../core/services/auth.service';
import { TransportService, Transporter } from '../../../core/services/transport.service';
import { DeliveryOrder } from '../../../core/models/delivery-order';
import { StatutCommande } from '../../../core/models/statut';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  // ── Identité du transporteur ──────────────────────────────────
  transporterName = '';
  monthlyEarnings = 0;

  // ── Stats cards ───────────────────────────────────────────────
  stats = [
    { label: 'Total Trips',      value: '0',   change: '+0 ce mois',   up: true, icon: '🗺',  bg: 'rgba(245,158,11,.1)' },
    { label: 'Active Shipments', value: '0',   change: 'En cours',     up: true, icon: '📦',  bg: 'rgba(52,211,153,.08)' },
    { label: 'km Driven',        value: '0',   change: '+0 cette sem.', up: true, icon: '📏',  bg: 'rgba(96,165,250,.08)' },
    { label: 'CO₂ Saved',        value: '0 kg', change: 'Via pooling',  up: true, icon: '🌿',  bg: 'rgba(52,211,153,.08)' },
  ];

  // ── Route active ──────────────────────────────────────────────
  activeTrip: any = null;

  // ── Tableau Today's Trips ─────────────────────────────────────
  trips: any[] = [];

  private acceptedTrips: any[] = [];
  private allOrders: DeliveryOrder[] = [];
  private transportersList: Transporter[] = [];

  constructor(
    private deliveryOrderService: DeliveryOrderService,
    private authService: AuthService,
    private transportService: TransportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTransporterInfo();
    this.loadData();
  }

  // ── 1. Récupère le nom du transporteur connecté ───────────────
  private loadTransporterInfo(): void {
    const user = this.authService.currentUser;
    if (!user) return;

    this.transporterName = user.name || user.email?.split('@')[0] || 'Transporteur';

    this.transportService.getAllTransporters().subscribe({
      next: (list) => {
        this.transportersList = list;
        const userId = parseInt(user.id, 10);
        const transporter = list.find(t => t.userId === userId);
        if (transporter) {
          this.transporterName = transporter.companyName;
        }
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  // ── 2. Charge et calcule toutes les statistiques ─────────────
  private loadData(): void {
    // Lire les trips acceptés depuis localStorage (stockés par trips.ts)
    this.acceptedTrips = this.loadAcceptedTripsFromStorage();

    // Lire les gains depuis localStorage
    this.monthlyEarnings = this.computeMonthlyEarnings();

    // Charger les delivery orders depuis l'API
    this.deliveryOrderService.getAll().subscribe({
      next: (orders) => {
        this.allOrders = orders;
        this.computeStats();
        this.buildTripsTable();
        this.findActiveTrip();
        this.cdr.detectChanges();
      },
      error: () => {
        // Même sans API, on peut calculer les stats depuis localStorage
        this.computeStats();
        this.buildTripsTable();
        this.findActiveTrip();
        this.cdr.detectChanges();
      }
    });
  }

  // ── 3. Calcule les statistiques réelles ──────────────────────
  private computeStats(): void {
    const total      = this.acceptedTrips.length;
    const active     = this.acceptedTrips.filter(t => !t.completed).length;
    const completed  = this.acceptedTrips.filter(t => t.completed).length;

    // KM total : somme des distances stockées
    const totalKm = this.acceptedTrips.reduce((sum, t) => {
      const d = parseFloat(t.distance) || 0;
      return sum + d;
    }, 0);

    // CO₂ économisé : ~0.12 kg CO₂ par km comparé à une voiture individuelle
    const co2Saved = Math.round(totalKm * 0.12);

    // Km cette semaine
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const kmWeek = this.acceptedTrips
      .filter(t => t.acceptedAt && new Date(t.acceptedAt) >= weekAgo)
      .reduce((sum, t) => sum + (parseFloat(t.distance) || 0), 0);

    // Trips ce mois
    const monthAgo = new Date();
    monthAgo.setDate(1); // 1er du mois
    const tripsMonth = this.acceptedTrips.filter(t =>
      t.acceptedAt && new Date(t.acceptedAt) >= monthAgo
    ).length;

    this.stats[0].value  = total.toString();
    this.stats[0].change = `+${tripsMonth} ce mois`;

    this.stats[1].value  = active.toString();
    this.stats[1].change = active === 0 ? 'Aucun en cours' : `${active} en cours`;

    this.stats[2].value  = Math.round(totalKm).toString();
    this.stats[2].change = `+${Math.round(kmWeek)} cette sem.`;

    this.stats[3].value  = `${co2Saved} kg`;
    this.stats[3].change = 'Via pooling';
  }

  // ── 4. Construit le tableau des trips ────────────────────────
  private buildTripsTable(): void {
    this.trips = this.acceptedTrips.map(t => {
      // Joindre avec la delivery order correspondante
      const order = this.allOrders.find(o => o.idDelivery === t.id);
      const statut = order?.statut;

      let status: string;
      let statusClass: string;
      if (t.completed || statut === StatutCommande.LIVREE) {
        status = 'Livré'; statusClass = 'badge-success';
      } else if (statut === StatutCommande.EN_COURS) {
        status = 'En cours'; statusClass = 'badge-info';
      } else {
        status = 'En attente'; statusClass = 'badge-warning';
      }

      const earn = this.getEarnForTrip(t.id);

      return {
        id: `DEL-${t.id}`,
        route: t.address || t.to || '—',
        cargo: order ? `Livraison #${t.id}` : `Livraison #${t.id}`,
        status,
        statusClass,
        earn: earn > 0 ? earn : '—',
        date: t.date ? new Date(t.date).toLocaleDateString('fr-TN') : '—'
      };
    }).sort((a, b) => b.id.localeCompare(a.id)); // Plus récent d'abord
  }

  // ── 5. Trouve le trip actif (en cours) ───────────────────────
  private findActiveTrip(): void {
    const saved = localStorage.getItem('currentAcceptedTrip');
    if (saved) {
      try { this.activeTrip = JSON.parse(saved); } catch { this.activeTrip = null; }
    } else {
      this.activeTrip = this.acceptedTrips.find(t => !t.completed) || null;
    }
  }

  // ── Helpers localStorage ──────────────────────────────────────
  private loadAcceptedTripsFromStorage(): any[] {
    try {
      const saved = localStorage.getItem('acceptedTrips');
      if (!saved) return [];
      return JSON.parse(saved);
    } catch { return []; }
  }

  private computeMonthlyEarnings(): number {
    try {
      const saved = localStorage.getItem('earnings');
      if (!saved) return 0;
      const earnings: any[] = JSON.parse(saved);
      const now = new Date();
      return earnings
        .filter(e => {
          const d = new Date(e.date);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        })
        .reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    } catch { return 0; }
  }

  private getEarnForTrip(tripId: number): number {
    try {
      const saved = localStorage.getItem('earnings');
      if (!saved) return 0;
      const earnings: any[] = JSON.parse(saved);
      const found = earnings.find(e => e.id === tripId);
      return found ? parseFloat(found.amount) || 0 : 0;
    } catch { return 0; }
  }

  // ── Helpers template ──────────────────────────────────────────
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Bonjour';
    if (h < 18) return 'Bon après-midi';
    return 'Bonsoir';
  }

  get activeCount(): number {
    return this.acceptedTrips.filter(t => !t.completed).length;
  }

  formatEarnings(n: number): string {
    return n.toLocaleString('fr-TN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
}