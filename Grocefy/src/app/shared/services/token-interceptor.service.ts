import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIwLCJpYXQiOjE2ODAyMjcyODQsImV4cCI6MTY4MDMxMzY4NH0.1mmeLTPWI0zkjzAXaIo5uevF6R86Nzz8VEIRSQySpno'

    let userToken = req.clone({
        setHeaders:{
          Authorization: 'bearer' + token
        }
    }) 
    return next.handle(userToken);
  }
} 
