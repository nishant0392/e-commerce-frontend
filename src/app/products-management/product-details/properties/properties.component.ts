import { Component, Input } from '@angular/core';

@Component({
  selector: 'properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {

    /***  Placeholder for properties of the Item (each could have a different view)  ***/ 

    @Input() public item_properties = {};         // properties of the item
    @Input() public listOfProperties: string[];  // order of properties to be displayed in the View
  
    // View options
    @Input() public options_galleryView = {};
    @Input() public options_boxView = {};
    @Input() public options_bulletsView = {};
  

    /**
     * Adds custom width to each 'property' div based on the View.
     * @param viewType Type of View
     */
    public addCustomWidth(viewType: string) {
  
      switch(viewType) {
        
        case 'DELIVERYVIEW': {
          return 'custom-width';
        }
  
        case 'SELLERVIEW': {
          return 'custom-width-100';
        }
  
        case 'PARAGRAPHVIEW': {
          return 'custom-width-100';
        }
  
      }
    }

}
