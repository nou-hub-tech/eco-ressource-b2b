import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AiInsightsPanel } from '../../../features/reservation-center/components/ai-insights-panel/ai-insights-panel';
import { StatusChip } from '../../../features/reservation-center/components/status-chip/status-chip';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "../../../features/reservation-center/state/reservation-center.state";
import * as i3 from "../../../features/reservation-center/services/reservation-center-ai.service";
import * as i4 from "../../../features/reservation-center/services/reservation-center.service";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
const _c0 = () => ["/enterprise/marketplace"];
function EnterpriseSlots_div_60_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 14)(1, "label");
    i0.ɵɵtext(2, "Owner enterprise ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 37);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_div_60_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.enterpriseId, $event) || (ctx_r2.form.enterpriseId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.enterpriseId);
} }
function EnterpriseSlots_div_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.error);
} }
function EnterpriseSlots_div_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.success);
} }
function EnterpriseSlots_div_98_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42)(1, "strong");
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
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cell_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cell_r4.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r4.slotCount, " slots");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r4.openCount, " open");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r4.bookedCount, " booked");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r4.pendingCount, " pending req.");
} }
function EnterpriseSlots_div_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtemplate(1, EnterpriseSlots_div_98_div_1_Template, 11, 5, "div", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.calendarCells);
} }
function EnterpriseSlots_ng_template_99_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1, "No slot data is available for the current range.");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_div_108_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46)(1, "strong");
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
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r2.heatmapClass(cell_r5.occupancy));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cell_r5.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cell_r5.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r5.occupancy, "% occupied");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r5.reservationCount, " requests");
} }
function EnterpriseSlots_div_108_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtemplate(1, EnterpriseSlots_div_108_div_1_Template, 9, 5, "div", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.heatmapCells);
} }
function EnterpriseSlots_ng_template_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1, "Heatmap data will appear once slots exist for your enterprise.");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_a_118_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 47);
    i0.ɵɵtext(1, "Browse marketplace");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(1, _c0));
} }
function EnterpriseSlots_div_119_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1, "Loading slots...");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_div_120_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1, "No slot records found.");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_table_121_tr_18_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵelement(12, "app-status-chip", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 51)(14, "button", 31);
    i0.ɵɵlistener("click", function EnterpriseSlots_table_121_tr_18_Template_button_click_14_listener() { const slot_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.edit(slot_r7)); });
    i0.ɵɵtext(15, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 31);
    i0.ɵɵlistener("click", function EnterpriseSlots_table_121_tr_18_Template_button_click_16_listener() { const slot_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.deleteSlot(slot_r7)); });
    i0.ɵɵtext(17, "Delete");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const slot_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r7.machine);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r7.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", slot_r7.startHour, ":00 - ", slot_r7.endHour, ":00");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r7.solar ? "Yes" : "No");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", slot_r7.discountPct || 0, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", slot_r7.status)("variant", ctx_r2.statusVariant(slot_r7.status));
} }
function EnterpriseSlots_table_121_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 48)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Machine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Window");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Solar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Discount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "tbody");
    i0.ɵɵtemplate(18, EnterpriseSlots_table_121_tr_18_Template, 18, 8, "tr", 49);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngForOf", ctx_r2.ownedSlots);
} }
export class EnterpriseSlots {
    auth;
    state;
    ai;
    workspace;
    loading = true;
    saving = false;
    error = '';
    success = '';
    aiInsights = [];
    slots = [];
    reservations = [];
    context = {
        enterpriseId: null,
        companyName: '',
        role: 'enterprise',
        isAdmin: false,
    };
    calendarMode = 'week';
    calendarAnchor = new Date();
    form = this.createForm();
    constructor(auth, state, ai, workspace) {
        this.auth = auth;
        this.state = state;
        this.ai = ai;
        this.workspace = workspace;
    }
    ngOnInit() {
        this.context = this.readContext();
        this.refresh();
    }
    get calendarCells() {
        return this.workspace.buildSlotCalendar(this.ownedSlots, this.relatedReservations, this.calendarMode, this.calendarAnchor);
    }
    get heatmapCells() {
        return this.workspace.buildHeatmap(this.ownedSlots, this.relatedReservations);
    }
    get ownedSlots() {
        return this.context.isAdmin
            ? this.slots
            : this.slots.filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) === this.context.enterpriseId);
    }
    get relatedReservations() {
        if (this.context.isAdmin) {
            return this.reservations;
        }
        const ownedIds = new Set(this.ownedSlots.map(slot => slot.id));
        return this.reservations.filter(reservation => reservation.slotId != null && ownedIds.has(reservation.slotId));
    }
    get openSlotsCount() {
        return this.ownedSlots.filter(slot => slot.status === 'open').length;
    }
    get bookedSlotsCount() {
        return this.ownedSlots.filter(slot => slot.status === 'booked').length;
    }
    get blockedSlotsCount() {
        return this.ownedSlots.filter(slot => slot.status === 'blocked').length;
    }
    get totalUtilization() {
        return this.ownedSlots.length ? Math.round((this.bookedSlotsCount / this.ownedSlots.length) * 100) : 0;
    }
    edit(slot) {
        this.form = {
            id: slot.id,
            machine: slot.machine,
            date: slot.date,
            startHour: slot.startHour,
            endHour: slot.endHour,
            solar: slot.solar,
            discountPct: slot.discountPct ?? 0,
            enterpriseId: slot.enterprise?.id ?? slot.enterpriseId ?? this.context.enterpriseId,
            status: slot.status,
        };
    }
    resetForm() {
        this.form = this.createForm();
    }
    saveSlot() {
        if (this.saving) {
            return;
        }
        if (!this.form.machine.trim() || !this.form.date) {
            this.error = 'Machine and date are required.';
            return;
        }
        if (this.form.endHour <= this.form.startHour) {
            this.error = 'End hour must be after the start hour.';
            return;
        }
        const payload = {
            machine: this.form.machine.trim(),
            date: this.form.date,
            startHour: this.form.startHour,
            endHour: this.form.endHour,
            solar: this.form.solar,
            discountPct: this.form.discountPct,
            enterpriseId: this.form.enterpriseId ?? this.context.enterpriseId,
            status: this.form.status,
        };
        this.saving = true;
        this.error = '';
        const request$ = this.form.id
            ? this.state.updateSlot(this.form.id, payload)
            : this.state.createSlot(payload);
        request$.subscribe({
            next: () => {
                this.success = this.form.id ? 'Slot updated.' : 'Slot created.';
                this.saving = false;
                this.resetForm();
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to save slot.';
                this.saving = false;
            },
        });
    }
    deleteSlot(slot) {
        if (!window.confirm(`Delete slot ${slot.machine} on ${slot.date}?`)) {
            return;
        }
        this.state.deleteSlot(slot.id).subscribe({
            next: () => {
                this.success = 'Slot deleted.';
                if (this.form.id === slot.id) {
                    this.resetForm();
                }
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to delete slot.';
            },
        });
    }
    setCalendarMode(mode) {
        this.calendarMode = mode;
    }
    moveCalendar(step) {
        const next = new Date(this.calendarAnchor);
        next.setDate(this.calendarAnchor.getDate() + (this.calendarMode === 'week' ? step * 7 : step * 30));
        this.calendarAnchor = next;
    }
    statusVariant(status) {
        return this.workspace.statusVariant(status);
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
    applyInsight(insight) {
        const date = insight.meta?.['date'];
        const startHour = insight.meta?.['startHour'];
        const endHour = insight.meta?.['endHour'];
        const discountPct = insight.meta?.['discountPct'];
        const solar = insight.meta?.['solar'];
        if (typeof date === 'string') {
            this.form.date = date;
        }
        if (typeof startHour === 'number') {
            this.form.startHour = startHour;
        }
        if (typeof endHour === 'number') {
            this.form.endHour = endHour;
        }
        if (typeof discountPct === 'number') {
            this.form.discountPct = discountPct;
        }
        if (typeof solar === 'boolean') {
            this.form.solar = solar;
        }
        this.success = 'Applied AI suggestion to the slot form.';
    }
    refresh() {
        this.loading = true;
        this.context = this.readContext();
        this.state.loadAll().subscribe({
            next: snapshot => {
                this.slots = snapshot.slots;
                this.reservations = snapshot.reservations;
                this.loading = false;
                this.loadInsights();
            },
            error: error => {
                this.loading = false;
                this.error = error?.error?.message ?? 'Failed to load slots.';
            },
        });
    }
    loadInsights() {
        this.ai.getInsights('slots', this.context).subscribe({
            next: insights => {
                this.aiInsights = insights;
            },
            error: () => {
                this.aiInsights = [];
            },
        });
    }
    readContext() {
        const currentUser = this.auth.currentUser;
        return {
            enterpriseId: currentUser?.enterprise?.id ?? currentUser?.enterpriseId ?? null,
            companyName: currentUser?.enterprise?.companyName ??
                currentUser?.company ??
                currentUser?.name ??
                'Enterprise',
            role: currentUser?.role ?? 'enterprise',
            isAdmin: currentUser?.role === 'admin',
        };
    }
    createForm() {
        return {
            id: null,
            machine: '',
            date: new Date().toISOString().slice(0, 10),
            startHour: 8,
            endHour: 12,
            solar: false,
            discountPct: 0,
            enterpriseId: this.context.enterpriseId,
            status: 'open',
        };
    }
    static ɵfac = function EnterpriseSlots_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnterpriseSlots)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.ReservationCenterState), i0.ɵɵdirectiveInject(i3.ReservationCenterAiService), i0.ɵɵdirectiveInject(i4.ReservationCenterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EnterpriseSlots, selectors: [["app-enterprise-slots"]], decls: 122, vars: 32, consts: [["noCalendar", ""], ["noHeatmap", ""], [1, "rc-page"], [1, "rc-hero", "card"], [1, "rc-kicker"], [1, "rc-subtitle"], [1, "rc-hero-stats"], [1, "rc-stat"], [1, "rc-stat", "warning"], [3, "action", "title", "subtitle", "insights"], [1, "rc-grid"], [1, "card"], [1, "rc-section-head"], [1, "rc-form-grid"], [1, "form-group"], [3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "23", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "max", "24", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "100", 3, "ngModelChange", "ngModel"], ["class", "form-group", 4, "ngIf"], ["value", "open"], ["value", "booked"], ["value", "blocked"], [1, "rc-toggle"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "rc-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click"], ["class", "rc-calendar", 4, "ngIf", "ngIfElse"], ["class", "rc-heatmap", 4, "ngIf", "ngIfElse"], ["class", "btn btn-outline btn-sm", 3, "routerLink", 4, "ngIf"], ["class", "rc-empty", 4, "ngIf"], ["class", "data-table", 4, "ngIf"], ["type", "number", 3, "ngModelChange", "ngModel"], [1, "alert", "alert-danger"], [1, "alert", "alert-success"], [1, "rc-calendar"], ["class", "rc-calendar-cell", 4, "ngFor", "ngForOf"], [1, "rc-calendar-cell"], [1, "rc-empty"], [1, "rc-heatmap"], ["class", "rc-heatmap-cell", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "rc-heatmap-cell", 3, "ngClass"], [1, "btn", "btn-outline", "btn-sm", 3, "routerLink"], [1, "data-table"], [4, "ngFor", "ngForOf"], [3, "label", "variant"], [1, "rc-row-actions"]], template: function EnterpriseSlots_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "section", 3)(2, "div")(3, "p", 4);
            i0.ɵɵtext(4, "Slot operations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 5);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 6)(10, "div", 7)(11, "span");
            i0.ɵɵtext(12, "Open");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "strong");
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 7)(16, "span");
            i0.ɵɵtext(17, "Booked");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "strong");
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 7)(21, "span");
            i0.ɵɵtext(22, "Blocked");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "strong");
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 8)(26, "span");
            i0.ɵɵtext(27, "Utilization");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "strong");
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(30, "app-ai-insights-panel", 9);
            i0.ɵɵlistener("action", function EnterpriseSlots_Template_app_ai_insights_panel_action_30_listener($event) { return ctx.applyInsight($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "section", 10)(32, "article", 11)(33, "div", 12)(34, "div")(35, "h2");
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "p");
            i0.ɵɵtext(38, "Full CRUD for slot inventory with backend-synced availability.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(39, "div", 13)(40, "div", 14)(41, "label");
            i0.ɵɵtext(42, "Machine");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "input", 15);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_43_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.machine, $event) || (ctx.form.machine = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "div", 14)(45, "label");
            i0.ɵɵtext(46, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "input", 16);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_47_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.date, $event) || (ctx.form.date = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 14)(49, "label");
            i0.ɵɵtext(50, "Start hour");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "input", 17);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_51_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.startHour, $event) || (ctx.form.startHour = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "div", 14)(53, "label");
            i0.ɵɵtext(54, "End hour");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "input", 18);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_55_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.endHour, $event) || (ctx.form.endHour = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "div", 14)(57, "label");
            i0.ɵɵtext(58, "Discount (%)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "input", 19);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_59_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.discountPct, $event) || (ctx.form.discountPct = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(60, EnterpriseSlots_div_60_Template, 4, 1, "div", 20);
            i0.ɵɵelementStart(61, "div", 14)(62, "label");
            i0.ɵɵtext(63, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "select", 15);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_select_ngModelChange_64_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.status, $event) || (ctx.form.status = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(65, "option", 21);
            i0.ɵɵtext(66, "Open");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "option", 22);
            i0.ɵɵtext(68, "Booked");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "option", 23);
            i0.ɵɵtext(70, "Blocked");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(71, "label", 24)(72, "input", 25);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_72_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.solar, $event) || (ctx.form.solar = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "span");
            i0.ɵɵtext(74, "Solar-backed slot");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(75, EnterpriseSlots_div_75_Template, 2, 1, "div", 26)(76, EnterpriseSlots_div_76_Template, 2, 1, "div", 27);
            i0.ɵɵelementStart(77, "div", 28)(78, "button", 29);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_78_listener() { return ctx.saveSlot(); });
            i0.ɵɵtext(79);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "button", 30);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_80_listener() { return ctx.resetForm(); });
            i0.ɵɵtext(81, "Clear");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(82, "article", 11)(83, "div", 12)(84, "div")(85, "h2");
            i0.ɵɵtext(86, "Calendar view");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "p");
            i0.ɵɵtext(88, "Weekly and monthly capacity map from backend slot data.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(89, "div", 28)(90, "button", 31);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_90_listener() { return ctx.moveCalendar(-1); });
            i0.ɵɵtext(91, "Prev");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(92, "button", 31);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_92_listener() { return ctx.setCalendarMode("week"); });
            i0.ɵɵtext(93, "Week");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "button", 31);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_94_listener() { return ctx.setCalendarMode("month"); });
            i0.ɵɵtext(95, "Month");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "button", 31);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_96_listener() { return ctx.moveCalendar(1); });
            i0.ɵɵtext(97, "Next");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(98, EnterpriseSlots_div_98_Template, 2, 1, "div", 32)(99, EnterpriseSlots_ng_template_99_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(101, "section", 11)(102, "div", 12)(103, "div")(104, "h2");
            i0.ɵɵtext(105, "Availability heatmap");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(106, "p");
            i0.ɵɵtext(107, "Occupancy by daypart, calculated from real slots and related reservation requests.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(108, EnterpriseSlots_div_108_Template, 2, 1, "div", 33)(109, EnterpriseSlots_ng_template_109_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "section", 11)(112, "div", 12)(113, "div")(114, "h2");
            i0.ɵɵtext(115);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(116, "p");
            i0.ɵɵtext(117);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(118, EnterpriseSlots_a_118_Template, 2, 2, "a", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(119, EnterpriseSlots_div_119_Template, 2, 0, "div", 35)(120, EnterpriseSlots_div_120_Template, 2, 0, "div", 35)(121, EnterpriseSlots_table_121_Template, 19, 1, "table", 36);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const noCalendar_r8 = i0.ɵɵreference(100);
            const noHeatmap_r9 = i0.ɵɵreference(110);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Slot Supervision" : "My Slots");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.context.isAdmin ? "Override, inspect, and rebalance capacity across every enterprise slot." : "Manage the slots your enterprise owns while keeping marketplace availability healthy.", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.openSlotsCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.bookedSlotsCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.blockedSlotsCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("", ctx.totalUtilization, "%");
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", "Slot AI suggestions")("subtitle", "Backend recommendations for availability optimization and demand balancing.")("insights", ctx.aiInsights);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.form.id ? "Update slot" : "Create slot");
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.machine);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.date);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.startHour);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.endHour);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.discountPct);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.context.isAdmin);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.status);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.solar);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.success);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.saving);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.saving ? "Saving..." : ctx.form.id ? "Update slot" : "Create slot", " ");
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("ngIf", ctx.calendarCells.length)("ngIfElse", noCalendar_r8);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.heatmapCells.length)("ngIfElse", noHeatmap_r9);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "All slots" : "Owned slots");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Override all slot records." : "Slots where slot.ownerEnterpriseId equals your enterprise ID.");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.context.isAdmin);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.ownedSlots.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.ownedSlots.length);
        } }, dependencies: [CommonModule, i5.NgClass, i5.NgForOf, i5.NgIf, FormsModule, i6.NgSelectOption, i6.ɵNgSelectMultipleOption, i6.DefaultValueAccessor, i6.NumberValueAccessor, i6.CheckboxControlValueAccessor, i6.SelectControlValueAccessor, i6.NgControlStatus, i6.MinValidator, i6.MaxValidator, i6.NgModel, RouterLink, AiInsightsPanel, StatusChip], styles: [".rc-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 24px;\n  background:\n    radial-gradient(circle at top right, rgba(14, 165, 233, 0.14), transparent 32%),\n    linear-gradient(135deg, rgba(236, 253, 245, 0.96), rgba(255, 255, 255, 0.98));\n}\n\n.rc-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.55;\n}\n\n.rc-hero-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(120px, 1fr));\n  gap: 12px;\n  min-width: 280px;\n}\n\n.rc-stat[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-radius: 16px;\n  border: 1px solid rgba(22, 163, 74, 0.12);\n  background: rgba(255, 255, 255, 0.92);\n}\n\n.rc-stat.warning[_ngcontent-%COMP%] {\n  border-color: rgba(217, 119, 6, 0.18);\n}\n\n.rc-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text3);\n  margin-bottom: 8px;\n}\n\n.rc-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--text);\n}\n\n.rc-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 0.95fr 1.05fr;\n  gap: 18px;\n}\n\n.rc-section-head[_ngcontent-%COMP%], \n.rc-row-actions[_ngcontent-%COMP%], \n.rc-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n\n.rc-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n\n.rc-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 46px;\n  color: var(--text2);\n}\n\n.rc-calendar[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));\n  gap: 12px;\n}\n\n.rc-calendar-cell[_ngcontent-%COMP%], \n.rc-heatmap-cell[_ngcontent-%COMP%], \n.rc-empty[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  padding: 16px;\n  border: 1px solid var(--border);\n  background: rgba(248, 250, 252, 0.9);\n}\n\n.rc-calendar-cell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n}\n\n.rc-calendar-cell[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rc-heatmap-cell[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--text2);\n  font-size: 12px;\n}\n\n.rc-heatmap[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 12px;\n}\n\n.rc-heatmap-cell.success[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.9);\n}\n\n.rc-heatmap-cell.info[_ngcontent-%COMP%] {\n  background: rgba(224, 242, 254, 0.92);\n}\n\n.rc-heatmap-cell.warning[_ngcontent-%COMP%] {\n  background: rgba(255, 247, 237, 0.92);\n}\n\n.rc-heatmap-cell.danger[_ngcontent-%COMP%] {\n  background: rgba(254, 242, 242, 0.92);\n}\n\n@media (max-width: 1100px) {\n  .rc-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .rc-hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .rc-hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    min-width: 0;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnterpriseSlots, [{
        type: Component,
        args: [{ selector: 'app-enterprise-slots', standalone: true, imports: [CommonModule, FormsModule, RouterLink, AiInsightsPanel, StatusChip], template: "<div class=\"rc-page\">\n  <section class=\"rc-hero card\">\n    <div>\n      <p class=\"rc-kicker\">Slot operations</p>\n      <h1>{{ context.isAdmin ? 'Slot Supervision' : 'My Slots' }}</h1>\n      <p class=\"rc-subtitle\">\n        {{ context.isAdmin\n          ? 'Override, inspect, and rebalance capacity across every enterprise slot.'\n          : 'Manage the slots your enterprise owns while keeping marketplace availability healthy.' }}\n      </p>\n    </div>\n    <div class=\"rc-hero-stats\">\n      <div class=\"rc-stat\">\n        <span>Open</span>\n        <strong>{{ openSlotsCount }}</strong>\n      </div>\n      <div class=\"rc-stat\">\n        <span>Booked</span>\n        <strong>{{ bookedSlotsCount }}</strong>\n      </div>\n      <div class=\"rc-stat\">\n        <span>Blocked</span>\n        <strong>{{ blockedSlotsCount }}</strong>\n      </div>\n      <div class=\"rc-stat warning\">\n        <span>Utilization</span>\n        <strong>{{ totalUtilization }}%</strong>\n      </div>\n    </div>\n  </section>\n\n  <app-ai-insights-panel\n    [title]=\"'Slot AI suggestions'\"\n    [subtitle]=\"'Backend recommendations for availability optimization and demand balancing.'\"\n    [insights]=\"aiInsights\"\n    (action)=\"applyInsight($event)\"\n  />\n\n  <section class=\"rc-grid\">\n    <article class=\"card\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>{{ form.id ? 'Update slot' : 'Create slot' }}</h2>\n          <p>Full CRUD for slot inventory with backend-synced availability.</p>\n        </div>\n      </div>\n\n      <div class=\"rc-form-grid\">\n        <div class=\"form-group\">\n          <label>Machine</label>\n          <input [(ngModel)]=\"form.machine\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Date</label>\n          <input type=\"date\" [(ngModel)]=\"form.date\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Start hour</label>\n          <input type=\"number\" min=\"0\" max=\"23\" [(ngModel)]=\"form.startHour\" />\n        </div>\n        <div class=\"form-group\">\n          <label>End hour</label>\n          <input type=\"number\" min=\"1\" max=\"24\" [(ngModel)]=\"form.endHour\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Discount (%)</label>\n          <input type=\"number\" min=\"0\" max=\"100\" [(ngModel)]=\"form.discountPct\" />\n        </div>\n        <div class=\"form-group\" *ngIf=\"context.isAdmin\">\n          <label>Owner enterprise ID</label>\n          <input type=\"number\" [(ngModel)]=\"form.enterpriseId\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Status</label>\n          <select [(ngModel)]=\"form.status\">\n            <option value=\"open\">Open</option>\n            <option value=\"booked\">Booked</option>\n            <option value=\"blocked\">Blocked</option>\n          </select>\n        </div>\n        <label class=\"rc-toggle\">\n          <input type=\"checkbox\" [(ngModel)]=\"form.solar\" />\n          <span>Solar-backed slot</span>\n        </label>\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n      <div class=\"alert alert-success\" *ngIf=\"success\">{{ success }}</div>\n\n      <div class=\"rc-actions\">\n        <button class=\"btn btn-primary\" type=\"button\" (click)=\"saveSlot()\" [disabled]=\"saving\">\n          {{ saving ? 'Saving...' : (form.id ? 'Update slot' : 'Create slot') }}\n        </button>\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"resetForm()\">Clear</button>\n      </div>\n    </article>\n\n    <article class=\"card\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>Calendar view</h2>\n          <p>Weekly and monthly capacity map from backend slot data.</p>\n        </div>\n        <div class=\"rc-actions\">\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"moveCalendar(-1)\">Prev</button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"setCalendarMode('week')\">Week</button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"setCalendarMode('month')\">Month</button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"moveCalendar(1)\">Next</button>\n        </div>\n      </div>\n\n      <div class=\"rc-calendar\" *ngIf=\"calendarCells.length; else noCalendar\">\n        <div class=\"rc-calendar-cell\" *ngFor=\"let cell of calendarCells\">\n          <strong>{{ cell.label }}</strong>\n          <span>{{ cell.slotCount }} slots</span>\n          <span>{{ cell.openCount }} open</span>\n          <span>{{ cell.bookedCount }} booked</span>\n          <span>{{ cell.pendingCount }} pending req.</span>\n        </div>\n      </div>\n\n      <ng-template #noCalendar>\n        <div class=\"rc-empty\">No slot data is available for the current range.</div>\n      </ng-template>\n    </article>\n  </section>\n\n  <section class=\"card\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>Availability heatmap</h2>\n        <p>Occupancy by daypart, calculated from real slots and related reservation requests.</p>\n      </div>\n    </div>\n\n    <div class=\"rc-heatmap\" *ngIf=\"heatmapCells.length; else noHeatmap\">\n      <div class=\"rc-heatmap-cell\" *ngFor=\"let cell of heatmapCells\" [ngClass]=\"heatmapClass(cell.occupancy)\">\n        <strong>{{ cell.date }}</strong>\n        <span>{{ cell.label }}</span>\n        <span>{{ cell.occupancy }}% occupied</span>\n        <span>{{ cell.reservationCount }} requests</span>\n      </div>\n    </div>\n\n    <ng-template #noHeatmap>\n      <div class=\"rc-empty\">Heatmap data will appear once slots exist for your enterprise.</div>\n    </ng-template>\n  </section>\n\n  <section class=\"card\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>{{ context.isAdmin ? 'All slots' : 'Owned slots' }}</h2>\n        <p>{{ context.isAdmin ? 'Override all slot records.' : 'Slots where slot.ownerEnterpriseId equals your enterprise ID.' }}</p>\n      </div>\n      <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/marketplace']\" *ngIf=\"!context.isAdmin\">Browse marketplace</a>\n    </div>\n\n    <div class=\"rc-empty\" *ngIf=\"loading\">Loading slots...</div>\n    <div class=\"rc-empty\" *ngIf=\"!loading && !ownedSlots.length\">No slot records found.</div>\n\n    <table class=\"data-table\" *ngIf=\"!loading && ownedSlots.length\">\n      <thead>\n        <tr>\n          <th>Machine</th>\n          <th>Date</th>\n          <th>Window</th>\n          <th>Solar</th>\n          <th>Discount</th>\n          <th>Status</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let slot of ownedSlots\">\n          <td>{{ slot.machine }}</td>\n          <td>{{ slot.date }}</td>\n          <td>{{ slot.startHour }}:00 - {{ slot.endHour }}:00</td>\n          <td>{{ slot.solar ? 'Yes' : 'No' }}</td>\n          <td>{{ slot.discountPct || 0 }}%</td>\n          <td><app-status-chip [label]=\"slot.status\" [variant]=\"statusVariant(slot.status)\" /></td>\n          <td class=\"rc-row-actions\">\n            <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"edit(slot)\">Edit</button>\n            <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"deleteSlot(slot)\">Delete</button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n</div>\n", styles: [".rc-page {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 24px;\n  background:\n    radial-gradient(circle at top right, rgba(14, 165, 233, 0.14), transparent 32%),\n    linear-gradient(135deg, rgba(236, 253, 245, 0.96), rgba(255, 255, 255, 0.98));\n}\n\n.rc-kicker {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero h1,\n.rc-section-head h2 {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle,\n.rc-section-head p {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.55;\n}\n\n.rc-hero-stats {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(120px, 1fr));\n  gap: 12px;\n  min-width: 280px;\n}\n\n.rc-stat {\n  padding: 16px;\n  border-radius: 16px;\n  border: 1px solid rgba(22, 163, 74, 0.12);\n  background: rgba(255, 255, 255, 0.92);\n}\n\n.rc-stat.warning {\n  border-color: rgba(217, 119, 6, 0.18);\n}\n\n.rc-stat span {\n  display: block;\n  font-size: 12px;\n  color: var(--text3);\n  margin-bottom: 8px;\n}\n\n.rc-stat strong {\n  font-size: 28px;\n  color: var(--text);\n}\n\n.rc-grid {\n  display: grid;\n  grid-template-columns: 0.95fr 1.05fr;\n  gap: 18px;\n}\n\n.rc-section-head,\n.rc-row-actions,\n.rc-actions {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n\n.rc-form-grid {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n\n.rc-toggle {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 46px;\n  color: var(--text2);\n}\n\n.rc-calendar {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));\n  gap: 12px;\n}\n\n.rc-calendar-cell,\n.rc-heatmap-cell,\n.rc-empty {\n  border-radius: 14px;\n  padding: 16px;\n  border: 1px solid var(--border);\n  background: rgba(248, 250, 252, 0.9);\n}\n\n.rc-calendar-cell {\n  display: grid;\n  gap: 6px;\n}\n\n.rc-calendar-cell span,\n.rc-heatmap-cell span {\n  color: var(--text2);\n  font-size: 12px;\n}\n\n.rc-heatmap {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 12px;\n}\n\n.rc-heatmap-cell.success {\n  background: rgba(220, 252, 231, 0.9);\n}\n\n.rc-heatmap-cell.info {\n  background: rgba(224, 242, 254, 0.92);\n}\n\n.rc-heatmap-cell.warning {\n  background: rgba(255, 247, 237, 0.92);\n}\n\n.rc-heatmap-cell.danger {\n  background: rgba(254, 242, 242, 0.92);\n}\n\n@media (max-width: 1100px) {\n  .rc-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page {\n    padding: 16px;\n  }\n\n  .rc-hero {\n    flex-direction: column;\n  }\n\n  .rc-hero-stats {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    min-width: 0;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.ReservationCenterState }, { type: i3.ReservationCenterAiService }, { type: i4.ReservationCenterService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EnterpriseSlots, { className: "EnterpriseSlots", filePath: "src/app/features/enterprise/enterprise-slots/enterprise-slots.ts", lineNumber: 30 }); })();
