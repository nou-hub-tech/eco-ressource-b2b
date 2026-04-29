import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotForm } from './slot-form';

describe('SlotForm', () => {
  let component: SlotForm;
  let fixture: ComponentFixture<SlotForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlotForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
