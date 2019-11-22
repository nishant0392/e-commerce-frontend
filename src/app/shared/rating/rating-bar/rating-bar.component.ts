import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.css']
})
export class RatingBarComponent implements OnInit {

  public ratingsCount: number[] = [];  // count for each rating (5 star, 4 star,...) 
  public maxRatingCount: number = 0;  // maximum count out of 5 different ratings

  constructor() { }

  ngOnInit() {
    this.ratingsCount = [
      201286, 76396, 19263, 5735, 12732
    ];

    this.calcMaxRatingCount();
  }

  public calcMaxRatingCount() {

    for (let i = 0; i < this.ratingsCount.length; i++) {
      if (this.ratingsCount[i] > this.maxRatingCount)
        this.maxRatingCount = this.ratingsCount[i];
    }

  }

  public addWidth(index) {

    if (this.maxRatingCount) {

      let ratingCount = this.ratingsCount[index];
      let percent = Math.round((ratingCount / this.maxRatingCount) * 100);

      return {
        'width': percent + '%'
      }
    }

  }

}
