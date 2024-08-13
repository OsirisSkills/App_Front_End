import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {PaginationService} from "../../../services/pagination/pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges, OnDestroy{

  @Input() quantityOfItems: number = 0;
  @Output() pageChange = new EventEmitter<{currentPage: number, pageSize: number}>();

  // Pagination
  currentPage: number = 1; // Default page
  pageSize: number = 0; // Showing page size
  pageShown: number = 5; // Number of pages shown in the paginator (left/right)

  pageArray: number[] = []; // Array of pages to display in the paginator (variable used for code optimization)
  numOfPages: number = -1; // Number of pages in the paginator (variable used for code optimization)

  private subscription: Subscription = new Subscription()

  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.subscription = this.paginationService.pageSize$.subscribe(
      pageSize => {
        this.pageSize = pageSize;
        this.numPages();
      }
    );
  }

  ngOnChanges(changes:SimpleChanges): void {
    if(changes['quantityOfItems'] && !changes['quantityOfItems'].firstChange){
      this.numPages();
    }
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  // Select the page requested by the user
  selectPage(page: number, pageSize?: number): void {
    if (pageSize)
      this.pageSize = pageSize;

    this.currentPage = page;
    this.pageChange.emit({currentPage: this.currentPage, pageSize: this.pageSize});
    this.numPages();
  }

  onPageSizeChangeHandler(event: any): void {
    this.onPageSizeChange(event.target.value);
  }

  onPageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.pageChange.emit({currentPage: this.currentPage, pageSize: this.pageSize});
    this.numPages();
  }

  numPages(): void {
    this.numOfPages = Math.ceil(this.quantityOfItems / this.pageSize);
    let startPage = Math.max(1, this.currentPage - this.pageShown);
    let endPage = Math.min(startPage + (this.pageShown * 2), this.numOfPages);

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    this.pageArray = pages;
  }

}
