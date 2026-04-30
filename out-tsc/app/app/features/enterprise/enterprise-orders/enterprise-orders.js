import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiInsightsPanel } from '../../../features/reservation-center/components/ai-insights-panel/ai-insights-panel';
import { StatusChip } from '../../../features/reservation-center/components/status-chip/status-chip';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth.service";
import * as i2 from "../../../features/reservation-center/state/reservation-center.state";
import * as i3 from "../../../features/reservation-center/services/reservation-center-ai.service";
import * as i4 from "../../../features/reservation-center/services/reservation-center.service";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
function EnterpriseOrders_button_39_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function EnterpriseOrders_button_39_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openAdminCreate()); });
    i0.ɵɵtext(1, "Admin create");
    i0.ɵɵelementEnd();
} }
function EnterpriseOrders_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, "No confirmed reservations are ready for order creation.");
    i0.ɵɵelementEnd();
} }
function EnterpriseOrders_table_41_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
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
    i0.ɵɵelementStart(11, "td")(12, "button", 17);
    i0.ɵɵlistener("click", function EnterpriseOrders_table_41_tr_16_Template_button_click_12_listener() { const reservation_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openFromReservation(reservation_r4)); });
    i0.ɵɵtext(13, "Create order");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const reservation_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r4.company);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r4.machine);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r4.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r4.hours);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reservation_r4.solar ? "Yes" : "No");
} }
function EnterpriseOrders_table_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 19)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Company");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Machine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Hours");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Solar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Action");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "tbody");
    i0.ɵɵtemplate(16, EnterpriseOrders_table_41_tr_16_Template, 14, 5, "tr", 20);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngForOf", ctx_r1.confirmedReservations);
} }
function EnterpriseOrders_article_42_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const line_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(line_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("positive", line_r5.value < 0);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(line_r5.value);
} }
function EnterpriseOrders_article_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 10)(1, "div", 11)(2, "div")(3, "h2");
    i0.ɵɵtext(4, "Price breakdown");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "app-status-chip", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 22);
    i0.ɵɵtemplate(9, EnterpriseOrders_article_42_div_9_Template, 5, 4, "div", 23);
    i0.ɵɵelementStart(10, "div", 24)(11, "span");
    i0.ɵɵtext(12, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Eco-aware pricing and credits for order #", ctx_r1.selectedOrder.ref || ctx_r1.selectedOrder.id, ".");
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", ctx_r1.selectedOrder.status)("variant", ctx_r1.statusVariant(ctx_r1.selectedOrder.status));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.selectedBreakdown);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedGrandTotal);
} }
function EnterpriseOrders_section_43_option_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const status_r7 = ctx.$implicit;
    i0.ɵɵproperty("value", status_r7);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(status_r7);
} }
function EnterpriseOrders_section_43_div_51_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "label");
    i0.ɵɵtext(2, "Owner enterprise ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 34);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_div_51_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.form.enterpriseId, $event) || (ctx_r1.form.enterpriseId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.enterpriseId);
} }
function EnterpriseOrders_section_43_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function EnterpriseOrders_section_43_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.success);
} }
function EnterpriseOrders_section_43_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 10)(1, "div", 11)(2, "div")(3, "h2");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Backoffice-safe order form with eco metrics coming from backend-persisted values.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 26);
    i0.ɵɵlistener("click", function EnterpriseOrders_section_43_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵtext(8, "Close");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 27)(10, "div", 28)(11, "label");
    i0.ɵɵtext(12, "Company");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "input", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_input_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.companyName, $event) || (ctx_r1.form.companyName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 28)(15, "label");
    i0.ɵɵtext(16, "Material");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "input", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_input_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.material, $event) || (ctx_r1.form.material = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 28)(19, "label");
    i0.ɵɵtext(20, "Supplier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "input", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_input_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.supplier, $event) || (ctx_r1.form.supplier = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 28)(23, "label");
    i0.ɵɵtext(24, "Quantity (kg)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "input", 30);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.qtyKg, $event) || (ctx_r1.form.qtyKg = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 28)(27, "label");
    i0.ɵɵtext(28, "Distance (km)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "input", 31);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_input_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.distanceKm, $event) || (ctx_r1.form.distanceKm = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 28)(31, "label");
    i0.ɵɵtext(32, "Order date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "input", 32);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_input_ngModelChange_33_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.orderDate, $event) || (ctx_r1.form.orderDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 28)(35, "label");
    i0.ɵɵtext(36, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "select", 29);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_select_ngModelChange_37_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.status, $event) || (ctx_r1.form.status = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(38, EnterpriseOrders_section_43_option_38_Template, 2, 2, "option", 33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 28)(40, "label");
    i0.ɵɵtext(41, "CO2 saved");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "input", 34);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_input_ngModelChange_42_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.co2Saved, $event) || (ctx_r1.form.co2Saved = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 28)(44, "label");
    i0.ɵɵtext(45, "Water saved");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "input", 34);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_input_ngModelChange_46_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.waterSaved, $event) || (ctx_r1.form.waterSaved = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div", 28)(48, "label");
    i0.ɵɵtext(49, "Waste avoided");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "input", 34);
    i0.ɵɵtwoWayListener("ngModelChange", function EnterpriseOrders_section_43_Template_input_ngModelChange_50_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.form.wasteAvoided, $event) || (ctx_r1.form.wasteAvoided = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(51, EnterpriseOrders_section_43_div_51_Template, 4, 1, "div", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(52, EnterpriseOrders_section_43_div_52_Template, 2, 1, "div", 36)(53, EnterpriseOrders_section_43_div_53_Template, 2, 1, "div", 37);
    i0.ɵɵelementStart(54, "div", 38)(55, "button", 39);
    i0.ɵɵlistener("click", function EnterpriseOrders_section_43_Template_button_click_55_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveOrder()); });
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "button", 40);
    i0.ɵɵlistener("click", function EnterpriseOrders_section_43_Template_button_click_57_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeForm()); });
    i0.ɵɵtext(58, "Cancel");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.form.id ? "Update order" : "Create order");
    i0.ɵɵadvance(9);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.companyName);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.material);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.supplier);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.qtyKg);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.distanceKm);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.orderDate);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.statuses);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.co2Saved);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.waterSaved);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.form.wasteAvoided);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.context.isAdmin);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.error);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.success);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.saving);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving ? "Saving..." : ctx_r1.form.id ? "Update order" : "Create order", " ");
} }
function EnterpriseOrders_div_51_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const point_r9 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(point_r9.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", point_r9.count, " orders");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", point_r9.totalQtyKg, " kg");
} }
function EnterpriseOrders_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtemplate(1, EnterpriseOrders_div_51_div_1_Template, 7, 3, "div", 45);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.trends);
} }
function EnterpriseOrders_ng_template_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, "Trend cards will appear once orders exist across multiple periods.");
    i0.ɵɵelementEnd();
} }
function EnterpriseOrders_div_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, "Loading orders...");
    i0.ɵɵelementEnd();
} }
function EnterpriseOrders_div_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1, "No orders found.");
    i0.ɵɵelementEnd();
} }
function EnterpriseOrders_table_63_tr_18_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 48);
    i0.ɵɵlistener("click", function EnterpriseOrders_table_63_tr_18_Template_tr_click_0_listener() { const order_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectOrder(order_r11)); });
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
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵelement(10, "app-status-chip", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 49)(14, "button", 26);
    i0.ɵɵlistener("click", function EnterpriseOrders_table_63_tr_18_Template_button_click_14_listener($event) { const order_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.edit(order_r11); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(15, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 50);
    i0.ɵɵlistener("click", function EnterpriseOrders_table_63_tr_18_Template_button_click_16_listener($event) { const order_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.advance(order_r11); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(17, " Advance ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 51);
    i0.ɵɵlistener("click", function EnterpriseOrders_table_63_tr_18_Template_button_click_18_listener($event) { const order_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.cancel(order_r11); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtext(19, " Cancel ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const order_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(order_r11.ref);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(order_r11.companyName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(order_r11.material);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(order_r11.qtyKg);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", order_r11.status)("variant", ctx_r1.statusVariant(order_r11.status));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(order_r11.grade);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", order_r11.status === "delivered" || order_r11.status === "cancelled");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", order_r11.status === "cancelled");
} }
function EnterpriseOrders_table_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 19)(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Reference");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Company");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Material");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Qty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Grade");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "tbody");
    i0.ɵɵtemplate(18, EnterpriseOrders_table_63_tr_18_Template, 20, 9, "tr", 47);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngForOf", ctx_r1.scopedOrders);
} }
export class EnterpriseOrders {
    auth;
    state;
    ai;
    workspace;
    loading = true;
    saving = false;
    error = '';
    success = '';
    showForm = false;
    context = {
        enterpriseId: null,
        companyName: '',
        role: 'enterprise',
        isAdmin: false,
    };
    orders = [];
    reservations = [];
    aiInsights = [];
    selectedOrderId = null;
    form = this.createForm();
    statuses = ['draft', 'confirmed', 'shipped', 'delivered', 'cancelled'];
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
    get scopedOrders() {
        return this.context.isAdmin
            ? this.orders
            : this.orders.filter(order => (order.enterprise?.id ?? null) === this.context.enterpriseId);
    }
    get confirmedReservations() {
        const confirmed = this.reservations.filter(reservation => reservation.status === 'CONFIRMED');
        return this.context.isAdmin
            ? confirmed
            : confirmed.filter(reservation => (reservation.enterprise?.id ?? reservation.enterpriseId ?? null) === this.context.enterpriseId);
    }
    get analytics() {
        const totalCo2 = this.scopedOrders.reduce((sum, order) => sum + (order.co2Saved ?? 0), 0);
        const avgCo2 = this.scopedOrders.length ? Math.round(totalCo2 / this.scopedOrders.length) : 0;
        const totalQty = this.scopedOrders.reduce((sum, order) => sum + order.qtyKg, 0);
        return {
            totalCo2,
            avgCo2,
            totalQty,
            delivered: this.scopedOrders.filter(order => order.status === 'delivered').length,
        };
    }
    get trends() {
        return this.workspace.buildOrderTrends(this.scopedOrders);
    }
    get selectedOrder() {
        return this.scopedOrders.find(order => order.id === this.selectedOrderId) ?? this.scopedOrders[0] ?? null;
    }
    get selectedBreakdown() {
        return this.selectedOrder ? this.workspace.buildPriceBreakdown(this.selectedOrder) : [];
    }
    get selectedGrandTotal() {
        return this.selectedOrder ? this.workspace.orderGrandTotal(this.selectedOrder) : 0;
    }
    openFromReservation(reservation) {
        this.showForm = true;
        this.form = {
            id: null,
            ref: '',
            companyName: this.context.companyName,
            material: reservation.machine,
            qtyKg: Math.max(50, reservation.hours * 20),
            supplier: `Enterprise #${reservation.slotId ?? reservation.enterprise?.id ?? reservation.enterpriseId ?? 'N/A'}`,
            distanceKm: 0,
            orderDate: reservation.date,
            status: 'draft',
            co2Saved: reservation.co2Saved ?? Math.max(10, reservation.hours * 12),
            waterSaved: Math.max(8, reservation.hours * 7),
            wasteAvoided: Math.max(5, reservation.hours * 4),
            enterpriseId: this.context.enterpriseId,
        };
    }
    openAdminCreate() {
        if (!this.context.isAdmin) {
            return;
        }
        this.showForm = true;
        this.form = this.createForm();
    }
    edit(order) {
        this.showForm = true;
        this.form = {
            id: order.id,
            ref: order.ref,
            companyName: order.companyName,
            material: order.material,
            qtyKg: order.qtyKg,
            supplier: order.supplier,
            distanceKm: order.distanceKm,
            orderDate: order.orderDate,
            status: order.status,
            co2Saved: order.co2Saved ?? 0,
            waterSaved: order.waterSaved ?? 0,
            wasteAvoided: order.wasteAvoided ?? 0,
            enterpriseId: order.enterprise?.id ?? this.context.enterpriseId,
        };
    }
    closeForm() {
        this.showForm = false;
        this.saving = false;
        this.form = this.createForm();
    }
    saveOrder() {
        if (this.saving) {
            return;
        }
        if (!this.form.companyName.trim() || !this.form.material.trim() || !this.form.supplier.trim()) {
            this.error = 'Company, material, and supplier are required.';
            return;
        }
        const payload = {
            ref: this.form.id ? this.form.ref : undefined,
            companyName: this.form.companyName.trim(),
            material: this.form.material.trim(),
            qtyKg: this.form.qtyKg,
            supplier: this.form.supplier.trim(),
            distanceKm: this.form.distanceKm,
            orderDate: this.form.orderDate,
            status: this.form.status,
            co2Saved: this.form.co2Saved,
            waterSaved: this.form.waterSaved,
            wasteAvoided: this.form.wasteAvoided,
            enterpriseId: this.form.enterpriseId ?? this.context.enterpriseId,
        };
        this.error = '';
        this.saving = true;
        const request$ = this.form.id
            ? this.state.updateOrder(this.form.id, payload)
            : this.state.createOrder(payload);
        request$.subscribe({
            next: () => {
                this.success = this.form.id ? 'Order updated.' : 'Order created from confirmed reservation.';
                this.saving = false;
                this.closeForm();
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to save order.';
                this.saving = false;
            },
        });
    }
    advance(order) {
        this.state.advanceOrder(order.id).subscribe({
            next: () => {
                this.success = 'Order advanced in the backend workflow.';
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to advance order.';
            },
        });
    }
    cancel(order) {
        const reason = window.prompt('Cancellation reason:', order.cancelReason ?? '') ?? '';
        this.state.cancelOrder(order.id, reason).subscribe({
            next: () => {
                this.success = 'Order cancelled.';
                this.refresh();
            },
            error: error => {
                this.error = error?.error?.message ?? 'Failed to cancel order.';
            },
        });
    }
    statusVariant(status) {
        return this.workspace.statusVariant(status);
    }
    selectOrder(order) {
        this.selectedOrderId = order.id;
    }
    applyInsight(_insight) {
        if (this.confirmedReservations.length) {
            this.openFromReservation(this.confirmedReservations[0]);
        }
    }
    refresh() {
        this.loading = true;
        this.context = this.readContext();
        this.state.loadAll().subscribe({
            next: snapshot => {
                this.orders = snapshot.orders;
                this.reservations = snapshot.reservations;
                this.loading = false;
                if (this.selectedOrderId == null && this.scopedOrders.length) {
                    this.selectedOrderId = this.scopedOrders[0].id;
                }
                this.loadInsights();
            },
            error: error => {
                this.loading = false;
                this.error = error?.error?.message ?? 'Failed to load orders.';
            },
        });
    }
    loadInsights() {
        this.ai.getInsights('orders', this.context).subscribe({
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
            ref: '',
            companyName: this.context.companyName,
            material: '',
            qtyKg: 0,
            supplier: '',
            distanceKm: 0,
            orderDate: new Date().toISOString().slice(0, 10),
            status: 'draft',
            co2Saved: 0,
            waterSaved: 0,
            wasteAvoided: 0,
            enterpriseId: this.context.enterpriseId,
        };
    }
    static ɵfac = function EnterpriseOrders_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnterpriseOrders)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.ReservationCenterState), i0.ɵɵdirectiveInject(i3.ReservationCenterAiService), i0.ɵɵdirectiveInject(i4.ReservationCenterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EnterpriseOrders, selectors: [["app-enterprise-orders"]], decls: 64, vars: 22, consts: [["noTrends", ""], [1, "rc-page"], [1, "rc-hero", "card"], [1, "rc-kicker"], [1, "rc-subtitle"], [1, "rc-hero-stats"], [1, "rc-stat"], [1, "rc-stat", "warning"], [3, "action", "title", "subtitle", "insights"], [1, "rc-grid"], [1, "card"], [1, "rc-section-head"], ["class", "btn btn-primary btn-sm", "type", "button", 3, "click", 4, "ngIf"], ["class", "rc-empty", 4, "ngIf"], ["class", "data-table", 4, "ngIf"], ["class", "card", 4, "ngIf"], ["class", "rc-trends", 4, "ngIf", "ngIfElse"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "rc-empty"], [1, "data-table"], [4, "ngFor", "ngForOf"], [3, "label", "variant"], [1, "rc-breakdown"], ["class", "rc-breakdown-row", 4, "ngFor", "ngForOf"], [1, "rc-breakdown-row", "total"], [1, "rc-breakdown-row"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click"], [1, "rc-form-grid"], [1, "form-group"], [3, "ngModelChange", "ngModel"], ["type", "number", "min", "1", 3, "ngModelChange", "ngModel"], ["type", "number", "min", "0", 3, "ngModelChange", "ngModel"], ["type", "date", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", 3, "ngModelChange", "ngModel"], ["class", "form-group", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "rc-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], [3, "value"], [1, "alert", "alert-danger"], [1, "alert", "alert-success"], [1, "rc-trends"], ["class", "rc-trend", 4, "ngFor", "ngForOf"], [1, "rc-trend"], [3, "click", 4, "ngFor", "ngForOf"], [3, "click"], [1, "rc-row-actions"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click", "disabled"]], template: function EnterpriseOrders_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "section", 2)(2, "div")(3, "p", 3);
            i0.ɵɵtext(4, "Order orchestration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 5)(10, "div", 6)(11, "span");
            i0.ɵɵtext(12, "Total CO2 saved");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "strong");
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 6)(16, "span");
            i0.ɵɵtext(17, "Average CO2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "strong");
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 6)(21, "span");
            i0.ɵɵtext(22, "Total qty");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "strong");
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 7)(26, "span");
            i0.ɵɵtext(27, "Delivered");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "strong");
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(30, "app-ai-insights-panel", 8);
            i0.ɵɵlistener("action", function EnterpriseOrders_Template_app_ai_insights_panel_action_30_listener($event) { return ctx.applyInsight($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "section", 9)(32, "article", 10)(33, "div", 11)(34, "div")(35, "h2");
            i0.ɵɵtext(36, "Confirmed reservations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "p");
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(39, EnterpriseOrders_button_39_Template, 2, 0, "button", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(40, EnterpriseOrders_div_40_Template, 2, 0, "div", 13)(41, EnterpriseOrders_table_41_Template, 17, 1, "table", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(42, EnterpriseOrders_article_42_Template, 15, 5, "article", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(43, EnterpriseOrders_section_43_Template, 59, 17, "section", 15);
            i0.ɵɵelementStart(44, "section", 10)(45, "div", 11)(46, "div")(47, "h2");
            i0.ɵɵtext(48, "Order analytics");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "p");
            i0.ɵɵtext(50, "History trends powered by real order records from the backend.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(51, EnterpriseOrders_div_51_Template, 2, 1, "div", 16)(52, EnterpriseOrders_ng_template_52_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "section", 10)(55, "div", 11)(56, "div")(57, "h2");
            i0.ɵɵtext(58);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "p");
            i0.ɵɵtext(60);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(61, EnterpriseOrders_div_61_Template, 2, 0, "div", 13)(62, EnterpriseOrders_div_62_Template, 2, 0, "div", 13)(63, EnterpriseOrders_table_63_Template, 19, 1, "table", 14);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const noTrends_r12 = i0.ɵɵreference(53);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Order Control Center" : "Orders");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.context.isAdmin ? "Supervise the full reservation-to-order workflow with admin override." : "Orders are created only from confirmed reservations and stay synced with the backend workflow.", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.analytics.totalCo2);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.analytics.avgCo2);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.analytics.totalQty);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.analytics.delivered);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", "Order AI insights")("subtitle", "Backend eco suggestions and workflow recommendations.")("insights", ctx.aiInsights);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Confirmed reservations available for downstream order creation." : "Only confirmed reservations can create new orders.");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.context.isAdmin);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.confirmedReservations.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.confirmedReservations.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedOrder);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showForm);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.trends.length)("ngIfElse", noTrends_r12);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "All orders" : "My orders");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.context.isAdmin ? "Admin can update, advance, cancel, or inspect any order." : "Orders owned by your enterprise.");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.scopedOrders.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.scopedOrders.length);
        } }, dependencies: [CommonModule, i5.NgForOf, i5.NgIf, FormsModule, i6.NgSelectOption, i6.ɵNgSelectMultipleOption, i6.DefaultValueAccessor, i6.NumberValueAccessor, i6.SelectControlValueAccessor, i6.NgControlStatus, i6.MinValidator, i6.NgModel, AiInsightsPanel, StatusChip], styles: [".rc-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 24px;\n  background:\n    radial-gradient(circle at top right, rgba(34, 197, 94, 0.14), transparent 34%),\n    linear-gradient(135deg, rgba(240, 253, 244, 0.96), rgba(255, 255, 255, 0.98));\n}\n\n.rc-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle[_ngcontent-%COMP%], \n.rc-section-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.55;\n}\n\n.rc-hero-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(120px, 1fr));\n  gap: 12px;\n  min-width: 280px;\n}\n\n.rc-stat[_ngcontent-%COMP%] {\n  padding: 16px;\n  border-radius: 16px;\n  border: 1px solid rgba(22, 163, 74, 0.12);\n  background: rgba(255, 255, 255, 0.92);\n}\n\n.rc-stat.warning[_ngcontent-%COMP%] {\n  border-color: rgba(217, 119, 6, 0.18);\n}\n\n.rc-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12px;\n  color: var(--text3);\n  margin-bottom: 8px;\n}\n\n.rc-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--text);\n}\n\n.rc-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 0.9fr;\n  gap: 18px;\n}\n\n.rc-section-head[_ngcontent-%COMP%], \n.rc-row-actions[_ngcontent-%COMP%], \n.rc-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n\n.rc-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n\n.rc-empty[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  padding: 16px;\n  border: 1px solid var(--border);\n  background: rgba(248, 250, 252, 0.9);\n}\n\n.rc-breakdown[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n\n.rc-breakdown-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 14px;\n  border-radius: 12px;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid var(--border);\n}\n\n.rc-breakdown-row.total[_ngcontent-%COMP%] {\n  background: rgba(220, 252, 231, 0.6);\n}\n\n.rc-breakdown-row[_ngcontent-%COMP%]   strong.positive[_ngcontent-%COMP%] {\n  color: #15803d;\n}\n\n.rc-trends[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 12px;\n}\n\n.rc-trend[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  padding: 16px;\n  border-radius: 14px;\n  border: 1px solid var(--border);\n  background: rgba(248, 250, 252, 0.9);\n}\n\n.rc-trend[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--text2);\n  font-size: 12px;\n}\n\n@media (max-width: 1100px) {\n  .rc-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .rc-hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .rc-hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    min-width: 0;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnterpriseOrders, [{
        type: Component,
        args: [{ selector: 'app-enterprise-orders', standalone: true, imports: [CommonModule, FormsModule, AiInsightsPanel, StatusChip], template: "<div class=\"rc-page\">\n  <section class=\"rc-hero card\">\n    <div>\n      <p class=\"rc-kicker\">Order orchestration</p>\n      <h1>{{ context.isAdmin ? 'Order Control Center' : 'Orders' }}</h1>\n      <p class=\"rc-subtitle\">\n        {{ context.isAdmin\n          ? 'Supervise the full reservation-to-order workflow with admin override.'\n          : 'Orders are created only from confirmed reservations and stay synced with the backend workflow.' }}\n      </p>\n    </div>\n    <div class=\"rc-hero-stats\">\n      <div class=\"rc-stat\">\n        <span>Total CO2 saved</span>\n        <strong>{{ analytics.totalCo2 }}</strong>\n      </div>\n      <div class=\"rc-stat\">\n        <span>Average CO2</span>\n        <strong>{{ analytics.avgCo2 }}</strong>\n      </div>\n      <div class=\"rc-stat\">\n        <span>Total qty</span>\n        <strong>{{ analytics.totalQty }}</strong>\n      </div>\n      <div class=\"rc-stat warning\">\n        <span>Delivered</span>\n        <strong>{{ analytics.delivered }}</strong>\n      </div>\n    </div>\n  </section>\n\n  <app-ai-insights-panel\n    [title]=\"'Order AI insights'\"\n    [subtitle]=\"'Backend eco suggestions and workflow recommendations.'\"\n    [insights]=\"aiInsights\"\n    (action)=\"applyInsight($event)\"\n  />\n\n  <section class=\"rc-grid\">\n    <article class=\"card\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>Confirmed reservations</h2>\n          <p>{{ context.isAdmin ? 'Confirmed reservations available for downstream order creation.' : 'Only confirmed reservations can create new orders.' }}</p>\n        </div>\n        <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"openAdminCreate()\" *ngIf=\"context.isAdmin\">Admin create</button>\n      </div>\n\n      <div class=\"rc-empty\" *ngIf=\"!confirmedReservations.length\">No confirmed reservations are ready for order creation.</div>\n\n      <table class=\"data-table\" *ngIf=\"confirmedReservations.length\">\n        <thead>\n          <tr>\n            <th>Company</th>\n            <th>Machine</th>\n            <th>Date</th>\n            <th>Hours</th>\n            <th>Solar</th>\n            <th>Action</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let reservation of confirmedReservations\">\n            <td>{{ reservation.company }}</td>\n            <td>{{ reservation.machine }}</td>\n            <td>{{ reservation.date }}</td>\n            <td>{{ reservation.hours }}</td>\n            <td>{{ reservation.solar ? 'Yes' : 'No' }}</td>\n            <td><button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"openFromReservation(reservation)\">Create order</button></td>\n          </tr>\n        </tbody>\n      </table>\n    </article>\n\n    <article class=\"card\" *ngIf=\"selectedOrder\">\n      <div class=\"rc-section-head\">\n        <div>\n          <h2>Price breakdown</h2>\n          <p>Eco-aware pricing and credits for order #{{ selectedOrder.ref || selectedOrder.id }}.</p>\n        </div>\n        <app-status-chip [label]=\"selectedOrder.status\" [variant]=\"statusVariant(selectedOrder.status)\" />\n      </div>\n\n      <div class=\"rc-breakdown\">\n        <div class=\"rc-breakdown-row\" *ngFor=\"let line of selectedBreakdown\">\n          <span>{{ line.label }}</span>\n          <strong [class.positive]=\"line.value < 0\">{{ line.value }}</strong>\n        </div>\n        <div class=\"rc-breakdown-row total\">\n          <span>Total</span>\n          <strong>{{ selectedGrandTotal }}</strong>\n        </div>\n      </div>\n    </article>\n  </section>\n\n  <section class=\"card\" *ngIf=\"showForm\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>{{ form.id ? 'Update order' : 'Create order' }}</h2>\n        <p>Backoffice-safe order form with eco metrics coming from backend-persisted values.</p>\n      </div>\n      <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"closeForm()\">Close</button>\n    </div>\n\n    <div class=\"rc-form-grid\">\n      <div class=\"form-group\">\n        <label>Company</label>\n        <input [(ngModel)]=\"form.companyName\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Material</label>\n        <input [(ngModel)]=\"form.material\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Supplier</label>\n        <input [(ngModel)]=\"form.supplier\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Quantity (kg)</label>\n        <input type=\"number\" min=\"1\" [(ngModel)]=\"form.qtyKg\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Distance (km)</label>\n        <input type=\"number\" min=\"0\" [(ngModel)]=\"form.distanceKm\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Order date</label>\n        <input type=\"date\" [(ngModel)]=\"form.orderDate\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Status</label>\n        <select [(ngModel)]=\"form.status\">\n          <option *ngFor=\"let status of statuses\" [value]=\"status\">{{ status }}</option>\n        </select>\n      </div>\n      <div class=\"form-group\">\n        <label>CO2 saved</label>\n        <input type=\"number\" [(ngModel)]=\"form.co2Saved\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Water saved</label>\n        <input type=\"number\" [(ngModel)]=\"form.waterSaved\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Waste avoided</label>\n        <input type=\"number\" [(ngModel)]=\"form.wasteAvoided\" />\n      </div>\n      <div class=\"form-group\" *ngIf=\"context.isAdmin\">\n        <label>Owner enterprise ID</label>\n        <input type=\"number\" [(ngModel)]=\"form.enterpriseId\" />\n      </div>\n    </div>\n\n    <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n    <div class=\"alert alert-success\" *ngIf=\"success\">{{ success }}</div>\n\n    <div class=\"rc-actions\">\n      <button class=\"btn btn-primary\" type=\"button\" (click)=\"saveOrder()\" [disabled]=\"saving\">\n        {{ saving ? 'Saving...' : (form.id ? 'Update order' : 'Create order') }}\n      </button>\n      <button class=\"btn btn-outline\" type=\"button\" (click)=\"closeForm()\">Cancel</button>\n    </div>\n  </section>\n\n  <section class=\"card\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>Order analytics</h2>\n        <p>History trends powered by real order records from the backend.</p>\n      </div>\n    </div>\n\n    <div class=\"rc-trends\" *ngIf=\"trends.length; else noTrends\">\n      <div class=\"rc-trend\" *ngFor=\"let point of trends\">\n        <strong>{{ point.label }}</strong>\n        <span>{{ point.count }} orders</span>\n        <span>{{ point.totalQtyKg }} kg</span>\n      </div>\n    </div>\n\n    <ng-template #noTrends>\n      <div class=\"rc-empty\">Trend cards will appear once orders exist across multiple periods.</div>\n    </ng-template>\n  </section>\n\n  <section class=\"card\">\n    <div class=\"rc-section-head\">\n      <div>\n        <h2>{{ context.isAdmin ? 'All orders' : 'My orders' }}</h2>\n        <p>{{ context.isAdmin ? 'Admin can update, advance, cancel, or inspect any order.' : 'Orders owned by your enterprise.' }}</p>\n      </div>\n    </div>\n\n    <div class=\"rc-empty\" *ngIf=\"loading\">Loading orders...</div>\n    <div class=\"rc-empty\" *ngIf=\"!loading && !scopedOrders.length\">No orders found.</div>\n\n    <table class=\"data-table\" *ngIf=\"!loading && scopedOrders.length\">\n      <thead>\n        <tr>\n          <th>Reference</th>\n          <th>Company</th>\n          <th>Material</th>\n          <th>Qty</th>\n          <th>Status</th>\n          <th>Grade</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let order of scopedOrders\" (click)=\"selectOrder(order)\">\n          <td>{{ order.ref }}</td>\n          <td>{{ order.companyName }}</td>\n          <td>{{ order.material }}</td>\n          <td>{{ order.qtyKg }}</td>\n          <td><app-status-chip [label]=\"order.status\" [variant]=\"statusVariant(order.status)\" /></td>\n          <td>{{ order.grade }}</td>\n          <td class=\"rc-row-actions\">\n            <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"edit(order); $event.stopPropagation()\">Edit</button>\n            <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"advance(order); $event.stopPropagation()\" [disabled]=\"order.status === 'delivered' || order.status === 'cancelled'\">\n              Advance\n            </button>\n            <button class=\"btn btn-outline btn-sm\" type=\"button\" (click)=\"cancel(order); $event.stopPropagation()\" [disabled]=\"order.status === 'cancelled'\">\n              Cancel\n            </button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </section>\n</div>\n", styles: [".rc-page {\n  display: grid;\n  gap: 18px;\n  padding: 24px;\n}\n\n.rc-hero {\n  display: flex;\n  justify-content: space-between;\n  gap: 24px;\n  padding: 24px;\n  background:\n    radial-gradient(circle at top right, rgba(34, 197, 94, 0.14), transparent 34%),\n    linear-gradient(135deg, rgba(240, 253, 244, 0.96), rgba(255, 255, 255, 0.98));\n}\n\n.rc-kicker {\n  margin: 0 0 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  font-size: 11px;\n  color: #15803d;\n  font-weight: 700;\n}\n\n.rc-hero h1,\n.rc-section-head h2 {\n  margin: 0 0 8px;\n  font-family: 'Syne', sans-serif;\n}\n\n.rc-subtitle,\n.rc-section-head p {\n  margin: 0;\n  color: var(--text2);\n  line-height: 1.55;\n}\n\n.rc-hero-stats {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(120px, 1fr));\n  gap: 12px;\n  min-width: 280px;\n}\n\n.rc-stat {\n  padding: 16px;\n  border-radius: 16px;\n  border: 1px solid rgba(22, 163, 74, 0.12);\n  background: rgba(255, 255, 255, 0.92);\n}\n\n.rc-stat.warning {\n  border-color: rgba(217, 119, 6, 0.18);\n}\n\n.rc-stat span {\n  display: block;\n  font-size: 12px;\n  color: var(--text3);\n  margin-bottom: 8px;\n}\n\n.rc-stat strong {\n  font-size: 28px;\n  color: var(--text);\n}\n\n.rc-grid {\n  display: grid;\n  grid-template-columns: 1fr 0.9fr;\n  gap: 18px;\n}\n\n.rc-section-head,\n.rc-row-actions,\n.rc-actions {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n\n.rc-form-grid {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n}\n\n.rc-empty {\n  border-radius: 14px;\n  padding: 16px;\n  border: 1px solid var(--border);\n  background: rgba(248, 250, 252, 0.9);\n}\n\n.rc-breakdown {\n  display: grid;\n  gap: 10px;\n}\n\n.rc-breakdown-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 14px;\n  border-radius: 12px;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid var(--border);\n}\n\n.rc-breakdown-row.total {\n  background: rgba(220, 252, 231, 0.6);\n}\n\n.rc-breakdown-row strong.positive {\n  color: #15803d;\n}\n\n.rc-trends {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 12px;\n}\n\n.rc-trend {\n  display: grid;\n  gap: 6px;\n  padding: 16px;\n  border-radius: 14px;\n  border: 1px solid var(--border);\n  background: rgba(248, 250, 252, 0.9);\n}\n\n.rc-trend span {\n  color: var(--text2);\n  font-size: 12px;\n}\n\n@media (max-width: 1100px) {\n  .rc-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .rc-page {\n    padding: 16px;\n  }\n\n  .rc-hero {\n    flex-direction: column;\n  }\n\n  .rc-hero-stats {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    min-width: 0;\n  }\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.ReservationCenterState }, { type: i3.ReservationCenterAiService }, { type: i4.ReservationCenterService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EnterpriseOrders, { className: "EnterpriseOrders", filePath: "src/app/features/enterprise/enterprise-orders/enterprise-orders.ts", lineNumber: 29 }); })();
