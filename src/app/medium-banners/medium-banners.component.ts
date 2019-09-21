import { Component, OnInit } from '@angular/core';
import { BannersComponent } from '../banners/banners.component';

@Component({
  selector: 'medium-banners',
  templateUrl: './medium-banners.component.html',
  styleUrls: ['./medium-banners.component.css']
})
export class MediumBannersComponent implements OnInit {

  public md_banners;

  constructor() {
     this.md_banners = [
      "5cdce462cd174148.jpg",
      "31efaad41a3e4208.jpg",
      "58484ec1bf294702.jpg"
     ];
   }

  ngOnInit() {
  }

}
