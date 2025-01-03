import { TestBed } from '@angular/core/testing';

import { AuthIntercetorInterceptor } from './auth-intercetor.interceptor';

describe('AuthIntercetorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthIntercetorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthIntercetorInterceptor = TestBed.inject(AuthIntercetorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
