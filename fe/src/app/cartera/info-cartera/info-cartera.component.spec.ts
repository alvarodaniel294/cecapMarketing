import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCarteraComponent } from './info-cartera.component';

describe('InfoCarteraComponent', () => {
  let component: InfoCarteraComponent;
  let fixture: ComponentFixture<InfoCarteraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCarteraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
