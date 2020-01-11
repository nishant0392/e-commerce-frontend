import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';

@Component({
  selector: 'login-and-signup',
  templateUrl: './login-and-signup.component.html',
  styleUrls: ['./login-and-signup.component.css']
})
export class LoginAndSignupComponent implements OnInit {

  public isMobNoValid: boolean = false;
  public errorMsg_Mobno: boolean = false;

  constructor(private userService: UserManagementService) { }

  ngOnInit() {
  }

  /**
   * This OTP is incorrect. You have 9 attempt(s) left.

   */

   
  /**
   * Verify Mobile number through OTP to the given mobile number.
   * @param mobileNo mobile number to verify
   */
  verifyMobileNo(mobileNo: number) {

    let response = this.userService.verifyAndSendSMS(mobileNo, 'USERMV');

    if (response === false) {
      this.errorMsg_Mobno = true;
    }

    else {
      this.isMobNoValid = true;
      this.errorMsg_Mobno = false;

      response.subscribe((apiResponse: any) => {
        console.log('apiResponse:', apiResponse)
        if (apiResponse.error) {
          this.errorMsg_Mobno = true;
        }
        else {
          //
        }
      })
    }

  } // END verifyMobileNo()


   /* Adds red border at bottom */
   addRedBorder() {
    if (this.errorMsg_Mobno) {
      return {
        'border-bottom-color': 'indianred'
      };
    }
  }

}
