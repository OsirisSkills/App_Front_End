import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectApiService} from "src/app/services/api/project-api.service";
import {Project} from "src/app/models/project";
import {Observable} from "rxjs";
import {ProjectFile} from "src/app/models/project-file";
import {ProjectFileApiService} from "src/app/services/api/project-file-api.service";
import {Member} from "src/app/models/member";
import {MemberApiService} from "../../../../services/api/member-api.service";
import {Category} from "../../../../models/category";
import {CategoryApiService} from "../../../../services/api/category-api.service";

@Component({
    selector: 'app-project-visualisation',
    templateUrl: './project-visualisation.component.html',
    styleUrls: ['./project-visualisation.component.scss']
})
export class ProjectVisualisationComponent implements OnInit {

    projectId: number;
    project: Project;
    category: Category;
    members: Member[];
    projectFiles: ProjectFile[];

    //Utilisé pour le HTML
    categoryName: string = "";
    membersNames: string = "";


    /***
     * @constructor
     * @param route the route
     * @param projectApiService the projectApiService
     * @param projectFileApiService the projectFileApiService
     * @param memberApiService
     * @param categoryApiService
     */
    constructor(private route: ActivatedRoute,
                private projectApiService: ProjectApiService,
                private projectFileApiService: ProjectFileApiService,
                private memberApiService: MemberApiService,
                private categoryApiService: CategoryApiService) {
        this.projectId = -1;
        this.project = new Project();
        this.category = new Category();
        this.members = [];
        this.projectFiles = [];

    }

    /**
     *ngOnInit Method
     */
    ngOnInit(): void {
        this.route.queryParams.subscribe(() => {
            let projectNum: string | null;
            let finalProjectNum: number;
            // Récupération du paramètre 'id' de l'URL
            projectNum = this.route.snapshot.paramMap.get('id');
            if (projectNum == null) {
                finalProjectNum = -1;
            } else {
                finalProjectNum = parseInt(projectNum);
            }

            console.log(finalProjectNum);

            // Affichage du nom du projet
            console.log(this.project.projectName);

            // Assignation de la valeur de finalProjectNum à la propriété projectId
            this.projectId = finalProjectNum;
            try {
                this.getProjectData().subscribe((data: any) => {
                    console.log(data);
                    this.project = data;

                    if (this.project.projectMembersIds) {
                        this.project.projectMembersIds.forEach((memberId: number) => {
                            this.getMembersData(memberId).subscribe((dataMember: any) => {
                                this.members.push(dataMember);
                            });
                        });
                    }

                    if (this.project.categoryId) {
                        this.getCategoryData(this.project.categoryId).subscribe((dataCategory: any) => {
                            this.category = dataCategory;
                            this.categoryName = this.getCategoryName();
                        });
                    }

                });
            } catch (e) {
                console.log(e);
            }

            try {
                this.getProjectFileData().subscribe((dataFiles: any) => {
                    console.log(dataFiles);
                    this.projectFiles = dataFiles;

                });
            } catch (e) {
                console.log(e);
            }
        });
    }

    getAutoSize(size: number): string {
        return ProjectFile.autoSelectSizeUnit(size);
    }

    /**
     * Get the data of the Project from the current DataBase.
     * For that, we use the getById method from
     * projectAPiService.
     */
    getProjectData(): Observable<Project> {
        return this.projectApiService.getById(this.projectId);
    }

    /**
     * Get the data of the Members from the current DataBase.
     * For that, we use the getById method from
     * memberAPiService.
     */
    getMembersData(memberId: number): Observable<Member> {
        return this.memberApiService.getById(memberId);
    }

    /**
     * Get the data of the Category from the current DataBase.
     * For that, we use the getById method from
     * categoryAPiService.
     */
    getCategoryData(categoryId: number): Observable<Category> {
        return this.categoryApiService.getById(categoryId);
    }

    /**
     * Get the data of the ProjectFile from the current DataBase.
     * For that, we use the listFilesByProjectId method from
     * projectFileAPiService.
     */
    getProjectFileData(): Observable<ProjectFile> {
        return this.projectFileApiService.listFilesByProjectId(this.projectId);
    }

    // getMemberNames(): string {
    //  return this.members
    //     // Get member names and put those into a url
    //     let finalString = ""
    //
    //     this.members.forEach((member: Member) => {
    //         finalString += "<a href='/members/" + member.id + "'>" + member.firstName + ' ' + member.lastName + "</a>, ";
    //         //finalString += member.firstName + ' ' + member.lastName + ',';
    //     });
    //     return finalString;
    //     //return this.members.map(member => member.firstName + ' ' + member.lastName).join(', ');
    // }

    getCategoryName(): string {
        return this.category.name;
    }

    download(file: ProjectFile) {
        const projectId = this.projectId;
        const id = file.id;
        this.projectFileApiService.downloadFileById(projectId, id).subscribe(data => {
            const blob = new Blob([data], {type: file.fileType});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.filename;
            link.click();
            window.URL.revokeObjectURL(url);
        });
    }

    view(file: ProjectFile) {
        const projectId = this.projectId;
        const id = file.id;
        this.projectFileApiService.downloadFileById(projectId, id).subscribe(data => {

            const blob = new Blob([data], {type: file.fileType});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }

}
