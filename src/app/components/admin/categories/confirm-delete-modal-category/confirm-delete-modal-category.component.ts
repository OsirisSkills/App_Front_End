import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-confirm-delete-modal-category',
  templateUrl: './confirm-delete-modal-category.component.html',
  styleUrls: ['./confirm-delete-modal-category.component.scss']
})
export class ConfirmDeleteModalCategoryComponent {
  @Input() name: string | undefined;

  constructor(public activeModal: NgbActiveModal) {
  }
}
