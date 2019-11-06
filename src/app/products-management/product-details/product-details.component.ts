import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';

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

  public Item: any;
  public offers: any;      // a reference to Item.offers
  public initialCountForOffers: number = 4;
  public offersToDisplay_counter: number[] = [];
  public remainingOffersToDisplay: number;

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

    // Item details
    this.Item =
      {
        pid: 'MOBF1',
        title: 'RedMi Note 7S (Sapphire Blue, 64 GB)',
        urlTitle: 'redmi-note-7s-sapphire-blue-64-gb',
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
        fAssured: true,
        exchangePrice: 11500,
        noCostEMI: true,

        offers: [
          {
            offer: '5% Unlimited Cashback on Flipkart Axis Bank Credit Card',
            category: 'Bank Offer',
            info: 'T&C',
            type: 'BANK_OFFER',
            showRightArrow: false
          },
          {
            offer: 'Extra 5% off* with Axis Bank Buzz Credit Card',
            category: 'Bank Offer',
            info: 'T&C',
            type: 'BANK_OFFER',
            showRightArrow: false
          },
          {
            offer: 'Get upto ₹9250 off on exchange',
            catgory: '',
            info: 'Buy with Exchange',
            type: 'EXCHANGE_OFFER',
            showRightArrow: true
          },
          {
            offer: 'Extra ₹3000 discount(price inclusive of discount)',
            category: 'Special Price',
            info: 'T&C',
            type: 'SPECIAL_PRICE',
            showRightArrow: false
          },
          {
            offer: 'Standard EMI also available',
            category: 'No cost EMI ₹917/month.',
            info: 'View Plans',
            type: 'EMI',
            showRightArrow: true
          }
        ]
      };

    this.offers = this.Item.offers;
    this.setInitialCounterForOffers();
  }


  public fillCounterForOffers(length) {
    this.offersToDisplay_counter = Array(length).fill(0).map((val, idx) => idx);
  }

  public setInitialCounterForOffers() {

    if (this.initialCountForOffers > this.offers.length)
      this.initialCountForOffers = this.offers.length;

    // set count for remaining offers to display
    this.remainingOffersToDisplay = this.offers.length - this.initialCountForOffers;

    this.fillCounterForOffers(this.initialCountForOffers);
  }

  public setFinalCounterForOffers() {
    this.fillCounterForOffers(this.offers.length);

    // no more offers to display
    this.remainingOffersToDisplay = 0;
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


  public addBullet(offerType: string): string {

    switch (offerType) {
      case 'BANK_OFFER': {
        return 'fa fa-tag';
      }
      case 'EXCHANGE_OFFER': {
        return 'fa fa-sync';
      }
      case 'EMI': {
        return 'fa fa-calendar-check';
      }
      default: {
        return 'fa fa-tag';
      }
    }

  }


  public addRightArrow(offerType: string): boolean {
    if (offerType === 'EXCHANGE_OFFER' || offerType === 'EMI') {
      return true;
    }

    else {
      return false;
    }
  }

}
