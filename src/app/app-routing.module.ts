import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {ForgotPasswordComponent} from "./components/forgotten-password/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./components/forgotten-password/reset-password/reset-password.component";
import {AuthGuard} from "./_helpers/auth.guard";

import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {CategoryCreationComponent} from "./components/admin/categories/category-creation/category-creation.component";
import {
    CategoryVisualisationComponent
} from "./components/admin/categories/category-visualisation/category-visualisation.component";
import {
    CategoryModificationComponent
} from "./components/admin/categories/category-modification/category-modification.component";
import {CategoryListComponent} from "./components/admin/categories/category-list/category-list.component";
import {ListeComponent} from "./components/admin/project/liste/liste.component";
import {ProjectFormComponent} from "./components/admin/form-list-project/project-creation/project-form.component";
import {
    ProjectModificationComponent
} from "./components/admin/form-list-project/project-modification/project-modification.component";
import {
    ProjectVisualisationComponent
} from "./components/admin/form-list-project/project-visualisation/project-visualisation.component";
import {KanbanBoardComponent} from './components/admin/project/kanban-board/kanban-board.component';
import {PieChartComponent} from './components/statistics/pie-chart/pie-chart.component';
import {NewMemberComponent} from "./components/admin/members/new-member/new-member.component";
import {EditMemberComponent} from "./components/admin/members/edit-member/edit-member.component";
import {MembersListComponent} from "./components/admin/members/members-list/members-list.component";
import {ViewMemberComponent} from "./components/admin/members/view-member/view-member.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {DashboardComponent} from "./components/admin/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {InternalServerComponent} from "./components/internal-server/internal-server.component";


const routes: Routes = [

    {path: '500', component: InternalServerComponent, title: "Error 500", data: {hideHeaderAndSidebar: true}},
    //Route Connexion // MODIFIER EN CONNEXION
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    // Route Dashboard
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    // Route Kanban
    // {path: 'kanban', component: KanbanBoardComponent},
    // Route Liste
    {path: 'liste', component: ListeComponent, canActivate: [AuthGuard]},
    // //Routa Ajouter Projet
    {path: 'ajouter-projet', component: ProjectFormComponent, canActivate: [AuthGuard]},
    //Route Categorie
    {path: 'category', component: CategoryListComponent, canActivate: [AuthGuard]},

    //Route Ajouter Categorie

    {
        path: 'category',
        children: [
            {path: 'new', component: CategoryCreationComponent, title: "Categorie Creation", canActivate: [AuthGuard]},
        ]
    },

    //Route Visualiser Categorie
    {path: 'category/:id', component: CategoryVisualisationComponent, canActivate: [AuthGuard]},
    //Route Modifier Categorie
    {path: 'category/:id/edit', component: CategoryModificationComponent, canActivate: [AuthGuard]},


    {path: 'liste/new', component: ProjectFormComponent, canActivate: [AuthGuard]},
    //Route Modifier Project
    {path: 'liste/:id/edit', component: ProjectModificationComponent, canActivate: [AuthGuard]},
    // Route Visualiser Project
    {path: 'liste/:id', component: ProjectVisualisationComponent, canActivate: [AuthGuard]},


    {path: 'login', component: LoginComponent, title: "Login", data: {hideHeaderAndSidebar: true}},


    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        title: "Forgot Password",
        data: {hideHeaderAndSidebar: true}
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent,
        title: "Reset Password",
        data: {hideHeaderAndSidebar: true}
    },
    {path: 'kanban-board', component: KanbanBoardComponent, title: "Kanban Board", canActivate: [AuthGuard]},

    {path: 'home', component: HomeComponent, title: "Home", canActivate: [AuthGuard]},
    {path: 'stats', component: StatisticsComponent, title: "Statistics", canActivate: [AuthGuard]},

    {path: 'ajouter-projet', component: ProjectFormComponent, canActivate: [AuthGuard]},

    {
        path: 'liste',
        children: [

            //Routa Ajouter Projet
            {path: 'ajouter-projet', component: ProjectFormComponent, canActivate: [AuthGuard]},
            {path: 'kanban-board', component: KanbanBoardComponent, title: "Kanban Board", canActivate: [AuthGuard]},
        ]
    },

    {path: 'members', component: MembersListComponent, title: "Member List", canActivate: [AuthGuard]},
    //
    {path: 'members/new', component: NewMemberComponent, title: "New member", canActivate: [AuthGuard]},
    {path: 'members/:id/edit', component: EditMemberComponent, title: "Edit Member", canActivate: [AuthGuard]},
    {path: 'members/:id', component: ViewMemberComponent, title: "View Member", canActivate: [AuthGuard]},

    // Gestion de l'erreur 404
    {path: '**', component: PageNotFoundComponent, data: {hideHeaderAndSidebar: true}},


]

//Only Admin Routes.
// const adminRoutes: Routes = [
//
//   { path: 'dashboard', component: DashboardComponent, title: "Dashboard" ,canActivate:[AuthGuard]},
//
//   {
//     path: 'project',
//     children: [
//
//       { path: 'kanban-board', component: KanbanBoardComponent, title: "Kanban Board" ,canActivate:[AuthGuard]},
//
//     ]
//   },
//
//   { path: 'pie-chart', component: PieChartComponent, title: "Pie Chart" ,canActivate:[AuthGuard]},
// ]


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
        //RouterModule.forRoot(AppRoutingModule.applyGuard()),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
