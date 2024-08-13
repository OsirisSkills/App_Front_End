import { Injectable } from '@angular/core';
import {GenericApiService} from "./generic-api.service";
import {map, Observable} from "rxjs";
import {Member} from "../../models/member";

@Injectable({
  providedIn: 'root'
})
export class MemberApiService extends GenericApiService{

  protected endPoint='members';

  public getAllMemberChief(): Observable<Member[]> {
    let memberObservable: Observable<Member[]> = this.getAll();

    return memberObservable.pipe(
        map(members => members.filter(member => member.role === "PROJECT_MANAGER"))
    );
  }
}
