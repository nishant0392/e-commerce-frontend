import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  // data for initialization of Cart
  private initCart_data_Source = new BehaviorSubject<any>({});
  public initCart_data$ = this.initCart_data_Source.asObservable();

  private defaultDeliveryFee: number = 40;  // Default delivery fee fixed by Flipkart.


  public changeInitCart_data(data: {}) {
    this.initCart_data_Source.next(data);
  }

  /**
   * Calculate Delivery Fee for the Items provided.
   * @param Items Items to be calculated upon.
   * @param defaultDeliveryFee Default delivery fee fixed by Flipkart.
   */
  public calculateDeliveryFee(Items: any[], defaultDeliveryFee: number): number {

    let item, sellerId, deliveryFee, totalDeliveryFee = 0,
      itemsCostBySeller = {}, deliveryCostBySeller = {}, deliveryFee_cutOff_BySeller = {};

    for (let i = 0; i < Items.length; i++) {

      item = Items[i];
      sellerId = item.seller.id;
      deliveryFee = item.deliveryFee || defaultDeliveryFee;

      // calculate delivery cost for each seller
      if (deliveryCostBySeller[sellerId])
        deliveryCostBySeller[sellerId] += deliveryFee;
      else {
        deliveryCostBySeller[sellerId] = deliveryFee;
        deliveryFee_cutOff_BySeller[sellerId] = item.seller.deliveryFee_cutOff;
      }

      // calculate Items cost for each seller
      if (itemsCostBySeller[sellerId])
        itemsCostBySeller[sellerId] += item.price;
      else
        itemsCostBySeller[sellerId] = item.price;

    }

    // calculate total delivery fee
    for (let sellerId in itemsCostBySeller) {

      if (itemsCostBySeller[sellerId] >= deliveryFee_cutOff_BySeller[sellerId]) {
        deliveryCostBySeller[sellerId] = 0;
      }

      totalDeliveryFee += deliveryCostBySeller[sellerId];
    }

    return totalDeliveryFee;

  } // END calculateDeliveryFee()


  /**
   * Returns the total Price, count of Items, delivery Fee, total amount payable & Savings on the 
   * Items provided.
   * @param Items Items to be calculated upon.
   */
  public calculateTotal(Items: any[]) {

    let totalPrice = 0, totalSavings = 0, deliveryFee = 0, totalPayable = 0, countOfItems = 0;

    for (let i = 0; i < Items.length; i++) {
      let item = Items[i];
      totalPrice += item.price;
      totalSavings += (item.MRP - item.price);
      countOfItems += item.quantity;
    }

    deliveryFee = this.calculateDeliveryFee(Items, this.defaultDeliveryFee);
    totalPayable = totalPrice + deliveryFee;

    let result = {
      totalPrice: totalPrice,
      totalSavings: totalSavings,
      deliveryFee: deliveryFee,
      totalPayable: totalPayable,
      countOfItems: countOfItems
    };

    // Store the 'initCart' data
    this.changeInitCart_data(result);

  } // END calculateTotal()


} // END
