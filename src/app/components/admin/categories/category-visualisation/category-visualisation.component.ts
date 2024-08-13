import {Component, OnInit} from '@angular/core';
import {Category} from "src/app/models/category";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {CategoryApiService} from "src/app/services/api/category-api.service";
import {Project} from "../../../../models/project";

@Component({
  selector: 'app-category-visualisation',
  templateUrl: './category-visualisation.component.html',
  styleUrls: ['./category-visualisation.component.scss']
})
export class CategoryVisualisationComponent implements OnInit{

    categoryId : number;
    category: Category;
    project:Project;

  /***
   * Cosntructor of the CategoryVisualisationComponent.
   * @param route the route
   * @param categoriesApiService the categoriesApiService
   */
    constructor(private route: ActivatedRoute, private categoriesApiService: CategoryApiService) {
      this.categoryId = -1;
      this.category = new Category();

    this.project = new Project();
    }


  /**
   * ngOnInit Methods
   */
    ngOnInit(): void{
    this.route.queryParams.subscribe(params =>{
      let categoriesNumb: string | null;
      let finalCategoriesNumb: number;
      //Recuperation the 'id' parameter from the URL
      categoriesNumb = this.route.snapshot.paramMap.get('id');
      if (categoriesNumb == null){
        finalCategoriesNumb = -1;
      }
      else {
        finalCategoriesNumb = parseInt(categoriesNumb);
      }
      console.log(finalCategoriesNumb);
      this.categoryId = finalCategoriesNumb;
      try {
        this.getData().subscribe((data) =>
        {
          this.category = data;
        });
      }
      catch (e){
        console.log(e);
      }
    });
    }

  /**
   * Get the data from the API
   */
  getData(): Observable<Category>
  {
    return this.categoriesApiService.getById(this.categoryId);
  }

}
