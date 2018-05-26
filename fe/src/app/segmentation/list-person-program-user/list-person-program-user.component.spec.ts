import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonProgramUserComponent } from './list-person-program-user.component';

describe('ListPersonProgramUserComponent', () => {
  let component: ListPersonProgramUserComponent;
  let fixture: ComponentFixture<ListPersonProgramUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPersonProgramUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonProgramUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
