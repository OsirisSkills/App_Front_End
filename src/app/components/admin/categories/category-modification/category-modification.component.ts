import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {firstValueFrom, Observable} from "rxjs";
import {CategoryApiService} from "src/app/services/api/category-api.service";
import {Category} from "src/app/models/category";

@Component({
  selector: 'app-category-modification',
  templateUrl: './category-modification.component.html',
  styleUrls: ['./category-modification.component.scss']
})
export class CategoryModificationComponent implements OnInit{

  categoryId: number = -1;
  category: Category;

  constructor(private route: ActivatedRoute,
              private categoriesApiService: CategoryApiService,
              private router: Router) {
    this.categoryId = -1;
    this.category = {id: -1, name: '', version: '', description: ''};
  }

  /***
   * The ngOnInit methods
   */
  ngOnInit(): void{
    this.route.queryParams.subscribe(params =>{

      // Get the id from the route
      let categoriesNumb: string | null;
      let finalCategoriesNumb: number;
      categoriesNumb = this.route.snapshot.paramMap.get('id');
      if (categoriesNumb === null){
        finalCategoriesNumb = -1;
      }
      else {
        finalCategoriesNumb = parseInt(categoriesNumb);
      }
      this.categoryId = finalCategoriesNumb;

      // Get the data from the API
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

  /**
   * Update the category
   */
  async updateCategory(){
    // Send data to the API
    try {
      await firstValueFrom(this.categoriesApiService.update(this.category));
    } catch (error){
      console.error('Erreur lors de la mise à jour des données : ', error);
    }

    //this.categoriesApiService.update(this.category).subscribe();
    this.router.navigate(['/category']).then(r => console.log(r));
  }
}
