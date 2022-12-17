import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmResetPasswordComponent } from './dialog-confirm-reset-password.component';

describe('DialogConfirmResetPasswordComponent', () => {
  let component: DialogConfirmResetPasswordComponent;
  let fixture: ComponentFixture<DialogConfirmResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
