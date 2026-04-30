import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/transport.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
function Dashboard_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30)(1, "div", 31);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "div", 32);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 33);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 34);
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
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u25B2 ", s_r1.change);
} }
function Dashboard_tr_64_button_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵtext(1, "Confirm Pickup");
    i0.ɵɵelementEnd();
} }
function Dashboard_tr_64_button_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵtext(1, "View");
    i0.ɵɵelementEnd();
} }
function Dashboard_tr_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "code", 35);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td")(5, "strong", 36);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td", 37);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td")(10, "span", 38);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td")(13, "strong", 39);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "td", 40);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵtemplate(18, Dashboard_tr_64_button_18_Template, 2, 0, "button", 41)(19, Dashboard_tr_64_button_19_Template, 2, 0, "button", 42);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const t_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(t_r2.id);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(t_r2.route);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r2.cargo);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", t_r2.status === "delivered" ? "badge-success" : t_r2.status === "in-transit" ? "badge-info" : "badge-warning");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(t_r2.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", t_r2.earn, " TND");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(t_r2.date);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", t_r2.status === "pickup");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", t_r2.status !== "pickup");
} }
export class Dashboard {
    transportService;
    stats = [
        { label: 'Total Trips', value: '0', change: '+0 this month', up: true, icon: '🗺', bg: 'rgba(245,158,11,.1)' },
        { label: 'Active Shipments', value: '0', change: 'On schedule', up: true, icon: '📦', bg: 'rgba(52,211,153,.08)' },
        { label: 'km Driven', value: '0', change: '+0 this week', up: true, icon: '📏', bg: 'rgba(96,165,250,.08)' },
        { label: 'CO₂ Saved', value: '0kg', change: 'Via pooling', up: true, icon: '🌿', bg: 'rgba(52,211,153,.08)' },
    ];
    trips = [];
    constructor(transportService) {
        this.transportService = transportService;
    }
    ngOnInit() {
        this.loadDashboardData();
    }
    loadDashboardData() {
        this.transportService.getTransporterDeliveries().subscribe(deliveries => {
            this.trips = deliveries;
            // Update stats
            this.stats[0].value = deliveries.length.toString();
            this.stats[0].change = `+${Math.floor(Math.random() * 10)} this month`;
            const activeShipments = deliveries.filter(d => d.status === 'in-transit' || d.status === 'pickup').length;
            this.stats[1].value = activeShipments.toString();
            // Mock calculations for km driven and CO2 saved
            const totalKm = deliveries.reduce((sum, d) => sum + 120, 0); // Mock 120km per delivery
            this.stats[2].value = totalKm.toString();
            this.stats[2].change = `+${Math.floor(Math.random() * 400)} this week`;
            const co2Saved = Math.floor(totalKm * 0.02); // Mock 0.02kg CO2 per km
            this.stats[3].value = `${co2Saved}kg`;
        });
    }
    static ɵfac = function Dashboard_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Dashboard)(i0.ɵɵdirectiveInject(i1.TransportService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Dashboard, selectors: [["app-dashboard"]], standalone: false, decls: 65, vars: 2, consts: [[1, "page-wrapper"], [1, "t-banner"], [2, "font-family", "'Syne',sans-serif", "font-size", "20px", "font-weight", "800", "color", "var(--text)", "letter-spacing", "-.5px", "margin-bottom", "4px"], [2, "font-size", "13px", "color", "var(--text3)"], [2, "text-align", "right"], [2, "display", "inline-flex", "align-items", "center", "gap", "6px", "padding", "6px 14px", "background", "rgba(52,211,153,.1)", "border", "1px solid rgba(52,211,153,.2)", "border-radius", "100px", "font-size", "12px", "font-weight", "600", "color", "var(--success,#34d399)", "margin-bottom", "8px"], [2, "width", "6px", "height", "6px", "border-radius", "50%", "background", "#34d399", "display", "inline-block", "animation", "pulseDot 2s infinite"], [2, "font-family", "'Syne',sans-serif", "font-size", "24px", "font-weight", "800", "color", "var(--accent)", "letter-spacing", "-1px"], [2, "font-size", "13px", "font-weight", "400", "color", "var(--text3)"], [1, "stats-grid"], ["class", "stat-card", 4, "ngFor", "ngForOf"], [1, "card", 2, "margin-bottom", "20px", "overflow", "hidden"], [1, "card-header"], [1, "badge", "badge-info"], [1, "t-map-mock"], [1, "t-map-grid"], [1, "t-map-content"], [1, "t-route-line"], [1, "t-dot", "t-dot-start"], [1, "t-city"], [1, "t-line"], [1, "t-truck"], [1, "t-dot", "t-dot-end"], [1, "t-map-info"], [2, "color", "var(--text3)", "font-size", "11px"], [2, "color", "var(--accent)", "font-weight", "600", "font-size", "12px"], [1, "card", 2, "padding", "0"], ["routerLink", "/transporter/trips", 1, "card-link"], [1, "data-table"], [4, "ngFor", "ngForOf"], [1, "stat-card"], [1, "stat-icon"], [1, "stat-value"], [1, "stat-label"], [1, "stat-change", "up"], [2, "font-size", "11px", "color", "var(--text3)"], [2, "color", "var(--text)"], [2, "font-size", "12px", "color", "var(--text2)"], [1, "badge", 3, "ngClass"], [2, "color", "var(--accent)"], [2, "font-size", "12px", "color", "var(--text3)"], ["class", "btn btn-outline btn-sm", 4, "ngIf"], ["class", "btn btn-ghost btn-sm", 4, "ngIf"], [1, "btn", "btn-outline", "btn-sm"], [1, "btn", "btn-ghost", "btn-sm"]], template: function Dashboard_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h2", 2);
            i0.ɵɵtext(4, "Good morning, Karim \uD83D\uDC4B");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 3);
            i0.ɵɵtext(6, "You have 3 active trips today. 1 pickup pending.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 4)(8, "div", 5);
            i0.ɵɵelement(9, "span", 6);
            i0.ɵɵtext(10, " Online & Available ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "div", 7);
            i0.ɵɵtext(12, "3,240 ");
            i0.ɵɵelementStart(13, "span", 8);
            i0.ɵɵtext(14, "TND this month");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(15, "div", 9);
            i0.ɵɵtemplate(16, Dashboard_div_16_Template, 10, 6, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 11)(18, "div", 12)(19, "h3");
            i0.ɵɵtext(20, "Active Route \u2014 DEL-1046");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "span", 13);
            i0.ɵɵtext(22, "In Transit");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "div", 14);
            i0.ɵɵelement(24, "div", 15);
            i0.ɵɵelementStart(25, "div", 16)(26, "div", 17)(27, "div", 18)(28, "span", 19);
            i0.ɵɵtext(29, "GAB\u00C8S");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(30, "div", 20);
            i0.ɵɵelementStart(31, "div", 21);
            i0.ɵɵtext(32, "\uD83D\uDE9A");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 22)(34, "span", 19);
            i0.ɵɵtext(35, "TUNIS");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(36, "div", 23)(37, "span", 24);
            i0.ɵɵtext(38, "Cargo: Steel Offcuts 2,000kg \u00B7 ETA: 14:30");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "span", 25);
            i0.ɵɵtext(40, "212 km remaining");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(41, "div", 26)(42, "div", 12)(43, "h3");
            i0.ɵɵtext(44, "Today's Trips");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "a", 27);
            i0.ɵɵtext(46, "All trips \u2192");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "table", 28)(48, "thead")(49, "tr")(50, "th");
            i0.ɵɵtext(51, "ID");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "th");
            i0.ɵɵtext(53, "Route");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "th");
            i0.ɵɵtext(55, "Cargo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "th");
            i0.ɵɵtext(57, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "th");
            i0.ɵɵtext(59, "Earnings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "th");
            i0.ɵɵtext(61, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(62, "th");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "tbody");
            i0.ɵɵtemplate(64, Dashboard_tr_64_Template, 20, 9, "tr", 29);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(16);
            i0.ɵɵproperty("ngForOf", ctx.stats);
            i0.ɵɵadvance(48);
            i0.ɵɵproperty("ngForOf", ctx.trips);
        } }, dependencies: [i2.NgClass, i2.NgForOf, i2.NgIf, i3.RouterLink], styles: [".t-banner[_ngcontent-%COMP%]{background:linear-gradient(135deg,rgba(217,119,6,.12),rgba(245,158,11,.06));border:1px solid rgba(245,158,11,.18);border-radius:12px;padding:20px 24px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}\n.t-map-mock[_ngcontent-%COMP%]{height:140px;background:linear-gradient(135deg,var(--bg3,#161208),var(--bg2));position:relative;overflow:hidden}\n.t-map-grid[_ngcontent-%COMP%]{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(245,158,11,.03) 0,rgba(245,158,11,.03) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(245,158,11,.03) 0,rgba(245,158,11,.03) 1px,transparent 1px,transparent 40px)}\n.t-map-content[_ngcontent-%COMP%]{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}\n.t-route-line[_ngcontent-%COMP%]{display:flex;align-items:center;gap:0;position:relative}\n.t-dot[_ngcontent-%COMP%]{width:12px;height:12px;border-radius:50%;position:relative}\n.t-dot-start[_ngcontent-%COMP%]{background:#34d399;box-shadow:0 0 12px rgba(52,211,153,.5)}\n.t-dot-end[_ngcontent-%COMP%]{background:#fbbf24;box-shadow:0 0 12px rgba(251,191,36,.5);animation:pulseDot 1.5s infinite}\n.t-city[_ngcontent-%COMP%]{position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:var(--text2);white-space:nowrap;letter-spacing:.5px}\n.t-line[_ngcontent-%COMP%]{width:160px;height:2px;background:linear-gradient(90deg,#d97706,#fbbf24);border-radius:1px;position:relative}\n.t-truck[_ngcontent-%COMP%]{position:absolute;left:40%;font-size:16px;top:-10px;animation:_ngcontent-%COMP%_truckMove 3s ease-in-out infinite}\n@keyframes _ngcontent-%COMP%_truckMove{0%,100%{left:30%}50%{left:50%}}\n.t-map-info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:280px;font-size:11px}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Dashboard, [{
        type: Component,
        args: [{ selector: 'app-dashboard', standalone: false, template: "<div class=\"page-wrapper\">\n  <!-- Welcome banner -->\n  <div class=\"t-banner\">\n    <div>\n      <h2 style=\"font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--text);letter-spacing:-.5px;margin-bottom:4px\">Good morning, Karim \uD83D\uDC4B</h2>\n      <p style=\"font-size:13px;color:var(--text3)\">You have 3 active trips today. 1 pickup pending.</p>\n    </div>\n    <div style=\"text-align:right\">\n      <div style=\"display:inline-flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.2);border-radius:100px;font-size:12px;font-weight:600;color:var(--success,#34d399);margin-bottom:8px\">\n        <span style=\"width:6px;height:6px;border-radius:50%;background:#34d399;display:inline-block;animation:pulseDot 2s infinite\"></span>\n        Online &amp; Available\n      </div>\n      <div style=\"font-family:'Syne',sans-serif;font-size:24px;font-weight:800;color:var(--accent);letter-spacing:-1px\">3,240 <span style=\"font-size:13px;font-weight:400;color:var(--text3)\">TND this month</span></div>\n    </div>\n  </div>\n\n  <div class=\"stats-grid\">\n    <div class=\"stat-card\" *ngFor=\"let s of stats\">\n      <div class=\"stat-icon\" [style.background]=\"s.bg\">{{s.icon}}</div>\n      <div>\n        <div class=\"stat-value\">{{s.value}}</div>\n        <div class=\"stat-label\">{{s.label}}</div>\n        <div class=\"stat-change up\">\u25B2 {{s.change}}</div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Active Route Map Mock -->\n  <div class=\"card\" style=\"margin-bottom:20px;overflow:hidden\">\n    <div class=\"card-header\">\n      <h3>Active Route \u2014 DEL-1046</h3>\n      <span class=\"badge badge-info\">In Transit</span>\n    </div>\n    <div class=\"t-map-mock\">\n      <div class=\"t-map-grid\"></div>\n      <div class=\"t-map-content\">\n        <div class=\"t-route-line\">\n          <div class=\"t-dot t-dot-start\">\n            <span class=\"t-city\">GAB\u00C8S</span>\n          </div>\n          <div class=\"t-line\"></div>\n          <div class=\"t-truck\">\uD83D\uDE9A</div>\n          <div class=\"t-dot t-dot-end\">\n            <span class=\"t-city\">TUNIS</span>\n          </div>\n        </div>\n        <div class=\"t-map-info\">\n          <span style=\"color:var(--text3);font-size:11px\">Cargo: Steel Offcuts 2,000kg \u00B7 ETA: 14:30</span>\n          <span style=\"color:var(--accent);font-weight:600;font-size:12px\">212 km remaining</span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Trips -->\n  <div class=\"card\" style=\"padding:0\">\n    <div class=\"card-header\"><h3>Today's Trips</h3><a routerLink=\"/transporter/trips\" class=\"card-link\">All trips \u2192</a></div>\n    <table class=\"data-table\">\n      <thead><tr><th>ID</th><th>Route</th><th>Cargo</th><th>Status</th><th>Earnings</th><th>Date</th><th></th></tr></thead>\n      <tbody>\n        <tr *ngFor=\"let t of trips\">\n          <td><code style=\"font-size:11px;color:var(--text3)\">{{t.id}}</code></td>\n          <td><strong style=\"color:var(--text)\">{{t.route}}</strong></td>\n          <td style=\"font-size:12px;color:var(--text2)\">{{t.cargo}}</td>\n          <td>\n            <span class=\"badge\" [ngClass]=\"t.status==='delivered'?'badge-success':t.status==='in-transit'?'badge-info':'badge-warning'\">{{t.status}}</span>\n          </td>\n          <td><strong style=\"color:var(--accent)\">{{t.earn}} TND</strong></td>\n          <td style=\"font-size:12px;color:var(--text3)\">{{t.date}}</td>\n          <td>\n            <button class=\"btn btn-outline btn-sm\" *ngIf=\"t.status==='pickup'\">Confirm Pickup</button>\n            <button class=\"btn btn-ghost btn-sm\" *ngIf=\"t.status!=='pickup'\">View</button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>", styles: [".t-banner{background:linear-gradient(135deg,rgba(217,119,6,.12),rgba(245,158,11,.06));border:1px solid rgba(245,158,11,.18);border-radius:12px;padding:20px 24px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}\n.t-map-mock{height:140px;background:linear-gradient(135deg,var(--bg3,#161208),var(--bg2));position:relative;overflow:hidden}\n.t-map-grid{position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(245,158,11,.03) 0,rgba(245,158,11,.03) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(245,158,11,.03) 0,rgba(245,158,11,.03) 1px,transparent 1px,transparent 40px)}\n.t-map-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}\n.t-route-line{display:flex;align-items:center;gap:0;position:relative}\n.t-dot{width:12px;height:12px;border-radius:50%;position:relative}\n.t-dot-start{background:#34d399;box-shadow:0 0 12px rgba(52,211,153,.5)}\n.t-dot-end{background:#fbbf24;box-shadow:0 0 12px rgba(251,191,36,.5);animation:pulseDot 1.5s infinite}\n.t-city{position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:700;color:var(--text2);white-space:nowrap;letter-spacing:.5px}\n.t-line{width:160px;height:2px;background:linear-gradient(90deg,#d97706,#fbbf24);border-radius:1px;position:relative}\n.t-truck{position:absolute;left:40%;font-size:16px;top:-10px;animation:truckMove 3s ease-in-out infinite}\n@keyframes truckMove{0%,100%{left:30%}50%{left:50%}}\n.t-map-info{display:flex;justify-content:space-between;width:280px;font-size:11px}"] }]
    }], () => [{ type: i1.TransportService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Dashboard, { className: "Dashboard", filePath: "src/app/features/transporter/dashboard/dashboard.ts", lineNumber: 5 }); })();
