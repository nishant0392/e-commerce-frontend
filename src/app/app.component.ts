import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private cartService: CartService, private cookie: CookieService) { }

  ngOnInit() {
    this.initNavbar();
  }


  initNavbar() {

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
    // this.router.navigate(['/assets/images/Nishant.JPG'])
  }



} // END
