import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-dialog-forgot-password',
  templateUrl: './dialog-forgot-password.component.html',
  styleUrls: ['./dialog-forgot-password.component.scss'],
})
export class DialogForgotPasswordComponent implements OnInit {
  public email: string;
  public showConfirmation: boolean = false;
  public hasError: boolean = false;
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}

  public onClick = () => {
    if (!this.email) {
      return;
    }

    this.authService.forgotPassowrd(this.email).subscribe({
      next: (res) => {
        this.showConfirmation = true;
      },
      error: (err) => {
        this.hasError = true;
      },
    });
  };
}
