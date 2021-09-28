import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstaffsComponent } from './viewstaffs.component';

describe('ViewstaffsComponent', () => {
  let component: ViewstaffsComponent;
  let fixture: ComponentFixture<ViewstaffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewstaffsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
