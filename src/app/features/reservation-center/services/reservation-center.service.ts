import { Injectable } from '@angular/core';
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import {
  BackendReservation,
  BackendReservationStatus,
} from '../../../pages/moduleReservation/shared/api/reservation-api.service';
import {
  BackendReservationSlot,
  BackendSlotStatus,
} from '../../../pages/moduleReservation/shared/api/reservation-slot-api.service';
import { BackendEcoOrder } from '../../../pages/moduleReservation/shared/api/eco-order-api.service';
import {
  OrderTrendPoint,
  PriceBreakdownLine,
  ResourceKind,
  ReservationConflict,
  ReservationRelations,
  ReservationTimelineItem,
  SlotCalendarCell,
  SlotCalendarMode,
  SlotHeatmapCell,
  UiReservationStatus,
} from '../models/reservation-center.models';

@Injectable({ providedIn: 'root' })
export class ReservationCenterService {
  readonly resourceKinds: ResourceKind[] = ['Machine', 'Space', 'Tool', 'Other'];

  getReservationRelations(
    reservation: BackendReservation,
    slots: BackendReservationSlot[],
  ): ReservationRelations {
    const slot = slots.find(candidate => candidate.id === reservation.slotId);

    return {
      consumerEnterpriseId: reservation.enterprise?.id ?? reservation.enterpriseId ?? null,
      providerEnterpriseId: slot?.enterprise?.id ?? slot?.enterpriseId ?? null,
    };
  }

  toUiReservationStatus(status: BackendReservationStatus): UiReservationStatus {
    if (status === 'CONFIRMED') {
      return 'CONFIRMED';
    }
    if (status === 'PENDING') {
      return 'PENDING';
    }
    return 'REJECTED';
  }

  fromUiReservationStatus(status: UiReservationStatus): BackendReservationStatus {
    if (status === 'CONFIRMED') {
      return 'CONFIRMED';
    }
    if (status === 'PENDING') {
      return 'PENDING';
    }
    return 'CANCELLED';
  }

  buildReservationTimeline(status: BackendReservationStatus): ReservationTimelineItem[] {
    const uiStatus = this.toUiReservationStatus(status);

    return [
      {
        label: 'Request created',
        status: 'done',
        description: 'The enterprise submitted a reservation request.',
      },
      {
        label: 'Provider review',
        status: uiStatus === 'PENDING' ? 'active' : 'done',
        description: 'The slot owner reviews the request and checks conflicts.',
      },
      {
        label: uiStatus === 'CONFIRMED' ? 'Confirmed' : 'Rejected',
        status: uiStatus === 'PENDING' ? 'idle' : 'done',
        description:
          uiStatus === 'CONFIRMED'
            ? 'The reservation can now generate an order.'
            : 'The request was declined or cancelled.',
      },
    ];
  }

  detectReservationConflict(
    reservation: BackendReservation,
    reservations: BackendReservation[],
    slots: BackendReservationSlot[],
  ): ReservationConflict {
    const blockingReservations = reservations.filter(candidate => {
      if (candidate.id === reservation.id || candidate.status === 'CANCELLED' || candidate.deleted) {
        return false;
      }

      if (reservation.slotId != null && candidate.slotId != null) {
        if (candidate.slotId !== reservation.slotId) {
          return false;
        }
      } else if (candidate.machine !== reservation.machine || candidate.date !== reservation.date) {
        return false;
      }

      return this.overlaps(
        reservation.startHour ?? 0,
        (reservation.startHour ?? 0) + (reservation.hours ?? 1),
        candidate.startHour ?? 0,
        (candidate.startHour ?? 0) + (candidate.hours ?? 1),
      );
    });

    if (!blockingReservations.length) {
      return { hasConflict: false, label: 'No conflicts', blockingReservations: [] };
    }

    const slot = slots.find(candidate => candidate.id === reservation.slotId);
    const label = slot?.status === 'booked'
      ? 'Slot already booked'
      : `${blockingReservations.length} overlapping request(s)`;

    return { hasConflict: true, label, blockingReservations };
  }

  buildSlotCalendar(
    slots: BackendReservationSlot[],
    reservations: BackendReservation[],
    mode: SlotCalendarMode,
    anchorDate: Date,
  ): SlotCalendarCell[] {
    const rangeStart = mode === 'week' ? startOfWeek(anchorDate, { weekStartsOn: 1 }) : startOfMonth(anchorDate);
    const rangeEnd = mode === 'week' ? endOfWeek(anchorDate, { weekStartsOn: 1 }) : endOfMonth(anchorDate);

    const cells: SlotCalendarCell[] = [];
    let cursor = rangeStart;

    while (cursor <= rangeEnd) {
      const date = format(cursor, 'yyyy-MM-dd');
      const daySlots = slots.filter(slot => slot.date === date);
      const dayReservations = reservations.filter(reservation => reservation.date === date);

      cells.push({
        date,
        label: format(cursor, mode === 'week' ? 'EEE d' : 'd MMM'),
        slotCount: daySlots.length,
        bookedCount: daySlots.filter(slot => slot.status === 'booked').length,
        openCount: daySlots.filter(slot => slot.status === 'open').length,
        pendingCount: dayReservations.filter(reservation => reservation.status === 'PENDING').length,
      });

      cursor = addDays(cursor, 1);
    }

    return cells;
  }

  buildHeatmap(
    slots: BackendReservationSlot[],
    reservations: BackendReservation[],
  ): SlotHeatmapCell[] {
    const dates = [...new Set(slots.map(slot => slot.date))].sort().slice(0, 10);
    const buckets = [
      { label: 'Morning', start: 6, end: 12 },
      { label: 'Afternoon', start: 12, end: 18 },
      { label: 'Evening', start: 18, end: 24 },
    ];

    return dates.flatMap(date =>
      buckets.map(bucket => {
        const scopedSlots = slots.filter(slot => slot.date === date && slot.startHour < bucket.end && slot.endHour > bucket.start);
        const scopedReservations = reservations.filter(
          reservation =>
            reservation.date === date &&
            (reservation.startHour ?? 0) < bucket.end &&
            ((reservation.startHour ?? 0) + (reservation.hours ?? 1)) > bucket.start,
        );

        const occupancy = scopedSlots.length
          ? Math.round((scopedSlots.filter(slot => slot.status !== 'open').length / scopedSlots.length) * 100)
          : 0;

        return {
          date,
          label: bucket.label,
          occupancy,
          reservationCount: scopedReservations.length,
          tone: occupancy >= 80 ? 'danger' : occupancy >= 45 ? 'warn' : scopedReservations.length > 0 ? 'info' : 'eco',
        };
      }),
    );
  }

  buildOrderTrends(orders: BackendEcoOrder[]): OrderTrendPoint[] {
    const grouped = new Map<string, OrderTrendPoint>();

    for (const order of orders) {
      const label = format(new Date(order.orderDate), 'MMM yyyy');
      const existing = grouped.get(label);
      if (existing) {
        existing.count += 1;
        existing.totalQtyKg += order.qtyKg;
      } else {
        grouped.set(label, {
          label,
          count: 1,
          totalQtyKg: order.qtyKg,
        });
      }
    }

    return [...grouped.values()].slice(-6);
  }

  buildPriceBreakdown(order: BackendEcoOrder): PriceBreakdownLine[] {
    const materialBase = Math.round(order.qtyKg * 0.42);
    const logistics = Math.round(order.distanceKm * 0.36);
    const ecoCredit = Math.round((order.co2Saved ?? 0) * 0.12);
    const solarCredit = order.grade === 'A' || order.grade === 'B' ? 55 : 20;

    return [
      { label: 'Material base', value: materialBase },
      { label: 'Logistics', value: logistics },
      { label: 'Eco credit', value: -ecoCredit, tone: 'positive' },
      { label: 'Solar bonus', value: -solarCredit, tone: 'positive' },
    ];
  }

  orderGrandTotal(order: BackendEcoOrder): number {
    return this.buildPriceBreakdown(order).reduce((sum, line) => sum + line.value, 0);
  }

  resourceKind(value: string | null | undefined): ResourceKind {
    const normalized = (value ?? '').trim().toLowerCase();

    if (
      normalized.startsWith('machine:') ||
      normalized.includes('machine') ||
      normalized.includes('robot') ||
      normalized.includes('press') ||
      normalized.includes('cnc') ||
      normalized.includes('line') ||
      normalized.includes('generator') ||
      normalized.includes('forklift') ||
      normalized.includes('compressor')
    ) {
      return 'Machine';
    }

    if (
      normalized.startsWith('space:') ||
      normalized.includes('space') ||
      normalized.includes('workspace') ||
      normalized.includes('warehouse') ||
      normalized.includes('yard') ||
      normalized.includes('studio') ||
      normalized.includes('lab') ||
      normalized.includes('floor') ||
      normalized.includes('room') ||
      normalized.includes('bay')
    ) {
      return 'Space';
    }

    if (
      normalized.startsWith('tool:') ||
      normalized.includes('tool') ||
      normalized.includes('drill') ||
      normalized.includes('wrench') ||
      normalized.includes('cutter') ||
      normalized.includes('kit') ||
      normalized.includes('scanner') ||
      normalized.includes('meter')
    ) {
      return 'Tool';
    }

    return 'Other';
  }

  resourceName(value: string | null | undefined): string {
    const raw = (value ?? '').trim();
    return raw.replace(/^(machine|space|tool|other)\s*[:\-|]\s*/i, '').trim() || raw;
  }

  resourceLabel(kind: ResourceKind, name: string): string {
    const cleanedName = name.trim();
    if (!cleanedName) {
      return '';
    }

    return kind === 'Other' ? cleanedName : `${kind}: ${cleanedName}`;
  }

  resourceToken(value: string | ResourceKind | null | undefined): string {
    const kind = this.resourceKinds.includes(value as ResourceKind)
      ? (value as ResourceKind)
      : this.resourceKind(String(value ?? ''));

    switch (kind) {
      case 'Machine':
        return 'MC';
      case 'Space':
        return 'SP';
      case 'Tool':
        return 'TL';
      default:
        return 'RS';
    }
  }

  resourceAccent(kind: ResourceKind): 'eco' | 'info' | 'warn' | 'neutral' {
    if (kind === 'Machine') {
      return 'info';
    }
    if (kind === 'Space') {
      return 'eco';
    }
    if (kind === 'Tool') {
      return 'warn';
    }
    return 'neutral';
  }

  formatHour(hour: number): string {
    const normalized = Math.max(0, Math.min(23, Math.floor(hour)));
    const suffix = normalized >= 12 ? 'PM' : 'AM';
    const base = normalized % 12 || 12;
    return `${base} ${suffix}`;
  }

  formatWindow(startHour: number, endHour: number): string {
    return `${this.formatHour(startHour)} - ${this.formatHour(endHour)}`;
  }

  statusVariant(status: UiReservationStatus | BackendSlotStatus | BackendEcoOrder['status']): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    const normalized = status.toLowerCase();

    if (normalized === 'confirmed' || normalized === 'delivered' || normalized === 'open') {
      return 'success';
    }
    if (normalized === 'pending' || normalized === 'draft' || normalized === 'shipped') {
      return 'warning';
    }
    if (normalized === 'rejected' || normalized === 'cancelled' || normalized === 'blocked') {
      return 'danger';
    }
    if (normalized === 'booked') {
      return 'info';
    }
    return 'neutral';
  }

  private overlaps(startA: number, endA: number, startB: number, endB: number): boolean {
    return startA < endB && endA > startB;
  }
}
