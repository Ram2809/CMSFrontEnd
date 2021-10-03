import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedSubjectsComponent } from './view-assigned-subjects.component';

describe('ViewAssignedSubjectsComponent', () => {
  let component: ViewAssignedSubjectsComponent;
  let fixture: ComponentFixture<ViewAssignedSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssignedSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
