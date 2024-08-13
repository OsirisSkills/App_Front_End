import { Component } from '@angular/core';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrls: ['./internal-server.component.scss']
})
export class InternalServerComponent {

  errorMessage:string="500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!";
}
