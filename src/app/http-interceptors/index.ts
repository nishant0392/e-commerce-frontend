import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthHeaderInterceptorService } from './auth-header-interceptor.service';

export const httpInterceptProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHeaderInterceptorService,
        multi: true
    }
];