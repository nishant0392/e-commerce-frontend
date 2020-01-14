import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileviewSidebarComponent } from './mobileview-sidebar.component';

describe('MobileviewSidebarComponent', () => {
  let component: MobileviewSidebarComponent;
  let fixture: ComponentFixture<MobileviewSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileviewSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileviewSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
