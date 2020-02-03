import { Component, OnInit } from '@angular/core';
import { Banner } from '../../shared/interfaces/banner.interface';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public _banners: Banner[];
  public _bannerDefaultHeight: Number | String; 

  public Items: Banner[];
  public itemImageDefaultHeight: Number | String;

  // Parameters for responsiveness
  public windowWidth: number;
  public itemsCount1: number = 7;
  public itemsCount2: number = 6;

  constructor(private utilService: UtilityService) {

    // Banners
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

    // Items display
    this.Items = [
      {
        width: 108,
        height: 166,
        imgName: 'realme-3-pro-rmx1851-original-imaffnummgzjf4jv.jpeg'
      },
      {
        width: 188,
        height: 166,
        imgName: 'vivo-z1-pro-1951-pd1911f-ex-original-imafhmyayxdjghhm.jpeg'
      },
      {
        width: 188,
        height: 280,
        imgName: 'realme-2-pro-rmx1801-original-imaf9e3vmfr9jewh.jpeg'
      },
      {
        width: 188,
        height: 280,
        imgName: 'oppo-a5s-cph1909-original-imafhhsyrg7mhdaq.jpeg'
      },
      {
        width: 188,
        height: 280,
        imgName: 'realme-3-na-original-imafgqq4mguqpnad.jpeg'
      },
      {
        width: 188,
        height: 280,
        imgName: 'vivo-y17-1902-original-imaffujbv69qfhhy.jpeg'
      }, 
      {
        width: 188,
        height: 280,
        imgName: 'vivo-v15-pro-vivo-1818-original-imafegnhhqgvhhxv.jpeg'
      },
      {
        width: 188,
        height: 280,
        imgName: 'realme-c2-rmx1941-original-imaffnumygt8wgfx.jpeg'
      },
      {
        width: 188,
        height: 280,
        imgName: 'asus-6z-zs630kl-2a014ww-original-imafhkqythzfmjp8.jpeg'
      },
      {
        width: 188,
        height: 280,
        imgName: 'samsung-galaxy-note-8-sm-n950f-original-imafy3r926hhgzy8.jpeg'
      },
      {
        width: 188,
        height: 280,
        imgName: 'motorola-motorola-one-vision-na-original-imafhmzvrhbrzs5c.jpeg'
      },
      {
        width: 188,
        height: 280,
        imgName: 'realme-3i-rmx1827-original-imafgbbj49es6vff.jpeg'
      } 
    ];

    // For Responsiveness (child component needs to be re-rendered)
    window.addEventListener('resize', this.utilService.debounce(() => {
      this.adjustCount();
    }, 1000));

  } // END constructor

  
  ngOnInit() {
    this._bannerDefaultHeight = 280;
    this.itemImageDefaultHeight = 166;

    this.adjustCount();
  }


  adjustCount() {
  
    // --- Media Queries effect ---
    this.windowWidth = window.innerWidth;
   
    // Desktop View
    if (this.windowWidth > 1150) {
      this.itemsCount1 = 7;
      this.itemsCount2 = 6;
    }

    else if (this.windowWidth > 1075 && this.windowWidth <= 1150) {
      this.itemsCount1 = 6;
      this.itemsCount2 = 6;
    }

    else if (this.windowWidth > 880 && this.windowWidth <= 1075) {
      this.itemsCount1 = 5;
      this.itemsCount2 = 5;
    }
     
    // Tablet View
    else if (this.windowWidth > 700 && this.windowWidth <= 880) {
      this.itemsCount1 = 4;
      this.itemsCount2 = 4;
    }

    else if (this.windowWidth > 560 && this.windowWidth <= 700) {
      this.itemsCount1 = 3;
      this.itemsCount2 = 3;
    }

    // Mobile View
    else {
      this.itemsCount1 = 2;
      this.itemsCount2 = 2;
    };

  } // END adjustCount()

} // END 
