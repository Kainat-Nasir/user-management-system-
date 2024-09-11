import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Check if the request URL matches the protected URLs
    const isProtectedUrl = request.url.includes('/protected'); // Adjust the condition as needed

    // Clone the request and set the Authorization header only if the token exists and the URL is protected
    const modifiedRequest = token && isProtectedUrl ? request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }) : request;

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}