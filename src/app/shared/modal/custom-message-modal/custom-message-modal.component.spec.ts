import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMessageModalComponent } from './custom-message-modal.component';

describe('CustomMessageModalComponent', () => {
  let component: CustomMessageModalComponent;
  let fixture: ComponentFixture<CustomMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
