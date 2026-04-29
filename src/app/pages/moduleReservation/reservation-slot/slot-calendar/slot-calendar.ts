import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AiSuggestionsService, ScenarioResult, SlotInfo } from '../../shared/ai-suggestions.service';
import { ReservationSlotApiService, BackendReservationSlot } from '../../shared/api/reservation-slot-api.service';

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
  hourBandLabels = ['00–04', '04–08', '08–12', '12–16', '16–20', '20–24'];

  scenarios: ScenarioResult[] = [];
  activeScenario: ScenarioId = 'greenest';
  selected: SelectedSlot | null = null;
  toastMsg = '';

  constructor(
    public ai: AiSuggestionsService,
    private slotApi: ReservationSlotApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.machineName = this.ai.machines[0]?.name ?? this.machineName;
    this.weekStart = this.ai.startOfWeek();
    this.rebuild();
  }

  rebuild(): void {
    this.updateWeekLabel();
    this.scenarios = this.ai.computeScenarios(this.machineName, this.hours, this.weekStart);
    this.slotApi.list(false).subscribe({
      next: rows => {
        this.buildGrid(rows);
        this.applyScenario(this.activeScenario);
      },
      error: err => {
        console.error('[SlotCalendar] failed to load slots', err);
        this.weekGrid = this.ai.buildWeek(this.weekStart, this.hours).map(row =>
          row.map(slot => ({
            ...slot,
            id: null,
            endHour: slot.hour + 4,
            status: 'blocked',
          })),
        );
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

        return {
          ...cell,
          id: match?.id ?? null,
          endHour: match?.endHour ?? cell.hour + 4,
          solar: match?.solar ?? cell.solar,
          status: match?.status ?? 'blocked',
        };
      }),
    );
  }

  updateWeekLabel(): void {
    const end = new Date(this.weekStart);
    end.setDate(end.getDate() + 6);
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    this.weekLabel = `${this.weekStart.toLocaleDateString('en-US', opts)} → ${end.toLocaleDateString('en-US', opts)}`;
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
    if (!slot.id || slot.status !== 'open') {
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

    const confidence = slot.solar ? 92 : slot.demand === 'low' ? 84 : 72;
    const risk = slot.demand === 'high' ? 'medium' : startHour < 6 ? 'medium' : 'low';

    this.selected = {
      id: slot.id,
      date: slot.date,
      hour: startHour,
      endHour: Math.min(24, startHour + this.hours),
      demand: slot.demand,
      solar: slot.solar,
      grid: slot.gridIntensity,
      cost: Math.round(cost),
      co2: Math.round(co2 * 10) / 10,
      risk,
      confidence,
      aiRec: this.describeSlot(slot),
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
    if (candidate?.id && candidate.status === 'open') {
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

  selectedCo2Saved(): number {
    if (!this.selected) return 0;
    const machine = this.ai.machines.find(m => m.name === this.machineName);
    if (!machine) return 0;
    const baseline = this.ai.co2ForBooking(machine, this.hours, 18);
    return Math.max(0, Math.round((baseline - this.selected.co2) * 10) / 10);
  }

  lowDemandCount(): number {
    return this.weekGrid.flat().filter(s => s.status === 'open' && s.demand === 'low').length;
  }

  solarCount(): number {
    return this.weekGrid.flat().filter(s => s.status === 'open' && s.solar).length;
  }

  avgIntensity(): number {
    const flat = this.weekGrid.flat().filter(s => s.status === 'open');
    return Math.round(flat.reduce((sum, slot) => sum + slot.gridIntensity, 0) / Math.max(1, flat.length));
  }

  private describeSlot(slot: HeatmapSlot): string {
    const reasons: string[] = [];
    if (slot.demand === 'low') reasons.push('low peer demand');
    if (slot.solar) reasons.push('solar availability');
    if (slot.gridIntensity < 60) reasons.push('clean grid window');
    if (!reasons.length) reasons.push('stable operating window');
    return reasons.join(' + ');
  }
}
