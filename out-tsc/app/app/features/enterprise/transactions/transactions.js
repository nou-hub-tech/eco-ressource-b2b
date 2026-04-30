import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Transactions_tr_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "code", 16);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td")(5, "strong", 17);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td")(8, "span", 18);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td")(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td")(14, "span", 19);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td", 20);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const t_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(t_r1.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(t_r1.label);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(t_r1.type);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("color", t_r1.positive === true ? "var(--success,#059669)" : t_r1.positive === false ? "var(--danger,#dc2626)" : "var(--warning,#d97706)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", t_r1.positive === true ? "+" : "", "", t_r1.amount, " TND ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", t_r1.status === "completed" ? "badge-success" : t_r1.status === "locked" ? "badge-warning" : "badge-neutral");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r1.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r1.date);
} }
export class Transactions {
    balance = 8250;
    escrow = 620;
    transactions = [
        { id: 'TXN-1081', label: 'Aluminum Scrap sale', type: 'Escrow Release', amount: 1200, positive: true, status: 'completed', date: 'Mar 14' },
        { id: 'TXN-1082', label: 'Platform commission', type: 'Fee', amount: -54, positive: false, status: 'completed', date: 'Mar 14' },
        { id: 'TXN-1083', label: 'Steel Offcuts — locked', type: 'Escrow Lock', amount: 620, positive: null, status: 'locked', date: 'Mar 13' },
        { id: 'TXN-1084', label: 'Karim Transport — DEL', type: 'Logistics', amount: -190, positive: false, status: 'completed', date: 'Mar 12' },
        { id: 'TXN-1085', label: 'Cardboard Bales sale', type: 'Escrow Release', amount: 180, positive: true, status: 'completed', date: 'Mar 10' },
    ];
    ngOnInit() { }
    static ɵfac = function Transactions_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Transactions)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Transactions, selectors: [["app-transactions"]], standalone: false, decls: 52, vars: 3, consts: [[1, "page-wrapper"], [1, "page-header"], [1, "grid-2", 2, "margin-bottom", "22px"], [1, "card", 2, "padding", "20px", "display", "flex", "align-items", "center", "gap", "16px"], [2, "width", "48px", "height", "48px", "background", "rgba(5,150,105,.12)", "border-radius", "10px", "display", "flex", "align-items", "center", "justify-content", "center", "font-size", "22px", "flex-shrink", "0"], [2, "font-size", "12px", "color", "var(--text3)", "font-weight", "500", "margin-bottom", "4px", "text-transform", "uppercase", "letter-spacing", ".4px"], [2, "font-family", "'Syne',sans-serif", "font-size", "28px", "font-weight", "800", "color", "var(--success,#059669)", "letter-spacing", "-1px"], [2, "font-size", "14px", "opacity", ".6"], [2, "width", "48px", "height", "48px", "background", "rgba(217,119,6,.1)", "border-radius", "10px", "display", "flex", "align-items", "center", "justify-content", "center", "font-size", "22px", "flex-shrink", "0"], [2, "font-family", "'Syne',sans-serif", "font-size", "28px", "font-weight", "800", "color", "var(--warning,#d97706)", "letter-spacing", "-1px"], [2, "font-size", "11px", "color", "var(--text3)", "margin-top", "3px"], [1, "card", 2, "padding", "0"], [1, "card-header"], [1, "btn", "btn-outline", "btn-sm"], [1, "data-table"], [4, "ngFor", "ngForOf"], [2, "font-size", "11px", "color", "var(--text3)"], [2, "color", "var(--text)"], [1, "badge", "badge-neutral"], [1, "badge", 3, "ngClass"], [2, "font-size", "12px", "color", "var(--text3)"]], template: function Transactions_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h1");
            i0.ɵɵtext(3, "Transactions & Escrow");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5, "Track all your financial operations and secured payments");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 2)(7, "div", 3)(8, "div", 4);
            i0.ɵɵtext(9, "\uD83D\uDCB0");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div")(11, "div", 5);
            i0.ɵɵtext(12, "Available Balance");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 6);
            i0.ɵɵtext(14);
            i0.ɵɵelementStart(15, "span", 7);
            i0.ɵɵtext(16, "TND");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(17, "div", 3)(18, "div", 8);
            i0.ɵɵtext(19, "\uD83D\uDD12");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div")(21, "div", 5);
            i0.ɵɵtext(22, "Escrow Locked");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 9);
            i0.ɵɵtext(24);
            i0.ɵɵelementStart(25, "span", 7);
            i0.ɵɵtext(26, "TND");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 10);
            i0.ɵɵtext(28, "Released on delivery confirmation");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(29, "div", 11)(30, "div", 12)(31, "h3");
            i0.ɵɵtext(32, "Transaction History");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "button", 13);
            i0.ɵɵtext(34, "Export CSV");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "table", 14)(36, "thead")(37, "tr")(38, "th");
            i0.ɵɵtext(39, "ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "th");
            i0.ɵɵtext(41, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "th");
            i0.ɵɵtext(43, "Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "th");
            i0.ɵɵtext(45, "Amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "th");
            i0.ɵɵtext(47, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "th");
            i0.ɵɵtext(49, "Date");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(50, "tbody");
            i0.ɵɵtemplate(51, Transactions_tr_51_Template, 18, 10, "tr", 15);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate1("", ctx.balance, " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1("", ctx.escrow, " ");
            i0.ɵɵadvance(27);
            i0.ɵɵproperty("ngForOf", ctx.transactions);
        } }, dependencies: [i1.NgClass, i1.NgForOf], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Transactions, [{
        type: Component,
        args: [{ selector: 'app-transactions', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header\"><h1>Transactions & Escrow</h1><p>Track all your financial operations and secured payments</p></div>\n\n  <div class=\"grid-2\" style=\"margin-bottom:22px\">\n    <div class=\"card\" style=\"padding:20px;display:flex;align-items:center;gap:16px\">\n      <div style=\"width:48px;height:48px;background:rgba(5,150,105,.12);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0\">\uD83D\uDCB0</div>\n      <div>\n        <div style=\"font-size:12px;color:var(--text3);font-weight:500;margin-bottom:4px;text-transform:uppercase;letter-spacing:.4px\">Available Balance</div>\n        <div style=\"font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--success,#059669);letter-spacing:-1px\">{{balance}} <span style=\"font-size:14px;opacity:.6\">TND</span></div>\n      </div>\n    </div>\n    <div class=\"card\" style=\"padding:20px;display:flex;align-items:center;gap:16px\">\n      <div style=\"width:48px;height:48px;background:rgba(217,119,6,.1);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0\">\uD83D\uDD12</div>\n      <div>\n        <div style=\"font-size:12px;color:var(--text3);font-weight:500;margin-bottom:4px;text-transform:uppercase;letter-spacing:.4px\">Escrow Locked</div>\n        <div style=\"font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:var(--warning,#d97706);letter-spacing:-1px\">{{escrow}} <span style=\"font-size:14px;opacity:.6\">TND</span></div>\n        <div style=\"font-size:11px;color:var(--text3);margin-top:3px\">Released on delivery confirmation</div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"card\" style=\"padding:0\">\n    <div class=\"card-header\"><h3>Transaction History</h3><button class=\"btn btn-outline btn-sm\">Export CSV</button></div>\n    <table class=\"data-table\">\n      <thead><tr><th>ID</th><th>Description</th><th>Type</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>\n      <tbody>\n        <tr *ngFor=\"let t of transactions\">\n          <td><code style=\"font-size:11px;color:var(--text3)\">{{t.id}}</code></td>\n          <td><strong style=\"color:var(--text)\">{{t.label}}</strong></td>\n          <td><span class=\"badge badge-neutral\">{{t.type}}</span></td>\n          <td>\n            <strong [style.color]=\"t.positive===true ? 'var(--success,#059669)' : t.positive===false ? 'var(--danger,#dc2626)' : 'var(--warning,#d97706)'\">\n              {{t.positive===true ? '+' : ''}}{{t.amount}} TND\n            </strong>\n          </td>\n          <td><span class=\"badge\" [ngClass]=\"t.status==='completed'?'badge-success':t.status==='locked'?'badge-warning':'badge-neutral'\">{{t.status}}</span></td>\n          <td style=\"font-size:12px;color:var(--text3)\">{{t.date}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Transactions, { className: "Transactions", filePath: "src/app/features/enterprise/transactions/transactions.ts", lineNumber: 3 }); })();
