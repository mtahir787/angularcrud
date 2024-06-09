import { TestBed } from '@angular/core/testing';

import { VendorApiService } from './vendor-api.service';

describe('VendorApiService', () => {
  let service: VendorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
