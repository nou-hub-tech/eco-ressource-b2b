import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../services/group-purchase.service";
import * as i2 from "../../../../core/services/auth.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
function GroupPurchasePanel_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1, "Temps restant");
    i0.ɵɵelementEnd();
} }
function GroupPurchasePanel_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtext(1, "Groupe expir\u00E9");
    i0.ɵɵelementEnd();
} }
function GroupPurchasePanel_div_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33)(1, "div", 34)(2, "span", 35);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 36);
    i0.ɵɵtext(5, "j");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 37);
    i0.ɵɵtext(7, ":");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 34)(9, "span", 35);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 36);
    i0.ɵɵtext(13, "h");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "span", 37);
    i0.ɵɵtext(15, ":");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 34)(17, "span", 35);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 36);
    i0.ɵɵtext(21, "m");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "span", 37);
    i0.ɵɵtext(23, ":");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 34)(25, "span", 35);
    i0.ɵɵtext(26);
    i0.ɵɵpipe(27, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 36);
    i0.ɵɵtext(29, "s");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.countdown.days);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 4, ctx_r0.countdown.hours, "2.0-0"));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(19, 7, ctx_r0.countdown.minutes, "2.0-0"));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(27, 10, ctx_r0.countdown.seconds, "2.0-0"));
} }
function GroupPurchasePanel_div_39_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 43);
    i0.ɵɵtext(2, "E");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 44);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 45);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const p_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Entreprise #", p_r2.companyId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", p_r2.quantity, " ", ctx_r0.listing.unit);
} }
function GroupPurchasePanel_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38)(1, "div", 39);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 40);
    i0.ɵɵtemplate(4, GroupPurchasePanel_div_39_div_4_Template, 7, 3, "div", 41);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Participants (", ctx_r0.group.participants.length, ")");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.group.participants);
} }
function GroupPurchasePanel_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 47);
    i0.ɵɵelement(2, "circle", 48)(3, "line", 49)(4, "line", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Vous \u00EAtes le vendeur de cette annonce. Vous ne pouvez pas rejoindre votre propre groupe. ");
    i0.ɵɵelementEnd();
} }
function GroupPurchasePanel_div_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 47);
    i0.ɵɵelement(2, "path", 52)(3, "polyline", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Vous participez d\u00E9j\u00E0 \u00E0 ce groupe. ");
    i0.ɵɵelementEnd();
} }
function GroupPurchasePanel_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function GroupPurchasePanel_button_44_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 55);
    i0.ɵɵlistener("click", function GroupPurchasePanel_button_44_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openJoinForm()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 56);
    i0.ɵɵelement(2, "path", 57)(3, "circle", 58)(4, "line", 59)(5, "line", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, " Rejoindre le groupe ");
    i0.ɵɵelementEnd();
} }
function GroupPurchasePanel_button_45_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Quitter le groupe");
    i0.ɵɵelementEnd();
} }
function GroupPurchasePanel_button_45_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 64);
} }
function GroupPurchasePanel_button_45_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 61);
    i0.ɵɵlistener("click", function GroupPurchasePanel_button_45_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.leaveGroup()); });
    i0.ɵɵtemplate(1, GroupPurchasePanel_button_45_span_1_Template, 2, 0, "span", 62)(2, GroupPurchasePanel_button_45_span_2_Template, 1, 0, "span", 63);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r0.leaveLoading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.leaveLoading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.leaveLoading);
} }
function GroupPurchasePanel_div_46_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵtext(1, "La quantit\u00E9 est obligatoire");
    i0.ɵɵelementEnd();
} }
function GroupPurchasePanel_div_46_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵtext(1, "La quantit\u00E9 doit \u00EAtre sup\u00E9rieure \u00E0 0");
    i0.ɵɵelementEnd();
} }
function GroupPurchasePanel_div_46_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("La quantit\u00E9 ne peut pas d\u00E9passer ", ctx_r0.group.remainingQuantity);
} }
function GroupPurchasePanel_div_46_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Confirmer");
    i0.ɵɵelementEnd();
} }
function GroupPurchasePanel_div_46_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 64);
} }
function GroupPurchasePanel_div_46_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵlistener("click", function GroupPurchasePanel_div_46_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeJoinForm()); });
    i0.ɵɵelementStart(1, "div", 66);
    i0.ɵɵlistener("click", function GroupPurchasePanel_div_46_Template_div_click_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Rejoindre l'achat group\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 67);
    i0.ɵɵtext(5, "Quantit\u00E9 restante disponible : ");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 68)(9, "label");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 69);
    i0.ɵɵtemplate(12, GroupPurchasePanel_div_46_div_12_Template, 2, 0, "div", 70)(13, GroupPurchasePanel_div_46_div_13_Template, 2, 0, "div", 70)(14, GroupPurchasePanel_div_46_div_14_Template, 2, 1, "div", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 71)(16, "button", 72);
    i0.ɵɵlistener("click", function GroupPurchasePanel_div_46_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.closeJoinForm()); });
    i0.ɵɵtext(17, "Annuler");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 73);
    i0.ɵɵlistener("click", function GroupPurchasePanel_div_46_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.joinGroup()); });
    i0.ɵɵtemplate(19, GroupPurchasePanel_div_46_span_19_Template, 2, 0, "span", 62)(20, GroupPurchasePanel_div_46_span_20_Template, 1, 0, "span", 63);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2("", ctx_r0.group.remainingQuantity, " ", ctx_r0.listing.unit);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Quantit\u00E9 souhait\u00E9e (", ctx_r0.listing.unit, ")");
    i0.ɵɵadvance();
    i0.ɵɵproperty("formControl", ctx_r0.quantityCtrl)("max", ctx_r0.group.remainingQuantity);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.quantityCtrl.hasError("required") && ctx_r0.quantityCtrl.touched);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.quantityCtrl.hasError("min"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.quantityCtrl.hasError("max"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r0.quantityCtrl.invalid || ctx_r0.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.loading);
} }
export class GroupPurchasePanel {
    groupService;
    authService;
    listing;
    group;
    quantityCtrl = new FormControl(null, [Validators.required, Validators.min(1)]);
    showJoinForm = false;
    loading = false;
    leaveLoading = false;
    error = '';
    currentCompanyId = null;
    countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    isExpired = false;
    countdownInterval;
    constructor(groupService, authService) {
        this.groupService = groupService;
        this.authService = authService;
    }
    ngOnInit() {
        const user = this.authService.currentUser;
        if (user) {
            this.currentCompanyId = parseInt(user.id, 10);
        }
        this.startCountdown();
    }
    ngOnDestroy() {
        if (this.countdownInterval)
            clearInterval(this.countdownInterval);
    }
    get progress() {
        if (!this.group || this.group.targetQuantity === 0)
            return 0;
        return Math.round((this.group.currentQuantity / this.group.targetQuantity) * 100);
    }
    get progressColor() {
        const p = this.progress;
        if (p >= 75)
            return '#059669';
        if (p >= 25)
            return '#d97706';
        return '#dc2626';
    }
    get statusClass() {
        switch (this.group.status) {
            case 'OPEN': return 'gp-status-open';
            case 'FULL': return 'gp-status-full';
            case 'SUCCESS': return 'gp-status-success';
            case 'FAILED': return 'gp-status-failed';
            case 'CLOSED': return 'gp-status-closed';
            default: return '';
        }
    }
    get statusLabel() {
        switch (this.group.status) {
            case 'OPEN': return 'Ouvert';
            case 'FULL': return 'Complet';
            case 'SUCCESS': return 'Réussi';
            case 'FAILED': return 'Échoué';
            case 'CLOSED': return 'Fermé';
            default: return this.group.status;
        }
    }
    get isSeller() {
        return this.currentCompanyId === this.listing.companyId;
    }
    get isParticipant() {
        if (!this.currentCompanyId || !this.group.participants)
            return false;
        return this.group.participants.some(p => p.companyId === this.currentCompanyId);
    }
    get canJoin() {
        return this.group.status === 'OPEN'
            && !this.isExpired
            && !this.isSeller
            && !this.isParticipant
            && this.group.remainingQuantity > 0;
    }
    get canLeave() {
        return this.isParticipant && this.group.status === 'OPEN' && !this.isExpired;
    }
    openJoinForm() {
        this.showJoinForm = true;
        this.error = '';
        this.quantityCtrl.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(this.group.remainingQuantity)
        ]);
        this.quantityCtrl.updateValueAndValidity();
    }
    closeJoinForm() {
        this.showJoinForm = false;
        this.quantityCtrl.reset();
        this.error = '';
    }
    joinGroup() {
        if (this.quantityCtrl.invalid || !this.currentCompanyId)
            return;
        this.loading = true;
        this.error = '';
        this.groupService.join(this.group.id, {
            quantity: this.quantityCtrl.value,
            companyId: this.currentCompanyId
        }).subscribe({
            next: (updated) => {
                this.group = updated;
                this.loading = false;
                this.closeJoinForm();
            },
            error: (err) => {
                this.error = err.error?.message || 'Erreur lors de la participation';
                this.loading = false;
            }
        });
    }
    leaveGroup() {
        if (!this.currentCompanyId)
            return;
        this.leaveLoading = true;
        this.groupService.leave(this.group.id, this.currentCompanyId).subscribe({
            next: (updated) => {
                this.group = updated;
                this.leaveLoading = false;
            },
            error: (err) => {
                this.error = err.error?.message || 'Erreur lors du retrait';
                this.leaveLoading = false;
            }
        });
    }
    startCountdown() {
        this.updateCountdown();
        this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
    }
    updateCountdown() {
        const deadline = new Date(this.group.deadline).getTime();
        const now = Date.now();
        const diff = deadline - now;
        if (diff <= 0) {
            this.isExpired = true;
            this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            if (this.countdownInterval)
                clearInterval(this.countdownInterval);
            return;
        }
        this.countdown = {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff % 86400000) / 3600000),
            minutes: Math.floor((diff % 3600000) / 60000),
            seconds: Math.floor((diff % 60000) / 1000)
        };
    }
    static ɵfac = function GroupPurchasePanel_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GroupPurchasePanel)(i0.ɵɵdirectiveInject(i1.GroupPurchaseService), i0.ɵɵdirectiveInject(i2.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GroupPurchasePanel, selectors: [["app-group-purchase-panel"]], inputs: { listing: "listing", group: "group" }, standalone: false, decls: 47, vars: 24, consts: [[1, "gp-panel"], [1, "gp-header"], [1, "gp-title"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"], ["cx", "9", "cy", "7", "r", "4"], ["d", "M23 21v-2a4 4 0 00-3-3.87"], ["d", "M16 3.13a4 4 0 010 7.75"], [1, "gp-status", 3, "ngClass"], [1, "gp-progress-section"], [1, "gp-progress-labels"], [1, "gp-pct"], [1, "gp-bar"], [1, "gp-bar-fill"], [1, "gp-qty-row"], [1, "gp-qty-item"], [1, "gp-qty-val"], [1, "gp-qty-label"], [1, "gp-qty-val", 2, "color", "var(--primary)"], [1, "gp-countdown"], ["class", "gp-cd-label", 4, "ngIf"], ["class", "gp-cd-label expired-label", 4, "ngIf"], ["class", "gp-cd-boxes", 4, "ngIf"], ["class", "gp-participants", 4, "ngIf"], ["class", "gp-msg gp-msg-info", 4, "ngIf"], ["class", "gp-msg gp-msg-success", 4, "ngIf"], ["class", "gp-msg gp-msg-error", 4, "ngIf"], [1, "gp-actions"], ["class", "btn btn-primary gp-join-btn", 3, "click", 4, "ngIf"], ["class", "btn btn-outline gp-leave-btn", 3, "disabled", "click", 4, "ngIf"], ["class", "modal-overlay", 3, "click", 4, "ngIf"], [1, "gp-cd-label"], [1, "gp-cd-label", "expired-label"], [1, "gp-cd-boxes"], [1, "gp-cd-box"], [1, "gp-cd-num"], [1, "gp-cd-unit"], [1, "gp-cd-sep"], [1, "gp-participants"], [1, "gp-part-head"], [1, "gp-part-list"], ["class", "gp-part-item", 4, "ngFor", "ngForOf"], [1, "gp-part-item"], [1, "gp-part-avatar"], [1, "gp-part-id"], [1, "gp-part-qty"], [1, "gp-msg", "gp-msg-info"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "gp-msg", "gp-msg-success"], ["d", "M22 11.08V12a10 10 0 11-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "gp-msg", "gp-msg-error"], [1, "btn", "btn-primary", "gp-join-btn", 3, "click"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"], ["cx", "8.5", "cy", "7", "r", "4"], ["x1", "20", "y1", "8", "x2", "20", "y2", "14"], ["x1", "23", "y1", "11", "x2", "17", "y2", "11"], [1, "btn", "btn-outline", "gp-leave-btn", 3, "click", "disabled"], [4, "ngIf"], ["class", "spinner-sm", 4, "ngIf"], [1, "spinner-sm"], [1, "modal-overlay", 3, "click"], [1, "gp-join-modal", 3, "click"], [1, "gp-join-hint"], [1, "form-group"], ["type", "number", "min", "1", "placeholder", "Ex: 100", 3, "formControl", "max"], ["class", "form-error", 4, "ngIf"], [1, "gp-join-actions"], [1, "btn", "btn-outline", 3, "click"], [1, "btn", "btn-primary", 3, "click", "disabled"], [1, "form-error"]], template: function GroupPurchasePanel_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h3", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(3, "svg", 3);
            i0.ɵɵelement(4, "path", 4)(5, "circle", 5)(6, "path", 6)(7, "path", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(8, " Achat Group\u00E9 ");
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(9, "span", 8);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 9)(12, "div", 10)(13, "span");
            i0.ɵɵtext(14, "Progression");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 11);
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 12);
            i0.ɵɵelement(18, "div", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 14)(20, "div", 15)(21, "span", 16);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span", 17);
            i0.ɵɵtext(24, "Actuelle");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 15)(26, "span", 16);
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span", 17);
            i0.ɵɵtext(29, "Objectif");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 15)(31, "span", 18);
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "span", 17);
            i0.ɵɵtext(34, "Restante");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(35, "div", 19);
            i0.ɵɵtemplate(36, GroupPurchasePanel_div_36_Template, 2, 0, "div", 20)(37, GroupPurchasePanel_div_37_Template, 2, 0, "div", 21)(38, GroupPurchasePanel_div_38_Template, 30, 13, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(39, GroupPurchasePanel_div_39_Template, 5, 2, "div", 23)(40, GroupPurchasePanel_div_40_Template, 6, 0, "div", 24)(41, GroupPurchasePanel_div_41_Template, 5, 0, "div", 25)(42, GroupPurchasePanel_div_42_Template, 2, 1, "div", 26);
            i0.ɵɵelementStart(43, "div", 27);
            i0.ɵɵtemplate(44, GroupPurchasePanel_button_44_Template, 7, 0, "button", 28)(45, GroupPurchasePanel_button_45_Template, 3, 3, "button", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(46, GroupPurchasePanel_div_46_Template, 21, 11, "div", 30);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngClass", ctx.statusClass);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.statusLabel);
            i0.ɵɵadvance(5);
            i0.ɵɵstyleProp("color", ctx.progressColor);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("", ctx.progress, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("width", ctx.progress, "%")("background", ctx.progressColor);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.group.currentQuantity);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.group.targetQuantity);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.group.remainingQuantity);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("expired", ctx.isExpired);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isExpired);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isExpired);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isExpired);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.group.participants == null ? null : ctx.group.participants.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSeller);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isParticipant && !ctx.isSeller);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.canJoin);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.canLeave);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showJoinForm);
        } }, dependencies: [i3.NgClass, i3.NgForOf, i3.NgIf, i4.DefaultValueAccessor, i4.NumberValueAccessor, i4.NgControlStatus, i4.MinValidator, i4.MaxValidator, i4.FormControlDirective, i3.DecimalPipe], styles: [".gp-panel[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;padding:22px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.gp-header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}\n.gp-title[_ngcontent-%COMP%]{font-size:15px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px;letter-spacing:-.01em}\n.gp-status[_ngcontent-%COMP%]{font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;letter-spacing:.01em}\n.gp-status-open[_ngcontent-%COMP%]{background:#ecfdf5;color:#047857}\n.gp-status-full[_ngcontent-%COMP%]{background:rgba(0,173,181,.08);color:#009199}\n.gp-status-success[_ngcontent-%COMP%]{background:#ecfdf5;color:#047857}\n.gp-status-failed[_ngcontent-%COMP%]{background:#fef2f2;color:#dc2626}\n.gp-status-closed[_ngcontent-%COMP%]{background:var(--bg3,#f1f5f9);color:var(--text3)}\n.gp-progress-section[_ngcontent-%COMP%]{margin-bottom:18px}\n.gp-progress-labels[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-size:12px;color:var(--text3);margin-bottom:8px;font-weight:500}\n.gp-pct[_ngcontent-%COMP%]{font-weight:800;font-size:16px;letter-spacing:-.02em}\n.gp-bar[_ngcontent-%COMP%]{height:8px;background:var(--bg3,#f1f5f9);border-radius:100px;overflow:hidden}\n.gp-bar-fill[_ngcontent-%COMP%]{height:100%;border-radius:100px;transition:width .8s cubic-bezier(.4,0,.2,1)}\n.gp-qty-row[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-top:12px;gap:8px}\n.gp-qty-item[_ngcontent-%COMP%]{text-align:center;flex:1;padding:12px 8px;background:var(--bg3,#f8fafc);border-radius:12px}\n.gp-qty-val[_ngcontent-%COMP%]{display:block;font-size:20px;font-weight:800;color:var(--text);letter-spacing:-.03em}\n.gp-qty-label[_ngcontent-%COMP%]{font-size:11px;color:var(--text3);margin-top:2px;font-weight:500}\n.gp-countdown[_ngcontent-%COMP%]{padding:16px;border-radius:14px;background:var(--bg3,#f8fafc);margin-bottom:18px;text-align:center}\n.gp-countdown.expired[_ngcontent-%COMP%]{background:#fef2f2}\n.gp-cd-label[_ngcontent-%COMP%]{font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.03em;margin-bottom:10px;text-transform:uppercase}\n.expired-label[_ngcontent-%COMP%]{color:#dc2626!important}\n.gp-cd-boxes[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;gap:6px}\n.gp-cd-box[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:8px 14px;background:var(--card);border-radius:10px;min-width:52px;box-shadow:0 1px 2px rgba(0,0,0,.04)}\n.gp-cd-num[_ngcontent-%COMP%]{font-family:'DM Mono',monospace;font-size:22px;font-weight:700;color:var(--text);line-height:1}\n.gp-cd-unit[_ngcontent-%COMP%]{font-size:9px;color:var(--muted);margin-top:2px;font-weight:600}\n.gp-cd-sep[_ngcontent-%COMP%]{font-size:16px;color:var(--muted)}\n.gp-participants[_ngcontent-%COMP%]{margin-bottom:18px}\n.gp-part-head[_ngcontent-%COMP%]{font-size:13px;font-weight:600;color:var(--text2);margin-bottom:10px}\n.gp-part-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:6px;max-height:200px;overflow-y:auto}\n.gp-part-item[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg3,#f8fafc);border-radius:10px;font-size:13px}\n.gp-part-avatar[_ngcontent-%COMP%]{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#222831,#393E46);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}\n.gp-part-id[_ngcontent-%COMP%]{flex:1;color:var(--text2);font-weight:500}\n.gp-part-qty[_ngcontent-%COMP%]{font-weight:700;color:var(--primary)}\n.gp-msg[_ngcontent-%COMP%]{padding:12px 16px;border-radius:12px;font-size:13px;display:flex;align-items:center;gap:8px;margin-bottom:14px;font-weight:500;line-height:1.45}\n.gp-msg-info[_ngcontent-%COMP%]{background:rgba(0,173,181,.06);color:#009199}\n.gp-msg-success[_ngcontent-%COMP%]{background:#ecfdf5;color:#047857}\n.gp-msg-error[_ngcontent-%COMP%]{background:#fef2f2;color:#dc2626}\n.gp-actions[_ngcontent-%COMP%]{display:flex;gap:10px;flex-wrap:wrap}\n.gp-join-btn[_ngcontent-%COMP%], .gp-leave-btn[_ngcontent-%COMP%]{flex:1;justify-content:center;display:flex;align-items:center;gap:6px;border-radius:12px;padding:12px}\n.gp-join-modal[_ngcontent-%COMP%]{background:var(--card);border-radius:20px;padding:28px;width:90%;max-width:400px;animation:_ngcontent-%COMP%_gpSlideUp .25s cubic-bezier(.4,0,.2,1);box-shadow:0 24px 48px rgba(0,0,0,.15)}\n.gp-join-modal[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:17px;font-weight:700;color:var(--text);margin-bottom:8px;letter-spacing:-.02em}\n.gp-join-hint[_ngcontent-%COMP%]{font-size:13px;color:var(--text3);margin-bottom:18px}\n.gp-join-actions[_ngcontent-%COMP%]{display:flex;gap:10px;justify-content:flex-end;margin-top:18px}\n.spinner-sm[_ngcontent-%COMP%]{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:_ngcontent-%COMP%_spin .6s linear infinite;display:inline-block}\n@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}\n@keyframes _ngcontent-%COMP%_gpSlideUp{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}\n@media(max-width:600px){.gp-cd-box[_ngcontent-%COMP%]{min-width:42px;padding:6px 10px}.gp-cd-num[_ngcontent-%COMP%]{font-size:18px}.gp-qty-val[_ngcontent-%COMP%]{font-size:16px}.gp-actions[_ngcontent-%COMP%]{flex-direction:column}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GroupPurchasePanel, [{
        type: Component,
        args: [{ selector: 'app-group-purchase-panel', standalone: false, template: "<div class=\"gp-panel\">\n  <div class=\"gp-header\">\n    <h3 class=\"gp-title\">\n      <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 00-3-3.87\"/><path d=\"M16 3.13a4 4 0 010 7.75\"/></svg>\n      Achat Group\u00E9\n    </h3>\n    <span class=\"gp-status\" [ngClass]=\"statusClass\">{{statusLabel}}</span>\n  </div>\n\n  <!-- Progress -->\n  <div class=\"gp-progress-section\">\n    <div class=\"gp-progress-labels\">\n      <span>Progression</span>\n      <span class=\"gp-pct\" [style.color]=\"progressColor\">{{progress}}%</span>\n    </div>\n    <div class=\"gp-bar\">\n      <div class=\"gp-bar-fill\" [style.width.%]=\"progress\" [style.background]=\"progressColor\"></div>\n    </div>\n    <div class=\"gp-qty-row\">\n      <div class=\"gp-qty-item\">\n        <span class=\"gp-qty-val\">{{group.currentQuantity}}</span>\n        <span class=\"gp-qty-label\">Actuelle</span>\n      </div>\n      <div class=\"gp-qty-item\">\n        <span class=\"gp-qty-val\">{{group.targetQuantity}}</span>\n        <span class=\"gp-qty-label\">Objectif</span>\n      </div>\n      <div class=\"gp-qty-item\">\n        <span class=\"gp-qty-val\" style=\"color:var(--primary)\">{{group.remainingQuantity}}</span>\n        <span class=\"gp-qty-label\">Restante</span>\n      </div>\n    </div>\n  </div>\n\n  <!-- Countdown -->\n  <div class=\"gp-countdown\" [class.expired]=\"isExpired\">\n    <div class=\"gp-cd-label\" *ngIf=\"!isExpired\">Temps restant</div>\n    <div class=\"gp-cd-label expired-label\" *ngIf=\"isExpired\">Groupe expir\u00E9</div>\n    <div class=\"gp-cd-boxes\" *ngIf=\"!isExpired\">\n      <div class=\"gp-cd-box\"><span class=\"gp-cd-num\">{{countdown.days}}</span><span class=\"gp-cd-unit\">j</span></div>\n      <span class=\"gp-cd-sep\">:</span>\n      <div class=\"gp-cd-box\"><span class=\"gp-cd-num\">{{countdown.hours | number:'2.0-0'}}</span><span class=\"gp-cd-unit\">h</span></div>\n      <span class=\"gp-cd-sep\">:</span>\n      <div class=\"gp-cd-box\"><span class=\"gp-cd-num\">{{countdown.minutes | number:'2.0-0'}}</span><span class=\"gp-cd-unit\">m</span></div>\n      <span class=\"gp-cd-sep\">:</span>\n      <div class=\"gp-cd-box\"><span class=\"gp-cd-num\">{{countdown.seconds | number:'2.0-0'}}</span><span class=\"gp-cd-unit\">s</span></div>\n    </div>\n  </div>\n\n  <!-- Participants -->\n  <div class=\"gp-participants\" *ngIf=\"group.participants?.length\">\n    <div class=\"gp-part-head\">Participants ({{group.participants.length}})</div>\n    <div class=\"gp-part-list\">\n      <div class=\"gp-part-item\" *ngFor=\"let p of group.participants\">\n        <div class=\"gp-part-avatar\">E</div>\n        <span class=\"gp-part-id\">Entreprise #{{p.companyId}}</span>\n        <span class=\"gp-part-qty\">{{p.quantity}} {{listing.unit}}</span>\n      </div>\n    </div>\n  </div>\n\n  <!-- Seller message -->\n  <div class=\"gp-msg gp-msg-info\" *ngIf=\"isSeller\">\n    <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>\n    Vous \u00EAtes le vendeur de cette annonce. Vous ne pouvez pas rejoindre votre propre groupe.\n  </div>\n\n  <!-- Already participant -->\n  <div class=\"gp-msg gp-msg-success\" *ngIf=\"isParticipant && !isSeller\">\n    <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M22 11.08V12a10 10 0 11-5.93-9.14\"/><polyline points=\"22 4 12 14.01 9 11.01\"/></svg>\n    Vous participez d\u00E9j\u00E0 \u00E0 ce groupe.\n  </div>\n\n  <!-- Error -->\n  <div class=\"gp-msg gp-msg-error\" *ngIf=\"error\">{{error}}</div>\n\n  <!-- Actions -->\n  <div class=\"gp-actions\">\n    <button class=\"btn btn-primary gp-join-btn\" *ngIf=\"canJoin\" (click)=\"openJoinForm()\">\n      <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2\"/><circle cx=\"8.5\" cy=\"7\" r=\"4\"/><line x1=\"20\" y1=\"8\" x2=\"20\" y2=\"14\"/><line x1=\"23\" y1=\"11\" x2=\"17\" y2=\"11\"/></svg>\n      Rejoindre le groupe\n    </button>\n    <button class=\"btn btn-outline gp-leave-btn\" *ngIf=\"canLeave\" [disabled]=\"leaveLoading\" (click)=\"leaveGroup()\">\n      <span *ngIf=\"!leaveLoading\">Quitter le groupe</span>\n      <span *ngIf=\"leaveLoading\" class=\"spinner-sm\"></span>\n    </button>\n  </div>\n\n  <!-- Join Form Modal -->\n  <div class=\"modal-overlay\" *ngIf=\"showJoinForm\" (click)=\"closeJoinForm()\">\n    <div class=\"gp-join-modal\" (click)=\"$event.stopPropagation()\">\n      <h3>Rejoindre l'achat group\u00E9</h3>\n      <p class=\"gp-join-hint\">Quantit\u00E9 restante disponible : <strong>{{group.remainingQuantity}} {{listing.unit}}</strong></p>\n      <div class=\"form-group\">\n        <label>Quantit\u00E9 souhait\u00E9e ({{listing.unit}})</label>\n        <input type=\"number\" [formControl]=\"quantityCtrl\" [max]=\"group.remainingQuantity\" min=\"1\" placeholder=\"Ex: 100\">\n        <div class=\"form-error\" *ngIf=\"quantityCtrl.hasError('required') && quantityCtrl.touched\">La quantit\u00E9 est obligatoire</div>\n        <div class=\"form-error\" *ngIf=\"quantityCtrl.hasError('min')\">La quantit\u00E9 doit \u00EAtre sup\u00E9rieure \u00E0 0</div>\n        <div class=\"form-error\" *ngIf=\"quantityCtrl.hasError('max')\">La quantit\u00E9 ne peut pas d\u00E9passer {{group.remainingQuantity}}</div>\n      </div>\n      <div class=\"gp-join-actions\">\n        <button class=\"btn btn-outline\" (click)=\"closeJoinForm()\">Annuler</button>\n        <button class=\"btn btn-primary\" [disabled]=\"quantityCtrl.invalid || loading\" (click)=\"joinGroup()\">\n          <span *ngIf=\"!loading\">Confirmer</span>\n          <span *ngIf=\"loading\" class=\"spinner-sm\"></span>\n        </button>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".gp-panel{background:var(--card);border-radius:16px;padding:22px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.gp-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}\n.gp-title{font-size:15px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px;letter-spacing:-.01em}\n.gp-status{font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;letter-spacing:.01em}\n.gp-status-open{background:#ecfdf5;color:#047857}\n.gp-status-full{background:rgba(0,173,181,.08);color:#009199}\n.gp-status-success{background:#ecfdf5;color:#047857}\n.gp-status-failed{background:#fef2f2;color:#dc2626}\n.gp-status-closed{background:var(--bg3,#f1f5f9);color:var(--text3)}\n.gp-progress-section{margin-bottom:18px}\n.gp-progress-labels{display:flex;justify-content:space-between;font-size:12px;color:var(--text3);margin-bottom:8px;font-weight:500}\n.gp-pct{font-weight:800;font-size:16px;letter-spacing:-.02em}\n.gp-bar{height:8px;background:var(--bg3,#f1f5f9);border-radius:100px;overflow:hidden}\n.gp-bar-fill{height:100%;border-radius:100px;transition:width .8s cubic-bezier(.4,0,.2,1)}\n.gp-qty-row{display:flex;justify-content:space-between;margin-top:12px;gap:8px}\n.gp-qty-item{text-align:center;flex:1;padding:12px 8px;background:var(--bg3,#f8fafc);border-radius:12px}\n.gp-qty-val{display:block;font-size:20px;font-weight:800;color:var(--text);letter-spacing:-.03em}\n.gp-qty-label{font-size:11px;color:var(--text3);margin-top:2px;font-weight:500}\n.gp-countdown{padding:16px;border-radius:14px;background:var(--bg3,#f8fafc);margin-bottom:18px;text-align:center}\n.gp-countdown.expired{background:#fef2f2}\n.gp-cd-label{font-size:11px;color:var(--text3);font-weight:600;letter-spacing:.03em;margin-bottom:10px;text-transform:uppercase}\n.expired-label{color:#dc2626!important}\n.gp-cd-boxes{display:flex;align-items:center;justify-content:center;gap:6px}\n.gp-cd-box{display:flex;flex-direction:column;align-items:center;padding:8px 14px;background:var(--card);border-radius:10px;min-width:52px;box-shadow:0 1px 2px rgba(0,0,0,.04)}\n.gp-cd-num{font-family:'DM Mono',monospace;font-size:22px;font-weight:700;color:var(--text);line-height:1}\n.gp-cd-unit{font-size:9px;color:var(--muted);margin-top:2px;font-weight:600}\n.gp-cd-sep{font-size:16px;color:var(--muted)}\n.gp-participants{margin-bottom:18px}\n.gp-part-head{font-size:13px;font-weight:600;color:var(--text2);margin-bottom:10px}\n.gp-part-list{display:flex;flex-direction:column;gap:6px;max-height:200px;overflow-y:auto}\n.gp-part-item{display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg3,#f8fafc);border-radius:10px;font-size:13px}\n.gp-part-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#222831,#393E46);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}\n.gp-part-id{flex:1;color:var(--text2);font-weight:500}\n.gp-part-qty{font-weight:700;color:var(--primary)}\n.gp-msg{padding:12px 16px;border-radius:12px;font-size:13px;display:flex;align-items:center;gap:8px;margin-bottom:14px;font-weight:500;line-height:1.45}\n.gp-msg-info{background:rgba(0,173,181,.06);color:#009199}\n.gp-msg-success{background:#ecfdf5;color:#047857}\n.gp-msg-error{background:#fef2f2;color:#dc2626}\n.gp-actions{display:flex;gap:10px;flex-wrap:wrap}\n.gp-join-btn,.gp-leave-btn{flex:1;justify-content:center;display:flex;align-items:center;gap:6px;border-radius:12px;padding:12px}\n.gp-join-modal{background:var(--card);border-radius:20px;padding:28px;width:90%;max-width:400px;animation:gpSlideUp .25s cubic-bezier(.4,0,.2,1);box-shadow:0 24px 48px rgba(0,0,0,.15)}\n.gp-join-modal h3{font-size:17px;font-weight:700;color:var(--text);margin-bottom:8px;letter-spacing:-.02em}\n.gp-join-hint{font-size:13px;color:var(--text3);margin-bottom:18px}\n.gp-join-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:18px}\n.spinner-sm{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}\n@keyframes spin{to{transform:rotate(360deg)}}\n@keyframes gpSlideUp{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}\n@media(max-width:600px){.gp-cd-box{min-width:42px;padding:6px 10px}.gp-cd-num{font-size:18px}.gp-qty-val{font-size:16px}.gp-actions{flex-direction:column}}\n"] }]
    }], () => [{ type: i1.GroupPurchaseService }, { type: i2.AuthService }], { listing: [{
            type: Input
        }], group: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(GroupPurchasePanel, { className: "GroupPurchasePanel", filePath: "src/app/features/annonces/components/group-purchase-panel/group-purchase-panel.ts", lineNumber: 13 }); })();
