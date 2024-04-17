// token-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger
    console.log('Request headers:', request.headers.keys()); // Log request headers
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
      return next.handle(request);
    }

}
