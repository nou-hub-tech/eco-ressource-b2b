import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Requests_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.pendingCount, " pending response ");
} }
function Requests_div_18_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1, " \u26A1 New request \u2014 waiting for your response ");
    i0.ɵɵelementEnd();
} }
function Requests_div_18_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "button", 28);
    i0.ɵɵlistener("click", function Requests_div_18_div_28_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r2); const r_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.accept(r_r3)); });
    i0.ɵɵtext(2, "\u2713 Accept");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 29);
    i0.ɵɵlistener("click", function Requests_div_18_div_28_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r2); const r_r3 = i0.ɵɵnextContext().$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.decline(r_r3)); });
    i0.ɵɵtext(4, "\u2715 Decline");
    i0.ɵɵelementEnd()();
} }
function Requests_div_18_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "span", 30);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const r_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", r_r3.status === "accepted" ? "accepted" : "declined");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", r_r3.status === "accepted" ? "\u2713 Accepted" : "\u2715 Declined", " ");
} }
function Requests_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtemplate(1, Requests_div_18_div_1_Template, 2, 0, "div", 10);
    i0.ɵɵelementStart(2, "div", 11)(3, "div", 12)(4, "div", 13);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "div", 14);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 15);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 16)(12, "div", 17);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 18)(15, "span", 19);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 20);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 20);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 20);
    i0.ɵɵtext(22, "\uD83D\uDCB0 ");
    i0.ɵɵelementStart(23, "strong");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 21);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "div", 22);
    i0.ɵɵtemplate(28, Requests_div_18_div_28_Template, 5, 0, "div", 23)(29, Requests_div_18_div_29_Template, 3, 2, "div", 24);
    i0.ɵɵelementStart(30, "div", 25);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const r_r3 = ctx.$implicit;
    i0.ɵɵclassProp("urgent", r_r3.urgent && r_r3.status === "pending");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", r_r3.urgent && r_r3.status === "pending");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(r_r3.avatar);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r3.from);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r3.received);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r3.item);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(r_r3.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("\uD83D\uDCC5 ", r_r3.from_date, " \u2192 ", r_r3.to_date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u23F1 ", r_r3.duration);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", r_r3.price, " TND");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\"", r_r3.message, "\"");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", r_r3.status === "pending");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", r_r3.status !== "pending");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r3.id);
} }
function Requests_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31)(1, "span");
    i0.ɵɵtext(2, "\uD83D\uDCED");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No requests here");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "When companies request your resources, they'll appear here");
    i0.ɵɵelementEnd()();
} }
export class Requests {
    filter = 'all';
    requests = [
        {
            id: 'REQ-001',
            from: 'Textile Mona SA',
            avatar: 'TM',
            item: 'CNC Milling Machine',
            type: 'Machine Rental',
            from_date: '2025-03-25',
            to_date: '2025-03-27',
            duration: '2 days',
            price: 400,
            message: 'We need your CNC machine for a short production run. We will ensure full care and return on time.',
            status: 'pending',
            received: '10 min ago',
            urgent: true
        },
        {
            id: 'REQ-002',
            from: 'Chimie Anis SARL',
            avatar: 'CA',
            item: 'Warehouse Zone B — 200m²',
            type: 'Space Rental',
            from_date: '2025-04-01',
            to_date: '2025-04-15',
            duration: '15 days',
            price: 1200,
            message: 'Temporary storage needed for chemical raw materials. Certified handling team.',
            status: 'pending',
            received: '2 hrs ago',
            urgent: false
        },
        {
            id: 'REQ-003',
            from: 'Métallurgie Sud',
            avatar: 'MS',
            item: 'Aluminum Scrap — 500kg batch',
            type: 'Material Purchase',
            from_date: '2025-03-22',
            to_date: '2025-03-22',
            duration: 'One-time',
            price: 600,
            message: 'Interested in buying 500kg from your current batch. Can arrange pickup.',
            status: 'accepted',
            received: 'Yesterday',
            urgent: false
        },
        {
            id: 'REQ-004',
            from: 'Vitro Indinya',
            avatar: 'VI',
            item: 'Hydraulic Press',
            type: 'Machine Rental',
            from_date: '2025-03-18',
            to_date: '2025-03-19',
            duration: '1 day',
            price: 180,
            message: 'Quick rental needed for a single day production batch.',
            status: 'declined',
            received: '3 days ago',
            urgent: false
        },
    ];
    get filtered() {
        if (this.filter === 'all')
            return this.requests;
        return this.requests.filter(r => r.status === this.filter);
    }
    get pendingCount() {
        return this.requests.filter(r => r.status === 'pending').length;
    }
    accept(req) { req.status = 'accepted'; }
    decline(req) { req.status = 'declined'; }
    ngOnInit() { }
    static ɵfac = function Requests_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Requests)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Requests, selectors: [["app-requests"]], standalone: false, decls: 20, vars: 13, consts: [[1, "req-shell"], [1, "req-header"], ["class", "req-pending-badge", 4, "ngIf"], [1, "req-filters"], [1, "req-filter-btn", 3, "click"], [1, "req-list"], ["class", "req-card", 3, "urgent", 4, "ngFor", "ngForOf"], ["class", "req-empty", 4, "ngIf"], [1, "req-pending-badge"], [1, "req-card"], ["class", "req-urgent-bar", 4, "ngIf"], [1, "req-card-body"], [1, "req-from"], [1, "req-avatar"], [1, "req-company"], [1, "req-received"], [1, "req-details"], [1, "req-item-name"], [1, "req-meta-row"], [1, "req-type-badge"], [1, "req-meta-item"], [1, "req-message"], [1, "req-actions"], ["class", "req-action-btns", 4, "ngIf"], [4, "ngIf"], [1, "req-id"], [1, "req-urgent-bar"], [1, "req-action-btns"], [1, "req-accept-btn", 3, "click"], [1, "req-decline-btn", 3, "click"], [1, "req-status-badge", 3, "ngClass"], [1, "req-empty"]], template: function Requests_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1");
            i0.ɵɵtext(4, "Incoming Requests");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Review and respond to reservation and purchase requests from other companies");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, Requests_div_7_Template, 2, 1, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 3)(9, "button", 4);
            i0.ɵɵlistener("click", function Requests_Template_button_click_9_listener() { return ctx.filter = "all"; });
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "button", 4);
            i0.ɵɵlistener("click", function Requests_Template_button_click_11_listener() { return ctx.filter = "pending"; });
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 4);
            i0.ɵɵlistener("click", function Requests_Template_button_click_13_listener() { return ctx.filter = "accepted"; });
            i0.ɵɵtext(14, "Accepted");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 4);
            i0.ɵɵlistener("click", function Requests_Template_button_click_15_listener() { return ctx.filter = "declined"; });
            i0.ɵɵtext(16, "Declined");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 5);
            i0.ɵɵtemplate(18, Requests_div_18_Template, 32, 16, "div", 6)(19, Requests_div_19_Template, 7, 0, "div", 7);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.pendingCount > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.filter === "all");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("All (", ctx.requests.length, ")");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.filter === "pending");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("Pending (", ctx.pendingCount, ")");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.filter === "accepted");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.filter === "declined");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.filtered);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.filtered.length === 0);
        } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf], styles: [".req-shell[_ngcontent-%COMP%] { padding: 28px 32px; max-width: 1000px; }\n\n.req-header[_ngcontent-%COMP%] { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 22px; flex-wrap: wrap; gap: 12px; }\n.req-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text); letter-spacing: -.4px; margin-bottom: 4px; }\n.req-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { font-size: 13px; color: var(--text3); }\n.req-pending-badge[_ngcontent-%COMP%] { padding: 8px 16px; background: #fef3c7; border: 1px solid #fde68a; border-radius: 100px; font-size: 12px; font-weight: 700; color: #92400e; }\n\n.req-filters[_ngcontent-%COMP%] { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }\n.req-filter-btn[_ngcontent-%COMP%] { padding: 7px 18px; border-radius: 100px; border: 1px solid var(--border); background: var(--card); color: var(--text3); font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Space Grotesk', sans-serif; transition: all .15s; }\n.req-filter-btn[_ngcontent-%COMP%]:hover { border-color: var(--primary); color: var(--primary); }\n.req-filter-btn.active[_ngcontent-%COMP%] { background: var(--primary); color: #fff; border-color: var(--primary); }\n.theme-enterprise[_ngcontent-%COMP%]   .req-filter-btn.active[_ngcontent-%COMP%] { color: #fff; }\n\n.req-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 12px; }\n\n.req-card[_ngcontent-%COMP%] { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; transition: all .2s; }\n.req-card[_ngcontent-%COMP%]:hover { border-color: var(--border2); box-shadow: 0 4px 16px rgba(0,0,0,.06); }\n.theme-enterprise[_ngcontent-%COMP%]   .req-card[_ngcontent-%COMP%]:hover { box-shadow: 0 4px 20px rgba(2,132,199,.08); }\n.req-card.urgent[_ngcontent-%COMP%] { border-color: #fbbf24; }\n\n.req-urgent-bar[_ngcontent-%COMP%] { background: #fffbeb; border-bottom: 1px solid #fde68a; padding: 8px 20px; font-size: 12px; font-weight: 700; color: #92400e; display: flex; align-items: center; gap: 6px; }\n\n.req-card-body[_ngcontent-%COMP%] { display: flex; align-items: flex-start; gap: 20px; padding: 20px; flex-wrap: wrap; }\n\n.req-from[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; min-width: 160px; flex-shrink: 0; }\n.req-avatar[_ngcontent-%COMP%] { width: 44px; height: 44px; border-radius: 10px; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }\n.theme-enterprise[_ngcontent-%COMP%]   .req-avatar[_ngcontent-%COMP%] { background: linear-gradient(135deg,#0284c7,#38bdf8); }\n.req-company[_ngcontent-%COMP%] { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 3px; }\n.req-received[_ngcontent-%COMP%] { font-size: 11px; color: var(--text3); }\n\n.req-details[_ngcontent-%COMP%] { flex: 1; min-width: 0; }\n.req-item-name[_ngcontent-%COMP%] { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 10px; }\n.req-meta-row[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 10px; }\n.req-type-badge[_ngcontent-%COMP%] { padding: 3px 10px; background: var(--secondary, #eff6ff); color: var(--primary); border-radius: 100px; font-size: 11px; font-weight: 700; border: 1px solid var(--border); }\n.req-meta-item[_ngcontent-%COMP%] { font-size: 12px; color: var(--text3); }\n.req-meta-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: var(--primary); font-weight: 700; }\n.req-message[_ngcontent-%COMP%] { font-size: 12px; color: var(--text2); font-style: italic; line-height: 1.5; padding: 10px 14px; background: var(--bg3, var(--secondary, #f8fafc)); border-radius: 8px; border-left: 3px solid var(--border2); }\n\n.req-actions[_ngcontent-%COMP%] { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex-shrink: 0; }\n.req-action-btns[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 8px; }\n.req-accept-btn[_ngcontent-%COMP%] { padding: 10px 22px; background: #059669; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Space Grotesk', sans-serif; transition: background .15s; white-space: nowrap; }\n.req-accept-btn[_ngcontent-%COMP%]:hover { background: #047857; }\n.req-decline-btn[_ngcontent-%COMP%] { padding: 10px 22px; background: transparent; color: #dc2626; border: 1px solid #fecaca; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Space Grotesk', sans-serif; transition: all .15s; white-space: nowrap; }\n.req-decline-btn[_ngcontent-%COMP%]:hover { background: #fef2f2; }\n.req-status-badge[_ngcontent-%COMP%] { display: inline-flex; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; }\n.req-status-badge.accepted[_ngcontent-%COMP%] { background: #d1fae5; color: #065f46; }\n.req-status-badge.declined[_ngcontent-%COMP%] { background: #fee2e2; color: #991b1b; }\n.req-id[_ngcontent-%COMP%] { font-size: 10px; color: var(--text3); font-family: 'DM Mono', monospace; }\n\n.req-empty[_ngcontent-%COMP%] { text-align: center; padding: 56px 24px; }\n.req-empty[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 48px; display: block; margin-bottom: 16px; opacity: .3; }\n.req-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { font-family: 'Syne', sans-serif; font-size: 16px; color: var(--text2); margin-bottom: 6px; }\n.req-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { font-size: 13px; color: var(--text3); }\n\n@media (max-width: 700px) { .req-card-body[_ngcontent-%COMP%] { flex-direction: column; } .req-actions[_ngcontent-%COMP%] { align-items: flex-start; } .req-action-btns[_ngcontent-%COMP%] { flex-direction: row; } .req-shell[_ngcontent-%COMP%] { padding: 16px; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Requests, [{
        type: Component,
        args: [{ selector: 'app-requests', standalone: false, template: "<div class=\"req-shell\">\n\n  <!-- HEADER -->\n  <div class=\"req-header\">\n    <div>\n      <h1>Incoming Requests</h1>\n      <p>Review and respond to reservation and purchase requests from other companies</p>\n    </div>\n    <div class=\"req-pending-badge\" *ngIf=\"pendingCount > 0\">\n      {{pendingCount}} pending response\n    </div>\n  </div>\n\n  <!-- FILTERS -->\n  <div class=\"req-filters\">\n    <button class=\"req-filter-btn\" [class.active]=\"filter==='all'\"     (click)=\"filter='all'\">All ({{requests.length}})</button>\n    <button class=\"req-filter-btn\" [class.active]=\"filter==='pending'\"  (click)=\"filter='pending'\">Pending ({{pendingCount}})</button>\n    <button class=\"req-filter-btn\" [class.active]=\"filter==='accepted'\" (click)=\"filter='accepted'\">Accepted</button>\n    <button class=\"req-filter-btn\" [class.active]=\"filter==='declined'\" (click)=\"filter='declined'\">Declined</button>\n  </div>\n\n  <!-- REQUEST CARDS -->\n  <div class=\"req-list\">\n    <div class=\"req-card\" *ngFor=\"let r of filtered\" [class.urgent]=\"r.urgent && r.status==='pending'\">\n\n      <!-- URGENT BANNER -->\n      <div class=\"req-urgent-bar\" *ngIf=\"r.urgent && r.status==='pending'\">\n        \u26A1 New request \u2014 waiting for your response\n      </div>\n\n      <div class=\"req-card-body\">\n\n        <!-- LEFT: Company info -->\n        <div class=\"req-from\">\n          <div class=\"req-avatar\">{{r.avatar}}</div>\n          <div>\n            <div class=\"req-company\">{{r.from}}</div>\n            <div class=\"req-received\">{{r.received}}</div>\n          </div>\n        </div>\n\n        <!-- CENTER: Request details -->\n        <div class=\"req-details\">\n          <div class=\"req-item-name\">{{r.item}}</div>\n          <div class=\"req-meta-row\">\n            <span class=\"req-type-badge\">{{r.type}}</span>\n            <span class=\"req-meta-item\">\uD83D\uDCC5 {{r.from_date}} \u2192 {{r.to_date}}</span>\n            <span class=\"req-meta-item\">\u23F1 {{r.duration}}</span>\n            <span class=\"req-meta-item\">\uD83D\uDCB0 <strong>{{r.price}} TND</strong></span>\n          </div>\n          <div class=\"req-message\">\"{{r.message}}\"</div>\n        </div>\n\n        <!-- RIGHT: Status + Actions -->\n        <div class=\"req-actions\">\n          <div *ngIf=\"r.status === 'pending'\" class=\"req-action-btns\">\n            <button class=\"req-accept-btn\" (click)=\"accept(r)\">\u2713 Accept</button>\n            <button class=\"req-decline-btn\" (click)=\"decline(r)\">\u2715 Decline</button>\n          </div>\n          <div *ngIf=\"r.status !== 'pending'\">\n            <span class=\"req-status-badge\" [ngClass]=\"r.status === 'accepted' ? 'accepted' : 'declined'\">\n              {{ r.status === 'accepted' ? '\u2713 Accepted' : '\u2715 Declined' }}\n            </span>\n          </div>\n          <div class=\"req-id\">{{r.id}}</div>\n        </div>\n\n      </div>\n    </div>\n\n    <!-- EMPTY STATE -->\n    <div class=\"req-empty\" *ngIf=\"filtered.length === 0\">\n      <span>\uD83D\uDCED</span>\n      <h3>No requests here</h3>\n      <p>When companies request your resources, they'll appear here</p>\n    </div>\n  </div>\n\n</div>", styles: [".req-shell { padding: 28px 32px; max-width: 1000px; }\n\n.req-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 22px; flex-wrap: wrap; gap: 12px; }\n.req-header h1 { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text); letter-spacing: -.4px; margin-bottom: 4px; }\n.req-header p { font-size: 13px; color: var(--text3); }\n.req-pending-badge { padding: 8px 16px; background: #fef3c7; border: 1px solid #fde68a; border-radius: 100px; font-size: 12px; font-weight: 700; color: #92400e; }\n\n.req-filters { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }\n.req-filter-btn { padding: 7px 18px; border-radius: 100px; border: 1px solid var(--border); background: var(--card); color: var(--text3); font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Space Grotesk', sans-serif; transition: all .15s; }\n.req-filter-btn:hover { border-color: var(--primary); color: var(--primary); }\n.req-filter-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }\n.theme-enterprise .req-filter-btn.active { color: #fff; }\n\n.req-list { display: flex; flex-direction: column; gap: 12px; }\n\n.req-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; transition: all .2s; }\n.req-card:hover { border-color: var(--border2); box-shadow: 0 4px 16px rgba(0,0,0,.06); }\n.theme-enterprise .req-card:hover { box-shadow: 0 4px 20px rgba(2,132,199,.08); }\n.req-card.urgent { border-color: #fbbf24; }\n\n.req-urgent-bar { background: #fffbeb; border-bottom: 1px solid #fde68a; padding: 8px 20px; font-size: 12px; font-weight: 700; color: #92400e; display: flex; align-items: center; gap: 6px; }\n\n.req-card-body { display: flex; align-items: flex-start; gap: 20px; padding: 20px; flex-wrap: wrap; }\n\n.req-from { display: flex; align-items: center; gap: 12px; min-width: 160px; flex-shrink: 0; }\n.req-avatar { width: 44px; height: 44px; border-radius: 10px; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }\n.theme-enterprise .req-avatar { background: linear-gradient(135deg,#0284c7,#38bdf8); }\n.req-company { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 3px; }\n.req-received { font-size: 11px; color: var(--text3); }\n\n.req-details { flex: 1; min-width: 0; }\n.req-item-name { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 10px; }\n.req-meta-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 10px; }\n.req-type-badge { padding: 3px 10px; background: var(--secondary, #eff6ff); color: var(--primary); border-radius: 100px; font-size: 11px; font-weight: 700; border: 1px solid var(--border); }\n.req-meta-item { font-size: 12px; color: var(--text3); }\n.req-meta-item strong { color: var(--primary); font-weight: 700; }\n.req-message { font-size: 12px; color: var(--text2); font-style: italic; line-height: 1.5; padding: 10px 14px; background: var(--bg3, var(--secondary, #f8fafc)); border-radius: 8px; border-left: 3px solid var(--border2); }\n\n.req-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex-shrink: 0; }\n.req-action-btns { display: flex; flex-direction: column; gap: 8px; }\n.req-accept-btn { padding: 10px 22px; background: #059669; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Space Grotesk', sans-serif; transition: background .15s; white-space: nowrap; }\n.req-accept-btn:hover { background: #047857; }\n.req-decline-btn { padding: 10px 22px; background: transparent; color: #dc2626; border: 1px solid #fecaca; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Space Grotesk', sans-serif; transition: all .15s; white-space: nowrap; }\n.req-decline-btn:hover { background: #fef2f2; }\n.req-status-badge { display: inline-flex; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; }\n.req-status-badge.accepted { background: #d1fae5; color: #065f46; }\n.req-status-badge.declined { background: #fee2e2; color: #991b1b; }\n.req-id { font-size: 10px; color: var(--text3); font-family: 'DM Mono', monospace; }\n\n.req-empty { text-align: center; padding: 56px 24px; }\n.req-empty span { font-size: 48px; display: block; margin-bottom: 16px; opacity: .3; }\n.req-empty h3 { font-family: 'Syne', sans-serif; font-size: 16px; color: var(--text2); margin-bottom: 6px; }\n.req-empty p { font-size: 13px; color: var(--text3); }\n\n@media (max-width: 700px) { .req-card-body { flex-direction: column; } .req-actions { align-items: flex-start; } .req-action-btns { flex-direction: row; } .req-shell { padding: 16px; } }"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Requests, { className: "Requests", filePath: "src/app/features/enterprise/requests/requests.ts", lineNumber: 9 }); })();
