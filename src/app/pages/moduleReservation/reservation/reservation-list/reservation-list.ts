import { Component, OnInit } from '@angular/core';
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
  slotId?: number | null;
  enterpriseId?: number | null;
}

interface LeaderboardEntry {
  rank: number;
  company: string;
  co2Saved: number;
  bookings: number;
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
  searchTerm = '';
  filterStatus: Status | '' = '';
  sortBy: 'date' | 'co2' | 'hours' = 'date';
  showModal = false;
  editMode = false;

  deleteModal = false;
  pendingDelete: Reservation | null = null;
  deleteReason = '';

  myCompany = 'EcoPlast';
  form: Reservation = this.emptyForm();
  reservations: Reservation[] = [];
  loadError = '';
  modalError = '';
  saving = false;
  monthlyGoalKg = 500;
  aiInsights: AiSuggestion[] = [];

  constructor(
    public ai: AiSuggestionsService,
    private api: ReservationApiService,
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.api.list().subscribe({
      next: rows => {
        this.reservations = rows.map(r => this.fromBackend(r));
        this.refreshInsights();
      },
      error: err => {
        console.error('[ReservationList] failed to load', err);
        this.loadError =
          err?.status === 401
            ? 'Please log in to view your reservations.'
            : 'Could not reach the server. Showing the cached view.';
      },
    });
  }

  private fromBackend(r: BackendReservation): Reservation {
    return {
      id: r.id,
      company: r.company,
      machine: r.machine,
      date: r.date,
      hours: r.hours ?? 1,
      startHour: r.startHour ?? 9,
      status: r.status,
      solar: r.solar ?? false,
      ai: this.ai.analyzeReservation(r.machine, r.date, r.hours ?? 1),
      deleted: r.deleted ?? false,
      cancelReason: r.cancelReason ?? undefined,
      slotId: r.slotId ?? null,
      enterpriseId: r.enterprise?.id ?? r.enterpriseId ?? null,
    };
  }

  private toBackend(r: Reservation): ReservationCreateRequest {
    return {
      company: r.company,
      machine: r.machine,
      date: r.date,
      hours: r.hours,
      startHour: r.startHour,
      status: r.status,
      solar: r.solar,
      slotId: r.slotId ?? null,
      enterpriseId: r.enterpriseId ?? null,
      co2Saved: this.co2Saved(r),
    };
  }

  get filtered(): Reservation[] {
    const list = this.reservations
      .filter(r => !r.deleted)
      .filter(r => {
        const q = this.searchTerm.toLowerCase();
        return !q || r.machine.toLowerCase().includes(q) || r.company.toLowerCase().includes(q);
      })
      .filter(r => this.filterStatus === '' || r.status === this.filterStatus);

    return list.sort((a, b) => {
      if (this.sortBy === 'co2') return this.co2(b) - this.co2(a);
      if (this.sortBy === 'hours') return b.hours - a.hours;
      return a.date.localeCompare(b.date);
    });
  }

  get totalCo2Saved(): number {
    return this.reservations
      .filter(r => !r.deleted && r.status !== 'CANCELLED')
      .reduce((sum, r) => sum + this.co2Saved(r), 0);
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

  co2(r: Reservation): number {
    const m = this.ai.machines.find(x => x.name === r.machine);
    if (!m) return 0;
    return this.ai.co2ForBooking(m, r.hours, r.startHour);
  }

  co2Saved(r: Reservation): number {
    const m = this.ai.machines.find(x => x.name === r.machine);
    if (!m) return 0;
    return this.ai.co2SavedVsBaseline(m, r.hours, r.startHour);
  }

  grade(r: Reservation): 'A' | 'B' | 'C' | 'D' | 'E' {
    const m = this.ai.machines.find(x => x.name === r.machine);
    if (!m) return 'C';
    let s = 100;
    s -= m.distanceKm * 1.5;
    s -= (this.co2(r) / Math.max(1, r.hours)) * 2;
    if (r.solar) s += 8;
    if (s >= 85) return 'A';
    if (s >= 70) return 'B';
    if (s >= 55) return 'C';
    if (s >= 40) return 'D';
    return 'E';
  }

  slotLabel(r: Reservation): string {
    const end = (r.startHour + r.hours) % 24;
    return `${String(r.startHour).padStart(2, '0')}:00 -> ${String(end).padStart(2, '0')}:00`;
  }

  barPct(r: Reservation): number {
    const total = Math.max(1, this.co2(r));
    return Math.min(100, (this.co2Saved(r) / total) * 100);
  }

  refreshInsights(): void {
    this.aiInsights = [
      {
        label: `${this.treesEquivalent} trees equivalent this month`,
        detail: 'Based on 21 kg CO2 absorbed per mature tree per year',
        score: 100,
        tone: 'eco',
        icon: 'Tree',
      },
      {
        label: 'Peer ranking: top 12% of your sector',
        detail: 'Circular economy index based on active bookings',
        score: 88,
        tone: 'info',
        icon: 'Chart',
      },
      {
        label: 'Weekend slots remain cleaner',
        detail: 'Night and solar-aligned bookings improve your score fastest',
        score: 81,
        tone: 'savings',
        icon: 'Leaf',
      },
      {
        label: 'Reserve earlier for better optimization',
        detail: 'More lead time lets AI shift usage toward lower-carbon windows',
        score: 84,
        tone: 'warn',
        icon: 'Clock',
      },
    ];
  }

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
    if (!this.form.company || !this.form.machine || !this.form.date) {
      this.modalError = 'Please fill company, machine, and date.';
      return;
    }

    this.modalError = '';
    this.saving = true;
    const payload = this.toBackend(this.form);
    const op = this.editMode && this.form.id > 0
      ? this.api.update(this.form.id, payload)
      : this.api.create(payload);

    op.subscribe({
      next: () => {
        this.loadReservations();
        this.saving = false;
        this.closeModal();
      },
      error: err => {
        console.error('[ReservationList] save failed', err);
        this.saving = false;
        this.modalError = this.errorMessageFrom(err);
      },
    });
  }

  private errorMessageFrom(err: any): string {
    if (err?.status === 0) return 'Cannot reach the backend at ' + (err?.url ?? '/api') + '. Is it running?';
    if (err?.status === 401) return 'You are not logged in. Please log in and try again.';
    if (err?.status === 403) return 'Forbidden - your account does not have permission for this action.';
    if (err?.status === 400) return err?.error?.message ?? err?.error?.error ?? 'Validation failed. Check your inputs.';
    if (err?.error?.message) return err.error.message;
    return 'Unexpected error (HTTP ' + (err?.status ?? '?') + '). Check the console for details.';
  }

  softDelete(r: Reservation): void {
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
        next: () => this.loadReservations(),
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

  closeModal(): void {
    this.showModal = false;
  }

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
      ai: [],
      slotId: null,
      enterpriseId: null,
    };
  }

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

    const entries = Array.from(groups.entries())
      .map(([company, v]) => ({ company, ...v }))
      .sort((a, b) => b.co2 - a.co2);

    return entries.map((e, i) => ({
      rank: i + 1,
      company: e.company,
      co2Saved: Math.round(e.co2),
      bookings: e.bookings,
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
    if (b === 'gold') return 'Gold';
    if (b === 'silver') return 'Silver';
    if (b === 'bronze') return 'Bronze';
    if (b === 'green') return 'Green';
    return 'Eco';
  }

  myRank(): number | null {
    const me = this.leaderboard.find(e => e.isYou);
    return me?.rank ?? null;
  }

  get treeStage(): number {
    const co2 = this.totalCo2Saved;
    if (co2 < 30) return 0;
    if (co2 < 80) return 1;
    if (co2 < 150) return 2;
    if (co2 < 250) return 3;
    if (co2 < 400) return 4;
    return 5;
  }

  treeStageName(): string {
    return ['Sprout', 'Sapling', 'Young', 'Growing', 'Mature', 'Champion'][this.treeStage];
  }

  leafOpacity(level: number): number {
    return level <= this.treeStage ? 1 : 0.1;
  }

  trunkScale(): number {
    return 0.4 + this.treeStage * 0.12;
  }
}
