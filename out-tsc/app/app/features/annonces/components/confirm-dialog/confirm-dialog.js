import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ConfirmDialog_div_0__svg_svg_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 10);
    i0.ɵɵelement(1, "path", 11)(2, "line", 12)(3, "line", 13);
    i0.ɵɵelementEnd();
} }
function ConfirmDialog_div_0__svg_svg_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 10);
    i0.ɵɵelement(1, "circle", 14)(2, "line", 15)(3, "line", 16);
    i0.ɵɵelementEnd();
} }
function ConfirmDialog_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵlistener("click", function ConfirmDialog_div_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onCancel()); });
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵlistener("click", function ConfirmDialog_div_0_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "div", 3);
    i0.ɵɵtemplate(3, ConfirmDialog_div_0__svg_svg_3_Template, 4, 0, "svg", 4)(4, ConfirmDialog_div_0__svg_svg_4_Template, 4, 0, "svg", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3", 5);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 6);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 7)(10, "button", 8);
    i0.ɵɵlistener("click", function ConfirmDialog_div_0_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onCancel()); });
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 9);
    i0.ɵɵlistener("click", function ConfirmDialog_div_0_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onConfirm()); });
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("danger", ctx_r1.danger);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.danger);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.danger);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.message);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.cancelLabel);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("btn-danger", ctx_r1.danger)("btn-primary", !ctx_r1.danger);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.confirmLabel);
} }
export class ConfirmDialog {
    visible = false;
    title = 'Confirmation';
    message = 'Êtes-vous sûr de vouloir effectuer cette action ?';
    confirmLabel = 'Confirmer';
    cancelLabel = 'Annuler';
    danger = true;
    confirmed = new EventEmitter();
    cancelled = new EventEmitter();
    onConfirm() {
        this.confirmed.emit();
    }
    onCancel() {
        this.cancelled.emit();
    }
    static ɵfac = function ConfirmDialog_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ConfirmDialog)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ConfirmDialog, selectors: [["app-confirm-dialog"]], inputs: { visible: "visible", title: "title", message: "message", confirmLabel: "confirmLabel", cancelLabel: "cancelLabel", danger: "danger" }, outputs: { confirmed: "confirmed", cancelled: "cancelled" }, standalone: false, decls: 1, vars: 1, consts: [["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "modal-overlay", 3, "click"], [1, "confirm-box", 3, "click"], [1, "confirm-icon"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 4, "ngIf"], [1, "confirm-title"], [1, "confirm-msg"], [1, "confirm-actions"], [1, "btn", "btn-outline", 3, "click"], [1, "btn", 3, "click"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"]], template: function ConfirmDialog_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ConfirmDialog_div_0_Template, 14, 12, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.visible);
        } }, dependencies: [i1.NgIf], styles: [".confirm-box[_ngcontent-%COMP%]{background:var(--card);border-radius:20px;padding:32px 28px;width:90%;max-width:380px;text-align:center;animation:_ngcontent-%COMP%_cdSlideUp .25s cubic-bezier(.4,0,.2,1);box-shadow:0 24px 48px rgba(0,0,0,.12)}\n.confirm-icon[_ngcontent-%COMP%]{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:22px}\n.confirm-icon.danger[_ngcontent-%COMP%]{background:#fef2f2;color:#ef4444}\n.confirm-icon[_ngcontent-%COMP%]:not(.danger){background:#eff6ff;color:var(--primary)}\n.confirm-title[_ngcontent-%COMP%]{font-size:17px;font-weight:700;color:var(--text);margin-bottom:8px;letter-spacing:-.02em}\n.confirm-msg[_ngcontent-%COMP%]{font-size:14px;color:var(--text3);margin-bottom:24px;line-height:1.55}\n.confirm-actions[_ngcontent-%COMP%]{display:flex;gap:10px;justify-content:center}\n.confirm-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{min-width:110px;justify-content:center;border-radius:10px}\n@keyframes _ngcontent-%COMP%_cdSlideUp{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConfirmDialog, [{
        type: Component,
        args: [{ selector: 'app-confirm-dialog', standalone: false, template: "<div class=\"modal-overlay\" *ngIf=\"visible\" (click)=\"onCancel()\">\n  <div class=\"confirm-box\" (click)=\"$event.stopPropagation()\">\n    <div class=\"confirm-icon\" [class.danger]=\"danger\">\n      <svg *ngIf=\"danger\" width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/>\n      </svg>\n      <svg *ngIf=\"!danger\" width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/>\n      </svg>\n    </div>\n    <h3 class=\"confirm-title\">{{title}}</h3>\n    <p class=\"confirm-msg\">{{message}}</p>\n    <div class=\"confirm-actions\">\n      <button class=\"btn btn-outline\" (click)=\"onCancel()\">{{cancelLabel}}</button>\n      <button class=\"btn\" [class.btn-danger]=\"danger\" [class.btn-primary]=\"!danger\" (click)=\"onConfirm()\">{{confirmLabel}}</button>\n    </div>\n  </div>\n</div>\n", styles: [".confirm-box{background:var(--card);border-radius:20px;padding:32px 28px;width:90%;max-width:380px;text-align:center;animation:cdSlideUp .25s cubic-bezier(.4,0,.2,1);box-shadow:0 24px 48px rgba(0,0,0,.12)}\n.confirm-icon{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:22px}\n.confirm-icon.danger{background:#fef2f2;color:#ef4444}\n.confirm-icon:not(.danger){background:#eff6ff;color:var(--primary)}\n.confirm-title{font-size:17px;font-weight:700;color:var(--text);margin-bottom:8px;letter-spacing:-.02em}\n.confirm-msg{font-size:14px;color:var(--text3);margin-bottom:24px;line-height:1.55}\n.confirm-actions{display:flex;gap:10px;justify-content:center}\n.confirm-actions .btn{min-width:110px;justify-content:center;border-radius:10px}\n@keyframes cdSlideUp{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}\n"] }]
    }], null, { visible: [{
            type: Input
        }], title: [{
            type: Input
        }], message: [{
            type: Input
        }], confirmLabel: [{
            type: Input
        }], cancelLabel: [{
            type: Input
        }], danger: [{
            type: Input
        }], confirmed: [{
            type: Output
        }], cancelled: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ConfirmDialog, { className: "ConfirmDialog", filePath: "src/app/features/annonces/components/confirm-dialog/confirm-dialog.ts", lineNumber: 9 }); })();
