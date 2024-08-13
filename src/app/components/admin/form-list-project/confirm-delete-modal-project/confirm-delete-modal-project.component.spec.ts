import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteModalProjectComponent } from './confirm-delete-modal-project.component';

describe('ComfirmDeleteModalProjectComponent', () => {
  let component: ConfirmDeleteModalProjectComponent;
  let fixture: ComponentFixture<ConfirmDeleteModalProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteModalProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteModalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
