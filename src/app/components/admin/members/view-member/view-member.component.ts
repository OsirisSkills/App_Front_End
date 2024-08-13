import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Member } from 'src/app/models/member';
import { Observable } from "rxjs";
import { MemberApiService } from "../../../../services/api/member-api.service";

import {Project} from "../../../../models/project";
import {ProjectApiService} from "../../../../services/api/project-api.service";

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.scss']
})
export class ViewMemberComponent implements OnInit {
  memberId: number;
  member: Member;
  projects: Project[] = [];





  /***
   * @constructor
   * @param route the route
   * @param memberApiService the memberApiService
   * @param projectApiService
   */
  constructor(private route: ActivatedRoute,
              private memberApiService: MemberApiService,
              private projectApiService: ProjectApiService) {
    this.memberId = -1;
    this.member = {
      id: -1, userName: '', email: '', firstName: '', lastName: '', sexe: '',
      role: '', location: '', numberPhone: '', availabilityDate: '', address: '',projectIds:[]
    };

  }


  /***
   * The ngOnInit methods
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let memberNum: string | null;
      let finalMemberNum: number;
      memberNum = this.route.snapshot.paramMap.get('id');
      if (memberNum === null) {
        finalMemberNum = -1;
      }
      else {
        finalMemberNum = parseInt(memberNum);
      }
      console.log(finalMemberNum);

      this.memberId = finalMemberNum;
      try {
        this.getData().subscribe((data) => {
          this.member = data;

          if(this.member.projectIds){
            this.member.projectIds.forEach((projectId : number) => {
            // @ts-ignore
              this.getProjectData(projectId).subscribe((dataProject : Project) => {
              this.projects.push(dataProject);
            });
            })
          }


        });
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  /***
   * Get the Data from the API
   */

  getData(): Observable<Member> {
    return this.memberApiService.getById(this.memberId);
  }

  getProjectData(projectId: number){
    return this.projectApiService.getById(projectId)
  }

}
