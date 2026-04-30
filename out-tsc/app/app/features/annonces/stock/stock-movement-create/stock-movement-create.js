import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../services/stock-movement.service";
import * as i4 from "../../services/stock-item.service";
import * as i5 from "@angular/common";
function StockMovementCreate_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "div", 10);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement du stock\u2026");
    i0.ɵɵelementEnd()();
} }
function StockMovementCreate_div_10_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngValue", s_r2.idStock);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.stockOptionLabel(s_r2), " ");
} }
function StockMovementCreate_div_10_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, " Veuillez s\u00E9lectionner un article en stock. ");
    i0.ɵɵelementEnd();
} }
function StockMovementCreate_div_10_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, " La quantit\u00E9 est obligatoire. ");
    i0.ɵɵelementEnd();
} }
function StockMovementCreate_div_10_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, " La quantit\u00E9 doit \u00EAtre strictement positive. ");
    i0.ɵɵelementEnd();
} }
function StockMovementCreate_div_10_option_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const t_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", t_r4.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r4.label);
} }
function StockMovementCreate_div_10_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.error);
} }
function StockMovementCreate_div_10_span_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Cr\u00E9er");
    i0.ɵɵelementEnd();
} }
function StockMovementCreate_div_10_span_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 31);
} }
function StockMovementCreate_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11)(1, "div", 12)(2, "label");
    i0.ɵɵtext(3, "Article en stock *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 13)(5, "option", 14);
    i0.ɵɵtext(6, "\u2014 Choisir un article \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, StockMovementCreate_div_10_option_7_Template, 2, 2, "option", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, StockMovementCreate_div_10_div_8_Template, 2, 0, "div", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 17)(10, "div", 12)(11, "label");
    i0.ɵɵtext(12, "Quantit\u00E9 *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 18);
    i0.ɵɵtemplate(14, StockMovementCreate_div_10_div_14_Template, 2, 0, "div", 16)(15, StockMovementCreate_div_10_div_15_Template, 2, 0, "div", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 12)(17, "label");
    i0.ɵɵtext(18, "Type de mouvement *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "select", 19);
    i0.ɵɵtemplate(20, StockMovementCreate_div_10_option_20_Template, 2, 2, "option", 15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 17)(22, "div", 12)(23, "label");
    i0.ɵɵtext(24, "Date du mouvement");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 12)(27, "label");
    i0.ɵɵtext(28, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "input", 21);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(30, StockMovementCreate_div_10_div_30_Template, 2, 1, "div", 22);
    i0.ɵɵelementStart(31, "div", 23)(32, "a", 24);
    i0.ɵɵtext(33, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 25);
    i0.ɵɵlistener("click", function StockMovementCreate_div_10_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submit()); });
    i0.ɵɵtemplate(35, StockMovementCreate_div_10_span_35_Template, 2, 0, "span", 26)(36, StockMovementCreate_div_10_span_36_Template, 1, 0, "span", 27);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r2.form);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.stockItems);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("idStock").touched && ctx_r2.form.get("idStock").invalid);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("quantity").touched && ctx_r2.form.get("quantity").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("quantity").touched && ctx_r2.form.get("quantity").hasError("min"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r2.movementTypes);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", ctx_r2.error);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r2.form.invalid || ctx_r2.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.submitting);
} }
export class StockMovementCreate {
    fb;
    router;
    movementService;
    stockItemService;
    form;
    stockItems = [];
    loadingItems = true;
    submitting = false;
    error = '';
    movementTypes = [
        { value: 'IN', label: 'Entrée (IN)' },
        { value: 'OUT', label: 'Sortie (OUT)' },
        { value: 'UPDATE', label: 'Ajustement (UPDATE)' }
    ];
    constructor(fb, router, movementService, stockItemService) {
        this.fb = fb;
        this.router = router;
        this.movementService = movementService;
        this.stockItemService = stockItemService;
    }
    ngOnInit() {
        this.form = this.fb.group({
            quantity: [null, [Validators.required, Validators.min(0.0001)]],
            movementType: ['IN', Validators.required],
            description: [''],
            movementDate: [''],
            idStock: [null, Validators.required]
        });
        this.stockItemService.findAll().subscribe({
            next: (data) => {
                this.stockItems = data;
                this.loadingItems = false;
            },
            error: () => {
                this.loadingItems = false;
                this.error = 'Impossible de charger les articles en stock.';
            }
        });
    }
    stockOptionLabel(s) {
        return s.product?.name ? `${s.product.name} — #${s.idStock}` : `Stock #${s.idStock}`;
    }
    submit() {
        if (this.form.invalid)
            return;
        this.submitting = true;
        this.error = '';
        const v = this.form.value;
        this.movementService
            .create({
            quantity: Number(v.quantity),
            movementType: v.movementType,
            description: v.description?.trim() || undefined,
            movementDate: v.movementDate?.trim() || undefined,
            idStock: v.idStock
        })
            .subscribe({
            next: () => {
                this.submitting = false;
                this.router.navigate(['/enterprise/annonces/stock/movements']);
            },
            error: (err) => {
                this.submitting = false;
                this.error =
                    err.error?.message || 'Erreur lors de la création du mouvement.';
            }
        });
    }
    static ɵfac = function StockMovementCreate_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StockMovementCreate)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.StockMovementService), i0.ɵɵdirectiveInject(i4.StockItemService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StockMovementCreate, selectors: [["app-stock-movement-create"]], standalone: false, decls: 11, vars: 2, consts: [[1, "page-wrapper"], [1, "smc-page"], ["routerLink", "/enterprise/annonces/stock/movements", 1, "btn", "btn-ghost", "btn-sm"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "smc-heading"], ["class", "smc-loading", 4, "ngIf"], ["class", "card smc-card", 3, "formGroup", 4, "ngIf"], [1, "smc-loading"], [1, "spinner-lg"], [1, "card", "smc-card", 3, "formGroup"], [1, "form-group"], ["formControlName", "idStock"], ["disabled", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["class", "form-error", 4, "ngIf"], [1, "form-row"], ["type", "number", "formControlName", "quantity", "min", "0.0001", "step", "any"], ["formControlName", "movementType"], ["type", "datetime-local", "formControlName", "movementDate"], ["type", "text", "formControlName", "description"], ["class", "alert alert-danger", 4, "ngIf"], [1, "smc-actions"], ["routerLink", "/enterprise/annonces/stock/movements", 1, "btn", "btn-outline"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", 4, "ngIf"], [3, "ngValue"], [1, "form-error"], [1, "alert", "alert-danger"], [1, "spinner-sm"]], template: function StockMovementCreate_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(3, "svg", 3);
            i0.ɵɵelement(4, "line", 4)(5, "polyline", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(6, " Retour aux mouvements ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "h1", 6);
            i0.ɵɵtext(8, "Nouveau mouvement");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, StockMovementCreate_div_9_Template, 4, 0, "div", 7)(10, StockMovementCreate_div_10_Template, 37, 11, "div", 8);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.loadingItems);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loadingItems);
        } }, dependencies: [i5.NgForOf, i5.NgIf, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, i2.RouterLink], styles: [".smc-page[_ngcontent-%COMP%] {\n  max-width: 640px;\n  margin: 0 auto;\n}\n\n.smc-heading[_ngcontent-%COMP%] {\n  font-family: 'Syne', sans-serif;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text);\n  margin: 12px 0 20px;\n  letter-spacing: -0.4px;\n}\n\n.smc-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.smc-card[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.smc-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--border);\n}\n\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_smc-spin 0.7s linear infinite;\n}\n\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_smc-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes _ngcontent-%COMP%_smc-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (max-width: 600px) {\n  .smc-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .smc-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .smc-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StockMovementCreate, [{
        type: Component,
        args: [{ selector: 'app-stock-movement-create', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"smc-page\">\n    <a routerLink=\"/enterprise/annonces/stock/movements\" class=\"btn btn-ghost btn-sm\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n        <line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\" />\n        <polyline points=\"12 19 5 12 12 5\" />\n      </svg>\n      Retour aux mouvements\n    </a>\n\n    <h1 class=\"smc-heading\">Nouveau mouvement</h1>\n\n    <div class=\"smc-loading\" *ngIf=\"loadingItems\">\n      <div class=\"spinner-lg\"></div>\n      <p>Chargement du stock\u2026</p>\n    </div>\n\n    <div class=\"card smc-card\" *ngIf=\"!loadingItems\" [formGroup]=\"form\">\n      <div class=\"form-group\">\n        <label>Article en stock *</label>\n        <select formControlName=\"idStock\">\n          <option [ngValue]=\"null\" disabled>\u2014 Choisir un article \u2014</option>\n          <option *ngFor=\"let s of stockItems\" [ngValue]=\"s.idStock\">\n            {{ stockOptionLabel(s) }}\n          </option>\n        </select>\n        <div class=\"form-error\" *ngIf=\"form.get('idStock')!.touched && form.get('idStock')!.invalid\">\n          Veuillez s\u00E9lectionner un article en stock.\n        </div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Quantit\u00E9 *</label>\n          <input type=\"number\" formControlName=\"quantity\" min=\"0.0001\" step=\"any\" />\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.hasError('required')\">\n            La quantit\u00E9 est obligatoire.\n          </div>\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.hasError('min')\">\n            La quantit\u00E9 doit \u00EAtre strictement positive.\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label>Type de mouvement *</label>\n          <select formControlName=\"movementType\">\n            <option *ngFor=\"let t of movementTypes\" [ngValue]=\"t.value\">{{ t.label }}</option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Date du mouvement</label>\n          <input type=\"datetime-local\" formControlName=\"movementDate\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Description</label>\n          <input type=\"text\" formControlName=\"description\" />\n        </div>\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n\n      <div class=\"smc-actions\">\n        <a routerLink=\"/enterprise/annonces/stock/movements\" class=\"btn btn-outline\">Annuler</a>\n        <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"form.invalid || submitting\" (click)=\"submit()\">\n          <span *ngIf=\"!submitting\">Cr\u00E9er</span>\n          <span *ngIf=\"submitting\" class=\"spinner-sm\"></span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".smc-page {\n  max-width: 640px;\n  margin: 0 auto;\n}\n\n.smc-heading {\n  font-family: 'Syne', sans-serif;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text);\n  margin: 12px 0 20px;\n  letter-spacing: -0.4px;\n}\n\n.smc-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.smc-card {\n  padding: 24px;\n}\n\n.smc-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--border);\n}\n\n.spinner-lg {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: smc-spin 0.7s linear infinite;\n}\n\n.spinner-sm {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: smc-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes smc-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (max-width: 600px) {\n  .smc-card {\n    padding: 16px;\n  }\n\n  .smc-actions {\n    flex-direction: column;\n  }\n\n  .smc-actions .btn {\n    width: 100%;\n    justify-content: center;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.StockMovementService }, { type: i4.StockItemService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StockMovementCreate, { className: "StockMovementCreate", filePath: "src/app/features/annonces/stock/stock-movement-create/stock-movement-create.ts", lineNumber: 14 }); })();
