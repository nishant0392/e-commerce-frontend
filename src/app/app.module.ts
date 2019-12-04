// Modules here 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ProductsManagementModule } from './products-management/products-management.module';
import { UserManagementModule } from './user-management/user-management.module';
import { PaymentsManagementModule } from './payments-management/payments-management.module';
import { ViewModule } from './view/view.module';


// Components here
import { AppComponent } from './app.component';


// Services here
import { UserManagementService } from './services/user-management.service';
import { ProductManagementService } from './services/product-management.service';
import { DataProviderService } from './services/data-provider.service';



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
    HttpClientModule
  ],
  providers: [UserManagementService, ProductManagementService, DataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
