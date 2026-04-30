import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Treasury_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 10);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "div", 11);
    i0.ɵɵtext(5);
    i0.ɵɵelementStart(6, "span", 12);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 13);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 14);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", s_r1.bg);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r1.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", s_r1.value, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.unit);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("up", s_r1.up)("down", !s_r1.up);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", s_r1.up ? "\u25B2" : "\u25BC", " ", s_r1.change, " vs last month");
} }
function Treasury_tr_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "code", 15);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 16);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 16);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td")(9, "strong", 17);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td")(12, "span", 18);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td")(15, "span", 19);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td", 20);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const t_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(t_r2.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r2.from);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r2.to);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", t_r2.amount, " TND");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(t_r2.type);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", t_r2.status === "completed" ? "badge-success" : t_r2.status === "locked" ? "badge-warning" : "badge-danger");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r2.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r2.date);
} }
export class Treasury {
    stats = [
        { label: 'Total Revenue', value: '84,200', unit: 'TND', change: '+21%', up: true, icon: '💰', bg: 'rgba(124,58,237,.12)' },
        { label: 'Escrow Locked', value: '12,400', unit: 'TND', change: '+5%', up: true, icon: '🔒', bg: 'rgba(251,191,36,.1)' },
        { label: 'Transactions', value: '248', unit: '', change: '+18%', up: true, icon: '💳', bg: 'rgba(96,165,250,.1)' },
        { label: 'Pending', value: '6,800', unit: 'TND', change: '-3%', up: false, icon: '⏳', bg: 'rgba(239,68,68,.1)' },
    ];
    transactions = [
        { id: 'TXN-1081', from: 'Industrie Slim', to: 'Chimie Anis', amount: 1200, type: 'Escrow Release', status: 'completed', date: '2025-03-14' },
        { id: 'TXN-1082', from: 'Textile Mona', to: 'Platform Fee', amount: 54, type: 'Commission', status: 'completed', date: '2025-03-14' },
        { id: 'TXN-1083', from: 'Métallurgie Sud', to: 'Escrow', amount: 620, type: 'Escrow Lock', status: 'locked', date: '2025-03-13' },
        { id: 'TXN-1084', from: 'Vitro Indinya', to: 'Karim Transport', amount: 190, type: 'Logistics', status: 'completed', date: '2025-03-12' },
        { id: 'TXN-1085', from: 'Chimie Anis', to: 'Escrow', amount: 3400, type: 'Escrow Lock', status: 'locked', date: '2025-03-11' },
    ];
    ngOnInit() { }
    static ɵfac = function Treasury_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Treasury)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Treasury, selectors: [["app-treasury"]], standalone: false, decls: 33, vars: 2, consts: [[1, "page-wrapper"], [1, "page-header"], [1, "stats-grid"], ["class", "stat-card", 4, "ngFor", "ngForOf"], [1, "card", 2, "padding", "0"], [1, "card-header"], [1, "card-link"], [1, "data-table"], [4, "ngFor", "ngForOf"], [1, "stat-card"], [1, "stat-icon"], [1, "stat-value"], [2, "font-size", "13px", "font-weight", "500", "opacity", ".6"], [1, "stat-label"], [1, "stat-change"], [2, "font-family", "'DM Mono',monospace", "font-size", "11px", "color", "var(--text3)"], [2, "color", "var(--text2)"], [2, "color", "var(--primary)"], [1, "badge", "badge-neutral"], [1, "badge", 3, "ngClass"], [2, "font-size", "12px", "color", "var(--text3)"]], template: function Treasury_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h1");
            i0.ɵɵtext(3, "Treasury & Finance");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5, "Track payments, escrow accounts and financial flows");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 2);
            i0.ɵɵtemplate(7, Treasury_div_7_Template, 12, 12, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 4)(9, "div", 5)(10, "h3");
            i0.ɵɵtext(11, "Recent Transactions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 6);
            i0.ɵɵtext(13, "Export CSV \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "table", 7)(15, "thead")(16, "tr")(17, "th");
            i0.ɵɵtext(18, "ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "th");
            i0.ɵɵtext(20, "From");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "th");
            i0.ɵɵtext(22, "To");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "th");
            i0.ɵɵtext(24, "Amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "th");
            i0.ɵɵtext(26, "Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "th");
            i0.ɵɵtext(28, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "th");
            i0.ɵɵtext(30, "Date");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(31, "tbody");
            i0.ɵɵtemplate(32, Treasury_tr_32_Template, 19, 8, "tr", 8);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.stats);
            i0.ɵɵadvance(25);
            i0.ɵɵproperty("ngForOf", ctx.transactions);
        } }, dependencies: [i1.NgClass, i1.NgForOf], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Treasury, [{
        type: Component,
        args: [{ selector: 'app-treasury', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header\"><h1>Treasury & Finance</h1><p>Track payments, escrow accounts and financial flows</p></div>\n  <div class=\"stats-grid\">\n    <div class=\"stat-card\" *ngFor=\"let s of stats\">\n      <div class=\"stat-icon\" [style.background]=\"s.bg\">{{s.icon}}</div>\n      <div>\n        <div class=\"stat-value\">{{s.value}} <span style=\"font-size:13px;font-weight:500;opacity:.6\">{{s.unit}}</span></div>\n        <div class=\"stat-label\">{{s.label}}</div>\n        <div class=\"stat-change\" [class.up]=\"s.up\" [class.down]=\"!s.up\">{{s.up?'\u25B2':'\u25BC'}} {{s.change}} vs last month</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"card\" style=\"padding:0\">\n    <div class=\"card-header\"><h3>Recent Transactions</h3><span class=\"card-link\">Export CSV \u2192</span></div>\n    <table class=\"data-table\">\n      <thead><tr><th>ID</th><th>From</th><th>To</th><th>Amount</th><th>Type</th><th>Status</th><th>Date</th></tr></thead>\n      <tbody>\n        <tr *ngFor=\"let t of transactions\">\n          <td><code style=\"font-family:'DM Mono',monospace;font-size:11px;color:var(--text3)\">{{t.id}}</code></td>\n          <td style=\"color:var(--text2)\">{{t.from}}</td>\n          <td style=\"color:var(--text2)\">{{t.to}}</td>\n          <td><strong style=\"color:var(--primary)\">{{t.amount}} TND</strong></td>\n          <td><span class=\"badge badge-neutral\">{{t.type}}</span></td>\n          <td><span class=\"badge\" [ngClass]=\"t.status==='completed'?'badge-success':t.status==='locked'?'badge-warning':'badge-danger'\">{{t.status}}</span></td>\n          <td style=\"font-size:12px;color:var(--text3)\">{{t.date}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Treasury, { className: "Treasury", filePath: "src/app/features/admin/treasury/treasury.ts", lineNumber: 3 }); })();
