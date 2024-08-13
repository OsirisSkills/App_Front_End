import { TestBed } from '@angular/core/testing';

import { SendEmailToResetPwdService } from './send-email-to-reset-pwd.service';

describe('SendEmailToResetPwdService', () => {
  let service: SendEmailToResetPwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendEmailToResetPwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
