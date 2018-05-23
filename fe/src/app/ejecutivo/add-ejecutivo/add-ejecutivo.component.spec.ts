import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEjecutivoComponent } from './add-ejecutivo.component';

describe('AddEjecutivoComponent', () => {
  let component: AddEjecutivoComponent;
  let fixture: ComponentFixture<AddEjecutivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEjecutivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEjecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
