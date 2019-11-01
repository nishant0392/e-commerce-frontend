import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './products-management/home/home.component';
import { DisplayProductComponent } from './products-management/display-product/display-product.component';
import { ProductDetailsComponent } from './products-management/product-details/product-details.component';
import { CarouselComponent } from './shared/carousel/carousel.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: ':product_category/:product_brand', component: DisplayProductComponent, pathMatch: 'full' },
  { path: ':product_name/p/:pid', component: ProductDetailsComponent, pathMatch: 'full' },
  { path: '*', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
