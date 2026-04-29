import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlotCalendar } from './slot-calendar';
import { AiSuggestionsService } from '../../shared/ai-suggestions.service';

describe('SlotCalendar', () => {
  let component: SlotCalendar;
  let fixture: ComponentFixture<SlotCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotCalendar] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(SlotCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // =========================
  // BASIC
  // =========================
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // =========================
  // GRID LOGIC
  // =========================
  it('should build a full week grid (7 days × 6 slots)', () => {
    component.ngOnInit();

    expect(component.weekGrid.length).toBe(7);
    expect(component.weekGrid.flat().length).toBe(42);
  });

  // =========================
  // SCENARIOS
  // =========================
  it('should generate scenarios', () => {
    component.ngOnInit();

    expect(component.scenarios.length).toBeGreaterThan(0);
  });

  it('should apply scenario and select a slot', () => {
    component.ngOnInit();

    component.applyScenario('greenest');

    expect(component.selected).not.toBeNull();
  });

  // =========================
  // INTERACTION
  // =========================
  it('should select a slot when picking a cell', () => {
    component.ngOnInit();

    component.pickCell(0, 0);

    expect(component.selected).not.toBeNull();
  });

  // =========================
  // AI / LOGIC
  // =========================
  it('should compute low demand slots', () => {
    component.ngOnInit();

    expect(component.lowDemandCount()).toBeGreaterThan(0);
  });

  it('should compute solar slots', () => {
    component.ngOnInit();

    expect(component.solarCount()).toBeGreaterThanOrEqual(0);
  });

  it('should compute average intensity', () => {
    component.ngOnInit();

    const avg = component.avgIntensity();

    expect(avg).toBeGreaterThan(0);
  });

  // =========================
  // SELECTION LOGIC
  // =========================
  it('should detect selected cell correctly', () => {
    component.ngOnInit();

    component.pickCell(0, 0);

    const result = component.isSelectedCell(0, 0);

    expect(result).toBe(true);
  });

  // =========================
  // CO2 SAVINGS
  // =========================
  it('should compute CO2 saved when a slot is selected', () => {
    component.ngOnInit();

    component.pickCell(0, 0);

    const saved = component.selectedCo2Saved();

    expect(saved).toBeGreaterThanOrEqual(0);
  });

});