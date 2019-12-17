import { Component, Output, EventEmitter, Input } from '@angular/core';

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


  /*
  public removeItemFromCart(indexOfItem: number, cartType?: string) {

    if (cartType === 'savedForLater') {

      this.countOfSavedForLaterItems -= this.SavedForLaterItems[indexOfItem].quantity;

      this.SavedForLaterItems = this.SavedForLaterItems.filter(
        (currentValue, index) => {
          return (indexOfItem !== index);
        });
    }

    else {
      let cartItem = this.CartItems[indexOfItem];

      // Do the Maths
      this.totalPrice = this.totalPrice - (cartItem.quantity * cartItem.price);
      this.totalSavings = this.totalSavings - (cartItem.quantity * (cartItem.MRP - cartItem.price));
      this.countOfCartItems = this.countOfCartItems - cartItem.quantity;

      this.CartItems = this.CartItems.filter(
        (currentValue, index) => {
          return (indexOfItem !== index);
        });

      console.log('cart items:', this.CartItems)
    }
  } */

}