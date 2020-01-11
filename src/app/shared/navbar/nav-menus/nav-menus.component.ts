import { Component, OnInit, Input } from '@angular/core';

// Importing Navigation MENUs
import electronics_Menu from '../../../../assets/json/menus/electronics.json';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menus.component.html',
  styleUrls: ['./nav-menus.component.css']
})
export class NavMenusComponent implements OnInit {

  @Input('menu') public menuTitle: string;

  // Navigation MENUs
  public Electronics;
  public TVs_and_Appliances;
  public Men;
  public Women;
  public Baby_and_Kids;
  public Home_and_Furniture;
  public Sports_Books_and_More;


  ngOnInit() {
    this.Electronics = electronics_Menu;
  }

}
