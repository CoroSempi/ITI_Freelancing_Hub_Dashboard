import { TestBed } from '@angular/core/testing';

import { RoundanalisticsService } from './roundanalistics.service';

describe('RoundanalisticsService', () => {
  let service: RoundanalisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundanalisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
