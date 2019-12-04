import { Component, OnInit } from '@angular/core';
import { DataProvider2Service } from 'src/app/services/data-provider2.service';
import { ProductManagementService } from 'src/app/services/product-management.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  constructor(private productMgmtService: ProductManagementService,
    private data: DataProvider2Service) { }

  public CartItems: any[] = [];
  public SavedForLaterItems: any[] = [];

  public countOfCartItems: number = 0;
  public countOfSavedForLaterItems: number = 0;

  public paymentInfo = {
    recipient: 'NISHANT KUMAR',
    billingAddress: `Sri Balaji Boys PG, New BEL Road`
  }

  public deliveryFee: number = 0;
  public totalPrice: number = 0;
  public totalPayable: number = 0;
  public totalSavings: number = 0;

  ngOnInit() {
    this.initCart();

    this.productMgmtService.initCart_data$.subscribe(
      (initCart_result) => {
        this.totalPrice = initCart_result.totalPrice;
        this.deliveryFee = initCart_result.deliveryFee;
        this.totalPayable = initCart_result.totalPayable;
        this.totalSavings = initCart_result.totalSavings;
        this.countOfCartItems = initCart_result.countOfItems;
      },
      (err) => console.log(err)
    )
  }


  
  /**
   * Initialize Cart
   */
  public initCart() {

    // get the CART items and "SAVED FOR LATER" items
    this.CartItems = this.data.CartItems;
    this.SavedForLaterItems = this.data.SavedForLaterItems;

    // calculate total Price, count of cart items, delivery Fees, total amount payable & Savings 
    // on CART items.
    this.productMgmtService.calculateTotal(this.CartItems);

  }


  public getQuantity(quantity: number, index: number) {

    let cartItem = this.CartItems[index];
    let change = quantity - cartItem.quantity;

    this.totalPrice = this.totalPrice + change * cartItem.price;
    this.totalSavings = this.totalSavings + change * (cartItem.MRP - cartItem.price);

    this.CartItems[index].quantity = quantity;

    if (change === 1)
      this.countOfCartItems++;

    else if (change === -1)
      this.countOfCartItems--;
  }


  public removeItemFromCart(indexOfItem: number, cartType?: string) {

    if (cartType === 'savedForLater') {

      this.countOfSavedForLaterItems -= this.SavedForLaterItems[indexOfItem].quantity;

      this.SavedForLaterItems = this.SavedForLaterItems.filter(
        (currentValue, index) => {
          return (indexOfItem !== index);
        });
    }

    else {
      let cartItem = this.CartItems[indexOfItem];

      // Do the Maths
      this.totalPrice = this.totalPrice - (cartItem.quantity * cartItem.price);
      this.totalSavings = this.totalSavings - (cartItem.quantity * (cartItem.MRP - cartItem.price));
      this.countOfCartItems = this.countOfCartItems - cartItem.quantity;

      this.CartItems = this.CartItems.filter(
        (currentValue, index) => {
          return (indexOfItem !== index);
        });
    }
  }


  public saveForLater(indexOfItem: number) {

    // Add to "savedForLater" Cart
    this.SavedForLaterItems.push(this.CartItems[indexOfItem]);
    this.countOfSavedForLaterItems += this.CartItems[indexOfItem].quantity;

    // Remove from Cart
    this.removeItemFromCart(indexOfItem);

  }


  public moveToCart(indexOfItem: number) {

    let itemToAdd = this.SavedForLaterItems[indexOfItem];

    // Add to Cart
    this.CartItems.push(itemToAdd);

    // Do the Maths
    this.totalPrice = this.totalPrice + (itemToAdd.quantity * itemToAdd.price);
    this.totalSavings = this.totalSavings + (itemToAdd.quantity * (itemToAdd.MRP - itemToAdd.price));
    this.countOfCartItems = this.countOfCartItems + itemToAdd.quantity;

    // Remove from "savedForLater" Cart
    this.removeItemFromCart(indexOfItem, 'savedForLater');

  }



}
