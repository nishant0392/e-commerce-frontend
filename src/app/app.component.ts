import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalService } from './services/modal.service';
import { UserManagementService } from './services/user-management.service';

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
  public message_header: string = "";
  public message_category: string = "default";

  constructor(
    private cartService: CartService,
    private modalService: ModalService,
    private userService: UserManagementService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    // initialize Navbar
    this.initNavbar();

    // subscribe to modal data
    this.modalService.customModal_data$
      .subscribe((modal_data) => {
        this.message_header = modal_data.header || "";
        this.message_category = modal_data.category;
      })
  }


  initNavbar() {
console.log('app ngOnInit()')
    let _userName = this.cookie.get('firstName') + ' ' + this.cookie.get('lastName');

    this.userId = this.cookie.get('userId');
    this.userName = (_userName == ' ') ? "My Account" : _userName;
    this.authToken = this.cookie.get('authToken');

    if (this.userId && this.authToken) {
      // switch main navbar to "loggedIn" state
      this.loggedIn = true;

      // fetch Cart Items and calculate count of cart items
      this.cartService.fetchCart(this.userId);
    }

    setTimeout(() => {
      // Subscribe for count of Cart Items
      this.cartService.countOfCartItems$
        .subscribe((countOfCartItems) => {
          if (typeof countOfCartItems === 'number')
            this.countOfCartItems = countOfCartItems;
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


  afterLogin() {
    this.initNavbar();
  }


  /**
   * Searches for the query.
   * @param {string} query Search query 
   */
  search(query) {
    console.log('Search Query:', query)
    return false;
  }



} // END
