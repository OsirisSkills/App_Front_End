import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent {
  todo = ['Conception du projet App', 'Maintenance du site En Recherche Active', 'Conception du site Web Skills', 'Validation pour la mise en production du Site Web'];

  done = ['Mise en production du Site Web En Recherche Active', 'Maquettage du Projet App'];

  delete = ['Le site Web Comparator', 'Application du Site Mobile Comparator'];

  /***
   * The Drop Method.
   * We use the Drop Module from Angular.
   * @param event the event
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
