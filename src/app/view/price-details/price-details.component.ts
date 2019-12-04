import { Component, Input } from '@angular/core';

@Component({
  selector: 'price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.css']
})
export class PriceDetailsComponent {

  @Input() public countOfCartItems: number;
  @Input() public totalPrice: number;
  @Input() public deliveryFee: number;
  @Input() public totalSavings: number;

}
