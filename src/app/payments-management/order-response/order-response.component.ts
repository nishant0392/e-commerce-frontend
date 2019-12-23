import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-response',
  templateUrl: './order-response.component.html',
  styleUrls: ['./order-response.component.css']
})
export class OrderResponseComponent implements OnInit {

  public countOfItems: number = 1;
  public totalPrice: number = 422;
  public deliveryDate: Date = new Date();

  public recipient: string = "Nishant Kumar";
  public billingAddress: string = `D-28, P.C. COLONY, KANKARBAGH,
                                      Patna - 800020`;
  public mobileNo: number = 7204190121;

  constructor() { }

  ngOnInit() {
  }

}
