import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AiSuggestionsService, AiSuggestion, Machine } from '../../shared/ai-suggestions.service';
import {
  ReservationApiService,
  ReservationCreateRequest,
} from '../../shared/api/reservation-api.service';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reservation-form.html',
  styleUrls: ['./reservation-form.css'],
})
export class ReservationForm implements OnInit {
  step = 1;
  totalSteps = 4;

  form = {
    company: '',
    machine: '',
    date: '',
    startHour: 9,
    hours: 4,
    solar: false,
    slotId: null as number | null,
  };

  suggestions: AiSuggestion[] = [];
  alternatives: Machine[] = [];

  saving = false;
  errorMsg = '';

  constructor(
    public ai: AiSuggestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private api: ReservationApiService,
  ) {}

  ngOnInit(): void {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    this.form.date = d.toISOString().slice(0, 10);

    const qp = this.route.snapshot.queryParamMap;
    const machine = qp.get('machine');
    const company = qp.get('company');
    const date = qp.get('date');
    const startHour = qp.get('startHour');
    const hours = qp.get('hours');
    const solar = qp.get('solar');
    const slotId = qp.get('slotId');

    if (machine) this.form.machine = machine;
    if (company) this.form.company = company;
    if (date) this.form.date = date;
    if (startHour != null && !Number.isNaN(Number(startHour))) this.form.startHour = Number(startHour);
    if (hours != null && !Number.isNaN(Number(hours))) this.form.hours = Number(hours);
    if (solar != null) this.form.solar = solar === 'true';
    if (slotId != null && !Number.isNaN(Number(slotId))) this.form.slotId = Number(slotId);

    this.recompute();
  }

  next(): void {
    if (this.step < this.totalSteps && this.canAdvance()) this.step++;
    this.recompute();
  }

  back(): void {
    if (this.step > 1) this.step--;
    this.recompute();
  }

  jumpTo(s: number): void {
    if (s <= this.step) {
      this.step = s;
      this.recompute();
    }
  }

  canAdvance(): boolean {
    if (this.step === 1) return !!this.form.machine && !!this.form.company;
    if (this.step === 2) return !!this.form.date && this.form.hours > 0;
    return true;
  }

  recompute(): void {
    this.suggestions = this.ai.analyzeReservation(this.form.machine, this.form.date, this.form.hours);

    if (this.form.machine) {
      const current = this.ai.machines.find(m => m.name === this.form.machine);
      if (current) {
        this.alternatives = this.ai.machines
          .filter(m => m.type === current.type && m.name !== current.name)
          .sort((a, b) => a.distanceKm - b.distanceKm)
          .slice(0, 2);
      }
    }
  }

  selectedMachine(): Machine | undefined {
    return this.ai.machines.find(m => m.name === this.form.machine);
  }

  co2Total(): number {
    const m = this.selectedMachine();
    if (!m) return 0;
    return this.ai.co2ForBooking(m, this.form.hours, this.form.startHour);
  }

  co2Saved(): number {
    const m = this.selectedMachine();
    if (!m) return 0;
    return this.ai.co2SavedVsBaseline(m, this.form.hours, this.form.startHour);
  }

  costEstimate(): number {
    let c = 0;
    for (let i = 0; i < this.form.hours; i++) {
      c += this.ai.priceForHour((this.form.startHour + i) % 24);
    }
    return c;
  }

  waterSaved(): number {
    const m = this.selectedMachine();
    if (!m) return 0;
    return Math.round(this.form.hours * m.kwhPerHour * 0.3);
  }

  wasteSaved(): number {
    const m = this.selectedMachine();
    if (!m) return 0;
    return Math.round(this.form.hours * 0.8);
  }

  treesEquivalent(): number {
    return Math.max(1, Math.round(this.co2Saved() / 21));
  }

  ecoGrade(): 'A' | 'B' | 'C' | 'D' | 'E' {
    const m = this.selectedMachine();
    if (!m) return 'C';
    let s = 100;
    s -= m.distanceKm * 1.5;
    s -= (this.co2Total() / Math.max(1, this.form.hours)) * 2;
    if (this.form.startHour < 6 || this.form.startHour > 21) s += 8;
    if (s >= 85) return 'A';
    if (s >= 70) return 'B';
    if (s >= 55) return 'C';
    if (s >= 40) return 'D';
    return 'E';
  }

  get hourStrip(): { h: number; demand: 'low' | 'medium' | 'high'; solar: boolean }[] {
    if (!this.form.date) return [];
    const d = new Date(this.form.date);
    return Array.from({ length: 24 }, (_, h) => ({
      h,
      demand: this.ai.demand(d, h),
      solar: this.ai.isSolarSlot(h),
    }));
  }

  isInSelection(h: number): boolean {
    const end = this.form.startHour + this.form.hours;
    return h >= this.form.startHour && h < end;
  }

  pickHour(h: number): void {
    if (h + this.form.hours > 24) return;
    this.form.startHour = h;
    this.recompute();
  }

  swapToAlternative(alt: Machine): void {
    this.form.machine = alt.name;
    this.recompute();
  }

  confirm(): void {
    if (this.saving) return;
    this.saving = true;
    this.errorMsg = '';

    const payload: ReservationCreateRequest = {
      company: this.form.company,
      machine: this.form.machine,
      date: this.form.date,
      hours: this.form.hours,
      startHour: this.form.startHour,
      status: 'CONFIRMED',
      solar: this.form.solar,
      slotId: this.form.slotId,
      co2Saved: this.co2Saved(),
    };

    this.api.create(payload).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/enterprise/reservations']);
      },
      error: err => {
        console.error('[ReservationForm] create failed', err);
        this.saving = false;
        this.errorMsg =
          err?.status === 401
            ? 'Please log in before creating a reservation.'
            : err?.error?.message ?? 'Could not save the reservation. Try again.';
      },
    });
  }

  toneClass(s: AiSuggestion): string {
    return `chip ${s.tone ?? 'info'}`;
  }

  endHourStr(): string {
    const end = (this.form.startHour + this.form.hours) % 24;
    return String(end).padStart(2, '0');
  }
}
