import { Injectable } from '@angular/core';
import {GenericApiService} from "./generic-api.service";
import {Observable} from "rxjs";
import {HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectFileApiService extends GenericApiService{

  protected endPoint = 'files/projects';


  public listFilesByProjectId<T>(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiURL}/${this.endPoint}/${id}`);
  }

  public downloadFileById<T>(projectId: number, fileId: number): Observable<Blob> {
    return this.http.get(`${this.apiURL}/${this.endPoint}/${projectId}/${fileId}`, { responseType: 'blob' });
  }

  public uploadFile(projectId: number, file: File) : Observable<HttpEvent<any>> {

    console.log("file");

    //Must send as multipart/form-data

    const baseUrl = `${this.apiURL}/${this.endPoint}/${projectId}`;

    const formData : FormData = new FormData();
    formData.append('file', file);

    let myHeaders = new HttpHeaders();
    // //@ts-ignore
    myHeaders.set('Content-Type', 'multipart/form-data');
     myHeaders.set('Access-Control-Allow-Origin', 'http://localhost:4200');

    console.log("formData");
    console.log(formData);

    const req = new HttpRequest('POST', baseUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  public deleteFileById<T>(projectId: number, fileId: number): Observable<T> {
    return this.http.delete<T>(`${this.apiURL}/${this.endPoint}/${projectId}/${fileId}`);
  }
}
