import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../services/stock-item.service";
import * as i4 from "../../services/product-annonces.service";
import * as i5 from "../../../../core/services/auth.service";
import * as i6 from "@angular/common";
const _c0 = a0 => ["/enterprise/annonces/stock", a0];
function StockItemEdit_a_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 7);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 8);
    i0.ɵɵelement(2, "line", 9)(3, "polyline", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Retour au d\u00E9tail ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c0, ctx_r0.item.idStock));
} }
function StockItemEdit_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 12);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement\u2026");
    i0.ɵɵelementEnd()();
} }
function StockItemEdit_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "span", 14);
    i0.ɵɵtext(2, "\u26A0\uFE0F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 15);
    i0.ɵɵtext(6, "Retour au stock");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function StockItemEdit_div_7_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtext(1, " La quantit\u00E9 est obligatoire. ");
    i0.ɵɵelementEnd();
} }
function StockItemEdit_div_7_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtext(1, " La quantit\u00E9 doit \u00EAtre strictement positive. ");
    i0.ɵɵelementEnd();
} }
function StockItemEdit_div_7_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtext(1, " Le prix unitaire est obligatoire. ");
    i0.ɵɵelementEnd();
} }
function StockItemEdit_div_7_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtext(1, " Le prix unitaire ne peut pas \u00EAtre n\u00E9gatif. ");
    i0.ɵɵelementEnd();
} }
function StockItemEdit_div_7_option_20_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" (", p_r3.category, ")");
} }
function StockItemEdit_div_7_option_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 39);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, StockItemEdit_div_7_option_20_span_2_Template, 2, 1, "span", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", p_r3.idProduct);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", p_r3.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r3.category);
} }
function StockItemEdit_div_7_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtext(1, " Veuillez s\u00E9lectionner un produit. ");
    i0.ɵɵelementEnd();
} }
function StockItemEdit_div_7_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function StockItemEdit_div_7_span_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enregistrer");
    i0.ɵɵelementEnd();
} }
function StockItemEdit_div_7_span_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 41);
} }
function StockItemEdit_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 16)(1, "div", 17)(2, "div", 18)(3, "label");
    i0.ɵɵtext(4, "Quantit\u00E9 *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "input", 19);
    i0.ɵɵtemplate(6, StockItemEdit_div_7_div_6_Template, 2, 0, "div", 20)(7, StockItemEdit_div_7_div_7_Template, 2, 0, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 18)(9, "label");
    i0.ɵɵtext(10, "Prix unitaire (TND) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 21);
    i0.ɵɵtemplate(12, StockItemEdit_div_7_div_12_Template, 2, 0, "div", 20)(13, StockItemEdit_div_7_div_13_Template, 2, 0, "div", 20);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 18)(15, "label");
    i0.ɵɵtext(16, "Produit *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "select", 22)(18, "option", 23);
    i0.ɵɵtext(19, "\u2014 Choisir un produit \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, StockItemEdit_div_7_option_20_Template, 3, 3, "option", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, StockItemEdit_div_7_div_21_Template, 2, 0, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 18)(23, "label");
    i0.ɵɵtext(24, "ID entreprise");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 17)(27, "div", 18)(28, "label");
    i0.ɵɵtext(29, "\u00C9tat / condition");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 18)(32, "label");
    i0.ɵɵtext(33, "Unit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "input", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 17)(36, "div", 18)(37, "label");
    i0.ɵɵtext(38, "Date d\u2019expiration");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(39, "input", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 18)(41, "label");
    i0.ɵɵtext(42, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(43, "input", 29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "div", 18)(45, "label");
    i0.ɵɵtext(46, "Image (URL)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(47, "input", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "div", 18)(49, "label");
    i0.ɵɵtext(50, "Emplacement");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(51, "input", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(52, StockItemEdit_div_7_div_52_Template, 2, 1, "div", 32);
    i0.ɵɵelementStart(53, "div", 33)(54, "a", 34);
    i0.ɵɵtext(55, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "button", 35);
    i0.ɵɵlistener("click", function StockItemEdit_div_7_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵtemplate(57, StockItemEdit_div_7_span_57_Template, 2, 0, "span", 36)(58, StockItemEdit_div_7_span_58_Template, 1, 0, "span", 37);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("quantity").touched && ctx_r0.form.get("quantity").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("quantity").touched && ctx_r0.form.get("quantity").hasError("min"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("unitPrice").touched && ctx_r0.form.get("unitPrice").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("unitPrice").touched && ctx_r0.form.get("unitPrice").hasError("min"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.products);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("idProduct").touched && ctx_r0.form.get("idProduct").invalid);
    i0.ɵɵadvance(31);
    i0.ɵɵproperty("ngIf", ctx_r0.error && ctx_r0.item);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(13, _c0, ctx_r0.item.idStock));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.form.invalid || ctx_r0.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.submitting);
} }
export class StockItemEdit {
    fb;
    route;
    router;
    stockItemService;
    productService;
    authService;
    form;
    item = null;
    products = [];
    loading = true;
    submitting = false;
    error = '';
    constructor(fb, route, router, stockItemService, productService, authService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.stockItemService = stockItemService;
        this.productService = productService;
        this.authService = authService;
    }
    ngOnInit() {
        const user = this.authService.currentUser;
        const defaultCompany = user ? parseInt(user.id, 10) : null;
        this.form = this.fb.group({
            quantity: [null, [Validators.required, Validators.min(0.0001)]],
            unitPrice: [null, [Validators.required, Validators.min(0)]],
            idProduct: [null, Validators.required],
            companyId: [defaultCompany],
            itemCondition: [''],
            expirationDate: [''],
            image: [''],
            location: [''],
            status: [''],
            unit: ['']
        });
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (Number.isNaN(id)) {
            this.error = 'Identifiant invalide.';
            this.loading = false;
            return;
        }
        this.productService.findAll().subscribe({ next: (p) => (this.products = p) });
        this.stockItemService.getById(id).subscribe({
            next: (data) => {
                this.item = data;
                const exp = data.expirationDate
                    ? data.expirationDate.slice(0, 10)
                    : '';
                this.form.patchValue({
                    quantity: data.quantity,
                    unitPrice: data.unitPrice,
                    idProduct: data.product?.idProduct ?? null,
                    companyId: data.companyId ?? defaultCompany,
                    itemCondition: data.itemCondition ?? '',
                    expirationDate: exp,
                    image: data.image ?? '',
                    location: data.location ?? '',
                    status: data.status ?? '',
                    unit: data.unit ?? ''
                });
                this.loading = false;
            },
            error: () => {
                this.error = 'Article en stock introuvable.';
                this.loading = false;
            }
        });
    }
    submit() {
        if (this.form.invalid || !this.item)
            return;
        this.submitting = true;
        this.error = '';
        const v = this.form.value;
        const companyId = v.companyId !== null && v.companyId !== undefined && v.companyId !== ''
            ? Number(v.companyId)
            : undefined;
        this.stockItemService
            .update(this.item.idStock, {
            quantity: Number(v.quantity),
            unitPrice: Number(v.unitPrice),
            idProduct: v.idProduct,
            companyId,
            itemCondition: v.itemCondition?.trim() || undefined,
            expirationDate: v.expirationDate?.trim() || undefined,
            image: v.image?.trim() || undefined,
            location: v.location?.trim() || undefined,
            status: v.status?.trim() || undefined,
            unit: v.unit?.trim() || undefined
        })
            .subscribe({
            next: () => {
                this.submitting = false;
                this.router.navigate(['/enterprise/annonces/stock', this.item.idStock]);
            },
            error: (err) => {
                this.submitting = false;
                this.error =
                    err.error?.message || 'Erreur lors de la mise à jour de l’article.';
            }
        });
    }
    static ɵfac = function StockItemEdit_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StockItemEdit)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.StockItemService), i0.ɵɵdirectiveInject(i4.ProductAnnoncesService), i0.ɵɵdirectiveInject(i5.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StockItemEdit, selectors: [["app-stock-item-edit"]], standalone: false, decls: 8, vars: 4, consts: [[1, "page-wrapper"], [1, "sie-page"], ["class", "btn btn-ghost btn-sm", 3, "routerLink", 4, "ngIf"], [1, "sie-heading"], ["class", "sie-loading", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "card sie-card", 3, "formGroup", 4, "ngIf"], [1, "btn", "btn-ghost", "btn-sm", 3, "routerLink"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "sie-loading"], [1, "spinner-lg"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/enterprise/annonces/stock", 1, "btn", "btn-primary", 2, "margin-top", "12px"], [1, "card", "sie-card", 3, "formGroup"], [1, "form-row"], [1, "form-group"], ["type", "number", "formControlName", "quantity", "min", "0.0001", "step", "any"], ["class", "form-error", 4, "ngIf"], ["type", "number", "formControlName", "unitPrice", "min", "0", "step", "0.01"], ["formControlName", "idProduct"], ["disabled", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["type", "number", "formControlName", "companyId", "min", "1", "placeholder", "Optionnel"], ["type", "text", "formControlName", "itemCondition"], ["type", "text", "formControlName", "unit"], ["type", "date", "formControlName", "expirationDate"], ["type", "text", "formControlName", "status"], ["type", "url", "formControlName", "image"], ["type", "text", "formControlName", "location"], ["class", "alert alert-danger", 4, "ngIf"], [1, "sie-actions"], [1, "btn", "btn-outline", 3, "routerLink"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", 4, "ngIf"], [1, "form-error"], [3, "ngValue"], [1, "alert", "alert-danger"], [1, "spinner-sm"]], template: function StockItemEdit_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, StockItemEdit_a_2_Template, 5, 3, "a", 2);
            i0.ɵɵelementStart(3, "h1", 3);
            i0.ɵɵtext(4, "Modifier l\u2019article en stock");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, StockItemEdit_div_5_Template, 4, 0, "div", 4)(6, StockItemEdit_div_6_Template, 7, 1, "div", 5)(7, StockItemEdit_div_7_Template, 59, 15, "div", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.item);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.error && !ctx.item);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.item);
        } }, dependencies: [i6.NgForOf, i6.NgIf, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, i2.RouterLink], styles: [".sie-page[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 auto;\n}\n\n.sie-heading[_ngcontent-%COMP%] {\n  font-family: 'Syne', sans-serif;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text);\n  margin: 12px 0 20px;\n  letter-spacing: -0.4px;\n}\n\n.sie-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.sie-card[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.sie-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--border);\n}\n\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sie-spin 0.7s linear infinite;\n}\n\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sie-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes _ngcontent-%COMP%_sie-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (max-width: 600px) {\n  .sie-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .sie-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .sie-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StockItemEdit, [{
        type: Component,
        args: [{ selector: 'app-stock-item-edit', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"sie-page\">\n    <a\n      *ngIf=\"item\"\n      [routerLink]=\"['/enterprise/annonces/stock', item.idStock]\"\n      class=\"btn btn-ghost btn-sm\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n        <line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\" />\n        <polyline points=\"12 19 5 12 12 5\" />\n      </svg>\n      Retour au d\u00E9tail\n    </a>\n\n    <h1 class=\"sie-heading\">Modifier l\u2019article en stock</h1>\n\n    <div class=\"sie-loading\" *ngIf=\"loading\">\n      <div class=\"spinner-lg\"></div>\n      <p>Chargement\u2026</p>\n    </div>\n\n    <div class=\"empty-state\" *ngIf=\"!loading && error && !item\">\n      <span class=\"empty-icon\">\u26A0\uFE0F</span>\n      <h3>{{ error }}</h3>\n      <a routerLink=\"/enterprise/annonces/stock\" class=\"btn btn-primary\" style=\"margin-top:12px\">Retour au stock</a>\n    </div>\n\n    <div class=\"card sie-card\" *ngIf=\"!loading && item\" [formGroup]=\"form\">\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Quantit\u00E9 *</label>\n          <input type=\"number\" formControlName=\"quantity\" min=\"0.0001\" step=\"any\" />\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.hasError('required')\">\n            La quantit\u00E9 est obligatoire.\n          </div>\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.hasError('min')\">\n            La quantit\u00E9 doit \u00EAtre strictement positive.\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label>Prix unitaire (TND) *</label>\n          <input type=\"number\" formControlName=\"unitPrice\" min=\"0\" step=\"0.01\" />\n          <div class=\"form-error\" *ngIf=\"form.get('unitPrice')!.touched && form.get('unitPrice')!.hasError('required')\">\n            Le prix unitaire est obligatoire.\n          </div>\n          <div class=\"form-error\" *ngIf=\"form.get('unitPrice')!.touched && form.get('unitPrice')!.hasError('min')\">\n            Le prix unitaire ne peut pas \u00EAtre n\u00E9gatif.\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Produit *</label>\n        <select formControlName=\"idProduct\">\n          <option [ngValue]=\"null\" disabled>\u2014 Choisir un produit \u2014</option>\n          <option *ngFor=\"let p of products\" [ngValue]=\"p.idProduct\">\n            {{ p.name }}<span *ngIf=\"p.category\"> ({{ p.category }})</span>\n          </option>\n        </select>\n        <div class=\"form-error\" *ngIf=\"form.get('idProduct')!.touched && form.get('idProduct')!.invalid\">\n          Veuillez s\u00E9lectionner un produit.\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>ID entreprise</label>\n        <input type=\"number\" formControlName=\"companyId\" min=\"1\" placeholder=\"Optionnel\" />\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>\u00C9tat / condition</label>\n          <input type=\"text\" formControlName=\"itemCondition\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Unit\u00E9</label>\n          <input type=\"text\" formControlName=\"unit\" />\n        </div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Date d\u2019expiration</label>\n          <input type=\"date\" formControlName=\"expirationDate\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Statut</label>\n          <input type=\"text\" formControlName=\"status\" />\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Image (URL)</label>\n        <input type=\"url\" formControlName=\"image\" />\n      </div>\n\n      <div class=\"form-group\">\n        <label>Emplacement</label>\n        <input type=\"text\" formControlName=\"location\" />\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error && item\">{{ error }}</div>\n\n      <div class=\"sie-actions\">\n        <a [routerLink]=\"['/enterprise/annonces/stock', item.idStock]\" class=\"btn btn-outline\">Annuler</a>\n        <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"form.invalid || submitting\" (click)=\"submit()\">\n          <span *ngIf=\"!submitting\">Enregistrer</span>\n          <span *ngIf=\"submitting\" class=\"spinner-sm\"></span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".sie-page {\n  max-width: 720px;\n  margin: 0 auto;\n}\n\n.sie-heading {\n  font-family: 'Syne', sans-serif;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text);\n  margin: 12px 0 20px;\n  letter-spacing: -0.4px;\n}\n\n.sie-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.sie-card {\n  padding: 24px;\n}\n\n.sie-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--border);\n}\n\n.spinner-lg {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: sie-spin 0.7s linear infinite;\n}\n\n.spinner-sm {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: sie-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes sie-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (max-width: 600px) {\n  .sie-card {\n    padding: 16px;\n  }\n\n  .sie-actions {\n    flex-direction: column;\n  }\n\n  .sie-actions .btn {\n    width: 100%;\n    justify-content: center;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.StockItemService }, { type: i4.ProductAnnoncesService }, { type: i5.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StockItemEdit, { className: "StockItemEdit", filePath: "src/app/features/annonces/stock/stock-item-edit/stock-item-edit.ts", lineNumber: 15 }); })();
