import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCloseCashComponent } from './confirm-close-cash.component';

describe('ConfirmCloseCashComponent', () => {
  let component: ConfirmCloseCashComponent;
  let fixture: ComponentFixture<ConfirmCloseCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCloseCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCloseCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
