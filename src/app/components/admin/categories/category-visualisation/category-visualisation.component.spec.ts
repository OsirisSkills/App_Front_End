import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryVisualisationComponent } from './category-visualisation.component';

describe('CategorieVisualisationComponent', () => {
  let component: CategoryVisualisationComponent;
  let fixture: ComponentFixture<CategoryVisualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryVisualisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryVisualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
