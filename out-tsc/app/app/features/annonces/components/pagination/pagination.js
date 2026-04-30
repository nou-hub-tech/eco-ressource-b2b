import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function Pagination_div_0_ng_container_4_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1, "...");
    i0.ɵɵelementEnd();
} }
function Pagination_div_0_ng_container_4_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function Pagination_div_0_ng_container_4_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const p_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.goTo(p_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", p_r4 === ctx_r1.currentPage);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(p_r4);
} }
function Pagination_div_0_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, Pagination_div_0_ng_container_4_span_1_Template, 2, 0, "span", 8)(2, Pagination_div_0_ng_container_4_button_2_Template, 2, 3, "button", 9);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const p_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r4 === -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r4 !== -1);
} }
function Pagination_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "button", 2);
    i0.ɵɵlistener("click", function Pagination_div_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goTo(ctx_r1.currentPage - 1)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 3);
    i0.ɵɵelement(3, "path", 4);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(4, Pagination_div_0_ng_container_4_Template, 3, 2, "ng-container", 5);
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "button", 2);
    i0.ɵɵlistener("click", function Pagination_div_0_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goTo(ctx_r1.currentPage + 1)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(6, "svg", 3);
    i0.ɵɵelement(7, "path", 6);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(8, "span", 7);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === 1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.pages);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.currentPage === ctx_r1.totalPages);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("Page ", ctx_r1.currentPage, " / ", ctx_r1.totalPages);
} }
export class Pagination {
    currentPage = 1;
    totalItems = 0;
    pageSize = 10;
    pageChange = new EventEmitter();
    get totalPages() {
        return Math.ceil(this.totalItems / this.pageSize);
    }
    get pages() {
        const total = this.totalPages;
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        const pages = [1];
        const start = Math.max(2, this.currentPage - 1);
        const end = Math.min(total - 1, this.currentPage + 1);
        if (start > 2)
            pages.push(-1);
        for (let i = start; i <= end; i++)
            pages.push(i);
        if (end < total - 1)
            pages.push(-1);
        pages.push(total);
        return pages;
    }
    goTo(page) {
        if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
            this.pageChange.emit(page);
        }
    }
    static ɵfac = function Pagination_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Pagination)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Pagination, selectors: [["app-pagination"]], inputs: { currentPage: "currentPage", totalItems: "totalItems", pageSize: "pageSize" }, outputs: { pageChange: "pageChange" }, standalone: false, decls: 1, vars: 1, consts: [["class", "pagination-wrap", 4, "ngIf"], [1, "pagination-wrap"], [1, "pg-btn", "pg-nav", 3, "click", "disabled"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M15 18l-6-6 6-6"], [4, "ngFor", "ngForOf"], ["d", "M9 18l6-6-6-6"], [1, "pg-info"], ["class", "pg-dots", 4, "ngIf"], ["class", "pg-btn pg-num", 3, "active", "click", 4, "ngIf"], [1, "pg-dots"], [1, "pg-btn", "pg-num", 3, "click"]], template: function Pagination_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, Pagination_div_0_Template, 10, 5, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.totalPages > 1);
        } }, dependencies: [i1.NgForOf, i1.NgIf], styles: [".pagination-wrap[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:4px;padding:24px 0;flex-wrap:wrap}\n.pg-btn[_ngcontent-%COMP%]{width:36px;height:36px;border-radius:10px;border:none;background:transparent;color:var(--text3);font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}\n.pg-btn[_ngcontent-%COMP%]:hover:not(:disabled):not(.active){background:var(--bg3,#f1f5f9);color:var(--text)}\n.pg-btn.active[_ngcontent-%COMP%]{background:var(--primary);color:#fff;box-shadow:0 2px 8px rgba(2,132,199,.2)}\n.pg-btn[_ngcontent-%COMP%]:disabled{opacity:.3;cursor:not-allowed}\n.pg-nav[_ngcontent-%COMP%]{width:36px}\n.pg-dots[_ngcontent-%COMP%]{color:var(--muted);font-size:14px;padding:0 2px}\n.pg-info[_ngcontent-%COMP%]{font-size:12px;color:var(--text3);margin-left:12px;font-weight:500}\n@media(max-width:600px){.pg-info[_ngcontent-%COMP%]{display:none}.pg-btn[_ngcontent-%COMP%]{width:32px;height:32px;font-size:12px}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Pagination, [{
        type: Component,
        args: [{ selector: 'app-pagination', standalone: false, template: "<div class=\"pagination-wrap\" *ngIf=\"totalPages > 1\">\n  <button class=\"pg-btn pg-nav\" [disabled]=\"currentPage === 1\" (click)=\"goTo(currentPage - 1)\">\n    <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 18l-6-6 6-6\"/></svg>\n  </button>\n\n  <ng-container *ngFor=\"let p of pages\">\n    <span class=\"pg-dots\" *ngIf=\"p === -1\">...</span>\n    <button class=\"pg-btn pg-num\" *ngIf=\"p !== -1\" [class.active]=\"p === currentPage\" (click)=\"goTo(p)\">{{p}}</button>\n  </ng-container>\n\n  <button class=\"pg-btn pg-nav\" [disabled]=\"currentPage === totalPages\" (click)=\"goTo(currentPage + 1)\">\n    <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 18l6-6-6-6\"/></svg>\n  </button>\n\n  <span class=\"pg-info\">Page {{currentPage}} / {{totalPages}}</span>\n</div>\n", styles: [".pagination-wrap{display:flex;align-items:center;justify-content:center;gap:4px;padding:24px 0;flex-wrap:wrap}\n.pg-btn{width:36px;height:36px;border-radius:10px;border:none;background:transparent;color:var(--text3);font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}\n.pg-btn:hover:not(:disabled):not(.active){background:var(--bg3,#f1f5f9);color:var(--text)}\n.pg-btn.active{background:var(--primary);color:#fff;box-shadow:0 2px 8px rgba(2,132,199,.2)}\n.pg-btn:disabled{opacity:.3;cursor:not-allowed}\n.pg-nav{width:36px}\n.pg-dots{color:var(--muted);font-size:14px;padding:0 2px}\n.pg-info{font-size:12px;color:var(--text3);margin-left:12px;font-weight:500}\n@media(max-width:600px){.pg-info{display:none}.pg-btn{width:32px;height:32px;font-size:12px}}\n"] }]
    }], null, { currentPage: [{
            type: Input
        }], totalItems: [{
            type: Input
        }], pageSize: [{
            type: Input
        }], pageChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Pagination, { className: "Pagination", filePath: "src/app/features/annonces/components/pagination/pagination.ts", lineNumber: 9 }); })();
