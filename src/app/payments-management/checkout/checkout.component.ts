import { Component, OnInit, ViewChild, ElementRef, isDevMode } from '@angular/core';
import { DataProvider2Service } from 'src/app/services/data-provider2.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart.interface';
import { PaymentService, PayUMoneyParams } from 'src/app/services/payment.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserManagementService,
    private cartService: CartService,
    private paymentService: PaymentService,
    private data: DataProvider2Service
  ) { }

  // 'Go To Cart' Modal
  @ViewChild('modal_GoToCart', { static: true }) modal_GoToCart: ElementRef<HTMLElement>

  // replica of the cart items
  public CheckoutItems: any[] = [];
  public CheckoutRelatedData: Cart;

  public paymentInfo = {
    recipient: 'NISHANT KUMAR',
    billingAddress: `Sri Balaji Boys PG, New BEL Road`
  }

  public paymentOptionLoad: boolean = true;

  // View Controller
  public View: string[] = ['UNCHECKED', 'CHANGE', 'CHANGE', 'UNCHECKED'];
  public show: boolean[] = [false, true];
  public captcha: any;   // captcha

  public editAddress: boolean;
  public missingError: boolean = false;

  // Edit address details
  public name;
  public mobile;
  public areaAndStreet;
  public pincode;
  public locality;
  public cityOrDistrictOrTown;
  public state;
  public addressType;


  ngOnInit() {
    // Initialize Checkout
    this.initCheckout();

    this.CheckoutRelatedData.email = "nishkr0392@gmail.com";
    this.CheckoutRelatedData.mobile = 7204190121;
    this.CheckoutRelatedData.userName = { firstName: 'Nishant', lastName: 'Kumar' };

    this.editAddress = true;
  }


  /**
   * Initialize Checkout
   */
  public initCheckout() {

    // get the CART items into checkout
    this.CheckoutItems = this.data.CartItems;

    // calculate total Price, count of cart items, delivery Fees, total amount payable & Savings 
    // on CART items.
    this.cartService.calculateTotal(this.CheckoutItems);

    // Get the Checkout Related Data
    this.cartService.initCart_data$.subscribe(
      (initCheckout_result) => {

        this.CheckoutRelatedData = {
          totalPrice: initCheckout_result.totalPrice,
          deliveryFee: initCheckout_result.deliveryFee,
          totalPayable: initCheckout_result.totalPayable,
          totalSavings: initCheckout_result.totalSavings,
          countOfItems: initCheckout_result.countOfCartItems
        };

      },

      (err) => console.log(err)
    );

  } // END initCheckout()


  /**
   * Performs the given operation on the corresponding Checkout Item. Operations are:  
   ** 'UPDATE_QUANTITY' - Update the quantity of the respective item.
   ** 'REMOVE' - Remove the item from Checkout (not Cart).
   * @param data data received namely 'operation', 'indexOfItem', 'cartType' and/or 'quantity'.
   */
  public operationOnCheckoutItem(data: any) {

    // Re-using the operationOnCartItem() function
    this.cartService.
      operationOnCartItem(this.CheckoutItems, this.CheckoutRelatedData, null, data);

    // trigger click event to open the "GO TO CART" Modal
    if (this.CheckoutRelatedData.countOfItems < 1)
      this.modal_GoToCart.nativeElement.click();

  }


  public changeView(index: number) {
    this.View[index] = 'CHANGE';
  }


  public continueCheckout(index: number) {

    this.View[index] = 'CHECKED';

    if (index < 3) {
      this.View[index + 1] = 'CHANGE';
    }

  }

  public getCaptcha() {

    // generate Captcha
    this.paymentService.getCaptcha()
      .subscribe((captcha: any) => {
        this.captcha = captcha;
        document.getElementById('COD-captcha').innerHTML = this.captcha;
      },
        (error) => {
          console.log(error)
        });
  }

  public selectPaymentMode(paymentMode: string) {

    let setFlags = (index: number) => {

      if (this.show[index] === false) {
        for (let i = 0; i < this.show.length; i++) {
          (i !== index) ? (this.show[i] = false) : (this.show[i] = true);
        }
      }

    }

    switch (paymentMode) {
      case 'card': {
        setFlags(0);
        break;
      }

      case 'COD': {
        setFlags(1);
        this.getCaptcha();
        break;
      }
    }

  } // END selectPaymentMode()


  public goToPayment(paymentMode: string) {

    let productInfo = this.CheckoutItems[0].title;

    if (this.CheckoutItems.length > 1) {
      productInfo += ' and others...';
    }

    switch (paymentMode) {

      case 'card': {

        let request_data: PayUMoneyParams = {

          amount: this.CheckoutRelatedData.totalPayable,
          productinfo: productInfo,
          firstname: this.CheckoutRelatedData.userName.firstName,
          lastname: this.CheckoutRelatedData.userName.lastName,
          email: this.CheckoutRelatedData.email,
          phone: this.CheckoutRelatedData.mobile
        };
        this.paymentOptionLoad = false;
        this.paymentService.makePaymentRequest_PayUMoney(request_data)
          .subscribe((response: any) => {

            console.log(response)
            if (response.status === 200) {
              // redirect to payment link
              location.href = response.data;
            }
            else {
              console.log(response.error)
              // couldn't load payment option
              this.paymentOptionLoad = false;
            }
          })

        break;
      }

      case 'COD': {

        break;
      }
    }
  }


  public selectAddress(address) {
    console.log(address)
  }


  public saveAddressAndContinue() {

    let address = {
      name: this.name,
      mobile: this.mobile,
      areaAndStreet: this.areaAndStreet,
      pincode: this.pincode,
      locality: this.locality,
      cityOrDistrictOrTown: this.cityOrDistrictOrTown,
      state: this.state,
      addressType: this.addressType
    };
/*
    if (this.userService.isAnyPropertyNull(address)) {
      this.missingError = true;
      return;
    }

    this.missingError = false;

    console.log(address)
    this.userService.saveUserAddress(address)
      .subscribe((apiResponse: any) => {
        console.log(apiResponse)
        if (!apiResponse.error)
          this.continueCheckout(1);
      })*/
      this.continueCheckout(1);
  } // END saveAddressAndContinue()


}
