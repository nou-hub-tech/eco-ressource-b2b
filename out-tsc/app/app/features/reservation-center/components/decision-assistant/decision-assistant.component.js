import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/reservation-center.service";
import * as i2 from "@angular/common";
export class DecisionAssistantComponent {
    workspace;
    reservation;
    reservations = [];
    slots = [];
    decision = 'Accept';
    explanation = 'Low conflict and optimal slot usage.';
    constructor(workspace) {
        this.workspace = workspace;
    }
    ngOnChanges() {
        if (!this.reservation) {
            return;
        }
        const slot = this.slots.find(item => item.id === this.reservation.slotId);
        const conflict = this.workspace.detectReservationConflict(this.reservation, this.reservations, this.slots);
        const slotWindow = slot ? Math.max(1, slot.endHour - slot.startHour) : 0;
        if (this.reservation.status === 'CONFIRMED') {
            this.decision = 'Accept';
            this.explanation = 'Already confirmed on the backend.';
            return;
        }
        if (this.reservation.status === 'CANCELLED') {
            this.decision = 'Reject';
            this.explanation = 'Already rejected or cancelled on the backend.';
            return;
        }
        if (!slot) {
            this.decision = 'Reject';
            this.explanation = 'Linked slot is unavailable.';
            return;
        }
        if (slot.status === 'blocked') {
            this.decision = 'Reject';
            this.explanation = 'Slot is blocked and cannot accept new usage.';
            return;
        }
        if (slot.status === 'booked') {
            this.decision = 'Reject';
            this.explanation = 'Slot is already booked.';
            return;
        }
        if (conflict.hasConflict) {
            this.decision = 'Reject';
            this.explanation = `${conflict.blockingReservations.length} overlapping request(s) detected.`;
            return;
        }
        if (this.reservation.hours > slotWindow) {
            this.decision = 'Reject';
            this.explanation = 'Requested duration exceeds the slot availability window.';
            return;
        }
        this.decision = 'Accept';
        this.explanation = 'Low conflict and optimal slot usage.';
    }
    static ɵfac = function DecisionAssistantComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DecisionAssistantComponent)(i0.ɵɵdirectiveInject(i1.ReservationCenterService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DecisionAssistantComponent, selectors: [["app-decision-assistant"]], inputs: { reservation: "reservation", reservations: "reservations", slots: "slots" }, features: [i0.ɵɵNgOnChangesFeature], decls: 5, vars: 3, consts: [[1, "da-card", 3, "ngClass"]], template: function DecisionAssistantComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "strong");
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "p");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("ngClass", ctx.decision === "Accept" ? "accept" : "reject");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("AI Suggestion: ", ctx.decision);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.explanation);
        } }, dependencies: [CommonModule, i2.NgClass], styles: [".da-card[_ngcontent-%COMP%] {\n  min-width: 200px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  border: 1px solid transparent;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.da-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  margin-bottom: 4px;\n}\n\n.da-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 11px;\n  line-height: 1.4;\n}\n\n.da-card.accept[_ngcontent-%COMP%] {\n  background: rgba(5, 150, 105, 0.1);\n  border-color: rgba(5, 150, 105, 0.18);\n  color: #047857;\n}\n\n.da-card.reject[_ngcontent-%COMP%] {\n  background: rgba(220, 38, 38, 0.08);\n  border-color: rgba(220, 38, 38, 0.14);\n  color: #b42318;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DecisionAssistantComponent, [{
        type: Component,
        args: [{ selector: 'app-decision-assistant', standalone: true, imports: [CommonModule], template: "<div class=\"da-card\" [ngClass]=\"decision === 'Accept' ? 'accept' : 'reject'\">\n  <strong>AI Suggestion: {{ decision }}</strong>\n  <p>{{ explanation }}</p>\n</div>\n", styles: [".da-card {\n  min-width: 200px;\n  padding: 10px 12px;\n  border-radius: 10px;\n  border: 1px solid transparent;\n  font-family: 'Space Grotesk', sans-serif;\n}\n\n.da-card strong {\n  display: block;\n  font-size: 11px;\n  margin-bottom: 4px;\n}\n\n.da-card p {\n  margin: 0;\n  font-size: 11px;\n  line-height: 1.4;\n}\n\n.da-card.accept {\n  background: rgba(5, 150, 105, 0.1);\n  border-color: rgba(5, 150, 105, 0.18);\n  color: #047857;\n}\n\n.da-card.reject {\n  background: rgba(220, 38, 38, 0.08);\n  border-color: rgba(220, 38, 38, 0.14);\n  color: #b42318;\n}\n"] }]
    }], () => [{ type: i1.ReservationCenterService }], { reservation: [{
            type: Input,
            args: [{ required: true }]
        }], reservations: [{
            type: Input
        }], slots: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DecisionAssistantComponent, { className: "DecisionAssistantComponent", filePath: "src/app/features/reservation-center/components/decision-assistant/decision-assistant.component.ts", lineNumber: 16 }); })();
