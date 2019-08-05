import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCatalogComponent } from './phone-catalog.component';

describe('PhoneCatalogComponent', () => {
  let component: PhoneCatalogComponent;
  let fixture: ComponentFixture<PhoneCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
