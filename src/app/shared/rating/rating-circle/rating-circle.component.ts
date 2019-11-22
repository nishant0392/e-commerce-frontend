import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rating-circle',
  templateUrl: './rating-circle.component.html',
  styleUrls: ['./rating-circle.component.css']
})
export class RatingCircleComponent implements OnInit {

  @Input() public Options: RatingCircle;

  constructor() { }

  ngOnInit() { }

  public addClass() {

    let allClasses = [];
    let maxRating = this.Options.maxRating || 5;
    let rating = this.Options.rating || 0;
    let color = this.Options.color || 'darkgreen';
    let size = this.Options.size || 'small';

    let ratingPercent = Math.round((100 / maxRating) * rating);
    
    allClasses.push(`p${ratingPercent}`);
    allClasses.push(color);
    allClasses.push(size);

    return allClasses;
  }

}


export interface RatingCircle {

  rating: number;
  maxRating?: number; // default ==> 5
  color?: string;  // color ('green', 'orange', 'darkgreen');  default ==> 'blue'
  size?: string;   // size ('small', 'big');  default ==> 'medium'

}