import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTimetableComponent } from './update-timetable.component';

describe('UpdateTimetableComponent', () => {
  let component: UpdateTimetableComponent;
  let fixture: ComponentFixture<UpdateTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
