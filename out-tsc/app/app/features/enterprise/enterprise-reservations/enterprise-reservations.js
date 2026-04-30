import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AiInsightsPanel } from '../../../features/reservation-center/components/ai-insights-panel/ai-insights-panel';
import { DecisionAssistantComponent } from '../../../features/reservation-center/components/decision-assistant/decision-assistant.component';
import { StatusChip } from '../../../features/reservation-center/components/status-chip/status-chip';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "../../../features/reservation-center/state/reservation-center.state";
import * as i3 from "../../../features/reservation-center/services/reservation-center-ai.service";
import * as i4 from "../../../features/reservation-center/services/reservation-center.service";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
const _c0 = () => ["/enterprise/marketplace"];
function EnterpriseReservations_button_45_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function EnterpriseReservations_button_45_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵtext(1, "New Reservation");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_section_46_div_34_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label");
    i0.ɵɵtext(2, "Consumer enterprise ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_46_div_34_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.form.enterpriseId, $event) || (ctx_r1.form.enterpriseId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.enterpriseId);
} }
function EnterpriseReservations_section_46_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function EnterpriseReservations_section_46_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.success);
} }
function EnterpriseReservations_section_46_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 19)(1, "div", 20)(2, "div")(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Requests start in pending status and only confirmed requests may later generate orders.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_section_46_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵtext(8, "Close");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 26)(10, "div", 27)(11, "label");
    i0.ɵɵtext(12, "Company");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "input", 28);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_46_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.company, $event) || (ctx_r1.form.company = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 27)(15, "label");
    i0.ɵɵtext(16, "Slot ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "input", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_46_Template_input_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.slotId, $event) || (ctx_r1.form.slotId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 27)(19, "label");
    i0.ɵɵtext(20, "Machine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 28);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_46_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.machine, $event) || (ctx_r1.form.machine = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 27)(23, "label");
    i0.ɵɵtext(24, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "input", 30);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_46_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.date, $event) || (ctx_r1.form.date = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 27)(27, "label");
    i0.ɵɵtext(28, "Start hour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "input", 31);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_46_Template_input_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.startHour, $event) || (ctx_r1.form.startHour = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 27)(31, "label");
    i0.ɵɵtext(32, "Duration (hours)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "input", 32);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_46_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.hours, $event) || (ctx_r1.form.hours = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(34, EnterpriseReservations_section_46_div_34_Template, 4, 1, "div", 33);
    i0.ɵɵelementStart(35, "label", 34)(36, "input", 35);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_46_Template_input_ngModelChange_36_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.solar, $event) || (ctx_r1.form.solar = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38, "Solar-backed reservation");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(39, EnterpriseReservations_section_46_div_39_Template, 2, 1, "div", 36)(40, EnterpriseReservations_section_46_div_40_Template, 2, 1, "div", 37);
    i0.ɵɵelementStart(41, "div", 38)(42, "button", 39);
    i0.ɵɵlistener("click", function EnterpriseReservations_section_46_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveReservation()); });
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "button", 40);
    i0.ɵɵlistener("click", function EnterpriseReservations_section_46_Template_button_click_44_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵtext(45, "Cancel");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.form.id ? "Update reservation" : "Create reservation request");
    i0.ɵɵadvance(9);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.company);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.slotId);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.machine);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.date);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.startHour);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.hours);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.context.isAdmin);
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.solar);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.error);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.success);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving ? "Saving..." : ctx_r1.form.id ? "Update reservation" : "Create request", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.saving);
} }
function EnterpriseReservations_section_47_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1, "No open external slots are available right now.");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_section_47_table_10_tr_18_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td")(14, "button", 47);
    i0.ɵɵlistener("click", function EnterpriseReservations_section_47_table_10_tr_18_Template_button_click_14_listener() { const slot_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openCreate(slot_r6)); });
    i0.ɵɵtext(15, "Request");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const slot_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((slot_r6.enterprise == null ? null : slot_r6.enterprise.companyName) || "Enterprise #" + ((slot_r6.enterprise == null ? null : slot_r6.enterprise.id) ?? slot_r6.enterpriseId));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r6.machine);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r6.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", slot_r6.startHour, ":00 - ", slot_r6.endHour, ":00");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slot_r6.solar ? "Yes" : "No");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", slot_r6.discountPct || 0, "%");
} }
function EnterpriseReservations_section_47_table_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 45)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Provider");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Machine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Window");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Solar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Discount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "tbody");
    i0.ɵɵtemplate(18, EnterpriseReservations_section_47_table_10_tr_18_Template, 16, 7, "tr", 46);
    i0.ɵɵpipe(19, "slice");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(19, 1, ctx_r1.marketplaceSlots, 0, 6));
} }
function EnterpriseReservations_section_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 19)(1, "div", 20)(2, "div")(3, "h2");
    i0.ɵɵtext(4, "Marketplace");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Browse slots owned by other enterprises and submit a reservation request.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "a", 43);
    i0.ɵɵtext(8, "Open marketplace");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, EnterpriseReservations_section_47_div_9_Template, 2, 0, "div", 21)(10, EnterpriseReservations_section_47_table_10_Template, 20, 5, "table", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.marketplaceSlots.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.marketplaceSlots.length);
} }
function EnterpriseReservations_div_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1, "Loading reservations...");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1, "No matching reservations.");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_table_58_tr_16_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_table_58_tr_16_button_15_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r9); const reservation_r8 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.requestDelete(reservation_r8); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(1, " Delete ");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_table_58_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 49);
    i0.ɵɵlistener("click", function EnterpriseReservations_table_58_tr_16_Template_tr_click_0_listener() { const reservation_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectReservation(reservation_r8)); });
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵelement(8, "app-status-chip", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td")(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td", 51)(13, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_table_58_tr_16_Template_button_click_13_listener($event) { const reservation_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.openEdit(reservation_r8); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(14, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, EnterpriseReservations_table_58_tr_16_button_15_Template, 2, 0, "button", 52);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reservation_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r8.company);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r8.machine);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r8.date);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", ctx_r1.toUiStatus(reservation_r8))("variant", ctx_r1.statusVariant(ctx_r1.toUiStatus(reservation_r8)));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("rc-conflict", ctx_r1.conflictFor(reservation_r8).hasConflict);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.conflictFor(reservation_r8).label, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.context.isAdmin);
} }
function EnterpriseReservations_table_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 45)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Company");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Machine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Conflict");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵtemplate(16, EnterpriseReservations_table_58_tr_16_Template, 16, 9, "tr", 48);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r1.myReservations);
} }
function EnterpriseReservations_div_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1, "Loading incoming requests...");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1, "No incoming requests.");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_table_68_tr_18_button_19_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_table_68_tr_18_button_19_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r12); const reservation_r11 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.requestDelete(reservation_r11); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(1, " Delete ");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_table_68_tr_18_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 49);
    i0.ɵɵlistener("click", function EnterpriseReservations_table_68_tr_18_Template_tr_click_0_listener() { const reservation_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectReservation(reservation_r11)); });
    i0.ɵɵelementStart(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵelement(8, "app-status-chip", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td")(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵelement(13, "app-decision-assistant", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 51)(15, "button", 54);
    i0.ɵɵlistener("click", function EnterpriseReservations_table_68_tr_18_Template_button_click_15_listener($event) { const reservation_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.decide(reservation_r11, "CONFIRMED"); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(16, " Accept ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 55);
    i0.ɵɵlistener("click", function EnterpriseReservations_table_68_tr_18_Template_button_click_17_listener($event) { const reservation_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.decide(reservation_r11, "REJECTED"); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(18, " Reject ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, EnterpriseReservations_table_68_tr_18_button_19_Template, 2, 0, "button", 52);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reservation_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r11.company);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r11.machine);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r11.date);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", ctx_r1.toUiStatus(reservation_r11))("variant", ctx_r1.statusVariant(ctx_r1.toUiStatus(reservation_r11)));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("rc-conflict", ctx_r1.conflictFor(reservation_r11).hasConflict);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.conflictFor(reservation_r11).label, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("reservation", reservation_r11)("reservations", ctx_r1.providerReservations)("slots", ctx_r1.slots);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", reservation_r11.status !== "PENDING");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", reservation_r11.status !== "PENDING");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.context.isAdmin);
} }
function EnterpriseReservations_table_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 45)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Company");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Machine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Conflict");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "AI Suggestion");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Decision");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "tbody");
    i0.ɵɵtemplate(18, EnterpriseReservations_table_68_tr_18_Template, 20, 14, "tr", 48);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngForOf", ctx_r1.providerReservations);
} }
function EnterpriseReservations_section_69_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵelement(1, "span", 61);
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", item_r13.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r13.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r13.description);
} }
function EnterpriseReservations_section_69_p_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" This request overlaps with ", ctx_r1.conflictFor(ctx_r1.selectedReservation).blockingReservations.length, " active reservation(s). ");
} }
function EnterpriseReservations_section_69_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, " No overlapping request is blocking the provider decision. ");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_section_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 19)(1, "div", 20)(2, "div")(3, "h2");
    i0.ɵɵtext(4, "Lifecycle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "app-status-chip", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 56);
    i0.ɵɵtemplate(9, EnterpriseReservations_section_69_div_9_Template, 7, 3, "div", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 58)(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, EnterpriseReservations_section_69_p_13_Template, 2, 1, "p", 59)(14, EnterpriseReservations_section_69_p_14_Template, 2, 0, "p", 59);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Timeline and conflict analysis for reservation #", ctx_r1.selectedReservation.id, ".");
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", ctx_r1.toUiStatus(ctx_r1.selectedReservation))("variant", ctx_r1.statusVariant(ctx_r1.toUiStatus(ctx_r1.selectedReservation)));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.selectedReservationTimeline);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.conflictFor(ctx_r1.selectedReservation).hasConflict);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.conflictFor(ctx_r1.selectedReservation).label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.conflictFor(ctx_r1.selectedReservation).hasConflict);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.conflictFor(ctx_r1.selectedReservation).hasConflict);
} }
function EnterpriseReservations_div_70_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_70_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showAdminDelete = false); });
    i0.ɵɵelementStart(1, "div", 63);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_70_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Delete reservation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "This removes the reservation record from the backend. Use this only for admin/provider overrides.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 38)(7, "button", 64);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_70_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.deleteReservation()); });
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 40);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_70_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showAdminDelete = false); });
    i0.ɵɵtext(10, "Cancel");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r1.deleting);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.deleting ? "Deleting..." : "Delete", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.deleting);
} }
export class EnterpriseReservations {
    auth;
    state;
    ai;
    workspace;
    loading = true;
    saving = false;
    deleting = false;
    error = '';
    success = '';
    search = '';
    statusFilter = 'all';
    showForm = false;
    showAdminDelete = false;
    selectedReservationId = null;
    selectedSlotId = null;
    pendingDelete = null;
    reservations = [];
    slots = [];
    aiInsights = [];
    context = {
        enterpriseId: null,
        companyName: '',
        role: 'enterprise',
        isAdmin: false,
    };
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
    get dashboardTitle() {
        return this.context.isAdmin ? 'Reservation Control Center' : 'Reservation Requests';
    }
    get providerReservations() {
        const scoped = this.context.isAdmin
            ? this.reservations
            : this.reservations.filter(reservation => this.providerEnterpriseId(reservation) === this.context.enterpriseId);
        return this.applyReservationFilters(scoped);
    }
    get myReservations() {
        const scoped = this.context.isAdmin
            ? this.reservations
            : this.reservations.filter(reservation => this.consumerEnterpriseId(reservation) === this.context.enterpriseId);
        return this.applyReservationFilters(scoped);
    }
    get marketplaceSlots() {
        if (this.context.isAdmin) {
            return [];
        }
        return this.slots
            .filter(slot => slot.status === 'open')
            .filter(slot => this.slotEnterpriseId(slot) !== this.context.enterpriseId)
            .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
    }
    get selectedReservation() {
        return this.reservations.find(reservation => reservation.id === this.selectedReservationId) ?? null;
    }
    get selectedReservationTimeline() {
        return this.selectedReservation
            ? this.workspace.buildReservationTimeline(this.selectedReservation.status)
            : [];
    }
    get pendingCount() {
        return this.providerReservations.filter(item => item.status === 'PENDING').length;
    }
    get confirmedCount() {
        return this.providerReservations.filter(item => item.status === 'CONFIRMED').length;
    }
    get rejectedCount() {
        return this.providerReservations.filter(item => item.status === 'CANCELLED').length;
    }
    get conflictCount() {
        return this.providerReservations.filter(item => this.conflictFor(item).hasConflict).length;
    }
    openCreate(slot) {
        this.form = this.createForm();
        this.showForm = true;
        this.error = '';
        this.success = '';
        if (slot) {
            this.selectedSlotId = slot.id;
            this.form.slotId = slot.id;
            this.form.machine = slot.machine;
            this.form.date = slot.date;
            this.form.startHour = slot.startHour;
            this.form.hours = Math.max(1, slot.endHour - slot.startHour);
            this.form.solar = slot.solar;
        }
    }
    openEdit(reservation) {
        this.selectedReservationId = reservation.id;
        this.showForm = true;
        this.form = {
            id: reservation.id,
            slotId: reservation.slotId ?? null,
            company: reservation.company,
            machine: reservation.machine,
            date: reservation.date,
            startHour: reservation.startHour,
            hours: reservation.hours,
            solar: reservation.solar,
            enterpriseId: this.consumerEnterpriseId(reservation),
            status: reservation.status,
        };
    }
    closeForm() {
        this.showForm = false;
        this.saving = false;
        this.selectedSlotId = null;
        this.form = this.createForm();
    }
    saveReservation() {
        if (this.saving) {
            return;
        }
        if (!this.form.company.trim() || !this.form.machine.trim() || !this.form.date || this.form.slotId == null) {
            this.error = 'Company, slot, machine, and date are required.';
            return;
        }
        const payload = {
            company: this.form.company.trim(),
            machine: this.form.machine.trim(),
            date: this.form.date,
            hours: this.form.hours,
            startHour: this.form.startHour,
            solar: this.form.solar,
            slotId: this.form.slotId,
            enterpriseId: this.form.enterpriseId ?? this.context.enterpriseId,
            status: this.form.id ? this.form.status : 'PENDING',
        };
        this.error = '';
        this.success = '';
        this.saving = true;
        const request$ = this.form.id
            ? this.state.updateReservation(this.form.id, payload)
            : this.state.createReservationWithSlot(this.form.slotId, {
                company: payload.company,
                machine: payload.machine,
                date: payload.date,
                hours: payload.hours,
                startHour: payload.startHour,
                solar: payload.solar,
                enterpriseId: payload.enterpriseId,
                status: 'PENDING',
            });
        request$.subscribe({
            next: () => {
                this.success = this.form.id ? 'Reservation updated.' : 'Reservation request sent.';
                this.closeForm();
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to save reservation.';
                this.saving = false;
            },
        });
    }
    decide(reservation, nextStatus) {
        if (nextStatus === 'REJECTED') {
            const reason = window.prompt('Reason for rejection:', reservation.cancelReason ?? '') ?? '';
            this.state.cancelReservation(reservation.id, reason).subscribe({
                next: () => {
                    this.success = 'Reservation rejected.';
                    this.refresh();
                },
                error: error => {
                    this.error = error?.error?.message ?? 'Failed to reject reservation.';
                },
            });
            return;
        }
        const payload = {
            company: reservation.company,
            machine: reservation.machine,
            date: reservation.date,
            hours: reservation.hours,
            startHour: reservation.startHour,
            solar: reservation.solar,
            slotId: reservation.slotId ?? null,
            enterpriseId: this.consumerEnterpriseId(reservation),
            status: this.workspace.fromUiReservationStatus(nextStatus),
        };
        this.state.updateReservation(reservation.id, payload).subscribe({
            next: () => {
                this.success = 'Reservation confirmed.';
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to confirm reservation.';
            },
        });
    }
    requestDelete(reservation) {
        this.pendingDelete = reservation;
        this.showAdminDelete = true;
    }
    deleteReservation() {
        if (!this.pendingDelete) {
            return;
        }
        this.deleting = true;
        this.state.deleteReservation(this.pendingDelete.id).subscribe({
            next: () => {
                this.success = 'Reservation deleted.';
                this.deleting = false;
                this.showAdminDelete = false;
                this.pendingDelete = null;
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to delete reservation.';
                this.deleting = false;
            },
        });
    }
    selectReservation(reservation) {
        this.selectedReservationId = reservation.id;
    }
    conflictFor(reservation) {
        return this.workspace.detectReservationConflict(reservation, this.reservations, this.slots);
    }
    toUiStatus(reservation) {
        return this.workspace.toUiReservationStatus(reservation.status);
    }
    statusVariant(status) {
        return this.workspace.statusVariant(status);
    }
    handleInsightAction(_insight) {
        if (!this.marketplaceSlots.length) {
            return;
        }
        this.openCreate(this.marketplaceSlots[0]);
    }
    refresh() {
        this.loading = true;
        this.context = this.readContext();
        this.state.loadAll().subscribe({
            next: snapshot => {
                this.reservations = snapshot.reservations;
                this.slots = snapshot.slots;
                this.loading = false;
                this.loadInsights();
            },
            error: error => {
                this.loading = false;
                this.error = error?.error?.message ?? 'Failed to load reservations.';
            },
        });
    }
    loadInsights() {
        this.ai.getInsights('reservations', this.context).subscribe({
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
            slotId: null,
            company: this.context.companyName,
            machine: '',
            date: new Date().toISOString().slice(0, 10),
            startHour: 8,
            hours: 2,
            solar: false,
            enterpriseId: this.context.enterpriseId,
            status: 'PENDING',
        };
    }
    applyReservationFilters(rows) {
        const query = this.search.trim().toLowerCase();
        return rows
            .filter(row => this.statusFilter === 'all' || this.toUiStatus(row) === this.statusFilter)
            .filter(row => {
            if (!query) {
                return true;
            }
            return [
                row.company,
                row.machine,
                row.date,
                this.toUiStatus(row),
            ].some(value => value.toLowerCase().includes(query));
        })
            .sort((left, right) => left.date.localeCompare(right.date) || left.startHour - right.startHour);
    }
    consumerEnterpriseId(reservation) {
        return this.workspace.getReservationRelations(reservation, this.slots).consumerEnterpriseId;
    }
    providerEnterpriseId(reservation) {
        return this.workspace.getReservationRelations(reservation, this.slots).providerEnterpriseId;
    }
    slotEnterpriseId(slot) {
        return slot.enterprise?.id ?? slot.enterpriseId ?? null;
    }
    static ɵfac = function EnterpriseReservations_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnterpriseReservations)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.ReservationCenterState), i0.ɵɵdirectiveInject(i3.ReservationCenterAiService), i0.ɵɵdirectiveInject(i4.ReservationCenterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EnterpriseReservations, selectors: [["app-enterprise-reservations"]], decls: 71, vars: 26, consts: [[1, "rc-page"], [1, "rc-hero", "card"], [1, "rc-kicker"], [1, "rc-subtitle"], [1, "rc-hero-stats"], [1, "rc-stat"], [1, "rc-stat", "warning"], [3, "action", "title", "subtitle", "insights"], [1, "card", "rc-toolbar"], [1, "search-box"], ["placeholder", "Company, machine, date, status", 3, "ngModelChange", "ngModel"], [1, "filter-select", 3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "PENDING"], ["value", "CONFIRMED"], ["value", "REJECTED"], ["class", "btn btn-primary", "type", "button", 3, "click", 4, "ngIf"], ["class", "card", 4, "ngIf"], [1, "rc-grid"], [1, "card"], [1, "rc-section-head"], ["class", "rc-empty", 4, "ngIf"], ["class", "data-table", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click"], [1, "rc-form-grid"], [1, "form-group"], [3, "ngModelChange", "ngModel"], ["type", "number", 3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "23", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "max", "24", 3, "ngModelChange", "ngModel"], ["class", "form-group", 4, "ngIf"], [1, "rc-toggle"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "rc-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click", "disabled"], [1, "alert", "alert-danger"], [1, "alert", "alert-success"], [1, "btn", "btn-outline", "btn-sm", 3, "routerLink"], [1, "rc-empty"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [3, "label", "variant"], [1, "rc-row-actions"], ["class", "btn btn-outline btn-sm", "type", "button", 3, "click", 4, "ngIf"], [3, "reservation", "reservations", "slots"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click", "disabled"], [1, "rc-timeline"], ["class", "rc-timeline-item", 4, "ngFor", "ngForOf"], [1, "rc-conflict-box"], [4, "ngIf"], [1, "rc-timeline-item"], [1, "rc-timeline-dot", 3, "ngClass"], [1, "modal-overlay", 3, "click"], [1, "modal", "rc-delete-modal", 3, "click"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"]], template: function EnterpriseReservations_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "section", 1)(2, "div")(3, "p", 2);
            i0.ɵɵtext(4, "Reservation lifecycle");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "div", 5)(11, "span");
            i0.ɵɵtext(12, "Pending");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "strong");
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 5)(16, "span");
            i0.ɵɵtext(17, "Confirmed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "strong");
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 5)(21, "span");
            i0.ɵɵtext(22, "Rejected");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "strong");
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 6)(26, "span");
            i0.ɵɵtext(27, "Conflicts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "strong");
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(30, "app-ai-insights-panel", 7);
            i0.ɵɵlistener("action", function EnterpriseReservations_Template_app_ai_insights_panel_action_30_listener($event) { return ctx.handleInsightAction($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "section", 8)(32, "div", 9)(33, "span");
            i0.ɵɵtext(34, "Search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "input", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_Template_input_ngModelChange_35_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.search, $event) || (ctx.search = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "select", 11);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_Template_select_ngModelChange_36_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event); return $event; });
            i0.ɵɵelementStart(37, "option", 12);
            i0.ɵɵtext(38, "All statuses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "option", 13);
            i0.ɵɵtext(40, "Pending");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "option", 14);
            i0.ɵɵtext(42, "Confirmed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "option", 15);
            i0.ɵɵtext(44, "Rejected");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(45, EnterpriseReservations_button_45_Template, 2, 0, "button", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(46, EnterpriseReservations_section_46_Template, 46, 14, "section", 17)(47, EnterpriseReservations_section_47_Template, 11, 4, "section", 17);
            i0.ɵɵelementStart(48, "section", 18)(49, "article", 19)(50, "div", 20)(51, "div")(52, "h2");
            i0.ɵɵtext(53);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "p");
            i0.ɵɵtext(55);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(56, EnterpriseReservations_div_56_Template, 2, 0, "div", 21)(57, EnterpriseReservations_div_57_Template, 2, 0, "div", 21)(58, EnterpriseReservations_table_58_Template, 17, 1, "table", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "article", 19)(60, "div", 20)(61, "div")(62, "h2");
            i0.ɵɵtext(63);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "p");
            i0.ɵɵtext(65);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(66, EnterpriseReservations_div_66_Template, 2, 0, "div", 21)(67, EnterpriseReservations_div_67_Template, 2, 0, "div", 21)(68, EnterpriseReservations_table_68_Template, 19, 1, "table", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(69, EnterpriseReservations_section_69_Template, 15, 9, "section", 17)(70, EnterpriseReservations_div_70_Template, 11, 3, "div", 23);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.dashboardTitle);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.context.isAdmin ? "Full visibility over every request, provider decision, and reservation-to-order handoff." : "One enterprise role, two contexts: consumer when you request, provider when you own the slot.", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.pendingCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.confirmedCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.rejectedCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.conflictCount);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", "Reservation AI")("subtitle", "Backend-driven booking optimization and request triage.")("insights", ctx.aiInsights);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.search);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.statusFilter);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.context.isAdmin);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.context.isAdmin);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "All reservations" : "My reservations");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Cross-marketplace consumer requests." : "Requests created by your enterprise.");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.myReservations.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.myReservations.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "All provider decisions" : "Incoming requests");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Override any request from the control center." : "Requests on slots owned by your enterprise.");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.providerReservations.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.providerReservations.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedReservation);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showAdminDelete);
        } }, dependencies: [CommonModule, i5.NgClass, i5.NgForOf, i5.NgIf, FormsModule, i6.NgSelectOption, i6.ɵNgSelectMultipleOption, i6.DefaultValueAccessor, i6.NumberValueAccessor, i6.CheckboxControlValueAccessor, i6.SelectControlValueAccessor, i6.NgControlStatus, i6.MinValidator, i6.MaxValidator, i6.NgModel, RouterLink, AiInsightsPanel, DecisionAssistantComponent, StatusChip, i5.SlicePipe], styles: [".rc-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 24px;\n  background:\n    radial-gradient(circle at top right, rgba(22, 163, 74, 0.18), transparent 34%),\n    linear-gradient(135deg, rgba(240, 253, 244, 0.95), rgba(255, 255, 255, 0.98));\n}\n\n.rc-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.55;\n}\n\n.rc-hero-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(120px, 1fr));\n  gap: 12px;\n  min-width: 280px;\n}\n\n.rc-stat[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-radius: 16px;\n  border: 1px solid rgba(22, 163, 74, 0.12);\n  background: rgba(255, 255, 255, 0.92);\n}\n\n.rc-stat.warning[_ngcontent-%COMP%] {\n  border-color: rgba(217, 119, 6, 0.18);\n}\n\n.rc-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text3);\n  margin-bottom: 8px;\n}\n\n.rc-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--text);\n}\n\n.rc-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n  padding: 18px;\n}\n\n.rc-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.15fr 1fr;\n  gap: 18px;\n}\n\n.rc-section-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n\n.rc-empty[_ngcontent-%COMP%] {\n  padding: 18px;\n  border: 1px dashed var(--border2);\n  border-radius: 14px;\n  color: var(--text3);\n}\n\n.rc-row-actions[_ngcontent-%COMP%], \n.rc-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.rc-row-actions[_ngcontent-%COMP%] {\n  min-width: 152px;\n}\n\n.rc-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n\n.rc-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 46px;\n  color: var(--text2);\n}\n\n.rc-conflict[_ngcontent-%COMP%] {\n  color: #b45309;\n  font-weight: 700;\n}\n\n.rc-timeline[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.rc-timeline-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n\n.rc-timeline-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: var(--text2);\n}\n\n.rc-timeline-dot[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border-radius: 999px;\n  margin-top: 4px;\n  background: #cbd5e1;\n  box-shadow: 0 0 0 5px rgba(148, 163, 184, 0.14);\n}\n\n.rc-timeline-dot.done[_ngcontent-%COMP%] {\n  background: #16a34a;\n  box-shadow: 0 0 0 5px rgba(22, 163, 74, 0.14);\n}\n\n.rc-timeline-dot.active[_ngcontent-%COMP%] {\n  background: #d97706;\n  box-shadow: 0 0 0 5px rgba(217, 119, 6, 0.14);\n}\n\n.rc-conflict-box[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  border-radius: 14px;\n  padding: 16px;\n  border: 1px solid rgba(100, 116, 139, 0.18);\n  background: rgba(248, 250, 252, 0.85);\n}\n\n.rc-conflict-box.active[_ngcontent-%COMP%] {\n  border-color: rgba(217, 119, 6, 0.2);\n  background: rgba(255, 247, 237, 0.92);\n}\n\n.rc-delete-modal[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text2);\n  margin: 10px 0 18px;\n}\n\n@media (max-width: 1100px) {\n  .rc-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .rc-hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .rc-hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    min-width: 0;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnterpriseReservations, [{
        type: Component,
        args: [{ selector: 'app-enterprise-reservations', standalone: true, imports: [CommonModule, FormsModule, RouterLink, AiInsightsPanel, DecisionAssistantComponent, StatusChip], template: "<div class=\"rc-page\">\n  <section class=\"rc-hero card\">\n    <div>\n      <p class=\"rc-kicker\">Reservation lifecycle</p>\n      <h1>{{ dashboardTitle }}</h1>\n      <p class=\"rc-subtitle\">\n        {{ context.isAdmin\n          ? 'Full visibility over every request, provider decision, and reservation-to-order handoff.'\n          : 'One enterprise role, two contexts: consumer when you request, provider when you own the slot.' }}\n      </p>\n    </div>\n    <div class=\"rc-hero-stats\">\n      <div class=\"rc-stat\">\n        <span>Pending</span>\n        <strong>{{ pendingCount }}</strong>\n      </div>\n      <div class=\"rc-stat\">\n        <span>Confirmed</span>\n        <strong>{{ confirmedCount }}</strong>\n      </div>\n      <div class=\"rc-stat\">\n        <span>Rejected</span>\n        <strong>{{ rejectedCount }}</strong>\n      </div>\n      <div class=\"rc-stat warning\">\n        <span>Conflicts</span>\n        <strong>{{ conflictCount }}</strong>\n      </div>\n    </div>\n  </section>\n\n  <app-ai-insights-panel\n    [title]=\"'Reservation AI'\"\n    [subtitle]=\"'Backend-driven booking optimization and request triage.'\"\n    [insights]=\"aiInsights\"\n    (action)=\"handleInsightAction($event)\"\n  />\n\n  <section class=\"card rc-toolbar\">\n    <div class=\"search-box\">\n      <span>Search</span>\n      <input [(ngModel)]=\"search\" placeholder=\"Company, machine, date, status\" />\n    </div>\n    <select class=\"filter-select\" [(ngModel)]=\"statusFilter\">\n      <option value=\"all\">All statuses</option>\n      <option value=\"PENDING\">Pending</option>\n      <option value=\"CONFIRMED\">Confirmed</option>\n      <option value=\"REJECTED\">Rejected</option>\n    </select>\n    <button class=\"btn btn-primary\" type=\"button\" (click)=\"openCreate()\" *ngIf=\"context.isAdmin\">New Reservation</button>\n  </section>\n\n  <section class=\"card\" *ngIf=\"showForm\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>{{ form.id ? 'Update reservation' : 'Create reservation request' }}</h2>\n        <p>Requests start in pending status and only confirmed requests may later generate orders.</p>\n      </div>\n      <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"closeForm()\">Close</button>\n    </div>\n\n    <div class=\"rc-form-grid\">\n      <div class=\"form-group\">\n        <label>Company</label>\n        <input [(ngModel)]=\"form.company\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Slot ID</label>\n        <input type=\"number\" [(ngModel)]=\"form.slotId\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Machine</label>\n        <input [(ngModel)]=\"form.machine\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Date</label>\n        <input type=\"date\" [(ngModel)]=\"form.date\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Start hour</label>\n        <input type=\"number\" min=\"0\" max=\"23\" [(ngModel)]=\"form.startHour\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Duration (hours)</label>\n        <input type=\"number\" min=\"1\" max=\"24\" [(ngModel)]=\"form.hours\" />\n      </div>\n      <div class=\"form-group\" *ngIf=\"context.isAdmin\">\n        <label>Consumer enterprise ID</label>\n        <input type=\"number\" [(ngModel)]=\"form.enterpriseId\" />\n      </div>\n      <label class=\"rc-toggle\">\n        <input type=\"checkbox\" [(ngModel)]=\"form.solar\" />\n        <span>Solar-backed reservation</span>\n      </label>\n    </div>\n\n    <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n    <div class=\"alert alert-success\" *ngIf=\"success\">{{ success }}</div>\n\n    <div class=\"rc-actions\">\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"saveReservation()\" [disabled]=\"saving\">\n        {{ saving ? 'Saving...' : (form.id ? 'Update reservation' : 'Create request') }}\n      </button>\n      <button class=\"btn btn-outline\" type=\"button\" (click)=\"closeForm()\" [disabled]=\"saving\">Cancel</button>\n    </div>\n  </section>\n\n  <section class=\"card\" *ngIf=\"!context.isAdmin\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>Marketplace</h2>\n        <p>Browse slots owned by other enterprises and submit a reservation request.</p>\n      </div>\n      <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/marketplace']\">Open marketplace</a>\n    </div>\n\n    <div class=\"rc-empty\" *ngIf=\"!marketplaceSlots.length\">No open external slots are available right now.</div>\n\n    <table class=\"data-table\" *ngIf=\"marketplaceSlots.length\">\n      <thead>\n        <tr>\n          <th>Provider</th>\n          <th>Machine</th>\n          <th>Date</th>\n          <th>Window</th>\n          <th>Solar</th>\n          <th>Discount</th>\n          <th>Action</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let slot of marketplaceSlots | slice:0:6\">\n          <td>{{ slot.enterprise?.companyName || ('Enterprise #' + (slot.enterprise?.id ?? slot.enterpriseId)) }}</td>\n          <td>{{ slot.machine }}</td>\n          <td>{{ slot.date }}</td>\n          <td>{{ slot.startHour }}:00 - {{ slot.endHour }}:00</td>\n          <td>{{ slot.solar ? 'Yes' : 'No' }}</td>\n          <td>{{ slot.discountPct || 0 }}%</td>\n          <td><button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"openCreate(slot)\">Request</button></td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n\n  <section class=\"rc-grid\">\n    <article class=\"card\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>{{ context.isAdmin ? 'All reservations' : 'My reservations' }}</h2>\n          <p>{{ context.isAdmin ? 'Cross-marketplace consumer requests.' : 'Requests created by your enterprise.' }}</p>\n        </div>\n      </div>\n\n      <div class=\"rc-empty\" *ngIf=\"loading\">Loading reservations...</div>\n      <div class=\"rc-empty\" *ngIf=\"!loading && !myReservations.length\">No matching reservations.</div>\n\n      <table class=\"data-table\" *ngIf=\"!loading && myReservations.length\">\n        <thead>\n          <tr>\n            <th>Company</th>\n            <th>Machine</th>\n            <th>Date</th>\n            <th>Status</th>\n            <th>Conflict</th>\n            <th>Actions</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let reservation of myReservations\" (click)=\"selectReservation(reservation)\">\n            <td>{{ reservation.company }}</td>\n            <td>{{ reservation.machine }}</td>\n            <td>{{ reservation.date }}</td>\n            <td>\n              <app-status-chip\n                [label]=\"toUiStatus(reservation)\"\n                [variant]=\"statusVariant(toUiStatus(reservation))\"\n              />\n            </td>\n            <td>\n              <span [class.rc-conflict]=\"conflictFor(reservation).hasConflict\">\n                {{ conflictFor(reservation).label }}\n              </span>\n            </td>\n            <td class=\"rc-row-actions\">\n              <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"openEdit(reservation); $event.stopPropagation()\">Edit</button>\n              <button\n                class=\"btn btn-outline btn-sm\"\n                type=\"button\"\n                (click)=\"requestDelete(reservation); $event.stopPropagation()\"\n                *ngIf=\"context.isAdmin\"\n              >\n                Delete\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </article>\n\n    <article class=\"card\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>{{ context.isAdmin ? 'All provider decisions' : 'Incoming requests' }}</h2>\n          <p>{{ context.isAdmin ? 'Override any request from the control center.' : 'Requests on slots owned by your enterprise.' }}</p>\n        </div>\n      </div>\n\n      <div class=\"rc-empty\" *ngIf=\"loading\">Loading incoming requests...</div>\n      <div class=\"rc-empty\" *ngIf=\"!loading && !providerReservations.length\">No incoming requests.</div>\n\n      <table class=\"data-table\" *ngIf=\"!loading && providerReservations.length\">\n        <thead>\n          <tr>\n            <th>Company</th>\n            <th>Machine</th>\n            <th>Date</th>\n            <th>Status</th>\n            <th>Conflict</th>\n            <th>AI Suggestion</th>\n            <th>Decision</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let reservation of providerReservations\" (click)=\"selectReservation(reservation)\">\n            <td>{{ reservation.company }}</td>\n            <td>{{ reservation.machine }}</td>\n            <td>{{ reservation.date }}</td>\n            <td>\n              <app-status-chip\n                [label]=\"toUiStatus(reservation)\"\n                [variant]=\"statusVariant(toUiStatus(reservation))\"\n              />\n            </td>\n            <td>\n              <span [class.rc-conflict]=\"conflictFor(reservation).hasConflict\">\n                {{ conflictFor(reservation).label }}\n              </span>\n            </td>\n            <td>\n              <app-decision-assistant\n                [reservation]=\"reservation\"\n                [reservations]=\"providerReservations\"\n                [slots]=\"slots\"\n              />\n            </td>\n            <td class=\"rc-row-actions\">\n              <button\n                class=\"btn btn-primary btn-sm\"\n                type=\"button\"\n                (click)=\"decide(reservation, 'CONFIRMED'); $event.stopPropagation()\"\n                [disabled]=\"reservation.status !== 'PENDING'\"\n              >\n                Accept\n              </button>\n              <button\n                class=\"btn btn-outline btn-sm\"\n                type=\"button\"\n                (click)=\"decide(reservation, 'REJECTED'); $event.stopPropagation()\"\n                [disabled]=\"reservation.status !== 'PENDING'\"\n              >\n                Reject\n              </button>\n              <button\n                class=\"btn btn-outline btn-sm\"\n                type=\"button\"\n                (click)=\"requestDelete(reservation); $event.stopPropagation()\"\n                *ngIf=\"context.isAdmin\"\n              >\n                Delete\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </article>\n  </section>\n\n  <section class=\"card\" *ngIf=\"selectedReservation\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>Lifecycle</h2>\n        <p>Timeline and conflict analysis for reservation #{{ selectedReservation.id }}.</p>\n      </div>\n      <app-status-chip\n        [label]=\"toUiStatus(selectedReservation)\"\n        [variant]=\"statusVariant(toUiStatus(selectedReservation))\"\n      />\n    </div>\n\n    <div class=\"rc-timeline\">\n      <div class=\"rc-timeline-item\" *ngFor=\"let item of selectedReservationTimeline\">\n        <span class=\"rc-timeline-dot\" [ngClass]=\"item.status\"></span>\n        <div>\n          <strong>{{ item.label }}</strong>\n          <p>{{ item.description }}</p>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"rc-conflict-box\" [class.active]=\"conflictFor(selectedReservation).hasConflict\">\n      <strong>{{ conflictFor(selectedReservation).label }}</strong>\n      <p *ngIf=\"conflictFor(selectedReservation).hasConflict\">\n        This request overlaps with {{ conflictFor(selectedReservation).blockingReservations.length }} active reservation(s).\n      </p>\n      <p *ngIf=\"!conflictFor(selectedReservation).hasConflict\">\n        No overlapping request is blocking the provider decision.\n      </p>\n    </div>\n  </section>\n\n  <div class=\"modal-overlay\" *ngIf=\"showAdminDelete\" (click)=\"showAdminDelete = false\">\n    <div class=\"modal rc-delete-modal\" (click)=\"$event.stopPropagation()\">\n      <h2>Delete reservation</h2>\n      <p>This removes the reservation record from the backend. Use this only for admin/provider overrides.</p>\n      <div class=\"rc-actions\">\n        <button class=\"btn btn-danger\" type=\"button\" (click)=\"deleteReservation()\" [disabled]=\"deleting\">\n          {{ deleting ? 'Deleting...' : 'Delete' }}\n        </button>\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"showAdminDelete = false\" [disabled]=\"deleting\">Cancel</button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".rc-page {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 24px;\n  background:\n    radial-gradient(circle at top right, rgba(22, 163, 74, 0.18), transparent 34%),\n    linear-gradient(135deg, rgba(240, 253, 244, 0.95), rgba(255, 255, 255, 0.98));\n}\n\n.rc-kicker {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero h1,\n.rc-section-head h2 {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle,\n.rc-section-head p {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.55;\n}\n\n.rc-hero-stats {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(120px, 1fr));\n  gap: 12px;\n  min-width: 280px;\n}\n\n.rc-stat {\n  padding: 16px;\n  border-radius: 16px;\n  border: 1px solid rgba(22, 163, 74, 0.12);\n  background: rgba(255, 255, 255, 0.92);\n}\n\n.rc-stat.warning {\n  border-color: rgba(217, 119, 6, 0.18);\n}\n\n.rc-stat span {\n  display: block;\n  font-size: 12px;\n  color: var(--text3);\n  margin-bottom: 8px;\n}\n\n.rc-stat strong {\n  font-size: 28px;\n  color: var(--text);\n}\n\n.rc-toolbar {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n  flex-wrap: wrap;\n  padding: 18px;\n}\n\n.rc-grid {\n  display: grid;\n  grid-template-columns: 1.15fr 1fr;\n  gap: 18px;\n}\n\n.rc-section-head {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  align-items: flex-start;\n  margin-bottom: 16px;\n}\n\n.rc-empty {\n  padding: 18px;\n  border: 1px dashed var(--border2);\n  border-radius: 14px;\n  color: var(--text3);\n}\n\n.rc-row-actions,\n.rc-actions {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.rc-row-actions {\n  min-width: 152px;\n}\n\n.rc-form-grid {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n\n.rc-toggle {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-height: 46px;\n  color: var(--text2);\n}\n\n.rc-conflict {\n  color: #b45309;\n  font-weight: 700;\n}\n\n.rc-timeline {\n  display: grid;\n  gap: 14px;\n}\n\n.rc-timeline-item {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n\n.rc-timeline-item p {\n  margin: 4px 0 0;\n  color: var(--text2);\n}\n\n.rc-timeline-dot {\n  width: 14px;\n  height: 14px;\n  border-radius: 999px;\n  margin-top: 4px;\n  background: #cbd5e1;\n  box-shadow: 0 0 0 5px rgba(148, 163, 184, 0.14);\n}\n\n.rc-timeline-dot.done {\n  background: #16a34a;\n  box-shadow: 0 0 0 5px rgba(22, 163, 74, 0.14);\n}\n\n.rc-timeline-dot.active {\n  background: #d97706;\n  box-shadow: 0 0 0 5px rgba(217, 119, 6, 0.14);\n}\n\n.rc-conflict-box {\n  margin-top: 18px;\n  border-radius: 14px;\n  padding: 16px;\n  border: 1px solid rgba(100, 116, 139, 0.18);\n  background: rgba(248, 250, 252, 0.85);\n}\n\n.rc-conflict-box.active {\n  border-color: rgba(217, 119, 6, 0.2);\n  background: rgba(255, 247, 237, 0.92);\n}\n\n.rc-delete-modal p {\n  color: var(--text2);\n  margin: 10px 0 18px;\n}\n\n@media (max-width: 1100px) {\n  .rc-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page {\n    padding: 16px;\n  }\n\n  .rc-hero {\n    flex-direction: column;\n  }\n\n  .rc-hero-stats {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    min-width: 0;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.ReservationCenterState }, { type: i3.ReservationCenterAiService }, { type: i4.ReservationCenterService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EnterpriseReservations, { className: "EnterpriseReservations", filePath: "src/app/features/enterprise/enterprise-reservations/enterprise-reservations.ts", lineNumber: 34 }); })();
