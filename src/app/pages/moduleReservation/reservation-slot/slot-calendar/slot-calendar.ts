import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AiSuggestionsService, ScenarioResult, SlotInfo } from '../../shared/ai-suggestions.service';
import { ReservationSlotApiService, BackendReservationSlot } from '../../shared/api/reservation-slot-api.service';
import { ReservationApiService, BackendReservation } from '../../shared/api/reservation-api.service';

type ScenarioId = 'cheapest' | 'greenest' | 'fastest';

interface SelectedSlot {
  id: number;
  date: string;
  hour: number;
  endHour: number;
  demand: 'low' | 'medium' | 'high';
  solar: boolean;
  grid: number;
  cost: number;
  co2: number;
  risk: 'low' | 'medium' | 'high';
  confidence: number;
  aiRec: string;
  status: 'open' | 'booked' | 'blocked';
}

interface HeatmapSlot extends SlotInfo {
  id: number | null;
  endHour: number;
  status: 'open' | 'booked' | 'blocked';
  demandCount: number;
  demandLevel: 'low' | 'medium' | 'high';
  recommendation: string;
  isOptimal: boolean;
  reservationCount: number;
}

interface InsightItem {
  label: string;
  value: string;
  message: string;
  tone: 'red' | 'orange' | 'yellow' | 'green' | 'blue';
}

@Component({
  selector: 'app-slot-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './slot-calendar.html',
})
export class SlotCalendar implements OnInit {
  machineName = 'Injection Molder X2';
  hours = 4;
  weekStart: Date = new Date();
  weekLabel = '';

  weekGrid: HeatmapSlot[][] = [];
  hourBandLabels = ['00-04', '04-08', '08-12', '12-16', '16-20', '20-24'];

  scenarios: ScenarioResult[] = [];
  activeScenario: ScenarioId = 'greenest';
  selected: SelectedSlot | null = null;
  hovered: HeatmapSlot | null = null;
  toastMsg = '';

  private reservations: BackendReservation[] = [];

  constructor(
    public ai: AiSuggestionsService,
    private slotApi: ReservationSlotApiService,
    private reservationApi: ReservationApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.machineName = this.ai.machines[0]?.name ?? this.machineName;
    this.weekStart = this.ai.startOfWeek();
    this.rebuild();
  }

  rebuild(): void {
    this.updateWeekLabel();
    this.slotApi.list(false).subscribe({
      next: rows => {
        this.reservationApi.list(false).subscribe({
          next: reservations => {
            this.reservations = reservations.filter(r => !r.deleted && r.status !== 'CANCELLED');
            this.buildGrid(rows);
            this.scenarios = this.ai.computeScenarios(this.machineName, this.hours, this.weekStart)
              .filter(s => this.hasOpenCellForScenario(s));
            this.applyScenario(this.activeScenario);
          },
          error: err => {
            console.error('[SlotCalendar] failed to load reservations', err);
            this.reservations = [];
            this.buildGrid(rows);
            this.scenarios = this.ai.computeScenarios(this.machineName, this.hours, this.weekStart)
              .filter(s => this.hasOpenCellForScenario(s));
            this.applyScenario(this.activeScenario);
          },
        });
      },
      error: err => {
        console.error('[SlotCalendar] failed to load slots', err);
        this.weekGrid = this.ai.buildWeek(this.weekStart, this.hours).map(row =>
          row.map(slot => ({
            ...slot,
            id: null,
            endHour: slot.hour + 4,
            status: 'blocked',
            demandCount: 0,
            demandLevel: 'low',
            recommendation: 'No backend slot available in this window.',
            isOptimal: false,
            reservationCount: 0,
          })),
        );
        this.scenarios = [];
      },
    });
  }

  private buildGrid(rows: BackendReservationSlot[]): void {
    const week = this.ai.buildWeek(this.weekStart, this.hours);
    this.weekGrid = week.map(row =>
      row.map(cell => {
        const match = rows.find(slot =>
          !slot.deleted &&
          slot.machine === this.machineName &&
          slot.date === cell.date &&
          slot.startHour >= cell.hour &&
          slot.startHour < cell.hour + 4,
        );

        const density = match ? this.reservationDensity(match) : { count: 0, exactCount: 0 };
        const demandLevel = this.demandLevelFor(density.count);

        return {
          ...cell,
          id: match?.id ?? null,
          endHour: match?.endHour ?? cell.hour + 4,
          solar: match?.solar ?? cell.solar,
          status: match?.status ?? 'blocked',
          demandCount: density.count,
          demandLevel,
          recommendation: match
            ? this.recommendationFor(match, demandLevel)
            : 'No backend slot available in this window.',
          isOptimal: match ? this.isOptimalSlot(match, demandLevel) : false,
          reservationCount: density.exactCount,
        };
      }),
    );
  }

  get insightCards(): InsightItem[] {
    const openSlots = this.weekGrid.flat().filter(slot => slot.status === 'open');
    if (!openSlots.length) {
      return [
        {
          label: 'Availability',
          value: 'No open slots',
          message: 'All current windows are booked or blocked.',
          tone: 'red',
        },
      ];
    }

    const peak = [...openSlots].sort((a, b) => b.demandCount - a.demandCount)[0];
    const quiet = [...openSlots].sort((a, b) => a.demandCount - b.demandCount || a.hour - b.hour)[0];
    const eco = openSlots.filter(slot => slot.solar && slot.demandLevel === 'low');
    const best = this.bestRecommendation();

    return [
      {
        label: 'Peak congestion',
        value: this.rangeLabel(peak),
        message: `${peak.demandCount} reservation(s) align with this window.`,
        tone: 'orange',
      },
      {
        label: 'Least busy',
        value: this.rangeLabel(quiet),
        message: `Low demand between ${this.hourLabel(quiet.hour)} and ${this.hourLabel(quiet.endHour)} -> good opportunity.`,
        tone: 'green',
      },
      {
        label: 'Eco-efficient',
        value: eco.length ? `${eco.length} slot(s)` : 'None',
        message: eco.length
          ? 'Solar + low demand windows are available this week.'
          : 'No solar low-demand windows detected this week.',
        tone: 'blue',
      },
      {
        label: 'Best recommendation',
        value: best ? this.rangeLabel(best) : 'No recommendation',
        message: best ? best.recommendation : 'No open slot matches the current criteria.',
        tone: best?.isOptimal ? 'blue' : 'yellow',
      },
    ];
  }

  get peakHoursLabel(): string {
    const openSlots = this.weekGrid.flat().filter(slot => slot.status === 'open');
    if (!openSlots.length) return 'No peak hours';
    const maxDemand = Math.max(...openSlots.map(slot => slot.demandCount));
    const peaks = openSlots.filter(slot => slot.demandCount === maxDemand && maxDemand > 0);
    return peaks.length ? peaks.map(slot => this.rangeLabel(slot)).join(', ') : 'No peak hours';
  }

  get leastBusyHoursLabel(): string {
    const openSlots = this.weekGrid.flat().filter(slot => slot.status === 'open');
    if (!openSlots.length) return 'No open hours';
    const minDemand = Math.min(...openSlots.map(slot => slot.demandCount));
    const quiet = openSlots.filter(slot => slot.demandCount === minDemand).slice(0, 3);
    return quiet.map(slot => this.rangeLabel(slot)).join(', ');
  }

  get ecoEfficientLabel(): string {
    const eco = this.weekGrid.flat().filter(slot => slot.status === 'open' && slot.solar && slot.demandLevel === 'low');
    return eco.length ? eco.map(slot => this.rangeLabel(slot)).slice(0, 3).join(', ') : 'No eco-efficient slot';
  }

  bestRecommendation(): HeatmapSlot | null {
    const openSlots = this.weekGrid.flat().filter(slot => slot.status === 'open');
    if (!openSlots.length) return null;
    return [...openSlots].sort((a, b) => this.slotScore(b) - this.slotScore(a))[0] ?? null;
  }

  updateWeekLabel(): void {
    const end = new Date(this.weekStart);
    end.setDate(end.getDate() + 6);
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    this.weekLabel = `${this.weekStart.toLocaleDateString('en-US', opts)} -> ${end.toLocaleDateString('en-US', opts)}`;
  }

  prevWeek(): void {
    const d = new Date(this.weekStart);
    d.setDate(d.getDate() - 7);
    this.weekStart = d;
    this.rebuild();
  }

  nextWeek(): void {
    const d = new Date(this.weekStart);
    d.setDate(d.getDate() + 7);
    this.weekStart = d;
    this.rebuild();
  }

  onMachineChange(): void {
    this.rebuild();
  }

  onHoursChange(): void {
    if (this.hours < 1) this.hours = 1;
    if (this.hours > 8) this.hours = 8;
    this.rebuild();
  }

  pickCell(day: number, bandIdx: number): void {
    const slot = this.weekGrid[day][bandIdx];
    if (!slot.id) {
      return;
    }

    const machine = this.ai.machines.find(m => m.name === this.machineName);
    if (!machine) {
      return;
    }

    const startHour = slot.hour;
    let cost = 0;
    let co2 = 0;
    for (let i = 0; i < this.hours; i++) {
      const h = (startHour + i) % 24;
      cost += this.ai.priceForHour(h);
      const intensity = this.ai.gridIntensity(h);
      const solarOffset = this.ai.solarFactor(h) * 0.6;
      co2 += (machine.kwhPerHour * intensity * (1 - solarOffset)) / 1000;
    }

    const confidence = slot.isOptimal ? 96 : slot.solar ? 90 : slot.demandLevel === 'low' ? 82 : 70;
    const risk: 'low' | 'medium' | 'high' =
      slot.status === 'booked' ? 'high' : slot.demandLevel === 'high' ? 'high' : slot.demandLevel === 'medium' ? 'medium' : 'low';

    this.selected = {
      id: slot.id,
      date: slot.date,
      hour: startHour,
      endHour: Math.min(24, startHour + this.hours),
      demand: slot.demandLevel,
      solar: slot.solar,
      grid: slot.gridIntensity,
      cost: Math.round(cost),
      co2: Math.round(co2 * 10) / 10,
      risk,
      confidence,
      aiRec: `${this.describeSlot(slot)} | ${slot.recommendation}`,
      status: slot.status,
    };
  }

  applyScenario(id: ScenarioId): void {
    this.activeScenario = id;
    const scenario = this.scenarios.find(item => item.id === id);
    if (!scenario) return;

    const [dayToken, range] = scenario.slotLabel.split(' ');
    const startHour = Number.parseInt(range.slice(0, 2), 10);
    const dayIdx = this.weekGrid.findIndex(row => this.ai.dayName(new Date(row[0].date)) === dayToken);
    if (dayIdx < 0) return;

    const bandIdx = Math.floor(startHour / 4);
    const candidate = this.weekGrid[dayIdx]?.[bandIdx];
    if (candidate?.id) {
      this.pickCell(dayIdx, bandIdx);
    }
  }

  reserveSelectedSlot(): void {
    if (!this.selected?.id) {
      return;
    }

    this.router.navigate(['/enterprise/new-reservation'], {
      queryParams: {
        slotId: String(this.selected.id),
        machine: this.machineName,
        date: this.selected.date,
        startHour: String(this.selected.hour),
        hours: String(this.hours),
        solar: String(this.selected.solar),
      },
    });
  }

  isSelectedCell(day: number, bandIdx: number): boolean {
    if (!this.selected) return false;
    const slot = this.weekGrid[day][bandIdx];
    return slot.id === this.selected.id;
  }

  dayLabel(row: HeatmapSlot[]): string {
    return this.ai.dayName(new Date(row[0].date));
  }

  dayNum(row: HeatmapSlot[]): number {
    return new Date(row[0].date).getDate();
  }

  isToday(row: HeatmapSlot[]): boolean {
    return new Date(row[0].date).toDateString() === new Date().toDateString();
  }

  cellClass(s: HeatmapSlot): string {
    return `cell demand-${s.demand}${s.solar ? ' solar' : ''}`;
  }

  onCellHover(day: number, bandIdx: number): void {
    this.hovered = this.weekGrid[day][bandIdx] ?? null;
  }

  clearHover(): void {
    this.hovered = null;
  }

  cellDisplayColor(slot: HeatmapSlot): string {
    if (slot.status === 'booked') return '#ef4444';
    if (slot.status === 'blocked') return '#94a3b8';
    if (slot.isOptimal) return '#3b82f6';
    if (slot.demandLevel === 'high') return '#f97316';
    if (slot.demandLevel === 'medium') return '#facc15';
    return '#22c55e';
  }

  cellBorderColor(slot: HeatmapSlot): string {
    if (this.selected?.id && slot.id === this.selected.id) return '#111827';
    return slot.solar ? '#0f766e' : '#d1d5db';
  }

  statusLabel(slot: HeatmapSlot): string {
    return slot.status.toUpperCase();
  }

  demandLabel(slot: HeatmapSlot): string {
    return `${slot.demandLevel} (${slot.demandCount})`;
  }

  hoverSummary(slot: HeatmapSlot): string {
    return `${slot.date} | ${this.rangeLabel(slot)} | ${this.statusLabel(slot)} | demand ${slot.demandLevel} | solar ${slot.solar ? 'yes' : 'no'} | ${slot.recommendation}`;
  }

  peakBadge(slot: HeatmapSlot): string {
    if (slot.isOptimal) return 'AI';
    if (slot.demandLevel === 'high') return 'Peak';
    if (slot.solar) return 'Solar';
    return '';
  }

  selectedDetails(): HeatmapSlot | null {
    if (!this.selected) return null;
    return this.weekGrid.flat().find(slot => slot.id === this.selected?.id) ?? null;
  }

  selectedCo2Saved(): number {
    if (!this.selected) return 0;
    const machine = this.ai.machines.find(m => m.name === this.machineName);
    if (!machine) return 0;
    const baseline = this.ai.co2ForBooking(machine, this.hours, 18);
    return Math.max(0, Math.round((baseline - this.selected.co2) * 10) / 10);
  }

  lowDemandCount(): number {
    return this.weekGrid.flat().filter(s => s.status === 'open' && s.demandLevel === 'low').length;
  }

  solarCount(): number {
    return this.weekGrid.flat().filter(s => s.status === 'open' && s.solar).length;
  }

  avgIntensity(): number {
    const flat = this.weekGrid.flat().filter(s => s.status === 'open');
    return Math.round(flat.reduce((sum, slot) => sum + slot.gridIntensity, 0) / Math.max(1, flat.length));
  }

  private reservationDensity(slot: BackendReservationSlot): { count: number; exactCount: number } {
    const bandStart = slot.startHour;
    const bandEnd = slot.endHour;
    const exactCount = this.reservations.filter(reservation => reservation.slotId === slot.id).length;
    const count = this.reservations.filter(reservation => {
      if (reservation.machine !== slot.machine) return false;
      const reservationStart = reservation.startHour ?? bandStart;
      const reservationEnd = reservationStart + (reservation.hours ?? 1);
      const sameBand =
        Math.abs(reservationStart - bandStart) <= 2 ||
        this.overlaps(reservationStart, reservationEnd, bandStart, bandEnd);
      return sameBand;
    }).length;

    return { count, exactCount };
  }

  private demandLevelFor(count: number): 'low' | 'medium' | 'high' {
    if (count >= 3) return 'high';
    if (count >= 1) return 'medium';
    return 'low';
  }

  private recommendationFor(slot: BackendReservationSlot, demandLevel: 'low' | 'medium' | 'high'): string {
    if (slot.status === 'booked') return 'Already booked.';
    if (slot.status === 'blocked') return 'Unavailable because this slot is blocked.';
    if (slot.solar && demandLevel === 'low') return 'Low demand with solar support -> best eco opportunity.';
    if (demandLevel === 'high') return 'Peak demand detected -> reserve quickly if needed.';
    if (demandLevel === 'medium') return 'Moderate activity -> viable if the timing fits.';
    return 'Low demand window -> good opportunity.';
  }

  private isOptimalSlot(slot: BackendReservationSlot, demandLevel: 'low' | 'medium' | 'high'): boolean {
    return slot.status === 'open' && slot.solar && demandLevel === 'low';
  }

  private overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
    return aStart < bEnd && aEnd > bStart;
  }

  private slotScore(slot: HeatmapSlot): number {
    let score = 0;
    if (slot.status !== 'open') return -999;
    if (slot.solar) score += 3;
    if (slot.isOptimal) score += 5;
    if (slot.demandLevel === 'low') score += 3;
    if (slot.demandLevel === 'medium') score += 1;
    score -= slot.demandCount;
    score -= slot.gridIntensity / 100;
    return score;
  }

  private hourLabel(hour: number): string {
    return `${String(hour).padStart(2, '0')}:00`;
  }

  rangeLabel(slot: HeatmapSlot): string {
    return `${this.hourLabel(slot.hour)}-${this.hourLabel(slot.endHour)}`;
  }

  private hasOpenCellForScenario(scenario: ScenarioResult): boolean {
    const [dayToken, range] = scenario.slotLabel.split(' ');
    const startHour = Number.parseInt(range.slice(0, 2), 10);
    const dayIdx = this.weekGrid.findIndex(row => this.ai.dayName(new Date(row[0].date)) === dayToken);
    if (dayIdx < 0) return false;
    const bandIdx = Math.floor(startHour / 4);
    const candidate = this.weekGrid[dayIdx]?.[bandIdx];
    return !!candidate && !!candidate.id && candidate.status === 'open';
  }

  private describeSlot(slot: HeatmapSlot): string {
    const reasons: string[] = [];
    if (slot.demandLevel === 'low') reasons.push('low peer demand');
    if (slot.demandLevel === 'high') reasons.push('peak congestion');
    if (slot.solar) reasons.push('solar availability');
    if (slot.gridIntensity < 60) reasons.push('clean grid window');
    if (!reasons.length) reasons.push('stable operating window');
    return reasons.join(' + ');
  }
}
