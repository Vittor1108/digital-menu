import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogForgotPasswordComponent } from 'src/app/components/dialog-forgot-password/dialog-forgot-password.component';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {}
  public openDialog = (): void => {
    const dialogRef = this.dialog.open(DialogForgotPasswordComponent, {
      width: '90%',
      maxWidth: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog fechou');
    });
  };
}
