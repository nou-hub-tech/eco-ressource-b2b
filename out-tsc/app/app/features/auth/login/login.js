import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../core/services/auth";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
const _c0 = ["netCanvas"];
const _c1 = ["typeLine1"];
const _c2 = ["typeLine2"];
const _c3 = ["typeLine3"];
const _c4 = ["typeCursor"];
function Login_button_108_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 73);
    i0.ɵɵlistener("click", function Login_button_108_Template_button_click_0_listener() { const d_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.fillDemo(d_r2.email)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const d_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", d_r2.label, " ");
} }
function Login_div_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 25);
    i0.ɵɵelement(2, "circle", 29)(3, "line", 75)(4, "line", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.errorMessage, " ");
} }
function Login_div_120_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 77);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 78);
    i0.ɵɵelement(2, "circle", 29)(3, "line", 75)(4, "line", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Please enter a valid email. ");
    i0.ɵɵelementEnd();
} }
function Login__svg_svg_131_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 57);
    i0.ɵɵelement(1, "path", 79)(2, "circle", 80);
    i0.ɵɵelementEnd();
} }
function Login__svg_svg_132_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 57);
    i0.ɵɵelement(1, "path", 81);
    i0.ɵɵelementEnd();
} }
function Login_div_133_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 77);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 78);
    i0.ɵɵelement(2, "circle", 29)(3, "line", 75)(4, "line", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " Password is required. ");
    i0.ɵɵelementEnd();
} }
function Login_span_136_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 82);
} }
function Login_span_139_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 83);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 84);
    i0.ɵɵelement(2, "line", 85)(3, "polyline", 86);
    i0.ɵɵelementEnd()();
} }
export class Login {
    fb;
    authService;
    router;
    zone;
    netCanvas;
    typeLine1;
    typeLine2;
    typeLine3;
    typeCursor;
    form;
    loading = false;
    errorMessage = '';
    showPassword = false;
    showSuccess = false;
    successRole = '';
    ctx;
    nodes = [];
    animFrame;
    typeTimers = [];
    resizeObserver;
    frameCount = 0;
    animPaused = false;
    demoAccounts = [
        { label: 'Admin', email: 'admin@eco.tn' },
        { label: 'Enterprise', email: 'slim@entreprise.tn' },
        { label: 'Transporter', email: 'karim@transport.tn' },
    ];
    constructor(fb, authService, router, zone) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.zone = zone;
    }
    ngOnInit() {
        document.body.className = 'theme-auth';
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
        const user = this.authService.currentUser;
        if (user)
            this.router.navigate(['/' + user.role]);
    }
    ngAfterViewInit() {
        this.initCanvas();
        this.startTypewriter();
    }
    /* ── PARTICLE NETWORK ── */
    initCanvas() {
        const canvas = this.netCanvas.nativeElement;
        this.ctx = canvas.getContext('2d');
        this.resizeCanvas();
        this.buildNodes();
        this.animate();
        this.resizeObserver = new ResizeObserver(() => {
            this.resizeCanvas();
            this.buildNodes();
        });
        this.resizeObserver.observe(canvas.parentElement);
    }
    resizeCanvas() {
        const el = this.netCanvas.nativeElement;
        el.width = el.parentElement.offsetWidth;
        el.height = el.parentElement.offsetHeight;
    }
    buildNodes() {
        const { width: W, height: H } = this.netCanvas.nativeElement;
        /* Hard cap at 35 — above this the O(n²) connection loop gets expensive */
        const count = Math.min(35, Math.floor(W * H / 14000));
        this.nodes = Array.from({ length: count }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - .5) * .28,
            vy: (Math.random() - .5) * .28,
            r: Math.random() * 1.6 + .7,
            pulse: Math.random() * Math.PI * 2,
        }));
    }
    animate() {
        /* Pause the heavy canvas work while the auth request is in flight
           so the main thread is free for Angular change detection */
        if (this.animPaused) {
            this.animFrame = requestAnimationFrame(() => this.animate());
            return;
        }
        this.frameCount++;
        const canvas = this.netCanvas.nativeElement;
        const { width: W, height: H } = canvas;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, W, H);
        /* Move nodes + draw dots */
        for (const n of this.nodes) {
            n.x += n.vx;
            n.y += n.vy;
            n.pulse += .016;
            if (n.x < 0 || n.x > W)
                n.vx *= -1;
            if (n.y < 0 || n.y > H)
                n.vy *= -1;
            const alpha = .18 + Math.sin(n.pulse) * .08;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,230,118,${alpha.toFixed(2)})`;
            ctx.fill();
        }
        /* Draw connections only every 2nd frame — halves cost, imperceptible visually */
        if (this.frameCount % 2 === 0) {
            /* Batch ALL line segments into a single path per opacity bucket
               instead of calling ctx.stroke() once per pair */
            const buckets = {};
            for (let i = 0; i < this.nodes.length; i++) {
                const a = this.nodes[i];
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const b = this.nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 14400) { /* 120² — skip Math.hypot entirely */
                        const opacity = ((1 - Math.sqrt(d2) / 120) * .12).toFixed(2);
                        if (!buckets[opacity])
                            buckets[opacity] = { path: new Path2D() };
                        buckets[opacity].path.moveTo(a.x, a.y);
                        buckets[opacity].path.lineTo(b.x, b.y);
                    }
                }
            }
            ctx.lineWidth = .6;
            for (const [opacity, { path }] of Object.entries(buckets)) {
                ctx.strokeStyle = `rgba(0,230,118,${opacity})`;
                ctx.stroke(path);
            }
        }
        this.animFrame = requestAnimationFrame(() => this.animate());
    }
    /* ── TYPEWRITER — runs OUTSIDE Angular zone, writes directly to DOM ── */
    startTypewriter() {
        /* ngZone.runOutsideAngular means zero change detection per character */
        this.zone.runOutsideAngular(() => {
            const lines = [
                [this.typeLine1, 'Industrial', 48],
                [this.typeLine2, 'Circular', 48],
                [this.typeLine3, 'Economy', 55],
            ];
            let lineIdx = 0;
            let charIdx = 0;
            let startDelay;
            const tick = () => {
                if (lineIdx >= lines.length) {
                    /* show cursor — one tiny re-entry into zone */
                    this.zone.run(() => {
                        if (this.typeCursor?.nativeElement) {
                            this.typeCursor.nativeElement.style.opacity = '1';
                        }
                    });
                    return;
                }
                const [elRef, text, speed] = lines[lineIdx];
                elRef.nativeElement.textContent = text.slice(0, charIdx + 1);
                charIdx++;
                if (charIdx >= text.length) {
                    lineIdx++;
                    charIdx = 0;
                    const t = setTimeout(tick, lineIdx < lines.length ? 90 : 0);
                    this.typeTimers.push(t);
                }
                else {
                    const t = setTimeout(tick, speed);
                    this.typeTimers.push(t);
                }
            };
            startDelay = setTimeout(tick, 600);
            this.typeTimers.push(startDelay);
        });
    }
    /* ── FORM ── */
    fillDemo(email) {
        this.form.patchValue({ email, password: 'demo123' });
        this.errorMessage = '';
    }
    get emailInvalid() {
        const c = this.form.get('email');
        return !!(c?.invalid && c?.touched);
    }
    get passwordInvalid() {
        const c = this.form.get('password');
        return !!(c?.invalid && c?.touched);
    }
    /* Fully kills the RAF loop — called on success before navigation */
    stopCanvas() {
        cancelAnimationFrame(this.animFrame);
        this.animFrame = null;
        /* blank the canvas so nothing lingers during route transition */
        if (this.ctx) {
            const c = this.netCanvas?.nativeElement;
            if (c)
                this.ctx.clearRect(0, 0, c.width, c.height);
        }
    }
    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.loading = true;
        this.errorMessage = '';
        /* Pause canvas while request is in flight */
        this.animPaused = true;
        const { email, password } = this.form.value;
        this.authService.login(email, password).subscribe({
            next: (res) => {
                if (res.success) {
                    const user = this.authService.currentUser;
                    const roleLabel = {
                        admin: 'Administrator Portal',
                        enterprise: 'Enterprise Portal',
                        transporter: 'Transporter Portal',
                    };
                    this.successRole = 'Redirecting to ' + (roleLabel[user.role] || 'Portal') + '...';
                    this.showSuccess = true;
                    /* KILL the canvas RAF loop completely before navigating
                       so it doesn't compete with the incoming route's bootstrap */
                    this.stopCanvas();
                    this.typeTimers.forEach(clearTimeout);
                    /* Short delay only to show the success state, then go */
                    setTimeout(() => this.router.navigate(['/' + user.role]), 800);
                }
                else {
                    this.errorMessage = 'Incorrect email or password.';
                    this.loading = false;
                    this.animPaused = false;
                }
            },
            error: () => {
                this.errorMessage = 'Server error. Please try again.';
                this.loading = false;
                this.animPaused = false;
            }
        });
    }
    ngOnDestroy() {
        cancelAnimationFrame(this.animFrame);
        this.typeTimers.forEach(clearTimeout);
        if (this.resizeObserver)
            this.resizeObserver.disconnect();
    }
    static ɵfac = function Login_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Login)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i0.NgZone)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Login, selectors: [["app-login"]], viewQuery: function Login_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5)(_c1, 5)(_c2, 5)(_c3, 5)(_c4, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.netCanvas = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.typeLine1 = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.typeLine2 = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.typeLine3 = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.typeCursor = _t.first);
        } }, standalone: false, decls: 144, vars: 21, consts: [["netCanvas", ""], ["typeLine1", ""], ["typeLine2", ""], ["typeLine3", ""], ["typeCursor", ""], [1, "login-shell"], [1, "login-left"], [1, "login-net"], [1, "login-grid"], [1, "login-orb-1"], [1, "login-orb-2"], [1, "login-left-content"], [1, "login-brand"], [1, "login-logo"], ["width", "20", "height", "20", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"], ["d", "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"], [1, "login-brand-name"], [1, "login-headline"], [1, "login-accent"], [1, "login-cursor"], [1, "login-sub"], [1, "login-tiles"], [1, "login-tile"], [1, "login-tile-ico"], ["width", "13", "height", "13", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"], [1, "login-tile-title"], [1, "login-tile-sub"], ["cx", "12", "cy", "12", "r", "10"], ["d", "M12 8v4l3 3"], ["x", "1", "y", "3", "width", "15", "height", "13", "rx", "1"], ["d", "M16 8h4l3 3v5h-7V8z"], ["cx", "5.5", "cy", "18.5", "r", "2.5"], ["cx", "18.5", "cy", "18.5", "r", "2.5"], ["x", "3", "y", "3", "width", "18", "height", "18", "rx", "2"], ["x1", "3", "y1", "9", "x2", "21", "y2", "9"], ["x1", "9", "y1", "21", "x2", "9", "y2", "9"], [1, "login-stats"], [1, "login-stat"], [1, "login-right"], [1, "login-right-bg"], [1, "login-card", 2, "position", "relative"], [1, "login-success"], [1, "ls-check"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "#00e676", "stroke-width", "2.5", "stroke-linecap", "round", "stroke-linejoin", "round"], ["points", "20 6 9 17 4 12", 1, "ls-check-path"], [1, "ls-text"], [1, "ls-sub"], [1, "login-card-sub"], [1, "login-demo"], ["class", "demo-pill", "type", "button", 3, "click", 4, "ngFor", "ngForOf"], ["class", "login-error", 4, "ngIf"], [3, "ngSubmit", "formGroup"], [1, "login-fg"], [1, "login-field"], [1, "lf-ico"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round"], ["d", "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"], ["points", "22,6 12,13 2,6"], ["type", "email", "formControlName", "email", "placeholder", "your@email.tn", "autocomplete", "email"], ["class", "login-ferr", 4, "ngIf"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0110 0v4"], ["formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "current-password", 3, "type"], ["type", "button", 1, "lf-toggle", 3, "click"], ["width", "14", "height", "14", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", 4, "ngIf"], ["type", "submit", 1, "login-btn", 3, "disabled"], [1, "login-btn-inner"], ["class", "login-spinner", 4, "ngIf"], ["class", "login-btn-arrow", 4, "ngIf"], [1, "login-footer"], ["routerLink", "/auth/register"], ["type", "button", 1, "demo-pill", 3, "click"], [1, "login-error"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], [1, "login-ferr"], ["width", "10", "height", "10", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"], ["cx", "12", "cy", "12", "r", "3"], ["d", "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"], [1, "login-spinner"], [1, "login-btn-arrow"], ["width", "15", "height", "15", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", "stroke-linecap", "round"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["points", "12 5 19 12 12 19"]], template: function Login_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 5)(1, "div", 6);
            i0.ɵɵelement(2, "canvas", 7, 0)(4, "div", 8)(5, "div", 9)(6, "div", 10);
            i0.ɵɵelementStart(7, "div", 11)(8, "div", 12)(9, "div", 13);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(10, "svg", 14);
            i0.ɵɵelement(11, "path", 15)(12, "path", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(13, "span", 17);
            i0.ɵɵtext(14, "Eco-Ressource ");
            i0.ɵɵelementStart(15, "strong");
            i0.ɵɵtext(16, "B2B");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "div", 18)(18, "div");
            i0.ɵɵelement(19, "span", null, 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div");
            i0.ɵɵelement(22, "span", null, 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 19);
            i0.ɵɵelement(25, "span", null, 3)(27, "span", 20, 4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "p", 21);
            i0.ɵɵtext(30, "Tunisia's first intelligent B2B platform for surplus valorisation, asset sharing and smart logistics.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 22)(32, "div", 23)(33, "div", 24);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(34, "svg", 25);
            i0.ɵɵelement(35, "path", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(36, "div")(37, "div", 27);
            i0.ɵɵtext(38, "B2B Marketplace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 28);
            i0.ɵɵtext(40, "Buy & sell industrial surplus");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(41, "div", 23)(42, "div", 24);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(43, "svg", 25);
            i0.ɵɵelement(44, "circle", 29)(45, "path", 30);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(46, "div")(47, "div", 27);
            i0.ɵɵtext(48, "AI Matching");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 28);
            i0.ɵɵtext(50, "Smart buyer-seller pairing");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(51, "div", 23)(52, "div", 24);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(53, "svg", 25);
            i0.ɵɵelement(54, "rect", 31)(55, "path", 32)(56, "circle", 33)(57, "circle", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(58, "div")(59, "div", 27);
            i0.ɵɵtext(60, "Smart Logistics");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "div", 28);
            i0.ɵɵtext(62, "Optimise routes, cut CO\u2082");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(63, "div", 23)(64, "div", 24);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(65, "svg", 25);
            i0.ɵɵelement(66, "rect", 35)(67, "line", 36)(68, "line", 37);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(69, "div")(70, "div", 27);
            i0.ɵɵtext(71, "QR Traceability");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "div", 28);
            i0.ɵɵtext(73, "Full legal compliance");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(74, "div", 38)(75, "div", 39)(76, "strong");
            i0.ɵɵtext(77, "500+");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "span");
            i0.ɵɵtext(79, "Companies");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(80, "div", 39)(81, "strong");
            i0.ɵɵtext(82, "30%");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "span");
            i0.ɵɵtext(84, "Cost savings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(85, "div", 39)(86, "strong");
            i0.ɵɵtext(87, "12T");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "span");
            i0.ɵɵtext(89, "CO\u2082 avoided");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(90, "div", 40);
            i0.ɵɵelement(91, "div", 41);
            i0.ɵɵelementStart(92, "div", 42)(93, "div", 43)(94, "div", 44);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(95, "svg", 45);
            i0.ɵɵelement(96, "polyline", 46);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(97, "div", 47);
            i0.ɵɵtext(98, "Signed in successfully");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "div", 48);
            i0.ɵɵtext(100);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(101, "h2");
            i0.ɵɵtext(102, "Welcome back");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "p", 49);
            i0.ɵɵtext(104, "Sign in to your portal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "div", 50)(106, "span");
            i0.ɵɵtext(107, "DEMO ACCESS");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(108, Login_button_108_Template, 2, 1, "button", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(109, Login_div_109_Template, 6, 1, "div", 52);
            i0.ɵɵelementStart(110, "form", 53);
            i0.ɵɵlistener("ngSubmit", function Login_Template_form_ngSubmit_110_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(111, "div", 54)(112, "label");
            i0.ɵɵtext(113, "Email address");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(114, "div", 55)(115, "span", 56);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(116, "svg", 57);
            i0.ɵɵelement(117, "path", 58)(118, "polyline", 59);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelement(119, "input", 60);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(120, Login_div_120_Template, 6, 0, "div", 61);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(121, "div", 54)(122, "label");
            i0.ɵɵtext(123, "Password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(124, "div", 55)(125, "span", 56);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(126, "svg", 57);
            i0.ɵɵelement(127, "rect", 62)(128, "path", 63);
            i0.ɵɵelementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelement(129, "input", 64);
            i0.ɵɵelementStart(130, "button", 65);
            i0.ɵɵlistener("click", function Login_Template_button_click_130_listener() { return ctx.showPassword = !ctx.showPassword; });
            i0.ɵɵtemplate(131, Login__svg_svg_131_Template, 3, 0, "svg", 66)(132, Login__svg_svg_132_Template, 2, 0, "svg", 66);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(133, Login_div_133_Template, 6, 0, "div", 61);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "button", 67)(135, "span", 68);
            i0.ɵɵtemplate(136, Login_span_136_Template, 1, 0, "span", 69);
            i0.ɵɵelementStart(137, "span");
            i0.ɵɵtext(138);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(139, Login_span_139_Template, 4, 0, "span", 70);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(140, "div", 71);
            i0.ɵɵtext(141, " No account? ");
            i0.ɵɵelementStart(142, "a", 72);
            i0.ɵɵtext(143, "Create enterprise account");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(93);
            i0.ɵɵclassProp("show", ctx.showSuccess);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.successRole);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.demoAccounts);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("invalid", ctx.emailInvalid);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.emailInvalid);
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("invalid", ctx.passwordInvalid);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.showPassword);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.showPassword);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showPassword);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.passwordInvalid);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.loading);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.loading ? "Signing in..." : "Sign In");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, i3.RouterLink], styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   LOGIN PAGE \u2014 Animated, Interactive, Professional\n   ViewEncapsulation.None \u2014 styles are global\n   Uses theme-auth CSS vars from styles.css\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.login-shell {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n  overflow: hidden;\n}\n\n/* \u2550\u2550 LEFT PANEL \u2550\u2550 */\n.login-left {\n  position: relative;\n  background: var(--bg);\n  padding: 48px 60px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n/* particle canvas */\n.login-net {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n}\n\n/* animated grid */\n.login-grid {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  background-image:\n    linear-gradient(rgba(0,230,118,.03) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(0,230,118,.03) 1px, transparent 1px);\n  background-size: 52px 52px;\n  animation: gridDrift 20s linear infinite;\n}\n@keyframes gridDrift {\n  from { background-position: 0 0; }\n  to   { background-position: 52px 52px; }\n}\n\n/* ambient glow orbs */\n.login-orb-1 {\n  position: absolute; pointer-events: none; z-index: 0;\n  width: 420px; height: 420px; border-radius: 50%;\n  background: radial-gradient(circle, rgba(0,230,118,.07), transparent 70%);\n  top: -100px; right: -80px;\n  animation: orbFloat 9s ease-in-out infinite;\n}\n.login-orb-2 {\n  position: absolute; pointer-events: none; z-index: 0;\n  width: 280px; height: 280px; border-radius: 50%;\n  background: radial-gradient(circle, rgba(0,178,72,.05), transparent 70%);\n  bottom: -70px; left: -50px;\n  animation: orbFloat 13s ease-in-out infinite reverse;\n}\n@keyframes orbFloat {\n  0%,100% { transform: scale(1) translate(0,0); }\n  50%      { transform: scale(1.07) translate(14px,-14px); }\n}\n\n/* content layer */\n.login-left-content {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n/* brand */\n.login-brand {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  margin-bottom: 60px;\n  animation: fadeUp .6s ease both;\n}\n.login-logo {\n  width: 38px; height: 38px;\n  border-radius: 9px;\n  background: linear-gradient(135deg, #00e676, #00b248);\n  display: flex; align-items: center; justify-content: center;\n  color: rgba(0,0,0,.7);\n  box-shadow: 0 0 22px rgba(0,230,118,.3);\n  flex-shrink: 0;\n}\n.login-brand-name {\n  font-family: 'Syne', sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--text);\n  letter-spacing: -.2px;\n}\n.login-brand-name strong { color: var(--primary); }\n\n/* headline \u2014 typewriter output */\n.login-headline {\n  font-family: 'Syne', sans-serif;\n  font-size: 50px;\n  font-weight: 800;\n  line-height: 1.0;\n  letter-spacing: -2px;\n  color: var(--text);\n  margin-bottom: 18px;\n  min-height: 3em;\n  animation: fadeUp .7s .1s ease both;\n}\n.login-accent {\n  background: linear-gradient(135deg, #00e676, #a8ff78);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n.login-cursor {\n  display: inline-block;\n  width: 3px;\n  height: .82em;\n  background: #00e676;\n  margin-left: 3px;\n  vertical-align: middle;\n  opacity: 0;\n  animation: none;\n  transition: opacity .2s;\n}\n/* when typewriter sets opacity:1 via style, cursor starts blinking */\n.login-cursor[style*=\"opacity: 1\"],\n.login-cursor[style*=\"opacity:1\"] {\n  animation: cursorBlink 1s step-end infinite;\n}\n@keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }\n\n.login-sub {\n  font-size: 13px;\n  color: var(--text2);\n  line-height: 1.7;\n  max-width: 330px;\n  margin-bottom: 32px;\n  animation: fadeUp .7s .2s ease both;\n}\n\n/* feature tiles */\n.login-tiles {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 9px;\n  margin-bottom: 32px;\n}\n.login-tile {\n  background: rgba(255,255,255,.025);\n  border: 1px solid rgba(255,255,255,.06);\n  border-radius: 10px;\n  padding: 13px;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  transition: border-color .25s, background .25s, transform .2s;\n  animation: fadeUp .7s ease both;\n}\n.login-tile:nth-child(1) { animation-delay: .3s; }\n.login-tile:nth-child(2) { animation-delay: .38s; }\n.login-tile:nth-child(3) { animation-delay: .46s; }\n.login-tile:nth-child(4) { animation-delay: .54s; }\n.login-tile:hover {\n  border-color: rgba(0,230,118,.2);\n  background: rgba(0,230,118,.03);\n  transform: translateY(-2px);\n}\n.login-tile-ico {\n  width: 28px; height: 28px;\n  border-radius: 7px;\n  background: rgba(0,230,118,.08);\n  border: 1px solid rgba(0,230,118,.12);\n  display: flex; align-items: center; justify-content: center;\n  color: var(--primary);\n  flex-shrink: 0;\n}\n.login-tile-title {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text);\n  margin-bottom: 2px;\n}\n.login-tile-sub {\n  font-size: 10px;\n  color: rgba(255,255,255,.28);\n  line-height: 1.4;\n}\n\n/* stats */\n.login-stats {\n  display: flex;\n  gap: 30px;\n  padding-top: 22px;\n  border-top: 1px solid rgba(255,255,255,.06);\n  margin-top: auto;\n  animation: fadeUp .7s .6s ease both;\n}\n.login-stat strong {\n  display: block;\n  font-family: 'DM Mono', monospace;\n  font-size: 24px;\n  color: var(--primary);\n  letter-spacing: -1px;\n  line-height: 1;\n}\n.login-stat span {\n  font-size: 9px;\n  color: rgba(255,255,255,.3);\n  margin-top: 3px;\n  display: block;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n}\n\n@keyframes fadeUp {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n/* \u2550\u2550 RIGHT PANEL \u2550\u2550 */\n.login-right {\n  background: rgba(255,255,255,.015);\n  border-left: 1px solid rgba(255,255,255,.06);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 36px;\n  position: relative;\n  overflow: hidden;\n}\n.login-right-bg {\n  position: absolute; inset: 0; pointer-events: none;\n  background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,230,118,.05), transparent);\n  animation: rightBgPulse 6s ease-in-out infinite;\n}\n@keyframes rightBgPulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }\n\n.login-card {\n  width: 100%;\n  max-width: 370px;\n  animation: fadeUp .8s .2s ease both;\n}\n.login-card h2 {\n  font-family: 'Syne', sans-serif;\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--text);\n  letter-spacing: -.4px;\n  margin-bottom: 4px;\n}\n.login-card-sub {\n  font-size: 12px;\n  color: var(--text2);\n  opacity: .65;\n  margin-bottom: 22px;\n}\n\n/* success overlay */\n.login-success {\n  position: absolute;\n  inset: -8px;\n  background: rgba(8,15,11,.97);\n  border: 1px solid rgba(0,230,118,.2);\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity .4s ease;\n  z-index: 20;\n}\n.login-success.show { opacity: 1; pointer-events: auto; }\n.ls-check {\n  width: 56px; height: 56px;\n  border-radius: 50%;\n  background: rgba(0,230,118,.1);\n  border: 1.5px solid rgba(0,230,118,.3);\n  display: flex; align-items: center; justify-content: center;\n}\n.login-success.show .ls-check-path {\n  stroke-dasharray: 30;\n  stroke-dashoffset: 30;\n  animation: drawCheck .5s ease .1s forwards;\n}\n@keyframes drawCheck { to { stroke-dashoffset: 0; } }\n.ls-text {\n  font-family: 'Syne', sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text);\n}\n.ls-sub {\n  font-family: 'DM Mono', monospace;\n  font-size: 10px;\n  color: var(--text2);\n  letter-spacing: .3px;\n}\n\n/* demo pills */\n.login-demo {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  padding: 10px 13px;\n  background: rgba(0,230,118,.04);\n  border: 1px solid rgba(0,230,118,.1);\n  border-radius: 8px;\n  margin-bottom: 20px;\n}\n.login-demo > span {\n  font-family: 'DM Mono', monospace;\n  font-size: 9px;\n  color: rgba(0,230,118,.55);\n  letter-spacing: .5px;\n  white-space: nowrap;\n}\n.demo-pill {\n  padding: 4px 11px;\n  background: rgba(0,230,118,.07);\n  color: var(--primary);\n  border: 1px solid rgba(0,230,118,.18);\n  border-radius: 100px;\n  font-family: 'DM Mono', monospace;\n  font-size: 10px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all .15s;\n  letter-spacing: .2px;\n}\n.demo-pill:hover { background: rgba(0,230,118,.18); border-color: rgba(0,230,118,.38); }\n.demo-pill:active { transform: scale(.96); }\n\n/* error */\n.login-error {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding: 10px 13px;\n  background: rgba(239,68,68,.08);\n  border: 1px solid rgba(239,68,68,.18);\n  border-radius: 7px;\n  font-size: 12px;\n  color: #fca5a5;\n  margin-bottom: 14px;\n  animation: fadeUp .3s ease;\n}\n\n/* form group */\n.login-fg {\n  margin-bottom: 14px;\n}\n.login-fg label {\n  display: block;\n  font-family: 'DM Mono', monospace;\n  font-size: 9px;\n  text-transform: uppercase;\n  letter-spacing: .8px;\n  color: rgba(255,255,255,.3);\n  margin-bottom: 7px;\n}\n\n/* animated field */\n.login-field {\n  display: flex;\n  align-items: center;\n  background: rgba(255,255,255,.04);\n  border: 1px solid rgba(255,255,255,.08);\n  border-radius: 8px;\n  overflow: hidden;\n  transition: border-color .2s, box-shadow .2s, background .2s;\n  position: relative;\n}\n.login-field::after {\n  content: '';\n  position: absolute;\n  bottom: 0; left: 0; right: 0;\n  height: 1.5px;\n  background: linear-gradient(90deg, transparent, #00e676, transparent);\n  transform: scaleX(0);\n  transition: transform .35s ease;\n  transform-origin: center;\n  border-radius: 0;\n}\n.login-field:focus-within {\n  border-color: rgba(0,230,118,.3);\n  background: rgba(0,230,118,.03);\n  box-shadow: 0 0 0 3px rgba(0,230,118,.07);\n}\n.login-field:focus-within::after { transform: scaleX(1); }\n.login-field.invalid {\n  border-color: rgba(239,68,68,.35);\n  background: rgba(239,68,68,.03);\n}\n.login-field.invalid::after {\n  background: linear-gradient(90deg, transparent, #ef4444, transparent);\n  transform: scaleX(1);\n}\n\n.lf-ico {\n  padding: 0 12px;\n  color: rgba(255,255,255,.28);\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  transition: color .2s;\n}\n.login-field:focus-within .lf-ico { color: rgba(0,230,118,.6); }\n\n.login-field input {\n  flex: 1;\n  padding: 12px 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 13px;\n  color: var(--text);\n}\n.login-field input::placeholder { color: rgba(255,255,255,.18); }\n\n.lf-toggle {\n  padding: 0 12px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: rgba(255,255,255,.28);\n  display: flex;\n  align-items: center;\n  transition: color .15s;\n}\n.lf-toggle:hover, .lf-toggle.active { color: var(--primary); }\n\n/* field error */\n.login-ferr {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 10px;\n  color: #f87171;\n  margin-top: 5px;\n  animation: fadeUp .25s ease;\n}\n\n/* submit button */\n.login-btn {\n  width: 100%;\n  height: 44px;\n  margin: 6px 0 18px;\n  background: linear-gradient(135deg, #00e676, #00c55a);\n  color: #000;\n  border: none;\n  border-radius: 8px;\n  font-family: 'Syne', sans-serif;\n  font-size: 14px;\n  font-weight: 800;\n  cursor: pointer;\n  letter-spacing: -.2px;\n  position: relative;\n  overflow: hidden;\n  transition: transform .2s, box-shadow .2s, filter .2s;\n}\n.login-btn::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(135deg, rgba(255,255,255,.18), transparent);\n  opacity: 0;\n  transition: opacity .2s;\n}\n.login-btn:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 28px rgba(0,230,118,.38);\n}\n.login-btn:hover:not(:disabled)::before { opacity: 1; }\n.login-btn:active:not(:disabled) { transform: translateY(0); box-shadow: none; }\n.login-btn:disabled { opacity: .55; cursor: not-allowed; }\n\n.login-btn-inner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  height: 100%;\n}\n.login-spinner {\n  width: 16px; height: 16px;\n  border: 2px solid rgba(0,0,0,.25);\n  border-top-color: #000;\n  border-radius: 50%;\n  animation: spinAnim .7s linear infinite;\n}\n@keyframes spinAnim { to { transform: rotate(360deg); } }\n.login-btn-arrow { transition: transform .2s; display: flex; align-items: center; }\n.login-btn:hover .login-btn-arrow { transform: translateX(4px); }\n\n/* footer */\n.login-footer {\n  text-align: center;\n  font-size: 11px;\n  color: rgba(255,255,255,.3);\n}\n.login-footer a {\n  color: var(--primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.login-footer a:hover { text-decoration: underline; }\n\n/* \u2550\u2550 RESPONSIVE \u2550\u2550 */\n@media (max-width: 900px) {\n  .login-shell { grid-template-columns: 1fr; }\n  .login-left  { display: none; }\n}"], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Login, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: false, encapsulation: ViewEncapsulation.None, template: "<div class=\"login-shell\">\n\n  <!-- \u2550\u2550 LEFT PANEL \u2550\u2550 -->\n  <div class=\"login-left\">\n    <canvas #netCanvas class=\"login-net\"></canvas>\n    <div class=\"login-grid\"></div>\n    <div class=\"login-orb-1\"></div>\n    <div class=\"login-orb-2\"></div>\n\n    <div class=\"login-left-content\">\n\n      <!-- Brand -->\n      <div class=\"login-brand\">\n        <div class=\"login-logo\">\n          <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path d=\"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z\"/>\n            <path d=\"M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12\"/>\n          </svg>\n        </div>\n        <span class=\"login-brand-name\">Eco-Ressource <strong>B2B</strong></span>\n      </div>\n\n      <!-- Typewriter headline \u2014 written directly via ElementRef, no change detection -->\n      <div class=\"login-headline\">\n        <div><span #typeLine1></span></div>\n        <div><span #typeLine2></span></div>\n        <div class=\"login-accent\"><span #typeLine3></span><span #typeCursor class=\"login-cursor\"></span></div>\n      </div>\n\n      <p class=\"login-sub\">Tunisia's first intelligent B2B platform for surplus valorisation, asset sharing and smart logistics.</p>\n\n      <!-- Feature tiles -->\n      <div class=\"login-tiles\">\n        <div class=\"login-tile\">\n          <div class=\"login-tile-ico\">\n            <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0\"/></svg>\n          </div>\n          <div>\n            <div class=\"login-tile-title\">B2B Marketplace</div>\n            <div class=\"login-tile-sub\">Buy &amp; sell industrial surplus</div>\n          </div>\n        </div>\n        <div class=\"login-tile\">\n          <div class=\"login-tile-ico\">\n            <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 8v4l3 3\"/></svg>\n          </div>\n          <div>\n            <div class=\"login-tile-title\">AI Matching</div>\n            <div class=\"login-tile-sub\">Smart buyer-seller pairing</div>\n          </div>\n        </div>\n        <div class=\"login-tile\">\n          <div class=\"login-tile-ico\">\n            <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"1\" y=\"3\" width=\"15\" height=\"13\" rx=\"1\"/><path d=\"M16 8h4l3 3v5h-7V8z\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"/><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"/></svg>\n          </div>\n          <div>\n            <div class=\"login-tile-title\">Smart Logistics</div>\n            <div class=\"login-tile-sub\">Optimise routes, cut CO\u2082</div>\n          </div>\n        </div>\n        <div class=\"login-tile\">\n          <div class=\"login-tile-ico\">\n            <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"/><line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"/></svg>\n          </div>\n          <div>\n            <div class=\"login-tile-title\">QR Traceability</div>\n            <div class=\"login-tile-sub\">Full legal compliance</div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Stats -->\n      <div class=\"login-stats\">\n        <div class=\"login-stat\"><strong>500+</strong><span>Companies</span></div>\n        <div class=\"login-stat\"><strong>30%</strong><span>Cost savings</span></div>\n        <div class=\"login-stat\"><strong>12T</strong><span>CO\u2082 avoided</span></div>\n      </div>\n\n    </div>\n  </div>\n\n  <!-- \u2550\u2550 RIGHT PANEL \u2550\u2550 -->\n  <div class=\"login-right\">\n    <div class=\"login-right-bg\"></div>\n\n    <div class=\"login-card\" style=\"position:relative\">\n\n      <!-- Success overlay -->\n      <div class=\"login-success\" [class.show]=\"showSuccess\">\n        <div class=\"ls-check\">\n          <svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#00e676\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\" class=\"ls-check-path\"/>\n          </svg>\n        </div>\n        <div class=\"ls-text\">Signed in successfully</div>\n        <div class=\"ls-sub\">{{successRole}}</div>\n      </div>\n\n      <h2>Welcome back</h2>\n      <p class=\"login-card-sub\">Sign in to your portal</p>\n\n      <!-- Demo pills -->\n      <div class=\"login-demo\">\n        <span>DEMO ACCESS</span>\n        <button *ngFor=\"let d of demoAccounts\" class=\"demo-pill\" type=\"button\" (click)=\"fillDemo(d.email)\">\n          {{d.label}}\n        </button>\n      </div>\n\n      <!-- Error -->\n      <div class=\"login-error\" *ngIf=\"errorMessage\">\n        <svg width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>\n        {{errorMessage}}\n      </div>\n\n      <!-- Form -->\n      <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n\n        <div class=\"login-fg\">\n          <label>Email address</label>\n          <div class=\"login-field\" [class.invalid]=\"emailInvalid\">\n            <span class=\"lf-ico\">\n              <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"/><polyline points=\"22,6 12,13 2,6\"/></svg>\n            </span>\n            <input type=\"email\" formControlName=\"email\" placeholder=\"your@email.tn\" autocomplete=\"email\"/>\n          </div>\n          <div class=\"login-ferr\" *ngIf=\"emailInvalid\">\n            <svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>\n            Please enter a valid email.\n          </div>\n        </div>\n\n        <div class=\"login-fg\">\n          <label>Password</label>\n          <div class=\"login-field\" [class.invalid]=\"passwordInvalid\">\n            <span class=\"lf-ico\">\n              <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\"/><path d=\"M7 11V7a5 5 0 0110 0v4\"/></svg>\n            </span>\n            <input [type]=\"showPassword ? 'text' : 'password'\" formControlName=\"password\" placeholder=\"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\" autocomplete=\"current-password\"/>\n            <button type=\"button\" class=\"lf-toggle\" (click)=\"showPassword = !showPassword\" [class.active]=\"showPassword\">\n              <svg *ngIf=\"!showPassword\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>\n              <svg *ngIf=\"showPassword\"  width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22\"/></svg>\n            </button>\n          </div>\n          <div class=\"login-ferr\" *ngIf=\"passwordInvalid\">\n            <svg width=\"10\" height=\"10\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>\n            Password is required.\n          </div>\n        </div>\n\n        <button type=\"submit\" class=\"login-btn\" [disabled]=\"loading\">\n          <span class=\"login-btn-inner\">\n            <span class=\"login-spinner\" *ngIf=\"loading\"></span>\n            <span>{{loading ? 'Signing in...' : 'Sign In'}}</span>\n            <span class=\"login-btn-arrow\" *ngIf=\"!loading\">\n              <svg width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"/><polyline points=\"12 5 19 12 12 19\"/></svg>\n            </span>\n          </span>\n        </button>\n\n      </form>\n\n      <div class=\"login-footer\">\n        No account? <a routerLink=\"/auth/register\">Create enterprise account</a>\n      </div>\n\n    </div>\n  </div>\n\n</div>", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   LOGIN PAGE \u2014 Animated, Interactive, Professional\n   ViewEncapsulation.None \u2014 styles are global\n   Uses theme-auth CSS vars from styles.css\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.login-shell {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n  overflow: hidden;\n}\n\n/* \u2550\u2550 LEFT PANEL \u2550\u2550 */\n.login-left {\n  position: relative;\n  background: var(--bg);\n  padding: 48px 60px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n/* particle canvas */\n.login-net {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n}\n\n/* animated grid */\n.login-grid {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  background-image:\n    linear-gradient(rgba(0,230,118,.03) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(0,230,118,.03) 1px, transparent 1px);\n  background-size: 52px 52px;\n  animation: gridDrift 20s linear infinite;\n}\n@keyframes gridDrift {\n  from { background-position: 0 0; }\n  to   { background-position: 52px 52px; }\n}\n\n/* ambient glow orbs */\n.login-orb-1 {\n  position: absolute; pointer-events: none; z-index: 0;\n  width: 420px; height: 420px; border-radius: 50%;\n  background: radial-gradient(circle, rgba(0,230,118,.07), transparent 70%);\n  top: -100px; right: -80px;\n  animation: orbFloat 9s ease-in-out infinite;\n}\n.login-orb-2 {\n  position: absolute; pointer-events: none; z-index: 0;\n  width: 280px; height: 280px; border-radius: 50%;\n  background: radial-gradient(circle, rgba(0,178,72,.05), transparent 70%);\n  bottom: -70px; left: -50px;\n  animation: orbFloat 13s ease-in-out infinite reverse;\n}\n@keyframes orbFloat {\n  0%,100% { transform: scale(1) translate(0,0); }\n  50%      { transform: scale(1.07) translate(14px,-14px); }\n}\n\n/* content layer */\n.login-left-content {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n/* brand */\n.login-brand {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n  margin-bottom: 60px;\n  animation: fadeUp .6s ease both;\n}\n.login-logo {\n  width: 38px; height: 38px;\n  border-radius: 9px;\n  background: linear-gradient(135deg, #00e676, #00b248);\n  display: flex; align-items: center; justify-content: center;\n  color: rgba(0,0,0,.7);\n  box-shadow: 0 0 22px rgba(0,230,118,.3);\n  flex-shrink: 0;\n}\n.login-brand-name {\n  font-family: 'Syne', sans-serif;\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--text);\n  letter-spacing: -.2px;\n}\n.login-brand-name strong { color: var(--primary); }\n\n/* headline \u2014 typewriter output */\n.login-headline {\n  font-family: 'Syne', sans-serif;\n  font-size: 50px;\n  font-weight: 800;\n  line-height: 1.0;\n  letter-spacing: -2px;\n  color: var(--text);\n  margin-bottom: 18px;\n  min-height: 3em;\n  animation: fadeUp .7s .1s ease both;\n}\n.login-accent {\n  background: linear-gradient(135deg, #00e676, #a8ff78);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n.login-cursor {\n  display: inline-block;\n  width: 3px;\n  height: .82em;\n  background: #00e676;\n  margin-left: 3px;\n  vertical-align: middle;\n  opacity: 0;\n  animation: none;\n  transition: opacity .2s;\n}\n/* when typewriter sets opacity:1 via style, cursor starts blinking */\n.login-cursor[style*=\"opacity: 1\"],\n.login-cursor[style*=\"opacity:1\"] {\n  animation: cursorBlink 1s step-end infinite;\n}\n@keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }\n\n.login-sub {\n  font-size: 13px;\n  color: var(--text2);\n  line-height: 1.7;\n  max-width: 330px;\n  margin-bottom: 32px;\n  animation: fadeUp .7s .2s ease both;\n}\n\n/* feature tiles */\n.login-tiles {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 9px;\n  margin-bottom: 32px;\n}\n.login-tile {\n  background: rgba(255,255,255,.025);\n  border: 1px solid rgba(255,255,255,.06);\n  border-radius: 10px;\n  padding: 13px;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  transition: border-color .25s, background .25s, transform .2s;\n  animation: fadeUp .7s ease both;\n}\n.login-tile:nth-child(1) { animation-delay: .3s; }\n.login-tile:nth-child(2) { animation-delay: .38s; }\n.login-tile:nth-child(3) { animation-delay: .46s; }\n.login-tile:nth-child(4) { animation-delay: .54s; }\n.login-tile:hover {\n  border-color: rgba(0,230,118,.2);\n  background: rgba(0,230,118,.03);\n  transform: translateY(-2px);\n}\n.login-tile-ico {\n  width: 28px; height: 28px;\n  border-radius: 7px;\n  background: rgba(0,230,118,.08);\n  border: 1px solid rgba(0,230,118,.12);\n  display: flex; align-items: center; justify-content: center;\n  color: var(--primary);\n  flex-shrink: 0;\n}\n.login-tile-title {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text);\n  margin-bottom: 2px;\n}\n.login-tile-sub {\n  font-size: 10px;\n  color: rgba(255,255,255,.28);\n  line-height: 1.4;\n}\n\n/* stats */\n.login-stats {\n  display: flex;\n  gap: 30px;\n  padding-top: 22px;\n  border-top: 1px solid rgba(255,255,255,.06);\n  margin-top: auto;\n  animation: fadeUp .7s .6s ease both;\n}\n.login-stat strong {\n  display: block;\n  font-family: 'DM Mono', monospace;\n  font-size: 24px;\n  color: var(--primary);\n  letter-spacing: -1px;\n  line-height: 1;\n}\n.login-stat span {\n  font-size: 9px;\n  color: rgba(255,255,255,.3);\n  margin-top: 3px;\n  display: block;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n}\n\n@keyframes fadeUp {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n/* \u2550\u2550 RIGHT PANEL \u2550\u2550 */\n.login-right {\n  background: rgba(255,255,255,.015);\n  border-left: 1px solid rgba(255,255,255,.06);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 36px;\n  position: relative;\n  overflow: hidden;\n}\n.login-right-bg {\n  position: absolute; inset: 0; pointer-events: none;\n  background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,230,118,.05), transparent);\n  animation: rightBgPulse 6s ease-in-out infinite;\n}\n@keyframes rightBgPulse { 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }\n\n.login-card {\n  width: 100%;\n  max-width: 370px;\n  animation: fadeUp .8s .2s ease both;\n}\n.login-card h2 {\n  font-family: 'Syne', sans-serif;\n  font-size: 24px;\n  font-weight: 800;\n  color: var(--text);\n  letter-spacing: -.4px;\n  margin-bottom: 4px;\n}\n.login-card-sub {\n  font-size: 12px;\n  color: var(--text2);\n  opacity: .65;\n  margin-bottom: 22px;\n}\n\n/* success overlay */\n.login-success {\n  position: absolute;\n  inset: -8px;\n  background: rgba(8,15,11,.97);\n  border: 1px solid rgba(0,230,118,.2);\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity .4s ease;\n  z-index: 20;\n}\n.login-success.show { opacity: 1; pointer-events: auto; }\n.ls-check {\n  width: 56px; height: 56px;\n  border-radius: 50%;\n  background: rgba(0,230,118,.1);\n  border: 1.5px solid rgba(0,230,118,.3);\n  display: flex; align-items: center; justify-content: center;\n}\n.login-success.show .ls-check-path {\n  stroke-dasharray: 30;\n  stroke-dashoffset: 30;\n  animation: drawCheck .5s ease .1s forwards;\n}\n@keyframes drawCheck { to { stroke-dashoffset: 0; } }\n.ls-text {\n  font-family: 'Syne', sans-serif;\n  font-size: 16px;\n  font-weight: 700;\n  color: var(--text);\n}\n.ls-sub {\n  font-family: 'DM Mono', monospace;\n  font-size: 10px;\n  color: var(--text2);\n  letter-spacing: .3px;\n}\n\n/* demo pills */\n.login-demo {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  padding: 10px 13px;\n  background: rgba(0,230,118,.04);\n  border: 1px solid rgba(0,230,118,.1);\n  border-radius: 8px;\n  margin-bottom: 20px;\n}\n.login-demo > span {\n  font-family: 'DM Mono', monospace;\n  font-size: 9px;\n  color: rgba(0,230,118,.55);\n  letter-spacing: .5px;\n  white-space: nowrap;\n}\n.demo-pill {\n  padding: 4px 11px;\n  background: rgba(0,230,118,.07);\n  color: var(--primary);\n  border: 1px solid rgba(0,230,118,.18);\n  border-radius: 100px;\n  font-family: 'DM Mono', monospace;\n  font-size: 10px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all .15s;\n  letter-spacing: .2px;\n}\n.demo-pill:hover { background: rgba(0,230,118,.18); border-color: rgba(0,230,118,.38); }\n.demo-pill:active { transform: scale(.96); }\n\n/* error */\n.login-error {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  padding: 10px 13px;\n  background: rgba(239,68,68,.08);\n  border: 1px solid rgba(239,68,68,.18);\n  border-radius: 7px;\n  font-size: 12px;\n  color: #fca5a5;\n  margin-bottom: 14px;\n  animation: fadeUp .3s ease;\n}\n\n/* form group */\n.login-fg {\n  margin-bottom: 14px;\n}\n.login-fg label {\n  display: block;\n  font-family: 'DM Mono', monospace;\n  font-size: 9px;\n  text-transform: uppercase;\n  letter-spacing: .8px;\n  color: rgba(255,255,255,.3);\n  margin-bottom: 7px;\n}\n\n/* animated field */\n.login-field {\n  display: flex;\n  align-items: center;\n  background: rgba(255,255,255,.04);\n  border: 1px solid rgba(255,255,255,.08);\n  border-radius: 8px;\n  overflow: hidden;\n  transition: border-color .2s, box-shadow .2s, background .2s;\n  position: relative;\n}\n.login-field::after {\n  content: '';\n  position: absolute;\n  bottom: 0; left: 0; right: 0;\n  height: 1.5px;\n  background: linear-gradient(90deg, transparent, #00e676, transparent);\n  transform: scaleX(0);\n  transition: transform .35s ease;\n  transform-origin: center;\n  border-radius: 0;\n}\n.login-field:focus-within {\n  border-color: rgba(0,230,118,.3);\n  background: rgba(0,230,118,.03);\n  box-shadow: 0 0 0 3px rgba(0,230,118,.07);\n}\n.login-field:focus-within::after { transform: scaleX(1); }\n.login-field.invalid {\n  border-color: rgba(239,68,68,.35);\n  background: rgba(239,68,68,.03);\n}\n.login-field.invalid::after {\n  background: linear-gradient(90deg, transparent, #ef4444, transparent);\n  transform: scaleX(1);\n}\n\n.lf-ico {\n  padding: 0 12px;\n  color: rgba(255,255,255,.28);\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  transition: color .2s;\n}\n.login-field:focus-within .lf-ico { color: rgba(0,230,118,.6); }\n\n.login-field input {\n  flex: 1;\n  padding: 12px 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  font-family: 'Space Grotesk', sans-serif;\n  font-size: 13px;\n  color: var(--text);\n}\n.login-field input::placeholder { color: rgba(255,255,255,.18); }\n\n.lf-toggle {\n  padding: 0 12px;\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: rgba(255,255,255,.28);\n  display: flex;\n  align-items: center;\n  transition: color .15s;\n}\n.lf-toggle:hover, .lf-toggle.active { color: var(--primary); }\n\n/* field error */\n.login-ferr {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 10px;\n  color: #f87171;\n  margin-top: 5px;\n  animation: fadeUp .25s ease;\n}\n\n/* submit button */\n.login-btn {\n  width: 100%;\n  height: 44px;\n  margin: 6px 0 18px;\n  background: linear-gradient(135deg, #00e676, #00c55a);\n  color: #000;\n  border: none;\n  border-radius: 8px;\n  font-family: 'Syne', sans-serif;\n  font-size: 14px;\n  font-weight: 800;\n  cursor: pointer;\n  letter-spacing: -.2px;\n  position: relative;\n  overflow: hidden;\n  transition: transform .2s, box-shadow .2s, filter .2s;\n}\n.login-btn::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(135deg, rgba(255,255,255,.18), transparent);\n  opacity: 0;\n  transition: opacity .2s;\n}\n.login-btn:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 28px rgba(0,230,118,.38);\n}\n.login-btn:hover:not(:disabled)::before { opacity: 1; }\n.login-btn:active:not(:disabled) { transform: translateY(0); box-shadow: none; }\n.login-btn:disabled { opacity: .55; cursor: not-allowed; }\n\n.login-btn-inner {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  height: 100%;\n}\n.login-spinner {\n  width: 16px; height: 16px;\n  border: 2px solid rgba(0,0,0,.25);\n  border-top-color: #000;\n  border-radius: 50%;\n  animation: spinAnim .7s linear infinite;\n}\n@keyframes spinAnim { to { transform: rotate(360deg); } }\n.login-btn-arrow { transition: transform .2s; display: flex; align-items: center; }\n.login-btn:hover .login-btn-arrow { transform: translateX(4px); }\n\n/* footer */\n.login-footer {\n  text-align: center;\n  font-size: 11px;\n  color: rgba(255,255,255,.3);\n}\n.login-footer a {\n  color: var(--primary);\n  font-weight: 600;\n  text-decoration: none;\n}\n.login-footer a:hover { text-decoration: underline; }\n\n/* \u2550\u2550 RESPONSIVE \u2550\u2550 */\n@media (max-width: 900px) {\n  .login-shell { grid-template-columns: 1fr; }\n  .login-left  { display: none; }\n}"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }, { type: i0.NgZone }], { netCanvas: [{
            type: ViewChild,
            args: ['netCanvas']
        }], typeLine1: [{
            type: ViewChild,
            args: ['typeLine1']
        }], typeLine2: [{
            type: ViewChild,
            args: ['typeLine2']
        }], typeLine3: [{
            type: ViewChild,
            args: ['typeLine3']
        }], typeCursor: [{
            type: ViewChild,
            args: ['typeCursor']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Login, { className: "Login", filePath: "src/app/features/auth/login/login.ts", lineNumber: 16 }); })();
