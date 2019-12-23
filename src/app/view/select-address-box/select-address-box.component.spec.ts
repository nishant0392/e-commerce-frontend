import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAddressBoxComponent } from './select-address-box.component';

describe('SelectAddressBoxComponent', () => {
  let component: SelectAddressBoxComponent;
  let fixture: ComponentFixture<SelectAddressBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAddressBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAddressBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
