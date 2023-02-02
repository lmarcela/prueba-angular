import { TestBed } from '@angular/core/testing';

import { PaisesInterceptor } from './paises.interceptor';

describe('PaisesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PaisesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PaisesInterceptor = TestBed.inject(PaisesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
