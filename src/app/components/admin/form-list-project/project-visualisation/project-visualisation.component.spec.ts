import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVisualisationComponent } from './project-visualisation.component';

describe('ProjectVisualisationComponent', () => {
  let component: ProjectVisualisationComponent;
  let fixture: ComponentFixture<ProjectVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectVisualisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
