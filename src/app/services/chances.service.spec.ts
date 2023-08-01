import { TestBed } from '@angular/core/testing';

import { ChancesService } from './chances.service';

describe('ChancesService', () => {
  let service: ChancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
