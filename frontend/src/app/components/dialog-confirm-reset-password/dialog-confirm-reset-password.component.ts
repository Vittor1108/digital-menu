import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-confirm-reset-password',
  templateUrl: './dialog-confirm-reset-password.component.html',
  styleUrls: ['./dialog-confirm-reset-password.component.scss'],
})
export class DialogConfirmResetPasswordComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public onClick = (): void => {
    this.router.navigate(['']);
  };
}
