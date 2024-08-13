import {Component, OnInit} from '@angular/core';
import {ProjectStatusApiService} from "../../services/api/project-status-api.service";

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})

export class ProjectStatusComponent implements OnInit {

  statuses: any[] = [];

  constructor(private projectStatusService: ProjectStatusApiService) { }

  ngOnInit(): void {
    this.projectStatusService.getAllStatuses().subscribe(
        data => {
          this.statuses = data;
        },
        error => {
          console.error('Error fetching project statuses', error);
        }
    );
  }

  getStatuses(): any[] {
      return this.statuses
  }

}