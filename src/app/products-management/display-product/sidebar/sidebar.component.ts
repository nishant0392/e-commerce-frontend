import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // Product configuration
  public category: string;
  public sub_categories: string[];

  // Item Properties
  @Input() public propertiesList: any[];
  @Input() public ItemFilterProperties: any;

  // Miscellaneous
  public chev_left_arrow = "fas fa-chevron-left icon-chevron-left";
  public chev_down_arrow = "fas fa-chevron-down icon-chevron-down";
  public chev_up_arrow = "fas fa-chevron-up icon-chevron-up";
  public chev_arrow: string;
  public chev_arrow_show: string;
  public isCollapsed: boolean = true;
  public show: boolean[];

  // Range Slider configuration
  public minValue: number = 50;
  public maxValue: number = 750;
  public options: Options = {
    floor: 0,
    ceil: 1000
  };

  constructor() {

    this.category = 'Mobiles & Accessories';
    this.sub_categories = [
      'Mobiles',
      'Tablets',
      'Mobile Accessories'
    ];
   
  }

  ngOnInit() {
    this.chev_arrow = this.chev_left_arrow;
    this.chev_arrow_show = this.chev_down_arrow;

    this.show = [];

    // Set 'show' flags to false (for collapsed version)
    for (let i = 0; i < 10; i++) {
      this.show[i] = false;
    }

    // Set selected 'show' flags to true (for expanded version)
    this.fillSelected([0, 2]);
    console.log(this.show)

  }


  // fill show array with true at selected positions
  fillSelected(arr) {
    for (let i = 0; i < arr.length; i++)
      this.show[arr[i]] = true;
  }


  toggleCategories() {
    if (this.isCollapsed)
      this.chev_arrow = this.chev_down_arrow;

    else
      this.chev_arrow = this.chev_left_arrow;

    this.isCollapsed = !this.isCollapsed;
  }

  toggleCollapse(indexOfSection) {
    if (this.show[indexOfSection])
      this.chev_arrow_show = this.chev_up_arrow;

    else
      this.chev_arrow_show = this.chev_down_arrow;

    this.show[indexOfSection] = !this.show[indexOfSection];
  }

  oggleCollapse(indexOfSection) {
    if (this.show[indexOfSection])
      this.chev_arrow_show = this.chev_up_arrow;

    else
      this.chev_arrow_show = this.chev_down_arrow;

    this.show[indexOfSection] = !this.show[indexOfSection];
  }

}
