import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUnitStatusComponent } from './update-unit-status.component';

describe('UpdateUnitStatusComponent', () => {
  let component: UpdateUnitStatusComponent;
  let fixture: ComponentFixture<UpdateUnitStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUnitStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUnitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
