import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumBannersComponent } from './medium-banners.component';

describe('MediumBannersComponent', () => {
  let component: MediumBannersComponent;
  let fixture: ComponentFixture<MediumBannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumBannersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
