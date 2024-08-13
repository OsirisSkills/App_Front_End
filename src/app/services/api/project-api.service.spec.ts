import { TestBed } from '@angular/core/testing';

import { ProjectApiService } from './project-api.service';

describe('ApiService', () => {
  let service: ProjectApiService;

  beforeEach(() => {
    // Configuration du module de test
    TestBed.configureTestingModule({});
    // Injection du service à tester
    service = TestBed.inject(ProjectApiService);
  });

  it('should be created', () => {
    // Vérification si le service a été créé avec succès
    expect(service).toBeTruthy();
  });
});
