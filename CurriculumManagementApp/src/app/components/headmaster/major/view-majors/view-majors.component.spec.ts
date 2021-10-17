import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMajorsComponent } from './view-majors.component';

describe('ViewMajorsComponent', () => {
  let component: ViewMajorsComponent;
  let fixture: ComponentFixture<ViewMajorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMajorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMajorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
