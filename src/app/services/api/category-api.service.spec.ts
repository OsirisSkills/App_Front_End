import { TestBed } from '@angular/core/testing';

import { CategoryApiService } from './category-api.service';

describe('ApiService', () => {
  let service: CategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
