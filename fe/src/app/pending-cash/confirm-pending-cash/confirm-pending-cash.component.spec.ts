import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPendingCashComponent } from './confirm-pending-cash.component';

describe('ConfirmPendingCashComponent', () => {
  let component: ConfirmPendingCashComponent;
  let fixture: ComponentFixture<ConfirmPendingCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPendingCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPendingCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
