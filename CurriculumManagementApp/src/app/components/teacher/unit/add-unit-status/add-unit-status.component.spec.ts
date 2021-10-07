import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitStatusComponent } from './add-unit-status.component';

describe('UpdateTopicStatusComponent', () => {
  let component: AddUnitStatusComponent;
  let fixture: ComponentFixture<AddUnitStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnitStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUnitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
