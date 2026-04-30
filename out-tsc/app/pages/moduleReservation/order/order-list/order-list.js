import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class OrderList {
    static ɵfac = function OrderList_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OrderList)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OrderList, selectors: [["app-order-list"]], decls: 2, vars: 0, template: function OrderList_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "p");
            i0.ɵɵtext(1, "order-list works!");
            i0.ɵɵdomElementEnd();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OrderList, [{
        type: Component,
        args: [{ selector: 'app-order-list', imports: [], template: "<p>order-list works!</p>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OrderList, { className: "OrderList", filePath: "src/pages/modulereservation/order/order-list/order-list.ts", lineNumber: 9 }); })();
