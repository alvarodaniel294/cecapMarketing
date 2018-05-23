import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCashComponent } from './pending-cash.component';

describe('PendingCashComponent', () => {
  let component: PendingCashComponent;
  let fixture: ComponentFixture<PendingCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
