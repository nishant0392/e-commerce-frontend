import { Component, OnInit } from '@angular/core';
import { RatingCircle } from 'src/app/shared/rating/rating-circle/rating-circle.component';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserManagementService } from 'src/app/services/user-management.service';
import { ProductManagementService } from 'src/app/services/product-management.service';
import { ModalService } from 'src/app/services/modal.service';

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
  public primaryDetailsOfItem; // primary details of Item
  public offers: any;      // a reference to Item.offers
  public initialCountForOffers: number = 4;
  public offersToDisplay_counter: number[] = [];
  public remainingOffersToDisplay: number;
  public item_properties = {};  // properties of the Item
  public listOfProperties: string[];  // order of properties to be displayed

  public item_specifications: any;
  public MPI_Info: any;

  public ratingCircleOptions: RatingCircle;
  public ratingData;
  public _ratingData;

  // View Options to be passed
  public options_galleryView = {};
  public options_boxView = {};
  public options_bulletsView = {};

  // Route parameters
  public listId;
  public productId;

  // Others
  public serverError: boolean = false;

  constructor(private cartService: CartService,
    private productService: ProductManagementService,
    private userService: UserManagementService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    // extract productId and listId from url
    this.activatedRoute.queryParams
      .subscribe((queryParams) => {
        this.listId = queryParams.lid;
      })

    this.activatedRoute.params
      .subscribe((routeParams) => {
        this.productId = routeParams.pid;
      })
  }


  ngOnInit() {
    this.fetchProductDetails();
  }


  public fetchProductDetails() {

    this.productService.getSingleItem(this.listId, this.productId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.initializeProductDetails(apiResponse.data);
        }
        else if (apiResponse.status === 500) {
          this.serverError = true;
        }
        else {
          this.modalService.showCustomMessageModal('open', apiResponse.message, 'error');
        }
      },
        (error) => {
          console.log(error)
          this.serverError = true;
        })
  }

  public initializeCarousel() {
    // Item carousel display options
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

    // Carousel Items (images)
    this.carouselItems = this.Item.carouselItems;

    // set the default image
    this.selectedImage = "/assets/images/" + this.carouselItems[0].fullImg;
  }


  public initializeProductDetails(itemDetails) {
    // Item details
    this.Item = itemDetails;

    // Initialize carousel
    this.initializeCarousel();

    // Item related offers
    this.offers = this.Item.offers;
    this.setInitialCounterForOffers();

    // Item Properties
    this.primaryDetailsOfItem = this.Item.primaryDetailsOfItem;
    this.item_properties = this.Item.properties;
    this.listOfProperties = this.Item.listOfProperties;
    this.options_galleryView = {
      width: '50px',
      height: '50px'
    };
    this.options_boxView = {
      width: '75px',
      height: '40px'
    };

    // Item Specifications
    this.item_specifications = this.Item.specifications;
    this.MPI_Info = this.Item.MPI_Info;

    // Ratings and Reviews
    this.ratingData = this.primaryDetailsOfItem.rating;
    this.ratingCircleOptions = {
      rating: 50
    }

    this._ratingData = {
      avgRating: this.ratingData.stars,
      ratingsCount: this.ratingData.ratingsCount,
      reviewsCount: this.ratingData.reviewsCount,
      paramWiseRating: [
        {
          param: 'Camera',
          rating: 4.2
        },
        {
          param: 'Battery',
          rating: 3.3
        },
        {
          param: 'Display',
          rating: 3.9
        },
        {
          param: 'Value for Money',
          rating: 4.9
        }
      ]
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


  public getNewCartItem() {

    let primaryDetails = this.Item.primaryDetailsOfItem;

    let newCartItem = {
      pid: primaryDetails.pid,
      title: primaryDetails.title,
      urlTitle: primaryDetails.urlTitle,
      image: primaryDetails.image,
      rating: primaryDetails.rating,
      features: primaryDetails.features,
      price: primaryDetails.price,
      MRP: primaryDetails.MRP,
      discount: primaryDetails.discount,
      exchangePrice: primaryDetails.exchangePrice,
      noCostEMI: primaryDetails.noCostEMI,
      seller: this.Item.properties.Seller,
      quantity: 1
    }

    return newCartItem;
  }


  /**
   * Add the selected item to Cart and proceed to CART/CHECKOUT based on selection.
   * @param proceedTo CART or CHECKOUT
   */
  public addToCart(proceedTo: string) {

    // Check if user is logged in
    if (!this.userService.isLoggedIn()) {
      this.userService.initializeModal().openLogin();
      return;
    }

    let newCartItem = this.getNewCartItem(), userId = this.userService.getUserID();

    this.cartService.saveCart(userId, [newCartItem], null, false)
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {

          let data = {
            cartItems: apiResponse.data.cartItems,
            savedForLaterItems: apiResponse.data.savedForLaterItems
          }
          // push updated cart and pass to all subscribers
          this.cartService.changeCartAndSavedItems_data(data);

          if (proceedTo === 'CART')
            this.router.navigate(['/view-cart']);

          else
            this.router.navigate(['/checkout/init']);
        }

        else {
          console.log(apiResponse)
          this.modalService.showCustomMessageModal('open', apiResponse.message, 'error');
        }
      },
        (error) => {
          console.log(error)
          this.modalService.showCustomMessageModal('open', 'Server did not respond !! Please try again later.', 'error');
        })

  } // END addToCart()

}
