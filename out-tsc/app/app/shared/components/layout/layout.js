import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/auth";
import * as i2 from "@angular/router";
import * as i3 from "../../../core/services/theme";
import * as i4 from "../sidebar/sidebar";
import * as i5 from "../header/header";
export class Layout {
    authService;
    router;
    renderer;
    themeService;
    user = null;
    pageTitle = '';
    /** Collapsed by default — hamburger expands it */
    sidebarCollapsed = true;
    titleMap = {
        'dashboard': 'Home',
        'users': 'User Management',
        'events': 'Events & Campaigns',
        'stock': 'Stock & Products',
        'deliveries': 'Deliveries',
        'listings': 'Listings & Posts',
        'reservations': 'My Reservations',
        'treasury': 'Treasury & Finance',
        'solidarity': 'Solidarity & Associations',
        'marketplace': 'Marketplace',
        'incoming-requests': 'Incoming Requests',
        'my-stock': 'My Stock',
        'my-deliveries': 'My Deliveries',
        'my-listings': 'My Posts & Surplus',
        'my-reservations': 'My Reservations',
        'new-reservation': 'New Reservation',
        'requests': 'Incoming Requests',
        'transactions': 'Transactions',
        'reports': 'Reports & KPIs',
        'trips': 'My Trips',
        'shipments': 'Shipments',
        'earnings': 'Earnings',
        // eco module
        'orders': 'Eco Orders',
        'slots': 'My Slots',
        'slot-management': 'Slot Inventory',
        'new-slot': 'New Slot',
    };
    constructor(authService, router, renderer, themeService) {
        this.authService = authService;
        this.router = router;
        this.renderer = renderer;
        this.themeService = themeService;
    }
    ngOnInit() {
        this.themeService.init();
        this.authService.user$.subscribe((u) => {
            this.user = u;
            this.applyTheme(u?.role || 'enterprise');
        });
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e) => {
            const parts = e.urlAfterRedirects.split('/');
            const last = parts[parts.length - 1];
            this.pageTitle = this.titleMap[last] || '';
            /* Auto-collapse sidebar on navigation (mobile-friendly) */
            this.sidebarCollapsed = true;
        });
    }
    applyTheme(role) {
        const body = document.body;
        body.classList.remove('theme-admin', 'theme-enterprise', 'theme-transporter', 'theme-auth');
        body.classList.add('theme-' + role);
    }
    toggleSidebar() {
        this.sidebarCollapsed = !this.sidebarCollapsed;
    }
    static ɵfac = function Layout_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Layout)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i3.ThemeService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Layout, selectors: [["app-layout"]], standalone: false, decls: 5, vars: 2, consts: [[1, "app-layout"], [3, "collapsed"], [1, "main-content"], [3, "toggleSidebar", "pageTitle"]], template: function Layout_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-sidebar", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "app-header", 3);
            i0.ɵɵlistener("toggleSidebar", function Layout_Template_app_header_toggleSidebar_3_listener() { return ctx.toggleSidebar(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "router-outlet");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("collapsed", ctx.sidebarCollapsed);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("pageTitle", ctx.pageTitle);
        } }, dependencies: [i2.RouterOutlet, i4.Sidebar, i5.Header], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Layout, [{
        type: Component,
        args: [{ selector: 'app-layout', standalone: false, template: "<div class=\"app-layout\">\n  <app-sidebar [collapsed]=\"sidebarCollapsed\"></app-sidebar>\n  <div class=\"main-content\">\n    <app-header [pageTitle]=\"pageTitle\" (toggleSidebar)=\"toggleSidebar()\"></app-header>\n    <router-outlet></router-outlet>\n  </div>\n</div>" }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }, { type: i0.Renderer2 }, { type: i3.ThemeService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Layout, { className: "Layout", filePath: "src/app/shared/components/layout/layout.ts", lineNumber: 13 }); })();
