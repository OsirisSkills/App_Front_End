import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './components/admin/dashboard/dashboard.component';



import { ListeComponent } from './components/admin/project/liste/liste.component';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProjectFormComponent } from './components/admin/form-list-project/project-creation/project-form.component';
import { CategoryListComponent } from './components/admin/categories/category-list/category-list.component';
import { CategoryCreationComponent } from './components/admin/categories/category-creation/category-creation.component';
import { CategoryModificationComponent } from './components/admin/categories/category-modification/category-modification.component';
import { ProjectModificationComponent } from './components/admin/form-list-project/project-modification/project-modification.component';
import { ProjectVisualisationComponent } from './components/admin/form-list-project/project-visualisation/project-visualisation.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryVisualisationComponent } from './components/admin/categories/category-visualisation/category-visualisation.component';
import { ForgotPasswordComponent } from "./components/forgotten-password/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/forgotten-password/reset-password/reset-password.component";


import { KanbanBoardComponent } from "./components/admin/project/kanban-board/kanban-board.component";

import { StatisticsComponent } from "./components/statistics/statistics.component";
import { MembersListComponent } from "./components/admin/members/members-list/members-list.component";
import { EditMemberComponent } from "./components/admin/members/edit-member/edit-member.component";
import { ViewMemberComponent } from "./components/admin/members/view-member/view-member.component";
import { PieChartComponent } from "./components/statistics/pie-chart/pie-chart.component";
import { NgChartsModule } from "ng2-charts";
import { NgxCaptchaModule } from "ngx-captcha";
import { CdkDropList, DragDropModule } from "@angular/cdk/drag-drop";
import { HomeComponent } from "./components/home/home.component";
import { NewMemberComponent } from "./components/admin/members/new-member/new-member.component";
import { LoginComponent } from './components/login/login.component';
import { ConfirmDeleteModalCategoryComponent } from './components/admin/categories/confirm-delete-modal-category/confirm-delete-modal-category.component';
import { LineChartComponent } from './components/admin/dashboard/linechart/line-chart.component';
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { InternalServerComponent } from './components/internal-server/internal-server.component';
import {
  ConfirmDeleteModalProjectComponent
} from "./components/admin/form-list-project/confirm-delete-modal-project/confirm-delete-modal-project.component";
import { PaginatorComponent } from './components/pagination/paginator/paginator.component';
import { PageSizeSelectorComponent } from './components/pagination/page-size-selector/page-size-selector.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MemberRoleDisplayNamePipe } from './pipes/member-role-display-name.pipe';
import { ProjectStateDisplayNamePipe } from './pipes/project-state-display-name.pipe';
import { AuthService } from './services/api/auth.service';
import { Observable, of } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { ProjectStatusComponent } from './components/project-status/project-status.component';

const initialiseUser = (authService: AuthService): () => Observable<any>  => {
  
    const token = localStorage.getItem('token');
    // IF A TOKEN IS STORED IN THE LOCALSTORAGE: LOAD USER PROFILE
    if(token) {
      // TEST IF TOKEN IS EXPIRED
      const decodedToken = jwtDecode<any>(token);
      if(decodedToken.exp * 1000 > new Date().getTime()) {
        return () => authService.loadUserFromToken(token);
      } else {
        // TOKEN IS EXPIRED, LOG OUT AND REMOVE IT FROM STORAGE
        authService.logoutUser();
        return () => of();
      }
    }
    return () => of();

}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListeComponent,
    HeaderComponent,
    SidebarComponent,
    ProjectFormComponent,
    CategoryListComponent,
    CategoryCreationComponent,
    CategoryModificationComponent,
    ProjectModificationComponent,
    ProjectVisualisationComponent,
    CategoryVisualisationComponent,
    /* Ajout des composants*/
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SidebarComponent,
    HeaderComponent,
    KanbanBoardComponent,
    StatisticsComponent,
    MembersListComponent,
    EditMemberComponent,
    ViewMemberComponent,
    PieChartComponent,
    HomeComponent,
    NewMemberComponent,
    LoginComponent,
    ConfirmDeleteModalCategoryComponent,
    ConfirmDeleteModalProjectComponent,
    LineChartComponent,
    InternalServerComponent,
    PaginatorComponent,
    PageSizeSelectorComponent,
    SearchBarComponent,
    MemberRoleDisplayNamePipe,
    ProjectStateDisplayNamePipe,
    ProjectStatusComponent,


  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    CdkDropList,
    BrowserAnimationsModule,
    MatSnackBarModule,
    DragDropModule,
    HttpClientModule,


  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initialiseUser,
      deps: [AuthService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, //For using the interceptor in the whole application. For Get the token with the API Server.
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
