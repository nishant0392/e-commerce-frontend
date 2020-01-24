import { Component, OnInit } from '@angular/core';
import { DataProvider2Service } from 'src/app/services/data-provider2.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  constructor(private cartService: CartService,
    private cookie: CookieService,
    private router: Router,
    private utilityService: UtilityService,
    private data: DataProvider2Service) { }

  public userId: string;
  public authToken: string;
  public CartItems: any[] = [];
  public CartRelatedData: Cart;

  public SavedForLaterItems: any[] = [];
  public countOfSavedForLaterItems: number = 0;

  public enableSave: boolean = true;

  public paymentInfo = [
    {
      recipient: 'NISHANT KUMAR',
      billingAddress: `Sri Balaji Boys PG, New BEL Road`
    },
    {
      recipient: 'PRASHANT KUMAR',
      billingAddress: `D-28, PC Colony, Kankarbagh`
    }
  ];

  ngOnInit() {
    // fetch authorization details from cookie
    this.userId = this.cookie.get('userId');
    this.authToken = this.cookie.get('authToken');

    if (!this.userId || !this.authToken)
      this.router.navigate(['/'])

    this.CartRelatedData = {
      countOfItems: 0, totalPrice: 0, totalPayable: 0, totalSavings: 0, deliveryFee: 0
    };

    // Fetch Cart
    this.fetchCart();
  }

  /**
   * Fetch User Cart.
   */
  public fetchCart() {

    this.cartService.fetchCart(this.userId)
      .subscribe((apiResponse: any) => {

        if (apiResponse.status === 200) {
          // set the CART items and "SAVED FOR LATER" items
          this.CartItems = apiResponse.data.cartItems || [];
          this.SavedForLaterItems = apiResponse.data.savedForLaterItems || [];

          // Do initialization
          this.initCart();
        }

      }, (error) => {
        console.log(error)
      })
  }


  /**
   * Initialize Cart
   */
  public initCart() {

    // calculate total Price, count of cart items, delivery Fees, total amount payable & Savings 
    // on CART items.
    this.cartService.calculateTotal(this.CartItems);

    // calculate count of "Saved For Later" items
    this.countOfSavedForLaterItems
      = this.cartService.calculateCountOfItems(this.SavedForLaterItems);

    // save the count in service file  
    this.cartService.countOfSavedForLaterItems = this.countOfSavedForLaterItems;

    // Get the Cart Related Data
    this.cartService.initCart_data$.subscribe(
      (initCart_result) => {

        this.CartRelatedData = {
          totalPrice: initCart_result.totalPrice,
          deliveryFee: initCart_result.deliveryFee,
          totalPayable: initCart_result.totalPayable,
          totalSavings: initCart_result.totalSavings,
          countOfItems: initCart_result.countOfCartItems
        };

      },

      (err) => console.log(err)
    );

  }


  /**
   * Performs the given operation on the corresponding Cart Item. Operations are:  
   ** 'UPDATE_QUANTITY' - Update the quantity of the respective item.
   ** 'SAVE_FOR_LATER' - Save the item for later.
   ** 'REMOVE' - Remove the item from cart.
   ** 'MOVE_TO_CART' - Move the "saved for later" item to cart.
   * @param data data received namely 'operation', 'indexOfItem', 'cartType' and/or 'quantity'.
   */
  public operationOnCartItem(data: any) {

    this.cartService.
      operationOnCartItem(this.CartItems, this.CartRelatedData, this.SavedForLaterItems, data);

    // update count for "SAVED FOR LATER" Items
    this.countOfSavedForLaterItems = this.cartService.countOfSavedForLaterItems;

    // Save on database
    let operation = data.operation;
    let cartItems = null, savedForLaterItems = null;

    let saveCart = () => {
      this.cartService.saveCart(this.userId, cartItems, savedForLaterItems, true)
        .subscribe((apiResponse) => {
          console.log(apiResponse)
        })
    }

    if (operation === 'UPDATE_QUANTITY') 
      cartItems = this.CartItems;
     
    else if (operation === 'REMOVE') {

      if (data.cartType === 'CART') cartItems = this.CartItems;

      if (data.cartType === 'SAVED_FOR_LATER') savedForLaterItems = this.SavedForLaterItems;

    }

    else {
      cartItems = this.CartItems;
      savedForLaterItems = this.SavedForLaterItems;
    }

    saveCart();

  } // END operationOnCartItem()

} // END
