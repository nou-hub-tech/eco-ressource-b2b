import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { RouterLink } from '@angular/router';
import { AiSuggestionsService, ScenarioResult, SlotInfo, Machine } from '../../shared/ai-suggestions.service';
=======
import { HttpClient } from '@angular/common/http';
import { AiSuggestionsService, ScenarioResult } from '../../shared/ai-suggestions.service';
import { AiService } from '../../../../../services/ai.service';
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e

type ScenarioId = 'cheapest' | 'greenest' | 'fastest';

interface SelectedSlot {
<<<<<<< HEAD
=======
  id: number;
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  date: string;
  hour: number;
  endHour: number;
  demand: 'low'|'medium'|'high';
  solar: boolean;
  grid: number;
  cost: number;
  co2: number;
  risk: 'low'|'medium'|'high';
  confidence: number;
  aiRec: string;
<<<<<<< HEAD
=======
  status: 'open' | 'booked' | 'blocked';
}

interface BackendSlot {
  id: number;
  machine: string;
  date: string;
  startHour: number;
  endHour: number;
  status: 'open' | 'booked' | 'blocked';
  solar: boolean;
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
}

@Component({
  selector: 'app-slot-calendar',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule, RouterLink],
=======
  imports: [CommonModule, FormsModule],
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  templateUrl: './slot-calendar.html',
  styleUrls: ['./slot-calendar.css'],
})
export class SlotCalendar implements OnInit {

  machineName = 'Injection Molder X2';
  hours = 4;
  weekStart: Date = new Date();
  weekLabel = '';

<<<<<<< HEAD
  // Heatmap: rows = days (7), cols = hour bands (6 of 4h each: 0-4, 4-8, 8-12, 12-16, 16-20, 20-24)
  weekGrid: SlotInfo[][] = [];
=======
  weekGrid: any[][] = [];
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  hourBandLabels = ['00–04', '04–08', '08–12', '12–16', '16–20', '20–24'];

  scenarios: ScenarioResult[] = [];
  activeScenario: ScenarioId = 'greenest';

  selected: SelectedSlot | null = null;

<<<<<<< HEAD
  // ===== Drag & drop =====
  /** Pending bookings that aren't assigned to a slot yet — draggable into the heatmap. */
  pendingBookings: { id: number; company: string; machine: string; hours: number }[] = [
    { id: 101, company: 'EcoPlast',   machine: 'Injection Molder X2', hours: 4 },
    { id: 102, company: 'CircuLab',   machine: '3D Printer Pro',      hours: 3 },
    { id: 103, company: 'GreenSteel', machine: 'CNC Cutter',          hours: 5 },
  ];

  /** When user drops a booking on a cell we record the assignment so the cell visualizes it. */
  assignments: Record<string, { booking: number; company: string }> = {};

  draggingId: number | null = null;
  hoverCellKey: string | null = null;
  toastMsg = '';

  constructor(public ai: AiSuggestionsService) {}
=======
  backendSlots: BackendSlot[] = [];

  aiBestSlotId: number | null = null;

  toastMsg = '';

  constructor(
    public ai: AiSuggestionsService,
    private http: HttpClient,
    private aiService: AiService
  ) {}
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e

  ngOnInit(): void {
    this.weekStart = this.ai.startOfWeek();
    this.rebuild();
  }

<<<<<<< HEAD
  rebuild(): void {
    this.weekGrid = this.ai.buildWeek(this.weekStart, this.hours);
    this.scenarios = this.ai.computeScenarios(this.machineName, this.hours, this.weekStart);
    this.updateWeekLabel();
    this.applyScenario(this.activeScenario);
=======
  // =========================================================
  // BUILD
  // =========================================================

  rebuild(): void {
    this.loadSlots();
    this.updateWeekLabel();
  }

  loadSlots(): void {
    this.http.get<BackendSlot[]>('/api/reservation-slots')
      .subscribe({
        next: (data) => {
          this.backendSlots = data;
          this.buildGridFromBackend();
          this.loadAiRecommendation(); // 🔥 AI hook
        },
        error: () => alert("Failed to load slots")
      });
  }

  // =========================================================
  // 🔥 AI INTEGRATION
  // =========================================================

  loadAiRecommendation(): void {

    this.aiService.getRecommendation()
      .subscribe({
        next: (res) => {

          this.aiBestSlotId = res.bestSlotId;

          this.highlightBestSlot();

        },
        error: () => {
          console.warn("AI recommendation failed");
        }
      });
  }

  highlightBestSlot(): void {

    if (!this.aiBestSlotId) return;

    for (let d = 0; d < this.weekGrid.length; d++) {
      for (let b = 0; b < this.weekGrid[d].length; b++) {

        const cell = this.weekGrid[d][b];

        if (cell.backendId === this.aiBestSlotId) {
          this.pickCell(d, b);
          return;
        }
      }
    }
  }

  isAiBest(s: any): boolean {
    return s.backendId === this.aiBestSlotId;
  }

  // =========================================================
  // GRID BUILD
  // =========================================================

  buildGridFromBackend(): void {

    const grid: any[][] = [];

    for (let d = 0; d < 7; d++) {

      const dayDate = new Date(this.weekStart);
      dayDate.setDate(dayDate.getDate() + d);

      const iso = dayDate.toISOString().split('T')[0];

      const row: any[] = [];

      for (let band = 0; band < 6; band++) {

        const start = band * 4;

        const slot = this.backendSlots.find(s =>
          s.date === iso &&
          s.startHour === start &&
          s.machine === this.machineName
        );

        if (slot) {
          row.push({
            date: slot.date,
            hour: slot.startHour,
            demand: 'low',
            solar: slot.solar,
            gridIntensity: this.ai.gridIntensity(slot.startHour),
            backendId: slot.id,
            status: slot.status
          });
        } else {
          row.push({
            date: iso,
            hour: start,
            demand: 'low',
            solar: false,
            gridIntensity: 100,
            backendId: null,
            status: 'blocked'
          });
        }
      }

      grid.push(row);
    }

    this.weekGrid = grid;
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
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

  onMachineChange(): void { this.rebuild(); }
<<<<<<< HEAD
  onHoursChange(): void { if (this.hours < 1) this.hours = 1; if (this.hours > 8) this.hours = 8; this.rebuild(); }

  // ===== Heatmap interactions =====
  pickCell(day: number, bandIdx: number): void {
    const slot = this.weekGrid[day][bandIdx];
    const m = this.ai.machines.find(x => x.name === this.machineName)!;
    const startHour = slot.hour + 1; // slight offset into band

    // Compute this slot's cost and CO₂ at the chosen duration
    let cost = 0, co2 = 0;
=======

  onHoursChange(): void {
    if (this.hours < 1) this.hours = 1;
    if (this.hours > 8) this.hours = 8;
    this.rebuild();
  }

  // =========================================================
  // PICK SLOT
  // =========================================================

  pickCell(day: number, bandIdx: number): void {

    const slot = this.weekGrid[day][bandIdx];

    if (!slot.backendId) {
      alert("No real slot here");
      return;
    }

    const m = this.ai.machines.find(x => x.name === this.machineName)!;
    const startHour = slot.hour + 1;

    let cost = 0, co2 = 0;

>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
    for (let i = 0; i < this.hours; i++) {
      const h = (startHour + i) % 24;
      cost += this.ai.priceForHour(h);
      const intensity = this.ai.gridIntensity(h);
      const solar = this.ai.solarFactor(h) * 0.6;
      co2 += (m.kwhPerHour * intensity * (1 - solar)) / 1000;
    }

<<<<<<< HEAD
    const risk = this.computeRisk(slot.demand, slot.hour);
    const confidence = this.computeConfidence(slot);
    const aiRec = this.explainSlot(slot, startHour);

    this.selected = {
=======
    this.selected = {
      id: slot.backendId,
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
      date: slot.date,
      hour: startHour,
      endHour: (startHour + this.hours) % 24,
      demand: slot.demand,
<<<<<<< HEAD
      solar: this.ai.isSolarSlot(startHour + Math.floor(this.hours/2)),
      grid: slot.gridIntensity,
      cost: Math.round(cost),
      co2: Math.round(co2 * 10) / 10,
      risk, confidence, aiRec,
    };
  }

  applyScenario(id: ScenarioId): void {
    this.activeScenario = id;
    const s = this.scenarios.find(x => x.id === id);
    if (!s) return;

    // Find the cell matching the scenario's day + band and select it
    const [dayToken, range] = s.slotLabel.split(' ');
    const startHour = parseInt(range.slice(0, 2), 10);
    const dayIdx = this.weekGrid.findIndex(row => {
      const d = new Date(row[0].date);
      return this.ai.dayName(d) === dayToken;
    });
    if (dayIdx < 0) return;
    const bandIdx = Math.floor(startHour / 4);

    this.pickCell(dayIdx, bandIdx);
  }

  // ===== Risk / confidence =====
  private computeRisk(demand: 'low'|'medium'|'high', hour: number): 'low'|'medium'|'high' {
    if (demand === 'high') return 'medium';
    if (hour < 5) return 'medium';      // night-shift dependency on remote ops
    return 'low';
  }

  private computeConfidence(s: SlotInfo): number {
    // Higher if we have more signals (solar + low demand = we're very sure)
    let c = 75;
    if (s.demand === 'low') c += 10;
    if (s.demand === 'high') c -= 12;
    if (s.solar) c += 8;
    return Math.max(40, Math.min(98, c));
  }

  private explainSlot(s: SlotInfo, startHour: number): string {
    const bits: string[] = [];
    if (s.demand === 'low') bits.push('low peer demand');
    if (s.solar) bits.push('solar availability');
    if (startHour < 6) bits.push('night-band grid (low carbon)');
    if (s.gridIntensity < 60) bits.push('clean grid window');
    if (bits.length === 0) bits.push('within standard operating range');
    return bits.join(' + ');
  }

  // ===== Cell helpers =====
=======
      solar: slot.solar,
      grid: slot.gridIntensity,
      cost: Math.round(cost),
      co2: Math.round(co2 * 10) / 10,
      risk: 'low',
      confidence: 85,
      aiRec: 'AI optimized slot',
      status: slot.status
    };
  }

  // =========================================================
  // BOOK
  // =========================================================

  reserveSelectedSlot(): void {

    if (!this.selected) return;

    this.http.post(`/api/reservations/with-slot/${this.selected.id}`, {})
      .subscribe({
        next: () => {
          this.toastMsg = "Reservation created successfully";
          setTimeout(() => this.toastMsg = "", 2500);
          this.rebuild();
        },
        error: (err) => {
          alert(err.error?.message || "Booking failed");
        }
      });
  }

  // =========================================================
  // HELPERS
  // =========================================================

>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  isSelectedCell(day: number, bandIdx: number): boolean {
    if (!this.selected) return false;
    const slot = this.weekGrid[day][bandIdx];
    return slot.date === this.selected.date && slot.hour === this.selected.hour - 1;
  }

<<<<<<< HEAD
  dayLabel(row: SlotInfo[]): string {
    const d = new Date(row[0].date);
    return this.ai.dayName(d);
  }

  dayNum(row: SlotInfo[]): number {
    return new Date(row[0].date).getDate();
  }

  isToday(row: SlotInfo[]): boolean {
    const d = new Date(row[0].date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }

  cellClass(s: SlotInfo): string {
    return `cell demand-${s.demand}${s.solar ? ' solar' : ''}`;
  }

  // Co2 saved for the currently selected slot, vs peak baseline
  selectedCo2Saved(): number {
    if (!this.selected) return 0;
    const m = this.ai.machines.find(x => x.name === this.machineName)!;
    const peak = this.ai.co2ForBooking(m, this.hours, 18);
    return Math.max(0, Math.round((peak - this.selected.co2) * 10) / 10);
  }

  // Quick stat helpers for the header
  lowDemandCount(): number {
    return this.weekGrid.flat().filter(s => s.demand === 'low').length;
  }
  solarCount(): number {
    return this.weekGrid.flat().filter(s => s.solar).length;
  }
=======
  dayLabel(row: any[]): string {
    return this.ai.dayName(new Date(row[0].date));
  }

  dayNum(row: any[]): number {
    return new Date(row[0].date).getDate();
  }

  isToday(row: any[]): boolean {
    return new Date(row[0].date).toDateString() === new Date().toDateString();
  }

  cellClass(s: any): string {
    return `cell demand-${s.demand}${s.solar ? ' solar' : ''}`;
  }

  lowDemandCount(): number {
    return this.weekGrid.flat().filter(s => s.demand === 'low').length;
  }

  solarCount(): number {
    return this.weekGrid.flat().filter(s => s.solar).length;
  }

>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  avgIntensity(): number {
    const flat = this.weekGrid.flat();
    return Math.round(flat.reduce((a, b) => a + b.gridIntensity, 0) / Math.max(1, flat.length));
  }

<<<<<<< HEAD
  // ===========================================================
  //  Drag & Drop — assign pending bookings to heatmap cells
  // ===========================================================
  cellKey(day: number, band: number): string { return `${day}:${band}`; }

  onDragStart(b: { id: number; company: string; machine: string; hours: number }, ev: DragEvent): void {
    this.draggingId = b.id;
    if (ev.dataTransfer) {
      ev.dataTransfer.effectAllowed = 'move';
      // Some browsers require some data to actually start a drag
      ev.dataTransfer.setData('text/plain', String(b.id));
    }
  }

  onDragEnd(): void {
    this.draggingId = null;
    this.hoverCellKey = null;
  }

  onCellDragOver(day: number, band: number, ev: DragEvent): void {
    ev.preventDefault();
    if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move';
    this.hoverCellKey = this.cellKey(day, band);
  }

  onCellDragLeave(): void {
    this.hoverCellKey = null;
  }

  onCellDrop(day: number, band: number, ev: DragEvent): void {
    ev.preventDefault();
    const id = this.draggingId ?? Number(ev.dataTransfer?.getData('text/plain'));
    if (!id) return;
    const booking = this.pendingBookings.find(b => b.id === id);
    if (!booking) return;

    // Auto-assign: pick the cell, run AI scoring, save assignment
    this.pickCell(day, band);
    this.assignments[this.cellKey(day, band)] = { booking: booking.id, company: booking.company };
    this.pendingBookings = this.pendingBookings.filter(b => b.id !== id);

    this.toastMsg = `${booking.company} → ${this.weekGrid[day][band].date} ${this.hourBandLabels[band]}`;
    setTimeout(() => (this.toastMsg = ''), 2400);

    this.draggingId = null;
    this.hoverCellKey = null;
  }

  cellAssignment(day: number, band: number): { booking: number; company: string } | null {
    return this.assignments[this.cellKey(day, band)] ?? null;
  }

  isHoverCell(day: number, band: number): boolean {
    return this.hoverCellKey === this.cellKey(day, band);
  }

  // ===========================================================
  //  Per-slot AI metrics for the heatmap (used in tooltip)
  // ===========================================================
  cellDemandPct(s: SlotInfo): number {
    if (s.demand === 'high') return 80;
    if (s.demand === 'medium') return 55;
    return 28;
  }

  cellShareTip(s: SlotInfo): string {
    if (s.demand === 'low' && s.solar) return '🤝 Share this solar slot — peers nearby';
    if (s.demand === 'low')             return '🤝 Quiet slot — share with a peer';
    if (s.demand === 'high')            return '⚠ High demand — book or share fast';
    return '— steady availability';
  }

  removePending(id: number): void {
    this.pendingBookings = this.pendingBookings.filter(b => b.id !== id);
=======
  applyScenario(id: ScenarioId): void {
    this.activeScenario = id;

    const s = this.scenarios.find(x => x.id === id);
    if (!s) return;

    const [dayToken, range] = s.slotLabel.split(' ');
    const startHour = parseInt(range.slice(0, 2), 10);

    const dayIdx = this.weekGrid.findIndex(row => {
      const d = new Date(row[0].date);
      return this.ai.dayName(d) === dayToken;
    });

    if (dayIdx < 0) return;

    const bandIdx = Math.floor(startHour / 4);
    this.pickCell(dayIdx, bandIdx);
>>>>>>> cda022fda5f1e71be1944f7d292072be3009713e
  }
}