import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

// Service qui permet de gérer l'état de la sidebar (ouverte ou fermée)
// Permet le transfert de l'état de la sidebar entre les composants header et sidebar

export class SidebarService {

  private sidebarStatusSubject = new BehaviorSubject<boolean>(true);
  sidebarStatus$ = this.sidebarStatusSubject.asObservable();
  constructor() { }

  // Inverse la valeur de la propriété sidebarStatusSubject
  toggleSidebar() {
    this.sidebarStatusSubject.next(!this.sidebarStatusSubject.value);
  }
}
