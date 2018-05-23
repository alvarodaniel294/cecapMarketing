import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarEventComponent } from './bar-event.component';

describe('BarEventComponent', () => {
  let component: BarEventComponent;
  let fixture: ComponentFixture<BarEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
