import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../services/resource-listing.service";
import * as i4 from "../services/product-annonces.service";
import * as i5 from "../../../core/services/auth.service";
import * as i6 from "@angular/common";
const _c0 = () => [1, 2, 3, 4, 5, 6];
const _c1 = () => [];
function ListingCreate_div_11_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1, "Type");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_11_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1, "Produit");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_11_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1, "Infos");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_11_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1, "Groupe");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_11_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1, "Images");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_11_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1, "R\u00E9cap");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵlistener("click", function ListingCreate_div_11_Template_div_click_0_listener() { const s_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(s_r2)); });
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, ListingCreate_div_11_span_3_Template, 2, 0, "span", 15)(4, ListingCreate_div_11_span_4_Template, 2, 0, "span", 15)(5, ListingCreate_div_11_span_5_Template, 2, 0, "span", 15)(6, ListingCreate_div_11_span_6_Template, 2, 0, "span", 15)(7, ListingCreate_div_11_span_7_Template, 2, 0, "span", 15)(8, ListingCreate_div_11_span_8_Template, 2, 0, "span", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.step === s_r2)("done", ctx_r2.step > s_r2)("hidden", !ctx_r2.isGroupBuying && s_r2 === 4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.step > s_r2 ? "\u2713" : s_r2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2 === 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2 === 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2 === 3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2 === 4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2 === 5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2 === 6);
} }
function ListingCreate_div_12_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵlistener("click", function ListingCreate_div_12_div_4_Template_div_click_0_listener() { const t_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.selectType(t_r5.value)); });
    i0.ɵɵelementStart(1, "span", 21);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const t_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("border-color", ctx_r2.selectedType === t_r5.value ? t_r5.color : "");
    i0.ɵɵclassProp("selected", ctx_r2.selectedType === t_r5.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r5.icon);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", t_r5.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r5.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r5.desc);
} }
function ListingCreate_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17)(1, "h2");
    i0.ɵɵtext(2, "Quel type d'annonce souhaitez-vous cr\u00E9er ?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 18);
    i0.ɵɵtemplate(4, ListingCreate_div_12_div_4_Template, 7, 9, "div", 19);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r2.types);
} }
function ListingCreate_div_13_option_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 28);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const p_r7 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", p_r7.idProduct);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", p_r7.name, " ", p_r7.category ? "(" + p_r7.category + ")" : "");
} }
function ListingCreate_div_13_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "Veuillez s\u00E9lectionner un produit");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_13_div_11_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31)(1, "span");
    i0.ɵɵtext(2, "Cat\u00E9gorie :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.selectedProduct.category);
} }
function ListingCreate_div_13_div_11_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31)(1, "span");
    i0.ɵɵtext(2, "Description :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.selectedProduct.description);
} }
function ListingCreate_div_13_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "div", 31)(2, "span");
    i0.ɵɵtext(3, "Nom :");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, ListingCreate_div_13_div_11_div_6_Template, 4, 1, "div", 32)(7, ListingCreate_div_13_div_11_div_7_Template, 4, 1, "div", 32);
    i0.ɵɵelementStart(8, "div", 31)(9, "span");
    i0.ɵɵtext(10, "Recyclable :");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedProduct.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.selectedProduct.category);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.selectedProduct.description);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.selectedProduct.recyclable ? "Oui" : "Non");
} }
function ListingCreate_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "h2");
    i0.ɵɵtext(2, "S\u00E9lectionnez un produit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 22)(4, "label");
    i0.ɵɵtext(5, "Produit existant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "select", 23);
    i0.ɵɵlistener("ngModelChange", function ListingCreate_div_13_Template_select_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.form.get("productId").setValue($event)); });
    i0.ɵɵelementStart(7, "option", 24);
    i0.ɵɵtext(8, "-- Choisir un produit --");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, ListingCreate_div_13_option_9_Template, 2, 3, "option", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, ListingCreate_div_13_div_10_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, ListingCreate_div_13_div_11_Template, 12, 4, "div", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r2.form.get("productId").value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngValue", null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.products);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("productId").touched && ctx_r2.form.get("productId").invalid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.selectedProduct);
} }
function ListingCreate_div_14_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "Le titre est obligatoire");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "Minimum 3 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "Maximum 255 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "La description est obligatoire");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "Minimum 10 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "Maximum 2000 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "La quantit\u00E9 est obligatoire");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "La quantit\u00E9 doit \u00EAtre sup\u00E9rieure \u00E0 0");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "L'unit\u00E9 est obligatoire");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "Le prix doit \u00EAtre positif");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33)(1, "h2");
    i0.ɵɵtext(2, "Informations de l'annonce");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 22)(4, "label");
    i0.ɵɵtext(5, "Titre *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "input", 34);
    i0.ɵɵtemplate(7, ListingCreate_div_14_div_7_Template, 2, 0, "div", 26)(8, ListingCreate_div_14_div_8_Template, 2, 0, "div", 26)(9, ListingCreate_div_14_div_9_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 22)(11, "label");
    i0.ɵɵtext(12, "Description *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "textarea", 35);
    i0.ɵɵtemplate(14, ListingCreate_div_14_div_14_Template, 2, 0, "div", 26)(15, ListingCreate_div_14_div_15_Template, 2, 0, "div", 26)(16, ListingCreate_div_14_div_16_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 36)(18, "div", 22)(19, "label");
    i0.ɵɵtext(20, "Quantit\u00E9 *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "input", 37);
    i0.ɵɵtemplate(22, ListingCreate_div_14_div_22_Template, 2, 0, "div", 26)(23, ListingCreate_div_14_div_23_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 22)(25, "label");
    i0.ɵɵtext(26, "Unit\u00E9 *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(27, "input", 38);
    i0.ɵɵtemplate(28, ListingCreate_div_14_div_28_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "div", 36)(30, "div", 22)(31, "label");
    i0.ɵɵtext(32, "Prix (TND)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(33, "input", 39);
    i0.ɵɵtemplate(34, ListingCreate_div_14_div_34_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 22)(36, "label");
    i0.ɵɵtext(37, "Localisation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "input", 40);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r2.form);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("title").touched && ctx_r2.form.get("title").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("title").hasError("minlength"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("title").hasError("maxlength"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("description").touched && ctx_r2.form.get("description").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("description").hasError("minlength"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("description").hasError("maxlength"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("quantity").touched && ctx_r2.form.get("quantity").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("quantity").hasError("min"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("unit").touched && ctx_r2.form.get("unit").hasError("required"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("price").hasError("min"));
} }
function ListingCreate_div_15_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "La quantit\u00E9 cible est obligatoire");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_15_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "Doit \u00EAtre sup\u00E9rieure \u00E0 0");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_15_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtext(1, "La date limite est obligatoire");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33)(1, "h2");
    i0.ɵɵtext(2, "Param\u00E8tres de l'achat group\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 41);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(4, "svg", 42);
    i0.ɵɵelement(5, "circle", 43)(6, "line", 44)(7, "line", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " D\u00E9finissez la quantit\u00E9 cible et la date limite pour cet achat group\u00E9 ");
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(9, "div", 36)(10, "div", 22)(11, "label");
    i0.ɵɵtext(12, "Quantit\u00E9 cible *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 46);
    i0.ɵɵtemplate(14, ListingCreate_div_15_div_14_Template, 2, 0, "div", 26)(15, ListingCreate_div_15_div_15_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 22)(17, "label");
    i0.ɵɵtext(18, "Date limite *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 47);
    i0.ɵɵtemplate(20, ListingCreate_div_15_div_20_Template, 2, 0, "div", 26);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r2.form);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("targetQuantity").touched && ctx_r2.form.get("targetQuantity").hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("targetQuantity").hasError("min"));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.form.get("deadline").touched && ctx_r2.form.get("deadline").hasError("required"));
} }
function ListingCreate_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "h2");
    i0.ɵɵtext(2, "Images (optionnel)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 48);
    i0.ɵɵtext(4, "Ajoutez des URLs d'images pour illustrer votre annonce");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 22)(6, "label");
    i0.ɵɵtext(7, "URLs des images (une par ligne)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "textarea", 49);
    i0.ɵɵlistener("ngModelChange", function ListingCreate_div_16_Template_textarea_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.form.get("attachmentUrls").setValue($event.split("\n").filter(u => u.trim()))); });
    i0.ɵɵtext(9, "        ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngModel", (ctx_r2.form.get("attachmentUrls").value || i0.ɵɵpureFunction0(1, _c1)).join("\n"));
} }
function ListingCreate_div_17_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span");
    i0.ɵɵtext(2, "Prix");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r2.form.value.price, " TND");
} }
function ListingCreate_div_17_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span");
    i0.ɵɵtext(2, "Localisation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.form.value.location);
} }
function ListingCreate_div_17_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span");
    i0.ɵɵtext(2, "Quantit\u00E9 cible");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.form.value.targetQuantity);
} }
function ListingCreate_div_17_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span");
    i0.ɵɵtext(2, "Date limite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.form.value.deadline);
} }
function ListingCreate_div_17_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span");
    i0.ɵɵtext(2, "Images");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ctx_r2.form.value.attachmentUrls.length, " fichier(s)");
} }
function ListingCreate_div_17_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.error);
} }
function ListingCreate_div_17_span_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 42);
    i0.ɵɵelement(2, "polyline", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Publier l'annonce ");
    i0.ɵɵelementEnd();
} }
function ListingCreate_div_17_span_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 60);
} }
function ListingCreate_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "h2");
    i0.ɵɵtext(2, "R\u00E9capitulatif");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 50)(4, "div", 51)(5, "span");
    i0.ɵɵtext(6, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 51)(10, "span");
    i0.ɵɵtext(11, "Produit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 51)(15, "span");
    i0.ɵɵtext(16, "Titre");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 51)(20, "span");
    i0.ɵɵtext(21, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span", 52);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 51)(25, "span");
    i0.ɵɵtext(26, "Quantit\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "strong");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(29, ListingCreate_div_17_div_29_Template, 5, 1, "div", 53)(30, ListingCreate_div_17_div_30_Template, 5, 1, "div", 53)(31, ListingCreate_div_17_div_31_Template, 5, 1, "div", 53)(32, ListingCreate_div_17_div_32_Template, 5, 1, "div", 53)(33, ListingCreate_div_17_div_33_Template, 5, 1, "div", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(34, ListingCreate_div_17_div_34_Template, 2, 1, "div", 54);
    i0.ɵɵelementStart(35, "button", 55);
    i0.ɵɵlistener("click", function ListingCreate_div_17_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.submit()); });
    i0.ɵɵtemplate(36, ListingCreate_div_17_span_36_Template, 4, 0, "span", 56)(37, ListingCreate_div_17_span_37_Template, 1, 0, "span", 57);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.selectedType);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.selectedProduct == null ? null : ctx_r2.selectedProduct.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.form.value.title);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.form.value.description);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r2.form.value.quantity, " ", ctx_r2.form.value.unit);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.value.price);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.value.location);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.isGroupBuying);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.isGroupBuying);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.form.value.attachmentUrls == null ? null : ctx_r2.form.value.attachmentUrls.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.error);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.form.invalid || ctx_r2.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.submitting);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.submitting);
} }
function ListingCreate_div_18_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 64);
    i0.ɵɵlistener("click", function ListingCreate_div_18_button_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.nextStep()); });
    i0.ɵɵtext(1, " Suivant ");
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 4);
    i0.ɵɵelement(3, "line", 65)(4, "polyline", 66);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canGoNext);
} }
function ListingCreate_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 61)(1, "button", 62);
    i0.ɵɵlistener("click", function ListingCreate_div_18_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.prevStep()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 4);
    i0.ɵɵelement(3, "line", 5)(4, "polyline", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Pr\u00E9c\u00E9dent ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, ListingCreate_div_18_button_6_Template, 5, 1, "button", 63);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.step < ctx_r2.totalSteps);
} }
export class ListingCreate {
    fb;
    router;
    listingService;
    productService;
    authService;
    step = 1;
    totalSteps = 6;
    form;
    products = [];
    loading = false;
    submitting = false;
    error = '';
    companyId;
    selectedType = null;
    types = [
        { value: 'SURPLUS', label: 'Surplus', desc: 'Vous avez un excédent de matériaux à vendre', icon: '📦', color: '#059669' },
        { value: 'DEMANDE', label: 'Demande', desc: 'Vous recherchez des matériaux spécifiques', icon: '🔍', color: '#2563eb' },
        { value: 'GROUP_BUYING', label: 'Achat Groupé', desc: 'Créer un groupe d\'achat collectif', icon: '👥', color: '#d97706' }
    ];
    constructor(fb, router, listingService, productService, authService) {
        this.fb = fb;
        this.router = router;
        this.listingService = listingService;
        this.productService = productService;
        this.authService = authService;
    }
    ngOnInit() {
        const user = this.authService.currentUser;
        this.companyId = user ? parseInt(user.id, 10) : 0;
        this.form = this.fb.group({
            type: ['', Validators.required],
            productId: [null, Validators.required],
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
            quantity: [null, [Validators.required, Validators.min(1)]],
            unit: ['', Validators.required],
            price: [null, [Validators.min(0)]],
            location: [''],
            latitude: [null, [Validators.min(-90), Validators.max(90)]],
            longitude: [null, [Validators.min(-180), Validators.max(180)]],
            attachmentUrls: [[]],
            targetQuantity: [null],
            deadline: ['']
        });
        this.loadProducts();
    }
    loadProducts() {
        this.loading = true;
        this.productService.findAll().subscribe({
            next: (data) => { this.products = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }
    selectType(type) {
        this.selectedType = type;
        this.form.patchValue({ type });
        if (type === 'GROUP_BUYING') {
            this.form.get('targetQuantity').setValidators([Validators.required, Validators.min(1)]);
            this.form.get('deadline').setValidators([Validators.required]);
            this.totalSteps = 6;
        }
        else {
            this.form.get('targetQuantity').clearValidators();
            this.form.get('deadline').clearValidators();
            this.totalSteps = 5;
        }
        this.form.get('targetQuantity').updateValueAndValidity();
        this.form.get('deadline').updateValueAndValidity();
        this.nextStep();
    }
    get selectedProduct() {
        return this.products.find(p => p.idProduct === this.form.value.productId);
    }
    get isGroupBuying() {
        return this.selectedType === 'GROUP_BUYING';
    }
    get canGoNext() {
        switch (this.step) {
            case 1: return !!this.selectedType;
            case 2: return this.form.get('productId').valid;
            case 3: return this.form.get('title').valid && this.form.get('description').valid
                && this.form.get('quantity').valid && this.form.get('unit').valid;
            case 4:
                if (this.isGroupBuying) {
                    return this.form.get('targetQuantity').valid && this.form.get('deadline').valid;
                }
                return true;
            default: return true;
        }
    }
    nextStep() {
        if (this.step < this.totalSteps) {
            if (!this.isGroupBuying && this.step === 3) {
                this.step = 5;
            }
            else {
                this.step++;
            }
        }
    }
    prevStep() {
        if (this.step > 1) {
            if (!this.isGroupBuying && this.step === 5) {
                this.step = 3;
            }
            else {
                this.step--;
            }
        }
    }
    goToStep(s) {
        if (s <= this.step)
            this.step = s;
    }
    submit() {
        if (this.form.invalid)
            return;
        this.submitting = true;
        this.error = '';
        const val = this.form.value;
        const body = {
            ...val,
            companyId: this.companyId,
            attachmentUrls: val.attachmentUrls?.length ? val.attachmentUrls : undefined,
            targetQuantity: this.isGroupBuying ? val.targetQuantity : undefined,
            deadline: this.isGroupBuying ? val.deadline : undefined,
            price: val.price ?? undefined,
            location: val.location || undefined,
            latitude: val.latitude ?? undefined,
            longitude: val.longitude ?? undefined
        };
        this.listingService.create(body).subscribe({
            next: (res) => {
                this.submitting = false;
                this.router.navigate(['/enterprise/annonces', res.id]);
            },
            error: (err) => {
                this.error = err.error?.message || 'Erreur lors de la création';
                this.submitting = false;
            }
        });
    }
    static ɵfac = function ListingCreate_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ListingCreate)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.ResourceListingService), i0.ɵɵdirectiveInject(i4.ProductAnnoncesService), i0.ɵɵdirectiveInject(i5.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListingCreate, selectors: [["app-listing-create"]], standalone: false, decls: 19, vars: 9, consts: [[1, "page-wrapper"], [1, "lc-page"], [1, "lc-back"], ["routerLink", "/enterprise/annonces", 1, "btn", "btn-ghost", "btn-sm"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "19", "y1", "12", "x2", "5", "y2", "12"], ["points", "12 19 5 12 12 5"], [1, "lc-heading"], [1, "lc-steps"], ["class", "lc-step", 3, "active", "done", "hidden", "click", 4, "ngFor", "ngForOf"], ["class", "lc-card", 4, "ngIf"], ["class", "lc-card", 3, "formGroup", 4, "ngIf"], ["class", "lc-nav", 4, "ngIf"], [1, "lc-step", 3, "click"], [1, "lc-step-num"], ["class", "lc-step-label", 4, "ngIf"], [1, "lc-step-label"], [1, "lc-card"], [1, "lc-type-grid"], ["class", "lc-type-card", 3, "selected", "borderColor", "click", 4, "ngFor", "ngForOf"], [1, "lc-type-card", 3, "click"], [1, "lc-type-icon"], [1, "form-group"], [1, "lc-select", 3, "ngModelChange", "ngModel"], ["disabled", "", 3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["class", "form-error", 4, "ngIf"], ["class", "lc-product-preview", 4, "ngIf"], [3, "ngValue"], [1, "form-error"], [1, "lc-product-preview"], [1, "lc-pp-row"], ["class", "lc-pp-row", 4, "ngIf"], [1, "lc-card", 3, "formGroup"], ["type", "text", "formControlName", "title", "placeholder", "Ex: Lot d'aluminium recycl\u00E9 2T"], ["formControlName", "description", "rows", "4", "placeholder", "D\u00E9crivez votre annonce en d\u00E9tail..."], [1, "form-row"], ["type", "number", "formControlName", "quantity", "placeholder", "Ex: 2000", "min", "1"], ["type", "text", "formControlName", "unit", "placeholder", "Ex: kg, tonnes, pi\u00E8ces"], ["type", "number", "formControlName", "price", "placeholder", "Optionnel", "min", "0", "step", "0.01"], ["type", "text", "formControlName", "location", "placeholder", "Ex: Tunis, Sfax..."], [1, "lc-group-info"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], ["type", "number", "formControlName", "targetQuantity", "placeholder", "Ex: 5000", "min", "1"], ["type", "datetime-local", "formControlName", "deadline"], [1, "lc-hint"], ["rows", "4", "placeholder", "https://exemple.com/image1.jpg\nhttps://exemple.com/image2.jpg", 3, "ngModelChange", "ngModel"], [1, "lc-recap"], [1, "lc-recap-row"], [1, "lc-recap-desc"], ["class", "lc-recap-row", 4, "ngIf"], ["class", "alert alert-danger", 4, "ngIf"], [1, "btn", "btn-primary", "lc-submit", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", 4, "ngIf"], [1, "alert", "alert-danger"], ["points", "20 6 9 17 4 12"], [1, "spinner-sm"], [1, "lc-nav"], [1, "btn", "btn-outline", 3, "click"], ["class", "btn btn-primary", 3, "disabled", "click", 4, "ngIf"], [1, "btn", "btn-primary", 3, "click", "disabled"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function ListingCreate_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "a", 3);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(4, "svg", 4);
            i0.ɵɵelement(5, "line", 5)(6, "polyline", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(7, " Retour aux annonces ");
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(8, "h1", 7);
            i0.ɵɵtext(9, "Publier une annonce");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 8);
            i0.ɵɵtemplate(11, ListingCreate_div_11_Template, 9, 13, "div", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(12, ListingCreate_div_12_Template, 5, 1, "div", 10)(13, ListingCreate_div_13_Template, 12, 5, "div", 10)(14, ListingCreate_div_14_Template, 39, 11, "div", 11)(15, ListingCreate_div_15_Template, 21, 4, "div", 11)(16, ListingCreate_div_16_Template, 10, 2, "div", 10)(17, ListingCreate_div_17_Template, 38, 15, "div", 10)(18, ListingCreate_div_18_Template, 7, 1, "div", 12);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(8, _c0));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === 2);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === 3);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === 4 && ctx.isGroupBuying);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === 5);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === (ctx.isGroupBuying ? 6 : 5) && ctx.step === ctx.totalSteps);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step > 1);
        } }, dependencies: [i6.NgForOf, i6.NgIf, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.NgModel, i1.FormGroupDirective, i1.FormControlName, i2.RouterLink], styles: [".lc-page[_ngcontent-%COMP%]{max-width:680px;margin:0 auto}\n.lc-back[_ngcontent-%COMP%]{margin-bottom:16px}\n.lc-heading[_ngcontent-%COMP%]{font-size:24px;font-weight:800;color:var(--text);margin-bottom:22px;letter-spacing:-.04em}\n.lc-steps[_ngcontent-%COMP%]{display:flex;gap:4px;margin-bottom:26px;overflow-x:auto;padding-bottom:4px}\n.lc-step[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:10px;cursor:pointer;transition:all .15s;flex-shrink:0}\n.lc-step.hidden[_ngcontent-%COMP%]{display:none}\n.lc-step-num[_ngcontent-%COMP%]{width:28px;height:28px;border-radius:50%;border:2px solid var(--bg3,#e2e8f0);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--text3);transition:all .2s;background:transparent}\n.lc-step.active[_ngcontent-%COMP%]   .lc-step-num[_ngcontent-%COMP%]{background:var(--primary);border-color:var(--primary);color:#fff;box-shadow:0 2px 8px rgba(2,132,199,.2)}\n.lc-step.done[_ngcontent-%COMP%]   .lc-step-num[_ngcontent-%COMP%]{background:#059669;border-color:#059669;color:#fff}\n.lc-step-label[_ngcontent-%COMP%]{font-size:12px;color:var(--text3);font-weight:500}\n.lc-step.active[_ngcontent-%COMP%]   .lc-step-label[_ngcontent-%COMP%]{color:var(--text);font-weight:700}\n.lc-card[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;padding:28px;margin-bottom:16px;animation:_ngcontent-%COMP%_lcSlide .25s cubic-bezier(.4,0,.2,1);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.lc-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:17px;font-weight:700;color:var(--text);margin-bottom:18px;letter-spacing:-.02em}\n.lc-type-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}\n.lc-type-card[_ngcontent-%COMP%]{padding:24px 16px;border:2px solid var(--bg3,#e2e8f0);border-radius:14px;cursor:pointer;transition:all .25s;text-align:center;background:var(--card)}\n.lc-type-card[_ngcontent-%COMP%]:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06)}\n.lc-type-card.selected[_ngcontent-%COMP%]{border-width:2px;background:var(--bg3,#f8fafc);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06)}\n.lc-type-icon[_ngcontent-%COMP%]{font-size:36px;display:block;margin-bottom:10px}\n.lc-type-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:15px;font-weight:700;margin-bottom:6px;letter-spacing:-.01em}\n.lc-type-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;color:var(--text3);line-height:1.45}\n.lc-select[_ngcontent-%COMP%]{width:100%;padding:12px 16px;background:var(--bg3,#f8fafc);border:1px solid transparent;border-radius:12px;font-size:14px;color:var(--text);outline:none;cursor:pointer;transition:all .2s}\n.lc-select[_ngcontent-%COMP%]:focus{border-color:var(--primary);background:var(--card);box-shadow:0 0 0 3px rgba(2,132,199,.08)}\n.lc-product-preview[_ngcontent-%COMP%]{margin-top:14px;padding:16px;background:var(--bg3,#f8fafc);border-radius:12px}\n.lc-pp-row[_ngcontent-%COMP%]{font-size:13px;color:var(--text2);margin-bottom:5px}\n.lc-pp-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--text3)}\n.lc-group-info[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:12px 16px;background:rgba(0,173,181,.06);border-radius:12px;font-size:13px;color:#009199;margin-bottom:18px;font-weight:500}\n.lc-hint[_ngcontent-%COMP%]{font-size:13px;color:var(--text3);margin-bottom:14px}\n.lc-recap[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px;margin-bottom:18px}\n.lc-recap-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start;padding:10px 14px;background:var(--bg3,#f8fafc);border-radius:10px;font-size:13px}\n.lc-recap-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--text3);font-weight:500}\n.lc-recap-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--text);text-align:right;max-width:60%}\n.lc-recap-desc[_ngcontent-%COMP%]{max-width:60%;text-align:right;color:var(--text2)!important;font-size:12px}\n.lc-submit[_ngcontent-%COMP%]{width:100%;justify-content:center;padding:14px;font-size:15px;display:flex;align-items:center;gap:8px;border-radius:14px;font-weight:700}\n.lc-nav[_ngcontent-%COMP%]{display:flex;justify-content:space-between;gap:10px}\n.spinner-sm[_ngcontent-%COMP%]{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:_ngcontent-%COMP%_spin .6s linear infinite;display:inline-block}\n@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}\n@keyframes _ngcontent-%COMP%_lcSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}\n@media(max-width:600px){.lc-type-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}.lc-steps[_ngcontent-%COMP%]{gap:2px}.lc-step[_ngcontent-%COMP%]{padding:6px 8px}.lc-step-label[_ngcontent-%COMP%]{display:none}.lc-card[_ngcontent-%COMP%]{padding:20px}.lc-recap-row[_ngcontent-%COMP%]{flex-direction:column;gap:2px}.lc-recap-row[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{text-align:left;max-width:100%}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListingCreate, [{
        type: Component,
        args: [{ selector: 'app-listing-create', standalone: false, template: "<div class=\"page-wrapper\">\n  <div class=\"lc-page\">\n    <div class=\"lc-back\">\n      <a routerLink=\"/enterprise/annonces\" class=\"btn btn-ghost btn-sm\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n        Retour aux annonces\n      </a>\n    </div>\n\n    <h1 class=\"lc-heading\">Publier une annonce</h1>\n\n    <!-- Step indicator -->\n    <div class=\"lc-steps\">\n      <div class=\"lc-step\" *ngFor=\"let s of [1,2,3,4,5,6]; let i = index\"\n           [class.active]=\"step === s\" [class.done]=\"step > s\"\n           [class.hidden]=\"!isGroupBuying && s === 4\"\n           (click)=\"goToStep(s)\">\n        <div class=\"lc-step-num\">{{step > s ? '\u2713' : s}}</div>\n        <span class=\"lc-step-label\" *ngIf=\"s===1\">Type</span>\n        <span class=\"lc-step-label\" *ngIf=\"s===2\">Produit</span>\n        <span class=\"lc-step-label\" *ngIf=\"s===3\">Infos</span>\n        <span class=\"lc-step-label\" *ngIf=\"s===4\">Groupe</span>\n        <span class=\"lc-step-label\" *ngIf=\"s===5\">Images</span>\n        <span class=\"lc-step-label\" *ngIf=\"s===6\">R\u00E9cap</span>\n      </div>\n    </div>\n\n    <!-- Step 1: Type -->\n    <div class=\"lc-card\" *ngIf=\"step === 1\">\n      <h2>Quel type d'annonce souhaitez-vous cr\u00E9er ?</h2>\n      <div class=\"lc-type-grid\">\n        <div class=\"lc-type-card\" *ngFor=\"let t of types\"\n             [class.selected]=\"selectedType === t.value\"\n             [style.borderColor]=\"selectedType === t.value ? t.color : ''\"\n             (click)=\"selectType(t.value)\">\n          <span class=\"lc-type-icon\">{{t.icon}}</span>\n          <h3 [style.color]=\"t.color\">{{t.label}}</h3>\n          <p>{{t.desc}}</p>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 2: Product -->\n    <div class=\"lc-card\" *ngIf=\"step === 2\">\n      <h2>S\u00E9lectionnez un produit</h2>\n      <div class=\"form-group\">\n        <label>Produit existant</label>\n        <select class=\"lc-select\" [ngModel]=\"form.get('productId')!.value\" (ngModelChange)=\"form.get('productId')!.setValue($event)\">\n          <option [ngValue]=\"null\" disabled>-- Choisir un produit --</option>\n          <option *ngFor=\"let p of products\" [ngValue]=\"p.idProduct\">{{p.name}} {{p.category ? '(' + p.category + ')' : ''}}</option>\n        </select>\n        <div class=\"form-error\" *ngIf=\"form.get('productId')!.touched && form.get('productId')!.invalid\">Veuillez s\u00E9lectionner un produit</div>\n      </div>\n      <div class=\"lc-product-preview\" *ngIf=\"selectedProduct\">\n        <div class=\"lc-pp-row\"><span>Nom :</span> <strong>{{selectedProduct.name}}</strong></div>\n        <div class=\"lc-pp-row\" *ngIf=\"selectedProduct.category\"><span>Cat\u00E9gorie :</span> {{selectedProduct.category}}</div>\n        <div class=\"lc-pp-row\" *ngIf=\"selectedProduct.description\"><span>Description :</span> {{selectedProduct.description}}</div>\n        <div class=\"lc-pp-row\"><span>Recyclable :</span> {{selectedProduct.recyclable ? 'Oui' : 'Non'}}</div>\n      </div>\n    </div>\n\n    <!-- Step 3: Info -->\n    <div class=\"lc-card\" *ngIf=\"step === 3\" [formGroup]=\"form\">\n      <h2>Informations de l'annonce</h2>\n      <div class=\"form-group\">\n        <label>Titre *</label>\n        <input type=\"text\" formControlName=\"title\" placeholder=\"Ex: Lot d'aluminium recycl\u00E9 2T\">\n        <div class=\"form-error\" *ngIf=\"form.get('title')!.touched && form.get('title')!.hasError('required')\">Le titre est obligatoire</div>\n        <div class=\"form-error\" *ngIf=\"form.get('title')!.hasError('minlength')\">Minimum 3 caract\u00E8res</div>\n        <div class=\"form-error\" *ngIf=\"form.get('title')!.hasError('maxlength')\">Maximum 255 caract\u00E8res</div>\n      </div>\n      <div class=\"form-group\">\n        <label>Description *</label>\n        <textarea formControlName=\"description\" rows=\"4\" placeholder=\"D\u00E9crivez votre annonce en d\u00E9tail...\"></textarea>\n        <div class=\"form-error\" *ngIf=\"form.get('description')!.touched && form.get('description')!.hasError('required')\">La description est obligatoire</div>\n        <div class=\"form-error\" *ngIf=\"form.get('description')!.hasError('minlength')\">Minimum 10 caract\u00E8res</div>\n        <div class=\"form-error\" *ngIf=\"form.get('description')!.hasError('maxlength')\">Maximum 2000 caract\u00E8res</div>\n      </div>\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Quantit\u00E9 *</label>\n          <input type=\"number\" formControlName=\"quantity\" placeholder=\"Ex: 2000\" min=\"1\">\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.touched && form.get('quantity')!.hasError('required')\">La quantit\u00E9 est obligatoire</div>\n          <div class=\"form-error\" *ngIf=\"form.get('quantity')!.hasError('min')\">La quantit\u00E9 doit \u00EAtre sup\u00E9rieure \u00E0 0</div>\n        </div>\n        <div class=\"form-group\">\n          <label>Unit\u00E9 *</label>\n          <input type=\"text\" formControlName=\"unit\" placeholder=\"Ex: kg, tonnes, pi\u00E8ces\">\n          <div class=\"form-error\" *ngIf=\"form.get('unit')!.touched && form.get('unit')!.hasError('required')\">L'unit\u00E9 est obligatoire</div>\n        </div>\n      </div>\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Prix (TND)</label>\n          <input type=\"number\" formControlName=\"price\" placeholder=\"Optionnel\" min=\"0\" step=\"0.01\">\n          <div class=\"form-error\" *ngIf=\"form.get('price')!.hasError('min')\">Le prix doit \u00EAtre positif</div>\n        </div>\n        <div class=\"form-group\">\n          <label>Localisation</label>\n          <input type=\"text\" formControlName=\"location\" placeholder=\"Ex: Tunis, Sfax...\">\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 4: Group Buying -->\n    <div class=\"lc-card\" *ngIf=\"step === 4 && isGroupBuying\" [formGroup]=\"form\">\n      <h2>Param\u00E8tres de l'achat group\u00E9</h2>\n      <div class=\"lc-group-info\">\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>\n        D\u00E9finissez la quantit\u00E9 cible et la date limite pour cet achat group\u00E9\n      </div>\n      <div class=\"form-row\">\n        <div class=\"form-group\">\n          <label>Quantit\u00E9 cible *</label>\n          <input type=\"number\" formControlName=\"targetQuantity\" placeholder=\"Ex: 5000\" min=\"1\">\n          <div class=\"form-error\" *ngIf=\"form.get('targetQuantity')!.touched && form.get('targetQuantity')!.hasError('required')\">La quantit\u00E9 cible est obligatoire</div>\n          <div class=\"form-error\" *ngIf=\"form.get('targetQuantity')!.hasError('min')\">Doit \u00EAtre sup\u00E9rieure \u00E0 0</div>\n        </div>\n        <div class=\"form-group\">\n          <label>Date limite *</label>\n          <input type=\"datetime-local\" formControlName=\"deadline\">\n          <div class=\"form-error\" *ngIf=\"form.get('deadline')!.touched && form.get('deadline')!.hasError('required')\">La date limite est obligatoire</div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Step 5: Images -->\n    <div class=\"lc-card\" *ngIf=\"step === 5\">\n      <h2>Images (optionnel)</h2>\n      <p class=\"lc-hint\">Ajoutez des URLs d'images pour illustrer votre annonce</p>\n      <div class=\"form-group\">\n        <label>URLs des images (une par ligne)</label>\n        <textarea rows=\"4\" placeholder=\"https://exemple.com/image1.jpg&#10;https://exemple.com/image2.jpg\"\n          [ngModel]=\"(form.get('attachmentUrls')!.value || []).join('\\n')\"\n          (ngModelChange)=\"form.get('attachmentUrls')!.setValue($event.split('\\n').filter(u => u.trim()))\">\n        </textarea>\n      </div>\n    </div>\n\n    <!-- Step 6: Recap -->\n    <div class=\"lc-card\" *ngIf=\"step === (isGroupBuying ? 6 : 5) && step === totalSteps\">\n      <h2>R\u00E9capitulatif</h2>\n      <div class=\"lc-recap\">\n        <div class=\"lc-recap-row\"><span>Type</span><strong>{{selectedType}}</strong></div>\n        <div class=\"lc-recap-row\"><span>Produit</span><strong>{{selectedProduct?.name}}</strong></div>\n        <div class=\"lc-recap-row\"><span>Titre</span><strong>{{form.value.title}}</strong></div>\n        <div class=\"lc-recap-row\"><span>Description</span><span class=\"lc-recap-desc\">{{form.value.description}}</span></div>\n        <div class=\"lc-recap-row\"><span>Quantit\u00E9</span><strong>{{form.value.quantity}} {{form.value.unit}}</strong></div>\n        <div class=\"lc-recap-row\" *ngIf=\"form.value.price\"><span>Prix</span><strong>{{form.value.price}} TND</strong></div>\n        <div class=\"lc-recap-row\" *ngIf=\"form.value.location\"><span>Localisation</span><strong>{{form.value.location}}</strong></div>\n        <div class=\"lc-recap-row\" *ngIf=\"isGroupBuying\"><span>Quantit\u00E9 cible</span><strong>{{form.value.targetQuantity}}</strong></div>\n        <div class=\"lc-recap-row\" *ngIf=\"isGroupBuying\"><span>Date limite</span><strong>{{form.value.deadline}}</strong></div>\n        <div class=\"lc-recap-row\" *ngIf=\"form.value.attachmentUrls?.length\"><span>Images</span><strong>{{form.value.attachmentUrls.length}} fichier(s)</strong></div>\n      </div>\n\n      <div class=\"alert alert-danger\" *ngIf=\"error\">{{error}}</div>\n\n      <button class=\"btn btn-primary lc-submit\" [disabled]=\"form.invalid || submitting\" (click)=\"submit()\">\n        <span *ngIf=\"!submitting\">\n          <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polyline points=\"20 6 9 17 4 12\"/></svg>\n          Publier l'annonce\n        </span>\n        <span *ngIf=\"submitting\" class=\"spinner-sm\"></span>\n      </button>\n    </div>\n\n    <!-- Navigation -->\n    <div class=\"lc-nav\" *ngIf=\"step > 1\">\n      <button class=\"btn btn-outline\" (click)=\"prevStep()\">\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"/><polyline points=\"12 19 5 12 12 5\"/></svg>\n        Pr\u00E9c\u00E9dent\n      </button>\n      <button class=\"btn btn-primary\" *ngIf=\"step < totalSteps\" [disabled]=\"!canGoNext\" (click)=\"nextStep()\">\n        Suivant\n        <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/><polyline points=\"12 5 19 12 12 19\"/></svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".lc-page{max-width:680px;margin:0 auto}\n.lc-back{margin-bottom:16px}\n.lc-heading{font-size:24px;font-weight:800;color:var(--text);margin-bottom:22px;letter-spacing:-.04em}\n.lc-steps{display:flex;gap:4px;margin-bottom:26px;overflow-x:auto;padding-bottom:4px}\n.lc-step{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:10px;cursor:pointer;transition:all .15s;flex-shrink:0}\n.lc-step.hidden{display:none}\n.lc-step-num{width:28px;height:28px;border-radius:50%;border:2px solid var(--bg3,#e2e8f0);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--text3);transition:all .2s;background:transparent}\n.lc-step.active .lc-step-num{background:var(--primary);border-color:var(--primary);color:#fff;box-shadow:0 2px 8px rgba(2,132,199,.2)}\n.lc-step.done .lc-step-num{background:#059669;border-color:#059669;color:#fff}\n.lc-step-label{font-size:12px;color:var(--text3);font-weight:500}\n.lc-step.active .lc-step-label{color:var(--text);font-weight:700}\n.lc-card{background:var(--card);border-radius:16px;padding:28px;margin-bottom:16px;animation:lcSlide .25s cubic-bezier(.4,0,.2,1);box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.lc-card h2{font-size:17px;font-weight:700;color:var(--text);margin-bottom:18px;letter-spacing:-.02em}\n.lc-type-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}\n.lc-type-card{padding:24px 16px;border:2px solid var(--bg3,#e2e8f0);border-radius:14px;cursor:pointer;transition:all .25s;text-align:center;background:var(--card)}\n.lc-type-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06)}\n.lc-type-card.selected{border-width:2px;background:var(--bg3,#f8fafc);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.06)}\n.lc-type-icon{font-size:36px;display:block;margin-bottom:10px}\n.lc-type-card h3{font-size:15px;font-weight:700;margin-bottom:6px;letter-spacing:-.01em}\n.lc-type-card p{font-size:12px;color:var(--text3);line-height:1.45}\n.lc-select{width:100%;padding:12px 16px;background:var(--bg3,#f8fafc);border:1px solid transparent;border-radius:12px;font-size:14px;color:var(--text);outline:none;cursor:pointer;transition:all .2s}\n.lc-select:focus{border-color:var(--primary);background:var(--card);box-shadow:0 0 0 3px rgba(2,132,199,.08)}\n.lc-product-preview{margin-top:14px;padding:16px;background:var(--bg3,#f8fafc);border-radius:12px}\n.lc-pp-row{font-size:13px;color:var(--text2);margin-bottom:5px}\n.lc-pp-row span{color:var(--text3)}\n.lc-group-info{display:flex;align-items:center;gap:8px;padding:12px 16px;background:rgba(0,173,181,.06);border-radius:12px;font-size:13px;color:#009199;margin-bottom:18px;font-weight:500}\n.lc-hint{font-size:13px;color:var(--text3);margin-bottom:14px}\n.lc-recap{display:flex;flex-direction:column;gap:6px;margin-bottom:18px}\n.lc-recap-row{display:flex;justify-content:space-between;align-items:flex-start;padding:10px 14px;background:var(--bg3,#f8fafc);border-radius:10px;font-size:13px}\n.lc-recap-row span{color:var(--text3);font-weight:500}\n.lc-recap-row strong{color:var(--text);text-align:right;max-width:60%}\n.lc-recap-desc{max-width:60%;text-align:right;color:var(--text2)!important;font-size:12px}\n.lc-submit{width:100%;justify-content:center;padding:14px;font-size:15px;display:flex;align-items:center;gap:8px;border-radius:14px;font-weight:700}\n.lc-nav{display:flex;justify-content:space-between;gap:10px}\n.spinner-sm{width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}\n@keyframes spin{to{transform:rotate(360deg)}}\n@keyframes lcSlide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}\n@media(max-width:600px){.lc-type-grid{grid-template-columns:1fr}.lc-steps{gap:2px}.lc-step{padding:6px 8px}.lc-step-label{display:none}.lc-card{padding:20px}.lc-recap-row{flex-direction:column;gap:2px}.lc-recap-row strong{text-align:left;max-width:100%}}\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.ResourceListingService }, { type: i4.ProductAnnoncesService }, { type: i5.AuthService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ListingCreate, { className: "ListingCreate", filePath: "src/app/features/annonces/listing-create/listing-create.ts", lineNumber: 15 }); })();
