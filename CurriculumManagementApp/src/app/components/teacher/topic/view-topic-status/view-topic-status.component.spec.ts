import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTopicStatusComponent } from './view-topic-status.component';

describe('ViewTopicStatusComponent', () => {
  let component: ViewTopicStatusComponent;
  let fixture: ComponentFixture<ViewTopicStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTopicStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTopicStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
