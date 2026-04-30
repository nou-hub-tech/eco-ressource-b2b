import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../services/product-annonces.service";
import * as i4 from "../../../../core/services/auth.service";
import * as i5 from "@angular/common";
const _c0 = a0 => ["/enterprise/annonces/products", a0];
function ProductEdit_a_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 8);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 9);
    i0.ɵɵelement(2, "line", 10)(3, "polyline", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Retour \u00E0 la liste ");
    i0.ɵɵelementEnd();
} }
function ProductEdit_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 9);
    i0.ɵɵelement(2, "line", 10)(3, "polyline", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Retour au d\u00E9tail ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c0, ctx_r0.productId));
} }
function ProductEdit_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelement(1, "div", 14);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement...");
    i0.ɵɵelementEnd()();
} }
function ProductEdit_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "span", 16);
    i0.ɵɵtext(2, "\u26A0\uFE0F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 17);
    i0.ɵɵtext(6, "Retour \u00E0 la liste");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.loadError);
} }
function ProductEdit_div_8_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1, "Le nom est obligatoire");
    i0.ɵɵelementEnd();
} }
function ProductEdit_div_8_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1, "Le nom doit contenir au moins 2 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ProductEdit_div_8_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1, "Le nom ne peut pas d\u00E9passer 255 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ProductEdit_div_8_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1, "La description ne peut pas d\u00E9passer 1000 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ProductEdit_div_8_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function ProductEdit_div_8_span_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enregistrer");
    i0.ɵɵelementEnd();
} }
function ProductEdit_div_8_span_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 45);
} }
function ProductEdit_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18)(1, "div", 19)(2, "label", 20);
    i0.ɵɵtext(3, "Nom du produit *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 21);
    i0.ɵɵtemplate(5, ProductEdit_div_8_div_5_Template, 2, 0, "div", 22)(6, ProductEdit_div_8_div_6_Template, 2, 0, "div", 22)(7, ProductEdit_div_8_div_7_Template, 2, 0, "div", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 23)(9, "div", 19)(10, "label", 24);
    i0.ɵɵtext(11, "Cat\u00E9gorie");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 19)(14, "label", 26);
    i0.ɵɵtext(15, "Type de mat\u00E9riau");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 19)(18, "label", 28);
    i0.ɵɵtext(19, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "textarea", 29);
    i0.ɵɵtemplate(21, ProductEdit_div_8_div_21_Template, 2, 0, "div", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 19)(23, "label", 30);
    i0.ɵɵtext(24, "URL de l'image");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 32)(27, "label", 33);
    i0.ɵɵelement(28, "input", 34)(29, "span", 35);
    i0.ɵɵelementStart(30, "span", 36);
    i0.ɵɵtext(31, "Produit recyclable");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(32, ProductEdit_div_8_div_32_Template, 2, 1, "div", 37);
    i0.ɵɵelementStart(33, "div", 38)(34, "a", 39);
    i0.ɵɵtext(35, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "button", 40);
    i0.ɵɵlistener("click", function ProductEdit_div_8_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵtemplate(37, ProductEdit_div_8_span_37_Template, 2, 0, "span", 41)(38, ProductEdit_div_8_span_38_Template, 1, 0, "span", 42);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("name").touched && ctx_r0.form.get("name").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("name").hasError("minlength"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("name").hasError("maxlength"));
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("description").hasError("maxlength"));
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", ctx_r0.error);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(10, _c0, ctx_r0.productId));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.form.invalid || ctx_r0.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.submitting);
} }
export class ProductEdit {
    fb;
    route;
    router;
    productService;
    authService;
    form;
    loading = true;
    submitting = false;
    loadError = '';
    error = '';
    companyId;
    productId;
    constructor(fb, route, router, productService, authService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.productService = productService;
        this.authService = authService;
    }
    ngOnInit() {
        const user = this.authService.currentUser;
        this.companyId = user ? parseInt(user.id, 10) : 0;
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
            category: [''],
            description: ['', [Validators.maxLength(1000)]],
            image: [''],
            materialType: [''],
            recyclable: [true]
        });
        this.productId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadProduct();
    }
    loadProduct() {
        this.loading = true;
        this.loadError = '';
        this.productService.getById(this.productId).subscribe({
            next: (p) => {
                this.form.patchValue({
                    name: p.name,
                    category: p.category ?? '',
                    description: p.description ?? '',
                    image: p.image ?? '',
                    materialType: p.materialType ?? '',
                    recyclable: p.recyclable
                });
                this.loading = false;
            },
            error: () => {
                this.loadError = 'Produit introuvable';
                this.loading = false;
            }
        });
    }
    submit() {
        if (this.form.invalid)
            return;
        this.submitting = true;
        this.error = '';
        const v = this.form.value;
        const req = {
            name: v.name.trim(),
            recyclable: !!v.recyclable,
            companyId: this.companyId
        };
        const cat = v.category?.trim();
        if (cat)
            req.category = cat;
        const desc = v.description?.trim();
        if (desc)
            req.description = desc;
        const img = v.image?.trim();
        if (img)
            req.image = img;
        const mat = v.materialType?.trim();
        if (mat)
            req.materialType = mat;
        this.productService.update(this.productId, req).subscribe({
            next: () => {
                this.submitting = false;
                this.router.navigate(['/enterprise/annonces/products']);
            },
            error: (err) => {
                this.error = err.error?.message || 'Erreur lors de la mise à jour du produit';
                this.submitting = false;
            }
        });
    }
    static ɵfac = function ProductEdit_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductEdit)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.ProductAnnoncesService), i0.ɵɵdirectiveInject(i4.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProductEdit, selectors: [["app-product-edit"]], standalone: false, decls: 9, vars: 5, consts: [[1, "page-wrapper"], [1, "pe-page"], ["routerLink", "/enterprise/annonces/products", "class", "btn btn-ghost btn-sm pe-back", 4, "ngIf"], ["class", "btn btn-ghost btn-sm pe-back", 3, "routerLink", 4, "ngIf"], [1, "pe-heading"], ["class", "pe-loading", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "pe-card card", 3, "formGroup", 4, "ngIf"], ["routerLink", "/enterprise/annonces/products", 1, "btn", "btn-ghost", "btn-sm", "pe-back"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "btn", "btn-ghost", "btn-sm", "pe-back", 3, "routerLink"], [1, "pe-loading"], [1, "spinner-lg"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/enterprise/annonces/products", 1, "btn", "btn-primary"], [1, "pe-card", "card", 3, "formGroup"], [1, "form-group"], ["for", "pe-name"], ["id", "pe-name", "type", "text", "formControlName", "name", "autocomplete", "off"], ["class", "form-error", 4, "ngIf"], [1, "form-row"], ["for", "pe-category"], ["id", "pe-category", "type", "text", "formControlName", "category"], ["for", "pe-material"], ["id", "pe-material", "type", "text", "formControlName", "materialType"], ["for", "pe-desc"], ["id", "pe-desc", "formControlName", "description", "rows", "4"], ["for", "pe-image"], ["id", "pe-image", "type", "url", "formControlName", "image"], [1, "pe-toggle-row"], [1, "pe-checkbox"], ["type", "checkbox", "formControlName", "recyclable"], [1, "pe-checkbox-ui"], [1, "pe-checkbox-label"], ["class", "alert alert-danger", 4, "ngIf"], [1, "pe-actions"], [1, "btn", "btn-outline", 3, "routerLink"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", "aria-hidden", "true", 4, "ngIf"], [1, "form-error"], [1, "alert", "alert-danger"], ["aria-hidden", "true", 1, "spinner-sm"]], template: function ProductEdit_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, ProductEdit_a_2_Template, 5, 0, "a", 2)(3, ProductEdit_a_3_Template, 5, 3, "a", 3);
            i0.ɵɵelementStart(4, "h1", 4);
            i0.ɵɵtext(5, "Modifier le produit");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, ProductEdit_div_6_Template, 4, 0, "div", 5)(7, ProductEdit_div_7_Template, 7, 1, "div", 6)(8, ProductEdit_div_8_Template, 39, 12, "div", 7);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.loadError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loadError);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.loadError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && !ctx.loadError);
        } }, dependencies: [i5.NgIf, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i2.RouterLink], styles: [".pe-page[_ngcontent-%COMP%]{max-width:620px;margin:0 auto}\n.pe-back[_ngcontent-%COMP%]{margin-bottom:16px}\n.pe-heading[_ngcontent-%COMP%]{font-size:24px;font-weight:800;color:var(--text);margin-bottom:24px;letter-spacing:-.04em}\n.pe-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3);font-size:14px}\n.spinner-lg[_ngcontent-%COMP%]{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:_ngcontent-%COMP%_pe-spin .7s linear infinite}\n@keyframes _ngcontent-%COMP%_pe-spin{to{transform:rotate(360deg)}}\n.pe-card[_ngcontent-%COMP%]{padding:28px;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pe-toggle-row[_ngcontent-%COMP%]{margin-bottom:20px;padding:16px 18px;background:var(--bg3,#f8fafc);border-radius:14px}\n.pe-checkbox[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:12px;cursor:pointer;font-size:14px;color:var(--text);font-weight:600}\n.pe-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;opacity:0;width:0;height:0}\n.pe-checkbox-ui[_ngcontent-%COMP%]{flex-shrink:0;width:22px;height:22px;border:2px solid var(--bg3,#e2e8f0);border-radius:7px;background:var(--card);margin-top:1px;transition:all .15s;position:relative}\n.pe-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible    + .pe-checkbox-ui[_ngcontent-%COMP%]{outline:2px solid var(--primary);outline-offset:2px}\n.pe-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .pe-checkbox-ui[_ngcontent-%COMP%]{background:var(--primary);border-color:var(--primary)}\n.pe-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .pe-checkbox-ui[_ngcontent-%COMP%]::after{content:'';position:absolute;left:6px;top:2px;width:6px;height:11px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}\n.pe-checkbox-label[_ngcontent-%COMP%]{line-height:1.4}\n.pe-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;margin-top:8px}\n.spinner-sm[_ngcontent-%COMP%]{width:18px;height:18px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:_ngcontent-%COMP%_pe-spin-sm .6s linear infinite;display:inline-block;vertical-align:middle}\n@keyframes _ngcontent-%COMP%_pe-spin-sm{to{transform:rotate(360deg)}}\n@media(max-width:600px){.pe-card[_ngcontent-%COMP%]{padding:20px}.pe-actions[_ngcontent-%COMP%]{flex-direction:column-reverse}.pe-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{width:100%;justify-content:center}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductEdit, [{
        type: Component,
        args: [{ selector: 'app-product-edit', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"pe-page\">\n    <a routerLink=\"/enterprise/annonces/products\" class=\"btn btn-ghost btn-sm pe-back\" *ngIf=\"loadError\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n      Retour \u00E0 la liste\n    </a>\n    <a [routerLink]=\"['/enterprise/annonces/products', productId]\" class=\"btn btn-ghost btn-sm pe-back\" *ngIf=\"!loadError\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n      Retour au d\u00E9tail\n    </a>\n\n    <h1 class=\"pe-heading\">Modifier le produit</h1>\n\n    <div class=\"pe-loading\" *ngIf=\"loading\">\n      <div class=\"spinner-lg\"></div>\n      <p>Chargement...</p>\n    </div>\n\n    <div class=\"empty-state\" *ngIf=\"!loading && loadError\">\n      <span class=\"empty-icon\">\u26A0\uFE0F</span>\n      <h3>{{ loadError }}</h3>\n      <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/products\">Retour \u00E0 la liste</a>\n    </div>\n\n    <div class=\"pe-card card\" *ngIf=\"!loading && !loadError\" [formGroup]=\"form\">\n      <div class=\"form-group\">\n        <label for=\"pe-name\">Nom du produit *</label>\n        <input id=\"pe-name\" type=\"text\" formControlName=\"name\" autocomplete=\"off\">\n        <div class=\"form-error\" *ngIf=\"form.get('name')!.touched && form.get('name')!.hasError('required')\">Le nom est obligatoire</div>\n        <div class=\"form-error\" *ngIf=\"form.get('name')!.hasError('minlength')\">Le nom doit contenir au moins 2 caract\u00E8res</div>\n        <div class=\"form-error\" *ngIf=\"form.get('name')!.hasError('maxlength')\">Le nom ne peut pas d\u00E9passer 255 caract\u00E8res</div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label for=\"pe-category\">Cat\u00E9gorie</label>\n          <input id=\"pe-category\" type=\"text\" formControlName=\"category\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"pe-material\">Type de mat\u00E9riau</label>\n          <input id=\"pe-material\" type=\"text\" formControlName=\"materialType\">\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"pe-desc\">Description</label>\n        <textarea id=\"pe-desc\" formControlName=\"description\" rows=\"4\"></textarea>\n        <div class=\"form-error\" *ngIf=\"form.get('description')!.hasError('maxlength')\">La description ne peut pas d\u00E9passer 1000 caract\u00E8res</div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"pe-image\">URL de l'image</label>\n        <input id=\"pe-image\" type=\"url\" formControlName=\"image\">\n      </div>\n\n      <div class=\"pe-toggle-row\">\n        <label class=\"pe-checkbox\">\n          <input type=\"checkbox\" formControlName=\"recyclable\">\n          <span class=\"pe-checkbox-ui\"></span>\n          <span class=\"pe-checkbox-label\">Produit recyclable</span>\n        </label>\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n\n      <div class=\"pe-actions\">\n        <a [routerLink]=\"['/enterprise/annonces/products', productId]\" class=\"btn btn-outline\">Annuler</a>\n        <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"form.invalid || submitting\" (click)=\"submit()\">\n          <span *ngIf=\"!submitting\">Enregistrer</span>\n          <span *ngIf=\"submitting\" class=\"spinner-sm\" aria-hidden=\"true\"></span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".pe-page{max-width:620px;margin:0 auto}\n.pe-back{margin-bottom:16px}\n.pe-heading{font-size:24px;font-weight:800;color:var(--text);margin-bottom:24px;letter-spacing:-.04em}\n.pe-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3);font-size:14px}\n.spinner-lg{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:pe-spin .7s linear infinite}\n@keyframes pe-spin{to{transform:rotate(360deg)}}\n.pe-card{padding:28px;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pe-toggle-row{margin-bottom:20px;padding:16px 18px;background:var(--bg3,#f8fafc);border-radius:14px}\n.pe-checkbox{display:flex;align-items:flex-start;gap:12px;cursor:pointer;font-size:14px;color:var(--text);font-weight:600}\n.pe-checkbox input{position:absolute;opacity:0;width:0;height:0}\n.pe-checkbox-ui{flex-shrink:0;width:22px;height:22px;border:2px solid var(--bg3,#e2e8f0);border-radius:7px;background:var(--card);margin-top:1px;transition:all .15s;position:relative}\n.pe-checkbox input:focus-visible + .pe-checkbox-ui{outline:2px solid var(--primary);outline-offset:2px}\n.pe-checkbox input:checked + .pe-checkbox-ui{background:var(--primary);border-color:var(--primary)}\n.pe-checkbox input:checked + .pe-checkbox-ui::after{content:'';position:absolute;left:6px;top:2px;width:6px;height:11px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}\n.pe-checkbox-label{line-height:1.4}\n.pe-actions{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;margin-top:8px}\n.spinner-sm{width:18px;height:18px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:pe-spin-sm .6s linear infinite;display:inline-block;vertical-align:middle}\n@keyframes pe-spin-sm{to{transform:rotate(360deg)}}\n@media(max-width:600px){.pe-card{padding:20px}.pe-actions{flex-direction:column-reverse}.pe-actions .btn{width:100%;justify-content:center}}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.ProductAnnoncesService }, { type: i4.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProductEdit, { className: "ProductEdit", filePath: "src/app/features/annonces/products/product-edit/product-edit.ts", lineNumber: 14 }); })();
