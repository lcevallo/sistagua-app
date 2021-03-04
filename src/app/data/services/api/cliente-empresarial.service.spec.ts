import { TestBed } from '@angular/core/testing';

import { ClienteEmpresarialService } from './cliente-empresarial.service';

describe('ClienteEmpresarialService', () => {
  let service: ClienteEmpresarialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteEmpresarialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
