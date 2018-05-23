import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramaComponent } from './edit-programa.component';

describe('EditProgramaComponent', () => {
  let component: EditProgramaComponent;
  let fixture: ComponentFixture<EditProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
