import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/favorite.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
const _c0 = a0 => ["/enterprise/annonces", a0];
function FavoriteList_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement de vos favoris...");
    i0.ɵɵelementEnd()();
} }
function FavoriteList_div_14_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 16);
    i0.ɵɵtext(2, "\u2764");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 17)(4, "a", 18);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 19);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 20);
    i0.ɵɵlistener("click", function FavoriteList_div_14_div_1_Template_button_click_8_listener() { const f_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removeFavorite(f_r2.listingId)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(9, "svg", 5);
    i0.ɵɵelement(10, "line", 21)(11, "line", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, " Retirer ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const f_r2 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(3, _c0, f_r2.listingId));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(f_r2.listingTitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Annonce #", f_r2.listingId);
} }
function FavoriteList_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtemplate(1, FavoriteList_div_14_div_1_Template, 13, 5, "div", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.favorites);
} }
function FavoriteList_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23)(1, "span", 24);
    i0.ɵɵtext(2, "\uD83D\uDC94");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "Aucun favori");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Ajoutez des annonces \u00E0 vos favoris en cliquant sur le c\u0153ur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "a", 25);
    i0.ɵɵtext(8, "Explorer les annonces");
    i0.ɵɵelementEnd()();
} }
export class FavoriteList {
    favoriteService;
    favorites = [];
    loading = true;
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    ngOnInit() {
        this.loadFavorites();
    }
    loadFavorites() {
        this.loading = true;
        this.favoriteService.myFavorites().subscribe({
            next: (data) => { this.favorites = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }
    removeFavorite(listingId) {
        this.favoriteService.remove(listingId).subscribe({
            next: () => {
                this.favorites = this.favorites.filter(f => f.listingId !== listingId);
            }
        });
    }
    static ɵfac = function FavoriteList_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FavoriteList)(i0.ɵɵdirectiveInject(i1.FavoriteService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FavoriteList, selectors: [["app-favorite-list"]], standalone: false, decls: 16, vars: 3, consts: [[1, "page-wrapper"], [1, "fl-page"], [1, "page-header-row"], [1, "page-header", 2, "margin", "0"], ["routerLink", "/enterprise/annonces", 1, "btn", "btn-outline"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], ["class", "fl-loading", 4, "ngIf"], ["class", "fl-list", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "fl-loading"], [1, "spinner-lg"], [1, "fl-list"], ["class", "fl-item", 4, "ngFor", "ngForOf"], [1, "fl-item"], [1, "fl-icon"], [1, "fl-info"], [1, "fl-title", 3, "routerLink"], [1, "fl-id"], [1, "btn", "btn-ghost", "btn-sm", "fl-remove", 3, "click"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/enterprise/annonces", 1, "btn", "btn-primary", 2, "margin-top", "12px"]], template: function FavoriteList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h1");
            i0.ɵɵtext(5, "Mes Favoris");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Les annonces que vous avez sauvegard\u00E9es");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "a", 4);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(9, "svg", 5);
            i0.ɵɵelement(10, "line", 6)(11, "polyline", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(12, " Retour aux annonces ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(13, FavoriteList_div_13_Template, 4, 0, "div", 8)(14, FavoriteList_div_14_Template, 2, 1, "div", 9)(15, FavoriteList_div_15_Template, 9, 0, "div", 10);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.favorites.length > 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.favorites.length === 0);
        } }, dependencies: [i2.NgForOf, i2.NgIf, i3.RouterLink], styles: [".fl-page[_ngcontent-%COMP%]{max-width:720px;margin:0 auto}\n.fl-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3)}\n.fl-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}\n.fl-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:14px;padding:16px 20px;background:var(--card);border-radius:14px;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.fl-item[_ngcontent-%COMP%]:hover{box-shadow:0 4px 16px rgba(0,0,0,.06);transform:translateY(-1px)}\n.fl-icon[_ngcontent-%COMP%]{font-size:18px;color:#ef4444}\n.fl-info[_ngcontent-%COMP%]{flex:1;min-width:0}\n.fl-title[_ngcontent-%COMP%]{font-size:14px;font-weight:600;color:var(--text);text-decoration:none;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.fl-title[_ngcontent-%COMP%]:hover{color:var(--primary)}\n.fl-id[_ngcontent-%COMP%]{font-size:11px;color:var(--muted);margin-top:2px;display:block}\n.fl-remove[_ngcontent-%COMP%]{color:var(--text3)!important;flex-shrink:0;opacity:.6;transition:opacity .15s}\n.fl-remove[_ngcontent-%COMP%]:hover{opacity:1;color:var(--danger,#ef4444)!important}\n.spinner-lg[_ngcontent-%COMP%]{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:_ngcontent-%COMP%_spin .7s linear infinite}\n@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FavoriteList, [{
        type: Component,
        args: [{ selector: 'app-favorite-list', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"fl-page\">\n    <div class=\"page-header-row\">\n      <div class=\"page-header\" style=\"margin:0\">\n        <h1>Mes Favoris</h1>\n        <p>Les annonces que vous avez sauvegard\u00E9es</p>\n      </div>\n      <a class=\"btn btn-outline\" routerLink=\"/enterprise/annonces\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n        Retour aux annonces\n      </a>\n    </div>\n\n    <div class=\"fl-loading\" *ngIf=\"loading\">\n      <div class=\"spinner-lg\"></div>\n      <p>Chargement de vos favoris...</p>\n    </div>\n\n    <div class=\"fl-list\" *ngIf=\"!loading && favorites.length > 0\">\n      <div class=\"fl-item\" *ngFor=\"let f of favorites\">\n        <div class=\"fl-icon\">\u2764</div>\n        <div class=\"fl-info\">\n          <a [routerLink]=\"['/enterprise/annonces', f.listingId]\" class=\"fl-title\">{{f.listingTitle}}</a>\n          <span class=\"fl-id\">Annonce #{{f.listingId}}</span>\n        </div>\n        <button class=\"btn btn-ghost btn-sm fl-remove\" (click)=\"removeFavorite(f.listingId)\">\n          <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"/><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"/></svg>\n          Retirer\n        </button>\n      </div>\n    </div>\n\n    <div class=\"empty-state\" *ngIf=\"!loading && favorites.length === 0\">\n      <span class=\"empty-icon\">\uD83D\uDC94</span>\n      <h3>Aucun favori</h3>\n      <p>Ajoutez des annonces \u00E0 vos favoris en cliquant sur le c\u0153ur</p>\n      <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces\" style=\"margin-top:12px\">Explorer les annonces</a>\n    </div>\n  </div>\n</div>\n", styles: [".fl-page{max-width:720px;margin:0 auto}\n.fl-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3)}\n.fl-list{display:flex;flex-direction:column;gap:8px}\n.fl-item{display:flex;align-items:center;gap:14px;padding:16px 20px;background:var(--card);border-radius:14px;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.fl-item:hover{box-shadow:0 4px 16px rgba(0,0,0,.06);transform:translateY(-1px)}\n.fl-icon{font-size:18px;color:#ef4444}\n.fl-info{flex:1;min-width:0}\n.fl-title{font-size:14px;font-weight:600;color:var(--text);text-decoration:none;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.fl-title:hover{color:var(--primary)}\n.fl-id{font-size:11px;color:var(--muted);margin-top:2px;display:block}\n.fl-remove{color:var(--text3)!important;flex-shrink:0;opacity:.6;transition:opacity .15s}\n.fl-remove:hover{opacity:1;color:var(--danger,#ef4444)!important}\n.spinner-lg{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite}\n@keyframes spin{to{transform:rotate(360deg)}}\n"] }]
    }], () => [{ type: i1.FavoriteService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FavoriteList, { className: "FavoriteList", filePath: "src/app/features/annonces/favorite-list/favorite-list.ts", lineNumber: 11 }); })();
