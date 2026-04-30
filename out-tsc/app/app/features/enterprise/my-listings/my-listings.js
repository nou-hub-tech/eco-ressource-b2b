import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function MyListings_div_10_button_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵtext(1, "Publish");
    i0.ɵɵelementEnd();
} }
function MyListings_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 8)(2, "div")(3, "div", 9);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 10)(6, "span", 11);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 12);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "span", 13);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 14)(13, "div")(14, "div", 15);
    i0.ɵɵtext(15);
    i0.ɵɵelementStart(16, "span", 16);
    i0.ɵɵtext(17, "TND");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 12);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 17)(21, "div", 18);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 19);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 20)(26, "button", 21);
    i0.ɵɵtext(27, "Edit");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(28, MyListings_div_10_button_28_Template, 2, 0, "button", 22);
    i0.ɵɵelementStart(29, "button", 23);
    i0.ɵɵtext(30, "Delete");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const l_r1 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(l_r1.title);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(l_r1.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Posted ", l_r1.posted);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", l_r1.status === "active" ? "badge-success" : l_r1.status === "pending" ? "badge-warning" : l_r1.status === "draft" ? "badge-neutral" : "badge-danger");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(l_r1.status);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", l_r1.price, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(l_r1.qty);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\uD83D\uDC41 ", l_r1.views, " views");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\uD83D\uDCAC ", l_r1.enquiries, " enquiries");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", l_r1.status === "draft");
} }
function MyListings_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵlistener("click", function MyListings_div_11_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵelementStart(1, "div", 26);
    i0.ɵɵlistener("click", function MyListings_div_11_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 27)(3, "h2");
    i0.ɵɵtext(4, "New Listing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 28);
    i0.ɵɵlistener("click", function MyListings_div_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 29)(8, "div", 30)(9, "label");
    i0.ɵɵtext(10, "Title");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 30)(13, "label");
    i0.ɵɵtext(14, "Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select")(16, "option");
    i0.ɵɵtext(17, "Metal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "option");
    i0.ɵɵtext(19, "Plastic");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "option");
    i0.ɵɵtext(21, "Paper");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "option");
    i0.ɵɵtext(23, "Glass");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "option");
    i0.ɵɵtext(25, "Textile");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(26, "div", 29)(27, "div", 30)(28, "label");
    i0.ɵɵtext(29, "Price (TND)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 30)(32, "label");
    i0.ɵɵtext(33, "Quantity (kg)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "input", 32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 30)(36, "label");
    i0.ɵɵtext(37, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "textarea", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 34)(40, "button", 35);
    i0.ɵɵlistener("click", function MyListings_div_11_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(41, "Save Draft");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "button", 3);
    i0.ɵɵlistener("click", function MyListings_div_11_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(43, "Publish Now");
    i0.ɵɵelementEnd()()()();
} }
export class MyListings {
    showModal = false;
    listings = [
        { id: 'LST-001', title: 'Aluminum Scrap 2T', category: 'Metal', price: 1200, qty: '2,000 kg', views: 48, enquiries: 5, status: 'active', posted: 'Mar 1' },
        { id: 'LST-002', title: 'Steel Offcuts 800kg', category: 'Metal', price: 620, qty: '800 kg', views: 31, enquiries: 3, status: 'active', posted: 'Mar 5' },
        { id: 'LST-003', title: 'Cardboard Bales 1T', category: 'Paper', price: 180, qty: '1,000 kg', views: 12, enquiries: 1, status: 'pending', posted: 'Mar 8' },
        { id: 'LST-004', title: 'Plastic Waste 200kg', category: 'Plastic', price: 60, qty: '200 kg', views: 7, enquiries: 0, status: 'draft', posted: 'Mar 10' },
    ];
    ngOnInit() { }
    openModal() { this.showModal = true; }
    closeModal() { this.showModal = false; }
    static ɵfac = function MyListings_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MyListings)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MyListings, selectors: [["app-my-listings"]], standalone: false, decls: 12, vars: 2, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], [1, "btn", "btn-primary", 3, "click"], [1, "grid-2", 2, "margin-bottom", "20px"], ["class", "card", "style", "padding:18px", 4, "ngFor", "ngForOf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "card", 2, "padding", "18px"], [2, "display", "flex", "justify-content", "space-between", "align-items", "flex-start", "margin-bottom", "12px"], [2, "font-family", "'Syne',sans-serif", "font-size", "15px", "font-weight", "700", "color", "var(--text)", "margin-bottom", "4px"], [2, "display", "flex", "gap", "8px", "align-items", "center"], [1, "badge", "badge-neutral"], [2, "font-size", "11px", "color", "var(--text3)"], [1, "badge", 3, "ngClass"], [2, "display", "flex", "gap", "20px", "margin-bottom", "14px"], [2, "font-family", "'Syne',sans-serif", "font-size", "20px", "font-weight", "800", "color", "var(--primary)"], [2, "font-size", "12px", "font-weight", "500", "opacity", ".6"], [2, "margin-left", "auto", "text-align", "right"], [2, "font-size", "12px", "color", "var(--text3)"], [2, "font-size", "12px", "color", "var(--text2)", "font-weight", "600", "margin-top", "2px"], [2, "display", "flex", "gap", "8px"], [1, "btn", "btn-outline", "btn-sm"], ["class", "btn btn-primary btn-sm", 4, "ngIf"], [1, "btn", "btn-danger", "btn-sm"], [1, "btn", "btn-primary", "btn-sm"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "btn", "btn-icon", 3, "click"], [1, "form-row"], [1, "form-group"], ["type", "text", "placeholder", "e.g. Aluminum Scrap 2T"], ["type", "number", "placeholder", "0"], ["placeholder", "Describe your surplus material..."], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"]], template: function MyListings_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "My Listings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Manage your posted surplus and materials");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3);
            i0.ɵɵlistener("click", function MyListings_Template_button_click_7_listener() { return ctx.openModal(); });
            i0.ɵɵtext(8, "+ New Listing");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4);
            i0.ɵɵtemplate(10, MyListings_div_10_Template, 31, 10, "div", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(11, MyListings_div_11_Template, 44, 0, "div", 6);
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngForOf", ctx.listings);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showModal);
        } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.NgSelectOption, i2.ɵNgSelectMultipleOption], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MyListings, [{
        type: Component,
        args: [{ selector: 'app-my-listings', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\"><h1>My Listings</h1><p>Manage your posted surplus and materials</p></div>\n    <button class=\"btn btn-primary\" (click)=\"openModal()\">+ New Listing</button>\n  </div>\n  <div class=\"grid-2\" style=\"margin-bottom:20px\">\n    <div class=\"card\" *ngFor=\"let l of listings\" style=\"padding:18px\">\n      <div style=\"display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px\">\n        <div>\n          <div style=\"font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px\">{{l.title}}</div>\n          <div style=\"display:flex;gap:8px;align-items:center\">\n            <span class=\"badge badge-neutral\">{{l.category}}</span>\n            <span style=\"font-size:11px;color:var(--text3)\">Posted {{l.posted}}</span>\n          </div>\n        </div>\n        <span class=\"badge\" [ngClass]=\"l.status==='active'?'badge-success':l.status==='pending'?'badge-warning':l.status==='draft'?'badge-neutral':'badge-danger'\">{{l.status}}</span>\n      </div>\n      <div style=\"display:flex;gap:20px;margin-bottom:14px\">\n        <div>\n          <div style=\"font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--primary)\">{{l.price}} <span style=\"font-size:12px;font-weight:500;opacity:.6\">TND</span></div>\n          <div style=\"font-size:11px;color:var(--text3)\">{{l.qty}}</div>\n        </div>\n        <div style=\"margin-left:auto;text-align:right\">\n          <div style=\"font-size:12px;color:var(--text3)\">\uD83D\uDC41 {{l.views}} views</div>\n          <div style=\"font-size:12px;color:var(--text2);font-weight:600;margin-top:2px\">\uD83D\uDCAC {{l.enquiries}} enquiries</div>\n        </div>\n      </div>\n      <div style=\"display:flex;gap:8px\">\n        <button class=\"btn btn-outline btn-sm\">Edit</button>\n        <button class=\"btn btn-primary btn-sm\" *ngIf=\"l.status==='draft'\">Publish</button>\n        <button class=\"btn btn-danger btn-sm\">Delete</button>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"modal-overlay\" *ngIf=\"showModal\" (click)=\"closeModal()\">\n  <div class=\"modal\" (click)=\"$event.stopPropagation()\">\n    <div class=\"modal-header\"><h2>New Listing</h2><button class=\"btn btn-icon\" (click)=\"closeModal()\">\u2715</button></div>\n    <div class=\"form-row\">\n      <div class=\"form-group\"><label>Title</label><input type=\"text\" placeholder=\"e.g. Aluminum Scrap 2T\"></div>\n      <div class=\"form-group\"><label>Category</label><select><option>Metal</option><option>Plastic</option><option>Paper</option><option>Glass</option><option>Textile</option></select></div>\n    </div>\n    <div class=\"form-row\">\n      <div class=\"form-group\"><label>Price (TND)</label><input type=\"number\" placeholder=\"0\"></div>\n      <div class=\"form-group\"><label>Quantity (kg)</label><input type=\"number\" placeholder=\"0\"></div>\n    </div>\n    <div class=\"form-group\"><label>Description</label><textarea placeholder=\"Describe your surplus material...\"></textarea></div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-outline\" (click)=\"closeModal()\">Save Draft</button>\n      <button class=\"btn btn-primary\" (click)=\"closeModal()\">Publish Now</button>\n    </div>\n  </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MyListings, { className: "MyListings", filePath: "src/app/features/enterprise/my-listings/my-listings.ts", lineNumber: 3 }); })();
