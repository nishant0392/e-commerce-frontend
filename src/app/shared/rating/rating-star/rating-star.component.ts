import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.css']
})
export class RatingStarComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  // 5 Stars
  public stars: string[] = [];
  public ratingCategories: string[] = ['Very Bad', 'Bad', 'Good', 'Very Good', 'Excellent'];
  public ratingColors: string[] = ['#ff6161', '#ff9f00', '#388e3c', '#388e3c', '#388e3c'];
  public ratingInfo: string;
  public ratingInfoColor: string;
  public isRatingSaved: boolean = false;
  public rating: number = 0;
  @Output('rating') public data_rating: EventEmitter<number> = new EventEmitter<number>();


  public addCheckedClass(index: number) {

    for (let i = 0; i <= index; i++) {
      this.stars[i] = "checked";
    }

    if (!this.isRatingSaved) {
      for (let i = index + 1; i < 5; i++) {
        this.stars[i] = "";
      }
    }

  }


  public removeCheckedClass() {

    for (let i = this.rating; i < 5; i++) {
      this.stars[i] = "";
    }

  }


  public emitRating(index: number) {

    this.isRatingSaved = false;

    this.addCheckedClass(index);
    this.ratingInfo = this.ratingCategories[index];
    this.ratingInfoColor = this.ratingColors[index];

    this.rating = index + 1;

    // emit rating to parent
    this.data_rating.emit(this.rating);

    this.isRatingSaved = true;
  }
}
