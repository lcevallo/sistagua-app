import { TestBed } from '@angular/core/testing';

import { ParroquiasService } from './parroquias.service';

describe('ParroquiasService', () => {
  let service: ParroquiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParroquiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
