import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesCashComponent } from './offices-cash.component';

describe('OfficesCashComponent', () => {
  let component: OfficesCashComponent;
  let fixture: ComponentFixture<OfficesCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficesCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficesCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
