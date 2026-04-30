import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../features/reservation-center/services/reservation-center.service";
import * as i4 from "../../../features/reservation-center/state/reservation-center.state";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
function Marketplace_button_32_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function Marketplace_button_32_Template_button_click_0_listener() { const type_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectedType = type_r2); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const type_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.selectedType === type_r2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", type_r2 === "all" ? "All" : type_r2, " ");
} }
function Marketplace_div_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵtext(1, "Loading marketplace resources...");
    i0.ɵɵelementEnd();
} }
function Marketplace_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.error);
} }
function Marketplace_section_43_article_1_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵtext(1, "Solar");
    i0.ɵɵelementEnd();
} }
function Marketplace_section_43_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 24);
    i0.ɵɵelement(1, "div", 25);
    i0.ɵɵelementStart(2, "div", 26)(3, "div", 27)(4, "span", 28);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "span", 29);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "h3");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(11, Marketplace_section_43_article_1_span_11_Template, 2, 0, "span", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p", 31);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 32)(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 33)(22, "div", 34)(23, "strong");
    i0.ɵɵtext(24, "Pricing on request");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "button", 35);
    i0.ɵɵlistener("click", function Marketplace_section_43_article_1_Template_button_click_27_listener() { const slot_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.reserve(slot_r5)); });
    i0.ɵɵtext(28, "Request Reservation");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const slot_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.resourceToken(slot_r5.machine));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.resourceKind(slot_r5.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.resourceName(slot_r5.machine));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", slot_r5.solar);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.providerName(slot_r5));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slot_r5.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.windowLabel(slot_r5));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", slot_r5.discountPct || 0, "% discount");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(slot_r5.discountPct ? "Discount ready" : "Provider managed");
} }
function Marketplace_section_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 22);
    i0.ɵɵtemplate(1, Marketplace_section_43_article_1_Template, 29, 9, "article", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.marketplaceSlots);
} }
function Marketplace_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵtext(1, " No open resources match the current filters. ");
    i0.ɵɵelementEnd();
} }
export class Marketplace {
    auth;
    route;
    router;
    workspace;
    state;
    loading = true;
    error = '';
    search = '';
    searchInput = '';
    solarOnly = false;
    selectedType = 'all';
    selectedDate = '';
    searchTimer = null;
    slots = [];
    currentEnterpriseId = null;
    resourceTypes = ['all', 'Machine', 'Space', 'Tool', 'Other'];
    constructor(auth, route, router, workspace, state) {
        this.auth = auth;
        this.route = route;
        this.router = router;
        this.workspace = workspace;
        this.state = state;
    }
    ngOnInit() {
        this.currentEnterpriseId = this.auth.currentUser?.enterprise?.id ?? this.auth.currentUser?.enterpriseId ?? null;
        this.route.queryParamMap.subscribe(params => {
            const query = params.get('q') ?? '';
            this.searchInput = query;
            this.search = query.trim().toLowerCase();
        });
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
    ngOnDestroy() {
        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }
    }
    get marketplaceSlots() {
        const query = this.search;
        return this.slots
            .filter(slot => slot.status === 'open')
            .filter(slot => (slot.enterprise?.id ?? slot.enterpriseId ?? null) !== this.currentEnterpriseId)
            .filter(slot => this.selectedType === 'all' || this.resourceKind(slot.machine) === this.selectedType)
            .filter(slot => !this.solarOnly || slot.solar)
            .filter(slot => !this.selectedDate || slot.date === this.selectedDate)
            .filter(slot => {
            if (!query) {
                return true;
            }
            const provider = slot.enterprise?.companyName ?? `enterprise ${slot.enterprise?.id ?? slot.enterpriseId ?? ''}`;
            return [slot.machine, slot.date, provider, this.resourceName(slot.machine)].some(value => value.toLowerCase().includes(query));
        })
            .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
    }
    get openCount() {
        return this.marketplaceSlots.length;
    }
    get solarCount() {
        return this.marketplaceSlots.filter(slot => slot.solar).length;
    }
    get discountedCount() {
        return this.marketplaceSlots.filter(slot => (slot.discountPct ?? 0) > 0).length;
    }
    updateSearch(value) {
        this.searchInput = value;
        if (this.searchTimer) {
            clearTimeout(this.searchTimer);
        }
        this.searchTimer = setTimeout(() => {
            this.search = value.trim().toLowerCase();
        }, 180);
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
    windowLabel(slot) {
        return this.workspace.formatWindow(slot.startHour, slot.endHour);
    }
    providerName(slot) {
        return slot.enterprise?.companyName ?? `Enterprise #${slot.enterprise?.id ?? slot.enterpriseId ?? ''}`;
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
    static ɵfac = function Marketplace_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Marketplace)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.ReservationCenterService), i0.ɵɵdirectiveInject(i4.ReservationCenterState)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Marketplace, selectors: [["app-marketplace"]], standalone: false, decls: 45, vars: 11, consts: [[1, "mkt-page"], [1, "mkt-background"], [1, "mkt-hero", "card"], [1, "mkt-copy"], [1, "mkt-kicker"], [1, "mkt-stats"], [1, "mkt-stat"], [1, "mkt-toolbar", "card"], [1, "mkt-search"], ["placeholder", "Resource, provider, or date", 3, "ngModelChange", "ngModel"], [1, "mkt-chip-row"], ["class", "mkt-chip", "type", "button", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "mkt-date"], ["type", "date", 3, "ngModelChange", "ngModel"], [1, "mkt-toggle"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["class", "mkt-empty", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "mkt-grid", 4, "ngIf"], ["type", "button", 1, "mkt-chip", 3, "click"], [1, "mkt-empty"], [1, "alert", "alert-danger"], [1, "mkt-grid"], ["class", "mkt-card", 4, "ngFor", "ngForOf"], [1, "mkt-card"], [1, "mkt-card-glow"], [1, "mkt-card-top"], [1, "mkt-resource"], [1, "mkt-token"], [1, "mkt-type"], ["class", "mkt-badge eco", 4, "ngIf"], [1, "mkt-provider"], [1, "mkt-meta"], [1, "mkt-card-footer"], [1, "mkt-pricing"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "mkt-badge", "eco"]], template: function Marketplace_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "section", 2)(3, "div", 3)(4, "p", 4);
            i0.ɵɵtext(5, "Marketplace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1");
            i0.ɵɵtext(7, "Reserve multi-format resources from other enterprises.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p");
            i0.ɵɵtext(9, " Explore machine capacity, spaces, tools, and other eco-resources in one resource-first catalog. Every card comes from open reservation slots owned by another enterprise. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 5)(11, "div", 6)(12, "span");
            i0.ɵɵtext(13, "Open resources");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "strong");
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 6)(17, "span");
            i0.ɵɵtext(18, "Solar-backed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "strong");
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 6)(22, "span");
            i0.ɵɵtext(23, "Discounted");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "strong");
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(26, "section", 7)(27, "div", 8)(28, "span");
            i0.ɵɵtext(29, "Search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "input", 9);
            i0.ɵɵlistener("ngModelChange", function Marketplace_Template_input_ngModelChange_30_listener($event) { return ctx.updateSearch($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 10);
            i0.ɵɵtemplate(32, Marketplace_button_32_Template, 2, 3, "button", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "label", 12)(34, "span");
            i0.ɵɵtext(35, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "input", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function Marketplace_Template_input_ngModelChange_36_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedDate, $event) || (ctx.selectedDate = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "label", 14)(38, "input", 15);
            i0.ɵɵtwoWayListener("ngModelChange", function Marketplace_Template_input_ngModelChange_38_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.solarOnly, $event) || (ctx.solarOnly = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "span");
            i0.ɵɵtext(40, "Solar only");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(41, Marketplace_div_41_Template, 2, 0, "div", 16)(42, Marketplace_div_42_Template, 2, 1, "div", 17)(43, Marketplace_section_43_Template, 2, 1, "section", 18)(44, Marketplace_div_44_Template, 2, 0, "div", 16);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate(ctx.openCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.solarCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.discountedCount);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngModel", ctx.searchInput);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.resourceTypes);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedDate);
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
        } }, dependencies: [i5.NgForOf, i5.NgIf, i6.DefaultValueAccessor, i6.CheckboxControlValueAccessor, i6.NgControlStatus, i6.NgModel], styles: [".mkt-page[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n  overflow: hidden;\n}\n\n.mkt-background[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: -20%;\n  background:\n    radial-gradient(circle at top left, rgba(34, 197, 94, 0.12), transparent 24%),\n    radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 20%);\n  pointer-events: none;\n  animation: _ngcontent-%COMP%_mktDrift 16s ease-in-out infinite alternate;\n}\n\n.mkt-page[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n.mkt-hero[_ngcontent-%COMP%], \n.mkt-toolbar[_ngcontent-%COMP%], \n.mkt-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.74);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  backdrop-filter: blur(22px);\n}\n\n.mkt-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.2fr 360px;\n  gap: 18px;\n  padding: 26px;\n  border-radius: 28px;\n  overflow: hidden;\n}\n\n.mkt-kicker[_ngcontent-%COMP%], \n.mkt-type[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.mkt-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.mkt-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n  letter-spacing: -0.04em;\n}\n\n.mkt-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: clamp(2rem, 4vw, 3rem);\n  line-height: 1.05;\n  max-width: 11ch;\n}\n\n.mkt-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.mkt-provider[_ngcontent-%COMP%], \n.mkt-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.mkt-pricing[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.mkt-empty[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.6;\n}\n\n.mkt-stats[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.mkt-stat[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 20px;\n  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.84));\n  color: #fff;\n}\n\n.mkt-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 10px;\n  font-size: 11px;\n  color: rgba(255, 255, 255, 0.64);\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n}\n\n.mkt-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 30px;\n}\n\n.mkt-toolbar[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(220px, 1fr) 1fr auto auto;\n  gap: 12px;\n  align-items: center;\n  padding: 18px;\n  border-radius: 24px;\n}\n\n.mkt-search[_ngcontent-%COMP%], \n.mkt-date[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 18px;\n  padding: 11px 14px;\n  background: rgba(255, 255, 255, 0.7);\n}\n\n.mkt-search[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.mkt-date[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  color: #16a34a;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.mkt-search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.mkt-date[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  outline: none;\n  background: transparent;\n  width: 100%;\n}\n\n.mkt-chip-row[_ngcontent-%COMP%], \n.mkt-card-footer[_ngcontent-%COMP%], \n.mkt-card-top[_ngcontent-%COMP%], \n.mkt-resource[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.mkt-chip-row[_ngcontent-%COMP%] {\n  justify-content: flex-start;\n}\n\n.mkt-chip[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 999px;\n  padding: 8px 13px;\n  background: rgba(255, 255, 255, 0.72);\n  color: var(--text2);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.mkt-chip[_ngcontent-%COMP%]:hover, \n.mkt-chip.active[_ngcontent-%COMP%] {\n  transform: scale(1.02);\n  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.12);\n}\n\n.mkt-chip.active[_ngcontent-%COMP%] {\n  color: #166534;\n  border-color: rgba(34, 197, 94, 0.26);\n}\n\n.mkt-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 14px;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.7);\n}\n\n.mkt-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 16px;\n}\n\n.mkt-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  gap: 14px;\n  padding: 20px;\n  border-radius: 24px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.mkt-card[_ngcontent-%COMP%]:hover {\n  transform: scale(1.02);\n  box-shadow: 0 26px 45px rgba(15, 23, 42, 0.12);\n  border-color: rgba(34, 197, 94, 0.18);\n}\n\n.mkt-card-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: auto -30% -34% auto;\n  width: 160px;\n  height: 160px;\n  border-radius: 999px;\n  background: radial-gradient(circle, rgba(34, 197, 94, 0.18), transparent 68%);\n  pointer-events: none;\n}\n\n.mkt-resource[_ngcontent-%COMP%] {\n  align-items: center;\n}\n\n.mkt-token[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 18px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.24), rgba(59, 130, 246, 0.2));\n  color: #0f172a;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n}\n\n.mkt-provider[_ngcontent-%COMP%] {\n  color: var(--text3);\n}\n\n.mkt-meta[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\n.mkt-card-footer[_ngcontent-%COMP%] {\n  justify-content: space-between;\n}\n\n.mkt-pricing[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n}\n\n.mkt-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 999px;\n  padding: 7px 10px;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.mkt-badge.eco[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.9);\n  color: #166534;\n  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.08);\n}\n\n.mkt-empty[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 18px;\n  border: 1px dashed rgba(148, 163, 184, 0.24);\n  background: rgba(255, 255, 255, 0.7);\n}\n\n@keyframes _ngcontent-%COMP%_mktDrift {\n  from {\n    transform: translate3d(0, 0, 0) scale(1);\n  }\n  to {\n    transform: translate3d(0, 16px, 0) scale(1.04);\n  }\n}\n\n@media (max-width: 1100px) {\n  .mkt-hero[_ngcontent-%COMP%], \n   .mkt-toolbar[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .mkt-page[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .mkt-hero[_ngcontent-%COMP%], \n   .mkt-toolbar[_ngcontent-%COMP%], \n   .mkt-card[_ngcontent-%COMP%] {\n    border-radius: 20px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Marketplace, [{
        type: Component,
        args: [{ selector: 'app-marketplace', standalone: false, template: "<div class=\"mkt-page\">\n  <div class=\"mkt-background\"></div>\n\n  <section class=\"mkt-hero card\">\n    <div class=\"mkt-copy\">\n      <p class=\"mkt-kicker\">Marketplace</p>\n      <h1>Reserve multi-format resources from other enterprises.</h1>\n      <p>\n        Explore machine capacity, spaces, tools, and other eco-resources in one resource-first catalog. Every card comes from open reservation slots owned by another enterprise.\n      </p>\n    </div>\n\n    <div class=\"mkt-stats\">\n      <div class=\"mkt-stat\">\n        <span>Open resources</span>\n        <strong>{{ openCount }}</strong>\n      </div>\n      <div class=\"mkt-stat\">\n        <span>Solar-backed</span>\n        <strong>{{ solarCount }}</strong>\n      </div>\n      <div class=\"mkt-stat\">\n        <span>Discounted</span>\n        <strong>{{ discountedCount }}</strong>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"mkt-toolbar card\">\n    <div class=\"mkt-search\">\n      <span>Search</span>\n      <input [ngModel]=\"searchInput\" (ngModelChange)=\"updateSearch($event)\" placeholder=\"Resource, provider, or date\" />\n    </div>\n\n    <div class=\"mkt-chip-row\">\n      <button\n        class=\"mkt-chip\"\n        type=\"button\"\n        *ngFor=\"let type of resourceTypes\"\n        [class.active]=\"selectedType === type\"\n        (click)=\"selectedType = type\"\n      >\n        {{ type === 'all' ? 'All' : type }}\n      </button>\n    </div>\n\n    <label class=\"mkt-date\">\n      <span>Date</span>\n      <input type=\"date\" [(ngModel)]=\"selectedDate\" />\n    </label>\n\n    <label class=\"mkt-toggle\">\n      <input type=\"checkbox\" [(ngModel)]=\"solarOnly\" />\n      <span>Solar only</span>\n    </label>\n  </section>\n\n  <div class=\"mkt-empty\" *ngIf=\"loading\">Loading marketplace resources...</div>\n  <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n\n  <section class=\"mkt-grid\" *ngIf=\"!loading && marketplaceSlots.length\">\n    <article class=\"mkt-card\" *ngFor=\"let slot of marketplaceSlots\">\n      <div class=\"mkt-card-glow\"></div>\n\n      <div class=\"mkt-card-top\">\n        <div class=\"mkt-resource\">\n          <span class=\"mkt-token\">{{ resourceToken(slot.machine) }}</span>\n          <div>\n            <span class=\"mkt-type\">{{ resourceKind(slot.machine) }}</span>\n            <h3>{{ resourceName(slot.machine) }}</h3>\n          </div>\n        </div>\n        <span class=\"mkt-badge eco\" *ngIf=\"slot.solar\">Solar</span>\n      </div>\n\n      <p class=\"mkt-provider\">{{ providerName(slot) }}</p>\n\n      <div class=\"mkt-meta\">\n        <span>{{ slot.date }}</span>\n        <span>{{ windowLabel(slot) }}</span>\n        <span>{{ slot.discountPct || 0 }}% discount</span>\n      </div>\n\n      <div class=\"mkt-card-footer\">\n        <div class=\"mkt-pricing\">\n          <strong>Pricing on request</strong>\n          <span>{{ slot.discountPct ? 'Discount ready' : 'Provider managed' }}</span>\n        </div>\n\n        <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"reserve(slot)\">Request Reservation</button>\n      </div>\n    </article>\n  </section>\n\n  <div class=\"mkt-empty\" *ngIf=\"!loading && !marketplaceSlots.length\">\n    No open resources match the current filters.\n  </div>\n</div>\n", styles: [".mkt-page {\n  position: relative;\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n  overflow: hidden;\n}\n\n.mkt-background {\n  position: absolute;\n  inset: -20%;\n  background:\n    radial-gradient(circle at top left, rgba(34, 197, 94, 0.12), transparent 24%),\n    radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 20%);\n  pointer-events: none;\n  animation: mktDrift 16s ease-in-out infinite alternate;\n}\n\n.mkt-page > * {\n  position: relative;\n  z-index: 1;\n}\n\n.mkt-hero,\n.mkt-toolbar,\n.mkt-card {\n  background: rgba(255, 255, 255, 0.74);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  backdrop-filter: blur(22px);\n}\n\n.mkt-hero {\n  display: grid;\n  grid-template-columns: 1.2fr 360px;\n  gap: 18px;\n  padding: 26px;\n  border-radius: 28px;\n  overflow: hidden;\n}\n\n.mkt-kicker,\n.mkt-type {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.mkt-hero h1,\n.mkt-card h3 {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n  letter-spacing: -0.04em;\n}\n\n.mkt-hero h1 {\n  font-size: clamp(2rem, 4vw, 3rem);\n  line-height: 1.05;\n  max-width: 11ch;\n}\n\n.mkt-hero p,\n.mkt-provider,\n.mkt-meta span,\n.mkt-pricing span,\n.mkt-empty {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.6;\n}\n\n.mkt-stats {\n  display: grid;\n  gap: 12px;\n}\n\n.mkt-stat {\n  padding: 18px;\n  border-radius: 20px;\n  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.84));\n  color: #fff;\n}\n\n.mkt-stat span {\n  display: block;\n  margin-bottom: 10px;\n  font-size: 11px;\n  color: rgba(255, 255, 255, 0.64);\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n}\n\n.mkt-stat strong {\n  font-size: 30px;\n}\n\n.mkt-toolbar {\n  display: grid;\n  grid-template-columns: minmax(220px, 1fr) 1fr auto auto;\n  gap: 12px;\n  align-items: center;\n  padding: 18px;\n  border-radius: 24px;\n}\n\n.mkt-search,\n.mkt-date {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 18px;\n  padding: 11px 14px;\n  background: rgba(255, 255, 255, 0.7);\n}\n\n.mkt-search span,\n.mkt-date span {\n  white-space: nowrap;\n  color: #16a34a;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.mkt-search input,\n.mkt-date input {\n  border: none;\n  outline: none;\n  background: transparent;\n  width: 100%;\n}\n\n.mkt-chip-row,\n.mkt-card-footer,\n.mkt-card-top,\n.mkt-resource {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.mkt-chip-row {\n  justify-content: flex-start;\n}\n\n.mkt-chip {\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 999px;\n  padding: 8px 13px;\n  background: rgba(255, 255, 255, 0.72);\n  color: var(--text2);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.mkt-chip:hover,\n.mkt-chip.active {\n  transform: scale(1.02);\n  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.12);\n}\n\n.mkt-chip.active {\n  color: #166534;\n  border-color: rgba(34, 197, 94, 0.26);\n}\n\n.mkt-toggle {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 14px;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.7);\n}\n\n.mkt-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 16px;\n}\n\n.mkt-card {\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  gap: 14px;\n  padding: 20px;\n  border-radius: 24px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.mkt-card:hover {\n  transform: scale(1.02);\n  box-shadow: 0 26px 45px rgba(15, 23, 42, 0.12);\n  border-color: rgba(34, 197, 94, 0.18);\n}\n\n.mkt-card-glow {\n  position: absolute;\n  inset: auto -30% -34% auto;\n  width: 160px;\n  height: 160px;\n  border-radius: 999px;\n  background: radial-gradient(circle, rgba(34, 197, 94, 0.18), transparent 68%);\n  pointer-events: none;\n}\n\n.mkt-resource {\n  align-items: center;\n}\n\n.mkt-token {\n  width: 52px;\n  height: 52px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 18px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.24), rgba(59, 130, 246, 0.2));\n  color: #0f172a;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n}\n\n.mkt-provider {\n  color: var(--text3);\n}\n\n.mkt-meta {\n  display: grid;\n  gap: 8px;\n}\n\n.mkt-card-footer {\n  justify-content: space-between;\n}\n\n.mkt-pricing strong {\n  display: block;\n  margin-bottom: 4px;\n}\n\n.mkt-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 999px;\n  padding: 7px 10px;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.mkt-badge.eco {\n  background: rgba(220, 252, 231, 0.9);\n  color: #166534;\n  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.08);\n}\n\n.mkt-empty {\n  padding: 18px;\n  border-radius: 18px;\n  border: 1px dashed rgba(148, 163, 184, 0.24);\n  background: rgba(255, 255, 255, 0.7);\n}\n\n@keyframes mktDrift {\n  from {\n    transform: translate3d(0, 0, 0) scale(1);\n  }\n  to {\n    transform: translate3d(0, 16px, 0) scale(1.04);\n  }\n}\n\n@media (max-width: 1100px) {\n  .mkt-hero,\n  .mkt-toolbar {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .mkt-page {\n    padding: 16px;\n  }\n\n  .mkt-hero,\n  .mkt-toolbar,\n  .mkt-card {\n    border-radius: 20px;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.ReservationCenterService }, { type: i4.ReservationCenterState }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Marketplace, { className: "Marketplace", filePath: "src/app/features/enterprise/marketplace/marketplace.ts", lineNumber: 16 }); })();
