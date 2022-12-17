import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmResetPasswordComponent } from 'src/app/components/dialog-confirm-reset-password/dialog-confirm-reset-password.component';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  private tokenUser: string;
  public errorValidation: boolean;
  public errorResetPassword: boolean = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.verifyToken();
  }

  private verifyToken = (): void => {
    this.activeRoute.params.subscribe(
      (params) => (this.tokenUser = params['id'])
    );
    this.authService.validationToken(this.tokenUser, 2).subscribe({
      next: (res) => {
        this.errorValidation = false;
      },
      error: (err) => {
        this.errorValidation = true;
      },
    });
  };

  public redirect = (): void => {
    this.router.navigate(['']);
  };

  public onSubmit = (): void => {
    this.authService
      .resetPassword(this.form.value.password, this.tokenUser)
      .subscribe({
        next: (res) => {
          this.matDialog.open(DialogConfirmResetPasswordComponent, {
            maxWidth: '500px',
            width: '90%',
            data: res,
          });
        },
        error: (err) => {
          this.errorResetPassword = true;
        },
      });
  };
}
