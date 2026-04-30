import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../features/reservation-center/state/reservation-center.state";
import * as i2 from "../../../features/reservation-center/services/reservation-center-ai.service";
import * as i3 from "@angular/router";
import * as i4 from "../../../features/reservation-center/services/reservation-center.service";
import * as i5 from "@angular/common";
import * as i6 from "../../reservation-center/components/eco-leaderboard/eco-leaderboard.component";
import * as i7 from "../../reservation-center/components/ai-insights-panel/ai-insights-panel";
function Dashboard_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function Dashboard_article_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 29)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 30);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const kpi_r2 = ctx.$implicit;
    i0.ɵɵattribute("data-tone", kpi_r2.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(kpi_r2.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(kpi_r2.value);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("up", kpi_r2.trendUp)("down", !kpi_r2.trendUp);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", kpi_r2.trendUp ? "\u2191" : "\u2193", " ", kpi_r2.trendLabel, " ");
} }
function Dashboard_div_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r3 = ctx.$implicit;
    i0.ɵɵattribute("data-tone", row_r3.tone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r3.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r3.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r3.detail);
} }
function Dashboard_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵelement(1, "div", 33);
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r4 = ctx.$implicit;
    i0.ɵɵattribute("data-tone", row_r4.tone);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r4.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r4.count);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r4.detail);
} }
function Dashboard_div_53_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cell_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r0.heatmapClass(cell_r5.occupancy));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cell_r5.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cell_r5.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r5.reservationCount, " requests");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r5.occupancy, "% utilization");
} }
function Dashboard_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtemplate(1, Dashboard_div_53_div_1_Template, 9, 5, "div", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.heatmapCells);
} }
function Dashboard_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵtext(1, "No global slot demand data is available yet.");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵtext(1, "No critical reservation or slot conflicts are active right now.");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_66_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function Dashboard_div_66_button_1_Template_button_click_0_listener() { const row_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.inspectConflict(row_r7)); });
    i0.ɵɵelementStart(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Inspect");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r7 = ctx.$implicit;
    i0.ɵɵattribute("data-severity", row_r7.severity);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r7.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r7.detail);
} }
function Dashboard_div_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtemplate(1, Dashboard_div_66_button_1_Template, 8, 3, "button", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.conflictRows);
} }
export class Dashboard {
    state;
    ai;
    router;
    workspace;
    loading = true;
    error = '';
    reservations = [];
    slots = [];
    orders = [];
    reservationInsights = [];
    slotInsights = [];
    orderInsights = [];
    displayedStats = {
        reservations: 0,
        slots: 0,
        orders: 0,
        co2: 0,
    };
    adminContext = {
        enterpriseId: null,
        companyName: 'Admin',
        role: 'admin',
        isAdmin: true,
    };
    constructor(state, ai, router, workspace) {
        this.state = state;
        this.ai = ai;
        this.router = router;
        this.workspace = workspace;
    }
    ngOnInit() {
        this.refresh();
    }
    get kpis() {
        return [
            {
                key: 'reservations',
                label: 'Total Reservations',
                value: this.displayedStats.reservations,
                tone: 'eco',
                trendLabel: this.trendLabel(this.reservations, item => item.createdAt ?? item.date),
                trendUp: this.trendUp(this.reservations, item => item.createdAt ?? item.date),
            },
            {
                key: 'slots',
                label: 'Active Slots',
                value: this.displayedStats.slots,
                tone: 'info',
                trendLabel: this.trendLabel(this.activeSlots, item => item.createdAt ?? item.date),
                trendUp: this.trendUp(this.activeSlots, item => item.createdAt ?? item.date),
            },
            {
                key: 'orders',
                label: 'Orders In Progress',
                value: this.displayedStats.orders,
                tone: 'warn',
                trendLabel: this.trendLabel(this.inProgressOrders, item => item.createdAt ?? item.orderDate),
                trendUp: this.trendUp(this.inProgressOrders, item => item.createdAt ?? item.orderDate),
            },
            {
                key: 'co2',
                label: 'Total CO2 Saved',
                value: this.displayedStats.co2,
                tone: 'eco',
                trendLabel: this.co2TrendLabel,
                trendUp: this.co2TrendUp,
            },
        ];
    }
    get activeSlots() {
        return this.slots.filter(slot => slot.status !== 'blocked');
    }
    get inProgressOrders() {
        return this.orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled');
    }
    get totalCo2Saved() {
        return Math.round(this.orders.reduce((sum, order) => sum + (order.co2Saved ?? 0), 0));
    }
    get pendingRequestsCount() {
        return this.reservations.filter(item => item.status === 'PENDING').length;
    }
    get conflictRate() {
        if (!this.reservations.length) {
            return 0;
        }
        const conflicts = this.reservations.filter(item => this.workspace.detectReservationConflict(item, this.reservations, this.slots).hasConflict).length;
        return Math.round((conflicts / this.reservations.length) * 100);
    }
    get averageUtilization() {
        if (!this.slots.length) {
            return 0;
        }
        const activeUsage = this.slots.filter(item => item.status === 'booked').length;
        return Math.round((activeUsage / this.slots.length) * 100);
    }
    get failedOperations() {
        return (this.reservations.filter(item => item.status === 'CANCELLED').length +
            this.slots.filter(item => item.status === 'blocked').length +
            this.orders.filter(item => item.status === 'cancelled').length);
    }
    get healthRows() {
        return [
            {
                label: 'Pending requests',
                value: this.pendingRequestsCount,
                tone: 'warn',
                detail: 'Reservations waiting for provider or admin intervention.',
            },
            {
                label: 'Conflict rate',
                value: `${this.conflictRate}%`,
                tone: this.conflictRate >= 25 ? 'danger' : 'info',
                detail: 'Overlapping or overbooked reservations across the marketplace.',
            },
            {
                label: 'Average utilization',
                value: `${this.averageUtilization}%`,
                tone: 'eco',
                detail: 'Booked slot share across all enterprises.',
            },
            {
                label: 'Failed / blocked ops',
                value: this.failedOperations,
                tone: this.failedOperations ? 'danger' : 'eco',
                detail: 'Cancelled reservations, blocked slots, and cancelled orders.',
            },
        ];
    }
    get heatmapCells() {
        return this.workspace.buildHeatmap(this.slots, this.reservations);
    }
    get conflictRows() {
        const rows = [];
        for (const reservation of this.reservations) {
            const conflict = this.workspace.detectReservationConflict(reservation, this.reservations, this.slots);
            if (conflict.hasConflict) {
                rows.push({
                    id: `reservation-${reservation.id}`,
                    type: 'reservation',
                    title: `${this.workspace.resourceName(reservation.machine)} on ${reservation.date}`,
                    detail: `${conflict.blockingReservations.length} overlapping request(s) for ${reservation.company}.`,
                    severity: 'danger',
                    target: '/admin/reservations',
                });
            }
        }
        for (const slot of this.slots.filter(item => item.status === 'booked')) {
            const confirmedForSlot = this.reservations.filter(item => item.slotId === slot.id && item.status === 'CONFIRMED');
            if (confirmedForSlot.length > 1) {
                rows.push({
                    id: `slot-${slot.id}`,
                    type: 'slot',
                    title: `${this.workspace.resourceName(slot.machine)} overbooked`,
                    detail: `${confirmedForSlot.length} confirmed reservations target the same slot window.`,
                    severity: 'warn',
                    target: '/admin/slots',
                });
            }
        }
        const suspiciousCompanies = new Map();
        for (const reservation of this.reservations) {
            if (reservation.status === 'CANCELLED') {
                suspiciousCompanies.set(reservation.company, (suspiciousCompanies.get(reservation.company) ?? 0) + 1);
            }
        }
        for (const [company, count] of suspiciousCompanies.entries()) {
            if (count >= 3) {
                rows.push({
                    id: `activity-${company}`,
                    type: 'activity',
                    title: `${company} shows repeated failures`,
                    detail: `${count} cancelled requests may indicate suspicious or low-quality activity.`,
                    severity: 'info',
                    target: '/admin/reservations',
                });
            }
        }
        return rows.slice(0, 8);
    }
    get timelineRows() {
        const created = this.reservations.length;
        const confirmed = this.reservations.filter(item => item.status === 'CONFIRMED').length;
        const ordersCreated = this.orders.length;
        return [
            {
                label: 'Requests created',
                count: created,
                detail: `${this.pendingRequestsCount} are still waiting for resolution.`,
                tone: 'info',
            },
            {
                label: 'Requests confirmed',
                count: confirmed,
                detail: `${created ? Math.round((confirmed / created) * 100) : 0}% conversion from request to confirmation.`,
                tone: 'eco',
            },
            {
                label: 'Orders generated',
                count: ordersCreated,
                detail: `${confirmed ? Math.round((ordersCreated / confirmed) * 100) : 0}% of confirmed reservations reached the order stage.`,
                tone: 'warn',
            },
        ];
    }
    get co2TrendLabel() {
        const current = this.sumCo2(this.currentPeriod(this.orders, item => item.createdAt ?? item.orderDate));
        const previous = this.sumCo2(this.previousPeriod(this.orders, item => item.createdAt ?? item.orderDate));
        const delta = current - previous;
        return `${delta >= 0 ? '+' : ''}${delta} vs previous 7 days`;
    }
    get co2TrendUp() {
        const current = this.sumCo2(this.currentPeriod(this.orders, item => item.createdAt ?? item.orderDate));
        const previous = this.sumCo2(this.previousPeriod(this.orders, item => item.createdAt ?? item.orderDate));
        return current >= previous;
    }
    inspectConflict(row) {
        this.router.navigate([row.target]);
    }
    openAdminArea(target) {
        this.router.navigate([target]);
    }
    heatmapClass(occupancy) {
        if (occupancy >= 80) {
            return 'danger';
        }
        if (occupancy >= 45) {
            return 'warning';
        }
        if (occupancy > 0) {
            return 'info';
        }
        return 'success';
    }
    refresh() {
        this.loading = true;
        this.state.loadAll().subscribe({
            next: snapshot => {
                this.reservations = snapshot.reservations;
                this.slots = snapshot.slots;
                this.orders = snapshot.orders;
                this.loading = false;
                this.animateStats({
                    reservations: this.reservations.length,
                    slots: this.activeSlots.length,
                    orders: this.inProgressOrders.length,
                    co2: this.totalCo2Saved,
                });
                this.loadInsights();
            },
            error: error => {
                this.loading = false;
                this.error = error?.error?.message ?? 'Failed to load admin control-center data.';
            },
        });
    }
    loadInsights() {
        this.ai.getInsights('reservations', this.adminContext).subscribe({
            next: insights => {
                this.reservationInsights = insights;
            },
            error: () => {
                this.reservationInsights = [];
            },
        });
        this.ai.getInsights('slots', this.adminContext).subscribe({
            next: insights => {
                this.slotInsights = insights;
            },
            error: () => {
                this.slotInsights = [];
            },
        });
        this.ai.getInsights('orders', this.adminContext).subscribe({
            next: insights => {
                this.orderInsights = insights;
            },
            error: () => {
                this.orderInsights = [];
            },
        });
    }
    animateStats(targets) {
        const startedAt = performance.now();
        const duration = 700;
        const tick = (now) => {
            const progress = Math.min(1, (now - startedAt) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            this.displayedStats = {
                reservations: Math.round(targets.reservations * eased),
                slots: Math.round(targets.slots * eased),
                orders: Math.round(targets.orders * eased),
                co2: Math.round(targets.co2 * eased),
            };
            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };
        requestAnimationFrame(tick);
    }
    trendLabel(rows, dateSelector) {
        const current = this.currentPeriod(rows, dateSelector).length;
        const previous = this.previousPeriod(rows, dateSelector).length;
        const delta = current - previous;
        return `${delta >= 0 ? '+' : ''}${delta} vs previous 7 days`;
    }
    trendUp(rows, dateSelector) {
        return this.currentPeriod(rows, dateSelector).length >= this.previousPeriod(rows, dateSelector).length;
    }
    currentPeriod(rows, dateSelector) {
        const now = new Date();
        const currentStart = new Date(now);
        currentStart.setDate(now.getDate() - 7);
        return rows.filter(row => {
            const date = this.parseDate(dateSelector(row));
            return date != null && date >= currentStart && date <= now;
        });
    }
    previousPeriod(rows, dateSelector) {
        const now = new Date();
        const currentStart = new Date(now);
        currentStart.setDate(now.getDate() - 7);
        const previousStart = new Date(currentStart);
        previousStart.setDate(currentStart.getDate() - 7);
        return rows.filter(row => {
            const date = this.parseDate(dateSelector(row));
            return date != null && date >= previousStart && date < currentStart;
        });
    }
    sumCo2(rows) {
        return Math.round(rows.reduce((sum, order) => sum + (order.co2Saved ?? 0), 0));
    }
    parseDate(value) {
        if (!value) {
            return null;
        }
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    static ɵfac = function Dashboard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Dashboard)(i0.ɵɵdirectiveInject(i1.ReservationCenterState), i0.ɵɵdirectiveInject(i2.ReservationCenterAiService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i4.ReservationCenterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Dashboard, selectors: [["app-dashboard"]], standalone: false, decls: 72, vars: 20, consts: [["noHeatmap", ""], [1, "ad-page"], [1, "ad-hero", "card"], [1, "ad-kicker"], [1, "ad-subtitle"], [1, "ad-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], [1, "ad-health-summary"], [1, "ad-pill", "warn"], [1, "ad-pill", "danger"], [1, "ad-pill", "eco"], ["class", "alert alert-danger", 4, "ngIf"], [1, "ad-kpis"], ["class", "ad-kpi", 4, "ngFor", "ngForOf"], [1, "ad-grid"], [1, "card", "ad-card"], [1, "ad-card-head"], [1, "ad-health-grid"], ["class", "ad-health-row", 4, "ngFor", "ngForOf"], [1, "ad-timeline"], ["class", "ad-timeline-row", 4, "ngFor", "ngForOf"], ["class", "ad-heatmap", 4, "ngIf", "ngIfElse"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click"], ["class", "ad-empty", 4, "ngIf"], ["class", "ad-conflicts", 4, "ngIf"], [1, "ad-ai-grid"], [3, "title", "subtitle", "insights"], [1, "alert", "alert-danger"], [1, "ad-kpi"], [1, "ad-kpi-trend"], [1, "ad-health-row"], [1, "ad-timeline-row"], [1, "ad-timeline-dot"], [1, "ad-heatmap"], ["class", "ad-heatmap-cell", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "ad-heatmap-cell", 3, "ngClass"], [1, "ad-empty"], [1, "ad-conflicts"], ["class", "ad-conflict-row", "type", "button", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "ad-conflict-row", 3, "click"]], template: function Dashboard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "section", 2)(2, "div")(3, "p", 3);
            i0.ɵɵtext(4, "Control center");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Marketplace supervision for reservations, slots, and eco orders.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, " The admin view has full marketplace visibility, override power, and backend-driven AI insight across the reservation-to-order lifecycle. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 5)(10, "button", 6);
            i0.ɵɵlistener("click", function Dashboard_Template_button_click_10_listener() { return ctx.openAdminArea("/admin/reservations"); });
            i0.ɵɵtext(11, "Review reservations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "button", 7);
            i0.ɵɵlistener("click", function Dashboard_Template_button_click_12_listener() { return ctx.openAdminArea("/admin/slots"); });
            i0.ɵɵtext(13, "Manage slots");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 7);
            i0.ɵɵlistener("click", function Dashboard_Template_button_click_14_listener() { return ctx.openAdminArea("/admin/orders"); });
            i0.ɵɵtext(15, "Inspect orders");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(16, "div", 8)(17, "div", 9);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 10);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 11);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(23, Dashboard_div_23_Template, 2, 1, "div", 12);
            i0.ɵɵelementStart(24, "section", 13);
            i0.ɵɵtemplate(25, Dashboard_article_25_Template, 7, 9, "article", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "section", 15)(27, "article", 16)(28, "div", 17)(29, "div")(30, "h2");
            i0.ɵɵtext(31, "System health");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "p");
            i0.ɵɵtext(33, "Live marketplace health indicators from real reservation, slot, and order data.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(34, "div", 18);
            i0.ɵɵtemplate(35, Dashboard_div_35_Template, 7, 4, "div", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "article", 16)(37, "div", 17)(38, "div")(39, "h2");
            i0.ɵɵtext(40, "System timeline");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "p");
            i0.ɵɵtext(42, "High-level bottleneck view from request creation through order generation.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "div", 20);
            i0.ɵɵtemplate(44, Dashboard_div_44_Template, 9, 4, "div", 21);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(45, "section", 15)(46, "article", 16)(47, "div", 17)(48, "div")(49, "h2");
            i0.ɵɵtext(50, "Super heatmap");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "p");
            i0.ɵɵtext(52, "System-wide demand intensity combined across all enterprises.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(53, Dashboard_div_53_Template, 2, 1, "div", 22)(54, Dashboard_ng_template_54_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "article", 16)(57, "div", 17)(58, "div")(59, "h2");
            i0.ɵɵtext(60, "Conflict detection");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "p");
            i0.ɵɵtext(62, "Overlaps, overbooked slots, and suspicious activity that need admin review.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "button", 23);
            i0.ɵɵlistener("click", function Dashboard_Template_button_click_63_listener() { return ctx.openAdminArea("/admin/reservations"); });
            i0.ɵɵtext(64, "Resolve");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(65, Dashboard_div_65_Template, 2, 0, "div", 24)(66, Dashboard_div_66_Template, 2, 1, "div", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "section", 26);
            i0.ɵɵelement(68, "app-ai-insights-panel", 27)(69, "app-ai-insights-panel", 27)(70, "app-ai-insights-panel", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(71, "app-eco-leaderboard");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const noHeatmap_r8 = i0.ɵɵreference(55);
            i0.ɵɵadvance(18);
            i0.ɵɵtextInterpolate1("", ctx.pendingRequestsCount, " pending requests");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.failedOperations, " blocked / failed ops");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.averageUtilization, "% average utilization");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.kpis);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngForOf", ctx.healthRows);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngForOf", ctx.timelineRows);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.heatmapCells.length)("ngIfElse", noHeatmap_r8);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngIf", !ctx.conflictRows.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.conflictRows.length);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("title", "Reservation AI")("subtitle", "High rejection rate, peak demand delays, and supervision recommendations from the backend AI service.")("insights", ctx.reservationInsights);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", "Slot AI")("subtitle", "System-wide distribution and rebalancing recommendations for reservation slot supply.")("insights", ctx.slotInsights);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", "Order AI")("subtitle", "Eco-performance trends and fulfillment inefficiency warnings from backend analysis.")("insights", ctx.orderInsights);
        } }, dependencies: [i5.NgClass, i5.NgForOf, i5.NgIf, i6.EcoLeaderboardComponent, i7.AiInsightsPanel], styles: [".ad-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.ad-hero[_ngcontent-%COMP%], \n.ad-kpi[_ngcontent-%COMP%], \n.ad-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.74);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  backdrop-filter: blur(18px);\n}\n\n.ad-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 360px;\n  gap: 24px;\n  padding: 26px;\n  border-radius: 28px;\n  background:\n    radial-gradient(circle at top right, rgba(124, 58, 237, 0.18), transparent 26%),\n    linear-gradient(135deg, rgba(245, 243, 255, 0.94), rgba(255, 255, 255, 0.88));\n}\n\n.ad-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #7c3aed;\n  font-weight: 700;\n}\n\n.ad-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.ad-card-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.ad-subtitle[_ngcontent-%COMP%], \n.ad-card-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.ad-health-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.ad-timeline-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.ad-conflict-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.ad-empty[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.6;\n}\n\n.ad-actions[_ngcontent-%COMP%], \n.ad-health-summary[_ngcontent-%COMP%], \n.ad-kpis[_ngcontent-%COMP%], \n.ad-grid[_ngcontent-%COMP%], \n.ad-health-grid[_ngcontent-%COMP%], \n.ad-heatmap[_ngcontent-%COMP%], \n.ad-ai-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n\n.ad-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-top: 20px;\n}\n\n.ad-health-summary[_ngcontent-%COMP%] {\n  align-content: start;\n}\n\n.ad-pill[_ngcontent-%COMP%] {\n  border-radius: 999px;\n  padding: 10px 14px;\n  font-size: 12px;\n  font-weight: 700;\n  width: fit-content;\n}\n\n.ad-pill.eco[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.92);\n  color: #166534;\n}\n\n.ad-pill.warn[_ngcontent-%COMP%] {\n  background: rgba(254, 249, 195, 0.95);\n  color: #a16207;\n}\n\n.ad-pill.danger[_ngcontent-%COMP%] {\n  background: rgba(254, 226, 226, 0.95);\n  color: #b91c1c;\n}\n\n.ad-kpis[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.ad-kpi[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-radius: 24px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.ad-kpi[_ngcontent-%COMP%]:hover, \n.ad-conflict-row[_ngcontent-%COMP%]:hover {\n  transform: scale(1.02);\n  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12);\n}\n\n.ad-kpi[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 10px;\n  color: var(--text3);\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.ad-kpi[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 34px;\n  margin-bottom: 8px;\n}\n\n.ad-kpi[data-tone='eco'][_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.ad-kpi[data-tone='info'][_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n\n.ad-kpi[data-tone='warn'][_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ca8a04;\n}\n\n.ad-kpi[data-tone='danger'][_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.ad-kpi-trend[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.ad-kpi-trend.up[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.ad-kpi-trend.down[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.ad-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.ad-card[_ngcontent-%COMP%] {\n  padding: 22px;\n  border-radius: 24px;\n}\n\n.ad-card-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n\n.ad-health-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.ad-health-row[_ngcontent-%COMP%], \n.ad-heatmap-cell[_ngcontent-%COMP%], \n.ad-timeline-row[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.72);\n}\n\n.ad-health-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.ad-timeline-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.ad-conflict-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n}\n\n.ad-health-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 24px;\n  font-weight: 800;\n  margin-bottom: 6px;\n}\n\n.ad-health-row[data-tone='eco'][_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.ad-health-row[data-tone='info'][_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n\n.ad-health-row[data-tone='warn'][_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #ca8a04;\n}\n\n.ad-health-row[data-tone='danger'][_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.ad-timeline[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.ad-timeline-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 20px 1fr;\n  gap: 12px;\n  align-items: start;\n}\n\n.ad-timeline-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  color: var(--text3);\n  font-size: 13px;\n  font-weight: 700;\n}\n\n.ad-timeline-dot[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  margin-top: 4px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  box-shadow: 0 0 0 5px rgba(148, 163, 184, 0.14);\n}\n\n.ad-timeline-row[data-tone='eco'][_ngcontent-%COMP%]   .ad-timeline-dot[_ngcontent-%COMP%] {\n  background: #16a34a;\n}\n\n.ad-timeline-row[data-tone='info'][_ngcontent-%COMP%]   .ad-timeline-dot[_ngcontent-%COMP%] {\n  background: #2563eb;\n}\n\n.ad-timeline-row[data-tone='warn'][_ngcontent-%COMP%]   .ad-timeline-dot[_ngcontent-%COMP%] {\n  background: #ca8a04;\n}\n\n.ad-heatmap[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n}\n\n.ad-heatmap-cell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n}\n\n.ad-heatmap-cell.success[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.78);\n}\n\n.ad-heatmap-cell.info[_ngcontent-%COMP%] {\n  background: rgba(224, 242, 254, 0.82);\n}\n\n.ad-heatmap-cell.warning[_ngcontent-%COMP%] {\n  background: rgba(255, 247, 237, 0.84);\n}\n\n.ad-heatmap-cell.danger[_ngcontent-%COMP%] {\n  background: rgba(254, 226, 226, 0.88);\n}\n\n.ad-conflicts[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.ad-conflict-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: center;\n  text-align: left;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  padding: 16px;\n  background: rgba(255, 255, 255, 0.74);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.ad-conflict-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  color: var(--primary);\n  font-weight: 700;\n}\n\n.ad-conflict-row[data-severity='danger'][_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.24);\n}\n\n.ad-conflict-row[data-severity='warn'][_ngcontent-%COMP%] {\n  border-color: rgba(250, 204, 21, 0.28);\n}\n\n.ad-conflict-row[data-severity='info'][_ngcontent-%COMP%] {\n  border-color: rgba(59, 130, 246, 0.22);\n}\n\n.ad-empty[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 18px;\n  border: 1px dashed rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.68);\n}\n\n.ad-ai-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n@media (max-width: 1180px) {\n  .ad-hero[_ngcontent-%COMP%], \n   .ad-kpis[_ngcontent-%COMP%], \n   .ad-grid[_ngcontent-%COMP%], \n   .ad-ai-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .ad-page[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .ad-health-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Dashboard, [{
        type: Component,
        args: [{ selector: 'app-dashboard', standalone: false, template: "<div class=\"ad-page\">\n  <section class=\"ad-hero card\">\n    <div>\n      <p class=\"ad-kicker\">Control center</p>\n      <h1>Marketplace supervision for reservations, slots, and eco orders.</h1>\n      <p class=\"ad-subtitle\">\n        The admin view has full marketplace visibility, override power, and backend-driven AI insight across the reservation-to-order lifecycle.\n      </p>\n      <div class=\"ad-actions\">\n        <button class=\"btn btn-primary\" type=\"button\" (click)=\"openAdminArea('/admin/reservations')\">Review reservations</button>\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"openAdminArea('/admin/slots')\">Manage slots</button>\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"openAdminArea('/admin/orders')\">Inspect orders</button>\n      </div>\n    </div>\n\n    <div class=\"ad-health-summary\">\n      <div class=\"ad-pill warn\">{{ pendingRequestsCount }} pending requests</div>\n      <div class=\"ad-pill danger\">{{ failedOperations }} blocked / failed ops</div>\n      <div class=\"ad-pill eco\">{{ averageUtilization }}% average utilization</div>\n    </div>\n  </section>\n\n  <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n\n  <section class=\"ad-kpis\">\n    <article class=\"ad-kpi\" *ngFor=\"let kpi of kpis\" [attr.data-tone]=\"kpi.tone\">\n      <span>{{ kpi.label }}</span>\n      <strong>{{ kpi.value }}</strong>\n      <div class=\"ad-kpi-trend\" [class.up]=\"kpi.trendUp\" [class.down]=\"!kpi.trendUp\">\n        {{ kpi.trendUp ? '\u2191' : '\u2193' }} {{ kpi.trendLabel }}\n      </div>\n    </article>\n  </section>\n\n  <section class=\"ad-grid\">\n    <article class=\"card ad-card\">\n      <div class=\"ad-card-head\">\n        <div>\n          <h2>System health</h2>\n          <p>Live marketplace health indicators from real reservation, slot, and order data.</p>\n        </div>\n      </div>\n\n      <div class=\"ad-health-grid\">\n        <div class=\"ad-health-row\" *ngFor=\"let row of healthRows\" [attr.data-tone]=\"row.tone\">\n          <strong>{{ row.label }}</strong>\n          <span>{{ row.value }}</span>\n          <p>{{ row.detail }}</p>\n        </div>\n      </div>\n    </article>\n\n    <article class=\"card ad-card\">\n      <div class=\"ad-card-head\">\n        <div>\n          <h2>System timeline</h2>\n          <p>High-level bottleneck view from request creation through order generation.</p>\n        </div>\n      </div>\n\n      <div class=\"ad-timeline\">\n        <div class=\"ad-timeline-row\" *ngFor=\"let row of timelineRows\" [attr.data-tone]=\"row.tone\">\n          <div class=\"ad-timeline-dot\"></div>\n          <div>\n            <strong>{{ row.label }}</strong>\n            <span>{{ row.count }}</span>\n            <p>{{ row.detail }}</p>\n          </div>\n        </div>\n      </div>\n    </article>\n  </section>\n\n  <section class=\"ad-grid\">\n    <article class=\"card ad-card\">\n      <div class=\"ad-card-head\">\n        <div>\n          <h2>Super heatmap</h2>\n          <p>System-wide demand intensity combined across all enterprises.</p>\n        </div>\n      </div>\n\n      <div class=\"ad-heatmap\" *ngIf=\"heatmapCells.length; else noHeatmap\">\n        <div class=\"ad-heatmap-cell\" *ngFor=\"let cell of heatmapCells\" [ngClass]=\"heatmapClass(cell.occupancy)\">\n          <strong>{{ cell.date }}</strong>\n          <span>{{ cell.label }}</span>\n          <span>{{ cell.reservationCount }} requests</span>\n          <span>{{ cell.occupancy }}% utilization</span>\n        </div>\n      </div>\n\n      <ng-template #noHeatmap>\n        <div class=\"ad-empty\">No global slot demand data is available yet.</div>\n      </ng-template>\n    </article>\n\n    <article class=\"card ad-card\">\n      <div class=\"ad-card-head\">\n        <div>\n          <h2>Conflict detection</h2>\n          <p>Overlaps, overbooked slots, and suspicious activity that need admin review.</p>\n        </div>\n        <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"openAdminArea('/admin/reservations')\">Resolve</button>\n      </div>\n\n      <div class=\"ad-empty\" *ngIf=\"!conflictRows.length\">No critical reservation or slot conflicts are active right now.</div>\n\n      <div class=\"ad-conflicts\" *ngIf=\"conflictRows.length\">\n        <button class=\"ad-conflict-row\" type=\"button\" *ngFor=\"let row of conflictRows\" [attr.data-severity]=\"row.severity\" (click)=\"inspectConflict(row)\">\n          <div>\n            <strong>{{ row.title }}</strong>\n            <p>{{ row.detail }}</p>\n          </div>\n          <span>Inspect</span>\n        </button>\n      </div>\n    </article>\n  </section>\n\n  <section class=\"ad-ai-grid\">\n    <app-ai-insights-panel\n      [title]=\"'Reservation AI'\"\n      [subtitle]=\"'High rejection rate, peak demand delays, and supervision recommendations from the backend AI service.'\"\n      [insights]=\"reservationInsights\"\n    />\n    <app-ai-insights-panel\n      [title]=\"'Slot AI'\"\n      [subtitle]=\"'System-wide distribution and rebalancing recommendations for reservation slot supply.'\"\n      [insights]=\"slotInsights\"\n    />\n    <app-ai-insights-panel\n      [title]=\"'Order AI'\"\n      [subtitle]=\"'Eco-performance trends and fulfillment inefficiency warnings from backend analysis.'\"\n      [insights]=\"orderInsights\"\n    />\n  </section>\n\n  <app-eco-leaderboard></app-eco-leaderboard>\n</div>\n", styles: [".ad-page {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.ad-hero,\n.ad-kpi,\n.ad-card {\n  background: rgba(255, 255, 255, 0.74);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  backdrop-filter: blur(18px);\n}\n\n.ad-hero {\n  display: grid;\n  grid-template-columns: 1.2fr 360px;\n  gap: 24px;\n  padding: 26px;\n  border-radius: 28px;\n  background:\n    radial-gradient(circle at top right, rgba(124, 58, 237, 0.18), transparent 26%),\n    linear-gradient(135deg, rgba(245, 243, 255, 0.94), rgba(255, 255, 255, 0.88));\n}\n\n.ad-kicker {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #7c3aed;\n  font-weight: 700;\n}\n\n.ad-hero h1,\n.ad-card-head h2 {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.ad-subtitle,\n.ad-card-head p,\n.ad-health-row p,\n.ad-timeline-row p,\n.ad-conflict-row p,\n.ad-empty {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.6;\n}\n\n.ad-actions,\n.ad-health-summary,\n.ad-kpis,\n.ad-grid,\n.ad-health-grid,\n.ad-heatmap,\n.ad-ai-grid {\n  display: grid;\n  gap: 16px;\n}\n\n.ad-actions {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  margin-top: 20px;\n}\n\n.ad-health-summary {\n  align-content: start;\n}\n\n.ad-pill {\n  border-radius: 999px;\n  padding: 10px 14px;\n  font-size: 12px;\n  font-weight: 700;\n  width: fit-content;\n}\n\n.ad-pill.eco {\n  background: rgba(220, 252, 231, 0.92);\n  color: #166534;\n}\n\n.ad-pill.warn {\n  background: rgba(254, 249, 195, 0.95);\n  color: #a16207;\n}\n\n.ad-pill.danger {\n  background: rgba(254, 226, 226, 0.95);\n  color: #b91c1c;\n}\n\n.ad-kpis {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.ad-kpi {\n  padding: 20px;\n  border-radius: 24px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.ad-kpi:hover,\n.ad-conflict-row:hover {\n  transform: scale(1.02);\n  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12);\n}\n\n.ad-kpi span {\n  display: block;\n  margin-bottom: 10px;\n  color: var(--text3);\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.ad-kpi strong {\n  display: block;\n  font-size: 34px;\n  margin-bottom: 8px;\n}\n\n.ad-kpi[data-tone='eco'] strong {\n  color: #16a34a;\n}\n\n.ad-kpi[data-tone='info'] strong {\n  color: #2563eb;\n}\n\n.ad-kpi[data-tone='warn'] strong {\n  color: #ca8a04;\n}\n\n.ad-kpi[data-tone='danger'] strong {\n  color: #dc2626;\n}\n\n.ad-kpi-trend {\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.ad-kpi-trend.up {\n  color: #16a34a;\n}\n\n.ad-kpi-trend.down {\n  color: #dc2626;\n}\n\n.ad-grid {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.ad-card {\n  padding: 22px;\n  border-radius: 24px;\n}\n\n.ad-card-head {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n\n.ad-health-grid {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.ad-health-row,\n.ad-heatmap-cell,\n.ad-timeline-row {\n  padding: 16px;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.72);\n}\n\n.ad-health-row strong,\n.ad-timeline-row strong,\n.ad-conflict-row strong {\n  display: block;\n  margin-bottom: 8px;\n}\n\n.ad-health-row span {\n  display: block;\n  font-size: 24px;\n  font-weight: 800;\n  margin-bottom: 6px;\n}\n\n.ad-health-row[data-tone='eco'] span {\n  color: #16a34a;\n}\n\n.ad-health-row[data-tone='info'] span {\n  color: #2563eb;\n}\n\n.ad-health-row[data-tone='warn'] span {\n  color: #ca8a04;\n}\n\n.ad-health-row[data-tone='danger'] span {\n  color: #dc2626;\n}\n\n.ad-timeline {\n  display: grid;\n  gap: 12px;\n}\n\n.ad-timeline-row {\n  display: grid;\n  grid-template-columns: 20px 1fr;\n  gap: 12px;\n  align-items: start;\n}\n\n.ad-timeline-row span {\n  display: block;\n  margin-bottom: 6px;\n  color: var(--text3);\n  font-size: 13px;\n  font-weight: 700;\n}\n\n.ad-timeline-dot {\n  width: 14px;\n  height: 14px;\n  margin-top: 4px;\n  border-radius: 999px;\n  background: #cbd5e1;\n  box-shadow: 0 0 0 5px rgba(148, 163, 184, 0.14);\n}\n\n.ad-timeline-row[data-tone='eco'] .ad-timeline-dot {\n  background: #16a34a;\n}\n\n.ad-timeline-row[data-tone='info'] .ad-timeline-dot {\n  background: #2563eb;\n}\n\n.ad-timeline-row[data-tone='warn'] .ad-timeline-dot {\n  background: #ca8a04;\n}\n\n.ad-heatmap {\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n}\n\n.ad-heatmap-cell {\n  display: grid;\n  gap: 6px;\n}\n\n.ad-heatmap-cell.success {\n  background: rgba(220, 252, 231, 0.78);\n}\n\n.ad-heatmap-cell.info {\n  background: rgba(224, 242, 254, 0.82);\n}\n\n.ad-heatmap-cell.warning {\n  background: rgba(255, 247, 237, 0.84);\n}\n\n.ad-heatmap-cell.danger {\n  background: rgba(254, 226, 226, 0.88);\n}\n\n.ad-conflicts {\n  display: grid;\n  gap: 12px;\n}\n\n.ad-conflict-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: center;\n  text-align: left;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  padding: 16px;\n  background: rgba(255, 255, 255, 0.74);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.ad-conflict-row span {\n  white-space: nowrap;\n  color: var(--primary);\n  font-weight: 700;\n}\n\n.ad-conflict-row[data-severity='danger'] {\n  border-color: rgba(239, 68, 68, 0.24);\n}\n\n.ad-conflict-row[data-severity='warn'] {\n  border-color: rgba(250, 204, 21, 0.28);\n}\n\n.ad-conflict-row[data-severity='info'] {\n  border-color: rgba(59, 130, 246, 0.22);\n}\n\n.ad-empty {\n  padding: 18px;\n  border-radius: 18px;\n  border: 1px dashed rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.68);\n}\n\n.ad-ai-grid {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n@media (max-width: 1180px) {\n  .ad-hero,\n  .ad-kpis,\n  .ad-grid,\n  .ad-ai-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .ad-page {\n    padding: 16px;\n  }\n\n  .ad-health-grid {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [{ type: i1.ReservationCenterState }, { type: i2.ReservationCenterAiService }, { type: i3.Router }, { type: i4.ReservationCenterService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Dashboard, { className: "Dashboard", filePath: "src/app/features/admin/dashboard/dashboard.ts", lineNumber: 47 }); })();
