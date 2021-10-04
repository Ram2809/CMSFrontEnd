import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStaffAssignComponent } from './update-staff-assign.component';

describe('UpdateStaffAssignComponent', () => {
  let component: UpdateStaffAssignComponent;
  let fixture: ComponentFixture<UpdateStaffAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStaffAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStaffAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
