import { TestBed } from '@angular/core/testing';

import { TopicStatusService } from './topic-status.service';

describe('TopicStatusService', () => {
  let service: TopicStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
