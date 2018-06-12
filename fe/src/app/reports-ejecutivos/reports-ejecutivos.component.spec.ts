import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsEjecutivosComponent } from './reports-ejecutivos.component';

describe('ReportsEjecutivosComponent', () => {
  let component: ReportsEjecutivosComponent;
  let fixture: ComponentFixture<ReportsEjecutivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsEjecutivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsEjecutivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
