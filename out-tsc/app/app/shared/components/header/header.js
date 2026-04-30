import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth";
import * as i2 from "../../../core/services/theme";
import * as i3 from "../../../features/reservation-center/state/reservation-center.state";
import * as i4 from "@angular/common";
function Header_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "\u2600\uFE0F");
    i0.ɵɵelementEnd();
} }
function Header_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "\uD83C\uDF19");
    i0.ɵɵelementEnd();
} }
function Header_div_18_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "span", 22);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "div", 23);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 24);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const n_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(n_r1.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(n_r1.text);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(n_r1.time);
} }
function Header_div_18_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "div")(2, "div", 23);
    i0.ɵɵtext(3, "No live reservation, slot, or order alerts.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 24);
    i0.ɵɵtext(5, "Backend synced");
    i0.ɵɵelementEnd()()();
} }
function Header_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "div", 17)(2, "strong");
    i0.ɵɵtext(3, "Notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 18);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, Header_div_18_div_6_Template, 8, 3, "div", 19)(7, Header_div_18_div_7_Template, 6, 0, "div", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r1.notifications.length, " new");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.notifications);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.notifications.length);
} }
function Header_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.user.avatar);
} }
export class Header {
    authService;
    themeService;
    reservationCenterState;
    pageTitle = 'Dashboard';
    toggleSidebar = new EventEmitter();
    user = null;
    showNotif = false;
    isDark = false;
    notifications = [];
    constructor(authService, themeService, reservationCenterState) {
        this.authService = authService;
        this.themeService = themeService;
        this.reservationCenterState = reservationCenterState;
    }
    ngOnInit() {
        this.authService.user$.subscribe((u) => this.user = u);
        this.themeService.isDark$.subscribe(d => this.isDark = d);
        this.reservationCenterState.loadAll().subscribe({
            next: snapshot => {
                const pendingReservations = snapshot.reservations.filter(item => item.status === 'PENDING').length;
                const openSlots = snapshot.slots.filter(item => item.status === 'open').length;
                const draftOrders = snapshot.orders.filter(item => item.status === 'draft').length;
                this.notifications = [
                    { text: `${pendingReservations} reservation request(s) awaiting review`, time: 'Live', icon: 'REQ' },
                    { text: `${openSlots} slot(s) currently open in the marketplace`, time: 'Live', icon: 'SLT' },
                    { text: `${draftOrders} order(s) still in draft`, time: 'Live', icon: 'ORD' },
                ].filter(item => !item.text.startsWith('0 '));
            },
            error: () => {
                this.notifications = [];
            },
        });
    }
    toggleTheme() {
        this.themeService.toggle();
    }
    static ɵfac = function Header_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Header)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.ThemeService), i0.ɵɵdirectiveInject(i3.ReservationCenterState)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Header, selectors: [["app-header"]], inputs: { pageTitle: "pageTitle" }, outputs: { toggleSidebar: "toggleSidebar" }, standalone: false, decls: 22, vars: 7, consts: [[1, "app-header"], [1, "hdr-left"], [1, "hdr-toggle", 3, "click"], [1, "hdr-title"], [1, "hdr-right"], [1, "theme-toggle", 3, "click", "title"], [1, "theme-toggle-track"], [1, "theme-toggle-thumb"], [4, "ngIf"], [1, "theme-toggle-label"], [2, "position", "relative"], [1, "hdr-btn", 3, "click"], [1, "hdr-notif-dot"], ["class", "notif-dropdown", 4, "ngIf"], [1, "hdr-btn"], ["class", "hdr-avatar", 4, "ngIf"], [1, "notif-dropdown"], [1, "notif-head"], [1, "badge", "badge-primary"], ["class", "notif-row", 4, "ngFor", "ngForOf"], ["class", "notif-row", 4, "ngIf"], [1, "notif-row"], [1, "notif-ico"], [1, "notif-text"], [1, "notif-time"], [1, "hdr-avatar"]], template: function Header_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div", 1)(2, "button", 2);
            i0.ɵɵlistener("click", function Header_Template_button_click_2_listener() { return ctx.toggleSidebar.emit(); });
            i0.ɵɵtext(3, "\u2630");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h2", 3);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 4)(7, "button", 5);
            i0.ɵɵlistener("click", function Header_Template_button_click_7_listener() { return ctx.toggleTheme(); });
            i0.ɵɵelementStart(8, "span", 6)(9, "span", 7);
            i0.ɵɵtemplate(10, Header_span_10_Template, 2, 0, "span", 8)(11, Header_span_11_Template, 2, 0, "span", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "span", 9);
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 10)(15, "button", 11);
            i0.ɵɵlistener("click", function Header_Template_button_click_15_listener() { return ctx.showNotif = !ctx.showNotif; });
            i0.ɵɵtext(16, " \uD83D\uDD14 ");
            i0.ɵɵelement(17, "span", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, Header_div_18_Template, 8, 3, "div", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "button", 14);
            i0.ɵɵtext(20, "\u2699");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(21, Header_div_21_Template, 2, 1, "div", 15);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.pageTitle);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("title", ctx.isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.isDark);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isDark);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.isDark ? "Light Mode" : "Dark Mode");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.showNotif);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.user);
        } }, dependencies: [i4.NgForOf, i4.NgIf], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Header, [{
        type: Component,
        args: [{ selector: 'app-header', standalone: false, template: "<header class=\"app-header\">\n  <div class=\"hdr-left\">\n    <button class=\"hdr-toggle\" (click)=\"toggleSidebar.emit()\">\u2630</button>\n    <h2 class=\"hdr-title\">{{pageTitle}}</h2>\n  </div>\n  <div class=\"hdr-right\">\n    <button class=\"theme-toggle\" (click)=\"toggleTheme()\" [title]=\"isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'\">\n      <span class=\"theme-toggle-track\">\n        <span class=\"theme-toggle-thumb\">\n          <span *ngIf=\"!isDark\">\u2600\uFE0F</span>\n          <span *ngIf=\"isDark\">\uD83C\uDF19</span>\n        </span>\n      </span>\n      <span class=\"theme-toggle-label\">{{isDark ? 'Light Mode' : 'Dark Mode'}}</span>\n    </button>\n\n    <div style=\"position:relative\">\n      <button class=\"hdr-btn\" (click)=\"showNotif = !showNotif\">\n        \uD83D\uDD14\n        <span class=\"hdr-notif-dot\"></span>\n      </button>\n      <div class=\"notif-dropdown\" *ngIf=\"showNotif\">\n        <div class=\"notif-head\">\n          <strong>Notifications</strong>\n          <span class=\"badge badge-primary\">{{notifications.length}} new</span>\n        </div>\n        <div class=\"notif-row\" *ngFor=\"let n of notifications\">\n          <span class=\"notif-ico\">{{n.icon}}</span>\n          <div>\n            <div class=\"notif-text\">{{n.text}}</div>\n            <div class=\"notif-time\">{{n.time}}</div>\n          </div>\n        </div>\n        <div class=\"notif-row\" *ngIf=\"!notifications.length\">\n          <div>\n            <div class=\"notif-text\">No live reservation, slot, or order alerts.</div>\n            <div class=\"notif-time\">Backend synced</div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <button class=\"hdr-btn\">\u2699</button>\n    <div class=\"hdr-avatar\" *ngIf=\"user\">{{user.avatar}}</div>\n  </div>\n</header>\n", styles: ["/* All header styles are in src/styles.css via theme classes */"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.ThemeService }, { type: i3.ReservationCenterState }], { pageTitle: [{
            type: Input
        }], toggleSidebar: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Header, { className: "Header", filePath: "src/app/shared/components/header/header.ts", lineNumber: 18 }); })();
