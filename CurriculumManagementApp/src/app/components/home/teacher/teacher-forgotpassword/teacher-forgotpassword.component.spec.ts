import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherForgotpasswordComponent } from './teacher-forgotpassword.component';

describe('TeacherForgotpasswordComponent', () => {
  let component: TeacherForgotpasswordComponent;
  let fixture: ComponentFixture<TeacherForgotpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherForgotpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
