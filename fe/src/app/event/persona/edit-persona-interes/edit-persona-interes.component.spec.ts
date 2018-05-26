import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonaInteresComponent } from './edit-persona-interes.component';

describe('EditPersonaInteresComponent', () => {
  let component: EditPersonaInteresComponent;
  let fixture: ComponentFixture<EditPersonaInteresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonaInteresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonaInteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
