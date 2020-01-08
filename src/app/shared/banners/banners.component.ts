import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '../interfaces/banner.interface';


@Component({
  selector: 'banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  @Input() banners: Banner[];
  @Input() bannerDefaultHeight: Number | String; 
  @Input() counterForSliders: String;

  public idForSlider: String;
  
  constructor() {
   }

  ngOnInit() {
    this.idForSlider = "bigBanner" + this.counterForSliders;
  }

}
