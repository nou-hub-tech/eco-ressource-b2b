import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockItemHistory } from './stock-item-history';

describe('StockItemHistory', () => {
  let component: StockItemHistory;
  let fixture: ComponentFixture<StockItemHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockItemHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockItemHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
