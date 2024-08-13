import { TestBed } from '@angular/core/testing';

import { ProjectFileApiService } from './project-file-api.service';

describe('ProjectFileApiService', () => {
  let service: ProjectFileApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFileApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
