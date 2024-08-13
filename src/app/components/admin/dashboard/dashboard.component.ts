import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    userData: any[] = [];
    projectData: any[] = [];

    public chefProjectDispoData: number[][] = [[45, 36, 25, 26, 36, 12, 21], [50, 48, 40, 38, 47, 30, 28], [5, 12, 15, 12, 11, 18, 7]];
    public chefProjectLabelData: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet"];
    public chefProjectTitleData: string[] = ["En cours", "Total", "En pause"];
    public chefProjectColorData: string[] = ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"];

    public avancementData: number[][] = [[45, 36, 25, 26, 36, 12, 21], [50, 48, 40, 38, 47, 30, 28], [5, 12, 15, 12, 11, 18, 7]];
    public avancementLabel: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet"];
    public avancementProjectTitle: string[] = ["Actif", "Total", "Inactif"];
    public avancementProjectColor: string[] = ["rgba(50, 199, 132, 1)", "rgba(254, 62, 135, 1)", "rgba(55, 206, 186, 1)"];


    generateUserData() {
        const projects = ["Agile", "App", "Cfa", "Erp", "Pardawan", "Planning-salles", "Process", "Rh", "Skills"];
        const names = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank"];

        for (let i = 0; i < 5; i++) {
            const chefDeProjet = names[Math.floor(Math.random() * names.length)]
            const availability = Math.random() < 0.5 ? "Disponible" : new Date(Date.now() + Math.floor(Math.random() * 14) * 86400000).toLocaleDateString();
            const projet = availability === "Disponible" ? "" : projects[Math.floor(Math.random() * projects.length)];

            this.userData.push({
                chefDeProjet: chefDeProjet,
                availability: availability,
                projet: projet
            });
        }
    }

    generateProjectData() {
        const projects: String[] = ["Agile", "App", "Cfa", "Erp", "Pardawan", "Planning-salles", "Process", "Rh", "Skills"];
        const date: Date[] = [new Date(2023, 11, 13), new Date(2023, 11, 13), new Date(2023, 11, 13),
            new Date(2023, 11, 13), new Date(2023, 11, 13), new Date(2023, 11, 13), new Date(2023, 11, 13)
            , new Date(2023, 11, 13), new Date(2023, 11, 13)];
        const progress: number[] = [100, 75, 90, 75, 80, 95, 100,75,100];

        for (let i = 0; i < 9; i++) {
            this.projectData.push({
                projet: projects[i],
                dateProj: date[i].toLocaleDateString(),
                progressProj: progress[i]
            });
        }
    }

    ngOnInit(): void {
        this.generateUserData();
        this.generateProjectData();
    }
}
