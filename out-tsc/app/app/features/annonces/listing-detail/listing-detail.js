import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../services/resource-listing.service";
import * as i3 from "../services/favorite.service";
import * as i4 from "../../../core/services/auth.service";
import * as i5 from "@angular/common";
import * as i6 from "../components/confirm-dialog/confirm-dialog";
import * as i7 from "../components/favorite-button/favorite-button";
import * as i8 from "../components/comment-thread/comment-thread";
import * as i9 from "../components/group-purchase-panel/group-purchase-panel";
const _c0 = a0 => ["/enterprise/annonces", a0, "edit"];
function ListingDetail_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "div", 6);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement de l'annonce...");
    i0.ɵɵelementEnd()();
} }
function ListingDetail_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 8);
    i0.ɵɵtext(2, "\u26A0\uFE0F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 9);
    i0.ɵɵtext(6, "Retour aux annonces");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function ListingDetail_div_3_div_8_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 52);
    i0.ɵɵlistener("click", function ListingDetail_div_3_div_8_button_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.prevImage()); });
    i0.ɵɵtext(1, "\u2039");
    i0.ɵɵelementEnd();
} }
function ListingDetail_div_3_div_8_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 53);
    i0.ɵɵlistener("click", function ListingDetail_div_3_div_8_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.nextImage()); });
    i0.ɵɵtext(1, "\u203A");
    i0.ɵɵelementEnd();
} }
function ListingDetail_div_3_div_8_div_5_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵlistener("click", function ListingDetail_div_3_div_8_div_5_span_1_Template_span_click_0_listener() { const i_r5 = i0.ɵɵrestoreView(_r4).index; const ctx_r0 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r0.currentImageIndex = i_r5); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r5 = ctx.index;
    const ctx_r0 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("active", i_r5 === ctx_r0.currentImageIndex);
} }
function ListingDetail_div_3_div_8_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54);
    i0.ɵɵtemplate(1, ListingDetail_div_3_div_8_div_5_span_1_Template, 1, 2, "span", 55);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.listing.attachmentUrls);
} }
function ListingDetail_div_3_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46)(1, "div", 47);
    i0.ɵɵelement(2, "img", 48);
    i0.ɵɵtemplate(3, ListingDetail_div_3_div_8_button_3_Template, 2, 0, "button", 49)(4, ListingDetail_div_3_div_8_button_4_Template, 2, 0, "button", 50)(5, ListingDetail_div_3_div_8_div_5_Template, 2, 1, "div", 51);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", ctx_r0.listing.attachmentUrls[ctx_r0.currentImageIndex], i0.ɵɵsanitizeUrl)("alt", ctx_r0.listing.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.listing.attachmentUrls.length > 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.listing.attachmentUrls.length > 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.listing.attachmentUrls.length > 1);
} }
function ListingDetail_div_3_span_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 24);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 25);
    i0.ɵɵelement(2, "path", 57)(3, "circle", 58);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.listing.location, " ");
} }
function ListingDetail_div_3_span_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(2, 1, ctx_r0.listing.price, "1.0-2"), " TND");
} }
function ListingDetail_div_3_span_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 59);
    i0.ɵɵtext(1, "N\u00E9gociable");
    i0.ɵɵelementEnd();
} }
function ListingDetail_div_3_app_group_purchase_panel_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-group-purchase-panel", 60);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("listing", ctx_r0.listing)("group", ctx_r0.listing.groupPurchase);
} }
function ListingDetail_div_3_div_58_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 67);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 12);
    i0.ɵɵelement(2, "path", 68)(3, "path", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Modifier ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c0, ctx_r0.listing.id));
} }
function ListingDetail_div_3_div_58_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 70);
    i0.ɵɵlistener("click", function ListingDetail_div_3_div_58_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.confirmCancel()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 12);
    i0.ɵɵelement(2, "circle", 29)(3, "line", 71)(4, "line", 72);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Annuler l'annonce ");
    i0.ɵɵelementEnd();
} }
function ListingDetail_div_3_div_58_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 61)(1, "h4");
    i0.ɵɵtext(2, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, ListingDetail_div_3_div_58_a_3_Template, 5, 3, "a", 62);
    i0.ɵɵelementStart(4, "button", 63);
    i0.ɵɵlistener("click", function ListingDetail_div_3_div_58_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.duplicate()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(5, "svg", 12);
    i0.ɵɵelement(6, "rect", 64)(7, "path", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " Dupliquer ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, ListingDetail_div_3_div_58_button_9_Template, 6, 0, "button", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.canEdit);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.canCancel);
} }
function ListingDetail_div_3_div_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function ListingDetail_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "a", 11);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 12);
    i0.ɵɵelement(3, "line", 13)(4, "polyline", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Retour ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "div", 15)(7, "div", 16);
    i0.ɵɵtemplate(8, ListingDetail_div_3_div_8_Template, 6, 5, "div", 17);
    i0.ɵɵelementStart(9, "div", 18)(10, "div", 19)(11, "span", 20);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 21);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "h1", 22);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 23)(18, "span", 24);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(19, "svg", 25);
    i0.ɵɵelement(20, "path", 26)(21, "line", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(23, ListingDetail_div_3_span_23_Template, 5, 1, "span", 28);
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(24, "span", 24);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(25, "svg", 25);
    i0.ɵɵelement(26, "circle", 29)(27, "polyline", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(29, "div", 31)(30, "h3");
    i0.ɵɵtext(31, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "p", 32);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "div", 33)(35, "div", 34)(36, "span", 35);
    i0.ɵɵtext(37, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span", 36);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "div", 34)(41, "span", 35);
    i0.ɵɵtext(42, "Prix");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(43, ListingDetail_div_3_span_43_Template, 3, 4, "span", 37)(44, ListingDetail_div_3_span_44_Template, 2, 0, "span", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 34)(46, "span", 35);
    i0.ɵɵtext(47, "Favoris");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "span", 36);
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(50, "div", 34)(51, "span", 35);
    i0.ɵɵtext(52, "Commentaires");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "span", 36);
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(55, ListingDetail_div_3_app_group_purchase_panel_55_Template, 1, 2, "app-group-purchase-panel", 39);
    i0.ɵɵelement(56, "app-comment-thread", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "div", 41);
    i0.ɵɵtemplate(58, ListingDetail_div_3_div_58_Template, 10, 2, "div", 42);
    i0.ɵɵelementStart(59, "div", 43);
    i0.ɵɵelement(60, "app-favorite-button", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(61, ListingDetail_div_3_div_61_Template, 2, 1, "div", 45);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r0.listing.attachmentUrls == null ? null : ctx_r0.listing.attachmentUrls.length);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r0.typeClass);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.typeLabel);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r0.statusBadge);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.listing.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.listing.title);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2(" ", ctx_r0.listing.productName, " (", ctx_r0.listing.productCategory, ") ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.listing.location);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.timeAgo(ctx_r0.listing.createdAt), " ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.listing.description);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate2("", ctx_r0.listing.quantity, " ", ctx_r0.listing.unit);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r0.listing.price !== null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.listing.price === null);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\u2764 ", ctx_r0.listing.favoriteCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("\uD83D\uDCAC ", ctx_r0.listing.commentCount);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.listing.type === "GROUP_BUYING" && ctx_r0.listing.groupPurchase);
    i0.ɵɵadvance();
    i0.ɵɵproperty("listingId", ctx_r0.listing.id);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.isOwner);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("listingId", ctx_r0.listing.id)("isFavorite", ctx_r0.isFavorite)("count", ctx_r0.listing.favoriteCount)("showCount", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.error);
} }
export class ListingDetail {
    route;
    router;
    listingService;
    favoriteService;
    authService;
    listing = null;
    loading = true;
    error = '';
    isFavorite = false;
    currentCompanyId = null;
    currentImageIndex = 0;
    showCancelConfirm = false;
    cancelLoading = false;
    constructor(route, router, listingService, favoriteService, authService) {
        this.route = route;
        this.router = router;
        this.listingService = listingService;
        this.favoriteService = favoriteService;
        this.authService = authService;
    }
    ngOnInit() {
        const user = this.authService.currentUser;
        this.currentCompanyId = user ? parseInt(user.id, 10) : null;
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.loadListing(id);
        this.loadFavoriteStatus(id);
    }
    loadListing(id) {
        this.loading = true;
        this.listingService.getById(id).subscribe({
            next: (data) => { this.listing = data; this.loading = false; },
            error: (err) => { this.error = err.error?.message || 'Annonce introuvable'; this.loading = false; }
        });
    }
    loadFavoriteStatus(listingId) {
        this.favoriteService.myFavorites().subscribe({
            next: (favs) => {
                this.isFavorite = favs.some(f => f.listingId === listingId);
            }
        });
    }
    get isOwner() {
        return !!this.listing && this.currentCompanyId === this.listing.companyId;
    }
    get canEdit() {
        return this.isOwner && this.listing?.status === 'ACTIVE';
    }
    get canCancel() {
        return this.isOwner && this.listing?.status === 'ACTIVE';
    }
    get typeClass() {
        if (!this.listing)
            return '';
        switch (this.listing.type) {
            case 'SURPLUS': return 'type-surplus';
            case 'DEMANDE': return 'type-demande';
            case 'GROUP_BUYING': return 'type-group';
            default: return '';
        }
    }
    get typeLabel() {
        if (!this.listing)
            return '';
        switch (this.listing.type) {
            case 'SURPLUS': return 'Surplus';
            case 'DEMANDE': return 'Demande';
            case 'GROUP_BUYING': return 'Achat Groupé';
            default: return '';
        }
    }
    get statusBadge() {
        if (!this.listing)
            return '';
        switch (this.listing.status) {
            case 'ACTIVE': return 'badge-success';
            case 'CLOSED': return 'badge-neutral';
            case 'EXPIRED': return 'badge-warning';
            case 'CANCELLED': return 'badge-danger';
            default: return 'badge-neutral';
        }
    }
    prevImage() {
        if (this.listing && this.listing.attachmentUrls.length > 0) {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.listing.attachmentUrls.length) % this.listing.attachmentUrls.length;
        }
    }
    nextImage() {
        if (this.listing && this.listing.attachmentUrls.length > 0) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.listing.attachmentUrls.length;
        }
    }
    duplicate() {
        if (!this.listing)
            return;
        this.listingService.duplicate(this.listing.id).subscribe({
            next: (copy) => this.router.navigate(['/enterprise/annonces', copy.id]),
            error: (err) => this.error = err.error?.message || 'Erreur lors de la duplication'
        });
    }
    confirmCancel() {
        this.showCancelConfirm = true;
    }
    cancelListing() {
        if (!this.listing || !this.currentCompanyId)
            return;
        this.cancelLoading = true;
        this.listingService.cancel(this.listing.id, this.currentCompanyId).subscribe({
            next: () => {
                this.showCancelConfirm = false;
                this.cancelLoading = false;
                this.loadListing(this.listing.id);
            },
            error: (err) => {
                this.error = err.error?.message || 'Erreur lors de l\'annulation';
                this.cancelLoading = false;
                this.showCancelConfirm = false;
            }
        });
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
        return `Il y a ${days}j`;
    }
    static ɵfac = function ListingDetail_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingDetail)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.ResourceListingService), i0.ɵɵdirectiveInject(i3.FavoriteService), i0.ɵɵdirectiveInject(i4.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListingDetail, selectors: [["app-listing-detail"]], standalone: false, decls: 5, vars: 5, consts: [[1, "page-wrapper"], ["class", "ld-loading", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "ld-page", 4, "ngIf"], ["title", "Annuler cette annonce ?", "message", "Cette action est irr\u00E9versible. L'annonce sera marqu\u00E9e comme annul\u00E9e et ne sera plus visible.", "confirmLabel", "Oui, annuler", 3, "confirmed", "cancelled", "visible", "danger"], [1, "ld-loading"], [1, "spinner-lg"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/enterprise/annonces", 1, "btn", "btn-primary"], [1, "ld-page"], ["routerLink", "/enterprise/annonces", 1, "btn", "btn-ghost", "btn-sm", "ld-back"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "ld-grid"], [1, "ld-main"], ["class", "ld-gallery", 4, "ngIf"], [1, "ld-header"], [1, "ld-badges"], [1, "lc-type", 3, "ngClass"], [1, "badge", 3, "ngClass"], [1, "ld-title"], [1, "ld-meta"], [1, "ld-meta-item"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"], ["x1", "7", "y1", "7", "x2", "7.01", "y2", "7"], ["class", "ld-meta-item", 4, "ngIf"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], [1, "ld-section"], [1, "ld-desc"], [1, "ld-info-grid"], [1, "ld-info-card"], [1, "ld-info-label"], [1, "ld-info-value"], ["class", "ld-info-value", 4, "ngIf"], ["class", "ld-info-value ld-negotiable", 4, "ngIf"], [3, "listing", "group", 4, "ngIf"], [3, "listingId"], [1, "ld-sidebar"], ["class", "ld-actions-card", 4, "ngIf"], [1, "ld-fav-card"], [3, "listingId", "isFavorite", "count", "showCount"], ["class", "alert alert-danger", "style", "margin-top:12px", 4, "ngIf"], [1, "ld-gallery"], [1, "ld-gallery-main"], [3, "src", "alt"], ["class", "ld-gallery-nav ld-nav-prev", 3, "click", 4, "ngIf"], ["class", "ld-gallery-nav ld-nav-next", 3, "click", 4, "ngIf"], ["class", "ld-gallery-dots", 4, "ngIf"], [1, "ld-gallery-nav", "ld-nav-prev", 3, "click"], [1, "ld-gallery-nav", "ld-nav-next", 3, "click"], [1, "ld-gallery-dots"], ["class", "ld-dot", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "ld-dot", 3, "click"], ["d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"], ["cx", "12", "cy", "10", "r", "3"], [1, "ld-info-value", "ld-negotiable"], [3, "listing", "group"], [1, "ld-actions-card"], ["class", "btn btn-primary ld-action-btn", 3, "routerLink", 4, "ngIf"], [1, "btn", "btn-outline", "ld-action-btn", 3, "click"], ["x", "9", "y", "9", "width", "13", "height", "13", "rx", "2", "ry", "2"], ["d", "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"], ["class", "btn btn-danger ld-action-btn", 3, "click", 4, "ngIf"], [1, "btn", "btn-primary", "ld-action-btn", 3, "routerLink"], ["d", "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"], [1, "btn", "btn-danger", "ld-action-btn", 3, "click"], ["x1", "15", "y1", "9", "x2", "9", "y2", "15"], ["x1", "9", "y1", "9", "x2", "15", "y2", "15"], [1, "alert", "alert-danger", 2, "margin-top", "12px"]], template: function ListingDetail_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, ListingDetail_div_1_Template, 4, 0, "div", 1)(2, ListingDetail_div_2_Template, 7, 1, "div", 2)(3, ListingDetail_div_3_Template, 62, 25, "div", 3);
            i0.ɵɵelementStart(4, "app-confirm-dialog", 4);
            i0.ɵɵlistener("confirmed", function ListingDetail_Template_app_confirm_dialog_confirmed_4_listener() { return ctx.cancelListing(); })("cancelled", function ListingDetail_Template_app_confirm_dialog_cancelled_4_listener() { return ctx.showCancelConfirm = false; });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.error && !ctx.listing);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.listing && !ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("visible", ctx.showCancelConfirm)("danger", true);
        } }, dependencies: [i5.NgClass, i5.NgForOf, i5.NgIf, i1.RouterLink, i6.ConfirmDialog, i7.FavoriteButton, i8.CommentThread, i9.GroupPurchasePanel, i5.DecimalPipe], styles: [".ld-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:14px;padding:100px 24px;color:var(--text3)}\n.ld-page[_ngcontent-%COMP%]{max-width:1060px;margin:0 auto}\n.ld-back[_ngcontent-%COMP%]{margin-bottom:14px}\n.ld-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr 260px;gap:24px;align-items:start}\n.ld-main[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:20px}\n.ld-gallery[_ngcontent-%COMP%]{border-radius:16px;overflow:hidden;position:relative;background:var(--bg3,var(--bg2));box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-gallery-main[_ngcontent-%COMP%]{position:relative;aspect-ratio:16/9}\n.ld-gallery-main[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:cover}\n.ld-gallery-nav[_ngcontent-%COMP%]{position:absolute;top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.85);color:var(--text);border:none;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;backdrop-filter:blur(4px);box-shadow:0 2px 8px rgba(0,0,0,.1)}\n.ld-gallery-nav[_ngcontent-%COMP%]:hover{background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.15)}\n.ld-nav-prev[_ngcontent-%COMP%]{left:12px}\n.ld-nav-next[_ngcontent-%COMP%]{right:12px}\n.ld-gallery-dots[_ngcontent-%COMP%]{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;gap:6px}\n.ld-dot[_ngcontent-%COMP%]{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.45);cursor:pointer;transition:all .2s}\n.ld-dot.active[_ngcontent-%COMP%]{background:#fff;transform:scale(1.3);box-shadow:0 1px 4px rgba(0,0,0,.2)}\n.ld-header[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;padding:22px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-badges[_ngcontent-%COMP%]{display:flex;gap:8px;margin-bottom:12px}\n.ld-title[_ngcontent-%COMP%]{font-size:22px;font-weight:800;color:var(--text);letter-spacing:-.03em;margin-bottom:10px;line-height:1.3}\n.ld-meta[_ngcontent-%COMP%]{display:flex;gap:16px;flex-wrap:wrap}\n.ld-meta-item[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:var(--text3);font-weight:400}\n.ld-section[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;padding:22px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:14px;font-weight:700;color:var(--text);margin-bottom:10px;letter-spacing:-.01em}\n.ld-desc[_ngcontent-%COMP%]{font-size:14.5px;color:var(--text2);line-height:1.65;white-space:pre-wrap}\n.ld-info-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}\n.ld-info-card[_ngcontent-%COMP%]{background:var(--card);border-radius:14px;padding:16px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-info-label[_ngcontent-%COMP%]{display:block;font-size:11px;color:var(--text3);font-weight:500;margin-bottom:6px}\n.ld-info-value[_ngcontent-%COMP%]{font-size:17px;font-weight:800;color:var(--text);letter-spacing:-.02em}\n.ld-negotiable[_ngcontent-%COMP%]{font-size:13px;font-weight:500;color:var(--text3)!important}\n.ld-sidebar[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:14px;position:sticky;top:70px}\n.ld-actions-card[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:8px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-actions-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px}\n.ld-action-btn[_ngcontent-%COMP%]{width:100%;justify-content:center;display:flex;align-items:center;gap:6px;border-radius:10px}\n.ld-fav-card[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;padding:18px;display:flex;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.type-surplus[_ngcontent-%COMP%]{background:#ecfdf5;color:#047857;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px}\n.type-demande[_ngcontent-%COMP%]{background:rgba(57,62,70,.08);color:#393E46;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px}\n.type-group[_ngcontent-%COMP%]{background:rgba(0,173,181,.08);color:#009199;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px}\n.spinner-lg[_ngcontent-%COMP%]{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:_ngcontent-%COMP%_spin .7s linear infinite}\n@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}\n@media(max-width:800px){.ld-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.ld-sidebar[_ngcontent-%COMP%]{position:static;flex-direction:row;flex-wrap:wrap}.ld-actions-card[_ngcontent-%COMP%], .ld-fav-card[_ngcontent-%COMP%]{flex:1;min-width:180px}.ld-info-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:500px){.ld-info-grid[_ngcontent-%COMP%]{grid-template-columns:1fr 1fr}.ld-title[_ngcontent-%COMP%]{font-size:18px}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingDetail, [{
        type: Component,
        args: [{ selector: 'app-listing-detail', standalone: false, template: "<div class=\"page-wrapper\">\n  <!-- Loading -->\n  <div class=\"ld-loading\" *ngIf=\"loading\">\n    <div class=\"spinner-lg\"></div>\n    <p>Chargement de l'annonce...</p>\n  </div>\n\n  <!-- Error -->\n  <div class=\"empty-state\" *ngIf=\"!loading && error && !listing\">\n    <span class=\"empty-icon\">\u26A0\uFE0F</span>\n    <h3>{{error}}</h3>\n    <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces\">Retour aux annonces</a>\n  </div>\n\n  <div class=\"ld-page\" *ngIf=\"listing && !loading\">\n    <a routerLink=\"/enterprise/annonces\" class=\"btn btn-ghost btn-sm ld-back\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n      Retour\n    </a>\n\n    <div class=\"ld-grid\">\n      <!-- Left column: main content -->\n      <div class=\"ld-main\">\n        <!-- Image gallery -->\n        <div class=\"ld-gallery\" *ngIf=\"listing.attachmentUrls?.length\">\n          <div class=\"ld-gallery-main\">\n            <img [src]=\"listing.attachmentUrls[currentImageIndex]\" [alt]=\"listing.title\">\n            <button class=\"ld-gallery-nav ld-nav-prev\" *ngIf=\"listing.attachmentUrls.length > 1\" (click)=\"prevImage()\">\u2039</button>\n            <button class=\"ld-gallery-nav ld-nav-next\" *ngIf=\"listing.attachmentUrls.length > 1\" (click)=\"nextImage()\">\u203A</button>\n            <div class=\"ld-gallery-dots\" *ngIf=\"listing.attachmentUrls.length > 1\">\n              <span *ngFor=\"let url of listing.attachmentUrls; let i = index\"\n                    class=\"ld-dot\" [class.active]=\"i === currentImageIndex\" (click)=\"currentImageIndex = i\"></span>\n            </div>\n          </div>\n        </div>\n\n        <!-- Header -->\n        <div class=\"ld-header\">\n          <div class=\"ld-badges\">\n            <span class=\"lc-type\" [ngClass]=\"typeClass\">{{typeLabel}}</span>\n            <span class=\"badge\" [ngClass]=\"statusBadge\">{{listing.status}}</span>\n          </div>\n          <h1 class=\"ld-title\">{{listing.title}}</h1>\n          <div class=\"ld-meta\">\n            <span class=\"ld-meta-item\">\n              <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z\"/><line x1=\"7\" y1=\"7\" x2=\"7.01\" y2=\"7\"/></svg>\n              {{listing.productName}} ({{listing.productCategory}})\n            </span>\n            <span class=\"ld-meta-item\" *ngIf=\"listing.location\">\n              <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>\n              {{listing.location}}\n            </span>\n            <span class=\"ld-meta-item\">\n              <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>\n              {{timeAgo(listing.createdAt)}}\n            </span>\n          </div>\n        </div>\n\n        <!-- Description -->\n        <div class=\"ld-section\">\n          <h3>Description</h3>\n          <p class=\"ld-desc\">{{listing.description}}</p>\n        </div>\n\n        <!-- Info cards -->\n        <div class=\"ld-info-grid\">\n          <div class=\"ld-info-card\">\n            <span class=\"ld-info-label\">Quantit\u00E9</span>\n            <span class=\"ld-info-value\">{{listing.quantity}} {{listing.unit}}</span>\n          </div>\n          <div class=\"ld-info-card\">\n            <span class=\"ld-info-label\">Prix</span>\n            <span class=\"ld-info-value\" *ngIf=\"listing.price !== null\">{{listing.price | number:'1.0-2'}} TND</span>\n            <span class=\"ld-info-value ld-negotiable\" *ngIf=\"listing.price === null\">N\u00E9gociable</span>\n          </div>\n          <div class=\"ld-info-card\">\n            <span class=\"ld-info-label\">Favoris</span>\n            <span class=\"ld-info-value\">\u2764 {{listing.favoriteCount}}</span>\n          </div>\n          <div class=\"ld-info-card\">\n            <span class=\"ld-info-label\">Commentaires</span>\n            <span class=\"ld-info-value\">\uD83D\uDCAC {{listing.commentCount}}</span>\n          </div>\n        </div>\n\n        <!-- Group Purchase Panel -->\n        <app-group-purchase-panel\n          *ngIf=\"listing.type === 'GROUP_BUYING' && listing.groupPurchase\"\n          [listing]=\"listing\"\n          [group]=\"listing.groupPurchase\">\n        </app-group-purchase-panel>\n\n        <!-- Comments -->\n        <app-comment-thread [listingId]=\"listing.id\"></app-comment-thread>\n      </div>\n\n      <!-- Right sidebar -->\n      <div class=\"ld-sidebar\">\n        <!-- Owner actions -->\n        <div class=\"ld-actions-card\" *ngIf=\"isOwner\">\n          <h4>Actions</h4>\n          <a class=\"btn btn-primary ld-action-btn\" *ngIf=\"canEdit\" [routerLink]=\"['/enterprise/annonces', listing.id, 'edit']\">\n            <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7\"/><path d=\"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z\"/></svg>\n            Modifier\n          </a>\n          <button class=\"btn btn-outline ld-action-btn\" (click)=\"duplicate()\">\n            <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"/><path d=\"M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1\"/></svg>\n            Dupliquer\n          </button>\n          <button class=\"btn btn-danger ld-action-btn\" *ngIf=\"canCancel\" (click)=\"confirmCancel()\">\n            <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"/><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"/></svg>\n            Annuler l'annonce\n          </button>\n        </div>\n\n        <!-- Favorite -->\n        <div class=\"ld-fav-card\">\n          <app-favorite-button\n            [listingId]=\"listing.id\"\n            [isFavorite]=\"isFavorite\"\n            [count]=\"listing.favoriteCount\"\n            [showCount]=\"true\">\n          </app-favorite-button>\n        </div>\n\n        <!-- Error display -->\n        <div class=\"alert alert-danger\" *ngIf=\"error\" style=\"margin-top:12px\">{{error}}</div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Cancel confirmation -->\n  <app-confirm-dialog\n    [visible]=\"showCancelConfirm\"\n    title=\"Annuler cette annonce ?\"\n    message=\"Cette action est irr\u00E9versible. L'annonce sera marqu\u00E9e comme annul\u00E9e et ne sera plus visible.\"\n    confirmLabel=\"Oui, annuler\"\n    [danger]=\"true\"\n    (confirmed)=\"cancelListing()\"\n    (cancelled)=\"showCancelConfirm = false\">\n  </app-confirm-dialog>\n</div>\n", styles: [".ld-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:100px 24px;color:var(--text3)}\n.ld-page{max-width:1060px;margin:0 auto}\n.ld-back{margin-bottom:14px}\n.ld-grid{display:grid;grid-template-columns:1fr 260px;gap:24px;align-items:start}\n.ld-main{display:flex;flex-direction:column;gap:20px}\n.ld-gallery{border-radius:16px;overflow:hidden;position:relative;background:var(--bg3,var(--bg2));box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-gallery-main{position:relative;aspect-ratio:16/9}\n.ld-gallery-main img{width:100%;height:100%;object-fit:cover}\n.ld-gallery-nav{position:absolute;top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.85);color:var(--text);border:none;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;backdrop-filter:blur(4px);box-shadow:0 2px 8px rgba(0,0,0,.1)}\n.ld-gallery-nav:hover{background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.15)}\n.ld-nav-prev{left:12px}\n.ld-nav-next{right:12px}\n.ld-gallery-dots{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);display:flex;gap:6px}\n.ld-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.45);cursor:pointer;transition:all .2s}\n.ld-dot.active{background:#fff;transform:scale(1.3);box-shadow:0 1px 4px rgba(0,0,0,.2)}\n.ld-header{background:var(--card);border-radius:16px;padding:22px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-badges{display:flex;gap:8px;margin-bottom:12px}\n.ld-title{font-size:22px;font-weight:800;color:var(--text);letter-spacing:-.03em;margin-bottom:10px;line-height:1.3}\n.ld-meta{display:flex;gap:16px;flex-wrap:wrap}\n.ld-meta-item{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:var(--text3);font-weight:400}\n.ld-section{background:var(--card);border-radius:16px;padding:22px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-section h3{font-size:14px;font-weight:700;color:var(--text);margin-bottom:10px;letter-spacing:-.01em}\n.ld-desc{font-size:14.5px;color:var(--text2);line-height:1.65;white-space:pre-wrap}\n.ld-info-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}\n.ld-info-card{background:var(--card);border-radius:14px;padding:16px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-info-label{display:block;font-size:11px;color:var(--text3);font-weight:500;margin-bottom:6px}\n.ld-info-value{font-size:17px;font-weight:800;color:var(--text);letter-spacing:-.02em}\n.ld-negotiable{font-size:13px;font-weight:500;color:var(--text3)!important}\n.ld-sidebar{display:flex;flex-direction:column;gap:14px;position:sticky;top:70px}\n.ld-actions-card{background:var(--card);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:8px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ld-actions-card h4{font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px}\n.ld-action-btn{width:100%;justify-content:center;display:flex;align-items:center;gap:6px;border-radius:10px}\n.ld-fav-card{background:var(--card);border-radius:16px;padding:18px;display:flex;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.type-surplus{background:#ecfdf5;color:#047857;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px}\n.type-demande{background:rgba(57,62,70,.08);color:#393E46;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px}\n.type-group{background:rgba(0,173,181,.08);color:#009199;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px}\n.spinner-lg{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite}\n@keyframes spin{to{transform:rotate(360deg)}}\n@media(max-width:800px){.ld-grid{grid-template-columns:1fr}.ld-sidebar{position:static;flex-direction:row;flex-wrap:wrap}.ld-actions-card,.ld-fav-card{flex:1;min-width:180px}.ld-info-grid{grid-template-columns:repeat(2,1fr)}}\n@media(max-width:500px){.ld-info-grid{grid-template-columns:1fr 1fr}.ld-title{font-size:18px}}\n"] }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.ResourceListingService }, { type: i3.FavoriteService }, { type: i4.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListingDetail, { className: "ListingDetail", filePath: "src/app/features/annonces/listing-detail/listing-detail.ts", lineNumber: 14 }); })();
