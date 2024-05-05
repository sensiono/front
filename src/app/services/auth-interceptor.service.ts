import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwt'); // Get JWT from local storage
    if (jwtToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtToken}`), // Add JWT to headers
      });
      return next.handle(cloned); // Continue with cloned request
    }
    return next.handle(req); // No token, continue with original request
  }
}
