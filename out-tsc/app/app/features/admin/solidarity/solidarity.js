import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Solidarity_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 8)(2, "div")(3, "h3", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 10);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 11);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 12)(10, "div")(11, "div", 13);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 14);
    i0.ɵɵtext(14, "Members");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div")(16, "div", 15);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 14);
    i0.ɵɵtext(19, "Total Donations");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div", 16)(21, "span", 17);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 18)(24, "button", 19);
    i0.ɵɵtext(25, "View Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 20);
    i0.ɵɵtext(27, "Donate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const a_r1 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(a_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r1.mission);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", a_r1.status === "active" ? "badge-success" : "badge-warning");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(a_r1.status);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(a_r1.members);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", a_r1.donations, " TND");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\uD83E\uDD16 ", a_r1.ai);
} }
function Solidarity_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵlistener("click", function Solidarity_div_11_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵlistener("click", function Solidarity_div_11_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 23)(3, "h2");
    i0.ɵɵtext(4, "Add Association");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 24);
    i0.ɵɵlistener("click", function Solidarity_div_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 25)(8, "label");
    i0.ɵɵtext(9, "Association Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "input", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 25)(12, "label");
    i0.ɵɵtext(13, "Mission");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "textarea", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 28)(16, "div", 25)(17, "label");
    i0.ɵɵtext(18, "Contact Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 25)(21, "label");
    i0.ɵɵtext(22, "Members");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "input", 30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 31)(25, "button", 32);
    i0.ɵɵlistener("click", function Solidarity_div_11_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(26, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "button", 3);
    i0.ɵɵlistener("click", function Solidarity_div_11_Template_button_click_27_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(28, "Add");
    i0.ɵɵelementEnd()()()();
} }
export class Solidarity {
    showModal = false;
    associations = [
        { name: 'Recycly Tunisia', mission: 'Household waste sorting & recycling awareness', members: 120, donations: 4500, status: 'active', ai: 'High donation success rate' },
        { name: 'DEBRASY', mission: 'Social inclusion through waste sorting', members: 45, donations: 1200, status: 'active', ai: 'Recommend green subsidy' },
        { name: 'Sharek e-Waste', mission: 'Electronic waste collection & redistribution', members: 78, donations: 2800, status: 'active', ai: 'Predicted 40% growth' },
        { name: 'Green Bizerte', mission: 'Coastal cleanup and recycling initiative', members: 32, donations: 600, status: 'pending', ai: 'Needs validation docs' },
    ];
    ngOnInit() { }
    openModal() { this.showModal = true; }
    closeModal() { this.showModal = false; }
    static ɵfac = function Solidarity_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Solidarity)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Solidarity, selectors: [["app-solidarity"]], standalone: false, decls: 12, vars: 2, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], [1, "btn", "btn-primary", 3, "click"], [1, "grid-2"], ["class", "card", "style", "padding:20px", 4, "ngFor", "ngForOf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "card", 2, "padding", "20px"], [2, "display", "flex", "justify-content", "space-between", "align-items", "flex-start", "margin-bottom", "14px"], [2, "font-family", "'Syne',sans-serif", "font-size", "15px", "font-weight", "700", "color", "var(--text)", "margin-bottom", "4px"], [2, "font-size", "12px", "color", "var(--text3)", "line-height", "1.5"], [1, "badge", 3, "ngClass"], [2, "display", "flex", "gap", "20px", "margin-bottom", "14px"], [2, "font-family", "'Syne',sans-serif", "font-size", "18px", "font-weight", "800", "color", "var(--text)"], [2, "font-size", "11px", "color", "var(--text3)"], [2, "font-family", "'Syne',sans-serif", "font-size", "18px", "font-weight", "800", "color", "var(--primary)"], [2, "margin-bottom", "14px"], [1, "ai-tip"], [2, "display", "flex", "gap", "8px"], [1, "btn", "btn-outline", "btn-sm"], [1, "btn", "btn-primary", "btn-sm"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "btn", "btn-icon", 3, "click"], [1, "form-group"], ["type", "text", "placeholder", "Organization name"], ["placeholder", "Describe the mission..."], [1, "form-row"], ["type", "email", "placeholder", "contact@association.tn"], ["type", "number", "placeholder", "0"], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"]], template: function Solidarity_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Solidarity & Associations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Support circular economy associations and manage donations");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3);
            i0.ɵɵlistener("click", function Solidarity_Template_button_click_7_listener() { return ctx.openModal(); });
            i0.ɵɵtext(8, "+ Add Association");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4);
            i0.ɵɵtemplate(10, Solidarity_div_10_Template, 28, 7, "div", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(11, Solidarity_div_11_Template, 29, 0, "div", 6);
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngForOf", ctx.associations);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showModal);
        } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Solidarity, [{
        type: Component,
        args: [{ selector: 'app-solidarity', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\"><h1>Solidarity & Associations</h1><p>Support circular economy associations and manage donations</p></div>\n    <button class=\"btn btn-primary\" (click)=\"openModal()\">+ Add Association</button>\n  </div>\n  <div class=\"grid-2\">\n    <div class=\"card\" *ngFor=\"let a of associations\" style=\"padding:20px\">\n      <div style=\"display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px\">\n        <div>\n          <h3 style=\"font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px\">{{a.name}}</h3>\n          <p style=\"font-size:12px;color:var(--text3);line-height:1.5\">{{a.mission}}</p>\n        </div>\n        <span class=\"badge\" [ngClass]=\"a.status==='active'?'badge-success':'badge-warning'\">{{a.status}}</span>\n      </div>\n      <div style=\"display:flex;gap:20px;margin-bottom:14px\">\n        <div><div style=\"font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--text)\">{{a.members}}</div><div style=\"font-size:11px;color:var(--text3)\">Members</div></div>\n        <div><div style=\"font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--primary)\">{{a.donations}} TND</div><div style=\"font-size:11px;color:var(--text3)\">Total Donations</div></div>\n      </div>\n      <div style=\"margin-bottom:14px\"><span class=\"ai-tip\">\uD83E\uDD16 {{a.ai}}</span></div>\n      <div style=\"display:flex;gap:8px\">\n        <button class=\"btn btn-outline btn-sm\">View Details</button>\n        <button class=\"btn btn-primary btn-sm\">Donate</button>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"modal-overlay\" *ngIf=\"showModal\" (click)=\"closeModal()\">\n  <div class=\"modal\" (click)=\"$event.stopPropagation()\">\n    <div class=\"modal-header\"><h2>Add Association</h2><button class=\"btn btn-icon\" (click)=\"closeModal()\">\u2715</button></div>\n    <div class=\"form-group\"><label>Association Name</label><input type=\"text\" placeholder=\"Organization name\"></div>\n    <div class=\"form-group\"><label>Mission</label><textarea placeholder=\"Describe the mission...\"></textarea></div>\n    <div class=\"form-row\">\n      <div class=\"form-group\"><label>Contact Email</label><input type=\"email\" placeholder=\"contact@association.tn\"></div>\n      <div class=\"form-group\"><label>Members</label><input type=\"number\" placeholder=\"0\"></div>\n    </div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-outline\" (click)=\"closeModal()\">Cancel</button>\n      <button class=\"btn btn-primary\" (click)=\"closeModal()\">Add</button>\n    </div>\n  </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Solidarity, { className: "Solidarity", filePath: "src/app/features/admin/solidarity/solidarity.ts", lineNumber: 3 }); })();
