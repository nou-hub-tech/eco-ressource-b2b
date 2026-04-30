import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../services/stock-item.service";
import * as i4 from "../../services/product-annonces.service";
import * as i5 from "../../../../core/services/auth.service";
import * as i6 from "@angular/common";
function StockItemCreate_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "div", 10);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement des produits\u2026");
    i0.ɵɵelementEnd()();
} }
function StockItemCreate_div_10_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, " La quantit\u00E9 est obligatoire. ");
    i0.ɵɵelementEnd();
} }
function StockItemCreate_div_10_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, " La quantit\u00E9 doit \u00EAtre strictement positive. ");
    i0.ɵɵelementEnd();
} }
function StockItemCreate_div_10_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, " Le prix unitaire est obligatoire. ");
    i0.ɵɵelementEnd();
} }
function StockItemCreate_div_10_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, " Le prix unitaire ne peut pas \u00EAtre n\u00E9gatif. ");
    i0.ɵɵelementEnd();
} }
function StockItemCreate_div_10_option_20_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" (", p_r2.category, ")");
} }
function StockItemCreate_div_10_option_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 34);
    i0.ɵɵtext(1);
    i0.ɵɵtemplate(2, StockItemCreate_div_10_option_20_span_2_Template, 2, 1, "span", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", p_r2.idProduct);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", p_r2.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r2.category);
} }
function StockItemCreate_div_10_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, " Veuillez s\u00E9lectionner un produit. ");
    i0.ɵɵelementEnd();
} }
function StockItemCreate_div_10_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.error);
} }
function StockItemCreate_div_10_span_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Cr\u00E9er");
    i0.ɵɵelementEnd();
} }
function StockItemCreate_div_10_span_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 36);
} }
function StockItemCreate_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11)(1, "div", 12)(2, "div", 13)(3, "label");
    i0.ɵɵtext(4, "Quantit\u00E9 *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "input", 14);
    i0.ɵɵtemplate(6, StockItemCreate_div_10_div_6_Template, 2, 0, "div", 15)(7, StockItemCreate_div_10_div_7_Template, 2, 0, "div", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 13)(9, "label");
    i0.ɵɵtext(10, "Prix unitaire (TND) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 16);
    i0.ɵɵtemplate(12, StockItemCreate_div_10_div_12_Template, 2, 0, "div", 15)(13, StockItemCreate_div_10_div_13_Template, 2, 0, "div", 15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 13)(15, "label");
    i0.ɵɵtext(16, "Produit *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "select", 17)(18, "option", 18);
    i0.ɵɵtext(19, "\u2014 Choisir un produit \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, StockItemCreate_div_10_option_20_Template, 3, 3, "option", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, StockItemCreate_div_10_div_21_Template, 2, 0, "div", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 13)(23, "label");
    i0.ɵɵtext(24, "ID entreprise");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 12)(27, "div", 13)(28, "label");
    i0.ɵɵtext(29, "\u00C9tat / condition");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(30, "input", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "div", 13)(32, "label");
    i0.ɵɵtext(33, "Unit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "input", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 12)(36, "div", 13)(37, "label");
    i0.ɵɵtext(38, "Date d\u2019expiration");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(39, "input", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 13)(41, "label");
    i0.ɵɵtext(42, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(43, "input", 24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(44, "div", 13)(45, "label");
    i0.ɵɵtext(46, "Image (URL)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(47, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "div", 13)(49, "label");
    i0.ɵɵtext(50, "Emplacement");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(51, "input", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(52, StockItemCreate_div_10_div_52_Template, 2, 1, "div", 27);
    i0.ɵɵelementStart(53, "div", 28)(54, "a", 29);
    i0.ɵɵtext(55, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(56, "button", 30);
    i0.ɵɵlistener("click", function StockItemCreate_div_10_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submit()); });
    i0.ɵɵtemplate(57, StockItemCreate_div_10_span_57_Template, 2, 0, "span", 31)(58, StockItemCreate_div_10_span_58_Template, 1, 0, "span", 32);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r2.form);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("quantity").touched && ctx_r2.form.get("quantity").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("quantity").touched && ctx_r2.form.get("quantity").hasError("min"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("unitPrice").touched && ctx_r2.form.get("unitPrice").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("unitPrice").touched && ctx_r2.form.get("unitPrice").hasError("min"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.products);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("idProduct").touched && ctx_r2.form.get("idProduct").invalid);
    i0.ɵɵadvance(31);
    i0.ɵɵproperty("ngIf", ctx_r2.error);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r2.form.invalid || ctx_r2.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.submitting);
} }
export class StockItemCreate {
    fb;
    router;
    stockItemService;
    productService;
    authService;
    form;
    products = [];
    loadingProducts = true;
    submitting = false;
    error = '';
    constructor(fb, router, stockItemService, productService, authService) {
        this.fb = fb;
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
        this.productService.findAll().subscribe({
            next: (data) => {
                this.products = data;
                this.loadingProducts = false;
            },
            error: () => {
                this.loadingProducts = false;
                this.error = 'Impossible de charger la liste des produits.';
            }
        });
    }
    submit() {
        if (this.form.invalid)
            return;
        this.submitting = true;
        this.error = '';
        const v = this.form.value;
        const companyId = v.companyId !== null && v.companyId !== undefined && v.companyId !== ''
            ? Number(v.companyId)
            : undefined;
        this.stockItemService
            .create({
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
            next: (res) => {
                this.submitting = false;
                this.router.navigate(['/enterprise/annonces/stock', res.idStock]);
            },
            error: (err) => {
                this.submitting = false;
                this.error =
                    err.error?.message || 'Erreur lors de la création de l’article en stock.';
            }
        });
    }
    static ɵfac = function StockItemCreate_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StockItemCreate)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.StockItemService), i0.ɵɵdirectiveInject(i4.ProductAnnoncesService), i0.ɵɵdirectiveInject(i5.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StockItemCreate, selectors: [["app-stock-item-create"]], standalone: false, decls: 11, vars: 2, consts: [[1, "page-wrapper"], [1, "sic-page"], ["routerLink", "/enterprise/annonces/stock", 1, "btn", "btn-ghost", "btn-sm"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "sic-heading"], ["class", "sic-loading", 4, "ngIf"], ["class", "card sic-card", 3, "formGroup", 4, "ngIf"], [1, "sic-loading"], [1, "spinner-lg"], [1, "card", "sic-card", 3, "formGroup"], [1, "form-row"], [1, "form-group"], ["type", "number", "formControlName", "quantity", "min", "0.0001", "step", "any"], ["class", "form-error", 4, "ngIf"], ["type", "number", "formControlName", "unitPrice", "min", "0", "step", "0.01"], ["formControlName", "idProduct"], ["disabled", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["type", "number", "formControlName", "companyId", "min", "1", "placeholder", "Optionnel"], ["type", "text", "formControlName", "itemCondition"], ["type", "text", "formControlName", "unit", "placeholder", "kg, pi\u00E8ce\u2026"], ["type", "date", "formControlName", "expirationDate"], ["type", "text", "formControlName", "status"], ["type", "url", "formControlName", "image", "placeholder", "https://\u2026"], ["type", "text", "formControlName", "location"], ["class", "alert alert-danger", 4, "ngIf"], [1, "sic-actions"], ["routerLink", "/enterprise/annonces/stock", 1, "btn", "btn-outline"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", 4, "ngIf"], [1, "form-error"], [3, "ngValue"], [1, "alert", "alert-danger"], [1, "spinner-sm"]], template: function StockItemCreate_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(3, "svg", 3);
            i0.ɵɵelement(4, "line", 4)(5, "polyline", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(6, " Retour au stock ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "h1", 6);
            i0.ɵɵtext(8, "Nouvel article en stock");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, StockItemCreate_div_9_Template, 4, 0, "div", 7)(10, StockItemCreate_div_10_Template, 59, 12, "div", 8);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.loadingProducts);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loadingProducts);
        } }, dependencies: [i6.NgForOf, i6.NgIf, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, i2.RouterLink], styles: [".sic-page[_ngcontent-%COMP%] {\n  max-width: 720px;\n  margin: 0 auto;\n}\n\n.sic-heading[_ngcontent-%COMP%] {\n  font-family: 'Syne', sans-serif;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text);\n  margin: 12px 0 20px;\n  letter-spacing: -0.4px;\n}\n\n.sic-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.sic-card[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.sic-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--border);\n}\n\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sic-spin 0.7s linear infinite;\n}\n\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sic-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes _ngcontent-%COMP%_sic-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (max-width: 600px) {\n  .sic-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .sic-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .sic-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StockItemCreate, [{
        type: Component,
        args: [{ selector: 'app-stock-item-create', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"sic-page\">\n    <a routerLink=\"/enterprise/annonces/stock\" class=\"btn btn-ghost btn-sm\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n        <line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\" />\n        <polyline points=\"12 19 5 12 12 5\" />\n      </svg>\n      Retour au stock\n    </a>\n\n    <h1 class=\"sic-heading\">Nouvel article en stock</h1>\n\n    <div class=\"sic-loading\" *ngIf=\"loadingProducts\">\n      <div class=\"spinner-lg\"></div>\n      <p>Chargement des produits\u2026</p>\n    </div>\n\n    <div class=\"card sic-card\" *ngIf=\"!loadingProducts\" [formGroup]=\"form\">\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Quantit\u00E9 *</label>\n          <input type=\"number\" formControlName=\"quantity\" min=\"0.0001\" step=\"any\" />\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.hasError('required')\">\n            La quantit\u00E9 est obligatoire.\n          </div>\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.hasError('min')\">\n            La quantit\u00E9 doit \u00EAtre strictement positive.\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label>Prix unitaire (TND) *</label>\n          <input type=\"number\" formControlName=\"unitPrice\" min=\"0\" step=\"0.01\" />\n          <div class=\"form-error\" *ngIf=\"form.get('unitPrice')!.touched && form.get('unitPrice')!.hasError('required')\">\n            Le prix unitaire est obligatoire.\n          </div>\n          <div class=\"form-error\" *ngIf=\"form.get('unitPrice')!.touched && form.get('unitPrice')!.hasError('min')\">\n            Le prix unitaire ne peut pas \u00EAtre n\u00E9gatif.\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Produit *</label>\n        <select formControlName=\"idProduct\">\n          <option [ngValue]=\"null\" disabled>\u2014 Choisir un produit \u2014</option>\n          <option *ngFor=\"let p of products\" [ngValue]=\"p.idProduct\">\n            {{ p.name }}<span *ngIf=\"p.category\"> ({{ p.category }})</span>\n          </option>\n        </select>\n        <div class=\"form-error\" *ngIf=\"form.get('idProduct')!.touched && form.get('idProduct')!.invalid\">\n          Veuillez s\u00E9lectionner un produit.\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>ID entreprise</label>\n        <input type=\"number\" formControlName=\"companyId\" min=\"1\" placeholder=\"Optionnel\" />\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>\u00C9tat / condition</label>\n          <input type=\"text\" formControlName=\"itemCondition\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Unit\u00E9</label>\n          <input type=\"text\" formControlName=\"unit\" placeholder=\"kg, pi\u00E8ce\u2026\" />\n        </div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Date d\u2019expiration</label>\n          <input type=\"date\" formControlName=\"expirationDate\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Statut</label>\n          <input type=\"text\" formControlName=\"status\" />\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Image (URL)</label>\n        <input type=\"url\" formControlName=\"image\" placeholder=\"https://\u2026\" />\n      </div>\n\n      <div class=\"form-group\">\n        <label>Emplacement</label>\n        <input type=\"text\" formControlName=\"location\" />\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n\n      <div class=\"sic-actions\">\n        <a routerLink=\"/enterprise/annonces/stock\" class=\"btn btn-outline\">Annuler</a>\n        <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"form.invalid || submitting\" (click)=\"submit()\">\n          <span *ngIf=\"!submitting\">Cr\u00E9er</span>\n          <span *ngIf=\"submitting\" class=\"spinner-sm\"></span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".sic-page {\n  max-width: 720px;\n  margin: 0 auto;\n}\n\n.sic-heading {\n  font-family: 'Syne', sans-serif;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text);\n  margin: 12px 0 20px;\n  letter-spacing: -0.4px;\n}\n\n.sic-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.sic-card {\n  padding: 24px;\n}\n\n.sic-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--border);\n}\n\n.spinner-lg {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: sic-spin 0.7s linear infinite;\n}\n\n.spinner-sm {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: sic-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes sic-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (max-width: 600px) {\n  .sic-card {\n    padding: 16px;\n  }\n\n  .sic-actions {\n    flex-direction: column;\n  }\n\n  .sic-actions .btn {\n    width: 100%;\n    justify-content: center;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.StockItemService }, { type: i4.ProductAnnoncesService }, { type: i5.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StockItemCreate, { className: "StockItemCreate", filePath: "src/app/features/annonces/stock/stock-item-create/stock-item-create.ts", lineNumber: 15 }); })();
