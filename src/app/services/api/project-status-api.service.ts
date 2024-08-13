import { Injectable } from '@angular/core';
import {GenericApiService} from "./generic-api.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusApiService extends GenericApiService {

  // Définir l'endpoint spécifique pour les statuts de projet
  protected endPoint = 'project-statuses';

  constructor(protected override http: HttpClient) {
    super(http);
  }

  // Méthode pour récupérer tous les statuts de projet
  public getAllStatuses(): Observable<any> {
    return this.getAll();
  }
}