import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../services/stock-movement.service";
import * as i4 from "../../services/stock-item.service";
import * as i5 from "@angular/common";
function StockMovementEdit_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelement(1, "div", 11);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement\u2026");
    i0.ɵɵelementEnd()();
} }
function StockMovementEdit_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "span", 13);
    i0.ɵɵtext(2, "\u26A0\uFE0F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 14);
    i0.ɵɵtext(6, " Retour \u00E0 la liste ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function StockMovementEdit_div_11_option_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngValue", s_r3.idStock);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.stockOptionLabel(s_r3), " ");
} }
function StockMovementEdit_div_11_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, " Veuillez s\u00E9lectionner un article en stock. ");
    i0.ɵɵelementEnd();
} }
function StockMovementEdit_div_11_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, " La quantit\u00E9 est obligatoire. ");
    i0.ɵɵelementEnd();
} }
function StockMovementEdit_div_11_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, " La quantit\u00E9 doit \u00EAtre strictement positive. ");
    i0.ɵɵelementEnd();
} }
function StockMovementEdit_div_11_option_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const t_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", t_r4.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r4.label);
} }
function StockMovementEdit_div_11_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function StockMovementEdit_div_11_span_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enregistrer");
    i0.ɵɵelementEnd();
} }
function StockMovementEdit_div_11_span_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 35);
} }
function StockMovementEdit_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "div", 16)(2, "label");
    i0.ɵɵtext(3, "Article en stock *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "select", 17)(5, "option", 18);
    i0.ɵɵtext(6, "\u2014 Choisir un article \u2014");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, StockMovementEdit_div_11_option_7_Template, 2, 2, "option", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, StockMovementEdit_div_11_div_8_Template, 2, 0, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 21)(10, "div", 16)(11, "label");
    i0.ɵɵtext(12, "Quantit\u00E9 *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 22);
    i0.ɵɵtemplate(14, StockMovementEdit_div_11_div_14_Template, 2, 0, "div", 20)(15, StockMovementEdit_div_11_div_15_Template, 2, 0, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 16)(17, "label");
    i0.ɵɵtext(18, "Type de mouvement *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "select", 23);
    i0.ɵɵtemplate(20, StockMovementEdit_div_11_option_20_Template, 2, 2, "option", 19);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 21)(22, "div", 16)(23, "label");
    i0.ɵɵtext(24, "Date du mouvement");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 16)(27, "label");
    i0.ɵɵtext(28, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "input", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(30, StockMovementEdit_div_11_div_30_Template, 2, 1, "div", 26);
    i0.ɵɵelementStart(31, "div", 27)(32, "a", 28);
    i0.ɵɵtext(33, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 29);
    i0.ɵɵlistener("click", function StockMovementEdit_div_11_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵtemplate(35, StockMovementEdit_div_11_span_35_Template, 2, 0, "span", 30)(36, StockMovementEdit_div_11_span_36_Template, 1, 0, "span", 31);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.stockItems);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("idStock").touched && ctx_r0.form.get("idStock").invalid);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("quantity").touched && ctx_r0.form.get("quantity").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("quantity").touched && ctx_r0.form.get("quantity").hasError("min"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r0.movementTypes);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", ctx_r0.error && ctx_r0.movement);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r0.form.invalid || ctx_r0.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.submitting);
} }
export class StockMovementEdit {
    fb;
    route;
    router;
    movementService;
    stockItemService;
    form;
    movement = null;
    stockItems = [];
    loading = true;
    submitting = false;
    error = '';
    movementTypes = [
        { value: 'IN', label: 'Entrée (IN)' },
        { value: 'OUT', label: 'Sortie (OUT)' },
        { value: 'UPDATE', label: 'Ajustement (UPDATE)' }
    ];
    constructor(fb, route, router, movementService, stockItemService) {
        this.fb = fb;
        this.route = route;
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
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (Number.isNaN(id)) {
            this.error = 'Identifiant invalide.';
            this.loading = false;
            return;
        }
        this.stockItemService.findAll().subscribe({ next: (items) => (this.stockItems = items) });
        this.movementService.getById(id).subscribe({
            next: (data) => {
                this.movement = data;
                const md = data.movementDate
                    ? this.toDatetimeLocalValue(data.movementDate)
                    : '';
                this.form.patchValue({
                    quantity: data.quantity,
                    movementType: data.movementType || 'IN',
                    description: data.description ?? '',
                    movementDate: md,
                    idStock: data.stockItem?.idStock ?? null
                });
                this.loading = false;
            },
            error: () => {
                this.error = 'Mouvement introuvable.';
                this.loading = false;
            }
        });
    }
    /** Convert API date string to `datetime-local` value (local). */
    toDatetimeLocalValue(isoOrDate) {
        const d = new Date(isoOrDate);
        if (Number.isNaN(d.getTime()))
            return isoOrDate.slice(0, 16);
        const pad = (n) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
    stockOptionLabel(s) {
        return s.product?.name ? `${s.product.name} — #${s.idStock}` : `Stock #${s.idStock}`;
    }
    submit() {
        if (this.form.invalid || !this.movement)
            return;
        this.submitting = true;
        this.error = '';
        const v = this.form.value;
        this.movementService
            .update(this.movement.id, {
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
                    err.error?.message || 'Erreur lors de la mise à jour du mouvement.';
            }
        });
    }
    static ɵfac = function StockMovementEdit_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StockMovementEdit)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.StockMovementService), i0.ɵɵdirectiveInject(i4.StockItemService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StockMovementEdit, selectors: [["app-stock-movement-edit"]], standalone: false, decls: 12, vars: 3, consts: [[1, "page-wrapper"], [1, "sme-page"], ["routerLink", "/enterprise/annonces/stock/movements", 1, "btn", "btn-ghost", "btn-sm"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "sme-heading"], ["class", "sme-loading", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "card sme-card", 3, "formGroup", 4, "ngIf"], [1, "sme-loading"], [1, "spinner-lg"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/enterprise/annonces/stock/movements", 1, "btn", "btn-primary", 2, "margin-top", "12px"], [1, "card", "sme-card", 3, "formGroup"], [1, "form-group"], ["formControlName", "idStock"], ["disabled", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["class", "form-error", 4, "ngIf"], [1, "form-row"], ["type", "number", "formControlName", "quantity", "min", "0.0001", "step", "any"], ["formControlName", "movementType"], ["type", "datetime-local", "formControlName", "movementDate"], ["type", "text", "formControlName", "description"], ["class", "alert alert-danger", 4, "ngIf"], [1, "sme-actions"], ["routerLink", "/enterprise/annonces/stock/movements", 1, "btn", "btn-outline"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", 4, "ngIf"], [3, "ngValue"], [1, "form-error"], [1, "alert", "alert-danger"], [1, "spinner-sm"]], template: function StockMovementEdit_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(3, "svg", 3);
            i0.ɵɵelement(4, "line", 4)(5, "polyline", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(6, " Retour aux mouvements ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "h1", 6);
            i0.ɵɵtext(8, "Modifier le mouvement");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, StockMovementEdit_div_9_Template, 4, 0, "div", 7)(10, StockMovementEdit_div_10_Template, 7, 1, "div", 8)(11, StockMovementEdit_div_11_Template, 37, 11, "div", 9);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.error && !ctx.movement);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.movement);
        } }, dependencies: [i5.NgForOf, i5.NgIf, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, i2.RouterLink], styles: [".sme-page[_ngcontent-%COMP%] {\n  max-width: 640px;\n  margin: 0 auto;\n}\n\n.sme-heading[_ngcontent-%COMP%] {\n  font-family: 'Syne', sans-serif;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text);\n  margin: 12px 0 20px;\n  letter-spacing: -0.4px;\n}\n\n.sme-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.sme-card[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.sme-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--border);\n}\n\n.spinner-lg[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sme-spin 0.7s linear infinite;\n}\n\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_sme-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes _ngcontent-%COMP%_sme-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (max-width: 600px) {\n  .sme-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .sme-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .sme-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StockMovementEdit, [{
        type: Component,
        args: [{ selector: 'app-stock-movement-edit', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"sme-page\">\n    <a routerLink=\"/enterprise/annonces/stock/movements\" class=\"btn btn-ghost btn-sm\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n        <line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\" />\n        <polyline points=\"12 19 5 12 12 5\" />\n      </svg>\n      Retour aux mouvements\n    </a>\n\n    <h1 class=\"sme-heading\">Modifier le mouvement</h1>\n\n    <div class=\"sme-loading\" *ngIf=\"loading\">\n      <div class=\"spinner-lg\"></div>\n      <p>Chargement\u2026</p>\n    </div>\n\n    <div class=\"empty-state\" *ngIf=\"!loading && error && !movement\">\n      <span class=\"empty-icon\">\u26A0\uFE0F</span>\n      <h3>{{ error }}</h3>\n      <a routerLink=\"/enterprise/annonces/stock/movements\" class=\"btn btn-primary\" style=\"margin-top:12px\">\n        Retour \u00E0 la liste\n      </a>\n    </div>\n\n    <div class=\"card sme-card\" *ngIf=\"!loading && movement\" [formGroup]=\"form\">\n      <div class=\"form-group\">\n        <label>Article en stock *</label>\n        <select formControlName=\"idStock\">\n          <option [ngValue]=\"null\" disabled>\u2014 Choisir un article \u2014</option>\n          <option *ngFor=\"let s of stockItems\" [ngValue]=\"s.idStock\">\n            {{ stockOptionLabel(s) }}\n          </option>\n        </select>\n        <div class=\"form-error\" *ngIf=\"form.get('idStock')!.touched && form.get('idStock')!.invalid\">\n          Veuillez s\u00E9lectionner un article en stock.\n        </div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Quantit\u00E9 *</label>\n          <input type=\"number\" formControlName=\"quantity\" min=\"0.0001\" step=\"any\" />\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.hasError('required')\">\n            La quantit\u00E9 est obligatoire.\n          </div>\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.hasError('min')\">\n            La quantit\u00E9 doit \u00EAtre strictement positive.\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label>Type de mouvement *</label>\n          <select formControlName=\"movementType\">\n            <option *ngFor=\"let t of movementTypes\" [ngValue]=\"t.value\">{{ t.label }}</option>\n          </select>\n        </div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Date du mouvement</label>\n          <input type=\"datetime-local\" formControlName=\"movementDate\" />\n        </div>\n        <div class=\"form-group\">\n          <label>Description</label>\n          <input type=\"text\" formControlName=\"description\" />\n        </div>\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error && movement\">{{ error }}</div>\n\n      <div class=\"sme-actions\">\n        <a routerLink=\"/enterprise/annonces/stock/movements\" class=\"btn btn-outline\">Annuler</a>\n        <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"form.invalid || submitting\" (click)=\"submit()\">\n          <span *ngIf=\"!submitting\">Enregistrer</span>\n          <span *ngIf=\"submitting\" class=\"spinner-sm\"></span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".sme-page {\n  max-width: 640px;\n  margin: 0 auto;\n}\n\n.sme-heading {\n  font-family: 'Syne', sans-serif;\n  font-size: 22px;\n  font-weight: 800;\n  color: var(--text);\n  margin: 12px 0 20px;\n  letter-spacing: -0.4px;\n}\n\n.sme-loading {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--text3);\n}\n\n.sme-card {\n  padding: 24px;\n}\n\n.sme-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--border);\n}\n\n.spinner-lg {\n  width: 36px;\n  height: 36px;\n  border: 3px solid var(--border2);\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: sme-spin 0.7s linear infinite;\n}\n\n.spinner-sm {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: #fff;\n  border-radius: 50%;\n  animation: sme-spin 0.6s linear infinite;\n  display: inline-block;\n}\n\n@keyframes sme-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (max-width: 600px) {\n  .sme-card {\n    padding: 16px;\n  }\n\n  .sme-actions {\n    flex-direction: column;\n  }\n\n  .sme-actions .btn {\n    width: 100%;\n    justify-content: center;\n  }\n}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.StockMovementService }, { type: i4.StockItemService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StockMovementEdit, { className: "StockMovementEdit", filePath: "src/app/features/annonces/stock/stock-movement-edit/stock-movement-edit.ts", lineNumber: 14 }); })();
