import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModificationComponent } from './project-modification.component';

describe('ProjectModificationComponent', () => {
  let component: ProjectModificationComponent;
  let fixture: ComponentFixture<ProjectModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
