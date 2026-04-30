import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URL } from '../../../core/constants/api-url';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ReservationCenterAiService {
    http;
    endpoint = `${API_URL}/ai/recommendations`;
    constructor(http) {
        this.http = http;
    }
    getInsights(scope, context) {
        let params = new HttpParams().set('scope', scope);
        if (context.enterpriseId != null) {
            params = params.set('enterpriseId', String(context.enterpriseId));
        }
        if (context.role) {
            params = params.set('role', context.role);
        }
        return this.http.get(this.endpoint, { params }).pipe(map(response => this.normalize(response, scope)));
    }
    normalize(response, scope) {
        const items = this.extractArray(response);
        return items
            .map((item, index) => this.normalizeInsight(item, scope, index))
            .filter((item) => item !== null)
            .slice(0, 5);
    }
    extractArray(response) {
        if (Array.isArray(response)) {
            return response;
        }
        const objectResponse = response;
        if (Array.isArray(objectResponse?.recommendations)) {
            return objectResponse.recommendations;
        }
        if (Array.isArray(objectResponse?.items)) {
            return objectResponse.items;
        }
        if (Array.isArray(objectResponse?.data)) {
            return objectResponse.data;
        }
        if (typeof objectResponse?.message === 'string') {
            return [objectResponse.message];
        }
        return [];
    }
    normalizeInsight(item, scope, index) {
        if (typeof item === 'string') {
            return {
                id: `${scope}-${index}`,
                title: 'AI insight',
                message: item,
                tone: 'info',
            };
        }
        if (!item || typeof item !== 'object') {
            return null;
        }
        const raw = item;
        const title = this.pickString(raw.title, raw.label) ?? 'AI insight';
        const message = this.pickString(raw.message, raw.text, raw.detail);
        if (!message) {
            return null;
        }
        return {
            id: this.pickString(raw.id) ?? `${scope}-${index}`,
            title,
            message,
            tone: this.normalizeTone(raw.tone, raw.severity),
            score: this.pickNumber(raw.score, raw.confidence),
            actionLabel: this.pickString(raw.actionLabel) ?? null,
            meta: this.normalizeMeta(raw.meta),
        };
    }
    normalizeMeta(value) {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            return undefined;
        }
        const meta = {};
        for (const [key, entry] of Object.entries(value)) {
            if (typeof entry === 'string' ||
                typeof entry === 'number' ||
                typeof entry === 'boolean' ||
                entry === null) {
                meta[key] = entry;
            }
        }
        return Object.keys(meta).length ? meta : undefined;
    }
    normalizeTone(...values) {
        const normalized = values
            .filter((value) => typeof value === 'string')
            .map(value => value.toLowerCase());
        if (normalized.some(value => value.includes('danger') || value.includes('critical') || value.includes('high'))) {
            return 'danger';
        }
        if (normalized.some(value => value.includes('warn') || value.includes('medium'))) {
            return 'warn';
        }
        if (normalized.some(value => value.includes('eco') || value.includes('green') || value.includes('positive'))) {
            return 'eco';
        }
        if (normalized.some(value => value.includes('neutral'))) {
            return 'neutral';
        }
        return 'info';
    }
    pickString(...values) {
        for (const value of values) {
            if (typeof value === 'string' && value.trim()) {
                return value.trim();
            }
        }
        return null;
    }
    pickNumber(...values) {
        for (const value of values) {
            const parsed = Number(value);
            if (Number.isFinite(parsed)) {
                return parsed;
            }
        }
        return null;
    }
    static ɵfac = function ReservationCenterAiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReservationCenterAiService)(i0.ɵɵinject(i1.HttpClient)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReservationCenterAiService, factory: ReservationCenterAiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReservationCenterAiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.HttpClient }], null); })();
