import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public countOfCartItems: number = 0;

  // Secondary Navbar 
  public navItems: any[] = [];

  constructor(private cartService: CartService) { }

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
   * Searches for the query.
   * @param {string} query Search query 
   */
  search(query) {
    console.log('Search Query:', query)
    return false;
    // this.router.navigate(['/assets/images/Nishant.JPG'])
  }

  

} // END
