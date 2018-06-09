import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividirCarteraComponent } from './dividir-cartera.component';

describe('DividirCarteraComponent', () => {
  let component: DividirCarteraComponent;
  let fixture: ComponentFixture<DividirCarteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividirCarteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividirCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
