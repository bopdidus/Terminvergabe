import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../shared/services/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request.url)
    if(!request.url.includes("/users") && !request.url.includes("/company") && !request.url.includes("login")  && request.method == "POST" ){
      console.log("enter")
     const authToken = sessionStorage.getItem("token")!
      const authReq = request.clone({
        headers:request.headers.set("Authorization", authToken)
      })
      return next.handle(authReq);
      
    }else{
      console.log(request)
      return next.handle(request)
    }
  }
}
