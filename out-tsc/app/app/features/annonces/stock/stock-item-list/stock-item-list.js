import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/stock-item.service";
import * as i2 from "../../services/product-annonces.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "../../components/confirm-dialog/confirm-dialog";
const _c0 = a0 => ["/enterprise/annonces/stock", a0];
const _c1 = a0 => ["/enterprise/annonces/stock", a0, "edit"];
function StockItemList_option_20_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" (", p_r1.category, ")");
} }
function StockItemList_option_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 10);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, StockItemList_option_20_span_2_Template, 2, 1, "span", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r1 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", p_r1.idProduct);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", p_r1.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r1.category);
} }
function StockItemList_button_28_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 25);
    i0.ɵɵlistener("click", function StockItemList_button_28_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.clearCompanyFilter()); });
    i0.ɵɵtext(1, " R\u00E9initialiser soci\u00E9t\u00E9 ");
    i0.ɵɵelementEnd();
} }
function StockItemList_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.loadError);
} }
function StockItemList_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵelement(1, "div", 28);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement du stock\u2026");
    i0.ɵɵelementEnd()();
} }
function StockItemList_div_31_tr_17_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r5.status);
} }
function StockItemList_div_31_tr_17_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function StockItemList_div_31_tr_17_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "button", 33);
    i0.ɵɵlistener("click", function StockItemList_div_31_tr_17_Template_button_click_2_listener() { const row_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.goDetail(row_r5.idStock)); });
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtemplate(13, StockItemList_div_31_tr_17_span_13_Template, 2, 1, "span", 34)(14, StockItemList_div_31_tr_17_span_14_Template, 2, 0, "span", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 35)(16, "a", 36);
    i0.ɵɵtext(17, "Voir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "a", 37);
    i0.ɵɵtext(19, " Modifier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "button", 38);
    i0.ɵɵlistener("click", function StockItemList_div_31_tr_17_Template_button_click_20_listener() { const row_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openDelete(row_r5)); });
    i0.ɵɵtext(21, " Supprimer ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.productLabel(row_r5), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 8, row_r5.quantity, "1.0-3"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r5.unit || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(11, 11, row_r5.unitPrice, "1.2-2"), " TND");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", row_r5.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !row_r5.status);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(14, _c0, row_r5.idStock));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(16, _c1, row_r5.idStock));
} }
function StockItemList_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "div", 30)(2, "table", 31)(3, "thead")(4, "tr")(5, "th");
    i0.ɵɵtext(6, "Produit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Unit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Prix unitaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "th");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "tbody");
    i0.ɵɵtemplate(17, StockItemList_div_31_tr_17_Template, 22, 18, "tr", 32);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("ngForOf", ctx_r2.items);
} }
function StockItemList_div_32_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r7.status);
} }
function StockItemList_div_32_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 43)(2, "h3", 44);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, StockItemList_div_32_div_1_span_4_Template, 2, 1, "span", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "dl", 45)(6, "div")(7, "dt");
    i0.ɵɵtext(8, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "dd");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div")(13, "dt");
    i0.ɵɵtext(14, "Prix unitaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "dd");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "number");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "div", 46)(19, "a", 37);
    i0.ɵɵtext(20, "Voir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "a", 47);
    i0.ɵɵtext(22, " Modifier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 38);
    i0.ɵɵlistener("click", function StockItemList_div_32_div_1_Template_button_click_23_listener() { const row_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openDelete(row_r7)); });
    i0.ɵɵtext(24, "Supprimer");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.productLabel(row_r7));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r7.status);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(11, 7, row_r7.quantity, "1.0-3"), " ", row_r7.unit || "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(17, 10, row_r7.unitPrice, "1.2-2"), " TND");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(13, _c0, row_r7.idStock));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(15, _c1, row_r7.idStock));
} }
function StockItemList_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtemplate(1, StockItemList_div_32_div_1_Template, 25, 17, "div", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.items);
} }
function StockItemList_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "span", 49);
    i0.ɵɵtext(2, "\uD83D\uDCE6");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Aucun article en stock");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Ajustez les filtres ou cr\u00E9ez un nouvel article.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 50);
    i0.ɵɵtext(8, " Cr\u00E9er un article ");
    i0.ɵɵelementEnd()();
} }
function StockItemList_div_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.deleteError);
} }
export class StockItemList {
    stockItemService;
    productService;
    router;
    items = [];
    products = [];
    loading = true;
    loadError = '';
    filterProductId = '';
    filterCompanyId = null;
    showDeleteConfirm = false;
    pendingDelete = null;
    deleteError = '';
    constructor(stockItemService, productService, router) {
        this.stockItemService = stockItemService;
        this.productService = productService;
        this.router = router;
    }
    ngOnInit() {
        this.productService.findAll().subscribe({
            next: (p) => (this.products = p),
            error: () => { }
        });
        this.loadItems();
    }
    loadItems() {
        this.loading = true;
        this.loadError = '';
        const productId = this.filterProductId === '' ? undefined : Number(this.filterProductId);
        const companyId = this.filterCompanyId !== null && this.filterCompanyId !== undefined && !Number.isNaN(this.filterCompanyId)
            ? this.filterCompanyId
            : undefined;
        this.stockItemService.findAll(productId, companyId).subscribe({
            next: (data) => {
                this.items = data;
                this.loading = false;
            },
            error: () => {
                this.loadError = 'Impossible de charger les articles en stock.';
                this.loading = false;
            }
        });
    }
    onFiltersChange() {
        this.loadItems();
    }
    clearCompanyFilter() {
        this.filterCompanyId = null;
        this.loadItems();
    }
    openDelete(item) {
        this.pendingDelete = item;
        this.deleteError = '';
        this.showDeleteConfirm = true;
    }
    cancelDelete() {
        this.showDeleteConfirm = false;
        this.pendingDelete = null;
    }
    confirmDelete() {
        if (!this.pendingDelete)
            return;
        this.deleteError = '';
        this.stockItemService.delete(this.pendingDelete.idStock).subscribe({
            next: () => {
                this.showDeleteConfirm = false;
                this.pendingDelete = null;
                this.loadItems();
            },
            error: (err) => {
                this.deleteError =
                    err.error?.message || 'La suppression a échoué. Réessayez plus tard.';
            }
        });
    }
    productLabel(item) {
        return item.product?.name ?? '—';
    }
    goDetail(id) {
        this.router.navigate(['/enterprise/annonces/stock', id]);
    }
    static ɵfac = function StockItemList_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StockItemList)(i0.ɵɵdirectiveInject(i1.StockItemService), i0.ɵɵdirectiveInject(i2.ProductAnnoncesService), i0.ɵɵdirectiveInject(i3.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StockItemList, selectors: [["app-stock-item-list"]], standalone: false, decls: 36, vars: 13, consts: [[1, "page-wrapper"], [1, "page-header-row", "sil-header-row"], [1, "page-header", 2, "margin", "0"], [1, "sil-actions"], ["routerLink", "/enterprise/annonces/stock/movements", 1, "btn", "btn-outline"], ["routerLink", "/enterprise/annonces/stock/create", 1, "btn", "btn-primary"], [1, "card", "sil-filters"], [1, "form-row", "sil-filter-row"], [1, "form-group", "sil-grow"], [1, "filter-select", 3, "ngModelChange", "ngModel"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], [1, "form-group", "sil-company"], ["type", "number", "placeholder", "Filtrer par soci\u00E9t\u00E9\u2026", "min", "1", 3, "ngModelChange", "ngModel"], [1, "form-group", "sil-filter-actions"], [1, "sil-label-spacer"], ["type", "button", "class", "btn btn-ghost btn-sm", 3, "click", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], ["class", "sil-loading", 4, "ngIf"], ["class", "card sil-table-wrap", 4, "ngIf"], ["class", "sil-cards", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["title", "Supprimer cet article ?", "message", "Cette action est d\u00E9finitive. Les mouvements associ\u00E9s peuvent \u00EAtre impact\u00E9s.", "confirmLabel", "Supprimer", "cancelLabel", "Annuler", 3, "confirmed", "cancelled", "visible", "danger"], ["class", "alert alert-danger sil-dialog-error", 4, "ngIf"], [4, "ngIf"], ["type", "button", 1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "alert", "alert-danger"], [1, "sil-loading"], [1, "spinner-lg"], [1, "card", "sil-table-wrap"], [1, "sil-table-scroll"], [1, "sil-table"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "sil-link", 3, "click"], ["class", "sil-badge", 4, "ngIf"], [1, "sil-actions-cell"], [1, "btn", "btn-ghost", "btn-sm", 3, "routerLink"], [1, "btn", "btn-outline", "btn-sm", 3, "routerLink"], ["type", "button", 1, "btn", "btn-danger", "btn-sm", 3, "click"], [1, "sil-badge"], [1, "sil-cards"], ["class", "card sil-card", 4, "ngFor", "ngForOf"], [1, "card", "sil-card"], [1, "sil-card-top"], [1, "sil-card-title"], [1, "sil-dl"], [1, "sil-card-actions"], [1, "btn", "btn-primary", "btn-sm", 3, "routerLink"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/enterprise/annonces/stock/create", 1, "btn", "btn-primary", 2, "margin-top", "12px"], [1, "alert", "alert-danger", "sil-dialog-error"]], template: function StockItemList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Stock");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "Gestion des articles en entrep\u00F4t");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 3)(8, "a", 4);
            i0.ɵɵtext(9, " Mouvements ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "a", 5);
            i0.ɵɵtext(11, " Nouvel article ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "div", 6)(13, "div", 7)(14, "div", 8)(15, "label");
            i0.ɵɵtext(16, "Produit");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "select", 9);
            i0.ɵɵtwoWayListener("ngModelChange", function StockItemList_Template_select_ngModelChange_17_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterProductId, $event) || (ctx.filterProductId = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function StockItemList_Template_select_ngModelChange_17_listener() { return ctx.onFiltersChange(); });
            i0.ɵɵelementStart(18, "option", 10);
            i0.ɵɵtext(19, "Tous les produits");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, StockItemList_option_20_Template, 3, 3, "option", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 12)(22, "label");
            i0.ɵɵtext(23, "ID entreprise");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "input", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function StockItemList_Template_input_ngModelChange_24_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterCompanyId, $event) || (ctx.filterCompanyId = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function StockItemList_Template_input_ngModelChange_24_listener() { return ctx.onFiltersChange(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 14)(26, "label", 15);
            i0.ɵɵtext(27, "\u00A0");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(28, StockItemList_button_28_Template, 2, 0, "button", 16);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(29, StockItemList_div_29_Template, 2, 1, "div", 17)(30, StockItemList_div_30_Template, 4, 0, "div", 18)(31, StockItemList_div_31_Template, 18, 1, "div", 19)(32, StockItemList_div_32_Template, 2, 1, "div", 20)(33, StockItemList_div_33_Template, 9, 0, "div", 21);
            i0.ɵɵelementStart(34, "app-confirm-dialog", 22);
            i0.ɵɵlistener("confirmed", function StockItemList_Template_app_confirm_dialog_confirmed_34_listener() { return ctx.confirmDelete(); })("cancelled", function StockItemList_Template_app_confirm_dialog_cancelled_34_listener() { return ctx.cancelDelete(); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(35, StockItemList_div_35_Template, 2, 1, "div", 23);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(17);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterProductId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngValue", "");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.products);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterCompanyId);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.filterCompanyId !== null && ctx.filterCompanyId !== undefined);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loadError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.items.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.items.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.items.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("visible", ctx.showDeleteConfirm)("danger", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.deleteError);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i5.DefaultValueAccessor, i5.NumberValueAccessor, i5.SelectControlValueAccessor, i5.NgControlStatus, i5.MinValidator, i5.NgModel, i3.RouterLink, i6.ConfirmDialog, i4.DecimalPipe], styles: [".sil-header-row[_ngcontent-%COMP%] {\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.sil-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n}\n\n.sil-filters[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 16px 18px;\n}\n\n.sil-filter-row[_ngcontent-%COMP%] {\n  align-items: flex-end;\n  margin-bottom: 0;\n}\n\n.sil-grow[_ngcontent-%COMP%] {\n  flex: 1 1 200px;\n  min-width: 0;\n}\n\n.sil-company[_ngcontent-%COMP%] {\n  flex: 0 1 180px;\n}\n\n.sil-filter-actions[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n}\n\n.sil-label-spacer[_ngcontent-%COMP%] {\n  visibility: hidden;\n}\n\n.sil-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sil-spin 0.7s linear infinite;\n}\n\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sil-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes _ngcontent-%COMP%_sil-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.sil-table-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n  display: none;\n}\n\n.sil-table-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.sil-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n\n.sil-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.sil-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 1px solid var(--border);\n  color: var(--text);\n}\n\n.sil-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--text2, var(--text));\n  background: var(--bg3, var(--bg2));\n}\n\n.sil-link[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  padding: 0;\n  color: var(--primary);\n  font: inherit;\n  cursor: pointer;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n\n.sil-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n  background: var(--bg3, var(--bg2));\n  border: 1px solid var(--border);\n  color: var(--text2, var(--text));\n}\n\n.sil-actions-cell[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  text-align: right;\n}\n\n.sil-actions-cell[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-left: 6px;\n}\n\n.sil-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.sil-card[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n\n.sil-card-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n\n.sil-card-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text);\n}\n\n.sil-dl[_ngcontent-%COMP%] {\n  margin: 0 0 14px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n\n.sil-dl[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text3);\n  margin: 0 0 2px;\n}\n\n.sil-dl[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: var(--text);\n}\n\n.sil-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.sil-dialog-error[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n\n.sil-deleting-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.08);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  pointer-events: all;\n}\n\n@media (min-width: 900px) {\n  .sil-table-wrap[_ngcontent-%COMP%] {\n    display: block;\n  }\n\n  .sil-cards[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n\n@media (max-width: 600px) {\n  .sil-dl[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StockItemList, [{
        type: Component,
        args: [{ selector: 'app-stock-item-list', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row sil-header-row\">\n    <div class=\"page-header\" style=\"margin:0\">\n      <h1>Stock</h1>\n      <p>Gestion des articles en entrep\u00F4t</p>\n    </div>\n    <div class=\"sil-actions\">\n      <a class=\"btn btn-outline\" routerLink=\"/enterprise/annonces/stock/movements\">\n        Mouvements\n      </a>\n      <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/stock/create\">\n        Nouvel article\n      </a>\n    </div>\n  </div>\n\n  <div class=\"card sil-filters\">\n    <div class=\"form-row sil-filter-row\">\n      <div class=\"form-group sil-grow\">\n        <label>Produit</label>\n        <select\n          class=\"filter-select\"\n          [(ngModel)]=\"filterProductId\"\n          (ngModelChange)=\"onFiltersChange()\">\n          <option [ngValue]=\"''\">Tous les produits</option>\n          <option *ngFor=\"let p of products\" [ngValue]=\"p.idProduct\">\n            {{ p.name }}<span *ngIf=\"p.category\"> ({{ p.category }})</span>\n          </option>\n        </select>\n      </div>\n      <div class=\"form-group sil-company\">\n        <label>ID entreprise</label>\n        <input\n          type=\"number\"\n          [(ngModel)]=\"filterCompanyId\"\n          (ngModelChange)=\"onFiltersChange()\"\n          placeholder=\"Filtrer par soci\u00E9t\u00E9\u2026\"\n          min=\"1\" />\n      </div>\n      <div class=\"form-group sil-filter-actions\">\n        <label class=\"sil-label-spacer\">&nbsp;</label>\n        <button\n          type=\"button\"\n          class=\"btn btn-ghost btn-sm\"\n          *ngIf=\"filterCompanyId !== null && filterCompanyId !== undefined\"\n          (click)=\"clearCompanyFilter()\">\n          R\u00E9initialiser soci\u00E9t\u00E9\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"alert alert-danger\" *ngIf=\"loadError\">{{ loadError }}</div>\n\n  <div class=\"sil-loading\" *ngIf=\"loading\">\n    <div class=\"spinner-lg\"></div>\n    <p>Chargement du stock\u2026</p>\n  </div>\n\n  <!-- Desktop table -->\n  <div class=\"card sil-table-wrap\" *ngIf=\"!loading && items.length > 0\">\n    <div class=\"sil-table-scroll\">\n      <table class=\"sil-table\">\n        <thead>\n          <tr>\n            <th>Produit</th>\n            <th>Quantit\u00E9</th>\n            <th>Unit\u00E9</th>\n            <th>Prix unitaire</th>\n            <th>Statut</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let row of items\">\n            <td>\n              <button type=\"button\" class=\"sil-link\" (click)=\"goDetail(row.idStock)\">\n                {{ productLabel(row) }}\n              </button>\n            </td>\n            <td>{{ row.quantity | number : '1.0-3' }}</td>\n            <td>{{ row.unit || '\u2014' }}</td>\n            <td>{{ row.unitPrice | number : '1.2-2' }} TND</td>\n            <td>\n              <span class=\"sil-badge\" *ngIf=\"row.status\">{{ row.status }}</span>\n              <span *ngIf=\"!row.status\">\u2014</span>\n            </td>\n            <td class=\"sil-actions-cell\">\n              <a class=\"btn btn-ghost btn-sm\" [routerLink]=\"['/enterprise/annonces/stock', row.idStock]\">Voir</a>\n              <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/annonces/stock', row.idStock, 'edit']\">\n                Modifier\n              </a>\n              <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"openDelete(row)\">\n                Supprimer\n              </button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Mobile cards -->\n  <div class=\"sil-cards\" *ngIf=\"!loading && items.length > 0\">\n    <div class=\"card sil-card\" *ngFor=\"let row of items\">\n      <div class=\"sil-card-top\">\n        <h3 class=\"sil-card-title\">{{ productLabel(row) }}</h3>\n        <span class=\"sil-badge\" *ngIf=\"row.status\">{{ row.status }}</span>\n      </div>\n      <dl class=\"sil-dl\">\n        <div>\n          <dt>Quantit\u00E9</dt>\n          <dd>{{ row.quantity | number : '1.0-3' }} {{ row.unit || '' }}</dd>\n        </div>\n        <div>\n          <dt>Prix unitaire</dt>\n          <dd>{{ row.unitPrice | number : '1.2-2' }} TND</dd>\n        </div>\n      </dl>\n      <div class=\"sil-card-actions\">\n        <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/annonces/stock', row.idStock]\">Voir</a>\n        <a class=\"btn btn-primary btn-sm\" [routerLink]=\"['/enterprise/annonces/stock', row.idStock, 'edit']\">\n          Modifier\n        </a>\n        <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"openDelete(row)\">Supprimer</button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"empty-state\" *ngIf=\"!loading && items.length === 0\">\n    <span class=\"empty-icon\">\uD83D\uDCE6</span>\n    <h3>Aucun article en stock</h3>\n    <p>Ajustez les filtres ou cr\u00E9ez un nouvel article.</p>\n    <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/stock/create\" style=\"margin-top:12px\">\n      Cr\u00E9er un article\n    </a>\n  </div>\n\n  <app-confirm-dialog\n    [visible]=\"showDeleteConfirm\"\n    title=\"Supprimer cet article ?\"\n    message=\"Cette action est d\u00E9finitive. Les mouvements associ\u00E9s peuvent \u00EAtre impact\u00E9s.\"\n    confirmLabel=\"Supprimer\"\n    cancelLabel=\"Annuler\"\n    [danger]=\"true\"\n    (confirmed)=\"confirmDelete()\"\n    (cancelled)=\"cancelDelete()\">\n  </app-confirm-dialog>\n\n  <div class=\"alert alert-danger sil-dialog-error\" *ngIf=\"deleteError\">{{ deleteError }}</div>\n</div>\n", styles: [".sil-header-row {\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.sil-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  align-items: center;\n}\n\n.sil-filters {\n  margin-bottom: 16px;\n  padding: 16px 18px;\n}\n\n.sil-filter-row {\n  align-items: flex-end;\n  margin-bottom: 0;\n}\n\n.sil-grow {\n  flex: 1 1 200px;\n  min-width: 0;\n}\n\n.sil-company {\n  flex: 0 1 180px;\n}\n\n.sil-filter-actions {\n  flex: 0 0 auto;\n}\n\n.sil-label-spacer {\n  visibility: hidden;\n}\n\n.sil-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.spinner-lg {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: sil-spin 0.7s linear infinite;\n}\n\n.spinner-sm {\n  width: 16px;\n  height: 16px;\n  border: 2px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: sil-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes sil-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.sil-table-wrap {\n  padding: 0;\n  overflow: hidden;\n  display: none;\n}\n\n.sil-table-scroll {\n  overflow-x: auto;\n}\n\n.sil-table {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n\n.sil-table th,\n.sil-table td {\n  padding: 12px 16px;\n  text-align: left;\n  border-bottom: 1px solid var(--border);\n  color: var(--text);\n}\n\n.sil-table th {\n  font-weight: 600;\n  color: var(--text2, var(--text));\n  background: var(--bg3, var(--bg2));\n}\n\n.sil-link {\n  background: none;\n  border: none;\n  padding: 0;\n  color: var(--primary);\n  font: inherit;\n  cursor: pointer;\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n\n.sil-badge {\n  display: inline-block;\n  padding: 2px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n  background: var(--bg3, var(--bg2));\n  border: 1px solid var(--border);\n  color: var(--text2, var(--text));\n}\n\n.sil-actions-cell {\n  white-space: nowrap;\n  text-align: right;\n}\n\n.sil-actions-cell .btn {\n  margin-left: 6px;\n}\n\n.sil-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.sil-card {\n  padding: 16px;\n}\n\n.sil-card-top {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n\n.sil-card-title {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text);\n}\n\n.sil-dl {\n  margin: 0 0 14px;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n\n.sil-dl dt {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text3);\n  margin: 0 0 2px;\n}\n\n.sil-dl dd {\n  margin: 0;\n  font-size: 14px;\n  color: var(--text);\n}\n\n.sil-card-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.sil-dialog-error {\n  margin-top: 8px;\n}\n\n.sil-deleting-overlay {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.08);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  pointer-events: all;\n}\n\n@media (min-width: 900px) {\n  .sil-table-wrap {\n    display: block;\n  }\n\n  .sil-cards {\n    display: none;\n  }\n}\n\n@media (max-width: 600px) {\n  .sil-dl {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [{ type: i1.StockItemService }, { type: i2.ProductAnnoncesService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StockItemList, { className: "StockItemList", filePath: "src/app/features/annonces/stock/stock-item-list/stock-item-list.ts", lineNumber: 13 }); })();
