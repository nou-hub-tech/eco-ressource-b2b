import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Events_div_10_button_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵtext(1, "Join Event");
    i0.ɵɵelementEnd();
} }
function Events_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 8)(2, "span", 9);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 10);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h3", 11);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 12)(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 13)(16, "button", 14);
    i0.ɵɵtext(17, "View Details");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, Events_div_10_button_18_Template, 2, 0, "button", 15);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const e_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(e_r1.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", e_r1.status === "upcoming" ? "badge-primary" : e_r1.status === "ongoing" ? "badge-success" : "badge-neutral");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", e_r1.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", e_r1.title, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\uD83D\uDCC5 ", e_r1.date);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\uD83D\uDCCD ", e_r1.location);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\uD83D\uDC65 ", e_r1.participants, " participants");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", e_r1.status !== "done");
} }
function Events_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵlistener("click", function Events_div_11_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵelementStart(1, "div", 18);
    i0.ɵɵlistener("click", function Events_div_11_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 19)(3, "h2");
    i0.ɵɵtext(4, "Create Event");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 20);
    i0.ɵɵlistener("click", function Events_div_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 21)(8, "label");
    i0.ɵɵtext(9, "Event Title");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "input", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 23)(12, "div", 21)(13, "label");
    i0.ɵɵtext(14, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 21)(17, "label");
    i0.ɵɵtext(18, "Location");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 21)(21, "label");
    i0.ɵɵtext(22, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "textarea", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 27)(25, "button", 28);
    i0.ɵɵlistener("click", function Events_div_11_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(26, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 3);
    i0.ɵɵlistener("click", function Events_div_11_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(28, "Create");
    i0.ɵɵelementEnd()()()();
} }
export class Events {
    showModal = false;
    events = [
        { title: 'B2B Industrial Fair 2025', date: '2025-04-10', location: 'Tunis', participants: 42, status: 'upcoming', type: 'Conference' },
        { title: 'Circular Economy Workshop', date: '2025-03-28', location: 'Sfax', participants: 18, status: 'ongoing', type: 'Workshop' },
        { title: 'Recycling Summit', date: '2025-02-15', location: 'Sousse', participants: 95, status: 'done', type: 'Summit' },
        { title: 'Green Logistics Day', date: '2025-05-05', location: 'Bizerte', participants: 30, status: 'upcoming', type: 'Event' },
    ];
    ngOnInit() { }
    openModal() { this.showModal = true; }
    closeModal() { this.showModal = false; }
    static ɵfac = function Events_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Events)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Events, selectors: [["app-events"]], standalone: false, decls: 12, vars: 2, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], [1, "btn", "btn-primary", 3, "click"], [1, "grid-2"], ["class", "card", "style", "padding:20px", 4, "ngFor", "ngForOf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "card", 2, "padding", "20px"], [2, "display", "flex", "justify-content", "space-between", "align-items", "flex-start", "margin-bottom", "12px"], [1, "badge", "badge-info"], [1, "badge", 3, "ngClass"], [2, "font-family", "'Syne',sans-serif", "font-size", "15px", "font-weight", "700", "color", "var(--text)", "margin-bottom", "10px"], [2, "display", "flex", "flex-wrap", "wrap", "gap", "12px", "font-size", "12px", "color", "var(--text3)", "margin-bottom", "14px"], [2, "display", "flex", "gap", "8px"], [1, "btn", "btn-outline", "btn-sm"], ["class", "btn btn-primary btn-sm", 4, "ngIf"], [1, "btn", "btn-primary", "btn-sm"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "btn", "btn-icon", 3, "click"], [1, "form-group"], ["type", "text", "placeholder", "Event name"], [1, "form-row"], ["type", "date"], ["type", "text", "placeholder", "City"], ["placeholder", "Describe the event..."], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"]], template: function Events_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Events & Campaigns");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Browse and participate in B2B events and circular economy campaigns");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3);
            i0.ɵɵlistener("click", function Events_Template_button_click_7_listener() { return ctx.openModal(); });
            i0.ɵɵtext(8, "+ Create Event");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4);
            i0.ɵɵtemplate(10, Events_div_10_Template, 19, 8, "div", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(11, Events_div_11_Template, 29, 0, "div", 6);
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngForOf", ctx.events);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showModal);
        } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Events, [{
        type: Component,
        args: [{ selector: 'app-events', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\">\n      <h1>Events & Campaigns</h1>\n      <p>Browse and participate in B2B events and circular economy campaigns</p>\n    </div>\n    <button class=\"btn btn-primary\" (click)=\"openModal()\">+ Create Event</button>\n  </div>\n  <div class=\"grid-2\">\n    <div class=\"card\" *ngFor=\"let e of events\" style=\"padding:20px\">\n      <div style=\"display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px\">\n        <span class=\"badge badge-info\">{{e.type}}</span>\n        <span class=\"badge\"\n          [ngClass]=\"e.status==='upcoming'?'badge-primary':e.status==='ongoing'?'badge-success':'badge-neutral'\">\n          {{e.status}}\n        </span>\n      </div>\n      <h3 style=\"font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--text);margin-bottom:10px\">\n        {{e.title}}\n      </h3>\n      <div style=\"display:flex;flex-wrap:wrap;gap:12px;font-size:12px;color:var(--text3);margin-bottom:14px\">\n        <span>\uD83D\uDCC5 {{e.date}}</span>\n        <span>\uD83D\uDCCD {{e.location}}</span>\n        <span>\uD83D\uDC65 {{e.participants}} participants</span>\n      </div>\n      <div style=\"display:flex;gap:8px\">\n        <button class=\"btn btn-outline btn-sm\">View Details</button>\n        <button class=\"btn btn-primary btn-sm\" *ngIf=\"e.status!=='done'\">Join Event</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-overlay\" *ngIf=\"showModal\" (click)=\"closeModal()\">\n  <div class=\"modal\" (click)=\"$event.stopPropagation()\">\n    <div class=\"modal-header\">\n      <h2>Create Event</h2>\n      <button class=\"btn btn-icon\" (click)=\"closeModal()\">\u2715</button>\n    </div>\n    <div class=\"form-group\"><label>Event Title</label><input type=\"text\" placeholder=\"Event name\"></div>\n    <div class=\"form-row\">\n      <div class=\"form-group\"><label>Date</label><input type=\"date\"></div>\n      <div class=\"form-group\"><label>Location</label><input type=\"text\" placeholder=\"City\"></div>\n    </div>\n    <div class=\"form-group\"><label>Description</label><textarea placeholder=\"Describe the event...\"></textarea></div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-outline\" (click)=\"closeModal()\">Cancel</button>\n      <button class=\"btn btn-primary\" (click)=\"closeModal()\">Create</button>\n    </div>\n  </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Events, { className: "Events", filePath: "src/app/features/admin/events/events.ts", lineNumber: 9 }); })();
