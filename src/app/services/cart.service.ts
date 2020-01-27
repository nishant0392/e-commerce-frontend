import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Cart } from '../interfaces/cart.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../interfaces/apiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = isDevMode() ? 'http://localhost:3000/api/v2' : 'http://api.nkart.nishant-kumar.com/api/v2';

  public countOfSavedForLaterItems: number = 0;

  // data for initialization of Cart
  private initCart_data_Source = new BehaviorSubject<any>({});
  public initCart_data$ = this.initCart_data_Source.asObservable();

  // Cart and 'Saved For Later' Items
  private CartAndSavedItems_Source = new BehaviorSubject<any>({});
  public CartAndSavedItems$ = this.CartAndSavedItems_Source.asObservable();

  // count of Cart Items
  private countOfCartItems_Source = new BehaviorSubject<any>({});
  public countOfCartItems$ = this.countOfCartItems_Source.asObservable();

  private defaultDeliveryFee: number = 40;  // Default delivery fee fixed by Flipkart.

  public changeInitCart_data(data: {}) {
    this.initCart_data_Source.next(data);
  }

  public changeCartAndSavedItems_data(data: { cartItems: any[], savedForLaterItems: any[] }) {
    this.CartAndSavedItems_Source.next(data);
  }

  public changeCountOfCartItems(count: number) {
    this.countOfCartItems_Source.next(count);
  }


  constructor(private http: HttpClient) {
  }


  /**
   * Calculate Delivery Fee for the Items provided.
   * @param Items Items to be calculated upon.
   * @param defaultDeliveryFee Default delivery fee fixed by Flipkart.
   */
  public calculateDeliveryFee(Items: any[], defaultDeliveryFee: number): number {

    let item, sellerId, deliveryFee, totalDeliveryFee = 0,
      itemsCostBySeller = {}, deliveryCostBySeller = {}, deliveryFee_cutOff_BySeller = {};

    for (let i = 0; i < Items.length; i++) {

      item = Items[i];
      sellerId = item.seller.id;
      deliveryFee = item.quantity * (item.deliveryFee || defaultDeliveryFee);

      // calculate delivery cost for each seller
      if (deliveryCostBySeller[sellerId])
        deliveryCostBySeller[sellerId] += deliveryFee;
      else {
        deliveryCostBySeller[sellerId] = deliveryFee;
        deliveryFee_cutOff_BySeller[sellerId] = item.seller.deliveryFee_cutOff;
      }

      // calculate Items cost for each seller
      if (itemsCostBySeller[sellerId])
        itemsCostBySeller[sellerId] += item.price;
      else
        itemsCostBySeller[sellerId] = item.price;

    }

    // calculate total delivery fee
    for (let sellerId in itemsCostBySeller) {

      if (itemsCostBySeller[sellerId] >= deliveryFee_cutOff_BySeller[sellerId]) {
        deliveryCostBySeller[sellerId] = 0;
      }

      totalDeliveryFee += deliveryCostBySeller[sellerId];
    }

    return totalDeliveryFee;

  } // END calculateDeliveryFee()


  /**
   * Calculates the total Price, count of Cart Items, delivery Fee, total amount payable & Savings on the 
   * Cart Items.
   * @param CartItems Items to be calculated upon.
   */
  public calculateTotal(CartItems: any[]) {

    let totalPrice = 0, totalSavings = 0, deliveryFee = 0, totalPayable = 0, countOfCartItems = 0;

    for (let i = 0; i < CartItems.length; i++) {
      let item = CartItems[i];
      totalPrice += item.price * item.quantity;
      totalSavings += (item.MRP - item.price);
      countOfCartItems += item.quantity;
    }

    deliveryFee = this.calculateDeliveryFee(CartItems, this.defaultDeliveryFee);
    totalPayable = totalPrice + deliveryFee;

    let result = {
      totalPrice: totalPrice,
      totalSavings: totalSavings,
      deliveryFee: deliveryFee,
      totalPayable: totalPayable,
      countOfCartItems: countOfCartItems
    };

    // Store the 'initCart' data
    this.changeInitCart_data(result);

    // emit count of Cart items
    this.changeCountOfCartItems(countOfCartItems);

  } // END calculateTotal()


  /**
   * Returns count of items (each Item may differ in quantity)
   * @param Items Collection of Items (each of different type)
   */
  calculateCountOfItems(Items: any): number {

    let countOfItems = 0;
    for (let i = 0; i < Items.length; i++)
      countOfItems += Items[i].quantity;

    return countOfItems;
  }

  /**
   * Removes a single item at the given index.
   * @param Items An array of Items
   * @param indexOfItem Index of the Item to be removed.
   */
  public removeSingleItem(Items: any[], indexOfItem: number) {

    for (let i = indexOfItem; i < Items.length - 1; i++) {
      Items[i] = Items[i + 1];
    }

    Items.length--;
  }

  /**
   * 
   * @param Items Cart Items
   * @param indexOfItem Index of the Item to be removed.
   * @param cartType Type of Cart
   * @param CartRelatedData Contains properties such as 'totalPrice', 'totalSavings', etc.
   */
  public removeItemFromCart(Items: any[], indexOfItem: number, cartType: string, CartRelatedData?: Cart) {

    // Item to be removed  
    let cartItem = Items[indexOfItem];

    if (cartType === 'CART') {

      // Do the Maths before removing from CART
      CartRelatedData.countOfItems -= cartItem.quantity;
      CartRelatedData.totalPrice -= cartItem.quantity * cartItem.price;
      CartRelatedData.totalSavings -= cartItem.quantity * (cartItem.MRP - cartItem.price);

    }

    else if (cartType === 'SAVED_FOR_LATER') {
      this.countOfSavedForLaterItems -= cartItem.quantity;
    }

    // Remove the Item
    this.removeSingleItem(Items, indexOfItem);

  }  // END removeItemFromCart()


  /** Move to "SAVED FOR LATER" Cart */
  public saveForLater(CartItems: any[], CartRelatedData: Cart, SavedForLaterItems: any[], indexOfItem: number) {

    // Add to "SAVED FOR LATER" Cart
    SavedForLaterItems.push(CartItems[indexOfItem]);
    this.countOfSavedForLaterItems += CartItems[indexOfItem].quantity;

    // Remove from CART
    this.removeItemFromCart(CartItems, indexOfItem, 'CART', CartRelatedData);

  }


  /** Move to CART */
  public moveToCart(CartItems: any[], CartRelatedData: Cart, SavedForLaterItems: any[], indexOfItem: number) {

    let itemToMove = SavedForLaterItems[indexOfItem];

    // Add to Cart
    CartItems.push(itemToMove);

    // Do the Maths
    CartRelatedData.totalPrice += itemToMove.quantity * itemToMove.price;
    CartRelatedData.totalSavings += itemToMove.quantity * (itemToMove.MRP - itemToMove.price);
    CartRelatedData.countOfItems += itemToMove.quantity;

    // Remove from "SAVED FOR LATER" Cart
    this.removeItemFromCart(SavedForLaterItems, indexOfItem, 'SAVED_FOR_LATER');

  }


  /**
   * Performs the given operation on the corresponding Cart Item. Operations are:  
   ** 'UPDATE_QUANTITY' - Update the quantity of the respective item.
   ** 'SAVE_FOR_LATER' - Save the item for later.
   ** 'REMOVE' - Remove the item from cart.
   ** 'MOVE_TO_CART' - Move the "saved for later" item to cart.
   * @param CartItems Cart items
   * @param CartRelatedData Cart properties such as total Price, total Savings, etc.
   * @param SavedForLaterItems "SAVED FOR LATER" items
   * @param data data received namely 'operation', indexOfItem', 'cartType' and/or 'quantity'.
   */
  public operationOnCartItem(CartItems: any[], CartRelatedData: Cart, SavedForLaterItems: any[], data: any) {

    let operation = data.operation;           // type of operation
    let indexOfItem = data.indexOfItem;       // index of Cart Item
    let cartItem = CartItems[indexOfItem];    // Cart item

    switch (operation) {

      case 'UPDATE_QUANTITY': {

        let change = data.quantity - cartItem.quantity;
        cartItem.quantity = data.quantity;  // update the quantity

        CartRelatedData.totalPrice += change * cartItem.price;
        CartRelatedData.totalSavings += change * (cartItem.MRP - cartItem.price);

        CartItems[indexOfItem].quantity = data.quantity;

        if (change === 1)
          CartRelatedData.countOfItems++;

        else if (change === -1)
          CartRelatedData.countOfItems--;

        break;
      }

      case 'SAVE_FOR_LATER': {
        this.saveForLater(CartItems, CartRelatedData, SavedForLaterItems, indexOfItem);
        break;
      }

      case 'REMOVE': {
        if (data.cartType === 'CART')
          this.removeItemFromCart(CartItems, indexOfItem, 'CART', CartRelatedData);

        if (data.cartType === 'SAVED_FOR_LATER')
          this.removeItemFromCart(SavedForLaterItems, indexOfItem, 'SAVED_FOR_LATER');

        break;
      }

      case 'MOVE_TO_CART': {
        this.moveToCart(CartItems, CartRelatedData, SavedForLaterItems, indexOfItem);
        break;
      }

    } // end switch


    switch (operation) {

      case 'UPDATE_QUANTITY':
      case 'SAVE_FOR_LATER':
      case 'MOVE_TO_CART':
        // re-calculate delivery fee and total payable amount
        CartRelatedData.deliveryFee = this.calculateDeliveryFee(CartItems, this.defaultDeliveryFee);
        CartRelatedData.totalPayable = CartRelatedData.totalPrice + CartRelatedData.deliveryFee;
        break;

      case 'REMOVE': {
        if (data.cartType === 'CART') {
          // re-calculate delivery fee and total payable amount
          CartRelatedData.deliveryFee = this.calculateDeliveryFee(CartItems, this.defaultDeliveryFee);
          CartRelatedData.totalPayable = CartRelatedData.totalPrice + CartRelatedData.deliveryFee;
        }
        break;
      }

    } // end switch

    // emit count of Cart items
    this.changeCountOfCartItems(CartRelatedData.countOfItems);

  }


  /**
   * Save Cart/'Saved For Later' items on database. 
   * @param userId userId
   * @param cartItems Cart items
   * @param savedForLaterItems "Saved For Later" items
   * @param overWrite whether to overwrite or not
   */
  public saveCart(userId: string, cartItems: any[], savedForLaterItems: any[], overWrite: boolean) {

    let _cartItems = JSON.stringify(cartItems);
    let _savedForLaterItems = JSON.stringify(savedForLaterItems);
    let _overWrite = overWrite ? 'true' : 'false';

    let params = new HttpParams()
      .set('userId', userId)
      .set('overWrite', _overWrite)

    if (cartItems)
      params = params.set('cartItems', _cartItems)

    if (savedForLaterItems)
      params = params.set('savedForLaterItems', _savedForLaterItems)

    return this.http.post<ApiResponse>(this.baseUrl + '/cart/add', params);
  }


  /**
   * Fetch User Cart.
   * @param userId userId
   */
  public fetchCart(userId: string) {
    this.http.get<ApiResponse>(`${this.baseUrl}/cart/items?userId=${userId}`)
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          // set the CART items and "SAVED FOR LATER" items and pass to all subscribers
          let _cartItems = apiResponse.data.cartItems || [];
          let _savedForLaterItems = apiResponse.data.savedForLaterItems || [];

          this.changeCartAndSavedItems_data({ cartItems: _cartItems, savedForLaterItems: _savedForLaterItems });

          // set count of cart items and pass to all subscribers
          let countOfCartItems = this.calculateCountOfItems(_cartItems);
          this.changeCountOfCartItems(countOfCartItems);
        }

      }, (error) => {
        console.log(error)
      })

  }

} // END
