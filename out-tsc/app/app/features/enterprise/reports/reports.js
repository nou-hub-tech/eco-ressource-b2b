import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Reports_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 28);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "div", 29);
    i0.ɵɵtext(5);
    i0.ɵɵelementStart(6, "span", 30);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 31);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 32);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const k_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", k_r1.bg);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(k_r1.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", k_r1.value, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(k_r1.unit);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(k_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u25B2 ", k_r1.change, " vs last month");
} }
function Reports_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 33);
} if (rf & 2) {
    const b_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    i0.ɵɵstyleProp("height", b_r2, "%")("background", i_r3 === 11 ? "var(--primary)" : "rgba(2,132,199,.12)")("border-color", i_r3 === 11 ? "var(--primary)" : "rgba(2,132,199,.2)");
} }
function Reports_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(m_r4);
} }
export class Reports {
    kpis = [
        { label: 'Total Sales', value: '8,400', unit: 'TND', change: '+18%', up: true, icon: '💰', bg: 'rgba(5,150,105,.1)' },
        { label: 'CO₂ Avoided', value: '2.4', unit: 'T', change: '+0.3T', up: true, icon: '🌿', bg: 'rgba(5,150,105,.1)' },
        { label: 'Listings Posted', value: '12', unit: '', change: '+3', up: true, icon: '📋', bg: 'rgba(2,132,199,.1)' },
        { label: 'Recycled Volume', value: '4,800', unit: 'kg', change: '+620kg', up: true, icon: '♻', bg: 'rgba(124,58,237,.1)' },
    ];
    monthlyBars = [28, 45, 32, 60, 48, 72, 55, 80, 65, 90, 78, 95];
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    ngOnInit() { }
    static ɵfac = function Reports_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Reports)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Reports, selectors: [["app-reports"]], standalone: false, decls: 55, vars: 3, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], [1, "btn", "btn-primary"], [1, "stats-grid"], ["class", "stat-card", 4, "ngFor", "ngForOf"], [1, "grid-2"], [1, "card"], [1, "card-header"], [1, "card-body"], [2, "display", "flex", "align-items", "flex-end", "gap", "6px", "height", "140px", "padding", "0 4px"], ["style", "flex:1;border-radius:4px 4px 0 0;border:1px solid;transition:all .2s;cursor:pointer;min-height:4px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center", 3, "height", "background", "border-color", 4, "ngFor", "ngForOf"], [2, "display", "flex", "gap", "6px", "margin-top", "8px"], ["style", "flex:1;text-align:center;font-size:9px;color:var(--text3)", 4, "ngFor", "ngForOf"], [1, "card-body", 2, "display", "flex", "flex-direction", "column", "gap", "14px"], [2, "display", "flex", "justify-content", "space-between", "margin-bottom", "6px"], [2, "font-size", "12px", "color", "var(--text2)"], [2, "font-size", "12px", "font-weight", "600", "color", "var(--success,#059669)"], [2, "height", "8px", "background", "var(--border)", "border-radius", "4px", "overflow", "hidden"], [2, "height", "100%", "width", "48%", "background", "var(--success,#059669)", "border-radius", "4px", "transition", "width .3s"], [2, "font-size", "12px", "font-weight", "600", "color", "var(--primary)"], [2, "height", "100%", "width", "48%", "background", "var(--primary)", "border-radius", "4px", "transition", "width .3s"], [2, "font-size", "12px", "font-weight", "600", "color", "var(--info,#0284c7)"], [2, "height", "100%", "width", "60%", "background", "var(--info,#0284c7)", "border-radius", "4px", "transition", "width .3s"], [2, "margin-top", "8px", "padding", "14px", "background", "var(--bg3,var(--bg))", "border-radius", "8px", "border", "1px solid var(--border)"], [2, "font-size", "11px", "color", "var(--text3)", "margin-bottom", "6px", "font-weight", "600", "text-transform", "uppercase", "letter-spacing", ".4px"], [2, "font-size", "12px", "color", "var(--text2)", "line-height", "1.6"], [1, "stat-card"], [1, "stat-icon"], [1, "stat-value"], [2, "font-size", "13px", "font-weight", "500", "opacity", ".5"], [1, "stat-label"], [1, "stat-change", "up"], [2, "flex", "1", "border-radius", "4px 4px 0 0", "border", "1px solid", "transition", "all .2s", "cursor", "pointer", "min-height", "4px", "display", "flex", "flex-direction", "column", "justify-content", "flex-end", "align-items", "center"], [2, "flex", "1", "text-align", "center", "font-size", "9px", "color", "var(--text3)"]], template: function Reports_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Reports & KPIs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Environmental impact, financial performance and activity overview");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3);
            i0.ɵɵtext(8, "Export PDF");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4);
            i0.ɵɵtemplate(10, Reports_div_10_Template, 12, 7, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 6)(12, "div", 7)(13, "div", 8)(14, "h3");
            i0.ɵɵtext(15, "Monthly Revenue (TND)");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 9)(17, "div", 10);
            i0.ɵɵtemplate(18, Reports_div_18_Template, 1, 6, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 12);
            i0.ɵɵtemplate(20, Reports_div_20_Template, 2, 1, "div", 13);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(21, "div", 7)(22, "div", 8)(23, "h3");
            i0.ɵɵtext(24, "Environmental Impact");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 14)(26, "div")(27, "div", 15)(28, "span", 16);
            i0.ɵɵtext(29, "CO\u2082 Avoided");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "span", 17);
            i0.ɵɵtext(31, "2.4T / 5T target");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "div", 18);
            i0.ɵɵelement(33, "div", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div")(35, "div", 15)(36, "span", 16);
            i0.ɵɵtext(37, "Recycled Volume");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "span", 20);
            i0.ɵɵtext(39, "4,800kg / 10T target");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 18);
            i0.ɵɵelement(41, "div", 21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "div")(43, "div", 15)(44, "span", 16);
            i0.ɵɵtext(45, "Listings Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "span", 22);
            i0.ɵɵtext(47, "12 / 20 target");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 18);
            i0.ɵɵelement(49, "div", 23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 24)(51, "div", 25);
            i0.ɵɵtext(52, "AI Summary");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "p", 26);
            i0.ɵɵtext(54, "Your CO\u2082 impact is 48% of your annual target. Posting 2 more listings this month would reach the 50% milestone and qualify for the Green Badge certification.");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngForOf", ctx.kpis);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.monthlyBars);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.months);
        } }, dependencies: [i1.NgForOf], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Reports, [{
        type: Component,
        args: [{ selector: 'app-reports', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\"><h1>Reports & KPIs</h1><p>Environmental impact, financial performance and activity overview</p></div>\n    <button class=\"btn btn-primary\">Export PDF</button>\n  </div>\n\n  <div class=\"stats-grid\">\n    <div class=\"stat-card\" *ngFor=\"let k of kpis\">\n      <div class=\"stat-icon\" [style.background]=\"k.bg\">{{k.icon}}</div>\n      <div>\n        <div class=\"stat-value\">{{k.value}} <span style=\"font-size:13px;font-weight:500;opacity:.5\">{{k.unit}}</span></div>\n        <div class=\"stat-label\">{{k.label}}</div>\n        <div class=\"stat-change up\">\u25B2 {{k.change}} vs last month</div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"grid-2\">\n    <div class=\"card\">\n      <div class=\"card-header\"><h3>Monthly Revenue (TND)</h3></div>\n      <div class=\"card-body\">\n        <div style=\"display:flex;align-items:flex-end;gap:6px;height:140px;padding:0 4px\">\n          <div *ngFor=\"let b of monthlyBars; let i=index\"\n               style=\"flex:1;border-radius:4px 4px 0 0;border:1px solid;transition:all .2s;cursor:pointer;min-height:4px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center\"\n               [style.height.%]=\"b\"\n               [style.background]=\"i===11 ? 'var(--primary)' : 'rgba(2,132,199,.12)'\"\n               [style.border-color]=\"i===11 ? 'var(--primary)' : 'rgba(2,132,199,.2)'\">\n          </div>\n        </div>\n        <div style=\"display:flex;gap:6px;margin-top:8px\">\n          <div *ngFor=\"let m of months\" style=\"flex:1;text-align:center;font-size:9px;color:var(--text3)\">{{m}}</div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"card\">\n      <div class=\"card-header\"><h3>Environmental Impact</h3></div>\n      <div class=\"card-body\" style=\"display:flex;flex-direction:column;gap:14px\">\n        <div>\n          <div style=\"display:flex;justify-content:space-between;margin-bottom:6px\">\n            <span style=\"font-size:12px;color:var(--text2)\">CO\u2082 Avoided</span>\n            <span style=\"font-size:12px;font-weight:600;color:var(--success,#059669)\">2.4T / 5T target</span>\n          </div>\n          <div style=\"height:8px;background:var(--border);border-radius:4px;overflow:hidden\">\n            <div style=\"height:100%;width:48%;background:var(--success,#059669);border-radius:4px;transition:width .3s\"></div>\n          </div>\n        </div>\n        <div>\n          <div style=\"display:flex;justify-content:space-between;margin-bottom:6px\">\n            <span style=\"font-size:12px;color:var(--text2)\">Recycled Volume</span>\n            <span style=\"font-size:12px;font-weight:600;color:var(--primary)\">4,800kg / 10T target</span>\n          </div>\n          <div style=\"height:8px;background:var(--border);border-radius:4px;overflow:hidden\">\n            <div style=\"height:100%;width:48%;background:var(--primary);border-radius:4px;transition:width .3s\"></div>\n          </div>\n        </div>\n        <div>\n          <div style=\"display:flex;justify-content:space-between;margin-bottom:6px\">\n            <span style=\"font-size:12px;color:var(--text2)\">Listings Active</span>\n            <span style=\"font-size:12px;font-weight:600;color:var(--info,#0284c7)\">12 / 20 target</span>\n          </div>\n          <div style=\"height:8px;background:var(--border);border-radius:4px;overflow:hidden\">\n            <div style=\"height:100%;width:60%;background:var(--info,#0284c7);border-radius:4px;transition:width .3s\"></div>\n          </div>\n        </div>\n        <div style=\"margin-top:8px;padding:14px;background:var(--bg3,var(--bg));border-radius:8px;border:1px solid var(--border)\">\n          <div style=\"font-size:11px;color:var(--text3);margin-bottom:6px;font-weight:600;text-transform:uppercase;letter-spacing:.4px\">AI Summary</div>\n          <p style=\"font-size:12px;color:var(--text2);line-height:1.6\">Your CO\u2082 impact is 48% of your annual target. Posting 2 more listings this month would reach the 50% milestone and qualify for the Green Badge certification.</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Reports, { className: "Reports", filePath: "src/app/features/enterprise/reports/reports.ts", lineNumber: 3 }); })();
