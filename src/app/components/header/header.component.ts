import {Component, OnInit} from '@angular/core';
import {SidebarService} from "src/app/services/sidebar/sidebar.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/api/auth.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user: { firstName: string, lastName: string } | null = null;

    constructor(
        private sidebarService: SidebarService,
        private route: Router,
        private authService: AuthService // Injection du service AuthService
    ) {
    }

    ngOnInit() {
        // Récupérez les informations de l'utilisateur depuis le service AuthService
        this.user = this.authService.getUser();
    }

    // Utilisé pour ouvrir/fermer la sidebar en cliquant sur le bouton burger
    onBurgerClick() {
        this.sidebarService.toggleSidebar();
    }

    disconnect() {
        localStorage.removeItem('token');
        console.log("TOKEN REMOVED ! Current token (must be null): ", localStorage.getItem('token'));
        this.route.navigate(['/login']).then(r => console.log(r));
    }
}
