import { TestBed } from '@angular/core/testing';

import { ProjectStatusApiService } from './project-status-api.service';

describe('ProjectStatusApiService', () => {
  let service: ProjectStatusApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectStatusApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
