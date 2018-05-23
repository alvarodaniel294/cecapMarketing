import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPendingCashComponent } from './info-pending-cash.component';

describe('InfoPendingCashComponent', () => {
  let component: InfoPendingCashComponent;
  let fixture: ComponentFixture<InfoPendingCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPendingCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPendingCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
