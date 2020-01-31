import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponse } from '../interfaces/apiResponse.interface';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl = isDevMode() ? 'http://localhost:3000/api/v2' : 'http://api.nkart.nishant-kumar.com/api/v2';

  constructor(private http: HttpClient) { }

  /**
   * Initialize Modal(Login & Signup)
   */
  initializeModal() {

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


  /**
   * Validates the given mobile number. Returns empty space if not valid, the mobile number, otherwise.
   * @param mobileNo Mobile number
   */
  validateMobileNumber(mobileNo: number | string) {

    if (!mobileNo) return "";

    /* Input Validation of Mobile No. */
    let mobileNo_str = mobileNo.toString(10);

    if (mobileNo_str.length !== 10 || mobileNo_str.match(/\D/)) {
      console.log('Mobile no. is not Valid!')
      return "";
    }

    return mobileNo_str;
  }


  /**
   * Sends SMS to a single User after Input Validation.
   * @param {number} mobileNo Mobile No. of the receiver
   */
  validateAndSendOTP(mobileNo: number | string) {

    let mobileNo_str = this.validateMobileNumber(mobileNo);

    if (!mobileNo_str) return false;

    /* Send OTP for User Mobile verification */
    const params = new HttpParams()
      .set('mobile', mobileNo_str)

    return this.http.post<ApiResponse>(`${this.baseUrl}/sendOTP`, params);
  }


  /**
   * Verify OTP
   * @param mobileNo Mobile number to verify
   */
  verifyOTP(mobileNo: number, OTP: number) {

    let mobileNo_str = mobileNo.toString(10);
    let OTP_str = OTP.toString(10);

    /* Verify OTP for User Mobile verification */
    const params = new HttpParams()
      .set('mobile', mobileNo_str)
      .set('OTP', OTP_str)

    return this.http.post<ApiResponse>(`${this.baseUrl}/verifyOTP`, params);
  }


  /**
   * Function for signup.
   * @param mobileNo Mobile number
   * @param password Password
   */
  signup(mobileNo: number | string, password: string) {

    let mobileNo_str = this.validateMobileNumber(mobileNo);

    if (!mobileNo_str) return false;

    const params = new HttpParams()
      .set('mobile', mobileNo_str)
      .set('password', password)

    return this.http.post<ApiResponse>(`${this.baseUrl}/users/signup`, params);
  }


  /**
    * Validates the given email. Returns true if valid, false otherwise.
    * @param email Email
    */
  isEmailValid(email) {

    if (!email) return false;

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return email.match(emailRegex) ? true : false;
  }


  /**
   * Function for login.
   * @param mobileNo Mobile number
   * @param email Email
   * @param password Password
   */
  login(mobileNo: number | string, email: string, password: string) {

    if (!password || !(mobileNo || email)) return false;

    let params = new HttpParams()
      .set('password', password)

    let mobileNo_str = this.validateMobileNumber(mobileNo);

    if (mobileNo_str)
      params = params.set('mobile', mobileNo_str)

    else if (this.isEmailValid(email))
      params = params.set('email', email)

    else return false;

    return this.http.post<ApiResponse>(`${this.baseUrl}/users/login`, params);
  }


  /**
   * Function for logout.
   * @param userId User ID
   * @param authToken Authorization token
   */
  logout(authToken: string) {
    return this.http.get<ApiResponse>(`${this.baseUrl}/users/logout?authToken=${authToken}`);
  }


  /**
   * Save user address.
   * @param address Address 
   */
  saveUserAddress(userID: string, address: any) {

    let _address = JSON.stringify(address);

    let params = new HttpParams()
      .set('userId', userID)
      .set('address', _address)

    return this.http.post<ApiResponse>(`${this.baseUrl}/users/userAddress`, params);
  }


  /**
   * Get user details.
   * @param userID User ID 
   */
  getUserDetails(userID: string) {
    return this.http.get<ApiResponse>(`${this.baseUrl}/users/details?userId=${userID}`);
  }


  /**
   * Returns true if none of the properties have null/undefined value, otherwise false.
   * @param object Object
   */
  isAnyPropertyNull(object) {

    for (let key in object) {
      if (!object[key]) return true;
    }

    return false;
  }

} // END 
