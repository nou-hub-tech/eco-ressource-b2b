import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class Earnings {
    static ɵfac = function Earnings_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Earnings)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Earnings, selectors: [["app-earnings"]], standalone: false, decls: 2, vars: 0, template: function Earnings_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "p");
            i0.ɵɵtext(1, "earnings works!");
            i0.ɵɵelementEnd();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Earnings, [{
        type: Component,
        args: [{ selector: 'app-earnings', standalone: false, template: "<p>earnings works!</p>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Earnings, { className: "Earnings", filePath: "src/app/features/transporter/earnings/earnings.ts", lineNumber: 9 }); })();
