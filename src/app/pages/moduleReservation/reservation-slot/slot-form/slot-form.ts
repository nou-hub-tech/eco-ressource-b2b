import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AiSuggestionsService, AiSuggestion } from '../../shared/ai-suggestions.service';
import { ReservationSlot, SlotStatus } from '../../shared/models/slot.model';
import { SlotStore } from '../slot.store';
import {
  ReservationSlotApiService,
  BackendSlotStatus,
} from '../../shared/api/reservation-slot-api.service';

interface ValidationErrors {
  machine?: string;
  date?: string;
  startHour?: string;
  endHour?: string;
  range?: string;
  owner?: string;
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
    owner: '',
    reservedBy: undefined,
  };

  errors: ValidationErrors = {};

  // Live AI feedback
  liveAi: AiSuggestion[] = [];

  // Computed solar discount preview
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
      // Try store first, fall back to direct API fetch
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
              owner: s.owner,
              reservedBy: s.reservedBy ?? undefined,
              id: s.id,
              deleted: s.deleted ?? false,
            });
            this.recompute();
          },
          error: err => console.error('[SlotForm] failed to load slot', err),
        });
      }
    } else {
      // Default new-slot date = tomorrow at 9
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
      owner: s.owner ?? '',
      reservedBy: s.reservedBy,
    };
  }

  // ===== Validation =====
  validate(): boolean {
    const e: ValidationErrors = {};
    if (!this.form.machine) e.machine = 'Pick a machine';
    if (!this.form.date) e.date = 'Date is required';
    if (this.form.startHour < 0 || this.form.startHour > 23) e.startHour = 'Start must be 0–23';
    if (this.form.endHour < 1 || this.form.endHour > 24) e.endHour = 'End must be 1–24';
    if (this.form.endHour <= this.form.startHour) e.range = 'End must be after start';
    if (!this.form.owner.trim()) e.owner = 'Owner is required';
    this.errors = e;
    return Object.keys(e).length === 0;
  }

  // ===== Live computation =====
  recompute(): void {
    // Solar / discount logic — solar slots get a discount based on solar factor
    const midHour = Math.floor((this.form.startHour + this.form.endHour) / 2);
    const solarF = this.ai.solarFactor(midHour);
    const isSolarMid = this.ai.isSolarSlot(midHour);
    this.form.solar = isSolarMid;

    // Recommended discount: 10% base for solar + scaled by solar factor
    if (isSolarMid) {
      this.recommendedDiscount = Math.round(10 + solarF * 20);
    } else if (this.form.startHour < 6 || this.form.startHour >= 22) {
      // Night band — small off-peak discount
      this.recommendedDiscount = 12;
    } else {
      this.recommendedDiscount = 0;
    }

    // Build AI rail
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

    // Demand prediction
    const demand = this.ai.demand(d, midHour);
    if (demand === 'low') {
      out.push({
        label: 'Low-demand window — easy to share',
        detail: 'Peers in your sector are unlikely to compete for this slot',
        score: 86, tone: 'eco', icon: '🤝',
      });
    } else if (demand === 'high') {
      out.push({
        label: 'High-demand window detected',
        detail: 'Consider raising the discount to 0% or splitting into two slots',
        score: 79, tone: 'warn', icon: '🔥',
      });
    }

    // Solar
    if (this.form.solar) {
      out.push({
        label: 'Solar-aligned slot',
        detail: `On-site PV can offset ~${Math.round(this.ai.solarFactor(midHour) * 60)}% of draw`,
        score: 92, tone: 'eco', icon: '☀️',
      });
      out.push({
        label: `Recommended discount: -${this.recommendedDiscount}%`,
        detail: 'Encourages peers to favour low-carbon windows',
        score: 88, tone: 'savings', icon: '💸',
      });
    }

    // Duration
    if (dur > 8) {
      out.push({
        label: 'Long slot — consider splitting',
        detail: 'Two 4h slots get more bookings than one 8h slot',
        score: 74, tone: 'info', icon: '✂',
      });
    }
    if (dur < 2) {
      out.push({
        label: 'Very short slot',
        detail: 'Most operations need a minimum 2h block',
        score: 71, tone: 'warn', icon: '⏱',
      });
    }

    // Cancellation forecast
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const cancelRisk = demand === 'high' ? 22 : demand === 'medium' ? 14 : 9;
    const cancelAdj = cancelRisk - (isWeekend ? 4 : 0) - (this.form.solar ? 3 : 0);
    out.push({
      label: `Cancellation risk: ${cancelAdj}%`,
      detail: 'Lower for weekends and solar slots — peers commit more readily',
      score: 100 - cancelAdj * 2, tone: cancelAdj > 15 ? 'warn' : 'info', icon: '📉',
    });

    // Share suggestion
    if (this.form.status === 'OPEN' && demand !== 'high') {
      out.push({
        label: 'Eligible to broadcast to circular network',
        detail: 'Share this slot with 2 peers — splits cost & boosts utilisation',
        score: 83, tone: 'eco', icon: '📡',
      });
    }

    return out;
  }

  // ===== Quick presets =====
  applyPreset(preset: 'morning' | 'afternoon' | 'night' | 'solar-peak'): void {
    if (preset === 'morning')      { this.form.startHour =  8; this.form.endHour = 12; }
    if (preset === 'afternoon')    { this.form.startHour = 13; this.form.endHour = 17; }
    if (preset === 'night')        { this.form.startHour = 22; this.form.endHour = 24; }
    if (preset === 'solar-peak')   { this.form.startHour = 11; this.form.endHour = 15; }
    this.recompute();
  }

  // ===== Display helpers =====
  duration(): number { return Math.max(0, this.form.endHour - this.form.startHour); }

  /** Hour strip (0–23) — picks demand colour + solar marker */
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

  // ===== Submit =====
  submit(form: NgForm): void {
    if (!this.validate()) {
      // Scroll to first error
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
    setTimeout(() => this.router.navigate(['/enterprise/slot-management']), 900);
  }

  cancel(): void {
    this.router.navigate(['/enterprise/slot-management']);
  }
}
