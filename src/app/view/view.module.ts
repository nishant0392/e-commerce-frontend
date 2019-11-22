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

@NgModule({
  declarations: [
    GalleryViewComponent,
    BoxViewComponent,
    BulletsViewComponent,
    DeliveryComponent,
    SellerComponent,
    ViewPipe,
    ParagraphViewComponent
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
    ParagraphViewComponent
  ]
})
export class ViewModule { }
