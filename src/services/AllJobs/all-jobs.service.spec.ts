import { TestBed } from '@angular/core/testing';

import { AllJobsService } from './all-jobs.service';

describe('AllJobsService', () => {
  let service: AllJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
