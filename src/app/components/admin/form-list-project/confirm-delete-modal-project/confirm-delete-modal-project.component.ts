import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-delete-modal-project',
  templateUrl: './confirm-delete-modal-project.component.html',
  styleUrls: ['./confirm-delete-modal-project.component.scss']
})
export class ConfirmDeleteModalProjectComponent {
  @Input() objectName: string = "";
  @Input() message: string = "Êtes-vous sûr de vouloir supprimer cet élément ?"

  constructor(public activeModal: NgbActiveModal) {
  }
}
