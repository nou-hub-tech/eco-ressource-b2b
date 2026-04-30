import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function Listings_tr_45_button_22_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function Listings_tr_45_button_22_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const l_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.approve(l_r2)); });
    i0.ɵɵtext(1, "Approve");
    i0.ɵɵelementEnd();
} }
function Listings_tr_45_button_23_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function Listings_tr_45_button_23_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const l_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.reject(l_r2)); });
    i0.ɵɵtext(1, "Reject");
    i0.ɵɵelementEnd();
} }
function Listings_tr_45_button_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 32);
    i0.ɵɵtext(1, "Edit");
    i0.ɵɵelementEnd();
} }
function Listings_tr_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong", 19);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 20);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 21);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td")(9, "span", 22);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td")(12, "strong", 23);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td")(15, "span", 24);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "span", 25);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td")(21, "div", 26);
    i0.ɵɵtemplate(22, Listings_tr_45_button_22_Template, 2, 0, "button", 27)(23, Listings_tr_45_button_23_Template, 2, 0, "button", 28)(24, Listings_tr_45_button_24_Template, 2, 0, "button", 29);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const l_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(l_r2.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Posted ", l_r2.posted);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(l_r2.company);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(l_r2.category);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", l_r2.price, " TND");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", l_r2.status === "active" ? "badge-success" : l_r2.status === "pending" ? "badge-warning" : "badge-danger");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", l_r2.status, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\uD83E\uDD16 ", l_r2.ai);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", l_r2.status === "pending");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", l_r2.status === "pending");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", l_r2.status !== "pending");
} }
function Listings_div_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33)(1, "span", 34);
    i0.ɵɵtext(2, "\uD83D\uDCCB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No listings found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Try adjusting your search or filters");
    i0.ɵɵelementEnd()();
} }
function Listings_div_47_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵlistener("click", function Listings_div_47_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵelementStart(1, "div", 36);
    i0.ɵɵlistener("click", function Listings_div_47_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 37)(3, "h2");
    i0.ɵɵtext(4, "Add Listing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 38);
    i0.ɵɵlistener("click", function Listings_div_47_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 39)(8, "div", 40)(9, "label");
    i0.ɵɵtext(10, "Title");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 40)(13, "label");
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
    i0.ɵɵelementStart(26, "div", 39)(27, "div", 40)(28, "label");
    i0.ɵɵtext(29, "Price (TND)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 40)(32, "label");
    i0.ɵɵtext(33, "Quantity (kg)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "input", 42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 40)(36, "label");
    i0.ɵɵtext(37, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "textarea", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 44)(40, "button", 45);
    i0.ɵɵlistener("click", function Listings_div_47_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(41, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "button", 3);
    i0.ɵɵlistener("click", function Listings_div_47_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(43, "Create Listing");
    i0.ɵɵelementEnd()()()();
} }
export class Listings {
    search = '';
    filterStatus = 'all';
    showModal = false;
    listings = [
        {
            id: 'LST-001',
            title: 'Aluminum Scrap 2T',
            company: 'Industrie Slim',
            category: 'Metal',
            price: 1200,
            status: 'active',
            posted: 'Mar 1',
            ai: 'Detected: Metal via image scan'
        },
        {
            id: 'LST-002',
            title: 'Plastic Pellets 500kg',
            company: 'Chimie Anis',
            category: 'Plastic',
            price: 340,
            status: 'pending',
            posted: 'Mar 5',
            ai: 'Auto-filled from QR code'
        },
        {
            id: 'LST-003',
            title: 'Cardboard Bales 1T',
            company: 'Textile Mona',
            category: 'Paper',
            price: 180,
            status: 'active',
            posted: 'Mar 8',
            ai: 'Price suggestion: 195 TND'
        },
        {
            id: 'LST-004',
            title: 'Steel Offcuts 800kg',
            company: 'Métallurgie Sud',
            category: 'Metal',
            price: 620,
            status: 'active',
            posted: 'Mar 10',
            ai: 'High demand detected'
        },
        {
            id: 'LST-005',
            title: 'Glass Cullet 300kg',
            company: 'Vitro Indinya',
            category: 'Glass',
            price: 90,
            status: 'rejected',
            posted: 'Mar 11',
            ai: 'Incomplete documentation'
        },
        {
            id: 'LST-006',
            title: 'Fabric Offcuts 150kg',
            company: 'Textile Mona',
            category: 'Textile',
            price: 55,
            status: 'pending',
            posted: 'Mar 12',
            ai: 'Surplus confirmed by AI'
        }
    ];
    get filtered() {
        return this.listings.filter(l => {
            const matchSearch = l.title.toLowerCase().includes(this.search.toLowerCase()) ||
                l.company.toLowerCase().includes(this.search.toLowerCase());
            const matchStatus = this.filterStatus === 'all' || l.status === this.filterStatus;
            return matchSearch && matchStatus;
        });
    }
    ngOnInit() { }
    openModal() { this.showModal = true; }
    closeModal() { this.showModal = false; }
    approve(l) { l.status = 'active'; }
    reject(l) { l.status = 'rejected'; }
    static ɵfac = function Listings_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Listings)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Listings, selectors: [["app-listings"]], standalone: false, decls: 48, vars: 6, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], [1, "btn", "btn-primary", 3, "click"], [1, "toolbar"], [1, "search-box"], ["type", "text", "placeholder", "Search listings...", 3, "ngModelChange", "ngModel"], [1, "filter-select", 3, "ngModelChange", "ngModel"], ["value", "all"], ["value", "active"], ["value", "pending"], ["value", "rejected"], [1, "spacer"], [1, "toolbar-count"], [1, "card", 2, "padding", "0"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [2, "color", "var(--text)"], [2, "font-size", "11px", "color", "var(--text3)", "margin-top", "2px"], [2, "color", "var(--text2)"], [1, "badge", "badge-neutral"], [2, "color", "var(--primary)"], [1, "badge", 3, "ngClass"], [1, "ai-tip"], [2, "display", "flex", "gap", "6px"], ["class", "btn btn-outline btn-sm", 3, "click", 4, "ngIf"], ["class", "btn btn-danger btn-sm", 3, "click", 4, "ngIf"], ["class", "btn btn-ghost btn-sm", 4, "ngIf"], [1, "btn", "btn-outline", "btn-sm", 3, "click"], [1, "btn", "btn-danger", "btn-sm", 3, "click"], [1, "btn", "btn-ghost", "btn-sm"], [1, "empty-state"], [1, "empty-icon"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "btn", "btn-icon", 3, "click"], [1, "form-row"], [1, "form-group"], ["type", "text", "placeholder", "e.g. Aluminum Scrap 2T"], ["type", "number", "placeholder", "0"], ["placeholder", "Describe the listing..."], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"]], template: function Listings_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Listings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Manage all marketplace posts and approve submissions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3);
            i0.ɵɵlistener("click", function Listings_Template_button_click_7_listener() { return ctx.openModal(); });
            i0.ɵɵtext(8, "+ Add Listing");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "div", 5)(11, "span");
            i0.ɵɵtext(12, "\uD83D\uDD0D");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "input", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function Listings_Template_input_ngModelChange_13_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.search, $event) || (ctx.search = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "select", 7);
            i0.ɵɵtwoWayListener("ngModelChange", function Listings_Template_select_ngModelChange_14_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterStatus, $event) || (ctx.filterStatus = $event); return $event; });
            i0.ɵɵelementStart(15, "option", 8);
            i0.ɵɵtext(16, "All statuses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "option", 9);
            i0.ɵɵtext(18, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "option", 10);
            i0.ɵɵtext(20, "Pending");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "option", 11);
            i0.ɵɵtext(22, "Rejected");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(23, "div", 12);
            i0.ɵɵelementStart(24, "span", 13);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "div", 14)(27, "table", 15)(28, "thead")(29, "tr")(30, "th");
            i0.ɵɵtext(31, "Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "th");
            i0.ɵɵtext(33, "Company");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "th");
            i0.ɵɵtext(35, "Category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "th");
            i0.ɵɵtext(37, "Price");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "th");
            i0.ɵɵtext(39, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "th");
            i0.ɵɵtext(41, "AI Insight");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "th");
            i0.ɵɵtext(43, "Actions");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(44, "tbody");
            i0.ɵɵtemplate(45, Listings_tr_45_Template, 25, 11, "tr", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(46, Listings_div_46_Template, 7, 0, "div", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(47, Listings_div_47_Template, 44, 0, "div", 18);
        } if (rf & 2) {
            i0.ɵɵadvance(13);
            i0.ɵɵtwoWayProperty("ngModel", ctx.search);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterStatus);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1("", ctx.filtered.length, " listings");
            i0.ɵɵadvance(20);
            i0.ɵɵproperty("ngForOf", ctx.filtered);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.filtered.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showModal);
        } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Listings, [{
        type: Component,
        args: [{ selector: 'app-listings', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\">\n      <h1>Listings</h1>\n      <p>Manage all marketplace posts and approve submissions</p>\n    </div>\n    <button class=\"btn btn-primary\" (click)=\"openModal()\">+ Add Listing</button>\n  </div>\n\n  <div class=\"toolbar\">\n    <div class=\"search-box\">\n      <span>\uD83D\uDD0D</span>\n      <input type=\"text\" placeholder=\"Search listings...\" [(ngModel)]=\"search\">\n    </div>\n    <select class=\"filter-select\" [(ngModel)]=\"filterStatus\">\n      <option value=\"all\">All statuses</option>\n      <option value=\"active\">Active</option>\n      <option value=\"pending\">Pending</option>\n      <option value=\"rejected\">Rejected</option>\n    </select>\n    <div class=\"spacer\"></div>\n    <span class=\"toolbar-count\">{{filtered.length}} listings</span>\n  </div>\n\n  <div class=\"card\" style=\"padding:0\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th>Title</th>\n          <th>Company</th>\n          <th>Category</th>\n          <th>Price</th>\n          <th>Status</th>\n          <th>AI Insight</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let l of filtered\">\n          <td>\n            <strong style=\"color:var(--text)\">{{l.title}}</strong>\n            <div style=\"font-size:11px;color:var(--text3);margin-top:2px\">Posted {{l.posted}}</div>\n          </td>\n          <td style=\"color:var(--text2)\">{{l.company}}</td>\n          <td><span class=\"badge badge-neutral\">{{l.category}}</span></td>\n          <td><strong style=\"color:var(--primary)\">{{l.price}} TND</strong></td>\n          <td>\n            <span class=\"badge\"\n              [ngClass]=\"l.status==='active' ? 'badge-success' : l.status==='pending' ? 'badge-warning' : 'badge-danger'\">\n              {{l.status}}\n            </span>\n          </td>\n          <td><span class=\"ai-tip\">\uD83E\uDD16 {{l.ai}}</span></td>\n          <td>\n            <div style=\"display:flex;gap:6px\">\n              <button class=\"btn btn-outline btn-sm\" *ngIf=\"l.status==='pending'\" (click)=\"approve(l)\">Approve</button>\n              <button class=\"btn btn-danger btn-sm\" *ngIf=\"l.status==='pending'\" (click)=\"reject(l)\">Reject</button>\n              <button class=\"btn btn-ghost btn-sm\" *ngIf=\"l.status!=='pending'\">Edit</button>\n            </div>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <div class=\"empty-state\" *ngIf=\"filtered.length===0\">\n      <span class=\"empty-icon\">\uD83D\uDCCB</span>\n      <h3>No listings found</h3>\n      <p>Try adjusting your search or filters</p>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal-overlay\" *ngIf=\"showModal\" (click)=\"closeModal()\">\n  <div class=\"modal\" (click)=\"$event.stopPropagation()\">\n    <div class=\"modal-header\">\n      <h2>Add Listing</h2>\n      <button class=\"btn btn-icon\" (click)=\"closeModal()\">\u2715</button>\n    </div>\n    <div class=\"form-row\">\n      <div class=\"form-group\">\n        <label>Title</label>\n        <input type=\"text\" placeholder=\"e.g. Aluminum Scrap 2T\">\n      </div>\n      <div class=\"form-group\">\n        <label>Category</label>\n        <select>\n          <option>Metal</option>\n          <option>Plastic</option>\n          <option>Paper</option>\n          <option>Glass</option>\n          <option>Textile</option>\n        </select>\n      </div>\n    </div>\n    <div class=\"form-row\">\n      <div class=\"form-group\">\n        <label>Price (TND)</label>\n        <input type=\"number\" placeholder=\"0\">\n      </div>\n      <div class=\"form-group\">\n        <label>Quantity (kg)</label>\n        <input type=\"number\" placeholder=\"0\">\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label>Description</label>\n      <textarea placeholder=\"Describe the listing...\"></textarea>\n    </div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-outline\" (click)=\"closeModal()\">Cancel</button>\n      <button class=\"btn btn-primary\" (click)=\"closeModal()\">Create Listing</button>\n    </div>\n  </div>\n</div>", styles: ["/* uses global theme styles */"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Listings, { className: "Listings", filePath: "src/app/features/admin/listings/listings.ts", lineNumber: 9 }); })();
