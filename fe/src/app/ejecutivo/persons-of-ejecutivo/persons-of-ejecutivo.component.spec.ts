import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsOfEjecutivoComponent } from './persons-of-ejecutivo.component';

describe('PersonsOfEjecutivoComponent', () => {
  let component: PersonsOfEjecutivoComponent;
  let fixture: ComponentFixture<PersonsOfEjecutivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsOfEjecutivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsOfEjecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
