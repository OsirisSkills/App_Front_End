import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { API_BASE_URI } from 'src/app/consts/api_uri';



@Injectable({
  providedIn: 'root'
})
export abstract class GenericApiService {


  // private readonly httpOptions: { headers: HttpHeaders, params?: any };
  protected apiURL = `${API_BASE_URI}/api`;
  protected abstract endPoint: string ;

  protected constructor(protected http: HttpClient) {
    // const token = localStorage.getItem('token');
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`
    //   })
    // };
  }

  public getApiURL(): string {
    return this.apiURL;
  }

  public getAll<T>(): Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${this.endPoint}`);
  }

  public getAllBy<T>(page: number, size: number, search?: String, column?: String): Observable<T> {
    if (search && column)
      return this.http.get<T>(`${this.apiURL}/${this.endPoint}/${page}/${size}/${search}/${column}`);
    else if (search)
      return this.http.get<T>(`${this.apiURL}/${this.endPoint}/${page}/${size}/${search}`);
    else
      return this.http.get<T>(`${this.apiURL}/${this.endPoint}/${page}/${size}`);
  }

  public count<T>(): Observable<T> {
      return this.http.get<T>(`${this.apiURL}/${this.endPoint}/count`);
  }

  public countBy<T>(search: String, column?: String): Observable<T> {
    if (column)
      return this.http.get<T>(`${this.apiURL}/${this.endPoint}/count/${search}/${column}`);
    else
      return this.http.get<T>(`${this.apiURL}/${this.endPoint}/count/${search}`);
  }

  public getById<T>(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${this.endPoint}/${id}`);
  }

  public save<T>(data: any): Observable<T> {
    return this.http.post<T>(`${this.apiURL}/${this.endPoint}`, data);
  }

  public update<T>(data: any): Observable<T> {
    return this.http.put<T>(`${this.apiURL}/${this.endPoint}`, data);
  }

  public delete<T>(id: number): Observable<T> {
    console.log("id:"+id);
    return this.http.delete<T>(`${this.apiURL}/${this.endPoint}/`+ id);
  }
}
