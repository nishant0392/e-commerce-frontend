import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  /**
   * Sends SMS to a single User after Input Validation.
   * @param {number} mobileNo Mobile No. of the receiver
   * @param {string} OPCODE Action to perform (User Mobile verification, Send acknowledgement, etc.)
   */
  verifyAndSendSMS(mobileNo: number, OPCODE: string) {

    /* Input Validation of Mobile No. */
    let mobileNo_str = mobileNo.toString(10);
    console.log(mobileNo)

    if(mobileNo_str.length !== 10 || mobileNo_str.match(/\D/)) {
      console.log('Mobile no. is not Valid!', )
      return false;
    }

    /* Send OTP for User Mobile verification */
    const params = new HttpParams()
    .set('mobileNo', mobileNo_str)
    .set('opcode', OPCODE)

    return this.http.post(`${this.baseUrl}/api/v2/users/sendSMS`, params);
  }
}