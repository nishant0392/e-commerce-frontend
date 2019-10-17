import { Component, OnInit } from '@angular/core';
import { UserManagementService } from './services/user-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isMobNoValid: boolean = false;
  public errorMsg_Mobno: boolean = false;

  constructor(private userService: UserManagementService) {

  }
  

  /**
   * This OTP is incorrect. You have 9 attempt(s) left.

   */

  ngOnInit() {}

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
