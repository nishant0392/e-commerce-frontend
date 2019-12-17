import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ViewPipe } from './view.pipe';

import { GalleryViewComponent } from './gallery-view/gallery-view.component';
import { BoxViewComponent } from './box-view/box-view.component';
import { BulletsViewComponent } from './bullets-view/bullets-view.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { SellerComponent } from './seller/seller.component';
import { ParagraphViewComponent } from './paragraph-view/paragraph-view.component';
import { StarRatingViewComponent } from './star-rating-view/star-rating-view.component';
import { PriceDetailsComponent } from './price-details/price-details.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { InputButtonComponent } from './input-button/input-button.component';

@NgModule({
  declarations: [
    GalleryViewComponent,
    BoxViewComponent,
    BulletsViewComponent,
    DeliveryComponent,
    SellerComponent,
    ViewPipe,
    ParagraphViewComponent,
    StarRatingViewComponent,
    PriceDetailsComponent,
    RadioButtonComponent,
    InputButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GalleryViewComponent,
    BoxViewComponent,
    BulletsViewComponent,
    DeliveryComponent,
    SellerComponent,
    ViewPipe,
    ParagraphViewComponent,
    StarRatingViewComponent,
    PriceDetailsComponent,
    RadioButtonComponent,
    InputButtonComponent
  ]
})
export class ViewModule { }
