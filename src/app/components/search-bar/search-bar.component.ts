import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {debounceTime, Observable, of, Subject, switchMap} from "rxjs";
import {SearchFactoryService} from "src/app/services/search/search-factory.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  // Used to detect focus and hide suggestion menu if the user click outside the search bar or the suggestion menu
  @ViewChild('searchInput') searchInput: ElementRef = new ElementRef("");
  @ViewChild('menuSuggestions') menuSuggestions: ElementRef = new ElementRef("");

  @Input() displayFn!: (item: any) => String; // The function to display the suggestion menu
  @Input() searchSize: number = 7;  // The number of result to display
  @Input() column: String = "";     // The column to search in the database (use the default column if empty)

  @Output() searchValueChange = new EventEmitter<String>(); // Send the search value to the parent component

  // Used to detect focus and hide suggestion menu if the user click outside the search bar or the suggestion menu
  private clickListener!: Function;

  showMenu: boolean = true; // Show or hide the suggestion menu


  searchValue: String = ""; // The value of the search bar
  suggestionResult: any = []; // The result used for the suggestion menu
  searchSubject = new Subject<String>() // The subject used to send the value to the observable
  endPoint: String = ""; // The endpoint to use to create the URL to the selected item => /{endpoint}/{id}

  searchService: any = null; // The API service to use to get the result

  constructor(private searchFactoryService: SearchFactoryService,
              private renderer: Renderer2,
              private router: Router) {

    this.endPoint = router.url.split("/")[1];

    this.searchSubject.pipe(
      debounceTime(200),
      switchMap((value: String) => this.getSearchObservable(value))
    ).subscribe((result: String[]) => {
      this.suggestionResult = result
    });
  }

  ngOnInit(): void {
    this.clickListener = this.renderer.listen('document', 'click', (event) => {
      if (!this.searchInput.nativeElement.contains(event.target) &&
        (!this.menuSuggestions || !this.menuSuggestions.nativeElement.contains(event.target))) {
        this.hideMenu();
      }
    });
  }

  ngOnDestroy() {
    if (this.clickListener) {
      this.clickListener();
    }
  }

  /***
   * Detect when the input value change and send the value to the observable
   * Used for the suggestion menu
   * @param event
   */
  inputModified(event: any){
    this.showMenu = true;
    this.searchSubject.next(this.searchValue);
  }

  /***
   * Main search function. Used when the user click on the search button
   */
  search(){
    this.showMenu = false;
    this.searchValueChange.emit(this.searchValue);
  }

  /***
   * Reset the search bar and the result
   */
  reset(){
    this.searchValue = "";
    this.search();
  }

  /***
   * Get the observable to use to get the result
   * @param value
   * @private
   */
  private getSearchObservable(value: String) : Observable<String[]> {

    this.searchService = this.searchFactoryService.getService(this.endPoint);
    if (this.searchService == null)
      throw new Error("searchService is null");
    else if (this.searchSize < 0)
      throw new Error("pageSize is null");
    else if (this.column == "" && this.searchValue != "")
      return this.searchService.getAllBy(1, this.searchSize, this.searchValue);
    else if (this.searchValue != "")
      return this.searchService.getAllBy(1, this.searchSize, this.searchValue, this.column);
    else
      return of([]); // empty observable
  }

  /***
   * Hide the suggestion menu
   */
  hideMenu() {
    this.showMenu = false;
  }


}
