import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  public pincode: number;

  constructor() { }

  ngOnInit() {
  }
  
  checkPincode() {
    console.log('pincode:', this.pincode)
    //if(this.pincode > 999999)
   // this.pincode = this.pincode.slice;

  }

}
