import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public img_list: any[];
  public selectedImage: any;

  public carouselOptions: any;
  public carouselItems: any[];

  constructor() { }

  ngOnInit() {

    this.carouselOptions = {
      subitems_count: 6,
      widthOfCarousel: "75px",
      heightOfCarousel: "66vh",
      heightOfSubitemDiv: "11vh",
      widthOfSubitem: "auto",
      heightOfSubitem: "auto",
      cycle: false,
      relativePath: "/assets/images/"
    };

    this.carouselItems = [

      {
        img: "mi-redmi-note-7s-mzb7745in-original-imafe48ru3s66sjd-thumbnail.jpeg",
        fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafe48ru3s66sjd.jpeg'
      },
      {
        img: 'mi-redmi-note-7s-mzb7742in-original-imafgzbd8rvyf7ms-thumbnail.jpeg',
        fullImg: 'mi-redmi-note-7s-mzb7742in-original-imafgzbd8rvyf7ms.jpeg'
      },
      {
        img: 'mi-redmi-note-7s-mzb7745in-original-imafghukgt6fapxv-thumbnail.jpeg',
        fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghukgt6fapxv.jpeg'
      },
      {
        img: 'mi-redmi-note-7s-mzb7745in-original-imafghukh85tt6yh-thumbnail.jpeg',
        fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghukh85tt6yh.jpeg'
      },
      {
        img: 'mi-redmi-note-7s-mzb7745in-original-imafghuku3rz7uvu-thumbnail.jpeg',
        fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghuku3rz7uvu.jpeg'
      },
      {
        img: 'mi-redmi-note-7s-mzb7745in-original-imafghukryzhfzun-thumbnail.jpeg',
        fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghukryzhfzun.jpeg'
      },
      {
        img: 'mi-redmi-note-7s-mzb7745in-original-imafghukhedmm7pu-thumbnail.jpeg',
        fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghukhedmm7pu.jpeg'
      },
      {
        img: 'mi-redmi-note-7s-mzb7745in-original-imafghuh2zxfzpwg-thumbnail.jpeg',
        fullImg: 'mi-redmi-note-7s-mzb7745in-original-imafghuh2zxfzpwg.jpeg'
      }

    ];

    // set the default image
    this.selectedImage = "/assets/images/" + this.carouselItems[0].fullImg;
  }


  /**
   * Function to accept data from Carousel Component.
   * @param {any} data Data from Carousel Component (child component)
   */
  public onHoverOverSubitem(data) {
    console.log('data from Carousel Component:', data)

    data = data.replace("-thumbnail.", ".");

     // show full image for the selected view in the placeholder
    this.selectedImage = data;
  }
}
