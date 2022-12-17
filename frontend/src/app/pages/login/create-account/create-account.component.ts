import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
//COMPONENTS
import { DialogCreatAccountComponent } from 'src/app/components/dialog-creat-account/dialog-creat-account.component';
//SERVICES
import { AuthService } from '../../../service/auth/auth.service';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  public maskCpfOrCnpj: string = '000.000.000-99';
  public form: FormGroup;
  public hasError: boolean;
  public errorMessage: string;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      check: [false],
    });
  }

  public onSubmit = () => {
    this.authService.createUser(this.form.value).subscribe({
      next: (res) => {
        this.dialog.open(DialogCreatAccountComponent, {
          maxWidth: '500px',
          width: '90%'
        });

        this.router.navigate(['']);
      },
      error: (err) => {
        this.hasError = true;
        this.errorMessage = err.error.message;
      },
    });
  };

  public changeCheck = (): void => {
    const checbox = document.querySelector<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    checbox!.checked
      ? (this.form.value.check = true)
      : (this.form.value.check = false);
  };
}
