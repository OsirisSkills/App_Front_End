import { ConstraintType } from "../_types/ConstraintType";

export const loginConstraint: ConstraintType = {

  email: {
    required: `L'adresse email est obligatoire`,
    email: `L'adresse mail n'est pas valide`
  },

  password: {
    required: `Le mot de passe est obligatoire`,
    minlength: `Le mot de passe doit contenir au moins 8 caractères`
  },

  confirmPassword: {
    required: `Ce champs est obligatoire`,
    check_passwords: `Les mots de passes sont différents`
  },

  recaptchaToken: {
    required: `Veuillez cocher cette case pour continuer`
  }
}
