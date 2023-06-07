import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes("/users") && request.method == "POST" ){
      console.log("enter")
     const authToken = sessionStorage.getItem("token")!
      const authReq = request.clone({
        headers:request.headers.set("token", authToken)
      })
      return next.handle(authReq);
      
    }else{
      
      console.log(request)
      return next.handle(request)
    }
    
  }
}
