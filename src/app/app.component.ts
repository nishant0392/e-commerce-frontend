import { Component, OnInit } from '@angular/core';
import { Banner } from './interfaces/banner.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public _banners: Banner[];
  public _bannerDefaultHeight: Number | String; 

  constructor() {

    this._banners = [
      {
        width: '100%',
        height: 280,
        imgName: '1fff0a8018613e9e.jpg'
      },
      {
        width: '100%',
        height: 280,
        imgName: '9b0a6e357f494932.jpg'
      },
      {
        width: '100%',
        height: 280,
        imgName: '4e06bd4a914daef4.jpg'
      },
      {
        width: '100%',
        height: 280,
        imgName: '671176e87837d74a.jpg'
      },
    ];
    
  }

  ngOnInit() {
    this._bannerDefaultHeight = 280;
  }

}
