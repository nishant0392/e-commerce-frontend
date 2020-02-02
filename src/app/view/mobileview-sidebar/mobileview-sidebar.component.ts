import { Component, Input, HostListener } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'mobileview-sidebar',
  templateUrl: './mobileview-sidebar.component.html',
  styleUrls: ['./mobileview-sidebar.component.css']
})
export class MobileviewSidebarComponent {

  @Input('buttonName') public sidebarButtonName: string = "";
  @Input('containerToHide') public containerToHideID: string = "";
  public showSidebar: boolean = false;
  public toggleSidebar: string = "hideSidebar";

  // Mechanism to detect whether click was inside or outside of the component
  private wasInside = false;

  @HostListener('click')
  clickedInside() {
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickedOutside() {
    if (!this.wasInside) {
      this.removeAnimation();
    }
    this.wasInside = false;
  }

  constructor(private util: UtilityService) { }


  // Add animation to sidebar
  public addAnimation() {

    // disable cursor for background div
    this.util.addRemoveReplaceClass(this.containerToHideID, 'enable-cursor', 'REMOVE'); // remove if any
    this.util.addRemoveReplaceClass(this.containerToHideID, 'disable-cursor', 'ADD');

    // blur the background
    this.util.addRemoveReplaceClass(this.containerToHideID, 'blur-background', 'ADD');

    this.showSidebar = true;
    this.toggleSidebar = "displaySidebar";
  }


  // Remove animation from sidebar
  public removeAnimation() {
    this.toggleSidebar = "hideSidebar";

    // remove blur from background
    this.util.addRemoveReplaceClass(this.containerToHideID, 'blur-background', 'REMOVE');

    // enable cursor for background div after a small delay so that first click removes animation only
    // and not click the background div simultaneously
    setTimeout(() => {
      this.util.addRemoveReplaceClass(this.containerToHideID, 'disable-cursor', 'REPLACE', 'enable-cursor');
    }, 500)
   
    setTimeout(() => this.showSidebar = false, 750)
  }

}
