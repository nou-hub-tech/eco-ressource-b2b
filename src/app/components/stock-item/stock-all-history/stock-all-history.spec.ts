import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAllHistory } from './stock-all-history';

describe('StockAllHistory', () => {
  let component: StockAllHistory;
  let fixture: ComponentFixture<StockAllHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockAllHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockAllHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
