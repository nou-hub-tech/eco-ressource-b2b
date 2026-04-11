import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStock } from './my-stock';

describe('MyStock', () => {
  let component: MyStock;
  let fixture: ComponentFixture<MyStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyStock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
