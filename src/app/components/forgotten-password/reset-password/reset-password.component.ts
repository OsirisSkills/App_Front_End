import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NotifierService } from "../../../services/notifier/notifier.service";
import Validation from "../../../_util/validation";
import { ValidService } from "../../../services/valid-forms/valid.service";
import { loginConstraint } from "../../../_constraints/loginConstraint";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  /***
   * Attributs du Component ResetPasswordComponent*/
  aFormGroup: FormGroup = new FormGroup({
    password: new FormControl(null,
      [Validators.required, Validators.minLength(8)]),

    confirmPassword: new FormControl(null,
      [Validators.required]),

    recaptcha: new FormControl(null,
      [Validators.required])
  },
    {
      validators: [Validation.checkPasswords()]
    });

  public captchaResolved: boolean = false;
  public siteKey!: string;

  /***
   * @constructor
   * @param {Router} router- The Router Service
   * @param valid
   * @param {NotifierService} notifierService- The NotifierService Service*/
  constructor(private router: Router, private notifierService: NotifierService, private valid: ValidService) { }


  /***
   * Méthode d'initialisation des attributs du constructeur */
  ngOnInit(): void {
    this.siteKey = "6LcjgsskAAAAAOaeSiSPk18kOCDtnFm4uxnL1qsu";
  }


  /***
   * Méthode qui permet de soumettre le formulaire
   * */
  onSubmit(): void {
    this.aFormGroup.markAllAsTouched();

    if (this.aFormGroup.valid) {
      console.log(this.aFormGroup.getRawValue());
    }
  }

  public validate(name: string): string | null {
    const field = this.aFormGroup.get(name);

    const constraints = loginConstraint[name];

    if (field?.touched) {
      for (let constraint in constraints) {
        if (field?.hasError(constraint)) {
          return constraints[constraint];
        }
      }
    }

    return null;
  }

  /***
   * Méthode de redirection vers la page d'authentification
   * Si le password et confirmPassword sont identiques: le mot de passe modifié avec succés
   * Sinon: message d'erreur de modification du mot de passe.
   * */
  onReset(event: MouseEvent) {
    if (this.aFormGroup.controls['password'].value != null && this.aFormGroup.controls['confirmPassword'].value != null) {

      this.valid.verifResetPassword(this.aFormGroup.controls['password'].value,
        this.aFormGroup.controls['confirmPassword'].value,
        this.captchaResolved);
    }


  }

  /***
   * Méthode permettant de vérifier le si le captcha est valide ou non.
   * @param {string} captchaResponse Premier argument
   * */
  checkCaptcha(captchaResponse: string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }
}
