import { Component, OnInit } from '@angular/core';
import { DataProvider2Service } from 'src/app/services/data-provider2.service';
import { ProductManagementService } from 'src/app/services/product-management.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private productMgmtService: ProductManagementService,
    private data: DataProvider2Service
  ) { }

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



}
