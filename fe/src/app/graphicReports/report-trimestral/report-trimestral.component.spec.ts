import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTrimestralComponent } from './report-trimestral.component';

describe('ReportTrimestralComponent', () => {
  let component: ReportTrimestralComponent;
  let fixture: ComponentFixture<ReportTrimestralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTrimestralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTrimestralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
