import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../services/resource-listing.service";
import * as i4 from "../services/product-annonces.service";
import * as i5 from "../../../core/services/auth.service";
import * as i6 from "@angular/common";
const _c0 = a0 => ["/enterprise/annonces", a0];
function ListingEdit_a_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 7);
    i0.ɵɵelement(2, "line", 8)(3, "polyline", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Retour au d\u00E9tail ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c0, ctx_r0.listing == null ? null : ctx_r0.listing.id));
} }
function ListingEdit_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelement(1, "div", 11);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement...");
    i0.ɵɵelementEnd()();
} }
function ListingEdit_div_6_option_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", p_r3.idProduct);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", p_r3.name, " ", p_r3.category ? "(" + p_r3.category + ")" : "");
} }
function ListingEdit_div_6_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1, "Produit obligatoire");
    i0.ɵɵelementEnd();
} }
function ListingEdit_div_6_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1, "Le titre est obligatoire");
    i0.ɵɵelementEnd();
} }
function ListingEdit_div_6_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1, "Minimum 3 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ListingEdit_div_6_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1, "La description est obligatoire");
    i0.ɵɵelementEnd();
} }
function ListingEdit_div_6_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1, "Minimum 10 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ListingEdit_div_6_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1, "Quantit\u00E9 invalide");
    i0.ɵɵelementEnd();
} }
function ListingEdit_div_6_div_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function ListingEdit_div_6_span_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Enregistrer les modifications");
    i0.ɵɵelementEnd();
} }
function ListingEdit_div_6_span_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 37);
} }
function ListingEdit_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12)(1, "div", 13)(2, "span", 14);
    i0.ɵɵtext(3, "Type : ");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 15);
    i0.ɵɵtext(7, "Le type ne peut pas \u00EAtre modifi\u00E9");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 16)(9, "label");
    i0.ɵɵtext(10, "Produit *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 17)(12, "option", 18);
    i0.ɵɵtext(13, "-- Choisir --");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, ListingEdit_div_6_option_14_Template, 2, 3, "option", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, ListingEdit_div_6_div_15_Template, 2, 0, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 16)(17, "label");
    i0.ɵɵtext(18, "Titre *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 21);
    i0.ɵɵtemplate(20, ListingEdit_div_6_div_20_Template, 2, 0, "div", 20)(21, ListingEdit_div_6_div_21_Template, 2, 0, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 16)(23, "label");
    i0.ɵɵtext(24, "Description *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "textarea", 22);
    i0.ɵɵtemplate(26, ListingEdit_div_6_div_26_Template, 2, 0, "div", 20)(27, ListingEdit_div_6_div_27_Template, 2, 0, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 23)(29, "div", 16)(30, "label");
    i0.ɵɵtext(31, "Quantit\u00E9 *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(32, "input", 24);
    i0.ɵɵtemplate(33, ListingEdit_div_6_div_33_Template, 2, 0, "div", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 16)(35, "label");
    i0.ɵɵtext(36, "Unit\u00E9 *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(37, "input", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "div", 23)(39, "div", 16)(40, "label");
    i0.ɵɵtext(41, "Prix (TND)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(42, "input", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "div", 16)(44, "label");
    i0.ɵɵtext(45, "Localisation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(46, "input", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(47, ListingEdit_div_6_div_47_Template, 2, 1, "div", 28);
    i0.ɵɵelementStart(48, "div", 29)(49, "a", 30);
    i0.ɵɵtext(50, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "button", 31);
    i0.ɵɵlistener("click", function ListingEdit_div_6_Template_button_click_51_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵtemplate(52, ListingEdit_div_6_span_52_Template, 2, 0, "span", 32)(53, ListingEdit_div_6_span_53_Template, 1, 0, "span", 33);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.typeLabel);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.products);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("productId").touched && ctx_r0.form.get("productId").invalid);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("title").touched && ctx_r0.form.get("title").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("title").hasError("minlength"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("description").touched && ctx_r0.form.get("description").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("description").hasError("minlength"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.form.get("quantity").touched && ctx_r0.form.get("quantity").invalid);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", ctx_r0.error);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(15, _c0, ctx_r0.listing.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.form.invalid || ctx_r0.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.submitting);
} }
export class ListingEdit {
    fb;
    route;
    router;
    listingService;
    productService;
    authService;
    form;
    listing;
    products = [];
    loading = true;
    submitting = false;
    error = '';
    companyId;
    constructor(fb, route, router, listingService, productService, authService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.listingService = listingService;
        this.productService = productService;
        this.authService = authService;
    }
    ngOnInit() {
        const user = this.authService.currentUser;
        this.companyId = user ? parseInt(user.id, 10) : 0;
        this.form = this.fb.group({
            productId: [null, Validators.required],
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
            quantity: [null, [Validators.required, Validators.min(1)]],
            unit: ['', Validators.required],
            price: [null, [Validators.min(0)]],
            location: [''],
            latitude: [null],
            longitude: [null],
            attachmentUrls: [[]]
        });
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.loadData(id);
    }
    loadData(id) {
        this.loading = true;
        this.productService.findAll().subscribe({ next: (p) => this.products = p });
        this.listingService.getById(id).subscribe({
            next: (data) => {
                this.listing = data;
                this.form.patchValue({
                    productId: data.productId,
                    title: data.title,
                    description: data.description,
                    quantity: data.quantity,
                    unit: data.unit,
                    price: data.price,
                    location: data.location,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    attachmentUrls: data.attachmentUrls || []
                });
                this.loading = false;
            },
            error: () => {
                this.error = 'Annonce introuvable';
                this.loading = false;
            }
        });
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
    submit() {
        if (this.form.invalid || !this.listing)
            return;
        this.submitting = true;
        this.error = '';
        const val = this.form.value;
        const body = {
            ...val,
            type: this.listing.type,
            companyId: this.companyId,
            price: val.price ?? undefined,
            location: val.location || undefined
        };
        this.listingService.update(this.listing.id, this.companyId, body).subscribe({
            next: () => {
                this.submitting = false;
                this.router.navigate(['/enterprise/annonces', this.listing.id]);
            },
            error: (err) => {
                this.error = err.error?.message || 'Erreur lors de la modification';
                this.submitting = false;
            }
        });
    }
    static ɵfac = function ListingEdit_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingEdit)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.ActivatedRoute), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.ResourceListingService), i0.ɵɵdirectiveInject(i4.ProductAnnoncesService), i0.ɵɵdirectiveInject(i5.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListingEdit, selectors: [["app-listing-edit"]], standalone: false, decls: 7, vars: 3, consts: [[1, "page-wrapper"], [1, "le-page"], ["class", "btn btn-ghost btn-sm", 3, "routerLink", 4, "ngIf"], [1, "le-heading"], ["class", "le-loading", 4, "ngIf"], ["class", "le-card", 3, "formGroup", 4, "ngIf"], [1, "btn", "btn-ghost", "btn-sm", 3, "routerLink"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "le-loading"], [1, "spinner-lg"], [1, "le-card", 3, "formGroup"], [1, "le-type-row"], [1, "le-type-badge"], [1, "le-type-hint"], [1, "form-group"], ["formControlName", "productId"], ["disabled", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["class", "form-error", 4, "ngIf"], ["type", "text", "formControlName", "title"], ["formControlName", "description", "rows", "4"], [1, "form-row"], ["type", "number", "formControlName", "quantity", "min", "1"], ["type", "text", "formControlName", "unit"], ["type", "number", "formControlName", "price", "min", "0", "step", "0.01"], ["type", "text", "formControlName", "location"], ["class", "alert alert-danger", 4, "ngIf"], [1, "le-actions"], [1, "btn", "btn-outline", 3, "routerLink"], [1, "btn", "btn-primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", 4, "ngIf"], [3, "ngValue"], [1, "form-error"], [1, "alert", "alert-danger"], [1, "spinner-sm"]], template: function ListingEdit_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, ListingEdit_a_2_Template, 5, 3, "a", 2);
            i0.ɵɵelementStart(3, "h1", 3);
            i0.ɵɵtext(4, "Modifier l'annonce");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, ListingEdit_div_5_Template, 4, 0, "div", 4)(6, ListingEdit_div_6_Template, 54, 17, "div", 5);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.listing);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.listing);
        } }, dependencies: [i6.NgForOf, i6.NgIf, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.FormGroupDirective, i1.FormControlName, i2.RouterLink], styles: [".le-page[_ngcontent-%COMP%]{max-width:680px;margin:0 auto}\n.le-heading[_ngcontent-%COMP%]{font-size:22px;font-weight:800;color:var(--text);margin:14px 0 22px;letter-spacing:-.03em}\n.le-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3)}\n.le-card[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;padding:28px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.le-type-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg3,#f8fafc);border-radius:12px;margin-bottom:18px}\n.le-type-badge[_ngcontent-%COMP%]{font-size:14px;color:var(--text);font-weight:600}\n.le-type-hint[_ngcontent-%COMP%]{font-size:12px;color:var(--text3)}\n.le-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:10px;margin-top:22px;padding-top:18px;border-top:1px solid var(--bg3,#f1f5f9)}\n.spinner-lg[_ngcontent-%COMP%]{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:_ngcontent-%COMP%_spin .7s linear infinite}\n.spinner-sm[_ngcontent-%COMP%]{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:_ngcontent-%COMP%_spin .6s linear infinite;display:inline-block}\n@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}\n@media(max-width:600px){.le-card[_ngcontent-%COMP%]{padding:20px}.le-actions[_ngcontent-%COMP%]{flex-direction:column}.le-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{width:100%;justify-content:center}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingEdit, [{
        type: Component,
        args: [{ selector: 'app-listing-edit', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"le-page\">\n    <a [routerLink]=\"['/enterprise/annonces', listing?.id]\" class=\"btn btn-ghost btn-sm\" *ngIf=\"listing\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n      Retour au d\u00E9tail\n    </a>\n\n    <h1 class=\"le-heading\">Modifier l'annonce</h1>\n\n    <div class=\"le-loading\" *ngIf=\"loading\">\n      <div class=\"spinner-lg\"></div>\n      <p>Chargement...</p>\n    </div>\n\n    <div class=\"le-card\" *ngIf=\"!loading && listing\" [formGroup]=\"form\">\n      <!-- Type badge (immutable) -->\n      <div class=\"le-type-row\">\n        <span class=\"le-type-badge\">Type : <strong>{{typeLabel}}</strong></span>\n        <span class=\"le-type-hint\">Le type ne peut pas \u00EAtre modifi\u00E9</span>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Produit *</label>\n        <select formControlName=\"productId\">\n          <option [ngValue]=\"null\" disabled>-- Choisir --</option>\n          <option *ngFor=\"let p of products\" [ngValue]=\"p.idProduct\">{{p.name}} {{p.category ? '(' + p.category + ')' : ''}}</option>\n        </select>\n        <div class=\"form-error\" *ngIf=\"form.get('productId')!.touched && form.get('productId')!.invalid\">Produit obligatoire</div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Titre *</label>\n        <input type=\"text\" formControlName=\"title\">\n        <div class=\"form-error\" *ngIf=\"form.get('title')!.touched && form.get('title')!.hasError('required')\">Le titre est obligatoire</div>\n        <div class=\"form-error\" *ngIf=\"form.get('title')!.hasError('minlength')\">Minimum 3 caract\u00E8res</div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Description *</label>\n        <textarea formControlName=\"description\" rows=\"4\"></textarea>\n        <div class=\"form-error\" *ngIf=\"form.get('description')!.touched && form.get('description')!.hasError('required')\">La description est obligatoire</div>\n        <div class=\"form-error\" *ngIf=\"form.get('description')!.hasError('minlength')\">Minimum 10 caract\u00E8res</div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Quantit\u00E9 *</label>\n          <input type=\"number\" formControlName=\"quantity\" min=\"1\">\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.invalid\">Quantit\u00E9 invalide</div>\n        </div>\n        <div class=\"form-group\">\n          <label>Unit\u00E9 *</label>\n          <input type=\"text\" formControlName=\"unit\">\n        </div>\n      </div>\n\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Prix (TND)</label>\n          <input type=\"number\" formControlName=\"price\" min=\"0\" step=\"0.01\">\n        </div>\n        <div class=\"form-group\">\n          <label>Localisation</label>\n          <input type=\"text\" formControlName=\"location\">\n        </div>\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error\">{{error}}</div>\n\n      <div class=\"le-actions\">\n        <a [routerLink]=\"['/enterprise/annonces', listing.id]\" class=\"btn btn-outline\">Annuler</a>\n        <button class=\"btn btn-primary\" [disabled]=\"form.invalid || submitting\" (click)=\"submit()\">\n          <span *ngIf=\"!submitting\">Enregistrer les modifications</span>\n          <span *ngIf=\"submitting\" class=\"spinner-sm\"></span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".le-page{max-width:680px;margin:0 auto}\n.le-heading{font-size:22px;font-weight:800;color:var(--text);margin:14px 0 22px;letter-spacing:-.03em}\n.le-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3)}\n.le-card{background:var(--card);border-radius:16px;padding:28px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.le-type-row{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg3,#f8fafc);border-radius:12px;margin-bottom:18px}\n.le-type-badge{font-size:14px;color:var(--text);font-weight:600}\n.le-type-hint{font-size:12px;color:var(--text3)}\n.le-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:22px;padding-top:18px;border-top:1px solid var(--bg3,#f1f5f9)}\n.spinner-lg{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite}\n.spinner-sm{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}\n@keyframes spin{to{transform:rotate(360deg)}}\n@media(max-width:600px){.le-card{padding:20px}.le-actions{flex-direction:column}.le-actions .btn{width:100%;justify-content:center}}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.ActivatedRoute }, { type: i2.Router }, { type: i3.ResourceListingService }, { type: i4.ProductAnnoncesService }, { type: i5.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListingEdit, { className: "ListingEdit", filePath: "src/app/features/annonces/listing-edit/listing-edit.ts", lineNumber: 15 }); })();
