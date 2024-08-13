import { Injectable } from '@angular/core';
import {GenericApiService} from "./generic-api.service";
import {Category} from "../../models/category";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService extends GenericApiService{

  protected endPoint = 'category';
  constructor(http: HttpClient) {
    super(http); // Appel du constructeur de la classe parente
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiURL}/${this.endPoint}`);
  }

}
