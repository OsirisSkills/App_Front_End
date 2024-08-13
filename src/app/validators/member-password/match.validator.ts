import {AbstractControl, Form, FormGroup, ValidatorFn} from '@angular/forms';

//TODO:Cette fonction de password validator se réplique avec checkPasswords in VALIDATION
export function matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const formGroup = control.parent as FormGroup;
    if (!formGroup) {
      return null;
    }
    const controlToCompare = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);
    if (!controlToCompare || !matchingControl) {
      return null;
    }
    if (controlToCompare.value !== matchingControl.value) {
      return { 'match': true };
    }
    return null;
  };
}
