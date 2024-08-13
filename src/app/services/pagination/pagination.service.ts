import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private pageSizeSource = new BehaviorSubject<number>(10);
  pageSize$ = this.pageSizeSource.asObservable();

  setPageSize(pageSize:number) {
    this.pageSizeSource.next(pageSize);
  }
}
