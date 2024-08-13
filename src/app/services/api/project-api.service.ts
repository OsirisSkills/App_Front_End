import { Injectable } from '@angular/core';
import {GenericApiService} from "./generic-api.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService extends GenericApiService{

  protected endPoint = 'liste';
}
