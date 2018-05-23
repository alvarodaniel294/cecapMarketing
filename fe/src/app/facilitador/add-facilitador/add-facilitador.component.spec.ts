import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacilitadorComponent } from './add-facilitador.component';

describe('AddFacilitadorComponent', () => {
  let component: AddFacilitadorComponent;
  let fixture: ComponentFixture<AddFacilitadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFacilitadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFacilitadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
