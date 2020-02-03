import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart.interface';
import { UserManagementService } from 'src/app/services/user-management.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  constructor(private cartService: CartService,
    private userService: UserManagementService) { }

  public userId: string;
  public authToken: string;
  public CartItems: any[] = [];
  public CartRelatedData: Cart;

  public SavedForLaterItems: any[] = [];
  public countOfSavedForLaterItems: number = 0;

  public fetchCart_Subscription: Subscription;
  public initCart_Subscription: Subscription;
  public serverError: boolean = false;

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
    // Check if user is logged in. If no, proceed to login.
    if (!this.userService.isLoggedIn()) {
      this.userService.initializeModal().openLogin();
    }

    // If yes, fetch Cart and initialize Cart related data
    else {
      this.userId = this.userService.getUserID();
      this.fetchCart(this.userId);
      this.initCartRelatedData();
      // set timeout of 5 seconds in case server doesn't respond 
      setTimeout(() => {
        if(!this.CartItems || (this.CartItems && !this.CartItems.length)) this.serverError = true;
      }, 5000)
    }
  }


  public initCartRelatedData() {
    // Get the Cart Related Data
    this.initCart_Subscription = this.cartService.initCart_data$.subscribe(
      (initCart_result) => {  
       
        if (initCart_result) {
          this.CartRelatedData = {
            totalPrice: initCart_result.totalPrice,
            deliveryFee: initCart_result.deliveryFee,
            totalPayable: initCart_result.totalPayable,
            totalSavings: initCart_result.totalSavings,
            countOfItems: initCart_result.countOfCartItems
          }
        }
      },
      (err) => console.log(err)
    );
  }


  /**
   * Fetch Cart for the user with given ID.
   * @param userID User ID
   */
  public fetchCart(userID: string) {

    this.fetchCart_Subscription = this.cartService.CartAndSavedItems$.subscribe((data) => {
  
      if (!data) {
        // fetch updated cart and pass to all subscribers
        this.cartService.fetchCart(userID);
      }

      else {
        this.CartItems = data.cartItems;
        this.SavedForLaterItems = data.savedForLaterItems;

        // Do initialization
        this.initCart();
      }

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
  

  ngOnDestroy() {
    this.fetchCart_Subscription.unsubscribe();
    this.initCart_Subscription.unsubscribe();
  }

} // END
