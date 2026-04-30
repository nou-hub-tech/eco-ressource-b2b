import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function MyDeliveries_tr_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "code", 5);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td")(5, "strong", 6);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 7);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 8);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td")(12, "span", 9);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td")(15, "strong", 10);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "span", 11);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td", 12);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const d_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(d_r1.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(d_r1.product);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", d_r1.from, " \u2192 ", d_r1.to);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(d_r1.transporter);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\uD83C\uDF3F ", d_r1.co2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", d_r1.amount, " TND");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", d_r1.status === "delivered" ? "badge-success" : d_r1.status === "in-transit" ? "badge-info" : "badge-warning");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(d_r1.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(d_r1.date);
} }
export class MyDeliveries {
    deliveries = [
        { id: 'DEL-1042', product: 'Aluminum Scrap 2T', from: 'Tunis', to: 'Sfax', transporter: 'Karim Transport', status: 'delivered', co2: '12kg', date: 'Mar 10', amount: 1200 },
        { id: 'DEL-1043', product: 'Cardboard Bales 1T', from: 'Sousse', to: 'Tunis', transporter: 'Sana Transport', status: 'in-transit', co2: '18kg', date: 'Mar 14', amount: 180 },
        { id: 'DEL-1044', product: 'Steel Offcuts 800kg', from: 'Sfax', to: 'Bizerte', transporter: 'Karim Transport', status: 'pending', co2: '9kg', date: 'Mar 15', amount: 620 },
    ];
    ngOnInit() { }
    static ɵfac = function MyDeliveries_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MyDeliveries)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MyDeliveries, selectors: [["app-my-deliveries"]], standalone: false, decls: 28, vars: 1, consts: [[1, "page-wrapper"], [1, "page-header"], [1, "card", 2, "padding", "0"], [1, "data-table"], [4, "ngFor", "ngForOf"], [2, "font-size", "11px", "color", "var(--text3)"], [2, "color", "var(--text)"], [2, "color", "var(--text2)", "font-size", "12px"], [2, "color", "var(--text2)"], [2, "color", "var(--success,#059669)", "font-weight", "600", "font-size", "12px"], [2, "color", "var(--primary)"], [1, "badge", 3, "ngClass"], [2, "color", "var(--text3)", "font-size", "12px"]], template: function MyDeliveries_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h1");
            i0.ɵɵtext(3, "My Deliveries");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5, "Track all your shipments and logistics operations");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 2)(7, "table", 3)(8, "thead")(9, "tr")(10, "th");
            i0.ɵɵtext(11, "ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "th");
            i0.ɵɵtext(13, "Product");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "th");
            i0.ɵɵtext(15, "Route");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "th");
            i0.ɵɵtext(17, "Transporter");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "th");
            i0.ɵɵtext(19, "CO\u2082 Saved");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "th");
            i0.ɵɵtext(21, "Amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "th");
            i0.ɵɵtext(23, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "th");
            i0.ɵɵtext(25, "Date");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "tbody");
            i0.ɵɵtemplate(27, MyDeliveries_tr_27_Template, 22, 10, "tr", 4);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(27);
            i0.ɵɵproperty("ngForOf", ctx.deliveries);
        } }, dependencies: [i1.NgClass, i1.NgForOf], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MyDeliveries, [{
        type: Component,
        args: [{ selector: 'app-my-deliveries', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header\"><h1>My Deliveries</h1><p>Track all your shipments and logistics operations</p></div>\n  <div class=\"card\" style=\"padding:0\">\n    <table class=\"data-table\">\n      <thead><tr><th>ID</th><th>Product</th><th>Route</th><th>Transporter</th><th>CO\u2082 Saved</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>\n      <tbody>\n        <tr *ngFor=\"let d of deliveries\">\n          <td><code style=\"font-size:11px;color:var(--text3)\">{{d.id}}</code></td>\n          <td><strong style=\"color:var(--text)\">{{d.product}}</strong></td>\n          <td style=\"color:var(--text2);font-size:12px\">{{d.from}} \u2192 {{d.to}}</td>\n          <td style=\"color:var(--text2)\">{{d.transporter}}</td>\n          <td><span style=\"color:var(--success,#059669);font-weight:600;font-size:12px\">\uD83C\uDF3F {{d.co2}}</span></td>\n          <td><strong style=\"color:var(--primary)\">{{d.amount}} TND</strong></td>\n          <td><span class=\"badge\" [ngClass]=\"d.status==='delivered'?'badge-success':d.status==='in-transit'?'badge-info':'badge-warning'\">{{d.status}}</span></td>\n          <td style=\"color:var(--text3);font-size:12px\">{{d.date}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MyDeliveries, { className: "MyDeliveries", filePath: "src/app/features/enterprise/my-deliveries/my-deliveries.ts", lineNumber: 3 }); })();
