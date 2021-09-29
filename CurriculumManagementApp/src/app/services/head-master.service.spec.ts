import { TestBed } from '@angular/core/testing';

import { HeadMasterService } from './head-master.service';

describe('HeadMasterService', () => {
  let service: HeadMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
