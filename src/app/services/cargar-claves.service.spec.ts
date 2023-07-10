import { TestBed } from '@angular/core/testing';

import { CargarClavesService } from './cargar-claves.service';

describe('CargarClavesService', () => {
  let service: CargarClavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarClavesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
