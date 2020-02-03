import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalService } from './services/modal.service';
import { UserManagementService } from './services/user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Main Navbar
  public loggedIn: boolean = false;
  public countOfCartItems: number = 0;

  // Secondary Navbar 
  public navItems: any[] = [];

  // Auth Details
  public userId: string;
  public userName: string = "My Account";  // in case, userName is empty
  public authToken: string;

  // Custom message Modal 
  public message_header: string = "Some Unknown Error";
  public message_category: string = "default";
  public serviceType: string = "open_with_auto_close";
  public message_duration: number = 3000;

  constructor(
    private cartService: CartService,
    private modalService: ModalService,
    private userService: UserManagementService,
    private router: Router,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    // initialize Navbar
    this.initNavbar();

    // subscribe to modal data
    this.modalService.customModal_data$
      .subscribe((modal_data) => {

        if (modal_data) {
          // initialize the modal with data received
          this.serviceType = modal_data.serviceType || this.serviceType;
          this.message_header = modal_data.header || this.message_header;
          this.message_category = modal_data.category || this.message_category;
          this.message_duration = modal_data.message_duration || this.message_duration;

          // trigger the modal
          this.modalService.customModalService(this.serviceType, { display_duration: this.message_duration });
        }

      })
  }


  initNavbar() {

    let doAuthorization = () => {

      let _userName = this.cookie.get('firstName') + ' ' + this.cookie.get('lastName');
      this.userName = (_userName == ' ' || _userName == 'Flipkart Customer') ? "My Account" : _userName;

      this.userId = this.cookie.get('userId');
      this.authToken = this.cookie.get('authToken');

      if (this.userId && this.authToken) {
        // switch main navbar to "loggedIn" state
        this.loggedIn = true;

        // fetch Cart Items and calculate count of cart items
        this.cartService.fetchCart(this.userId); 
      }

    }

    doAuthorization();

    // subscribe to get count of cart items
    this.cartService.countOfCartItems$
      .subscribe((countOfCartItems) => {
        setTimeout(() => {
          if (countOfCartItems) this.countOfCartItems = countOfCartItems;
        })
      })

    // Secondary Navbar Initialization
    this.navItems = [
      { name: 'Electronics', type: 'dropdown' }, { name: 'TVs & Appliances', type: 'dropdown' },
      { name: 'Men', type: 'dropdown' }, { name: 'Women', type: 'dropdown' },
      { name: 'Baby & Kids', type: 'dropdown' }, { name: 'Home & Furniture', type: 'dropdown' },
      { name: 'Sports, Books & More', type: 'dropdown' }, { name: 'Grocery', type: 'link' },
      { name: 'Offer Zone', type: 'link' }
    ];

    // open login modal at startup if not already logged in
    if (!this.loggedIn && (document.URL === document.baseURI))
      this.userService.initializeModal().openLogin();
  }


  goToCart() {
     // Check if user is logged in. If no, proceed to login.
     if (!this.userService.isLoggedIn()) {
      this.userService.initializeModal().openLogin();
    }

    // If yes, proceed to CART
    else 
      this.router.navigate(['/view-cart'])
  }


  /**
   * Searches for the query.
   * @param {string} query Search query 
   */
  search(query: string) {
    console.log('Search Query:', query)
    return false;
  }

} // END
