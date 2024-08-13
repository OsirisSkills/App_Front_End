import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {Category} from "src/app/models/category";
import {CategoryApiService} from "src/app/services/api/category-api.service";
import { firstValueFrom } from "rxjs";


@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.scss']
})
export class CategoryCreationComponent{

  categoryForm : FormGroup;
  category: Category;

  constructor(private categoriesApiService: CategoryApiService,
              private route: Router){
    this.categoryForm = Category.createCategoryForm();
    this.category = new Category();
  }

  /**
   * Update the 'category' object with values from the 'categoryForm' form.
   */
  updateCategoryFromForm(): void {
    this.category.name = this.categoryForm.get('name')?.value || '';
    this.category.version = this.categoryForm.get('version')?.value || '';
    this.category.description = this.categoryForm.get('description')?.value || '';
  }

  /**
   * Reset the form
   */
  resetForm(): void {
    this.categoryForm = Category.createCategoryForm();
    this.category = new Category();
  }

  /**
   * Submit the form
   * @returns Promise<void>
   */
  async onSubmit(): Promise<void> {
    this.updateCategoryFromForm();

    try {
      await this.postData(this.category)
      this.resetForm();
      this.route.navigate(['/category']).then(r => console.log(r));
    }
    catch (e) {
      console.log(e);
    }
  }

  /***
   * The postData's method
   * @param data the data.
   */
  async postData(data: Category){
    try {
      await firstValueFrom(this.categoriesApiService.save(data));
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * Get the data of a field
   */
  get fieldData() {
    return (fieldName: string) => {
      const fieldControl = this.categoryForm.get(fieldName);
      return {
        value: fieldControl?.value || '',
        invalid: fieldControl?.invalid || false,
        dirty: fieldControl?.dirty || false,
        touched: fieldControl?.touched || false,
        errors: fieldControl?.errors || {}
      };
    };
  }


  /***
   * Get the name.
   */
  get name() { return this.fieldData('name');}

  /***
   * Get the version.
   */
  get version() { return this.fieldData('version');}

  /***
   * Get the description.
   */
  get description() { return this.fieldData('description');}

}
