import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserReviewsComponent } from './user-reviews/user-reviews.component';
import { LoginAndSignupComponent } from './login-and-signup/login-and-signup.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [UserReviewsComponent, LoginAndSignupComponent, LogoutComponent, NotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    UserReviewsComponent,
    LoginAndSignupComponent
  ]
})
export class UserManagementModule { }
