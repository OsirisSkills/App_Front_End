import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from "@angular/router";
import {NotifierService} from "../services/notifier/notifier.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router:Router, private notifierService:NotifierService) { }

  /***
   * Methods that can intecept the token for the whole Page.
   * Also, we use interceptor to intercept error status for the page like an
   * 401 error or 403 error.
   * If  a 401 error or 403 error then redirect to Login Page
   * @param request the request
   * @param next the next
   */


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let accessToken = localStorage.getItem('token')

    if (accessToken != null) {

      request = request.clone({//Header for intercept the token in whole application.
        setHeaders: {
          'Authorization': `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (error:any) => {
      if (error instanceof HttpErrorResponse){
        if (error.status ===401 || error.status ===403){
          this.notifierService.showNotification('Identifiants erronés','OK');
           this.router.navigate(['login']).then(returnValue => {});
        }
        if (error.status===500){
          this.router.navigate(['500']).then(returnValue => {});
        }
      }
      }));
  }
}
