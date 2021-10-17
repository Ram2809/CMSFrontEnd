import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQualificationsComponent } from './view-qualifications.component';

describe('ViewQualificationsComponent', () => {
  let component: ViewQualificationsComponent;
  let fixture: ComponentFixture<ViewQualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQualificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
