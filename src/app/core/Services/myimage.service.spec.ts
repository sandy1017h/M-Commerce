import { TestBed } from '@angular/core/testing';

import { MyimageService } from './myimage.service';

describe('MyimageService', () => {
  let service: MyimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyimageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
