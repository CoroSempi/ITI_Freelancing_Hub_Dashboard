/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobsService } from './jobs.service';

describe('Service: Jobs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobsService]
    });
  });

  it('should ...', inject([JobsService], (service: JobsService) => {
    expect(service).toBeTruthy();
  }));
});
