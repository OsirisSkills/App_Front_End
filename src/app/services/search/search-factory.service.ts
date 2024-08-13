import { Injectable } from '@angular/core';
import {CategoryApiService} from "../api/category-api.service";
import {MemberApiService} from "../api/member-api.service";
import {ProjectApiService} from "../api/project-api.service";
import {GenericApiService} from "../api/generic-api.service";

@Injectable({
  providedIn: 'root'
})
export class SearchFactoryService {

  constructor(
    private categoryApiService: CategoryApiService,
    private memberApiService: MemberApiService,
    private projectApiService: ProjectApiService,
  ) { }

  getService(type: String): GenericApiService {
    switch (type) {
      case "category":
        return this.categoryApiService;
      case "members":
        return this.memberApiService;
      case "liste":
        return this.projectApiService;
      default:
        throw new Error("Type not found");
    }
  }
}
