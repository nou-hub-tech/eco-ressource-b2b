import { Injectable } from '@angular/core';
import { addDays, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, } from 'date-fns';
import * as i0 from "@angular/core";
export class ReservationCenterService {
    getReservationRelations(reservation, slots) {
        const slot = slots.find(candidate => candidate.id === reservation.slotId);
        return {
            consumerEnterpriseId: reservation.enterprise?.id ?? reservation.enterpriseId ?? null,
            providerEnterpriseId: slot?.enterprise?.id ?? slot?.enterpriseId ?? null,
        };
    }
    toUiReservationStatus(status) {
        if (status === 'CONFIRMED') {
            return 'CONFIRMED';
        }
        if (status === 'PENDING') {
            return 'PENDING';
        }
        return 'REJECTED';
    }
    fromUiReservationStatus(status) {
        if (status === 'CONFIRMED') {
            return 'CONFIRMED';
        }
        if (status === 'PENDING') {
            return 'PENDING';
        }
        return 'CANCELLED';
    }
    buildReservationTimeline(status) {
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
                description: uiStatus === 'CONFIRMED'
                    ? 'The reservation can now generate an order.'
                    : 'The request was declined or cancelled.',
            },
        ];
    }
    detectReservationConflict(reservation, reservations, slots) {
        const blockingReservations = reservations.filter(candidate => {
            if (candidate.id === reservation.id || candidate.status === 'CANCELLED' || candidate.deleted) {
                return false;
            }
            if (reservation.slotId != null && candidate.slotId != null) {
                if (candidate.slotId !== reservation.slotId) {
                    return false;
                }
            }
            else if (candidate.machine !== reservation.machine || candidate.date !== reservation.date) {
                return false;
            }
            return this.overlaps(reservation.startHour ?? 0, (reservation.startHour ?? 0) + (reservation.hours ?? 1), candidate.startHour ?? 0, (candidate.startHour ?? 0) + (candidate.hours ?? 1));
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
    buildSlotCalendar(slots, reservations, mode, anchorDate) {
        const rangeStart = mode === 'week' ? startOfWeek(anchorDate, { weekStartsOn: 1 }) : startOfMonth(anchorDate);
        const rangeEnd = mode === 'week' ? endOfWeek(anchorDate, { weekStartsOn: 1 }) : endOfMonth(anchorDate);
        const cells = [];
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
    buildHeatmap(slots, reservations) {
        const dates = [...new Set(slots.map(slot => slot.date))].sort().slice(0, 10);
        const buckets = [
            { label: 'Morning', start: 6, end: 12 },
            { label: 'Afternoon', start: 12, end: 18 },
            { label: 'Evening', start: 18, end: 24 },
        ];
        return dates.flatMap(date => buckets.map(bucket => {
            const scopedSlots = slots.filter(slot => slot.date === date && slot.startHour < bucket.end && slot.endHour > bucket.start);
            const scopedReservations = reservations.filter(reservation => reservation.date === date &&
                (reservation.startHour ?? 0) < bucket.end &&
                ((reservation.startHour ?? 0) + (reservation.hours ?? 1)) > bucket.start);
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
        }));
    }
    buildOrderTrends(orders) {
        const grouped = new Map();
        for (const order of orders) {
            const label = format(new Date(order.orderDate), 'MMM yyyy');
            const existing = grouped.get(label);
            if (existing) {
                existing.count += 1;
                existing.totalQtyKg += order.qtyKg;
            }
            else {
                grouped.set(label, {
                    label,
                    count: 1,
                    totalQtyKg: order.qtyKg,
                });
            }
        }
        return [...grouped.values()].slice(-6);
    }
    buildPriceBreakdown(order) {
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
    orderGrandTotal(order) {
        return this.buildPriceBreakdown(order).reduce((sum, line) => sum + line.value, 0);
    }
    statusVariant(status) {
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
    overlaps(startA, endA, startB, endB) {
        return startA < endB && endA > startB;
    }
    static ɵfac = function ReservationCenterService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReservationCenterService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReservationCenterService, factory: ReservationCenterService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReservationCenterService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
