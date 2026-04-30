import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/stock-movement.service";
import * as i2 from "../../services/stock-item.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
function StockMovementList_option_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 9);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", s_r1.idStock);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (s_r1.product == null ? null : s_r1.product.name) || "Stock #" + s_r1.idStock, " ");
} }
function StockMovementList_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.loadError);
} }
function StockMovementList_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelement(1, "div", 18);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement\u2026");
    i0.ɵɵelementEnd()();
} }
function StockMovementList_div_22_tr_17_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(m_r4.movementType);
} }
function StockMovementList_div_22_tr_17_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function StockMovementList_div_22_tr_17_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtemplate(4, StockMovementList_div_22_tr_17_span_4_Template, 2, 1, "span", 23)(5, StockMovementList_div_22_tr_17_span_5_Template, 2, 0, "span", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 25);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 26)(14, "button", 27);
    i0.ɵɵlistener("click", function StockMovementList_div_22_tr_17_Template_button_click_14_listener() { const m_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.goEdit(m_r4.id)); });
    i0.ɵɵtext(15, "Modifier");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const m_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r4.movementDate || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", m_r4.movementType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !m_r4.movementType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 6, m_r4.quantity, "1.0-3"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.stockLabel(m_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r4.description || "\u2014");
} }
function StockMovementList_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "div", 20)(2, "table", 21)(3, "thead")(4, "tr")(5, "th");
    i0.ɵɵtext(6, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Article");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "th");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "tbody");
    i0.ɵɵtemplate(17, StockMovementList_div_22_tr_17_Template, 16, 9, "tr", 22);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("ngForOf", ctx_r1.movements);
} }
function StockMovementList_div_23_div_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(m_r6.movementType);
} }
function StockMovementList_div_23_div_1_p_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(m_r6.description);
} }
function StockMovementList_div_23_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31)(1, "div", 32);
    i0.ɵɵtemplate(2, StockMovementList_div_23_div_1_span_2_Template, 2, 1, "span", 23);
    i0.ɵɵelementStart(3, "span", 33);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p", 34);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 35);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, StockMovementList_div_23_div_1_p_10_Template, 2, 1, "p", 36);
    i0.ɵɵelementStart(11, "button", 37);
    i0.ɵɵlistener("click", function StockMovementList_div_23_div_1_Template_button_click_11_listener() { const m_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.goEdit(m_r6.id)); });
    i0.ɵɵtext(12, " Modifier ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const m_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", m_r6.movementType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(m_r6.movementDate || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.stockLabel(m_r6));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Quantit\u00E9 : ", i0.ɵɵpipeBind2(9, 5, m_r6.quantity, "1.0-3"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", m_r6.description);
} }
function StockMovementList_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtemplate(1, StockMovementList_div_23_div_1_Template, 13, 8, "div", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.movements);
} }
function StockMovementList_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39)(1, "span", 40);
    i0.ɵɵtext(2, "\uD83D\uDCCB");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Aucun mouvement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Cr\u00E9ez un mouvement ou modifiez le filtre.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 41);
    i0.ɵɵtext(8, " Nouveau mouvement ");
    i0.ɵɵelementEnd()();
} }
export class StockMovementList {
    movementService;
    stockItemService;
    router;
    movements = [];
    stockItems = [];
    loading = true;
    loadError = '';
    filterStockItemId = '';
    constructor(movementService, stockItemService, router) {
        this.movementService = movementService;
        this.stockItemService = stockItemService;
        this.router = router;
    }
    ngOnInit() {
        this.stockItemService.findAll().subscribe({
            next: (items) => (this.stockItems = items),
            error: () => { }
        });
        this.loadMovements();
    }
    loadMovements() {
        this.loading = true;
        this.loadError = '';
        const stockItemId = this.filterStockItemId === '' ? undefined : Number(this.filterStockItemId);
        this.movementService.findAll(stockItemId).subscribe({
            next: (data) => {
                this.movements = data;
                this.loading = false;
            },
            error: () => {
                this.loadError = 'Impossible de charger les mouvements de stock.';
                this.loading = false;
            }
        });
    }
    stockLabel(m) {
        const s = m.stockItem;
        if (!s)
            return '—';
        const name = s.product?.name;
        return name ? `${name} (#${s.idStock})` : `Stock #${s.idStock}`;
    }
    goEdit(id) {
        this.router.navigate(['/enterprise/annonces/stock/movements', id, 'edit']);
    }
    static ɵfac = function StockMovementList_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StockMovementList)(i0.ɵɵdirectiveInject(i1.StockMovementService), i0.ɵɵdirectiveInject(i2.StockItemService), i0.ɵɵdirectiveInject(i3.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StockMovementList, selectors: [["app-stock-movement-list"]], standalone: false, decls: 25, vars: 8, consts: [[1, "page-wrapper"], [1, "page-header-row", "sml-header-row"], [1, "page-header", 2, "margin", "0"], [1, "sml-actions"], ["routerLink", "/enterprise/annonces/stock", 1, "btn", "btn-outline"], ["routerLink", "/enterprise/annonces/stock/movements/create", 1, "btn", "btn-primary"], [1, "card", "sml-filters"], [1, "form-group", "sml-filter"], [1, "filter-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "sml-loading", 4, "ngIf"], ["class", "card sml-table-wrap", 4, "ngIf"], ["class", "sml-cards", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "alert", "alert-danger"], [1, "sml-loading"], [1, "spinner-lg"], [1, "card", "sml-table-wrap"], [1, "sml-table-scroll"], [1, "sml-table"], [4, "ngFor", "ngForOf"], ["class", "sml-type", 4, "ngIf"], [4, "ngIf"], [1, "sml-desc"], [1, "sml-actions-cell"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click"], [1, "sml-type"], [1, "sml-cards"], ["class", "card sml-card", 4, "ngFor", "ngForOf"], [1, "card", "sml-card"], [1, "sml-card-top"], [1, "sml-date"], [1, "sml-card-stock"], [1, "sml-card-qty"], ["class", "sml-card-desc", 4, "ngIf"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "sml-card-btn", 3, "click"], [1, "sml-card-desc"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/enterprise/annonces/stock/movements/create", 1, "btn", "btn-primary", 2, "margin-top", "12px"]], template: function StockMovementList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Mouvements de stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Entr\u00E9es, sorties et ajustements");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 3)(8, "a", 4);
            i0.ɵɵtext(9, "Articles en stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "a", 5);
            i0.ɵɵtext(11, " Nouveau mouvement ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "div", 6)(13, "div", 7)(14, "label");
            i0.ɵɵtext(15, "Article en stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "select", 8);
            i0.ɵɵtwoWayListener("ngModelChange", function StockMovementList_Template_select_ngModelChange_16_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterStockItemId, $event) || (ctx.filterStockItemId = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function StockMovementList_Template_select_ngModelChange_16_listener() { return ctx.loadMovements(); });
            i0.ɵɵelementStart(17, "option", 9);
            i0.ɵɵtext(18, "Tous les articles");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(19, StockMovementList_option_19_Template, 2, 2, "option", 10);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(20, StockMovementList_div_20_Template, 2, 1, "div", 11)(21, StockMovementList_div_21_Template, 4, 0, "div", 12)(22, StockMovementList_div_22_Template, 18, 1, "div", 13)(23, StockMovementList_div_23_Template, 2, 1, "div", 14)(24, StockMovementList_div_24_Template, 9, 0, "div", 15);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(16);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterStockItemId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngValue", "");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.stockItems);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loadError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.movements.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.movements.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.movements.length === 0);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.NgModel, i3.RouterLink, i4.DecimalPipe], styles: [".sml-header-row[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.sml-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.sml-filters[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 16px 18px;\n}\n\n.sml-filter[_ngcontent-%COMP%] {\n  max-width: 400px;\n  margin-bottom: 0;\n}\n\n.sml-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sml-spin 0.7s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_sml-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.sml-table-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n  display: none;\n}\n\n.sml-table-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.sml-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n\n.sml-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.sml-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 1px solid var(--border);\n  color: var(--text);\n}\n\n.sml-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  background: var(--bg3, var(--bg2));\n  color: var(--text2, var(--text));\n}\n\n.sml-type[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  background: var(--bg3, var(--bg2));\n  border: 1px solid var(--border);\n}\n\n.sml-desc[_ngcontent-%COMP%] {\n  max-width: 220px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.sml-actions-cell[_ngcontent-%COMP%] {\n  text-align: right;\n  white-space: nowrap;\n}\n\n.sml-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.sml-card[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n\n.sml-card-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 8px;\n}\n\n.sml-date[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text3);\n}\n\n.sml-card-stock[_ngcontent-%COMP%] {\n  margin: 0 0 6px;\n  font-weight: 700;\n  color: var(--text);\n}\n\n.sml-card-qty[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 14px;\n  color: var(--text2, var(--text));\n}\n\n.sml-card-desc[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  font-size: 13px;\n  color: var(--text3);\n}\n\n.sml-card-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  justify-content: center;\n}\n\n@media (min-width: 900px) {\n  .sml-table-wrap[_ngcontent-%COMP%] {\n    display: block;\n  }\n\n  .sml-cards[_ngcontent-%COMP%] {\n    display: none;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StockMovementList, [{
        type: Component,
        args: [{ selector: 'app-stock-movement-list', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row sml-header-row\">\n    <div class=\"page-header\" style=\"margin:0\">\n      <h1>Mouvements de stock</h1>\n      <p>Entr\u00E9es, sorties et ajustements</p>\n    </div>\n    <div class=\"sml-actions\">\n      <a class=\"btn btn-outline\" routerLink=\"/enterprise/annonces/stock\">Articles en stock</a>\n      <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/stock/movements/create\">\n        Nouveau mouvement\n      </a>\n    </div>\n  </div>\n\n  <div class=\"card sml-filters\">\n    <div class=\"form-group sml-filter\">\n      <label>Article en stock</label>\n      <select\n        class=\"filter-select\"\n        [(ngModel)]=\"filterStockItemId\"\n        (ngModelChange)=\"loadMovements()\">\n        <option [ngValue]=\"''\">Tous les articles</option>\n        <option *ngFor=\"let s of stockItems\" [ngValue]=\"s.idStock\">\n          {{ s.product?.name || 'Stock #' + s.idStock }}\n        </option>\n      </select>\n    </div>\n  </div>\n\n  <div class=\"alert alert-danger\" *ngIf=\"loadError\">{{ loadError }}</div>\n\n  <div class=\"sml-loading\" *ngIf=\"loading\">\n    <div class=\"spinner-lg\"></div>\n    <p>Chargement\u2026</p>\n  </div>\n\n  <div class=\"card sml-table-wrap\" *ngIf=\"!loading && movements.length > 0\">\n    <div class=\"sml-table-scroll\">\n      <table class=\"sml-table\">\n        <thead>\n          <tr>\n            <th>Date</th>\n            <th>Type</th>\n            <th>Quantit\u00E9</th>\n            <th>Article</th>\n            <th>Description</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let m of movements\">\n            <td>{{ m.movementDate || '\u2014' }}</td>\n            <td>\n              <span class=\"sml-type\" *ngIf=\"m.movementType\">{{ m.movementType }}</span>\n              <span *ngIf=\"!m.movementType\">\u2014</span>\n            </td>\n            <td>{{ m.quantity | number : '1.0-3' }}</td>\n            <td>{{ stockLabel(m) }}</td>\n            <td class=\"sml-desc\">{{ m.description || '\u2014' }}</td>\n            <td class=\"sml-actions-cell\">\n              <button type=\"button\" class=\"btn btn-outline btn-sm\" (click)=\"goEdit(m.id)\">Modifier</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"sml-cards\" *ngIf=\"!loading && movements.length > 0\">\n    <div class=\"card sml-card\" *ngFor=\"let m of movements\">\n      <div class=\"sml-card-top\">\n        <span class=\"sml-type\" *ngIf=\"m.movementType\">{{ m.movementType }}</span>\n        <span class=\"sml-date\">{{ m.movementDate || '\u2014' }}</span>\n      </div>\n      <p class=\"sml-card-stock\">{{ stockLabel(m) }}</p>\n      <p class=\"sml-card-qty\">Quantit\u00E9 : {{ m.quantity | number : '1.0-3' }}</p>\n      <p class=\"sml-card-desc\" *ngIf=\"m.description\">{{ m.description }}</p>\n      <button type=\"button\" class=\"btn btn-primary btn-sm sml-card-btn\" (click)=\"goEdit(m.id)\">\n        Modifier\n      </button>\n    </div>\n  </div>\n\n  <div class=\"empty-state\" *ngIf=\"!loading && movements.length === 0\">\n    <span class=\"empty-icon\">\uD83D\uDCCB</span>\n    <h3>Aucun mouvement</h3>\n    <p>Cr\u00E9ez un mouvement ou modifiez le filtre.</p>\n    <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/stock/movements/create\" style=\"margin-top:12px\">\n      Nouveau mouvement\n    </a>\n  </div>\n</div>\n", styles: [".sml-header-row {\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.sml-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.sml-filters {\n  margin-bottom: 16px;\n  padding: 16px 18px;\n}\n\n.sml-filter {\n  max-width: 400px;\n  margin-bottom: 0;\n}\n\n.sml-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.spinner-lg {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: sml-spin 0.7s linear infinite;\n}\n\n@keyframes sml-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.sml-table-wrap {\n  padding: 0;\n  overflow: hidden;\n  display: none;\n}\n\n.sml-table-scroll {\n  overflow-x: auto;\n}\n\n.sml-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n\n.sml-table th,\n.sml-table td {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 1px solid var(--border);\n  color: var(--text);\n}\n\n.sml-table th {\n  font-weight: 600;\n  background: var(--bg3, var(--bg2));\n  color: var(--text2, var(--text));\n}\n\n.sml-type {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n  font-weight: 600;\n  background: var(--bg3, var(--bg2));\n  border: 1px solid var(--border);\n}\n\n.sml-desc {\n  max-width: 220px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.sml-actions-cell {\n  text-align: right;\n  white-space: nowrap;\n}\n\n.sml-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.sml-card {\n  padding: 16px;\n}\n\n.sml-card-top {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 8px;\n}\n\n.sml-date {\n  font-size: 13px;\n  color: var(--text3);\n}\n\n.sml-card-stock {\n  margin: 0 0 6px;\n  font-weight: 700;\n  color: var(--text);\n}\n\n.sml-card-qty {\n  margin: 0 0 8px;\n  font-size: 14px;\n  color: var(--text2, var(--text));\n}\n\n.sml-card-desc {\n  margin: 0 0 12px;\n  font-size: 13px;\n  color: var(--text3);\n}\n\n.sml-card-btn {\n  width: 100%;\n  justify-content: center;\n}\n\n@media (min-width: 900px) {\n  .sml-table-wrap {\n    display: block;\n  }\n\n  .sml-cards {\n    display: none;\n  }\n}\n"] }]
    }], () => [{ type: i1.StockMovementService }, { type: i2.StockItemService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StockMovementList, { className: "StockMovementList", filePath: "src/app/features/annonces/stock/stock-movement-list/stock-movement-list.ts", lineNumber: 13 }); })();
