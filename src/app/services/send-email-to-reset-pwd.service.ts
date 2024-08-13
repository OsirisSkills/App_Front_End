import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { GenericApiService } from './api/generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class SendEmailToResetPwdService extends GenericApiService {
  protected override endPoint=this.apiURL + "/authenticate";

  

  constructor( http:HttpClient,private router: Router) {super(http) }

  public sendEmail(user:any){
   // console.log(this.http.post(this.url, user))
    return this.http.post(this.endPoint + "/reset-password",user)
  }
}
