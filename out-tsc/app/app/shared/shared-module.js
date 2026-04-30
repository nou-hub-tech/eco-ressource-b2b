import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
import * as i0 from "@angular/core";
export class SharedModule {
    static ɵfac = function SharedModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SharedModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SharedModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, RouterModule, FormsModule, FormsModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SharedModule, [{
        type: NgModule,
        args: [{
                declarations: [Sidebar, Header, Layout],
                imports: [CommonModule, RouterModule, FormsModule],
                exports: [Sidebar, Header, Layout, FormsModule]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SharedModule, { declarations: [Sidebar, Header, Layout], imports: [CommonModule, RouterModule, FormsModule], exports: [Sidebar, Header, Layout, FormsModule] }); })();
