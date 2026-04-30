import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/favorite.service";
import * as i2 from "@angular/common";
function FavoriteButton_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.count);
} }
export class FavoriteButton {
    favoriteService;
    listingId;
    isFavorite = false;
    count = 0;
    showCount = true;
    toggled = new EventEmitter();
    loading = false;
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
    }
    toggle(event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.loading)
            return;
        this.loading = true;
        const onSuccess = () => {
            this.isFavorite = !this.isFavorite;
            this.count += this.isFavorite ? 1 : -1;
            this.toggled.emit(this.isFavorite);
            this.loading = false;
        };
        const onError = () => { this.loading = false; };
        if (this.isFavorite) {
            this.favoriteService.remove(this.listingId).subscribe({ next: onSuccess, error: onError });
        }
        else {
            this.favoriteService.add(this.listingId).subscribe({ next: onSuccess, error: onError });
        }
    }
    static ɵfac = function FavoriteButton_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FavoriteButton)(i0.ɵɵdirectiveInject(i1.FavoriteService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FavoriteButton, selectors: [["app-favorite-button"]], inputs: { listingId: "listingId", isFavorite: "isFavorite", count: "count", showCount: "showCount" }, outputs: { toggled: "toggled" }, standalone: false, decls: 4, vars: 7, consts: [[1, "fav-btn", 3, "click", "title"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"], ["class", "fav-count", 4, "ngIf"], [1, "fav-count"]], template: function FavoriteButton_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "button", 0);
            i0.ɵɵlistener("click", function FavoriteButton_Template_button_click_0_listener($event) { return ctx.toggle($event); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(1, "svg", 1);
            i0.ɵɵelement(2, "path", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, FavoriteButton_span_3_Template, 2, 1, "span", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("active", ctx.isFavorite)("loading", ctx.loading);
            i0.ɵɵproperty("title", ctx.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris");
            i0.ɵɵadvance();
            i0.ɵɵattribute("fill", ctx.isFavorite ? "currentColor" : "none");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.showCount && ctx.count > 0);
        } }, dependencies: [i2.NgIf], styles: [".fav-btn[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;padding:6px;border-radius:50%;border:none;background:transparent;color:var(--text3);cursor:pointer;transition:all .2s;font-size:12px;font-weight:500}\n.fav-btn[_ngcontent-%COMP%]:hover{color:#ef4444;background:rgba(239,68,68,.06);transform:scale(1.1)}\n.fav-btn.active[_ngcontent-%COMP%]{color:#ef4444}\n.fav-btn.active[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_heartPop .35s cubic-bezier(.17,.89,.32,1.28)}\n.fav-btn.loading[_ngcontent-%COMP%]{opacity:.4;pointer-events:none}\n.fav-count[_ngcontent-%COMP%]{font-size:12px;font-weight:600;color:var(--text3)}\n.fav-btn.active[_ngcontent-%COMP%]   .fav-count[_ngcontent-%COMP%]{color:#ef4444}\n@keyframes _ngcontent-%COMP%_heartPop{0%{transform:scale(1)}40%{transform:scale(1.35)}100%{transform:scale(1)}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FavoriteButton, [{
        type: Component,
        args: [{ selector: 'app-favorite-button', standalone: false, template: "<button class=\"fav-btn\" [class.active]=\"isFavorite\" [class.loading]=\"loading\" (click)=\"toggle($event)\" [title]=\"isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'\">\n  <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" [attr.fill]=\"isFavorite ? 'currentColor' : 'none'\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z\"/>\n  </svg>\n  <span class=\"fav-count\" *ngIf=\"showCount && count > 0\">{{count}}</span>\n</button>\n", styles: [".fav-btn{display:inline-flex;align-items:center;gap:5px;padding:6px;border-radius:50%;border:none;background:transparent;color:var(--text3);cursor:pointer;transition:all .2s;font-size:12px;font-weight:500}\n.fav-btn:hover{color:#ef4444;background:rgba(239,68,68,.06);transform:scale(1.1)}\n.fav-btn.active{color:#ef4444}\n.fav-btn.active svg{animation:heartPop .35s cubic-bezier(.17,.89,.32,1.28)}\n.fav-btn.loading{opacity:.4;pointer-events:none}\n.fav-count{font-size:12px;font-weight:600;color:var(--text3)}\n.fav-btn.active .fav-count{color:#ef4444}\n@keyframes heartPop{0%{transform:scale(1)}40%{transform:scale(1.35)}100%{transform:scale(1)}}\n"] }]
    }], () => [{ type: i1.FavoriteService }], { listingId: [{
            type: Input
        }], isFavorite: [{
            type: Input
        }], count: [{
            type: Input
        }], showCount: [{
            type: Input
        }], toggled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FavoriteButton, { className: "FavoriteButton", filePath: "src/app/features/annonces/components/favorite-button/favorite-button.ts", lineNumber: 10 }); })();
