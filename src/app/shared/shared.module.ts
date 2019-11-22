// Modules here
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


// Components here
import { BannersComponent } from './banners/banners.component';
import { DisplayItemsComponent } from './display-items/display-items.component';
import { MediumBannersComponent } from './medium-banners/medium-banners.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RatingCircleComponent } from './rating/rating-circle/rating-circle.component';
import { RatingBarComponent } from './rating/rating-bar/rating-bar.component';


@NgModule({
  declarations: [
    BannersComponent,
    DisplayItemsComponent,
    MediumBannersComponent,
    CarouselComponent,
    RatingCircleComponent,
    RatingBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BannersComponent,
    DisplayItemsComponent,
    MediumBannersComponent,
    CarouselComponent,
    RatingCircleComponent,
    RatingBarComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
