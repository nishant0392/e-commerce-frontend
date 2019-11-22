import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletsViewComponent } from './bullets-view.component';

describe('BulletsViewComponent', () => {
  let component: BulletsViewComponent;
  let fixture: ComponentFixture<BulletsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
