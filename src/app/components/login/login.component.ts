import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { loginConstraint } from '../../_constraints/loginConstraint';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  aFormGroup!: FormGroup;
  siteKey?: string;
  public captchaResolved : boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.siteKey = '6LdChlEoAAAAAGV-rc3tcWkJgLFj5zlsiw1FxE0V'; // site key

    this.aFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      recaptchaToken: ['', [Validators.required]],
    });
  }

  /***
   * Validate Methods. For the forms
   * @param name
   */
  public validate(name: string): string | null {
    const field = this.aFormGroup?.get(name);
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
  onSubmit(): void {
    if (this.aFormGroup?.valid) {
      //comm
      this.authService
        .login({
          email: this.aFormGroup.get('email')?.value,
          password: this.aFormGroup.get('password')?.value,
          recaptchaToken: this.aFormGroup.get('recaptchaToken')?.value,
        })
        .subscribe({
          next: (res) => {
            console.log(res.token)
            this.authService.setToken(res.token)
            .subscribe({
              next: () => this.router.navigateByUrl('/home')
            })
          },
          error: (error: any) => console.log(error),
        });
    }
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
