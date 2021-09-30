import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTopicStatusComponent } from './update-topic-status.component';

describe('UpdateTopicStatusComponent', () => {
  let component: UpdateTopicStatusComponent;
  let fixture: ComponentFixture<UpdateTopicStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTopicStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTopicStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
