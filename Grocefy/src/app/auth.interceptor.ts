import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // let userData = localStorage.getItem("user")
    // let tokenData = userData && JSON.parse(userData);
    // console.log(tokenData); 
    // const TOKEN = tokenData
    // const req = request.clone({
    //   setHeaders:{
    //     TOKEN,
    //   }
    // })
    // return next.handle(req);

    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIwLCJpYXQiOjE2ODAyMjcyODQsImV4cCI6MTY4MDMxMzY4NH0.1mmeLTPWI0zkjzAXaIo5uevF6R86Nzz8VEIRSQySpno'

    // let userToken = request.clone({
    //     setHeaders:{
    //       Authorization: 'bearer' + token
    //     }
    // }) 
    // return next.handle(userToken);
    return next.handle(request);
  }
}
