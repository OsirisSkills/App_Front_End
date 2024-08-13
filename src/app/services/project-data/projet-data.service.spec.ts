import { TestBed } from '@angular/core/testing';

import { ProjetDataService } from './projet-data.service';

describe('ProjetDataService', () => {
  let service: ProjetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
