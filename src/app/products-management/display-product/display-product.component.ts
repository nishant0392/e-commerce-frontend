import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {

  // Product configuration
  public category: string;
  public sub_categories: string[];

  // Product Items
  public Items: any[];
  public countOfItems: number;

  // Miscellaneous
  public chev_left_arrow = "fas fa-chevron-left icon-chevron-left";
  public chev_down_arrow = "fas fa-chevron-down icon-chevron-down";
  public chev_up_arrow = "fas fa-chevron-up icon-chevron-up";
  public chev_arrow: string;
  public chev_arrow_show: string;
  public isCollapsed: boolean = true;
  public show: boolean[];

  // Range Slider configuration
  public minValue: number = 50;
  public maxValue: number = 750;
  public options: Options = {
    floor: 0,
    ceil: 1000
  };

  // Pagination 
  public selectedPage: number = 1;
  public countOfPages: number;
  public counterForPages: number[];
  public countOfItemsPerPage: number;
  public counterForItems: number[];
  public counterForItemsPerPage: number[];

  constructor() {

    // Set count for no. of items to display per page
    this.countOfItemsPerPage = 5;

    this.category = 'Mobiles & Accessories';
    this.sub_categories = [
      'Mobiles',
      'Tablets',
      'Mobile Accessories'
    ];
    this.Items = [
      {
        title: 'RedMi Note 7S (Sapphire Blue, 64 GB)',
        image: 'mi-redmi-note-7s-mzb7745in-original-imafe48ru3s66sjd.jpeg',
        rating: {
          stars: 4.4,
          ratingsCount: 92530,
          reviewsCount: 7519
        },
        features: [
          '4 GB RAM | 64 GB ROM | Expandable upto 256 GB',
          '16.0 cm (6.3 inch) FHD+ Display',
          '48 MP + 5 MP | 13 MP Front Camera',
          '4000 mAh Battery',
          'Qualcomm Snapdragon 660 AIE Processor',
          'Splash Proof - Protected by P2i',
          'Quick Charge 4.0 Support',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 11999,
        MRP: 13999,
        discount: 14,
        exchangePrice: 11500,
        noCostEMI: true
      },

      {
        title: 'Redmi Note 7 Pro (Neptune Blue, 64 GB)',
        image: 'mi-redmi-note-7-pro-na-original-imafe4bbyfppbnuu.jpeg',
        rating: {
          stars: 4.5,
          ratingsCount: 419749,
          reviewsCount: 39129
        },
        features: [
          '4 GB RAM | 64 GB ROM | Expandable upto 256 GB',
          '16.0 cm (6.3 inch) FHD+ Display',
          '48 MP + 5 MP | 13 MP Front Camera',
          '4000 mAh Li-polymer Battery',
          'Qualcomm Snapdragon 675 Processor',
          'Splash Proof - Protected by P2i',
          'Quick Charge 4.0 Support',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 13999,
        MRP: 15999,
        discount: 12,
        exchangePrice: 12000,
        noCostEMI: true
      },

      {
        title: 'Redmi Note 7 Pro (Nebula Red, 64 GB)',
        image: 'mi-redmi-note-7-pro-na-original-imafe4bbyfppbnuu.jpeg',
        rating: {
          stars: 4.5,
          ratingsCount: 470833,
          reviewsCount: 43047
        },
        features: [
          '4 GB RAM | 64 GB ROM | Expandable upto 256 GB',
          '16.0 cm (6.3 inch) FHD+ Display',
          '48 MP + 5 MP | 13 MP Front Camera',
          '4000 mAh Li-polymer Battery',
          'Qualcomm Snapdragon 675 Processor',
          'Splash Proof - Protected by P2i',
          'Quick Charge 4.0 Support',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 11999,
        MRP: 15999,
        discount: 25,
        exchangePrice: 11200,
        noCostEMI: true
      },

      {
        title: 'Redmi 7A (Matte Blue, 32 GB)',
        image: 'mi-redmi-7a-mzb8008in-original-imafg27hramfktfs.jpeg',
        rating: {
          stars: 4.4,
          ratingsCount: 109556,
          reviewsCount: 7912
        },
        features: [
          '2 GB RAM | 32 GB ROM | Expandable Upto 256 GB',
          '13.84 cm (5.45 inch) HD+ Display',
          '12MP Rear Camera | 5MP Front Camera',
          '4000 mAh Li-Polymer Battery',
          'Qualcomm Snapdragon 439 Processor',
          'Brand Warranty of 2 Years Available for Mobile and 6 Months for Accessories'
        ],
        price: 6199,
        MRP: 6999,
        discount: 11,
        exchangePrice: 6100,
        noCostEMI: true
      },

      {
        title: 'Redmi Note 5 (Gold, 64 GB)',
        image: 'mi-redmi-note-7-pro-na-original-imafe4bbyfppbnuu.jpeg',
        rating: {
          stars: 4.4,
          ratingsCount: 334532,
          reviewsCount: 39261
        },
        features: [
          '4 GB RAM | 64 GB ROM | Expandable Upto 128 GB',
          '15.21 cm (5.99 inch) Full HD+ Display',
          '12MP Rear Camera | 5MP Front Camera',
          '4000 mAh Li-polymer Battery',
          'Qualcomm Snapdragon 625 Processor',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 7999,
        MRP: 12999,
        discount: 38,
        exchangePrice: null,
        noCostEMI: false
      },

      // 2nd Page
      {
        title: 'Redmi K20 Pro (Carbon Black, 128 GB)',
        image: 'redmi-k20-pro-na-original-imafgb4ys5unqagx.jpeg',
        rating: {
          stars: 4.6,
          ratingsCount: 25815,
          reviewsCount: 3457
        },
        features: [
          '6 GB RAM | 128 GB ROM | Expandable upto 256 GB',
          '16.23 cm (6.39 inch) FHD+ Display',
          '48MP + 13MP + 8MP | 20MP Front Camera',
          '4000 mAh Li-polymer Battery',
          'Qualcomm Snapdragon 855 Processor',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 24999,
        MRP: 28999,
        discount: 13,
        exchangePrice: 11900,
        noCostEMI: true
      },

      {
        title: 'Redmi K20 (Flame Red, 64 GB)',
        image: 'redmi-k20-na-original-imafgb4y5rfbvg8t.jpeg',
        rating: {
          stars: 4.5,
          ratingsCount: 25073,
          reviewsCount: 2914
        },
        features: [
          '4 GB RAM | 64 GB ROM | Expandable upto 256 GB',
          '16.23 cm (6.39 inch) FHD+ Display',
          '48 MP + 13 MP + 8 MP | 20 MP Front Camera',
          '4000 mAh Li-polymer Battery',
          'Qualcomm Snapdragon 730 Processor',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 19999,
        MRP: 22999,
        discount: 13,
        exchangePrice: 11900,
        noCostEMI: true
      },

      {
        title: 'Redmi K20 (Glacier Blue, 64 GB)',
        image: 'redmi-k20-na-original-imafgb4xpxutp86a.jpeg',
        rating: {
          stars: 4.5,
          ratingsCount: 25073,
          reviewsCount: 2914
        },
        features: [
          '4 GB RAM | 64 GB ROM | Expandable upto 256 GB',
          '16.23 cm (6.39 inch) FHD+ Display',
          '48 MP + 13 MP + 8 MP | 20 MP Front Camera',
          '4000 mAh Li-polymer Battery',
          'Qualcomm Snapdragon 730 Processor',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 19999,
        MRP: 22999,
        discount: 13,
        exchangePrice: 11900,
        noCostEMI: true
      },

      {
        title: 'Redmi Go (Black, 8 GB)',
        image: 'mi-redmi-go-mzb7184in-original-imaferc8fhhzqwyf.jpeg',
        rating: {
          stars: 4.3,
          ratingsCount: 126298,
          reviewsCount: 10473
        },
        features: [
          '1 GB RAM | 8 GB ROM | Expandable Upto 128 GB',
          '12.7 cm (5 inch) HD Display',
          '8MP Rear Camera | 5MP Front Camera',
          '3000 mAh Li-Polymer Battery',
          'Qualcomm Snapdragon 425 Processor',
          'Brand Warranty of 2 Years Available for Mobile and 6 Months for Accessories'
        ],
        price: 4499,
        MRP: 5999,
        discount: 25,
        exchangePrice: 4400,
        noCostEMI: true
      },

      {
        title: 'Redmi Note 5 Pro (Red, 64 GB)',
        image: 'mi-redmi-note-5-pro-mzb6634in-original-imaf8znfw6ygssjs.jpeg',
        rating: {
          stars: 4.5,
          ratingsCount: 1127590,
          reviewsCount: 122532
        },
        features: [
          '4 GB RAM | 64 GB ROM | Expandable Upto 128 GB',
          '15.21 cm (5.99 inch) Full HD+ Display',
          '12MP + 5MP | 20MP Front Camera',
          '4000 mAh Li-polymer Battery',
          'Qualcomm Snapdragon 636 Processor',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 9999,
        MRP: 14999,
        discount: 33,
        exchangePrice: 9750,
        noCostEMI: true
      },

      {
        title: 'Redmi Note 5 Pro (Gold, 64 GB)',
        image: 'redmi-note-5-pro-mzb6084in-original-imaf2g8zj6y5vkqn.jpeg',
        rating: {
          stars: 4.5,
          ratingsCount: 1127590,
          reviewsCount: 122532
        },
        features: [
          '4 GB RAM | 64 GB ROM | Expandable Upto 128 GB',
          '15.21 cm (5.99 inch) Full HD+ Display',
          '12MP + 5MP | 20MP Front Camera',
          '4000 mAh Li-polymer Battery',
          'Qualcomm Snapdragon 636 Processor',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 9999,
        MRP: 14999,
        discount: 33,
        exchangePrice: 9750,
        noCostEMI: true
      },

      {
        title: 'Redmi Note 6 Pro (Black, 64 GB)',
        image: 'mi-redmi-e7t-na-original-imafazxdh2bd6hep.jpeg',
        rating: {
          stars: 4.5,
          ratingsCount: 109301,
          reviewsCount: 9845
        },
        features: [
          '6 GB RAM | 64 GB ROM | Expandable Upto 256 GB',
          '15.9 cm (6.26 inch) FHD+ Display',
          '12MP + 5MP | 20MP + 2MP Dual Front Camera',
          '4000 mAh Li-polymer Battery',
          'Qualcomm Snapdragon 636 Processor',
          'Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories'
        ],
        price: 11999,
        MRP: 17999,
        discount: 33,
        exchangePrice: 11900,
        noCostEMI: true
      }
    ];

    this.countOfItems = this.Items.length;
    this.countOfPages = Math.ceil(this.countOfItems / this.countOfItemsPerPage);

    // prepare counterForPages
    // create an array [1,2,...,countOfItemsPerPage] for Items per page
    this.counterForPages = <Array<number>>Array(this.countOfPages).fill(0).map((val, idx) => idx + 1);
    console.log('counterForPages', this.counterForPages)
  }


  ngOnInit() {

    this.chev_arrow = this.chev_left_arrow;
    this.chev_arrow_show = this.chev_down_arrow;

    this.show = [];

    // Set 'show' flags to false (for collapsed version)
    for (let i = 0; i < 10; i++) {
      this.show[i] = false;
    }

    // Set selected 'show' flags to true (for expanded version)
    this.fillSelected([0, 2]);
    console.log(this.show)

    this.displayItems(5);
  }


  // fill show array with true at selected positions
  fillSelected(arr) {
    for (let i = 0; i < arr.length; i++)
      this.show[arr[i]] = true;
  }

  
  toggleCategories() {
    if (this.isCollapsed)
      this.chev_arrow = this.chev_down_arrow;

    else
      this.chev_arrow = this.chev_left_arrow;

    this.isCollapsed = !this.isCollapsed;
  }


  toggleCollapse(indexOfSection) {
    if (this.show[indexOfSection])
      this.chev_arrow_show = this.chev_up_arrow;

    else
      this.chev_arrow_show = this.chev_down_arrow;

    this.show[indexOfSection] = !this.show[indexOfSection];
  }


  /**
     *  Display items using Pagination
     *  @params {number}
     *  countOfItemsPerPage - No. of items to display on each page
     */
  displayItems(countOfItemsPerPage: number) {

    let len = this.Items.length;

    // create an array [0,1,2,...,countOfItemsPerPage-1] for Items per page
    this.counterForItemsPerPage = <Array<number>>Array(countOfItemsPerPage).fill(0).map((val, idx) => idx);

    console.log('No. of Pages:', this.countOfPages)

  }


  /* **** Pagination functions **** */

  goToSelectedPage(pageNum) {
    this.selectedPage = pageNum;
    console.log('selected page no:', pageNum)

    this.fillCounterForPagination();
  }


  goToPrevPage() {
    this.selectedPage--;
    console.log('previous page no:', this.selectedPage)

    this.fillCounterForPagination();
  }


  goToNextPage() {
    this.selectedPage++;
    console.log('next page no:', this.selectedPage)

    this.fillCounterForPagination();
  }


  fillCounterForPagination() {

    /* if it's not the last page
       update the array to [countOfItemsPerPage * (selectedPage-1),...] for Items per page */
    if (this.selectedPage < this.countOfPages) {
      let initialCount = this.countOfItemsPerPage * (this.selectedPage - 1);
      for (let i = 0; i < this.countOfItemsPerPage; i++) {
        this.counterForItemsPerPage[i] = initialCount + i;
      }
    }

    // if it's the last page
    if (this.selectedPage === this.countOfPages) {

      let initialCountLast = this.countOfItemsPerPage * (this.selectedPage - 1);
      let newLen = this.countOfItems - initialCountLast;
      this.counterForItemsPerPage.length = (newLen > 0) ? newLen : 0;

      for (let i = initialCountLast, j = 0; i < this.countOfItems; i++) {
        this.counterForItemsPerPage[j++] = i;
      }

    }

    console.log('counterForItemsPerPage', this.counterForItemsPerPage)

  } // END fillCounterForPagination()

}