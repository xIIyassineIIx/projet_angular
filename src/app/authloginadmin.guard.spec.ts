import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authloginadminGuard } from './authloginadmin.guard';

describe('authloginadminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authloginadminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
