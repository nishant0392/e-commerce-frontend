import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent {

  @Input() public CartItems: any[];
  @Input() public SavedForLaterItems: any[];

  @Input() public saveForLaterOption: boolean = true;

  @Output('OutputData') public outputEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) { }

  /**
   * Sends Data to parent component like operation, index of cart item and/or quantity.
   * @param operation Operation to perform on the corresponding Cart Item ('UPDATE_QUANTITY', 'SAVE_FOR_LATER', 'REMOVE', 'MOVE_TO_CART').
   * @param indexOfItem Index of the corresponding Cart Item.
   * @param quantity Updated quantity of the corresponding Cart Item.
   * @param cartType Cart type: 'CART' or 'SAVED_FOR_LATER'.
   */
  public sendData(operation: string, indexOfItem: number, cartType: string, quantity?: number) {

    let emitData: any = {
      operation: operation,
      indexOfItem: indexOfItem,
      cartType: cartType
    };

    if (operation === 'UPDATE_QUANTITY')
      emitData.quantity = quantity;

    // emit data to parent
    this.outputEvent.emit(emitData);
  }

  
  public goToProductDetails(urlTitle: string, productId: string) {

    let url = `/${urlTitle}/p/${productId}`;
    
    this.router.navigate([url])

  }


}