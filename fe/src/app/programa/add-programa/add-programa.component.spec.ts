import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramaComponent } from './add-programa.component';

describe('AddProgramaComponent', () => {
  let component: AddProgramaComponent;
  let fixture: ComponentFixture<AddProgramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
