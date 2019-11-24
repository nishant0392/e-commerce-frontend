import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'star-rating-view',
  templateUrl: './star-rating-view.component.html',
  styleUrls: ['./star-rating-view.component.css']
})
export class StarRatingViewComponent implements OnInit {

  @Input('rating') public rating: number | string;  // rating out of 5
  @Input('category') public category: string = 'PRODUCT';  // category: 'PRODUCT' or 'SELLER'


  ngOnInit() {
    if (!this.rating) this.rating = 'NA';
  }

  public addStyles() {

    let styles = {};
    let category = this.category.toUpperCase();

    if (category === 'SELLER')
      styles['border-radius'] = '10px';


    if (this.rating >= 3 && this.rating <= 5) {

      if (category === 'SELLER')
        styles['background-color'] = '#2874f0';
      else
        styles['background-color'] = 'green';

    }

    else if (this.rating >= 2 && this.rating < 3)
      styles['background-color'] = 'orange';


    else if (this.rating >= 1 && this.rating < 2)
      styles['background-color'] = 'red';

    else {
      console.log('Invalid Rating')
    }

    return styles;

  } // END addStyles()

}
