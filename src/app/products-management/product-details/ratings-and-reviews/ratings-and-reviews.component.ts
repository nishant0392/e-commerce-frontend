import { Component, OnInit } from '@angular/core';
import { RatingCircle } from 'src/app/shared/rating/rating-circle/rating-circle.component';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ratings-and-reviews',
  templateUrl: './ratings-and-reviews.component.html',
  styleUrls: ['./ratings-and-reviews.component.css']
})
export class RatingsAndReviewsComponent implements OnInit {

  public ratingOptions: RatingCircle;
  public ratingData;

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.ratingOptions = {
      rating: 2.5
    };

    this.ratingData = {
      avgRating: 4.4,
      ratingsCount: 311663,
      reviewsCount: 25766,
      paramWiseRating: [
        {
          param: 'Camera',
          rating: 4.2
        },
        {
          param: 'Battery',
          rating: 3.3
        },
        {
          param: 'Display',
          rating: 3.9
        },
        {
          param: 'Value for Money',
          rating: 4.9
        }
      ]
    }
  }

  public getProductReviews() {

    let params = this.route.snapshot.params;

    console.log('params:', params)

    this.router.navigate([`/${params.product_name}/write-review/${params.pid}`]);
  }

}
