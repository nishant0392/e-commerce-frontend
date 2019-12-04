import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewModule } from '../view/view.module';

import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    ViewModule
  ],
  exports: [
    CheckoutComponent
  ]
})
export class PaymentsManagementModule { }
