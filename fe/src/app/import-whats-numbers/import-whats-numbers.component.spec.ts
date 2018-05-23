import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportWhatsNumbersComponent } from './import-whats-numbers.component';

describe('ImportWhatsNumbersComponent', () => {
  let component: ImportWhatsNumbersComponent;
  let fixture: ComponentFixture<ImportWhatsNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportWhatsNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportWhatsNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
