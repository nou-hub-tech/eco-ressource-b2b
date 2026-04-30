import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../services/product-annonces.service";
import * as i4 from "../../../../core/services/auth.service";
import * as i5 from "@angular/common";
function ProductCreate_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1, "Le nom est obligatoire");
    i0.ɵɵelementEnd();
} }
function ProductCreate_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1, "Le nom doit contenir au moins 2 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ProductCreate_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1, "Le nom ne peut pas d\u00E9passer 255 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ProductCreate_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1, "La description ne peut pas d\u00E9passer 1000 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ProductCreate_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function ProductCreate_span_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Cr\u00E9er le produit");
    i0.ɵɵelementEnd();
} }
function ProductCreate_span_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 36);
} }
export class ProductCreate {
    fb;
    router;
    productService;
    authService;
    form;
    submitting = false;
    error = '';
    companyId;
    constructor(fb, router, productService, authService) {
        this.fb = fb;
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
        this.productService.create(req).subscribe({
            next: () => {
                this.submitting = false;
                this.router.navigate(['/enterprise/annonces/products']);
            },
            error: (err) => {
                this.error = err.error?.message || 'Erreur lors de la création du produit';
                this.submitting = false;
            }
        });
    }
    static ɵfac = function ProductCreate_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductCreate)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.ProductAnnoncesService), i0.ɵɵdirectiveInject(i4.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProductCreate, selectors: [["app-product-create"]], standalone: false, decls: 52, vars: 9, consts: [[1, "page-wrapper"], [1, "pc-page"], ["routerLink", "/enterprise/annonces/products", 1, "btn", "btn-ghost", "btn-sm", "pc-back"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "pc-heading"], [1, "pc-sub"], [1, "pc-card", "card", 3, "formGroup"], [1, "form-group"], ["for", "pc-name"], ["id", "pc-name", "type", "text", "formControlName", "name", "placeholder", "Ex : Aluminium recycl\u00E9, palette bois\u2026", "autocomplete", "off"], ["class", "form-error", 4, "ngIf"], [1, "form-row"], ["for", "pc-category"], ["id", "pc-category", "type", "text", "formControlName", "category", "placeholder", "Ex : M\u00E9taux, plastique\u2026"], ["for", "pc-material"], ["id", "pc-material", "type", "text", "formControlName", "materialType", "placeholder", "Optionnel"], ["for", "pc-desc"], ["id", "pc-desc", "formControlName", "description", "rows", "4", "placeholder", "D\u00E9tails, origine, condition\u2026"], ["for", "pc-image"], ["id", "pc-image", "type", "url", "formControlName", "image", "placeholder", "https://\u2026"], [1, "pc-toggle-row"], [1, "pc-checkbox"], ["type", "checkbox", "formControlName", "recyclable"], [1, "pc-checkbox-ui"], [1, "pc-checkbox-label"], [1, "pc-hint"], ["class", "alert alert-danger", 4, "ngIf"], [1, "pc-actions"], ["routerLink", "/enterprise/annonces/products", 1, "btn", "btn-outline"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", "aria-hidden", "true", 4, "ngIf"], [1, "form-error"], [1, "alert", "alert-danger"], ["aria-hidden", "true", 1, "spinner-sm"]], template: function ProductCreate_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(3, "svg", 3);
            i0.ɵɵelement(4, "line", 4)(5, "polyline", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(6, " Retour \u00E0 la liste ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "h1", 6);
            i0.ɵɵtext(8, "Nouveau produit");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p", 7);
            i0.ɵɵtext(10, "Les informations seront associ\u00E9es \u00E0 votre entreprise automatiquement.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 8)(12, "div", 9)(13, "label", 10);
            i0.ɵɵtext(14, "Nom du produit *");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "input", 11);
            i0.ɵɵtemplate(16, ProductCreate_div_16_Template, 2, 0, "div", 12)(17, ProductCreate_div_17_Template, 2, 0, "div", 12)(18, ProductCreate_div_18_Template, 2, 0, "div", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "div", 9)(21, "label", 14);
            i0.ɵɵtext(22, "Cat\u00E9gorie");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(23, "input", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 9)(25, "label", 16);
            i0.ɵɵtext(26, "Type de mat\u00E9riau");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(27, "input", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 9)(29, "label", 18);
            i0.ɵɵtext(30, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(31, "textarea", 19);
            i0.ɵɵtemplate(32, ProductCreate_div_32_Template, 2, 0, "div", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 9)(34, "label", 20);
            i0.ɵɵtext(35, "URL de l'image");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(36, "input", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 22)(38, "label", 23);
            i0.ɵɵelement(39, "input", 24)(40, "span", 25);
            i0.ɵɵelementStart(41, "span", 26);
            i0.ɵɵtext(42, "Produit recyclable");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "p", 27);
            i0.ɵɵtext(44, "Cochez si le mat\u00E9riau peut \u00EAtre recycl\u00E9 ou valoris\u00E9 dans une fili\u00E8re adapt\u00E9e.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(45, ProductCreate_div_45_Template, 2, 1, "div", 28);
            i0.ɵɵelementStart(46, "div", 29)(47, "a", 30);
            i0.ɵɵtext(48, "Annuler");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "button", 31);
            i0.ɵɵlistener("click", function ProductCreate_Template_button_click_49_listener() { return ctx.submit(); });
            i0.ɵɵtemplate(50, ProductCreate_span_50_Template, 2, 0, "span", 32)(51, ProductCreate_span_51_Template, 1, 0, "span", 33);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.form.get("name").touched && ctx.form.get("name").hasError("required"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.get("name").hasError("minlength"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.get("name").hasError("maxlength"));
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngIf", ctx.form.get("description").hasError("maxlength"));
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.submitting);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.submitting);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.submitting);
        } }, dependencies: [i5.NgIf, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i2.RouterLink], styles: [".pc-page[_ngcontent-%COMP%]{max-width:620px;margin:0 auto}\n.pc-back[_ngcontent-%COMP%]{margin-bottom:16px}\n.pc-heading[_ngcontent-%COMP%]{font-size:24px;font-weight:800;color:var(--text);margin-bottom:6px;letter-spacing:-.04em}\n.pc-sub[_ngcontent-%COMP%]{font-size:14px;color:var(--text3);margin-bottom:24px;line-height:1.55}\n.pc-card[_ngcontent-%COMP%]{padding:28px;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pc-toggle-row[_ngcontent-%COMP%]{margin-bottom:20px;padding:16px 18px;background:var(--bg3,#f8fafc);border-radius:14px}\n.pc-checkbox[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:12px;cursor:pointer;font-size:14px;color:var(--text);font-weight:600}\n.pc-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{position:absolute;opacity:0;width:0;height:0}\n.pc-checkbox-ui[_ngcontent-%COMP%]{flex-shrink:0;width:22px;height:22px;border:2px solid var(--bg3,#e2e8f0);border-radius:7px;background:var(--card);margin-top:1px;transition:all .15s;position:relative}\n.pc-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible    + .pc-checkbox-ui[_ngcontent-%COMP%]{outline:2px solid var(--primary);outline-offset:2px}\n.pc-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .pc-checkbox-ui[_ngcontent-%COMP%]{background:var(--primary);border-color:var(--primary)}\n.pc-checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + .pc-checkbox-ui[_ngcontent-%COMP%]::after{content:'';position:absolute;left:6px;top:2px;width:6px;height:11px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}\n.pc-checkbox-label[_ngcontent-%COMP%]{line-height:1.4}\n.pc-hint[_ngcontent-%COMP%]{font-size:12px;color:var(--text3);margin:8px 0 0 34px;line-height:1.45}\n.pc-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;margin-top:8px}\n.spinner-sm[_ngcontent-%COMP%]{width:18px;height:18px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:_ngcontent-%COMP%_pc-spin .6s linear infinite;display:inline-block;vertical-align:middle}\n@keyframes _ngcontent-%COMP%_pc-spin{to{transform:rotate(360deg)}}\n@media(max-width:600px){.pc-card[_ngcontent-%COMP%]{padding:20px}.pc-actions[_ngcontent-%COMP%]{flex-direction:column-reverse}.pc-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{width:100%;justify-content:center}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductCreate, [{
        type: Component,
        args: [{ selector: 'app-product-create', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"pc-page\">\n    <a routerLink=\"/enterprise/annonces/products\" class=\"btn btn-ghost btn-sm pc-back\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n      Retour \u00E0 la liste\n    </a>\n\n    <h1 class=\"pc-heading\">Nouveau produit</h1>\n    <p class=\"pc-sub\">Les informations seront associ\u00E9es \u00E0 votre entreprise automatiquement.</p>\n\n    <div class=\"pc-card card\" [formGroup]=\"form\">\n      <div class=\"form-group\">\n        <label for=\"pc-name\">Nom du produit *</label>\n        <input id=\"pc-name\" type=\"text\" formControlName=\"name\" placeholder=\"Ex : Aluminium recycl\u00E9, palette bois\u2026\" autocomplete=\"off\">\n        <div class=\"form-error\" *ngIf=\"form.get('name')!.touched && form.get('name')!.hasError('required')\">Le nom est obligatoire</div>\n        <div class=\"form-error\" *ngIf=\"form.get('name')!.hasError('minlength')\">Le nom doit contenir au moins 2 caract\u00E8res</div>\n        <div class=\"form-error\" *ngIf=\"form.get('name')!.hasError('maxlength')\">Le nom ne peut pas d\u00E9passer 255 caract\u00E8res</div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label for=\"pc-category\">Cat\u00E9gorie</label>\n          <input id=\"pc-category\" type=\"text\" formControlName=\"category\" placeholder=\"Ex : M\u00E9taux, plastique\u2026\">\n        </div>\n        <div class=\"form-group\">\n          <label for=\"pc-material\">Type de mat\u00E9riau</label>\n          <input id=\"pc-material\" type=\"text\" formControlName=\"materialType\" placeholder=\"Optionnel\">\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"pc-desc\">Description</label>\n        <textarea id=\"pc-desc\" formControlName=\"description\" rows=\"4\" placeholder=\"D\u00E9tails, origine, condition\u2026\"></textarea>\n        <div class=\"form-error\" *ngIf=\"form.get('description')!.hasError('maxlength')\">La description ne peut pas d\u00E9passer 1000 caract\u00E8res</div>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"pc-image\">URL de l'image</label>\n        <input id=\"pc-image\" type=\"url\" formControlName=\"image\" placeholder=\"https://\u2026\">\n      </div>\n\n      <div class=\"pc-toggle-row\">\n        <label class=\"pc-checkbox\">\n          <input type=\"checkbox\" formControlName=\"recyclable\">\n          <span class=\"pc-checkbox-ui\"></span>\n          <span class=\"pc-checkbox-label\">Produit recyclable</span>\n        </label>\n        <p class=\"pc-hint\">Cochez si le mat\u00E9riau peut \u00EAtre recycl\u00E9 ou valoris\u00E9 dans une fili\u00E8re adapt\u00E9e.</p>\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error\">{{ error }}</div>\n\n      <div class=\"pc-actions\">\n        <a routerLink=\"/enterprise/annonces/products\" class=\"btn btn-outline\">Annuler</a>\n        <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"form.invalid || submitting\" (click)=\"submit()\">\n          <span *ngIf=\"!submitting\">Cr\u00E9er le produit</span>\n          <span *ngIf=\"submitting\" class=\"spinner-sm\" aria-hidden=\"true\"></span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".pc-page{max-width:620px;margin:0 auto}\n.pc-back{margin-bottom:16px}\n.pc-heading{font-size:24px;font-weight:800;color:var(--text);margin-bottom:6px;letter-spacing:-.04em}\n.pc-sub{font-size:14px;color:var(--text3);margin-bottom:24px;line-height:1.55}\n.pc-card{padding:28px;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pc-toggle-row{margin-bottom:20px;padding:16px 18px;background:var(--bg3,#f8fafc);border-radius:14px}\n.pc-checkbox{display:flex;align-items:flex-start;gap:12px;cursor:pointer;font-size:14px;color:var(--text);font-weight:600}\n.pc-checkbox input{position:absolute;opacity:0;width:0;height:0}\n.pc-checkbox-ui{flex-shrink:0;width:22px;height:22px;border:2px solid var(--bg3,#e2e8f0);border-radius:7px;background:var(--card);margin-top:1px;transition:all .15s;position:relative}\n.pc-checkbox input:focus-visible + .pc-checkbox-ui{outline:2px solid var(--primary);outline-offset:2px}\n.pc-checkbox input:checked + .pc-checkbox-ui{background:var(--primary);border-color:var(--primary)}\n.pc-checkbox input:checked + .pc-checkbox-ui::after{content:'';position:absolute;left:6px;top:2px;width:6px;height:11px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}\n.pc-checkbox-label{line-height:1.4}\n.pc-hint{font-size:12px;color:var(--text3);margin:8px 0 0 34px;line-height:1.45}\n.pc-actions{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;margin-top:8px}\n.spinner-sm{width:18px;height:18px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:pc-spin .6s linear infinite;display:inline-block;vertical-align:middle}\n@keyframes pc-spin{to{transform:rotate(360deg)}}\n@media(max-width:600px){.pc-card{padding:20px}.pc-actions{flex-direction:column-reverse}.pc-actions .btn{width:100%;justify-content:center}}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.ProductAnnoncesService }, { type: i4.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProductCreate, { className: "ProductCreate", filePath: "src/app/features/annonces/products/product-create/product-create.ts", lineNumber: 14 }); })();
