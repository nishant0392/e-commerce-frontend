import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './products-management/home/home.component';
import { ProductListComponent } from './products-management/product-list/product-list.component';
import { ProductDetailsComponent } from './products-management/product-details/product-details.component';
import { GetUserRatingsAndReviewsComponent } from './products-management/product-details/get-user-ratings-and-reviews/get-user-ratings-and-reviews.component';
import { UserReviewsComponent } from './user-management/user-reviews/user-reviews.component';
import { ViewCartComponent } from './products-management/view-cart/view-cart.component';
import { CheckoutComponent } from './payments-management/checkout/checkout.component';
import { OrderResponseComponent } from './payments-management/order-response/order-response.component';
import { NotFoundComponent } from './user-management/not-found/not-found.component';
import { LogoutComponent } from './user-management/logout/logout.component';
import { DocumentationComponent } from './user-management/documentation/documentation.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'checkout/init', component: CheckoutComponent },
  { path: ':product_category/:product_brand/pr', component: ProductListComponent, pathMatch: 'full' },
  { path: ':product_name/p/:pid', component: ProductDetailsComponent, pathMatch: 'full' },
  { path: ':product_name/write-review/:pid', component: GetUserRatingsAndReviewsComponent },
  { path: ':product_name/product-reviews/:pid', component: GetUserRatingsAndReviewsComponent },
  { path: 'review-purchases', component: UserReviewsComponent },
  { path: 'view-cart', component: ViewCartComponent },
  { path: 'orderresponse', component: OrderResponseComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
