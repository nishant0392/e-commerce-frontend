import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';
import { LoginAndSignupComponent } from './login-and-signup/login-and-signup.component';

@NgModule({
  declarations: [UserReviewsComponent, LoginAndSignupComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UserReviewsComponent,
    LoginAndSignupComponent
  ]
})
export class UserManagementModule { }
