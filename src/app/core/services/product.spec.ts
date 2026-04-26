import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product';
import { ListingService } from './listing.service';
import { AdminApiService } from './admin-api.service';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        ListingService,
        AdminApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
  });

  it('should be created', () => {
    expect(TestBed.inject(ProductService)).toBeTruthy();

  });
});
