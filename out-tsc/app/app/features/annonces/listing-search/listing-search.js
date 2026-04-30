import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../services/resource-listing.service";
import * as i3 from "../services/favorite.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/router";
import * as i6 from "../components/pagination/pagination";
import * as i7 from "../components/listing-card/listing-card";
function ListingSearch_div_43_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵelement(1, "div", 36);
    i0.ɵɵelementEnd();
} }
function ListingSearch_div_43_div_14_app_listing_card_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-listing-card", 39);
} if (rf & 2) {
    const l_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("listing", l_r3)("favoriteIds", ctx_r1.favoriteIds);
} }
function ListingSearch_div_43_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵtemplate(1, ListingSearch_div_43_div_14_app_listing_card_1_Template, 1, 2, "app-listing-card", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.paged);
} }
function ListingSearch_div_43_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40)(1, "span", 41);
    i0.ɵɵtext(2, "\uD83D\uDD0D");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Aucun r\u00E9sultat");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Essayez d'\u00E9largir vos crit\u00E8res de recherche");
    i0.ɵɵelementEnd()();
} }
function ListingSearch_div_43_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "div", 24)(2, "span", 25);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 26);
    i0.ɵɵtwoWayListener("ngModelChange", function ListingSearch_div_43_Template_select_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.sortBy, $event) || (ctx_r1.sortBy = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function ListingSearch_div_43_Template_select_ngModelChange_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSortChange()); });
    i0.ɵɵelementStart(5, "option", 27);
    i0.ɵɵtext(6, "Plus r\u00E9cent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "option", 28);
    i0.ɵɵtext(8, "Prix croissant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "option", 29);
    i0.ɵɵtext(10, "Prix d\u00E9croissant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "option", 30);
    i0.ɵɵtext(12, "Popularit\u00E9");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(13, ListingSearch_div_43_div_13_Template, 2, 0, "div", 31)(14, ListingSearch_div_43_div_14_Template, 2, 1, "div", 32)(15, ListingSearch_div_43_div_15_Template, 7, 0, "div", 33);
    i0.ɵɵelementStart(16, "app-pagination", 34);
    i0.ɵɵlistener("pageChange", function ListingSearch_div_43_Template_app_pagination_pageChange_16_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPageChange($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.results.length, " r\u00E9sultat", ctx_r1.results.length > 1 ? "s" : "");
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.sortBy);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngIf", ctx_r1.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading && ctx_r1.paged.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading && ctx_r1.results.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("currentPage", ctx_r1.currentPage)("totalItems", ctx_r1.results.length)("pageSize", ctx_r1.pageSize);
} }
export class ListingSearch {
    fb;
    listingService;
    favoriteService;
    form;
    results = [];
    paged = [];
    favoriteIds = new Set();
    loading = false;
    searched = false;
    currentPage = 1;
    pageSize = 12;
    sortBy = 'date';
    constructor(fb, listingService, favoriteService) {
        this.fb = fb;
        this.listingService = listingService;
        this.favoriteService = favoriteService;
    }
    ngOnInit() {
        this.form = this.fb.group({
            type: [''],
            category: [''],
            location: [''],
            maxPrice: [null]
        });
        this.favoriteService.myFavorites().subscribe({
            next: (favs) => this.favoriteIds = new Set(favs.map(f => f.listingId))
        });
    }
    search() {
        this.loading = true;
        this.searched = true;
        const val = this.form.value;
        this.listingService.search({
            type: val.type || undefined,
            category: val.category || undefined,
            location: val.location || undefined,
            maxPrice: val.maxPrice || undefined
        }).subscribe({
            next: (data) => {
                this.results = data;
                this.sortResults();
                this.currentPage = 1;
                this.updatePaged();
                this.loading = false;
            },
            error: () => { this.loading = false; }
        });
    }
    sortResults() {
        switch (this.sortBy) {
            case 'date':
                this.results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'price-asc':
                this.results.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
                break;
            case 'price-desc':
                this.results.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
                break;
            case 'popularity':
                this.results.sort((a, b) => (b.favoriteCount + b.commentCount) - (a.favoriteCount + a.commentCount));
                break;
        }
    }
    onSortChange() {
        this.sortResults();
        this.currentPage = 1;
        this.updatePaged();
    }
    updatePaged() {
        const start = (this.currentPage - 1) * this.pageSize;
        this.paged = this.results.slice(start, start + this.pageSize);
    }
    onPageChange(page) {
        this.currentPage = page;
        this.updatePaged();
    }
    reset() {
        this.form.reset();
        this.results = [];
        this.paged = [];
        this.searched = false;
    }
    static ɵfac = function ListingSearch_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingSearch)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ResourceListingService), i0.ɵɵdirectiveInject(i3.FavoriteService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListingSearch, selectors: [["app-listing-search"]], standalone: false, decls: 44, vars: 3, consts: [[1, "page-wrapper"], [1, "ls-page"], ["routerLink", "/enterprise/annonces", 1, "btn", "btn-ghost", "btn-sm"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "ls-heading"], [1, "ls-form-card", 3, "formGroup"], [1, "ls-form-grid"], [1, "form-group"], ["formControlName", "type"], ["value", ""], ["value", "SURPLUS"], ["value", "DEMANDE"], ["value", "GROUP_BUYING"], ["type", "text", "formControlName", "category", "placeholder", "Ex: Metal, Plastique..."], ["type", "text", "formControlName", "location", "placeholder", "Ex: Tunis, Sfax..."], ["type", "number", "formControlName", "maxPrice", "placeholder", "Ex: 500", "min", "0"], [1, "ls-form-actions"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], [1, "btn", "btn-outline", 3, "click"], [4, "ngIf"], [1, "ls-results-header"], [1, "toolbar-count"], [1, "filter-select", 3, "ngModelChange", "ngModel"], ["value", "date"], ["value", "price-asc"], ["value", "price-desc"], ["value", "popularity"], ["class", "ls-loading", 4, "ngIf"], ["class", "ll-grid", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [3, "pageChange", "currentPage", "totalItems", "pageSize"], [1, "ls-loading"], [1, "spinner-lg"], [1, "ll-grid"], [3, "listing", "favoriteIds", 4, "ngFor", "ngForOf"], [3, "listing", "favoriteIds"], [1, "empty-state"], [1, "empty-icon"]], template: function ListingSearch_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(3, "svg", 3);
            i0.ɵɵelement(4, "line", 4)(5, "polyline", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(6, " Retour aux annonces ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "h1", 6);
            i0.ɵɵtext(8, "Recherche Avanc\u00E9e");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 7)(10, "div", 8)(11, "div", 9)(12, "label");
            i0.ɵɵtext(13, "Type d'annonce");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "select", 10)(15, "option", 11);
            i0.ɵɵtext(16, "Tous");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "option", 12);
            i0.ɵɵtext(18, "Surplus");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "option", 13);
            i0.ɵɵtext(20, "Demande");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "option", 14);
            i0.ɵɵtext(22, "Achat Group\u00E9");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(23, "div", 9)(24, "label");
            i0.ɵɵtext(25, "Cat\u00E9gorie produit");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(26, "input", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 9)(28, "label");
            i0.ɵɵtext(29, "Localisation");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(30, "input", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 9)(32, "label");
            i0.ɵɵtext(33, "Prix maximum (TND)");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(34, "input", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 18)(36, "button", 19);
            i0.ɵɵlistener("click", function ListingSearch_Template_button_click_36_listener() { return ctx.search(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(37, "svg", 3);
            i0.ɵɵelement(38, "circle", 20)(39, "line", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(40, " Rechercher ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(41, "button", 22);
            i0.ɵɵlistener("click", function ListingSearch_Template_button_click_41_listener() { return ctx.reset(); });
            i0.ɵɵtext(42, "R\u00E9initialiser");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(43, ListingSearch_div_43_Template, 17, 9, "div", 23);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(27);
            i0.ɵɵproperty("disabled", ctx.loading);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.searched);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.NgModel, i1.FormGroupDirective, i1.FormControlName, i5.RouterLink, i6.Pagination, i7.ListingCard], styles: [".ls-page[_ngcontent-%COMP%]{max-width:1060px;margin:0 auto}\n.ls-heading[_ngcontent-%COMP%]{font-size:22px;font-weight:800;color:var(--text);margin:14px 0 22px;letter-spacing:-.03em}\n.ls-form-card[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;padding:22px;margin-bottom:26px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ls-form-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:18px}\n.ls-form-actions[_ngcontent-%COMP%]{display:flex;gap:10px}\n.ls-results-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:10px}\n.ls-loading[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:48px}\n.ll-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}\n.spinner-lg[_ngcontent-%COMP%]{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:_ngcontent-%COMP%_spin .7s linear infinite}\n@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}\n@media(max-width:700px){.ls-form-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.ll-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingSearch, [{
        type: Component,
        args: [{ selector: 'app-listing-search', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"ls-page\">\n    <a routerLink=\"/enterprise/annonces\" class=\"btn btn-ghost btn-sm\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n      Retour aux annonces\n    </a>\n\n    <h1 class=\"ls-heading\">Recherche Avanc\u00E9e</h1>\n\n    <!-- Search form -->\n    <div class=\"ls-form-card\" [formGroup]=\"form\">\n      <div class=\"ls-form-grid\">\n        <div class=\"form-group\">\n          <label>Type d'annonce</label>\n          <select formControlName=\"type\">\n            <option value=\"\">Tous</option>\n            <option value=\"SURPLUS\">Surplus</option>\n            <option value=\"DEMANDE\">Demande</option>\n            <option value=\"GROUP_BUYING\">Achat Group\u00E9</option>\n          </select>\n        </div>\n        <div class=\"form-group\">\n          <label>Cat\u00E9gorie produit</label>\n          <input type=\"text\" formControlName=\"category\" placeholder=\"Ex: Metal, Plastique...\">\n        </div>\n        <div class=\"form-group\">\n          <label>Localisation</label>\n          <input type=\"text\" formControlName=\"location\" placeholder=\"Ex: Tunis, Sfax...\">\n        </div>\n        <div class=\"form-group\">\n          <label>Prix maximum (TND)</label>\n          <input type=\"number\" formControlName=\"maxPrice\" placeholder=\"Ex: 500\" min=\"0\">\n        </div>\n      </div>\n      <div class=\"ls-form-actions\">\n        <button class=\"btn btn-primary\" (click)=\"search()\" [disabled]=\"loading\">\n          <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/></svg>\n          Rechercher\n        </button>\n        <button class=\"btn btn-outline\" (click)=\"reset()\">R\u00E9initialiser</button>\n      </div>\n    </div>\n\n    <!-- Results -->\n    <div *ngIf=\"searched\">\n      <div class=\"ls-results-header\">\n        <span class=\"toolbar-count\">{{results.length}} r\u00E9sultat{{results.length > 1 ? 's' : ''}}</span>\n        <select class=\"filter-select\" [(ngModel)]=\"sortBy\" (ngModelChange)=\"onSortChange()\">\n          <option value=\"date\">Plus r\u00E9cent</option>\n          <option value=\"price-asc\">Prix croissant</option>\n          <option value=\"price-desc\">Prix d\u00E9croissant</option>\n          <option value=\"popularity\">Popularit\u00E9</option>\n        </select>\n      </div>\n\n      <div class=\"ls-loading\" *ngIf=\"loading\">\n        <div class=\"spinner-lg\"></div>\n      </div>\n\n      <div class=\"ll-grid\" *ngIf=\"!loading && paged.length > 0\">\n        <app-listing-card *ngFor=\"let l of paged\" [listing]=\"l\" [favoriteIds]=\"favoriteIds\"></app-listing-card>\n      </div>\n\n      <div class=\"empty-state\" *ngIf=\"!loading && results.length === 0\">\n        <span class=\"empty-icon\">\uD83D\uDD0D</span>\n        <h3>Aucun r\u00E9sultat</h3>\n        <p>Essayez d'\u00E9largir vos crit\u00E8res de recherche</p>\n      </div>\n\n      <app-pagination\n        [currentPage]=\"currentPage\"\n        [totalItems]=\"results.length\"\n        [pageSize]=\"pageSize\"\n        (pageChange)=\"onPageChange($event)\">\n      </app-pagination>\n    </div>\n  </div>\n</div>\n", styles: [".ls-page{max-width:1060px;margin:0 auto}\n.ls-heading{font-size:22px;font-weight:800;color:var(--text);margin:14px 0 22px;letter-spacing:-.03em}\n.ls-form-card{background:var(--card);border-radius:16px;padding:22px;margin-bottom:26px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ls-form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:18px}\n.ls-form-actions{display:flex;gap:10px}\n.ls-results-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:10px}\n.ls-loading{display:flex;justify-content:center;padding:48px}\n.ll-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}\n.spinner-lg{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite}\n@keyframes spin{to{transform:rotate(360deg)}}\n@media(max-width:700px){.ls-form-grid{grid-template-columns:1fr}.ll-grid{grid-template-columns:1fr}}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ResourceListingService }, { type: i3.FavoriteService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListingSearch, { className: "ListingSearch", filePath: "src/app/features/annonces/listing-search/listing-search.ts", lineNumber: 13 }); })();
