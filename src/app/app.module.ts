// Modules here 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ProductsManagementModule } from './products-management/products-management.module';
import { UserManagementModule } from './user-management/user-management.module';
import { PaymentsManagementModule } from './payments-management/payments-management.module';
import { ViewModule } from './view/view.module';
import { SharedModule } from './shared/shared.module';


// Components here
import { AppComponent } from './app.component';


// Services here
import { UserManagementService } from './services/user-management.service';
import { ProductManagementService } from './services/product-management.service'
import { CartService } from './services/cart.service';
import { WebComponentsService } from './services/web-components.service';
import { PaymentService } from './services/payment.service';
import { UtilityService } from './services/utility.service';
import { ModalService } from './services/modal.service';
import { CookieService } from 'ngx-cookie-service';
import { httpInterceptProviders } from './http-interceptors';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsManagementModule,
    UserManagementModule,
    PaymentsManagementModule,
    ViewModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    UserManagementService,
    ProductManagementService,
    CartService,
    WebComponentsService,
    PaymentService,
    UtilityService,
    ModalService,
    CookieService,
    httpInterceptProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
