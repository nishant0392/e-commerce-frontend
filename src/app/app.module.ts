// Modules here 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ProductsManagementModule } from './products-management/products-management.module';


// Components here
import { AppComponent } from './app.component';


// Services here
import { UserManagementService } from './services/user-management.service';
import { ProductManagementService } from './services/product-management.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsManagementModule,
    HttpClientModule
  ],
  providers: [UserManagementService, ProductManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
