import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonComponent } from './profile-person.component';

describe('ProfilePersonComponent', () => {
  let component: ProfilePersonComponent;
  let fixture: ComponentFixture<ProfilePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
