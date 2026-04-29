import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AiSuggestionsService, AiSuggestion } from '../../shared/ai-suggestions.service';
import { ReservationSlot, SlotStatus } from '../../shared/models/slot.model';
import { SlotStore } from '../slot.store';
import { ReservationSlotApiService } from '../../shared/api/reservation-slot-api.service';

interface ValidationErrors {
  machine?: string;
  date?: string;
  startHour?: string;
  endHour?: string;
  range?: string;
}

@Component({
  selector: 'app-slot-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './slot-form.html',
  styleUrls: ['./slot-form.css'],
})
export class SlotForm implements OnInit {
  isEdit = false;
  editingId: number | null = null;
  saved = false;

  form: Omit<ReservationSlot, 'id'> = {
    machine: '',
    date: '',
    startHour: 9,
    endHour: 13,
    status: 'OPEN',
    solar: false,
    discountPct: 0,
    enterpriseId: null,
  };

  errors: ValidationErrors = {};
  liveAi: AiSuggestion[] = [];
  recommendedDiscount = 0;

  constructor(
    public ai: AiSuggestionsService,
    public store: SlotStore,
    private route: ActivatedRoute,
    private router: Router,
    private slotApi: ReservationSlotApiService,
  ) {}

  ngOnInit(): void {
    this.store.seedIfEmpty();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.editingId = Number(id);
      const existing = this.store.byId(this.editingId);
      if (existing) {
        this.applyToForm(existing);
      } else if (this.editingId > 0) {
        this.slotApi.getById(this.editingId).subscribe({
          next: s => {
            this.applyToForm({
              machine: s.machine,
              date: s.date,
              startHour: s.startHour,
              endHour: s.endHour,
              status: s.status.toUpperCase() as SlotStatus,
              solar: s.solar,
              discountPct: s.discountPct,
              enterpriseId: s.enterprise?.id ?? s.enterpriseId ?? null,
              id: s.id,
              deleted: s.deleted ?? false,
            });
            this.recompute();
          },
          error: err => console.error('[SlotForm] failed to load slot', err),
        });
      }
    } else {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      this.form.date = d.toISOString().slice(0, 10);
    }
    this.recompute();
  }

  private applyToForm(s: Partial<ReservationSlot>): void {
    this.form = {
      machine: s.machine ?? '',
      date: s.date ?? '',
      startHour: s.startHour ?? 9,
      endHour: s.endHour ?? 13,
      status: s.status ?? 'OPEN',
      solar: s.solar ?? false,
      discountPct: s.discountPct ?? 0,
      enterpriseId: s.enterpriseId ?? null,
    };
  }

  validate(): boolean {
    const e: ValidationErrors = {};
    if (!this.form.machine) e.machine = 'Pick a machine';
    if (!this.form.date) e.date = 'Date is required';
    if (this.form.startHour < 0 || this.form.startHour > 23) e.startHour = 'Start must be 0-23';
    if (this.form.endHour < 1 || this.form.endHour > 24) e.endHour = 'End must be 1-24';
    if (this.form.endHour <= this.form.startHour) e.range = 'End must be after start';
    this.errors = e;
    return Object.keys(e).length === 0;
  }

  recompute(): void {
    const midHour = Math.floor((this.form.startHour + this.form.endHour) / 2);
    const solarF = this.ai.solarFactor(midHour);
    const isSolarMid = this.ai.isSolarSlot(midHour);
    this.form.solar = isSolarMid;

    if (isSolarMid) {
      this.recommendedDiscount = Math.round(10 + solarF * 20);
    } else if (this.form.startHour < 6 || this.form.startHour >= 22) {
      this.recommendedDiscount = 12;
    } else {
      this.recommendedDiscount = 0;
    }

    this.liveAi = this.computeAiRail();
  }

  applyRecommendedDiscount(): void {
    this.form.discountPct = this.recommendedDiscount;
  }

  private computeAiRail(): AiSuggestion[] {
    const out: AiSuggestion[] = [];
    if (!this.form.machine || !this.form.date) {
      out.push({ label: 'Fill machine + date to unlock recommendations', tone: 'info', score: 0 });
      return out;
    }

    const d = new Date(this.form.date);
    const dur = Math.max(1, this.form.endHour - this.form.startHour);
    const midHour = Math.floor((this.form.startHour + this.form.endHour) / 2);
    const demand = this.ai.demand(d, midHour);

    if (demand === 'low') {
      out.push({
        label: 'Low-demand window - easy to share',
        detail: 'Peers in your sector are unlikely to compete for this slot',
        score: 86, tone: 'eco', icon: 'Share',
      });
    } else if (demand === 'high') {
      out.push({
        label: 'High-demand window detected',
        detail: 'Consider splitting into smaller windows or reducing discount',
        score: 79, tone: 'warn', icon: 'Fire',
      });
    }

    if (this.form.solar) {
      out.push({
        label: 'Solar-aligned slot',
        detail: `On-site PV can offset ~${Math.round(this.ai.solarFactor(midHour) * 60)}% of draw`,
        score: 92, tone: 'eco', icon: 'Sun',
      });
      out.push({
        label: `Recommended discount: -${this.recommendedDiscount}%`,
        detail: 'Encourages low-carbon reservations',
        score: 88, tone: 'savings', icon: 'Percent',
      });
    }

    if (dur > 8) {
      out.push({
        label: 'Long slot - consider splitting',
        detail: 'Two 4h slots often book faster than one long block',
        score: 74, tone: 'info', icon: 'Split',
      });
    }

    return out;
  }

  applyPreset(preset: 'morning' | 'afternoon' | 'night' | 'solar-peak'): void {
    if (preset === 'morning') { this.form.startHour = 8; this.form.endHour = 12; }
    if (preset === 'afternoon') { this.form.startHour = 13; this.form.endHour = 17; }
    if (preset === 'night') { this.form.startHour = 22; this.form.endHour = 24; }
    if (preset === 'solar-peak') { this.form.startHour = 11; this.form.endHour = 15; }
    this.recompute();
  }

  duration(): number {
    return Math.max(0, this.form.endHour - this.form.startHour);
  }

  get hourStrip() {
    if (!this.form.date) return [];
    const d = new Date(this.form.date);
    return Array.from({ length: 24 }, (_, h) => ({
      h,
      demand: this.ai.demand(d, h),
      solar: this.ai.isSolarSlot(h),
      inRange: h >= this.form.startHour && h < this.form.endHour,
    }));
  }

  pickHour(h: number): void {
    const dur = this.duration() || 4;
    if (h + dur > 24) return;
    this.form.startHour = h;
    this.form.endHour = h + dur;
    this.recompute();
  }

  submit(form: NgForm): void {
    if (!this.validate()) {
      setTimeout(() => {
        document.querySelector('.field-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 0);
      return;
    }

    if (this.isEdit && this.editingId) {
      this.store.update(this.editingId, this.form);
    } else {
      this.store.create(this.form);
    }
    this.saved = true;
    setTimeout(() => this.router.navigate(['/enterprise/slots']), 900);
  }

  cancel(): void {
    this.router.navigate(['/enterprise/slots']);
  }
}
