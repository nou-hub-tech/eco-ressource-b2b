import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../services/comment.service";
import * as i2 from "../../../../core/services/auth.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
const _c0 = a0 => ({ $implicit: a0, depth: 0 });
const _c1 = (a0, a1) => ({ $implicit: a0, depth: a1 });
function CommentThread_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵelement(1, "div", 20);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Chargement des commentaires...");
    i0.ɵɵelementEnd()();
} }
function CommentThread_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 22);
    i0.ɵɵelement(2, "path", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Aucun commentaire. Soyez le premier \u00E0 commenter !");
    i0.ɵɵelementEnd()();
} }
function CommentThread_div_9_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function CommentThread_div_9_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CommentThread_div_9_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 25);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const c_r1 = ctx.$implicit;
    i0.ɵɵnextContext(2);
    const commentTpl_r2 = i0.ɵɵreference(22);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", commentTpl_r2)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, c_r1));
} }
function CommentThread_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtemplate(1, CommentThread_div_9_ng_container_1_Template, 2, 4, "ng-container", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.comments);
} }
function CommentThread_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 26)(1, "span");
    i0.ɵɵtext(2, "R\u00E9ponse \u00E0 ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "button", 27);
    i0.ɵɵlistener("click", function CommentThread_div_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.cancelReply()); });
    i0.ɵɵtext(6, "\u2715 Annuler");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.replyTo.userFullName);
} }
function CommentThread_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "span");
    i0.ɵɵtext(2, "Modification du commentaire");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 27);
    i0.ɵɵlistener("click", function CommentThread_div_12_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.cancelReply()); });
    i0.ɵɵtext(4, "\u2715 Annuler");
    i0.ɵɵelementEnd()();
} }
function CommentThread__svg_svg_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 29);
    i0.ɵɵelement(1, "line", 30)(2, "polygon", 31);
    i0.ɵɵelementEnd();
} }
function CommentThread_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 32);
} }
function CommentThread_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1, "Veuillez patienter 3 secondes...");
    i0.ɵɵelementEnd();
} }
function CommentThread_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1, "Maximum 2000 caract\u00E8res");
    i0.ɵɵelementEnd();
} }
function CommentThread_ng_template_21_button_17_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 27);
    i0.ɵɵlistener("click", function CommentThread_ng_template_21_button_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const c_r7 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.startEdit(c_r7)); });
    i0.ɵɵtext(1, "Modifier");
    i0.ɵɵelementEnd();
} }
function CommentThread_ng_template_21_button_18_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 49);
    i0.ɵɵlistener("click", function CommentThread_ng_template_21_button_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const c_r7 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.deleteComment(c_r7.id)); });
    i0.ɵɵtext(1, "Supprimer");
    i0.ɵɵelementEnd();
} }
function CommentThread_ng_template_21_ng_container_19_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function CommentThread_ng_template_21_ng_container_19_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CommentThread_ng_template_21_ng_container_19_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 25);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const r_r10 = ctx.$implicit;
    const depth_r11 = i0.ɵɵnextContext(2).depth;
    i0.ɵɵnextContext();
    const commentTpl_r2 = i0.ɵɵreference(22);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", commentTpl_r2)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c1, r_r10, depth_r11 + 1));
} }
function CommentThread_ng_template_21_ng_container_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CommentThread_ng_template_21_ng_container_19_ng_container_1_Template, 2, 5, "ng-container", 24);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const c_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", c_r7.replies);
} }
function CommentThread_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 35)(1, "div", 36);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 37)(4, "div", 38)(5, "span", 39);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 40);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 41);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 42)(12, "button", 27);
    i0.ɵɵlistener("click", function CommentThread_ng_template_21_Template_button_click_12_listener() { const c_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.startReply(c_r7)); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(13, "svg", 43);
    i0.ɵɵelement(14, "polyline", 44)(15, "path", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(16, " R\u00E9pondre ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, CommentThread_ng_template_21_button_17_Template, 2, 0, "button", 46)(18, CommentThread_ng_template_21_button_18_Template, 2, 0, "button", 47);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(19, CommentThread_ng_template_21_ng_container_19_Template, 2, 1, "ng-container", 48);
} if (rf & 2) {
    const c_r7 = ctx.$implicit;
    const depth_r11 = ctx.depth;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("margin-left", depth_r11 * 24, "px");
    i0.ɵɵclassProp("ct-reply", depth_r11 > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((c_r7.userFullName == null ? null : c_r7.userFullName.charAt(0)) || "?");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(c_r7.userFullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.timeAgo(c_r7.createdAt));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(c_r7.content);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r2.isOwner(c_r7));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.canDelete(c_r7));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (c_r7.replies == null ? null : c_r7.replies.length) && depth_r11 < 3);
} }
export class CommentThread {
    commentService;
    authService;
    listingId;
    comments = [];
    commentCtrl = new FormControl('', [Validators.required, Validators.maxLength(2000)]);
    loading = false;
    sending = false;
    antiSpam = false;
    replyTo = null;
    editingComment = null;
    currentUserId = null;
    currentUserRole = null;
    spamTimer;
    constructor(commentService, authService) {
        this.commentService = commentService;
        this.authService = authService;
    }
    ngOnInit() {
        const user = this.authService.currentUser;
        if (user) {
            this.currentUserId = parseInt(user.id, 10);
            this.currentUserRole = user.role;
        }
        this.loadComments();
    }
    ngOnDestroy() {
        if (this.spamTimer)
            clearTimeout(this.spamTimer);
    }
    loadComments() {
        this.loading = true;
        this.commentService.findByListing(this.listingId).subscribe({
            next: (data) => { this.comments = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }
    submit() {
        if (this.commentCtrl.invalid || this.antiSpam || !this.commentCtrl.value?.trim())
            return;
        this.sending = true;
        if (this.editingComment) {
            this.commentService.update(this.editingComment.id, {
                content: this.commentCtrl.value.trim()
            }).subscribe({
                next: () => { this.reset(); this.loadComments(); },
                error: () => { this.sending = false; }
            });
        }
        else {
            this.commentService.create(this.listingId, {
                content: this.commentCtrl.value.trim(),
                parentId: this.replyTo?.id ?? null
            }).subscribe({
                next: () => { this.reset(); this.startAntiSpam(); this.loadComments(); },
                error: () => { this.sending = false; }
            });
        }
    }
    startReply(comment) {
        this.replyTo = comment;
        this.editingComment = null;
        this.commentCtrl.setValue('');
    }
    startEdit(comment) {
        this.editingComment = comment;
        this.replyTo = null;
        this.commentCtrl.setValue(comment.content);
    }
    cancelReply() {
        this.replyTo = null;
        this.editingComment = null;
        this.commentCtrl.setValue('');
    }
    deleteComment(id) {
        this.commentService.delete(id).subscribe({
            next: () => this.loadComments()
        });
    }
    isOwner(comment) {
        return this.currentUserId === comment.userId;
    }
    canDelete(comment) {
        return this.isOwner(comment) || this.currentUserRole === 'admin';
    }
    timeAgo(dateStr) {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1)
            return 'À l\'instant';
        if (mins < 60)
            return `Il y a ${mins} min`;
        const hours = Math.floor(mins / 60);
        if (hours < 24)
            return `Il y a ${hours}h`;
        const days = Math.floor(hours / 24);
        if (days < 7)
            return `Il y a ${days}j`;
        return new Date(dateStr).toLocaleDateString('fr-FR');
    }
    reset() {
        this.commentCtrl.setValue('');
        this.replyTo = null;
        this.editingComment = null;
        this.sending = false;
    }
    startAntiSpam() {
        this.antiSpam = true;
        this.spamTimer = setTimeout(() => { this.antiSpam = false; }, 3000);
    }
    static ɵfac = function CommentThread_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommentThread)(i0.ɵɵdirectiveInject(i1.CommentService), i0.ɵɵdirectiveInject(i2.AuthService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CommentThread, selectors: [["app-comment-thread"]], inputs: { listingId: "listingId" }, standalone: false, decls: 23, vars: 13, consts: [["commentTpl", ""], [1, "ct-section"], [1, "ct-heading"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"], [1, "ct-count"], ["class", "ct-loading", 4, "ngIf"], ["class", "ct-empty", 4, "ngIf"], ["class", "ct-list", 4, "ngIf"], [1, "ct-form"], ["class", "ct-reply-bar", 4, "ngIf"], ["class", "ct-edit-bar", 4, "ngIf"], [1, "ct-input-row"], ["placeholder", "\u00C9crire un commentaire...", "rows", "2", 1, "ct-textarea", 3, "formControl"], [1, "btn", "btn-primary", "ct-send", 3, "click", "disabled"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 4, "ngIf"], ["class", "spinner-sm", 4, "ngIf"], ["class", "ct-spam-msg", 4, "ngIf"], ["class", "form-error", 4, "ngIf"], [1, "ct-loading"], [1, "spinner"], [1, "ct-empty"], ["width", "28", "height", "28", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], [1, "ct-list"], [4, "ngFor", "ngForOf"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "ct-reply-bar"], [1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "ct-edit-bar"], ["width", "16", "height", "16", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x1", "22", "y1", "2", "x2", "11", "y2", "13"], ["points", "22 2 15 22 11 13 2 9 22 2"], [1, "spinner-sm"], [1, "ct-spam-msg"], [1, "form-error"], [1, "ct-item"], [1, "ct-avatar"], [1, "ct-content"], [1, "ct-header"], [1, "ct-author"], [1, "ct-date"], [1, "ct-text"], [1, "ct-actions"], ["width", "12", "height", "12", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["points", "9 17 4 12 9 7"], ["d", "M20 18v-2a4 4 0 00-4-4H4"], ["class", "btn btn-ghost btn-sm", 3, "click", 4, "ngIf"], ["class", "btn btn-ghost btn-sm ct-delete", 3, "click", 4, "ngIf"], [4, "ngIf"], [1, "btn", "btn-ghost", "btn-sm", "ct-delete", 3, "click"]], template: function CommentThread_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "h3", 2);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(2, "svg", 3);
            i0.ɵɵelement(3, "path", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(4, " Commentaires ");
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(5, "span", 5);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(7, CommentThread_div_7_Template, 4, 0, "div", 6)(8, CommentThread_div_8_Template, 5, 0, "div", 7)(9, CommentThread_div_9_Template, 2, 1, "div", 8);
            i0.ɵɵelementStart(10, "div", 9);
            i0.ɵɵtemplate(11, CommentThread_div_11_Template, 7, 1, "div", 10)(12, CommentThread_div_12_Template, 5, 0, "div", 11);
            i0.ɵɵelementStart(13, "div", 12);
            i0.ɵɵelement(14, "textarea", 13);
            i0.ɵɵelementStart(15, "button", 14);
            i0.ɵɵlistener("click", function CommentThread_Template_button_click_15_listener() { return ctx.submit(); });
            i0.ɵɵtemplate(16, CommentThread__svg_svg_16_Template, 3, 0, "svg", 15)(17, CommentThread_span_17_Template, 1, 0, "span", 16);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(19, CommentThread_div_19_Template, 2, 0, "div", 17)(20, CommentThread_div_20_Template, 2, 0, "div", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(21, CommentThread_ng_template_21_Template, 20, 11, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.comments.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading && ctx.comments.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.replyTo);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.editingComment);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formControl", ctx.commentCtrl);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.commentCtrl.invalid || ctx.antiSpam || ctx.sending || !(ctx.commentCtrl.value == null ? null : ctx.commentCtrl.value.trim()));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.sending);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.sending);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.editingComment ? "Modifier" : "Envoyer", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.antiSpam);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.commentCtrl.hasError("maxlength"));
        } }, dependencies: [i3.NgForOf, i3.NgIf, i3.NgTemplateOutlet, i4.DefaultValueAccessor, i4.NgControlStatus, i4.FormControlDirective], styles: [".ct-section[_ngcontent-%COMP%]{background:var(--card);border-radius:16px;padding:20px 22px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ct-heading[_ngcontent-%COMP%]{font-size:15px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px;margin-bottom:18px;letter-spacing:-.01em}\n.ct-count[_ngcontent-%COMP%]{font-size:11px;background:var(--bg3,#f1f5f9);color:var(--text3);padding:2px 10px;border-radius:100px;font-weight:600}\n.ct-loading[_ngcontent-%COMP%]{display:flex;align-items:center;gap:10px;padding:28px;justify-content:center;color:var(--text3);font-size:13px}\n.ct-empty[_ngcontent-%COMP%]{text-align:center;padding:36px 16px;color:var(--text3);font-size:13px}\n.ct-empty[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%]{opacity:.2;margin-bottom:8px}\n.ct-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:0;margin-bottom:16px}\n.ct-item[_ngcontent-%COMP%]{display:flex;gap:12px;padding:12px 4px;transition:background .12s;border-radius:10px}\n.ct-item[_ngcontent-%COMP%]:hover{background:rgba(0,0,0,.015)}\n.ct-reply[_ngcontent-%COMP%]{margin-left:32px!important;padding-left:16px;border-left:2px solid var(--bg3,#f1f5f9)}\n.ct-avatar[_ngcontent-%COMP%]{width:36px;height:36px;min-width:36px;border-radius:50%;background:linear-gradient(135deg,#222831,#393E46);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700}\n.ct-content[_ngcontent-%COMP%]{flex:1;min-width:0}\n.ct-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;margin-bottom:3px}\n.ct-author[_ngcontent-%COMP%]{font-size:13px;font-weight:700;color:var(--text)}\n.ct-date[_ngcontent-%COMP%]{font-size:11px;color:var(--muted);font-weight:400}\n.ct-text[_ngcontent-%COMP%]{font-size:14px;color:var(--text2);line-height:1.55;word-break:break-word}\n.ct-actions[_ngcontent-%COMP%]{display:flex;gap:2px;margin-top:4px}\n.ct-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{padding:4px 10px;font-size:11px;border-radius:8px;font-weight:500;color:var(--text3)}\n.ct-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover{color:var(--text);background:var(--bg3,#f1f5f9)}\n.ct-delete[_ngcontent-%COMP%]{color:var(--danger,#f87171)!important}\n.ct-delete[_ngcontent-%COMP%]:hover{background:rgba(239,68,68,.06)!important}\n.ct-form[_ngcontent-%COMP%]{padding:14px 0 0;margin-top:8px;border-top:1px solid var(--bg3,#f1f5f9)}\n.ct-reply-bar[_ngcontent-%COMP%], .ct-edit-bar[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:rgba(0,173,181,.06);border-radius:10px;margin-bottom:10px;font-size:12px;color:var(--primary);font-weight:500}\n.ct-input-row[_ngcontent-%COMP%]{display:flex;gap:10px;align-items:flex-end}\n.ct-textarea[_ngcontent-%COMP%]{flex:1;padding:12px 16px;background:var(--bg3,#f8fafc);border:1px solid transparent;border-radius:12px;font-size:14px;color:var(--text);resize:none;outline:none;transition:all .2s;font-family:'Space Grotesk',sans-serif;min-height:44px}\n.ct-textarea[_ngcontent-%COMP%]:focus{border-color:var(--primary);background:var(--card);box-shadow:0 0 0 3px rgba(2,132,199,.08)}\n.ct-send[_ngcontent-%COMP%]{min-width:44px;width:44px;height:44px;padding:0;border-radius:50%;justify-content:center;display:flex;align-items:center}\n.ct-spam-msg[_ngcontent-%COMP%]{font-size:12px;color:var(--warning,#d97706);margin-top:6px;font-weight:500}\n.spinner[_ngcontent-%COMP%]{width:20px;height:20px;border:2px solid var(--border2);border-top-color:var(--primary);border-radius:50%;animation:_ngcontent-%COMP%_spin .6s linear infinite}\n.spinner-sm[_ngcontent-%COMP%]{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:_ngcontent-%COMP%_spin .6s linear infinite;display:inline-block}\n@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}\n@media(max-width:600px){.ct-input-row[_ngcontent-%COMP%]{flex-direction:column}.ct-send[_ngcontent-%COMP%]{width:100%;border-radius:12px;height:42px}.ct-reply[_ngcontent-%COMP%]{margin-left:16px!important}}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommentThread, [{
        type: Component,
        args: [{ selector: 'app-comment-thread', standalone: false, template: "<div class=\"ct-section\">\n  <h3 class=\"ct-heading\">\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z\"/></svg>\n    Commentaires\n    <span class=\"ct-count\">{{comments.length}}</span>\n  </h3>\n\n  <!-- Loading -->\n  <div class=\"ct-loading\" *ngIf=\"loading\">\n    <div class=\"spinner\"></div>\n    <span>Chargement des commentaires...</span>\n  </div>\n\n  <!-- Empty -->\n  <div class=\"ct-empty\" *ngIf=\"!loading && comments.length === 0\">\n    <svg width=\"28\" height=\"28\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path d=\"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z\"/></svg>\n    <p>Aucun commentaire. Soyez le premier \u00E0 commenter !</p>\n  </div>\n\n  <!-- Comments tree -->\n  <div class=\"ct-list\" *ngIf=\"!loading\">\n    <ng-container *ngFor=\"let c of comments\">\n      <ng-container *ngTemplateOutlet=\"commentTpl; context: { $implicit: c, depth: 0 }\"></ng-container>\n    </ng-container>\n  </div>\n\n  <!-- Form -->\n  <div class=\"ct-form\">\n    <div class=\"ct-reply-bar\" *ngIf=\"replyTo\">\n      <span>R\u00E9ponse \u00E0 <strong>{{replyTo.userFullName}}</strong></span>\n      <button class=\"btn btn-ghost btn-sm\" (click)=\"cancelReply()\">\u2715 Annuler</button>\n    </div>\n    <div class=\"ct-edit-bar\" *ngIf=\"editingComment\">\n      <span>Modification du commentaire</span>\n      <button class=\"btn btn-ghost btn-sm\" (click)=\"cancelReply()\">\u2715 Annuler</button>\n    </div>\n    <div class=\"ct-input-row\">\n      <textarea [formControl]=\"commentCtrl\" placeholder=\"\u00C9crire un commentaire...\" rows=\"2\" class=\"ct-textarea\"></textarea>\n      <button class=\"btn btn-primary ct-send\"\n              [disabled]=\"commentCtrl.invalid || antiSpam || sending || !commentCtrl.value?.trim()\"\n              (click)=\"submit()\">\n        <svg *ngIf=\"!sending\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"13\"/><polygon points=\"22 2 15 22 11 13 2 9 22 2\"/></svg>\n        <span *ngIf=\"sending\" class=\"spinner-sm\"></span>\n        {{editingComment ? 'Modifier' : 'Envoyer'}}\n      </button>\n    </div>\n    <div class=\"ct-spam-msg\" *ngIf=\"antiSpam\">Veuillez patienter 3 secondes...</div>\n    <div class=\"form-error\" *ngIf=\"commentCtrl.hasError('maxlength')\">Maximum 2000 caract\u00E8res</div>\n  </div>\n</div>\n\n<!-- Recursive comment template -->\n<ng-template #commentTpl let-c let-depth=\"depth\">\n  <div class=\"ct-item\" [style.marginLeft.px]=\"depth * 24\" [class.ct-reply]=\"depth > 0\">\n    <div class=\"ct-avatar\">{{c.userFullName?.charAt(0) || '?'}}</div>\n    <div class=\"ct-content\">\n      <div class=\"ct-header\">\n        <span class=\"ct-author\">{{c.userFullName}}</span>\n        <span class=\"ct-date\">{{timeAgo(c.createdAt)}}</span>\n      </div>\n      <p class=\"ct-text\">{{c.content}}</p>\n      <div class=\"ct-actions\">\n        <button class=\"btn btn-ghost btn-sm\" (click)=\"startReply(c)\">\n          <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polyline points=\"9 17 4 12 9 7\"/><path d=\"M20 18v-2a4 4 0 00-4-4H4\"/></svg>\n          R\u00E9pondre\n        </button>\n        <button class=\"btn btn-ghost btn-sm\" *ngIf=\"isOwner(c)\" (click)=\"startEdit(c)\">Modifier</button>\n        <button class=\"btn btn-ghost btn-sm ct-delete\" *ngIf=\"canDelete(c)\" (click)=\"deleteComment(c.id)\">Supprimer</button>\n      </div>\n    </div>\n  </div>\n  <ng-container *ngIf=\"c.replies?.length && depth < 3\">\n    <ng-container *ngFor=\"let r of c.replies\">\n      <ng-container *ngTemplateOutlet=\"commentTpl; context: { $implicit: r, depth: depth + 1 }\"></ng-container>\n    </ng-container>\n  </ng-container>\n</ng-template>\n", styles: [".ct-section{background:var(--card);border-radius:16px;padding:20px 22px;box-shadow:0 1px 3px rgba(0,0,0,.04)}\n.ct-heading{font-size:15px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px;margin-bottom:18px;letter-spacing:-.01em}\n.ct-count{font-size:11px;background:var(--bg3,#f1f5f9);color:var(--text3);padding:2px 10px;border-radius:100px;font-weight:600}\n.ct-loading{display:flex;align-items:center;gap:10px;padding:28px;justify-content:center;color:var(--text3);font-size:13px}\n.ct-empty{text-align:center;padding:36px 16px;color:var(--text3);font-size:13px}\n.ct-empty svg{opacity:.2;margin-bottom:8px}\n.ct-list{display:flex;flex-direction:column;gap:0;margin-bottom:16px}\n.ct-item{display:flex;gap:12px;padding:12px 4px;transition:background .12s;border-radius:10px}\n.ct-item:hover{background:rgba(0,0,0,.015)}\n.ct-reply{margin-left:32px!important;padding-left:16px;border-left:2px solid var(--bg3,#f1f5f9)}\n.ct-avatar{width:36px;height:36px;min-width:36px;border-radius:50%;background:linear-gradient(135deg,#222831,#393E46);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700}\n.ct-content{flex:1;min-width:0}\n.ct-header{display:flex;align-items:center;gap:8px;margin-bottom:3px}\n.ct-author{font-size:13px;font-weight:700;color:var(--text)}\n.ct-date{font-size:11px;color:var(--muted);font-weight:400}\n.ct-text{font-size:14px;color:var(--text2);line-height:1.55;word-break:break-word}\n.ct-actions{display:flex;gap:2px;margin-top:4px}\n.ct-actions .btn{padding:4px 10px;font-size:11px;border-radius:8px;font-weight:500;color:var(--text3)}\n.ct-actions .btn:hover{color:var(--text);background:var(--bg3,#f1f5f9)}\n.ct-delete{color:var(--danger,#f87171)!important}\n.ct-delete:hover{background:rgba(239,68,68,.06)!important}\n.ct-form{padding:14px 0 0;margin-top:8px;border-top:1px solid var(--bg3,#f1f5f9)}\n.ct-reply-bar,.ct-edit-bar{display:flex;align-items:center;justify-content:space-between;padding:8px 14px;background:rgba(0,173,181,.06);border-radius:10px;margin-bottom:10px;font-size:12px;color:var(--primary);font-weight:500}\n.ct-input-row{display:flex;gap:10px;align-items:flex-end}\n.ct-textarea{flex:1;padding:12px 16px;background:var(--bg3,#f8fafc);border:1px solid transparent;border-radius:12px;font-size:14px;color:var(--text);resize:none;outline:none;transition:all .2s;font-family:'Space Grotesk',sans-serif;min-height:44px}\n.ct-textarea:focus{border-color:var(--primary);background:var(--card);box-shadow:0 0 0 3px rgba(2,132,199,.08)}\n.ct-send{min-width:44px;width:44px;height:44px;padding:0;border-radius:50%;justify-content:center;display:flex;align-items:center}\n.ct-spam-msg{font-size:12px;color:var(--warning,#d97706);margin-top:6px;font-weight:500}\n.spinner{width:20px;height:20px;border:2px solid var(--border2);border-top-color:var(--primary);border-radius:50%;animation:spin .6s linear infinite}\n.spinner-sm{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;display:inline-block}\n@keyframes spin{to{transform:rotate(360deg)}}\n@media(max-width:600px){.ct-input-row{flex-direction:column}.ct-send{width:100%;border-radius:12px;height:42px}.ct-reply{margin-left:16px!important}}\n"] }]
    }], () => [{ type: i1.CommentService }, { type: i2.AuthService }], { listingId: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CommentThread, { className: "CommentThread", filePath: "src/app/features/annonces/components/comment-thread/comment-thread.ts", lineNumber: 13 }); })();
