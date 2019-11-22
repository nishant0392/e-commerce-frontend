import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewType'
})
export class ViewPipe implements PipeTransform {

  /**
   * View associated with each of the Properties any product ITEM could have.
   */
  private propertiesWithView: Object = {
    'Color': 'GALLERYVIEW',
    'Storage': 'BOXVIEW',
    'RAM': 'BOXVIEW',
    'Delivery': 'DELIVERYVIEW',
    'Highlights': 'BULLETSVIEW',
    'Easy Payment Options': 'BULLETSVIEW',
    'Seller': 'SELLERVIEW',
    'Description': 'PARAGRAPHVIEW'
  };


  /**
   * Pipe which outputs the type of View associated with the property.
   * @param property Property of the Item
   */
  transform(property: string): string {

    if (property)
      return this.propertiesWithView[property];

    return 'DEFAULTVIEW';
  }

}
