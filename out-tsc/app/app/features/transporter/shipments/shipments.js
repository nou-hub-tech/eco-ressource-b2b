import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Shipments_div_7_button_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵtext(1, "Confirm Pickup");
    i0.ɵɵelementEnd();
} }
function Shipments_div_7_button_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵtext(1, "Mark Delivered");
    i0.ɵɵelementEnd();
} }
function Shipments_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "div", 5)(2, "div")(3, "div", 6)(4, "code", 7);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 8);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 9);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 10);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 11)(13, "div", 12);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 13);
    i0.ɵɵtext(16, "Earnings");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 14)(18, "div")(19, "div", 15);
    i0.ɵɵtext(20, "Route");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 16);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div")(24, "div", 15);
    i0.ɵɵtext(25, "Pickup");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 17);
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div")(29, "div", 15);
    i0.ɵɵtext(30, "Delivery");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 17);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "div", 18);
    i0.ɵɵtemplate(34, Shipments_div_7_button_34_Template, 2, 0, "button", 19)(35, Shipments_div_7_button_35_Template, 2, 0, "button", 19);
    i0.ɵɵelementStart(36, "button", 20);
    i0.ɵɵtext(37, "QR Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "button", 21);
    i0.ɵɵtext(39, "Contact Client");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", s_r1.status === "delivered" ? "badge-success" : s_r1.status === "in-transit" ? "badge-info" : "badge-warning");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r1.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.product);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Client: ", s_r1.client);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", s_r1.earn, " TND");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate2("", s_r1.from, " \u2192 ", s_r1.to);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r1.pickup);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r1.delivery);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", s_r1.status === "pickup");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r1.status === "in-transit");
} }
export class Shipments {
    shipments = [
        { id: 'DEL-1046', client: 'Industrie Slim', product: 'Steel Offcuts 2T', from: 'Gabès', to: 'Tunis', status: 'in-transit', pickup: 'Today 09:00', delivery: 'Today 17:00', earn: 420 },
        { id: 'DEL-1043', client: 'Textile Mona', product: 'Aluminum Scrap 1.2T', from: 'Sousse', to: 'Tunis', status: 'pickup', pickup: 'Today 15:00', delivery: 'Today 19:00', earn: 280 },
        { id: 'DEL-1044', client: 'Chimie Anis', product: 'Plastic Pellets 500kg', from: 'Sfax', to: 'Bizerte', status: 'delivered', pickup: 'Yesterday', delivery: 'Yesterday', earn: 190 },
    ];
    ngOnInit() { }
    static ɵfac = function Shipments_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Shipments)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Shipments, selectors: [["app-shipments"]], standalone: false, decls: 8, vars: 1, consts: [[1, "page-wrapper"], [1, "page-header"], [2, "display", "flex", "flex-direction", "column", "gap", "14px"], ["class", "card", "style", "padding:20px", 4, "ngFor", "ngForOf"], [1, "card", 2, "padding", "20px"], [2, "display", "flex", "align-items", "flex-start", "justify-content", "space-between", "margin-bottom", "14px", "flex-wrap", "wrap", "gap", "10px"], [2, "display", "flex", "align-items", "center", "gap", "10px", "margin-bottom", "6px"], [2, "font-size", "12px", "color", "var(--text3)", "font-weight", "500"], [1, "badge", 3, "ngClass"], [2, "font-family", "'Syne',sans-serif", "font-size", "16px", "font-weight", "700", "color", "var(--text)", "margin-bottom", "4px"], [2, "font-size", "12px", "color", "var(--text3)"], [2, "text-align", "right"], [2, "font-family", "'Syne',sans-serif", "font-size", "22px", "font-weight", "800", "color", "var(--accent)"], [2, "font-size", "11px", "color", "var(--text3)", "margin-top", "2px"], [2, "display", "grid", "grid-template-columns", "1fr 1fr 1fr", "gap", "16px", "padding", "14px", "background", "var(--bg3,var(--bg2))", "border-radius", "8px", "border", "1px solid var(--border)", "margin-bottom", "14px"], [2, "font-size", "10px", "font-weight", "700", "text-transform", "uppercase", "letter-spacing", ".4px", "color", "var(--text3)", "margin-bottom", "4px"], [2, "font-size", "13px", "font-weight", "600", "color", "var(--text)"], [2, "font-size", "13px", "color", "var(--text2)"], [2, "display", "flex", "gap", "8px"], ["class", "btn btn-primary btn-sm", 4, "ngIf"], [1, "btn", "btn-outline", "btn-sm"], [1, "btn", "btn-ghost", "btn-sm"], [1, "btn", "btn-primary", "btn-sm"]], template: function Shipments_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h1");
            i0.ɵɵtext(3, "Shipments");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5, "Detailed view of all cargo and delivery assignments");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 2);
            i0.ɵɵtemplate(7, Shipments_div_7_Template, 40, 12, "div", 3);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.shipments);
        } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Shipments, [{
        type: Component,
        args: [{ selector: 'app-shipments', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header\"><h1>Shipments</h1><p>Detailed view of all cargo and delivery assignments</p></div>\n  <div style=\"display:flex;flex-direction:column;gap:14px\">\n    <div class=\"card\" *ngFor=\"let s of shipments\" style=\"padding:20px\">\n      <div style=\"display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px\">\n        <div>\n          <div style=\"display:flex;align-items:center;gap:10px;margin-bottom:6px\">\n            <code style=\"font-size:12px;color:var(--text3);font-weight:500\">{{s.id}}</code>\n            <span class=\"badge\" [ngClass]=\"s.status==='delivered'?'badge-success':s.status==='in-transit'?'badge-info':'badge-warning'\">{{s.status}}</span>\n          </div>\n          <div style=\"font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:var(--text);margin-bottom:4px\">{{s.product}}</div>\n          <div style=\"font-size:12px;color:var(--text3)\">Client: {{s.client}}</div>\n        </div>\n        <div style=\"text-align:right\">\n          <div style=\"font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:var(--accent)\">{{s.earn}} TND</div>\n          <div style=\"font-size:11px;color:var(--text3);margin-top:2px\">Earnings</div>\n        </div>\n      </div>\n      <div style=\"display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;padding:14px;background:var(--bg3,var(--bg2));border-radius:8px;border:1px solid var(--border);margin-bottom:14px\">\n        <div>\n          <div style=\"font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:var(--text3);margin-bottom:4px\">Route</div>\n          <div style=\"font-size:13px;font-weight:600;color:var(--text)\">{{s.from}} \u2192 {{s.to}}</div>\n        </div>\n        <div>\n          <div style=\"font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:var(--text3);margin-bottom:4px\">Pickup</div>\n          <div style=\"font-size:13px;color:var(--text2)\">{{s.pickup}}</div>\n        </div>\n        <div>\n          <div style=\"font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:var(--text3);margin-bottom:4px\">Delivery</div>\n          <div style=\"font-size:13px;color:var(--text2)\">{{s.delivery}}</div>\n        </div>\n      </div>\n      <div style=\"display:flex;gap:8px\">\n        <button class=\"btn btn-primary btn-sm\" *ngIf=\"s.status==='pickup'\">Confirm Pickup</button>\n        <button class=\"btn btn-primary btn-sm\" *ngIf=\"s.status==='in-transit'\">Mark Delivered</button>\n        <button class=\"btn btn-outline btn-sm\">QR Code</button>\n        <button class=\"btn btn-ghost btn-sm\">Contact Client</button>\n      </div>\n    </div>\n  </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Shipments, { className: "Shipments", filePath: "src/app/features/transporter/shipments/shipments.ts", lineNumber: 3 }); })();
