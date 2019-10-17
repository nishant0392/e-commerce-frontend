/** -------   Modules here   ------- **/
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { Ng5SliderModule } from 'ng5-slider';


/** -------  Components here   ------- **/
import { DisplayProductComponent } from './display-product/display-product.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


@NgModule({
  declarations: [DisplayProductComponent, HomeComponent, ProductDetailsComponent],
  imports: [
    SharedModule,
    Ng5SliderModule
  ]
})
export class ProductsManagementModule { }
