/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RopaService } from './ropa.service';

describe('Service: Ropa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RopaService]
    });
  });

  it('should ...', inject([RopaService], (service: RopaService) => {
    expect(service).toBeTruthy();
  }));
});
