import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewTimetableComponent } from './staff-view-timetable.component';

describe('StaffViewTimetableComponent', () => {
  let component: StaffViewTimetableComponent;
  let fixture: ComponentFixture<StaffViewTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffViewTimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
