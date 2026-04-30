import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/product-annonces.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "@angular/router";
import * as i5 from "../../components/confirm-dialog/confirm-dialog";
import * as i6 from "../../components/pagination/pagination";
const _c0 = a0 => ["/enterprise/annonces/products", a0];
const _c1 = a0 => ["/enterprise/annonces/products", a0, "edit"];
function ProductList_option_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", cat_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cat_r1);
} }
function ProductList_button_30_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 30);
    i0.ɵɵlistener("click", function ProductList_button_30_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.clearFilters()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 31);
    i0.ɵɵelement(2, "line", 32)(3, "line", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " R\u00E9initialiser ");
    i0.ɵɵelementEnd();
} }
function ProductList_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵelement(1, "div", 35);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement des produits...");
    i0.ɵɵelementEnd()();
} }
function ProductList_div_34_article_1_img_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 52);
} if (rf & 2) {
    const p_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", p_r5.image, i0.ɵɵsanitizeUrl)("alt", p_r5.name);
} }
function ProductList_div_34_article_1_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵtext(1, "\uD83D\uDCE6");
    i0.ɵɵelementEnd();
} }
function ProductList_div_34_article_1_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 54);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(p_r5.category);
} }
function ProductList_div_34_article_1_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1, "Recyclable");
    i0.ɵɵelementEnd();
} }
function ProductList_div_34_article_1_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1, "Non recyclable");
    i0.ɵɵelementEnd();
} }
function ProductList_div_34_article_1_p_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.descPreview(p_r5.description));
} }
function ProductList_div_34_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 38)(1, "a", 39);
    i0.ɵɵtemplate(2, ProductList_div_34_article_1_img_2_Template, 1, 2, "img", 40)(3, ProductList_div_34_article_1_div_3_Template, 2, 0, "div", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 42)(5, "a", 43);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 44);
    i0.ɵɵtemplate(8, ProductList_div_34_article_1_span_8_Template, 2, 1, "span", 45)(9, ProductList_div_34_article_1_span_9_Template, 2, 0, "span", 46)(10, ProductList_div_34_article_1_span_10_Template, 2, 0, "span", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, ProductList_div_34_article_1_p_11_Template, 2, 1, "p", 48);
    i0.ɵɵelementStart(12, "div", 49)(13, "a", 50);
    i0.ɵɵtext(14, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 51);
    i0.ɵɵlistener("click", function ProductList_div_34_article_1_Template_button_click_15_listener() { const p_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.requestDelete(p_r5)); });
    i0.ɵɵtext(16, "Supprimer");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const p_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(10, _c0, p_r5.idProduct));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r5.image);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !p_r5.image);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(12, _c0, p_r5.idProduct));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(p_r5.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", p_r5.category);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r5.recyclable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !p_r5.recyclable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r5.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(14, _c1, p_r5.idProduct));
} }
function ProductList_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵtemplate(1, ProductList_div_34_article_1_Template, 17, 16, "article", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.paged);
} }
function ProductList_div_35_tr_13_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1, "Oui");
    i0.ɵɵelementEnd();
} }
function ProductList_div_35_tr_13_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1, "Non");
    i0.ɵɵelementEnd();
} }
function ProductList_div_35_tr_13_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "a", 62);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtemplate(7, ProductList_div_35_tr_13_span_7_Template, 2, 0, "span", 46)(8, ProductList_div_35_tr_13_span_8_Template, 2, 0, "span", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 63)(10, "a", 50);
    i0.ɵɵtext(11, "Modifier");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 51);
    i0.ɵɵlistener("click", function ProductList_div_35_tr_13_Template_button_click_12_listener() { const p_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.requestDelete(p_r7)); });
    i0.ɵɵtext(13, "Supprimer");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const p_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(6, _c0, p_r7.idProduct));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(p_r7.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(p_r7.category || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", p_r7.recyclable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !p_r7.recyclable);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c1, p_r7.idProduct));
} }
function ProductList_div_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58)(1, "table", 59)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Produit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Cat\u00E9gorie");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Recyclable");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 60);
    i0.ɵɵtext(11, "Actions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "tbody");
    i0.ɵɵtemplate(13, ProductList_div_35_tr_13_Template, 14, 10, "tr", 61);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("ngForOf", ctx_r2.paged);
} }
function ProductList_div_36_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Modifiez vos filtres ou la recherche");
    i0.ɵɵelementEnd();
} }
function ProductList_div_36_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Cr\u00E9ez votre premier produit pour l'associer aux annonces");
    i0.ɵɵelementEnd();
} }
function ProductList_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64)(1, "span", 65);
    i0.ɵɵtext(2, "\uD83D\uDCE6");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Aucun produit");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, ProductList_div_36_p_5_Template, 2, 0, "p", 66)(6, ProductList_div_36_p_6_Template, 2, 0, "p", 66);
    i0.ɵɵelementStart(7, "a", 67);
    i0.ɵɵtext(8, "Cr\u00E9er un produit");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.hasActiveFilters);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.hasActiveFilters);
} }
function ProductList_app_pagination_37_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-pagination", 68);
    i0.ɵɵlistener("pageChange", function ProductList_app_pagination_37_Template_app_pagination_pageChange_0_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onPageChange($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("currentPage", ctx_r2.currentPage)("totalItems", ctx_r2.filtered.length)("pageSize", ctx_r2.pageSize);
} }
function ProductList_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 69);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.deleteError);
} }
export class ProductList {
    productService;
    products = [];
    filtered = [];
    paged = [];
    loading = true;
    filterCategory = '';
    searchQuery = '';
    viewMode = 'grid';
    categories = [];
    currentPage = 1;
    pageSize = 12;
    showDeleteConfirm = false;
    productToDelete = null;
    deleteError = '';
    constructor(productService) {
        this.productService = productService;
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.loading = true;
        const cat = this.filterCategory || undefined;
        this.productService.findAll(cat).subscribe({
            next: (data) => {
                this.products = data;
                const fromResponse = [...new Set(data.map((p) => p.category).filter((c) => !!c))].sort();
                if (!cat) {
                    this.categories = fromResponse;
                }
                this.applyFilters();
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }
    onCategoryChange() {
        this.loadData();
    }
    applyFilters() {
        const q = this.searchQuery.trim().toLowerCase();
        let result = [...this.products];
        if (q) {
            result = result.filter((p) => p.name.toLowerCase().includes(q) ||
                (p.description?.toLowerCase().includes(q) ?? false) ||
                (p.category?.toLowerCase().includes(q) ?? false) ||
                (p.materialType?.toLowerCase().includes(q) ?? false));
        }
        this.filtered = result;
        this.currentPage = 1;
        this.updatePaged();
    }
    updatePaged() {
        const start = (this.currentPage - 1) * this.pageSize;
        this.paged = this.filtered.slice(start, start + this.pageSize);
    }
    onPageChange(page) {
        this.currentPage = page;
        this.updatePaged();
    }
    setView(mode) {
        this.viewMode = mode;
    }
    requestDelete(p) {
        this.deleteError = '';
        this.productToDelete = p;
        this.showDeleteConfirm = true;
    }
    cancelDelete() {
        this.showDeleteConfirm = false;
        this.productToDelete = null;
    }
    confirmDelete() {
        if (!this.productToDelete)
            return;
        const id = this.productToDelete.idProduct;
        this.productService.delete(id).subscribe({
            next: () => {
                this.cancelDelete();
                this.loadData();
            },
            error: (err) => {
                this.deleteError =
                    err.error?.message || 'Impossible de supprimer ce produit. Réessayez plus tard.';
            }
        });
    }
    get hasActiveFilters() {
        return !!(this.filterCategory || this.searchQuery.trim());
    }
    clearFilters() {
        this.filterCategory = '';
        this.searchQuery = '';
        this.loadData();
    }
    descPreview(text, max = 120) {
        if (!text)
            return '';
        return text.length > max ? text.slice(0, max) + '…' : text;
    }
    static ɵfac = function ProductList_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductList)(i0.ɵɵdirectiveInject(i1.ProductAnnoncesService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProductList, selectors: [["app-product-list"]], standalone: false, decls: 40, vars: 23, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], [1, "pl-actions"], ["routerLink", "/enterprise/annonces/products/create", 1, "btn", "btn-primary"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "pl-filters"], [1, "pl-filter-group"], [1, "filter-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "search-box", "pl-search"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Rechercher par nom, description...", 3, "ngModelChange", "input", "ngModel"], ["role", "group", "aria-label", "Mode d'affichage", 1, "pl-view-toggle"], ["type", "button", 1, "btn", "btn-sm", 3, "click"], [1, "pl-sort-row"], ["class", "btn btn-ghost btn-sm", 3, "click", 4, "ngIf"], [1, "toolbar-count"], ["class", "pl-loading", 4, "ngIf"], ["class", "pl-grid", 4, "ngIf"], ["class", "pl-table-wrap card", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [3, "currentPage", "totalItems", "pageSize", "pageChange", 4, "ngIf"], ["class", "alert alert-danger pl-delete-err", 4, "ngIf"], ["title", "Supprimer ce produit ?", "confirmLabel", "Oui, supprimer", "cancelLabel", "Annuler", 3, "confirmed", "cancelled", "visible", "message", "danger"], [3, "value"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "pl-loading"], [1, "spinner-lg"], [1, "pl-grid"], ["class", "pl-card card", 4, "ngFor", "ngForOf"], [1, "pl-card", "card"], [1, "pl-card-media", 3, "routerLink"], ["loading", "lazy", 3, "src", "alt", 4, "ngIf"], ["class", "pl-card-placeholder", 4, "ngIf"], [1, "pl-card-body"], [1, "pl-card-title", 3, "routerLink"], [1, "pl-card-meta"], ["class", "pl-badge pl-badge-muted", 4, "ngIf"], ["class", "pl-badge pl-badge-ok", 4, "ngIf"], ["class", "pl-badge pl-badge-warn", 4, "ngIf"], ["class", "pl-card-desc", 4, "ngIf"], [1, "pl-card-actions"], [1, "btn", "btn-outline", "btn-sm", 3, "routerLink"], ["type", "button", 1, "btn", "btn-danger", "btn-sm", 3, "click"], ["loading", "lazy", 3, "src", "alt"], [1, "pl-card-placeholder"], [1, "pl-badge", "pl-badge-muted"], [1, "pl-badge", "pl-badge-ok"], [1, "pl-badge", "pl-badge-warn"], [1, "pl-card-desc"], [1, "pl-table-wrap", "card"], [1, "pl-table"], [1, "pl-th-actions"], [4, "ngFor", "ngForOf"], [1, "pl-table-link", 3, "routerLink"], [1, "pl-td-actions"], [1, "empty-state"], [1, "empty-icon"], [4, "ngIf"], ["routerLink", "/enterprise/annonces/products/create", 1, "btn", "btn-primary", 2, "margin-top", "12px"], [3, "pageChange", "currentPage", "totalItems", "pageSize"], [1, "alert", "alert-danger", "pl-delete-err"]], template: function ProductList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Produits");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "G\u00E9rez le catalogue de produits li\u00E9s \u00E0 vos annonces");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 3)(8, "a", 4);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(9, "svg", 5);
            i0.ɵɵelement(10, "line", 6)(11, "line", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(12, " Nouveau produit ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(13, "div", 8)(14, "div", 9)(15, "select", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function ProductList_Template_select_ngModelChange_15_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterCategory, $event) || (ctx.filterCategory = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function ProductList_Template_select_ngModelChange_15_listener() { return ctx.onCategoryChange(); });
            i0.ɵɵelementStart(16, "option", 11);
            i0.ɵɵtext(17, "Toutes les cat\u00E9gories");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, ProductList_option_18_Template, 2, 2, "option", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(20, "svg", 5);
            i0.ɵɵelement(21, "circle", 14)(22, "line", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(23, "input", 16);
            i0.ɵɵtwoWayListener("ngModelChange", function ProductList_Template_input_ngModelChange_23_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵlistener("input", function ProductList_Template_input_input_23_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 17)(25, "button", 18);
            i0.ɵɵlistener("click", function ProductList_Template_button_click_25_listener() { return ctx.setView("grid"); });
            i0.ɵɵtext(26, "Grille");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "button", 18);
            i0.ɵɵlistener("click", function ProductList_Template_button_click_27_listener() { return ctx.setView("table"); });
            i0.ɵɵtext(28, "Tableau");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(29, "div", 19);
            i0.ɵɵtemplate(30, ProductList_button_30_Template, 5, 0, "button", 20);
            i0.ɵɵelementStart(31, "span", 21);
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(33, ProductList_div_33_Template, 4, 0, "div", 22)(34, ProductList_div_34_Template, 2, 1, "div", 23)(35, ProductList_div_35_Template, 14, 1, "div", 24)(36, ProductList_div_36_Template, 9, 2, "div", 25)(37, ProductList_app_pagination_37_Template, 1, 3, "app-pagination", 26)(38, ProductList_div_38_Template, 2, 1, "div", 27);
            i0.ɵɵelementStart(39, "app-confirm-dialog", 28);
            i0.ɵɵlistener("confirmed", function ProductList_Template_app_confirm_dialog_confirmed_39_listener() { return ctx.confirmDelete(); })("cancelled", function ProductList_Template_app_confirm_dialog_cancelled_39_listener() { return ctx.cancelDelete(); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterCategory);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.categories);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("btn-primary", ctx.viewMode === "grid")("btn-outline", ctx.viewMode !== "grid");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("btn-primary", ctx.viewMode === "table")("btn-outline", ctx.viewMode !== "table");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.hasActiveFilters);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.filtered.length, " produit", ctx.filtered.length > 1 ? "s" : "");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.paged.length > 0 && ctx.viewMode === "grid");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.paged.length > 0 && ctx.viewMode === "table");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.filtered.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.filtered.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.deleteError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("visible", ctx.showDeleteConfirm)("message", ctx.productToDelete ? "Le produit \u00AB " + ctx.productToDelete.name + " \u00BB sera d\u00E9finitivement supprim\u00E9." : "")("danger", true);
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.DefaultValueAccessor, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgModel, i4.RouterLink, i5.ConfirmDialog, i6.Pagination], styles: [".pl-actions[_ngcontent-%COMP%]{display:flex;gap:8px;flex-wrap:wrap}\n.pl-filters[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;margin-bottom:24px;padding:18px 20px;background:var(--card);border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pl-filter-group[_ngcontent-%COMP%]{display:flex;gap:10px;flex-wrap:wrap;align-items:center}\n.pl-search[_ngcontent-%COMP%]{flex:1;min-width:200px;max-width:360px}\n.pl-view-toggle[_ngcontent-%COMP%]{display:flex;gap:4px;flex-wrap:wrap}\n.pl-sort-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.pl-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3);font-size:14px}\n.spinner-lg[_ngcontent-%COMP%]{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:_ngcontent-%COMP%_pl-spin .7s linear infinite}\n@keyframes _ngcontent-%COMP%_pl-spin{to{transform:rotate(360deg)}}\n\n.pl-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}\n.pl-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;overflow:hidden;border-radius:16px;background:var(--card);transition:box-shadow .25s,transform .25s;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pl-card[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.08)}\n.pl-card-media[_ngcontent-%COMP%]{display:block;aspect-ratio:16/10;background:var(--bg3,var(--bg2));overflow:hidden}\n.pl-card-media[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}\n.pl-card[_ngcontent-%COMP%]:hover   .pl-card-media[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transform:scale(1.03)}\n.pl-card-placeholder[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;min-height:120px;font-size:42px;opacity:.25}\n.pl-card-body[_ngcontent-%COMP%]{padding:16px 18px;display:flex;flex-direction:column;gap:10px;flex:1}\n.pl-card-title[_ngcontent-%COMP%]{font-size:16px;font-weight:700;color:var(--text);text-decoration:none;line-height:1.3;letter-spacing:-.01em}\n.pl-card-title[_ngcontent-%COMP%]:hover{color:var(--primary)}\n.pl-card-meta[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:6px}\n.pl-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600}\n.pl-badge-muted[_ngcontent-%COMP%]{background:var(--bg3,#f1f5f9);color:var(--text2)}\n.pl-badge-ok[_ngcontent-%COMP%]{background:#ecfdf5;color:#047857}\n.pl-badge-warn[_ngcontent-%COMP%]{background:#fffbeb;color:#b45309}\n.pl-card-desc[_ngcontent-%COMP%]{font-size:13px;color:var(--text3);line-height:1.5;margin:0;flex:1}\n.pl-card-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:4px}\n\n.pl-table-wrap[_ngcontent-%COMP%]{padding:0;overflow-x:auto;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pl-table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;font-size:13px}\n.pl-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .pl-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:14px 18px;text-align:left;border-bottom:1px solid var(--bg3,#f1f5f9)}\n.pl-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--text3);font-weight:600;background:var(--bg3,#f8fafc)}\n.pl-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]{transition:background .12s}\n.pl-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover{background:rgba(2,132,199,.02)}\n.pl-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child   td[_ngcontent-%COMP%]{border-bottom:none}\n.pl-table-link[_ngcontent-%COMP%]{color:var(--primary);font-weight:600;text-decoration:none}\n.pl-table-link[_ngcontent-%COMP%]:hover{text-decoration:underline}\n.pl-th-actions[_ngcontent-%COMP%], .pl-td-actions[_ngcontent-%COMP%]{text-align:right;white-space:nowrap}\n.pl-td-actions[_ngcontent-%COMP%]{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}\n\n.pl-delete-err[_ngcontent-%COMP%]{margin-top:16px}\n\n@media(max-width:1100px){.pl-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:700px){\n  .pl-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}\n  .pl-filter-group[_ngcontent-%COMP%]{flex-direction:column;align-items:stretch}\n  .pl-search[_ngcontent-%COMP%]{max-width:100%}\n  .pl-actions[_ngcontent-%COMP%]{width:100%}\n  .pl-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{justify-content:center}\n  .pl-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:nth-child(2), .pl-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:nth-child(2){display:none}\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductList, [{
        type: Component,
        args: [{ selector: 'app-product-list', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\">\n      <h1>Produits</h1>\n      <p>G\u00E9rez le catalogue de produits li\u00E9s \u00E0 vos annonces</p>\n    </div>\n    <div class=\"pl-actions\">\n      <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/products/create\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg>\n        Nouveau produit\n      </a>\n    </div>\n  </div>\n\n  <div class=\"pl-filters\">\n    <div class=\"pl-filter-group\">\n      <select class=\"filter-select\" [(ngModel)]=\"filterCategory\" (ngModelChange)=\"onCategoryChange()\">\n        <option value=\"\">Toutes les cat\u00E9gories</option>\n        <option *ngFor=\"let cat of categories\" [value]=\"cat\">{{ cat }}</option>\n      </select>\n\n      <div class=\"search-box pl-search\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/></svg>\n        <input type=\"text\" placeholder=\"Rechercher par nom, description...\" [(ngModel)]=\"searchQuery\" (input)=\"applyFilters()\">\n      </div>\n\n      <div class=\"pl-view-toggle\" role=\"group\" aria-label=\"Mode d'affichage\">\n        <button type=\"button\" class=\"btn btn-sm\" [class.btn-primary]=\"viewMode === 'grid'\" [class.btn-outline]=\"viewMode !== 'grid'\" (click)=\"setView('grid')\">Grille</button>\n        <button type=\"button\" class=\"btn btn-sm\" [class.btn-primary]=\"viewMode === 'table'\" [class.btn-outline]=\"viewMode !== 'table'\" (click)=\"setView('table')\">Tableau</button>\n      </div>\n    </div>\n\n    <div class=\"pl-sort-row\">\n      <button class=\"btn btn-ghost btn-sm\" *ngIf=\"hasActiveFilters\" (click)=\"clearFilters()\">\n        <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>\n        R\u00E9initialiser\n      </button>\n      <span class=\"toolbar-count\">{{ filtered.length }} produit{{ filtered.length > 1 ? 's' : '' }}</span>\n    </div>\n  </div>\n\n  <div class=\"pl-loading\" *ngIf=\"loading\">\n    <div class=\"spinner-lg\"></div>\n    <p>Chargement des produits...</p>\n  </div>\n\n  <!-- Grid -->\n  <div class=\"pl-grid\" *ngIf=\"!loading && paged.length > 0 && viewMode === 'grid'\">\n    <article class=\"pl-card card\" *ngFor=\"let p of paged\">\n      <a class=\"pl-card-media\" [routerLink]=\"['/enterprise/annonces/products', p.idProduct]\">\n        <img *ngIf=\"p.image\" [src]=\"p.image\" [alt]=\"p.name\" loading=\"lazy\">\n        <div class=\"pl-card-placeholder\" *ngIf=\"!p.image\">\uD83D\uDCE6</div>\n      </a>\n      <div class=\"pl-card-body\">\n        <a class=\"pl-card-title\" [routerLink]=\"['/enterprise/annonces/products', p.idProduct]\">{{ p.name }}</a>\n        <div class=\"pl-card-meta\">\n          <span class=\"pl-badge pl-badge-muted\" *ngIf=\"p.category\">{{ p.category }}</span>\n          <span class=\"pl-badge pl-badge-ok\" *ngIf=\"p.recyclable\">Recyclable</span>\n          <span class=\"pl-badge pl-badge-warn\" *ngIf=\"!p.recyclable\">Non recyclable</span>\n        </div>\n        <p class=\"pl-card-desc\" *ngIf=\"p.description\">{{ descPreview(p.description) }}</p>\n        <div class=\"pl-card-actions\">\n          <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/annonces/products', p.idProduct, 'edit']\">Modifier</a>\n          <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"requestDelete(p)\">Supprimer</button>\n        </div>\n      </div>\n    </article>\n  </div>\n\n  <!-- Table -->\n  <div class=\"pl-table-wrap card\" *ngIf=\"!loading && paged.length > 0 && viewMode === 'table'\">\n    <table class=\"pl-table\">\n      <thead>\n        <tr>\n          <th>Produit</th>\n          <th>Cat\u00E9gorie</th>\n          <th>Recyclable</th>\n          <th class=\"pl-th-actions\">Actions</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let p of paged\">\n          <td>\n            <a class=\"pl-table-link\" [routerLink]=\"['/enterprise/annonces/products', p.idProduct]\">{{ p.name }}</a>\n          </td>\n          <td>{{ p.category || '\u2014' }}</td>\n          <td>\n            <span class=\"pl-badge pl-badge-ok\" *ngIf=\"p.recyclable\">Oui</span>\n            <span class=\"pl-badge pl-badge-warn\" *ngIf=\"!p.recyclable\">Non</span>\n          </td>\n          <td class=\"pl-td-actions\">\n            <a class=\"btn btn-outline btn-sm\" [routerLink]=\"['/enterprise/annonces/products', p.idProduct, 'edit']\">Modifier</a>\n            <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"requestDelete(p)\">Supprimer</button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"empty-state\" *ngIf=\"!loading && filtered.length === 0\">\n    <span class=\"empty-icon\">\uD83D\uDCE6</span>\n    <h3>Aucun produit</h3>\n    <p *ngIf=\"hasActiveFilters\">Modifiez vos filtres ou la recherche</p>\n    <p *ngIf=\"!hasActiveFilters\">Cr\u00E9ez votre premier produit pour l'associer aux annonces</p>\n    <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/products/create\" style=\"margin-top:12px\">Cr\u00E9er un produit</a>\n  </div>\n\n  <app-pagination\n    *ngIf=\"!loading && filtered.length > 0\"\n    [currentPage]=\"currentPage\"\n    [totalItems]=\"filtered.length\"\n    [pageSize]=\"pageSize\"\n    (pageChange)=\"onPageChange($event)\">\n  </app-pagination>\n\n  <div class=\"alert alert-danger pl-delete-err\" *ngIf=\"deleteError\">{{ deleteError }}</div>\n\n  <app-confirm-dialog\n    [visible]=\"showDeleteConfirm\"\n    title=\"Supprimer ce produit ?\"\n    [message]=\"productToDelete ? 'Le produit \u00AB ' + productToDelete.name + ' \u00BB sera d\u00E9finitivement supprim\u00E9.' : ''\"\n    confirmLabel=\"Oui, supprimer\"\n    cancelLabel=\"Annuler\"\n    [danger]=\"true\"\n    (confirmed)=\"confirmDelete()\"\n    (cancelled)=\"cancelDelete()\">\n  </app-confirm-dialog>\n</div>\n", styles: [".pl-actions{display:flex;gap:8px;flex-wrap:wrap}\n.pl-filters{display:flex;flex-direction:column;gap:12px;margin-bottom:24px;padding:18px 20px;background:var(--card);border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pl-filter-group{display:flex;gap:10px;flex-wrap:wrap;align-items:center}\n.pl-search{flex:1;min-width:200px;max-width:360px}\n.pl-view-toggle{display:flex;gap:4px;flex-wrap:wrap}\n.pl-sort-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}\n.pl-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3);font-size:14px}\n.spinner-lg{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:pl-spin .7s linear infinite}\n@keyframes pl-spin{to{transform:rotate(360deg)}}\n\n.pl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}\n.pl-card{display:flex;flex-direction:column;overflow:hidden;border-radius:16px;background:var(--card);transition:box-shadow .25s,transform .25s;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pl-card:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.08)}\n.pl-card-media{display:block;aspect-ratio:16/10;background:var(--bg3,var(--bg2));overflow:hidden}\n.pl-card-media img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}\n.pl-card:hover .pl-card-media img{transform:scale(1.03)}\n.pl-card-placeholder{display:flex;align-items:center;justify-content:center;height:100%;min-height:120px;font-size:42px;opacity:.25}\n.pl-card-body{padding:16px 18px;display:flex;flex-direction:column;gap:10px;flex:1}\n.pl-card-title{font-size:16px;font-weight:700;color:var(--text);text-decoration:none;line-height:1.3;letter-spacing:-.01em}\n.pl-card-title:hover{color:var(--primary)}\n.pl-card-meta{display:flex;flex-wrap:wrap;gap:6px}\n.pl-badge{display:inline-flex;align-items:center;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600}\n.pl-badge-muted{background:var(--bg3,#f1f5f9);color:var(--text2)}\n.pl-badge-ok{background:#ecfdf5;color:#047857}\n.pl-badge-warn{background:#fffbeb;color:#b45309}\n.pl-card-desc{font-size:13px;color:var(--text3);line-height:1.5;margin:0;flex:1}\n.pl-card-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:4px}\n\n.pl-table-wrap{padding:0;overflow-x:auto;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pl-table{width:100%;border-collapse:collapse;font-size:13px}\n.pl-table th,.pl-table td{padding:14px 18px;text-align:left;border-bottom:1px solid var(--bg3,#f1f5f9)}\n.pl-table th{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--text3);font-weight:600;background:var(--bg3,#f8fafc)}\n.pl-table tbody tr{transition:background .12s}\n.pl-table tbody tr:hover{background:rgba(2,132,199,.02)}\n.pl-table tbody tr:last-child td{border-bottom:none}\n.pl-table-link{color:var(--primary);font-weight:600;text-decoration:none}\n.pl-table-link:hover{text-decoration:underline}\n.pl-th-actions,.pl-td-actions{text-align:right;white-space:nowrap}\n.pl-td-actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}\n\n.pl-delete-err{margin-top:16px}\n\n@media(max-width:1100px){.pl-grid{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:700px){\n  .pl-grid{grid-template-columns:1fr}\n  .pl-filter-group{flex-direction:column;align-items:stretch}\n  .pl-search{max-width:100%}\n  .pl-actions{width:100%}\n  .pl-actions .btn{justify-content:center}\n  .pl-table th:nth-child(2),.pl-table td:nth-child(2){display:none}\n}\n"] }]
    }], () => [{ type: i1.ProductAnnoncesService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProductList, { className: "ProductList", filePath: "src/app/features/annonces/products/product-list/product-list.ts", lineNumber: 11 }); })();
