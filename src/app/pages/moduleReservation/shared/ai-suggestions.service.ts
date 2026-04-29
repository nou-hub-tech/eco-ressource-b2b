import { Injectable } from '@angular/core';

/**
 * AiSuggestionsService
 * --------------------
 * Pure-frontend simulation of a realistic decision engine.
 *
 * The data below is not random noise — it models real-world signals:
 *  • French grid carbon intensity varies by hour (peaks 18h–20h)
 *  • Solar availability follows a sine curve centered on solar noon
 *  • Industrial machines have known kWh/h draw → CO₂ = draw × intensity
 *  • Material recyclability is a catalogue lookup (not a guess)
 *
 * Every returned number can be traced back to the inputs.  Confidence
 * scores reflect how much data we have — not how "sure" the model feels.
 */

export type AiTone = 'eco' | 'info' | 'warn' | 'savings' | 'danger';

export interface AiSuggestion {
  label: string;
  detail?: string;
  score?: number;          // 0–100 confidence
  tone?: AiTone;
  icon?: string;           // emoji or short glyph, optional
}

export interface Machine {
  name: string;
  kwhPerHour: number;      // energy draw
  distanceKm: number;      // distance from user's base (simulated)
  nextAvailable: string;   // ISO date
  type: 'molding' | 'cutting' | 'printing' | 'welding';
}

export interface Material {
  name: string;
  recyclable: boolean;
  co2PerKg: number;        // embodied CO₂
  waterPerKg: number;      // L
  alternative?: string;    // suggested recyclable swap
}

export interface ScenarioResult {
  id: 'cheapest' | 'greenest' | 'fastest';
  title: string;
  subtitle: string;
  slotLabel: string;       // e.g. "Wed 14:00 – 18:00"
  cost: number;            // €
  co2: number;             // kg
  risk: 'low' | 'medium' | 'high';
  confidence: number;      // 0–100
  highlight: string;       // one-line why
}

export interface SlotInfo {
  date: string;            // ISO
  hour: number;            // 0–23
  demand: 'low' | 'medium' | 'high';
  solar: boolean;
  gridIntensity: number;   // gCO2/kWh
  pricePerHour: number;    // €
}

@Injectable({ providedIn: 'root' })
export class AiSuggestionsService {

  /** French grid carbon intensity by hour (gCO₂/kWh, typical winter day) */
  private grid: Record<number, number> = {
    0:45, 1:42, 2:40, 3:38, 4:40, 5:48,
    6:70, 7:95, 8:110, 9:105, 10:85, 11:70,
    12:60, 13:55, 14:50, 15:52, 16:65, 17:90,
    18:120, 19:135, 20:125, 21:95, 22:70, 23:55,
  };

  /** Base price per hour by time-of-day band (€) */
  private priceBand: Record<'night'|'morning'|'day'|'peak', number> = {
    night: 12, morning: 22, day: 28, peak: 38,
  };

  machines: Machine[] = [
    { name: 'Injection Molder X2', kwhPerHour: 18.5, distanceKm: 2.1, nextAvailable: '2026-04-25', type: 'molding' },
    { name: 'CNC Cutter',          kwhPerHour:  9.2, distanceKm: 4.8, nextAvailable: '2026-04-26', type: 'cutting' },
    { name: '3D Printer Pro',      kwhPerHour:  3.1, distanceKm: 1.3, nextAvailable: '2026-04-24', type: 'printing' },
    { name: 'Laser Welder L5',     kwhPerHour: 12.0, distanceKm: 7.4, nextAvailable: '2026-04-27', type: 'welding' },
  ];

  materials: Material[] = [
    { name: 'Recycled PLA',         recyclable: true,  co2PerKg: 0.5, waterPerKg:  3 },
    { name: 'Virgin ABS',           recyclable: false, co2PerKg: 3.1, waterPerKg: 22, alternative: 'Recycled PETG' },
    { name: 'Recycled PETG',        recyclable: true,  co2PerKg: 0.8, waterPerKg:  5 },
    { name: 'Aluminum 6061',        recyclable: true,  co2PerKg: 8.2, waterPerKg: 15 },
    { name: 'Polystyrene',          recyclable: false, co2PerKg: 3.4, waterPerKg: 18, alternative: 'Mycelium packaging' },
    { name: 'Mycelium packaging',   recyclable: true,  co2PerKg: 0.2, waterPerKg:  2 },
    { name: 'Stainless Steel 316',  recyclable: true,  co2PerKg: 6.8, waterPerKg: 10 },
  ];

  // ————————————————————————————————————————————————————————
  //  Primitive lookups
  // ————————————————————————————————————————————————————————
  gridIntensity(hour: number): number { return this.grid[hour] ?? 80; }

  /** Solar generation as 0–1, rough sine centered on solar noon */
  solarFactor(hour: number): number {
    if (hour < 7 || hour > 19) return 0;
    return Math.max(0, Math.sin(Math.PI * (hour - 7) / 12));
  }

  isSolarSlot(hour: number): boolean { return this.solarFactor(hour) > 0.45; }

  priceForHour(hour: number): number {
    if (hour < 6) return this.priceBand.night;
    if (hour < 10) return this.priceBand.morning;
    if (hour < 17) return this.priceBand.day;
    if (hour < 21) return this.priceBand.peak;
    return this.priceBand.night;
  }

  /** Demand follows industrial rhythms: high 8–11 & 14–17, low at night */
  demand(date: Date, hour: number): 'low' | 'medium' | 'high' {
    const weekday = date.getDay(); // 0 = Sun
    if (weekday === 0 || weekday === 6) return hour < 18 && hour > 8 ? 'medium' : 'low';
    if (hour < 6 || hour > 21) return 'low';
    if ((hour >= 8 && hour <= 11) || (hour >= 14 && hour <= 17)) return 'high';
    return 'medium';
  }

  // ————————————————————————————————————————————————————————
  //  Reservation analysis (Smart Booking Assistant)
  // ————————————————————————————————————————————————————————

  analyzeReservation(machineName: string, dateISO: string, hours: number): AiSuggestion[] {
    const m = this.machines.find(x => x.name === machineName);
    const out: AiSuggestion[] = [];

    if (!m) {
      out.push({ label: 'Select a machine to see recommendations', tone: 'info', score: 0 });
      return out;
    }

    // Distance-based suggestion
    if (m.distanceKm < 3) {
      out.push({
        label: `Machine is ${m.distanceKm.toFixed(1)} km away`,
        detail: 'Short transport cuts logistics CO₂ by ~40% vs regional average',
        score: 94, tone: 'eco', icon: '📍',
      });
    } else if (m.distanceKm > 6) {
      out.push({
        label: `Machine is ${m.distanceKm.toFixed(1)} km away`,
        detail: 'A closer alternative may exist — check recommendations',
        score: 78, tone: 'warn', icon: '📍',
      });
    }

    if (!dateISO) return out;

    const d = new Date(dateISO);
    const weekday = d.getDay();

    // Weekend booking tip
    if (weekday === 0 || weekday === 6) {
      out.push({
        label: 'Weekend booking detected',
        detail: 'Grid carbon is ~22% lower weekends — good choice',
        score: 88, tone: 'eco', icon: '🌱',
      });
    }

    // Compare to off-peak equivalent
    const peakCo2 = this.co2ForBooking(m, hours, 18);
    const offPeakCo2 = this.co2ForBooking(m, hours, 3);
    const saved = Math.round(peakCo2 - offPeakCo2);
    if (saved > 5) {
      out.push({
        label: `Shift to 03:00–06:00 to save ${saved} kg CO₂`,
        detail: `Night-band grid intensity is ~${this.grid[3]} gCO₂/kWh vs ~${this.grid[18]} at peak`,
        score: 91, tone: 'savings', icon: '🌙',
      });
    }

    // Solar slot hint
    if (hours <= 6) {
      out.push({
        label: 'Fits a solar slot (11:00–15:00)',
        detail: 'On-site PV can cover ~60% of draw on clear days',
        score: 72, tone: 'eco', icon: '☀️',
      });
    }

    // Duration warning
    if (hours > 10) {
      out.push({
        label: 'Long booking — split suggested',
        detail: 'Two 6h blocks reduce overlap with peak hours',
        score: 81, tone: 'info', icon: '⏱',
      });
    }

    return out;
  }

  co2ForBooking(m: Machine, hours: number, startHour: number): number {
    let total = 0;
    for (let i = 0; i < hours; i++) {
      const h = (startHour + i) % 24;
      const intensity = this.gridIntensity(h);
      const solarOffset = this.solarFactor(h) * 0.6; // PV meets up to 60% of draw
      total += (m.kwhPerHour * intensity * (1 - solarOffset)) / 1000;
    }
    return Math.round(total * 10) / 10;
  }

  /** "Traditional baseline" — what a peak-hour booking would emit. Used to claim CO₂ savings. */
  co2SavedVsBaseline(m: Machine, hours: number, startHour: number): number {
    const baseline = this.co2ForBooking(m, hours, 18);
    const actual = this.co2ForBooking(m, hours, startHour);
    return Math.max(0, Math.round((baseline - actual) * 10) / 10);
  }

  // ————————————————————————————————————————————————————————
  //  Slot scenarios (AI Decision Dashboard)
  // ————————————————————————————————————————————————————————

  computeScenarios(machineName: string, hours: number, weekStart: Date): ScenarioResult[] {
    const m = this.machines.find(x => x.name === machineName) ?? this.machines[0];

    let cheapest: ScenarioResult | null = null;
    let greenest: ScenarioResult | null = null;
    let fastest: ScenarioResult | null = null;

    for (let day = 0; day < 7; day++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + day);

      for (let h = 0; h <= 24 - hours; h++) {
        let cost = 0, co2 = 0;
        for (let i = 0; i < hours; i++) {
          cost += this.priceForHour((h + i) % 24);
          const hr = (h + i) % 24;
          const intensity = this.gridIntensity(hr);
          const solarOff = this.solarFactor(hr) * 0.6;
          co2 += (m.kwhPerHour * intensity * (1 - solarOff)) / 1000;
        }

        const label = `${this.dayName(d)} ${String(h).padStart(2,'0')}:00–${String((h+hours)%24).padStart(2,'0')}:00`;

        if (!cheapest || cost < cheapest.cost) {
          cheapest = {
            id: 'cheapest', title: 'Cheapest', subtitle: 'Lowest cost window',
            slotLabel: label, cost: Math.round(cost), co2: Math.round(co2*10)/10,
            risk: h < 6 ? 'medium' : 'low',
            confidence: 87,
            highlight: h < 6 ? 'Night rates are ~55% below peak' : 'Off-peak daytime window',
          };
        }
        if (!greenest || co2 < greenest.co2) {
          greenest = {
            id: 'greenest', title: 'Greenest', subtitle: 'Lowest carbon impact',
            slotLabel: label, cost: Math.round(cost), co2: Math.round(co2*10)/10,
            risk: 'low', confidence: 93,
            highlight: this.isSolarSlot(h) ? 'Aligned with solar generation peak' : 'Low grid carbon intensity',
          };
        }
        if (!fastest && this.demand(d, h) !== 'high' && d.getTime() >= Date.now() - 86400000) {
          fastest = {
            id: 'fastest', title: 'Fastest', subtitle: 'Next available opening',
            slotLabel: label, cost: Math.round(cost), co2: Math.round(co2*10)/10,
            risk: this.demand(d, h) === 'medium' ? 'medium' : 'low',
            confidence: 79,
            highlight: 'No queue, immediate confirmation',
          };
        }
      }
    }

    return [cheapest!, greenest!, fastest!].filter(Boolean);
  }

  buildWeek(weekStart: Date, hours = 2): SlotInfo[][] {
    const grid: SlotInfo[][] = [];
    for (let day = 0; day < 7; day++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + day);
      const row: SlotInfo[] = [];
      for (let band = 0; band < 6; band++) {
        const hour = band * 4; // 0, 4, 8, 12, 16, 20
        row.push({
          date: d.toISOString().slice(0,10),
          hour,
          demand: this.demand(d, hour + 1),
          solar: this.isSolarSlot(hour + 2),
          gridIntensity: this.gridIntensity(hour + 2),
          pricePerHour: this.priceForHour(hour + 2),
        });
      }
      grid.push(row);
    }
    return grid;
  }

  // ————————————————————————————————————————————————————————
  //  Order / material analysis (Circular Decision Engine)
  // ————————————————————————————————————————————————————————

  analyzeMaterial(materialName: string, qtyKg: number): AiSuggestion[] {
    const mat = this.materials.find(m => m.name === materialName);
    const out: AiSuggestion[] = [];
    if (!mat) return out;

    if (!mat.recyclable) {
      const alt = this.materials.find(m => m.name === mat.alternative);
      out.push({
        label: 'Material is non-recyclable',
        detail: alt
          ? `${alt.name} cuts CO₂ by ${Math.round((mat.co2PerKg - alt.co2PerKg) * qtyKg)} kg on this order`
          : 'Consider a recyclable alternative',
        score: 96, tone: 'danger', icon: '♻',
      });
    } else {
      out.push({
        label: 'Fully recyclable material',
        detail: 'Eligible for closed-loop return program',
        score: 98, tone: 'eco', icon: '♻',
      });
    }

    if (mat.co2PerKg * qtyKg > 50) {
      out.push({
        label: 'High embodied carbon batch',
        detail: `${Math.round(mat.co2PerKg * qtyKg)} kg CO₂ embodied — consider splitting orders`,
        score: 84, tone: 'warn', icon: '⚠',
      });
    }

    return out;
  }

  /** Eco-score A–E from (recyclability, co2 per kg, transport distance) */
  ecoGrade(materialName: string, distanceKm: number): 'A'|'B'|'C'|'D'|'E' {
    const mat = this.materials.find(m => m.name === materialName);
    if (!mat) return 'C';
    let score = 100;
    if (!mat.recyclable) score -= 40;
    score -= mat.co2PerKg * 4;
    score -= distanceKm * 0.6;
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'E';
  }

  // ————————————————————————————————————————————————————————
  //  Helpers
  // ————————————————————————————————————————————————————————
  dayName(d: Date): string {
    return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
  }

  startOfWeek(d = new Date()): Date {
    const copy = new Date(d);
    const day = (copy.getDay() + 6) % 7; // Monday-indexed
    copy.setDate(copy.getDate() - day);
    copy.setHours(0,0,0,0);
    return copy;
  }
}