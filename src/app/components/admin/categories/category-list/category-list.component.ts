import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {elementAt, Observable, Subscription} from "rxjs";
import {Category} from "src/app/models/category";
import {CategoryApiService} from "src/app/services/api/category-api.service"
import {
  ConfirmDeleteModalCategoryComponent
} from "src/app/components/admin/categories/confirm-delete-modal-category/confirm-delete-modal-category.component";
import {Project} from "../../../../models/project";

@Component({
  selector: 'app-categories',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{

  constructor(private categoriesApiService: CategoryApiService,
              private modalService: NgbModal) {
  }

  categoriesApi: any = [];
  private categoriesSubscription!: Subscription;
  quantityOfCategory: number = -1

  //FILTERING

  //currentSort: { column: keyof Categories, direction: 1 | -1 } = { column: 'name', direction: 1 };
  //filteredCategories: Observable<Categories> = this.categories;
  searchTerm: String ='';

  column = 'name'; // Default column

  // Pagination
  currentPage = 1; // Default page
  pageSize = 10; // Default page size
  // pageSizes = [5, 10, 25, 50, 100]; // Page sizes available to the user.
  // It is already defined in the component page-size-selector. Can be customized here if needed.

  ngOnInit(){
    this.reloadData();
  }

  getData(): Observable<Category> {
    if (this.searchTerm !== ''){
      return this.categoriesApiService.getAllBy(this.currentPage, this.pageSize, this.searchTerm, this.column);
    }
    return this.categoriesApiService.getAllBy(this.currentPage, this.pageSize);
  }

  /***
   * Reload the data from the API with the current parameters
   */
  reloadData(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.searchTerm === '') {
      this.categoriesApiService.count().subscribe((totalCount: any) => {
        if (typeof totalCount === 'object' && totalCount !== null && 'result' in totalCount &&
          typeof totalCount.result === 'number') {
          this.quantityOfCategory = totalCount.result;
        }
      });
      this.categoriesSubscription = this.getData().subscribe((data) => {
        this.categoriesApi = data;
      });
    }
    else {
      this.categoriesApiService.countBy(this.searchTerm, this.column).subscribe((totalCount: any) => {
        if (typeof totalCount === 'object' && totalCount !== null && 'result' in totalCount &&
          typeof totalCount.result === 'number') {
          this.quantityOfCategory = totalCount.result;
        }
      });
      this.categoriesSubscription = this.getData().subscribe((data) => {
        this.categoriesApi = data;
      });
    }

    // this.numPages();
  }

  /**
   * Handle the page change event
   * @param event {currentPage: number, pageSize: number}
   */
  onPageChange(event: {currentPage: number; pageSize: number }): void
  {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
    this.reloadData();
  }

  /**
   * Handle the quantity of items per page change event
   * @param $event {pageSize: number}
   */
  onPageSizeChange($event: { pageSize: number }) {
    this.pageSize = $event.pageSize;
    this.reloadData();
  }

  /***
   * Delete a category by its id after confirmation
   * Warning: If a category is already used by at least one project, it cannot be deleted and an error will be thrown
   * @param id
   */
  deleteCategory(id: number)
  {
    const category = this.categoriesApi.find((category: Category) => {
      return category.id === id;
    });

    if (!category)
    {
      throw new Error("Category not found");
    }

    const modalRef = this.modalService.open(ConfirmDeleteModalCategoryComponent);

    modalRef.componentInstance.name = category.name;
    console.log("categorytName:"+category.version);

    modalRef.result.then(() => {
      this.categoriesApiService.delete(id).subscribe(() => {
        this.reloadData();
      });
    }).catch((e) => {
      console.log(e)});
  }

  ngOnDestroy(): void
  {
    if (this.categoriesSubscription)
    {
      this.categoriesSubscription.unsubscribe();
    }
  }

  searchValueResultHandler($event: String) {
    this.searchTerm = $event;
    this.reloadData();
  }

  displayCategory(category: Category): String {
    return category.name;
  }


}
