import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class Deliveries {
    static ɵfac = function Deliveries_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Deliveries)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Deliveries, selectors: [["app-deliveries"]], standalone: false, decls: 2, vars: 0, template: function Deliveries_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "p");
            i0.ɵɵtext(1, "deliveries works!");
            i0.ɵɵelementEnd();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Deliveries, [{
        type: Component,
        args: [{ selector: 'app-deliveries', standalone: false, template: "<p>deliveries works!</p>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Deliveries, { className: "Deliveries", filePath: "src/app/features/admin/deliveries/deliveries.ts", lineNumber: 9 }); })();
