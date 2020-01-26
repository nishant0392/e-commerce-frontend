// Modules here
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components here
import { BannersComponent } from './banners/banners.component';
import { DisplayItemsComponent } from './display-items/display-items.component';
import { MediumBannersComponent } from './medium-banners/medium-banners.component';
import { CarouselComponent } from './carousel/carousel.component';
import { RatingCircleComponent } from './rating/rating-circle/rating-circle.component';
import { RatingBarComponent } from './rating/rating-bar/rating-bar.component';
import { RatingStarComponent } from './rating/rating-star/rating-star.component';
import { QuantityComponent } from './quantity/quantity.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NavMenusComponent } from './navbar/nav-menus/nav-menus.component';
import { CustomMessageModalComponent } from './modal/custom-message-modal/custom-message-modal.component';


@NgModule({
  declarations: [
    BannersComponent,
    DisplayItemsComponent,
    MediumBannersComponent,
    CarouselComponent,
    RatingCircleComponent,
    RatingBarComponent,
    RatingStarComponent,
    QuantityComponent,
    NavbarComponent,
    FooterComponent,
    NavMenusComponent,
    CustomMessageModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BannersComponent,
    DisplayItemsComponent,
    MediumBannersComponent,
    CarouselComponent,
    RatingCircleComponent,
    RatingBarComponent,
    RatingStarComponent,
    QuantityComponent,
    NavbarComponent,
    FooterComponent,
    CustomMessageModalComponent,
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule { }
