import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../validators/member-password/password.validator";
import {matchValidator} from "../validators/member-password/match.validator";



export  class Member {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  sexe: string;
  role: string;
  location: string;
  numberPhone: string;
  availabilityDate: string;
  address: string;
  projectIds:number[];



  constructor(id: number=0, userName: string='', email: string='', firstName: string='', lastName: string='',
              sexe: string='', role: string='', location: string='', numberPhone: string='', availabilityDate: string='', address: string='',projectIds:number[] = []) {

    this.id = id;
    this.userName = userName;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.sexe = sexe;
    this.role = role;
    this.location = location;
    this.numberPhone = numberPhone;
    this.availabilityDate = availabilityDate;
    this.address = address;
    this.projectIds=projectIds;
  }


  //  static isMember(obj: any): obj is Member {
  //   return (
  //     Object.keys(obj).every(key => key in obj) &&
  //     typeof obj.id === 'number' &&
  //     typeof obj.userName === 'string' &&
  //     typeof obj.email === 'string' &&
  //     typeof obj.firstName === 'string' &&
  //     typeof obj.lastName === 'string' &&
  //     typeof obj.password === 'string' &&
  //     typeof obj.sex === 'string' &&
  //     typeof obj.role === 'string' &&
  //     typeof obj.location === 'string' &&
  //     typeof obj.phone === 'string' &&
  //     typeof obj.dateEntered === 'string' &&
  //     typeof obj.address === 'string'
  //   );
  // }




  static createMemberForm(): FormGroup {
    return new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      sexe: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      role: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
      location: new FormControl('', [Validators.maxLength(30)]),
      numberPhone: new FormControl('', [Validators.maxLength(20)]),
      availabilityDate: new FormControl('', [Validators.maxLength(20)]),
      address: new FormControl('', [Validators.maxLength(500)]),
      projectGroups: new FormControl('', [Validators.maxLength(500)]),
      projectIds: new FormControl('', [Validators.maxLength(500)]),
    });
  }




}
export function isMember(obj: any): obj is Member {
  return Object.keys(obj).every(key => key in obj) &&
    typeof obj.id === 'number' &&
    typeof obj.userName === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.firstName === 'string' &&
    typeof obj.lastName === 'string' &&
    typeof obj.sexe === 'string' &&
    typeof obj.role === 'string' &&
    typeof obj.location === 'string' &&
    typeof obj.numberPhone === 'string' &&
    typeof obj.availabilityDate === 'string' &&
    typeof obj.address === 'string' &&
    typeof  obj.project=== 'string' &&
    Array.isArray(obj.projectIds);
}
// import {FormControl, FormGroup, Validators} from "@angular/forms";
// import {passwordValidator} from "../validators/member-password/password.validator";
// import {matchValidator} from "../validators/member-password/match.validator";
//
// export interface Member {
//   id: number;
//   userName: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   password: string; //Devra être changé & hash pour la version définitive
//   sex: string;
//   role: string;
//   location: string;
//   phone: string;
//   dateEntered: string;
//   address: string;
// }
//
// export function isMember(obj: any): obj is Member {
//   return Object.keys(obj).every(key => key in obj) &&
//     typeof obj.id === 'number' &&
//     typeof obj.userName === 'string' &&
//     typeof obj.email === 'string' &&
//     typeof obj.firstName === 'string' &&
//     typeof obj.lastName === 'string' &&
//     typeof obj.password === 'string' &&
//     typeof obj.sex === 'string' &&
//     typeof obj.role === 'string' &&
//     typeof obj.location === 'string' &&
//     typeof obj.phone === 'string' &&
//     typeof obj.dateEntered === 'string' &&
//     typeof obj.address === 'string';
// }
// export function createMemberForm():FormGroup {
//   return new FormGroup({
//     userName:new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
//     email:new FormControl('',[Validators.required, Validators.email, Validators.maxLength(100)]),
//     password:new FormControl('',[passwordValidator()]),
//     passwordConfirm:new FormControl('',[matchValidator('password', 'passwordConfirm')]),
//     firstName:new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
//     lastName:new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
//     sex:new FormControl('',[Validators.required, Validators.maxLength(1)]),
//     role:new FormControl('',[Validators.required, Validators.minLength(1), Validators.maxLength(30)]),
//     location:new FormControl('',[Validators.maxLength(30)]),
//     phone:new FormControl('',[Validators.maxLength(20)]),
//     address:new FormControl('',[Validators.maxLength(500)]),
//   });
// }
// export const memberFormValidators = {
//   userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
//   email: ['', [Validators.required, Validators.email]],
//   password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
//   passwordConfirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
//   firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
//   lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
//   sex: ['', [Validators.required, Validators.maxLength(1)]],
//   role: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
//   location: ['', [Validators.maxLength(30)]],
//   phone: ['', [Validators.maxLength(15)]],
//   address: ['', [Validators.maxLength(500)]]
// }
//
//
// export const memberForm = {
//   userName: [''],
//   email: [''],
//   password: [''],
//   passwordConfirm: [''],
//   firstName: [''],
//   lastName: [''],
//   sex: [''],
//   role: [''],
//   location: [''],
//   phone: [''],
//   address: ['']
// };
