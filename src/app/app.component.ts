import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './services/user-management.service';
import { Router } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isMobNoValid: boolean = false;
  public errorMsg_Mobno: boolean = false;

  public countOfCartItems: number = 0;

  // Secondary Navbar 
  public navItems: any[] = [];

  constructor(private userService: UserManagementService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.initCountOfCartItems();
    
    this.navItems = [
      { name: 'Electronics', type: 'dropdown' }, { name: 'TVs & Appliances', type: 'dropdown' },
      { name: 'Men', type: 'dropdown' }, { name: 'Women', type: 'dropdown' },
      { name: 'Baby & Kids', type: 'dropdown' }, { name: 'Home & Furniture', type: 'dropdown' },
      { name: 'Sports, Books & More', type: 'dropdown' }, { name: 'Grocery', type: 'link' },
      { name: 'Offer Zone', type: 'link' }
    ];
  }


  initCountOfCartItems() {
    // get Count of Cart Items
    this.countOfCartItems = 2;

    setTimeout(() => {
      // Subscribe for count of Cart Items
      this.cartService.countOfCartItems$
        .subscribe((countOfCartItems) => {
          if (typeof countOfCartItems === 'number')
            this.countOfCartItems = countOfCartItems;
        })
    })
  }

  /**
   * This OTP is incorrect. You have 9 attempt(s) left.

   */



  /**
   * Searches for the query.
   * @param {string} query Search query 
   */
  search(query) {
    console.log('Search Query:', query)
    return false;
    // this.router.navigate(['/assets/images/Nishant.JPG'])
  }

  verifyMobileNo(mobileNo: number) {

    let response = this.userService.verifyAndSendSMS(mobileNo, 'USERMV');

    if (response === false) {
      this.errorMsg_Mobno = true;
    }

    else {
      this.isMobNoValid = true;
      this.errorMsg_Mobno = false;

      response.subscribe((apiResponse: any) => {
        console.log('apiResponse:', apiResponse)
        if (apiResponse.error) {
          this.errorMsg_Mobno = true;
        }
        else {
          //
        }
      })
    }

  }

  /* Adds red border at bottom */
  addRedBorder() {
    if (this.errorMsg_Mobno) {
      return {
        'border-bottom-color': 'indianred'
      };
    }
  }

}
