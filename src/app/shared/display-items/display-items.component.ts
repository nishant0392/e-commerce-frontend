import { Component, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent implements AfterContentInit {

  @Input() Items: any[];
  @Input() itemImageDefaultHeight: number | String;
  @Input() counterForSliders: String;
  @Input('ItemsPerSlide') countOfItemsPerSlide: number = 6;

  public counterForItemsPerSlide: Array<number>;
  public counterForSlides: Array<number>;
  public counterForItemsInLastSlide: Array<number>;


  ngAfterContentInit() {
    
    this.displayItemsUsingCarousel(this.countOfItemsPerSlide);
  }


  /**
   *  Display items using a Carousel
   *  @params {number}
   *  countOfItemsPerSlide - No. of items to display in each slide
   */
  displayItemsUsingCarousel(countOfItemsPerSlide: number) {

    let len = this.Items.length;

    // create an array [0,1,2,...,countOfItemsPerSlide-1] for Items per slide
    this.counterForItemsPerSlide = <Array<number>>Array(countOfItemsPerSlide).fill(0).map((val, idx) => idx);

    let countOfSlides = Math.ceil(len / countOfItemsPerSlide);
    console.log(countOfSlides)

    // create an array [0,1,2,...,countOfSlides-2] for no. of slides (excluding last slide)
    this.counterForSlides = <Array<number>>Array(countOfSlides-1).fill(0).map((val, idx) => idx);
    console.log('counterFor Slides', this.counterForSlides)

    // create an array [len-countOfItemsPerSlide,...,len-2,len-1] for the last slide
    this.counterForItemsInLastSlide = [];
    for (let i = len - countOfItemsPerSlide; i < len; i++) {
      this.counterForItemsInLastSlide.push(i)
    }

  }

}