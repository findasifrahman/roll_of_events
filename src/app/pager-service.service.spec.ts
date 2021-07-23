import { TestBed } from '@angular/core/testing';

import { PagerServiceService } from './pager-service.service';

describe('PagerServiceService', () => {
  let service: PagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
