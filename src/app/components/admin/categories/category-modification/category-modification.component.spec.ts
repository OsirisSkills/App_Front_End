import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryModificationComponent } from './category-modification.component';

describe('CategorieModificationComponent', () => {
  let component: CategoryModificationComponent;
  let fixture: ComponentFixture<CategoryModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
