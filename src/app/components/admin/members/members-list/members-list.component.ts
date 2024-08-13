import {Component, OnInit} from '@angular/core';
import {ConfirmDeleteModalComponent} from "src/app/components/admin/members/confirm-delete-modal/confirm-delete-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Member} from "src/app/models/member";
import {MemberApiService} from "src/app/services/api/member-api.service";
import {Observable, Subscription} from "rxjs";
import {
  ConfirmDeleteModalCategoryComponent
} from "../../categories/confirm-delete-modal-category/confirm-delete-modal-category.component";

@Component({
  selector: 'app-members',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit{

  /***
   * @constructor
   * @param modalService the modalService
   * @param memberApiService the memberApiService (to call the API request)
   */
  constructor(private modalService: NgbModal,
              private memberApiService: MemberApiService) {
  }

  membersApi: any = [];
  private membersSubscription!: Subscription;
  quantityOfMember: number = -1;

  //currentSort: { column: keyof Member, direction: 1 | -1 } = { column: 'userName', direction: 1 };
  //filteredMembers: Member[] = this.members;
  searchTerm: String = '';

  column = 'firstName'; // Default column
  // Pagination
  currentPage = 1; // Default page
  pageSize = 10; // Default page size
  // pageShown = 5; // Number of pages shown in the paginator (left/right)
  // pageSizes = [5, 10, 25, 50, 100]; // Page sizes available to the user

  /***
   * The ngOnInit Methods.
   */
  ngOnInit() {
    this.reloadData();
  }

  /***
   * Get dara method's from the getAllBy in memberApiService.
   */
  getData(): Observable<Member> {

    if (this.searchTerm !== '') {
      return this.memberApiService.getAllBy(this.currentPage, this.pageSize, this.searchTerm, this.column);
    }
    return this.memberApiService.getAllBy(this.currentPage, this.pageSize);
  }

  /**
   * Reload the data from the API with the current parameters
   */
  reloadData(): void {
    if (this.membersSubscription) {
      this.membersSubscription.unsubscribe();
    }

    if (this.searchTerm === '') {
      this.memberApiService.count().subscribe((totalCount) => {
        if (typeof totalCount === 'object' && totalCount !== null && 'result' in totalCount &&
          typeof totalCount.result === 'number') {
          this.quantityOfMember = totalCount.result;
        }
      });
      this.membersSubscription = this.getData().subscribe((data:Member) => {
        this.membersApi = data;
      });
    }
    else
    {
      this.memberApiService.countBy(this.searchTerm, this.column).subscribe((totalCount) => {
        if (typeof totalCount === 'object' && totalCount !== null && 'result' in totalCount &&
          typeof totalCount.result === 'number') {
          this.quantityOfMember = totalCount.result;
        }
      });
      this.membersSubscription = this.getData().subscribe((data:Member) => {
        this.membersApi = data;
      });
    }
  }

  /**
   * Handle the page change event
   * @param event {currentPage: number, pageSize: number}
   */
  onPageChange(event: {currentPage: number, pageSize: number}) {
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
    this.reloadData();
  }

  /**
   * Handle the quantity of items per page change event
   * @param $event {pageSize: number}
   */
  onPageSizeChange($event: {pageSize: number}) {
    this.pageSize = $event.pageSize;
    this.reloadData();
  }

  /***
   * Delete a member by its ID after confirmation
   * @param id the id
   */
  deleteMember(id: number) {
    const member = this.membersApi.find((member: Member) => {
      return member.id === id;
    });
    if (!member) {
      throw new Error("Member not found");
    }
    const modalRef = this.modalService.open(ConfirmDeleteModalCategoryComponent);
    modalRef.componentInstance.name = member.userName;
    modalRef.result.then(() => {
      this.memberApiService.delete(id).subscribe(() => {
        this.reloadData();
      });
    }).catch((e) => {console.log(e)});
  }

  searchValueResultHandler(value: String) {
    this.searchTerm = value;
    this.reloadData()
  }

  displayMember(member: Member) {
    if (member.firstName && member.lastName && member.email) {
      return `${member.firstName} ${member.lastName} (${member.email})`;
    }
    else if (member.firstName && member.lastName) {
      return `${member.firstName} ${member.lastName}`;
    }
    else if (member.firstName) {
      return `${member.firstName}`;
    }
    else if (member.email) {
      return `${member.email}`;
    }
    else {
      return `Utilisateur ${member.id}`;
    }
  }

}
