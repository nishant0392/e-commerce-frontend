import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserRatingsAndReviewsComponent } from './get-user-ratings-and-reviews.component';

describe('GetUserRatingsAndReviewsComponent', () => {
  let component: GetUserRatingsAndReviewsComponent;
  let fixture: ComponentFixture<GetUserRatingsAndReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUserRatingsAndReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUserRatingsAndReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
