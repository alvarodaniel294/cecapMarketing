import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroUniversidadMedioComponent } from './filtro-universidad-medio.component';

describe('FiltroUniversidadMedioComponent', () => {
  let component: FiltroUniversidadMedioComponent;
  let fixture: ComponentFixture<FiltroUniversidadMedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroUniversidadMedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroUniversidadMedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
