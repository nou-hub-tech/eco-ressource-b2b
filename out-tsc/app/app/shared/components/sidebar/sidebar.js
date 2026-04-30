import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
const _c0 = () => ({ exact: true });
function Sidebar_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "span", 20);
    i0.ɵɵtext(2, "Eco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 21);
    i0.ɵɵtext(4, "Ressource");
    i0.ɵɵelementEnd()();
} }
function Sidebar_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵelement(1, "span", 23);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.role, " ");
} }
function Sidebar_ng_container_10_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r2.section, " ");
} }
function Sidebar_ng_container_10_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 28);
} }
function Sidebar_ng_container_10_a_3_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r2.label, " ");
} }
function Sidebar_ng_container_10_a_3_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r2.badge, " ");
} }
function Sidebar_ng_container_10_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 29)(1, "div", 30);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 31);
    i0.ɵɵelement(3, "path");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(4, Sidebar_ng_container_10_a_3_span_4_Template, 2, 1, "span", 32)(5, Sidebar_ng_container_10_a_3_span_5_Template, 2, 1, "span", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("routerLink", ctx_r0.getRoute(item_r2.route))("routerLinkActiveOptions", i0.ɵɵpureFunction0(6, _c0));
    i0.ɵɵattribute("title", item_r2.label || "");
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("d", ctx_r0.getSvgPath(item_r2.icon || "dashboard"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.collapsed);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r2.badge && !ctx_r0.collapsed);
} }
function Sidebar_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, Sidebar_ng_container_10_div_1_Template, 2, 1, "div", 24)(2, Sidebar_ng_container_10_div_2_Template, 1, 0, "div", 25)(3, Sidebar_ng_container_10_a_3_Template, 6, 7, "a", 26);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r2.section && !ctx_r0.collapsed);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r2.section && ctx_r0.collapsed);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r2.route);
} }
function Sidebar_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "div", 37);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 38)(4, "div", 39);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 40);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.user.avatar);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.user.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.user.company || ctx_r0.user.role, " ");
} }
function Sidebar_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.user.avatar, " ");
} }
function Sidebar_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Sign Out");
    i0.ɵɵelementEnd();
} }
export class Sidebar {
    authService;
    router;
    collapsed = true;
    role = 'enterprise';
    user = null;
    /* SVG ICONS */
    icons = {
        dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
        marketplace: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
        listings: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 12h6M9 16h4',
        stock: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
        resources: 'M4 11l8-8 8 8M5 10v9h14v-9M9 19v-5h6v5',
        deliveries: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8z',
        reservations: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z',
        transactions: 'M1 4h22v16H1zM1 10h22',
        reports: 'M18 20V10M12 20V4M6 20v-6',
        users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8',
        events: 'M12 2L2 7l10 5 10-5-10-5z',
        requests: 'M22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12',
        trips: 'M1 6v16l7-4 8 4 7-4V2',
        shipments: 'M3 12l2-2 7-7 7 7',
        earnings: 'M12 2v20M17 5H9.5',
        home: 'M3 9l9-7 9 7v11',
    };
    /* 🔥 FIXED FUNCTION */
    getSvgPath(key) {
        return this.icons[key] || this.icons['dashboard'];
    }
    /* ADMIN */
    adminNav = [
        { section: 'Overview' },
        { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
        { label: 'Users', icon: 'users', route: '/admin/users' },
        { section: 'Operations' },
        { label: 'Listings', icon: 'listings', route: '/admin/listings' },
        { label: 'Stock', icon: 'stock', route: '/admin/stock' },
        { label: 'Deliveries', icon: 'deliveries', route: '/admin/deliveries' },
        { section: 'Circular Economy' },
        { label: 'Reservations', icon: 'reservations', route: '/admin/reservations' },
        { label: 'Orders', icon: 'transactions', route: '/admin/orders' },
        { label: 'Slots Calendar', icon: 'reservations', route: '/admin/slots' },
        { section: 'Finance' },
        { label: 'Treasury', icon: 'earnings', route: '/admin/treasury' },
        { label: 'Events', icon: 'events', route: '/admin/events' }
    ];
    /* ENTERPRISE */
    enterpriseNav = [
        { label: 'Home', icon: 'home', route: '/enterprise/dashboard' },
        { section: 'Marketplace' },
        { label: 'Marketplace', icon: 'marketplace', route: '/enterprise/marketplace' },
        { label: 'My Resources', icon: 'resources', route: '/enterprise/slots' },
        { label: 'My Reservations', icon: 'requests', route: '/enterprise/reservations' },
        { label: 'Incoming Requests', icon: 'requests', route: '/enterprise/incoming-requests' },
        { label: 'Orders', icon: 'transactions', route: '/enterprise/orders' },
        { section: 'Operations' },
        { label: 'My Listings', icon: 'listings', route: '/enterprise/my-listings' },
        { label: 'My Stock', icon: 'stock', route: '/enterprise/my-stock' },
        { label: 'My Deliveries', icon: 'deliveries', route: '/enterprise/my-deliveries' },
        { section: 'Finance' },
        { label: 'Transactions', icon: 'transactions', route: '/enterprise/transactions' },
        { label: 'Reports', icon: 'reports', route: '/enterprise/reports' }
    ];
    /* TRANSPORTER */
    transporterNav = [
        { label: 'Dashboard', icon: 'dashboard', route: '/transporter/dashboard' },
        { label: 'My Trips', icon: 'trips', route: '/transporter/trips' },
        { label: 'Shipments', icon: 'shipments', route: '/transporter/shipments' },
        { label: 'Earnings', icon: 'earnings', route: '/transporter/earnings' }
    ];
    get navItems() {
        if (this.role === 'admin')
            return this.adminNav;
        if (this.role === 'transporter')
            return this.transporterNav;
        return this.enterpriseNav;
    }
    /**
     * Each entry in {@link navItems} is already an absolute path
     * (e.g. "/enterprise/my-reservations" or "/admin/dashboard"), so
     * we hand it to the router as-is. Returning {@code ['/enterprise', route]}
     * — as the original code did — produced a malformed two-segment URL that
     * the RouterLink directive resolved inconsistently and broke
     * routerLinkActive matching.
     */
    getRoute(route) {
        return route;
    }
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
        this.authService.user$.subscribe((u) => {
            this.user = u;
            this.role = u?.role || 'enterprise';
        });
    }
    logout() {
        this.authService.logout();
    }
    static ɵfac = function Sidebar_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Sidebar)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Sidebar, selectors: [["app-sidebar"]], inputs: { collapsed: "collapsed" }, standalone: false, decls: 19, vars: 8, consts: [[1, "sidebar"], [1, "sb-top"], [1, "sb-logo-row"], [1, "sb-logo"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"], ["d", "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"], ["class", "sb-wordmark", 4, "ngIf"], ["class", "sb-role-chip", 4, "ngIf"], [1, "sb-nav"], [4, "ngFor", "ngForOf"], [1, "sb-footer"], [1, "sb-divider"], ["class", "sb-user-card", 4, "ngIf"], ["class", "sb-avatar sb-avatar-solo", 4, "ngIf"], [1, "sb-logout-btn", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"], [4, "ngIf"], [1, "sb-wordmark"], [1, "sb-word1"], [1, "sb-word2"], [1, "sb-role-chip"], [1, "sb-role-dot"], ["class", "sb-section", 4, "ngIf"], ["class", "sb-section-line", 4, "ngIf"], ["class", "sb-item", "routerLinkActive", "active", 3, "routerLink", "routerLinkActiveOptions", 4, "ngIf"], [1, "sb-section"], [1, "sb-section-line"], ["routerLinkActive", "active", 1, "sb-item", 3, "routerLink", "routerLinkActiveOptions"], [1, "sb-ico-wrap"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], ["class", "sb-lbl", 4, "ngIf"], ["class", "sb-badge", 4, "ngIf"], [1, "sb-lbl"], [1, "sb-badge"], [1, "sb-user-card"], [1, "sb-avatar"], [1, "sb-user-info"], [1, "sb-username"], [1, "sb-userrole"], [1, "sb-avatar", "sb-avatar-solo"]], template: function Sidebar_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(4, "svg", 4);
            i0.ɵɵelement(5, "path", 5)(6, "path", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, Sidebar_div_7_Template, 5, 0, "div", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(8, Sidebar_div_8_Template, 3, 1, "div", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(9, "nav", 9);
            i0.ɵɵtemplate(10, Sidebar_ng_container_10_Template, 4, 3, "ng-container", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 11);
            i0.ɵɵelement(12, "div", 12);
            i0.ɵɵtemplate(13, Sidebar_div_13_Template, 8, 3, "div", 13)(14, Sidebar_div_14_Template, 2, 1, "div", 14);
            i0.ɵɵelementStart(15, "button", 15);
            i0.ɵɵlistener("click", function Sidebar_Template_button_click_15_listener() { return ctx.logout(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(16, "svg", 16);
            i0.ɵɵelement(17, "path", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, Sidebar_span_18_Template, 2, 0, "span", 18);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵclassProp("collapsed", ctx.collapsed);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", !ctx.collapsed);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.collapsed);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.navItems);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.user && !ctx.collapsed);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.user && ctx.collapsed);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx.collapsed);
        } }, dependencies: [i3.NgForOf, i3.NgIf, i2.RouterLink, i2.RouterLinkActive], styles: [".sidebar[_ngcontent-%COMP%]{width:260px;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;height:100vh;transition:width .25s cubic-bezier(.4,0,.2,1);overflow:hidden}\n.sidebar.collapsed[_ngcontent-%COMP%]{width:64px}\n\n.sb-top[_ngcontent-%COMP%]{padding:20px 14px 14px;border-bottom:1px solid var(--border);flex-shrink:0}\n.sb-logo-row[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;margin-bottom:12px}\n.sb-logo[_ngcontent-%COMP%]{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}\n.theme-admin[_ngcontent-%COMP%]   .sb-logo[_ngcontent-%COMP%]{background:linear-gradient(135deg,#7c3aed,#9d5cf6);color:#fff;box-shadow:0 4px 12px rgba(124,58,237,.35)}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-logo[_ngcontent-%COMP%]{background:linear-gradient(135deg,#0284c7,#38bdf8);color:#fff;box-shadow:0 4px 12px rgba(2,132,199,.25)}\n.theme-transporter[_ngcontent-%COMP%]   .sb-logo[_ngcontent-%COMP%]{background:linear-gradient(135deg,#d97706,#fbbf24);color:#000;box-shadow:0 4px 12px rgba(245,158,11,.3)}\n\n.sb-wordmark[_ngcontent-%COMP%]{display:flex;flex-direction:column;line-height:1.15;overflow:hidden}\n.sb-word1[_ngcontent-%COMP%]{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:var(--text);letter-spacing:-.4px}\n.sb-word2[_ngcontent-%COMP%]{font-size:10px;font-weight:500;color:var(--text3);letter-spacing:.2px}\n\n.sb-role-chip[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;border:1px solid;width:fit-content}\n.theme-admin[_ngcontent-%COMP%]   .sb-role-chip[_ngcontent-%COMP%]{background:rgba(124,58,237,.1);color:#a78bfa;border-color:rgba(124,58,237,.25)}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-role-chip[_ngcontent-%COMP%]{background:rgba(2,132,199,.1);color:#38bdf8;border-color:rgba(2,132,199,.25)}\n.theme-transporter[_ngcontent-%COMP%]   .sb-role-chip[_ngcontent-%COMP%]{background:rgba(245,158,11,.1);color:#fbbf24;border-color:rgba(245,158,11,.25)}\n.sb-role-dot[_ngcontent-%COMP%]{width:5px;height:5px;border-radius:50%;background:currentColor;animation:pulseDot 2s infinite;flex-shrink:0}\n\n.sb-nav[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:6px 8px;display:flex;flex-direction:column;gap:0}\n.sb-nav[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}\n\n.sb-section[_ngcontent-%COMP%]{padding:10px 8px 4px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;overflow:hidden;margin-top:4px}\n.theme-admin[_ngcontent-%COMP%]   .sb-section[_ngcontent-%COMP%]{color:#c4b5fd}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-section[_ngcontent-%COMP%]{color:#94a3b8}\n.theme-transporter[_ngcontent-%COMP%]   .sb-section[_ngcontent-%COMP%]{color:#a8926e}\n\n.sb-section-line[_ngcontent-%COMP%]{height:1px;background:var(--border);margin:10px 4px}\n\n.sb-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:9px;cursor:pointer;transition:all .15s;font-size:12px;font-weight:500;border:1px solid transparent;white-space:nowrap;position:relative;text-decoration:none;overflow:hidden}\n.theme-admin[_ngcontent-%COMP%]   .sb-item[_ngcontent-%COMP%]{color:#a0a0cc}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-item[_ngcontent-%COMP%]{color:#64748b}\n.theme-transporter[_ngcontent-%COMP%]   .sb-item[_ngcontent-%COMP%]{color:#a89880}\n\n.theme-admin[_ngcontent-%COMP%]   .sb-item[_ngcontent-%COMP%]:hover{background:rgba(124,58,237,.08);color:#d4c4ff;border-color:rgba(124,58,237,.1)}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-item[_ngcontent-%COMP%]:hover{background:#f0f9ff;color:#0284c7}\n.theme-transporter[_ngcontent-%COMP%]   .sb-item[_ngcontent-%COMP%]:hover{background:rgba(245,158,11,.07);color:#fcd34d}\n\n.sb-item.active[_ngcontent-%COMP%]{font-weight:600}\n.theme-admin[_ngcontent-%COMP%]   .sb-item.active[_ngcontent-%COMP%]{background:rgba(124,58,237,.12);color:#d4c4ff;border-color:rgba(124,58,237,.2)}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-item.active[_ngcontent-%COMP%]{background:#eff6ff;color:#0284c7;border-color:#bfdbfe}\n.theme-transporter[_ngcontent-%COMP%]   .sb-item.active[_ngcontent-%COMP%]{background:rgba(245,158,11,.1);color:#fbbf24;border-color:rgba(245,158,11,.18)}\n\n.sb-item.active[_ngcontent-%COMP%]::before{content:'';position:absolute;left:-8px;top:50%;transform:translateY(-50%);width:3px;height:60%;border-radius:0 3px 3px 0;background:var(--primary)}\n.theme-admin[_ngcontent-%COMP%]   .sb-item.active[_ngcontent-%COMP%]::before{box-shadow:0 0 8px rgba(124,58,237,.6)}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-item.active[_ngcontent-%COMP%]::before{box-shadow:0 0 8px rgba(2,132,199,.4)}\n.theme-transporter[_ngcontent-%COMP%]   .sb-item.active[_ngcontent-%COMP%]::before{box-shadow:0 0 8px rgba(245,158,11,.5)}\n\n.sb-ico-wrap[_ngcontent-%COMP%]{width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s;background:transparent}\n.theme-admin[_ngcontent-%COMP%]   .sb-item[_ngcontent-%COMP%]:hover   .sb-ico-wrap[_ngcontent-%COMP%]{background:rgba(124,58,237,.12)}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-item[_ngcontent-%COMP%]:hover   .sb-ico-wrap[_ngcontent-%COMP%]{background:rgba(2,132,199,.08)}\n.theme-transporter[_ngcontent-%COMP%]   .sb-item[_ngcontent-%COMP%]:hover   .sb-ico-wrap[_ngcontent-%COMP%]{background:rgba(245,158,11,.08)}\n.theme-admin[_ngcontent-%COMP%]   .sb-item.active[_ngcontent-%COMP%]   .sb-ico-wrap[_ngcontent-%COMP%]{background:rgba(124,58,237,.18)}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-item.active[_ngcontent-%COMP%]   .sb-ico-wrap[_ngcontent-%COMP%]{background:rgba(2,132,199,.1)}\n.theme-transporter[_ngcontent-%COMP%]   .sb-item.active[_ngcontent-%COMP%]   .sb-ico-wrap[_ngcontent-%COMP%]{background:rgba(245,158,11,.12)}\n\n.sb-ico[_ngcontent-%COMP%]{font-size:14px;line-height:1}\n.sb-lbl[_ngcontent-%COMP%]{flex:1;overflow:hidden;text-overflow:ellipsis;min-width:0}\n\n.sb-badge[_ngcontent-%COMP%]{margin-left:auto;font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;flex-shrink:0}\n.theme-admin[_ngcontent-%COMP%]   .sb-badge[_ngcontent-%COMP%]{background:rgba(124,58,237,.2);color:#c4b5fd}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-badge[_ngcontent-%COMP%]{background:#eff6ff;color:#0284c7}\n.theme-transporter[_ngcontent-%COMP%]   .sb-badge[_ngcontent-%COMP%]{background:rgba(245,158,11,.15);color:#fbbf24}\n\n.sb-footer[_ngcontent-%COMP%]{padding:10px 8px 14px;flex-shrink:0}\n.sb-divider[_ngcontent-%COMP%]{height:1px;background:var(--border);margin:0 4px 12px}\n\n.sb-user-card[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:9px;border:1px solid var(--border);margin-bottom:8px;overflow:hidden}\n.theme-admin[_ngcontent-%COMP%]   .sb-user-card[_ngcontent-%COMP%]{background:rgba(124,58,237,.06);border-color:rgba(124,58,237,.15)}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-user-card[_ngcontent-%COMP%]{background:#f8fafc;border-color:#e2e8f0}\n.theme-transporter[_ngcontent-%COMP%]   .sb-user-card[_ngcontent-%COMP%]{background:rgba(245,158,11,.04);border-color:rgba(245,158,11,.1)}\n\n.sb-avatar[_ngcontent-%COMP%]{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;letter-spacing:.5px}\n.theme-admin[_ngcontent-%COMP%]   .sb-avatar[_ngcontent-%COMP%]{background:linear-gradient(135deg,#7c3aed,#9d5cf6);color:#fff}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-avatar[_ngcontent-%COMP%]{background:linear-gradient(135deg,#0284c7,#38bdf8);color:#fff}\n.theme-transporter[_ngcontent-%COMP%]   .sb-avatar[_ngcontent-%COMP%]{background:linear-gradient(135deg,#d97706,#fbbf24);color:#000}\n\n.sb-avatar-solo[_ngcontent-%COMP%]{margin:0 auto 8px}\n.sb-user-info[_ngcontent-%COMP%]{overflow:hidden;flex:1}\n.sb-username[_ngcontent-%COMP%]{font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3}\n.sb-userrole[_ngcontent-%COMP%]{font-size:10px;color:var(--text3);text-transform:capitalize;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n\n.sb-logout-btn[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center;justify-content:flex-start;gap:9px;padding:8px 10px;border-radius:9px;background:transparent;border:1px solid transparent;font-size:12px;font-weight:500;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:all .15s}\n.theme-admin[_ngcontent-%COMP%]   .sb-logout-btn[_ngcontent-%COMP%]{color:#9090b8}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-logout-btn[_ngcontent-%COMP%]{color:#94a3b8}\n.theme-transporter[_ngcontent-%COMP%]   .sb-logout-btn[_ngcontent-%COMP%]{color:#8a7c6a}\n.sb-logout-btn[_ngcontent-%COMP%]:hover{background:rgba(239,68,68,.08);border-color:rgba(239,68,68,.15);color:#f87171}\n.theme-enterprise[_ngcontent-%COMP%]   .sb-logout-btn[_ngcontent-%COMP%]:hover{background:#fef2f2;border-color:#fecaca;color:#ef4444}\n.sb-logout-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{flex-shrink:0}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Sidebar, [{
        type: Component,
        args: [{ selector: 'app-sidebar', standalone: false, template: "<aside class=\"sidebar\" [class.collapsed]=\"collapsed\">\n\n  <!-- BRAND -->\n  <div class=\"sb-top\">\n    <div class=\"sb-logo-row\">\n      <div class=\"sb-logo\">\n        <svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\"\n             stroke=\"currentColor\" stroke-width=\"2\"\n             stroke-linecap=\"round\" stroke-linejoin=\"round\">\n          <path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z\"/>\n          <path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\"/>\n        </svg>\n      </div>\n\n      <div class=\"sb-wordmark\" *ngIf=\"!collapsed\">\n        <span class=\"sb-word1\">Eco</span>\n        <span class=\"sb-word2\">Ressource</span>\n      </div>\n    </div>\n\n    <div class=\"sb-role-chip\" *ngIf=\"!collapsed\">\n      <span class=\"sb-role-dot\"></span>\n      {{ role }}\n    </div>\n  </div>\n\n  <!-- NAV -->\n  <nav class=\"sb-nav\">\n\n    <ng-container *ngFor=\"let item of navItems\">\n\n      <!-- SECTION -->\n      <div class=\"sb-section\" *ngIf=\"item.section && !collapsed\">\n        {{ item.section }}\n      </div>\n\n      <div class=\"sb-section-line\" *ngIf=\"item.section && collapsed\"></div>\n\n      <!-- NAV ITEM -->\n      <a\n        *ngIf=\"item.route\"\n        class=\"sb-item\"\n        [routerLink]=\"getRoute(item.route)\"\n        routerLinkActive=\"active\"\n        [routerLinkActiveOptions]=\"{ exact: true }\"\n        [attr.title]=\"item.label || ''\"\n      >\n\n        <!-- ICON -->\n        <div class=\"sb-ico-wrap\">\n          <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\"\n               stroke=\"currentColor\" stroke-width=\"1.8\"\n               stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path [attr.d]=\"getSvgPath(item.icon || 'dashboard')\"></path>\n          </svg>\n        </div>\n\n        <!-- LABEL -->\n        <span class=\"sb-lbl\" *ngIf=\"!collapsed\">\n          {{ item.label }}\n        </span>\n\n        <!-- BADGE -->\n        <span class=\"sb-badge\" *ngIf=\"item.badge && !collapsed\">\n          {{ item.badge }}\n        </span>\n\n      </a>\n\n    </ng-container>\n\n  </nav>\n\n  <!-- FOOTER -->\n  <div class=\"sb-footer\">\n\n    <div class=\"sb-divider\"></div>\n\n    <div class=\"sb-user-card\" *ngIf=\"user && !collapsed\">\n      <div class=\"sb-avatar\">{{ user.avatar }}</div>\n\n      <div class=\"sb-user-info\">\n        <div class=\"sb-username\">{{ user.name }}</div>\n        <div class=\"sb-userrole\">\n          {{ user.company || user.role }}\n        </div>\n      </div>\n    </div>\n\n    <div class=\"sb-avatar sb-avatar-solo\" *ngIf=\"user && collapsed\">\n      {{ user.avatar }}\n    </div>\n\n    <button class=\"sb-logout-btn\" (click)=\"logout()\">\n      <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\"\n           fill=\"none\" stroke=\"currentColor\"\n           stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9\"/>\n      </svg>\n\n      <span *ngIf=\"!collapsed\">Sign Out</span>\n    </button>\n\n  </div>\n\n</aside>", styles: [".sidebar{width:260px;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;height:100vh;transition:width .25s cubic-bezier(.4,0,.2,1);overflow:hidden}\n.sidebar.collapsed{width:64px}\n\n.sb-top{padding:20px 14px 14px;border-bottom:1px solid var(--border);flex-shrink:0}\n.sb-logo-row{display:flex;align-items:center;gap:10px;margin-bottom:12px}\n.sb-logo{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}\n.theme-admin .sb-logo{background:linear-gradient(135deg,#7c3aed,#9d5cf6);color:#fff;box-shadow:0 4px 12px rgba(124,58,237,.35)}\n.theme-enterprise .sb-logo{background:linear-gradient(135deg,#0284c7,#38bdf8);color:#fff;box-shadow:0 4px 12px rgba(2,132,199,.25)}\n.theme-transporter .sb-logo{background:linear-gradient(135deg,#d97706,#fbbf24);color:#000;box-shadow:0 4px 12px rgba(245,158,11,.3)}\n\n.sb-wordmark{display:flex;flex-direction:column;line-height:1.15;overflow:hidden}\n.sb-word1{font-family:'Syne',sans-serif;font-size:15px;font-weight:800;color:var(--text);letter-spacing:-.4px}\n.sb-word2{font-size:10px;font-weight:500;color:var(--text3);letter-spacing:.2px}\n\n.sb-role-chip{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:100px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;border:1px solid;width:fit-content}\n.theme-admin .sb-role-chip{background:rgba(124,58,237,.1);color:#a78bfa;border-color:rgba(124,58,237,.25)}\n.theme-enterprise .sb-role-chip{background:rgba(2,132,199,.1);color:#38bdf8;border-color:rgba(2,132,199,.25)}\n.theme-transporter .sb-role-chip{background:rgba(245,158,11,.1);color:#fbbf24;border-color:rgba(245,158,11,.25)}\n.sb-role-dot{width:5px;height:5px;border-radius:50%;background:currentColor;animation:pulseDot 2s infinite;flex-shrink:0}\n\n.sb-nav{flex:1;overflow-y:auto;padding:6px 8px;display:flex;flex-direction:column;gap:0}\n.sb-nav::-webkit-scrollbar{display:none}\n\n.sb-section{padding:10px 8px 4px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;overflow:hidden;margin-top:4px}\n.theme-admin .sb-section{color:#c4b5fd}\n.theme-enterprise .sb-section{color:#94a3b8}\n.theme-transporter .sb-section{color:#a8926e}\n\n.sb-section-line{height:1px;background:var(--border);margin:10px 4px}\n\n.sb-item{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:9px;cursor:pointer;transition:all .15s;font-size:12px;font-weight:500;border:1px solid transparent;white-space:nowrap;position:relative;text-decoration:none;overflow:hidden}\n.theme-admin .sb-item{color:#a0a0cc}\n.theme-enterprise .sb-item{color:#64748b}\n.theme-transporter .sb-item{color:#a89880}\n\n.theme-admin .sb-item:hover{background:rgba(124,58,237,.08);color:#d4c4ff;border-color:rgba(124,58,237,.1)}\n.theme-enterprise .sb-item:hover{background:#f0f9ff;color:#0284c7}\n.theme-transporter .sb-item:hover{background:rgba(245,158,11,.07);color:#fcd34d}\n\n.sb-item.active{font-weight:600}\n.theme-admin .sb-item.active{background:rgba(124,58,237,.12);color:#d4c4ff;border-color:rgba(124,58,237,.2)}\n.theme-enterprise .sb-item.active{background:#eff6ff;color:#0284c7;border-color:#bfdbfe}\n.theme-transporter .sb-item.active{background:rgba(245,158,11,.1);color:#fbbf24;border-color:rgba(245,158,11,.18)}\n\n.sb-item.active::before{content:'';position:absolute;left:-8px;top:50%;transform:translateY(-50%);width:3px;height:60%;border-radius:0 3px 3px 0;background:var(--primary)}\n.theme-admin .sb-item.active::before{box-shadow:0 0 8px rgba(124,58,237,.6)}\n.theme-enterprise .sb-item.active::before{box-shadow:0 0 8px rgba(2,132,199,.4)}\n.theme-transporter .sb-item.active::before{box-shadow:0 0 8px rgba(245,158,11,.5)}\n\n.sb-ico-wrap{width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s;background:transparent}\n.theme-admin .sb-item:hover .sb-ico-wrap{background:rgba(124,58,237,.12)}\n.theme-enterprise .sb-item:hover .sb-ico-wrap{background:rgba(2,132,199,.08)}\n.theme-transporter .sb-item:hover .sb-ico-wrap{background:rgba(245,158,11,.08)}\n.theme-admin .sb-item.active .sb-ico-wrap{background:rgba(124,58,237,.18)}\n.theme-enterprise .sb-item.active .sb-ico-wrap{background:rgba(2,132,199,.1)}\n.theme-transporter .sb-item.active .sb-ico-wrap{background:rgba(245,158,11,.12)}\n\n.sb-ico{font-size:14px;line-height:1}\n.sb-lbl{flex:1;overflow:hidden;text-overflow:ellipsis;min-width:0}\n\n.sb-badge{margin-left:auto;font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;flex-shrink:0}\n.theme-admin .sb-badge{background:rgba(124,58,237,.2);color:#c4b5fd}\n.theme-enterprise .sb-badge{background:#eff6ff;color:#0284c7}\n.theme-transporter .sb-badge{background:rgba(245,158,11,.15);color:#fbbf24}\n\n.sb-footer{padding:10px 8px 14px;flex-shrink:0}\n.sb-divider{height:1px;background:var(--border);margin:0 4px 12px}\n\n.sb-user-card{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:9px;border:1px solid var(--border);margin-bottom:8px;overflow:hidden}\n.theme-admin .sb-user-card{background:rgba(124,58,237,.06);border-color:rgba(124,58,237,.15)}\n.theme-enterprise .sb-user-card{background:#f8fafc;border-color:#e2e8f0}\n.theme-transporter .sb-user-card{background:rgba(245,158,11,.04);border-color:rgba(245,158,11,.1)}\n\n.sb-avatar{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;letter-spacing:.5px}\n.theme-admin .sb-avatar{background:linear-gradient(135deg,#7c3aed,#9d5cf6);color:#fff}\n.theme-enterprise .sb-avatar{background:linear-gradient(135deg,#0284c7,#38bdf8);color:#fff}\n.theme-transporter .sb-avatar{background:linear-gradient(135deg,#d97706,#fbbf24);color:#000}\n\n.sb-avatar-solo{margin:0 auto 8px}\n.sb-user-info{overflow:hidden;flex:1}\n.sb-username{font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.3}\n.sb-userrole{font-size:10px;color:var(--text3);text-transform:capitalize;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n\n.sb-logout-btn{width:100%;display:flex;align-items:center;justify-content:flex-start;gap:9px;padding:8px 10px;border-radius:9px;background:transparent;border:1px solid transparent;font-size:12px;font-weight:500;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:all .15s}\n.theme-admin .sb-logout-btn{color:#9090b8}\n.theme-enterprise .sb-logout-btn{color:#94a3b8}\n.theme-transporter .sb-logout-btn{color:#8a7c6a}\n.sb-logout-btn:hover{background:rgba(239,68,68,.08);border-color:rgba(239,68,68,.15);color:#f87171}\n.theme-enterprise .sb-logout-btn:hover{background:#fef2f2;border-color:#fecaca;color:#ef4444}\n.sb-logout-btn svg{flex-shrink:0}"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }], { collapsed: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Sidebar, { className: "Sidebar", filePath: "src/app/shared/components/sidebar/sidebar.ts", lineNumber: 19 }); })();
