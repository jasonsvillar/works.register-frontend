import { TestBed } from '@angular/core/testing';

import { UserNotValidatedService } from './user-not-validated.service';

describe('UserNotValidatedService', () => {
  let service: UserNotValidatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotValidatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
