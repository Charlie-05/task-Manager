import { TestBed } from '@angular/core/testing';

import { MyInterceptorService } from './my-interceptor.service';

describe('MyInterceptorService', () => {
  let service: MyInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
