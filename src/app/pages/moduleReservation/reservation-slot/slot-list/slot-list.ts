import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AiSuggestionsService } from '../../shared/ai-suggestions.service';
import { ReservationSlot, SlotStatus } from '../../shared/models/slot.model';
import { SlotStore } from '../slot.store';

interface SlotAi {
  demandPct: number;       // 0–100, predicted demand
  cancelPct: number;       // 0–100, cancellation probability
  shareTip: string;        // "share this slot" suggestion
  tone: 'eco' | 'warn' | 'danger';
}

@Component({
  selector: 'app-slot-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './slot-list.html',
  styleUrls: ['./slot-list.css'],
})
export class SlotList implements OnInit {

  // ===== Filters =====
  searchTerm = '';
  filterStatus: SlotStatus | '' = '';
  filterMachine = '';
  showSolarOnly = false;
  sortBy: 'date' | 'discount' | 'demand' = 'date';

  // ===== Modals =====
  deleteModal = false;
  pendingDelete: ReservationSlot | null = null;
  deleteReason = '';

  // ===== Data =====
  get slots(): ReservationSlot[] { return this.store.all(); }

  constructor(public ai: AiSuggestionsService, public store: SlotStore, private router: Router) {}

  ngOnInit(): void {
    this.store.seedIfEmpty();
  }

  // ===== Filtered list =====
  get filtered(): ReservationSlot[] {
    const list = this.slots
      .filter(s => !s.deleted)
      .filter(s => {
        const q = this.searchTerm.toLowerCase();
        return !q ||
          s.machine.toLowerCase().includes(q) ||
          s.owner.toLowerCase().includes(q) ||
          (s.reservedBy ?? '').toLowerCase().includes(q);
      })
      .filter(s => this.filterStatus === '' || s.status === this.filterStatus)
      .filter(s => !this.filterMachine || s.machine === this.filterMachine)
      .filter(s => !this.showSolarOnly || s.solar);

    return [...list].sort((a, b) => {
      if (this.sortBy === 'discount') return b.discountPct - a.discountPct;
      if (this.sortBy === 'demand') return this.aiFor(b).demandPct - this.aiFor(a).demandPct;
      return a.date.localeCompare(b.date) || (a.startHour - b.startHour);
    });
  }

  // ===== KPIs =====
  get totalSlots(): number { return this.slots.filter(s => !s.deleted).length; }
  get openSlots(): number { return this.slots.filter(s => !s.deleted && s.status === 'OPEN').length; }
  get bookedSlots(): number { return this.slots.filter(s => !s.deleted && s.status === 'BOOKED').length; }
  get solarSlots(): number { return this.slots.filter(s => !s.deleted && s.solar).length; }
  get utilisationPct(): number {
    if (this.totalSlots === 0) return 0;
    return Math.round((this.bookedSlots / this.totalSlots) * 100);
  }
  get avgDiscount(): number {
    const withDiscount = this.slots.filter(s => !s.deleted && s.discountPct > 0);
    if (!withDiscount.length) return 0;
    return Math.round(withDiscount.reduce((a, b) => a + b.discountPct, 0) / withDiscount.length);
  }

  // ===== AI per slot =====
  /** EcoSlotAI — demand + cancellation prediction + share tip */
  aiFor(s: ReservationSlot): SlotAi {
    const d = new Date(s.date);
    const demandLevel = this.ai.demand(d, s.startHour);
    const baseDemand = demandLevel === 'high' ? 82 : demandLevel === 'medium' ? 56 : 28;
    // Add deterministic noise based on slot id so values are stable across renders
    const noise = ((s.id % 7) - 3) * 3;
    const demandPct = Math.max(8, Math.min(98, baseDemand + noise));

    // Cancellation likelihood — high demand windows churn more, weekends less
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    let cancelPct = demandLevel === 'high' ? 22 : demandLevel === 'medium' ? 14 : 9;
    if (isWeekend) cancelPct -= 4;
    if (s.solar) cancelPct -= 3;
    cancelPct = Math.max(3, cancelPct + ((s.id % 5) - 2));

    // Share tip — surface when slot is underutilised but eco-friendly
    let shareTip = '';
    let tone: SlotAi['tone'] = 'eco';
    if (s.status === 'OPEN' && demandPct < 35 && s.solar) {
      shareTip = 'Share this solar slot — peers nearby are looking';
      tone = 'eco';
    } else if (s.status === 'OPEN' && demandPct > 70) {
      shareTip = 'High demand — confirm soon or expect competition';
      tone = 'warn';
    } else if (s.status === 'OPEN' && demandPct >= 35 && demandPct <= 70) {
      shareTip = 'Steady demand — consider sharing with a peer to split cost';
      tone = 'eco';
    } else if (s.status === 'BOOKED' && cancelPct > 18) {
      shareTip = 'Cancellation risk — keep a backup slot ready';
      tone = 'warn';
    } else if (s.status === 'BLOCKED') {
      shareTip = 'Maintenance window — exclude from booking flows';
      tone = 'danger';
    } else {
      shareTip = 'Healthy slot — no action needed';
      tone = 'eco';
    }

    return { demandPct, cancelPct, shareTip, tone };
  }

  // ===== Display helpers =====
  windowLabel(s: ReservationSlot): string {
    return `${String(s.startHour).padStart(2, '0')}:00 → ${String(s.endHour).padStart(2, '0')}:00`;
  }

  durationHours(s: ReservationSlot): number {
    return Math.max(1, s.endHour - s.startHour);
  }

  isPast(s: ReservationSlot): boolean {
    return new Date(s.date) < new Date(new Date().toISOString().slice(0, 10));
  }

  demandClass(pct: number): string {
    if (pct >= 70) return 'demand-high';
    if (pct >= 40) return 'demand-med';
    return 'demand-low';
  }

  // ===== CRUD =====
  goCreate(): void { this.router.navigate(['/enterprise/new-slot']); }
  goEdit(s: ReservationSlot): void { this.router.navigate(['/enterprise/edit-slot', s.id]); }

  askDelete(s: ReservationSlot): void {
    this.pendingDelete = s;
    this.deleteReason = '';
    this.deleteModal = true;
  }

  confirmDelete(): void {
    if (!this.pendingDelete) return;
    this.store.softDelete(this.pendingDelete.id, this.deleteReason || 'No reason provided');
    this.deleteModal = false;
    this.pendingDelete = null;
  }

  cancelDelete(): void {
    this.deleteModal = false;
    this.pendingDelete = null;
  }

  toggleStatus(s: ReservationSlot): void {
    const next: SlotStatus = s.status === 'OPEN' ? 'BLOCKED' : 'OPEN';
    this.store.update(s.id, { status: next });
  }
}
