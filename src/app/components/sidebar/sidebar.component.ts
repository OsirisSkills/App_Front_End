import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService } from "src/app/services/sidebar/sidebar.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements AfterViewInit, OnDestroy {

  sidebarOpen = true;
  private subscription?: Subscription;

  @ViewChild('sidebarContainer') sidebarContainer?: ElementRef;
  activePage: string = 'home';
  resizeHandler: any;
  menuItems: any[] = [
    { label: 'Accueil', icon: 'bi bi-house-door', link: '/home' },
    { label: 'Dashboard', icon: 'bi bi-speedometer2', link: '/dashboard' },
    { label: 'Projets', icon: 'bi bi-table', link: '/liste' },
    { label: 'Catégories', icon: 'bi bi-grid', link: '/category' },
    { label: 'Membres', icon: 'bi bi-person', link: '/members' },
    { label: 'Statistiques', icon: 'bi bi-bar-chart-fill', link: '/stats' }];

  // Injecte le service de la barre latérale et le routeur
  constructor(private router: Router, private sidebarService: SidebarService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activePage = event.url.split('/')[1];
        console.log('Active page: ' + this.activePage);
      }
    });

    // Gérer les changements de taille de la fenêtre
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  // Souscrit à l'observable sidebarStatus$ de la classe SidebarService
  ngOnInit() {
    this.subscription = this.sidebarService.sidebarStatus$.subscribe(() => {
      this.toggleSidebar();
    });
    this.onResize();
  }

  // Ajoute un écouteur d'événements de redimensionnement de la fenêtre.
  // Vérifie la largeur de la fenêtre.
  ngAfterViewInit(): void {
    this.onResize();
    this.resizeHandler = () => {
      this.onResize();
    }
    window.addEventListener('resize', this.resizeHandler);
  }

  // Bascule l'état de la barre latérale en activant ou désactivant la classe CSS
  toggleSidebar() {
    this.sidebarContainer?.nativeElement.classList.toggle('sidebar-collapsed');
  }


  // Vérifie la largeur de la fenêtre et ajoute ou supprime la classe CSS
  onResize() {
    if (window.innerWidth <= 768) {
      this.sidebarContainer?.nativeElement.classList.add('sidebar-collapsed');
    } else {
      this.sidebarContainer?.nativeElement.classList.remove('sidebar-collapsed');
    }
  }


  // Supprime l'écouteur d'événements de redimensionnement de la fenêtre
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
