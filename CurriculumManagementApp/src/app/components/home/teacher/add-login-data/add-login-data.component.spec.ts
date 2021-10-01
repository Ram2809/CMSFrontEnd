import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoginDataComponent } from './add-login-data.component';

describe('AddLoginDataComponent', () => {
  let component: AddLoginDataComponent;
  let fixture: ComponentFixture<AddLoginDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLoginDataComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoginDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
