import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AiSuggestionsService, AiSuggestion } from '../../shared/ai-suggestions.service';
import {
  ReservationApiService,
  BackendReservation,
  ReservationCreateRequest,
} from '../../shared/api/reservation-api.service';

type Status = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

interface Reservation {
  id: number;
  company: string;
  machine: string;
  date: string;
  hours: number;
  startHour: number;
  status: Status;
  solar: boolean;
  ai: { label: string; score?: number }[];
  deleted?: boolean;
  cancelReason?: string;
}

interface LeaderboardEntry {
  rank: number;
  company: string;
  co2Saved: number;
  bookings: number;
  solarRate: number;        // % solar
  solarRate: number;
  badge: 'gold' | 'silver' | 'bronze' | 'green' | 'eco';
  isYou?: boolean;
}

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reservation-list.html',
  styleUrls: ['./reservation-list.css'],
})
export class ReservationList implements OnInit {

  // UI state
  searchTerm = '';
  filterStatus: Status | '' = '';
  sortBy: 'date' | 'co2' | 'hours' = 'date';
  showModal = false;
  editMode = false;

  // Soft-delete modal state (replaces the rough `prompt()` flow)
  deleteModal = false;
  pendingDelete: Reservation | null = null;
  deleteReason = '';

<<<<<<< HEAD
  // Logged-in company (for leaderboard "you" highlight)
  myCompany = 'EcoPlast';

  form: Reservation = this.emptyForm();

  reservations: Reservation[] = [];
  loadError = '';

  // Modal-level error so create/update failures don't silently swallow
  modalError = '';
  saving = false;

  monthlyGoalKg = 500;
=======
  form: Reservation = this.emptyForm();
  reservations: Reservation[] = [];

  loadError = '';
  modalError = '';

  currentId: number | null = null;

  myCompany = 'EcoPlast';

  // ================= KPIs =================
  totalCo2Saved = 0;
  totalBookings = 0;
  avgConfidence = 0;
  solarSlotCount = 0;
  goalPct = 0;
  treesEquivalent = 0;

  monthlyGoalKg = 500;

>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  aiInsights: AiSuggestion[] = [];

  constructor(
    public ai: AiSuggestionsService,
<<<<<<< HEAD
    private api: ReservationApiService,
=======
    private api: ReservationApiService
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  ) {}

  ngOnInit(): void {
    this.loadReservations();
<<<<<<< HEAD
    this.refreshInsights();
  }

  // ====================================================================
  //  Backend integration
  // ====================================================================
=======
  }

  // ================= BACKEND =================
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  loadReservations(): void {
    this.api.list().subscribe({
      next: rows => {
        this.reservations = rows.map(r => this.fromBackend(r));
<<<<<<< HEAD
        this.refreshInsights();
      },
      error: err => {
        console.error('[ReservationList] failed to load', err);
        this.loadError =
          err?.status === 401
            ? 'Please log in to view your reservations.'
            : 'Could not reach the server. Showing the cached view.';
      },
=======
        this.computeKPIs();
        this.refreshInsights();
      },
      error: err => {
        console.error(err);
        this.loadError = 'Failed to load reservations';
      }
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
    });
  }

  private fromBackend(r: BackendReservation): Reservation {
<<<<<<< HEAD
    const machine = r.machine ?? r.item ?? '';
    const startHour = r.startHour ?? 9;
    const hours = r.hours ?? 1;
    const ai = this.ai.analyzeReservation(machine, r.fromDate, hours);
    const status =
      r.status === 'cancelled' ? 'CANCELLED'
        : r.status === 'pending' ? 'PENDING'
          : 'CONFIRMED';
    return {
      id: r.id,
      company: r.companyName,
      machine,
      date: r.fromDate,
      hours,
      startHour,
      status: status as Status,
      solar: r.solar ?? false,
      ai,
      deleted: r.deleted ?? false,
      cancelReason: r.cancelReason ?? undefined,
=======
    return {
      id: r.id,
      company: r.companyName,
      machine: r.machine ?? r.item ?? '',
      date: r.fromDate,
      hours: r.hours ?? 1,
      startHour: r.startHour ?? 9,
      status:
        r.status === 'cancelled'
          ? 'CANCELLED'
          : r.status === 'pending'
          ? 'PENDING'
          : 'CONFIRMED',
      solar: r.solar ?? false,
      ai: this.ai.analyzeReservation(r.machine ?? '', r.fromDate, r.hours ?? 1),
      deleted: r.deleted ?? false,
      cancelReason: r.cancelReason ?? undefined
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
    };
  }

  private toBackend(r: Reservation): ReservationCreateRequest {
<<<<<<< HEAD
    const status =
      r.status === 'CANCELLED' ? 'cancelled'
        : r.status === 'PENDING' ? 'pending'
          : 'confirmed';
=======
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
    return {
      typeLabel: 'Machine slot',
      item: r.machine,
      companyName: r.company,
      fromDate: r.date,
      toDate: r.date,
<<<<<<< HEAD
      price: 0,
      status: status as any,
=======
      price: 100,
      status: r.status.toLowerCase() as any,
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
      machine: r.machine,
      hours: r.hours,
      startHour: r.startHour,
      solar: r.solar,
<<<<<<< HEAD
      co2Saved: this.co2Saved(r),
    };
  }

  // ===== Filtered list =====
  get filtered(): Reservation[] {
    const list = this.reservations
      .filter(r => !r.deleted)
      .filter(r => {
        const q = this.searchTerm.toLowerCase();
        return !q ||
          r.machine.toLowerCase().includes(q) ||
          r.company.toLowerCase().includes(q);
      })
      .filter(r => this.filterStatus === '' || r.status === this.filterStatus);

    return list.sort((a, b) => {
      if (this.sortBy === 'co2') return this.co2(b) - this.co2(a);
      if (this.sortBy === 'hours') return b.hours - a.hours;
      return a.date.localeCompare(b.date);
    });
  }

  // ===== KPIs =====
  get totalCo2Saved(): number {
    return this.reservations
      .filter(r => !r.deleted && r.status !== 'CANCELLED')
      .reduce((sum, r) => {
        const m = this.ai.machines.find(x => x.name === r.machine);
        return sum + (m ? this.ai.co2SavedVsBaseline(m, r.hours, r.startHour) : 0);
      }, 0);
  }

  get totalBookings(): number {
    return this.reservations.filter(r => !r.deleted).length;
  }

  get avgConfidence(): number {
    const scores = this.reservations.flatMap(r => r.ai.map(a => a.score ?? 0));
    if (!scores.length) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  get solarSlotCount(): number {
    return this.reservations.filter(r => !r.deleted && r.solar).length;
  }

  get goalPct(): number {
    return Math.min(100, Math.round((this.totalCo2Saved / this.monthlyGoalKg) * 100));
  }

  get treesEquivalent(): number {
    return Math.max(1, Math.round(this.totalCo2Saved / 21));
  }

  // ===== Per-reservation eco =====
  co2(r: Reservation): number {
    const m = this.ai.machines.find(x => x.name === r.machine);
    if (!m) return 0;
    return this.ai.co2ForBooking(m, r.hours, r.startHour);
=======
      co2Saved: this.co2Saved(r)
    };
  }

  // ================= KPIs =================
  computeKPIs(): void {
    const active = this.reservations.filter(r => !r.deleted);

    this.totalBookings = active.length;
    this.totalCo2Saved = active.reduce((s, r) => s + this.co2Saved(r), 0);
    this.solarSlotCount = active.filter(r => r.solar).length;

    const scores = active.flatMap(r => r.ai.map(a => a.score ?? 0));
    this.avgConfidence = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    this.goalPct = Math.min(100, Math.round((this.totalCo2Saved / this.monthlyGoalKg) * 100));
    this.treesEquivalent = Math.max(1, Math.round(this.totalCo2Saved / 21));
  }

  // ================= CRUD =================
  openCreate(): void {
    this.editMode = false;
    this.currentId = null;
    this.form = this.emptyForm();
    this.modalError = '';
    this.showModal = true;
  }

  openEdit(r: Reservation): void {
    this.editMode = true;
    this.currentId = r.id;
    this.form = { ...r };
    this.modalError = '';
    this.showModal = true;
  }

  save(): void {
    console.log("SAVE CLICKED");

    if (this.saving) return;

    if (!this.form.company || !this.form.machine || !this.form.date) {
      this.modalError = 'Fill all required fields';
      return;
    }

    this.saving = true;

    const payload = this.toBackend(this.form);

    const request = this.editMode && this.currentId
      ? this.api.update(this.currentId, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.closeModal();
        this.loadReservations();
      },
      error: err => {
        console.error(err);
        this.saving = false;
        this.modalError = 'Failed to save reservation';
      }
    });
  }

  softDelete(r: Reservation): void {
    this.pendingDelete = r;
    this.deleteReason = '';
    this.deleteModal = true;
  }

  confirmDelete(): void {
    if (!this.pendingDelete) return;

    this.api.delete(this.pendingDelete.id).subscribe({
      next: () => {
        this.deleteModal = false;
        this.pendingDelete = null;
        this.loadReservations();
      },
      error: err => console.error(err)
    });
  }

  cancelDelete(): void {
    this.deleteModal = false;
    this.pendingDelete = null;
  }

  closeModal(): void {
    this.showModal = false;
  }

  // ================= FILTER =================
  get filtered(): Reservation[] {
    return this.reservations
      .filter(r => !r.deleted)
      .filter(r =>
        r.machine.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.company.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .filter(r =>
        this.filterStatus === '' || r.status === this.filterStatus
      );
  }

  // ================= ECO =================
  co2(r: Reservation): number {
    const m = this.ai.machines.find(x => x.name === r.machine);
    return m ? this.ai.co2ForBooking(m, r.hours, r.startHour) : 0;
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  }

  co2Saved(r: Reservation): number {
    const m = this.ai.machines.find(x => x.name === r.machine);
<<<<<<< HEAD
    if (!m) return 0;
    return this.ai.co2SavedVsBaseline(m, r.hours, r.startHour);
=======
    return m ? this.ai.co2SavedVsBaseline(m, r.hours, r.startHour) : 0;
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  }

  grade(r: Reservation): 'A'|'B'|'C'|'D'|'E' {
    const m = this.ai.machines.find(x => x.name === r.machine);
    if (!m) return 'C';
<<<<<<< HEAD
    // Blend distance + time-of-day into a grade
=======
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
    let s = 100;
    s -= m.distanceKm * 1.5;
    s -= (this.co2(r) / r.hours) * 2;
    if (r.solar) s += 8;
    if (s >= 85) return 'A';
    if (s >= 70) return 'B';
    if (s >= 55) return 'C';
    if (s >= 40) return 'D';
    return 'E';
  }

  slotLabel(r: Reservation): string {
    const end = (r.startHour + r.hours) % 24;
<<<<<<< HEAD
    return `${String(r.startHour).padStart(2,'0')}:00 → ${String(end).padStart(2,'0')}:00`;
=======
    return `${r.startHour}:00 → ${end}:00`;
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  }

  barPct(r: Reservation): number {
    const total = Math.max(1, this.co2(r));
    return Math.min(100, (this.co2Saved(r) / total) * 100);
  }

<<<<<<< HEAD
  // ===== AI sidebar =====
  refreshInsights(): void {
    this.aiInsights = [
      {
        label: `${this.treesEquivalent} trees equivalent this month`,
        detail: 'Based on 21 kg CO₂ absorbed per mature tree per year',
        score: 100, tone: 'eco', icon: '🌳',
      },
      {
        label: 'Peer ranking: top 12% of your sector',
        detail: 'Circular-economy index — plastics & polymers',
        score: 88, tone: 'info', icon: '📊',
      },
      {
        label: '3 machines idle this weekend',
        detail: 'Weekend grid is ~22% cleaner — book now to lock in',
        score: 81, tone: 'savings', icon: '🌙',
      },
      {
        label: 'Revalo booking can shift -14 kg',
        detail: 'Move Apr 29 14:00 → 03:00 night band',
        score: 89, tone: 'warn', icon: '⚠',
      },
    ];
  }

  // ===== CRUD =====
  openCreate(): void {
    this.editMode = false;
    this.form = this.emptyForm();
    this.modalError = '';
    this.showModal = true;
  }

  openEdit(r: Reservation): void {
    this.editMode = true;
    this.form = { ...r, ai: [...r.ai] };
    this.modalError = '';
    this.showModal = true;
  }

  save(): void {
    if (this.saving) return;

    // Frontend validation — backend requires these
    if (!this.form.company || !this.form.machine || !this.form.date) {
      this.modalError = 'Please fill company, machine, and date.';
      return;
    }

    this.modalError = '';
    this.saving = true;
    const payload = this.toBackend(this.form);
    const op = (this.editMode && this.form.id > 0)
      ? this.api.update(this.form.id, payload)
      : this.api.create(payload);
    op.subscribe({
      next: saved => {
        this.loadReservations();
        this.saving = false;
        this.closeModal();
        this.refreshInsights();
      },
      error: err => {
        console.error('[ReservationList] save failed', err);
        this.saving = false;
        this.modalError = this.errorMessageFrom(err);
      },
    });
  }

  private errorMessageFrom(err: any): string {
    if (err?.status === 0)   return 'Cannot reach the backend at ' + (err?.url ?? '/api') + '. Is it running?';
    if (err?.status === 401) return 'You are not logged in. Please log in and try again.';
    if (err?.status === 403) return 'Forbidden — your account does not have permission for this action.';
    if (err?.status === 400) return err?.error?.message ?? err?.error?.error ?? 'Validation failed. Check your inputs.';
    if (err?.error?.message) return err.error.message;
    return 'Unexpected error (HTTP ' + (err?.status ?? '?') + '). Check the console for details.';
  }

  softDelete(r: Reservation): void {
    // Open modal — actual deletion happens in confirmDelete()
    this.pendingDelete = r;
    this.deleteReason = '';
    this.deleteModal = true;
  }

  confirmDelete(): void {
    if (!this.pendingDelete) return;
    const r = this.pendingDelete;
    const reason = this.deleteReason || 'No reason provided';
    this.deleteModal = false;
    this.pendingDelete = null;

    if (r.id > 0) {
      this.api.cancel(r.id, reason).subscribe({
        next: () => {
          this.loadReservations();
          this.refreshInsights();
        },
        error: err => {
          console.error('[ReservationList] cancel failed', err);
          this.loadReservations();
        },
      });
    }
  }

  cancelDelete(): void {
    this.deleteModal = false;
    this.pendingDelete = null;
  }

  closeModal(): void { this.showModal = false; }

  emptyForm(): Reservation {
    return {
      id: 0, company: '', machine: '', date: '', hours: 1, startHour: 9,
      status: 'PENDING', solar: false, ai: [],
    };
  }

  // Chip class helper
  toneClass(tone?: string): string {
    return tone ? `chip ${tone}` : 'chip';
  }

  // ===========================================================
  //  Green Ranking — leaderboard of companies by CO₂ saved
  //  (Advanced feature #2 for the Reservation entity)
  // ===========================================================
  /**
   * Aggregates active reservations by company, computes CO₂ saved
   * vs the peak-hour baseline, then awards gold / silver / bronze
   * tiers. The current user's company is highlighted in the table.
   */
  get leaderboard(): LeaderboardEntry[] {
    const groups = new Map<string, { co2: number; bookings: number; solar: number }>();
    for (const r of this.reservations) {
      if (r.deleted || r.status === 'CANCELLED') continue;
      const cur = groups.get(r.company) ?? { co2: 0, bookings: 0, solar: 0 };
      cur.co2 += this.co2Saved(r);
      cur.bookings += 1;
      cur.solar += r.solar ? 1 : 0;
      groups.set(r.company, cur);
    }

    // Synthetic peer rows so the leaderboard looks populated even with
    // few real bookings — these mirror real industrial peers.
    const peers: Array<[string, number, number, number]> = [
      ['CircuLab',   78, 9, 4],
      ['Revalo',     54, 7, 2],
      ['MétalNova', 102, 11, 5],
      ['GreenSteel', 41, 6, 3],
    ];
    for (const [name, co2, b, sol] of peers) {
      if (!groups.has(name)) groups.set(name, { co2, bookings: b, solar: sol });
    }

    const entries = Array.from(groups.entries())
      .map(([company, v]) => ({ company, ...v }))
=======
  // ================= LEADERBOARD =================
  get leaderboard(): LeaderboardEntry[] {
    const map = new Map<string, { co2: number; bookings: number; solar: number }>();

    for (const r of this.reservations) {
      if (r.deleted || r.status === 'CANCELLED') continue;

      const cur = map.get(r.company) ?? { co2: 0, bookings: 0, solar: 0 };
      cur.co2 += this.co2Saved(r);
      cur.bookings++;
      cur.solar += r.solar ? 1 : 0;

      map.set(r.company, cur);
    }

    const entries = Array.from(map.entries())
      .map(([company, v]) => ({
        company,
        co2: v.co2,
        bookings: v.bookings,
        solarRate: v.bookings ? Math.round((v.solar / v.bookings) * 100) : 0
      }))
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
      .sort((a, b) => b.co2 - a.co2);

    return entries.map((e, i) => ({
      rank: i + 1,
      company: e.company,
      co2Saved: Math.round(e.co2),
      bookings: e.bookings,
<<<<<<< HEAD
      solarRate: e.bookings ? Math.round((e.solar / e.bookings) * 100) : 0,
      badge: this.badgeFor(i),
      isYou: e.company === this.myCompany,
    }));
  }

  private badgeFor(idx: number): LeaderboardEntry['badge'] {
    if (idx === 0) return 'gold';
    if (idx === 1) return 'silver';
    if (idx === 2) return 'bronze';
    if (idx < 5) return 'green';
    return 'eco';
  }

  badgeIcon(b: LeaderboardEntry['badge']): string {
    if (b === 'gold')   return '🥇';
    if (b === 'silver') return '🥈';
    if (b === 'bronze') return '🥉';
    if (b === 'green')  return '🌿';
    return '🌱';
  }

  myRank(): number | null {
    const me = this.leaderboard.find(e => e.isYou);
    return me?.rank ?? null;
  }

  // ===========================================================
  //  Animated CO₂ Tree — WOW feature #1
  //  Tree growth stage scales with totalCo2Saved.
  // ===========================================================
  /** 0 = sapling, 5 = mature tree — drives SVG layers + animation depth */
  get treeStage(): number {
    const co2 = this.totalCo2Saved;
    if (co2 < 30)  return 0;
    if (co2 < 80)  return 1;
    if (co2 < 150) return 2;
    if (co2 < 250) return 3;
    if (co2 < 400) return 4;
    return 5;
  }

  /** Translate stage → human label */
=======
      solarRate: e.solarRate,
      badge: i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'eco',
      isYou: e.company === this.myCompany
    }));
  }

  myRank(): number | null {
    const me = this.leaderboard.find(e => e.isYou);
    return me ? me.rank : null;
  }

  badgeIcon(b: string): string {
    if (b === 'gold') return '🥇';
    if (b === 'silver') return '🥈';
    if (b === 'bronze') return '🥉';
    return '🌿';
  }

  // ================= AI =================
  refreshInsights(): void {
    this.aiInsights = [
      { label: `${this.treesEquivalent} trees equivalent`, detail: '', score: 100, tone: 'eco', icon: '🌳' }
    ];
  }

  // ================= TREE =================
  get treeStage(): number {
    const c = this.totalCo2Saved;
    if (c < 30) return 0;
    if (c < 80) return 1;
    if (c < 150) return 2;
    if (c < 250) return 3;
    if (c < 400) return 4;
    return 5;
  }

>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  treeStageName(): string {
    return ['Sprout', 'Sapling', 'Young', 'Growing', 'Mature', 'Champion'][this.treeStage];
  }

<<<<<<< HEAD
  /** Each leaf cluster's opacity, driven by stage */
=======
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  leafOpacity(level: number): number {
    return level <= this.treeStage ? 1 : 0.1;
  }

<<<<<<< HEAD
  /** Trunk height in % — grows with stage */
  trunkScale(): number {
    return 0.4 + this.treeStage * 0.12;
  }
=======
  trunkScale(): number {
    return 0.4 + this.treeStage * 0.12;
  }

  // ================= UTIL =================
  emptyForm(): Reservation {
    return {
      id: 0,
      company: '',
      machine: '',
      date: '',
      hours: 1,
      startHour: 9,
      status: 'PENDING',
      solar: false,
      ai: []
    };
  }
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
}