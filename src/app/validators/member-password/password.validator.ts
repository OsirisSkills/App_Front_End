import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {passwordInputValidator} from "./password-input.validator";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const touched = control.dirty;

    console.log('passwordValidator: ' + value);

    if (value === null || value === '') {
      return null;
    }

    // Vérifiez si le champ a été touché
    if (!touched) {
      return null;
    }

    // Ajoutez les validateurs requis avec votre validateur personnalisé
    const validators = [];
    validators.push(Validators.required);
    validators.push(Validators.minLength(8));
    validators.push(Validators.maxLength(50));
    validators.push(passwordInputValidator());

    // Composez les validateurs
    const composedValidators = Validators.compose(validators);

    // Appliquez les validateurs
    return composedValidators ? composedValidators(control) : null;
  };
}
