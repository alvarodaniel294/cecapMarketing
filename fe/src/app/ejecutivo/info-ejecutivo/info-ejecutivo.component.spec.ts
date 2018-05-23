import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEjecutivoComponent } from './info-ejecutivo.component';

describe('InfoEjecutivoComponent', () => {
  let component: InfoEjecutivoComponent;
  let fixture: ComponentFixture<InfoEjecutivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEjecutivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEjecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
