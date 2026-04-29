import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockItemListComponent } from './stock-item-list';

describe('StockItemListComponent', () => {
  let component: StockItemListComponent;
  let fixture: ComponentFixture<StockItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockItemListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockItemListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});