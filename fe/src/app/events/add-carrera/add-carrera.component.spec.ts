import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarreraComponent } from './add-carrera.component';

describe('AddCarreraComponent', () => {
  let component: AddCarreraComponent;
  let fixture: ComponentFixture<AddCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
