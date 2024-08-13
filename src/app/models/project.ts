import {FormControl, FormGroup, Validators} from "@angular/forms";


export class Project {
    id: number;
    version: number;
    projectName: string;
    startDate: string;
    endDate: string;
    status: string;
    url: string;
    categoryId: number;
    description: string;
    projectMembersIds: number[];
    projectChiefId: number;
    filesIds: number [];

    constructor(
        id: number = 0,
        version: number = 0,
        projectName: string = '',
        startDate: string = '',
        endDate: string = '',
        status: string = '',
        url: string = '',
        categoryId: number = 0,
        description: string = '',
        projectMembersIds: number[] = [],
        projectChiefId = 0,
        filesIds: number[] = []
    ) {
        this.id = id;
        this.version = version;
        this.projectName = projectName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.url = url;
        this.categoryId = categoryId;
        this.description = description;
        this.projectMembersIds = projectMembersIds;
        this.projectChiefId = projectChiefId;
        this.filesIds = filesIds;
    }

    /**
     * Vérifie si un argument est une instance de la classe Project.
     * @returns Une valeur booléenne indiquant si l'argument est une instance de Project.
     * @param obj
     */
    static isProject(obj: any): obj is Project {

        return Object.keys(obj).every(key => key in obj) &&
            typeof obj.id === 'number' &&
            typeof obj.version === 'number' &&
            typeof obj.projectName === 'string' &&
            typeof obj.startDate === 'string' &&
            typeof obj.endDate === 'string' &&
            typeof obj.status === 'string' &&
            typeof obj.url === 'string' &&
            typeof obj.categoryId === 'number' &&
            typeof obj.description === 'string' &&
            typeof  obj.filesIds === 'number' &&
            Array.isArray(obj.projectMembersIds &&
            typeof obj.projectChiefId === 'number'); //Array de number
    };

    static createProjectForm(): FormGroup {
        return new FormGroup({
            projectName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            version: new FormControl(0, [Validators.required]),
            startDate: new FormControl('', [Validators.required]),
            filesIds: new FormControl([]),
            endDate: new FormControl('', [Validators.required]),
            status: new FormControl('', [Validators.required]),
            chefProjet: new FormControl(0, [Validators.required]),
            url: new FormControl('', [Validators.required, Validators.maxLength(100)]),
            categoryId: new FormControl(0, [Validators.maxLength(30)]),
            description: new FormControl('', [Validators.maxLength(300)]),
            projectMembersIds: new FormControl([], [Validators.maxLength(300)]),
        });
    }
}
