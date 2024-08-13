import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {NotifierService} from "../notifier/notifier.service";

@Injectable({
  providedIn: 'root'
})
//TODO:Suppression de ce service car inutilisable.
export class ValidService {

  private email1:string='sdammane@jehann.com';
  private email2:string='sdammane@dawan.com';

  private password1:string='soukaina';


  constructor(private router:Router, private notifierService:NotifierService) {
    }

  public verifUser(email:string, password:string,recaptcha:boolean){


    if((email== this.email1 && password == this.password1) ||
        (email == this.email2 && password == this.password1) && recaptcha)
    {
      this.router.navigate(['home']);
      this.notifierService.showNotification('Authentification réussie','OK');
    }

    else if ((email!=this.email1 || password!=this.password1 || email!=this.email2) && recaptcha){
      this.notifierService.showNotification('E-mail ou mot de passe incorrect','OK');
    }
  }

  public verifEmail(email:string,recaptcha:boolean){
    if( (email== this.email1 ||
       email==this.email2) && recaptcha){
      this.router.navigate(['login']);
      this.notifierService.showNotification('Veuillez vérifier votre boîte mail','OK');
    }

    else if( (email!=this.email1 || email!=this.email2)&& recaptcha){
      this.notifierService.showNotification('Email incorrect','OK');
    }
  }

  public verifResetPassword(password:string, confirmPassword:string,recaptcha:boolean){

    console.log(password);
    console.log(confirmPassword);
    if( (password == confirmPassword) && recaptcha ){
      //this.router.navigate(['/auth'])
      this.router.navigate(['login']);
      this.notifierService.showNotification('Mot de passe modifié avec succés','OK');
      console.log(password);
      console.log(confirmPassword);
    }
  }
}
