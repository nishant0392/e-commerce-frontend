import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-response',
  templateUrl: './order-response.component.html',
  styleUrls: ['./order-response.component.css']
})
export class OrderResponseComponent implements OnInit {

  public deliveryDate: Date = new Date();
  public postCheckoutData;

  ngOnInit() {
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 1);

    this.postCheckoutData = history.state.data;

    if (this.postCheckoutData)
      sessionStorage.setItem('postCheckoutData', JSON.stringify(this.postCheckoutData));
    else
      this.postCheckoutData = JSON.parse(sessionStorage.getItem('postCheckoutData'));
  }

}
