import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';

@NgModule({
  declarations: [UserReviewsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UserReviewsComponent
  ]
})
export class UserManagementModule { }
