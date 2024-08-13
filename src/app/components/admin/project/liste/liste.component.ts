import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProjectApiService} from "src/app/services/api/project-api.service";
import {Observable, Subscription} from "rxjs";
import {Project} from "src/app/models/project";
import {Category} from "src/app/models/category";
import {CategoryApiService} from "src/app/services/api/category-api.service";
import {ConfirmDeleteModalProjectComponent} from "src/app/components/admin/form-list-project/confirm-delete-modal-project/confirm-delete-modal-project.component";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})


export class ListeComponent implements OnInit {


  id!: number;
  projectApi: Project[];
  categoryApi: any = [];
  quantityOfProject: number = -1
  // filteredProject: Project[] = this.project;
  searchTerm: String = '';
  column = 'projectName'; // Default column

  categoryNames: { [ProjectId: number] : string } = {};


  // currentSort: { column: keyof Project,  direction: 1 | -1 } = { column: 'name', direction: 1 };
  // Pagination
  currentPage = 1; // Default page
  pageSize = 10; // Default page size
  private projectSubscription!: Subscription;

  /***
   * @constructor
   * @param projectApiService : ProjectApiService : Service qui permet de faire le lien avec l'API
   * @param categoryApiService : CategoryApiService : Service qui permet de faire le lien avec l'API
   * @param modalService  : NgbModal : Service qui permet d'ouvrir une fenêtre modale
   */
  constructor(private projectApiService: ProjectApiService,
              private categoryApiService: CategoryApiService,
              private modalService: NgbModal) {

    this.projectApi = [];

  }

  /**
   * Méthode qui est appelée lors de l'initialisation du composant.
   * Elle récupère le nombre total de projets à partir de l'API et met à jour la propriété `quantityOfProject`.
   * Ensuite, elle recharge les données du composant en appelant la méthode `reloadData()`.
   */
  ngOnInit(): void {


    this.reloadData();

  }

  /**
   * Méthode qui récupère les données des projets à afficher.
   * Elle utilise la méthode `getAllBy()` de `projectApiService` en passant les paramètres `currentPage` (page actuelle) et `pageSize` (taille de la page).
   * Elle vérifie également si il y a une recherche en cours et si c'est le cas, elle ajoute le paramètre `searchTerm` à la requête ainsi que la colonne sur laquelle effectuer la recherche.
   * @returns Un observable contenant les données des projets.
   */
  getData(): Observable<Project[]> {

    if (this.searchTerm !== '') {
      return this.projectApiService.getAllBy(this.currentPage, this.pageSize, this.searchTerm, this.column);
    }
    return this.projectApiService.getAllBy(this.currentPage, this.pageSize);
  }


  getDataForCategory(): Observable<Category> {
    if (this.searchTerm !== '') {
      return this.categoryApiService.getAllBy(this.currentPage, this.pageSize, this.searchTerm, this.column);
    }
    return this.categoryApiService.getAllBy(this.currentPage, this.pageSize);
  }


  getCategoryData(id: number): Observable<Category> {
    return this.categoryApiService.getById(id);
  }


  /**
   * Méthode qui recharge les données du composant.
   * Si un abonnement à `projectSubscription` existe, il est désabonné pour éviter les fuites de mémoire.
   * Ensuite, elle récupère les données à l'aide de la méthode `getData()` et souscrit à l'observable renvoyé.
   * Elle récupère également le nombre total de projets à partir de l'API et met à jour la propriété `quantityOfProject`.
   * Lorsque les données sont reçues, elles sont assignées à la propriété `projectApi` et affichées dans la console.
   * En cas de recherche, celle-ci s'adapte pour ne filtrer que les éléments demandés.
   */
  reloadData(): void {
    if (this.projectSubscription)
      this.projectSubscription.unsubscribe();

    this.categoryNames = {};

    if (this.searchTerm === '') {
      this.projectApiService.count().subscribe((totalCount: any) => {
        if (typeof totalCount === 'object' && totalCount !== null && 'result' in totalCount && typeof totalCount.result === 'number') {
          this.quantityOfProject = totalCount.result;
        }
      });

      this.projectSubscription = this.getData().subscribe((data) => {
        this.projectApi = data;
        this.loadCategoryName(this.projectApi);
      });
    } else {
      this.projectApiService.countBy(this.searchTerm, this.column).subscribe((totalCount: any) => {
        if (typeof totalCount === 'object' && totalCount !== null && 'result' in totalCount && typeof totalCount.result === 'number') {
          this.quantityOfProject = totalCount.result;
        }
      });

      this.projectSubscription = this.getData().subscribe((data) => {
        this.projectApi = data;
        this.loadCategoryName(this.projectApi);
      });
    }
  }

  loadCategoryName(projectApi: Project[]): void {
    projectApi.forEach((project: Project) => {
      this.getCategoryData(project.categoryId).subscribe((category: Category) => {
        this.categoryNames[project.id] = category.name;
      });
    });
  }


  /***
   * Méthode qui est appelée lorsque l'utilisateur change de page.
   * Elle met à jour la propriété 'currentPage' & 'pageSize' puis recharge les données avec `reloadData()`.
   * @param event
   */
  onPageChange(event: { currentPage: number; pageSize: number }): void {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
    this.reloadData();
  }

  /***
   * Méthode qui est appelée lorsque l'utilisateur change la taille de la page.
   * Elle met à jour la propriété 'pageSize' puis recharge les données avec `reloadData()`.
   * @param $event
   */
  onPageSizeChange($event: { pageSize: number }): void {
    this.pageSize = $event.pageSize;
    this.reloadData();
  }

  /**
   * Méthode pour supprimer un projet en fonction de son identifiant.
   * Elle recherche le projet correspondant à l'identifiant dans la liste `projectApi`.
   * Si le projet n'est pas trouvé, une erreur est levée avec le message "Project not found".
   * Ensuite, elle ouvre une fenêtre modale de confirmation de suppression en utilisant `modalService.open()`
   * et lui transmet le nom du projet à supprimer.
   * Lorsque l'utilisateur confirme la suppression, la méthode `delete()` de `projectApiService` est appelée
   * avec l'identifiant du projet à supprimer, et la méthode `reloadData()` est appelée pour recharger les données du composant.
   * Si une erreur se produit lors de la suppression, elle est affichée dans la console.
   * @param id L'identifiant du projet à supprimer.
   */
  deleteProject(id: number): void {
    const project: Project | undefined = this.projectApi.find((project: Project) => {
      return project.id === id;
    });
    if (!project) {
      throw new Error(`Project not found`);
    }

    const modalRef = this.modalService.open(ConfirmDeleteModalProjectComponent);
    modalRef.componentInstance.message = "Êtes-vous sûr de vouloir supprimer ce projet ?";
    modalRef.componentInstance.objectName = project.projectName;





    modalRef.result.then(() => {
      this.projectApiService.delete(id).subscribe(() => {
        this.reloadData();
      });
    }).catch((e) => {
      console.log(e)
    });
  }


  /***
   * Méthode qui est appelée lorsque l'utilisateur clique sur le bouton de recherche.
   * Celui-ci récupère le string de la barre de recherche émis par le composant enfant `search-bar`.
   * Il met à jour la propriété 'searchTerm' puis recharge les données avec `reloadData()` en prenant en compte le nouveau terme de recherche.
   * @param value
   */
  searchValueResultHandler(value: String): void {
    this.searchTerm = value;
    this.reloadData();
  }

  /**
   * Méthode appelée lors de la destruction du composant.
   * Si `projectSubscription` existe, elle désabonne le composant de l'abonnement en appelant `unsubscribe()`.
   * Cela permet d'éviter les fuites de mémoire et les mises à jour inutiles lorsque le composant est détruit.
   */
  ngOnDestroy(): void {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }

  displayProject(project: Project): string {
    return project.projectName;
  }


}
