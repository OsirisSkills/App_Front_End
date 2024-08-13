import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//TODO:Redondance de code avec le passwordValidator
export function passwordInputValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    // Vérifie si le mot de passe contient au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    if (hasLowercase && hasUppercase && hasNumber && hasSpecialCharacter) {
      return null; // le mot de passe est valide
    } else {
      return { passwordRequirements: true }; // retourne une erreur si les exigences de mot de passe ne sont pas satisfaites
    }
  };
}
