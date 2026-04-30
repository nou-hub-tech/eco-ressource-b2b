import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/auth";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
function Register_div_38_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵlistener("click", function Register_div_38_div_4_Template_div_click_0_listener() { let tmp_4_0; const r_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView((tmp_4_0 = ctx_r3.form.get("role")) == null ? null : tmp_4_0.setValue(r_r3.value)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_3_0;
    const r_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ((tmp_3_0 = ctx_r3.form.get("role")) == null ? null : tmp_3_0.value) === r_r3.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r3.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(r_r3.label);
} }
function Register_div_38_option_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", s_r5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r5);
} }
function Register_div_38_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "p", 19);
    i0.ɵɵtext(2, "Company information");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 20);
    i0.ɵɵtemplate(4, Register_div_38_div_4_Template, 5, 4, "div", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 22)(6, "label");
    i0.ɵɵtext(7, "Company name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 24)(10, "div", 22)(11, "label");
    i0.ɵɵtext(12, "Sector *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "select", 25)(14, "option", 26);
    i0.ɵɵtext(15, "Select...");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(16, Register_div_38_option_16_Template, 2, 2, "option", 27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 22)(18, "label");
    i0.ɵɵtext(19, "Tax ID (Matricule) *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "input", 28);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "button", 29);
    i0.ɵɵlistener("click", function Register_div_38_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r1); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.nextStep()); });
    i0.ɵɵtext(22, " Continue \u2192 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r3.roles);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngForOf", ctx_r3.sectors);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", !ctx_r3.isStep1Valid());
} }
function Register_div_39_span_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Create account \u2713");
    i0.ɵɵelementEnd();
} }
function Register_div_39_span_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Creating...");
    i0.ɵɵelementEnd();
} }
function Register_div_39_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div")(1, "p", 19);
    i0.ɵɵtext(2, "Your account details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 22)(4, "label");
    i0.ɵɵtext(5, "Full name *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "input", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 24)(8, "div", 22)(9, "label");
    i0.ɵɵtext(10, "Professional email *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 22)(13, "label");
    i0.ɵɵtext(14, "Phone *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 34);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 22)(17, "label");
    i0.ɵɵtext(18, "Password * (min. 8 characters)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "label", 36);
    i0.ɵɵelement(21, "input", 37);
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "I accept the ");
    i0.ɵɵelementStart(24, "a", 38);
    i0.ɵɵtext(25, "Terms of Service");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(26, " and ");
    i0.ɵɵelementStart(27, "a", 38);
    i0.ɵɵtext(28, "Privacy Policy");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 39)(30, "button", 40);
    i0.ɵɵlistener("click", function Register_div_39_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r6); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.prevStep()); });
    i0.ɵɵtext(31, "\u2190 Back");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 41);
    i0.ɵɵtemplate(33, Register_div_39_span_33_Template, 2, 0, "span", 16)(34, Register_div_39_span_34_Template, 2, 0, "span", 16);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(32);
    i0.ɵɵproperty("disabled", ctx_r3.loading || ctx_r3.form.invalid);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.loading);
} }
export class Register {
    fb;
    authService;
    router;
    form;
    loading = false;
    step = 1;
    sectors = ['Agri-food Industry', 'Chemical Industry', 'Textile', 'Metallurgy', 'Construction', 'Electronics', 'Transport & Logistics', 'Other'];
    roles = [
        { value: 'enterprise', label: 'Enterprise / Industry', icon: '🏭' },
        { value: 'transporter', label: 'Transporter', icon: '🚚' }
    ];
    constructor(fb, authService, router) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
        this.form = this.fb.group({
            role: ['enterprise', Validators.required],
            companyName: ['', Validators.required],
            sector: ['', Validators.required],
            taxId: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            terms: [false, Validators.requiredTrue]
        });
    }
    nextStep() { if (this.step < 2)
        this.step++; }
    prevStep() { if (this.step > 1)
        this.step--; }
    isStep1Valid() {
        return !!(this.form.get('role')?.valid && this.form.get('companyName')?.valid && this.form.get('sector')?.valid && this.form.get('taxId')?.valid);
    }
    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.loading = true;
        this.authService.register(this.form.value).subscribe({
            next: () => this.router.navigate(['/' + this.form.value.role]),
            error: () => { this.loading = false; }
        });
    }
    static ɵfac = function Register_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Register)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Register, selectors: [["app-register"]], standalone: false, decls: 44, vars: 15, consts: [[1, "auth-page"], [1, "auth-left"], [1, "auth-brand"], [1, "brand-logo"], [1, "brand-name"], [1, "auth-hero"], [1, "steps-progress"], [1, "step-prog"], [1, "step-num"], [1, "step-line"], [1, "auth-right"], [1, "auth-card"], [1, "auth-head"], [1, "step-dots"], [1, "dot-line"], [3, "ngSubmit", "formGroup"], [4, "ngIf"], [1, "auth-footer"], ["routerLink", "/auth/login"], [1, "step-label"], [1, "role-selector"], ["class", "role-opt", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "form-group"], ["type", "text", "formControlName", "companyName", "placeholder", "Ex: Industrie XYZ SARL"], [1, "form-row"], ["formControlName", "sector"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "formControlName", "taxId", "placeholder", "Ex: 12345678/A"], ["type", "button", 1, "btn", "btn-primary", "submit-btn", 3, "click", "disabled"], [1, "role-opt", 3, "click"], [3, "value"], ["type", "text", "formControlName", "name", "placeholder", "First and last name"], ["type", "email", "formControlName", "email", "placeholder", "email@company.tn"], ["type", "tel", "formControlName", "phone", "placeholder", "+216 XX XXX XXX"], ["type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"], [1, "checkbox-row"], ["type", "checkbox", "formControlName", "terms"], ["href", "#"], [1, "btn-row"], ["type", "button", 1, "btn", "btn-outline", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 2, "flex", "1", "justify-content", "center", 3, "disabled"]], template: function Register_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵtext(4, "\u267B");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span", 4);
            i0.ɵɵtext(6, "Eco-Ressource ");
            i0.ɵɵelementStart(7, "strong");
            i0.ɵɵtext(8, "B2B");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "div", 5)(10, "h1");
            i0.ɵɵtext(11, "Join the circular economy ecosystem");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "p");
            i0.ɵɵtext(13, "Hundreds of Tunisian companies already optimize their resources on our platform.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 6)(15, "div", 7)(16, "div", 8);
            i0.ɵɵtext(17, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "span");
            i0.ɵɵtext(19, "Company Info");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(20, "div", 9);
            i0.ɵɵelementStart(21, "div", 7)(22, "div", 8);
            i0.ɵɵtext(23, "2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span");
            i0.ɵɵtext(25, "Your Account");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(26, "div", 10)(27, "div", 11)(28, "div", 12)(29, "h2");
            i0.ɵɵtext(30, "Create an account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 13)(32, "span");
            i0.ɵɵtext(33, "1");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(34, "div", 14);
            i0.ɵɵelementStart(35, "span");
            i0.ɵɵtext(36, "2");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(37, "form", 15);
            i0.ɵɵlistener("ngSubmit", function Register_Template_form_ngSubmit_37_listener() { return ctx.onSubmit(); });
            i0.ɵɵtemplate(38, Register_div_38_Template, 23, 3, "div", 16)(39, Register_div_39_Template, 35, 3, "div", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 17);
            i0.ɵɵtext(41, " Already have an account? ");
            i0.ɵɵelementStart(42, "a", 18);
            i0.ɵɵtext(43, "Sign in");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵclassProp("done", ctx.step >= 1);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("done", ctx.step >= 2);
            i0.ɵɵadvance(11);
            i0.ɵɵclassProp("active", ctx.step >= 1)("current", ctx.step === 1);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.step >= 2)("current", ctx.step === 2);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.step === 2);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i3.RouterLink], styles: [".auth-page[_ngcontent-%COMP%] { display:grid; grid-template-columns:1fr 1fr; min-height:100vh; }\n.auth-left[_ngcontent-%COMP%] { background:linear-gradient(145deg,#073d27 0%,#0d5c3a 55%,#1a7a4e 100%); padding:44px 48px; display:flex; flex-direction:column; color:#fff; overflow:hidden; position:relative; }\n.auth-left[_ngcontent-%COMP%]::before { content:''; position:absolute; top:-80px; right:-80px; width:280px; height:280px; border-radius:50%; background:rgba(200,241,53,.07); }\n.auth-brand[_ngcontent-%COMP%] { display:flex; align-items:center; gap:12px; margin-bottom:52px; position:relative; z-index:1; }\n.brand-logo[_ngcontent-%COMP%] { width:42px; height:42px; background:var(--accent); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:20px; }\n.brand-name[_ngcontent-%COMP%] { font-family:'Syne',sans-serif; font-size:17px; color:#fff; }\n.brand-name[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color:var(--accent); }\n.auth-hero[_ngcontent-%COMP%] { flex:1; position:relative; z-index:1; }\n.auth-hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.2; }\n.auth-hero[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] { font-size:14px; color:rgba(255,255,255,.7); margin-bottom:36px; line-height:1.65; }\n.steps-progress[_ngcontent-%COMP%] { display:flex; align-items:center; gap:12px; }\n.step-prog[_ngcontent-%COMP%] { display:flex; flex-direction:column; align-items:center; gap:6px; }\n.step-num[_ngcontent-%COMP%] { width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,.2); border:2px solid rgba(255,255,255,.3); display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:#fff; transition:all var(--tr); }\n.step-prog.done[_ngcontent-%COMP%]   .step-num[_ngcontent-%COMP%] { background:var(--accent); border-color:var(--accent); color:var(--primary-dark); }\n.step-prog[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size:11px; color:rgba(255,255,255,.6); }\n.step-line[_ngcontent-%COMP%] { flex:1; height:2px; background:rgba(255,255,255,.2); border-radius:1px; }\n.auth-right[_ngcontent-%COMP%] { display:flex; align-items:center; justify-content:center; padding:32px 24px; background:var(--surface-alt); }\n.auth-card[_ngcontent-%COMP%] { width:100%; max-width:440px; background:var(--surface); border-radius:16px; padding:34px; border:1px solid var(--border); box-shadow:var(--shadow-md); }\n.auth-head[_ngcontent-%COMP%] { display:flex; align-items:center; justify-content:space-between; margin-bottom:22px; }\n.auth-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { font-size:22px; }\n.step-dots[_ngcontent-%COMP%] { display:flex; align-items:center; gap:6px; }\n.step-dots[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { width:26px; height:26px; border-radius:50%; border:1.5px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; color:var(--text-muted); transition:all var(--tr); }\n.step-dots[_ngcontent-%COMP%]   span.active[_ngcontent-%COMP%] { background:var(--primary); border-color:var(--primary); color:#fff; }\n.step-dots[_ngcontent-%COMP%]   span.current[_ngcontent-%COMP%] { box-shadow:0 0 0 3px rgba(13,92,58,.15); }\n.dot-line[_ngcontent-%COMP%] { width:24px; height:1.5px; background:var(--border); }\n.step-label[_ngcontent-%COMP%] { font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:.5px; color:var(--text-muted); margin-bottom:18px; }\n.role-selector[_ngcontent-%COMP%] { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px; }\n.role-opt[_ngcontent-%COMP%] { padding:14px; border:1.5px solid var(--border); border-radius:var(--radius-sm); cursor:pointer; transition:all var(--tr); text-align:center; }\n.role-opt[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size:22px; display:block; margin-bottom:6px; }\n.role-opt[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { display:block; font-size:12px; font-weight:600; color:var(--text-secondary); }\n.role-opt.selected[_ngcontent-%COMP%] { border-color:var(--primary); background:var(--secondary); }\n.role-opt.selected[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color:var(--primary); }\n.checkbox-row[_ngcontent-%COMP%] { display:flex; align-items:flex-start; gap:8px; margin-bottom:20px; cursor:pointer; }\n.checkbox-row[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { margin-top:2px; accent-color:var(--primary); width:15px; height:15px; flex-shrink:0; }\n.checkbox-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size:13px; color:var(--text-secondary); line-height:1.5; }\n.checkbox-row[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { color:var(--primary); }\n.btn-row[_ngcontent-%COMP%] { display:flex; gap:12px; }\n.submit-btn[_ngcontent-%COMP%] { width:100%; justify-content:center; padding:13px; font-size:15px; font-weight:700; margin-top:4px; margin-bottom:18px; }\n.auth-footer[_ngcontent-%COMP%] { text-align:center; font-size:13px; color:var(--text-muted); margin-top:4px; }\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { color:var(--primary); font-weight:600; margin-left:4px; }\n@media (max-width:900px) { .auth-page[_ngcontent-%COMP%] { grid-template-columns:1fr; } .auth-left[_ngcontent-%COMP%] { display:none; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Register, [{
        type: Component,
        args: [{ selector: 'app-register', standalone: false, template: "<div class=\"auth-page\">\n  <div class=\"auth-left\">\n    <div class=\"auth-brand\">\n      <div class=\"brand-logo\">\u267B</div>\n      <span class=\"brand-name\">Eco-Ressource <strong>B2B</strong></span>\n    </div>\n    <div class=\"auth-hero\">\n      <h1>Join the circular economy ecosystem</h1>\n      <p>Hundreds of Tunisian companies already optimize their resources on our platform.</p>\n      <div class=\"steps-progress\">\n        <div class=\"step-prog\" [class.done]=\"step >= 1\">\n          <div class=\"step-num\">1</div>\n          <span>Company Info</span>\n        </div>\n        <div class=\"step-line\"></div>\n        <div class=\"step-prog\" [class.done]=\"step >= 2\">\n          <div class=\"step-num\">2</div>\n          <span>Your Account</span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"auth-right\">\n    <div class=\"auth-card\">\n      <div class=\"auth-head\">\n        <h2>Create an account</h2>\n        <div class=\"step-dots\">\n          <span [class.active]=\"step >= 1\" [class.current]=\"step === 1\">1</span>\n          <div class=\"dot-line\"></div>\n          <span [class.active]=\"step >= 2\" [class.current]=\"step === 2\">2</span>\n        </div>\n      </div>\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n\n        <!-- STEP 1 -->\n        <div *ngIf=\"step === 1\">\n          <p class=\"step-label\">Company information</p>\n\n          <div class=\"role-selector\">\n            <div class=\"role-opt\" *ngFor=\"let r of roles\"\n                 [class.selected]=\"form.get('role')?.value === r.value\"\n                 (click)=\"form.get('role')?.setValue(r.value)\">\n              <span>{{ r.icon }}</span>\n              <strong>{{ r.label }}</strong>\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Company name *</label>\n            <input type=\"text\" formControlName=\"companyName\" placeholder=\"Ex: Industrie XYZ SARL\">\n          </div>\n\n          <div class=\"form-row\">\n            <div class=\"form-group\">\n              <label>Sector *</label>\n              <select formControlName=\"sector\">\n                <option value=\"\">Select...</option>\n                <option *ngFor=\"let s of sectors\" [value]=\"s\">{{ s }}</option>\n              </select>\n            </div>\n            <div class=\"form-group\">\n              <label>Tax ID (Matricule) *</label>\n              <input type=\"text\" formControlName=\"taxId\" placeholder=\"Ex: 12345678/A\">\n            </div>\n          </div>\n\n          <button type=\"button\" class=\"btn btn-primary submit-btn\" (click)=\"nextStep()\" [disabled]=\"!isStep1Valid()\">\n            Continue \u2192\n          </button>\n        </div>\n\n        <!-- STEP 2 -->\n        <div *ngIf=\"step === 2\">\n          <p class=\"step-label\">Your account details</p>\n\n          <div class=\"form-group\">\n            <label>Full name *</label>\n            <input type=\"text\" formControlName=\"name\" placeholder=\"First and last name\">\n          </div>\n\n          <div class=\"form-row\">\n            <div class=\"form-group\">\n              <label>Professional email *</label>\n              <input type=\"email\" formControlName=\"email\" placeholder=\"email@company.tn\">\n            </div>\n            <div class=\"form-group\">\n              <label>Phone *</label>\n              <input type=\"tel\" formControlName=\"phone\" placeholder=\"+216 XX XXX XXX\">\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Password * (min. 8 characters)</label>\n            <input type=\"password\" formControlName=\"password\" placeholder=\"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\">\n          </div>\n\n          <label class=\"checkbox-row\">\n            <input type=\"checkbox\" formControlName=\"terms\">\n            <span>I accept the <a href=\"#\">Terms of Service</a> and <a href=\"#\">Privacy Policy</a></span>\n          </label>\n\n          <div class=\"btn-row\">\n            <button type=\"button\" class=\"btn btn-outline\" (click)=\"prevStep()\">\u2190 Back</button>\n            <button type=\"submit\" class=\"btn btn-primary\" style=\"flex:1;justify-content:center\" [disabled]=\"loading || form.invalid\">\n              <span *ngIf=\"!loading\">Create account \u2713</span>\n              <span *ngIf=\"loading\">Creating...</span>\n            </button>\n          </div>\n        </div>\n      </form>\n\n      <div class=\"auth-footer\">\n        Already have an account? <a routerLink=\"/auth/login\">Sign in</a>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".auth-page { display:grid; grid-template-columns:1fr 1fr; min-height:100vh; }\n.auth-left { background:linear-gradient(145deg,#073d27 0%,#0d5c3a 55%,#1a7a4e 100%); padding:44px 48px; display:flex; flex-direction:column; color:#fff; overflow:hidden; position:relative; }\n.auth-left::before { content:''; position:absolute; top:-80px; right:-80px; width:280px; height:280px; border-radius:50%; background:rgba(200,241,53,.07); }\n.auth-brand { display:flex; align-items:center; gap:12px; margin-bottom:52px; position:relative; z-index:1; }\n.brand-logo { width:42px; height:42px; background:var(--accent); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:20px; }\n.brand-name { font-family:'Syne',sans-serif; font-size:17px; color:#fff; }\n.brand-name strong { color:var(--accent); }\n.auth-hero { flex:1; position:relative; z-index:1; }\n.auth-hero h1 { font-family:'Syne',sans-serif; font-size:28px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.2; }\n.auth-hero p { font-size:14px; color:rgba(255,255,255,.7); margin-bottom:36px; line-height:1.65; }\n.steps-progress { display:flex; align-items:center; gap:12px; }\n.step-prog { display:flex; flex-direction:column; align-items:center; gap:6px; }\n.step-num { width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,.2); border:2px solid rgba(255,255,255,.3); display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:#fff; transition:all var(--tr); }\n.step-prog.done .step-num { background:var(--accent); border-color:var(--accent); color:var(--primary-dark); }\n.step-prog span { font-size:11px; color:rgba(255,255,255,.6); }\n.step-line { flex:1; height:2px; background:rgba(255,255,255,.2); border-radius:1px; }\n.auth-right { display:flex; align-items:center; justify-content:center; padding:32px 24px; background:var(--surface-alt); }\n.auth-card { width:100%; max-width:440px; background:var(--surface); border-radius:16px; padding:34px; border:1px solid var(--border); box-shadow:var(--shadow-md); }\n.auth-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:22px; }\n.auth-head h2 { font-size:22px; }\n.step-dots { display:flex; align-items:center; gap:6px; }\n.step-dots span { width:26px; height:26px; border-radius:50%; border:1.5px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; color:var(--text-muted); transition:all var(--tr); }\n.step-dots span.active { background:var(--primary); border-color:var(--primary); color:#fff; }\n.step-dots span.current { box-shadow:0 0 0 3px rgba(13,92,58,.15); }\n.dot-line { width:24px; height:1.5px; background:var(--border); }\n.step-label { font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:.5px; color:var(--text-muted); margin-bottom:18px; }\n.role-selector { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px; }\n.role-opt { padding:14px; border:1.5px solid var(--border); border-radius:var(--radius-sm); cursor:pointer; transition:all var(--tr); text-align:center; }\n.role-opt span { font-size:22px; display:block; margin-bottom:6px; }\n.role-opt strong { display:block; font-size:12px; font-weight:600; color:var(--text-secondary); }\n.role-opt.selected { border-color:var(--primary); background:var(--secondary); }\n.role-opt.selected strong { color:var(--primary); }\n.checkbox-row { display:flex; align-items:flex-start; gap:8px; margin-bottom:20px; cursor:pointer; }\n.checkbox-row input { margin-top:2px; accent-color:var(--primary); width:15px; height:15px; flex-shrink:0; }\n.checkbox-row span { font-size:13px; color:var(--text-secondary); line-height:1.5; }\n.checkbox-row a { color:var(--primary); }\n.btn-row { display:flex; gap:12px; }\n.submit-btn { width:100%; justify-content:center; padding:13px; font-size:15px; font-weight:700; margin-top:4px; margin-bottom:18px; }\n.auth-footer { text-align:center; font-size:13px; color:var(--text-muted); margin-top:4px; }\n.auth-footer a { color:var(--primary); font-weight:600; margin-left:4px; }\n@media (max-width:900px) { .auth-page { grid-template-columns:1fr; } .auth-left { display:none; } }\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Register, { className: "Register", filePath: "src/app/features/auth/register/register.ts", lineNumber: 12 }); })();
