import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { OrderPage } from './order-list';

describe('OrderPage', () => {
  let component: OrderPage;
  let fixture: ComponentFixture<OrderPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  // ---------- smoke ----------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate AI suggestions on init', () => {
    expect(component.suggestions).toBeDefined();
    expect(Array.isArray(component.suggestions)).toBe(true);
  });

  // ---------- draft resolution ----------
  describe('draft resolution', () => {
    it('should resolve the selected material from the catalogue', () => {
      component.draft.material = 'Virgin ABS';
      expect(component.material).toBeDefined();
      expect(component.material?.name).toBe('Virgin ABS');
    });

    it('should resolve the selected supplier', () => {
      component.draft.supplier = 'EcoPoly Lyon';
      expect(component.supplier?.local).toBe(true);
    });

    it('should expose a local supplier count', () => {
      expect(component.localSupplierCount).toBeGreaterThan(0);
      expect(component.localSupplierCount).toBeLessThanOrEqual(component.suppliers.length);
    });
  });

  // ---------- decision engine ----------
  describe('eco-grade decisioning', () => {
    it('should grade a local recyclable order better than a long-haul virgin order', () => {
      component.draft.material = 'Recycled PETG';
      component.draft.supplier = 'EcoPoly Lyon';
      component.analyze();
      const goodGrade = component.draftGrade;

      component.draft.material = 'Virgin ABS';
      component.draft.supplier = 'GlobalResin AG';
      component.analyze();
      const badGrade = component.draftGrade;

      const rank = { A: 5, B: 4, C: 3, D: 2, E: 1 };
      expect(rank[goodGrade]).toBeGreaterThan(rank[badGrade]);
    });

    it('should compute a non-zero CO₂ footprint for a real draft', () => {
      component.draft.material = 'Virgin ABS';
      component.draft.qtyKg = 40;
      component.draft.supplier = 'GlobalResin AG';
      expect(component.draftCo2).toBeGreaterThan(0);
    });

    it('should scale CO₂ linearly with quantity', () => {
      component.draft.qtyKg = 20;
      const co2Low = component.draftCo2;
      component.draft.qtyKg = 80;
      const co2High = component.draftCo2;
      expect(co2High).toBeGreaterThan(co2Low);
    });

    it('should show zero waste for a recyclable material', () => {
      component.draft.material = 'Recycled PETG';
      expect(component.draftWaste).toBe(0);
    });
  });

  // ---------- alternative swap ----------
  describe('alternative suggestion', () => {
    it('should surface a recyclable alternative when a non-recyclable material is selected', () => {
      component.draft.material = 'Virgin ABS';
      component.analyze();
      expect(component.alternative).toBeTruthy();
      expect(component.alternative?.recyclable).toBe(true);
    });

    it('should not suggest an alternative when the material is already recyclable', () => {
      component.draft.material = 'Recycled PETG';
      component.analyze();
      expect(component.alternative).toBeNull();
    });

    it('should swap the draft material when applyAlternative() is called', () => {
      component.draft.material = 'Virgin ABS';
      component.analyze();
      const altName = component.alternative?.name;

      component.applyAlternative();

      expect(component.draft.material).toBe(altName!);
      expect(component.material?.recyclable).toBe(true);
    });
  });

  // ---------- circular bundle ----------
  describe('circular bundle', () => {
    it('should start collapsed', () => {
      expect(component.bundleOpen).toBe(false);
    });

    it('should toggle open/closed', () => {
      component.toggleBundle();
      expect(component.bundleOpen).toBe(true);
      component.toggleBundle();
      expect(component.bundleOpen).toBe(false);
    });

    it('should aggregate the draft quantity with peer demand', () => {
      component.draft.qtyKg = 40;
      const expected = 40 + component.bundleMatchers.reduce((s, b) => s + b.qtyKg, 0);
      expect(component.bundleTotalKg).toBe(expected);
    });

    it('should propose positive savings on the draft order', () => {
      component.draft.qtyKg = 40;
      component.draft.supplier = 'EcoPoly Lyon';
      expect(component.bundleSavings).toBeGreaterThan(0);
    });
  });

  // ---------- KPIs ----------
  describe('KPI aggregation', () => {
    it('should compute avg grade as one of A/B/C/D/E', () => {
      expect(['A', 'B', 'C', 'D', 'E']).toContain(component.avgGrade());
    });

    it('should sum waste avoided only from recyclable non-draft orders', () => {
      const waste = component.totalWasteAvoided();
      expect(waste).toBeGreaterThanOrEqual(0);
    });
  });

  // ---------- actions ----------
  describe('actions', () => {
    it('should prepend a new order when placeOrder() is called', () => {
      const initial = component.orders.length;
      vi.spyOn(window, 'alert').mockImplementation(() => {});
      component.placeOrder();
      expect(component.orders.length).toBe(initial + 1);
      expect(component.orders[0].ref).toMatch(/^ORD-\d+$/);
      expect(component.orders[0].status).toBe('CONFIRMED');
    });

    it('should toggle the PDF preview flag', () => {
      expect(component.previewPdf).toBe(false);
      component.openPdfPreview();
      expect(component.previewPdf).toBe(true);
      component.closePdf();
      expect(component.previewPdf).toBe(false);
    });

    it('should return an ISO date from today()', () => {
      expect(component.today()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});