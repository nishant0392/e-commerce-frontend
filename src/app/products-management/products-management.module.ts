/** -------   Modules here   ------- **/
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { Ng5SliderModule } from 'ng5-slider';
import { ViewModule } from '../view/view.module';


/** -------  Components here   ------- **/
import { DisplayProductComponent } from './display-product/display-product.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details/product-details.component';
import { PropertiesComponent } from './product-details/properties/properties.component';
import { SpecificationsComponent } from './product-details/specifications/specifications.component';
import { RatingsAndReviewsComponent } from './product-details/ratings-and-reviews/ratings-and-reviews.component';
import { GetUserRatingsAndReviewsComponent } from './product-details/get-user-ratings-and-reviews/get-user-ratings-and-reviews.component';
import { ViewCartComponent } from './view-cart/view-cart.component';


@NgModule({
  declarations: [DisplayProductComponent, HomeComponent, ProductDetailsComponent, PropertiesComponent, SpecificationsComponent, RatingsAndReviewsComponent, GetUserRatingsAndReviewsComponent, ViewCartComponent],
  imports: [
    SharedModule,
    Ng5SliderModule,
    ViewModule
  ]
})
export class ProductsManagementModule { }
