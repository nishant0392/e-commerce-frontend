import { Component } from '@angular/core';

@Component({
  selector: 'delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent {

  public pincode: number;
  public isFocused: boolean = false;
  
  checkPincode() {
    console.log('pincode:', this.pincode)
    //if(this.pincode > 999999)
   // this.pincode = this.pincode.slice;

  }

}
