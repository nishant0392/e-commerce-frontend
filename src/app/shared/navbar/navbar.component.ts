import { Component, OnInit, Input } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public toggle: boolean = false;
  public displayClass_cMenu: string = "disp-none";
  public displayClass_dvMenu: string = "disp-none";
  public windowWidth: number;
  public lastIndex_visible: number; // index of last visible item

  // Navbar type
  @Input('navbar') public navbar: string = 'MAIN_NAV';

  @Input('loggedIn') public loggedIn: boolean = false;
  @Input('userName') public userName: string = "My Account";

  // Nav items
  @Input('Items') public navItems: any[] = [];
  @Input('visible') public visibleItemsIndex: number[] = [];
  @Input('collapsible') public collapsibleItemsIndex: number[] = [];

  // count of cart items
  @Input() public countOfCartItems: number;

  constructor(private utilService: UtilityService) { 

    window.addEventListener('resize', this.utilService.debounce((event) => {
      this.initNavbar();
    }, 1000));
 
  }

  ngOnInit() {
    // initialize Navbar
    this.initNavbar();
  }

  removeResizeEventListener() {
    window.removeEventListener('resize', () => {
      console.log('Resize event listener removed!!')
    })
  }

  ngOnDestroy() {
    this.removeResizeEventListener();
  }


  initNavbar() {

    // --- Media Queries effect ---
    this.windowWidth = window.innerWidth;

    // Desktop View
    if (this.windowWidth > 1150)
      this.visibleItemsIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    else if (this.windowWidth > 1075 && this.windowWidth <= 1150)
      this.visibleItemsIndex = [0, 1, 2, 3, 4, 5, 6];

    else if (this.windowWidth > 880 && this.windowWidth <= 1075)
      this.visibleItemsIndex = [0, 1, 2, 3, 4, 5];

    // Tablet View
    else if (this.windowWidth > 700 && this.windowWidth <= 880)
      this.visibleItemsIndex = [0, 1, 2, 3, 4];

    else if (this.windowWidth > 560 && this.windowWidth <= 700)
      this.visibleItemsIndex = [0, 1, 2, 3];

    // Mobile View
    else
      this.visibleItemsIndex = [];


    // Adjust navbar 
    this.adjustNavbar();

  }


  /**
   * Utility function to adjust navbar (fills the collapsible menu according to visibleItemsIndex[] ).
   */
  adjustNavbar() {
    let len = this.visibleItemsIndex.length;

    if (len) {
      this.lastIndex_visible = this.visibleItemsIndex[len - 1];
      this.fillArray(this.collapsibleItemsIndex, this.lastIndex_visible + 1, this.navItems.length - 1);
    }

    else
      this.fillArray(this.collapsibleItemsIndex, 0, this.navItems.length - 1);
  }


  fillArray(arr, startValue, endValue) {

    let pos = 0;
    for (let i = startValue; i <= endValue; i++) {
      arr[pos++] = i;
    }

    // clear the remaining previously filled values
    arr.length = pos;
  }


  toggleMenu() {
    // toggle menu
    this.toggle = !this.toggle;

    // close menu
    if (!this.toggle) {
      this.displayClass_cMenu = "disp-none";
      this.displayClass_dvMenu = "disp-none";
    }

    // open menu
    else {
      this.displayClass_cMenu = "disp-b";
      this.displayClass_dvMenu = "disp-b";
    }
  }

}
