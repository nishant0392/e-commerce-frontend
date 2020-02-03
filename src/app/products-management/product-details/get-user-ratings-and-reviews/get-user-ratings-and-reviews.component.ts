import { Component } from '@angular/core';

@Component({
  selector: 'app-get-user-ratings-and-reviews',
  templateUrl: './get-user-ratings-and-reviews.component.html',
  styleUrls: ['./get-user-ratings-and-reviews.component.css']
})
export class GetUserRatingsAndReviewsComponent {

  public userRating: number;         // star rating out of 5
  public reviewTitle: string;        // Title of review (optional)
  public reviewDescription: string;
  public reviewerName: string = "Flipkart Customer";  // Name of the Reviewer

  public errorMsg_description: string = "Description cannot be empty";
  public error_description: boolean = false;
  public activeColor_description: string = '';

  public errorMsg_title: string = "Max 60 characters";
  public maxlength_title: number = 60;
  public error_title: boolean = false;
  public activeColor_title: string = '';

  public errorMsg_name: string = "Name cannot be empty";
  public maxlength_name: number = 30;
  public error_name: boolean = false;
  public activeColor_name: string = '';


  /**
   * Saves User rating on database.
   * @param rating rating out of 5
   */
  public saveRating(rating: number) {
    this.userRating = rating;
    console.log('rating:', this.userRating)
  }


  public showMessage(category: string) {

    switch (category) {
      case 'description': {
        this.error_description = this.reviewDescription ? false : true;
        this.activeColor_description = this.reviewDescription ? "" : "red";
      }

      case 'review-title': {
        if (this.reviewTitle) 
          this.error_title = this.reviewTitle.length === this.maxlength_title ? true : false;
      }

      case 'name': {
        this.error_name = this.reviewerName ? false : true;
        this.activeColor_name = this.reviewerName ? "" : "red";
      }
    }
  }


  public saveProductReviews() {
    
  }

}
