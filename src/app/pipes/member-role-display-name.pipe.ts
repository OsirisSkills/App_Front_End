import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memberRoleDisplayName'
})
export class MemberRoleDisplayNamePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'ADMIN': return 'Administrateur';
      case 'CLIENT': return 'Client';
      case 'DEVELOPER': return 'Développeur';
      case 'MANAGER': return 'Manager';
      case 'PROJECT_MANAGER': return 'Chef de projet';
      case 'TESTER': return 'Testeur';
      default: return value;
    }
  }

}
