import { Component, AfterViewInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management.service';
import { CookieService } from 'ngx-cookie-service';

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

  // Login parameters
  public emailOrMobile: string;
  public login_pass: string;
  public loginError_msg: string = "";

  public isFocused: boolean = false;
  public hideCode: boolean = true;
  public addBlueBorder: boolean = false;
  public addClass: boolean = false;

  // Login & Signup Modal 
  public Modal: { openLogin(), openSignup(), closeLogin(), closeSignup() };

  constructor(private userService: UserManagementService,
    private cookie: CookieService) {
  }

  ngAfterViewInit() {
    this.Modal = this.initializeModal();
  }

  /**
   * Initialize Modal(Login & Signup)
   */
  public initializeModal() {

    let triggerClick = (element: HTMLElement) => {
      if (element)
        element.click();
    }

    var open_loginModal = document.getElementById('signup-exst-user');
    var open_signupModal = document.getElementById('signup');
    var close_loginModal = document.getElementById('close-modal-login');
    var close_signupModal = document.getElementById('close-modal-signup');

    let openLogin = () => { triggerClick(open_loginModal) }

    let openSignup = () => { triggerClick(open_signupModal) }

    let closeLogin = () => { triggerClick(close_loginModal) }

    let closeSignup = () => { triggerClick(close_signupModal) }

    let modalOperations = {
      openLogin: openLogin,
      openSignup: openSignup,
      closeLogin: closeLogin,
      closeSignup: closeSignup
    }

    return modalOperations;
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
    }

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
              this.Modal.closeSignup();
              this.Modal.openLogin();
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


  /**
   * Identifies whether it is email or mobile.
   * @param emailOrMobile email/mobile
   */
  identifyEmailOrMobile(emailOrMobile: number | string) {

    let _emailOrMobile = emailOrMobile.toString(10);
    let result = _emailOrMobile.match(/[^0-9]/);

    if (result) return 'EMAIL';

    return 'MOBILE';
  }


  /**
   * Function to Login.
   */
  goToLogin() {

    this.loginError_msg = "";

    if (!this.emailOrMobile)
      this.loginError_msg = "Please fill in Email/Mobile field";

    else if (!this.login_pass)
      this.loginError_msg = "Please fill in password field";

    else {

      let identity = this.identifyEmailOrMobile(this.emailOrMobile);
      let response;

      if (identity == "EMAIL")
        response = this.userService.login(null, this.emailOrMobile, this.login_pass);

      else if (identity == "MOBILE")
        response = this.userService.login(this.emailOrMobile, null, this.login_pass);


      if (response === false)
        this.loginError_msg = "Invalid Email/Mobile or Password.";

      else {
        response.subscribe((apiResponse: any) => {
          console.log('**', apiResponse)
          switch (apiResponse.status) {

            case 200:
              this.OTP_class = "text-success";
              this.loginError_msg = "Login Successful";
              setTimeout(() => this.Modal.closeLogin(), 2000);
              // Set Cookies
              let data = apiResponse.data;
              this.cookie.set('userId', data.userId);
              this.cookie.set('firstName', data.userName.firstName);
              this.cookie.set('lastName', data.userName.lastName);
              this.cookie.set('authToken', data.authToken)
              break;

            case 404:
              this.loginError_msg = "Wrong Email/Mobile or Password.";
              break;

            default:
              this.loginError_msg = apiResponse.message;
          }

        },
          (error) => {
            this.loginError_msg = "Server seems to be down.";
          })
      }
    }

  } // END goToLogin()


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
