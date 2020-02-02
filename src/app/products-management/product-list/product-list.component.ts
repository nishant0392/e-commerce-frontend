import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductManagementService } from 'src/app/services/product-management.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // Product Items
  public Items: any[];
  public countOfItems: number;

  // Product configuration (for sidebar)
  public category: string;
  public subcategory: string;
  public sub_categories: string[];
  public propertiesList: any[];
  public ItemFilterProperties: any;

  // List ID
  public listId: string = "";

  // Pagination 
  public selectedPage: number = 1;
  public countOfPages: number;
  public counterForPages: number[];
  public countOfItemsPerPage: number;
  public counterForItems: number[];
  public counterForItemsPerPage: number[];
  public firstItemOfPage: number;
  public lastItemOfPage: number;

  // Others
  public compareBtnClicked: boolean = false;
  public loadItems: boolean = false;

  constructor(private productService: ProductManagementService,
    private activatedRoute: ActivatedRoute) {

    // extract listId from url
    this.activatedRoute.queryParams
      .subscribe((queryParams) => {
        this.listId = queryParams.lid;
      })

  }


  ngOnInit() {
    // fetch product items from server
    this.fetchProductItems();

    this.sub_categories = [
      'Mobiles',
      'Tablets',
      'Mobile Accessories'
    ];

    this.propertiesList = [
      {
        property: 'AVAILABILITY',
        show: true
      },
      {
        property: 'RAM',
        show: true
      },
      {
        property: 'BRAND',
        show: false
      },
      {
        property: 'CUSTOMER RATINGS',
        show: true
      }
    ];

    this.ItemFilterProperties = {
      'AVAILABILITY': ['Exclude out of stock'],
      'RAM': ['6 GB & Above', '4 GB', '3 GB', '2 GB', '1 GB'],
      'BRAND': ['Mi', 'RealMe', 'Samsung', 'Oppo', 'Apple'],
      'CUSTOMER RATINGS': []
    };
  }


  public fetchProductItems() {
    this.productService.getItems(this.listId)
      .subscribe((apiResponse) => {
        if (apiResponse.status === 200) {
          this.initializeItems(apiResponse.data);
          this.loadItems = true;
        }
      })
  }

  public initializeItems(data: { category: string, subcategory: string, items: any[] }) {

    this.Items = data.items;
    this.category = data.category;
    this.subcategory = data.subcategory;

    // Set count for no. of items to display per page
    this.countOfItemsPerPage = 5;

    this.countOfItems = this.Items.length;
    this.countOfPages = Math.ceil(this.countOfItems / this.countOfItemsPerPage);

    // prepare counterForPages
    // create an array [1,2,...,countOfItemsPerPage] for Items per page
    this.counterForPages = <Array<number>>Array(this.countOfPages).fill(0).map((val, idx) => idx + 1);

    this.displayItems(5);
  }


  /**
     *  Display items using Pagination
     *  @params {number}
     *  countOfItemsPerPage - No. of items to display on each page
     */
  displayItems(countOfItemsPerPage: number) {

    // create an array [0,1,2,...,countOfItemsPerPage-1] for Items per page
    this.counterForItemsPerPage = <Array<number>>Array(countOfItemsPerPage).fill(0).map((val, idx) => idx);

    // update the first item and last item
    this.firstItemOfPage = this.counterForItemsPerPage[0] + 1;
    this.lastItemOfPage = this.counterForItemsPerPage[this.counterForItemsPerPage.length - 1] + 1;
  }


  /**
   * Navigates to product details page.
   * @param indexOfSelectedItem Index of the selected Item.
   */
  goToProductDetails(indexOfSelectedItem) {

    if (this.compareBtnClicked) this.compareBtnClicked = false;

    else {
      // proceed if compare button is not clicked
      let product = this.Items[indexOfSelectedItem];

      window.open(`/${product.urlTitle}/p/${product.pid}?lid=${this.listId}`, '_blank')
    }
  }


  /* **** Pagination functions **** */

  goToSelectedPage(pageNum) {
    this.selectedPage = pageNum;
    this.fillCounterForPagination();
  }


  goToPrevPage() {
    this.selectedPage--;
    this.fillCounterForPagination();
  }


  goToNextPage() {
    this.selectedPage++;
    this.fillCounterForPagination();
  }


  fillCounterForPagination() {

    /* if it's not the last page
       update the array to [countOfItemsPerPage * (selectedPage-1),...] for Items per page */
    if (this.selectedPage < this.countOfPages) {
      let initialCount = this.countOfItemsPerPage * (this.selectedPage - 1);
      for (let i = 0; i < this.countOfItemsPerPage; i++) {
        this.counterForItemsPerPage[i] = initialCount + i;
      }
    }

    // if it's the last page
    if (this.selectedPage === this.countOfPages) {

      let initialCountLast = this.countOfItemsPerPage * (this.selectedPage - 1);
      let newLen = this.countOfItems - initialCountLast;
      this.counterForItemsPerPage.length = (newLen > 0) ? newLen : 0;

      for (let i = initialCountLast, j = 0; i < this.countOfItems; i++) {
        this.counterForItemsPerPage[j++] = i;
      }

    }

    // update the first item and last item
    this.firstItemOfPage = this.counterForItemsPerPage[0] + 1;
    this.lastItemOfPage = this.counterForItemsPerPage[this.counterForItemsPerPage.length - 1] + 1;

  } // END fillCounterForPagination()

}
