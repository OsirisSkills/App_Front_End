import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteModalCategoryComponent } from './confirm-delete-modal-category.component';

describe('ConfirmDeleteModalCategoryComponent', () => {
  let component: ConfirmDeleteModalCategoryComponent;
  let fixture: ComponentFixture<ConfirmDeleteModalCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteModalCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteModalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
