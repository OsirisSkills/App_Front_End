import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Project} from "src/app/models/project"
import {Observable, Subscription} from "rxjs";
import {ProjectApiService} from "src/app/services/api/project-api.service";
import {ProjectFile} from "src/app/models/project-file";
import {ProjectFileApiService} from "src/app/services/api/project-file-api.service";
import {HttpEvent} from "@angular/common/http";
import {Member} from "src/app/models/member";
import {MemberApiService} from "src/app/services/api/member-api.service";
import {CategoryApiService} from "src/app/services/api/category-api.service";
import {Category} from "../../../../models/category";
import {ProjectStatusApiService} from "../../../../services/api/project-status-api.service";
import {
    ConfirmDeleteModalProjectComponent
} from "../confirm-delete-modal-project/confirm-delete-modal-project.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


class MemberSelected {
    id: number;
    name: string;
    selected: boolean;

    constructor(id: number = -1, name: string = "", selected: boolean = false) {
        this.id = id;
        this.name = name;
        this.selected = selected;
    }
}


@Component({
    selector: 'app-project-modification',
    templateUrl: './project-modification.component.html',
    styleUrls: ['./project-modification.component.scss']
})
export class ProjectModificationComponent implements OnInit {

    projectId: number = -1;
    project: Project;
    category: Category;
    projectFiles: ProjectFile[];
    selectedFiles: File[] = [];
    members: Member[];
    chiefMembers: Member[];

    selectedMembers: MemberSelected[] = [];
    selectedChiefMember: MemberSelected[] = [];
    categories: Category[];
    status: [{ value: string, description: string }];
    private projectFileSubscription: Subscription | undefined;
    private memberSubscription: Subscription | undefined;
    private chiefMemberSubscription: Subscription | undefined;

    fileInputValue: any = null;
    uploadFileButton: boolean = false;

    /***
     * @constructor
     * @param projectApiService
     * @param projectFileApiService
     * @param MemberApiService
     * @param categoryApiService
     * @param projectStatusApiService
     * @param modalService
     * @param route
     * @param router
     */
    constructor(private projectApiService: ProjectApiService,
                private projectFileApiService: ProjectFileApiService,
                private MemberApiService: MemberApiService,
                private categoryApiService: CategoryApiService,
                private projectStatusApiService: ProjectStatusApiService,
                private modalService: NgbModal,
                private route: ActivatedRoute,
                private router: Router) {
        this.projectId = -1;
        this.project = new Project();
        this.category = new Category();
        this.members = [];
        this.projectFiles = [];
        this.categories = [];
        this.chiefMembers = [];
        this.selectedChiefMember = [];
        this.status = [{value: '', description: ''}];
    }

    /**
     * NgOnInit method.
     */
    ngOnInit() {
        this.loadProjectData().then(() => {

            this.loadProjectFiles();
            this.loadMembers();
            this.loadChiefMembers();
            this.loadCategories();
            this.loadStatus();

            console.log("Project :")
            console.log(this.project)
        }).catch((error) => {
            console.error('Erreur lors du chargement des données du projet', error);
        });
    }


    /*
     * ==================================
     * Subscriber zone (Loading Zone)
     * ==================================
     */

    /***
     * Méthode asynchrone qui est appelée lors de la soumission du formulaire.
     * Elle met à jour les propriétés du projet à partir des valeurs du formulaire,
     * puis envoie les données du projet à l'API.
     * Si l'opération est réussie, le formulaire est réinitialisé et l'utilisateur est redirigé vers la liste des projets.
     * En cas d'erreur, l'erreur est affichée dans la console.
     * @returns Une Promise vide.
     */
    private loadProjectData(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.route.queryParams.subscribe({
                next: () => {
                    const projectIdStr = this.route.snapshot.paramMap.get('id');

                    if (projectIdStr == null) {
                        reject('L\'identifiant du projet est manquant');
                        return;
                    }
                    this.projectId = parseInt(projectIdStr);
                    this.apiGetData().subscribe({
                        next: (data) => {
                            this.project = data;
                            resolve(); // Résout la promesse une fois que les données du projet sont chargées.
                        },
                        error: (error) => {
                            console.error('Erreur lors du chargement des données du projet', error);
                            reject(error); // Rejette la promesse si une erreur survient lors du chargement des données.
                        },
                        // 'complete' n'est pas nécessaire ici car 'next' ou 'error' seront toujours appelés.
                    });
                },
                error: (error) => {
                    console.error('Erreur lors de la récupération des queryParams', error);
                    reject(error); // Rejette la promesse si une erreur survient lors de la récupération des queryParams.
                },
                // 'complete' n'est pas nécessaire ici car 'next' ou 'error' seront toujours appelés.
            });
        });
    }

    /***
     * Charge les fichiers liés au projet.
     */
    private loadProjectFiles(): void {
        this.apiGetProjectFileData().subscribe({
            next: (dataFiles) => {
                this.projectFiles = dataFiles;
            },
            error: (error) => {
                console.error('Erreur lors du chargement des données des fichiers liés au projet', error);
            },
            complete: () => {
                this.projectFileSubscription?.unsubscribe();
            }
        });
    }

    /***
     * Charge les membres.
     */
    private loadMembers(): void {
        this.apiGetAllMembers().subscribe({
            next: (dataMembers) => {
                this.members = dataMembers;
                this.members.forEach((member) => {
                    this.selectedMembers.push(new MemberSelected(member.id,
                        member.firstName + ' ' + member.lastName,
                        this.project.projectMembersIds.includes(member.id)));
                });
            },
            error: (error) => {
                console.error('Erreur lors du chargement des données des membres', error);
            },
            complete: () => {
                this.memberSubscription?.unsubscribe();
            }
        });
    }

    /***
     * Charge les membres chefs de projet.
     */
    private loadChiefMembers(): void {
        this.apiGetAllChiefMember().subscribe({
            next: (dataMembers) => {
                this.chiefMembers = dataMembers;
                this.chiefMembers.forEach((member) => {
                    this.selectedChiefMember.push(new MemberSelected(member.id,
                        member.firstName + ' ' + member.lastName,
                        member.projectIds.includes(this.projectId)));
                });
            },
            error: (error) => {
                console.error('Erreur lors du chargement des données des membres', error);
            },
            complete: () => {
                this.chiefMemberSubscription?.unsubscribe();
            }
        });
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
                this.status = dataStatus;
            },
            error: (error) => {
                console.error('Erreur lors du chargement des données des status', error);
            }
        });
    }

    /*
     * ==================================
     * API Caller zone
     * ==================================
     */

    /**
     * Get the data.
     * We use the projectApiService, to get the method getById.
     */
    apiGetData(): Observable<Project> {
        return this.projectApiService.getById(this.projectId);
    }

    /**
     * Get the data of the Members from the current DataBase.
     */
    apiGetAllMembers(): Observable<Member[]> {
        return this.MemberApiService.getAll();
    }

    /**
     * Get the data of the projectChief by using the members and filtering by the role.
     */
    apiGetAllChiefMember(): Observable<Member[]> {
        return this.MemberApiService.getAllMemberChief();
    }

    apiGetAllCategories(): Observable<Category[]> {
        return this.categoryApiService.getAll();
    }

    apiGetAllStatuses(): Observable<any> {
        return this.projectStatusApiService.getAllStatuses();
    }

    apiGetProjectFileData(): Observable<ProjectFile[]> {
        return this.projectFileApiService.listFilesByProjectId(this.projectId);
    }

    apiPutProjectData(): Observable<Project> {
        return this.projectApiService.update(this.project);
    }

    apiPutFilesData(element: File): Observable<HttpEvent<any>> {
        return this.projectFileApiService.uploadFile(this.projectId, element);
    }

    apiDeleteFile(id: number): Observable<any> {
        return this.projectFileApiService.deleteFileById(this.projectId, id);
    }

    apiDownloadFile(id: number): Observable<any> {
        return this.projectFileApiService.downloadFileById(this.projectId, id);
    }

    /*
     * ==================================
     * Event zone
     * ==================================
     */


    onSelectionMember(selMember: { id: number, name: string, selected: boolean }) {
        console.log("toggleSelectionMember " + selMember.id);
        selMember.selected = !selMember.selected;
    }

    onFileSelected(event: any) {
        const files: FileList = event.target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                this.selectedFiles.push(files[i]);
            }
        }
        if (this.selectedFiles)
            this.uploadFileButton = true;
    }

    /*
     * ==================================
     * File Manager zone
     * ==================================
     */

    uploadFiles(): void {
        if (this.selectedFiles) {
            for (const element of this.selectedFiles) {
                console.log(element)
                this.apiPutFilesData(element).subscribe({

                    next: (response: HttpEvent<any>) => {
                        console.log(response);
                        this.loadProjectFiles();
                    },

                    // next: (response: HttpEvent<any>) => console.log(response),
                    error: (err) => console.log(err)
                })
            }
            // Clean the selectedFiles array
            this.loadProjectFiles();
        }
        this.clearFileInput();
    }

    deleteFile(file: ProjectFile) {

        const modalRef = this.modalService.open(ConfirmDeleteModalProjectComponent);
        modalRef.componentInstance.message = "Voulez-vous vraiment supprimer le fichier suivant ?";
        modalRef.componentInstance.objectName = file.filename + "." + file.extension;

        modalRef.result.then((result) => {
            if (result) {
                this.apiDeleteFile(file.id).subscribe({
                    next: (data) => {
                        if (data) {
                            console.log("file deleted");
                            this.projectFiles = this.projectFiles.filter((currentFile) => currentFile.id !== file.id);
                        }
                    },
                    error: (err) => console.log(err),
                    complete: () => this.loadProjectFiles()
                });
            }
        });
    }

    viewFile(file: ProjectFile) {

        this.apiDownloadFile(file.id).subscribe(data => {

            const blob = new Blob([data], {type: file.fileType});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }

    downloadFile(file: ProjectFile) {
        this.apiDownloadFile(file.id).subscribe(data => {
            const blob = new Blob([data], {type: file.fileType});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.filename;
            link.click();
            window.URL.revokeObjectURL(url);
        });
    }

    clearFileInput() {
        this.fileInputValue = null;
        this.selectedFiles = [];
        this.uploadFileButton = false;
    }

    /*
     * ==================================
     * Save Project zone
     * ==================================
     */

    /**
     * Méthode qui permet de mettre à jour les données du projet.
     */
    updateProject() {
        this.updateProjectMembers();

        this.apiPutProjectData().subscribe({
            next: () => {
                this.router.navigate(['/liste']).then(r => console.log(r));
            },
            error: (error) => {
                console.error('Erreur lors de la mise à jour du projet', error);
            }
        });
    }

    /**
     * Méthode qui permet de mettre à jour les membres du projet.
     */
    updateProjectMembers() {
        this.project.projectMembersIds = [];
        for (let member of this.selectedMembers) {
            if (member.selected) {
                this.project.projectMembersIds.push(member.id);
            }
        }
    }


    /*
     * ==================================
     * Other Functions zone
     * ==================================
     */

    /**
     * Méthode qui permet de retourner la liste des membres sélectionnés.
     */
    showSelectedMembers(): string {
        return this.selectedMembers.filter(member => member.selected).map(member => member.name).join(', ');
    }

    /**
     * Méthode qui permet de sélectionner tous les membres.
     */
    selectAllMembers() {
        if (this.selectedMembers.length > 0) {
            for (let member of this.selectedMembers) {
                member.selected = true
            }
        }
    }

    /**
     * Méthode qui permet de désélectionner tous les membres.
     */
    deselectAllMembers() {
        if (this.selectedMembers.length > 0) {
            for (let member of this.selectedMembers) {
                member.selected = false
            }
        }
    }

    /**
     * Méthode qui permet l'auto-size du tableau des fichiers.
     * @param size
     */
    getAutoSize(size: number): string {
        return ProjectFile.autoSelectSizeUnit(size);
    }



}