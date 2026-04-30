import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/admin-api.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
function Users_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 47);
    i0.ɵɵelement(2, "polyline", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.successMsg, " ");
} }
function Users_tr_106__svg_svg_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 75);
    i0.ɵɵelement(1, "polyline", 48);
    i0.ɵɵelementEnd();
} }
function Users_tr_106_button_33_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 76);
    i0.ɵɵlistener("click", function Users_tr_106_button_33_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const u_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.approve(u_r3)); });
    i0.ɵɵtext(1, " Approve ");
    i0.ɵɵelementEnd();
} }
function Users_tr_106_button_34_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 77);
    i0.ɵɵlistener("click", function Users_tr_106_button_34_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const u_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.suspend(u_r3)); });
    i0.ɵɵtext(1, " Suspend ");
    i0.ɵɵelementEnd();
} }
function Users_tr_106_button_35_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 78);
    i0.ɵɵlistener("click", function Users_tr_106_button_35_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const u_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.activate(u_r3)); });
    i0.ɵɵtext(1, " Activate ");
    i0.ɵɵelementEnd();
} }
function Users_tr_106_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 49);
    i0.ɵɵlistener("click", function Users_tr_106_Template_tr_click_0_listener() { const u_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openDetail(u_r3)); });
    i0.ɵɵelementStart(1, "td")(2, "div", 50)(3, "div", 51);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "div", 52);
    i0.ɵɵtext(7);
    i0.ɵɵtemplate(8, Users_tr_106__svg_svg_8_Template, 2, 0, "svg", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 54);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 55);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(13, "td")(14, "span", 56);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td", 57);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td")(19, "span", 56);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "td", 58);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td", 58);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "td", 59);
    i0.ɵɵtext(26);
    i0.ɵɵelementStart(27, "span", 60);
    i0.ɵɵtext(28, "TND");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "td", 61);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "td", 62);
    i0.ɵɵlistener("click", function Users_tr_106_Template_td_click_31_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(32, "div", 63);
    i0.ɵɵtemplate(33, Users_tr_106_button_33_Template, 2, 0, "button", 64)(34, Users_tr_106_button_34_Template, 2, 0, "button", 65)(35, Users_tr_106_button_35_Template, 2, 0, "button", 66);
    i0.ɵɵelementStart(36, "button", 67);
    i0.ɵɵlistener("click", function Users_tr_106_Template_button_click_36_listener() { const u_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openDetail(u_r3)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(37, "svg", 68);
    i0.ɵɵelement(38, "path", 69)(39, "circle", 70);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(40, "button", 71);
    i0.ɵɵlistener("click", function Users_tr_106_Template_button_click_40_listener($event) { const u_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.confirmDelete(u_r3, $event)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(41, "svg", 68);
    i0.ɵɵelement(42, "polyline", 72)(43, "path", 73)(44, "path", 74);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const u_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("ava-enterprise", u_r3.role === "enterprise")("ava-transporter", u_r3.role === "transporter");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", u_r3.avatar, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", u_r3.name, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", u_r3.verified);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r3.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r3.company);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r0.roleClass(u_r3.role));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.roleLabel(u_r3.role));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r3.city);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r0.statusClass(u_r3.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(u_r3.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r3.listings);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r3.orders);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", u_r3.revenue, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(u_r3.joined);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", u_r3.status === "pending");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", u_r3.status === "active");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", u_r3.status === "suspended");
} }
function Users_div_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 80);
    i0.ɵɵelement(2, "path", 8)(3, "circle", 9)(4, "path", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6, "No users found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8, "Try adjusting your search or filters.");
    i0.ɵɵelementEnd()();
} }
function Users_div_108_div_1__svg_svg_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 122);
    i0.ɵɵelement(1, "polyline", 48);
    i0.ɵɵelementEnd();
} }
function Users_div_108_div_1_span_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 123);
    i0.ɵɵtext(1, "Not verified");
    i0.ɵɵelementEnd();
} }
function Users_div_108_div_1_button_80_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 124);
    i0.ɵɵlistener("click", function Users_div_108_div_1_button_80_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.approve(ctx_r0.selectedUser)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 125);
    i0.ɵɵelement(2, "polyline", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Approve Account ");
    i0.ɵɵelementEnd();
} }
function Users_div_108_div_1_button_81_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 126);
    i0.ɵɵlistener("click", function Users_div_108_div_1_button_81_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.suspend(ctx_r0.selectedUser)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 68);
    i0.ɵɵelement(2, "circle", 20)(3, "line", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Suspend Account ");
    i0.ɵɵelementEnd();
} }
function Users_div_108_div_1_button_82_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 124);
    i0.ɵɵlistener("click", function Users_div_108_div_1_button_82_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.activate(ctx_r0.selectedUser)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 125);
    i0.ɵɵelement(2, "polyline", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Reactivate Account ");
    i0.ɵɵelementEnd();
} }
function Users_div_108_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 83);
    i0.ɵɵlistener("click", function Users_div_108_div_1_Template_div_click_0_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(1, "div", 84)(2, "h2");
    i0.ɵɵtext(3, "User Profile");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 85);
    i0.ɵɵlistener("click", function Users_div_108_div_1_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.closeDetail()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(5, "svg", 86);
    i0.ɵɵelement(6, "line", 87)(7, "line", 88);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(8, "div", 89)(9, "div", 90);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 91)(12, "div", 92);
    i0.ɵɵtext(13);
    i0.ɵɵtemplate(14, Users_div_108_div_1__svg_svg_14_Template, 2, 0, "svg", 93);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 94);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 95)(18, "span", 56);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 56);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(22, Users_div_108_div_1_span_22_Template, 2, 0, "span", 96);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "div", 97)(24, "div", 98)(25, "div", 99);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(26, "svg", 100);
    i0.ɵɵelement(27, "path", 101)(28, "polyline", 102);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(29, " Email ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(30, "div", 103);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 98)(33, "div", 99);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(34, "svg", 100);
    i0.ɵɵelement(35, "path", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(36, " Phone ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(37, "div", 103);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 98)(40, "div", 99);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(41, "svg", 100);
    i0.ɵɵelement(42, "path", 105)(43, "circle", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(44, " City ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(45, "div", 103);
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div", 98)(48, "div", 99);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(49, "svg", 100);
    i0.ɵɵelement(50, "rect", 107)(51, "line", 108)(52, "line", 109)(53, "line", 110);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(54, " Joined ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(55, "div", 103);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(57, "div", 98)(58, "div", 99);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(59, "svg", 100);
    i0.ɵɵelement(60, "path", 111);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(61, " Listings ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(62, "div", 103);
    i0.ɵɵtext(63);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(64, "div", 98)(65, "div", 99);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(66, "svg", 100);
    i0.ɵɵelement(67, "line", 112)(68, "path", 113);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(69, " Revenue ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(70, "div", 114);
    i0.ɵɵtext(71);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(72, "div", 115)(73, "span", 116);
    i0.ɵɵtext(74, "User ID: ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(75, "span", 117);
    i0.ɵɵtext(76);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(77, "div", 118)(78, "button", 119);
    i0.ɵɵlistener("click", function Users_div_108_div_1_Template_button_click_78_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.closeDetail()); });
    i0.ɵɵtext(79, "Close");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(80, Users_div_108_div_1_button_80_Template, 4, 0, "button", 120)(81, Users_div_108_div_1_button_81_Template, 5, 0, "button", 121)(82, Users_div_108_div_1_button_82_Template, 4, 0, "button", 120);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(9);
    i0.ɵɵclassProp("ava-enterprise", ctx_r0.selectedUser.role === "enterprise")("ava-transporter", ctx_r0.selectedUser.role === "transporter");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.selectedUser.avatar, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.selectedUser.name, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedUser.verified);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.selectedUser.company);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r0.roleClass(ctx_r0.selectedUser.role));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.roleLabel(ctx_r0.selectedUser.role));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r0.statusClass(ctx_r0.selectedUser.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.selectedUser.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.selectedUser.verified);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r0.selectedUser.email);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r0.selectedUser.phone);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r0.selectedUser.city, ", Tunisia");
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r0.selectedUser.joined);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r0.selectedUser.listings, " active listings");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate1("", ctx_r0.selectedUser.revenue, " TND");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.selectedUser.id);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r0.selectedUser.status === "pending");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedUser.status === "active");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedUser.status === "suspended");
} }
function Users_div_108_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵlistener("click", function Users_div_108_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeDetail()); });
    i0.ɵɵtemplate(1, Users_div_108_div_1_Template, 83, 23, "div", 82);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.selectedUser);
} }
function Users_div_109_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 81);
    i0.ɵɵlistener("click", function Users_div_109_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelDelete()); });
    i0.ɵɵelementStart(1, "div", 127);
    i0.ɵɵlistener("click", function Users_div_109_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 84)(3, "h2", 128);
    i0.ɵɵtext(4, "Delete User");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 85);
    i0.ɵɵlistener("click", function Users_div_109_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelDelete()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(6, "svg", 86);
    i0.ɵɵelement(7, "line", 87)(8, "line", 88);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(9, "div", 129)(10, "p", 130);
    i0.ɵɵtext(11, " Are you sure you want to permanently delete ");
    i0.ɵɵelementStart(12, "strong", 131);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14, " from ");
    i0.ɵɵelementStart(15, "strong", 131);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(17, "? This action cannot be undone. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 118)(19, "button", 119);
    i0.ɵɵlistener("click", function Users_div_109_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelDelete()); });
    i0.ɵɵtext(20, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 132);
    i0.ɵɵlistener("click", function Users_div_109_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r12); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.executeDelete()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(22, "svg", 68);
    i0.ɵɵelement(23, "polyline", 72)(24, "path", 73);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(25, " Delete Permanently ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate(ctx_r0.deletingUser == null ? null : ctx_r0.deletingUser.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.deletingUser == null ? null : ctx_r0.deletingUser.company);
} }
export class Users {
    adminApiService;
    search = '';
    filterRole = 'all';
    filterStatus = 'all';
    showDetailModal = false;
    showDeleteConfirm = false;
    selectedUser = null;
    deletingUser = null;
    successMsg = '';
    users = [];
    constructor(adminApiService) {
        this.adminApiService = adminApiService;
    }
    get filtered() {
        return this.users.filter(u => {
            const matchSearch = u.name.toLowerCase().includes(this.search.toLowerCase()) ||
                u.email.toLowerCase().includes(this.search.toLowerCase()) ||
                u.company.toLowerCase().includes(this.search.toLowerCase()) ||
                u.id.toLowerCase().includes(this.search.toLowerCase());
            const matchRole = this.filterRole === 'all' || u.role === this.filterRole;
            const matchStatus = this.filterStatus === 'all' || u.status === this.filterStatus;
            return matchSearch && matchRole && matchStatus;
        });
    }
    get totalEnterprise() { return this.users.filter(u => u.role === 'enterprise').length; }
    get totalTransporter() { return this.users.filter(u => u.role === 'transporter').length; }
    get totalActive() { return this.users.filter(u => u.status === 'active').length; }
    get totalPending() { return this.users.filter(u => u.status === 'pending').length; }
    get totalSuspended() { return this.users.filter(u => u.status === 'suspended').length; }
    /* ── DETAIL MODAL ── */
    openDetail(user) {
        this.selectedUser = user;
        this.showDetailModal = true;
    }
    closeDetail() {
        this.showDetailModal = false;
        this.selectedUser = null;
    }
    parseUserNumericId(displayId) {
        return parseInt(displayId.replace(/^USR-/, ''), 10);
    }
    /* ── STATUS ACTIONS ── */
    activate(user) {
        const userId = this.parseUserNumericId(user.id);
        this.adminApiService.updateUserStatus(userId, 'active').subscribe(updatedUser => {
            const index = this.users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                this.users[index] = updatedUser;
            }
            this.successMsg = `${user.name} has been activated.`;
            this.closeDetail();
            this.flash();
        });
    }
    suspend(user) {
        const userId = this.parseUserNumericId(user.id);
        this.adminApiService.updateUserStatus(userId, 'suspended').subscribe(updatedUser => {
            const index = this.users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                this.users[index] = updatedUser;
            }
            this.successMsg = `${user.name} has been suspended.`;
            this.closeDetail();
            this.flash();
        });
    }
    approve(user) {
        const userId = this.parseUserNumericId(user.id);
        this.adminApiService.updateUserStatus(userId, 'active').subscribe(updatedUser => {
            const index = this.users.findIndex(u => u.id === user.id);
            if (index !== -1) {
                this.users[index] = { ...updatedUser, verified: true };
            }
            this.successMsg = `${user.name} has been approved.`;
            this.flash();
        });
    }
    /* ── DELETE ── */
    confirmDelete(user, event) {
        event.stopPropagation();
        this.deletingUser = user;
        this.showDeleteConfirm = true;
    }
    cancelDelete() {
        this.deletingUser = null;
        this.showDeleteConfirm = false;
    }
    executeDelete() {
        if (!this.deletingUser)
            return;
        const name = this.deletingUser.name;
        const userId = this.parseUserNumericId(this.deletingUser.id);
        this.adminApiService.deleteUser(userId).subscribe(() => {
            this.users = this.users.filter(u => u.id !== this.deletingUser.id);
            this.successMsg = `${name} has been deleted.`;
            this.showDeleteConfirm = false;
            this.deletingUser = null;
            this.flash();
        });
    }
    flash() {
        setTimeout(() => this.successMsg = '', 3000);
    }
    /* ── HELPERS ── */
    roleClass(role) {
        return role === 'enterprise' ? 'badge-success' : 'badge-info';
    }
    statusClass(status) {
        return status === 'active' ? 'badge-success'
            : status === 'pending' ? 'badge-warning'
                : 'badge-danger';
    }
    roleLabel(role) {
        return role === 'enterprise' ? 'Enterprise' : 'Transporter';
    }
    ngOnInit() {
        this.loadUsers();
    }
    loadUsers() {
        this.adminApiService.getUsers().subscribe(users => {
            this.users = users;
        });
    }
    static ɵfac = function Users_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Users)(i0.ɵɵdirectiveInject(i1.AdminApiService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Users, selectors: [["app-users"]], standalone: false, decls: 110, vars: 15, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], ["class", "alert alert-success", "style", "display:flex;align-items:center;gap:8px;margin-bottom:16px", 4, "ngIf"], [1, "stats-grid", 2, "margin-bottom", "22px"], [1, "stat-card"], [1, "stat-icon", 2, "background", "#e0f2fe"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#0284c7", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"], [1, "stat-value"], [1, "stat-label"], [1, "stat-change", "up"], [1, "stat-icon", 2, "background", "#dcfce7"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#059669", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M22 11.08V12a10 10 0 11-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "stat-icon", 2, "background", "#fef3c7"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#d97706", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], [1, "stat-change", "down"], [1, "stat-icon", 2, "background", "#fee2e2"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#dc2626", "stroke-width", "2", "stroke-linecap", "round"], ["x1", "4.93", "y1", "4.93", "x2", "19.07", "y2", "19.07"], [1, "toolbar"], [1, "search-box"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Search by name, email, company or ID...", 3, "ngModelChange", "ngModel"], [1, "filter-select", 3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "enterprise"], ["value", "transporter"], ["value", "active"], ["value", "pending"], ["value", "suspended"], [1, "spacer"], [1, "toolbar-count"], [1, "card", 2, "padding", "0"], [1, "data-table"], ["class", "users-row", 3, "click", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "alert", "alert-success", 2, "display", "flex", "align-items", "center", "gap", "8px", "margin-bottom", "16px"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["points", "20 6 9 17 4 12"], [1, "users-row", 3, "click"], [1, "users-cell"], [1, "users-avatar"], [1, "users-name"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "var(--success)", "stroke-width", "2.5", "stroke-linecap", "round", "style", "display:inline;margin-left:4px;vertical-align:middle", 4, "ngIf"], [1, "users-email"], [1, "users-company"], [1, "badge", 3, "ngClass"], [2, "color", "var(--text2)", "font-size", "12px"], [2, "color", "var(--text)", "font-weight", "600", "text-align", "center"], [2, "color", "var(--primary)", "font-weight", "700", "font-size", "13px"], [2, "font-size", "10px", "font-weight", "400", "color", "var(--text3)"], [2, "color", "var(--text3)", "font-size", "12px"], [3, "click"], [2, "display", "flex", "gap", "5px", "align-items", "center"], ["class", "btn btn-primary btn-sm", 3, "click", 4, "ngIf"], ["class", "btn btn-outline btn-sm users-btn-warn", 3, "click", 4, "ngIf"], ["class", "btn btn-outline btn-sm", 3, "click", 4, "ngIf"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], [1, "btn", "btn-danger", "btn-sm", 3, "click"], ["points", "3 6 5 6 21 6"], ["d", "M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"], ["d", "M10 11v6M14 11v6"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "var(--success)", "stroke-width", "2.5", "stroke-linecap", "round", 2, "display", "inline", "margin-left", "4px", "vertical-align", "middle"], [1, "btn", "btn-primary", "btn-sm", 3, "click"], [1, "btn", "btn-outline", "btn-sm", "users-btn-warn", 3, "click"], [1, "btn", "btn-outline", "btn-sm", 3, "click"], [1, "empty-state"], ["width", "40", "height", "40", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.2", "stroke-linecap", "round", 1, "empty-icon", 2, "font-size", "unset", "opacity", ".2"], [1, "modal-overlay", 3, "click"], ["class", "modal users-modal", 3, "click", 4, "ngIf"], [1, "modal", "users-modal", 3, "click"], [1, "modal-header"], [1, "btn", "btn-icon", 3, "click"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "users-profile-hd"], [1, "users-avatar-lg"], [1, "users-profile-info"], [1, "users-profile-name"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "var(--success)", "stroke-width", "2.5", "stroke-linecap", "round", "style", "display:inline;margin-left:6px;vertical-align:middle", 4, "ngIf"], [1, "users-profile-company"], [2, "display", "flex", "align-items", "center", "gap", "8px", "margin-top", "8px"], ["class", "badge badge-neutral", 4, "ngIf"], [1, "users-info-grid"], [1, "users-info-item"], [1, "users-info-lbl"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], [1, "users-info-val"], ["d", "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 013 1.18 2 2 0 015 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"], ["d", "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"], ["cx", "12", "cy", "10", "r", "3"], ["x", "3", "y", "4", "width", "18", "height", "18", "rx", "2"], ["x1", "16", "y1", "2", "x2", "16", "y2", "6"], ["x1", "8", "y1", "2", "x2", "8", "y2", "6"], ["x1", "3", "y1", "10", "x2", "21", "y2", "10"], ["d", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"], ["x1", "12", "y1", "1", "x2", "12", "y2", "23"], ["d", "M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"], [1, "users-info-val", 2, "color", "var(--primary)", "font-weight", "700"], [2, "padding", "12px 0", "border-top", "1px solid var(--border)", "margin-top", "4px"], [2, "font-size", "11px", "color", "var(--text3)"], [2, "font-size", "11px", "font-family", "'DM Mono',monospace", "color", "var(--text2)"], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"], ["class", "btn btn-primary", 3, "click", 4, "ngIf"], ["class", "btn users-btn-suspend", 3, "click", 4, "ngIf"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "var(--success)", "stroke-width", "2.5", "stroke-linecap", "round", 2, "display", "inline", "margin-left", "6px", "vertical-align", "middle"], [1, "badge", "badge-neutral"], [1, "btn", "btn-primary", 3, "click"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], [1, "btn", "users-btn-suspend", 3, "click"], [1, "modal", 2, "max-width", "400px", 3, "click"], [2, "color", "var(--danger)"], [2, "padding", "4px 0 20px"], [2, "font-size", "14px", "color", "var(--text2)", "line-height", "1.6"], [2, "color", "var(--text)"], [1, "btn", "btn-danger", 3, "click"]], template: function Users_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "User Management");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Supervise all enterprise and transporter accounts");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(7, Users_div_7_Template, 4, 1, "div", 3);
            i0.ɵɵelementStart(8, "div", 4)(9, "div", 5)(10, "div", 6);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(11, "svg", 7);
            i0.ɵɵelement(12, "path", 8)(13, "circle", 9)(14, "path", 10);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(15, "div")(16, "div", 11);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 12);
            i0.ɵɵtext(19, "Total Users");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 13);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "div", 5)(23, "div", 14);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(24, "svg", 15);
            i0.ɵɵelement(25, "path", 16)(26, "polyline", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(27, "div")(28, "div", 11);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 12);
            i0.ɵɵtext(31, "Active Accounts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 13);
            i0.ɵɵtext(33, "Fully verified");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(34, "div", 5)(35, "div", 18);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(36, "svg", 19);
            i0.ɵɵelement(37, "circle", 20)(38, "polyline", 21);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(39, "div")(40, "div", 11);
            i0.ɵɵtext(41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "div", 12);
            i0.ɵɵtext(43, "Pending Approval");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 22);
            i0.ɵɵtext(45, "Awaiting review");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(46, "div", 5)(47, "div", 23);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(48, "svg", 24);
            i0.ɵɵelement(49, "circle", 20)(50, "line", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(51, "div")(52, "div", 11);
            i0.ɵɵtext(53);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "div", 12);
            i0.ɵɵtext(55, "Suspended");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "div", 22);
            i0.ɵɵtext(57, "Access blocked");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(58, "div", 26)(59, "div", 27);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(60, "svg", 28);
            i0.ɵɵelement(61, "circle", 29)(62, "line", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(63, "input", 31);
            i0.ɵɵtwoWayListener("ngModelChange", function Users_Template_input_ngModelChange_63_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.search, $event) || (ctx.search = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(64, "select", 32);
            i0.ɵɵtwoWayListener("ngModelChange", function Users_Template_select_ngModelChange_64_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterRole, $event) || (ctx.filterRole = $event); return $event; });
            i0.ɵɵelementStart(65, "option", 33);
            i0.ɵɵtext(66, "All roles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "option", 34);
            i0.ɵɵtext(68, "Enterprise");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "option", 35);
            i0.ɵɵtext(70, "Transporter");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(71, "select", 32);
            i0.ɵɵtwoWayListener("ngModelChange", function Users_Template_select_ngModelChange_71_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterStatus, $event) || (ctx.filterStatus = $event); return $event; });
            i0.ɵɵelementStart(72, "option", 33);
            i0.ɵɵtext(73, "All statuses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "option", 36);
            i0.ɵɵtext(75, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "option", 37);
            i0.ɵɵtext(77, "Pending");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "option", 38);
            i0.ɵɵtext(79, "Suspended");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(80, "div", 39);
            i0.ɵɵelementStart(81, "span", 40);
            i0.ɵɵtext(82);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(83, "div", 41)(84, "table", 42)(85, "thead")(86, "tr")(87, "th");
            i0.ɵɵtext(88, "User");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(89, "th");
            i0.ɵɵtext(90, "Role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "th");
            i0.ɵɵtext(92, "City");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "th");
            i0.ɵɵtext(94, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(95, "th");
            i0.ɵɵtext(96, "Listings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "th");
            i0.ɵɵtext(98, "Orders");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "th");
            i0.ɵɵtext(100, "Revenue");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "th");
            i0.ɵɵtext(102, "Joined");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "th");
            i0.ɵɵtext(104, "Actions");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(105, "tbody");
            i0.ɵɵtemplate(106, Users_tr_106_Template, 45, 21, "tr", 43);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(107, Users_div_107_Template, 9, 0, "div", 44);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(108, Users_div_108_Template, 2, 1, "div", 45)(109, Users_div_109_Template, 26, 2, "div", 45);
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.successMsg);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(ctx.users.length);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate2(" ", ctx.totalEnterprise, " enterprise \u00B7 ", ctx.totalTransporter, " transporter ");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.totalActive);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.totalPending);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.totalSuspended);
            i0.ɵɵadvance(10);
            i0.ɵɵtwoWayProperty("ngModel", ctx.search);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterRole);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterStatus);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1("", ctx.filtered.length, " users");
            i0.ɵɵadvance(24);
            i0.ɵɵproperty("ngForOf", ctx.filtered);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.filtered.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDetailModal);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDeleteConfirm);
        } }, dependencies: [i2.NgClass, i2.NgForOf, i2.NgIf, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.DefaultValueAccessor, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgModel], styles: ["\n\n.users-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background .12s;\n}\n.users-row[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: var(--card2, var(--bg3));\n}\n\n\n\n.users-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n}\n\n\n\n.users-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 9px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 700;\n  color: #fff;\n  flex-shrink: 0;\n  letter-spacing: .5px;\n}\n.ava-enterprise[_ngcontent-%COMP%]  { background: linear-gradient(135deg, #0284c7, #38bdf8); }\n.ava-transporter[_ngcontent-%COMP%] { background: linear-gradient(135deg, #d97706, #fbbf24); color: #000; }\n\n.users-avatar-lg[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n  font-weight: 700;\n  color: #fff;\n  flex-shrink: 0;\n  letter-spacing: .5px;\n}\n\n\n\n.users-name[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n  margin-bottom: 2px;\n}\n.users-email[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text3);\n}\n.users-company[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text3);\n}\n\n\n\n.users-btn-warn[_ngcontent-%COMP%] {\n  border-color: var(--warning, #d97706) !important;\n  color: var(--warning, #d97706) !important;\n}\n.users-btn-warn[_ngcontent-%COMP%]:hover {\n  background: rgba(217,119,6,.06) !important;\n}\n\n\n\n.users-btn-suspend[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 9px 18px;\n  border-radius: 8px;\n  border: 1px solid rgba(220,38,38,.3);\n  background: rgba(220,38,38,.06);\n  color: var(--danger, #dc2626);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all .15s;\n}\n.users-btn-suspend[_ngcontent-%COMP%]:hover {\n  background: rgba(220,38,38,.12);\n  border-color: var(--danger, #dc2626);\n}\n\n\n\n.users-modal[_ngcontent-%COMP%] {\n  max-width: 560px;\n}\n\n.users-profile-hd[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 18px;\n  padding: 4px 0 20px;\n  border-bottom: 1px solid var(--border);\n  margin-bottom: 18px;\n}\n.users-profile-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.users-profile-name[_ngcontent-%COMP%] {\n  font-family: 'Syne', sans-serif;\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text);\n  letter-spacing: -.3px;\n  margin-bottom: 3px;\n}\n.users-profile-company[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text3);\n}\n\n\n\n.users-info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n  margin-bottom: 14px;\n}\n.users-info-item[_ngcontent-%COMP%] {\n  background: var(--bg3, var(--card2));\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  padding: 11px 14px;\n}\n.users-info-lbl[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: .5px;\n  color: var(--text3);\n  margin-bottom: 5px;\n}\n.users-info-val[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text);\n  font-weight: 500;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Users, [{
        type: Component,
        args: [{ selector: 'app-users', standalone: false, template: "<div class=\"page-wrapper\">\n\n  <!-- \u2550\u2550 HEADER \u2550\u2550 -->\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\">\n      <h1>User Management</h1>\n      <p>Supervise all enterprise and transporter accounts</p>\n    </div>\n  </div>\n\n  <!-- \u2550\u2550 SUCCESS TOAST \u2550\u2550 -->\n  <div class=\"alert alert-success\" *ngIf=\"successMsg\"\n    style=\"display:flex;align-items:center;gap:8px;margin-bottom:16px\">\n    <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\"\n      stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\">\n      <polyline points=\"20 6 9 17 4 12\"/>\n    </svg>\n    {{successMsg}}\n  </div>\n\n  <!-- \u2550\u2550 STAT CARDS \u2550\u2550 -->\n  <div class=\"stats-grid\" style=\"margin-bottom:22px\">\n\n    <div class=\"stat-card\">\n      <div class=\"stat-icon\" style=\"background:#e0f2fe\">\n        <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\"\n          stroke=\"#0284c7\" stroke-width=\"2\" stroke-linecap=\"round\">\n          <path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/>\n          <circle cx=\"9\" cy=\"7\" r=\"4\"/>\n          <path d=\"M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75\"/>\n        </svg>\n      </div>\n      <div>\n        <div class=\"stat-value\">{{users.length}}</div>\n        <div class=\"stat-label\">Total Users</div>\n        <div class=\"stat-change up\">\n          {{totalEnterprise}} enterprise \u00B7 {{totalTransporter}} transporter\n        </div>\n      </div>\n    </div>\n\n    <div class=\"stat-card\">\n      <div class=\"stat-icon\" style=\"background:#dcfce7\">\n        <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\"\n          stroke=\"#059669\" stroke-width=\"2\" stroke-linecap=\"round\">\n          <path d=\"M22 11.08V12a10 10 0 11-5.93-9.14\"/>\n          <polyline points=\"22 4 12 14.01 9 11.01\"/>\n        </svg>\n      </div>\n      <div>\n        <div class=\"stat-value\">{{totalActive}}</div>\n        <div class=\"stat-label\">Active Accounts</div>\n        <div class=\"stat-change up\">Fully verified</div>\n      </div>\n    </div>\n\n    <div class=\"stat-card\">\n      <div class=\"stat-icon\" style=\"background:#fef3c7\">\n        <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\"\n          stroke=\"#d97706\" stroke-width=\"2\" stroke-linecap=\"round\">\n          <circle cx=\"12\" cy=\"12\" r=\"10\"/>\n          <polyline points=\"12 6 12 12 16 14\"/>\n        </svg>\n      </div>\n      <div>\n        <div class=\"stat-value\">{{totalPending}}</div>\n        <div class=\"stat-label\">Pending Approval</div>\n        <div class=\"stat-change down\">Awaiting review</div>\n      </div>\n    </div>\n\n    <div class=\"stat-card\">\n      <div class=\"stat-icon\" style=\"background:#fee2e2\">\n        <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\"\n          stroke=\"#dc2626\" stroke-width=\"2\" stroke-linecap=\"round\">\n          <circle cx=\"12\" cy=\"12\" r=\"10\"/>\n          <line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"/>\n        </svg>\n      </div>\n      <div>\n        <div class=\"stat-value\">{{totalSuspended}}</div>\n        <div class=\"stat-label\">Suspended</div>\n        <div class=\"stat-change down\">Access blocked</div>\n      </div>\n    </div>\n\n  </div>\n\n  <!-- \u2550\u2550 TOOLBAR \u2550\u2550 -->\n  <div class=\"toolbar\">\n    <div class=\"search-box\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\"\n        stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\">\n        <circle cx=\"11\" cy=\"11\" r=\"8\"/>\n        <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/>\n      </svg>\n      <input type=\"text\" placeholder=\"Search by name, email, company or ID...\"\n        [(ngModel)]=\"search\"/>\n    </div>\n\n    <select class=\"filter-select\" [(ngModel)]=\"filterRole\">\n      <option value=\"all\">All roles</option>\n      <option value=\"enterprise\">Enterprise</option>\n      <option value=\"transporter\">Transporter</option>\n    </select>\n\n    <select class=\"filter-select\" [(ngModel)]=\"filterStatus\">\n      <option value=\"all\">All statuses</option>\n      <option value=\"active\">Active</option>\n      <option value=\"pending\">Pending</option>\n      <option value=\"suspended\">Suspended</option>\n    </select>\n\n    <div class=\"spacer\"></div>\n    <span class=\"toolbar-count\">{{filtered.length}} users</span>\n  </div>\n\n  <!-- \u2550\u2550 TABLE \u2550\u2550 -->\n  <div class=\"card\" style=\"padding:0\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th>User</th>\n          <th>Role</th>\n          <th>City</th>\n          <th>Status</th>\n          <th>Listings</th>\n          <th>Orders</th>\n          <th>Revenue</th>\n          <th>Joined</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let u of filtered\" class=\"users-row\" (click)=\"openDetail(u)\">\n\n          <!-- User -->\n          <td>\n            <div class=\"users-cell\">\n              <div class=\"users-avatar\" [class.ava-enterprise]=\"u.role==='enterprise'\" [class.ava-transporter]=\"u.role==='transporter'\">\n                {{u.avatar}}\n              </div>\n              <div>\n                <div class=\"users-name\">\n                  {{u.name}}\n                  <svg *ngIf=\"u.verified\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\"\n                    fill=\"none\" stroke=\"var(--success)\" stroke-width=\"2.5\" stroke-linecap=\"round\"\n                    style=\"display:inline;margin-left:4px;vertical-align:middle\">\n                    <polyline points=\"20 6 9 17 4 12\"/>\n                  </svg>\n                </div>\n                <div class=\"users-email\">{{u.email}}</div>\n                <div class=\"users-company\">{{u.company}}</div>\n              </div>\n            </div>\n          </td>\n\n          <!-- Role -->\n          <td><span class=\"badge\" [ngClass]=\"roleClass(u.role)\">{{roleLabel(u.role)}}</span></td>\n\n          <!-- City -->\n          <td style=\"color:var(--text2);font-size:12px\">{{u.city}}</td>\n\n          <!-- Status -->\n          <td><span class=\"badge\" [ngClass]=\"statusClass(u.status)\">{{u.status}}</span></td>\n\n          <!-- Listings -->\n          <td style=\"color:var(--text);font-weight:600;text-align:center\">{{u.listings}}</td>\n\n          <!-- Orders -->\n          <td style=\"color:var(--text);font-weight:600;text-align:center\">{{u.orders}}</td>\n\n          <!-- Revenue -->\n          <td style=\"color:var(--primary);font-weight:700;font-size:13px\">\n            {{u.revenue}} <span style=\"font-size:10px;font-weight:400;color:var(--text3)\">TND</span>\n          </td>\n\n          <!-- Joined -->\n          <td style=\"color:var(--text3);font-size:12px\">{{u.joined}}</td>\n\n          <!-- Actions -->\n          <td (click)=\"$event.stopPropagation()\">\n            <div style=\"display:flex;gap:5px;align-items:center\">\n\n              <!-- Approve pending -->\n              <button class=\"btn btn-primary btn-sm\"\n                *ngIf=\"u.status==='pending'\"\n                (click)=\"approve(u)\">\n                Approve\n              </button>\n\n              <!-- Suspend active -->\n              <button class=\"btn btn-outline btn-sm users-btn-warn\"\n                *ngIf=\"u.status==='active'\"\n                (click)=\"suspend(u)\">\n                Suspend\n              </button>\n\n              <!-- Reactivate suspended -->\n              <button class=\"btn btn-outline btn-sm\"\n                *ngIf=\"u.status==='suspended'\"\n                (click)=\"activate(u)\">\n                Activate\n              </button>\n\n              <!-- View detail -->\n              <button class=\"btn btn-ghost btn-sm\" (click)=\"openDetail(u)\">\n                <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\"\n                  stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\">\n                  <path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/>\n                  <circle cx=\"12\" cy=\"12\" r=\"3\"/>\n                </svg>\n              </button>\n\n              <!-- Delete -->\n              <button class=\"btn btn-danger btn-sm\" (click)=\"confirmDelete(u,$event)\">\n                <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\"\n                  stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\">\n                  <polyline points=\"3 6 5 6 21 6\"/>\n                  <path d=\"M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6\"/>\n                  <path d=\"M10 11v6M14 11v6\"/>\n                </svg>\n              </button>\n\n            </div>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n\n    <!-- Empty state -->\n    <div class=\"empty-state\" *ngIf=\"filtered.length === 0\">\n      <svg width=\"40\" height=\"40\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\"\n        stroke-width=\"1.2\" stroke-linecap=\"round\" class=\"empty-icon\" style=\"font-size:unset;opacity:.2\">\n        <path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/>\n        <circle cx=\"9\" cy=\"7\" r=\"4\"/>\n        <path d=\"M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75\"/>\n      </svg>\n      <h3>No users found</h3>\n      <p>Try adjusting your search or filters.</p>\n    </div>\n\n  </div>\n\n</div>\n\n<!-- \u2550\u2550 USER DETAIL MODAL \u2550\u2550 -->\n<div class=\"modal-overlay\" *ngIf=\"showDetailModal\" (click)=\"closeDetail()\">\n  <div class=\"modal users-modal\" (click)=\"$event.stopPropagation()\" *ngIf=\"selectedUser\">\n\n    <div class=\"modal-header\">\n      <h2>User Profile</h2>\n      <button class=\"btn btn-icon\" (click)=\"closeDetail()\">\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\"\n          stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/>\n        </svg>\n      </button>\n    </div>\n\n    <!-- Profile header -->\n    <div class=\"users-profile-hd\">\n      <div class=\"users-avatar-lg\"\n        [class.ava-enterprise]=\"selectedUser.role==='enterprise'\"\n        [class.ava-transporter]=\"selectedUser.role==='transporter'\">\n        {{selectedUser.avatar}}\n      </div>\n      <div class=\"users-profile-info\">\n        <div class=\"users-profile-name\">\n          {{selectedUser.name}}\n          <svg *ngIf=\"selectedUser.verified\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\"\n            fill=\"none\" stroke=\"var(--success)\" stroke-width=\"2.5\" stroke-linecap=\"round\"\n            style=\"display:inline;margin-left:6px;vertical-align:middle\">\n            <polyline points=\"20 6 9 17 4 12\"/>\n          </svg>\n        </div>\n        <div class=\"users-profile-company\">{{selectedUser.company}}</div>\n        <div style=\"display:flex;align-items:center;gap:8px;margin-top:8px\">\n          <span class=\"badge\" [ngClass]=\"roleClass(selectedUser.role)\">{{roleLabel(selectedUser.role)}}</span>\n          <span class=\"badge\" [ngClass]=\"statusClass(selectedUser.status)\">{{selectedUser.status}}</span>\n          <span class=\"badge badge-neutral\" *ngIf=\"!selectedUser.verified\">Not verified</span>\n        </div>\n      </div>\n    </div>\n\n    <!-- Info grid -->\n    <div class=\"users-info-grid\">\n      <div class=\"users-info-item\">\n        <div class=\"users-info-lbl\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"/><polyline points=\"22,6 12,13 2,6\"/></svg>\n          Email\n        </div>\n        <div class=\"users-info-val\">{{selectedUser.email}}</div>\n      </div>\n      <div class=\"users-info-item\">\n        <div class=\"users-info-lbl\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 013 1.18 2 2 0 015 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z\"/></svg>\n          Phone\n        </div>\n        <div class=\"users-info-val\">{{selectedUser.phone}}</div>\n      </div>\n      <div class=\"users-info-item\">\n        <div class=\"users-info-lbl\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>\n          City\n        </div>\n        <div class=\"users-info-val\">{{selectedUser.city}}, Tunisia</div>\n      </div>\n      <div class=\"users-info-item\">\n        <div class=\"users-info-lbl\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/></svg>\n          Joined\n        </div>\n        <div class=\"users-info-val\">{{selectedUser.joined}}</div>\n      </div>\n      <div class=\"users-info-item\">\n        <div class=\"users-info-lbl\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2\"/></svg>\n          Listings\n        </div>\n        <div class=\"users-info-val\">{{selectedUser.listings}} active listings</div>\n      </div>\n      <div class=\"users-info-item\">\n        <div class=\"users-info-lbl\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"23\"/><path d=\"M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6\"/></svg>\n          Revenue\n        </div>\n        <div class=\"users-info-val\" style=\"color:var(--primary);font-weight:700\">{{selectedUser.revenue}} TND</div>\n      </div>\n    </div>\n\n    <!-- User ID -->\n    <div style=\"padding:12px 0;border-top:1px solid var(--border);margin-top:4px\">\n      <span style=\"font-size:11px;color:var(--text3)\">User ID: </span>\n      <span style=\"font-size:11px;font-family:'DM Mono',monospace;color:var(--text2)\">{{selectedUser.id}}</span>\n    </div>\n\n    <!-- Modal actions -->\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-outline\" (click)=\"closeDetail()\">Close</button>\n\n      <button class=\"btn btn-primary\"\n        *ngIf=\"selectedUser.status==='pending'\"\n        (click)=\"approve(selectedUser)\">\n        <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg>\n        Approve Account\n      </button>\n\n      <button class=\"btn users-btn-suspend\"\n        *ngIf=\"selectedUser.status==='active'\"\n        (click)=\"suspend(selectedUser)\">\n        <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"/></svg>\n        Suspend Account\n      </button>\n\n      <button class=\"btn btn-primary\"\n        *ngIf=\"selectedUser.status==='suspended'\"\n        (click)=\"activate(selectedUser)\">\n        <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg>\n        Reactivate Account\n      </button>\n\n    </div>\n\n  </div>\n</div>\n\n<!-- \u2550\u2550 DELETE CONFIRM MODAL \u2550\u2550 -->\n<div class=\"modal-overlay\" *ngIf=\"showDeleteConfirm\" (click)=\"cancelDelete()\">\n  <div class=\"modal\" style=\"max-width:400px\" (click)=\"$event.stopPropagation()\">\n\n    <div class=\"modal-header\">\n      <h2 style=\"color:var(--danger)\">Delete User</h2>\n      <button class=\"btn btn-icon\" (click)=\"cancelDelete()\">\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\"\n          stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\">\n          <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/>\n          <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/>\n        </svg>\n      </button>\n    </div>\n\n    <div style=\"padding:4px 0 20px\">\n      <p style=\"font-size:14px;color:var(--text2);line-height:1.6\">\n        Are you sure you want to permanently delete\n        <strong style=\"color:var(--text)\">{{deletingUser?.name}}</strong>\n        from <strong style=\"color:var(--text)\">{{deletingUser?.company}}</strong>?\n        This action cannot be undone.\n      </p>\n    </div>\n\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-outline\" (click)=\"cancelDelete()\">Cancel</button>\n      <button class=\"btn btn-danger\" (click)=\"executeDelete()\">\n        <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\"\n          stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\">\n          <polyline points=\"3 6 5 6 21 6\"/>\n          <path d=\"M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6\"/>\n        </svg>\n        Delete Permanently\n      </button>\n    </div>\n\n  </div>\n</div>", styles: ["/* \u2500\u2500 TABLE ROW \u2500\u2500 */\n.users-row {\n  cursor: pointer;\n  transition: background .12s;\n}\n.users-row:hover td {\n  background: var(--card2, var(--bg3));\n}\n\n/* \u2500\u2500 USER CELL \u2500\u2500 */\n.users-cell {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n}\n\n/* \u2500\u2500 AVATAR \u2500\u2500 */\n.users-avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: 9px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 700;\n  color: #fff;\n  flex-shrink: 0;\n  letter-spacing: .5px;\n}\n.ava-enterprise  { background: linear-gradient(135deg, #0284c7, #38bdf8); }\n.ava-transporter { background: linear-gradient(135deg, #d97706, #fbbf24); color: #000; }\n\n.users-avatar-lg {\n  width: 64px;\n  height: 64px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 22px;\n  font-weight: 700;\n  color: #fff;\n  flex-shrink: 0;\n  letter-spacing: .5px;\n}\n\n/* \u2500\u2500 NAME / EMAIL \u2500\u2500 */\n.users-name {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text);\n  margin-bottom: 2px;\n}\n.users-email {\n  font-size: 11px;\n  color: var(--text3);\n}\n.users-company {\n  font-size: 11px;\n  color: var(--text3);\n}\n\n/* \u2500\u2500 WARN BUTTON (suspend) \u2500\u2500 */\n.users-btn-warn {\n  border-color: var(--warning, #d97706) !important;\n  color: var(--warning, #d97706) !important;\n}\n.users-btn-warn:hover {\n  background: rgba(217,119,6,.06) !important;\n}\n\n/* \u2500\u2500 SUSPEND BUTTON in modal \u2500\u2500 */\n.users-btn-suspend {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  padding: 9px 18px;\n  border-radius: 8px;\n  border: 1px solid rgba(220,38,38,.3);\n  background: rgba(220,38,38,.06);\n  color: var(--danger, #dc2626);\n  font-size: 13px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all .15s;\n}\n.users-btn-suspend:hover {\n  background: rgba(220,38,38,.12);\n  border-color: var(--danger, #dc2626);\n}\n\n/* \u2500\u2500 DETAIL MODAL \u2500\u2500 */\n.users-modal {\n  max-width: 560px;\n}\n\n.users-profile-hd {\n  display: flex;\n  align-items: flex-start;\n  gap: 18px;\n  padding: 4px 0 20px;\n  border-bottom: 1px solid var(--border);\n  margin-bottom: 18px;\n}\n.users-profile-info {\n  flex: 1;\n  min-width: 0;\n}\n.users-profile-name {\n  font-family: 'Syne', sans-serif;\n  font-size: 18px;\n  font-weight: 800;\n  color: var(--text);\n  letter-spacing: -.3px;\n  margin-bottom: 3px;\n}\n.users-profile-company {\n  font-size: 13px;\n  color: var(--text3);\n}\n\n/* \u2500\u2500 INFO GRID \u2500\u2500 */\n.users-info-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 14px;\n  margin-bottom: 14px;\n}\n.users-info-item {\n  background: var(--bg3, var(--card2));\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  padding: 11px 14px;\n}\n.users-info-lbl {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 10px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: .5px;\n  color: var(--text3);\n  margin-bottom: 5px;\n}\n.users-info-val {\n  font-size: 13px;\n  color: var(--text);\n  font-weight: 500;\n}"] }]
    }], () => [{ type: i1.AdminApiService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Users, { className: "Users", filePath: "src/app/features/admin/users/users.ts", lineNumber: 12 }); })();
