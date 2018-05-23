import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarteraComponent } from './edit-cartera.component';

describe('EditCarteraComponent', () => {
  let component: EditCarteraComponent;
  let fixture: ComponentFixture<EditCarteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
