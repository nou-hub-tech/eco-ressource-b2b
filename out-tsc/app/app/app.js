import { Component, signal } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class App {
    title = signal('eco-ressource-b2b', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["app-root"]], standalone: false, decls: 1, vars: 0, template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "router-outlet");
        } }, dependencies: [i1.RouterOutlet], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'app-root', standalone: false, template: "<router-outlet></router-outlet>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 9 }); })();
