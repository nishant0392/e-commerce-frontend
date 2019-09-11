import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannersComponent } from './banners/banners.component';
import { DisplayItemsComponent } from './display-items/display-items.component';

@NgModule({
  declarations: [
    AppComponent,
    BannersComponent,
    DisplayItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
