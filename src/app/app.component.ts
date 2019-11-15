import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './services/user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isMobNoValid: boolean = false;
  public errorMsg_Mobno: boolean = false;

  constructor(private userService: UserManagementService,
    private router: Router) {

  }
  

  /**
   * This OTP is incorrect. You have 9 attempt(s) left.

   */

  ngOnInit() {}

  /**
   * Searches for the query.
   * @param {string} query Search query 
   */
  search(query) {
    console.log('Search Query:', query)
    return false;
    this.router.navigate(['/assets/images/Nishant.JPG'])
  }

  verifyMobileNo(mobileNo: number) {

    let response = this.userService.verifyAndSendSMS(mobileNo, 'USERMV');

    if(response === false) {
      this.errorMsg_Mobno = true;
    }

    else {
      this.isMobNoValid = true;
      this.errorMsg_Mobno = false;

      response.subscribe((apiResponse: any) => {
        console.log('apiResponse:', apiResponse)
        if(apiResponse.error) {
          this.errorMsg_Mobno = true;
        }
        else {
          //
        }
      })
    }

  }

  /* Adds red border at bottom */
  addRedBorder() {
    if(this.errorMsg_Mobno) {
      return {
         'border-bottom-color': 'indianred'
      };
    }
  }

}
