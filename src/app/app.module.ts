// Modules here 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ProductsManagementModule } from './products-management/products-management.module';


// Components here
import { AppComponent } from './app.component';


// Services here
import { ProductManagementService } from './services/product-management.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsManagementModule
  ],
  providers: [ProductManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
