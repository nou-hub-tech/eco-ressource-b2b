import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function MyStock_tr_36_button_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵtext(1, "List Now");
    i0.ɵɵelementEnd();
} }
function MyStock_tr_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong", 13);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td")(5, "span", 14);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td")(8, "strong", 13);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 15);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td", 16);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "span", 17);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "span", 18);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td")(21, "div", 19);
    i0.ɵɵtemplate(22, MyStock_tr_36_button_22_Template, 2, 0, "button", 20);
    i0.ɵɵelementStart(23, "button", 21);
    i0.ɵɵtext(24, "Edit");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const i_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i_r1.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i_r1.category);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i_r1.qty);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r1.unit);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r1.condition);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i_r1.status === "listed" ? "badge-success" : i_r1.status === "reserved" ? "badge-warning" : "badge-neutral");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i_r1.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\uD83E\uDD16 ", i_r1.ai);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", i_r1.status === "unlisted");
} }
function MyStock_div_37_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵlistener("click", function MyStock_div_37_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵelementStart(1, "div", 24);
    i0.ɵɵlistener("click", function MyStock_div_37_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 25)(3, "h2");
    i0.ɵɵtext(4, "Add Product");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 26);
    i0.ɵɵlistener("click", function MyStock_div_37_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(6, "\u2715");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 27)(8, "div", 28)(9, "label");
    i0.ɵɵtext(10, "Product Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 28)(13, "label");
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
    i0.ɵɵelementStart(26, "div", 27)(27, "div", 28)(28, "label");
    i0.ɵɵtext(29, "Quantity (kg)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 28)(32, "label");
    i0.ɵɵtext(33, "Condition");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "select")(35, "option");
    i0.ɵɵtext(36, "New");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "option");
    i0.ɵɵtext(38, "Good");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "option");
    i0.ɵɵtext(40, "Fair");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(41, "div", 28)(42, "label");
    i0.ɵɵtext(43, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(44, "textarea", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 32)(46, "button", 33);
    i0.ɵɵlistener("click", function MyStock_div_37_Template_button_click_46_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(47, "Cancel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "button", 3);
    i0.ɵɵlistener("click", function MyStock_div_37_Template_button_click_48_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.closeModal()); });
    i0.ɵɵtext(49, "Add Product");
    i0.ɵɵelementEnd()()()();
} }
export class MyStock {
    search = '';
    showModal = false;
    items = [
        { name: 'Aluminum Scrap', category: 'Metal', qty: 2000, unit: 'kg', condition: 'Good', status: 'listed', ai: 'Shortage in 2 weeks' },
        { name: 'Steel Offcuts', category: 'Metal', qty: 800, unit: 'kg', condition: 'Fair', status: 'listed', ai: 'Optimal price: 780/T' },
        { name: 'Cardboard Bales', category: 'Paper', qty: 1000, unit: 'kg', condition: 'Good', status: 'reserved', ai: 'High demand period' },
        { name: 'Plastic Waste', category: 'Plastic', qty: 200, unit: 'kg', condition: 'Fair', status: 'unlisted', ai: 'Post now — price up' },
    ];
    get filtered() { return this.items.filter(i => i.name.toLowerCase().includes(this.search.toLowerCase())); }
    ngOnInit() { }
    openModal() { this.showModal = true; }
    closeModal() { this.showModal = false; }
    static ɵfac = function MyStock_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MyStock)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MyStock, selectors: [["app-my-stock"]], standalone: false, decls: 38, vars: 4, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], [1, "btn", "btn-primary", 3, "click"], [1, "toolbar"], [1, "search-box"], ["type", "text", "placeholder", "Search products...", 3, "ngModelChange", "ngModel"], [1, "spacer"], [1, "toolbar-count"], [1, "card", 2, "padding", "0"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [2, "color", "var(--text)"], [1, "badge", "badge-neutral"], [2, "color", "var(--text3)", "font-size", "11px"], [2, "color", "var(--text2)"], [1, "badge", 3, "ngClass"], [1, "ai-tip"], [2, "display", "flex", "gap", "6px"], ["class", "btn btn-primary btn-sm", 4, "ngIf"], [1, "btn", "btn-outline", "btn-sm"], [1, "btn", "btn-primary", "btn-sm"], [1, "modal-overlay", 3, "click"], [1, "modal", 3, "click"], [1, "modal-header"], [1, "btn", "btn-icon", 3, "click"], [1, "form-row"], [1, "form-group"], ["type", "text", "placeholder", "e.g. Aluminum Scrap"], ["type", "number", "placeholder", "0"], ["placeholder", "Describe the product..."], [1, "modal-footer"], [1, "btn", "btn-outline", 3, "click"]], template: function MyStock_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "My Stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Track your industrial products and recyclable materials");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 3);
            i0.ɵɵlistener("click", function MyStock_Template_button_click_7_listener() { return ctx.openModal(); });
            i0.ɵɵtext(8, "+ Add Product");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "div", 5)(11, "span");
            i0.ɵɵtext(12, "\uD83D\uDD0D");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "input", 6);
            i0.ɵɵtwoWayListener("ngModelChange", function MyStock_Template_input_ngModelChange_13_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.search, $event) || (ctx.search = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(14, "div", 7);
            i0.ɵɵelementStart(15, "span", 8);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 9)(18, "table", 10)(19, "thead")(20, "tr")(21, "th");
            i0.ɵɵtext(22, "Product");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "th");
            i0.ɵɵtext(24, "Category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "th");
            i0.ɵɵtext(26, "Quantity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "th");
            i0.ɵɵtext(28, "Condition");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "th");
            i0.ɵɵtext(30, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "th");
            i0.ɵɵtext(32, "AI Insight");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "th");
            i0.ɵɵtext(34, "Actions");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "tbody");
            i0.ɵɵtemplate(36, MyStock_tr_36_Template, 25, 9, "tr", 11);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(37, MyStock_div_37_Template, 50, 0, "div", 12);
        } if (rf & 2) {
            i0.ɵɵadvance(13);
            i0.ɵɵtwoWayProperty("ngModel", ctx.search);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", ctx.filtered.length, " products");
            i0.ɵɵadvance(20);
            i0.ɵɵproperty("ngForOf", ctx.filtered);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showModal);
        } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MyStock, [{
        type: Component,
        args: [{ selector: 'app-my-stock', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\"><h1>My Stock</h1><p>Track your industrial products and recyclable materials</p></div>\n    <button class=\"btn btn-primary\" (click)=\"openModal()\">+ Add Product</button>\n  </div>\n  <div class=\"toolbar\">\n    <div class=\"search-box\"><span>\uD83D\uDD0D</span><input type=\"text\" placeholder=\"Search products...\" [(ngModel)]=\"search\"></div>\n    <div class=\"spacer\"></div>\n    <span class=\"toolbar-count\">{{filtered.length}} products</span>\n  </div>\n  <div class=\"card\" style=\"padding:0\">\n    <table class=\"data-table\">\n      <thead><tr><th>Product</th><th>Category</th><th>Quantity</th><th>Condition</th><th>Status</th><th>AI Insight</th><th>Actions</th></tr></thead>\n      <tbody>\n        <tr *ngFor=\"let i of filtered\">\n          <td><strong style=\"color:var(--text)\">{{i.name}}</strong></td>\n          <td><span class=\"badge badge-neutral\">{{i.category}}</span></td>\n          <td><strong style=\"color:var(--text)\">{{i.qty}}</strong> <span style=\"color:var(--text3);font-size:11px\">{{i.unit}}</span></td>\n          <td style=\"color:var(--text2)\">{{i.condition}}</td>\n          <td>\n            <span class=\"badge\" [ngClass]=\"i.status==='listed'?'badge-success':i.status==='reserved'?'badge-warning':'badge-neutral'\">{{i.status}}</span>\n          </td>\n          <td><span class=\"ai-tip\">\uD83E\uDD16 {{i.ai}}</span></td>\n          <td>\n            <div style=\"display:flex;gap:6px\">\n              <button class=\"btn btn-primary btn-sm\" *ngIf=\"i.status==='unlisted'\">List Now</button>\n              <button class=\"btn btn-outline btn-sm\">Edit</button>\n            </div>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n<div class=\"modal-overlay\" *ngIf=\"showModal\" (click)=\"closeModal()\">\n  <div class=\"modal\" (click)=\"$event.stopPropagation()\">\n    <div class=\"modal-header\"><h2>Add Product</h2><button class=\"btn btn-icon\" (click)=\"closeModal()\">\u2715</button></div>\n    <div class=\"form-row\">\n      <div class=\"form-group\"><label>Product Name</label><input type=\"text\" placeholder=\"e.g. Aluminum Scrap\"></div>\n      <div class=\"form-group\"><label>Category</label><select><option>Metal</option><option>Plastic</option><option>Paper</option><option>Glass</option><option>Textile</option></select></div>\n    </div>\n    <div class=\"form-row\">\n      <div class=\"form-group\"><label>Quantity (kg)</label><input type=\"number\" placeholder=\"0\"></div>\n      <div class=\"form-group\"><label>Condition</label><select><option>New</option><option>Good</option><option>Fair</option></select></div>\n    </div>\n    <div class=\"form-group\"><label>Description</label><textarea placeholder=\"Describe the product...\"></textarea></div>\n    <div class=\"modal-footer\">\n      <button class=\"btn btn-outline\" (click)=\"closeModal()\">Cancel</button>\n      <button class=\"btn btn-primary\" (click)=\"closeModal()\">Add Product</button>\n    </div>\n  </div>\n</div>", styles: ["/* theme */"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MyStock, { className: "MyStock", filePath: "src/app/features/enterprise/my-stock/my-stock.ts", lineNumber: 3 }); })();
