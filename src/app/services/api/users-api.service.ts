import { Injectable } from '@angular/core';
import {GenericApiService} from "./generic-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends GenericApiService{

  protected endPoint= this.apiURL+'/users';
}
