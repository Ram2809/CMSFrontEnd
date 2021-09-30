import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopicStatusComponent } from './add-topic-status.component';

describe('UpdateTopicStatusComponent', () => {
  let component: AddTopicStatusComponent;
  let fixture: ComponentFixture<AddTopicStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTopicStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopicStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
