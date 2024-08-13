import { TestBed } from '@angular/core/testing';

import { MemberApiService } from './member-api.service';

describe('MemberService', () => {
  let service: MemberApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
