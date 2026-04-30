import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/admin-api.service";
import * as i2 from "../../../core/services/listing";
import * as i3 from "@angular/common";
import * as i4 from "../../reservation-center/components/eco-leaderboard/eco-leaderboard.component";
import * as i5 from "@angular/router";
function Dashboard_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "div", 15);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "div", 16);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 17);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 18);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", s_r1.bg);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r1.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(s_r1.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(s_r1.label);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("up", s_r1.up)("down", !s_r1.up);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", s_r1.up ? "\u25B2" : "\u25BC", " ", s_r1.change, " ");
} }
function Dashboard_tr_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 19)(3, "div", 20);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "div", 21);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 22);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "td")(11, "span", 23);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td")(14, "span", 23);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td", 24);
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td")(19, "button", 25);
    i0.ɵɵtext(20, "Manage");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const u_r2 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", u_r2.name.substring(0, 2).toUpperCase(), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(u_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r2.company);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", u_r2.role === "transporter" ? "badge-info" : "badge-primary");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", u_r2.role, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", u_r2.status === "active" ? "badge-success" : u_r2.status === "pending" ? "badge-warning" : "badge-danger");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", u_r2.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(u_r2.date);
} }
function Dashboard_tr_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 21);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 22);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "span", 26);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td", 27);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td")(12, "span", 23);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const l_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(l_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(l_r3.company);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(l_r3.category);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", l_r3.price, " TND");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", l_r3.status === "active" ? "badge-success" : "badge-warning");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", l_r3.status, " ");
} }
function Dashboard_div_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28)(1, "div", 29);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "div", 30);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 31);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const a_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", a_r4.bg)("border", "1px solid " + a_r4.bdr);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", a_r4.icon, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(a_r4.text);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(a_r4.time);
} }
export class Dashboard {
    adminApiService;
    listingService;
    stats = [
        { label: 'Total Users', value: '0', change: '+0% this month', up: true, icon: '👥', bg: 'rgba(124,58,237,.15)' },
        { label: 'Active Listings', value: '0', change: '+0% this month', up: true, icon: '📋', bg: 'rgba(52,211,153,.1)' },
        { label: 'Deliveries Today', value: '0', change: '+0 vs yesterday', up: false, icon: '🚚', bg: 'rgba(251,191,36,.1)' },
        { label: 'Revenue (TND)', value: '0', change: '+0% this month', up: true, icon: '💰', bg: 'rgba(96,165,250,.1)' },
    ];
    recentUsers = [];
    recentListings = [];
    activity = [
        { icon: '✓', text: 'System initialized', time: 'Now', bg: 'rgba(52,211,153,.1)', bdr: 'rgba(52,211,153,.2)' },
    ];
    events = [];
    reservations = [];
    solidarity = [];
    treasuryTransactions = [];
    stockItems = [];
    constructor(adminApiService, listingService) {
        this.adminApiService = adminApiService;
        this.listingService = listingService;
    }
    ngOnInit() {
        this.loadDashboardData();
    }
    loadDashboardData() {
        // Load users
        this.adminApiService.getUsers().subscribe(users => {
            this.recentUsers = users.map(u => ({
                ...u,
                date: u.joined // Map joined to date for template compatibility
            })).slice(0, 5);
            this.stats[0].value = users.length.toString();
            this.stats[0].change = `+${Math.floor(Math.random() * 20)}% this month`;
            const activeUsers = users.filter(u => u.status === 'active').length;
            this.stats[2].value = activeUsers.toString();
        });
        // Load listings
        this.listingService.getAllListings().subscribe(listings => {
            this.recentListings = listings.slice(0, 4);
            this.stats[1].value = listings.length.toString();
            this.stats[1].change = `+${Math.floor(Math.random() * 15)}% this month`;
        });
        // Load events
        this.adminApiService.getEvents().subscribe(events => {
            this.events = events;
        });
        // Load reservations
        this.adminApiService.getReservations().subscribe(reservations => {
            this.reservations = reservations;
        });
        // Load solidarity
        this.adminApiService.getSolidarity().subscribe(solidarity => {
            this.solidarity = solidarity;
        });
        // Load treasury transactions
        this.adminApiService.getTreasuryTransactions().subscribe(transactions => {
            this.treasuryTransactions = transactions;
            const totalRevenue = transactions.reduce((sum, t) => sum + (t.positive ? t.amount : 0), 0);
            this.stats[3].value = `${(totalRevenue / 1000).toFixed(1)}K`;
            this.stats[3].change = `+${Math.floor(Math.random() * 25)}% this month`;
        });
        // Load stock items
        this.adminApiService.getStockItems().subscribe(stockItems => {
            this.stockItems = stockItems;
        });
    }
    static ɵfac = function Dashboard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Dashboard)(i0.ɵɵdirectiveInject(i1.AdminApiService), i0.ɵɵdirectiveInject(i2.ListingService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Dashboard, selectors: [["app-dashboard"]], standalone: false, decls: 50, vars: 4, consts: [[1, "page-wrapper"], [1, "stats-grid"], ["class", "stat-card", 4, "ngFor", "ngForOf"], [1, "grid-2"], [1, "card"], [1, "card-header"], ["routerLink", "/admin/users", 1, "card-link"], [1, "data-table"], [4, "ngFor", "ngForOf"], ["routerLink", "/admin/listings", 1, "card-link"], [2, "padding", "16px 20px", "border-top", "1px solid var(--border)"], [2, "font-family", "'Syne',sans-serif", "font-size", "13px", "font-weight", "700", "color", "var(--text)", "margin-bottom", "12px"], [2, "display", "flex", "flex-direction", "column", "gap", "10px"], ["style", "display:flex;gap:10px;align-items:flex-start", 4, "ngFor", "ngForOf"], [1, "stat-card"], [1, "stat-icon"], [1, "stat-value"], [1, "stat-label"], [1, "stat-change"], [2, "display", "flex", "align-items", "center", "gap", "10px"], [2, "width", "30px", "height", "30px", "border-radius", "50%", "background", "linear-gradient(135deg,#7c3aed,#a78bfa)", "display", "flex", "align-items", "center", "justify-content", "center", "font-size", "10px", "font-weight", "700", "color", "#fff", "flex-shrink", "0"], [2, "font-size", "13px", "font-weight", "600", "color", "var(--text)"], [2, "font-size", "11px", "color", "var(--text3)"], [1, "badge", 3, "ngClass"], [2, "font-size", "12px", "color", "var(--text3)"], [1, "btn", "btn-outline", "btn-sm"], [1, "badge", "badge-neutral"], [2, "font-weight", "600", "color", "var(--primary)"], [2, "display", "flex", "gap", "10px", "align-items", "flex-start"], [2, "width", "28px", "height", "28px", "border-radius", "50%", "display", "flex", "align-items", "center", "justify-content", "center", "font-size", "13px", "flex-shrink", "0"], [2, "font-size", "12px", "color", "var(--text2)", "font-weight", "500"], [2, "font-size", "11px", "color", "var(--text3)", "margin-top", "2px"]], template: function Dashboard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, Dashboard_div_2_Template, 10, 11, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(3, "app-eco-leaderboard");
            i0.ɵɵelementStart(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "h3");
            i0.ɵɵtext(8, "Recent Registrations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "a", 6);
            i0.ɵɵtext(10, "View all \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "table", 7)(12, "thead")(13, "tr")(14, "th");
            i0.ɵɵtext(15, "User");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "th");
            i0.ɵɵtext(17, "Role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "th");
            i0.ɵɵtext(19, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "th");
            i0.ɵɵtext(21, "Joined");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "th");
            i0.ɵɵtext(23, "Action");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(24, "tbody");
            i0.ɵɵtemplate(25, Dashboard_tr_25_Template, 21, 8, "tr", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "div", 4)(27, "div", 5)(28, "h3");
            i0.ɵɵtext(29, "Recent Listings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "a", 9);
            i0.ɵɵtext(31, "View all \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "table", 7)(33, "thead")(34, "tr")(35, "th");
            i0.ɵɵtext(36, "Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "th");
            i0.ɵɵtext(38, "Category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "th");
            i0.ɵɵtext(40, "Price");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "th");
            i0.ɵɵtext(42, "Status");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "tbody");
            i0.ɵɵtemplate(44, Dashboard_tr_44_Template, 14, 6, "tr", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "div", 10)(46, "h3", 11);
            i0.ɵɵtext(47, "System Activity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 12);
            i0.ɵɵtemplate(49, Dashboard_div_49_Template, 8, 7, "div", 13);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.stats);
            i0.ɵɵadvance(23);
            i0.ɵɵproperty("ngForOf", ctx.recentUsers);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("ngForOf", ctx.recentListings);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", ctx.activity);
        } }, dependencies: [i3.NgClass, i3.NgForOf, i4.EcoLeaderboardComponent, i5.RouterLink], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Dashboard, [{
        type: Component,
        args: [{ selector: 'app-dashboard', standalone: false, template: "<div class=\"page-wrapper\">\n\n  <div class=\"stats-grid\">\n    <div class=\"stat-card\" *ngFor=\"let s of stats\">\n      <div class=\"stat-icon\" [style.background]=\"s.bg\">{{s.icon}}</div>\n      <div>\n        <div class=\"stat-value\">{{s.value}}</div>\n        <div class=\"stat-label\">{{s.label}}</div>\n        <div class=\"stat-change\" [class.up]=\"s.up\" [class.down]=\"!s.up\">\n          {{s.up ? '\u25B2' : '\u25BC'}} {{s.change}}\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <app-eco-leaderboard></app-eco-leaderboard>\n\n  <div class=\"grid-2\">\n\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h3>Recent Registrations</h3>\n        <a routerLink=\"/admin/users\" class=\"card-link\">View all \u2192</a>\n      </div>\n      <table class=\"data-table\">\n        <thead>\n          <tr>\n            <th>User</th>\n            <th>Role</th>\n            <th>Status</th>\n            <th>Joined</th>\n            <th>Action</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let u of recentUsers\">\n            <td>\n              <div style=\"display:flex;align-items:center;gap:10px\">\n                <div style=\"width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a78bfa);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0\">\n                  {{u.name.substring(0,2).toUpperCase()}}\n                </div>\n                <div>\n                  <div style=\"font-size:13px;font-weight:600;color:var(--text)\">{{u.name}}</div>\n                  <div style=\"font-size:11px;color:var(--text3)\">{{u.company}}</div>\n                </div>\n              </div>\n            </td>\n            <td>\n              <span class=\"badge\"\n                [ngClass]=\"u.role==='transporter' ? 'badge-info' : 'badge-primary'\">\n                {{u.role}}\n              </span>\n            </td>\n            <td>\n              <span class=\"badge\"\n                [ngClass]=\"u.status==='active' ? 'badge-success' : u.status==='pending' ? 'badge-warning' : 'badge-danger'\">\n                {{u.status}}\n              </span>\n            </td>\n            <td style=\"font-size:12px;color:var(--text3)\">{{u.date}}</td>\n            <td>\n              <button class=\"btn btn-outline btn-sm\">Manage</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h3>Recent Listings</h3>\n        <a routerLink=\"/admin/listings\" class=\"card-link\">View all \u2192</a>\n      </div>\n      <table class=\"data-table\">\n        <thead>\n          <tr>\n            <th>Title</th>\n            <th>Category</th>\n            <th>Price</th>\n            <th>Status</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let l of recentListings\">\n            <td>\n              <div style=\"font-size:13px;font-weight:600;color:var(--text)\">{{l.title}}</div>\n              <div style=\"font-size:11px;color:var(--text3)\">{{l.company}}</div>\n            </td>\n            <td><span class=\"badge badge-neutral\">{{l.category}}</span></td>\n            <td style=\"font-weight:600;color:var(--primary)\">{{l.price}} TND</td>\n            <td>\n              <span class=\"badge\"\n                [ngClass]=\"l.status==='active' ? 'badge-success' : 'badge-warning'\">\n                {{l.status}}\n              </span>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n\n      <div style=\"padding:16px 20px;border-top:1px solid var(--border)\">\n        <h3 style=\"font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text);margin-bottom:12px\">System Activity</h3>\n        <div style=\"display:flex;flex-direction:column;gap:10px\">\n          <div *ngFor=\"let a of activity\" style=\"display:flex;gap:10px;align-items:flex-start\">\n            <div style=\"width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0\"\n              [style.background]=\"a.bg\" [style.border]=\"'1px solid ' + a.bdr\">\n              {{a.icon}}\n            </div>\n            <div>\n              <div style=\"font-size:12px;color:var(--text2);font-weight:500\">{{a.text}}</div>\n              <div style=\"font-size:11px;color:var(--text3);margin-top:2px\">{{a.time}}</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n", styles: ["/* theme */"] }]
    }], () => [{ type: i1.AdminApiService }, { type: i2.ListingService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Dashboard, { className: "Dashboard", filePath: "src/app/features/admin/dashboard/dashboard.ts", lineNumber: 11 }); })();
