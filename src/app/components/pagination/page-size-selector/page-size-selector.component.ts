import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {PaginationService} from "../../../services/pagination/pagination.service";

@Component({
  selector: 'app-page-size-selector',
  templateUrl: './page-size-selector.component.html',
  styleUrls: ['./page-size-selector.component.scss']
})
export class PageSizeSelectorComponent implements OnChanges{

  @Input() pageSizes: number[] = [5, 10, 25, 50, 100]; // DEFAULT Page sizes available to the user
  @Input() pageSizeSelected: number = 10; // DEFAULT showing page size
  @Output() pageSizeChange = new EventEmitter<{pageSize: number}>();

  constructor(private paginationService: PaginationService) {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['pageSizes'] && !changes['pageSizes'].firstChange){
      this.pageSizes = changes['pageSizes'].currentValue;
    }
    if(changes['pageSizeSelected'] && !changes['pageSizeSelected'].firstChange){
      this.pageSizeSelected = changes['pageSizeSelected'].currentValue;
    }
  }

  onPageSizeChangeHandler(event: any): void {
    this.onPageSizeChange(event.target.value);
  }

  onPageSizeChange(newPageSize:number): void {
    this.pageSizeChange.emit({pageSize: newPageSize});
    this.paginationService.setPageSize(newPageSize);
  }


}
