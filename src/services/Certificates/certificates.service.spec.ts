/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CertificatesService } from './certificates.service';

describe('Service: Certificates', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CertificatesService]
    });
  });

  it('should ...', inject([CertificatesService], (service: CertificatesService) => {
    expect(service).toBeTruthy();
  }));
});
