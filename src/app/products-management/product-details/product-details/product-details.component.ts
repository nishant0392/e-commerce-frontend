import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { RatingCircle } from 'src/app/shared/rating/rating-circle/rating-circle.component';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { DataProvider2Service } from 'src/app/services/data-provider2.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // Product Image
  public img_list: any[];
  public selectedImage: any;

  public carouselOptions: any;
  public carouselItems: any[];

  public Item: any;
  public primaryDetailsOfItem = {}; // primary details of Item
  public offers: any;      // a reference to Item.offers
  public initialCountForOffers: number = 4;
  public offersToDisplay_counter: number[] = [];
  public remainingOffersToDisplay: number;
  public item_properties = {};  // properties of the Item
  public listOfProperties: string[];  // order of properties to be displayed

  public item_specifications: any;
  public MPI_Info: any;

  public ratingCircleOptions: RatingCircle;

  // View Options to be passed
  public options_galleryView = {};
  public options_boxView = {};
  public options_bulletsView = {};

  constructor(private cartService: CartService,
    private router: Router,
    private _data: DataProviderService,
    private _data2: DataProvider2Service) { }

  ngOnInit() {

    // Item carousel display
    this.carouselOptions = this._data.carouselOptions;
    this.carouselItems = this._data.carouselItems;

    // set the default image
    this.selectedImage = "/assets/images/" + this.carouselItems[0].fullImg;

    // Item details
    this.Item = this._data.Item;

    // Item related offers
    this.offers = this.Item.offers;
    this.setInitialCounterForOffers();

    // Item Properties
    this.primaryDetailsOfItem = this._data.Item.primaryDetailsOfItem;
    this.item_properties = this._data.Item.properties;
    this.listOfProperties = this._data.Item.listOfProperties;
    this.options_galleryView = {
      width: '50px',
      height: '50px'
    };
    this.options_boxView = {
      width: '75px',
      height: '40px'
    };

    // Item Specifications
    this.item_specifications = this._data.Item.specifications;
    this.MPI_Info = this._data.Item.MPI_Info;

    // Ratings and Reviews
    this.ratingCircleOptions = {
      rating: 50
    }

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



  public addToCart() {
    // UNCOMMENT when backend is ready
    /*
    this.cartService.addToCart([this.Item], false)
      .subscribe((response: any) => {
        console.log(response)
        if (!response.error) {
          // emit count of Cart items
          // this.changeCountOfCartItems();
          this.router.navigate(['/view-cart'])
        }
      })*/

      this._data2.CartItems.push(this._data2.CartItems[0]);
      setTimeout(()=>this.router.navigate(['/view-cart']), 1000)
  }


}
