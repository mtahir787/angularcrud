import { TestBed } from '@angular/core/testing';

import { AccountsApiService } from './accounts-api.service';

describe('AccountsApiService', () => {
  let service: AccountsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
