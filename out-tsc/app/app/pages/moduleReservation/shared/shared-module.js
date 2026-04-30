import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class SharedModule {
    static ɵfac = function SharedModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SharedModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SharedModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SharedModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [
                    CommonModule
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SharedModule, { imports: [CommonModule] }); })();
