import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = isDevMode() ? 'http://localhost:3000/api/v2' : 'http://api.nkart.nishant-kumar.com/api/v2';

  constructor(private http: HttpClient) { }


  public makePaymentRequest_PayUMoney(request_data: PayUMoneyParams) {

    let data = new HttpParams()

      .set('amount', JSON.stringify(request_data.amount))
      .set('productinfo', JSON.stringify(request_data.productinfo))
      .set('firstname', request_data.firstname)
      .set('lastname', request_data.lastname)
      .set('email', request_data.email)
      .set('phone', JSON.stringify(request_data.phone))

    return this.http.post(`${this.baseUrl}/payment/payumoney`, data);

  } // END makePaymentRequest_PayUMoney()


  /**
   * Returns Captcha in form of SVG data.
   */
  public getCaptcha() {

    return this.http.get(this.baseUrl+'/getCaptcha');
  }


} // END PaymentService


export interface PayUMoneyParams {

  key?: string,      // on server side
  amount: number,
  productinfo: any,
  txnid?: string,   // on server side
  udf1?: any,
  udf2?: any,
  udf3?: any,
  udf4?: any,
  udf5?: any,
  firstname: string,
  lastname?: string, 
  email: string,
  phone: number | string,
  surl?: string,     // on server side
  furl?: string,     // on server side
  hash?: string,      // on server side
  service_provider?: string  // on server side

} // END interface PayUMoneyParams