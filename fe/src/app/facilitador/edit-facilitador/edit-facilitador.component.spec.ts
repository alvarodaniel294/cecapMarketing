import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacilitadorComponent } from './edit-facilitador.component';

describe('EditFacilitadorComponent', () => {
  let component: EditFacilitadorComponent;
  let fixture: ComponentFixture<EditFacilitadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFacilitadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFacilitadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
