import { TestBed } from '@angular/core/testing';

import { SearchFactoryService } from './search-factory.service';

describe('SearchFactoryService', () => {
  let service: SearchFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
