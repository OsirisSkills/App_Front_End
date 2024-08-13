import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryStats, MemberStats, ProjectFileStats, ProjectStats, StatsAPI} from "../../models/stats";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatsApiService {

  protected apiURL = 'http://localhost:8080/api';
  protected endPoint = 'stats';

  constructor(protected http: HttpClient) { }

  public getAllStats(): Observable<StatsAPI> {
    return this.http.get<StatsAPI>(`${this.apiURL}/${this.endPoint}/all`);
  }

  public getProjectStats(): Observable<ProjectStats> {
    return this.http.get<ProjectStats>(`${this.apiURL}/${this.endPoint}/project`);
  }

  public getProjectFileStats(): Observable<ProjectFileStats> {
    return this.http.get<ProjectFileStats>(`${this.apiURL}/${this.endPoint}/projectfile`);
  }

  public getCategoryStats(): Observable<CategoryStats> {
    return this.http.get<CategoryStats>(`${this.apiURL}/${this.endPoint}/category`);
  }

  public getMemberStats(): Observable<MemberStats> {
    return this.http.get<MemberStats>(`${this.apiURL}/${this.endPoint}/user`);
  }
}

