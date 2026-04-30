import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URL } from '../../../core/constants/api-url';
import {
  AiInsight,
  EnterpriseContext,
  InsightTone,
  ModuleScope,
} from '../models/reservation-center.models';

type RawInsight = {
  id?: unknown;
  title?: unknown;
  label?: unknown;
  message?: unknown;
  text?: unknown;
  detail?: unknown;
  tone?: unknown;
  severity?: unknown;
  score?: unknown;
  confidence?: unknown;
  actionLabel?: unknown;
  meta?: unknown;
};

@Injectable({ providedIn: 'root' })
export class ReservationCenterAiService {
  private readonly endpoint = `${API_URL}/ai/recommendations`;

  constructor(private readonly http: HttpClient) {}

  getInsights(scope: ModuleScope, context: EnterpriseContext): Observable<AiInsight[]> {
    let params = new HttpParams().set('scope', scope);

    if (context.enterpriseId != null) {
      params = params.set('enterpriseId', String(context.enterpriseId));
    }
    if (context.role) {
      params = params.set('role', context.role);
    }

    return this.http.get<unknown>(this.endpoint, { params }).pipe(
      map(response => this.normalize(response, scope)),
    );
  }

  private normalize(response: unknown, scope: ModuleScope): AiInsight[] {
    const items = this.extractArray(response);

    return items
      .map((item, index) => this.normalizeInsight(item, scope, index))
      .filter((item): item is AiInsight => item !== null)
      .slice(0, 5);
  }

  private extractArray(response: unknown): unknown[] {
    if (Array.isArray(response)) {
      return response;
    }

    const objectResponse = response as
      | { recommendations?: unknown; items?: unknown; data?: unknown; message?: unknown }
      | null;

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

  private normalizeInsight(item: unknown, scope: ModuleScope, index: number): AiInsight | null {
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

    const raw = item as RawInsight;
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

  private normalizeMeta(value: unknown): Record<string, string | number | boolean | null> | undefined {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return undefined;
    }

    const meta: Record<string, string | number | boolean | null> = {};
    for (const [key, entry] of Object.entries(value)) {
      if (
        typeof entry === 'string' ||
        typeof entry === 'number' ||
        typeof entry === 'boolean' ||
        entry === null
      ) {
        meta[key] = entry;
      }
    }

    return Object.keys(meta).length ? meta : undefined;
  }

  private normalizeTone(...values: unknown[]): InsightTone {
    const normalized = values
      .filter((value): value is string => typeof value === 'string')
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

  private pickString(...values: unknown[]): string | null {
    for (const value of values) {
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
    return null;
  }

  private pickNumber(...values: unknown[]): number | null {
    for (const value of values) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
    return null;
  }
}
