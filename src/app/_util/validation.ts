import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export default class Validation {
  public static checkPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordFormControl = control.get('password');
      const confirmFormControl = control.get('confirmPassword');

      if( passwordFormControl?.value != confirmFormControl?.value) {
        confirmFormControl?.setErrors({ 'check_passwords': true });
      }

      return null;
    }
  }



  public static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const regex = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');

      if(!regex.test(control.value)) {
        return { email: true }; // la valeur de ValidationErrors doit être de type Truthy
      }

      return null;
    }
  }
}
