import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarteraComponent } from './add-cartera.component';

describe('AddCarteraComponent', () => {
  let component: AddCarteraComponent;
  let fixture: ComponentFixture<AddCarteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
