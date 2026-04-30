import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/theme";
import * as i2 from "../../../core/services/auth";
import * as i3 from "../../../core/services/listing";
import * as i4 from "../../../core/services/transport.service";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
import * as i7 from "../../reservation-center/components/marketplace-insights/marketplace-insights.component";
import * as i8 from "@angular/router";
function Dashboard_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101)(1, "span", 102);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 103);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 104);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const t_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r1.price);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("up", t_r1.up)("dn", !t_r1.up);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r1.chg);
} }
function Dashboard_div_11_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 123);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 124);
    i0.ɵɵelement(2, "polyline", 125);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " VERIFIED ");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 105)(1, "div", 106);
    i0.ɵɵelement(2, "span", 107);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h1", 108);
    i0.ɵɵtext(5);
    i0.ɵɵelement(6, "br");
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 109);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 110)(12, "div", 111)(13, "div", 112);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 113);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "div", 114);
    i0.ɵɵelementStart(18, "span", 115);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, Dashboard_div_11_div_20_Template, 4, 0, "div", 116);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 117)(22, "button", 118);
    i0.ɵɵtext(23, "Contact Seller");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "button", 119);
    i0.ɵɵtext(25, "View Full Listing");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 120);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(27, "svg", 121);
    i0.ɵɵelement(28, "path", 122);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const s_r2 = ctx.$implicit;
    const i_r3 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", i_r3 === ctx_r3.currentSlide)("out", i_r3 !== ctx_r3.currentSlide);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", s_r2.tagColor);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", s_r2.tagColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", s_r2.tag, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", s_r2.title);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("color", s_r2.accentColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r2.titleAccent);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r2.sub);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("background", s_r2.coColor);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r2.initials);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r2.company);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r2.location);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2.verified);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", s_r2.btnColor);
} }
function Dashboard_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 126)(1, "span", 127);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 128);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const sp_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(sp_r5.k);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(sp_r5.v);
} }
function Dashboard_div_33_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 129);
    i0.ɵɵlistener("click", function Dashboard_div_33_Template_div_click_0_listener() { const i_r7 = i0.ɵɵrestoreView(_r6).index; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.goTo(i_r7)); });
    i0.ɵɵelement(1, "div", 130);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const i_r7 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", i_r7 === ctx_r3.currentSlide);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", i_r7 === ctx_r3.currentSlide ? ctx_r3.slideProgress : i_r7 < ctx_r3.currentSlide ? 100 : 0, "%");
} }
function Dashboard_button_51_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 131);
    i0.ɵɵlistener("click", function Dashboard_button_51_Template_button_click_0_listener() { const c_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.setCategory(c_r9.name)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "span", 132);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r9 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("on", ctx_r3.activeCategory === c_r9.name);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", c_r9.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(c_r9.count);
} }
function Dashboard_div_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 133)(1, "div", 134);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 135);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r10.val);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r10.lbl);
} }
function Dashboard_div_73_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 159);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 124);
    i0.ɵɵelement(2, "polyline", 125);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Verified ");
    i0.ɵɵelementEnd();
} }
function Dashboard_div_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 136);
    i0.ɵɵelement(1, "div", 137);
    i0.ɵɵelementStart(2, "div", 138)(3, "div", 139)(4, "span", 140);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 141);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 142);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 143);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 144);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 145)(15, "div", 146);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 147);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, Dashboard_div_73_span_19_Template, 4, 0, "span", 148);
    i0.ɵɵelementStart(20, "span", 149);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 150);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(23, "svg", 86);
    i0.ɵɵelement(24, "path", 151);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(26, "div", 152)(27, "div", 153)(28, "span", 154);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "span", 155);
    i0.ɵɵtext(31, "TND/T");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 156)(33, "button", 157);
    i0.ɵɵtext(34, "Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "button", 158);
    i0.ɵɵtext(36, "Contact Seller");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const l_r11 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassProp("bar-high", l_r11.match >= 90)("bar-mid", l_r11.match >= 75 && l_r11.match < 90)("bar-low", l_r11.match < 75);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(l_r11.id);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("high", l_r11.match >= 90)("mid", l_r11.match >= 75 && l_r11.match < 90)("low", l_r11.match < 75);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", l_r11.match, "% match");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(l_r11.time);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(l_r11.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(l_r11.sub);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(l_r11.initials);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(l_r11.company);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", l_r11.verified);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(l_r11.rating);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", l_r11.qty, " available ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(l_r11.price);
} }
function Dashboard_div_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 160);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 161);
    i0.ɵɵelement(2, "circle", 37)(3, "line", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "No listings match your filters");
    i0.ɵɵelementEnd()();
} }
function Dashboard_div_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 162);
    i0.ɵɵelement(1, "div", 163);
    i0.ɵɵelementStart(2, "div", 164);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 165);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const a_r12 = ctx.$implicit;
    i0.ɵɵclassProp("urgent", a_r12.level === "urgent")("warn", a_r12.level === "warn")("info", a_r12.level === "info");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(a_r12.text);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r12.label);
} }
function Dashboard_div_100_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 180);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 181);
    i0.ɵɵelement(2, "path", 182);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const l_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", l_r13.enq, " ");
} }
function Dashboard_div_100__svg_svg_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 183);
    i0.ɵɵelement(1, "polyline", 184)(2, "polyline", 185);
    i0.ɵɵelementEnd();
} }
function Dashboard_div_100_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 166);
    i0.ɵɵelement(1, "div", 167);
    i0.ɵɵelementStart(2, "div", 168)(3, "div", 169);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 170)(6, "span", 171);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 172);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(9, "svg", 173);
    i0.ɵɵelement(10, "path", 174)(11, "circle", 175);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, Dashboard_div_100_span_13_Template, 4, 1, "span", 176);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(14, "div", 177)(15, "span", 178);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, Dashboard_div_100__svg_svg_17_Template, 3, 0, "svg", 179);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const l_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassProp("dot-a", l_r13.status === "ACTIVE")("dot-p", l_r13.status === "PENDING");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(l_r13.title);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("s-a", l_r13.status === "ACTIVE")("s-p", l_r13.status === "PENDING");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(l_r13.status);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", l_r13.views, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", l_r13.enq > 0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(l_r13.price);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", l_r13.trend);
} }
function Dashboard_div_150_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 186);
    i0.ɵɵelement(1, "div", 187);
    i0.ɵɵelementStart(2, "div", 188)(3, "div", 189);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 190);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 191)(8, "div", 192);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 193);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const d_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassProp("transit", d_r14.status === "TRANSIT")("done", d_r14.status === "DELIVERED")("sched", d_r14.status === "SCHEDULED");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(d_r14.id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", d_r14.from, " \u2192 ", d_r14.to);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("transit", d_r14.status === "TRANSIT")("done", d_r14.status === "DELIVERED");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(d_r14.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(d_r14.eta);
} }
export class Dashboard {
    themeService;
    authService;
    listingService;
    transportService;
    isDark = false;
    user = null;
    activeCategory = 'All';
    searchQuery = '';
    currentSlide = 0;
    slideProgress = 0;
    subs = new Subscription();
    progressTimer;
    categories = [
        { name: 'All', count: 0 },
        { name: 'Metal', count: 0 },
        { name: 'Plastic', count: 0 },
        { name: 'Paper', count: 0 },
        { name: 'Glass', count: 0 },
        { name: 'Textile', count: 0 },
        { name: 'Chemical', count: 0 },
    ];
    ticker = [
        { name: 'AL SCRAP', price: '0', chg: '+0%', up: true },
        { name: 'PET', price: '0', chg: '+0%', up: true },
        { name: 'STEEL', price: '0', chg: '+0%', up: false },
        { name: 'CARDBOARD', price: '0', chg: '+0%', up: true },
        { name: 'GLASS', price: '0', chg: '+0%', up: false },
        { name: 'TEXTILE', price: '0', chg: '+0%', up: true },
        { name: 'COPPER', price: '0', chg: '+0%', up: true },
        { name: 'HDPE', price: '0', chg: '+0%', up: false },
        { name: 'STAINLESS', price: '0', chg: '+0%', up: true },
    ];
    get doubleTicker() { return [...this.ticker, ...this.ticker]; }
    heroSlides = [];
    get currentHero() { return this.heroSlides[this.currentSlide]; }
    get slideCounter() {
        return `${String(this.currentSlide + 1).padStart(2, '0')} / ${String(this.heroSlides.length).padStart(2, '0')}`;
    }
    quickStats = [
        { val: '0', lbl: 'Live Listings' },
        { val: '0', lbl: 'AI Matches' },
        { val: '0', lbl: 'Enquiries' },
        { val: '0', lbl: 'In Transit' },
        { val: '0', lbl: 'TND Balance' },
    ];
    listings = [];
    get filteredListings() {
        const q = this.searchQuery.trim().toLowerCase();
        let list = this.activeCategory === 'All'
            ? this.listings
            : this.listings.filter(l => l.category === this.activeCategory);
        if (q)
            list = list.filter(l => l.title.toLowerCase().includes(q) ||
                (l.company && l.company.toLowerCase().includes(q)) ||
                (l.sub && l.sub.toLowerCase().includes(q)));
        return list;
    }
    alerts = [
        { level: 'urgent', label: 'Reply', text: '5 new enquiries on Aluminum Scrap listing' },
        { level: 'warn', label: 'Apply', text: 'AI recommends raising Aluminum price by +13%' },
        { level: 'info', label: 'Track', text: 'Delivery DEL-1043 Sousse to Tunis in transit' },
    ];
    myListings = [];
    deliveries = [];
    goTo(i) { this.currentSlide = i; this.resetProgress(); }
    prev() { this.goTo((this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length); }
    next() { this.goTo((this.currentSlide + 1) % this.heroSlides.length); }
    setCategory(name) { this.activeCategory = name; }
    resetProgress() {
        clearInterval(this.progressTimer);
        this.slideProgress = 0;
        this.progressTimer = setInterval(() => {
            this.slideProgress += 100 / 120;
            if (this.slideProgress >= 100) {
                this.slideProgress = 100;
                clearInterval(this.progressTimer);
                setTimeout(() => this.next(), 200);
            }
        }, 50);
    }
    constructor(themeService, authService, listingService, transportService) {
        this.themeService = themeService;
        this.authService = authService;
        this.listingService = listingService;
        this.transportService = transportService;
    }
    ngOnInit() {
        this.subs.add(this.themeService.isDark$.subscribe(d => this.isDark = d));
        this.subs.add(this.authService.user$.subscribe(u => this.user = u));
        this.loadDashboardData();
    }
    loadDashboardData() {
        // Load all listings for marketplace
        this.listingService.getAllListings().subscribe(listings => {
            // Map listings to include template-compatible properties
            this.listings = listings.map(l => ({
                ...l,
                match: l.match || Math.floor(Math.random() * 30) + 70,
                enq: l.enquiries || Math.floor(Math.random() * 10),
                trend: Math.random() > 0.5,
                time: l.posted || 'Recently',
                initials: l.initials || (l.company ? l.company.substring(0, 2).toUpperCase() : 'UN'),
                verified: l.verified || Math.random() > 0.3,
                rating: l.rating || (4 + Math.random()).toFixed(1),
                priceDisplay: l.price ? l.price.toString() : '0',
                sub: l.sub || `${l.category} · Available`,
                specs: [
                    { k: 'QUANTITY', v: l.qty || 'Available' },
                    { k: 'CATEGORY', v: l.category },
                    { k: 'STATUS', v: l.status },
                    { k: 'PRICE', v: l.price ? l.price.toString() : '0' },
                    { k: 'DELIVERY', v: 'Available' }
                ],
                btnColor: this.getCategoryColor(l.category),
                tag: this.getCategoryTag(l.category),
                tagColor: this.getCategoryColor(l.category),
                titleAccent: this.getCategoryAccent(l.category),
                accentColor: this.getCategoryColor(l.category),
                coColor: this.getCategoryColor(l.category),
                location: 'Tunisia',
                matchColor: l.match >= 90 ? '#34d399' : l.match >= 75 ? '#f59e0b' : '#ef4444'
            }));
            this.heroSlides = this.listings.slice(0, 4);
            this.updateCategoriesCount(this.listings);
            this.quickStats[0].val = this.listings.length.toString();
            this.quickStats[1].val = Math.floor(this.listings.length * 0.05).toString();
            this.updateTicker(this.listings);
        });
        // Load my listings
        this.listingService.getMyListings().subscribe(myListings => {
            this.myListings = myListings.map(l => ({
                ...l,
                match: l.match || Math.floor(Math.random() * 30) + 70,
                enq: l.enquiries || Math.floor(Math.random() * 10),
                trend: Math.random() > 0.5,
                time: l.posted || 'Recently',
                initials: l.initials || (l.company ? l.company.substring(0, 2).toUpperCase() : 'UN'),
                verified: l.verified || Math.random() > 0.3,
                rating: l.rating || (4 + Math.random()).toFixed(1),
                priceDisplay: l.price ? l.price.toString() : '0',
                sub: l.sub || `${l.category} · Available`
            }));
            const activeCount = this.myListings.filter(l => l.status === 'active').length;
            this.quickStats[2].val = activeCount.toString();
        });
        // Load deliveries
        this.transportService.getEnterpriseDeliveries().subscribe(deliveries => {
            this.deliveries = deliveries;
            const inTransitCount = deliveries.filter(d => d.status === 'in-transit').length;
            this.quickStats[3].val = inTransitCount.toString();
        });
        // Load wallet transactions
        this.listingService.getWalletTransactions().subscribe(transactions => {
            const balance = transactions.reduce((sum, t) => sum + (t.positive ? t.amount : -t.amount), 0);
            this.quickStats[4].val = balance.toString();
        });
    }
    updateCategoriesCount(listings) {
        const categories = ['Metal', 'Plastic', 'Paper', 'Glass', 'Textile', 'Chemical'];
        this.categories[0].count = listings.length;
        categories.forEach((cat, index) => {
            const count = listings.filter(l => l.category === cat).length;
            this.categories[index + 1].count = count;
        });
    }
    updateTicker(listings) {
        const metalListings = listings.filter(l => l.category === 'Metal');
        const plasticListings = listings.filter(l => l.category === 'Plastic');
        if (metalListings.length > 0) {
            const avgPrice = metalListings.reduce((sum, l) => sum + l.price, 0) / metalListings.length;
            this.ticker[0].price = avgPrice.toFixed(0);
            this.ticker[2].price = (avgPrice * 0.65).toFixed(0);
        }
        if (plasticListings.length > 0) {
            const avgPrice = plasticListings.reduce((sum, l) => sum + l.price, 0) / plasticListings.length;
            this.ticker[1].price = avgPrice.toFixed(0);
            this.ticker[7].price = (avgPrice * 0.76).toFixed(0);
        }
        this.ticker.forEach(t => {
            const change = (Math.random() - 0.5) * 10;
            t.chg = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
            t.up = change >= 0;
        });
    }
    getCategoryColor(category) {
        const colors = {
            'Metal': '#0056d2',
            'Plastic': '#0a7c4f',
            'Paper': '#92400e',
            'Glass': '#4c1d95',
            'Textile': '#a78bfa',
            'Chemical': '#dc2626'
        };
        return colors[category] || '#6b7280';
    }
    getCategoryTag(category) {
        const tags = {
            'Metal': 'PREMIUM · HIGH GRADE',
            'Plastic': 'RECYCLED · ECO-FRIENDLY',
            'Paper': 'COMPRESSED · READY TO SHIP',
            'Glass': 'CLEAN · FOOD GRADE',
            'Textile': 'SORTED · QUALITY ASSURED',
            'Chemical': 'LAB TESTED · CERTIFIED'
        };
        return tags[category] || 'AVAILABLE · QUALITY CHECKED';
    }
    getCategoryAccent(category) {
        const accents = {
            'Metal': 'Grade A',
            'Plastic': 'Pellets',
            'Paper': 'Bales',
            'Glass': 'Cullet',
            'Textile': 'Bales',
            'Chemical': 'Pure'
        };
        return accents[category] || 'Premium';
    }
    ngAfterViewInit() { this.resetProgress(); }
    ngOnDestroy() { this.subs.unsubscribe(); clearInterval(this.progressTimer); }
    static ɵfac = function Dashboard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Dashboard)(i0.ɵɵdirectiveInject(i1.ThemeService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.ListingService), i0.ɵɵdirectiveInject(i4.TransportService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Dashboard, selectors: [["app-dashboard"]], standalone: false, decls: 151, vars: 24, consts: [[1, "ed"], [1, "ed-ticker"], [1, "ed-ticker-lbl"], [1, "ed-ticker-overflow"], [1, "ed-ticker-track"], ["class", "ed-tick", 4, "ngFor", "ngForOf"], [1, "ed-hero"], [1, "ed-hero-grid"], [1, "ed-hero-scan"], [1, "ed-slides-area"], ["class", "ed-slide", 3, "active", "out", 4, "ngFor", "ngForOf"], [1, "ed-hero-panel"], [1, "ed-panel-price-block"], [1, "ed-pprice-lbl"], [1, "ed-pprice-val"], [1, "ed-pprice-unit"], [1, "ed-pmatch-row"], [1, "ed-pmatch-lbl"], [1, "ed-pmatch-val"], [1, "ed-pmatch-bar-bg"], [1, "ed-pmatch-bar"], [1, "ed-pspecs"], ["class", "ed-pspec", 4, "ngFor", "ngForOf"], [1, "ed-ppanel-btn"], [1, "ed-hero-controls"], [1, "ed-dots"], ["class", "ed-dot", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "ed-hero-nav"], [1, "ed-nav-btn", 3, "click"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["points", "15 18 9 12 15 6"], ["points", "9 18 15 12 9 6"], [1, "ed-counter"], [1, "ed-below"], [1, "ed-search-row"], [1, "ed-search-field"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", 1, "ed-search-ico"], ["cx", "11", "cy", "11", "r", "8"], ["x1", "21", "y1", "21", "x2", "16.65", "y2", "16.65"], ["type", "text", "placeholder", "Search materials \u2014 aluminum scrap, PET pellets, cardboard bales...", 1, "ed-search-input", 3, "ngModelChange", "ngModel"], [1, "ed-cats"], ["class", "ed-cat", 3, "on", "click", 4, "ngFor", "ngForOf"], [1, "ed-search-btn"], [1, "ed-stats-bar"], ["class", "ed-hstat", 4, "ngFor", "ngForOf"], [1, "ed-live"], [1, "ed-live-dot"], [1, "ed-body"], [1, "ed-main"], [1, "ed-sec-hd"], [1, "ed-sec-hd-l"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "12", "cy", "12", "r", "10"], ["points", "12 6 12 12 16 14"], [1, "ed-sec-title"], [1, "ed-sec-sub"], ["routerLink", "/enterprise/marketplace", 1, "ed-see-all"], [1, "ed-grid"], ["class", "ed-card", 4, "ngFor", "ngForOf"], ["class", "ed-empty", 4, "ngIf"], [1, "ed-side"], [1, "ed-panel"], [1, "ed-panel-hd"], [1, "ed-panel-hd-l"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], [1, "ed-panel-title"], [1, "ed-badge"], ["class", "ed-alert", 3, "urgent", "warn", "info", 4, "ngFor", "ngForOf"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2"], ["x1", "3", "y1", "9", "x2", "21", "y2", "9"], ["x1", "9", "y1", "21", "x2", "9", "y2", "9"], ["routerLink", "/enterprise/my-listings", 1, "ed-panel-link"], ["class", "ed-ml-row", "routerLink", "/enterprise/my-listings", 4, "ngFor", "ngForOf"], ["routerLink", "/enterprise/my-listings", 1, "ed-add-btn"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["x", "1", "y", "4", "width", "22", "height", "16", "rx", "2"], ["x1", "1", "y1", "10", "x2", "23", "y2", "10"], ["routerLink", "/enterprise/transactions", 1, "ed-panel-link"], [1, "ed-wallet"], [1, "ed-w-lbl"], [1, "ed-w-amt"], [1, "ed-w-meta"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0 1 10 0v4"], [1, "ed-w-note"], [1, "ed-w-bar"], [1, "ed-w-fill", 2, "width", "87%"], [1, "ed-w-btns"], [1, "ed-btn-ghost", 2, "flex", "1"], [1, "ed-btn-primary", 2, "flex", "1"], ["x", "1", "y", "3", "width", "15", "height", "13", "rx", "1"], ["d", "M16 8h4l3 3v5h-7V8z"], ["cx", "5.5", "cy", "18.5", "r", "2.5"], ["cx", "18.5", "cy", "18.5", "r", "2.5"], ["routerLink", "/enterprise/my-deliveries", 1, "ed-panel-link"], ["class", "ed-del", 4, "ngFor", "ngForOf"], [1, "ed-tick"], [1, "ed-tn"], [1, "ed-tp"], [1, "ed-tc"], [1, "ed-slide"], [1, "ed-slide-tag"], [1, "ed-tag-dot"], [1, "ed-slide-title"], [1, "ed-slide-sub"], [1, "ed-slide-meta"], [1, "ed-co"], [1, "ed-co-ava"], [1, "ed-co-name"], [1, "ed-co-sep"], [1, "ed-co-loc"], ["class", "ed-verified", 4, "ngIf"], [1, "ed-slide-btns"], [1, "ed-btn-pri"], [1, "ed-btn-sec"], [1, "ed-btn-ico"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"], [1, "ed-verified"], ["width", "9", "height", "9", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3", "stroke-linecap", "round"], ["points", "20 6 9 17 4 12"], [1, "ed-pspec"], [1, "ed-pspec-k"], [1, "ed-pspec-v"], [1, "ed-dot", 3, "click"], [1, "ed-dot-fill"], [1, "ed-cat", 3, "click"], [1, "ed-cat-n"], [1, "ed-hstat"], [1, "ed-hstat-v"], [1, "ed-hstat-l"], [1, "ed-card"], [1, "ed-card-bar"], [1, "ed-card-inner"], [1, "ed-card-top"], [1, "ed-card-id"], [1, "ed-match"], [1, "ed-card-time"], [1, "ed-card-title"], [1, "ed-card-sub"], [1, "ed-card-co"], [1, "ed-ava"], [1, "ed-co-name2"], ["class", "ed-verified2", 4, "ngIf"], [1, "ed-rating"], [1, "ed-card-qty"], ["d", "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"], [1, "ed-card-ft"], [1, "ed-price"], [1, "ed-price-v"], [1, "ed-price-u"], [1, "ed-card-btns"], [1, "ed-btn-ghost"], [1, "ed-btn-primary"], [1, "ed-verified2"], [1, "ed-empty"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], [1, "ed-alert"], [1, "ed-alert-dot"], [1, "ed-alert-text"], [1, "ed-alert-btn"], ["routerLink", "/enterprise/my-listings", 1, "ed-ml-row"], [1, "ed-ml-dot"], [1, "ed-ml-info"], [1, "ed-ml-title"], [1, "ed-ml-meta"], [1, "ed-ml-status"], [1, "ed-ml-stat"], ["width", "9", "height", "9", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["class", "ed-ml-enq", 4, "ngIf"], [1, "ed-ml-r"], [1, "ed-ml-price"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", "class", "ed-trend", 4, "ngIf"], [1, "ed-ml-enq"], ["width", "9", "height", "9", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"], ["width", "11", "height", "11", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round", 1, "ed-trend"], ["points", "23 6 13.5 15.5 8.5 10.5 1 18"], ["points", "17 6 23 6 23 12"], [1, "ed-del"], [1, "ed-del-bar"], [1, "ed-del-info"], [1, "ed-del-id"], [1, "ed-del-route"], [1, "ed-del-r"], [1, "ed-del-status"], [1, "ed-del-eta"]], template: function Dashboard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵtext(3, "LIVE PRICES");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3)(5, "div", 4);
            i0.ɵɵtemplate(6, Dashboard_div_6_Template, 7, 7, "div", 5);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(7, "div", 6);
            i0.ɵɵelement(8, "div", 7)(9, "div", 8);
            i0.ɵɵelementStart(10, "div", 9);
            i0.ɵɵtemplate(11, Dashboard_div_11_Template, 29, 22, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 11)(13, "div", 12)(14, "div", 13);
            i0.ɵɵtext(15, "ASKING PRICE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 14);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 15);
            i0.ɵɵtext(19, "TND PER TONNE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 16)(21, "span", 17);
            i0.ɵɵtext(22, "AI MATCH SCORE");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span", 18);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 19);
            i0.ɵɵelement(26, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 21);
            i0.ɵɵtemplate(28, Dashboard_div_28_Template, 5, 2, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "button", 23);
            i0.ɵɵtext(30, " Contact Seller ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 24)(32, "div", 25);
            i0.ɵɵtemplate(33, Dashboard_div_33_Template, 2, 4, "div", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 27)(35, "button", 28);
            i0.ɵɵlistener("click", function Dashboard_Template_button_click_35_listener() { return ctx.prev(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(36, "svg", 29);
            i0.ɵɵelement(37, "polyline", 30);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(38, "button", 28);
            i0.ɵɵlistener("click", function Dashboard_Template_button_click_38_listener() { return ctx.next(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(39, "svg", 29);
            i0.ɵɵelement(40, "polyline", 31);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(41, "div", 32);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "div", 33)(44, "div", 34)(45, "div", 35);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(46, "svg", 36);
            i0.ɵɵelement(47, "circle", 37)(48, "line", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(49, "input", 39);
            i0.ɵɵtwoWayListener("ngModelChange", function Dashboard_Template_input_ngModelChange_49_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 40);
            i0.ɵɵtemplate(51, Dashboard_button_51_Template, 4, 4, "button", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "button", 42);
            i0.ɵɵtext(53, "Search");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "div", 43);
            i0.ɵɵtemplate(55, Dashboard_div_55_Template, 5, 2, "div", 44);
            i0.ɵɵelementStart(56, "div", 45);
            i0.ɵɵelement(57, "div", 46);
            i0.ɵɵtext(58, " MARKET OPEN ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(59, "div", 47)(60, "div", 48)(61, "div", 49)(62, "div", 50);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(63, "svg", 51);
            i0.ɵɵelement(64, "circle", 52)(65, "polyline", 53);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(66, "span", 54);
            i0.ɵɵtext(67, "AI MATCHED FOR YOU");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "span", 55);
            i0.ɵɵtext(69, "\u00B7 sorted by compatibility score");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "a", 56);
            i0.ɵɵtext(71, "View all \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(72, "div", 57);
            i0.ɵɵtemplate(73, Dashboard_div_73_Template, 37, 23, "div", 58)(74, Dashboard_div_74_Template, 6, 0, "div", 59);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(75, "div", 60);
            i0.ɵɵelement(76, "app-marketplace-insights");
            i0.ɵɵelementStart(77, "div", 61)(78, "div", 62)(79, "div", 63);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(80, "svg", 51);
            i0.ɵɵelement(81, "path", 64)(82, "line", 65)(83, "line", 66);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(84, "span", 67);
            i0.ɵɵtext(85, "NEEDS ATTENTION");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(86, "span", 68);
            i0.ɵɵtext(87);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(88, Dashboard_div_88_Template, 6, 8, "div", 69);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(89, "div", 61)(90, "div", 62)(91, "div", 63);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(92, "svg", 51);
            i0.ɵɵelement(93, "rect", 70)(94, "line", 71)(95, "line", 72);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(96, "span", 67);
            i0.ɵɵtext(97, "MY LISTINGS");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(98, "a", 73);
            i0.ɵɵtext(99, "Manage \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(100, Dashboard_div_100_Template, 18, 14, "div", 74);
            i0.ɵɵelementStart(101, "button", 75);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(102, "svg", 76);
            i0.ɵɵelement(103, "line", 77)(104, "line", 78);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(105, " Post New Listing ");
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(106, "div", 61)(107, "div", 62)(108, "div", 63);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(109, "svg", 51);
            i0.ɵɵelement(110, "rect", 79)(111, "line", 80);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(112, "span", 67);
            i0.ɵɵtext(113, "WALLET");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(114, "a", 81);
            i0.ɵɵtext(115, "Transactions \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(116, "div", 82)(117, "div", 83);
            i0.ɵɵtext(118, "Available Balance");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(119, "div", 84);
            i0.ɵɵtext(120, "8,250 ");
            i0.ɵɵelementStart(121, "span");
            i0.ɵɵtext(122, "TND");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(123, "div", 85)(124, "span");
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(125, "svg", 86);
            i0.ɵɵelement(126, "rect", 87)(127, "path", 88);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(128, " 620 TND in escrow ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(129, "span", 89);
            i0.ɵɵtext(130, "Released on delivery");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(131, "div", 90);
            i0.ɵɵelement(132, "div", 91);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(133, "div", 92)(134, "button", 93);
            i0.ɵɵtext(135, "Withdraw");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(136, "button", 94);
            i0.ɵɵtext(137, "Top Up");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(138, "div", 61)(139, "div", 62)(140, "div", 63);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(141, "svg", 51);
            i0.ɵɵelement(142, "rect", 95)(143, "path", 96)(144, "circle", 97)(145, "circle", 98);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(146, "span", 67);
            i0.ɵɵtext(147, "ACTIVE DELIVERIES");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(148, "a", 99);
            i0.ɵɵtext(149, "All \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(150, Dashboard_div_150_Template, 12, 15, "div", 100);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.doubleTicker);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", ctx.heroSlides);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.currentHero.price);
            i0.ɵɵadvance(6);
            i0.ɵɵstyleProp("color", ctx.currentHero.matchColor);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("", ctx.currentHero.match, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("width", ctx.currentHero.match, "%")("background", ctx.currentHero.matchColor);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.currentHero.specs);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("background", ctx.currentHero.btnColor);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.heroSlides);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.slideCounter);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.categories);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.quickStats);
            i0.ɵɵadvance(18);
            i0.ɵɵproperty("ngForOf", ctx.filteredListings);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.filteredListings.length === 0);
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.alerts.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.alerts);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngForOf", ctx.myListings);
            i0.ɵɵadvance(50);
            i0.ɵɵproperty("ngForOf", ctx.deliveries);
        } }, dependencies: [i5.NgForOf, i5.NgIf, i6.DefaultValueAccessor, i6.NgControlStatus, i6.NgModel, i7.MarketplaceInsightsComponent, i8.RouterLink], styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   ENTERPRISE HOME \u2014 ViewEncapsulation.None\n   Styles are GLOBAL. body.dark-mode selector works.\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.ed { background:var(--bg); color:var(--text); font-family:'Space Grotesk',sans-serif; min-height:100%; --mono:'DM Mono','IBM Plex Mono',monospace; }\n\n/* \u2550\u2550 TICKER \u2550\u2550 */\n.ed-ticker { display:flex; align-items:center; height:30px; background:var(--bg2); border-bottom:1px solid var(--border); overflow:hidden; }\n.ed-ticker-lbl { font-family:var(--mono); font-size:8px; letter-spacing:1.2px; color:var(--text3); padding:0 12px; border-right:1px solid var(--border); height:100%; display:flex; align-items:center; flex-shrink:0; background:var(--bg3); }\n.ed-ticker-overflow { flex:1; overflow:hidden; }\n.ed-ticker-track { display:flex; width:max-content; animation:ed-tick 55s linear infinite; }\n.ed-ticker-track:hover { animation-play-state:paused; }\n@keyframes ed-tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }\n.ed-tick { display:flex; align-items:center; gap:6px; padding:0 16px; border-right:1px solid var(--border); height:30px; flex-shrink:0; }\n.ed-tn { font-family:var(--mono); font-size:9px; color:var(--text3); letter-spacing:.4px; }\n.ed-tp { font-family:var(--mono); font-size:10px; color:var(--text); font-weight:500; }\n.ed-tc { font-family:var(--mono); font-size:9px; font-weight:500; }\n.ed-tc.up { color:var(--success); }\n.ed-tc.dn { color:var(--danger); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   HERO \u2014 light mode: rich navy blue\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n.ed-hero {\n  position:relative; height:420px; overflow:hidden; display:flex;\n  /* LIGHT MODE default \u2014 deep navy blue */\n  background:#0f2d5c;\n  transition:background .4s ease;\n}\n\n/* DARK MODE hero \u2014 near black */\nbody.dark-mode .ed-hero {\n  background:#080c14;\n}\n\n/* animated grid */\n.ed-hero-grid {\n  position:absolute; inset:0; pointer-events:none;\n  background-size:48px 48px;\n  /* light: slightly more visible grid on blue */\n  background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);\n}\nbody.dark-mode .ed-hero-grid {\n  background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);\n}\n\n/* scan line */\n.ed-hero-scan {\n  position:absolute; top:0; bottom:0; width:1px; pointer-events:none;\n  background:linear-gradient(180deg,transparent,rgba(96,165,250,.6),transparent);\n  animation:ed-scan 7s ease-in-out infinite;\n}\nbody.dark-mode .ed-hero-scan {\n  background:linear-gradient(180deg,transparent,rgba(59,158,255,.5),transparent);\n}\n@keyframes ed-scan { 0%{left:-1%;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{left:101%;opacity:0} }\n\n/* \u2500\u2500 SLIDES \u2500\u2500 */\n.ed-slides-area { flex:1; position:relative; z-index:2; }\n.ed-slide {\n  position:absolute; inset:0;\n  display:flex; flex-direction:column; justify-content:center;\n  padding:40px 48px;\n  opacity:0; transform:translateX(32px);\n  transition:opacity .65s ease,transform .65s ease;\n  pointer-events:none;\n}\n.ed-slide.active { opacity:1; transform:translateX(0); pointer-events:auto; }\n.ed-slide.out    { opacity:0; transform:translateX(-32px); }\n\n.ed-slide-tag { display:inline-flex; align-items:center; gap:6px; font-family:var(--mono); font-size:9px; letter-spacing:1px; margin-bottom:14px; }\n.ed-tag-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; animation:ed-pdot 2s infinite; }\n@keyframes ed-pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.5)} }\n\n/* LIGHT: white text on navy */\n.ed-slide-title { font-family:'Syne',sans-serif; font-size:40px; font-weight:800; color:#ffffff; letter-spacing:-1.5px; line-height:1.05; margin-bottom:10px; }\n.ed-slide-sub   { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.55); margin-bottom:22px; letter-spacing:.3px; }\n\n.ed-slide-meta { display:flex; align-items:center; gap:10px; margin-bottom:26px; flex-wrap:wrap; }\n.ed-co         { display:flex; align-items:center; gap:8px; }\n.ed-co-ava     { width:28px; height:28px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-family:var(--mono); font-size:10px; font-weight:500; color:#fff; flex-shrink:0; }\n.ed-co-name    { font-size:12px; color:rgba(255,255,255,.88); font-weight:500; }\n.ed-co-sep     { width:1px; height:14px; background:rgba(255,255,255,.25); }\n.ed-co-loc     { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.5); letter-spacing:.3px; }\n.ed-verified   { display:flex; align-items:center; gap:3px; font-family:var(--mono); font-size:9px; color:#34d399; background:rgba(52,211,153,.15); padding:2px 8px; border-radius:3px; }\n\n.ed-slide-btns { display:flex; align-items:center; gap:8px; }\n.ed-btn-pri    { height:38px; padding:0 22px; color:#fff; border:none; border-radius:6px; font-family:var(--mono); font-size:11px; font-weight:500; cursor:pointer; letter-spacing:.3px; transition:filter .15s; }\n.ed-btn-pri:hover { filter:brightness(1.15); }\n/* LIGHT: clearly visible secondary button on navy */\n.ed-btn-sec    { height:38px; padding:0 16px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.3); border-radius:6px; font-family:var(--mono); font-size:11px; color:rgba(255,255,255,.85); cursor:pointer; transition:all .15s; }\n.ed-btn-sec:hover  { background:rgba(255,255,255,.22); border-color:rgba(255,255,255,.6); color:#fff; }\n.ed-btn-ico    { height:38px; width:38px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.25); border-radius:6px; color:rgba(255,255,255,.7); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .15s; }\n.ed-btn-ico:hover  { background:rgba(255,255,255,.18); border-color:rgba(255,255,255,.55); color:#fff; }\n\n/* DARK MODE adjustments for secondary buttons */\nbody.dark-mode .ed-btn-sec { background:rgba(255,255,255,.05); border-color:rgba(255,255,255,.15); color:rgba(255,255,255,.6); }\nbody.dark-mode .ed-btn-sec:hover { background:rgba(255,255,255,.12); border-color:rgba(255,255,255,.4); color:#fff; }\nbody.dark-mode .ed-btn-ico { background:transparent; border-color:rgba(255,255,255,.12); color:rgba(255,255,255,.45); }\n\n/* \u2500\u2500 RIGHT DATA PANEL \u2500\u2500 */\n.ed-hero-panel {\n  width:300px; flex-shrink:0; z-index:2;\n  display:flex; flex-direction:column; padding:22px 20px;\n  /* LIGHT: darker overlay on blue */\n  background:rgba(0,15,45,.35);\n  border-left:1px solid rgba(255,255,255,.12);\n  transition:background .4s,border-color .4s;\n}\nbody.dark-mode .ed-hero-panel {\n  background:rgba(255,255,255,.03);\n  border-left-color:rgba(255,255,255,.06);\n}\n\n.ed-panel-price-block {\n  border-bottom:1px solid rgba(255,255,255,.12);\n  padding-bottom:16px; margin-bottom:16px;\n}\nbody.dark-mode .ed-panel-price-block { border-bottom-color:rgba(255,255,255,.07); }\n\n.ed-pprice-lbl  { font-family:var(--mono); font-size:8px; letter-spacing:1px; color:rgba(255,255,255,.45); margin-bottom:6px; }\n.ed-pprice-val  { font-family:var(--mono); font-size:42px; font-weight:500; color:#ffffff; letter-spacing:-2px; line-height:1; }\n.ed-pprice-unit { font-family:var(--mono); font-size:11px; color:rgba(255,255,255,.45); margin-top:4px; }\n\n.ed-pmatch-row  { display:flex; align-items:center; justify-content:space-between; margin-top:14px; }\n.ed-pmatch-lbl  { font-family:var(--mono); font-size:8px; color:rgba(255,255,255,.4); letter-spacing:.5px; }\n.ed-pmatch-val  { font-family:var(--mono); font-size:14px; font-weight:500; }\n.ed-pmatch-bar-bg { height:3px; background:rgba(255,255,255,.12); border-radius:2px; margin-top:7px; overflow:hidden; }\nbody.dark-mode .ed-pmatch-bar-bg { background:rgba(255,255,255,.07); }\n.ed-pmatch-bar  { height:100%; border-radius:2px; transition:width .8s cubic-bezier(.4,0,.2,1),background .4s; }\n\n.ed-pspecs { display:flex; flex-direction:column; gap:9px; flex:1; margin-bottom:16px; }\n.ed-pspec  { display:flex; justify-content:space-between; align-items:center; }\n.ed-pspec-k { font-family:var(--mono); font-size:8px; color:rgba(255,255,255,.4); letter-spacing:.5px; }\n.ed-pspec-v { font-family:var(--mono); font-size:11px; color:rgba(255,255,255,.9); font-weight:500; }\nbody.dark-mode .ed-pspec-k { color:rgba(255,255,255,.28); }\nbody.dark-mode .ed-pspec-v { color:rgba(255,255,255,.78); }\n\n.ed-ppanel-btn { width:100%; height:36px; border:none; border-radius:5px; font-family:var(--mono); font-size:11px; font-weight:500; color:#fff; cursor:pointer; letter-spacing:.3px; transition:filter .15s; }\n.ed-ppanel-btn:hover { filter:brightness(1.15); }\n\n/* \u2500\u2500 CONTROLS BAR \u2500\u2500 */\n.ed-hero-controls {\n  position:absolute; bottom:0; left:0; right:0; height:46px;\n  display:flex; align-items:center; padding:0 48px; gap:14px; z-index:5;\n  /* LIGHT: dark blue-tinted bar */\n  background:rgba(0,10,35,.55);\n  border-top:1px solid rgba(255,255,255,.1);\n  transition:background .4s;\n}\nbody.dark-mode .ed-hero-controls {\n  background:rgba(0,0,0,.55);\n  border-top-color:rgba(255,255,255,.05);\n}\n\n.ed-dots { display:flex; gap:5px; }\n.ed-dot  { height:2px; border-radius:1px; cursor:pointer; transition:all .3s; position:relative; overflow:hidden; width:20px;\n  background:rgba(255,255,255,.25); }\n.ed-dot.active { width:40px; background:rgba(255,255,255,.4); }\nbody.dark-mode .ed-dot { background:rgba(255,255,255,.18); }\nbody.dark-mode .ed-dot.active { background:rgba(255,255,255,.28); }\n\n.ed-dot-fill { position:absolute; top:0; left:0; height:100%; background:#fff; border-radius:1px; transition:width .05s linear; }\n.ed-hero-nav { display:flex; gap:5px; margin-left:auto; }\n.ed-nav-btn  { width:28px; height:28px; border-radius:4px; background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .15s;\n  border:1px solid rgba(255,255,255,.22); color:rgba(255,255,255,.6); }\n.ed-nav-btn:hover { border-color:rgba(255,255,255,.6); color:#fff; }\nbody.dark-mode .ed-nav-btn { border-color:rgba(255,255,255,.12); color:rgba(255,255,255,.45); }\nbody.dark-mode .ed-nav-btn:hover { border-color:rgba(255,255,255,.35); color:#fff; }\n\n.ed-counter { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.4); letter-spacing:.5px; margin-left:8px; }\n\n/* \u2550\u2550 BELOW HERO \u2014 search + stats \u2550\u2550 */\n.ed-below { background:var(--bg2); border-bottom:1px solid var(--border); }\n.ed-search-row { display:flex; align-items:center; border-bottom:1px solid var(--border); }\n.ed-search-field { display:flex; align-items:center; gap:10px; flex:1; padding:0 18px; }\n.ed-search-ico { color:var(--text3); flex-shrink:0; }\n.ed-search-input { flex:1; border:none; outline:none; background:transparent; font-family:'Space Grotesk',sans-serif; font-size:14px; color:var(--text); padding:15px 0; }\n.ed-search-input::placeholder { color:var(--muted); }\n.ed-cats { display:flex; align-items:center; border-left:1px solid var(--border); border-right:1px solid var(--border); padding:0 6px; gap:1px; overflow-x:auto; flex-shrink:0; }\n.ed-cats::-webkit-scrollbar { display:none; }\n.ed-cat { padding:5px 10px; border-radius:5px; border:none; background:transparent; font-family:var(--mono); font-size:10px; color:var(--text3); cursor:pointer; white-space:nowrap; transition:all .12s; }\n.ed-cat:hover { background:var(--bg3); color:var(--text2); }\n.ed-cat.on { background:var(--primary); color:#fff; }\n.ed-cat-n { font-size:8px; opacity:.7; margin-left:3px; }\n.ed-search-btn { height:100%; min-height:50px; padding:0 30px; background:var(--primary); color:#fff; border:none; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; cursor:pointer; flex-shrink:0; transition:filter .15s; }\n.ed-search-btn:hover { filter:brightness(1.1); }\n\n.ed-stats-bar { display:flex; align-items:center; padding:10px 24px; }\n.ed-hstat { padding:6px 18px; border-right:1px solid var(--border); text-align:center; }\n.ed-hstat:first-child { padding-left:0; }\n.ed-hstat-v { font-family:var(--mono); font-size:16px; font-weight:500; color:var(--primary); line-height:1; margin-bottom:3px; }\n.ed-hstat-l { font-family:var(--mono); font-size:8px; letter-spacing:.6px; color:var(--text3); text-transform:uppercase; }\n.ed-live { display:flex; align-items:center; gap:6px; margin-left:auto; font-family:var(--mono); font-size:9px; color:var(--text3); letter-spacing:.5px; }\n.ed-live-dot { width:6px; height:6px; border-radius:50%; background:var(--success); animation:ed-pdot 2s infinite; }\n\n/* \u2550\u2550 BODY GRID \u2550\u2550 */\n.ed-body { display:grid; grid-template-columns:1fr 300px; min-height:500px; }\n.ed-main { padding:22px 24px; border-right:1px solid var(--border); background:var(--bg); }\n.ed-side { padding:16px; display:flex; flex-direction:column; gap:12px; background:var(--bg3); }\n\n.ed-sec-hd { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }\n.ed-sec-hd-l { display:flex; align-items:center; gap:7px; color:var(--text3); }\n.ed-sec-title { font-family:var(--mono); font-size:10px; font-weight:500; letter-spacing:.8px; color:var(--text); }\n.ed-sec-sub { font-family:var(--mono); font-size:10px; color:var(--text3); }\n.ed-see-all { font-family:var(--mono); font-size:11px; color:var(--primary); cursor:pointer; }\n.ed-see-all:hover { opacity:.75; }\n\n/* LISTING CARDS */\n.ed-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }\n.ed-card { background:var(--card); border:1px solid var(--border); border-radius:10px; overflow:hidden; cursor:pointer; transition:border-color .18s,transform .18s,box-shadow .18s; }\n.ed-card:hover { border-color:var(--primary); transform:translateY(-2px); box-shadow:0 8px 24px rgba(2,132,199,.1); }\n.ed-card-bar { height:2px; }\n.ed-card-bar.bar-high { background:var(--success); }\n.ed-card-bar.bar-mid  { background:var(--primary); }\n.ed-card-bar.bar-low  { background:var(--warning); }\n.ed-card-inner { padding:13px 14px; }\n.ed-card-top { display:flex; align-items:center; gap:8px; margin-bottom:8px; }\n.ed-card-id { font-family:var(--mono); font-size:9px; color:var(--text3); letter-spacing:.4px; }\n.ed-match { font-family:var(--mono); font-size:10px; font-weight:500; padding:2px 7px; border-radius:3px; }\n.ed-match.high { background:rgba(5,150,105,.1);  color:var(--success); }\n.ed-match.mid  { background:rgba(2,132,199,.1);  color:var(--primary); }\n.ed-match.low  { background:rgba(217,119,6,.1);  color:var(--warning); }\n.ed-card-time { margin-left:auto; font-family:var(--mono); font-size:9px; color:var(--text3); }\n.ed-card-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:var(--text); margin-bottom:3px; letter-spacing:-.2px; }\n.ed-card-sub   { font-family:var(--mono); font-size:10px; color:var(--text3); margin-bottom:10px; }\n.ed-card-co    { display:flex; align-items:center; gap:6px; margin-bottom:7px; }\n.ed-ava        { width:20px; height:20px; border-radius:4px; background:var(--primary); color:#fff; font-family:var(--mono); font-size:8px; font-weight:500; display:flex; align-items:center; justify-content:center; flex-shrink:0; }\n.ed-co-name2   { font-size:11px; color:var(--text2); }\n.ed-verified2  { display:flex; align-items:center; gap:3px; font-family:var(--mono); font-size:9px; color:var(--success); background:rgba(5,150,105,.08); padding:1px 6px; border-radius:3px; }\n.ed-rating     { margin-left:auto; font-family:var(--mono); font-size:10px; color:var(--text3); }\n.ed-card-qty   { display:flex; align-items:center; gap:5px; font-family:var(--mono); font-size:10px; color:var(--text3); margin-bottom:12px; }\n.ed-card-ft    { display:flex; align-items:center; justify-content:space-between; padding-top:11px; border-top:1px solid var(--border); }\n.ed-price      { display:flex; align-items:baseline; gap:4px; }\n.ed-price-v    { font-family:var(--mono); font-size:17px; font-weight:500; color:var(--primary); letter-spacing:-.5px; }\n.ed-price-u    { font-family:var(--mono); font-size:10px; color:var(--text3); }\n.ed-card-btns  { display:flex; gap:6px; }\n.ed-empty { grid-column:1/-1; display:flex; flex-direction:column; align-items:center; gap:10px; padding:48px 0; color:var(--text3); font-size:13px; }\n\n/* BUTTONS */\n.ed-btn-ghost   { height:28px; padding:0 12px; border:1px solid var(--border2); border-radius:5px; background:transparent; font-family:var(--mono); font-size:10px; color:var(--text2); cursor:pointer; transition:all .12s; }\n.ed-btn-ghost:hover { border-color:var(--primary); color:var(--primary); }\n.ed-btn-primary { height:28px; padding:0 13px; border:none; border-radius:5px; background:var(--primary); font-family:var(--mono); font-size:10px; font-weight:500; color:#fff; cursor:pointer; transition:filter .12s; }\n.ed-btn-primary:hover { filter:brightness(1.1); }\n\n/* SIDE PANELS */\n.ed-panel { background:var(--card); border:1px solid var(--border); border-radius:8px; overflow:hidden; }\n.ed-panel-hd { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-bottom:1px solid var(--border); background:var(--card2,var(--bg3)); }\n.ed-panel-hd-l { display:flex; align-items:center; gap:7px; color:var(--text3); }\n.ed-panel-title { font-family:var(--mono); font-size:9px; font-weight:500; letter-spacing:.8px; color:var(--text); }\n.ed-badge { width:19px; height:19px; border-radius:50%; background:var(--danger); color:#fff; font-family:var(--mono); font-size:10px; display:flex; align-items:center; justify-content:center; }\n.ed-panel-link { font-family:var(--mono); font-size:10px; color:var(--primary); cursor:pointer; }\n\n.ed-alert { display:flex; align-items:center; gap:10px; padding:9px 14px; border-bottom:1px solid var(--border); transition:background .12s; }\n.ed-alert:last-child { border:none; }\n.ed-alert:hover { background:var(--bg3); }\n.ed-alert.urgent { border-left:3px solid var(--danger); }\n.ed-alert.warn   { border-left:3px solid var(--warning); }\n.ed-alert.info   { border-left:3px solid var(--success); }\n.ed-alert-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }\n.ed-alert.urgent .ed-alert-dot { background:var(--danger); }\n.ed-alert.warn   .ed-alert-dot { background:var(--warning); }\n.ed-alert.info   .ed-alert-dot { background:var(--success); }\n.ed-alert-text { flex:1; font-size:11px; color:var(--text2); line-height:1.4; }\n.ed-alert-btn { padding:3px 8px; border:1px solid var(--border2); border-radius:4px; background:transparent; font-family:var(--mono); font-size:9px; color:var(--primary); cursor:pointer; flex-shrink:0; transition:all .12s; }\n.ed-alert-btn:hover { background:var(--primary); color:#fff; border-color:var(--primary); }\n\n.ed-ml-row { display:flex; align-items:center; gap:9px; padding:9px 14px; border-bottom:1px solid var(--border); cursor:pointer; transition:background .12s; }\n.ed-ml-row:hover { background:var(--bg3); }\n.ed-ml-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }\n.ed-ml-dot.dot-a { background:var(--success); box-shadow:0 0 5px var(--success); }\n.ed-ml-dot.dot-p { background:var(--warning); }\n.ed-ml-info { flex:1; min-width:0; }\n.ed-ml-title { font-size:11px; font-weight:600; color:var(--text); margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\n.ed-ml-meta { display:flex; align-items:center; gap:7px; }\n.ed-ml-status { font-family:var(--mono); font-size:9px; font-weight:500; padding:1px 6px; border-radius:3px; }\n.ed-ml-status.s-a { background:rgba(5,150,105,.1); color:var(--success); }\n.ed-ml-status.s-p { background:rgba(217,119,6,.1); color:var(--warning); }\n.ed-ml-stat,.ed-ml-enq { display:flex; align-items:center; gap:3px; font-family:var(--mono); font-size:9px; color:var(--text3); }\n.ed-ml-enq { color:var(--primary); }\n.ed-ml-r { display:flex; align-items:center; gap:6px; flex-shrink:0; }\n.ed-ml-price { font-family:var(--mono); font-size:12px; font-weight:500; color:var(--primary); }\n.ed-trend { color:var(--success); }\n.ed-add-btn { width:100%; padding:10px; border:none; border-top:1px dashed var(--border2); background:transparent; font-family:var(--mono); font-size:10px; color:var(--primary); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:background .12s; letter-spacing:.3px; }\n.ed-add-btn:hover { background:var(--bg); }\n\n.ed-wallet { padding:14px; }\n.ed-w-lbl { font-family:var(--mono); font-size:9px; text-transform:uppercase; letter-spacing:.6px; color:var(--text3); margin-bottom:5px; }\n.ed-w-amt { font-family:var(--mono); font-size:28px; font-weight:500; color:var(--text); letter-spacing:-1px; line-height:1; margin-bottom:7px; }\n.ed-w-amt span { font-size:13px; color:var(--text3); font-weight:400; }\n.ed-w-meta { display:flex; justify-content:space-between; align-items:center; font-family:var(--mono); font-size:10px; color:var(--text3); margin-bottom:10px; gap:4px; }\n.ed-w-meta>span:first-child { display:flex; align-items:center; gap:4px; }\n.ed-w-note { font-size:9px; opacity:.6; }\n.ed-w-bar { height:3px; background:var(--border); border-radius:2px; margin-bottom:12px; overflow:hidden; }\n.ed-w-fill { height:100%; background:var(--primary); border-radius:2px; }\n.ed-w-btns { display:flex; gap:7px; }\n\n.ed-del { display:flex; align-items:center; gap:10px; padding:10px 14px; border-bottom:1px solid var(--border); }\n.ed-del:last-child { border:none; }\n.ed-del-bar { width:3px; height:30px; border-radius:2px; flex-shrink:0; }\n.ed-del-bar.transit { background:var(--warning); }\n.ed-del-bar.done    { background:var(--success); }\n.ed-del-bar.sched   { background:var(--text3); }\n.ed-del-info { flex:1; }\n.ed-del-id    { font-family:var(--mono); font-size:11px; font-weight:500; color:var(--text); margin-bottom:2px; }\n.ed-del-route { font-family:var(--mono); font-size:10px; color:var(--text3); }\n.ed-del-r     { text-align:right; flex-shrink:0; }\n.ed-del-status { font-family:var(--mono); font-size:9px; font-weight:500; color:var(--text3); margin-bottom:2px; }\n.ed-del-status.transit { color:var(--warning); }\n.ed-del-status.done    { color:var(--success); }\n.ed-del-eta   { font-family:var(--mono); font-size:10px; color:var(--text3); }\n\n/* \u2550\u2550 RESPONSIVE \u2550\u2550 */\n@media (max-width:1280px) { .ed-body{grid-template-columns:1fr 280px} .ed-hero{height:380px} .ed-hero-panel{width:270px} }\n@media (max-width:1024px) { .ed-hero-panel{display:none} .ed-body{grid-template-columns:1fr} .ed-side{display:grid;grid-template-columns:1fr 1fr} }\n@media (max-width:768px) { .ed-hero{height:320px} .ed-slide{padding:28px 20px} .ed-slide-title{font-size:28px} .ed-hero-controls{padding:0 20px} .ed-grid{grid-template-columns:1fr} .ed-main{padding:16px} .ed-side{grid-template-columns:1fr} }"], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Dashboard, [{
        type: Component,
        args: [{ selector: 'app-dashboard', standalone: false, encapsulation: ViewEncapsulation.None, template: "<div class=\"ed\">\n\n  <!-- \u2550\u2550 LIVE TICKER \u2550\u2550 -->\n  <div class=\"ed-ticker\">\n    <span class=\"ed-ticker-lbl\">LIVE PRICES</span>\n    <div class=\"ed-ticker-overflow\">\n      <div class=\"ed-ticker-track\">\n        <div class=\"ed-tick\" *ngFor=\"let t of doubleTicker\">\n          <span class=\"ed-tn\">{{t.name}}</span>\n          <span class=\"ed-tp\">{{t.price}}</span>\n          <span class=\"ed-tc\" [class.up]=\"t.up\" [class.dn]=\"!t.up\">{{t.chg}}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- \u2550\u2550 HERO \u2550\u2550 -->\n  <div class=\"ed-hero\">\n    <div class=\"ed-hero-grid\"></div>\n    <div class=\"ed-hero-scan\"></div>\n\n    <!-- SLIDES -->\n    <div class=\"ed-slides-area\">\n      <div class=\"ed-slide\"\n        *ngFor=\"let s of heroSlides; let i = index\"\n        [class.active]=\"i === currentSlide\"\n        [class.out]=\"i !== currentSlide\">\n\n        <div class=\"ed-slide-tag\" [style.color]=\"s.tagColor\">\n          <span class=\"ed-tag-dot\" [style.background]=\"s.tagColor\"></span>\n          {{s.tag}}\n        </div>\n\n        <h1 class=\"ed-slide-title\">\n          {{s.title}}<br>\n          <span [style.color]=\"s.accentColor\">{{s.titleAccent}}</span>\n        </h1>\n\n        <div class=\"ed-slide-sub\">{{s.sub}}</div>\n\n        <div class=\"ed-slide-meta\">\n          <div class=\"ed-co\">\n            <div class=\"ed-co-ava\" [style.background]=\"s.coColor\">{{s.initials}}</div>\n            <span class=\"ed-co-name\">{{s.company}}</span>\n            <div class=\"ed-co-sep\"></div>\n            <span class=\"ed-co-loc\">{{s.location}}</span>\n          </div>\n          <div class=\"ed-verified\" *ngIf=\"s.verified\">\n            <svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg>\n            VERIFIED\n          </div>\n        </div>\n\n        <div class=\"ed-slide-btns\">\n          <button class=\"ed-btn-pri\" [style.background]=\"s.btnColor\">Contact Seller</button>\n          <button class=\"ed-btn-sec\">View Full Listing</button>\n          <button class=\"ed-btn-ico\">\n            <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"/></svg>\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <!-- RIGHT DATA PANEL -->\n    <div class=\"ed-hero-panel\">\n      <div class=\"ed-panel-price-block\">\n        <div class=\"ed-pprice-lbl\">ASKING PRICE</div>\n        <div class=\"ed-pprice-val\">{{currentHero.price}}</div>\n        <div class=\"ed-pprice-unit\">TND PER TONNE</div>\n        <div class=\"ed-pmatch-row\">\n          <span class=\"ed-pmatch-lbl\">AI MATCH SCORE</span>\n          <span class=\"ed-pmatch-val\" [style.color]=\"currentHero.matchColor\">{{currentHero.match}}%</span>\n        </div>\n        <div class=\"ed-pmatch-bar-bg\">\n          <div class=\"ed-pmatch-bar\"\n            [style.width.%]=\"currentHero.match\"\n            [style.background]=\"currentHero.matchColor\">\n          </div>\n        </div>\n      </div>\n\n      <div class=\"ed-pspecs\">\n        <div class=\"ed-pspec\" *ngFor=\"let sp of currentHero.specs\">\n          <span class=\"ed-pspec-k\">{{sp.k}}</span>\n          <span class=\"ed-pspec-v\">{{sp.v}}</span>\n        </div>\n      </div>\n\n      <button class=\"ed-ppanel-btn\" [style.background]=\"currentHero.btnColor\">\n        Contact Seller\n      </button>\n    </div>\n\n    <!-- CONTROLS BAR -->\n    <div class=\"ed-hero-controls\">\n      <div class=\"ed-dots\">\n        <div class=\"ed-dot\"\n          *ngFor=\"let s of heroSlides; let i = index\"\n          [class.active]=\"i === currentSlide\"\n          (click)=\"goTo(i)\">\n          <div class=\"ed-dot-fill\"\n            [style.width.%]=\"i === currentSlide ? slideProgress : (i < currentSlide ? 100 : 0)\">\n          </div>\n        </div>\n      </div>\n\n      <div class=\"ed-hero-nav\">\n        <button class=\"ed-nav-btn\" (click)=\"prev()\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"><polyline points=\"15 18 9 12 15 6\"/></svg>\n        </button>\n        <button class=\"ed-nav-btn\" (click)=\"next()\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"><polyline points=\"9 18 15 12 9 6\"/></svg>\n        </button>\n      </div>\n      <div class=\"ed-counter\">{{slideCounter}}</div>\n    </div>\n  </div>\n\n  <!-- \u2550\u2550 SEARCH + STATS \u2550\u2550 -->\n  <div class=\"ed-below\">\n    <div class=\"ed-search-row\">\n      <div class=\"ed-search-field\">\n        <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" class=\"ed-search-ico\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/></svg>\n        <input type=\"text\" [(ngModel)]=\"searchQuery\" class=\"ed-search-input\"\n          placeholder=\"Search materials \u2014 aluminum scrap, PET pellets, cardboard bales...\"/>\n      </div>\n      <div class=\"ed-cats\">\n        <button class=\"ed-cat\" *ngFor=\"let c of categories\"\n          [class.on]=\"activeCategory === c.name\"\n          (click)=\"setCategory(c.name)\">\n          {{c.name}}<span class=\"ed-cat-n\">{{c.count}}</span>\n        </button>\n      </div>\n      <button class=\"ed-search-btn\">Search</button>\n    </div>\n\n    <div class=\"ed-stats-bar\">\n      <div class=\"ed-hstat\" *ngFor=\"let s of quickStats\">\n        <div class=\"ed-hstat-v\">{{s.val}}</div>\n        <div class=\"ed-hstat-l\">{{s.lbl}}</div>\n      </div>\n      <div class=\"ed-live\">\n        <div class=\"ed-live-dot\"></div>\n        MARKET OPEN\n      </div>\n    </div>\n  </div>\n\n  <!-- \u2550\u2550 LISTINGS BODY \u2550\u2550 -->\n  <div class=\"ed-body\">\n    <div class=\"ed-main\">\n      <div class=\"ed-sec-hd\">\n        <div class=\"ed-sec-hd-l\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>\n          <span class=\"ed-sec-title\">AI MATCHED FOR YOU</span>\n          <span class=\"ed-sec-sub\">\u00B7 sorted by compatibility score</span>\n        </div>\n        <a class=\"ed-see-all\" routerLink=\"/enterprise/marketplace\">View all \u2192</a>\n      </div>\n\n      <div class=\"ed-grid\">\n        <div class=\"ed-card\" *ngFor=\"let l of filteredListings\">\n          <div class=\"ed-card-bar\"\n            [class.bar-high]=\"l.match>=90\"\n            [class.bar-mid]=\"l.match>=75&&l.match<90\"\n            [class.bar-low]=\"l.match<75\">\n          </div>\n          <div class=\"ed-card-inner\">\n            <div class=\"ed-card-top\">\n              <span class=\"ed-card-id\">{{l.id}}</span>\n              <span class=\"ed-match\"\n                [class.high]=\"l.match>=90\"\n                [class.mid]=\"l.match>=75&&l.match<90\"\n                [class.low]=\"l.match<75\">{{l.match}}% match</span>\n              <span class=\"ed-card-time\">{{l.time}}</span>\n            </div>\n            <div class=\"ed-card-title\">{{l.title}}</div>\n            <div class=\"ed-card-sub\">{{l.sub}}</div>\n            <div class=\"ed-card-co\">\n              <div class=\"ed-ava\">{{l.initials}}</div>\n              <span class=\"ed-co-name2\">{{l.company}}</span>\n              <span class=\"ed-verified2\" *ngIf=\"l.verified\">\n                <svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg>\n                Verified\n              </span>\n              <span class=\"ed-rating\">{{l.rating}}</span>\n            </div>\n            <div class=\"ed-card-qty\">\n              <svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"/></svg>\n              {{l.qty}} available\n            </div>\n            <div class=\"ed-card-ft\">\n              <div class=\"ed-price\">\n                <span class=\"ed-price-v\">{{l.price}}</span>\n                <span class=\"ed-price-u\">TND/T</span>\n              </div>\n              <div class=\"ed-card-btns\">\n                <button class=\"ed-btn-ghost\">Details</button>\n                <button class=\"ed-btn-primary\">Contact Seller</button>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"ed-empty\" *ngIf=\"filteredListings.length === 0\">\n          <svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"/></svg>\n          <p>No listings match your filters</p>\n        </div>\n      </div>\n    </div>\n\n    <!-- SIDE PANELS -->\n    <div class=\"ed-side\">\n\n      <app-marketplace-insights></app-marketplace-insights>\n\n      <div class=\"ed-panel\">\n        <div class=\"ed-panel-hd\">\n          <div class=\"ed-panel-hd-l\">\n            <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>\n            <span class=\"ed-panel-title\">NEEDS ATTENTION</span>\n          </div>\n          <span class=\"ed-badge\">{{alerts.length}}</span>\n        </div>\n        <div class=\"ed-alert\" *ngFor=\"let a of alerts\"\n          [class.urgent]=\"a.level==='urgent'\"\n          [class.warn]=\"a.level==='warn'\"\n          [class.info]=\"a.level==='info'\">\n          <div class=\"ed-alert-dot\"></div>\n          <div class=\"ed-alert-text\">{{a.text}}</div>\n          <button class=\"ed-alert-btn\">{{a.label}}</button>\n        </div>\n      </div>\n\n      <div class=\"ed-panel\">\n        <div class=\"ed-panel-hd\">\n          <div class=\"ed-panel-hd-l\">\n            <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"/><line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"/></svg>\n            <span class=\"ed-panel-title\">MY LISTINGS</span>\n          </div>\n          <a class=\"ed-panel-link\" routerLink=\"/enterprise/my-listings\">Manage \u2192</a>\n        </div>\n        <div class=\"ed-ml-row\" *ngFor=\"let l of myListings\" routerLink=\"/enterprise/my-listings\">\n          <div class=\"ed-ml-dot\" [class.dot-a]=\"l.status==='ACTIVE'\" [class.dot-p]=\"l.status==='PENDING'\"></div>\n          <div class=\"ed-ml-info\">\n            <div class=\"ed-ml-title\">{{l.title}}</div>\n            <div class=\"ed-ml-meta\">\n              <span class=\"ed-ml-status\" [class.s-a]=\"l.status==='ACTIVE'\" [class.s-p]=\"l.status==='PENDING'\">{{l.status}}</span>\n              <span class=\"ed-ml-stat\">\n                <svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>\n                {{l.views}}\n              </span>\n              <span class=\"ed-ml-enq\" *ngIf=\"l.enq > 0\">\n                <svg width=\"9\" height=\"9\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/></svg>\n                {{l.enq}}\n              </span>\n            </div>\n          </div>\n          <div class=\"ed-ml-r\">\n            <span class=\"ed-ml-price\">{{l.price}}</span>\n            <svg *ngIf=\"l.trend\" width=\"11\" height=\"11\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" class=\"ed-trend\"><polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"/><polyline points=\"17 6 23 6 23 12\"/></svg>\n          </div>\n        </div>\n        <button class=\"ed-add-btn\" routerLink=\"/enterprise/my-listings\">\n          <svg width=\"11\" height=\"11\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"><line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/></svg>\n          Post New Listing\n        </button>\n      </div>\n\n      <div class=\"ed-panel\">\n        <div class=\"ed-panel-hd\">\n          <div class=\"ed-panel-hd-l\">\n            <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"1\" y=\"4\" width=\"22\" height=\"16\" rx=\"2\"/><line x1=\"1\" y1=\"10\" x2=\"23\" y2=\"10\"/></svg>\n            <span class=\"ed-panel-title\">WALLET</span>\n          </div>\n          <a class=\"ed-panel-link\" routerLink=\"/enterprise/transactions\">Transactions \u2192</a>\n        </div>\n        <div class=\"ed-wallet\">\n          <div class=\"ed-w-lbl\">Available Balance</div>\n          <div class=\"ed-w-amt\">8,250 <span>TND</span></div>\n          <div class=\"ed-w-meta\">\n            <span>\n              <svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg>\n              620 TND in escrow\n            </span>\n            <span class=\"ed-w-note\">Released on delivery</span>\n          </div>\n          <div class=\"ed-w-bar\"><div class=\"ed-w-fill\" style=\"width:87%\"></div></div>\n          <div class=\"ed-w-btns\">\n            <button class=\"ed-btn-ghost\" style=\"flex:1\">Withdraw</button>\n            <button class=\"ed-btn-primary\" style=\"flex:1\">Top Up</button>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"ed-panel\">\n        <div class=\"ed-panel-hd\">\n          <div class=\"ed-panel-hd-l\">\n            <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"1\" y=\"3\" width=\"15\" height=\"13\" rx=\"1\"/><path d=\"M16 8h4l3 3v5h-7V8z\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"/><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"/></svg>\n            <span class=\"ed-panel-title\">ACTIVE DELIVERIES</span>\n          </div>\n          <a class=\"ed-panel-link\" routerLink=\"/enterprise/my-deliveries\">All \u2192</a>\n        </div>\n        <div class=\"ed-del\" *ngFor=\"let d of deliveries\">\n          <div class=\"ed-del-bar\"\n            [class.transit]=\"d.status==='TRANSIT'\"\n            [class.done]=\"d.status==='DELIVERED'\"\n            [class.sched]=\"d.status==='SCHEDULED'\">\n          </div>\n          <div class=\"ed-del-info\">\n            <div class=\"ed-del-id\">{{d.id}}</div>\n            <div class=\"ed-del-route\">{{d.from}} \u2192 {{d.to}}</div>\n          </div>\n          <div class=\"ed-del-r\">\n            <div class=\"ed-del-status\"\n              [class.transit]=\"d.status==='TRANSIT'\"\n              [class.done]=\"d.status==='DELIVERED'\">{{d.status}}</div>\n            <div class=\"ed-del-eta\">{{d.eta}}</div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   ENTERPRISE HOME \u2014 ViewEncapsulation.None\n   Styles are GLOBAL. body.dark-mode selector works.\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.ed { background:var(--bg); color:var(--text); font-family:'Space Grotesk',sans-serif; min-height:100%; --mono:'DM Mono','IBM Plex Mono',monospace; }\n\n/* \u2550\u2550 TICKER \u2550\u2550 */\n.ed-ticker { display:flex; align-items:center; height:30px; background:var(--bg2); border-bottom:1px solid var(--border); overflow:hidden; }\n.ed-ticker-lbl { font-family:var(--mono); font-size:8px; letter-spacing:1.2px; color:var(--text3); padding:0 12px; border-right:1px solid var(--border); height:100%; display:flex; align-items:center; flex-shrink:0; background:var(--bg3); }\n.ed-ticker-overflow { flex:1; overflow:hidden; }\n.ed-ticker-track { display:flex; width:max-content; animation:ed-tick 55s linear infinite; }\n.ed-ticker-track:hover { animation-play-state:paused; }\n@keyframes ed-tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }\n.ed-tick { display:flex; align-items:center; gap:6px; padding:0 16px; border-right:1px solid var(--border); height:30px; flex-shrink:0; }\n.ed-tn { font-family:var(--mono); font-size:9px; color:var(--text3); letter-spacing:.4px; }\n.ed-tp { font-family:var(--mono); font-size:10px; color:var(--text); font-weight:500; }\n.ed-tc { font-family:var(--mono); font-size:9px; font-weight:500; }\n.ed-tc.up { color:var(--success); }\n.ed-tc.dn { color:var(--danger); }\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   HERO \u2014 light mode: rich navy blue\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n.ed-hero {\n  position:relative; height:420px; overflow:hidden; display:flex;\n  /* LIGHT MODE default \u2014 deep navy blue */\n  background:#0f2d5c;\n  transition:background .4s ease;\n}\n\n/* DARK MODE hero \u2014 near black */\nbody.dark-mode .ed-hero {\n  background:#080c14;\n}\n\n/* animated grid */\n.ed-hero-grid {\n  position:absolute; inset:0; pointer-events:none;\n  background-size:48px 48px;\n  /* light: slightly more visible grid on blue */\n  background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);\n}\nbody.dark-mode .ed-hero-grid {\n  background-image:linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px);\n}\n\n/* scan line */\n.ed-hero-scan {\n  position:absolute; top:0; bottom:0; width:1px; pointer-events:none;\n  background:linear-gradient(180deg,transparent,rgba(96,165,250,.6),transparent);\n  animation:ed-scan 7s ease-in-out infinite;\n}\nbody.dark-mode .ed-hero-scan {\n  background:linear-gradient(180deg,transparent,rgba(59,158,255,.5),transparent);\n}\n@keyframes ed-scan { 0%{left:-1%;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{left:101%;opacity:0} }\n\n/* \u2500\u2500 SLIDES \u2500\u2500 */\n.ed-slides-area { flex:1; position:relative; z-index:2; }\n.ed-slide {\n  position:absolute; inset:0;\n  display:flex; flex-direction:column; justify-content:center;\n  padding:40px 48px;\n  opacity:0; transform:translateX(32px);\n  transition:opacity .65s ease,transform .65s ease;\n  pointer-events:none;\n}\n.ed-slide.active { opacity:1; transform:translateX(0); pointer-events:auto; }\n.ed-slide.out    { opacity:0; transform:translateX(-32px); }\n\n.ed-slide-tag { display:inline-flex; align-items:center; gap:6px; font-family:var(--mono); font-size:9px; letter-spacing:1px; margin-bottom:14px; }\n.ed-tag-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; animation:ed-pdot 2s infinite; }\n@keyframes ed-pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.5)} }\n\n/* LIGHT: white text on navy */\n.ed-slide-title { font-family:'Syne',sans-serif; font-size:40px; font-weight:800; color:#ffffff; letter-spacing:-1.5px; line-height:1.05; margin-bottom:10px; }\n.ed-slide-sub   { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.55); margin-bottom:22px; letter-spacing:.3px; }\n\n.ed-slide-meta { display:flex; align-items:center; gap:10px; margin-bottom:26px; flex-wrap:wrap; }\n.ed-co         { display:flex; align-items:center; gap:8px; }\n.ed-co-ava     { width:28px; height:28px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-family:var(--mono); font-size:10px; font-weight:500; color:#fff; flex-shrink:0; }\n.ed-co-name    { font-size:12px; color:rgba(255,255,255,.88); font-weight:500; }\n.ed-co-sep     { width:1px; height:14px; background:rgba(255,255,255,.25); }\n.ed-co-loc     { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.5); letter-spacing:.3px; }\n.ed-verified   { display:flex; align-items:center; gap:3px; font-family:var(--mono); font-size:9px; color:#34d399; background:rgba(52,211,153,.15); padding:2px 8px; border-radius:3px; }\n\n.ed-slide-btns { display:flex; align-items:center; gap:8px; }\n.ed-btn-pri    { height:38px; padding:0 22px; color:#fff; border:none; border-radius:6px; font-family:var(--mono); font-size:11px; font-weight:500; cursor:pointer; letter-spacing:.3px; transition:filter .15s; }\n.ed-btn-pri:hover { filter:brightness(1.15); }\n/* LIGHT: clearly visible secondary button on navy */\n.ed-btn-sec    { height:38px; padding:0 16px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.3); border-radius:6px; font-family:var(--mono); font-size:11px; color:rgba(255,255,255,.85); cursor:pointer; transition:all .15s; }\n.ed-btn-sec:hover  { background:rgba(255,255,255,.22); border-color:rgba(255,255,255,.6); color:#fff; }\n.ed-btn-ico    { height:38px; width:38px; background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.25); border-radius:6px; color:rgba(255,255,255,.7); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .15s; }\n.ed-btn-ico:hover  { background:rgba(255,255,255,.18); border-color:rgba(255,255,255,.55); color:#fff; }\n\n/* DARK MODE adjustments for secondary buttons */\nbody.dark-mode .ed-btn-sec { background:rgba(255,255,255,.05); border-color:rgba(255,255,255,.15); color:rgba(255,255,255,.6); }\nbody.dark-mode .ed-btn-sec:hover { background:rgba(255,255,255,.12); border-color:rgba(255,255,255,.4); color:#fff; }\nbody.dark-mode .ed-btn-ico { background:transparent; border-color:rgba(255,255,255,.12); color:rgba(255,255,255,.45); }\n\n/* \u2500\u2500 RIGHT DATA PANEL \u2500\u2500 */\n.ed-hero-panel {\n  width:300px; flex-shrink:0; z-index:2;\n  display:flex; flex-direction:column; padding:22px 20px;\n  /* LIGHT: darker overlay on blue */\n  background:rgba(0,15,45,.35);\n  border-left:1px solid rgba(255,255,255,.12);\n  transition:background .4s,border-color .4s;\n}\nbody.dark-mode .ed-hero-panel {\n  background:rgba(255,255,255,.03);\n  border-left-color:rgba(255,255,255,.06);\n}\n\n.ed-panel-price-block {\n  border-bottom:1px solid rgba(255,255,255,.12);\n  padding-bottom:16px; margin-bottom:16px;\n}\nbody.dark-mode .ed-panel-price-block { border-bottom-color:rgba(255,255,255,.07); }\n\n.ed-pprice-lbl  { font-family:var(--mono); font-size:8px; letter-spacing:1px; color:rgba(255,255,255,.45); margin-bottom:6px; }\n.ed-pprice-val  { font-family:var(--mono); font-size:42px; font-weight:500; color:#ffffff; letter-spacing:-2px; line-height:1; }\n.ed-pprice-unit { font-family:var(--mono); font-size:11px; color:rgba(255,255,255,.45); margin-top:4px; }\n\n.ed-pmatch-row  { display:flex; align-items:center; justify-content:space-between; margin-top:14px; }\n.ed-pmatch-lbl  { font-family:var(--mono); font-size:8px; color:rgba(255,255,255,.4); letter-spacing:.5px; }\n.ed-pmatch-val  { font-family:var(--mono); font-size:14px; font-weight:500; }\n.ed-pmatch-bar-bg { height:3px; background:rgba(255,255,255,.12); border-radius:2px; margin-top:7px; overflow:hidden; }\nbody.dark-mode .ed-pmatch-bar-bg { background:rgba(255,255,255,.07); }\n.ed-pmatch-bar  { height:100%; border-radius:2px; transition:width .8s cubic-bezier(.4,0,.2,1),background .4s; }\n\n.ed-pspecs { display:flex; flex-direction:column; gap:9px; flex:1; margin-bottom:16px; }\n.ed-pspec  { display:flex; justify-content:space-between; align-items:center; }\n.ed-pspec-k { font-family:var(--mono); font-size:8px; color:rgba(255,255,255,.4); letter-spacing:.5px; }\n.ed-pspec-v { font-family:var(--mono); font-size:11px; color:rgba(255,255,255,.9); font-weight:500; }\nbody.dark-mode .ed-pspec-k { color:rgba(255,255,255,.28); }\nbody.dark-mode .ed-pspec-v { color:rgba(255,255,255,.78); }\n\n.ed-ppanel-btn { width:100%; height:36px; border:none; border-radius:5px; font-family:var(--mono); font-size:11px; font-weight:500; color:#fff; cursor:pointer; letter-spacing:.3px; transition:filter .15s; }\n.ed-ppanel-btn:hover { filter:brightness(1.15); }\n\n/* \u2500\u2500 CONTROLS BAR \u2500\u2500 */\n.ed-hero-controls {\n  position:absolute; bottom:0; left:0; right:0; height:46px;\n  display:flex; align-items:center; padding:0 48px; gap:14px; z-index:5;\n  /* LIGHT: dark blue-tinted bar */\n  background:rgba(0,10,35,.55);\n  border-top:1px solid rgba(255,255,255,.1);\n  transition:background .4s;\n}\nbody.dark-mode .ed-hero-controls {\n  background:rgba(0,0,0,.55);\n  border-top-color:rgba(255,255,255,.05);\n}\n\n.ed-dots { display:flex; gap:5px; }\n.ed-dot  { height:2px; border-radius:1px; cursor:pointer; transition:all .3s; position:relative; overflow:hidden; width:20px;\n  background:rgba(255,255,255,.25); }\n.ed-dot.active { width:40px; background:rgba(255,255,255,.4); }\nbody.dark-mode .ed-dot { background:rgba(255,255,255,.18); }\nbody.dark-mode .ed-dot.active { background:rgba(255,255,255,.28); }\n\n.ed-dot-fill { position:absolute; top:0; left:0; height:100%; background:#fff; border-radius:1px; transition:width .05s linear; }\n.ed-hero-nav { display:flex; gap:5px; margin-left:auto; }\n.ed-nav-btn  { width:28px; height:28px; border-radius:4px; background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .15s;\n  border:1px solid rgba(255,255,255,.22); color:rgba(255,255,255,.6); }\n.ed-nav-btn:hover { border-color:rgba(255,255,255,.6); color:#fff; }\nbody.dark-mode .ed-nav-btn { border-color:rgba(255,255,255,.12); color:rgba(255,255,255,.45); }\nbody.dark-mode .ed-nav-btn:hover { border-color:rgba(255,255,255,.35); color:#fff; }\n\n.ed-counter { font-family:var(--mono); font-size:10px; color:rgba(255,255,255,.4); letter-spacing:.5px; margin-left:8px; }\n\n/* \u2550\u2550 BELOW HERO \u2014 search + stats \u2550\u2550 */\n.ed-below { background:var(--bg2); border-bottom:1px solid var(--border); }\n.ed-search-row { display:flex; align-items:center; border-bottom:1px solid var(--border); }\n.ed-search-field { display:flex; align-items:center; gap:10px; flex:1; padding:0 18px; }\n.ed-search-ico { color:var(--text3); flex-shrink:0; }\n.ed-search-input { flex:1; border:none; outline:none; background:transparent; font-family:'Space Grotesk',sans-serif; font-size:14px; color:var(--text); padding:15px 0; }\n.ed-search-input::placeholder { color:var(--muted); }\n.ed-cats { display:flex; align-items:center; border-left:1px solid var(--border); border-right:1px solid var(--border); padding:0 6px; gap:1px; overflow-x:auto; flex-shrink:0; }\n.ed-cats::-webkit-scrollbar { display:none; }\n.ed-cat { padding:5px 10px; border-radius:5px; border:none; background:transparent; font-family:var(--mono); font-size:10px; color:var(--text3); cursor:pointer; white-space:nowrap; transition:all .12s; }\n.ed-cat:hover { background:var(--bg3); color:var(--text2); }\n.ed-cat.on { background:var(--primary); color:#fff; }\n.ed-cat-n { font-size:8px; opacity:.7; margin-left:3px; }\n.ed-search-btn { height:100%; min-height:50px; padding:0 30px; background:var(--primary); color:#fff; border:none; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; cursor:pointer; flex-shrink:0; transition:filter .15s; }\n.ed-search-btn:hover { filter:brightness(1.1); }\n\n.ed-stats-bar { display:flex; align-items:center; padding:10px 24px; }\n.ed-hstat { padding:6px 18px; border-right:1px solid var(--border); text-align:center; }\n.ed-hstat:first-child { padding-left:0; }\n.ed-hstat-v { font-family:var(--mono); font-size:16px; font-weight:500; color:var(--primary); line-height:1; margin-bottom:3px; }\n.ed-hstat-l { font-family:var(--mono); font-size:8px; letter-spacing:.6px; color:var(--text3); text-transform:uppercase; }\n.ed-live { display:flex; align-items:center; gap:6px; margin-left:auto; font-family:var(--mono); font-size:9px; color:var(--text3); letter-spacing:.5px; }\n.ed-live-dot { width:6px; height:6px; border-radius:50%; background:var(--success); animation:ed-pdot 2s infinite; }\n\n/* \u2550\u2550 BODY GRID \u2550\u2550 */\n.ed-body { display:grid; grid-template-columns:1fr 300px; min-height:500px; }\n.ed-main { padding:22px 24px; border-right:1px solid var(--border); background:var(--bg); }\n.ed-side { padding:16px; display:flex; flex-direction:column; gap:12px; background:var(--bg3); }\n\n.ed-sec-hd { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }\n.ed-sec-hd-l { display:flex; align-items:center; gap:7px; color:var(--text3); }\n.ed-sec-title { font-family:var(--mono); font-size:10px; font-weight:500; letter-spacing:.8px; color:var(--text); }\n.ed-sec-sub { font-family:var(--mono); font-size:10px; color:var(--text3); }\n.ed-see-all { font-family:var(--mono); font-size:11px; color:var(--primary); cursor:pointer; }\n.ed-see-all:hover { opacity:.75; }\n\n/* LISTING CARDS */\n.ed-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }\n.ed-card { background:var(--card); border:1px solid var(--border); border-radius:10px; overflow:hidden; cursor:pointer; transition:border-color .18s,transform .18s,box-shadow .18s; }\n.ed-card:hover { border-color:var(--primary); transform:translateY(-2px); box-shadow:0 8px 24px rgba(2,132,199,.1); }\n.ed-card-bar { height:2px; }\n.ed-card-bar.bar-high { background:var(--success); }\n.ed-card-bar.bar-mid  { background:var(--primary); }\n.ed-card-bar.bar-low  { background:var(--warning); }\n.ed-card-inner { padding:13px 14px; }\n.ed-card-top { display:flex; align-items:center; gap:8px; margin-bottom:8px; }\n.ed-card-id { font-family:var(--mono); font-size:9px; color:var(--text3); letter-spacing:.4px; }\n.ed-match { font-family:var(--mono); font-size:10px; font-weight:500; padding:2px 7px; border-radius:3px; }\n.ed-match.high { background:rgba(5,150,105,.1);  color:var(--success); }\n.ed-match.mid  { background:rgba(2,132,199,.1);  color:var(--primary); }\n.ed-match.low  { background:rgba(217,119,6,.1);  color:var(--warning); }\n.ed-card-time { margin-left:auto; font-family:var(--mono); font-size:9px; color:var(--text3); }\n.ed-card-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:var(--text); margin-bottom:3px; letter-spacing:-.2px; }\n.ed-card-sub   { font-family:var(--mono); font-size:10px; color:var(--text3); margin-bottom:10px; }\n.ed-card-co    { display:flex; align-items:center; gap:6px; margin-bottom:7px; }\n.ed-ava        { width:20px; height:20px; border-radius:4px; background:var(--primary); color:#fff; font-family:var(--mono); font-size:8px; font-weight:500; display:flex; align-items:center; justify-content:center; flex-shrink:0; }\n.ed-co-name2   { font-size:11px; color:var(--text2); }\n.ed-verified2  { display:flex; align-items:center; gap:3px; font-family:var(--mono); font-size:9px; color:var(--success); background:rgba(5,150,105,.08); padding:1px 6px; border-radius:3px; }\n.ed-rating     { margin-left:auto; font-family:var(--mono); font-size:10px; color:var(--text3); }\n.ed-card-qty   { display:flex; align-items:center; gap:5px; font-family:var(--mono); font-size:10px; color:var(--text3); margin-bottom:12px; }\n.ed-card-ft    { display:flex; align-items:center; justify-content:space-between; padding-top:11px; border-top:1px solid var(--border); }\n.ed-price      { display:flex; align-items:baseline; gap:4px; }\n.ed-price-v    { font-family:var(--mono); font-size:17px; font-weight:500; color:var(--primary); letter-spacing:-.5px; }\n.ed-price-u    { font-family:var(--mono); font-size:10px; color:var(--text3); }\n.ed-card-btns  { display:flex; gap:6px; }\n.ed-empty { grid-column:1/-1; display:flex; flex-direction:column; align-items:center; gap:10px; padding:48px 0; color:var(--text3); font-size:13px; }\n\n/* BUTTONS */\n.ed-btn-ghost   { height:28px; padding:0 12px; border:1px solid var(--border2); border-radius:5px; background:transparent; font-family:var(--mono); font-size:10px; color:var(--text2); cursor:pointer; transition:all .12s; }\n.ed-btn-ghost:hover { border-color:var(--primary); color:var(--primary); }\n.ed-btn-primary { height:28px; padding:0 13px; border:none; border-radius:5px; background:var(--primary); font-family:var(--mono); font-size:10px; font-weight:500; color:#fff; cursor:pointer; transition:filter .12s; }\n.ed-btn-primary:hover { filter:brightness(1.1); }\n\n/* SIDE PANELS */\n.ed-panel { background:var(--card); border:1px solid var(--border); border-radius:8px; overflow:hidden; }\n.ed-panel-hd { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-bottom:1px solid var(--border); background:var(--card2,var(--bg3)); }\n.ed-panel-hd-l { display:flex; align-items:center; gap:7px; color:var(--text3); }\n.ed-panel-title { font-family:var(--mono); font-size:9px; font-weight:500; letter-spacing:.8px; color:var(--text); }\n.ed-badge { width:19px; height:19px; border-radius:50%; background:var(--danger); color:#fff; font-family:var(--mono); font-size:10px; display:flex; align-items:center; justify-content:center; }\n.ed-panel-link { font-family:var(--mono); font-size:10px; color:var(--primary); cursor:pointer; }\n\n.ed-alert { display:flex; align-items:center; gap:10px; padding:9px 14px; border-bottom:1px solid var(--border); transition:background .12s; }\n.ed-alert:last-child { border:none; }\n.ed-alert:hover { background:var(--bg3); }\n.ed-alert.urgent { border-left:3px solid var(--danger); }\n.ed-alert.warn   { border-left:3px solid var(--warning); }\n.ed-alert.info   { border-left:3px solid var(--success); }\n.ed-alert-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }\n.ed-alert.urgent .ed-alert-dot { background:var(--danger); }\n.ed-alert.warn   .ed-alert-dot { background:var(--warning); }\n.ed-alert.info   .ed-alert-dot { background:var(--success); }\n.ed-alert-text { flex:1; font-size:11px; color:var(--text2); line-height:1.4; }\n.ed-alert-btn { padding:3px 8px; border:1px solid var(--border2); border-radius:4px; background:transparent; font-family:var(--mono); font-size:9px; color:var(--primary); cursor:pointer; flex-shrink:0; transition:all .12s; }\n.ed-alert-btn:hover { background:var(--primary); color:#fff; border-color:var(--primary); }\n\n.ed-ml-row { display:flex; align-items:center; gap:9px; padding:9px 14px; border-bottom:1px solid var(--border); cursor:pointer; transition:background .12s; }\n.ed-ml-row:hover { background:var(--bg3); }\n.ed-ml-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }\n.ed-ml-dot.dot-a { background:var(--success); box-shadow:0 0 5px var(--success); }\n.ed-ml-dot.dot-p { background:var(--warning); }\n.ed-ml-info { flex:1; min-width:0; }\n.ed-ml-title { font-size:11px; font-weight:600; color:var(--text); margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\n.ed-ml-meta { display:flex; align-items:center; gap:7px; }\n.ed-ml-status { font-family:var(--mono); font-size:9px; font-weight:500; padding:1px 6px; border-radius:3px; }\n.ed-ml-status.s-a { background:rgba(5,150,105,.1); color:var(--success); }\n.ed-ml-status.s-p { background:rgba(217,119,6,.1); color:var(--warning); }\n.ed-ml-stat,.ed-ml-enq { display:flex; align-items:center; gap:3px; font-family:var(--mono); font-size:9px; color:var(--text3); }\n.ed-ml-enq { color:var(--primary); }\n.ed-ml-r { display:flex; align-items:center; gap:6px; flex-shrink:0; }\n.ed-ml-price { font-family:var(--mono); font-size:12px; font-weight:500; color:var(--primary); }\n.ed-trend { color:var(--success); }\n.ed-add-btn { width:100%; padding:10px; border:none; border-top:1px dashed var(--border2); background:transparent; font-family:var(--mono); font-size:10px; color:var(--primary); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:background .12s; letter-spacing:.3px; }\n.ed-add-btn:hover { background:var(--bg); }\n\n.ed-wallet { padding:14px; }\n.ed-w-lbl { font-family:var(--mono); font-size:9px; text-transform:uppercase; letter-spacing:.6px; color:var(--text3); margin-bottom:5px; }\n.ed-w-amt { font-family:var(--mono); font-size:28px; font-weight:500; color:var(--text); letter-spacing:-1px; line-height:1; margin-bottom:7px; }\n.ed-w-amt span { font-size:13px; color:var(--text3); font-weight:400; }\n.ed-w-meta { display:flex; justify-content:space-between; align-items:center; font-family:var(--mono); font-size:10px; color:var(--text3); margin-bottom:10px; gap:4px; }\n.ed-w-meta>span:first-child { display:flex; align-items:center; gap:4px; }\n.ed-w-note { font-size:9px; opacity:.6; }\n.ed-w-bar { height:3px; background:var(--border); border-radius:2px; margin-bottom:12px; overflow:hidden; }\n.ed-w-fill { height:100%; background:var(--primary); border-radius:2px; }\n.ed-w-btns { display:flex; gap:7px; }\n\n.ed-del { display:flex; align-items:center; gap:10px; padding:10px 14px; border-bottom:1px solid var(--border); }\n.ed-del:last-child { border:none; }\n.ed-del-bar { width:3px; height:30px; border-radius:2px; flex-shrink:0; }\n.ed-del-bar.transit { background:var(--warning); }\n.ed-del-bar.done    { background:var(--success); }\n.ed-del-bar.sched   { background:var(--text3); }\n.ed-del-info { flex:1; }\n.ed-del-id    { font-family:var(--mono); font-size:11px; font-weight:500; color:var(--text); margin-bottom:2px; }\n.ed-del-route { font-family:var(--mono); font-size:10px; color:var(--text3); }\n.ed-del-r     { text-align:right; flex-shrink:0; }\n.ed-del-status { font-family:var(--mono); font-size:9px; font-weight:500; color:var(--text3); margin-bottom:2px; }\n.ed-del-status.transit { color:var(--warning); }\n.ed-del-status.done    { color:var(--success); }\n.ed-del-eta   { font-family:var(--mono); font-size:10px; color:var(--text3); }\n\n/* \u2550\u2550 RESPONSIVE \u2550\u2550 */\n@media (max-width:1280px) { .ed-body{grid-template-columns:1fr 280px} .ed-hero{height:380px} .ed-hero-panel{width:270px} }\n@media (max-width:1024px) { .ed-hero-panel{display:none} .ed-body{grid-template-columns:1fr} .ed-side{display:grid;grid-template-columns:1fr 1fr} }\n@media (max-width:768px) { .ed-hero{height:320px} .ed-slide{padding:28px 20px} .ed-slide-title{font-size:28px} .ed-hero-controls{padding:0 20px} .ed-grid{grid-template-columns:1fr} .ed-main{padding:16px} .ed-side{grid-template-columns:1fr} }"] }]
    }], () => [{ type: i1.ThemeService }, { type: i2.AuthService }, { type: i3.ListingService }, { type: i4.TransportService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Dashboard, { className: "Dashboard", filePath: "src/app/features/enterprise/dashboard/dashboard.ts", lineNumber: 16 }); })();
