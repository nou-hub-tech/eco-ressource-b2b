import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/stock-item.service";
import * as i3 from "@angular/common";
import * as i4 from "../../components/confirm-dialog/confirm-dialog";
const _c0 = a0 => ["/enterprise/annonces/stock", a0, "edit"];
function StockItemDetail_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelement(1, "div", 11);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement\u2026");
    i0.ɵɵelementEnd()();
} }
function StockItemDetail_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "span", 13);
    i0.ɵɵtext(2, "\u26A0\uFE0F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 14);
    i0.ɵɵtext(6, "Retour au stock");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function StockItemDetail_ng_container_9_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.item.product == null ? null : ctx_r0.item.product.category);
} }
function StockItemDetail_ng_container_9_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵelement(1, "img", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r0.item.image, i0.ɵɵsanitizeUrl);
} }
function StockItemDetail_ng_container_9_div_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.deleteError);
} }
function StockItemDetail_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 15)(2, "div")(3, "h1", 16);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, StockItemDetail_ng_container_9_p_5_Template, 2, 1, "p", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 18)(7, "a", 19);
    i0.ɵɵtext(8, "Mouvements");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "a", 20);
    i0.ɵɵtext(10, " Modifier ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 21);
    i0.ɵɵlistener("click", function StockItemDetail_ng_container_9_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openDelete()); });
    i0.ɵɵtext(12, "Supprimer");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 22)(14, "div", 23);
    i0.ɵɵtemplate(15, StockItemDetail_ng_container_9_div_15_Template, 2, 1, "div", 24);
    i0.ɵɵelementStart(16, "div", 25)(17, "h3");
    i0.ɵɵtext(18, "Informations");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "dl", 26)(20, "div")(21, "dt");
    i0.ɵɵtext(22, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "dd");
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div")(27, "dt");
    i0.ɵɵtext(28, "Prix unitaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "dd");
    i0.ɵɵtext(30);
    i0.ɵɵpipe(31, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div")(33, "dt");
    i0.ɵɵtext(34, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "dd");
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "div")(38, "dt");
    i0.ɵɵtext(39, "ID entreprise");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "dd");
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(42, "div")(43, "dt");
    i0.ɵɵtext(44, "Condition");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "dd");
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div")(48, "dt");
    i0.ɵɵtext(49, "Expiration");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "dd");
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "div", 27)(53, "dt");
    i0.ɵɵtext(54, "Emplacement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "dd");
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵtemplate(57, StockItemDetail_ng_container_9_div_57_Template, 2, 1, "div", 28);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((ctx_r0.item.product == null ? null : ctx_r0.item.product.name) ?? "Article #" + ctx_r0.item.idStock);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.item.product == null ? null : ctx_r0.item.product.category);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(19, _c0, ctx_r0.item.idStock));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.item.image);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(25, 13, ctx_r0.item.quantity, "1.0-3"), " ", ctx_r0.item.unit || "");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(31, 16, ctx_r0.item.unitPrice, "1.2-2"), " TND");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.item.status || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.item.companyId ?? "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.item.itemCondition || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.item.expirationDate || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.item.location || "\u2014");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.deleteError);
} }
export class StockItemDetail {
    route;
    router;
    stockItemService;
    item = null;
    loading = true;
    error = '';
    showDeleteConfirm = false;
    deleteError = '';
    constructor(route, router, stockItemService) {
        this.route = route;
        this.router = router;
        this.stockItemService = stockItemService;
    }
    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (Number.isNaN(id)) {
            this.error = 'Identifiant invalide.';
            this.loading = false;
            return;
        }
        this.stockItemService.getById(id).subscribe({
            next: (data) => {
                this.item = data;
                this.loading = false;
            },
            error: () => {
                this.error = 'Article en stock introuvable.';
                this.loading = false;
            }
        });
    }
    openDelete() {
        this.deleteError = '';
        this.showDeleteConfirm = true;
    }
    cancelDelete() {
        this.showDeleteConfirm = false;
    }
    confirmDelete() {
        if (!this.item)
            return;
        this.stockItemService.delete(this.item.idStock).subscribe({
            next: () => {
                this.showDeleteConfirm = false;
                this.router.navigate(['/enterprise/annonces/stock']);
            },
            error: (err) => {
                this.deleteError =
                    err.error?.message || 'La suppression a échoué. Réessayez plus tard.';
                this.showDeleteConfirm = false;
            }
        });
    }
    static ɵfac = function StockItemDetail_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StockItemDetail)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.StockItemService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StockItemDetail, selectors: [["app-stock-item-detail"]], standalone: false, decls: 11, vars: 5, consts: [[1, "page-wrapper"], [1, "sid-page"], ["routerLink", "/enterprise/annonces/stock", 1, "btn", "btn-ghost", "btn-sm"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], ["class", "sid-loading", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [4, "ngIf"], ["title", "Supprimer cet article ?", "message", "Cette action est d\u00E9finitive.", "confirmLabel", "Supprimer", "cancelLabel", "Annuler", 3, "confirmed", "cancelled", "visible", "danger"], [1, "sid-loading"], [1, "spinner-lg"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/enterprise/annonces/stock", 1, "btn", "btn-primary", 2, "margin-top", "12px"], [1, "sid-head"], [1, "sid-title"], ["class", "sid-sub", 4, "ngIf"], [1, "sid-head-actions"], ["routerLink", "/enterprise/annonces/stock/movements", 1, "btn", "btn-outline"], [1, "btn", "btn-primary", 3, "routerLink"], ["type", "button", 1, "btn", "btn-danger", 3, "click"], [1, "sid-grid"], [1, "card", "sid-main"], ["class", "sid-image-wrap", 4, "ngIf"], [1, "sid-section"], [1, "sid-dl"], [1, "sid-span-2"], ["class", "alert alert-danger", 4, "ngIf"], [1, "sid-sub"], [1, "sid-image-wrap"], ["alt", "", 1, "sid-image", 3, "src"], [1, "alert", "alert-danger"]], template: function StockItemDetail_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(3, "svg", 3);
            i0.ɵɵelement(4, "line", 4)(5, "polyline", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(6, " Retour au stock ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, StockItemDetail_div_7_Template, 4, 0, "div", 6)(8, StockItemDetail_div_8_Template, 7, 1, "div", 7)(9, StockItemDetail_ng_container_9_Template, 58, 21, "ng-container", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(10, "app-confirm-dialog", 9);
            i0.ɵɵlistener("confirmed", function StockItemDetail_Template_app_confirm_dialog_confirmed_10_listener() { return ctx.confirmDelete(); })("cancelled", function StockItemDetail_Template_app_confirm_dialog_cancelled_10_listener() { return ctx.cancelDelete(); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.error && !ctx.item);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.item && !ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("visible", ctx.showDeleteConfirm)("danger", true);
        } }, dependencies: [i3.NgIf, i1.RouterLink, i4.ConfirmDialog, i3.DecimalPipe], styles: [".sid-page[_ngcontent-%COMP%] {\n  max-width: 960px;\n  margin: 0 auto;\n}\n\n.sid-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sid-spin 0.7s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_sid-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.sid-head[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.sid-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n  font-size: 26px;\n  font-weight: 800;\n  color: var(--text);\n  letter-spacing: -0.5px;\n}\n\n.sid-sub[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 14px;\n  color: var(--text3);\n}\n\n.sid-head-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.sid-grid[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.sid-main[_ngcontent-%COMP%] {\n  padding: 20px 22px;\n}\n\n.sid-image-wrap[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 1px solid var(--border);\n  background: var(--bg3, var(--bg2));\n}\n\n.sid-image[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 320px;\n  object-fit: cover;\n  display: block;\n}\n\n.sid-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 14px;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text);\n}\n\n.sid-dl[_ngcontent-%COMP%] {\n  margin: 0;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 14px 20px;\n}\n\n.sid-dl[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text3);\n  margin: 0 0 4px;\n}\n\n.sid-dl[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  color: var(--text);\n}\n\n.sid-span-2[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n\n@media (max-width: 600px) {\n  .sid-dl[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .sid-head-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .sid-head-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    flex: 1 1 auto;\n    justify-content: center;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StockItemDetail, [{
        type: Component,
        args: [{ selector: 'app-stock-item-detail', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"sid-page\">\n    <a routerLink=\"/enterprise/annonces/stock\" class=\"btn btn-ghost btn-sm\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n        <line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\" />\n        <polyline points=\"12 19 5 12 12 5\" />\n      </svg>\n      Retour au stock\n    </a>\n\n    <div class=\"sid-loading\" *ngIf=\"loading\">\n      <div class=\"spinner-lg\"></div>\n      <p>Chargement\u2026</p>\n    </div>\n\n    <div class=\"empty-state\" *ngIf=\"!loading && error && !item\">\n      <span class=\"empty-icon\">\u26A0\uFE0F</span>\n      <h3>{{ error }}</h3>\n      <a routerLink=\"/enterprise/annonces/stock\" class=\"btn btn-primary\" style=\"margin-top:12px\">Retour au stock</a>\n    </div>\n\n    <ng-container *ngIf=\"item && !loading\">\n      <div class=\"sid-head\">\n        <div>\n          <h1 class=\"sid-title\">{{ item.product?.name ?? 'Article #' + item.idStock }}</h1>\n          <p class=\"sid-sub\" *ngIf=\"item.product?.category\">{{ item.product?.category }}</p>\n        </div>\n        <div class=\"sid-head-actions\">\n          <a class=\"btn btn-outline\" routerLink=\"/enterprise/annonces/stock/movements\">Mouvements</a>\n          <a class=\"btn btn-primary\" [routerLink]=\"['/enterprise/annonces/stock', item.idStock, 'edit']\">\n            Modifier\n          </a>\n          <button type=\"button\" class=\"btn btn-danger\" (click)=\"openDelete()\">Supprimer</button>\n        </div>\n      </div>\n\n      <div class=\"sid-grid\">\n        <div class=\"card sid-main\">\n          <div class=\"sid-image-wrap\" *ngIf=\"item.image\">\n            <img [src]=\"item.image\" alt=\"\" class=\"sid-image\" />\n          </div>\n          <div class=\"sid-section\">\n            <h3>Informations</h3>\n            <dl class=\"sid-dl\">\n              <div>\n                <dt>Quantit\u00E9</dt>\n                <dd>{{ item.quantity | number : '1.0-3' }} {{ item.unit || '' }}</dd>\n              </div>\n              <div>\n                <dt>Prix unitaire</dt>\n                <dd>{{ item.unitPrice | number : '1.2-2' }} TND</dd>\n              </div>\n              <div>\n                <dt>Statut</dt>\n                <dd>{{ item.status || '\u2014' }}</dd>\n              </div>\n              <div>\n                <dt>ID entreprise</dt>\n                <dd>{{ item.companyId ?? '\u2014' }}</dd>\n              </div>\n              <div>\n                <dt>Condition</dt>\n                <dd>{{ item.itemCondition || '\u2014' }}</dd>\n              </div>\n              <div>\n                <dt>Expiration</dt>\n                <dd>{{ item.expirationDate || '\u2014' }}</dd>\n              </div>\n              <div class=\"sid-span-2\">\n                <dt>Emplacement</dt>\n                <dd>{{ item.location || '\u2014' }}</dd>\n              </div>\n            </dl>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"deleteError\">{{ deleteError }}</div>\n    </ng-container>\n  </div>\n\n  <app-confirm-dialog\n    [visible]=\"showDeleteConfirm\"\n    title=\"Supprimer cet article ?\"\n    message=\"Cette action est d\u00E9finitive.\"\n    confirmLabel=\"Supprimer\"\n    cancelLabel=\"Annuler\"\n    [danger]=\"true\"\n    (confirmed)=\"confirmDelete()\"\n    (cancelled)=\"cancelDelete()\">\n  </app-confirm-dialog>\n</div>\n", styles: [".sid-page {\n  max-width: 960px;\n  margin: 0 auto;\n}\n\n.sid-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.spinner-lg {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: sid-spin 0.7s linear infinite;\n}\n\n@keyframes sid-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.sid-head {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n\n.sid-title {\n  margin: 0;\n  font-family: 'Syne', sans-serif;\n  font-size: 26px;\n  font-weight: 800;\n  color: var(--text);\n  letter-spacing: -0.5px;\n}\n\n.sid-sub {\n  margin: 6px 0 0;\n  font-size: 14px;\n  color: var(--text3);\n}\n\n.sid-head-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.sid-grid {\n  display: block;\n}\n\n.sid-main {\n  padding: 20px 22px;\n}\n\n.sid-image-wrap {\n  margin-bottom: 20px;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 1px solid var(--border);\n  background: var(--bg3, var(--bg2));\n}\n\n.sid-image {\n  width: 100%;\n  max-height: 320px;\n  object-fit: cover;\n  display: block;\n}\n\n.sid-section h3 {\n  margin: 0 0 14px;\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text);\n}\n\n.sid-dl {\n  margin: 0;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 14px 20px;\n}\n\n.sid-dl dt {\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--text3);\n  margin: 0 0 4px;\n}\n\n.sid-dl dd {\n  margin: 0;\n  font-size: 15px;\n  color: var(--text);\n}\n\n.sid-span-2 {\n  grid-column: 1 / -1;\n}\n\n@media (max-width: 600px) {\n  .sid-dl {\n    grid-template-columns: 1fr;\n  }\n\n  .sid-head-actions {\n    width: 100%;\n  }\n\n  .sid-head-actions .btn {\n    flex: 1 1 auto;\n    justify-content: center;\n  }\n}\n"] }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.StockItemService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StockItemDetail, { className: "StockItemDetail", filePath: "src/app/features/annonces/stock/stock-item-detail/stock-item-detail.ts", lineNumber: 12 }); })();
