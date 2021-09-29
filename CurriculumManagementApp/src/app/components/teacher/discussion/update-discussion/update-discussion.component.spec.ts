import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiscussionComponent } from './update-discussion.component';

describe('UpdateDiscussionComponent', () => {
  let component: UpdateDiscussionComponent;
  let fixture: ComponentFixture<UpdateDiscussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDiscussionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
