import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authloginclientGuard } from './authloginclient.guard';

describe('authloginclientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authloginclientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
