import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Project} from "../../../../models/project";
import {ProjectApiService} from "../../../../services/api/project-api.service";
import {firstValueFrom, Observable} from "rxjs";
import {CategoryApiService} from "../../../../services/api/category-api.service";
import {ProjectStatusApiService} from "../../../../services/api/project-status-api.service";
import {Category} from "../../../../models/category";
import { Member } from 'src/app/models/member';
import { MemberApiService } from 'src/app/services/api/member-api.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {

  projectForms : FormGroup;
  project: Project;
  categories: any[] = [];
  statuses: any[] = [];
  chiefs: Observable<Member[]>;

  /***
   * @constructor
   * @param projectApiService the projectApiService
   * @param projectStatusApiService
   * @param categoryApiService
   * @param route the route
   */
  constructor(private projectApiService: ProjectApiService,
              private projectStatusApiService: ProjectStatusApiService,
              private  categoryApiService: CategoryApiService,
              memberService: MemberApiService,
              private route: Router
              ) {
    this.projectForms = Project.createProjectForm();
    this.project = new Project();
    this.chiefs = memberService.getAllMemberChief();
  }

  ngOnInit() {
    this.loadCategories();
    this.loadStatus();
  }
  /***
   * Charge les catégories.
   */
  private loadCategories(): void {
    this.apiGetAllCategories().subscribe({
      next: (dataCategories) => {
        this.categories = dataCategories;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données des catégories', error);
      }
    });
  }
  /***
   * Charge les statuts.
   */
  private loadStatus(): void {
    this.apiGetAllStatuses().subscribe({
      next: (dataStatus) => {
        this.statuses = dataStatus;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données des status', error);
      }
    });
  }

  /**
   * The UpdateprojectForms from the Form.
   */
  updateProjectForms(): void {
    this.project.projectName= this.projectForms.get('projectName')?.value || '';
    this.project.startDate = this.projectForms.get('startDate')?.value || '';
    this.project.endDate = this.projectForms.get('endDate')?.value || '';
    this.project.status = this.projectForms.get('status')?.value;
    this.project.projectChiefId = this.projectForms.get('chefProjet')?.value || 0;
    this.project.url = this.projectForms.get('url')?.value || '';
    this.project.categoryId = this.projectForms.get('categoryId')?.value || '';
    this.project.description = this.projectForms.get('description')?.value || '';
    this.project.projectMembersIds = this.projectForms.get('projectMembersIds')?.value || [];
  }

  /**
   * The resetForm Method  for the Form
   */
  resetForm(): void {
    this.projectForms = Project.createProjectForm();
    this.project = new Project();
  }

  /**
   * Méthode asynchrone qui est appelée lors de la soumission du formulaire.
   * Elle met à jour les propriétés du projet à partir des valeurs du formulaire,
   * puis envoie les données du projet à l'API.
   * Si l'opération est réussie, le formulaire est réinitialisé et l'utilisateur est redirigé vers la liste des projets.
   * En cas d'erreur, l'erreur est affichée dans la console.
   * @returns Une Promise vide.
   *
   * The submit Method.
   * We use it, for
   */
  async onSubmit(): Promise<void> {
    console.log("this.projectForms",this.projectForms)
    if (this.projectForms.valid){
      this.updateProjectForms();
      console.log("this.project",this.project)
      console.log("form.value", this.projectForms.value)
      try {
        await this.postData(this.project)
        this.resetForm();
        this.route.navigate(['/liste']).then(r => console.log(r));
      }
      catch (e){
        console.log(e);
      }
    }
  }

  /**
   * The postData Method.
   * We use the postData for create a Project.
   * For that, we use the projectApiService to call the save method.
   */
  async postData(data: Project): Promise<void> {
    try {
      await firstValueFrom(this.projectApiService.save(data));
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * The fieldData Method.
   * Get information from a form.
   * We can get if the form is "invalid" or dirty etc...
   * We use it for validation form.
   */
  get fieldData() {
    return (fieldName: string) => {
      const fieldControl = this.projectForms.get(fieldName);
      return {
        value: fieldControl?.value || '',
        invalid: fieldControl?.invalid || false,
        dirty: fieldControl?.dirty || false,
        touched: fieldControl?.touched || false,
        errors: fieldControl?.errors || {}
      };
    };
  }


  apiGetAllCategories(): Observable<Category[]> {
    return this.categoryApiService.getAll();
  }

  apiGetAllStatuses(): Observable<any> {
    return this.projectStatusApiService.getAllStatuses();
  }

  /***
   * Get the projectName.
   */
  get projectName() { return this.fieldData('projectName'); }

  /***
   * Get the startDate
   */
  get startDate() { return this.fieldData('startDate'); }

  /***
   * Get the endDate
   */
  get endDate() { return this.fieldData('endDate'); }

  /***
   * Get the status.
   */
  get status() { return this.fieldData('status'); }

  /***
   * Get the chefprojet
   */
  get chefProjet() { return this.fieldData('chefProjet'); }

  /***
   * Get the URL of the project
   */
  get url() { return this.fieldData('url'); }

  /***
   * Get the categoryID
   */
  get categoryId() { return this.fieldData('categoryId'); }

  /***
   * Get the description
   */
  get description() { return this.fieldData('description'); }

}
