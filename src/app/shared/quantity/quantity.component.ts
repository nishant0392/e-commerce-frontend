import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent {

  @Input('inputQuantity') public quantity: number = 1;

  @Output('quantity') public quantityChange = new EventEmitter<number>();
  @Input('readOnly') public readOnlyVersion: boolean = false;

  public changeQuantity(action: string) {

    if(action === 'increase') {
      this.quantity = this.quantity + 1;
    }

    else if(action === 'decrease' && this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }

    else return;

    this.quantityChange.emit(this.quantity);
  }


  public addStyle() {
    if(this.quantity < 2) {
      return {
        'opacity': 0.4,
        'cursor': 'text'
      }
    }
  }
  
}
