import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-message-modal',
  templateUrl: './custom-message-modal.component.html',
  styleUrls: ['./custom-message-modal.component.css']
})
export class CustomMessageModalComponent {

  @Input('header') public message_header: string = '';  // message header to display
  @Input('category') public category: string = "";    // category of message

  public icon_class: string = "disp-none";

  public addClass() {

    if (!this.category) return false;

    switch (this.category) {
      case 'success':
        this.icon_class = "fa fa-check-circle text-success";
        break;

      case 'error':
        this.icon_class = "fa fa-times-circle text-danger";
        break;

      case 'info':
        this.icon_class = "fa fa-exclamation-circle text-info";
        break;

      default: 
        this.icon_class = "disp-none";  
    }

    return this.icon_class;
  }
}
