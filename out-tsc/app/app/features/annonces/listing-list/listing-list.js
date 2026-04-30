import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/resource-listing.service";
import * as i2 from "../services/favorite.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "@angular/router";
import * as i6 from "../components/pagination/pagination";
import * as i7 from "../components/listing-card/listing-card";
function ListingList_option_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cat_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", cat_r1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cat_r1);
} }
function ListingList_button_54_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function ListingList_button_54_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.clearFilters()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 40);
    i0.ɵɵelement(2, "line", 41)(3, "line", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Effacer filtres ");
    i0.ɵɵelementEnd();
} }
function ListingList_div_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵelement(1, "div", 44);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement des annonces...");
    i0.ɵɵelementEnd()();
} }
function ListingList_div_58_app_listing_card_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-listing-card", 47);
} if (rf & 2) {
    const l_r4 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("listing", l_r4)("favoriteIds", ctx_r2.favoriteIds);
} }
function ListingList_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵtemplate(1, ListingList_div_58_app_listing_card_1_Template, 1, 2, "app-listing-card", 46);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.paged);
} }
function ListingList_div_59_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Essayez de modifier vos filtres");
    i0.ɵɵelementEnd();
} }
function ListingList_div_59_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Il n'y a pas encore d'annonces publi\u00E9es");
    i0.ɵɵelementEnd();
} }
function ListingList_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "span", 49);
    i0.ɵɵtext(2, "\uD83D\uDCE6");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Aucune annonce trouv\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, ListingList_div_59_p_5_Template, 2, 0, "p", 50)(6, ListingList_div_59_p_6_Template, 2, 0, "p", 50);
    i0.ɵɵelementStart(7, "a", 51);
    i0.ɵɵtext(8, "Publier une annonce");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.hasActiveFilters);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.hasActiveFilters);
} }
export class ListingList {
    listingService;
    favoriteService;
    listings = [];
    filtered = [];
    paged = [];
    favoriteIds = new Set();
    loading = true;
    filterType = '';
    filterCategory = '';
    filterLocation = '';
    filterMaxPrice = null;
    sortBy = 'date';
    currentPage = 1;
    pageSize = 12;
    categories = [];
    constructor(listingService, favoriteService) {
        this.listingService = listingService;
        this.favoriteService = favoriteService;
    }
    ngOnInit() {
        this.loadData();
    }
    loadData() {
        this.loading = true;
        this.listingService.findAll().subscribe({
            next: (data) => {
                this.listings = data;
                this.categories = [...new Set(data.map(l => l.productCategory).filter(Boolean))];
                this.applyFilters();
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
        this.favoriteService.myFavorites().subscribe({
            next: (favs) => {
                this.favoriteIds = new Set(favs.map(f => f.listingId));
            }
        });
    }
    applyFilters() {
        let result = [...this.listings];
        if (this.filterType) {
            result = result.filter(l => l.type === this.filterType);
        }
        if (this.filterCategory) {
            result = result.filter(l => l.productCategory === this.filterCategory);
        }
        if (this.filterLocation) {
            result = result.filter(l => l.location?.toLowerCase().includes(this.filterLocation.toLowerCase()));
        }
        if (this.filterMaxPrice !== null && this.filterMaxPrice > 0) {
            result = result.filter(l => l.price !== null && l.price <= this.filterMaxPrice);
        }
        this.sortResults(result);
        this.filtered = result;
        this.currentPage = 1;
        this.updatePaged();
    }
    sortResults(arr) {
        switch (this.sortBy) {
            case 'date':
                arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'price-asc':
                arr.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
                break;
            case 'price-desc':
                arr.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
                break;
            case 'popularity':
                arr.sort((a, b) => (b.favoriteCount + b.commentCount) - (a.favoriteCount + a.commentCount));
                break;
            case 'title':
                arr.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }
    }
    onSortChange() {
        this.sortResults(this.filtered);
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
    clearFilters() {
        this.filterType = '';
        this.filterCategory = '';
        this.filterLocation = '';
        this.filterMaxPrice = null;
        this.applyFilters();
    }
    get hasActiveFilters() {
        return !!(this.filterType || this.filterCategory || this.filterLocation || this.filterMaxPrice);
    }
    static ɵfac = function ListingList_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingList)(i0.ɵɵdirectiveInject(i1.ResourceListingService), i0.ɵɵdirectiveInject(i2.FavoriteService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListingList, selectors: [["app-listing-list"]], standalone: false, decls: 61, vars: 15, consts: [[1, "page-wrapper"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], [1, "ll-actions"], ["routerLink", "/enterprise/annonces/search", 1, "btn", "btn-outline"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["routerLink", "/enterprise/annonces/create", 1, "btn", "btn-primary"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "ll-filters"], [1, "ll-filter-group"], [1, "filter-select", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "SURPLUS"], ["value", "DEMANDE"], ["value", "GROUP_BUYING"], [3, "value", 4, "ngFor", "ngForOf"], [1, "search-box", "ll-loc-box"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"], ["cx", "12", "cy", "10", "r", "3"], ["type", "text", "placeholder", "Localisation...", 3, "ngModelChange", "input", "ngModel"], [1, "search-box", "ll-price-box"], [2, "font-size", "12px", "color", "var(--text3)"], ["type", "number", "placeholder", "Prix max", "min", "0", 3, "ngModelChange", "input", "ngModel"], [1, "ll-sort-group"], ["value", "date"], ["value", "price-asc"], ["value", "price-desc"], ["value", "popularity"], ["value", "title"], ["class", "btn btn-ghost btn-sm", 3, "click", 4, "ngIf"], [1, "toolbar-count"], ["class", "ll-loading", 4, "ngIf"], ["class", "ll-grid", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [3, "pageChange", "currentPage", "totalItems", "pageSize"], [3, "value"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "ll-loading"], [1, "spinner-lg"], [1, "ll-grid"], [3, "listing", "favoriteIds", 4, "ngFor", "ngForOf"], [3, "listing", "favoriteIds"], [1, "empty-state"], [1, "empty-icon"], [4, "ngIf"], ["routerLink", "/enterprise/annonces/create", 1, "btn", "btn-primary", 2, "margin-top", "12px"]], template: function ListingList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
            i0.ɵɵtext(4, "Annonces");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6, "D\u00E9couvrez les surplus, demandes et achats group\u00E9s");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 3)(8, "a", 4);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(9, "svg", 5);
            i0.ɵɵelement(10, "circle", 6)(11, "line", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(12, " Recherche avanc\u00E9e ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(13, "a", 8);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(14, "svg", 5);
            i0.ɵɵelement(15, "line", 9)(16, "line", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(17, " Nouvelle Annonce ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(18, "div", 11)(19, "div", 12)(20, "select", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function ListingList_Template_select_ngModelChange_20_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterType, $event) || (ctx.filterType = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function ListingList_Template_select_ngModelChange_20_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementStart(21, "option", 14);
            i0.ɵɵtext(22, "Tous les types");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "option", 15);
            i0.ɵɵtext(24, "Surplus");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "option", 16);
            i0.ɵɵtext(26, "Demande");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "option", 17);
            i0.ɵɵtext(28, "Achat Group\u00E9");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "select", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function ListingList_Template_select_ngModelChange_29_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterCategory, $event) || (ctx.filterCategory = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function ListingList_Template_select_ngModelChange_29_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementStart(30, "option", 14);
            i0.ɵɵtext(31, "Toutes cat\u00E9gories");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(32, ListingList_option_32_Template, 2, 2, "option", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 19);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(34, "svg", 5);
            i0.ɵɵelement(35, "path", 20)(36, "circle", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(37, "input", 22);
            i0.ɵɵtwoWayListener("ngModelChange", function ListingList_Template_input_ngModelChange_37_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterLocation, $event) || (ctx.filterLocation = $event); return $event; });
            i0.ɵɵlistener("input", function ListingList_Template_input_input_37_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "div", 23)(39, "span", 24);
            i0.ɵɵtext(40, "Max");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "input", 25);
            i0.ɵɵtwoWayListener("ngModelChange", function ListingList_Template_input_ngModelChange_41_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.filterMaxPrice, $event) || (ctx.filterMaxPrice = $event); return $event; });
            i0.ɵɵlistener("input", function ListingList_Template_input_input_41_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(42, "div", 26)(43, "select", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function ListingList_Template_select_ngModelChange_43_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.sortBy, $event) || (ctx.sortBy = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function ListingList_Template_select_ngModelChange_43_listener() { return ctx.onSortChange(); });
            i0.ɵɵelementStart(44, "option", 27);
            i0.ɵɵtext(45, "Plus r\u00E9cent");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "option", 28);
            i0.ɵɵtext(47, "Prix croissant");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "option", 29);
            i0.ɵɵtext(49, "Prix d\u00E9croissant");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "option", 30);
            i0.ɵɵtext(51, "Popularit\u00E9");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "option", 31);
            i0.ɵɵtext(53, "Alphab\u00E9tique");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(54, ListingList_button_54_Template, 5, 0, "button", 32);
            i0.ɵɵelementStart(55, "span", 33);
            i0.ɵɵtext(56);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(57, ListingList_div_57_Template, 4, 0, "div", 34)(58, ListingList_div_58_Template, 2, 1, "div", 35)(59, ListingList_div_59_Template, 9, 2, "div", 36);
            i0.ɵɵelementStart(60, "app-pagination", 37);
            i0.ɵɵlistener("pageChange", function ListingList_Template_app_pagination_pageChange_60_listener($event) { return ctx.onPageChange($event); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(20);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterType);
            i0.ɵɵadvance(9);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterCategory);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.categories);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterLocation);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.filterMaxPrice);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.sortBy);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngIf", ctx.hasActiveFilters);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.filtered.length, " annonce", ctx.filtered.length > 1 ? "s" : "");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.paged.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.filtered.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("currentPage", ctx.currentPage)("totalItems", ctx.filtered.length)("pageSize", ctx.pageSize);
        } }, dependencies: [i3.NgForOf, i3.NgIf, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.DefaultValueAccessor, i4.NumberValueAccessor, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.MinValidator, i4.NgModel, i5.RouterLink, i6.Pagination, i7.ListingCard], styles: [".ll-actions[_ngcontent-%COMP%]{display:flex;gap:8px;flex-wrap:wrap}\n.ll-filters[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;margin-bottom:24px;padding:18px 20px;background:var(--card);border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ll-filter-group[_ngcontent-%COMP%]{display:flex;gap:8px;flex-wrap:wrap;align-items:center}\n.ll-sort-group[_ngcontent-%COMP%]{display:flex;gap:8px;align-items:center;flex-wrap:wrap}\n.ll-loc-box[_ngcontent-%COMP%], .ll-price-box[_ngcontent-%COMP%]{max-width:180px}\n.ll-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}\n.ll-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3);font-size:14px}\n.spinner-lg[_ngcontent-%COMP%]{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:_ngcontent-%COMP%_spin .7s linear infinite}\n@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}\n@media(max-width:1100px){.ll-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:700px){.ll-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.ll-filter-group[_ngcontent-%COMP%]{flex-direction:column}.ll-loc-box[_ngcontent-%COMP%], .ll-price-box[_ngcontent-%COMP%]{max-width:100%;width:100%}.ll-actions[_ngcontent-%COMP%]{width:100%}.ll-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{flex:1;justify-content:center}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingList, [{
        type: Component,
        args: [{ selector: 'app-listing-list', standalone: false, template: "<div class=\"page-wrapper\">\n  <!-- Header -->\n  <div class=\"page-header-row\">\n    <div class=\"page-header\" style=\"margin:0\">\n      <h1>Annonces</h1>\n      <p>D\u00E9couvrez les surplus, demandes et achats group\u00E9s</p>\n    </div>\n    <div class=\"ll-actions\">\n      <a class=\"btn btn-outline\" routerLink=\"/enterprise/annonces/search\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/></svg>\n        Recherche avanc\u00E9e\n      </a>\n      <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/create\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg>\n        Nouvelle Annonce\n      </a>\n    </div>\n  </div>\n\n  <!-- Filters -->\n  <div class=\"ll-filters\">\n    <div class=\"ll-filter-group\">\n      <select class=\"filter-select\" [(ngModel)]=\"filterType\" (ngModelChange)=\"applyFilters()\">\n        <option value=\"\">Tous les types</option>\n        <option value=\"SURPLUS\">Surplus</option>\n        <option value=\"DEMANDE\">Demande</option>\n        <option value=\"GROUP_BUYING\">Achat Group\u00E9</option>\n      </select>\n\n      <select class=\"filter-select\" [(ngModel)]=\"filterCategory\" (ngModelChange)=\"applyFilters()\">\n        <option value=\"\">Toutes cat\u00E9gories</option>\n        <option *ngFor=\"let cat of categories\" [value]=\"cat\">{{cat}}</option>\n      </select>\n\n      <div class=\"search-box ll-loc-box\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>\n        <input type=\"text\" placeholder=\"Localisation...\" [(ngModel)]=\"filterLocation\" (input)=\"applyFilters()\">\n      </div>\n\n      <div class=\"search-box ll-price-box\">\n        <span style=\"font-size:12px;color:var(--text3)\">Max</span>\n        <input type=\"number\" placeholder=\"Prix max\" [(ngModel)]=\"filterMaxPrice\" (input)=\"applyFilters()\" min=\"0\">\n      </div>\n    </div>\n\n    <div class=\"ll-sort-group\">\n      <select class=\"filter-select\" [(ngModel)]=\"sortBy\" (ngModelChange)=\"onSortChange()\">\n        <option value=\"date\">Plus r\u00E9cent</option>\n        <option value=\"price-asc\">Prix croissant</option>\n        <option value=\"price-desc\">Prix d\u00E9croissant</option>\n        <option value=\"popularity\">Popularit\u00E9</option>\n        <option value=\"title\">Alphab\u00E9tique</option>\n      </select>\n\n      <button class=\"btn btn-ghost btn-sm\" *ngIf=\"hasActiveFilters\" (click)=\"clearFilters()\">\n        <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>\n        Effacer filtres\n      </button>\n\n      <span class=\"toolbar-count\">{{filtered.length}} annonce{{filtered.length > 1 ? 's' : ''}}</span>\n    </div>\n  </div>\n\n  <!-- Loading -->\n  <div class=\"ll-loading\" *ngIf=\"loading\">\n    <div class=\"spinner-lg\"></div>\n    <p>Chargement des annonces...</p>\n  </div>\n\n  <!-- Grid -->\n  <div class=\"ll-grid\" *ngIf=\"!loading && paged.length > 0\">\n    <app-listing-card *ngFor=\"let l of paged\" [listing]=\"l\" [favoriteIds]=\"favoriteIds\"></app-listing-card>\n  </div>\n\n  <!-- Empty -->\n  <div class=\"empty-state\" *ngIf=\"!loading && filtered.length === 0\">\n    <span class=\"empty-icon\">\uD83D\uDCE6</span>\n    <h3>Aucune annonce trouv\u00E9e</h3>\n    <p *ngIf=\"hasActiveFilters\">Essayez de modifier vos filtres</p>\n    <p *ngIf=\"!hasActiveFilters\">Il n'y a pas encore d'annonces publi\u00E9es</p>\n    <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/create\" style=\"margin-top:12px\">Publier une annonce</a>\n  </div>\n\n  <!-- Pagination -->\n  <app-pagination\n    [currentPage]=\"currentPage\"\n    [totalItems]=\"filtered.length\"\n    [pageSize]=\"pageSize\"\n    (pageChange)=\"onPageChange($event)\">\n  </app-pagination>\n</div>\n", styles: [".ll-actions{display:flex;gap:8px;flex-wrap:wrap}\n.ll-filters{display:flex;flex-direction:column;gap:12px;margin-bottom:24px;padding:18px 20px;background:var(--card);border-radius:16px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ll-filter-group{display:flex;gap:8px;flex-wrap:wrap;align-items:center}\n.ll-sort-group{display:flex;gap:8px;align-items:center;flex-wrap:wrap}\n.ll-loc-box,.ll-price-box{max-width:180px}\n.ll-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}\n.ll-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3);font-size:14px}\n.spinner-lg{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite}\n@keyframes spin{to{transform:rotate(360deg)}}\n@media(max-width:1100px){.ll-grid{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:700px){.ll-grid{grid-template-columns:1fr}.ll-filter-group{flex-direction:column}.ll-loc-box,.ll-price-box{max-width:100%;width:100%}.ll-actions{width:100%}.ll-actions .btn{flex:1;justify-content:center}}\n"] }]
    }], () => [{ type: i1.ResourceListingService }, { type: i2.FavoriteService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListingList, { className: "ListingList", filePath: "src/app/features/annonces/listing-list/listing-list.ts", lineNumber: 12 }); })();
