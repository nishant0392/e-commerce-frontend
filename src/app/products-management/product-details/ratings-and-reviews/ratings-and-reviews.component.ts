import { Component, OnInit, Input } from '@angular/core';
import { RatingCircle } from 'src/app/shared/rating/rating-circle/rating-circle.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ratings-and-reviews',
  templateUrl: './ratings-and-reviews.component.html',
  styleUrls: ['./ratings-and-reviews.component.css']
})
export class RatingsAndReviewsComponent implements OnInit {

  public ratingOptions: RatingCircle;
  @Input('ratingData') public ratingData;

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.ratingOptions = {
      rating: 2.5
    };

  }

  public getProductReviews() {

    let params = this.route.snapshot.params;

    console.log('params:', params)

    this.router.navigate([`/${params.product_name}/write-review/${params.pid}`]);
  }

}
