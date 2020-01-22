import { Component, AfterViewInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';

declare var $: any;

@Component({
  selector: 'login-and-signup',
  templateUrl: './login-and-signup.component.html',
  styleUrls: ['./login-and-signup.component.css']
})
export class LoginAndSignupComponent implements AfterViewInit {

  public mobileNo: number; // placeholder for mobile number
  public isNumberVerified: boolean = false;
  public isMobNoValid: boolean = false;
  public errorMsg_Mobno: string = "";

  public OTP_related_Msg: string = "";
  public OTP_class: string = "";
  public attempts_left: number = 3;  // attempts left for user (saved on server)
  public password: string = "";
  public password_msg: string = "";

  public isFocused: boolean = false;
  public hideCode: boolean = true;
  public addBlueBorder: boolean = false;
  public addClass: boolean = false;
  public closeSignupModal: string = "";

  // Login & Signup Modal 
  public loginModal: HTMLElement;
  public signupModal: HTMLElement;

  constructor(private userService: UserManagementService) {
  }

  ngAfterViewInit() {
    this.loginModal = document.getElementById('signup-exst-user');
    this.signupModal = document.getElementById('signup');
  }

  openLogin() {
    if (this.loginModal)
      this.loginModal.click();
  }

  openSignup() {
    if (this.signupModal)
      this.signupModal.click();
  }


  /* Show country code (+91) on input field */
  showCountryCode(inputValue) {

    if (inputValue.length > 0) {
      if (this.hideCode || !this.addClass) {
        this.hideCode = false;
        this.addClass = true;
      }
    }

    else {
      this.hideCode = true;
      this.addClass = false;
    }
  }


  /**
   * Validate Mobile number and send OTP to the given mobile number.
   * @param mobileNo mobile number to which OTP is to be sent.
   */
  validateAndSendOTP(mobileNo: number) {
    this.isMobNoValid = true;  /*
    let response = this.userService.validateAndSendOTP(mobileNo);

    if (response === false) 
      this.errorMsg_Mobno = "Please enter a valid Mobile number";

    else {
      response.subscribe((apiResponse: any) => {
        console.log('apiResponse:', apiResponse)
        if (apiResponse.error) {
          this.isMobNoValid = false;
          this.errorMsg_Mobno = apiResponse.message;
        }
        else {
          // OTP has been sent
          this.isMobNoValid = true;
          this.errorMsg_Mobno = "";
          this.mobileNo = mobileNo;  // hold the value until browser gets refreshed
        }
      },
        (error) => {
          console.log('Server seems to be down.')
          console.log('Error occurred:', error)
          this.isMobNoValid = false;
          this.errorMsg_Mobno = "Server seems to be down.";
        })
    }*/

  } // END verifyMobileNo()


  /**
   * Verify OTP.
   * @param OTP OTP to verify
   */
  verifyOTP(OTP: number) {

    if (this.isNumberVerified) {
      this.OTP_related_Msg = "Number already verified."
      this.OTP_class = "text-info";
      return;
    }

    if (OTP.toString(10).length == 6 && this.mobileNo) {

      this.userService.verifyOTP(this.mobileNo, OTP)
        .subscribe((apiResponse: any) => {
          console.log(apiResponse)

          switch (apiResponse.status) {

            case 200:
              this.OTP_related_Msg = "OTP has been successfully verified.";
              this.OTP_class = "text-success";
              this.isNumberVerified = true;
              break;

            case 401:
              this.OTP_related_Msg = "Number already verified.";
              this.OTP_class = "text-info";
              this.isNumberVerified = true;
              break;

            case 404:
              this.attempts_left = this.attempts_left ? (this.attempts_left - 1) : 0;
              this.OTP_related_Msg = `This OTP is incorrect. You have ${this.attempts_left} attempt(s) left.`;
              break;

            default:
              this.OTP_related_Msg = apiResponse.message;

          }

        },
          (error) => {
            this.OTP_related_Msg = "Server seems to be down."
          })
    }


  }


  /**
   * Function to Signup.
   * @param mobileNo Mobile number
   */
  goToSignup(mobileNo: number) {

    this.errorMsg_Mobno = "";
    this.password_msg = "";

    if (!mobileNo)
      this.errorMsg_Mobno = "Please enter mobile number.";

    else if (this.password.length < 8)
      this.password_msg = "Please enter a valid Password.";

    else {
      let response = this.userService.signup(mobileNo, this.password);

      if (response === false)
        this.errorMsg_Mobno = "Please enter a valid mobile number.";

      else {
        response.subscribe((apiResponse: any) => {

          switch (apiResponse.status) {

            case 200:
              this.closeSignupModal = "modal";
              this.openLogin();
              break;

            case 400:
              this.password_msg = "Invalid Password";
              break;

            case 401:
              this.OTP_related_Msg = apiResponse.message;
              break;

            case 403:
              this.errorMsg_Mobno = "This Mobile number is already registered."
              break;
          }

        },
          (error) => {
            this.password_msg = "Server seems to be down.";
          })
      }
    } // end outer else

  } // END goToSignup()


  /* Adds blue border at bottom */
  addBlueBorderFunc(add: boolean) {

    this.addBlueBorder = (add && !this.errorMsg_Mobno) ? true : false;

  }


  /* Adds red border at bottom */
  addRedBorder() {

    if (this.errorMsg_Mobno) {

      this.addBlueBorder = false;

      return {
        'border-bottom-color': 'indianred'
      };
    }
  }

}
