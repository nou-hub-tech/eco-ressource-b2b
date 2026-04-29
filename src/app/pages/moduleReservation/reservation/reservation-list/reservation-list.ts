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
  co2SavedValue?: number | null;
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
    const draft: Reservation = {
      id: r.id,
      company: r.company,
      machine: r.machine,
      date: r.date,
      hours: r.hours ?? 1,
      startHour: r.startHour ?? 9,
      status: r.status,
      solar: r.solar ?? false,
      ai: [],
      deleted: r.deleted ?? false,
      cancelReason: r.cancelReason ?? undefined,
      slotId: r.slotId ?? null,
      enterpriseId: r.enterprise?.id ?? r.enterpriseId ?? null,
      co2SavedValue: r.co2Saved ?? null,
    };

    draft.ai = this.buildReservationAi(draft);
    return draft;
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
    const baseline = r.hours * 14;
    return Math.max(1, Math.round(r.solar ? baseline * 0.65 : baseline));
  }

  co2Saved(r: Reservation): number {
    if (r.co2SavedValue != null) {
      return Math.round(r.co2SavedValue);
    }
    const baseline = r.hours * 12;
    const proximityBoost = this.daysUntil(r.date) <= 3 ? 4 : 0;
    return Math.max(0, Math.round((r.solar ? baseline * 0.55 : baseline * 0.25) + proximityBoost));
  }

  grade(r: Reservation): 'A' | 'B' | 'C' | 'D' | 'E' {
    const saved = this.co2Saved(r);
    if (r.solar && saved >= 35) return 'A';
    if (saved >= 25) return 'B';
    if (saved >= 15) return 'C';
    if (saved >= 8) return 'D';
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
    const active = this.reservations.filter(r => !r.deleted && r.status !== 'CANCELLED');
    const urgent = active.filter(r => this.priorityFor(r) === 'high').length;
    const medium = active.filter(r => this.priorityFor(r) === 'medium').length;
    const solarRate = active.length ? Math.round((active.filter(r => r.solar).length / active.length) * 100) : 0;
    const avgSaved = active.length
      ? Math.round(active.reduce((sum, item) => sum + this.co2Saved(item), 0) / active.length)
      : 0;

    this.aiInsights = [
      {
        label: `${urgent} high-priority booking(s)`,
        detail: 'Priority is based on reservation date proximity and duration.',
        score: urgent ? 92 : 78,
        tone: urgent ? 'warn' : 'info',
        icon: 'Clock',
      },
      {
        label: `${solarRate}% of active bookings use solar support`,
        detail: 'Solar-backed reservations improve the eco score using backend solar flags.',
        score: Math.max(35, solarRate),
        tone: solarRate >= 50 ? 'eco' : 'info',
        icon: 'Sun',
      },
      {
        label: `${avgSaved} kg average CO2 saved`,
        detail: 'Computed from backend CO2 values when available, otherwise reservation hours and solar fields.',
        score: Math.min(98, 40 + avgSaved),
        tone: avgSaved >= 20 ? 'savings' : 'info',
        icon: 'Leaf',
      },
      {
        label: `${medium} medium-priority booking(s) to review`,
        detail: 'Longer bookings or near-term reservations are surfaced first.',
        score: medium ? 84 : 70,
        tone: 'warn',
        icon: 'Chart',
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
      co2SavedValue: null,
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

  private buildReservationAi(r: Reservation): { label: string; score?: number }[] {
    const priority = this.priorityFor(r);
    const saved = this.co2Saved(r);
    const days = this.daysUntil(r.date);

    return [
      {
        label: priority === 'high'
          ? `Priority: confirm within ${Math.max(0, days)} day(s)`
          : priority === 'medium'
            ? 'Priority: review this week'
            : 'Priority: low scheduling pressure',
        score: priority === 'high' ? 94 : priority === 'medium' ? 82 : 72,
      },
      {
        label: r.solar ? 'Solar-backed reservation' : 'Standard grid-backed reservation',
        score: r.solar ? 88 : 61,
      },
      {
        label: `${saved} kg CO2 saved on current booking`,
        score: Math.min(99, 45 + saved),
      },
    ];
  }

  private priorityFor(r: Reservation): 'high' | 'medium' | 'low' {
    const days = this.daysUntil(r.date);
    if (days <= 2 || r.hours >= 6) return 'high';
    if (days <= 7 || r.hours >= 3) return 'medium';
    return 'low';
  }

  private daysUntil(date: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    return Math.round((target.getTime() - today.getTime()) / 86400000);
  }
}
