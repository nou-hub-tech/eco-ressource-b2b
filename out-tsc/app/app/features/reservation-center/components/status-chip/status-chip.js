import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class StatusChip {
    label = '';
    variant = 'neutral';
    static ɵfac = function StatusChip_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StatusChip)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StatusChip, selectors: [["app-status-chip"]], inputs: { label: "label", variant: "variant" }, decls: 2, vars: 2, consts: [[1, "rc-chip", 3, "ngClass"]], template: function StatusChip_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "span", 0);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngClass", "rc-chip-" + ctx.variant);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.label);
        } }, dependencies: [CommonModule, i1.NgClass], styles: [".rc-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 700;\n  border: 1px solid transparent;\n}\n\n.rc-chip-success[_ngcontent-%COMP%] {\n  background: rgba(5, 150, 105, 0.12);\n  color: #047857;\n  border-color: rgba(5, 150, 105, 0.18);\n}\n\n.rc-chip-warning[_ngcontent-%COMP%] {\n  background: rgba(217, 119, 6, 0.12);\n  color: #b45309;\n  border-color: rgba(217, 119, 6, 0.18);\n}\n\n.rc-chip-danger[_ngcontent-%COMP%] {\n  background: rgba(220, 38, 38, 0.1);\n  color: #b42318;\n  border-color: rgba(220, 38, 38, 0.16);\n}\n\n.rc-chip-info[_ngcontent-%COMP%] {\n  background: rgba(14, 165, 233, 0.12);\n  color: #0369a1;\n  border-color: rgba(14, 165, 233, 0.18);\n}\n\n.rc-chip-neutral[_ngcontent-%COMP%] {\n  background: rgba(100, 116, 139, 0.12);\n  color: #475569;\n  border-color: rgba(100, 116, 139, 0.16);\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StatusChip, [{
        type: Component,
        args: [{ selector: 'app-status-chip', standalone: true, imports: [CommonModule], template: "<span class=\"rc-chip\" [ngClass]=\"'rc-chip-' + variant\">{{ label }}</span>\n", styles: [".rc-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 700;\n  border: 1px solid transparent;\n}\n\n.rc-chip-success {\n  background: rgba(5, 150, 105, 0.12);\n  color: #047857;\n  border-color: rgba(5, 150, 105, 0.18);\n}\n\n.rc-chip-warning {\n  background: rgba(217, 119, 6, 0.12);\n  color: #b45309;\n  border-color: rgba(217, 119, 6, 0.18);\n}\n\n.rc-chip-danger {\n  background: rgba(220, 38, 38, 0.1);\n  color: #b42318;\n  border-color: rgba(220, 38, 38, 0.16);\n}\n\n.rc-chip-info {\n  background: rgba(14, 165, 233, 0.12);\n  color: #0369a1;\n  border-color: rgba(14, 165, 233, 0.18);\n}\n\n.rc-chip-neutral {\n  background: rgba(100, 116, 139, 0.12);\n  color: #475569;\n  border-color: rgba(100, 116, 139, 0.16);\n}\n"] }]
    }], null, { label: [{
            type: Input,
            args: [{ required: true }]
        }], variant: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StatusChip, { className: "StatusChip", filePath: "src/app/features/reservation-center/components/status-chip/status-chip.ts", lineNumber: 11 }); })();
