import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../features/reservation-center/state/reservation-center.state";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
function Marketplace_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1, "Loading marketplace slots...");
    i0.ɵɵelementEnd();
} }
function Marketplace_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function Marketplace_section_20_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 15)(1, "div", 16)(2, "span", 17);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 18);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 19)(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "button", 20);
    i0.ɵɵlistener("click", function Marketplace_section_20_article_1_Template_button_click_17_listener() { const slot_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.reserve(slot_r3)); });
    i0.ɵɵtext(18, "Request reservation");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const slot_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slot_r3.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", slot_r3.discountPct || 0, "% off");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r3.machine);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((slot_r3.enterprise == null ? null : slot_r3.enterprise.companyName) || "Enterprise #" + ((slot_r3.enterprise == null ? null : slot_r3.enterprise.id) ?? slot_r3.enterpriseId));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slot_r3.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", slot_r3.startHour, ":00 - ", slot_r3.endHour, ":00");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r3.solar ? "Solar-backed" : "Standard power");
} }
function Marketplace_section_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 13);
    i0.ɵɵtemplate(1, Marketplace_section_20_article_1_Template, 19, 8, "article", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.marketplaceSlots);
} }
function Marketplace_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtext(1, " No open slots match the current filters. ");
    i0.ɵɵelementEnd();
} }
export class Marketplace {
    auth;
    router;
    state;
    loading = true;
    error = '';
    search = '';
    solarOnly = false;
    slots = [];
    currentEnterpriseId = null;
    constructor(auth, router, state) {
        this.auth = auth;
        this.router = router;
        this.state = state;
    }
    ngOnInit() {
        this.currentEnterpriseId = this.auth.currentUser?.enterprise?.id ?? this.auth.currentUser?.enterpriseId ?? null;
        this.state.loadAll().subscribe({
            next: snapshot => {
                this.loading = false;
                this.slots = snapshot.slots;
            },
            error: error => {
                this.loading = false;
                this.error = error?.error?.message ?? 'Failed to load marketplace slots.';
            },
        });
    }
    get marketplaceSlots() {
        const query = this.search.trim().toLowerCase();
        return this.slots
            .filter(slot => slot.status === 'open')
            .filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) !== this.currentEnterpriseId)
            .filter(slot => !this.solarOnly || slot.solar)
            .filter(slot => {
            if (!query) {
                return true;
            }
            const provider = slot.enterprise?.companyName ?? `enterprise ${slot.enterprise?.id ?? slot.enterpriseId ?? ''}`;
            return [slot.machine, slot.date, provider].some(value => value.toLowerCase().includes(query));
        })
            .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
    }
    reserve(slot) {
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
    static ɵfac = function Marketplace_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Marketplace)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.ReservationCenterState)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Marketplace, selectors: [["app-marketplace"]], standalone: false, decls: 22, vars: 6, consts: [[1, "mkt-page"], [1, "mkt-hero", "card"], [1, "mkt-kicker"], [1, "mkt-toolbar"], [1, "search-box"], ["placeholder", "Machine, provider, date", 3, "ngModelChange", "ngModel"], [1, "mkt-toggle"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["class", "mkt-empty", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "mkt-grid", 4, "ngIf"], [1, "mkt-empty"], [1, "alert", "alert-danger"], [1, "mkt-grid"], ["class", "mkt-card", 4, "ngFor", "ngForOf"], [1, "mkt-card"], [1, "mkt-card-top"], [1, "badge", "badge-success"], [1, "badge", "badge-info"], [1, "mkt-meta"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]], template: function Marketplace_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "section", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Marketplace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Browse external slots");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8, " This catalog is backend-driven and only shows open slots owned by other enterprises. Reservation requests stay pending until the slot owner makes a decision. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 3)(10, "div", 4)(11, "span");
            i0.ɵɵtext(12, "Search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "input", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function Marketplace_Template_input_ngModelChange_13_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.search, $event) || (ctx.search = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "label", 6)(15, "input", 7);
            i0.ɵɵtwoWayListener("ngModelChange", function Marketplace_Template_input_ngModelChange_15_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.solarOnly, $event) || (ctx.solarOnly = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span");
            i0.ɵɵtext(17, "Solar only");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(18, Marketplace_div_18_Template, 2, 0, "div", 8)(19, Marketplace_div_19_Template, 2, 1, "div", 9)(20, Marketplace_section_20_Template, 2, 1, "section", 10)(21, Marketplace_div_21_Template, 2, 0, "div", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(13);
            i0.ɵɵtwoWayProperty("ngModel", ctx.search);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.solarOnly);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.marketplaceSlots.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.marketplaceSlots.length);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i5.DefaultValueAccessor, i5.CheckboxControlValueAccessor, i5.NgControlStatus, i5.NgModel], styles: [".mkt-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.mkt-hero[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  padding: 24px;\n  background:\n    radial-gradient(circle at top right, rgba(22, 163, 74, 0.16), transparent 34%),\n    linear-gradient(135deg, rgba(236, 253, 245, 0.96), rgba(255, 255, 255, 0.98));\n}\n\n.mkt-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.mkt-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.mkt-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.55;\n}\n\n.mkt-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: center;\n}\n\n.mkt-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--text2);\n}\n\n.mkt-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 16px;\n}\n\n.mkt-card[_ngcontent-%COMP%] {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  padding: 18px;\n  display: grid;\n  gap: 12px;\n  transition: transform 0.2s ease, border-color 0.2s ease;\n}\n\n.mkt-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  border-color: rgba(22, 163, 74, 0.22);\n}\n\n.mkt-card-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.mkt-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n}\n\n.mkt-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text3);\n}\n\n.mkt-meta[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  color: var(--text2);\n  font-size: 13px;\n}\n\n.mkt-empty[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  padding: 18px;\n  border: 1px dashed var(--border2);\n  color: var(--text3);\n  background: rgba(248, 250, 252, 0.92);\n}\n\n@media (max-width: 768px) {\n  .mkt-page[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Marketplace, [{
        type: Component,
        args: [{ selector: 'app-marketplace', standalone: false, template: "<div class=\"mkt-page\">\n  <section class=\"mkt-hero card\">\n    <div>\n      <p class=\"mkt-kicker\">Marketplace</p>\n      <h1>Browse external slots</h1>\n      <p>\n        This catalog is backend-driven and only shows open slots owned by other enterprises. Reservation requests stay pending until the slot owner makes a decision.\n      </p>\n    </div>\n    <div class=\"mkt-toolbar\">\n      <div class=\"search-box\">\n        <span>Search</span>\n        <input [(ngModel)]=\"search\" placeholder=\"Machine, provider, date\" />\n      </div>\n      <label class=\"mkt-toggle\">\n        <input type=\"checkbox\" [(ngModel)]=\"solarOnly\" />\n        <span>Solar only</span>\n      </label>\n    </div>\n  </section>\n\n  <div class=\"mkt-empty\" *ngIf=\"loading\">Loading marketplace slots...</div>\n  <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n\n  <section class=\"mkt-grid\" *ngIf=\"!loading && marketplaceSlots.length\">\n    <article class=\"mkt-card\" *ngFor=\"let slot of marketplaceSlots\">\n      <div class=\"mkt-card-top\">\n        <span class=\"badge badge-success\">{{ slot.status }}</span>\n        <span class=\"badge badge-info\">{{ slot.discountPct || 0 }}% off</span>\n      </div>\n      <h3>{{ slot.machine }}</h3>\n      <p>{{ slot.enterprise?.companyName || ('Enterprise #' + (slot.enterprise?.id ?? slot.enterpriseId)) }}</p>\n      <div class=\"mkt-meta\">\n        <span>{{ slot.date }}</span>\n        <span>{{ slot.startHour }}:00 - {{ slot.endHour }}:00</span>\n        <span>{{ slot.solar ? 'Solar-backed' : 'Standard power' }}</span>\n      </div>\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"reserve(slot)\">Request reservation</button>\n    </article>\n  </section>\n\n  <div class=\"mkt-empty\" *ngIf=\"!loading && !marketplaceSlots.length\">\n    No open slots match the current filters.\n  </div>\n</div>\n", styles: [".mkt-page {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.mkt-hero {\n  display: grid;\n  gap: 16px;\n  padding: 24px;\n  background:\n    radial-gradient(circle at top right, rgba(22, 163, 74, 0.16), transparent 34%),\n    linear-gradient(135deg, rgba(236, 253, 245, 0.96), rgba(255, 255, 255, 0.98));\n}\n\n.mkt-kicker {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.mkt-hero h1 {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.mkt-hero p {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.55;\n}\n\n.mkt-toolbar {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: center;\n}\n\n.mkt-toggle {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--text2);\n}\n\n.mkt-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 16px;\n}\n\n.mkt-card {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  padding: 18px;\n  display: grid;\n  gap: 12px;\n  transition: transform 0.2s ease, border-color 0.2s ease;\n}\n\n.mkt-card:hover {\n  transform: translateY(-2px);\n  border-color: rgba(22, 163, 74, 0.22);\n}\n\n.mkt-card-top {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.mkt-card h3 {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n}\n\n.mkt-card p {\n  margin: 0;\n  color: var(--text3);\n}\n\n.mkt-meta {\n  display: grid;\n  gap: 6px;\n  color: var(--text2);\n  font-size: 13px;\n}\n\n.mkt-empty {\n  border-radius: 14px;\n  padding: 18px;\n  border: 1px dashed var(--border2);\n  color: var(--text3);\n  background: rgba(248, 250, 252, 0.92);\n}\n\n@media (max-width: 768px) {\n  .mkt-page {\n    padding: 16px;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }, { type: i3.ReservationCenterState }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Marketplace, { className: "Marketplace", filePath: "src/app/features/enterprise/marketplace/marketplace.ts", lineNumber: 13 }); })();
