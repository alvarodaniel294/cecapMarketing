import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEventsComponent } from './reporte-events.component';

describe('ReporteEventsComponent', () => {
  let component: ReporteEventsComponent;
  let fixture: ComponentFixture<ReporteEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
