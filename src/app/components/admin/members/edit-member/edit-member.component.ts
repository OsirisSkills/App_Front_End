import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Member } from 'src/app/models/member';
import { FormBuilder, FormGroup } from "@angular/forms";
import { firstValueFrom, Observable } from "rxjs";
import { MemberApiService } from "../../../../services/api/member-api.service";

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {

  memberId: number = -1;
  member: Member;



  /***
   * The constructor
   * @param fb the formBuilder
   * @param router the router
   * @param activeRoute the activeRoute
   * @param memberApiService the memberApiService
   * @param route the route
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute, private memberApiService: MemberApiService, private route: ActivatedRoute) {
    this.memberId = -1;
    this.member = {
      id: -1, userName: '', email: '', firstName: '', lastName: '',  sexe: '', role: '', location: '',
      numberPhone: '', availabilityDate: '', address: '',projectIds:[]
    };

  }

  /***
   * ngOnInit Methods.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      // Get the id from the route
      let membersNumb: string | null;
      let finalMembersNumb: number;
      membersNumb = this.route.snapshot.paramMap.get('id');
      if (membersNumb === null) {
        finalMembersNumb = -1;
      }
      else {
        finalMembersNumb = parseInt(membersNumb);
      }
      this.memberId = finalMembersNumb;

      // Get the data from the API
      try {
        this.getData().subscribe((data) => {
          this.member = data;
        });
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  /**
   * Get the data from the API
   */
  getData(): Observable<Member> {
    return this.memberApiService.getById(this.memberId);
  }

  // Soumission du formulaire et validation des données
  // onSubmit(): void {
  //   this.member.userName = this.memberForm.get('userName')?.value || '';
  //   this.member.email = this.memberForm.get('mail')?.value || '';
  //   this.member.firstName = this.memberForm.get('firstName')?.value || '';
  //   this.member.lastName = this.memberForm.get('lastName')?.value || '';
  //
  //   this.member.sexe = this.memberForm.get('sexe')?.value || '';
  //   this.member.role = this.memberForm.get('role')?.value || '';
  //   this.member.location = this.memberForm.get('location')?.value || '';
  //   this.member.numberPhone = this.memberForm.get('numberPhone')?.value || '';
  //   this.member.address = this.memberForm.get('address')?.value || '';
  //
  //   try {
  //     //console.log(this.member);
  //     this.updateMember().then(r => console.log(r));
  //     this.memberForm.reset();
  //     //console.log(this.userDataService.getMembers());
  //     this.router.navigate(['/members']).then(r => console.log(r));
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  /***
   *
   * Retrieving form data. Checks that the field exists before returning the data
   */
  // get fieldData() {
  //   return (fieldName: string) => {
  //     const fieldControl = this.memberForm.get(fieldName);
  //     return {
  //       value: fieldControl?.value || '',
  //       invalid: fieldControl?.invalid || false,
  //       dirty: fieldControl?.dirty || false,
  //       touched: fieldControl?.touched || false,
  //       errors: fieldControl?.errors || {}
  //     };
  //   };
  // }

  /**
   * Update the Member
   */
  async updateMember():Promise<void> {
    // console.log("FirstName:" + this.member);
    // Send data to the API

    try {
      await firstValueFrom(this.memberApiService.update(this.member));

      console.log("Modification"+firstValueFrom(this.memberApiService.update(this.member)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données : ', error);
    }

    //this.categoriesApiService.update(this.category).subscribe();
    this.router.navigate(['/members']).then(r => console.log(r));
  }

  /***
   * Get the userName
   */
  // get userName() { return this.fieldData('userName'); }
  //
  // /***
  //  * Get the email
  //  */
  // get email() { return this.fieldData('email'); }
  //
  // /***
  //  * Get the firstName.
  //  */
  // get firstName() { return this.fieldData('firstName'); }
  //
  // /***
  //  * Get the lastName.
  //  */
  // get lastName() { return this.fieldData('lastName'); }
  //
  // /***
  //  * Get the password.
  //  */
  // get password() { return this.fieldData('password'); }
  //
  // /***
  //  * Get the passwordConfirm.
  //  */
  // get passwordConfirm() { return this.fieldData('passwordConfirm'); }
  //
  // /***
  //  * Get the sexe
  //  */
  // get sexe() { return this.fieldData('sexe'); }
  //
  // /***
  //  * Get the role.
  //  */
  // get role() { return this.fieldData('role'); }
  //
  // /***
  //  * Get the location
  //  */
  // get location() { return this.fieldData('location'); }
  //
  // /***
  //  * Get the phone
  //  */
  // get phone() { return this.fieldData('phone'); }
  //
  // /***
  //  * Get the address.
  //  */
  // get address() { return this.fieldData('address'); }
  //
  // get numberPhone() { return this.fieldData('numberPhone'); }
}
