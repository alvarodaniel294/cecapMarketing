import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAsistanceComponent } from './control-asistance.component';

describe('ControlAsistanceComponent', () => {
  let component: ControlAsistanceComponent;
  let fixture: ComponentFixture<ControlAsistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAsistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAsistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
