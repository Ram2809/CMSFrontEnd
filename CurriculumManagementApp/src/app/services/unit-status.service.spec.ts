import { TestBed } from '@angular/core/testing';

import { UnitStatusService } from 'src/app/services/unit-status.service';

describe('TopicStatusService', () => {
  let service: UnitStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
