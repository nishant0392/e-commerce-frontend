import { Component, OnInit, ViewChild, ElementRef, isDevMode } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart.interface';
import { PaymentService, PayUMoneyParams } from 'src/app/services/payment.service';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalService } from 'src/app/services/modal.service';

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
    private cookieService: CookieService,
    private modalService: ModalService
  ) { }

  // 'Go To Cart' Modal
  @ViewChild('modal_GoToCart', { static: true }) modal_GoToCart: ElementRef<HTMLElement>;

  public userId: string;
  public authToken: string;

  public loadUserDetails: boolean = false;
  public card_payment_msg: string = `You will be redirected to PayUMoney page where you can pay using card.`;

  // replica of the cart items
  public CheckoutItems: any[];
  public CheckoutRelatedData: Cart;

  public paymentInfo = {
    recipient: 'NISHANT KUMAR',
    billingAddress: `Sri Balaji Boys PG, New BEL Road`
  }

  // View Controller
  public View: string[] = ['CHANGE', 'UNCHECKED', 'UNCHECKED', 'UNCHECKED'];
  public show: boolean[] = [true, false];
  public captcha: any;   // captcha
  public captcha_msg: string = '';

  public editAddress: boolean = false;
  public missingError: boolean = false;
  public serverError: boolean = false;

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
    this.userId = this.cookieService.get('userId');
    this.authToken = this.cookieService.get('authToken');

    // Fetch Checkout Items from CART and initialize checkout
    this.fetchCheckoutItems();
    this.setCheckoutData();
    this.fetchUserDetails();

    // set timeout of 5 seconds in case server doesn't respond 
    setTimeout(() => {
      if (!this.CheckoutItems || (this.CheckoutItems && !this.CheckoutItems.length))
        this.serverError = true;
    }, 5000)
  }


  // Fetch Checkout items
  public fetchCheckoutItems() {
    // get the CART items into checkout
    this.cartService.CartAndSavedItems$
      .subscribe((cartAndSavedItems) => {

        if (cartAndSavedItems && cartAndSavedItems.cartItems) {
          this.CheckoutItems = cartAndSavedItems.cartItems;
          // calculate total Price, count of cart items, etc. on CHECKOUT items.
          this.cartService.calculateTotal(this.CheckoutItems);
        }
        else {
          this.cartService.fetchCart(this.userId);
        }

      })
  }

  // Fetch User details
  public fetchUserDetails() {

    this.userService.getUserDetails(this.userId)
      .subscribe((apiResponse) => {
        console.log(apiResponse)
        if (apiResponse.status === 200) {
          let userDetails = apiResponse.data;
          this.CheckoutRelatedData.userName = userDetails.userName;
          this.CheckoutRelatedData.mobile = userDetails.mobile;
          this.CheckoutRelatedData.email = userDetails.email;
          this.CheckoutRelatedData.deliveryAddress = userDetails.addressList[0];

          // user details could be loaded now
          this.loadUserDetails = true;
        }
      })
  }


  /**
  * Initialize Checkout
  */
  public setCheckoutData() {

    // Get the Checkout Related Data
    this.cartService.initCart_data$.subscribe(
      (setCheckoutData) => {

        if (setCheckoutData) {
          this.CheckoutRelatedData = {
            totalPrice: setCheckoutData.totalPrice,
            deliveryFee: setCheckoutData.deliveryFee,
            totalPayable: setCheckoutData.totalPayable,
            totalSavings: setCheckoutData.totalSavings,
            countOfItems: setCheckoutData.countOfCartItems
          };
        }
      },

      (err) => console.log(err)
    );

  } // END setCheckoutData()


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

    for (let i = index + 1; i < 4; i++)
      this.View[i] = 'UNCHECKED';
  }


  public continueCheckout(index: number) {

    this.View[index] = 'CHECKED';

    if (index < 3) {
      this.View[index + 1] = 'CHANGE';
    }

  }

  public getCaptcha() {

    // generate Captcha
    this.paymentService.getOrVerifyCaptcha(this.userId, 'GET')
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.captcha = apiResponse.data;
          this.captcha_msg = "";
          document.getElementById('COD-captcha').innerHTML = this.captcha;
        }
        else {
          this.captcha_msg = apiResponse.message;
        }
      },
        (error) => {
          console.log(error)
          this.captcha_msg = 'Server seems to be down.';
        });
  }


  public verifyCaptcha() {
    if (!this.captcha) return;

    this.paymentService.getOrVerifyCaptcha(this.userId, 'VERIFY', this.captcha)
      .subscribe((apiResponse) => {
        console.log(apiResponse)
        if (apiResponse.status === 200) {
          // captcha verified
          // save checkout related data in browser history before navigation 
          this.router.navigate(['/orderresponse'], { state: { data: this.CheckoutRelatedData } })
        }
        else {
          // captcha not verified
          this.captcha_msg = apiResponse.message;
        }
      })
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
      case 'card':
        setFlags(0);
        break;

      case 'COD':
        setFlags(1);
        this.getCaptcha();
        break;
    }

  } // END selectPaymentMode()


  public goToPayment(paymentMode: string) {

    let productInfo = this.CheckoutItems[0].title;

    if (this.CheckoutItems.length > 1) {
      productInfo += ' and others...';
    }

    switch (paymentMode) {

      case 'card': {

        let nameArr = this.CheckoutRelatedData.userName.split(' ');

        let request_data: PayUMoneyParams = {

          amount: this.CheckoutRelatedData.totalPayable,
          productinfo: productInfo,
          firstname: nameArr[0],
          lastname: nameArr[1],
          email: this.CheckoutRelatedData.email,
          phone: this.CheckoutRelatedData.mobile
        };

        // check if user is online
        if (!navigator.onLine) {
          this.card_payment_msg = "You seem to be offline. Please check your internet connection.";
          return;
        }

        this.paymentService.makePaymentRequest_PayUMoney(request_data)
          .subscribe((response) => {
            console.log(response)
            if (response.status === 200) {
              // redirect to payment link
              location.href = response.data;
            }
            else {
              console.log(response.error)
              // couldn't load payment option
              this.card_payment_msg = 'Sorry!! Something went wrong.';
            }
          },
            (err) => {
              this.card_payment_msg = 'Server seems to be down.';
              console.log(err)
            })

        break;
      }

      case 'COD':
        break;

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

    if (this.userService.isAnyPropertyNull(address)) {
      this.missingError = true;
      return;
    }

    this.missingError = false;

    console.log(address)
    this.userService.saveUserAddress(this.userId, address)
      .subscribe((apiResponse) => {
        console.log(apiResponse)
        if (!apiResponse.error) {
          this.CheckoutRelatedData.deliveryAddress = address;
          this.continueCheckout(1);
        }
      })

  } // END saveAddressAndContinue()


  public logoutAndRedirect() {
    let authToken = this.cookieService.get('authToken');
    this.userService.logout(authToken)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.router.navigate['/logout'];
        }
        else {
          console.log(apiResponse)
        }
      },
        (error) => {
          /* let modal = this.modalService.getCustomMessageModal({
            header: 'Server seems to be down.',
            category: 'error'
          })
         if(modal) modal.openModalWithAutoClose(3000) */
        })
  }


}
