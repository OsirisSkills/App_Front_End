import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AuthService } from './services/api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  showHeader = true;
  showSidebar = true;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let currentRoute = this.route;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        this.sidebarAndHeaderChecker(currentRoute.snapshot.data);
      }
    });
  }

  sidebarAndHeaderChecker(data: any) {
    if (data.hasOwnProperty('hideHeaderAndSidebar')) {
      const hideHeaderAndSidebar = data['hideHeaderAndSidebar'];
      this.showHeader = !hideHeaderAndSidebar;
      this.showSidebar = !hideHeaderAndSidebar;
    }
    else if (data.hasOwnProperty('hideHeader') || data.hasOwnProperty('hideSidebar')) {
      if (data.hasOwnProperty('hideHeader')) {
        const hideHeader = data['hideHeader'];
        this.showHeader = !hideHeader;
      }
      if (data.hasOwnProperty('hideSidebar')) {
        const hideSidebar = data['hideSidebar'];
        this.showSidebar = !hideSidebar;
      }
    }
    else {
      this.showHeader = true;
      this.showSidebar = true;
    }
  }
}
