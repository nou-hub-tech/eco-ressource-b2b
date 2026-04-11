import { TestBed } from '@angular/core/testing';
import { StockItemService } from './stock-item';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StockItemService', () => {
  let service: StockItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StockItemService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(StockItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});