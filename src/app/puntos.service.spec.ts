/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PuntosService } from './puntos.service';

describe('Service: Puntos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuntosService]
    });
  });

  it('should ...', inject([PuntosService], (service: PuntosService) => {
    expect(service).toBeTruthy();
  }));
});
