import { Component, OnInit } from '@angular/core';
import {StatsApiService} from "src/app/services/api/stats-api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {StatsAPI} from "../../models/stats";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private statsApiService: StatsApiService,
              private modalService: NgbModal) {
  }

  statsApi: StatsAPI = new StatsAPI();
  private statsSubscription!: Subscription;


  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    if (this.statsSubscription) {
      this.statsSubscription.unsubscribe();
    }

    this.statsApiService.getAllStats().subscribe((stats: StatsAPI) => {
      this.statsApi = stats;
    });

    console.log("statsApi");
    console.log(this.statsApi);
    console.log("ApiStats");

  }


// Converts automatically the file size in bytes to a human-readable format (KB, MB, GB, etc.)
  convertSizeToHumanReadable(size: number): string {
    if (size === 0) {
      return '0 B';
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let unitIndex = Math.floor(Math.log(size) / Math.log(1024));

    //Overkill considering the list length, but just in case
    if (unitIndex >= units.length) {
      unitIndex = units.length - 1;
    }

    let newSize = size / Math.pow(1024, unitIndex);

    console.log(newSize.toFixed(2) + ' ' + units[unitIndex])
    return newSize.toFixed(2) + ' ' + units[unitIndex];
  }

  getJoinedCategoryNames(): string {
    return Object.values(this.statsApi.categoryStats.categoryNames).join(' - ');
  }


  // // Pie
  // public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'hello'];
  // public pieChartNumbers: number[] = [300, 500, 100, 120, 51];
  //
  // // Tableau de projets
  // projects: Project[] = [
  //   { id: 1, name: 'Projet 1', type: 'Développement logiciel', status: 'En cours', duration: 120 },
  //   { id: 2, name: 'Projet 2', type: 'Site Web', status: 'Terminé', duration: 45 },
  //   { id: 3, name: 'Projet 3', type: 'Développement logiciel', status: 'En cours', duration: 60 },
  //   { id: 4, name: 'Projet 4', type: 'Site Web', status: 'En cours', duration: 90 },
  //   { id: 5, name: 'Projet 5', type: 'Site Web', status: 'Terminé', duration: 30 },
  //   { id: 6, name: 'Projet 6', type: 'Application mobile', status: 'En cours', duration: 100 },
  //   { id: 7, name: 'Projet 7', type: 'Infrastructure réseau', status: 'Terminé', duration: 180 },
  //   { id: 8, name: 'Projet 8', type: 'Sécurité informatique', status: 'En cours', duration: 150 },
  //   { id: 9, name: 'Projet 9', type: 'Intelligence artificielle', status: 'En cours', duration: 200 },
  //   { id: 10, name: 'Projet 10', type: 'Big Data', status: 'Terminé', duration: 120 },
  //   { id: 11, name: 'Projet 11', type: 'IoT (Internet des Objets)', status: 'En cours', duration: 90 },
  //   { id: 12, name: 'Projet 12', type: 'E-commerce', status: 'Terminé', duration: 75 },
  //   { id: 13, name: 'Projet 13', type: 'Design graphique', status: 'En cours', duration: 60 },
  //   { id: 14, name: 'Projet 14', type: 'Marketing digital', status: 'Terminé', duration: 45 },
  //   { id: 15, name: 'Projet 15', type: 'Réalité virtuelle', status: 'En cours', duration: 110 },
  //   { id: 16, name: 'Projet 16', type: 'Développement logiciel', status: 'En cours', duration: 130 },
  //   { id: 17, name: 'Projet 17', type: 'Site Web', status: 'En cours', duration: 85 }
  //   // ...
  // ];
  //
  // totalProjects!: number;
  // projectsByType: any = {};
  // projectsByStatus: any = {};
  // averageDuration!: number;
  //
  // constructor() { }
  //
  // ngOnInit(): void {
  //   this.totalProjects = this.projects.length;
  //   this.calculateProjectsByType();
  //   this.calculateProjectsByStatus();
  //   this.calculateAverageDuration();
  //
  //   // Utilisation de map pour extraire les types de projets
  //   const projectTypes = this.projects.map(project => project.type);
  //
  //   // Utilisation de reduce pour compter le nombre de projets pour chaque type
  //   const projectTypeCounts = projectTypes.reduce((counts: ProjectTypeCounts, type) => {
  //     if (!counts[type]) {
  //       counts[type] = 1;
  //     } else {
  //       counts[type]++;
  //     }
  //     return counts;
  //   }, {});
  //
  //   // Utilisation des résultats pour remplir les tableaux de labels et de nombres
  //   this.pieChartLabels = Object.keys(projectTypeCounts);
  //   this.pieChartNumbers = Object.values(projectTypeCounts);
  // }
  //
  // calculateProjectsByType(): void {
  //   this.projects.forEach(project => {
  //     this.projectsByType[project.type] = (this.projectsByType[project.type] || 0) + 1;
  //   });
  // }
  //
  // calculateProjectsByStatus(): void {
  //   this.projects.forEach(project => {
  //     this.projectsByStatus[project.status] = (this.projectsByStatus[project.status] || 0) + 1;
  //   });
  // }
  //
  // calculateAverageDuration(): void {
  //   const totalDuration = this.projects.reduce((acc, project) => acc + project.duration, 0);
  //   this.averageDuration = totalDuration / this.totalProjects;
  // }

  protected readonly Object = Object;
}
