import { TestBed } from '@angular/core/testing';

import { SynonyService } from './synony.service';

describe('SynonyService', () => {
  let service: SynonyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SynonyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
