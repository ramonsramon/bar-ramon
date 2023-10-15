import { TestBed } from '@angular/core/testing';

import { BarRamonService } from './bar-ramon.service';

describe('BarRamonService', () => {
  let service: BarRamonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarRamonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
