import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mobileview-sidebar',
  templateUrl: './mobileview-sidebar.component.html',
  styleUrls: ['./mobileview-sidebar.component.css']
})
export class MobileviewSidebarComponent implements OnInit {

  @Input('buttonName') public sidebarButtonName: string = "";
  public showSidebar: boolean = false;
  public toggleSidebar: string = "hideSidebar";

  constructor() { }

  ngOnInit() {
  }

  public addAnimation() {
    this.showSidebar = true;
    this.toggleSidebar = "displaySidebar";
  }

  public removeAnimation() {
    this.toggleSidebar = "hideSidebar";
    setTimeout(() => this.showSidebar = false, 750) 
  }

}
