import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function AiInsightsPanel_div_9_article_1_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const insight_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(insight_r1.score);
} }
function AiInsightsPanel_div_9_article_1_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function AiInsightsPanel_div_9_article_1_button_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const insight_r1 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.action.emit(insight_r1)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const insight_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", insight_r1.actionLabel, " ");
} }
function AiInsightsPanel_div_9_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 7)(1, "div", 8)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AiInsightsPanel_div_9_article_1_span_4_Template, 2, 1, "span", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, AiInsightsPanel_div_9_article_1_button_7_Template, 2, 1, "button", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const insight_r1 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", "tone-" + insight_r1.tone);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(insight_r1.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", insight_r1.score != null);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(insight_r1.message);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", insight_r1.actionLabel);
} }
function AiInsightsPanel_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtemplate(1, AiInsightsPanel_div_9_article_1_Template, 8, 5, "article", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.insights)("ngForTrackBy", ctx_r2.trackByInsight);
} }
function AiInsightsPanel_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1, "No AI insight was returned by the backend for this module.");
    i0.ɵɵelementEnd();
} }
export class AiInsightsPanel {
    title = 'AI insights';
    subtitle = 'Live recommendations from backend AI services.';
    insights = [];
    action = new EventEmitter();
    trackByInsight(index, insight) {
        return insight.id || String(index);
    }
    static ɵfac = function AiInsightsPanel_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AiInsightsPanel)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AiInsightsPanel, selectors: [["app-ai-insights-panel"]], inputs: { title: "title", subtitle: "subtitle", insights: "insights" }, outputs: { action: "action" }, decls: 12, vars: 4, consts: [["emptyState", ""], [1, "rc-ai-panel", "card"], [1, "rc-ai-head"], [1, "ai-tip"], ["class", "rc-ai-grid", 4, "ngIf", "ngIfElse"], [1, "rc-ai-grid"], ["class", "rc-ai-card", 3, "ngClass", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "rc-ai-card", 3, "ngClass"], [1, "rc-ai-card-head"], [4, "ngIf"], ["class", "btn btn-outline btn-sm", "type", "button", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn", "btn-outline", "btn-sm", 3, "click"], [1, "rc-ai-empty"]], template: function AiInsightsPanel_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 1)(1, "div", 2)(2, "div")(3, "h2");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "span", 3);
            i0.ɵɵtext(8, "AI backend");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, AiInsightsPanel_div_9_Template, 2, 2, "div", 4)(10, AiInsightsPanel_ng_template_10_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const emptyState_r4 = i0.ɵɵreference(11);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.subtitle);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.insights.length)("ngIfElse", emptyState_r4);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf], styles: [".rc-ai-panel[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n.rc-ai-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n\n.rc-ai-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 18px;\n}\n\n.rc-ai-head[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text3);\n  font-size: 13px;\n}\n\n.rc-ai-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 12px;\n}\n\n.rc-ai-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--border);\n  border-left-width: 4px;\n  border-radius: 14px;\n  padding: 14px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.94));\n}\n\n.rc-ai-card-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n\n.rc-ai-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: var(--text2);\n  line-height: 1.5;\n  font-size: 13px;\n}\n\n.rc-ai-card.tone-eco[_ngcontent-%COMP%] {\n  border-left-color: #16a34a;\n}\n\n.rc-ai-card.tone-warn[_ngcontent-%COMP%] {\n  border-left-color: #d97706;\n}\n\n.rc-ai-card.tone-danger[_ngcontent-%COMP%] {\n  border-left-color: #dc2626;\n}\n\n.rc-ai-card.tone-info[_ngcontent-%COMP%] {\n  border-left-color: #0ea5e9;\n}\n\n.rc-ai-card.tone-neutral[_ngcontent-%COMP%] {\n  border-left-color: #64748b;\n}\n\n.rc-ai-empty[_ngcontent-%COMP%] {\n  padding: 18px;\n  border-radius: 12px;\n  background: rgba(248, 250, 252, 0.9);\n  color: var(--text3);\n  border: 1px dashed var(--border2);\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AiInsightsPanel, [{
        type: Component,
        args: [{ selector: 'app-ai-insights-panel', standalone: true, imports: [CommonModule], template: "<section class=\"rc-ai-panel card\">\n  <div class=\"rc-ai-head\">\n    <div>\n      <h2>{{ title }}</h2>\n      <p>{{ subtitle }}</p>\n    </div>\n    <span class=\"ai-tip\">AI backend</span>\n  </div>\n\n  <div class=\"rc-ai-grid\" *ngIf=\"insights.length; else emptyState\">\n    <article class=\"rc-ai-card\" *ngFor=\"let insight of insights; trackBy: trackByInsight\" [ngClass]=\"'tone-' + insight.tone\">\n      <div class=\"rc-ai-card-head\">\n        <strong>{{ insight.title }}</strong>\n        <span *ngIf=\"insight.score != null\">{{ insight.score }}</span>\n      </div>\n      <p>{{ insight.message }}</p>\n      <button class=\"btn btn-outline btn-sm\" type=\"button\" *ngIf=\"insight.actionLabel\" (click)=\"action.emit(insight)\">\n        {{ insight.actionLabel }}\n      </button>\n    </article>\n  </div>\n\n  <ng-template #emptyState>\n    <div class=\"rc-ai-empty\">No AI insight was returned by the backend for this module.</div>\n  </ng-template>\n</section>\n", styles: [".rc-ai-panel {\n  padding: 20px;\n}\n\n.rc-ai-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n\n.rc-ai-head h2 {\n  margin: 0 0 4px;\n  font-size: 18px;\n}\n\n.rc-ai-head p {\n  margin: 0;\n  color: var(--text3);\n  font-size: 13px;\n}\n\n.rc-ai-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 12px;\n}\n\n.rc-ai-card {\n  border: 1px solid var(--border);\n  border-left-width: 4px;\n  border-radius: 14px;\n  padding: 14px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.94));\n}\n\n.rc-ai-card-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n\n.rc-ai-card p {\n  margin: 0 0 12px;\n  color: var(--text2);\n  line-height: 1.5;\n  font-size: 13px;\n}\n\n.rc-ai-card.tone-eco {\n  border-left-color: #16a34a;\n}\n\n.rc-ai-card.tone-warn {\n  border-left-color: #d97706;\n}\n\n.rc-ai-card.tone-danger {\n  border-left-color: #dc2626;\n}\n\n.rc-ai-card.tone-info {\n  border-left-color: #0ea5e9;\n}\n\n.rc-ai-card.tone-neutral {\n  border-left-color: #64748b;\n}\n\n.rc-ai-empty {\n  padding: 18px;\n  border-radius: 12px;\n  background: rgba(248, 250, 252, 0.9);\n  color: var(--text3);\n  border: 1px dashed var(--border2);\n}\n"] }]
    }], null, { title: [{
            type: Input
        }], subtitle: [{
            type: Input
        }], insights: [{
            type: Input
        }], action: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AiInsightsPanel, { className: "AiInsightsPanel", filePath: "src/app/features/reservation-center/components/ai-insights-panel/ai-insights-panel.ts", lineNumber: 12 }); })();
