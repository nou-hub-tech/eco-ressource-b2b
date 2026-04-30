import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/product-annonces.service";
import * as i3 from "@angular/common";
const _c0 = a0 => ["/enterprise/annonces/products", a0, "edit"];
function ProductDetail_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "div", 5);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Chargement du produit...");
    i0.ɵɵelementEnd()();
} }
function ProductDetail_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "span", 7);
    i0.ɵɵtext(2, "\u26A0\uFE0F");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "a", 8);
    i0.ɵɵtext(6, "Retour \u00E0 la liste");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function ProductDetail_div_3_img_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 34);
} if (rf & 2) {
    const p_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵproperty("src", p_r2.image, i0.ɵɵsanitizeUrl)("alt", p_r2.name);
} }
function ProductDetail_div_3_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1, "\uD83D\uDCE6");
    i0.ɵɵelementEnd();
} }
function ProductDetail_div_3_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(p_r2.category);
} }
function ProductDetail_div_3_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 37);
    i0.ɵɵtext(1, "Recyclable");
    i0.ɵɵelementEnd();
} }
function ProductDetail_div_3_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 38);
    i0.ɵɵtext(1, "Non recyclable");
    i0.ɵɵelementEnd();
} }
function ProductDetail_div_3_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39)(1, "h2");
    i0.ɵɵtext(2, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 40);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r2.description);
} }
function ProductDetail_div_3_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41)(1, "span", 42);
    i0.ɵɵtext(2, "Type de mat\u00E9riau");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 43);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r2.materialType);
} }
function ProductDetail_div_3_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41)(1, "span", 42);
    i0.ɵɵtext(2, "Entreprise (ID)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 43);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(p_r2.companyId);
} }
function ProductDetail_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "a", 10);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 11);
    i0.ɵɵelement(3, "line", 12)(4, "polyline", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Retour \u00E0 la liste ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "div", 14)(7, "div", 15);
    i0.ɵɵtemplate(8, ProductDetail_div_3_img_8_Template, 1, 2, "img", 16)(9, ProductDetail_div_3_div_9_Template, 2, 0, "div", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 18)(11, "div", 19)(12, "div", 20);
    i0.ɵɵtemplate(13, ProductDetail_div_3_span_13_Template, 2, 1, "span", 21)(14, ProductDetail_div_3_span_14_Template, 2, 0, "span", 22)(15, ProductDetail_div_3_span_15_Template, 2, 0, "span", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "h1", 24);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p", 25);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, ProductDetail_div_3_div_20_Template, 5, 1, "div", 26);
    i0.ɵɵelementStart(21, "div", 27);
    i0.ɵɵtemplate(22, ProductDetail_div_3_div_22_Template, 5, 1, "div", 28)(23, ProductDetail_div_3_div_23_Template, 5, 1, "div", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 29)(25, "a", 30);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(26, "svg", 11);
    i0.ɵɵelement(27, "path", 31)(28, "path", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(29, " Modifier ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(30, "a", 33);
    i0.ɵɵtext(31, "Voir tous les produits");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const p_r2 = ctx.ngIf;
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", p_r2.image);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !p_r2.image);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", p_r2.category);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r2.recyclable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !p_r2.recyclable);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(p_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("R\u00E9f. produit #", p_r2.idProduct);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r2.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", p_r2.materialType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", p_r2.companyId !== null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(11, _c0, p_r2.idProduct));
} }
export class ProductDetail {
    route;
    productService;
    product = null;
    loading = true;
    error = '';
    constructor(route, productService) {
        this.route = route;
        this.productService = productService;
    }
    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.productService.getById(id).subscribe({
            next: (p) => {
                this.product = p;
                this.loading = false;
            },
            error: () => {
                this.error = 'Produit introuvable';
                this.loading = false;
            }
        });
    }
    static ɵfac = function ProductDetail_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProductDetail)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.ProductAnnoncesService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProductDetail, selectors: [["app-product-detail"]], standalone: false, decls: 4, vars: 3, consts: [[1, "page-wrapper"], ["class", "pd-loading", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "pd-page", 4, "ngIf"], [1, "pd-loading"], [1, "spinner-lg"], [1, "empty-state"], [1, "empty-icon"], ["routerLink", "/enterprise/annonces/products", 1, "btn", "btn-primary"], [1, "pd-page"], ["routerLink", "/enterprise/annonces/products", 1, "btn", "btn-ghost", "btn-sm", "pd-back"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "pd-layout"], [1, "pd-visual", "card"], ["class", "pd-img", 3, "src", "alt", 4, "ngIf"], ["class", "pd-visual-placeholder", 4, "ngIf"], [1, "pd-main"], [1, "pd-header"], [1, "pd-badges"], ["class", "pd-badge pd-badge-muted", 4, "ngIf"], ["class", "pd-badge pd-badge-ok", 4, "ngIf"], ["class", "pd-badge pd-badge-warn", 4, "ngIf"], [1, "pd-title"], [1, "pd-id"], ["class", "pd-section card", 4, "ngIf"], [1, "pd-info-grid"], ["class", "pd-info card", 4, "ngIf"], [1, "pd-actions"], [1, "btn", "btn-primary", 3, "routerLink"], ["d", "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"], ["d", "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"], ["routerLink", "/enterprise/annonces/products", 1, "btn", "btn-outline"], [1, "pd-img", 3, "src", "alt"], [1, "pd-visual-placeholder"], [1, "pd-badge", "pd-badge-muted"], [1, "pd-badge", "pd-badge-ok"], [1, "pd-badge", "pd-badge-warn"], [1, "pd-section", "card"], [1, "pd-desc"], [1, "pd-info", "card"], [1, "pd-info-label"], [1, "pd-info-value"]], template: function ProductDetail_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, ProductDetail_div_1_Template, 4, 0, "div", 1)(2, ProductDetail_div_2_Template, 7, 1, "div", 2)(3, ProductDetail_div_3_Template, 32, 13, "div", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.product);
        } }, dependencies: [i3.NgIf, i1.RouterLink], styles: [".pd-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3);font-size:14px}\n.spinner-lg[_ngcontent-%COMP%]{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:_ngcontent-%COMP%_pd-spin .7s linear infinite}\n@keyframes _ngcontent-%COMP%_pd-spin{to{transform:rotate(360deg)}}\n\n.pd-page[_ngcontent-%COMP%]{max-width:1000px;margin:0 auto}\n.pd-back[_ngcontent-%COMP%]{margin-bottom:18px}\n.pd-layout[_ngcontent-%COMP%]{display:grid;grid-template-columns:minmax(0,360px) 1fr;gap:28px;align-items:start}\n.pd-visual[_ngcontent-%COMP%]{overflow:hidden;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pd-img[_ngcontent-%COMP%]{width:100%;display:block;aspect-ratio:4/3;object-fit:cover}\n.pd-visual-placeholder[_ngcontent-%COMP%]{min-height:220px;display:flex;align-items:center;justify-content:center;font-size:64px;opacity:.2;background:var(--bg3,#f8fafc)}\n.pd-main[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:18px}\n.pd-header[_ngcontent-%COMP%]{padding:4px 0 8px}\n.pd-badges[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}\n.pd-badge[_ngcontent-%COMP%]{display:inline-flex;align-items:center;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600}\n.pd-badge-muted[_ngcontent-%COMP%]{background:var(--bg3,#f1f5f9);color:var(--text2)}\n.pd-badge-ok[_ngcontent-%COMP%]{background:#ecfdf5;color:#047857}\n.pd-badge-warn[_ngcontent-%COMP%]{background:#fffbeb;color:#b45309}\n.pd-title[_ngcontent-%COMP%]{font-size:clamp(22px,4vw,28px);font-weight:800;color:var(--text);margin:0 0 6px;letter-spacing:-.04em;line-height:1.15}\n.pd-id[_ngcontent-%COMP%]{font-size:12px;color:var(--muted);margin:0}\n.pd-section[_ngcontent-%COMP%]{padding:22px 24px;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pd-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:15px;font-weight:700;color:var(--text);margin:0 0 12px;letter-spacing:-.01em}\n.pd-desc[_ngcontent-%COMP%]{font-size:14.5px;color:var(--text2);line-height:1.65;margin:0;white-space:pre-wrap}\n.pd-info-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}\n.pd-info[_ngcontent-%COMP%]{padding:18px 20px;display:flex;flex-direction:column;gap:6px;border-radius:14px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pd-info-label[_ngcontent-%COMP%]{font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);font-weight:600}\n.pd-info-value[_ngcontent-%COMP%]{font-size:15px;font-weight:700;color:var(--text)}\n.pd-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}\n\n@media(max-width:900px){\n  .pd-layout[_ngcontent-%COMP%]{grid-template-columns:1fr}\n  .pd-visual[_ngcontent-%COMP%]{max-width:420px;margin:0 auto;width:100%}\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProductDetail, [{
        type: Component,
        args: [{ selector: 'app-product-detail', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"pd-loading\" *ngIf=\"loading\">\n    <div class=\"spinner-lg\"></div>\n    <p>Chargement du produit...</p>\n  </div>\n\n  <div class=\"empty-state\" *ngIf=\"!loading && error\">\n    <span class=\"empty-icon\">\u26A0\uFE0F</span>\n    <h3>{{ error }}</h3>\n    <a class=\"btn btn-primary\" routerLink=\"/enterprise/annonces/products\">Retour \u00E0 la liste</a>\n  </div>\n\n  <div class=\"pd-page\" *ngIf=\"!loading && product as p\">\n    <a routerLink=\"/enterprise/annonces/products\" class=\"btn btn-ghost btn-sm pd-back\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n      Retour \u00E0 la liste\n    </a>\n\n    <div class=\"pd-layout\">\n      <div class=\"pd-visual card\">\n        <img *ngIf=\"p.image\" [src]=\"p.image\" [alt]=\"p.name\" class=\"pd-img\">\n        <div class=\"pd-visual-placeholder\" *ngIf=\"!p.image\">\uD83D\uDCE6</div>\n      </div>\n\n      <div class=\"pd-main\">\n        <div class=\"pd-header\">\n          <div class=\"pd-badges\">\n            <span class=\"pd-badge pd-badge-muted\" *ngIf=\"p.category\">{{ p.category }}</span>\n            <span class=\"pd-badge pd-badge-ok\" *ngIf=\"p.recyclable\">Recyclable</span>\n            <span class=\"pd-badge pd-badge-warn\" *ngIf=\"!p.recyclable\">Non recyclable</span>\n          </div>\n          <h1 class=\"pd-title\">{{ p.name }}</h1>\n          <p class=\"pd-id\">R\u00E9f. produit #{{ p.idProduct }}</p>\n        </div>\n\n        <div class=\"pd-section card\" *ngIf=\"p.description\">\n          <h2>Description</h2>\n          <p class=\"pd-desc\">{{ p.description }}</p>\n        </div>\n\n        <div class=\"pd-info-grid\">\n          <div class=\"pd-info card\" *ngIf=\"p.materialType\">\n            <span class=\"pd-info-label\">Type de mat\u00E9riau</span>\n            <span class=\"pd-info-value\">{{ p.materialType }}</span>\n          </div>\n          <div class=\"pd-info card\" *ngIf=\"p.companyId !== null\">\n            <span class=\"pd-info-label\">Entreprise (ID)</span>\n            <span class=\"pd-info-value\">{{ p.companyId }}</span>\n          </div>\n        </div>\n\n        <div class=\"pd-actions\">\n          <a class=\"btn btn-primary\" [routerLink]=\"['/enterprise/annonces/products', p.idProduct, 'edit']\">\n            <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7\"/><path d=\"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z\"/></svg>\n            Modifier\n          </a>\n          <a class=\"btn btn-outline\" routerLink=\"/enterprise/annonces/products\">Voir tous les produits</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".pd-loading{display:flex;flex-direction:column;align-items:center;gap:14px;padding:80px 24px;color:var(--text3);font-size:14px}\n.spinner-lg{width:32px;height:32px;border:2.5px solid var(--bg3,#f1f5f9);border-top-color:var(--primary);border-radius:50%;animation:pd-spin .7s linear infinite}\n@keyframes pd-spin{to{transform:rotate(360deg)}}\n\n.pd-page{max-width:1000px;margin:0 auto}\n.pd-back{margin-bottom:18px}\n.pd-layout{display:grid;grid-template-columns:minmax(0,360px) 1fr;gap:28px;align-items:start}\n.pd-visual{overflow:hidden;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pd-img{width:100%;display:block;aspect-ratio:4/3;object-fit:cover}\n.pd-visual-placeholder{min-height:220px;display:flex;align-items:center;justify-content:center;font-size:64px;opacity:.2;background:var(--bg3,#f8fafc)}\n.pd-main{display:flex;flex-direction:column;gap:18px}\n.pd-header{padding:4px 0 8px}\n.pd-badges{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}\n.pd-badge{display:inline-flex;align-items:center;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600}\n.pd-badge-muted{background:var(--bg3,#f1f5f9);color:var(--text2)}\n.pd-badge-ok{background:#ecfdf5;color:#047857}\n.pd-badge-warn{background:#fffbeb;color:#b45309}\n.pd-title{font-size:clamp(22px,4vw,28px);font-weight:800;color:var(--text);margin:0 0 6px;letter-spacing:-.04em;line-height:1.15}\n.pd-id{font-size:12px;color:var(--muted);margin:0}\n.pd-section{padding:22px 24px;border-radius:16px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pd-section h2{font-size:15px;font-weight:700;color:var(--text);margin:0 0 12px;letter-spacing:-.01em}\n.pd-desc{font-size:14.5px;color:var(--text2);line-height:1.65;margin:0;white-space:pre-wrap}\n.pd-info-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}\n.pd-info{padding:18px 20px;display:flex;flex-direction:column;gap:6px;border-radius:14px;background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.pd-info-label{font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--text3);font-weight:600}\n.pd-info-value{font-size:15px;font-weight:700;color:var(--text)}\n.pd-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}\n\n@media(max-width:900px){\n  .pd-layout{grid-template-columns:1fr}\n  .pd-visual{max-width:420px;margin:0 auto;width:100%}\n}\n"] }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i2.ProductAnnoncesService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProductDetail, { className: "ProductDetail", filePath: "src/app/features/annonces/products/product-detail/product-detail.ts", lineNumber: 12 }); })();
