import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectStateDisplayName'
})
export class ProjectStateDisplayNamePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'TODO':
        return 'A faire';
      case 'IN_PROGRESS':
        return 'En cours';
      case 'COMPLETED':
        return 'Terminé';
      case 'CANCELLED':
        return 'Annulé';
      case 'PAUSED':
        return 'En attente';
      default:
        return value;
    }
  }

}
