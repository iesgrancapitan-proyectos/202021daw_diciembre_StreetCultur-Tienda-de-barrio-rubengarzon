/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IncidenciaService } from './incidencia.service';

describe('Service: Incidencia', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidenciaService]
    });
  });

  it('should ...', inject([IncidenciaService], (service: IncidenciaService) => {
    expect(service).toBeTruthy();
  }));
});
