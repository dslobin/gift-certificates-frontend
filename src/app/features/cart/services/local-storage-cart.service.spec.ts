import { TestBed } from '@angular/core/testing';

import { LocalStorageCartService } from './local-storage-cart.service';

describe('LocalStorageCartService', () => {
  let service: LocalStorageCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
