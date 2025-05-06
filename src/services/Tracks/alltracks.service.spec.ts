import { TestBed } from '@angular/core/testing';

import { AlltracksService } from './alltracks.service';

describe('AlltracksService', () => {
  let service: AlltracksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlltracksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
