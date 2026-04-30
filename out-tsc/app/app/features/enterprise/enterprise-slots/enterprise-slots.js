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
function EnterpriseSlots_button_44_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 50);
    i0.ɵɵlistener("click", function EnterpriseSlots_button_44_Template_button_click_0_listener() { const kind_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.form.resourceType = kind_r3); });
    i0.ɵɵelementStart(1, "span", 51);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const kind_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r3.form.resourceType === kind_r3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.resourceToken(kind_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(kind_r3);
} }
function EnterpriseSlots_div_72_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "label");
    i0.ɵɵtext(2, "Owner enterprise ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 52);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_div_72_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.enterpriseId, $event) || (ctx_r3.form.enterpriseId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.enterpriseId);
} }
function EnterpriseSlots_div_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.error);
} }
function EnterpriseSlots_div_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.success);
} }
function EnterpriseSlots_div_116_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 57);
    i0.ɵɵlistener("click", function EnterpriseSlots_div_116_button_1_Template_button_click_0_listener() { const cell_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.openCalendarDate(cell_r7.date)); });
    i0.ɵɵelementStart(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cell_r7 = ctx.$implicit;
    i0.ɵɵclassProp("available", cell_r7.openCount === cell_r7.slotCount && cell_r7.slotCount > 0)("partial", cell_r7.openCount > 0 && cell_r7.openCount < cell_r7.slotCount)("full", cell_r7.slotCount > 0 && cell_r7.openCount === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cell_r7.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r7.slotCount, " resources");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r7.pendingCount, " pending");
} }
function EnterpriseSlots_div_116_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55);
    i0.ɵɵtemplate(1, EnterpriseSlots_div_116_button_1_Template, 7, 9, "button", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.calendarCells);
} }
function EnterpriseSlots_ng_template_117_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵtext(1, "No resource data is available for the current range.");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_div_126_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61)(1, "strong");
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
    i0.ɵɵelementStart(9, "div", 62);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cell_r8 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r3.heatmapClass(cell_r8.occupancy));
    i0.ɵɵattribute("title", ctx_r3.heatmapTooltip(cell_r8));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cell_r8.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cell_r8.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r8.reservationCount, " reservations");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", cell_r8.occupancy, "% utilization");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.heatmapTooltip(cell_r8));
} }
function EnterpriseSlots_div_126_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵtemplate(1, EnterpriseSlots_div_126_div_1_Template, 11, 7, "div", 60);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.heatmapCells);
} }
function EnterpriseSlots_ng_template_127_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵtext(1, "Heatmap data will appear once resources exist for your enterprise.");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_a_136_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 63);
    i0.ɵɵtext(1, "Browse marketplace");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(1, _c0));
} }
function EnterpriseSlots_div_137_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵtext(1, "Loading resources...");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_div_138_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64)(1, "div", 65);
    i0.ɵɵtext(2, "RS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5, "Create your first resource");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Publish a machine, workspace, tool, or other eco-resource to start receiving requests.");
    i0.ɵɵelementEnd()()();
} }
function EnterpriseSlots_div_139_article_1_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 79);
    i0.ɵɵtext(1, "Eco");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_div_139_article_1_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slot_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", slot_r10.discountPct, "% off");
} }
function EnterpriseSlots_div_139_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 68)(1, "div", 69)(2, "span", 70);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "span", 71);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h3");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 72)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 73);
    i0.ɵɵelement(15, "app-status-chip", 74);
    i0.ɵɵtemplate(16, EnterpriseSlots_div_139_article_1_span_16_Template, 2, 0, "span", 75)(17, EnterpriseSlots_div_139_article_1_span_17_Template, 2, 1, "span", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 77)(19, "button", 41);
    i0.ɵɵlistener("click", function EnterpriseSlots_div_139_article_1_Template_button_click_19_listener() { const slot_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.edit(slot_r10)); });
    i0.ɵɵtext(20, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 41);
    i0.ɵɵlistener("click", function EnterpriseSlots_div_139_article_1_Template_button_click_21_listener() { const slot_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.duplicate(slot_r10)); });
    i0.ɵɵtext(22, "Duplicate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 78);
    i0.ɵɵlistener("click", function EnterpriseSlots_div_139_article_1_Template_button_click_23_listener() { const slot_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.forceSlotStatus(slot_r10)); });
    i0.ɵɵtext(24, "Override");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 41);
    i0.ɵɵlistener("click", function EnterpriseSlots_div_139_article_1_Template_button_click_25_listener() { const slot_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.inspectSlot(slot_r10)); });
    i0.ɵɵtext(26, "Inspect");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 41);
    i0.ɵɵlistener("click", function EnterpriseSlots_div_139_article_1_Template_button_click_27_listener() { const slot_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.deleteSlot(slot_r10)); });
    i0.ɵɵtext(28, "Delete");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const slot_r10 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-tone", ctx_r3.resourceAccent(ctx_r3.resourceKind(slot_r10.machine)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.resourceToken(slot_r10.machine));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.resourceKind(slot_r10.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.resourceName(slot_r10.machine));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slot_r10.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.windowLabel(slot_r10));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", slot_r10.status)("variant", ctx_r3.statusVariant(slot_r10.status));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", slot_r10.solar);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", slot_r10.discountPct);
} }
function EnterpriseSlots_div_139_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 66);
    i0.ɵɵtemplate(1, EnterpriseSlots_div_139_article_1_Template, 29, 10, "article", 67);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.ownedSlots);
} }
function EnterpriseSlots_section_140_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 79);
    i0.ɵɵtext(1, "Eco");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_section_140_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r3.selectedSlot.discountPct, "% off");
} }
function EnterpriseSlots_section_140_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 40)(1, "div", 17)(2, "div")(3, "h2");
    i0.ɵɵtext(4, "Slot inspection");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Marketplace-wide slot detail for admin override and conflict review.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "app-status-chip", 74);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 81)(9, "div", 82)(10, "div")(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 73);
    i0.ɵɵtemplate(16, EnterpriseSlots_section_140_span_16_Template, 2, 0, "span", 75)(17, EnterpriseSlots_section_140_span_17_Template, 2, 1, "span", 76);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 82)(19, "div")(20, "strong");
    i0.ɵɵtext(21, "Linked reservations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "button", 41);
    i0.ɵɵlistener("click", function EnterpriseSlots_section_140_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r11); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.forceSlotStatus(ctx_r3.selectedSlot)); });
    i0.ɵɵtext(25, "Override");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("label", ctx_r3.selectedSlot.status)("variant", ctx_r3.statusVariant(ctx_r3.selectedSlot.status));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.resourceName(ctx_r3.selectedSlot.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", ctx_r3.resourceKind(ctx_r3.selectedSlot.machine), " \u00B7 ", ctx_r3.selectedSlot.date, " \u00B7 ", ctx_r3.windowLabel(ctx_r3.selectedSlot));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.selectedSlot.solar);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.selectedSlot.discountPct);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r3.selectedSlotReservationCount, " requests are associated with this slot.");
} }
function EnterpriseSlots_div_141_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵtext(1, "No resources are scheduled on this date.");
    i0.ɵɵelementEnd();
} }
function EnterpriseSlots_div_141_div_11_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 82)(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "app-status-chip", 74);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slot_r13 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.resourceName(slot_r13.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r3.resourceKind(slot_r13.machine), " \u00B7 ", ctx_r3.windowLabel(slot_r13));
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", slot_r13.status)("variant", ctx_r3.statusVariant(slot_r13.status));
} }
function EnterpriseSlots_div_141_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵtemplate(1, EnterpriseSlots_div_141_div_11_div_1_Template, 7, 5, "div", 86);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.selectedCalendarSlots);
} }
function EnterpriseSlots_div_141_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 83);
    i0.ɵɵlistener("click", function EnterpriseSlots_div_141_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.closeCalendarDate()); });
    i0.ɵɵelementStart(1, "div", 84);
    i0.ɵɵlistener("click", function EnterpriseSlots_div_141_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 17)(3, "div")(4, "h2");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Resource windows for the selected calendar day.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 41);
    i0.ɵɵlistener("click", function EnterpriseSlots_div_141_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r12); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.closeCalendarDate()); });
    i0.ɵɵtext(9, "Close");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, EnterpriseSlots_div_141_div_10_Template, 2, 0, "div", 45)(11, EnterpriseSlots_div_141_div_11_Template, 2, 1, "div", 85);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.selectedCalendarDate);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", !ctx_r3.selectedCalendarSlots.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.selectedCalendarSlots.length);
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
    selectedCalendarDate = '';
    selectedSlotId = null;
    resourceKinds = ['Machine', 'Space', 'Tool', 'Other'];
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
            resourceName: this.workspace.resourceName(slot.machine),
            resourceType: this.workspace.resourceKind(slot.machine),
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
        if (!this.form.resourceName.trim() || !this.form.date) {
            this.error = 'Resource name and date are required.';
            return;
        }
        if (this.form.endHour <= this.form.startHour) {
            this.error = 'End hour must be after the start hour.';
            return;
        }
        const payload = {
            machine: this.workspace.resourceLabel(this.form.resourceType, this.form.resourceName),
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
        if (!window.confirm(`Delete resource ${this.workspace.resourceName(slot.machine)} on ${slot.date}?`)) {
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
            resourceName: '',
            resourceType: 'Machine',
            date: new Date().toISOString().slice(0, 10),
            startHour: 8,
            endHour: 12,
            solar: false,
            discountPct: 0,
            enterpriseId: this.context.enterpriseId,
            status: 'open',
        };
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
        const kind = this.resourceKinds.includes(value)
            ? value
            : this.workspace.resourceKind(String(value));
        return this.workspace.resourceAccent(kind);
    }
    windowLabel(slot) {
        return this.workspace.formatWindow(slot.startHour, slot.endHour);
    }
    duplicate(slot) {
        const payload = {
            machine: slot.machine,
            date: slot.date,
            startHour: slot.startHour,
            endHour: slot.endHour,
            solar: slot.solar,
            discountPct: slot.discountPct,
            enterpriseId: slot.enterprise?.id ?? slot.enterpriseId ?? this.context.enterpriseId,
            status: slot.status,
        };
        this.state.createSlot(payload).subscribe({
            next: () => {
                this.success = 'Resource duplicated.';
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to duplicate resource.';
            },
        });
    }
    openCalendarDate(date) {
        this.selectedCalendarDate = date;
    }
    closeCalendarDate() {
        this.selectedCalendarDate = '';
    }
    get selectedCalendarSlots() {
        return this.ownedSlots
            .filter(slot => slot.date === this.selectedCalendarDate)
            .sort((left, right) => left.startHour - right.startHour);
    }
    get selectedSlot() {
        return this.ownedSlots.find(slot => slot.id === this.selectedSlotId) ?? null;
    }
    get selectedSlotReservationCount() {
        return this.selectedSlot ? this.relatedReservations.filter(item => item.slotId === this.selectedSlot?.id).length : 0;
    }
    heatmapTooltip(cell) {
        return `${cell.reservationCount} reservations · ${cell.occupancy}% utilization · peak ${this.peakHoursForDate(cell.date)}`;
    }
    peakHoursForDate(date) {
        const scoped = this.relatedReservations.filter(reservation => reservation.date === date);
        if (!scoped.length) {
            return 'Open capacity';
        }
        const counts = new Map();
        for (const reservation of scoped) {
            counts.set(reservation.startHour, (counts.get(reservation.startHour) ?? 0) + 1);
        }
        const [hour] = [...counts.entries()].sort((left, right) => right[1] - left[1])[0];
        return this.workspace.formatHour(hour);
    }
    inspectSlot(slot) {
        this.selectedSlotId = slot.id;
    }
    forceSlotStatus(slot) {
        const nextStatus = slot.status === 'blocked' ? 'open' : 'blocked';
        const payload = {
            machine: slot.machine,
            date: slot.date,
            startHour: slot.startHour,
            endHour: slot.endHour,
            solar: slot.solar,
            discountPct: slot.discountPct,
            enterpriseId: slot.enterprise?.id ?? slot.enterpriseId ?? this.context.enterpriseId,
            status: nextStatus,
        };
        this.state.updateSlot(slot.id, payload).subscribe({
            next: () => {
                this.success = nextStatus === 'blocked' ? 'Slot blocked.' : 'Slot reopened.';
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to override slot status.';
            },
        });
    }
    static ɵfac = function EnterpriseSlots_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnterpriseSlots)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.ReservationCenterState), i0.ɵɵdirectiveInject(i3.ReservationCenterAiService), i0.ɵɵdirectiveInject(i4.ReservationCenterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EnterpriseSlots, selectors: [["app-enterprise-slots"]], decls: 142, vars: 52, consts: [["noCalendar", ""], ["noHeatmap", ""], [1, "rc-page"], [1, "rc-hero", "card"], [1, "rc-kicker"], [1, "rc-subtitle"], [1, "rc-hero-stats"], [1, "rc-stat", "available"], [1, "rc-stat", "reserved"], [1, "rc-stat", "blocked"], [1, "rc-progress-card"], ["viewBox", "0 0 88 88"], ["cx", "44", "cy", "44", "r", "34"], ["cx", "44", "cy", "44", "r", "34", 1, "rc-progress-ring"], [3, "action", "title", "subtitle", "insights"], [1, "rc-grid"], [1, "card", "rc-form-card"], [1, "rc-section-head"], [1, "rc-type-grid"], ["class", "rc-type-card", "type", "button", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "rc-form-grid"], [1, "form-group"], ["placeholder", "CNC line, Yard A, Solar drill set", 3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "range", "min", "0", "max", "22", 3, "ngModelChange", "ngModel"], ["type", "range", "min", "1", "max", "24", 3, "ngModelChange", "ngModel"], ["type", "range", "min", "0", "max", "40", 3, "ngModelChange", "ngModel"], ["class", "form-group", 4, "ngIf"], [1, "rc-toggle-row"], [1, "rc-status-toggle"], ["type", "button", 3, "click"], [1, "rc-toggle", "eco"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], [1, "rc-preview"], [1, "rc-preview-token"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "rc-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], [1, "card"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click"], ["class", "rc-calendar", 4, "ngIf", "ngIfElse"], ["class", "rc-heatmap", 4, "ngIf", "ngIfElse"], ["class", "btn btn-outline btn-sm", 3, "routerLink", 4, "ngIf"], ["class", "rc-empty", 4, "ngIf"], ["class", "rc-empty rc-empty-state", 4, "ngIf"], ["class", "rc-resource-grid", 4, "ngIf"], ["class", "card", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["type", "button", 1, "rc-type-card", 3, "click"], [1, "rc-type-token"], ["type", "number", 3, "ngModelChange", "ngModel"], [1, "alert", "alert-danger"], [1, "alert", "alert-success"], [1, "rc-calendar"], ["class", "rc-calendar-cell", "type", "button", 3, "available", "partial", "full", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "rc-calendar-cell", 3, "click"], [1, "rc-empty"], [1, "rc-heatmap"], ["class", "rc-heatmap-cell", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "rc-heatmap-cell", 3, "ngClass"], [1, "rc-heatmap-tooltip"], [1, "btn", "btn-outline", "btn-sm", 3, "routerLink"], [1, "rc-empty", "rc-empty-state"], [1, "rc-empty-illustration"], [1, "rc-resource-grid"], ["class", "rc-resource-card", 4, "ngFor", "ngForOf"], [1, "rc-resource-card"], [1, "rc-resource-top"], [1, "rc-resource-token"], [1, "rc-resource-type"], [1, "rc-resource-meta"], [1, "rc-resource-badges"], [3, "label", "variant"], ["class", "rc-eco-badge", 4, "ngIf"], ["class", "rc-discount-badge", 4, "ngIf"], [1, "rc-row-actions"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "rc-eco-badge"], [1, "rc-discount-badge"], [1, "rc-modal-list"], [1, "rc-modal-row"], [1, "modal-overlay", 3, "click"], [1, "modal", "rc-calendar-modal", 3, "click"], ["class", "rc-modal-list", 4, "ngIf"], ["class", "rc-modal-row", 4, "ngFor", "ngForOf"]], template: function EnterpriseSlots_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "section", 3)(2, "div")(3, "p", 4);
            i0.ɵɵtext(4, "Resource operations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 5);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 6)(10, "div", 7)(11, "span");
            i0.ɵɵtext(12, "Available");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "strong");
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 8)(16, "span");
            i0.ɵɵtext(17, "Reserved");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "strong");
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 9)(21, "span");
            i0.ɵɵtext(22, "Blocked");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "strong");
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 10);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(26, "svg", 11);
            i0.ɵɵelement(27, "circle", 12)(28, "circle", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(29, "div")(30, "strong");
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "span");
            i0.ɵɵtext(33, "Utilization");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(34, "app-ai-insights-panel", 14);
            i0.ɵɵlistener("action", function EnterpriseSlots_Template_app_ai_insights_panel_action_34_listener($event) { return ctx.applyInsight($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "section", 15)(36, "article", 16)(37, "div", 17)(38, "div")(39, "h2");
            i0.ɵɵtext(40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "p");
            i0.ɵɵtext(42, "Use the existing reservation slot backend while presenting each slot as a reusable marketplace resource.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "div", 18);
            i0.ɵɵtemplate(44, EnterpriseSlots_button_44_Template, 5, 4, "button", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 20)(46, "div", 21)(47, "label");
            i0.ɵɵtext(48, "Resource name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "input", 22);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_49_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.resourceName, $event) || (ctx.form.resourceName = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 21)(51, "label");
            i0.ɵɵtext(52, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "input", 23);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_53_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.date, $event) || (ctx.form.date = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "div", 21)(55, "label");
            i0.ɵɵtext(56, "Start hour");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "input", 24);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_57_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.startHour, $event) || (ctx.form.startHour = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "small");
            i0.ɵɵtext(59);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(60, "div", 21)(61, "label");
            i0.ɵɵtext(62, "End hour");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "input", 25);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_63_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.endHour, $event) || (ctx.form.endHour = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "small");
            i0.ɵɵtext(65);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(66, "div", 21)(67, "label");
            i0.ɵɵtext(68, "Discount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "input", 26);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_69_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.discountPct, $event) || (ctx.form.discountPct = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "small");
            i0.ɵɵtext(71);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(72, EnterpriseSlots_div_72_Template, 4, 1, "div", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "div", 28)(74, "div", 29)(75, "button", 30);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_75_listener() { return ctx.form.status = "open"; });
            i0.ɵɵtext(76, "Available");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "button", 30);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_77_listener() { return ctx.form.status = "booked"; });
            i0.ɵɵtext(78, "Reserved");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "button", 30);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_79_listener() { return ctx.form.status = "blocked"; });
            i0.ɵɵtext(80, "Blocked");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(81, "label", 31)(82, "input", 32);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseSlots_Template_input_ngModelChange_82_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.solar, $event) || (ctx.form.solar = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "span");
            i0.ɵɵtext(84, "Solar / eco enabled");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(85, "div", 33)(86, "span", 34);
            i0.ɵɵtext(87);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "div")(89, "strong");
            i0.ɵɵtext(90);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "p");
            i0.ɵɵtext(92);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(93, EnterpriseSlots_div_93_Template, 2, 1, "div", 35)(94, EnterpriseSlots_div_94_Template, 2, 1, "div", 36);
            i0.ɵɵelementStart(95, "div", 37)(96, "button", 38);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_96_listener() { return ctx.saveSlot(); });
            i0.ɵɵtext(97);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "button", 39);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_98_listener() { return ctx.resetForm(); });
            i0.ɵɵtext(99, "Clear");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(100, "article", 40)(101, "div", 17)(102, "div")(103, "h2");
            i0.ɵɵtext(104, "Calendar view");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "p");
            i0.ɵɵtext(106, "Hover for status, click a day to inspect the resource windows behind it.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(107, "div", 37)(108, "button", 41);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_108_listener() { return ctx.moveCalendar(-1); });
            i0.ɵɵtext(109, "Prev");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "button", 41);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_110_listener() { return ctx.setCalendarMode("week"); });
            i0.ɵɵtext(111, "Week");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(112, "button", 41);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_112_listener() { return ctx.setCalendarMode("month"); });
            i0.ɵɵtext(113, "Month");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(114, "button", 41);
            i0.ɵɵlistener("click", function EnterpriseSlots_Template_button_click_114_listener() { return ctx.moveCalendar(1); });
            i0.ɵɵtext(115, "Next");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(116, EnterpriseSlots_div_116_Template, 2, 1, "div", 42)(117, EnterpriseSlots_ng_template_117_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(119, "section", 40)(120, "div", 17)(121, "div")(122, "h2");
            i0.ɵɵtext(123);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(124, "p");
            i0.ɵɵtext(125);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(126, EnterpriseSlots_div_126_Template, 2, 1, "div", 43)(127, EnterpriseSlots_ng_template_127_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(129, "section", 40)(130, "div", 17)(131, "div")(132, "h2");
            i0.ɵɵtext(133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "p");
            i0.ɵɵtext(135);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(136, EnterpriseSlots_a_136_Template, 2, 2, "a", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(137, EnterpriseSlots_div_137_Template, 2, 0, "div", 45)(138, EnterpriseSlots_div_138_Template, 8, 0, "div", 46)(139, EnterpriseSlots_div_139_Template, 2, 1, "div", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(140, EnterpriseSlots_section_140_Template, 26, 9, "section", 48)(141, EnterpriseSlots_div_141_Template, 12, 3, "div", 49);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const noCalendar_r14 = i0.ɵɵreference(118);
            const noHeatmap_r15 = i0.ɵɵreference(128);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Resource Supervision" : "My Resources");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.context.isAdmin ? "Inspect and override every resource slot across the marketplace." : "Manage the resources your enterprise owns, from machines to tools and industrial spaces.", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.openSlotsCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.bookedSlotsCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.blockedSlotsCount);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("stroke-dashoffset", 214 - 214 * ctx.totalUtilization / 100);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", ctx.totalUtilization, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("title", "Resource AI suggestions")("subtitle", "Insight cards from backend optimization services for pricing, availability, and eco positioning.")("insights", ctx.aiInsights);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.form.id ? "Update resource" : "Create resource");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.resourceKinds);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.resourceName);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.date);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.startHour);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.workspace.formatHour(ctx.form.startHour));
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.endHour);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.workspace.formatHour(ctx.form.endHour === 24 ? 23 : ctx.form.endHour));
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.discountPct);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.form.discountPct, "% live discount");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.context.isAdmin);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.form.status === "open");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.form.status === "booked");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.form.status === "blocked");
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.solar);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.resourceToken(ctx.form.resourceType));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.form.resourceName || "Resource preview");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate3("", ctx.form.resourceType, " \u00B7 ", ctx.form.date, " \u00B7 ", ctx.workspace.formatWindow(ctx.form.startHour, ctx.form.endHour));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.success);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.saving);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.saving ? "Saving..." : ctx.form.id ? "Update resource" : "Create resource", " ");
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("ngIf", ctx.calendarCells.length)("ngIfElse", noCalendar_r14);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Super heatmap" : "Availability heatmap");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "System-wide demand intensity across every enterprise slot." : "Demand intensity by daypart using real reservation density and utilization.");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.heatmapCells.length)("ngIfElse", noHeatmap_r15);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "All resources" : "Owned resources");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Manage every persisted resource slot." : "Resource cards sourced from the slot inventory your enterprise owns.");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.context.isAdmin);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.ownedSlots.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.ownedSlots.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedSlot);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedCalendarDate);
        } }, dependencies: [CommonModule, i5.NgClass, i5.NgForOf, i5.NgIf, FormsModule, i6.DefaultValueAccessor, i6.NumberValueAccessor, i6.RangeValueAccessor, i6.CheckboxControlValueAccessor, i6.NgControlStatus, i6.NgModel, RouterLink, AiInsightsPanel, StatusChip], styles: [".rc-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero[_ngcontent-%COMP%], \n.rc-form-card[_ngcontent-%COMP%], \n.rc-resource-card[_ngcontent-%COMP%], \n.rc-calendar-cell[_ngcontent-%COMP%], \n.rc-heatmap-cell[_ngcontent-%COMP%], \n.rc-preview[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.74);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  backdrop-filter: blur(18px);\n}\n\n.rc-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.1fr 420px;\n  gap: 22px;\n  padding: 26px;\n  border-radius: 28px;\n  background:\n    radial-gradient(circle at top right, rgba(59, 130, 246, 0.16), transparent 26%),\n    linear-gradient(135deg, rgba(240, 253, 244, 0.92), rgba(255, 255, 255, 0.84));\n}\n\n.rc-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.rc-resource-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rc-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rc-modal-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rc-empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.6;\n}\n\n.rc-hero-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.rc-stat[_ngcontent-%COMP%], \n.rc-progress-card[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.78);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n}\n\n.rc-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rc-progress-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rc-resource-type[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  color: var(--text3);\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  margin-bottom: 8px;\n  font-weight: 700;\n}\n\n.rc-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 32px;\n}\n\n.rc-stat.available[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.rc-stat.reserved[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n\n.rc-stat.blocked[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.rc-progress-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 88px 1fr;\n  gap: 14px;\n  align-items: center;\n}\n\n.rc-progress-card[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 88px;\n  height: 88px;\n  transform: rotate(-90deg);\n}\n\n.rc-progress-card[_ngcontent-%COMP%]   circle[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(148, 163, 184, 0.18);\n  stroke-width: 8;\n}\n\n.rc-progress-ring[_ngcontent-%COMP%] {\n  stroke: #22c55e;\n  stroke-linecap: round;\n  stroke-dasharray: 214;\n  transition: stroke-dashoffset 0.35s ease;\n}\n\n.rc-progress-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 28px;\n}\n\n.rc-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.1fr 1fr;\n  gap: 18px;\n}\n\n.rc-form-card[_ngcontent-%COMP%] {\n  padding: 22px;\n  border-radius: 24px;\n}\n\n.rc-section-head[_ngcontent-%COMP%], \n.rc-row-actions[_ngcontent-%COMP%], \n.rc-actions[_ngcontent-%COMP%], \n.rc-toggle-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n\n.rc-type-grid[_ngcontent-%COMP%], \n.rc-resource-grid[_ngcontent-%COMP%], \n.rc-heatmap[_ngcontent-%COMP%], \n.rc-calendar[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.rc-type-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  margin-bottom: 16px;\n}\n\n.rc-type-card[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.7);\n  padding: 14px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.rc-type-card[_ngcontent-%COMP%]:hover, \n.rc-type-card.active[_ngcontent-%COMP%] {\n  transform: scale(1.02);\n  border-color: rgba(34, 197, 94, 0.24);\n  box-shadow: 0 16px 35px rgba(34, 197, 94, 0.12);\n}\n\n.rc-type-token[_ngcontent-%COMP%], \n.rc-preview-token[_ngcontent-%COMP%], \n.rc-resource-token[_ngcontent-%COMP%], \n.rc-empty-illustration[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 46px;\n  height: 46px;\n  border-radius: 16px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.22), rgba(59, 130, 246, 0.18));\n  color: #0f172a;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  margin-bottom: 10px;\n}\n\n.rc-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n\n.rc-form-grid[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 8px;\n  color: var(--text3);\n}\n\n.rc-status-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 6px;\n  padding: 6px;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.74);\n}\n\n.rc-status-toggle[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  border-radius: 999px;\n  padding: 9px 14px;\n  color: var(--text2);\n  transition: background 0.2s ease, color 0.2s ease;\n}\n\n.rc-status-toggle[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #fff;\n  background: linear-gradient(135deg, #22c55e, #3b82f6);\n}\n\n.rc-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 46px;\n  color: var(--text2);\n}\n\n.rc-toggle.eco[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 16px;\n  background: rgba(220, 252, 231, 0.68);\n}\n\n.rc-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin: 18px 0;\n  padding: 16px;\n  border-radius: 20px;\n}\n\n.rc-preview[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n}\n\n.rc-calendar[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));\n}\n\n.rc-calendar-cell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  padding: 16px;\n  border-radius: 18px;\n  text-align: left;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rc-calendar-cell[_ngcontent-%COMP%]:hover, \n.rc-resource-card[_ngcontent-%COMP%]:hover, \n.rc-heatmap-cell[_ngcontent-%COMP%]:hover {\n  transform: scale(1.02);\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.1);\n}\n\n.rc-calendar-cell.available[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.74);\n}\n\n.rc-calendar-cell.partial[_ngcontent-%COMP%] {\n  background: rgba(254, 249, 195, 0.78);\n}\n\n.rc-calendar-cell.full[_ngcontent-%COMP%] {\n  background: rgba(254, 226, 226, 0.78);\n}\n\n.rc-calendar-cell[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rc-heatmap-cell[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rc-resource-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rc-modal-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text2);\n  font-size: 12px;\n}\n\n.rc-heatmap[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));\n}\n\n.rc-heatmap-cell[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  gap: 7px;\n  padding: 16px;\n  border-radius: 18px;\n  overflow: hidden;\n}\n\n.rc-heatmap-cell.success[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.76);\n}\n\n.rc-heatmap-cell.info[_ngcontent-%COMP%] {\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.rc-heatmap-cell.warning[_ngcontent-%COMP%] {\n  background: rgba(255, 247, 237, 0.82);\n}\n\n.rc-heatmap-cell.danger[_ngcontent-%COMP%] {\n  background: rgba(254, 242, 242, 0.84);\n}\n\n.rc-heatmap-tooltip[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  right: 12px;\n  bottom: 12px;\n  padding: 10px 12px;\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.92);\n  color: #fff;\n  font-size: 11px;\n  line-height: 1.45;\n  transform: translateY(110%);\n  transition: transform 0.2s ease;\n}\n\n.rc-heatmap-cell[_ngcontent-%COMP%]:hover   .rc-heatmap-tooltip[_ngcontent-%COMP%] {\n  transform: translateY(0);\n}\n\n.rc-resource-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n}\n\n.rc-resource-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  padding: 18px;\n  border-radius: 22px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rc-resource-top[_ngcontent-%COMP%], \n.rc-resource-badges[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.rc-resource-token[data-tone='info'][_ngcontent-%COMP%] {\n  color: #1d4ed8;\n}\n\n.rc-resource-token[data-tone='warn'][_ngcontent-%COMP%] {\n  color: #b45309;\n}\n\n.rc-resource-token[data-tone='neutral'][_ngcontent-%COMP%] {\n  color: #475569;\n}\n\n.rc-resource-meta[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 7px;\n}\n\n.rc-eco-badge[_ngcontent-%COMP%], \n.rc-discount-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 999px;\n  padding: 7px 11px;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.rc-eco-badge[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.9);\n  color: #166534;\n}\n\n.rc-discount-badge[_ngcontent-%COMP%] {\n  background: rgba(219, 234, 254, 0.9);\n  color: #1d4ed8;\n}\n\n.rc-empty[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  padding: 18px;\n  border: 1px dashed rgba(148, 163, 184, 0.24);\n  background: rgba(255, 255, 255, 0.68);\n  color: var(--text3);\n}\n\n.rc-empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.rc-empty-state[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n}\n\n.rc-calendar-modal[_ngcontent-%COMP%] {\n  width: min(680px, calc(100vw - 32px));\n}\n\n.rc-modal-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.rc-modal-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 14px 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.16);\n}\n\n.rc-modal-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n@media (max-width: 1100px) {\n  .rc-hero[_ngcontent-%COMP%], \n   .rc-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .rc-type-grid[_ngcontent-%COMP%], \n   .rc-hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .rc-progress-card[_ngcontent-%COMP%] {\n    grid-template-columns: 72px 1fr;\n  }\n\n  .rc-empty-state[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnterpriseSlots, [{
        type: Component,
        args: [{ selector: 'app-enterprise-slots', standalone: true, imports: [CommonModule, FormsModule, RouterLink, AiInsightsPanel, StatusChip], template: "<div class=\"rc-page\">\n  <section class=\"rc-hero card\">\n    <div>\n      <p class=\"rc-kicker\">Resource operations</p>\n      <h1>{{ context.isAdmin ? 'Resource Supervision' : 'My Resources' }}</h1>\n      <p class=\"rc-subtitle\">\n        {{ context.isAdmin\n          ? 'Inspect and override every resource slot across the marketplace.'\n          : 'Manage the resources your enterprise owns, from machines to tools and industrial spaces.' }}\n      </p>\n    </div>\n\n    <div class=\"rc-hero-stats\">\n      <div class=\"rc-stat available\">\n        <span>Available</span>\n        <strong>{{ openSlotsCount }}</strong>\n      </div>\n      <div class=\"rc-stat reserved\">\n        <span>Reserved</span>\n        <strong>{{ bookedSlotsCount }}</strong>\n      </div>\n      <div class=\"rc-stat blocked\">\n        <span>Blocked</span>\n        <strong>{{ blockedSlotsCount }}</strong>\n      </div>\n      <div class=\"rc-progress-card\">\n        <svg viewBox=\"0 0 88 88\">\n          <circle cx=\"44\" cy=\"44\" r=\"34\"></circle>\n          <circle class=\"rc-progress-ring\" cx=\"44\" cy=\"44\" r=\"34\" [style.stroke-dashoffset]=\"214 - (214 * totalUtilization / 100)\"></circle>\n        </svg>\n        <div>\n          <strong>{{ totalUtilization }}%</strong>\n          <span>Utilization</span>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <app-ai-insights-panel\n    [title]=\"'Resource AI suggestions'\"\n    [subtitle]=\"'Insight cards from backend optimization services for pricing, availability, and eco positioning.'\"\n    [insights]=\"aiInsights\"\n    (action)=\"applyInsight($event)\"\n  />\n\n  <section class=\"rc-grid\">\n    <article class=\"card rc-form-card\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>{{ form.id ? 'Update resource' : 'Create resource' }}</h2>\n          <p>Use the existing reservation slot backend while presenting each slot as a reusable marketplace resource.</p>\n        </div>\n      </div>\n\n      <div class=\"rc-type-grid\">\n        <button\n          class=\"rc-type-card\"\n          type=\"button\"\n          *ngFor=\"let kind of resourceKinds\"\n          [class.active]=\"form.resourceType === kind\"\n          (click)=\"form.resourceType = kind\"\n        >\n          <span class=\"rc-type-token\">{{ resourceToken(kind) }}</span>\n          <strong>{{ kind }}</strong>\n        </button>\n      </div>\n\n      <div class=\"rc-form-grid\">\n        <div class=\"form-group\">\n          <label>Resource name</label>\n          <input [(ngModel)]=\"form.resourceName\" placeholder=\"CNC line, Yard A, Solar drill set\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Date</label>\n          <input type=\"date\" [(ngModel)]=\"form.date\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Start hour</label>\n          <input type=\"range\" min=\"0\" max=\"22\" [(ngModel)]=\"form.startHour\" />\n          <small>{{ workspace.formatHour(form.startHour) }}</small>\n        </div>\n        <div class=\"form-group\">\n          <label>End hour</label>\n          <input type=\"range\" min=\"1\" max=\"24\" [(ngModel)]=\"form.endHour\" />\n          <small>{{ workspace.formatHour(form.endHour === 24 ? 23 : form.endHour) }}</small>\n        </div>\n        <div class=\"form-group\">\n          <label>Discount</label>\n          <input type=\"range\" min=\"0\" max=\"40\" [(ngModel)]=\"form.discountPct\" />\n          <small>{{ form.discountPct }}% live discount</small>\n        </div>\n        <div class=\"form-group\" *ngIf=\"context.isAdmin\">\n          <label>Owner enterprise ID</label>\n          <input type=\"number\" [(ngModel)]=\"form.enterpriseId\" />\n        </div>\n      </div>\n\n      <div class=\"rc-toggle-row\">\n        <div class=\"rc-status-toggle\">\n          <button type=\"button\" [class.active]=\"form.status === 'open'\" (click)=\"form.status = 'open'\">Available</button>\n          <button type=\"button\" [class.active]=\"form.status === 'booked'\" (click)=\"form.status = 'booked'\">Reserved</button>\n          <button type=\"button\" [class.active]=\"form.status === 'blocked'\" (click)=\"form.status = 'blocked'\">Blocked</button>\n        </div>\n\n        <label class=\"rc-toggle eco\">\n          <input type=\"checkbox\" [(ngModel)]=\"form.solar\" />\n          <span>Solar / eco enabled</span>\n        </label>\n      </div>\n\n      <div class=\"rc-preview\">\n        <span class=\"rc-preview-token\">{{ resourceToken(form.resourceType) }}</span>\n        <div>\n          <strong>{{ form.resourceName || 'Resource preview' }}</strong>\n          <p>{{ form.resourceType }} \u00B7 {{ form.date }} \u00B7 {{ workspace.formatWindow(form.startHour, form.endHour) }}</p>\n        </div>\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n      <div class=\"alert alert-success\" *ngIf=\"success\">{{ success }}</div>\n\n      <div class=\"rc-actions\">\n        <button class=\"btn btn-primary\" type=\"button\" (click)=\"saveSlot()\" [disabled]=\"saving\">\n          {{ saving ? 'Saving...' : (form.id ? 'Update resource' : 'Create resource') }}\n        </button>\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"resetForm()\">Clear</button>\n      </div>\n    </article>\n\n    <article class=\"card\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>Calendar view</h2>\n          <p>Hover for status, click a day to inspect the resource windows behind it.</p>\n        </div>\n        <div class=\"rc-actions\">\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"moveCalendar(-1)\">Prev</button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"setCalendarMode('week')\">Week</button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"setCalendarMode('month')\">Month</button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"moveCalendar(1)\">Next</button>\n        </div>\n      </div>\n\n      <div class=\"rc-calendar\" *ngIf=\"calendarCells.length; else noCalendar\">\n        <button\n          class=\"rc-calendar-cell\"\n          type=\"button\"\n          *ngFor=\"let cell of calendarCells\"\n          [class.available]=\"cell.openCount === cell.slotCount && cell.slotCount > 0\"\n          [class.partial]=\"cell.openCount > 0 && cell.openCount < cell.slotCount\"\n          [class.full]=\"cell.slotCount > 0 && cell.openCount === 0\"\n          (click)=\"openCalendarDate(cell.date)\"\n        >\n          <strong>{{ cell.label }}</strong>\n          <span>{{ cell.slotCount }} resources</span>\n          <span>{{ cell.pendingCount }} pending</span>\n        </button>\n      </div>\n\n      <ng-template #noCalendar>\n        <div class=\"rc-empty\">No resource data is available for the current range.</div>\n      </ng-template>\n    </article>\n  </section>\n\n  <section class=\"card\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>{{ context.isAdmin ? 'Super heatmap' : 'Availability heatmap' }}</h2>\n        <p>{{ context.isAdmin ? 'System-wide demand intensity across every enterprise slot.' : 'Demand intensity by daypart using real reservation density and utilization.' }}</p>\n      </div>\n    </div>\n\n    <div class=\"rc-heatmap\" *ngIf=\"heatmapCells.length; else noHeatmap\">\n      <div\n        class=\"rc-heatmap-cell\"\n        *ngFor=\"let cell of heatmapCells\"\n        [ngClass]=\"heatmapClass(cell.occupancy)\"\n        [attr.title]=\"heatmapTooltip(cell)\"\n      >\n        <strong>{{ cell.date }}</strong>\n        <span>{{ cell.label }}</span>\n        <span>{{ cell.reservationCount }} reservations</span>\n        <span>{{ cell.occupancy }}% utilization</span>\n        <div class=\"rc-heatmap-tooltip\">{{ heatmapTooltip(cell) }}</div>\n      </div>\n    </div>\n\n    <ng-template #noHeatmap>\n      <div class=\"rc-empty\">Heatmap data will appear once resources exist for your enterprise.</div>\n    </ng-template>\n  </section>\n\n  <section class=\"card\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>{{ context.isAdmin ? 'All resources' : 'Owned resources' }}</h2>\n        <p>{{ context.isAdmin ? 'Manage every persisted resource slot.' : 'Resource cards sourced from the slot inventory your enterprise owns.' }}</p>\n      </div>\n      <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/marketplace']\" *ngIf=\"!context.isAdmin\">Browse marketplace</a>\n    </div>\n\n    <div class=\"rc-empty\" *ngIf=\"loading\">Loading resources...</div>\n    <div class=\"rc-empty rc-empty-state\" *ngIf=\"!loading && !ownedSlots.length\">\n      <div class=\"rc-empty-illustration\">RS</div>\n      <div>\n        <strong>Create your first resource</strong>\n        <p>Publish a machine, workspace, tool, or other eco-resource to start receiving requests.</p>\n      </div>\n    </div>\n\n    <div class=\"rc-resource-grid\" *ngIf=\"!loading && ownedSlots.length\">\n      <article class=\"rc-resource-card\" *ngFor=\"let slot of ownedSlots\">\n        <div class=\"rc-resource-top\">\n          <span class=\"rc-resource-token\" [attr.data-tone]=\"resourceAccent(resourceKind(slot.machine))\">{{ resourceToken(slot.machine) }}</span>\n          <div>\n            <span class=\"rc-resource-type\">{{ resourceKind(slot.machine) }}</span>\n            <h3>{{ resourceName(slot.machine) }}</h3>\n          </div>\n        </div>\n        <div class=\"rc-resource-meta\">\n          <span>{{ slot.date }}</span>\n          <span>{{ windowLabel(slot) }}</span>\n        </div>\n        <div class=\"rc-resource-badges\">\n          <app-status-chip [label]=\"slot.status\" [variant]=\"statusVariant(slot.status)\" />\n          <span class=\"rc-eco-badge\" *ngIf=\"slot.solar\">Eco</span>\n          <span class=\"rc-discount-badge\" *ngIf=\"slot.discountPct\">{{ slot.discountPct }}% off</span>\n        </div>\n        <div class=\"rc-row-actions\">\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"edit(slot)\">Edit</button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"duplicate(slot)\">Duplicate</button>\n          <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"forceSlotStatus(slot)\">Override</button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"inspectSlot(slot)\">Inspect</button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"deleteSlot(slot)\">Delete</button>\n        </div>\n      </article>\n    </div>\n  </section>\n\n  <section class=\"card\" *ngIf=\"selectedSlot\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>Slot inspection</h2>\n        <p>Marketplace-wide slot detail for admin override and conflict review.</p>\n      </div>\n      <app-status-chip [label]=\"selectedSlot.status\" [variant]=\"statusVariant(selectedSlot.status)\" />\n    </div>\n\n    <div class=\"rc-modal-list\">\n      <div class=\"rc-modal-row\">\n        <div>\n          <strong>{{ resourceName(selectedSlot.machine) }}</strong>\n          <p>{{ resourceKind(selectedSlot.machine) }} \u00B7 {{ selectedSlot.date }} \u00B7 {{ windowLabel(selectedSlot) }}</p>\n        </div>\n        <div class=\"rc-resource-badges\">\n          <span class=\"rc-eco-badge\" *ngIf=\"selectedSlot.solar\">Eco</span>\n          <span class=\"rc-discount-badge\" *ngIf=\"selectedSlot.discountPct\">{{ selectedSlot.discountPct }}% off</span>\n        </div>\n      </div>\n      <div class=\"rc-modal-row\">\n        <div>\n          <strong>Linked reservations</strong>\n          <p>{{ selectedSlotReservationCount }} requests are associated with this slot.</p>\n        </div>\n        <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"forceSlotStatus(selectedSlot)\">Override</button>\n      </div>\n    </div>\n  </section>\n\n  <div class=\"modal-overlay\" *ngIf=\"selectedCalendarDate\" (click)=\"closeCalendarDate()\">\n    <div class=\"modal rc-calendar-modal\" (click)=\"$event.stopPropagation()\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>{{ selectedCalendarDate }}</h2>\n          <p>Resource windows for the selected calendar day.</p>\n        </div>\n        <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"closeCalendarDate()\">Close</button>\n      </div>\n\n      <div class=\"rc-empty\" *ngIf=\"!selectedCalendarSlots.length\">No resources are scheduled on this date.</div>\n\n      <div class=\"rc-modal-list\" *ngIf=\"selectedCalendarSlots.length\">\n        <div class=\"rc-modal-row\" *ngFor=\"let slot of selectedCalendarSlots\">\n          <div>\n            <strong>{{ resourceName(slot.machine) }}</strong>\n            <p>{{ resourceKind(slot.machine) }} \u00B7 {{ windowLabel(slot) }}</p>\n          </div>\n          <app-status-chip [label]=\"slot.status\" [variant]=\"statusVariant(slot.status)\" />\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".rc-page {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero,\n.rc-form-card,\n.rc-resource-card,\n.rc-calendar-cell,\n.rc-heatmap-cell,\n.rc-preview {\n  background: rgba(255, 255, 255, 0.74);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  backdrop-filter: blur(18px);\n}\n\n.rc-hero {\n  display: grid;\n  grid-template-columns: 1.1fr 420px;\n  gap: 22px;\n  padding: 26px;\n  border-radius: 28px;\n  background:\n    radial-gradient(circle at top right, rgba(59, 130, 246, 0.16), transparent 26%),\n    linear-gradient(135deg, rgba(240, 253, 244, 0.92), rgba(255, 255, 255, 0.84));\n}\n\n.rc-kicker {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero h1,\n.rc-section-head h2,\n.rc-resource-card h3 {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle,\n.rc-section-head p,\n.rc-preview p,\n.rc-modal-row p,\n.rc-empty-state p {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.6;\n}\n\n.rc-hero-stats {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.rc-stat,\n.rc-progress-card {\n  padding: 18px;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.78);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n}\n\n.rc-stat span,\n.rc-progress-card span,\n.rc-resource-type {\n  display: block;\n  font-size: 11px;\n  color: var(--text3);\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  margin-bottom: 8px;\n  font-weight: 700;\n}\n\n.rc-stat strong {\n  font-size: 32px;\n}\n\n.rc-stat.available strong {\n  color: #16a34a;\n}\n\n.rc-stat.reserved strong {\n  color: #2563eb;\n}\n\n.rc-stat.blocked strong {\n  color: #dc2626;\n}\n\n.rc-progress-card {\n  display: grid;\n  grid-template-columns: 88px 1fr;\n  gap: 14px;\n  align-items: center;\n}\n\n.rc-progress-card svg {\n  width: 88px;\n  height: 88px;\n  transform: rotate(-90deg);\n}\n\n.rc-progress-card circle {\n  fill: none;\n  stroke: rgba(148, 163, 184, 0.18);\n  stroke-width: 8;\n}\n\n.rc-progress-ring {\n  stroke: #22c55e;\n  stroke-linecap: round;\n  stroke-dasharray: 214;\n  transition: stroke-dashoffset 0.35s ease;\n}\n\n.rc-progress-card strong {\n  font-size: 28px;\n}\n\n.rc-grid {\n  display: grid;\n  grid-template-columns: 1.1fr 1fr;\n  gap: 18px;\n}\n\n.rc-form-card {\n  padding: 22px;\n  border-radius: 24px;\n}\n\n.rc-section-head,\n.rc-row-actions,\n.rc-actions,\n.rc-toggle-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n\n.rc-type-grid,\n.rc-resource-grid,\n.rc-heatmap,\n.rc-calendar {\n  display: grid;\n  gap: 12px;\n}\n\n.rc-type-grid {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  margin-bottom: 16px;\n}\n\n.rc-type-card {\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.7);\n  padding: 14px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.rc-type-card:hover,\n.rc-type-card.active {\n  transform: scale(1.02);\n  border-color: rgba(34, 197, 94, 0.24);\n  box-shadow: 0 16px 35px rgba(34, 197, 94, 0.12);\n}\n\n.rc-type-token,\n.rc-preview-token,\n.rc-resource-token,\n.rc-empty-illustration {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 46px;\n  height: 46px;\n  border-radius: 16px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.22), rgba(59, 130, 246, 0.18));\n  color: #0f172a;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  margin-bottom: 10px;\n}\n\n.rc-form-grid {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n\n.rc-form-grid small {\n  display: block;\n  margin-top: 8px;\n  color: var(--text3);\n}\n\n.rc-status-toggle {\n  display: inline-flex;\n  gap: 6px;\n  padding: 6px;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.74);\n}\n\n.rc-status-toggle button {\n  border: none;\n  background: transparent;\n  border-radius: 999px;\n  padding: 9px 14px;\n  color: var(--text2);\n  transition: background 0.2s ease, color 0.2s ease;\n}\n\n.rc-status-toggle button.active {\n  color: #fff;\n  background: linear-gradient(135deg, #22c55e, #3b82f6);\n}\n\n.rc-toggle {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 46px;\n  color: var(--text2);\n}\n\n.rc-toggle.eco {\n  padding: 10px 14px;\n  border-radius: 16px;\n  background: rgba(220, 252, 231, 0.68);\n}\n\n.rc-preview {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  margin: 18px 0;\n  padding: 16px;\n  border-radius: 20px;\n}\n\n.rc-preview strong {\n  display: block;\n  margin-bottom: 4px;\n}\n\n.rc-calendar {\n  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));\n}\n\n.rc-calendar-cell {\n  display: grid;\n  gap: 8px;\n  padding: 16px;\n  border-radius: 18px;\n  text-align: left;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rc-calendar-cell:hover,\n.rc-resource-card:hover,\n.rc-heatmap-cell:hover {\n  transform: scale(1.02);\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.1);\n}\n\n.rc-calendar-cell.available {\n  background: rgba(220, 252, 231, 0.74);\n}\n\n.rc-calendar-cell.partial {\n  background: rgba(254, 249, 195, 0.78);\n}\n\n.rc-calendar-cell.full {\n  background: rgba(254, 226, 226, 0.78);\n}\n\n.rc-calendar-cell span,\n.rc-heatmap-cell span,\n.rc-resource-meta span,\n.rc-modal-row p {\n  color: var(--text2);\n  font-size: 12px;\n}\n\n.rc-heatmap {\n  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));\n}\n\n.rc-heatmap-cell {\n  position: relative;\n  display: grid;\n  gap: 7px;\n  padding: 16px;\n  border-radius: 18px;\n  overflow: hidden;\n}\n\n.rc-heatmap-cell.success {\n  background: rgba(220, 252, 231, 0.76);\n}\n\n.rc-heatmap-cell.info {\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.rc-heatmap-cell.warning {\n  background: rgba(255, 247, 237, 0.82);\n}\n\n.rc-heatmap-cell.danger {\n  background: rgba(254, 242, 242, 0.84);\n}\n\n.rc-heatmap-tooltip {\n  position: absolute;\n  left: 12px;\n  right: 12px;\n  bottom: 12px;\n  padding: 10px 12px;\n  border-radius: 14px;\n  background: rgba(15, 23, 42, 0.92);\n  color: #fff;\n  font-size: 11px;\n  line-height: 1.45;\n  transform: translateY(110%);\n  transition: transform 0.2s ease;\n}\n\n.rc-heatmap-cell:hover .rc-heatmap-tooltip {\n  transform: translateY(0);\n}\n\n.rc-resource-grid {\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n}\n\n.rc-resource-card {\n  display: grid;\n  gap: 14px;\n  padding: 18px;\n  border-radius: 22px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rc-resource-top,\n.rc-resource-badges {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.rc-resource-token[data-tone='info'] {\n  color: #1d4ed8;\n}\n\n.rc-resource-token[data-tone='warn'] {\n  color: #b45309;\n}\n\n.rc-resource-token[data-tone='neutral'] {\n  color: #475569;\n}\n\n.rc-resource-meta {\n  display: grid;\n  gap: 7px;\n}\n\n.rc-eco-badge,\n.rc-discount-badge {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 999px;\n  padding: 7px 11px;\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.rc-eco-badge {\n  background: rgba(220, 252, 231, 0.9);\n  color: #166534;\n}\n\n.rc-discount-badge {\n  background: rgba(219, 234, 254, 0.9);\n  color: #1d4ed8;\n}\n\n.rc-empty {\n  border-radius: 16px;\n  padding: 18px;\n  border: 1px dashed rgba(148, 163, 184, 0.24);\n  background: rgba(255, 255, 255, 0.68);\n  color: var(--text3);\n}\n\n.rc-empty-state {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.rc-empty-state strong {\n  display: block;\n  margin-bottom: 6px;\n}\n\n.rc-calendar-modal {\n  width: min(680px, calc(100vw - 32px));\n}\n\n.rc-modal-list {\n  display: grid;\n  gap: 12px;\n}\n\n.rc-modal-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 14px 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.16);\n}\n\n.rc-modal-row:last-child {\n  border-bottom: none;\n}\n\n@media (max-width: 1100px) {\n  .rc-hero,\n  .rc-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page {\n    padding: 16px;\n  }\n\n  .rc-type-grid,\n  .rc-hero-stats {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .rc-progress-card {\n    grid-template-columns: 72px 1fr;\n  }\n\n  .rc-empty-state {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.ReservationCenterState }, { type: i3.ReservationCenterAiService }, { type: i4.ReservationCenterService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EnterpriseSlots, { className: "EnterpriseSlots", filePath: "src/app/features/enterprise/enterprise-slots/enterprise-slots.ts", lineNumber: 31 }); })();
