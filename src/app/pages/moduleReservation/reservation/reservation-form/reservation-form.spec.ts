import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationForm } from './reservation-form';

describe('ReservationForm', () => {
  let component: ReservationForm;
  let fixture: ComponentFixture<ReservationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
