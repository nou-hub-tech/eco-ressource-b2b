import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AiInsightsPanel } from '../../../features/reservation-center/components/ai-insights-panel/ai-insights-panel';
import { DecisionAssistantComponent } from '../../../features/reservation-center/components/decision-assistant/decision-assistant.component';
import { StatusChip } from '../../../features/reservation-center/components/status-chip/status-chip';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../features/reservation-center/state/reservation-center.state";
import * as i4 from "../../../features/reservation-center/services/reservation-center-ai.service";
import * as i5 from "../../../features/reservation-center/services/reservation-center.service";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
const _c0 = () => ["/enterprise/marketplace"];
function EnterpriseReservations_button_51_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function EnterpriseReservations_button_51_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵtext(1, "New Reservation");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_section_52_div_34_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label");
    i0.ɵɵtext(2, "Consumer enterprise ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_52_div_34_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.form.enterpriseId, $event) || (ctx_r1.form.enterpriseId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.enterpriseId);
} }
function EnterpriseReservations_section_52_div_35_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "label");
    i0.ɵɵtext(2, "Override status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 28);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_52_div_35_Template_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.form.status, $event) || (ctx_r1.form.status = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(4, "option", 41);
    i0.ɵɵtext(5, "Pending");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "option", 42);
    i0.ɵɵtext(7, "Confirmed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "option", 43);
    i0.ɵɵtext(9, "Rejected");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.status);
} }
function EnterpriseReservations_section_52_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function EnterpriseReservations_section_52_div_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.success);
} }
function EnterpriseReservations_section_52_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 18)(1, "div", 19)(2, "div")(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Requests start pending and only confirmed reservations can later create an order.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_section_52_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵtext(8, "Close");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 26)(10, "div", 27)(11, "label");
    i0.ɵɵtext(12, "Company");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "input", 28);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_52_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.company, $event) || (ctx_r1.form.company = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 27)(15, "label");
    i0.ɵɵtext(16, "Slot ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "input", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_52_Template_input_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.slotId, $event) || (ctx_r1.form.slotId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 27)(19, "label");
    i0.ɵɵtext(20, "Resource label");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 28);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_52_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.machine, $event) || (ctx_r1.form.machine = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 27)(23, "label");
    i0.ɵɵtext(24, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "input", 30);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_52_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.date, $event) || (ctx_r1.form.date = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 27)(27, "label");
    i0.ɵɵtext(28, "Start hour");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "input", 31);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_52_Template_input_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.startHour, $event) || (ctx_r1.form.startHour = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 27)(31, "label");
    i0.ɵɵtext(32, "Duration (hours)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "input", 32);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_52_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.hours, $event) || (ctx_r1.form.hours = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(34, EnterpriseReservations_section_52_div_34_Template, 4, 1, "div", 33)(35, EnterpriseReservations_section_52_div_35_Template, 10, 1, "div", 33);
    i0.ɵɵelementStart(36, "label", 34)(37, "input", 35);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_section_52_Template_input_ngModelChange_37_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.solar, $event) || (ctx_r1.form.solar = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span");
    i0.ɵɵtext(39, "Solar-backed reservation");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(40, EnterpriseReservations_section_52_div_40_Template, 2, 1, "div", 36)(41, EnterpriseReservations_section_52_div_41_Template, 2, 1, "div", 37);
    i0.ɵɵelementStart(42, "div", 38)(43, "button", 39);
    i0.ɵɵlistener("click", function EnterpriseReservations_section_52_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveReservation()); });
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "button", 40);
    i0.ɵɵlistener("click", function EnterpriseReservations_section_52_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵtext(46, "Cancel");
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
function EnterpriseReservations_section_53_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵtext(1, "No open external resources are available right now.");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_section_53_div_10_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 51)(1, "div", 52)(2, "span", 53);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "span", 54);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "h3");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 55)(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "button", 56);
    i0.ɵɵlistener("click", function EnterpriseReservations_section_53_div_10_article_1_Template_button_click_18_listener() { const slot_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openCreate(slot_r7)); });
    i0.ɵɵtext(19, "Request Reservation");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const slot_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.resourceToken(slot_r7.machine));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.resourceKind(slot_r7.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.resourceName(slot_r7.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((slot_r7.enterprise == null ? null : slot_r7.enterprise.companyName) || "Enterprise #" + ((slot_r7.enterprise == null ? null : slot_r7.enterprise.id) ?? slot_r7.enterpriseId));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slot_r7.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.workspace.formatWindow(slot_r7.startHour, slot_r7.endHour));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", slot_r7.discountPct || 0, "% discount");
} }
function EnterpriseReservations_section_53_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵtemplate(1, EnterpriseReservations_section_53_div_10_article_1_Template, 20, 7, "article", 50);
    i0.ɵɵpipe(2, "slice");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind3(2, 1, ctx_r1.marketplaceSlots, 0, 4));
} }
function EnterpriseReservations_section_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 18)(1, "div", 19)(2, "div")(3, "h2");
    i0.ɵɵtext(4, "Marketplace shortcuts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Request external resources directly or jump into the full marketplace experience.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "a", 46);
    i0.ɵɵtext(8, "Open marketplace");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, EnterpriseReservations_section_53_div_9_Template, 2, 0, "div", 21)(10, EnterpriseReservations_section_53_div_10_Template, 3, 5, "div", 47);
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
function EnterpriseReservations_div_62_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 38)(1, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_62_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleAllReservations()); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 57);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_62_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.bulkDecide("CONFIRMED")); });
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 58);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_62_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.bulkDecide("REJECTED")); });
    i0.ɵɵtext(6, " Bulk reject ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.allReservationsSelected ? "Clear selection" : "Select all", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.selectedReservations.length || ctx_r1.bulkBusy);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.bulkBusy ? "Applying..." : "Bulk accept", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.selectedReservations.length || ctx_r1.bulkBusy);
} }
function EnterpriseReservations_div_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵtext(1, "Loading reservations...");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵtext(1, "No matching reservations.");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_65_article_1_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 71);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_65_article_1_label_1_Template_label_click_0_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(1, "input", 72);
    i0.ɵɵlistener("change", function EnterpriseReservations_div_65_article_1_label_1_Template_input_change_1_listener() { i0.ɵɵrestoreView(_r11); const reservation_r10 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleReservationSelection(reservation_r10.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Select");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reservation_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r1.selectedReservationIds.has(reservation_r10.id));
} }
function EnterpriseReservations_div_65_article_1_button_28_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_65_article_1_button_28_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r12); const reservation_r10 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.cancelReservation(reservation_r10); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(1, " Cancel ");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_65_article_1_button_29_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_65_article_1_button_29_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r13); const reservation_r10 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.requestDelete(reservation_r10); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(1, " Delete ");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_65_article_1_button_30_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_65_article_1_button_30_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r14); const reservation_r10 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.forceStatus(reservation_r10, "CONFIRMED"); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(1, " Override ");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_65_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 61);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_65_article_1_Template_article_click_0_listener() { const reservation_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.selectReservation(reservation_r10); return i0.ɵɵresetView(ctx_r1.focusedView = "my"); });
    i0.ɵɵtemplate(1, EnterpriseReservations_div_65_article_1_label_1_Template, 4, 1, "label", 62);
    i0.ɵɵelementStart(2, "div", 63)(3, "div", 64)(4, "span", 53);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "span", 54);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "h3");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(11, "app-status-chip", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 66)(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 67);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 68)(24, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_65_article_1_Template_button_click_24_listener($event) { const reservation_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.openEdit(reservation_r10); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(25, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_65_article_1_Template_button_click_26_listener($event) { const reservation_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.inspectReservation(reservation_r10); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(27, "Inspect");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(28, EnterpriseReservations_div_65_article_1_button_28_Template, 2, 0, "button", 69)(29, EnterpriseReservations_div_65_article_1_button_29_Template, 2, 0, "button", 69)(30, EnterpriseReservations_div_65_article_1_button_30_Template, 2, 0, "button", 70);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reservation_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-status", ctx_r1.toUiStatus(reservation_r10).toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.context.isAdmin);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.resourceToken(reservation_r10.machine));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.resourceKind(reservation_r10.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.resourceName(reservation_r10.machine));
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", ctx_r1.toUiStatus(reservation_r10))("variant", ctx_r1.statusVariant(ctx_r1.toUiStatus(reservation_r10)));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r10.company);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(reservation_r10.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.reservationWindow(reservation_r10));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r10.solar ? "Solar-backed" : "Standard power");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.conflictFor(reservation_r10).hasConflict);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.conflictFor(reservation_r10).label, " ");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", !ctx_r1.context.isAdmin && reservation_r10.status !== "CANCELLED");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.context.isAdmin);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.context.isAdmin);
} }
function EnterpriseReservations_div_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵtemplate(1, EnterpriseReservations_div_65_article_1_Template, 31, 17, "article", 60);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.myReservations);
} }
function EnterpriseReservations_div_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵtext(1, "Loading incoming requests...");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵtext(1, "No incoming requests.");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_75_article_1_button_29_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_75_article_1_button_29_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r17); const reservation_r16 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.requestDelete(reservation_r16); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(1, " Delete ");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_75_article_1_button_32_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_75_article_1_button_32_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r18); const reservation_r16 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.forceStatus(reservation_r16, "CONFIRMED"); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(1, " Override ");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_div_75_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 74);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_75_article_1_Template_article_click_0_listener() { const reservation_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.selectReservation(reservation_r16); return i0.ɵɵresetView(ctx_r1.focusedView = "incoming"); });
    i0.ɵɵelementStart(1, "div", 63)(2, "div", 64)(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "span", 54);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "h3");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(10, "app-status-chip", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 66)(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 67);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 75);
    i0.ɵɵelement(23, "app-decision-assistant", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 68)(25, "button", 57);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_75_article_1_Template_button_click_25_listener($event) { const reservation_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.decide(reservation_r16, "CONFIRMED"); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(26, " Accept ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 58);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_75_article_1_Template_button_click_27_listener($event) { const reservation_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.decide(reservation_r16, "REJECTED"); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(28, " Reject ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(29, EnterpriseReservations_div_75_article_1_button_29_Template, 2, 0, "button", 69);
    i0.ɵɵelementStart(30, "button", 25);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_75_article_1_Template_button_click_30_listener($event) { const reservation_r16 = i0.ɵɵrestoreView(_r15).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.inspectReservation(reservation_r16); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(31, " Inspect ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(32, EnterpriseReservations_div_75_article_1_button_32_Template, 2, 0, "button", 70);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reservation_r16 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-status", ctx_r1.toUiStatus(reservation_r16).toLowerCase());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.resourceToken(reservation_r16.machine));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.resourceKind(reservation_r16.machine));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.resourceName(reservation_r16.machine));
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", ctx_r1.toUiStatus(reservation_r16))("variant", ctx_r1.statusVariant(ctx_r1.toUiStatus(reservation_r16)));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r16.company);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(reservation_r16.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.reservationWindow(reservation_r16));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.providerName(reservation_r16));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", ctx_r1.conflictFor(reservation_r16).hasConflict);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.conflictFor(reservation_r16).label, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("reservation", reservation_r16)("reservations", ctx_r1.providerReservations)("slots", ctx_r1.slots);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", reservation_r16.status !== "PENDING");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", reservation_r16.status !== "PENDING");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.context.isAdmin);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.context.isAdmin);
} }
function EnterpriseReservations_div_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵtemplate(1, EnterpriseReservations_div_75_article_1_Template, 33, 20, "article", 73);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.providerReservations);
} }
function EnterpriseReservations_section_76_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 82);
    i0.ɵɵelement(1, "span", 83);
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r19 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", item_r19.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r19.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r19.description);
} }
function EnterpriseReservations_section_76_p_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" This request overlaps with ", ctx_r1.conflictFor(ctx_r1.selectedReservation).blockingReservations.length, " active reservation(s). ");
} }
function EnterpriseReservations_section_76_p_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, " No overlapping request is blocking the provider decision. ");
    i0.ɵɵelementEnd();
} }
function EnterpriseReservations_section_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 18)(1, "div", 19)(2, "div")(3, "h2");
    i0.ɵɵtext(4, "Lifecycle");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "app-status-chip", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 77)(9, "div", 78);
    i0.ɵɵtemplate(10, EnterpriseReservations_section_76_div_10_Template, 7, 3, "div", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 80)(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, EnterpriseReservations_section_76_p_14_Template, 2, 1, "p", 81)(15, EnterpriseReservations_section_76_p_15_Template, 2, 0, "p", 81);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Timeline and conflict analysis for reservation #", ctx_r1.selectedReservation.id, ".");
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", ctx_r1.toUiStatus(ctx_r1.selectedReservation))("variant", ctx_r1.statusVariant(ctx_r1.toUiStatus(ctx_r1.selectedReservation)));
    i0.ɵɵadvance(3);
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
function EnterpriseReservations_div_77_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 84);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_77_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showAdminDelete = false); });
    i0.ɵɵelementStart(1, "div", 85);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_77_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Delete reservation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "This removes the reservation record from the backend. Use this only for admin/provider overrides.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 38)(7, "button", 86);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_77_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.deleteReservation()); });
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 40);
    i0.ɵɵlistener("click", function EnterpriseReservations_div_77_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r20); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showAdminDelete = false); });
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
    route;
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
    focusedView = 'my';
    bulkBusy = false;
    selectedReservationIds = new Set();
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
    constructor(auth, route, state, ai, workspace) {
        this.auth = auth;
        this.route = route;
        this.state = state;
        this.ai = ai;
        this.workspace = workspace;
    }
    ngOnInit() {
        this.context = this.readContext();
        this.route.queryParamMap.subscribe(params => {
            const slotId = Number(params.get('slotId'));
            if (!slotId) {
                return;
            }
            this.openCreate({
                id: slotId,
                machine: params.get('machine') ?? '',
                date: params.get('date') ?? new Date().toISOString().slice(0, 10),
                startHour: Number(params.get('startHour') ?? 8),
                endHour: Number(params.get('startHour') ?? 8) + Number(params.get('hours') ?? 1),
                solar: params.get('solar') === 'true',
                status: 'open',
                discountPct: 0,
            });
        });
        this.refresh();
    }
    get dashboardTitle() {
        return this.context.isAdmin ? 'Reservation Control Center' : 'Reservation Requests';
    }
    get providerReservations() {
        const scoped = this.context.isAdmin
            ? this.reservations.filter(reservation => reservation.status === 'PENDING' || this.conflictFor(reservation).hasConflict)
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
    get pendingTabCount() {
        return this.reservations.filter(item => this.toUiStatus(item) === 'PENDING').length;
    }
    get confirmedTabCount() {
        return this.reservations.filter(item => this.toUiStatus(item) === 'CONFIRMED').length;
    }
    get rejectedTabCount() {
        return this.reservations.filter(item => this.toUiStatus(item) === 'REJECTED').length;
    }
    get selectedReservations() {
        return this.myReservations.filter(item => this.selectedReservationIds.has(item.id));
    }
    get allReservationsSelected() {
        return !!this.myReservations.length && this.myReservations.every(item => this.selectedReservationIds.has(item.id));
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
    cancelReservation(reservation) {
        const reason = window.prompt('Reason for cancellation:', reservation.cancelReason ?? '') ?? '';
        this.state.cancelReservation(reservation.id, reason).subscribe({
            next: () => {
                this.success = 'Reservation cancelled.';
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to cancel reservation.';
            },
        });
    }
    toggleReservationSelection(id) {
        if (!this.context.isAdmin) {
            return;
        }
        if (this.selectedReservationIds.has(id)) {
            this.selectedReservationIds.delete(id);
        }
        else {
            this.selectedReservationIds.add(id);
        }
        this.selectedReservationIds = new Set(this.selectedReservationIds);
    }
    toggleAllReservations() {
        if (!this.context.isAdmin) {
            return;
        }
        if (this.allReservationsSelected) {
            this.selectedReservationIds.clear();
        }
        else {
            this.selectedReservationIds = new Set(this.myReservations.map(item => item.id));
        }
    }
    bulkDecide(nextStatus) {
        if (!this.context.isAdmin || !this.selectedReservations.length || this.bulkBusy) {
            return;
        }
        this.bulkBusy = true;
        const reason = nextStatus === 'REJECTED'
            ? window.prompt('Reason for bulk rejection:', '') ?? ''
            : '';
        const requests = this.selectedReservations.map(reservation => {
            if (nextStatus === 'REJECTED') {
                return this.state.cancelReservation(reservation.id, reason);
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
            return this.state.updateReservation(reservation.id, payload);
        });
        forkJoin(requests).subscribe({
            next: () => {
                this.success = nextStatus === 'CONFIRMED'
                    ? 'Selected reservations confirmed.'
                    : 'Selected reservations rejected.';
                this.bulkBusy = false;
                this.selectedReservationIds.clear();
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Bulk reservation action failed.';
                this.bulkBusy = false;
            },
        });
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
    inspectReservation(reservation) {
        this.selectReservation(reservation);
    }
    forceStatus(reservation, nextStatus) {
        this.decide(reservation, nextStatus);
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
    reservationWindow(reservation) {
        return this.workspace.formatWindow(reservation.startHour, reservation.startHour + reservation.hours);
    }
    providerName(reservation) {
        const slot = this.slots.find(item => item.id === reservation.slotId);
        return slot?.enterprise?.companyName ?? `Enterprise #${slot?.enterprise?.id ?? slot?.enterpriseId ?? ''}`;
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
                this.selectedReservationIds.clear();
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
    static ɵfac = function EnterpriseReservations_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnterpriseReservations)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i3.ReservationCenterState), i0.ɵɵdirectiveInject(i4.ReservationCenterAiService), i0.ɵɵdirectiveInject(i5.ReservationCenterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EnterpriseReservations, selectors: [["app-enterprise-reservations"]], decls: 78, vars: 37, consts: [[1, "rc-page"], [1, "rc-hero", "card"], [1, "rc-kicker"], [1, "rc-subtitle"], [1, "rc-hero-stats"], [1, "rc-stat", "pending"], [1, "rc-stat", "confirmed"], [1, "rc-stat", "rejected"], [1, "rc-stat", "warning"], [3, "action", "title", "subtitle", "insights"], [1, "card", "rc-toolbar"], [1, "search-box", "rc-search"], ["placeholder", "Company, resource, date, status", 3, "ngModelChange", "ngModel"], [1, "rc-tabs"], ["type", "button", 3, "click"], ["class", "btn btn-primary", "type", "button", 3, "click", 4, "ngIf"], ["class", "card", 4, "ngIf"], [1, "rc-grid"], [1, "card"], [1, "rc-section-head"], ["class", "rc-actions", 4, "ngIf"], ["class", "rc-empty", 4, "ngIf"], ["class", "rc-request-list", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click"], [1, "rc-form-grid"], [1, "form-group"], [3, "ngModelChange", "ngModel"], ["type", "number", 3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", "max", "23", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", "max", "24", 3, "ngModelChange", "ngModel"], ["class", "form-group", 4, "ngIf"], [1, "rc-toggle"], ["type", "checkbox", 3, "ngModelChange", "ngModel"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "rc-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click", "disabled"], ["value", "PENDING"], ["value", "CONFIRMED"], ["value", "CANCELLED"], [1, "alert", "alert-danger"], [1, "alert", "alert-success"], [1, "btn", "btn-outline", "btn-sm", 3, "routerLink"], ["class", "rc-market-grid", 4, "ngIf"], [1, "rc-empty"], [1, "rc-market-grid"], ["class", "rc-market-card", 4, "ngFor", "ngForOf"], [1, "rc-market-card"], [1, "rc-market-head"], [1, "rc-resource-token"], [1, "rc-resource-type"], [1, "rc-market-meta"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click", "disabled"], [1, "rc-request-list"], ["class", "rc-request-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "rc-request-card", 3, "click"], ["class", "rc-check", 3, "click", 4, "ngIf"], [1, "rc-request-head"], [1, "rc-request-label"], [3, "label", "variant"], [1, "rc-request-meta"], [1, "rc-request-conflict"], [1, "rc-row-actions"], ["class", "btn btn-outline btn-sm", "type", "button", 3, "click", 4, "ngIf"], ["class", "btn btn-primary btn-sm", "type", "button", 3, "click", 4, "ngIf"], [1, "rc-check", 3, "click"], ["type", "checkbox", 3, "change", "checked"], ["class", "rc-request-card provider", 3, "click", 4, "ngFor", "ngForOf"], [1, "rc-request-card", "provider", 3, "click"], [1, "rc-assistant-row"], [3, "reservation", "reservations", "slots"], [1, "rc-detail-grid"], [1, "rc-timeline"], ["class", "rc-timeline-item", 4, "ngFor", "ngForOf"], [1, "rc-conflict-box"], [4, "ngIf"], [1, "rc-timeline-item"], [1, "rc-timeline-dot", 3, "ngClass"], [1, "modal-overlay", 3, "click"], [1, "modal", "rc-delete-modal", 3, "click"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"]], template: function EnterpriseReservations_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵelementStart(15, "div", 6)(16, "span");
            i0.ɵɵtext(17, "Confirmed");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "strong");
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 7)(21, "span");
            i0.ɵɵtext(22, "Rejected");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "strong");
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 8)(26, "span");
            i0.ɵɵtext(27, "Conflicts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "strong");
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(30, "app-ai-insights-panel", 9);
            i0.ɵɵlistener("action", function EnterpriseReservations_Template_app_ai_insights_panel_action_30_listener($event) { return ctx.handleInsightAction($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "section", 10)(32, "div", 11)(33, "span");
            i0.ɵɵtext(34, "Search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "input", 12);
            i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseReservations_Template_input_ngModelChange_35_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.search, $event) || (ctx.search = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 13)(37, "button", 14);
            i0.ɵɵlistener("click", function EnterpriseReservations_Template_button_click_37_listener() { return ctx.statusFilter = "all"; });
            i0.ɵɵtext(38, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "button", 14);
            i0.ɵɵlistener("click", function EnterpriseReservations_Template_button_click_39_listener() { return ctx.statusFilter = "PENDING"; });
            i0.ɵɵtext(40, " Pending ");
            i0.ɵɵelementStart(41, "span");
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "button", 14);
            i0.ɵɵlistener("click", function EnterpriseReservations_Template_button_click_43_listener() { return ctx.statusFilter = "CONFIRMED"; });
            i0.ɵɵtext(44, " Confirmed ");
            i0.ɵɵelementStart(45, "span");
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "button", 14);
            i0.ɵɵlistener("click", function EnterpriseReservations_Template_button_click_47_listener() { return ctx.statusFilter = "REJECTED"; });
            i0.ɵɵtext(48, " Rejected ");
            i0.ɵɵelementStart(49, "span");
            i0.ɵɵtext(50);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(51, EnterpriseReservations_button_51_Template, 2, 0, "button", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(52, EnterpriseReservations_section_52_Template, 47, 15, "section", 16)(53, EnterpriseReservations_section_53_Template, 11, 4, "section", 16);
            i0.ɵɵelementStart(54, "section", 17)(55, "article", 18)(56, "div", 19)(57, "div")(58, "h2");
            i0.ɵɵtext(59);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "p");
            i0.ɵɵtext(61);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(62, EnterpriseReservations_div_62_Template, 7, 4, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(63, EnterpriseReservations_div_63_Template, 2, 0, "div", 21)(64, EnterpriseReservations_div_64_Template, 2, 0, "div", 21)(65, EnterpriseReservations_div_65_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "article", 18)(67, "div", 19)(68, "div")(69, "h2");
            i0.ɵɵtext(70);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "p");
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(73, EnterpriseReservations_div_73_Template, 2, 0, "div", 21)(74, EnterpriseReservations_div_74_Template, 2, 0, "div", 21)(75, EnterpriseReservations_div_75_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(76, EnterpriseReservations_section_76_Template, 16, 9, "section", 16)(77, EnterpriseReservations_div_77_Template, 11, 3, "div", 23);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.dashboardTitle);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.context.isAdmin ? "Inspect the full request lifecycle, from pending review to order-ready confirmation." : "Act as a consumer when you request capacity, and as a provider when another enterprise requests one of your resources.", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.pendingCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.confirmedCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.rejectedCount);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.conflictCount);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", "Reservation AI")("subtitle", "Live insight cards for booking optimization and provider-side triage.")("insights", ctx.aiInsights);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.search);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.statusFilter === "all");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.statusFilter === "PENDING");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.pendingTabCount);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.statusFilter === "CONFIRMED");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.confirmedTabCount);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.statusFilter === "REJECTED");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.rejectedTabCount);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.context.isAdmin);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showForm);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.context.isAdmin);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "All reservations" : "My reservations");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Consumer-side requests across the whole marketplace." : "Requests created by your enterprise.");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.context.isAdmin);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.myReservations.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.myReservations.length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "All provider decisions" : "Incoming requests");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Override any request from the control center." : "Requests on resources owned by your enterprise.");
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
        } }, dependencies: [CommonModule, i6.NgClass, i6.NgForOf, i6.NgIf, FormsModule, i7.NgSelectOption, i7.ɵNgSelectMultipleOption, i7.DefaultValueAccessor, i7.NumberValueAccessor, i7.CheckboxControlValueAccessor, i7.SelectControlValueAccessor, i7.NgControlStatus, i7.MinValidator, i7.MaxValidator, i7.NgModel, RouterLink, AiInsightsPanel, DecisionAssistantComponent, StatusChip, i6.SlicePipe], styles: [".rc-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero[_ngcontent-%COMP%], \n.rc-toolbar[_ngcontent-%COMP%], \n.rc-market-card[_ngcontent-%COMP%], \n.rc-request-card[_ngcontent-%COMP%], \n.rc-conflict-box[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.74);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  backdrop-filter: blur(18px);\n}\n\n.rc-hero[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.1fr 380px;\n  gap: 24px;\n  padding: 26px;\n  border-radius: 28px;\n  background:\n    radial-gradient(circle at top right, rgba(34, 197, 94, 0.16), transparent 26%),\n    linear-gradient(135deg, rgba(240, 253, 244, 0.92), rgba(255, 255, 255, 0.84));\n}\n\n.rc-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.rc-market-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.rc-request-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rc-market-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rc-request-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rc-timeline-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.rc-conflict-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.6;\n}\n\n.rc-hero-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.rc-stat[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n}\n\n.rc-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.rc-resource-type[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 11px;\n  color: var(--text3);\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-weight: 700;\n}\n\n.rc-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 30px;\n}\n\n.rc-stat.pending[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ca8a04;\n}\n\n.rc-stat.confirmed[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.rc-stat.rejected[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #dc2626;\n}\n\n.rc-stat.warning[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n\n.rc-toolbar[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(220px, 1fr) 1fr auto;\n  gap: 12px;\n  align-items: center;\n  padding: 18px;\n  border-radius: 22px;\n}\n\n.rc-search[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.7);\n}\n\n.rc-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.rc-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.72);\n  border-radius: 999px;\n  padding: 8px 13px;\n  color: var(--text2);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rc-tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-left: 6px;\n  color: var(--text3);\n}\n\n.rc-tabs[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  color: #166534;\n  border-color: rgba(34, 197, 94, 0.26);\n  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.12);\n  transform: scale(1.02);\n}\n\n.rc-grid[_ngcontent-%COMP%], \n.rc-market-grid[_ngcontent-%COMP%], \n.rc-request-list[_ngcontent-%COMP%], \n.rc-detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n}\n\n.rc-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.rc-market-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 12px;\n}\n\n.rc-market-card[_ngcontent-%COMP%], \n.rc-request-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n  padding: 18px;\n  border-radius: 22px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.rc-market-card[_ngcontent-%COMP%]:hover, \n.rc-request-card[_ngcontent-%COMP%]:hover {\n  transform: scale(1.02);\n  box-shadow: 0 22px 45px rgba(15, 23, 42, 0.12);\n}\n\n.rc-market-head[_ngcontent-%COMP%], \n.rc-request-head[_ngcontent-%COMP%], \n.rc-request-label[_ngcontent-%COMP%], \n.rc-request-meta[_ngcontent-%COMP%], \n.rc-row-actions[_ngcontent-%COMP%], \n.rc-check[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.rc-market-head[_ngcontent-%COMP%], \n.rc-request-head[_ngcontent-%COMP%] {\n  justify-content: space-between;\n  align-items: flex-start;\n}\n\n.rc-request-label[_ngcontent-%COMP%] {\n  align-items: center;\n}\n\n.rc-check[_ngcontent-%COMP%] {\n  align-items: center;\n  color: var(--text3);\n  font-size: 12px;\n}\n\n.rc-resource-token[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 46px;\n  height: 46px;\n  border-radius: 16px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.22), rgba(59, 130, 246, 0.18));\n  color: #0f172a;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n}\n\n.rc-market-meta[_ngcontent-%COMP%], \n.rc-request-meta[_ngcontent-%COMP%] {\n  color: var(--text3);\n}\n\n.rc-request-card[data-status='pending'][_ngcontent-%COMP%] {\n  border-color: rgba(250, 204, 21, 0.28);\n}\n\n.rc-request-card[data-status='confirmed'][_ngcontent-%COMP%] {\n  border-color: rgba(34, 197, 94, 0.22);\n}\n\n.rc-request-card[data-status='rejected'][_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.22);\n}\n\n.rc-request-conflict[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  padding: 10px 12px;\n  background: rgba(241, 245, 249, 0.84);\n  color: var(--text2);\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.rc-request-conflict.active[_ngcontent-%COMP%] {\n  background: rgba(255, 247, 237, 0.9);\n  color: #b45309;\n}\n\n.rc-assistant-row[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  padding: 12px;\n  background: rgba(239, 246, 255, 0.82);\n}\n\n.rc-detail-grid[_ngcontent-%COMP%] {\n  grid-template-columns: 1.1fr 0.9fr;\n}\n\n.rc-timeline[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.rc-timeline-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n\n.rc-timeline-dot[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border-radius: 999px;\n  margin-top: 4px;\n  background: #cbd5e1;\n  box-shadow: 0 0 0 5px rgba(148, 163, 184, 0.14);\n}\n\n.rc-timeline-dot.done[_ngcontent-%COMP%] {\n  background: #16a34a;\n  box-shadow: 0 0 0 5px rgba(22, 163, 74, 0.14);\n}\n\n.rc-timeline-dot.active[_ngcontent-%COMP%] {\n  background: #d97706;\n  box-shadow: 0 0 0 5px rgba(217, 119, 6, 0.14);\n}\n\n.rc-conflict-box[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  padding: 18px;\n}\n\n.rc-conflict-box.active[_ngcontent-%COMP%] {\n  background: rgba(255, 247, 237, 0.9);\n  border-color: rgba(217, 119, 6, 0.2);\n}\n\n.rc-delete-modal[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text2);\n  margin: 10px 0 18px;\n}\n\n@media (max-width: 1100px) {\n  .rc-hero[_ngcontent-%COMP%], \n   .rc-toolbar[_ngcontent-%COMP%], \n   .rc-grid[_ngcontent-%COMP%], \n   .rc-detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .rc-hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnterpriseReservations, [{
        type: Component,
        args: [{ selector: 'app-enterprise-reservations', standalone: true, imports: [CommonModule, FormsModule, RouterLink, AiInsightsPanel, DecisionAssistantComponent, StatusChip], template: "<div class=\"rc-page\">\n  <section class=\"rc-hero card\">\n    <div>\n      <p class=\"rc-kicker\">Reservation lifecycle</p>\n      <h1>{{ dashboardTitle }}</h1>\n      <p class=\"rc-subtitle\">\n        {{ context.isAdmin\n          ? 'Inspect the full request lifecycle, from pending review to order-ready confirmation.'\n          : 'Act as a consumer when you request capacity, and as a provider when another enterprise requests one of your resources.' }}\n      </p>\n    </div>\n    <div class=\"rc-hero-stats\">\n      <div class=\"rc-stat pending\">\n        <span>Pending</span>\n        <strong>{{ pendingCount }}</strong>\n      </div>\n      <div class=\"rc-stat confirmed\">\n        <span>Confirmed</span>\n        <strong>{{ confirmedCount }}</strong>\n      </div>\n      <div class=\"rc-stat rejected\">\n        <span>Rejected</span>\n        <strong>{{ rejectedCount }}</strong>\n      </div>\n      <div class=\"rc-stat warning\">\n        <span>Conflicts</span>\n        <strong>{{ conflictCount }}</strong>\n      </div>\n    </div>\n  </section>\n\n  <app-ai-insights-panel\n    [title]=\"'Reservation AI'\"\n    [subtitle]=\"'Live insight cards for booking optimization and provider-side triage.'\"\n    [insights]=\"aiInsights\"\n    (action)=\"handleInsightAction($event)\"\n  />\n\n  <section class=\"card rc-toolbar\">\n    <div class=\"search-box rc-search\">\n      <span>Search</span>\n      <input [(ngModel)]=\"search\" placeholder=\"Company, resource, date, status\" />\n    </div>\n\n    <div class=\"rc-tabs\">\n      <button type=\"button\" [class.active]=\"statusFilter === 'all'\" (click)=\"statusFilter = 'all'\">All</button>\n      <button type=\"button\" [class.active]=\"statusFilter === 'PENDING'\" (click)=\"statusFilter = 'PENDING'\">\n        Pending <span>{{ pendingTabCount }}</span>\n      </button>\n      <button type=\"button\" [class.active]=\"statusFilter === 'CONFIRMED'\" (click)=\"statusFilter = 'CONFIRMED'\">\n        Confirmed <span>{{ confirmedTabCount }}</span>\n      </button>\n      <button type=\"button\" [class.active]=\"statusFilter === 'REJECTED'\" (click)=\"statusFilter = 'REJECTED'\">\n        Rejected <span>{{ rejectedTabCount }}</span>\n      </button>\n    </div>\n\n    <button class=\"btn btn-primary\" type=\"button\" (click)=\"openCreate()\" *ngIf=\"context.isAdmin\">New Reservation</button>\n  </section>\n\n  <section class=\"card\" *ngIf=\"showForm\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>{{ form.id ? 'Update reservation' : 'Create reservation request' }}</h2>\n        <p>Requests start pending and only confirmed reservations can later create an order.</p>\n      </div>\n      <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"closeForm()\">Close</button>\n    </div>\n\n    <div class=\"rc-form-grid\">\n      <div class=\"form-group\">\n        <label>Company</label>\n        <input [(ngModel)]=\"form.company\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Slot ID</label>\n        <input type=\"number\" [(ngModel)]=\"form.slotId\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Resource label</label>\n        <input [(ngModel)]=\"form.machine\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Date</label>\n        <input type=\"date\" [(ngModel)]=\"form.date\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Start hour</label>\n        <input type=\"number\" min=\"0\" max=\"23\" [(ngModel)]=\"form.startHour\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Duration (hours)</label>\n        <input type=\"number\" min=\"1\" max=\"24\" [(ngModel)]=\"form.hours\" />\n      </div>\n      <div class=\"form-group\" *ngIf=\"context.isAdmin\">\n        <label>Consumer enterprise ID</label>\n        <input type=\"number\" [(ngModel)]=\"form.enterpriseId\" />\n      </div>\n      <div class=\"form-group\" *ngIf=\"context.isAdmin\">\n        <label>Override status</label>\n        <select [(ngModel)]=\"form.status\">\n          <option value=\"PENDING\">Pending</option>\n          <option value=\"CONFIRMED\">Confirmed</option>\n          <option value=\"CANCELLED\">Rejected</option>\n        </select>\n      </div>\n      <label class=\"rc-toggle\">\n        <input type=\"checkbox\" [(ngModel)]=\"form.solar\" />\n        <span>Solar-backed reservation</span>\n      </label>\n    </div>\n\n    <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n    <div class=\"alert alert-success\" *ngIf=\"success\">{{ success }}</div>\n\n    <div class=\"rc-actions\">\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"saveReservation()\" [disabled]=\"saving\">\n        {{ saving ? 'Saving...' : (form.id ? 'Update reservation' : 'Create request') }}\n      </button>\n      <button class=\"btn btn-outline\" type=\"button\" (click)=\"closeForm()\" [disabled]=\"saving\">Cancel</button>\n    </div>\n  </section>\n\n  <section class=\"card\" *ngIf=\"!context.isAdmin\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>Marketplace shortcuts</h2>\n        <p>Request external resources directly or jump into the full marketplace experience.</p>\n      </div>\n      <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/marketplace']\">Open marketplace</a>\n    </div>\n\n    <div class=\"rc-empty\" *ngIf=\"!marketplaceSlots.length\">No open external resources are available right now.</div>\n\n    <div class=\"rc-market-grid\" *ngIf=\"marketplaceSlots.length\">\n      <article class=\"rc-market-card\" *ngFor=\"let slot of marketplaceSlots | slice:0:4\">\n        <div class=\"rc-market-head\">\n          <span class=\"rc-resource-token\">{{ resourceToken(slot.machine) }}</span>\n          <div>\n            <span class=\"rc-resource-type\">{{ resourceKind(slot.machine) }}</span>\n            <h3>{{ resourceName(slot.machine) }}</h3>\n          </div>\n        </div>\n        <p>{{ slot.enterprise?.companyName || ('Enterprise #' + (slot.enterprise?.id ?? slot.enterpriseId)) }}</p>\n        <div class=\"rc-market-meta\">\n          <span>{{ slot.date }}</span>\n          <span>{{ workspace.formatWindow(slot.startHour, slot.endHour) }}</span>\n          <span>{{ slot.discountPct || 0 }}% discount</span>\n        </div>\n        <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"openCreate(slot)\">Request Reservation</button>\n      </article>\n    </div>\n  </section>\n\n  <section class=\"rc-grid\">\n    <article class=\"card\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>{{ context.isAdmin ? 'All reservations' : 'My reservations' }}</h2>\n          <p>{{ context.isAdmin ? 'Consumer-side requests across the whole marketplace.' : 'Requests created by your enterprise.' }}</p>\n        </div>\n        <div class=\"rc-actions\" *ngIf=\"context.isAdmin\">\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"toggleAllReservations()\">\n            {{ allReservationsSelected ? 'Clear selection' : 'Select all' }}\n          </button>\n          <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"bulkDecide('CONFIRMED')\" [disabled]=\"!selectedReservations.length || bulkBusy\">\n            {{ bulkBusy ? 'Applying...' : 'Bulk accept' }}\n          </button>\n          <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"bulkDecide('REJECTED')\" [disabled]=\"!selectedReservations.length || bulkBusy\">\n            Bulk reject\n          </button>\n        </div>\n      </div>\n\n      <div class=\"rc-empty\" *ngIf=\"loading\">Loading reservations...</div>\n      <div class=\"rc-empty\" *ngIf=\"!loading && !myReservations.length\">No matching reservations.</div>\n\n      <div class=\"rc-request-list\" *ngIf=\"!loading && myReservations.length\">\n        <article\n          class=\"rc-request-card\"\n          *ngFor=\"let reservation of myReservations\"\n          [attr.data-status]=\"toUiStatus(reservation).toLowerCase()\"\n          (click)=\"selectReservation(reservation); focusedView = 'my'\"\n        >\n          <label class=\"rc-check\" *ngIf=\"context.isAdmin\" (click)=\"$event.stopPropagation()\">\n            <input type=\"checkbox\" [checked]=\"selectedReservationIds.has(reservation.id)\" (change)=\"toggleReservationSelection(reservation.id)\" />\n            <span>Select</span>\n          </label>\n          <div class=\"rc-request-head\">\n            <div class=\"rc-request-label\">\n              <span class=\"rc-resource-token\">{{ resourceToken(reservation.machine) }}</span>\n              <div>\n                <span class=\"rc-resource-type\">{{ resourceKind(reservation.machine) }}</span>\n                <h3>{{ resourceName(reservation.machine) }}</h3>\n              </div>\n            </div>\n            <app-status-chip [label]=\"toUiStatus(reservation)\" [variant]=\"statusVariant(toUiStatus(reservation))\" />\n          </div>\n\n          <p>{{ reservation.company }}</p>\n\n          <div class=\"rc-request-meta\">\n            <span>{{ reservation.date }}</span>\n            <span>{{ reservationWindow(reservation) }}</span>\n            <span>{{ reservation.solar ? 'Solar-backed' : 'Standard power' }}</span>\n          </div>\n\n          <div class=\"rc-request-conflict\" [class.active]=\"conflictFor(reservation).hasConflict\">\n            {{ conflictFor(reservation).label }}\n          </div>\n\n          <div class=\"rc-row-actions\">\n            <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"openEdit(reservation); $event.stopPropagation()\">Edit</button>\n            <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"inspectReservation(reservation); $event.stopPropagation()\">Inspect</button>\n            <button\n              class=\"btn btn-outline btn-sm\"\n              type=\"button\"\n              (click)=\"cancelReservation(reservation); $event.stopPropagation()\"\n              *ngIf=\"!context.isAdmin && reservation.status !== 'CANCELLED'\"\n            >\n              Cancel\n            </button>\n            <button\n              class=\"btn btn-outline btn-sm\"\n              type=\"button\"\n              (click)=\"requestDelete(reservation); $event.stopPropagation()\"\n              *ngIf=\"context.isAdmin\"\n            >\n              Delete\n            </button>\n            <button\n              class=\"btn btn-primary btn-sm\"\n              type=\"button\"\n              (click)=\"forceStatus(reservation, 'CONFIRMED'); $event.stopPropagation()\"\n              *ngIf=\"context.isAdmin\"\n            >\n              Override\n            </button>\n          </div>\n        </article>\n      </div>\n    </article>\n\n    <article class=\"card\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>{{ context.isAdmin ? 'All provider decisions' : 'Incoming requests' }}</h2>\n          <p>{{ context.isAdmin ? 'Override any request from the control center.' : 'Requests on resources owned by your enterprise.' }}</p>\n        </div>\n      </div>\n\n      <div class=\"rc-empty\" *ngIf=\"loading\">Loading incoming requests...</div>\n      <div class=\"rc-empty\" *ngIf=\"!loading && !providerReservations.length\">No incoming requests.</div>\n\n      <div class=\"rc-request-list\" *ngIf=\"!loading && providerReservations.length\">\n        <article\n          class=\"rc-request-card provider\"\n          *ngFor=\"let reservation of providerReservations\"\n          [attr.data-status]=\"toUiStatus(reservation).toLowerCase()\"\n          (click)=\"selectReservation(reservation); focusedView = 'incoming'\"\n        >\n          <div class=\"rc-request-head\">\n            <div class=\"rc-request-label\">\n              <span class=\"rc-resource-token\">{{ resourceToken(reservation.machine) }}</span>\n              <div>\n                <span class=\"rc-resource-type\">{{ resourceKind(reservation.machine) }}</span>\n                <h3>{{ resourceName(reservation.machine) }}</h3>\n              </div>\n            </div>\n            <app-status-chip [label]=\"toUiStatus(reservation)\" [variant]=\"statusVariant(toUiStatus(reservation))\" />\n          </div>\n\n          <p>{{ reservation.company }}</p>\n\n          <div class=\"rc-request-meta\">\n            <span>{{ reservation.date }}</span>\n            <span>{{ reservationWindow(reservation) }}</span>\n            <span>{{ providerName(reservation) }}</span>\n          </div>\n\n          <div class=\"rc-request-conflict\" [class.active]=\"conflictFor(reservation).hasConflict\">\n            {{ conflictFor(reservation).label }}\n          </div>\n\n          <div class=\"rc-assistant-row\">\n            <app-decision-assistant [reservation]=\"reservation\" [reservations]=\"providerReservations\" [slots]=\"slots\" />\n          </div>\n\n          <div class=\"rc-row-actions\">\n            <button\n              class=\"btn btn-primary btn-sm\"\n              type=\"button\"\n              (click)=\"decide(reservation, 'CONFIRMED'); $event.stopPropagation()\"\n              [disabled]=\"reservation.status !== 'PENDING'\"\n            >\n              Accept\n            </button>\n            <button\n              class=\"btn btn-outline btn-sm\"\n              type=\"button\"\n              (click)=\"decide(reservation, 'REJECTED'); $event.stopPropagation()\"\n              [disabled]=\"reservation.status !== 'PENDING'\"\n            >\n              Reject\n            </button>\n            <button\n              class=\"btn btn-outline btn-sm\"\n              type=\"button\"\n              (click)=\"requestDelete(reservation); $event.stopPropagation()\"\n              *ngIf=\"context.isAdmin\"\n            >\n              Delete\n            </button>\n            <button\n              class=\"btn btn-outline btn-sm\"\n              type=\"button\"\n              (click)=\"inspectReservation(reservation); $event.stopPropagation()\"\n            >\n              Inspect\n            </button>\n            <button\n              class=\"btn btn-primary btn-sm\"\n              type=\"button\"\n              (click)=\"forceStatus(reservation, 'CONFIRMED'); $event.stopPropagation()\"\n              *ngIf=\"context.isAdmin\"\n            >\n              Override\n            </button>\n          </div>\n        </article>\n      </div>\n    </article>\n  </section>\n\n  <section class=\"card\" *ngIf=\"selectedReservation\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>Lifecycle</h2>\n        <p>Timeline and conflict analysis for reservation #{{ selectedReservation.id }}.</p>\n      </div>\n      <app-status-chip [label]=\"toUiStatus(selectedReservation)\" [variant]=\"statusVariant(toUiStatus(selectedReservation))\" />\n    </div>\n\n    <div class=\"rc-detail-grid\">\n      <div class=\"rc-timeline\">\n        <div class=\"rc-timeline-item\" *ngFor=\"let item of selectedReservationTimeline\">\n          <span class=\"rc-timeline-dot\" [ngClass]=\"item.status\"></span>\n          <div>\n            <strong>{{ item.label }}</strong>\n            <p>{{ item.description }}</p>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"rc-conflict-box\" [class.active]=\"conflictFor(selectedReservation).hasConflict\">\n        <strong>{{ conflictFor(selectedReservation).label }}</strong>\n        <p *ngIf=\"conflictFor(selectedReservation).hasConflict\">\n          This request overlaps with {{ conflictFor(selectedReservation).blockingReservations.length }} active reservation(s).\n        </p>\n        <p *ngIf=\"!conflictFor(selectedReservation).hasConflict\">\n          No overlapping request is blocking the provider decision.\n        </p>\n      </div>\n    </div>\n  </section>\n\n  <div class=\"modal-overlay\" *ngIf=\"showAdminDelete\" (click)=\"showAdminDelete = false\">\n    <div class=\"modal rc-delete-modal\" (click)=\"$event.stopPropagation()\">\n      <h2>Delete reservation</h2>\n      <p>This removes the reservation record from the backend. Use this only for admin/provider overrides.</p>\n      <div class=\"rc-actions\">\n        <button class=\"btn btn-danger\" type=\"button\" (click)=\"deleteReservation()\" [disabled]=\"deleting\">\n          {{ deleting ? 'Deleting...' : 'Delete' }}\n        </button>\n        <button class=\"btn btn-outline\" type=\"button\" (click)=\"showAdminDelete = false\" [disabled]=\"deleting\">Cancel</button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".rc-page {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero,\n.rc-toolbar,\n.rc-market-card,\n.rc-request-card,\n.rc-conflict-box {\n  background: rgba(255, 255, 255, 0.74);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  backdrop-filter: blur(18px);\n}\n\n.rc-hero {\n  display: grid;\n  grid-template-columns: 1.1fr 380px;\n  gap: 24px;\n  padding: 26px;\n  border-radius: 28px;\n  background:\n    radial-gradient(circle at top right, rgba(34, 197, 94, 0.16), transparent 26%),\n    linear-gradient(135deg, rgba(240, 253, 244, 0.92), rgba(255, 255, 255, 0.84));\n}\n\n.rc-kicker {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero h1,\n.rc-section-head h2,\n.rc-market-card h3,\n.rc-request-card h3 {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle,\n.rc-section-head p,\n.rc-market-card p,\n.rc-request-card p,\n.rc-timeline-item p,\n.rc-conflict-box p {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.6;\n}\n\n.rc-hero-stats {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.rc-stat {\n  padding: 18px;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n}\n\n.rc-stat span,\n.rc-resource-type {\n  display: block;\n  margin-bottom: 8px;\n  font-size: 11px;\n  color: var(--text3);\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-weight: 700;\n}\n\n.rc-stat strong {\n  font-size: 30px;\n}\n\n.rc-stat.pending strong {\n  color: #ca8a04;\n}\n\n.rc-stat.confirmed strong {\n  color: #16a34a;\n}\n\n.rc-stat.rejected strong {\n  color: #dc2626;\n}\n\n.rc-stat.warning strong {\n  color: #2563eb;\n}\n\n.rc-toolbar {\n  display: grid;\n  grid-template-columns: minmax(220px, 1fr) 1fr auto;\n  gap: 12px;\n  align-items: center;\n  padding: 18px;\n  border-radius: 22px;\n}\n\n.rc-search {\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.7);\n}\n\n.rc-tabs {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.rc-tabs button {\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.72);\n  border-radius: 999px;\n  padding: 8px 13px;\n  color: var(--text2);\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.rc-tabs button span {\n  margin-left: 6px;\n  color: var(--text3);\n}\n\n.rc-tabs button.active {\n  color: #166534;\n  border-color: rgba(34, 197, 94, 0.26);\n  box-shadow: 0 14px 30px rgba(34, 197, 94, 0.12);\n  transform: scale(1.02);\n}\n\n.rc-grid,\n.rc-market-grid,\n.rc-request-list,\n.rc-detail-grid {\n  display: grid;\n  gap: 18px;\n}\n\n.rc-grid {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.rc-market-grid {\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 12px;\n}\n\n.rc-market-card,\n.rc-request-card {\n  display: grid;\n  gap: 14px;\n  padding: 18px;\n  border-radius: 22px;\n  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;\n}\n\n.rc-market-card:hover,\n.rc-request-card:hover {\n  transform: scale(1.02);\n  box-shadow: 0 22px 45px rgba(15, 23, 42, 0.12);\n}\n\n.rc-market-head,\n.rc-request-head,\n.rc-request-label,\n.rc-request-meta,\n.rc-row-actions,\n.rc-check {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.rc-market-head,\n.rc-request-head {\n  justify-content: space-between;\n  align-items: flex-start;\n}\n\n.rc-request-label {\n  align-items: center;\n}\n\n.rc-check {\n  align-items: center;\n  color: var(--text3);\n  font-size: 12px;\n}\n\n.rc-resource-token {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 46px;\n  height: 46px;\n  border-radius: 16px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.22), rgba(59, 130, 246, 0.18));\n  color: #0f172a;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n}\n\n.rc-market-meta,\n.rc-request-meta {\n  color: var(--text3);\n}\n\n.rc-request-card[data-status='pending'] {\n  border-color: rgba(250, 204, 21, 0.28);\n}\n\n.rc-request-card[data-status='confirmed'] {\n  border-color: rgba(34, 197, 94, 0.22);\n}\n\n.rc-request-card[data-status='rejected'] {\n  border-color: rgba(239, 68, 68, 0.22);\n}\n\n.rc-request-conflict {\n  border-radius: 14px;\n  padding: 10px 12px;\n  background: rgba(241, 245, 249, 0.84);\n  color: var(--text2);\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.rc-request-conflict.active {\n  background: rgba(255, 247, 237, 0.9);\n  color: #b45309;\n}\n\n.rc-assistant-row {\n  border-radius: 16px;\n  padding: 12px;\n  background: rgba(239, 246, 255, 0.82);\n}\n\n.rc-detail-grid {\n  grid-template-columns: 1.1fr 0.9fr;\n}\n\n.rc-timeline {\n  display: grid;\n  gap: 14px;\n}\n\n.rc-timeline-item {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n\n.rc-timeline-dot {\n  width: 14px;\n  height: 14px;\n  border-radius: 999px;\n  margin-top: 4px;\n  background: #cbd5e1;\n  box-shadow: 0 0 0 5px rgba(148, 163, 184, 0.14);\n}\n\n.rc-timeline-dot.done {\n  background: #16a34a;\n  box-shadow: 0 0 0 5px rgba(22, 163, 74, 0.14);\n}\n\n.rc-timeline-dot.active {\n  background: #d97706;\n  box-shadow: 0 0 0 5px rgba(217, 119, 6, 0.14);\n}\n\n.rc-conflict-box {\n  border-radius: 18px;\n  padding: 18px;\n}\n\n.rc-conflict-box.active {\n  background: rgba(255, 247, 237, 0.9);\n  border-color: rgba(217, 119, 6, 0.2);\n}\n\n.rc-delete-modal p {\n  color: var(--text2);\n  margin: 10px 0 18px;\n}\n\n@media (max-width: 1100px) {\n  .rc-hero,\n  .rc-toolbar,\n  .rc-grid,\n  .rc-detail-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page {\n    padding: 16px;\n  }\n\n  .rc-hero-stats {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.ActivatedRoute }, { type: i3.ReservationCenterState }, { type: i4.ReservationCenterAiService }, { type: i5.ReservationCenterService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EnterpriseReservations, { className: "EnterpriseReservations", filePath: "src/app/features/enterprise/enterprise-reservations/enterprise-reservations.ts", lineNumber: 37 }); })();
