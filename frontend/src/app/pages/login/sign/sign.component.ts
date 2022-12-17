import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogForgotPasswordComponent } from 'src/app/components/dialog-forgot-password/dialog-forgot-password.component';
import { AuthService } from 'src/app/service/auth/auth.service';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  public form: FormGroup;
  public errorMessage: string;
  constructor(
    private readonly dialog: MatDialog,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.checkLogged();
  }
  public openDialog = (): void => {
    this.dialog.open(DialogForgotPasswordComponent, {
      width: '90%',
      maxWidth: '500px',
    });
  };

  public onSubmit = (): void => {
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        // this.saveLogin(res.token);
        this.router.navigate(['home']);
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  };

  private saveLogin = (token: string): void => {
    const checkbox = document.querySelector<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    checkbox!.checked ? localStorage.setItem('token', token) : false;
  };

  private checkLogged = () => {
    const token = localStorage.getItem('token');
    token ? this.router.navigate(['home']) : false;
  }
}
