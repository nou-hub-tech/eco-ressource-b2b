import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../state/reservation-center.state";
import * as i2 from "../../services/reservation-center.service";
import * as i3 from "@angular/common";
function EcoLeaderboardComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1, "Loading leaderboard...");
    i0.ɵɵelementEnd();
} }
function EcoLeaderboardComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function EcoLeaderboardComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtext(1, "No leaderboard data is available yet.");
    i0.ɵɵelementEnd();
} }
function EcoLeaderboardComponent_table_11_tr_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "span", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td")(5, "div", 11);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 12);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td")(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r2 = ctx.$implicit;
    const index_r3 = ctx.index;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("#", index_r3 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r2.enterpriseName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", row_r2.usedSlots, "/", row_r2.totalSlots, " slots utilized");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.totalCo2Saved);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r2.ecoScore);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", row_r2.usageRate, "%");
} }
function EcoLeaderboardComponent_table_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 8)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Rank");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Enterprise");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Total CO2 Saved");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Eco Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Usage Rate");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, EcoLeaderboardComponent_table_11_tr_14_Template, 16, 7, "tr", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r0.rows);
} }
export class EcoLeaderboardComponent {
    state;
    workspace;
    loading = true;
    error = '';
    reservations = [];
    slots = [];
    orders = [];
    constructor(state, workspace) {
        this.state = state;
        this.workspace = workspace;
    }
    ngOnInit() {
        this.state.loadAll().subscribe({
            next: snapshot => {
                this.reservations = snapshot.reservations;
                this.slots = snapshot.slots;
                this.orders = snapshot.orders;
                this.loading = false;
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to load eco leaderboard.';
                this.loading = false;
            },
        });
    }
    get rows() {
        const map = new Map();
        const ensure = (enterpriseId, enterpriseName) => {
            if (enterpriseId == null) {
                return null;
            }
            const existing = map.get(enterpriseId);
            if (existing) {
                if (!existing.enterpriseName && enterpriseName) {
                    existing.enterpriseName = enterpriseName;
                }
                return existing;
            }
            const row = {
                enterpriseId,
                enterpriseName: enterpriseName ?? `Enterprise #${enterpriseId}`,
                totalCo2Saved: 0,
                reservationUsage: 0,
                totalSlots: 0,
                usedSlots: 0,
            };
            map.set(enterpriseId, row);
            return row;
        };
        for (const slot of this.slots) {
            const enterpriseId = slot.enterprise?.id ?? slot.enterpriseId ?? null;
            const row = ensure(enterpriseId, slot.enterprise?.companyName);
            if (!row) {
                continue;
            }
            row.totalSlots += 1;
            if (slot.status === 'booked') {
                row.usedSlots += 1;
            }
        }
        for (const reservation of this.reservations) {
            const relations = this.workspace.getReservationRelations(reservation, this.slots);
            const row = ensure(relations.providerEnterpriseId, undefined);
            if (!row) {
                continue;
            }
            row.reservationUsage += 1;
            if (reservation.status === 'CONFIRMED' && reservation.slotId != null) {
                const slot = this.slots.find(item => item.id === reservation.slotId);
                if (slot && slot.status !== 'booked') {
                    row.usedSlots += 1;
                }
            }
        }
        for (const order of this.orders) {
            const row = ensure(order.enterprise?.id ?? null, order.enterprise?.companyName);
            if (!row) {
                continue;
            }
            row.totalCo2Saved += Math.round(order.co2Saved ?? 0);
        }
        return [...map.values()]
            .map(row => {
            const usageRate = row.totalSlots ? Math.round((row.usedSlots / row.totalSlots) * 100) : 0;
            const ecoScore = Math.round(row.totalCo2Saved * 0.55 + row.reservationUsage * 10 + usageRate * 1.2);
            return {
                enterpriseId: row.enterpriseId,
                enterpriseName: row.enterpriseName || `Enterprise #${row.enterpriseId}`,
                totalCo2Saved: row.totalCo2Saved,
                ecoScore,
                usageRate,
                usedSlots: row.usedSlots,
                totalSlots: row.totalSlots,
            };
        })
            .sort((left, right) => right.ecoScore - left.ecoScore || right.totalCo2Saved - left.totalCo2Saved)
            .slice(0, 5);
    }
    static ɵfac = function EcoLeaderboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EcoLeaderboardComponent)(i0.ɵɵdirectiveInject(i1.ReservationCenterState), i0.ɵɵdirectiveInject(i2.ReservationCenterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EcoLeaderboardComponent, selectors: [["app-eco-leaderboard"]], decls: 12, vars: 4, consts: [[1, "el-card", "card"], [1, "el-head"], [1, "el-kicker"], ["class", "el-state", 4, "ngIf"], ["class", "el-state danger", 4, "ngIf"], ["class", "data-table", 4, "ngIf"], [1, "el-state"], [1, "el-state", "danger"], [1, "data-table"], [4, "ngFor", "ngForOf"], [1, "el-rank"], [1, "el-name"], [1, "el-meta"]], template: function EcoLeaderboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵtext(3, "Eco Impact Leaderboard");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h3");
            i0.ɵɵtext(5, "Top enterprises from reservation, slot, and order signals");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Global ranking based only on eco orders, reservation usage, and slot utilization.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(8, EcoLeaderboardComponent_div_8_Template, 2, 0, "div", 3)(9, EcoLeaderboardComponent_div_9_Template, 2, 1, "div", 4)(10, EcoLeaderboardComponent_div_10_Template, 2, 0, "div", 3)(11, EcoLeaderboardComponent_table_11_Template, 15, 1, "table", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.error && !ctx.rows.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.error && ctx.rows.length);
        } }, dependencies: [CommonModule, i3.NgForOf, i3.NgIf], styles: [".el-card[_ngcontent-%COMP%] {\n  padding: 18px;\n}\n\n.el-kicker[_ngcontent-%COMP%] {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 10px;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: var(--primary);\n  font-weight: 700;\n}\n\n.el-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 4px 0 6px;\n  font-family: 'Syne', sans-serif;\n  font-size: 18px;\n  color: var(--text);\n}\n\n.el-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text3);\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.el-state[_ngcontent-%COMP%] {\n  padding: 14px 0 0;\n  color: var(--text3);\n  font-size: 12px;\n}\n\n.el-state.danger[_ngcontent-%COMP%] {\n  color: var(--danger);\n}\n\n.el-rank[_ngcontent-%COMP%] {\n  display: inline-flex;\n  min-width: 42px;\n  justify-content: center;\n  padding: 4px 8px;\n  border-radius: 999px;\n  background: rgba(124, 58, 237, 0.12);\n  color: #7c3aed;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.el-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n}\n\n.el-meta[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text3);\n  margin-top: 4px;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EcoLeaderboardComponent, [{
        type: Component,
        args: [{ selector: 'app-eco-leaderboard', standalone: true, imports: [CommonModule], template: "<section class=\"el-card card\">\n  <div class=\"el-head\">\n    <div class=\"el-kicker\">Eco Impact Leaderboard</div>\n    <h3>Top enterprises from reservation, slot, and order signals</h3>\n    <p>Global ranking based only on eco orders, reservation usage, and slot utilization.</p>\n  </div>\n\n  <div class=\"el-state\" *ngIf=\"loading\">Loading leaderboard...</div>\n  <div class=\"el-state danger\" *ngIf=\"!loading && error\">{{ error }}</div>\n  <div class=\"el-state\" *ngIf=\"!loading && !error && !rows.length\">No leaderboard data is available yet.</div>\n\n  <table class=\"data-table\" *ngIf=\"!loading && !error && rows.length\">\n    <thead>\n      <tr>\n        <th>Rank</th>\n        <th>Enterprise</th>\n        <th>Total CO2 Saved</th>\n        <th>Eco Score</th>\n        <th>Usage Rate</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let row of rows; let index = index\">\n        <td><span class=\"el-rank\">#{{ index + 1 }}</span></td>\n        <td>\n          <div class=\"el-name\">{{ row.enterpriseName }}</div>\n          <div class=\"el-meta\">{{ row.usedSlots }}/{{ row.totalSlots }} slots utilized</div>\n        </td>\n        <td>{{ row.totalCo2Saved }}</td>\n        <td><strong>{{ row.ecoScore }}</strong></td>\n        <td>{{ row.usageRate }}%</td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n", styles: [".el-card {\n  padding: 18px;\n}\n\n.el-kicker {\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 10px;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: var(--primary);\n  font-weight: 700;\n}\n\n.el-head h3 {\n  margin: 4px 0 6px;\n  font-family: 'Syne', sans-serif;\n  font-size: 18px;\n  color: var(--text);\n}\n\n.el-head p {\n  margin: 0;\n  color: var(--text3);\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.el-state {\n  padding: 14px 0 0;\n  color: var(--text3);\n  font-size: 12px;\n}\n\n.el-state.danger {\n  color: var(--danger);\n}\n\n.el-rank {\n  display: inline-flex;\n  min-width: 42px;\n  justify-content: center;\n  padding: 4px 8px;\n  border-radius: 999px;\n  background: rgba(124, 58, 237, 0.12);\n  color: #7c3aed;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.el-name {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n}\n\n.el-meta {\n  font-size: 11px;\n  color: var(--text3);\n  margin-top: 4px;\n}\n"] }]
    }], () => [{ type: i1.ReservationCenterState }, { type: i2.ReservationCenterService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EcoLeaderboardComponent, { className: "EcoLeaderboardComponent", filePath: "src/app/features/reservation-center/components/eco-leaderboard/eco-leaderboard.component.ts", lineNumber: 35 }); })();
