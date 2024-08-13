import { Component, OnInit } from '@angular/core';
import { Member } from "src/app/models/member";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MemberApiService } from "../../../../services/api/member-api.service";
import { firstValueFrom } from "rxjs";
import {memberRole} from "../../../../_enums/memberRole";

@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})



export class NewMemberComponent {

  roleEnum: memberRole | undefined;
  memberForm: FormGroup
  member: Member;


  /***
   * @constructor
   * @param userDataService the userDetailService
   * @param fb the fb
   * @param route the route
   * @param memberApiService the memberApiService
   */
  constructor(private fb: FormBuilder,
    private route: Router,
    private memberApiService: MemberApiService) {
    this.memberForm = Member.createMemberForm();
    this.member = new Member();
  }



  // Envoi du formulaire
  /***
   * Submit Methods.
   * For "envoi" the methods.
   */
  async onSubmit(): Promise<void> {
    this.updateMemberFromForm();

    try {
      await this.postData(this.member)
      this.resetForm();
      this.route.navigate(['/members']).then(r => console.log(r));
    }
    catch (e) {
      console.log(e);
    }
  }

  /***
   * UpdateMember Form Method.
   */
  updateMemberFromForm(): void {
    this.member.userName = this.memberForm.get('userName')?.value || '';
    this.member.email = this.memberForm.get('email')?.value || '';
    this.member.firstName = this.memberForm.get('firstName')?.value || '';
    this.member.lastName = this.memberForm.get('lastName')?.value || '';
    this.member.sexe = this.memberForm.get('sexe')?.value || '';
    this.member.role = this.memberForm.get('role')?.value || '';
    this.member.location = this.memberForm.get('location')?.value || '';
    this.member.numberPhone = this.memberForm.get('numberPhone')?.value || '';
    this.member.availabilityDate = this.memberForm.get('availabilityDate')?.value || '';
    this.member.address = this.memberForm.get('address')?.value || '';
  }

  /***
   * The postData Methods.
   * It creates a new member items in DataBase of member
   * @param data the data
   */
  async postData(data: Member) {
    try {
      await firstValueFrom(this.memberApiService.save(data));
    } catch (error) {
      console.log(error);
    }
  }

  /***
   * The reset Form Method
   */
  resetForm(): void {
    this.memberForm = Member.createMemberForm();
    this.member = new Member();
  }

  /***
   * The fieldData Methods
   */
  get fieldData() {
    return (fieldName: string) => {
      const fieldControl = this.memberForm.get(fieldName);
      return {
        value: fieldControl?.value || '',
        invalid: fieldControl?.invalid || false,
        dirty: fieldControl?.dirty || false,
        touched: fieldControl?.touched || false,
        errors: fieldControl?.errors || {}
      };
    };
  }

  /***
   * Get userName
   */
  get userName() { return this.fieldData('userName'); }

  /***
   * Get the mail
   */
  get email() { return this.fieldData('email'); }

  /***
   * Get the firstName
   */
  get firstName() { return this.fieldData('firstName'); }

  /***
   * Get the lastName
   */
  get lastName() { return this.fieldData('lastName'); }

  /***
   * Get the password
   */
  get password() { return this.fieldData('password'); }

  /***
   * Get the passwordConfirm
   */
  get passwordConfirm() { return this.fieldData('passwordConfirm'); }

  /***
   * Get the sex
   */
  get sexe() { return this.fieldData('sexe'); }

  /***
   * Get the role.
   */
  get role() { return this.fieldData('role'); }

  /***
   * Get the Location
   */
  get location() { return this.fieldData('location'); }

  /***
   * Get the phone
   */
  get numberPhone() { return this.fieldData('numberPhone'); }

  /***
   * Get the address
   */
  get address() { return this.fieldData('address'); }

  protected readonly memberRole = memberRole;
}
