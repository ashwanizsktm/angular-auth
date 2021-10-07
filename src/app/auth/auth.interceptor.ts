import { HttpHandler, HttpInterceptor, HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AuthService } from '../appServices/auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { Employee } from "../appModels/employee.model";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
              private http: HttpClient) {}
 intercept(req:HttpRequest<any>, next: HttpHandler) {
   return this.auth.user.pipe(take(1),
   exhaustMap(user => {
     if(!user) {
      return next.handle(req);
     }
     const modifiedRequest = req.clone({ params: new HttpParams().set('auth', user.token)})
    return next.handle(modifiedRequest);
   })
   )
 }
}
