import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../features/reservation-center/services/reservation-center.service";
import * as i4 from "../../../features/reservation-center/state/reservation-center.state";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "../../reservation-center/components/marketplace-insights/marketplace-insights.component";
const _c0 = () => ["/enterprise/marketplace"];
const _c1 = () => ["/enterprise/slots"];
const _c2 = () => ["/enterprise/reservations"];
const _c3 = () => ["/enterprise/incoming-requests"];
function Dashboard_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 47);
    i0.ɵɵlistener("click", function Dashboard_button_8_Template_button_click_0_listener() { const type_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.selectedType = type_r3); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r3.selectedType === type_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", type_r3 === "all" ? "All resources" : type_r3 + "s", " ");
} }
function Dashboard_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.error);
} }
function Dashboard_div_89_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵtext(1, "Loading resources...");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵtext(1, " No resources match your filters yet. Create a new machine, space, tool, or eco-resource to start taking requests. ");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_91_article_1_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1, "Solar backed");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_91_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 52)(1, "div", 53)(2, "span", 54);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "div", 55);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h3");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 56)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 57)(15, "span", 58);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, Dashboard_div_91_article_1_span_17_Template, 2, 0, "span", 59);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const slot_r5 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-tone", ctx_r3.resourceAccent(slot_r5.machine));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.resourceToken(slot_r5.machine));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.resourceKind(slot_r5.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.resourceName(slot_r5.machine));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slot_r5.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.slotWindow(slot_r5));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-state", slot_r5.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(slot_r5.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", slot_r5.solar);
} }
function Dashboard_div_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtemplate(1, Dashboard_div_91_article_1_Template, 18, 9, "article", 51);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.filteredOwnedResources);
} }
function Dashboard_div_102_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵtext(1, "Loading marketplace opportunities...");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵtext(1, "No open external resources match the current filters.");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_104_article_1_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slot_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", slot_r7.discountPct, "% discount");
} }
function Dashboard_div_104_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 62)(1, "div", 63)(2, "span", 55);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, Dashboard_div_104_article_1_span_4_Template, 2, 1, "span", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 64)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 65)(17, "div")(18, "strong");
    i0.ɵɵtext(19, "Pricing on request");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Provider-managed");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "button", 66);
    i0.ɵɵlistener("click", function Dashboard_div_104_article_1_Template_button_click_22_listener() { const slot_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.requestReservation(slot_r7)); });
    i0.ɵɵtext(23, "Request reservation");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const slot_r7 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.resourceKind(slot_r7.machine));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", slot_r7.discountPct);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.resourceName(slot_r7.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.providerName(slot_r7));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slot_r7.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.slotWindow(slot_r7));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r7.solar ? "Solar-backed" : "Standard energy");
} }
function Dashboard_div_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtemplate(1, Dashboard_div_104_article_1_Template, 24, 7, "article", 61);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.marketplaceResources);
} }
function Dashboard_div_115_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 69)(1, "div", 70)(2, "div")(3, "span", 55);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 58);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 71)(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const reservation_r8 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-status", ctx_r3.uiStatus(reservation_r8).toLowerCase());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r3.resourceKind(reservation_r8.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.resourceName(reservation_r8.machine));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-state", ctx_r3.uiStatus(reservation_r8).toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.uiStatus(reservation_r8));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r8.company);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(reservation_r8.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.reservationWindow(reservation_r8));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r8.solar ? "Solar-backed" : "Standard");
} }
function Dashboard_div_115_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵtemplate(1, Dashboard_div_115_article_1_Template, 18, 9, "article", 68);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.myReservations);
} }
function Dashboard_ng_template_116_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵtext(1, "No outgoing reservations yet.");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_127_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 69)(1, "div", 70)(2, "div")(3, "span", 55);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 58);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 71)(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const reservation_r9 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-status", ctx_r3.uiStatus(reservation_r9).toLowerCase());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r3.resourceKind(reservation_r9.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.resourceName(reservation_r9.machine));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-state", ctx_r3.uiStatus(reservation_r9).toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.uiStatus(reservation_r9));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r9.company);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(reservation_r9.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.reservationWindow(reservation_r9));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.workspace.detectReservationConflict(reservation_r9, ctx_r3.reservations, ctx_r3.slots).label);
} }
function Dashboard_div_127_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵtemplate(1, Dashboard_div_127_article_1_Template, 18, 9, "article", 68);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.providerReservations);
} }
function Dashboard_ng_template_128_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵtext(1, "No incoming requests are waiting on your resources.");
    i0.ɵɵelementEnd();
} }
function Dashboard_article_138_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 72)(1, "div", 73)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const action_r10 = ctx.$implicit;
    i0.ɵɵattribute("data-tone", action_r10.tone);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(action_r10.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r10.confidence);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r10.message);
} }
export class Dashboard {
    auth;
    router;
    workspace;
    state;
    loading = true;
    error = '';
    searchQuery = '';
    selectedType = 'all';
    currentEnterpriseId = null;
    companyName = 'Enterprise';
    slots = [];
    reservations = [];
    orders = [];
    displayedStats = {
        available: 0,
        reserved: 0,
        blocked: 0,
        utilization: 0,
    };
    resourceTypes = ['all', 'Machine', 'Space', 'Tool', 'Other'];
    constructor(auth, router, workspace, state) {
        this.auth = auth;
        this.router = router;
        this.workspace = workspace;
        this.state = state;
    }
    ngOnInit() {
        const currentUser = this.auth.currentUser;
        this.currentEnterpriseId = currentUser?.enterprise?.id ?? currentUser?.enterpriseId ?? null;
        this.companyName =
            currentUser?.enterprise?.companyName ??
                currentUser?.company ??
                currentUser?.name ??
                'Enterprise';
        this.state.loadAll().subscribe({
            next: snapshot => {
                this.slots = snapshot.slots;
                this.reservations = snapshot.reservations;
                this.orders = snapshot.orders;
                this.loading = false;
                this.animateStats({
                    available: this.availableCount,
                    reserved: this.reservedCount,
                    blocked: this.blockedCount,
                    utilization: this.utilization,
                });
            },
            error: error => {
                this.loading = false;
                this.error = error?.error?.message ?? 'Failed to load the enterprise dashboard.';
            },
        });
    }
    get ownedResources() {
        return this.slots
            .filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) === this.currentEnterpriseId)
            .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
    }
    get marketplaceResources() {
        return this.slots
            .filter(slot => slot.status === 'open')
            .filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) !== this.currentEnterpriseId)
            .filter(slot => this.matchesSearch(slot.machine, slot.enterprise?.companyName ?? ''))
            .filter(slot => this.selectedType === 'all' || this.resourceKind(slot.machine) === this.selectedType)
            .slice(0, 6);
    }
    get filteredOwnedResources() {
        return this.ownedResources
            .filter(slot => this.matchesSearch(slot.machine, slot.date))
            .filter(slot => this.selectedType === 'all' || this.resourceKind(slot.machine) === this.selectedType)
            .slice(0, 4);
    }
    get availableCount() {
        return this.ownedResources.filter(slot => slot.status === 'open').length;
    }
    get reservedCount() {
        return this.ownedResources.filter(slot => slot.status === 'booked').length;
    }
    get blockedCount() {
        return this.ownedResources.filter(slot => slot.status === 'blocked').length;
    }
    get utilization() {
        return this.ownedResources.length ? Math.round((this.reservedCount / this.ownedResources.length) * 100) : 0;
    }
    get utilizationStrokeOffset() {
        const circumference = 2 * Math.PI * 34;
        return circumference - (circumference * this.displayedStats.utilization) / 100;
    }
    get pendingIncomingCount() {
        return this.providerReservations.filter(item => item.status === 'PENDING').length;
    }
    get pendingOutgoingCount() {
        return this.myReservations.filter(item => item.status === 'PENDING').length;
    }
    get confirmedOrdersCount() {
        return this.orders.filter(order => order.status === 'confirmed' || order.status === 'shipped' || order.status === 'delivered').length;
    }
    get totalCo2Saved() {
        return Math.round(this.orders.reduce((sum, order) => sum + (order.co2Saved ?? 0), 0));
    }
    get providerReservations() {
        return this.reservations
            .filter(reservation => this.workspace.getReservationRelations(reservation, this.slots).providerEnterpriseId === this.currentEnterpriseId)
            .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour)
            .slice(0, 3);
    }
    get myReservations() {
        return this.reservations
            .filter(reservation => this.workspace.getReservationRelations(reservation, this.slots).consumerEnterpriseId === this.currentEnterpriseId)
            .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour)
            .slice(0, 3);
    }
    get spotlightActions() {
        const kinds = this.ownedResources.map(slot => this.resourceKind(slot.machine));
        const spaces = kinds.filter(kind => kind === 'Space').length;
        const tools = kinds.filter(kind => kind === 'Tool').length;
        const peakHour = this.peakReservationHour;
        return [
            {
                title: `Increase capacity around ${peakHour}`,
                message: 'Reservation traffic is clustering here, so a fresh open resource block is likely to convert quickly.',
                confidence: `${Math.max(72, this.utilization)}% confidence`,
                tone: 'eco',
            },
            {
                title: spaces ? 'Friday spaces are trending soft' : 'Review underused resource windows',
                message: spaces
                    ? 'Your space inventory has lighter demand later in the week. A small discount can improve fill rate.'
                    : 'Open resources with no requests yet are the best place to test a promo or wider availability window.',
                confidence: `${Math.min(96, 58 + this.availableCount * 8)}% confidence`,
                tone: 'info',
            },
            {
                title: tools ? 'Bundle underused tools with peak resources' : 'Watch blocked resources closely',
                message: tools
                    ? 'Tool inventory is lagging behind machine demand. Bundle adjacent availability to improve cross-sell.'
                    : 'Blocked resources are suppressing utilization. Reopen them where there is no confirmed conflict.',
                confidence: `${Math.min(97, 64 + this.blockedCount * 7)}% confidence`,
                tone: 'warn',
            },
        ];
    }
    get peakReservationHour() {
        const counts = new Map();
        for (const reservation of [...this.myReservations, ...this.providerReservations]) {
            counts.set(reservation.startHour, (counts.get(reservation.startHour) ?? 0) + 1);
        }
        if (!counts.size) {
            return '10 AM';
        }
        const [hour] = [...counts.entries()].sort((left, right) => right[1] - left[1])[0];
        return this.workspace.formatHour(hour);
    }
    resourceKind(value) {
        return this.workspace.resourceKind(value);
    }
    resourceName(value) {
        return this.workspace.resourceName(value);
    }
    resourceToken(value) {
        return this.workspace.resourceToken(value);
    }
    resourceAccent(value) {
        return this.workspace.resourceAccent(this.resourceKind(value));
    }
    reservationWindow(reservation) {
        return this.workspace.formatWindow(reservation.startHour, reservation.startHour + reservation.hours);
    }
    slotWindow(slot) {
        return this.workspace.formatWindow(slot.startHour, slot.endHour);
    }
    providerName(slot) {
        return slot.enterprise?.companyName ?? `Enterprise #${slot.enterprise?.id ?? slot.enterpriseId ?? ''}`;
    }
    uiStatus(reservation) {
        return this.workspace.toUiReservationStatus(reservation.status);
    }
    requestReservation(slot) {
        this.router.navigate(['/enterprise/reservations'], {
            queryParams: {
                slotId: slot.id,
                machine: slot.machine,
                date: slot.date,
                startHour: slot.startHour,
                hours: Math.max(1, slot.endHour - slot.startHour),
                solar: slot.solar,
            },
        });
    }
    matchesSearch(...values) {
        const query = this.searchQuery.trim().toLowerCase();
        if (!query) {
            return true;
        }
        return values.some(value => value.toLowerCase().includes(query));
    }
    animateStats(targets) {
        const duration = 700;
        const startedAt = performance.now();
        const tick = (now) => {
            const progress = Math.min(1, (now - startedAt) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            this.displayedStats = {
                available: Math.round(targets.available * eased),
                reserved: Math.round(targets.reserved * eased),
                blocked: Math.round(targets.blocked * eased),
                utilization: Math.round(targets.utilization * eased),
            };
            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        };
        requestAnimationFrame(tick);
    }
    static ɵfac = function Dashboard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Dashboard)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.ReservationCenterService), i0.ɵɵdirectiveInject(i4.ReservationCenterState)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Dashboard, selectors: [["app-dashboard"]], standalone: false, decls: 141, vars: 44, consts: [["noMyRequests", ""], ["noIncoming", ""], [1, "rd-page"], [1, "rd-background"], [1, "rd-command", "card"], [1, "rd-command-search"], ["placeholder", "Resources, companies, slots", 3, "ngModelChange", "ngModel"], [1, "rd-filter-row"], ["type", "button", "class", "rd-filter-chip", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "rd-command-actions"], [1, "btn", "btn-outline", 3, "routerLink"], [1, "btn", "btn-primary", 3, "routerLink"], ["class", "alert alert-danger", 4, "ngIf"], [1, "rd-hero", "card"], [1, "rd-hero-copy"], [1, "rd-kicker"], [1, "rd-subtitle"], [1, "rd-hero-badges"], [1, "rd-badge", "eco"], [1, "rd-badge", "info"], [1, "rd-badge", "neutral"], [1, "rd-hero-actions"], [1, "rd-ring-card"], [1, "rd-ring-wrap"], ["viewBox", "0 0 88 88"], ["cx", "44", "cy", "44", "r", "34"], ["cx", "44", "cy", "44", "r", "34", 1, "rd-ring-progress"], [1, "rd-ring-center"], [1, "rd-ring-copy"], [1, "rd-stats-grid"], [1, "rd-stat-card", "available"], [1, "rd-stat-card", "reserved"], [1, "rd-stat-card", "blocked"], [1, "rd-stat-card", "eco"], [1, "rd-content-grid"], [1, "card", "rd-section"], [1, "rd-section-head"], [1, "rd-section-kicker"], [1, "btn", "btn-outline", "btn-sm", 3, "routerLink"], ["class", "rd-empty", 4, "ngIf"], ["class", "rd-resource-grid", 4, "ngIf"], ["class", "rd-marketplace-grid", 4, "ngIf"], [1, "rd-lower-grid"], ["class", "rd-request-list", 4, "ngIf", "ngIfElse"], [1, "rd-ai-grid"], ["class", "rd-ai-card", 4, "ngFor", "ngForOf"], [1, "rd-fab", 3, "routerLink"], ["type", "button", 1, "rd-filter-chip", 3, "click"], [1, "alert", "alert-danger"], [1, "rd-empty"], [1, "rd-resource-grid"], ["class", "rd-resource-card", 4, "ngFor", "ngForOf"], [1, "rd-resource-card"], [1, "rd-resource-top"], [1, "rd-resource-icon"], [1, "rd-resource-type"], [1, "rd-resource-meta"], [1, "rd-resource-foot"], [1, "rd-badge"], ["class", "rd-badge eco", 4, "ngIf"], [1, "rd-marketplace-grid"], ["class", "rd-market-card", 4, "ngFor", "ngForOf"], [1, "rd-market-card"], [1, "rd-market-top"], [1, "rd-market-meta"], [1, "rd-market-foot"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "rd-request-list"], ["class", "rd-request-card", 4, "ngFor", "ngForOf"], [1, "rd-request-card"], [1, "rd-request-head"], [1, "rd-request-meta"], [1, "rd-ai-card"], [1, "rd-ai-head"]], template: function Dashboard_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelement(1, "div", 3);
            i0.ɵɵelementStart(2, "section", 4)(3, "div", 5)(4, "span");
            i0.ɵɵtext(5, "Global search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "input", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function Dashboard_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 7);
            i0.ɵɵtemplate(8, Dashboard_button_8_Template, 2, 3, "button", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 9)(10, "a", 10);
            i0.ɵɵtext(11, "Browse marketplace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "a", 11);
            i0.ɵɵtext(13, "Create resource");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(14, Dashboard_div_14_Template, 2, 1, "div", 12);
            i0.ɵɵelementStart(15, "section", 13)(16, "div", 14)(17, "p", 15);
            i0.ɵɵtext(18, "Enterprise resource hub");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "h1");
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "p", 16);
            i0.ɵɵtext(22, " Publish resources, accept incoming requests on assets you own, and reserve capacity from other enterprises without leaving the same operating surface. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 17)(24, "span", 18);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span", 19);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span", 20);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 21)(31, "a", 11);
            i0.ɵɵtext(32, "Manage resources");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "a", 10);
            i0.ɵɵtext(34, "Review reservations");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "div", 22)(36, "div", 23);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(37, "svg", 24);
            i0.ɵɵelement(38, "circle", 25)(39, "circle", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(40, "div", 27)(41, "strong");
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "span");
            i0.ɵɵtext(44, "Utilization");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(45, "div", 28)(46, "strong");
            i0.ɵɵtext(47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "p");
            i0.ɵɵtext(49, "Use smart discounts and solar-backed windows to keep demand flowing into your open inventory.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(50, "section", 29)(51, "article", 30)(52, "span");
            i0.ɵɵtext(53, "Available");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "strong");
            i0.ɵɵtext(55);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "p");
            i0.ɵɵtext(57, "Open resources ready for new reservation requests.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "article", 31)(59, "span");
            i0.ɵɵtext(60, "Reserved");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "strong");
            i0.ɵɵtext(62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "p");
            i0.ɵɵtext(64, "Booked inventory currently supporting confirmed demand.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "article", 32)(66, "span");
            i0.ɵɵtext(67, "Blocked");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "strong");
            i0.ɵɵtext(69);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "p");
            i0.ɵɵtext(71, "Resources held back from the marketplace and hurting fill rate.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(72, "article", 33)(73, "span");
            i0.ɵɵtext(74, "CO2 saved");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "strong");
            i0.ɵɵtext(76);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "p");
            i0.ɵɵtext(78, "Total kilograms of CO2 avoided across eco orders.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(79, "section", 34)(80, "article", 35)(81, "div", 36)(82, "div")(83, "p", 37);
            i0.ɵɵtext(84, "My resources");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "h2");
            i0.ɵɵtext(86, "Premium resource inventory");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(87, "a", 38);
            i0.ɵɵtext(88, "Open full view");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(89, Dashboard_div_89_Template, 2, 0, "div", 39)(90, Dashboard_div_90_Template, 2, 0, "div", 39)(91, Dashboard_div_91_Template, 2, 1, "div", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(92, "app-marketplace-insights");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "section", 35)(94, "div", 36)(95, "div")(96, "p", 37);
            i0.ɵɵtext(97, "Marketplace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "h2");
            i0.ɵɵtext(99, "Resource opportunities from other enterprises");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(100, "a", 38);
            i0.ɵɵtext(101, "View all resources");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(102, Dashboard_div_102_Template, 2, 0, "div", 39)(103, Dashboard_div_103_Template, 2, 0, "div", 39)(104, Dashboard_div_104_Template, 2, 1, "div", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "section", 42)(106, "article", 35)(107, "div", 36)(108, "div")(109, "p", 37);
            i0.ɵɵtext(110, "Reservations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "h2");
            i0.ɵɵtext(112, "My outgoing requests");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(113, "a", 38);
            i0.ɵɵtext(114, "Open workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(115, Dashboard_div_115_Template, 2, 1, "div", 43)(116, Dashboard_ng_template_116_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(118, "article", 35)(119, "div", 36)(120, "div")(121, "p", 37);
            i0.ɵɵtext(122, "Incoming requests");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(123, "h2");
            i0.ɵɵtext(124, "Provider-side decisions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(125, "a", 38);
            i0.ɵɵtext(126, "Review requests");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(127, Dashboard_div_127_Template, 2, 1, "div", 43)(128, Dashboard_ng_template_128_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(130, "section", 35)(131, "div", 36)(132, "div")(133, "p", 37);
            i0.ɵɵtext(134, "AI suggestions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(135, "h2");
            i0.ɵɵtext(136, "Contextual growth opportunities");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(137, "div", 44);
            i0.ɵɵtemplate(138, Dashboard_article_138_Template, 8, 4, "article", 45);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(139, "a", 46);
            i0.ɵɵtext(140, "+ Create Resource");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const noMyRequests_r11 = i0.ɵɵreference(117);
            const noIncoming_r12 = i0.ɵɵreference(129);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.resourceTypes);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(35, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(36, _c1));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1("", ctx.companyName, " runs one marketplace role with two real-time contexts.");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("", ctx.pendingIncomingCount, " incoming decisions");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.pendingOutgoingCount, " pending outbound requests");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.confirmedOrdersCount, " active orders");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(37, _c1));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(38, _c2));
            i0.ɵɵadvance(6);
            i0.ɵɵstyleProp("stroke-dashoffset", ctx.utilizationStrokeOffset);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", ctx.displayedStats.utilization, "%");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("Peak demand is around ", ctx.peakReservationHour);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.displayedStats.available);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.displayedStats.reserved);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.displayedStats.blocked);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.totalCo2Saved);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(39, _c1));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.filteredOwnedResources.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.filteredOwnedResources.length);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(40, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.marketplaceResources.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.marketplaceResources.length);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(41, _c2));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.myReservations.length)("ngIfElse", noMyRequests_r11);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(42, _c3));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.providerReservations.length)("ngIfElse", noIncoming_r12);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngForOf", ctx.spotlightActions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(43, _c1));
        } }, dependencies: [i5.NgForOf, i5.NgIf, i6.DefaultValueAccessor, i6.NgControlStatus, i6.NgModel, i7.MarketplaceInsightsComponent, i2.RouterLink], styles: [".rd-page[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n  overflow: hidden;\n}\n\n.rd-background[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: -10%;\n  background:\n    radial-gradient(circle at top left, rgba(34, 197, 94, 0.14), transparent 26%),\n    radial-gradient(circle at top right, rgba(59, 130, 246, 0.14), transparent 22%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(248, 250, 252, 0.2));\n  animation: _ngcontent-%COMP%_rdFloat 14s ease-in-out infinite alternate;\n  pointer-events: none;\n}\n\n.rd-page[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n.rd-command[_ngcontent-%COMP%], \n.rd-hero[_ngcontent-%COMP%], \n.rd-section[_ngcontent-%COMP%], \n.rd-stat-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.08);\n  backdrop-filter: blur(22px);\n}\n\n.rd-command[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(240px, 1.1fr) minmax(220px, 1fr) auto;\n  gap: 14px;\n  align-items: center;\n  padding: 18px;\n  border-radius: 24px;\n}\n\n.rd-command-search[_ngcontent-%COMP%], \n.rd-command-actions[_ngcontent-%COMP%], \n.rd-filter-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.rd-command-search[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  padding: 12px 14px;\n  background: rgba(255, 255, 255, 0.6);\n}\n\n.rd-command-search[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rd-section-kicker[_ngcontent-%COMP%], \n.rd-kicker[_ngcontent-%COMP%], \n.rd-resource-type[_ngcontent-%COMP%] {\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.rd-command-search[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #16a34a;\n  white-space: nowrap;\n}\n\n.rd-command-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 160px;\n  border: none;\n  outline: none;\n  background: transparent;\n  color: var(--text);\n}\n\n.rd-filter-chip[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 999px;\n  padding: 9px 14px;\n  background: rgba(255, 255, 255, 0.7);\n  color: var(--text2);\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.rd-filter-chip[_ngcontent-%COMP%]:hover, \n.rd-filter-chip.active[_ngcontent-%COMP%] {\n  transform: scale(1.02);\n  border-color: rgba(34, 197, 94, 0.28);\n  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.14);\n}\n\n.rd-filter-chip.active[_ngcontent-%COMP%] {\n  color: #166534;\n  background: linear-gradient(135deg, rgba(220, 252, 231, 0.9), rgba(219, 234, 254, 0.9));\n}\n\n.rd-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.3fr 340px;\n  gap: 18px;\n  padding: 28px;\n  border-radius: 28px;\n  overflow: hidden;\n}\n\n.rd-kicker[_ngcontent-%COMP%], \n.rd-section-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  color: #16a34a;\n}\n\n.rd-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.rd-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.rd-resource-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.rd-market-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.rd-request-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n  letter-spacing: -0.04em;\n}\n\n.rd-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(2rem, 4vw, 3.4rem);\n  line-height: 1.05;\n  max-width: 10ch;\n}\n\n.rd-subtitle[_ngcontent-%COMP%] {\n  max-width: 60ch;\n  margin: 14px 0 0;\n  color: var(--text2);\n  line-height: 1.7;\n}\n\n.rd-hero-badges[_ngcontent-%COMP%], \n.rd-hero-actions[_ngcontent-%COMP%], \n.rd-resource-foot[_ngcontent-%COMP%], \n.rd-request-meta[_ngcontent-%COMP%], \n.rd-market-meta[_ngcontent-%COMP%], \n.rd-market-foot[_ngcontent-%COMP%], \n.rd-ai-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.rd-hero-badges[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n\n.rd-hero-actions[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n\n.rd-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border-radius: 999px;\n  padding: 7px 11px;\n  font-size: 11px;\n  font-weight: 700;\n  background: rgba(255, 255, 255, 0.74);\n  color: var(--text2);\n}\n\n.rd-badge.eco[_ngcontent-%COMP%], \n.rd-badge[data-state='open'][_ngcontent-%COMP%], \n.rd-badge[data-state='confirmed'][_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.86);\n  color: #166534;\n}\n\n.rd-badge.info[_ngcontent-%COMP%], \n.rd-badge[data-state='booked'][_ngcontent-%COMP%] {\n  background: rgba(219, 234, 254, 0.9);\n  color: #1d4ed8;\n}\n\n.rd-badge[data-state='blocked'][_ngcontent-%COMP%], \n.rd-badge[data-state='rejected'][_ngcontent-%COMP%] {\n  background: rgba(254, 226, 226, 0.9);\n  color: #b91c1c;\n}\n\n.rd-badge[data-state='pending'][_ngcontent-%COMP%] {\n  background: rgba(254, 249, 195, 0.95);\n  color: #a16207;\n  animation: _ngcontent-%COMP%_rdPulse 2s infinite;\n}\n\n.rd-badge.neutral[_ngcontent-%COMP%] {\n  background: rgba(241, 245, 249, 0.9);\n  color: #475569;\n}\n\n.rd-ring-card[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: space-between;\n  gap: 16px;\n  padding: 20px;\n  border-radius: 24px;\n  background: linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.74));\n  color: #fff;\n}\n\n.rd-ring-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  width: 170px;\n  margin: 0 auto;\n}\n\n.rd-ring-wrap[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 170px;\n  height: 170px;\n  transform: rotate(-90deg);\n}\n\n.rd-ring-wrap[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.12);\n  stroke-width: 10;\n}\n\n.rd-ring-progress[_ngcontent-%COMP%] {\n  stroke: url(#rdRingGradient);\n  stroke: #22c55e;\n  stroke-linecap: round;\n  stroke-dasharray: 213.63;\n  transition: stroke-dashoffset 0.7s ease;\n}\n\n.rd-ring-center[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  text-align: center;\n}\n\n.rd-ring-center[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 36px;\n}\n\n.rd-ring-center[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rd-ring-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rd-market-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rd-request-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rd-empty[_ngcontent-%COMP%], \n.rd-stat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rd-resource-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rd-market-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rd-request-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rd-market-foot[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--text3);\n}\n\n.rd-ring-copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 16px;\n}\n\n.rd-ring-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.6;\n  color: rgba(255, 255, 255, 0.72);\n}\n\n.rd-stats-grid[_ngcontent-%COMP%], \n.rd-content-grid[_ngcontent-%COMP%], \n.rd-lower-grid[_ngcontent-%COMP%], \n.rd-resource-grid[_ngcontent-%COMP%], \n.rd-marketplace-grid[_ngcontent-%COMP%], \n.rd-ai-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n\n.rd-stats-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.rd-stat-card[_ngcontent-%COMP%] {\n  padding: 20px;\n  border-radius: 24px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rd-stat-card[_ngcontent-%COMP%]:hover, \n.rd-resource-card[_ngcontent-%COMP%]:hover, \n.rd-market-card[_ngcontent-%COMP%]:hover, \n.rd-request-card[_ngcontent-%COMP%]:hover, \n.rd-ai-card[_ngcontent-%COMP%]:hover {\n  transform: scale(1.02);\n  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12);\n}\n\n.rd-stat-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 10px;\n  font-weight: 700;\n  color: var(--text2);\n}\n\n.rd-stat-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 34px;\n  margin-bottom: 8px;\n}\n\n.rd-stat-card.available[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.rd-stat-card.reserved[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n\n.rd-stat-card.blocked[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.rd-stat-card.eco[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0f766e;\n}\n\n.rd-content-grid[_ngcontent-%COMP%] {\n  grid-template-columns: 1.25fr 0.95fr;\n}\n\n.rd-lower-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.rd-section[_ngcontent-%COMP%] {\n  padding: 22px;\n  border-radius: 24px;\n}\n\n.rd-section-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n\n.rd-resource-grid[_ngcontent-%COMP%], \n.rd-marketplace-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n}\n\n.rd-resource-card[_ngcontent-%COMP%], \n.rd-market-card[_ngcontent-%COMP%], \n.rd-request-card[_ngcontent-%COMP%], \n.rd-ai-card[_ngcontent-%COMP%] {\n  border-radius: 22px;\n  padding: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.72);\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.rd-resource-top[_ngcontent-%COMP%], \n.rd-market-top[_ngcontent-%COMP%], \n.rd-request-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.rd-resource-top[_ngcontent-%COMP%] {\n  align-items: center;\n  margin-bottom: 14px;\n}\n\n.rd-resource-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  height: 50px;\n  border-radius: 18px;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  color: #0f172a;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.24), rgba(59, 130, 246, 0.2));\n}\n\n.rd-resource-icon[data-tone='info'][_ngcontent-%COMP%] {\n  color: #1d4ed8;\n}\n\n.rd-resource-icon[data-tone='warn'][_ngcontent-%COMP%] {\n  color: #b45309;\n}\n\n.rd-resource-icon[data-tone='neutral'][_ngcontent-%COMP%] {\n  color: #475569;\n}\n\n.rd-resource-type[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-bottom: 6px;\n  color: var(--text3);\n}\n\n.rd-resource-meta[_ngcontent-%COMP%], \n.rd-market-meta[_ngcontent-%COMP%], \n.rd-request-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  margin: 14px 0;\n}\n\n.rd-market-foot[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  margin-top: 14px;\n}\n\n.rd-market-foot[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 14px;\n}\n\n.rd-request-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.rd-request-card[data-status='pending'][_ngcontent-%COMP%] {\n  border-color: rgba(250, 204, 21, 0.28);\n}\n\n.rd-request-card[data-status='confirmed'][_ngcontent-%COMP%] {\n  border-color: rgba(34, 197, 94, 0.24);\n}\n\n.rd-request-card[data-status='rejected'][_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.2);\n}\n\n.rd-ai-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n}\n\n.rd-ai-head[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n\n.rd-ai-head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.rd-ai-card[data-tone='eco'][_ngcontent-%COMP%] {\n  border-color: rgba(34, 197, 94, 0.2);\n}\n\n.rd-ai-card[data-tone='info'][_ngcontent-%COMP%] {\n  border-color: rgba(59, 130, 246, 0.2);\n}\n\n.rd-ai-card[data-tone='warn'][_ngcontent-%COMP%] {\n  border-color: rgba(250, 204, 21, 0.2);\n}\n\n.rd-ai-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  line-height: 1.6;\n  color: var(--text2);\n}\n\n.rd-empty[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 18px;\n  border: 1px dashed rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.6);\n}\n\n.rd-fab[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 28px;\n  bottom: 24px;\n  z-index: 30;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 54px;\n  padding: 0 20px;\n  border-radius: 999px;\n  text-decoration: none;\n  color: #fff;\n  font-weight: 700;\n  background: linear-gradient(135deg, #22c55e, #3b82f6);\n  box-shadow: 0 18px 45px rgba(34, 197, 94, 0.26);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rd-fab[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px) scale(1.02);\n  box-shadow: 0 22px 50px rgba(59, 130, 246, 0.28);\n}\n\n@keyframes _ngcontent-%COMP%_rdFloat {\n  from {\n    transform: translate3d(0, 0, 0) scale(1);\n  }\n  to {\n    transform: translate3d(0, 20px, 0) scale(1.04);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_rdPulse {\n  0%,\n  100% {\n    box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.26);\n  }\n  50% {\n    box-shadow: 0 0 0 10px rgba(250, 204, 21, 0);\n  }\n}\n\n@media (max-width: 1180px) {\n  .rd-command[_ngcontent-%COMP%], \n   .rd-hero[_ngcontent-%COMP%], \n   .rd-content-grid[_ngcontent-%COMP%], \n   .rd-lower-grid[_ngcontent-%COMP%], \n   .rd-stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rd-page[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .rd-hero[_ngcontent-%COMP%], \n   .rd-section[_ngcontent-%COMP%], \n   .rd-command[_ngcontent-%COMP%] {\n    padding: 18px;\n    border-radius: 20px;\n  }\n\n  .rd-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    max-width: none;\n  }\n\n  .rd-ring-wrap[_ngcontent-%COMP%] {\n    width: 140px;\n  }\n\n  .rd-ring-wrap[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 140px;\n    height: 140px;\n  }\n\n  .rd-fab[_ngcontent-%COMP%] {\n    right: 16px;\n    left: 16px;\n    bottom: 16px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Dashboard, [{
        type: Component,
        args: [{ selector: 'app-dashboard', standalone: false, template: "<div class=\"rd-page\">\n  <div class=\"rd-background\"></div>\n\n  <section class=\"rd-command card\">\n    <div class=\"rd-command-search\">\n      <span>Global search</span>\n      <input [(ngModel)]=\"searchQuery\" placeholder=\"Resources, companies, slots\" />\n    </div>\n\n    <div class=\"rd-filter-row\">\n      <button\n        type=\"button\"\n        class=\"rd-filter-chip\"\n        *ngFor=\"let type of resourceTypes\"\n        [class.active]=\"selectedType === type\"\n        (click)=\"selectedType = type\"\n      >\n        {{ type === 'all' ? 'All resources' : type + 's' }}\n      </button>\n    </div>\n\n    <div class=\"rd-command-actions\">\n      <a class=\"btn btn-outline\" [routerLink]=\"['/enterprise/marketplace']\">Browse marketplace</a>\n      <a class=\"btn btn-primary\" [routerLink]=\"['/enterprise/slots']\">Create resource</a>\n    </div>\n  </section>\n\n  <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n\n  <section class=\"rd-hero card\">\n    <div class=\"rd-hero-copy\">\n      <p class=\"rd-kicker\">Enterprise resource hub</p>\n      <h1>{{ companyName }} runs one marketplace role with two real-time contexts.</h1>\n      <p class=\"rd-subtitle\">\n        Publish resources, accept incoming requests on assets you own, and reserve capacity from other enterprises without leaving the same operating surface.\n      </p>\n\n      <div class=\"rd-hero-badges\">\n        <span class=\"rd-badge eco\">{{ pendingIncomingCount }} incoming decisions</span>\n        <span class=\"rd-badge info\">{{ pendingOutgoingCount }} pending outbound requests</span>\n        <span class=\"rd-badge neutral\">{{ confirmedOrdersCount }} active orders</span>\n      </div>\n\n      <div class=\"rd-hero-actions\">\n        <a class=\"btn btn-primary\" [routerLink]=\"['/enterprise/slots']\">Manage resources</a>\n        <a class=\"btn btn-outline\" [routerLink]=\"['/enterprise/reservations']\">Review reservations</a>\n      </div>\n    </div>\n\n    <div class=\"rd-ring-card\">\n      <div class=\"rd-ring-wrap\">\n        <svg viewBox=\"0 0 88 88\">\n          <circle cx=\"44\" cy=\"44\" r=\"34\"></circle>\n          <circle\n            class=\"rd-ring-progress\"\n            cx=\"44\"\n            cy=\"44\"\n            r=\"34\"\n            [style.stroke-dashoffset]=\"utilizationStrokeOffset\"\n          ></circle>\n        </svg>\n        <div class=\"rd-ring-center\">\n          <strong>{{ displayedStats.utilization }}%</strong>\n          <span>Utilization</span>\n        </div>\n      </div>\n\n      <div class=\"rd-ring-copy\">\n        <strong>Peak demand is around {{ peakReservationHour }}</strong>\n        <p>Use smart discounts and solar-backed windows to keep demand flowing into your open inventory.</p>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"rd-stats-grid\">\n    <article class=\"rd-stat-card available\">\n      <span>Available</span>\n      <strong>{{ displayedStats.available }}</strong>\n      <p>Open resources ready for new reservation requests.</p>\n    </article>\n    <article class=\"rd-stat-card reserved\">\n      <span>Reserved</span>\n      <strong>{{ displayedStats.reserved }}</strong>\n      <p>Booked inventory currently supporting confirmed demand.</p>\n    </article>\n    <article class=\"rd-stat-card blocked\">\n      <span>Blocked</span>\n      <strong>{{ displayedStats.blocked }}</strong>\n      <p>Resources held back from the marketplace and hurting fill rate.</p>\n    </article>\n    <article class=\"rd-stat-card eco\">\n      <span>CO2 saved</span>\n      <strong>{{ totalCo2Saved }}</strong>\n      <p>Total kilograms of CO2 avoided across eco orders.</p>\n    </article>\n  </section>\n\n  <section class=\"rd-content-grid\">\n    <article class=\"card rd-section\">\n      <div class=\"rd-section-head\">\n        <div>\n          <p class=\"rd-section-kicker\">My resources</p>\n          <h2>Premium resource inventory</h2>\n        </div>\n        <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/slots']\">Open full view</a>\n      </div>\n\n      <div class=\"rd-empty\" *ngIf=\"loading\">Loading resources...</div>\n      <div class=\"rd-empty\" *ngIf=\"!loading && !filteredOwnedResources.length\">\n        No resources match your filters yet. Create a new machine, space, tool, or eco-resource to start taking requests.\n      </div>\n\n      <div class=\"rd-resource-grid\" *ngIf=\"!loading && filteredOwnedResources.length\">\n        <article class=\"rd-resource-card\" *ngFor=\"let slot of filteredOwnedResources\">\n          <div class=\"rd-resource-top\">\n            <span class=\"rd-resource-icon\" [attr.data-tone]=\"resourceAccent(slot.machine)\">{{ resourceToken(slot.machine) }}</span>\n            <div>\n              <div class=\"rd-resource-type\">{{ resourceKind(slot.machine) }}</div>\n              <h3>{{ resourceName(slot.machine) }}</h3>\n            </div>\n          </div>\n          <div class=\"rd-resource-meta\">\n            <span>{{ slot.date }}</span>\n            <span>{{ slotWindow(slot) }}</span>\n          </div>\n          <div class=\"rd-resource-foot\">\n            <span class=\"rd-badge\" [attr.data-state]=\"slot.status\">{{ slot.status }}</span>\n            <span class=\"rd-badge eco\" *ngIf=\"slot.solar\">Solar backed</span>\n          </div>\n        </article>\n      </div>\n    </article>\n\n    <app-marketplace-insights></app-marketplace-insights>\n  </section>\n\n  <section class=\"card rd-section\">\n    <div class=\"rd-section-head\">\n      <div>\n        <p class=\"rd-section-kicker\">Marketplace</p>\n        <h2>Resource opportunities from other enterprises</h2>\n      </div>\n      <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/marketplace']\">View all resources</a>\n    </div>\n\n    <div class=\"rd-empty\" *ngIf=\"loading\">Loading marketplace opportunities...</div>\n    <div class=\"rd-empty\" *ngIf=\"!loading && !marketplaceResources.length\">No open external resources match the current filters.</div>\n\n    <div class=\"rd-marketplace-grid\" *ngIf=\"!loading && marketplaceResources.length\">\n      <article class=\"rd-market-card\" *ngFor=\"let slot of marketplaceResources\">\n        <div class=\"rd-market-top\">\n          <span class=\"rd-resource-type\">{{ resourceKind(slot.machine) }}</span>\n          <span class=\"rd-badge eco\" *ngIf=\"slot.discountPct\">{{ slot.discountPct }}% discount</span>\n        </div>\n        <h3>{{ resourceName(slot.machine) }}</h3>\n        <p>{{ providerName(slot) }}</p>\n        <div class=\"rd-market-meta\">\n          <span>{{ slot.date }}</span>\n          <span>{{ slotWindow(slot) }}</span>\n          <span>{{ slot.solar ? 'Solar-backed' : 'Standard energy' }}</span>\n        </div>\n        <div class=\"rd-market-foot\">\n          <div>\n            <strong>Pricing on request</strong>\n            <span>Provider-managed</span>\n          </div>\n          <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"requestReservation(slot)\">Request reservation</button>\n        </div>\n      </article>\n    </div>\n  </section>\n\n  <section class=\"rd-lower-grid\">\n    <article class=\"card rd-section\">\n      <div class=\"rd-section-head\">\n        <div>\n          <p class=\"rd-section-kicker\">Reservations</p>\n          <h2>My outgoing requests</h2>\n        </div>\n        <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/reservations']\">Open workspace</a>\n      </div>\n\n      <div class=\"rd-request-list\" *ngIf=\"myReservations.length; else noMyRequests\">\n        <article class=\"rd-request-card\" *ngFor=\"let reservation of myReservations\" [attr.data-status]=\"uiStatus(reservation).toLowerCase()\">\n          <div class=\"rd-request-head\">\n            <div>\n              <span class=\"rd-resource-type\">{{ resourceKind(reservation.machine) }}</span>\n              <h3>{{ resourceName(reservation.machine) }}</h3>\n            </div>\n            <span class=\"rd-badge\" [attr.data-state]=\"uiStatus(reservation).toLowerCase()\">{{ uiStatus(reservation) }}</span>\n          </div>\n          <p>{{ reservation.company }}</p>\n          <div class=\"rd-request-meta\">\n            <span>{{ reservation.date }}</span>\n            <span>{{ reservationWindow(reservation) }}</span>\n            <span>{{ reservation.solar ? 'Solar-backed' : 'Standard' }}</span>\n          </div>\n        </article>\n      </div>\n\n      <ng-template #noMyRequests>\n        <div class=\"rd-empty\">No outgoing reservations yet.</div>\n      </ng-template>\n    </article>\n\n    <article class=\"card rd-section\">\n      <div class=\"rd-section-head\">\n        <div>\n          <p class=\"rd-section-kicker\">Incoming requests</p>\n          <h2>Provider-side decisions</h2>\n        </div>\n        <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/incoming-requests']\">Review requests</a>\n      </div>\n\n      <div class=\"rd-request-list\" *ngIf=\"providerReservations.length; else noIncoming\">\n        <article class=\"rd-request-card\" *ngFor=\"let reservation of providerReservations\" [attr.data-status]=\"uiStatus(reservation).toLowerCase()\">\n          <div class=\"rd-request-head\">\n            <div>\n              <span class=\"rd-resource-type\">{{ resourceKind(reservation.machine) }}</span>\n              <h3>{{ resourceName(reservation.machine) }}</h3>\n            </div>\n            <span class=\"rd-badge\" [attr.data-state]=\"uiStatus(reservation).toLowerCase()\">{{ uiStatus(reservation) }}</span>\n          </div>\n          <p>{{ reservation.company }}</p>\n          <div class=\"rd-request-meta\">\n            <span>{{ reservation.date }}</span>\n            <span>{{ reservationWindow(reservation) }}</span>\n            <span>{{ workspace.detectReservationConflict(reservation, reservations, slots).label }}</span>\n          </div>\n        </article>\n      </div>\n\n      <ng-template #noIncoming>\n        <div class=\"rd-empty\">No incoming requests are waiting on your resources.</div>\n      </ng-template>\n    </article>\n  </section>\n\n  <section class=\"card rd-section\">\n    <div class=\"rd-section-head\">\n      <div>\n        <p class=\"rd-section-kicker\">AI suggestions</p>\n        <h2>Contextual growth opportunities</h2>\n      </div>\n    </div>\n\n    <div class=\"rd-ai-grid\">\n      <article class=\"rd-ai-card\" *ngFor=\"let action of spotlightActions\" [attr.data-tone]=\"action.tone\">\n        <div class=\"rd-ai-head\">\n          <strong>{{ action.title }}</strong>\n          <span>{{ action.confidence }}</span>\n        </div>\n        <p>{{ action.message }}</p>\n      </article>\n    </div>\n  </section>\n\n  <a class=\"rd-fab\" [routerLink]=\"['/enterprise/slots']\">+ Create Resource</a>\n</div>\n", styles: [".rd-page {\n  position: relative;\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n  overflow: hidden;\n}\n\n.rd-background {\n  position: absolute;\n  inset: -10%;\n  background:\n    radial-gradient(circle at top left, rgba(34, 197, 94, 0.14), transparent 26%),\n    radial-gradient(circle at top right, rgba(59, 130, 246, 0.14), transparent 22%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(248, 250, 252, 0.2));\n  animation: rdFloat 14s ease-in-out infinite alternate;\n  pointer-events: none;\n}\n\n.rd-page > * {\n  position: relative;\n  z-index: 1;\n}\n\n.rd-command,\n.rd-hero,\n.rd-section,\n.rd-stat-card {\n  background: rgba(255, 255, 255, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 18px 60px rgba(15, 23, 42, 0.08);\n  backdrop-filter: blur(22px);\n}\n\n.rd-command {\n  display: grid;\n  grid-template-columns: minmax(240px, 1.1fr) minmax(220px, 1fr) auto;\n  gap: 14px;\n  align-items: center;\n  padding: 18px;\n  border-radius: 24px;\n}\n\n.rd-command-search,\n.rd-command-actions,\n.rd-filter-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.rd-command-search {\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  padding: 12px 14px;\n  background: rgba(255, 255, 255, 0.6);\n}\n\n.rd-command-search span,\n.rd-section-kicker,\n.rd-kicker,\n.rd-resource-type {\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.rd-command-search span {\n  color: #16a34a;\n  white-space: nowrap;\n}\n\n.rd-command-search input {\n  flex: 1;\n  min-width: 160px;\n  border: none;\n  outline: none;\n  background: transparent;\n  color: var(--text);\n}\n\n.rd-filter-chip {\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 999px;\n  padding: 9px 14px;\n  background: rgba(255, 255, 255, 0.7);\n  color: var(--text2);\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.rd-filter-chip:hover,\n.rd-filter-chip.active {\n  transform: scale(1.02);\n  border-color: rgba(34, 197, 94, 0.28);\n  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.14);\n}\n\n.rd-filter-chip.active {\n  color: #166534;\n  background: linear-gradient(135deg, rgba(220, 252, 231, 0.9), rgba(219, 234, 254, 0.9));\n}\n\n.rd-hero {\n  display: grid;\n  grid-template-columns: 1.3fr 340px;\n  gap: 18px;\n  padding: 28px;\n  border-radius: 28px;\n  overflow: hidden;\n}\n\n.rd-kicker,\n.rd-section-kicker {\n  margin: 0 0 10px;\n  color: #16a34a;\n}\n\n.rd-hero h1,\n.rd-section h2,\n.rd-resource-card h3,\n.rd-market-card h3,\n.rd-request-card h3 {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n  letter-spacing: -0.04em;\n}\n\n.rd-hero h1 {\n  font-size: clamp(2rem, 4vw, 3.4rem);\n  line-height: 1.05;\n  max-width: 10ch;\n}\n\n.rd-subtitle {\n  max-width: 60ch;\n  margin: 14px 0 0;\n  color: var(--text2);\n  line-height: 1.7;\n}\n\n.rd-hero-badges,\n.rd-hero-actions,\n.rd-resource-foot,\n.rd-request-meta,\n.rd-market-meta,\n.rd-market-foot,\n.rd-ai-head {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.rd-hero-badges {\n  margin-top: 20px;\n}\n\n.rd-hero-actions {\n  margin-top: 24px;\n}\n\n.rd-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  border-radius: 999px;\n  padding: 7px 11px;\n  font-size: 11px;\n  font-weight: 700;\n  background: rgba(255, 255, 255, 0.74);\n  color: var(--text2);\n}\n\n.rd-badge.eco,\n.rd-badge[data-state='open'],\n.rd-badge[data-state='confirmed'] {\n  background: rgba(220, 252, 231, 0.86);\n  color: #166534;\n}\n\n.rd-badge.info,\n.rd-badge[data-state='booked'] {\n  background: rgba(219, 234, 254, 0.9);\n  color: #1d4ed8;\n}\n\n.rd-badge[data-state='blocked'],\n.rd-badge[data-state='rejected'] {\n  background: rgba(254, 226, 226, 0.9);\n  color: #b91c1c;\n}\n\n.rd-badge[data-state='pending'] {\n  background: rgba(254, 249, 195, 0.95);\n  color: #a16207;\n  animation: rdPulse 2s infinite;\n}\n\n.rd-badge.neutral {\n  background: rgba(241, 245, 249, 0.9);\n  color: #475569;\n}\n\n.rd-ring-card {\n  display: grid;\n  align-content: space-between;\n  gap: 16px;\n  padding: 20px;\n  border-radius: 24px;\n  background: linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.74));\n  color: #fff;\n}\n\n.rd-ring-wrap {\n  position: relative;\n  width: 170px;\n  margin: 0 auto;\n}\n\n.rd-ring-wrap svg {\n  width: 170px;\n  height: 170px;\n  transform: rotate(-90deg);\n}\n\n.rd-ring-wrap circle {\n  fill: none;\n  stroke: rgba(255, 255, 255, 0.12);\n  stroke-width: 10;\n}\n\n.rd-ring-progress {\n  stroke: url(#rdRingGradient);\n  stroke: #22c55e;\n  stroke-linecap: round;\n  stroke-dasharray: 213.63;\n  transition: stroke-dashoffset 0.7s ease;\n}\n\n.rd-ring-center {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  text-align: center;\n}\n\n.rd-ring-center strong {\n  font-size: 36px;\n}\n\n.rd-ring-center span,\n.rd-ring-copy p,\n.rd-market-card p,\n.rd-request-card p,\n.rd-empty,\n.rd-stat-card p,\n.rd-resource-meta span,\n.rd-market-meta span,\n.rd-request-meta span,\n.rd-market-foot span {\n  color: var(--text3);\n}\n\n.rd-ring-copy strong {\n  display: block;\n  margin-bottom: 6px;\n  font-size: 16px;\n}\n\n.rd-ring-copy p {\n  margin: 0;\n  line-height: 1.6;\n  color: rgba(255, 255, 255, 0.72);\n}\n\n.rd-stats-grid,\n.rd-content-grid,\n.rd-lower-grid,\n.rd-resource-grid,\n.rd-marketplace-grid,\n.rd-ai-grid {\n  display: grid;\n  gap: 16px;\n}\n\n.rd-stats-grid {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.rd-stat-card {\n  padding: 20px;\n  border-radius: 24px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rd-stat-card:hover,\n.rd-resource-card:hover,\n.rd-market-card:hover,\n.rd-request-card:hover,\n.rd-ai-card:hover {\n  transform: scale(1.02);\n  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12);\n}\n\n.rd-stat-card span {\n  display: block;\n  margin-bottom: 10px;\n  font-weight: 700;\n  color: var(--text2);\n}\n\n.rd-stat-card strong {\n  display: block;\n  font-size: 34px;\n  margin-bottom: 8px;\n}\n\n.rd-stat-card.available strong {\n  color: #16a34a;\n}\n\n.rd-stat-card.reserved strong {\n  color: #2563eb;\n}\n\n.rd-stat-card.blocked strong {\n  color: #dc2626;\n}\n\n.rd-stat-card.eco strong {\n  color: #0f766e;\n}\n\n.rd-content-grid {\n  grid-template-columns: 1.25fr 0.95fr;\n}\n\n.rd-lower-grid {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.rd-section {\n  padding: 22px;\n  border-radius: 24px;\n}\n\n.rd-section-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n\n.rd-resource-grid,\n.rd-marketplace-grid {\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n}\n\n.rd-resource-card,\n.rd-market-card,\n.rd-request-card,\n.rd-ai-card {\n  border-radius: 22px;\n  padding: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.72);\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.rd-resource-top,\n.rd-market-top,\n.rd-request-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.rd-resource-top {\n  align-items: center;\n  margin-bottom: 14px;\n}\n\n.rd-resource-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  height: 50px;\n  border-radius: 18px;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  color: #0f172a;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.24), rgba(59, 130, 246, 0.2));\n}\n\n.rd-resource-icon[data-tone='info'] {\n  color: #1d4ed8;\n}\n\n.rd-resource-icon[data-tone='warn'] {\n  color: #b45309;\n}\n\n.rd-resource-icon[data-tone='neutral'] {\n  color: #475569;\n}\n\n.rd-resource-type {\n  display: inline-block;\n  margin-bottom: 6px;\n  color: var(--text3);\n}\n\n.rd-resource-meta,\n.rd-market-meta,\n.rd-request-meta {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n  margin: 14px 0;\n}\n\n.rd-market-foot {\n  justify-content: space-between;\n  margin-top: 14px;\n}\n\n.rd-market-foot strong {\n  display: block;\n  font-size: 14px;\n}\n\n.rd-request-list {\n  display: grid;\n  gap: 12px;\n}\n\n.rd-request-card[data-status='pending'] {\n  border-color: rgba(250, 204, 21, 0.28);\n}\n\n.rd-request-card[data-status='confirmed'] {\n  border-color: rgba(34, 197, 94, 0.24);\n}\n\n.rd-request-card[data-status='rejected'] {\n  border-color: rgba(239, 68, 68, 0.2);\n}\n\n.rd-ai-grid {\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n}\n\n.rd-ai-head {\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n\n.rd-ai-head span {\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.rd-ai-card[data-tone='eco'] {\n  border-color: rgba(34, 197, 94, 0.2);\n}\n\n.rd-ai-card[data-tone='info'] {\n  border-color: rgba(59, 130, 246, 0.2);\n}\n\n.rd-ai-card[data-tone='warn'] {\n  border-color: rgba(250, 204, 21, 0.2);\n}\n\n.rd-ai-card p {\n  margin: 0;\n  line-height: 1.6;\n  color: var(--text2);\n}\n\n.rd-empty {\n  padding: 18px;\n  border-radius: 18px;\n  border: 1px dashed rgba(148, 163, 184, 0.22);\n  background: rgba(255, 255, 255, 0.6);\n}\n\n.rd-fab {\n  position: fixed;\n  right: 28px;\n  bottom: 24px;\n  z-index: 30;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 54px;\n  padding: 0 20px;\n  border-radius: 999px;\n  text-decoration: none;\n  color: #fff;\n  font-weight: 700;\n  background: linear-gradient(135deg, #22c55e, #3b82f6);\n  box-shadow: 0 18px 45px rgba(34, 197, 94, 0.26);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rd-fab:hover {\n  transform: translateY(-2px) scale(1.02);\n  box-shadow: 0 22px 50px rgba(59, 130, 246, 0.28);\n}\n\n@keyframes rdFloat {\n  from {\n    transform: translate3d(0, 0, 0) scale(1);\n  }\n  to {\n    transform: translate3d(0, 20px, 0) scale(1.04);\n  }\n}\n\n@keyframes rdPulse {\n  0%,\n  100% {\n    box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.26);\n  }\n  50% {\n    box-shadow: 0 0 0 10px rgba(250, 204, 21, 0);\n  }\n}\n\n@media (max-width: 1180px) {\n  .rd-command,\n  .rd-hero,\n  .rd-content-grid,\n  .rd-lower-grid,\n  .rd-stats-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rd-page {\n    padding: 16px;\n  }\n\n  .rd-hero,\n  .rd-section,\n  .rd-command {\n    padding: 18px;\n    border-radius: 20px;\n  }\n\n  .rd-hero h1 {\n    max-width: none;\n  }\n\n  .rd-ring-wrap {\n    width: 140px;\n  }\n\n  .rd-ring-wrap svg {\n    width: 140px;\n    height: 140px;\n  }\n\n  .rd-fab {\n    right: 16px;\n    left: 16px;\n    bottom: 16px;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }, { type: i3.ReservationCenterService }, { type: i4.ReservationCenterState }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Dashboard, { className: "Dashboard", filePath: "src/app/features/enterprise/dashboard/dashboard.ts", lineNumber: 30 }); })();
