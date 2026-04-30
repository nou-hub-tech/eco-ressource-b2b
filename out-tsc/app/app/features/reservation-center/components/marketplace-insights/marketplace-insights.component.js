import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../../core/services/auth.service";
import * as i2 from "../../state/reservation-center.state";
import * as i3 from "../../services/reservation-center.service";
import * as i4 from "@angular/common";
function MarketplaceInsightsComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1, "Loading insights...");
    i0.ɵɵelementEnd();
} }
function MarketplaceInsightsComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function MarketplaceInsightsComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1, "No reservation-slot-order activity is available yet.");
    i0.ɵɵelementEnd();
} }
function MarketplaceInsightsComponent_div_11_article_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 15)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const metric_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r2.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r2.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r2.detail);
} }
function MarketplaceInsightsComponent_div_11_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r3.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", row_r3.requests, " req.");
} }
function MarketplaceInsightsComponent_div_11_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵtext(1, "No slot demand recorded yet.");
    i0.ɵɵelementEnd();
} }
function MarketplaceInsightsComponent_div_11_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r4);
} }
function MarketplaceInsightsComponent_div_11_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵtext(1, "Every owned slot already has reservation activity.");
    i0.ɵɵelementEnd();
} }
function MarketplaceInsightsComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 8);
    i0.ɵɵtemplate(2, MarketplaceInsightsComponent_div_11_article_2_Template, 7, 3, "article", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 10)(4, "div", 11)(5, "div", 12);
    i0.ɵɵtext(6, "Most requested slots");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, MarketplaceInsightsComponent_div_11_div_7_Template, 5, 2, "div", 13)(8, MarketplaceInsightsComponent_div_11_div_8_Template, 2, 0, "div", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 11)(10, "div", 12);
    i0.ɵɵtext(11, "Low-demand periods");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, MarketplaceInsightsComponent_div_11_div_12_Template, 3, 1, "div", 13)(13, MarketplaceInsightsComponent_div_11_div_13_Template, 2, 0, "div", 14);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.metrics);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r0.requestedSlotRows);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.requestedSlotRows.length);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r0.lowDemandRows);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.lowDemandRows.length);
} }
export class MarketplaceInsightsComponent {
    auth;
    state;
    workspace;
    loading = true;
    error = '';
    reservations = [];
    slots = [];
    orders = [];
    currentEnterpriseId = null;
    constructor(auth, state, workspace) {
        this.auth = auth;
        this.state = state;
        this.workspace = workspace;
    }
    ngOnInit() {
        this.currentEnterpriseId = this.auth.currentUser?.enterprise?.id ?? this.auth.currentUser?.enterpriseId ?? null;
        this.state.loadAll().subscribe({
            next: snapshot => {
                this.reservations = snapshot.reservations;
                this.slots = snapshot.slots;
                this.orders = snapshot.orders;
                this.loading = false;
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to load marketplace insights.';
                this.loading = false;
            },
        });
    }
    get metrics() {
        const reservations = this.linkedReservations;
        const ownedSlots = this.ownedSlots;
        const peakHour = this.peakHourLabel(reservations);
        const confirmationRate = reservations.length
            ? Math.round((reservations.filter(item => item.status === 'CONFIRMED').length / reservations.length) * 100)
            : 0;
        const lowDemandCount = this.lowDemandRows.length;
        const ecoOrders = this.relatedOrders.length;
        return [
            {
                label: 'Peak reservation hour',
                value: peakHour,
                detail: `${reservations.length} linked request(s) analyzed`,
            },
            {
                label: 'Confirmation rate',
                value: `${confirmationRate}%`,
                detail: `${ecoOrders} eco order(s) linked to this enterprise`,
            },
            {
                label: 'Owned slot coverage',
                value: `${ownedSlots.length}`,
                detail: `${lowDemandCount} low-demand period(s) detected`,
            },
        ];
    }
    get requestedSlotRows() {
        const demand = new Map();
        for (const reservation of this.providerReservations) {
            const slot = this.slots.find(item => item.id === reservation.slotId);
            const key = slot
                ? `${slot.id}`
                : `${reservation.machine}-${reservation.date}-${reservation.startHour}`;
            const label = slot
                ? `${slot.machine} · ${slot.date} · ${slot.startHour}:00-${slot.endHour}:00`
                : `${reservation.machine} · ${reservation.date} · ${reservation.startHour}:00`;
            const existing = demand.get(key);
            if (existing) {
                existing.requests += 1;
            }
            else {
                demand.set(key, { label, requests: 1 });
            }
        }
        return [...demand.values()]
            .sort((left, right) => right.requests - left.requests || left.label.localeCompare(right.label))
            .slice(0, 3);
    }
    get lowDemandRows() {
        return this.ownedSlots
            .filter(slot => !this.providerReservations.some(reservation => reservation.slotId === slot.id))
            .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour)
            .slice(0, 3)
            .map(slot => `${slot.date} · ${slot.startHour}:00-${slot.endHour}:00 · ${slot.machine}`);
    }
    get empty() {
        return !this.linkedReservations.length && !this.ownedSlots.length && !this.relatedOrders.length;
    }
    get linkedReservations() {
        return this.reservations.filter(reservation => {
            const relations = this.workspace.getReservationRelations(reservation, this.slots);
            return relations.consumerEnterpriseId === this.currentEnterpriseId || relations.providerEnterpriseId === this.currentEnterpriseId;
        });
    }
    get providerReservations() {
        return this.reservations.filter(reservation => {
            const relations = this.workspace.getReservationRelations(reservation, this.slots);
            return relations.providerEnterpriseId === this.currentEnterpriseId;
        });
    }
    get ownedSlots() {
        return this.slots.filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) === this.currentEnterpriseId);
    }
    get relatedOrders() {
        return this.orders.filter(order => (order.enterprise?.id ?? null) === this.currentEnterpriseId);
    }
    peakHourLabel(reservations) {
        if (!reservations.length) {
            return 'No demand yet';
        }
        const grouped = new Map();
        for (const reservation of reservations) {
            const count = grouped.get(reservation.startHour) ?? 0;
            grouped.set(reservation.startHour, count + 1);
        }
        const peak = [...grouped.entries()].sort((left, right) => right[1] - left[1] || left[0] - right[0])[0];
        return peak ? `${peak[0]}:00` : 'No demand yet';
    }
    static ɵfac = function MarketplaceInsightsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MarketplaceInsightsComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.ReservationCenterState), i0.ɵɵdirectiveInject(i3.ReservationCenterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MarketplaceInsightsComponent, selectors: [["app-marketplace-insights"]], decls: 12, vars: 4, consts: [[1, "mi-card"], [1, "mi-head"], [1, "mi-kicker"], ["class", "mi-state", 4, "ngIf"], ["class", "mi-state danger", 4, "ngIf"], [4, "ngIf"], [1, "mi-state"], [1, "mi-state", "danger"], [1, "mi-grid"], ["class", "mi-metric", 4, "ngFor", "ngForOf"], [1, "mi-columns"], [1, "mi-panel"], [1, "mi-panel-title"], ["class", "mi-row", 4, "ngFor", "ngForOf"], ["class", "mi-row empty", 4, "ngIf"], [1, "mi-metric"], [1, "mi-row"], [1, "mi-row", "empty"]], template: function MarketplaceInsightsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵtext(3, "Smart Marketplace Insights");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h3");
            i0.ɵɵtext(5, "Reservation, slot, and order intelligence");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Computed only from your enterprise-linked reservations, reservation slots, and eco orders.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(8, MarketplaceInsightsComponent_div_8_Template, 2, 0, "div", 3)(9, MarketplaceInsightsComponent_div_9_Template, 2, 1, "div", 4)(10, MarketplaceInsightsComponent_div_10_Template, 2, 0, "div", 3)(11, MarketplaceInsightsComponent_div_11_Template, 14, 5, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.error && ctx.empty);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.error && !ctx.empty);
        } }, dependencies: [CommonModule, i4.NgForOf, i4.NgIf], styles: [".mi-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  background: var(--card);\n  padding: 16px;\n}\n\n.mi-kicker[_ngcontent-%COMP%] {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 10px;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: var(--primary);\n  font-weight: 700;\n}\n\n.mi-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 4px 0 6px;\n  font-family: 'Syne', sans-serif;\n  font-size: 16px;\n  color: var(--text);\n}\n\n.mi-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text3);\n  font-size: 12px;\n  line-height: 1.5;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 12px;\n  margin-top: 14px;\n}\n\n.mi-metric[_ngcontent-%COMP%] {\n  padding: 14px;\n  border-radius: 12px;\n  border: 1px solid var(--border);\n  background: linear-gradient(180deg, rgba(0, 173, 181, 0.04), rgba(255, 255, 255, 0));\n}\n\n.mi-metric[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: var(--text3);\n  margin-bottom: 8px;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-metric[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 24px;\n  color: var(--text);\n  margin-bottom: 6px;\n}\n\n.mi-metric[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  color: var(--text3);\n  line-height: 1.45;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n  margin-top: 12px;\n}\n\n.mi-panel[_ngcontent-%COMP%] {\n  padding: 14px;\n  border-radius: 12px;\n  border: 1px solid var(--border);\n  background: rgba(248, 250, 252, 0.78);\n}\n\n.mi-panel-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--text3);\n  margin-bottom: 10px;\n  font-weight: 700;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 0;\n  border-bottom: 1px solid var(--border);\n  color: var(--text2);\n  font-size: 12px;\n  line-height: 1.45;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.mi-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n  white-space: nowrap;\n}\n\n.mi-row.empty[_ngcontent-%COMP%], \n.mi-state[_ngcontent-%COMP%] {\n  color: var(--text3);\n  font-size: 12px;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-state[_ngcontent-%COMP%] {\n  margin-top: 14px;\n}\n\n.mi-state.danger[_ngcontent-%COMP%] {\n  color: var(--danger);\n}\n\n@media (max-width: 768px) {\n  .mi-columns[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MarketplaceInsightsComponent, [{
        type: Component,
        args: [{ selector: 'app-marketplace-insights', standalone: true, imports: [CommonModule], template: "<section class=\"mi-card\">\n  <div class=\"mi-head\">\n    <div class=\"mi-kicker\">Smart Marketplace Insights</div>\n    <h3>Reservation, slot, and order intelligence</h3>\n    <p>Computed only from your enterprise-linked reservations, reservation slots, and eco orders.</p>\n  </div>\n\n  <div class=\"mi-state\" *ngIf=\"loading\">Loading insights...</div>\n  <div class=\"mi-state danger\" *ngIf=\"!loading && error\">{{ error }}</div>\n  <div class=\"mi-state\" *ngIf=\"!loading && !error && empty\">No reservation-slot-order activity is available yet.</div>\n\n  <div *ngIf=\"!loading && !error && !empty\">\n    <div class=\"mi-grid\">\n      <article class=\"mi-metric\" *ngFor=\"let metric of metrics\">\n        <span>{{ metric.label }}</span>\n        <strong>{{ metric.value }}</strong>\n        <p>{{ metric.detail }}</p>\n      </article>\n    </div>\n\n    <div class=\"mi-columns\">\n      <div class=\"mi-panel\">\n        <div class=\"mi-panel-title\">Most requested slots</div>\n        <div class=\"mi-row\" *ngFor=\"let row of requestedSlotRows\">\n          <span>{{ row.label }}</span>\n          <strong>{{ row.requests }} req.</strong>\n        </div>\n        <div class=\"mi-row empty\" *ngIf=\"!requestedSlotRows.length\">No slot demand recorded yet.</div>\n      </div>\n\n      <div class=\"mi-panel\">\n        <div class=\"mi-panel-title\">Low-demand periods</div>\n        <div class=\"mi-row\" *ngFor=\"let row of lowDemandRows\">\n          <span>{{ row }}</span>\n        </div>\n        <div class=\"mi-row empty\" *ngIf=\"!lowDemandRows.length\">Every owned slot already has reservation activity.</div>\n      </div>\n    </div>\n  </div>\n</section>\n", styles: [".mi-card {\n  border: 1px solid var(--border);\n  border-radius: 12px;\n  background: var(--card);\n  padding: 16px;\n}\n\n.mi-kicker {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 10px;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: var(--primary);\n  font-weight: 700;\n}\n\n.mi-head h3 {\n  margin: 4px 0 6px;\n  font-family: 'Syne', sans-serif;\n  font-size: 16px;\n  color: var(--text);\n}\n\n.mi-head p {\n  margin: 0;\n  color: var(--text3);\n  font-size: 12px;\n  line-height: 1.5;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 12px;\n  margin-top: 14px;\n}\n\n.mi-metric {\n  padding: 14px;\n  border-radius: 12px;\n  border: 1px solid var(--border);\n  background: linear-gradient(180deg, rgba(0, 173, 181, 0.04), rgba(255, 255, 255, 0));\n}\n\n.mi-metric span {\n  display: block;\n  font-size: 11px;\n  color: var(--text3);\n  margin-bottom: 8px;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-metric strong {\n  display: block;\n  font-size: 24px;\n  color: var(--text);\n  margin-bottom: 6px;\n}\n\n.mi-metric p {\n  margin: 0;\n  font-size: 11px;\n  color: var(--text3);\n  line-height: 1.45;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-columns {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n  margin-top: 12px;\n}\n\n.mi-panel {\n  padding: 14px;\n  border-radius: 12px;\n  border: 1px solid var(--border);\n  background: rgba(248, 250, 252, 0.78);\n}\n\n.mi-panel-title {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: var(--text3);\n  margin-bottom: 10px;\n  font-weight: 700;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 0;\n  border-bottom: 1px solid var(--border);\n  color: var(--text2);\n  font-size: 12px;\n  line-height: 1.45;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-row:last-child {\n  border-bottom: none;\n}\n\n.mi-row strong {\n  color: var(--text);\n  white-space: nowrap;\n}\n\n.mi-row.empty,\n.mi-state {\n  color: var(--text3);\n  font-size: 12px;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.mi-state {\n  margin-top: 14px;\n}\n\n.mi-state.danger {\n  color: var(--danger);\n}\n\n@media (max-width: 768px) {\n  .mi-columns {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.ReservationCenterState }, { type: i3.ReservationCenterService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MarketplaceInsightsComponent, { className: "MarketplaceInsightsComponent", filePath: "src/app/features/reservation-center/components/marketplace-insights/marketplace-insights.component.ts", lineNumber: 28 }); })();
