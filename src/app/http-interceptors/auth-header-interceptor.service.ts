import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    // interceptor logic
    const authToken = this.cookieService.get('authToken');
    const requestWithAuthHeader = request.clone({
      setParams: { authToken: authToken }
    })

    return next.handle(requestWithAuthHeader);
  }
}
