import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { $ } from 'protractor';

@Component({
  selector: 'mobileview-sidebar',
  templateUrl: './mobileview-sidebar.component.html',
  styleUrls: ['./mobileview-sidebar.component.css']
})
export class MobileviewSidebarComponent implements OnInit {

  @Input('buttonName') public sidebarButtonName: string = "";
  @Input('containerToHide') public containerToHideID: string = "";
  public showSidebar: boolean = false;
  public toggleSidebar: string = "hideSidebar";

  // Mechanism to detect whether click was inside or outside of the component
  private wasInside = false;
  
  @HostListener('click')
  clickedInside() {
    this.wasInside = true;
    console.log('***clicked inside***')
  }
  
  @HostListener('document:click')
  clickedOutside() {
    if (!this.wasInside) {
      this.removeAnimation();
    }
    this.wasInside = false;
    console.log('***clicked outside***')
  }

  constructor(private util: UtilityService) { }

  ngOnInit() {
  }


  public addAnimation() {
    // disable cursor for background div
    this.util.addOrRemoveClass(this.containerToHideID, 'disable-cursor', 'ADD');
    
    this.changeBackground('ADD');
    this.showSidebar = true;
    this.toggleSidebar = "displaySidebar";
  }

  public removeAnimation() {
    this.toggleSidebar = "hideSidebar";
    this.changeBackground('REMOVE');

    // enable cursor for background div
    this.util.addOrRemoveClass(this.containerToHideID, 'disable-cursor', 'REMOVE');
    this.util.addOrRemoveClass(this.containerToHideID, 'enable-cursor', 'ADD');

    setTimeout(() => this.showSidebar = false, 750)
  }

  public changeBackground(operation: string) {
    if (operation === 'ADD' || operation === 'REMOVE')
      this.util.addOrRemoveClass(this.containerToHideID, 'blur-background', operation);
  }

}
