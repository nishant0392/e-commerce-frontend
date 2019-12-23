import { Component, Input } from '@angular/core';

@Component({
  selector: 'select-address-box',
  templateUrl: './select-address-box.component.html',
  styleUrls: ['./select-address-box.component.css']
})
export class SelectAddressBoxComponent {

  @Input('Addresses') public savedAddresses: any[] = [];

  public selectedAddress: any;

  public showIt: boolean = false;

  ngOnInit() {
    this.selectedAddress = this.savedAddresses.length ? this.savedAddresses[0] : {};
  }

  public selectOption(address) {
    this.selectedAddress = address;
    this.showIt = false;
  }

}
