import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl = isDevMode() ? 'http://localhost:3000/api/v2' : 'http://api.nkart.nishant-kumar.com/api/v2';

  constructor(private http: HttpClient) { }

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

    return this.http.post(`${this.baseUrl}/sendOTP`, params);
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

    return this.http.post(`${this.baseUrl}/verifyOTP`, params);
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

    return this.http.post(`${this.baseUrl}/users/signup`, params);
  }


  /**
    * Validates the given email. Returns true if valid, false otherwise.
    * @param email Email
    */
  isEmailValid(email) {
    
    if(!email) return false;

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

    return this.http.post(`${this.baseUrl}/users/login`, params);
  }


  /**
   * Save user address.
   * @param address Address 
   */
  saveUserAddress(address: any) {

    let _address = JSON.stringify(address);

    let params = new HttpParams()
      .set('address', _address)

    return this.http.post(this.baseUrl + '/users/userAddresses', params);
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
