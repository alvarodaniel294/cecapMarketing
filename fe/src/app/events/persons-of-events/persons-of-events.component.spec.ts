import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsOfEventsComponent } from './persons-of-events.component';

describe('PersonsOfEventsComponent', () => {
  let component: PersonsOfEventsComponent;
  let fixture: ComponentFixture<PersonsOfEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsOfEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsOfEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
