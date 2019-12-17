import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewModule } from '../view/view.module';
import { ProductsManagementModule } from '../products-management/products-management.module';
import { RouterModule } from '@angular/router';

import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    ViewModule,
    ProductsManagementModule,
    RouterModule
  ],
  exports: [
    CheckoutComponent
  ]
})
export class PaymentsManagementModule { }
