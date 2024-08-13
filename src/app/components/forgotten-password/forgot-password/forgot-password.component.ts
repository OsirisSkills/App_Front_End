import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotifierService} from "../../../services/notifier/notifier.service";
import {ValidService} from "../../../services/valid-forms/valid.service";
import Validation from "../../../_util/validation";
import {loginConstraint} from "../../../_constraints/loginConstraint";
import {SendEmailToResetPwdService} from "../../../services/send-email-to-reset-pwd.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit{

  /*** Les attributs de ForgotPasswordComponent */
  aFormGroup:FormGroup= new FormGroup({
    email: new FormControl(null,[Validators.required,Validation.email()]),
    recaptcha:new FormControl(null,[Validators.required]),
  });

  public captchaResolved : boolean = false;

  public siteKey!:string;

  /***
   * @constructor
   * @param {Router} router The Router Service
   * @param valid the ValidService
   * @param {NotifierService} notifierService The NotifierService service*/
  constructor(private router:Router,private notifierService:NotifierService,private valid:ValidService, private sendEmailToResetPwdService: SendEmailToResetPwdService) { }

  /***ngOnInit Methods */
  ngOnInit():void{
    this.siteKey="6LcjgsskAAAAAOaeSiSPk18kOCDtnFm4uxnL1qsu"; //key of recaptcha
  }


  /***
   * onSubmit Methods
   * */
  onSubmit(): void {
    this.aFormGroup.markAllAsTouched();

    if(this.aFormGroup.valid){
      console.log(this.aFormGroup.getRawValue());
    }
  }

  /***
   * Validate Methods.
   * @param name the name.
   */
  public validate (name:string): string |null{
    const field=this.aFormGroup.get(name);

    const constraints=loginConstraint[name];

    if(field?.touched){
      for(let constraint in constraints){
        if(field?.hasError(constraint)){
          return constraints[constraint];
        }
      }
    }
    return null;
  }

  /***
   * onForgot Methods.
   * If, the emails is valid,then send the reset link for the reset password.
   * Otherwise, the link don't be sent to the user mail
   * */
  onForgot(event:MouseEvent){
    // Ancienne version : this.valid.verifEmail(this.aFormGroup.controls['email'].value,this.captchaResolved);
    this.sendEmailToResetPwdService
      .sendEmail({
        email: this.aFormGroup.get('email')?.value
      })
      .subscribe({
        next:(data) => {
          localStorage.setItem('token',JSON.stringify(data));
          // this.router.navigateByUrl('/login');
        },
        error:(error: any) => console.log(error)
      });
  }



  /***
   * checkCaptcha Methods. To verify if the captcha is valid or
   * not valid.
   * @param {string} captchaResponse the captchaResponse
   * */
  checkCaptcha(captchaResponse : string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }

}
