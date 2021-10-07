import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnitStatusComponent } from './view-unit-status.component';

describe('ViewTopicStatusComponent', () => {
  let component: ViewUnitStatusComponent;
  let fixture: ComponentFixture<ViewUnitStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUnitStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUnitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
