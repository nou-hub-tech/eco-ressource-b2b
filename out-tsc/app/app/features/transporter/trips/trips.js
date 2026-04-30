import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Trips_tr_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "code", 15);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td")(5, "strong", 16);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 17);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 18);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td")(12, "span", 19);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td")(15, "strong", 20);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "span", 21);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td", 18);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const t_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(t_r1.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", t_r1.from, " \u2192 ", t_r1.to);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r1.cargo);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r1.weight);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\uD83C\uDF3F ", t_r1.co2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", t_r1.earn, " TND");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", t_r1.status === "delivered" ? "badge-success" : t_r1.status === "in-transit" ? "badge-info" : "badge-warning");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r1.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r1.date);
} }
function Trips_div_45_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵlistener("click", function Trips_div_45_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵelementStart(1, "div", 23);
    i0.ɵɵlistener("click", function Trips_div_45_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 24)(3, "h2");
    i0.ɵɵtext(4, "Log New Trip");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 25);
    i0.ɵɵlistener("click", function Trips_div_45_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 26)(8, "div", 27)(9, "label");
    i0.ɵɵtext(10, "From");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 27)(13, "label");
    i0.ɵɵtext(14, "To");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 26)(17, "div", 27)(18, "label");
    i0.ɵɵtext(19, "Cargo");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "input", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 27)(22, "label");
    i0.ɵɵtext(23, "Weight (kg)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "input", 31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 27)(26, "label");
    i0.ɵɵtext(27, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "input", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 33)(30, "button", 34);
    i0.ɵɵlistener("click", function Trips_div_45_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(31, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 3);
    i0.ɵɵlistener("click", function Trips_div_45_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(33, "Log Trip");
    i0.ɵɵelementEnd()()()();
} }
export class Trips {
    showModal = false;
    trips = [
        { id: 'DEL-1046', from: 'Gabès', to: 'Tunis', cargo: 'Steel Offcuts 2T', weight: '2,000kg', earn: 420, status: 'in-transit', date: 'Today', co2: '28kg' },
        { id: 'DEL-1043', from: 'Sousse', to: 'Tunis', cargo: 'Aluminum Scrap 1.2T', weight: '1,200kg', earn: 280, status: 'pickup', date: 'Today 15:00', co2: '18kg' },
        { id: 'DEL-1044', from: 'Sfax', to: 'Bizerte', cargo: 'Plastic Pellets 500kg', weight: '500kg', earn: 190, status: 'delivered', date: 'Yesterday', co2: '9kg' },
        { id: 'DEL-1041', from: 'Tunis', to: 'Nabeul', cargo: 'Cardboard 300kg', weight: '300kg', earn: 110, status: 'delivered', date: 'Mar 12', co2: '6kg' },
        { id: 'DEL-1038', from: 'Sfax', to: 'Tunis', cargo: 'Glass Cullet 300kg', weight: '300kg', earn: 95, status: 'delivered', date: 'Mar 10', co2: '5kg' },
    ];
    aiOpportunity = { from: 'Sfax', to: 'Tunis', cargo: 'Empty return match — load available', earn: 180 };
    ngOnInit() { }
    openModal() { this.showModal = true; }
    closeModal() { this.showModal = false; }
    static ɵfac = function Trips_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Trips)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Trips, selectors: [["app-trips"]], standalone: false, decls: 46, vars: 6, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], [1, "btn", "btn-primary", 3, "click"], [2, "padding", "16px 18px", "background", "rgba(245,158,11,.06)", "border", "1px solid rgba(245,158,11,.18)", "border-radius", "12px", "display", "flex", "align-items", "center", "justify-content", "space-between", "margin-bottom", "20px", "flex-wrap", "wrap", "gap", "12px"], [2, "display", "flex", "align-items", "center", "gap", "12px"], [2, "font-size", "24px"], [2, "font-size", "12px", "font-weight", "700", "color", "var(--accent)", "margin-bottom", "3px", "text-transform", "uppercase", "letter-spacing", ".4px"], [2, "font-size", "13px", "color", "var(--text2)"], [2, "font-family", "'Syne',sans-serif", "font-size", "18px", "font-weight", "800", "color", "var(--accent)"], [1, "btn", "btn-primary", "btn-sm"], [1, "card", 2, "padding", "0"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [2, "font-size", "11px", "color", "var(--text3)"], [2, "color", "var(--text)"], [2, "font-size", "12px", "color", "var(--text2)"], [2, "font-size", "12px", "color", "var(--text3)"], [2, "color", "var(--success,#34d399)", "font-weight", "600", "font-size", "12px"], [2, "color", "var(--accent)"], [1, "badge", 3, "ngClass"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "btn", "btn-icon", 3, "click"], [1, "form-row"], [1, "form-group"], ["type", "text", "placeholder", "Departure city"], ["type", "text", "placeholder", "Destination city"], ["type", "text", "placeholder", "What are you transporting?"], ["type", "number", "placeholder", "0"], ["type", "date"], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"]], template: function Trips_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "My Trips");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "All your delivery routes and transport history");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3);
            i0.ɵɵlistener("click", function Trips_Template_button_click_7_listener() { return ctx.openModal(); });
            i0.ɵɵtext(8, "+ Log New Trip");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "div", 5)(11, "span", 6);
            i0.ɵɵtext(12, "\uD83E\uDD16");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div")(14, "div", 7);
            i0.ɵɵtext(15, "AI Route Match");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 8);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(18, "div", 5)(19, "span", 9);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "button", 10);
            i0.ɵɵtext(22, "Accept");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(23, "div", 11)(24, "table", 12)(25, "thead")(26, "tr")(27, "th");
            i0.ɵɵtext(28, "ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "th");
            i0.ɵɵtext(30, "Route");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "th");
            i0.ɵɵtext(32, "Cargo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "th");
            i0.ɵɵtext(34, "Weight");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "th");
            i0.ɵɵtext(36, "CO\u2082 Saved");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "th");
            i0.ɵɵtext(38, "Earnings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "th");
            i0.ɵɵtext(40, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "th");
            i0.ɵɵtext(42, "Date");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "tbody");
            i0.ɵɵtemplate(44, Trips_tr_44_Template, 22, 10, "tr", 13);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(45, Trips_div_45_Template, 34, 0, "div", 14);
        } if (rf & 2) {
            i0.ɵɵadvance(17);
            i0.ɵɵtextInterpolate3("", ctx.aiOpportunity.from, " \u2192 ", ctx.aiOpportunity.to, " \u00B7 ", ctx.aiOpportunity.cargo);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("+", ctx.aiOpportunity.earn, " TND");
            i0.ɵɵadvance(24);
            i0.ɵɵproperty("ngForOf", ctx.trips);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showModal);
        } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Trips, [{
        type: Component,
        args: [{ selector: 'app-trips', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\"><h1>My Trips</h1><p>All your delivery routes and transport history</p></div>\n    <button class=\"btn btn-primary\" (click)=\"openModal()\">+ Log New Trip</button>\n  </div>\n\n  <!-- AI opportunity card -->\n  <div style=\"padding:16px 18px;background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.18);border-radius:12px;display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px\">\n    <div style=\"display:flex;align-items:center;gap:12px\">\n      <span style=\"font-size:24px\">\uD83E\uDD16</span>\n      <div>\n        <div style=\"font-size:12px;font-weight:700;color:var(--accent);margin-bottom:3px;text-transform:uppercase;letter-spacing:.4px\">AI Route Match</div>\n        <div style=\"font-size:13px;color:var(--text2)\">{{aiOpportunity.from}} \u2192 {{aiOpportunity.to}} \u00B7 {{aiOpportunity.cargo}}</div>\n      </div>\n    </div>\n    <div style=\"display:flex;align-items:center;gap:12px\">\n      <span style=\"font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--accent)\">+{{aiOpportunity.earn}} TND</span>\n      <button class=\"btn btn-primary btn-sm\">Accept</button>\n    </div>\n  </div>\n\n  <div class=\"card\" style=\"padding:0\">\n    <table class=\"data-table\">\n      <thead><tr><th>ID</th><th>Route</th><th>Cargo</th><th>Weight</th><th>CO\u2082 Saved</th><th>Earnings</th><th>Status</th><th>Date</th></tr></thead>\n      <tbody>\n        <tr *ngFor=\"let t of trips\">\n          <td><code style=\"font-size:11px;color:var(--text3)\">{{t.id}}</code></td>\n          <td><strong style=\"color:var(--text)\">{{t.from}} \u2192 {{t.to}}</strong></td>\n          <td style=\"font-size:12px;color:var(--text2)\">{{t.cargo}}</td>\n          <td style=\"font-size:12px;color:var(--text3)\">{{t.weight}}</td>\n          <td><span style=\"color:var(--success,#34d399);font-weight:600;font-size:12px\">\uD83C\uDF3F {{t.co2}}</span></td>\n          <td><strong style=\"color:var(--accent)\">{{t.earn}} TND</strong></td>\n          <td><span class=\"badge\" [ngClass]=\"t.status==='delivered'?'badge-success':t.status==='in-transit'?'badge-info':'badge-warning'\">{{t.status}}</span></td>\n          <td style=\"font-size:12px;color:var(--text3)\">{{t.date}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n<div class=\"modal-overlay\" *ngIf=\"showModal\" (click)=\"closeModal()\">\n  <div class=\"modal\" (click)=\"$event.stopPropagation()\">\n    <div class=\"modal-header\"><h2>Log New Trip</h2><button class=\"btn btn-icon\" (click)=\"closeModal()\">\u2715</button></div>\n    <div class=\"form-row\">\n      <div class=\"form-group\"><label>From</label><input type=\"text\" placeholder=\"Departure city\"></div>\n      <div class=\"form-group\"><label>To</label><input type=\"text\" placeholder=\"Destination city\"></div>\n    </div>\n    <div class=\"form-row\">\n      <div class=\"form-group\"><label>Cargo</label><input type=\"text\" placeholder=\"What are you transporting?\"></div>\n      <div class=\"form-group\"><label>Weight (kg)</label><input type=\"number\" placeholder=\"0\"></div>\n    </div>\n    <div class=\"form-group\"><label>Date</label><input type=\"date\"></div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-outline\" (click)=\"closeModal()\">Cancel</button>\n      <button class=\"btn btn-primary\" (click)=\"closeModal()\">Log Trip</button>\n    </div>\n  </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Trips, { className: "Trips", filePath: "src/app/features/transporter/trips/trips.ts", lineNumber: 3 }); })();
