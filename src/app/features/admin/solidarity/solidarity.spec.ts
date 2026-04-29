import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Solidarity } from './solidarity';

describe('Solidarity', () => {
  let component: Solidarity;
  let fixture: ComponentFixture<Solidarity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Solidarity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Solidarity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
