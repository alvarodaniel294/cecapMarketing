import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorrelativeComponent } from './add-correlative.component';

describe('AddCorrelativeComponent', () => {
  let component: AddCorrelativeComponent;
  let fixture: ComponentFixture<AddCorrelativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCorrelativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCorrelativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
