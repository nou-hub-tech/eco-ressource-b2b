import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "../favorite-button/favorite-button";
function ListingCard_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "img", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.listing.attachmentUrls[0], i0.ɵɵsanitizeUrl)("alt", ctx_r0.listing.title);
} }
function ListingCard_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 26);
    i0.ɵɵelement(2, "rect", 27)(3, "circle", 28)(4, "path", 29);
    i0.ɵɵelementEnd()();
} }
function ListingCard_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 10);
    i0.ɵɵelement(2, "path", 31)(3, "circle", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.listing.location, " ");
} }
function ListingCard_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementStart(3, "span", 34);
    i0.ɵɵtext(4, "TND");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 1, ctx_r0.listing.price, "1.0-2"), " ");
} }
function ListingCard_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1, "N\u00E9gociable");
    i0.ɵɵelementEnd();
} }
function ListingCard_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "div", 37);
    i0.ɵɵelement(2, "div", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 39)(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 40);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r0.groupProgress, "%")("background", ctx_r0.progressColor);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3("", ctx_r0.listing.groupPurchase.currentQuantity, "/", ctx_r0.listing.groupPurchase.targetQuantity, " ", ctx_r0.listing.unit);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.groupProgress, "%");
} }
export class ListingCard {
    router;
    listing;
    favoriteIds = new Set();
    constructor(router) {
        this.router = router;
    }
    get typeClass() {
        switch (this.listing.type) {
            case 'SURPLUS': return 'type-surplus';
            case 'DEMANDE': return 'type-demande';
            case 'GROUP_BUYING': return 'type-group';
            default: return '';
        }
    }
    get typeLabel() {
        switch (this.listing.type) {
            case 'SURPLUS': return 'Surplus';
            case 'DEMANDE': return 'Demande';
            case 'GROUP_BUYING': return 'Achat Groupé';
            default: return '';
        }
    }
    get statusClass() {
        switch (this.listing.status) {
            case 'ACTIVE': return 'badge-success';
            case 'CLOSED': return 'badge-neutral';
            case 'EXPIRED': return 'badge-warning';
            case 'CANCELLED': return 'badge-danger';
            default: return 'badge-neutral';
        }
    }
    get groupProgress() {
        if (!this.listing.groupPurchase)
            return 0;
        const gp = this.listing.groupPurchase;
        return gp.targetQuantity > 0
            ? Math.round((gp.currentQuantity / gp.targetQuantity) * 100)
            : 0;
    }
    get progressColor() {
        const p = this.groupProgress;
        if (p >= 75)
            return '#059669';
        if (p >= 25)
            return '#d97706';
        return '#dc2626';
    }
    get isFav() {
        return this.favoriteIds.has(this.listing.id);
    }
    goToDetail() {
        this.router.navigate(['/enterprise/annonces', this.listing.id]);
    }
    timeAgo(dateStr) {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1)
            return 'À l\'instant';
        if (mins < 60)
            return `Il y a ${mins} min`;
        const hours = Math.floor(mins / 60);
        if (hours < 24)
            return `Il y a ${hours}h`;
        const days = Math.floor(hours / 24);
        if (days < 30)
            return `Il y a ${days}j`;
        return new Date(dateStr).toLocaleDateString('fr-FR');
    }
    static ɵfac = function ListingCard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingCard)(i0.ɵɵdirectiveInject(i1.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListingCard, selectors: [["app-listing-card"]], inputs: { listing: "listing", favoriteIds: "favoriteIds" }, standalone: false, decls: 33, vars: 21, consts: [[1, "lc", 3, "click"], ["class", "lc-img", 4, "ngIf"], ["class", "lc-img lc-placeholder", 4, "ngIf"], [1, "lc-body"], [1, "lc-top"], [1, "lc-type", 3, "ngClass"], [1, "badge", "lc-status", 3, "ngClass"], [1, "lc-title"], [1, "lc-meta"], [1, "lc-cat"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"], ["x1", "7", "y1", "7", "x2", "7.01", "y2", "7"], ["class", "lc-loc", 4, "ngIf"], [1, "lc-price-row"], ["class", "lc-price", 4, "ngIf"], ["class", "lc-price lc-negotiable", 4, "ngIf"], [1, "lc-qty"], ["class", "lc-group", 4, "ngIf"], [1, "lc-footer"], [1, "lc-stats"], [1, "lc-time"], [3, "listingId", "isFavorite", "count", "showCount"], [1, "lc-img"], ["loading", "lazy", 3, "src", "alt"], [1, "lc-img", "lc-placeholder"], ["width", "32", "height", "32", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2"], ["cx", "8.5", "cy", "8.5", "r", "1.5"], ["d", "M21 15l-5-5L5 21"], [1, "lc-loc"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "lc-price"], [1, "lc-currency"], [1, "lc-price", "lc-negotiable"], [1, "lc-group"], [1, "lc-progress-bar"], [1, "lc-progress-fill"], [1, "lc-progress-info"], [1, "lc-progress-pct"]], template: function ListingCard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵlistener("click", function ListingCard_Template_div_click_0_listener() { return ctx.goToDetail(); });
            i0.ɵɵtemplate(1, ListingCard_div_1_Template, 2, 2, "div", 1)(2, ListingCard_div_2_Template, 5, 0, "div", 2);
            i0.ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "span", 5);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span", 6);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "h3", 7);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 8)(12, "span", 9);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(13, "svg", 10);
            i0.ɵɵelement(14, "path", 11)(15, "line", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(17, ListingCard_span_17_Template, 5, 1, "span", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(18, "div", 14);
            i0.ɵɵtemplate(19, ListingCard_div_19_Template, 5, 4, "div", 15)(20, ListingCard_div_20_Template, 2, 0, "div", 16);
            i0.ɵɵelementStart(21, "div", 17);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(23, ListingCard_div_23_Template, 8, 8, "div", 18);
            i0.ɵɵelementStart(24, "div", 19)(25, "div", 20)(26, "span");
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "span", 21);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(32, "app-favorite-button", 22);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.listing.attachmentUrls == null ? null : ctx.listing.attachmentUrls.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !(ctx.listing.attachmentUrls == null ? null : ctx.listing.attachmentUrls.length));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngClass", ctx.typeClass);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.typeLabel);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ctx.statusClass);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.listing.status);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.listing.title);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.listing.productCategory, " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.listing.location);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.listing.price !== null);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.listing.price === null);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.listing.quantity, " ", ctx.listing.unit);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.listing.type === "GROUP_BUYING" && ctx.listing.groupPurchase);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("\u2764 ", ctx.listing.favoriteCount);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("\uD83D\uDCAC ", ctx.listing.commentCount);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.timeAgo(ctx.listing.createdAt));
            i0.ɵɵadvance();
            i0.ɵɵproperty("listingId", ctx.listing.id)("isFavorite", ctx.isFav)("count", ctx.listing.favoriteCount)("showCount", false);
        } }, dependencies: [i2.NgClass, i2.NgIf, i3.FavoriteButton, i2.DecimalPipe], styles: [".lc[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;overflow:hidden;cursor:pointer;transition:box-shadow .25s ease,transform .25s ease;display:flex;flex-direction:column;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.lc[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.08)}\n.lc-img[_ngcontent-%COMP%]{height:180px;background:var(--bg3,var(--bg2));overflow:hidden;position:relative}\n.lc-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}\n.lc[_ngcontent-%COMP%]:hover   .lc-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transform:scale(1.03)}\n.lc-placeholder[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;height:100%;min-height:180px;color:var(--border2);opacity:.35}\n.lc-body[_ngcontent-%COMP%]{padding:16px 18px 14px;display:flex;flex-direction:column;gap:8px;flex:1}\n.lc-top[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px}\n.lc-type[_ngcontent-%COMP%]{font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;letter-spacing:.01em}\n.type-surplus[_ngcontent-%COMP%]{background:#ecfdf5;color:#047857}\n.type-demande[_ngcontent-%COMP%]{background:rgba(57,62,70,.08);color:#393E46}\n.type-group[_ngcontent-%COMP%]{background:rgba(0,173,181,.08);color:#009199}\n.lc-status[_ngcontent-%COMP%]{font-size:10px;margin-left:auto}\n.lc-title[_ngcontent-%COMP%]{font-size:15px;font-weight:700;color:var(--text);line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;letter-spacing:-.01em}\n.lc-meta[_ngcontent-%COMP%]{display:flex;gap:12px;flex-wrap:wrap}\n.lc-cat[_ngcontent-%COMP%], .lc-loc[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--text3);font-weight:400}\n.lc-price-row[_ngcontent-%COMP%]{display:flex;align-items:baseline;justify-content:space-between;padding-top:4px}\n.lc-price[_ngcontent-%COMP%]{font-size:20px;font-weight:800;color:var(--text);letter-spacing:-.03em}\n.lc-currency[_ngcontent-%COMP%]{font-size:11px;font-weight:500;color:var(--text3);margin-left:2px}\n.lc-negotiable[_ngcontent-%COMP%]{font-size:13px;font-weight:500;color:var(--text3)}\n.lc-qty[_ngcontent-%COMP%]{font-size:12px;color:var(--text3);font-weight:500}\n.lc-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:5px}\n.lc-progress-bar[_ngcontent-%COMP%]{height:4px;background:var(--bg3,#f1f5f9);border-radius:100px;overflow:hidden}\n.lc-progress-fill[_ngcontent-%COMP%]{height:100%;border-radius:100px;transition:width .8s cubic-bezier(.4,0,.2,1)}\n.lc-progress-info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:11px;color:var(--text3)}\n.lc-progress-pct[_ngcontent-%COMP%]{font-weight:700;color:var(--text2)}\n.lc-footer[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:10px;border-top:1px solid var(--bg3,#f1f5f9)}\n.lc-stats[_ngcontent-%COMP%]{display:flex;gap:12px;font-size:12px;color:var(--text3);font-weight:400}\n.lc-time[_ngcontent-%COMP%]{font-size:11px;color:var(--muted)}\n@media(max-width:600px){.lc-img[_ngcontent-%COMP%]{height:140px}.lc-body[_ngcontent-%COMP%]{padding:14px}.lc-price[_ngcontent-%COMP%]{font-size:17px}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingCard, [{
        type: Component,
        args: [{ selector: 'app-listing-card', standalone: false, template: "<div class=\"lc\" (click)=\"goToDetail()\">\n  <div class=\"lc-img\" *ngIf=\"listing.attachmentUrls?.length\">\n    <img [src]=\"listing.attachmentUrls[0]\" [alt]=\"listing.title\" loading=\"lazy\">\n  </div>\n  <div class=\"lc-img lc-placeholder\" *ngIf=\"!listing.attachmentUrls?.length\">\n    <svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n      <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><path d=\"M21 15l-5-5L5 21\"/>\n    </svg>\n  </div>\n\n  <div class=\"lc-body\">\n    <div class=\"lc-top\">\n      <span class=\"lc-type\" [ngClass]=\"typeClass\">{{typeLabel}}</span>\n      <span class=\"badge lc-status\" [ngClass]=\"statusClass\">{{listing.status}}</span>\n    </div>\n\n    <h3 class=\"lc-title\">{{listing.title}}</h3>\n\n    <div class=\"lc-meta\">\n      <span class=\"lc-cat\">\n        <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z\"/><line x1=\"7\" y1=\"7\" x2=\"7.01\" y2=\"7\"/></svg>\n        {{listing.productCategory}}\n      </span>\n      <span class=\"lc-loc\" *ngIf=\"listing.location\">\n        <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>\n        {{listing.location}}\n      </span>\n    </div>\n\n    <div class=\"lc-price-row\">\n      <div class=\"lc-price\" *ngIf=\"listing.price !== null\">\n        {{listing.price | number:'1.0-2'}} <span class=\"lc-currency\">TND</span>\n      </div>\n      <div class=\"lc-price lc-negotiable\" *ngIf=\"listing.price === null\">N\u00E9gociable</div>\n      <div class=\"lc-qty\">{{listing.quantity}} {{listing.unit}}</div>\n    </div>\n\n    <!-- Group Buying progress -->\n    <div class=\"lc-group\" *ngIf=\"listing.type === 'GROUP_BUYING' && listing.groupPurchase\">\n      <div class=\"lc-progress-bar\">\n        <div class=\"lc-progress-fill\" [style.width.%]=\"groupProgress\" [style.background]=\"progressColor\"></div>\n      </div>\n      <div class=\"lc-progress-info\">\n        <span>{{listing.groupPurchase.currentQuantity}}/{{listing.groupPurchase.targetQuantity}} {{listing.unit}}</span>\n        <span class=\"lc-progress-pct\">{{groupProgress}}%</span>\n      </div>\n    </div>\n\n    <div class=\"lc-footer\">\n      <div class=\"lc-stats\">\n        <span>\u2764 {{listing.favoriteCount}}</span>\n        <span>\uD83D\uDCAC {{listing.commentCount}}</span>\n        <span class=\"lc-time\">{{timeAgo(listing.createdAt)}}</span>\n      </div>\n      <app-favorite-button\n        [listingId]=\"listing.id\"\n        [isFavorite]=\"isFav\"\n        [count]=\"listing.favoriteCount\"\n        [showCount]=\"false\">\n      </app-favorite-button>\n    </div>\n  </div>\n</div>\n", styles: [".lc{background:var(--card);border-radius:16px;overflow:hidden;cursor:pointer;transition:box-shadow .25s ease,transform .25s ease;display:flex;flex-direction:column;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.lc:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(0,0,0,.08)}\n.lc-img{height:180px;background:var(--bg3,var(--bg2));overflow:hidden;position:relative}\n.lc-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s ease}\n.lc:hover .lc-img img{transform:scale(1.03)}\n.lc-placeholder{display:flex;align-items:center;justify-content:center;height:100%;min-height:180px;color:var(--border2);opacity:.35}\n.lc-body{padding:16px 18px 14px;display:flex;flex-direction:column;gap:8px;flex:1}\n.lc-top{display:flex;align-items:center;gap:8px}\n.lc-type{font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;letter-spacing:.01em}\n.type-surplus{background:#ecfdf5;color:#047857}\n.type-demande{background:rgba(57,62,70,.08);color:#393E46}\n.type-group{background:rgba(0,173,181,.08);color:#009199}\n.lc-status{font-size:10px;margin-left:auto}\n.lc-title{font-size:15px;font-weight:700;color:var(--text);line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;letter-spacing:-.01em}\n.lc-meta{display:flex;gap:12px;flex-wrap:wrap}\n.lc-cat,.lc-loc{display:inline-flex;align-items:center;gap:4px;font-size:12px;color:var(--text3);font-weight:400}\n.lc-price-row{display:flex;align-items:baseline;justify-content:space-between;padding-top:4px}\n.lc-price{font-size:20px;font-weight:800;color:var(--text);letter-spacing:-.03em}\n.lc-currency{font-size:11px;font-weight:500;color:var(--text3);margin-left:2px}\n.lc-negotiable{font-size:13px;font-weight:500;color:var(--text3)}\n.lc-qty{font-size:12px;color:var(--text3);font-weight:500}\n.lc-group{display:flex;flex-direction:column;gap:5px}\n.lc-progress-bar{height:4px;background:var(--bg3,#f1f5f9);border-radius:100px;overflow:hidden}\n.lc-progress-fill{height:100%;border-radius:100px;transition:width .8s cubic-bezier(.4,0,.2,1)}\n.lc-progress-info{display:flex;justify-content:space-between;font-size:11px;color:var(--text3)}\n.lc-progress-pct{font-weight:700;color:var(--text2)}\n.lc-footer{display:flex;align-items:center;justify-content:space-between;margin-top:auto;padding-top:10px;border-top:1px solid var(--bg3,#f1f5f9)}\n.lc-stats{display:flex;gap:12px;font-size:12px;color:var(--text3);font-weight:400}\n.lc-time{font-size:11px;color:var(--muted)}\n@media(max-width:600px){.lc-img{height:140px}.lc-body{padding:14px}.lc-price{font-size:17px}}\n"] }]
    }], () => [{ type: i1.Router }], { listing: [{
            type: Input
        }], favoriteIds: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListingCard, { className: "ListingCard", filePath: "src/app/features/annonces/components/listing-card/listing-card.ts", lineNumber: 11 }); })();
